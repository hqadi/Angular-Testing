import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LightSwitchComponent } from './light-switch.component';

describe('LightSwitchComponent', () => {
    let component: LightSwitchComponent;
    let fixture: ComponentFixture<LightSwitchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LightSwitchComponent],
            imports: [FormsModule],
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

    it('should convert name to title case', () => {
        const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
        const nameDisplay: HTMLElement = fixture.nativeElement.querySelector('div.text-success');
        nameInput.value = 'new value';
        // console.log('name:', component.name);
        nameInput.dispatchEvent(new Event('input'));
        // console.log('name:', component.name);
        // console.log('displayed name:', nameDisplay?.textContent);
        fixture.detectChanges();
        // console.log('displayed name:', nameDisplay?.textContent);
        expect(nameDisplay?.textContent).toEqual('New Value');
    });
});
