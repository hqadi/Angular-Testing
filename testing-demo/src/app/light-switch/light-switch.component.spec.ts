import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightSwitchComponent } from './light-switch.component';

describe('LightSwitchComponent', () => {
    let component: LightSwitchComponent;
    let fixture: ComponentFixture<LightSwitchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LightSwitchComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LightSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('clicked() should toggle isOn', () => {
        expect(component.isOn).toBeFalse();
        component.clicked();
        expect(component.isOn).toBeTrue();
        component.clicked();
        expect(component.isOn).toBeFalse();
    });

    it('clicked() should change message', () => {
        expect(component.message).toEqual('The light is off');
        component.clicked();
        expect(component.message).toEqual('The light is on');
    });
});
