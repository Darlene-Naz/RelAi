const getDateTimeInFormat = (date, time) => {
    let dateArr = date.split('-');
    let timeArr = time.split(':');

    let months = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sept: 9,
        Oct: 1,
        Nov: 11,
        Dec: 12,
    }

    let retDate = new Date(Number(dateArr[2]), months[dateArr[0]] - 1, Number(dateArr[1]), Number(timeArr[0]), Number(timeArr[1]));
    return retDate;
}

export { getDateTimeInFormat };