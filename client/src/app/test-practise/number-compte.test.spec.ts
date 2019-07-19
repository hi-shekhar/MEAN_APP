import { numberCompute } from './number-compte.test';

/**
 * fdescribe and fit causes only functions marked this way to run
xdescribe and xit causes all but functions marked this way to run
 */

// Test suite -- gropu of related test cases
xdescribe('numberCompute', () => {

    // test
    it('It should return NaN for string value', () => {
        const result = numberCompute('not number');
        expect(result).toBeNaN();
    });

    it('It should return two times of even value', () => {
        const result = numberCompute(10);
        expect(result).toBe(20);
    });

    xit('It should return two times of even string value', () => {
        const result = numberCompute('10');
        expect(result).toBe(20);
    });

    it('It should return three times of  odd value', () => {
        const result = numberCompute(11);
        expect(result).toBe(33);
    });

    xit('It should return three times of  odd value', () => {
        const result = numberCompute('11');
        expect(result).toBe(33);
    });
});
