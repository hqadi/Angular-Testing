import { StringPipe } from './string.pipe';

describe('StringPipe', () => {
    let pipe = new StringPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should transform `abc` to `ABC` when operation is `uppercase`', () => {
        expect(pipe.transform('abc', 'uppercase')).toEqual('ABC');
    });

    it('should transform `aBC` to `abc` when operation is `lowercase`', () => {
        expect(pipe.transform('aBC', 'lowercase')).toEqual('abc');
    });

    it('should return the original value when operation is undefined', () => {
        expect(pipe.transform('abCC')).toEqual('abCC');
    });
});
