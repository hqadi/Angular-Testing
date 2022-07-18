import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
    let service: MasterService;
    let valueServiceSpy: jasmine.SpyObj<ValueService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('ValueService', ['getValue']);
        TestBed.configureTestingModule({
            providers: [{ provide: ValueService, useValue: spy }],
        });
        service = TestBed.inject(MasterService);
        valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    });

    it('should be created', () => {
        // service = new MasterService(new ValueService());
        expect(service).toBeTruthy();
    });
    it('getValue() should return value from service', () => {
        valueServiceSpy.getValue.and.returnValue('value');
        expect(service.getValue()).toBe('value');
    });

    // it('getValue() should return `real value` from the real service', () => {
    //     service = new MasterService(new ValueService());
    //     expect(service.getValue()).toBe('real value');
    // });

    // it('getValue() should return `fake service value` from the fake service', () => {
    //     service = new MasterService(new FakeValueService() as ValueService);
    //     expect(service.getValue()).toBe('fake service value');
    // });

    // it('getValue() should return `fake object value` from fake object', () => {
    //     const fakeObj = { getValue: () => 'fake object value' };
    //     service = new MasterService(fakeObj as ValueService);
    //     expect(service.getValue()).toBe('fake object value');
    // });

    // it('getValue() should return `stub value` from spy', () => {
    //     const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    //     valueServiceSpy.getValue.and.returnValue('stub value');
    //     service = new MasterService(valueServiceSpy);
    //     expect(service.getValue()).withContext('service returned stub value').toBe('stub value');
    //     expect(valueServiceSpy.getValue.calls.count()).toBe(1);
    //     expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe('stub value');
    // });

    // it('getValue() should call valueService.getValue()', () => {
    //     const valueService = new ValueService();
    //     service = new MasterService(valueService);
    //     // const serviceSpy = spyOn(valueService, 'getValue');
    //     spyOn(valueService, 'getValue');
    //     service.getValue();
    //     // expect(serviceSpy).toHaveBeenCalled();
    //     expect(valueService.getValue).toHaveBeenCalled();
    // });
});

class FakeValueService {
    getValue(): string {
        return 'fake service value';
    }
}
