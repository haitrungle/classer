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

function numberToTime(x: number) {
  if (x < 0 || 24 < x) {
    throw Error("Invalid argument: must be between 0 and 24")
  } else {
    const h = Math.floor(x)
    const mm = Math.round((x - h) * 60)
    return `${h}:${mm.toString().padStart(2, "0")}`
  }
}

export const timesData = range(8, 18.1, 0.25).map((v) => numberToTime(v))
