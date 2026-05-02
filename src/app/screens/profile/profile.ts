import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ResonanceNode {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  phase: string;
  isActive: boolean;
  colorClass: string;
}

interface FactionGroup {
  id: string;
  name: string;
  logo: string;
  tone: string;
  nodes: ResonanceNode[];
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  activeNode: ResonanceNode | null = null;

  private readonly magnitNodes: ResonanceNode[] = [
    {
      id: 'magnit-analyst',
      year: '2015',
      period: 'Nov 2015 - Jul 2018',
      role: 'IT Analyst',
      company: 'JSC Tander',
      phase: '01',
      isActive: false,
      colorClass: 'ww-accent'
    },
    {
      id: 'magnit-senior',
      year: '2018',
      period: 'Aug 2018 - Oct 2019',
      role: 'Senior Dev',
      company: 'JSC Tander',
      phase: '02',
      isActive: false,
      colorClass: 'ww-accent'
    },
    {
      id: 'magnit-lead',
      year: '2019',
      period: 'Nov 2019 - Nov 2020',
      role: 'Team Lead',
      company: 'JSC Tander',
      phase: '03',
      isActive: false,
      colorClass: 'ww-accent'
    }
  ];

  private readonly cfiNodes: ResonanceNode[] = [
    {
      id: 'cfi-senior',
      year: '2020',
      period: 'Dec 2020 - Dec 2021',
      role: 'Senior Dev',
      company: 'Compfort International GmbH',
      phase: '04',
      isActive: false,
      colorClass: 'ww-accent'
    },
    {
      id: 'cfi-lead',
      year: '2021',
      period: 'Dec 2021 - Jun 2023',
      role: 'Team Lead',
      company: 'Compfort International GmbH',
      phase: '05',
      isActive: false,
      colorClass: 'ww-accent'
    }
  ];

  private readonly kasperskyNodes: ResonanceNode[] = [
    {
      id: 'kaspersky-senior',
      year: '2023',
      period: 'Jun 2023 - Dec 2024',
      role: 'Senior Dev',
      company: 'Kaspersky Lab',
      phase: '06',
      isActive: false,
      colorClass: 'ww-cyan'
    },
    {
      id: 'kaspersky-lead',
      year: '2024',
      period: 'Dec 2024 - Present',
      role: 'Team Lead',
      company: 'Kaspersky Lab',
      phase: '07',
      isActive: true,
      colorClass: 'white'
    }
  ];

  journey: ResonanceNode[] = [
    ...this.magnitNodes,
    ...this.cfiNodes,
    ...this.kasperskyNodes
  ];

  factionGroups: FactionGroup[] = [
    {
      id: 'magnit',
      name: 'JSC TANDER',
      logo: 'faction_magnit.png',
      tone: 'fractsidus',
      nodes: this.magnitNodes
    },
    {
      id: 'cfi',
      name: 'COMPFORT INTERNATIONAL GMBH',
      logo: 'faction_cfi.png',
      tone: 'black-shores',
      nodes: this.cfiNodes
    },
    {
      id: 'kaspersky',
      name: 'KASPERSKY LAB',
      logo: 'faction_kaspersky.png',
      tone: 'spacetrek',
      nodes: this.kasperskyNodes
    }
  ];

  showTooltip(node: ResonanceNode) {
    this.activeNode = node;
  }

  hideTooltip() {
    this.activeNode = null;
  }

  @HostListener('document:click')
  closeTooltipOnOutsideClick() {
    this.activeNode = null;
  }

  toggleTooltip(node: ResonanceNode, event?: MouseEvent) {
    event?.stopPropagation();

    if (this.activeNode?.id === node.id) {
      this.activeNode = null;
    } else {
      this.activeNode = node;
    }
  }
}
