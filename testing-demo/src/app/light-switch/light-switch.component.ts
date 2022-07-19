import { Component } from '@angular/core';

@Component({
    selector: 'app-light-switch',
    templateUrl: './light-switch.component.html',
    styleUrls: ['./light-switch.component.css']
})
export class LightSwitchComponent {
    isOn = false;

    constructor() { }

    clicked(): void {
        this.isOn = !this.isOn;
    }

    get message() {
        return `The light is ${this.isOn ? 'on' : 'off' }`;
    }
}
