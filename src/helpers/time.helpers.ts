import { range } from "@/utils"

export const daysOfWeekShort = ["M", "Tu", "W", "Th", "F", "Sa", "Su"]

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export function dayIndex(s: string) {
  return daysOfWeekShort.indexOf(s)
}

function numberToTime(x: number) {
  if (x < 0 || 23 < x) {
    throw Error("Invalid argument: must be between 0 and 23")
  } else {
    const h = Math.floor(x)
    const mm = Math.round((x - h) * 60)
    return `${h}:${mm.toString().padStart(2, "0")}`
  }
}

export function timeToNumber(s: string) {
  const [s1, s2] = s.split(":")
  const h = parseInt(s1, 10)
  const mm = parseInt(s2, 10)
  if (isNaN(h) || isNaN(mm) || h < 0 || 23 < h || mm < 0 || 59 < mm) {
    throw Error("Invalid argument: must be from 0:00 to 23:59")
  } else {
    return h + mm / 60
  }
}

export const timesData = range(8, 18.1, 0.25).map((v) => numberToTime(v))
