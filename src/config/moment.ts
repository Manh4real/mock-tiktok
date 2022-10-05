import moment from "moment"

moment.locale('vn');

moment.updateLocale('vn', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: '1s',
        ss: '%ds',
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        w: "1w",
        ww: "%dw",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }
});

export const fromNow = (time: number | string) => {
    return moment(time).fromNow();
}