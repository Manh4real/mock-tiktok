export function numberCompact(number: number | undefined) {
    if (number === undefined || number === null) return "--";

    if (number < 9999) return number;

    const a = ["", "K", "M", "B", "T"];
    const thou = Math.pow(10, 3);

    let temp = number;
    let affix = a[0];
    let i = 0;

    while (Math.floor(Math.abs(temp / thou)) > 0) {
        if (i >= a.length - 1) break;

        temp = temp / thou;
        affix = a[++i];
    }

    if (temp % 1 === 0) return temp + affix;

    return temp.toFixed(1) + affix;
}

export function formatTime(sec: number, compact: boolean = false) {
    const sec_num = sec;
    let hours: number | string = Math.floor(sec_num / 3600);
    let minutes: number | string = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds: number | string = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

    if (hours < 10 && hours > 0) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    if (hours === 0) return minutes + ":" + seconds;
    return hours + ':' + minutes + ':' + seconds;
}

export { default as toTag } from './toTag';