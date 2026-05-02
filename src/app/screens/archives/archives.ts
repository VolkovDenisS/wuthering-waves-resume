import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archives',
  imports: [CommonModule],
  templateUrl: './archives.html',
  styleUrls: ['./archives.scss'],
})
export class Archives {
  certifications = [
    {
      title: 'BMC Helix Innovation Studio 22.x: Fundamentals Developing Codeless Application',
      issuer: 'BMC Software',
      date: 'Jun 2024',
      id: 'CERT-001',
    },
    {
      title: 'BMC Certified Associate: BMC Remedy AR System 20.x for Administrators',
      issuer: 'BMC Software',
      date: 'Jan 2023',
      id: 'CERT-002',
    },
    {
      title: 'BMC Certified Associate: BMC Remedy AR System 20.x for Developers',
      issuer: 'BMC Software',
      date: 'Jun 2021',
      id: 'CERT-003',
    },
    {
      title: 'AZ-900: Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: 'Feb 2020',
      id: 'CERT-004',
    },
    {
      title: 'Project Management',
      issuer: 'Project PRACTICE Group',
      date: 'Jul 2019',
      id: 'CERT-005',
    },
  ];

  education = [
    {
      institution: 'Southern Federal University',
      degree: 'Bachelor, Computer Science',
      period: '2016 - 2020',
      location: 'Rostov-on-Don',
    },
    {
      institution: 'Krasnodar College of Electronic Instrumentation (KKEP)',
      degree: 'Information Systems Technician',
      period: '2012 - 2016',
      location: 'Krasnodar',
    },
  ];
}
