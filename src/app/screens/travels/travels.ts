import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Globe from 'globe.gl';
import { feature } from 'topojson-client';
import countriesTopology from 'world-atlas/countries-110m.json';

type GlobeInstance = InstanceType<typeof Globe>;

interface CountryFeature {
  properties: {
    name: string;
  };
}

interface TravelPoint {
  id: string;
  city: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  tone: 'home' | 'asia' | 'sea' | 'med';
}

interface TravelArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
}

interface TravelCountryGroup {
  country: string;
  points: TravelPoint[];
}

@Component({
  selector: 'app-travels',
  imports: [CommonModule],
  templateUrl: './travels.html',
  styleUrl: './travels.scss',
})
export class Travels implements AfterViewInit, OnDestroy {
  @ViewChild('globeContainer') globeContainer!: ElementRef<HTMLDivElement>;

  selectedPoint: TravelPoint | null = null;
  expandedCountries = new Set<string>();
  private globe?: GlobeInstance;
  private resizeObserver?: ResizeObserver;

  readonly visitedCountriesSet = new Set([
    'Russia',
    'China',
    'Japan',
    'Thailand',
    'Greece',
    'Turkey',
    'Azerbaijan',
    'Maldives',
    'Georgia',
  ]);

  readonly countryColors = new Map([
    ['Russia', '#f3c84f'],
    ['China', '#00e5ff'],
    ['Japan', '#ff7ad9'],
    ['Thailand', '#60a5fa'],
    ['Greece', '#c084fc'],
    ['Turkey', '#fb923c'],
    ['Azerbaijan', '#4ade80'],
    ['Maldives', '#38bdf8'],
    ['Georgia', '#f87171'],
  ]);

  readonly travelPoints: TravelPoint[] = [
    { id: 'krasnodar', city: 'Krasnodar', country: 'Russia', region: 'Home vector', lat: 45.0355, lng: 38.9753, tone: 'home' },
    { id: 'moscow', city: 'Moscow', country: 'Russia', region: 'Core hub', lat: 55.7558, lng: 37.6173, tone: 'home' },
    { id: 'kemerovo', city: 'Kemerovo', country: 'Russia', region: 'Siberia', lat: 55.3909, lng: 86.0468, tone: 'home' },
    { id: 'novosibirsk', city: 'Novosibirsk', country: 'Russia', region: 'Siberia', lat: 55.0084, lng: 82.9357, tone: 'home' },
    { id: 'tomsk', city: 'Tomsk', country: 'Russia', region: 'Siberia', lat: 56.4846, lng: 84.9476, tone: 'home' },
    { id: 'sochi', city: 'Sochi', country: 'Russia', region: 'Black Sea', lat: 43.6028, lng: 39.7342, tone: 'sea' },
    { id: 'gelendzhik', city: 'Gelendzhik', country: 'Russia', region: 'Black Sea', lat: 44.5622, lng: 38.0848, tone: 'sea' },
    { id: 'anapa', city: 'Anapa', country: 'Russia', region: 'Black Sea', lat: 44.895, lng: 37.3163, tone: 'sea' },
    { id: 'beijing', city: 'Beijing', country: 'China', region: 'East Asia', lat: 39.9042, lng: 116.4074, tone: 'asia' },
    { id: 'shanghai', city: 'Shanghai', country: 'China', region: 'East Asia', lat: 31.2304, lng: 121.4737, tone: 'asia' },
    { id: 'guangzhou', city: 'Guangzhou', country: 'China', region: 'Pearl River Delta', lat: 23.1291, lng: 113.2644, tone: 'asia' },
    { id: 'haikou', city: 'Haikou', country: 'China', region: 'Hainan', lat: 20.044, lng: 110.1999, tone: 'asia' },
    { id: 'hong-kong', city: 'Hong Kong', country: 'China', region: 'Pearl River Delta', lat: 22.3193, lng: 114.1694, tone: 'asia' },
    { id: 'male', city: 'Male', country: 'Maldives', region: 'Indian Ocean', lat: 4.1755, lng: 73.5093, tone: 'sea' },
    { id: 'istanbul', city: 'Istanbul', country: 'Turkey', region: 'Bosphorus', lat: 41.0082, lng: 28.9784, tone: 'med' },
    { id: 'heraklion', city: 'Heraklion', country: 'Greece', region: 'Crete', lat: 35.3387, lng: 25.1442, tone: 'med' },
    { id: 'athens', city: 'Athens', country: 'Greece', region: 'Attica', lat: 37.9838, lng: 23.7275, tone: 'med' },
    { id: 'sukhum', city: 'Sukhum', country: 'Abkhazia', region: 'Black Sea', lat: 43.0015, lng: 41.0234, tone: 'sea' },
    { id: 'baku', city: 'Baku', country: 'Azerbaijan', region: 'Caspian Sea', lat: 40.4093, lng: 49.8671, tone: 'sea' },
    { id: 'phuket', city: 'Phuket', country: 'Thailand', region: 'Andaman Sea', lat: 7.8804, lng: 98.3923, tone: 'sea' },
    { id: 'bangkok', city: 'Bangkok', country: 'Thailand', region: 'Southeast Asia', lat: 13.7563, lng: 100.5018, tone: 'asia' },
    { id: 'kyoto', city: 'Kyoto', country: 'Japan', region: 'Kansai', lat: 35.0116, lng: 135.7681, tone: 'asia' },
    { id: 'tokyo', city: 'Tokyo', country: 'Japan', region: 'Kanto', lat: 35.6762, lng: 139.6503, tone: 'asia' },
    { id: 'osaka', city: 'Osaka', country: 'Japan', region: 'Kansai', lat: 34.6937, lng: 135.5023, tone: 'asia' },
    { id: 'nara', city: 'Nara', country: 'Japan', region: 'Kansai', lat: 34.6851, lng: 135.8048, tone: 'asia' },
    { id: 'naha', city: 'Naha', country: 'Japan', region: 'Okinawa', lat: 26.2124, lng: 127.6792, tone: 'sea' },
  ];

