import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];
    let bareH2: DebugElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [HighlightDirective, TestComponent],
        }).createComponent(TestComponent);
        fixture.detectChanges();
        des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
        bareH2 = fixture.debugElement.query(By.css('h2:not([appHighlight])'));
    });

    it('should have three highlighted elements', () => {
        expect(des.length).toEqual(3);
    });

    it('1st h2 should have yellow background', () => {
        const bgColor = des[0].nativeElement.style.backgroundColor;
        expect(bgColor).toEqual('yellow');
    });

    it('2nd h2 should have default background', () => {
        const highlightDirective = des[1].injector.get(HighlightDirective);
        const bgColor = des[1].nativeElement.style.backgroundColor;
        expect(bgColor).toEqual(highlightDirective.defaultColor);
    });

    it('should bind input background to value color', () => {
        const input: HTMLInputElement = des[2].nativeElement;
        expect(input.style.backgroundColor).toEqual('cyan');
        input.value = 'green';

        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.style.backgroundColor).toEqual('green');
    });

    it('bare h2 should not have customProperty', () => {
        expect(bareH2.nativeElement.style.customProperty).toBeUndefined();
    });

    it('h2 with directive should have customProperty = true', () => {
        expect(des[1].nativeElement.style.customProperty).toBeTrue();
    });
});

@Component({
    template: `
    <h2 appHighlight="yellow">Yellow</h2>
    <h2 appHighlight>Default</h2>
    <h2>No highlight</h2>
    <input #box [appHighlight]="box.value" type="text" value="cyan"/>
    `
})
class TestComponent {}
