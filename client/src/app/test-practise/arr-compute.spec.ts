import { NumStrArray } from './arr-compute';

describe('NumStrArray', () => {
    let _numStrAyy: NumStrArray;
    // Run some shared setup before each of the specs in the describe in which it is called
    beforeEach(() => {
        _numStrAyy = new NumStrArray();
    });

    it('It should return array of numbers', () => {
        const arr = _numStrAyy.getNumArr();
        expect(arr).toBeTruthy(Array.isArray(arr) === true);
    });

    it('It should return array of string', () => {
        const strarr = _numStrAyy.getStrArr();
        expect(strarr).toBeTruthy(Array.isArray(strarr) === true);
    });

    it('It should push value in  array of numbers', () => {
        _numStrAyy.addNumber(10);
        const len = _numStrAyy.numArr.length;
        expect(_numStrAyy.numArr[len - 1]).toBe(10);
    });

    it('It should push value in  array of string', () => {
        _numStrAyy.addString('z');
        const len = _numStrAyy.strArr.length;
        expect(_numStrAyy.strArr[len - 1]).toBe('z');
    });
});
