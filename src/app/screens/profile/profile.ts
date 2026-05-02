import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ResonanceNode {
  id: string;
  year: string;
  role: string;
  company: string;
  phase: string;
  isActive: boolean;
  colorClass: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  activeNode: ResonanceNode | null = null;

  journey: ResonanceNode[] = [
    {
      id: 'magnit-analyst',
      year: '2015',
      role: 'IT Analyst',
      company: 'Magnit',
      phase: '01',
      isActive: false,
      colorClass: 'ww-accent'
    },
    {
      id: 'magnit-senior',
      year: '2018',
      role: 'Senior SWE',
      company: 'Magnit',
      phase: '02',
      isActive: false,
      colorClass: 'ww-accent'
    },
    {
      id: 'cfi-lead',
      year: '2020',
      role: 'Team Lead',
      company: 'CFI',
      phase: '03',
      isActive: false,
      colorClass: 'ww-accent'
    },
    {
      id: 'kaspersky-senior',
      year: '2023',
      role: 'Senior Dev',
      company: 'Kaspersky',
      phase: '04',
      isActive: false,
      colorClass: 'ww-cyan'
    },
    {
      id: 'kaspersky-lead',
      year: 'Present',
      role: 'Team Lead',
      company: 'Kaspersky',
      phase: '05',
      isActive: true,
      colorClass: 'white'
    }
  ];

  showTooltip(node: ResonanceNode) {
    this.activeNode = node;
  }

  hideTooltip() {
    this.activeNode = null;
  }

  toggleTooltip(node: ResonanceNode) {
    if (this.activeNode?.id === node.id) {
      this.activeNode = null;
    } else {
      this.activeNode = node;
    }
  }
}
