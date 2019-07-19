export class NumStrArray {
    public numArr = [1, 2, 3, 4, 5];
    public strArr = ['a', 's', 'd', 'f', 'g'];

    public getNumArr() {
        return this.numArr;
    }
    public addNumber(num) {
        if (Number(num) === NaN) {
            return NaN;
        } else {
            return this.numArr.push(num);
        }
    }

    public getStrArr() {
        return this.numArr;
    }
    public addString(str) {

     return this.strArr.push(str);

    }


}
