import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let h1: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BannerComponent],
            // providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        h1 = fixture.nativeElement.querySelector('h1');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display `banner works!`', () => {
        const bannerElement: HTMLElement = fixture.nativeElement;
        expect(bannerElement.textContent?.trim()).toContain('banner works!');
    });

    it('should have a paragraph element with content `banner works!`', () => {
        const bannerElement: HTMLElement = fixture.nativeElement;
        const paragraphElement = bannerElement.querySelector('p');
        expect(paragraphElement?.textContent).toContain('banner works!');
    });

    it('should have a paragraph element with content `banner works!`', () => {
        const bannerDe: DebugElement = fixture.debugElement;
        const paragraphDe: DebugElement = bannerDe.query(By.css('p'));
        expect(paragraphDe.nativeElement?.textContent).toContain('banner works!');
    });

    it('should have 2 paragraph elements', () => {
        const bannerElement: HTMLElement = fixture.nativeElement;
        const paragraphElements = bannerElement.querySelectorAll('p');
        expect(paragraphElements.length).toEqual(2);
        expect(paragraphElements[1].textContent?.trim()).toEqual('second paragraph');
    });

    it('should have a div with id = main', () => {
        const mainDiv = fixture.nativeElement.querySelector('div#main');
        expect(mainDiv?.textContent).toEqual('main div');
    });

    it('should have a div with id = main', () => {
        const mainDiv = fixture.debugElement.query(By.css('div#main'));
        expect(mainDiv?.nativeElement?.textContent).toEqual('main div');
    });

    it('should have a div with id = main', () => {
        const bannerDebugElement: DebugElement = fixture.debugElement;
        const mainDiv = bannerDebugElement.nativeElement.querySelector('div#main');
        expect(mainDiv?.textContent).toEqual('main div');
    });

    it('should display original title', () => {
        expect(h1?.textContent).toEqual(component.title);
    });

    it('should display a different title', () => {
        // console.log(h1?.textContent);
        // fixture.detectChanges();
        // console.log(h1?.textContent);
        component.title = 'new Title';
        // console.log(h1?.textContent);
        fixture.detectChanges();
        // console.log(h1?.textContent);
        expect(h1?.textContent).toEqual(component.title);
    });

    it('should display the old title', () => {
        const oldTitle = component.title;
        component.title = 'new Title';
        expect(h1?.textContent).toEqual(oldTitle);
    });
});
