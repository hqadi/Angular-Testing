import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
    let service: ValueService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ValueService);
        // service = new ValueService();
    });

    it('should be created', () => {
        // service = new ValueService();
        expect(service).toBeTruthy();
    });

    it('getValue() should return `real value`', () => {
        const returnedValue = service.getValue();
        expect(returnedValue).toBe('real value');
    });

    it('getObservableValue() should return `observable value` from an observable', (done: DoneFn) => {
        service.getObservableValue().subscribe(value => {
            expect(value).toBe('observable value');
            done();
        });
    });

    it('getPromiseValue() should return `promise value` from a promise', (done: DoneFn) => {
        service.getPromiseValue().then(value => {
            expect(value).toBe('promise value');
            done();
        });
    });

    it('getObservableDelayValue() should return `observable delay value` from an observable', (done: DoneFn) => {
        service.getObservableDelayValue().subscribe(value => {
            expect(value).toBe('observable delay value');
            done();
        });
    });

    it('setValue() should set value', () => {
        expect(service.value).toBe('real value');
        service.setValue('hala');
        expect(service.value).toBe('hala');
    });
});
