import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CreateUserModel, List, UserFull, UserPreview } from '../models/users.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    // let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        // service = new UserService(httpClientSpy);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(UserService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // After each test, assert that there are no pending requests
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getUsers() should send a request to get a list of users', () => {
        const usersList: List<UserPreview> = {
            data: [{
                id: '1234',
                title: 'test title',
                firstName: 'first name',
                lastName: 'last name',
                picture: 'some picture',
            }],
            total: 1,
            page: 1,
            limit: 10,
        };
        service.getUsers().subscribe(response => expect(response).toEqual(usersList));
        const req = httpTestingController.expectOne(`${service.baseURL}/user?id=3`);
        expect(req.request.method).toEqual('GET');
        req.flush(usersList);
    });

    it('createUser() should send a request to create a user', () => {
        const payload: CreateUserModel = {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
        };
        const response: UserFull = {
            id: '12345',
            title: 'Ms',
            firstName: 'tt',
            lastName: 'tt',
            gender: 'tt',
            email: 'tt',
            dateOfBirth: 'tt',
            registerDate: 'rr',
            phone: '12457',
            picture: 'some picture',
            location: {},
        };
        service.createUser(payload).subscribe(res => expect(res).toEqual(response));
        const requests = httpTestingController.match(`${service.baseURL}/user/create`);
        expect(requests.length).toEqual(1);
        expect(requests[0].request.method).toEqual('POST');
        expect(requests[0].request.body).toEqual(payload);
        requests[0].flush(response);
    });

    it('can test for 404 error', () => {
        const errorMsg = 'deliberate 404 error';
        service.getUsers().subscribe(
            () => fail('should have failed with 404 message'),
            error => {
                expect(error.status).toEqual(404);
                expect(error.error).toEqual(errorMsg);
            }
        );
        const req = httpTestingController.expectOne(`${service.baseURL}/user?id=3`);
        req.flush(errorMsg, { status: 404, statusText: 'Not found' });
    });

    // it('getUsers() should return a list of users', (done: DoneFn) => {
    //     const usersList: List<UserPreview> = {
    //         data: [{
    //             id: '1234',
    //             title: 'test title',
    //             firstName: 'first name',
    //             lastName: 'last name',
    //             picture: 'some picture',
    //         }],
    //         total: 1,
    //         page: 1,
    //         limit: 10,
    //     };
    //     httpClientSpy.get.and.returnValue(of(usersList));

    //     service.getUsers().subscribe(
    //         usersData => {
    //             expect(usersData).toEqual(usersList);
    //             done();
    //         },
    //         () => done.fail()
    //     );
    //     console.log('here');
    //     expect(httpClientSpy.get.calls.count()).toEqual(1);
    // });

    // it('getUsers() should return an error when the server returns an error', (done: DoneFn) => {
    //     const errorResponse = new HttpErrorResponse({
    //         error: 'test 404 error',
    //         status: 404, 
    //         statusText: 'Not found',
    //     });
    //     httpClientSpy.get.and.returnValue(throwError(errorResponse));

    //     service.getUsers().subscribe(
    //         () => done.fail(),
    //         error => {
    //             expect(error.error).toEqual('test 404 error');
    //             done();
    //         },
    //     );       
    // });
});
