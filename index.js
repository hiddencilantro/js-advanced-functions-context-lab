function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    return arr.map(infoArray => createEmployeeRecord(infoArray));
}

function createTimeInEvent(datestamp) {
    const [date, hour] = datestamp.split(' ');
    const timeInObject = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };
    this.timeInEvents.push(timeInObject);
    return this;
}

function createTimeOutEvent(datestamp) {
    const [date, hour] = datestamp.split(' ');
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };
    this.timeOutEvents.push(timeOutObject);
    return this;
}

function hoursWorkedOnDate(dateInput) {
    const timeIn = this.timeInEvents.find(element => element.date === dateInput);
    const timeOut = this.timeOutEvents.find(element => element.date === dateInput);
    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour)/100;
    };
}

function wagesEarnedOnDate(dateInput) {
    return parseFloat(hoursWorkedOnDate.call(this, dateInput) * this.payPerHour);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(element => element.firstName === firstName);
}

function calculatePayroll(arr) {
    return arr.reduce((totalPay, currentValue) => totalPay + allWagesFor.call(currentValue), 0);
}
