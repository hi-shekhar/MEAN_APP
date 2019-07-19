export function tellTime(name: string, hrs: boolean = false): any {
    const currentDate = new Date();

    if (hrs) {
        const currentHrs = currentDate.getHours();
        return `Hi ${name} hours is ${currentHrs}`;
    } else {
        return `Hi ${name} full date  is ${currentDate}`;
    }

}
