import { log } from "@graphprotocol/graph-ts"

const FIRST_DAY_OF_WEEK_INDEX = 0 // Sunday

export function firstDayOfWeek(date: Date): Date {
    const dayOfWeek = date.getUTCDay(),
        firstDayOfWeek = new Date(date.getTime()),
        diff = dayOfWeek >= FIRST_DAY_OF_WEEK_INDEX ?
            dayOfWeek - FIRST_DAY_OF_WEEK_INDEX :
            6 - dayOfWeek

    firstDayOfWeek.setUTCDate(date.getUTCDate() - diff)
    firstDayOfWeek.setUTCHours(0)

    return firstDayOfWeek
}

export function lastDayOfWeek(date: Date): Date {
    const dayOfWeek = date.getUTCDay(),
        lastDayOfWeek = new Date(date.getTime()),
        diff = dayOfWeek >= FIRST_DAY_OF_WEEK_INDEX ?
            6 - dayOfWeek :
            FIRST_DAY_OF_WEEK_INDEX - dayOfWeek - 1

    lastDayOfWeek.setUTCDate(date.getUTCDate() + diff)
    lastDayOfWeek.setUTCHours(23)
    lastDayOfWeek.setUTCMinutes(59)
    lastDayOfWeek.setUTCSeconds(59)
    lastDayOfWeek.setUTCMilliseconds(999)

    return lastDayOfWeek
}

export function getWeekOfYear(date: Date): i32 {
    const onejan = new Date(Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0));
    // log.info('getWeekOfYear | onejan: {}', [onejan.toISOString()])
    return i32(Math.ceil(i32(((date.getTime() - onejan.getTime()) / 86400000) + onejan.getUTCDay() + 1) / 7));
}

export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}