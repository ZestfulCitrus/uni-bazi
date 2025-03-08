export function formatTimestamp(timestamp:number) {
    const date = new Date(timestamp);
    return[
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
        date.getHours()
    ].join('-')
}

export function formatTimestampDisplay(timestamp:number) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日${date.getHours()}时`
}