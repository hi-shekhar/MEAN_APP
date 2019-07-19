export function numberCompute(num): any {

    // check input is number of not
    if (Number(num) === NaN) {
        // isNumFlag = false;
        return num;
    } else {
        // for event number
        if (num % 2 === 0) {
            return num * 2;
        } else {
            return num * 3;
        }
    }

}
