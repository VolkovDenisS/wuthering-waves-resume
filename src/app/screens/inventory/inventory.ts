import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExperienceTheme {
  hoverBorder: string;
  iconBorder: string;
  iconHoverBorder: string;
  text: string;
  bg: string;
  gradient: string;
  modalBorder: string;
  descBorder: string;
}

interface Experience {
  id: string;
  company: string;
  period: string;
  role: string;
  location: string;
  description: string[];
  skills: string[];
  theme: ExperienceTheme;
  icon: string;
}

@Component({
  selector: 'app-inventory',
  imports: [CommonModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss'],
})
export class Inventory {
  experiences: Experience[] = [
    {
      id: 'kaspersky',
      company: 'Kaspersky Lab',
      period: 'Jun 2023 - Present',
      role: 'Development Team Lead / Senior Developer',
      location: 'Moscow, Russia (Remote)',
      description: [
        'Managing development team, planning tasks using Agile methodologies (Scrum, Kanban), facilitating stakeholder meetings, and optimizing resource allocation.',
        'Developed and implemented new functionality for B2B and B2C Support based on BMC Remedy, improving integration with Kaspersky CompanyAccount.',
        'Active role in the migration project of BMC Remedy 8.1 to version 22.1. Adapted and rewrote numerous custom workflows and integrations.',
        'Mastered technologies such as BMC Helix Innovation Studio development and data migration using BMC Helix Data Manager.',
      ],
      skills: ['BMC Remedy', 'JavaScript', 'Agile', 'Data Migration', 'Innovation Studio'],
      theme: {
        hoverBorder: 'hover:border-ww-accent',
        iconBorder: 'border-ww-accent/30',
        iconHoverBorder: 'group-hover:border-ww-accent',
        text: 'text-ww-accent',
        bg: 'bg-ww-accent',
        gradient: 'from-ww-accent/10 to-transparent',
        modalBorder: 'border-ww-accent/50',
        descBorder: 'border-ww-accent/30',
      },
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      id: 'cfi',
      company: 'CFI',
      period: 'Dec 2020 - Jun 2023',
      role: 'Development Team Lead',
      location: 'Baku, Azerbaijan (Hybrid)',
      description: [
        'Utilized Remedy Developer Studio to develop new features and improve the frontend of SmartIT, DWP Mid-Tier, and other products using JavaScript, HTML, and CSS.',
        'Provided exceptional customer support for BMC Software products, ensuring smooth operation through reverse engineering and troubleshooting.',
        'Managed and participated in significant projects implementing new products and integrating with third-party systems (JIRA, Active Directory, Certificate Centers).',
        'Oversaw implementation and development teams to ensure project success.',
      ],
      skills: ['JavaScript', 'Remedy', 'SmartIT', 'DWP', 'JIRA API'],
      theme: {
        hoverBorder: 'hover:border-blue-400',
        iconBorder: 'border-blue-400/30',
        iconHoverBorder: 'group-hover:border-blue-400',
        text: 'text-blue-400',
        bg: 'bg-blue-400',
        gradient: 'from-blue-400/10 to-transparent',
        modalBorder: 'border-blue-400/50',
        descBorder: 'border-blue-400/30',
      },
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
    {
      id: 'magnit',
      company: 'Magnit',
      period: 'Nov 2015 - Nov 2020',
      role: 'Team Lead / Senior SWE / IT Analyst',
      location: 'Krasnodar, Russia',
      description: [
        'Led major project upgrading Remedy hybrid platform (7.1 & 9.1.02) to version 20.02 (9.1.10), including customization and data migration.',
        'Implemented Smart IT product and developed on the platform using REST, JavaScript, and provider actions.',
        'Responsible for DWP portal implementation for external contractors, including JS banners and custom CSS.',
        'Successfully implemented Smart Reporting and BMC Discovery. Oversaw migration of ~3,000 users to BMC.',
        'Provided crucial support maintaining a fleet of 90 servers, optimizing internal processes and ensuring system resilience under heavy load.',
      ],
      skills: ['Remedy Upgrades', 'Smart IT', 'DWP', 'BMC Discovery', 'Server Maintenance'],
      theme: {
        hoverBorder: 'hover:border-purple-400',
        iconBorder: 'border-purple-400/30',
        iconHoverBorder: 'group-hover:border-purple-400',
        text: 'text-purple-400',
        bg: 'bg-purple-400',
        gradient: 'from-purple-400/10 to-transparent',
        modalBorder: 'border-purple-400/50',
        descBorder: 'border-purple-400/30',
      },
      icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    },
  ];

  selectedExperience: Experience | null = null;

  selectExperience(exp: Experience) {
    this.selectedExperience = exp;
  }

  closeModal() {
    this.selectedExperience = null;
  }
}