  readonly arcs: TravelArc[];

  constructor(private zone: NgZone) {
    this.arcs = this.buildHubArcs();
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.createGlobe();
      this.resizeObserver = new ResizeObserver(() => this.resizeGlobe());
      this.resizeObserver.observe(this.globeContainer.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.globe?._destructor();
  }

  get visitedCountries(): number {
    return this.visitedCountriesSet.size;
  }

  get countryGroups(): TravelCountryGroup[] {
    const groups = new Map<string, TravelPoint[]>();

    for (const point of this.travelPoints) {
      const group = groups.get(point.country) ?? [];
      group.push(point);
      groups.set(point.country, group);
    }

    return [...groups.entries()]
      .map(([country, points]) => ({
        country,
        points: [...points].sort((left, right) => left.city.localeCompare(right.city)),
      }))
      .sort((left, right) => left.country.localeCompare(right.country));
  }

  selectPoint(point: TravelPoint) {
    this.selectedPoint = point;
    this.expandedCountries.add(point.country);
    this.focusPoint(point, 900);
    this.refreshGlobeData();
  }

  toggleCountry(country: string) {
    if (this.expandedCountries.has(country)) {
      this.expandedCountries.delete(country);
    } else {
      this.expandedCountries.add(country);
    }
  }

  isCountryExpanded(country: string): boolean {
    return this.expandedCountries.has(country);
  }

  private createGlobe() {
    const countries = feature(
      countriesTopology as never,
      (countriesTopology as never as { objects: { countries: never } }).objects.countries,
    ) as never as { features: CountryFeature[] };

    const globe = new Globe(this.globeContainer.nativeElement, {
      rendererConfig: { antialias: true, alpha: true },
    })
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#00e5ff')
      .atmosphereAltitude(0.18)
      .showGraticules(true)
      .polygonsData(countries.features)
      .polygonAltitude((country: object) => this.isVisitedCountry(country as CountryFeature) ? 0.018 : 0.006)
      .polygonCapColor((country: object) => this.countryFillColor(country as CountryFeature))
      .polygonSideColor((country: object) => this.countrySideColor(country as CountryFeature))
      .polygonStrokeColor((country: object) => this.countryStrokeColor(country as CountryFeature))
      .polygonLabel((country: object) => (country as CountryFeature).properties.name)
      .pointsData(this.travelPoints)
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude((point: object) => (point as TravelPoint).id === this.selectedPoint?.id ? 0.08 : 0.045)
      .pointRadius((point: object) => (point as TravelPoint).id === this.selectedPoint?.id ? 0.72 : 0.34)
      .pointColor((point: object) => this.colorForTone((point as TravelPoint).tone))
      .pointLabel((point: object) => this.pointLabel(point as TravelPoint))
      .onPointClick((point: object) => this.zone.run(() => this.selectPoint(point as TravelPoint)))
      .labelsData(this.travelPoints)
      .labelLat('lat')
      .labelLng('lng')
      .labelAltitude(0.075)
      .labelText('city')
      .labelSize((point: object) => (point as TravelPoint).id === this.selectedPoint?.id ? 0.56 : 0.24)
      .labelDotRadius(0)
      .labelColor((point: object) => (point as TravelPoint).id === this.selectedPoint?.id ? '#f3c84f' : 'rgba(255,255,255,0.54)')
      .labelResolution(1)
      .arcsData(this.activeArcs())
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .arcColor('color')
      .arcAltitude(0.18)
      .arcStroke(0.28)
      .arcDashLength(0.36)
      .arcDashGap(0.18)
      .arcDashAnimateTime(3600);

    globe.controls().autoRotate = false;
    globe.controls().autoRotateSpeed = 0.2;
    globe.controls().enableDamping = true;
    globe.controls().minDistance = 210;
    globe.controls().maxDistance = 520;

    this.globe = globe;
    this.resizeGlobe();
    this.globe.pointOfView({ lat: 42, lng: 78, altitude: 1.95 }, 0);
  }

  private refreshGlobeData() {
    this.globe
      ?.pointsData([...this.travelPoints])
      .labelsData([...this.travelPoints])
      .arcsData(this.activeArcs());
  }

  private activeArcs(): TravelArc[] {
    const selectedPoint = this.selectedPoint;

    if (!selectedPoint) {
      return this.arcs;
    }

    const hubId = selectedPoint.id === 'moscow'
      ? 'moscow'
      : selectedPoint.country === 'Russia'
        ? 'krasnodar'
        : 'moscow';
    const hub = this.travelPoints.find((point) => point.id === hubId);

    if (!hub || selectedPoint.id === hub.id) {
      return this.arcs.filter((arc) => this.isArcFromHub(arc, selectedPoint));
    }

    return this.arcs.filter((arc) => this.isArcBetween(arc, hub, selectedPoint));
  }

  private buildHubArcs(): TravelArc[] {
    const krasnodar = this.travelPoints.find((point) => point.id === 'krasnodar');
    const moscow = this.travelPoints.find((point) => point.id === 'moscow');

    if (!krasnodar || !moscow) {
      return [];
    }

    return this.travelPoints
      .filter((point) => point.id !== krasnodar.id)
      .map((point) => {
        const hub = point.country === 'Russia' ? krasnodar : moscow;

        return {
          startLat: hub.lat,
          startLng: hub.lng,
          endLat: point.lat,
          endLng: point.lng,
          color: [this.hexToRgba(this.colorForTone(hub.tone), 0.48), this.colorForTone(point.tone)],
        };
      });
  }

  private isArcFromHub(arc: TravelArc, hub: TravelPoint): boolean {
    return arc.startLat === hub.lat && arc.startLng === hub.lng;
  }

  private isArcBetween(arc: TravelArc, start: TravelPoint, end: TravelPoint): boolean {
    return arc.startLat === start.lat
      && arc.startLng === start.lng
      && arc.endLat === end.lat
      && arc.endLng === end.lng;
  }

  private resizeGlobe() {
    if (!this.globe) return;

    const { clientWidth, clientHeight } = this.globeContainer.nativeElement;
    this.globe.width(clientWidth).height(clientHeight);
  }

  private focusPoint(point: TravelPoint, transitionMs: number) {
    this.globe?.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.8 }, transitionMs);
  }

  private isVisitedCountry(country: CountryFeature): boolean {
    return this.visitedCountriesSet.has(country.properties.name);
  }

  private countryFillColor(country: CountryFeature): string {
    const color = this.countryColors.get(country.properties.name);
    return color ? this.hexToRgba(color, 0.34) : 'rgba(255,255,255,0.045)';
  }

  private countrySideColor(country: CountryFeature): string {
    const color = this.countryColors.get(country.properties.name);
    return color ? this.hexToRgba(color, 0.14) : 'rgba(255,255,255,0.02)';
  }

  private countryStrokeColor(country: CountryFeature): string {
    const color = this.countryColors.get(country.properties.name);
    return color ? this.hexToRgba(color, 0.92) : 'rgba(255,255,255,0.11)';
  }

  private pointLabel(point: TravelPoint): string {
    return `<div class="globe-tooltip"><strong>${point.city}</strong><span>${point.country} / ${point.region}</span></div>`;
  }

  private colorForTone(tone: TravelPoint['tone']): string {
    return {
      home: '#f3c84f',
      asia: '#00e5ff',
      sea: '#60a5fa',
      med: '#c084fc',
    }[tone];
  }

  private hexToRgba(hex: string, alpha: number): string {
    const value = hex.replace('#', '');
    const red = parseInt(value.slice(0, 2), 16);
    const green = parseInt(value.slice(2, 4), 16);
    const blue = parseInt(value.slice(4, 6), 16);

    return `rgba(${red},${green},${blue},${alpha})`;
  }
}
