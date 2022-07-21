import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let userService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WelcomeComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [{ provide: UserService, useClass: MockUserService }],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UserService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('welcome should be `Please log in.` when isLoggedIn is false', () => {
        userService.isLoggedIn = false;
        component.ngOnInit();
        expect(component.welcome).toEqual('Please log in.');
    });

    it('welcome should be `Welcome {user name}!` when isLoggedIn is false', () => {
        userService.isLoggedIn = true;
        component.ngOnInit();
        expect(component.welcome).toEqual(`Welcome ${userService.user.name}!`);
    });

    it('goToLightSwitch() should call router.navigate() with the correct parameter', () => {
        const router = TestBed.inject(Router);
        spyOn(router, 'navigate');
        component.goToLightSwitch();
        expect(router.navigate).toHaveBeenCalledOnceWith(['light-switch']);
    });

    it('goToLightSwitch() should be called on button click', () => {
        spyOn(component, 'goToLightSwitch');
        const button: HTMLElement = fixture.nativeElement.querySelector('button');
        button?.click();
        expect(component.goToLightSwitch).toHaveBeenCalled();
    });
});

class MockUserService {
    isLoggedIn = false;
    user = { name: 'Tom from mock service' };
}
