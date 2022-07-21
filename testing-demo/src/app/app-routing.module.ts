import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightSwitchComponent } from './light-switch/light-switch.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    { path: 'light-switch', component: LightSwitchComponent },
    { path: 'welcome', component: WelcomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
