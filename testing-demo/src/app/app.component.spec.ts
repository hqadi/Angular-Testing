import { Component, DebugElement, Directive, HostListener, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let linkDes: DebugElement[];
    let routerLinks: RouterLinkStubDirective[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent, 
                BannerStubComponent, 
                RouterOutletStubComponent,
                RouterLinkStubDirective,
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
        routerLinks = linkDes.map(de => de.injector.get(RouterLinkStubDirective));
        fixture.detectChanges();
    });


    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'testing-demo'`, () => {
        expect(component.title).toEqual('testing-demo');
    });

    it('should render title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('#title')?.textContent).toContain('testing-demo app is running!');
    });

    it('should have app-banner', () => {
        const banner = fixture.nativeElement.querySelector('app-banner');
        expect(banner).toBeTruthy();
    });

    it('should have router-outlet', () => {
        const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
        expect(routerOutlet).toBeTruthy();
    });

    it('can get router links from template', () => {
        expect(routerLinks.length).toEqual(3);
        expect(routerLinks[0].linkParams).toEqual('light-switch');
        expect(routerLinks[1].linkParams).toEqual('welcome');
        expect(routerLinks[2].linkParams).toEqual('dashboard');
    });

    it('can click links in template', () => {
        const linkDe = linkDes[0];
        const routerLink = routerLinks[0];
        expect(routerLink.navigatedTo).toBeNull();
        linkDe.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(routerLink.navigatedTo).toEqual('light-switch');
    });
});

@Component({
    selector: 'app-banner',
    template: '',
})
class BannerStubComponent {}

@Component({
    selector: 'router-outlet',
    template: '',
})
class RouterOutletStubComponent {}

@Directive({
    selector: '[routerLink]'
})
class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    @HostListener('click')
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

