import { Routes } from '@angular/router';
import { Splash } from './screens/splash/splash';
import { Layout } from './layout/layout';
import { Profile } from './screens/profile/profile';
import { Skills } from './screens/skills/skills';
import { Inventory } from './screens/inventory/inventory';
import { Archives } from './screens/archives/archives';
import { Contacts } from './screens/contacts/contacts';

export const routes: Routes = [
  { path: '', component: Splash },
  { 
    path: 'main', 
    component: Layout,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: Profile },
      { path: 'skills', component: Skills },
      { path: 'inventory', component: Inventory },
      { path: 'travels', loadComponent: () => import('./screens/travels/travels').then((m) => m.Travels) },
      { path: 'archives', component: Archives },
      { path: 'contacts', component: Contacts }
    ]
  },
  { path: '**', redirectTo: '' }
];
