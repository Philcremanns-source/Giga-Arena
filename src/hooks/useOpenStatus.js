import { useEffect, useState } from 'react'

const WEEKDAY = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

function computeEaster(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31) // 3=March, 4=April
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return { year, month, day }
}

function berlinNowParts() {
  const fmt = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'short',
    hour12: false,
  })
  const parts = fmt.formatToParts(new Date())
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]))
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  }
}

function toDateUTC({ year, month, day }) {
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
}

function addDaysUTC(dateUtc, deltaDays) {
  const d = new Date(dateUtc)
  d.setUTCDate(d.getUTCDate() + deltaDays)
  return d
}

function isoDateKey(dateUtc) {
  const y = dateUtc.getUTCFullYear()
  const m = String(dateUtc.getUTCMonth() + 1).padStart(2, '0')
  const d = String(dateUtc.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function holidayMap(year) {
  const easter = computeEaster(year)
  const easterUtc = toDateUTC(easter)
  const holidays = [
    { name: 'Neujahr', dateUtc: toDateUTC({ year, month: 1, day: 1 }) },
    { name: 'Karfreitag', dateUtc: addDaysUTC(easterUtc, -2) },
    { name: 'Ostersonntag', dateUtc: addDaysUTC(easterUtc, 0) },
    { name: 'Ostermontag', dateUtc: addDaysUTC(easterUtc, 1) },
    { name: 'Tag der Arbeit', dateUtc: toDateUTC({ year, month: 5, day: 1 }) },
    { name: 'Christi Himmelfahrt', dateUtc: addDaysUTC(easterUtc, 39) },
    { name: 'Pfingstsonntag', dateUtc: addDaysUTC(easterUtc, 49) },
    { name: 'Pfingstmontag', dateUtc: addDaysUTC(easterUtc, 50) },
    { name: 'Fronleichnam', dateUtc: addDaysUTC(easterUtc, 60) },
    { name: 'Tag der Einheit', dateUtc: toDateUTC({ year, month: 10, day: 3 }) },
    { name: 'Allerheiligen', dateUtc: toDateUTC({ year, month: 11, day: 1 }) },
    { name: 'Heiligabend', dateUtc: toDateUTC({ year, month: 12, day: 24 }) },
    { name: '1. Weihnachtstag', dateUtc: toDateUTC({ year, month: 12, day: 25 }) },
    { name: '2. Weihnachtstag', dateUtc: toDateUTC({ year, month: 12, day: 26 }) },
    { name: 'Silvester', dateUtc: toDateUTC({ year, month: 12, day: 31 }) },
  ]
  return new Map(holidays.map((h) => [isoDateKey(h.dateUtc), h.name]))
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

function fmtTime(h, m) {
  return `${pad2(h)}:${pad2(m)}`
}

function getScheduleForWeekday(weekdayIndex) {
  // 0=Sonntag .. 6=Samstag
  if (weekdayIndex === 5 || weekdayIndex === 6) {
    return { openH: 12, openM: 0, closeH: 1, closeM: 0, crossesMidnight: true }
  }
  return { openH: 13, openM: 0, closeH: 23, closeM: 0, crossesMidnight: false }
}

function isOpenAt(parts) {
  const weekdayIndex = new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay()
  const schedule = getScheduleForWeekday(weekdayIndex)
  const minutes = parts.hour * 60 + parts.minute
  const openMinutes = schedule.openH * 60 + schedule.openM
  const closeMinutes = schedule.closeH * 60 + schedule.closeM

  if (!schedule.crossesMidnight) {
    return minutes >= openMinutes && minutes < closeMinutes
  }

  // Fri/Sat: 12:00 - 01:00 (next day)
  if (minutes >= openMinutes) return true
  if (minutes < closeMinutes) return true
  return false
}

function nextOpen(parts) {
  for (let delta = 0; delta < 8; delta += 1) {
    const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 0, 0, 0))
    date.setUTCDate(date.getUTCDate() + delta)
    const weekdayIndex = date.getUTCDay()
    const schedule = getScheduleForWeekday(weekdayIndex)
    const isSameDay = delta === 0

    if (isSameDay) {
      const minutes = parts.hour * 60 + parts.minute
      const openMinutes = schedule.openH * 60 + schedule.openM
      if (schedule.crossesMidnight) {
        if (minutes < openMinutes && minutes >= schedule.closeH * 60 + schedule.closeM) {
          return {
            weekdayIndex,
            openH: schedule.openH,
            openM: schedule.openM,
          }
        }
      } else if (minutes < openMinutes) {
        return { weekdayIndex, openH: schedule.openH, openM: schedule.openM }
      }
    } else {
      return { weekdayIndex, openH: schedule.openH, openM: schedule.openM }
    }
  }
  return { weekdayIndex: 0, openH: 13, openM: 0 }
}

function closeTime(parts) {
  const weekdayIndex = new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay()
  const schedule = getScheduleForWeekday(weekdayIndex)
  if (schedule.crossesMidnight && parts.hour < schedule.closeH) {
    return { h: schedule.closeH, m: schedule.closeM }
  }
  return { h: schedule.closeH, m: schedule.closeM }
}

function computeStatus() {
  const parts = berlinNowParts()
  const y = parts.year
  const todayUtc = toDateUTC({ year: y, month: parts.month, day: parts.day })
  const holidays = holidayMap(y)
  const holidayName = holidays.get(isoDateKey(todayUtc)) || null

  const open = isOpenAt(parts)
  const close = closeTime(parts)

  if (holidayName) {
    if (holidayName === 'Heiligabend') {
      const isOpen = parts.hour < 14
      return {
        state: 'HOLIDAY',
        text: `Heute Feiertag: Heiligabend · ${isOpen ? 'Geöffnet bis 14:00 Uhr' : 'Geschlossen'}`,
        shortText: 'Feiertag',
      }
    }
    if (holidayName === '1. Weihnachtstag' || holidayName === '2. Weihnachtstag') {
      return {
        state: 'HOLIDAY',
        text: `Heute Feiertag: ${holidayName} · Geschlossen`,
        shortText: 'Feiertag',
      }
    }
    if (holidayName === 'Silvester') {
      return {
        state: open ? 'OPEN' : 'HOLIDAY',
        text: open
          ? `Jetzt geöffnet — Aachen, Holzgraben 11 · Noch bis ${fmtTime(close.h, close.m)} Uhr`
          : 'Heute Feiertag: Silvester · Öffnet um 12:00 Uhr',
        shortText: open ? 'Jetzt geöffnet' : 'Feiertag',
      }
    }
    return {
      state: 'HOLIDAY',
      text: `Heute Feiertag: ${holidayName}`,
      shortText: 'Feiertag',
    }
  }

  if (open) {
    return {
      state: 'OPEN',
      text: `Jetzt geöffnet — Aachen, Holzgraben 11 · Noch bis ${fmtTime(close.h, close.m)} Uhr`,
      shortText: 'Jetzt geöffnet',
    }
  }

  const next = nextOpen(parts)
  return {
    state: 'CLOSED',
    text: `Aktuell geschlossen · Öffnet wieder ${WEEKDAY[next.weekdayIndex]} um ${fmtTime(next.openH, next.openM)} Uhr`,
    shortText: 'Geschlossen',
  }
}

export function useOpenStatus() {
  const [status, setStatus] = useState(() => computeStatus())

  useEffect(() => {
    const t = setInterval(() => setStatus(computeStatus()), 60_000)
    return () => clearInterval(t)
  }, [])

  return status
}

