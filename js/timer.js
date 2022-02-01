let UTC = 3; // Московское время

// Получаем текущую дату и переводим сразу в указанный часовой пояс (по умолчанию: Москва)
function getCurrentTime(UTC = 3) {
    let currentDate = new Date(),
        currentTimestamp = currentDate.getTime(),
        currentTimestampByZone = (Math.floor(currentTimestamp / 1000) + (UTC * 60 * 60)) * 1000;

    return {
        date: currentDate,
        timestampZone: currentTimestampByZone,
        timezone: currentDate.getTimezoneOffset() / 60
    };
}

// Переводим указанную дату в секунды
function toTimestamp(year, month, day, hour, minute, second) {
    var datum = new Date(year, month - 1, day, hour, minute, second);
    return datum.getTime() / 1000;
}

// Форматируем время
function formatTime(hours, minutes, seconds, year = "", month = "", day = "") {
    let formatHours = (hours >= 24 ? "0" : "") + (hours >= 24 ? hours - 24 : hours),
        formatMin = (minutes < 10 ? '0' : '') + minutes,
        formatSec = (seconds < 10 && seconds !== "" ? '0' : '') + seconds,
        formatMonth = (month < 10 && month !== "" ? '0' : '') + month,
        formatDay = (day < 10 && day !== "" ? '0' : '') + day;

    return (formatDay !== "" ? formatDay + "." : "") + (formatMonth !== "" ? formatMonth + "." : "") + (year !== "" ? year + " " : "") + + formatHours + ":" + formatMin + ":" + formatSec;
}

function getDifferenceDate() {         
    let currentTime = getCurrentTime(UTC).date,
        newDate = new Date(time * 1000),
        diff = Math.abs(Math.floor((newDate - currentTime) / 1000)),
        daysLeft = Math.floor(diff / (24 * 60 * 60)),
        secLeft = diff - daysLeft * 24 * 60 * 60,
        text = "Осталось до указанной даты";

    let hoursLeft = Math.floor(secLeft / (60 * 60));
    secLeft = secLeft - hoursLeft * 60 * 60;

    let minLeft = Math.floor(secLeft / 60);
    secLeft = secLeft - minLeft * 60;

    if (newDate <= currentTime) {
        text = "Прошло с указанной даты";
    }
    
    document.getElementById('timer').innerHTML = text + ": " + daysLeft + "d " + formatTime(hoursLeft, minLeft, secLeft);
}

let currentDate = new Date(getCurrentTime(UTC).timestampZone);
let time = toTimestamp(2022, 2, 1, 17, 5, 0);
let getDate = new Date((time + (UTC * 60 * 60)) * 1000);

document.getElementById('msk').innerHTML = formatTime(currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, currentDate.getUTCDate());
document.getElementById('custom').innerHTML = formatTime(getDate.getUTCHours(), getDate.getUTCMinutes(), getDate.getUTCSeconds(), getDate.getUTCFullYear(), getDate.getUTCMonth() + 1, getDate.getUTCDate());

var timerId = setInterval(getDifferenceDate, 1000);