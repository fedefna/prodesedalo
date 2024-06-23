import { Routes } from '@angular/router';
import { TablaGeneralComponent } from './components/tabla-general/tabla-general.component';
import { ProdeComponent } from './components/prode/prode.component';

export const routes: Routes = [
    { path: '', component: TablaGeneralComponent },
    { path: 'prode', component: ProdeComponent }
  ];