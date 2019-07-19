import { tellTime } from './string-compute.test';

xdescribe('tellTime', () => {
    it('timer should say name with time', () => {
        const name = 'himanshu';
        const result = tellTime(name, true);
        expect(result).toContain(name);
    });

    it('timer should say name when 2nd param is not present', () => {
        const name = 'himanshu';
        const result = tellTime(name);
        expect(result).toContain(name);
    });

    it('timer should say name with time when 2nd param is true', () => {
        const name = 'himanshu';
        const result = tellTime(name, false);
        expect(result).toContain(name);
    });
});
