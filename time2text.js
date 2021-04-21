'use strict'

/*
-split up string based on colon
-convert minutes into integer

MINUTES

0 = "hour" oclock
5 = 5 past the hour
10 = 10 past the hour
15 = quarter past the hour
20 = 20 past the hour
30 = half past the hour
0 < 5 && 5 < 10 = oh minutes
40 = 20 to the hour (hour + 1)
45 = quarter to (hour + 1)
50 = 10 to the hour (hour + 1)
55 = 5 to the hour (hour + 1)
none of these = minutes

HOURS
before noon = "in the morning"
noon = "noon"
noon - 6 PM = "in the afternoon"
6 pm - midnight = " in the evening"
midnight = "midnight"

*/

function time2text(time) {
  let splitTime = time.split(":")
  let numMinutes = Number(splitTime[1])
  let numHour = Number(splitTime[0])

  let minutes = convertMinutesToText(numMinutes)
  let hour = convertHoursToText(numHour, numMinutes)
  let endStr = convertHoursToString(numHour, numMinutes)

  if (numMinutes === 0) {
    if (hour.includes("midnight") || hour.includes("noon")) {
      return `${hour}`;
    }
    return `${hour} o'clock ${endStr}`;
  } else if (numMinutes === 5 || numMinutes === 10 || numMinutes === 20) {
    if (hour.includes("midnight") || hour.includes("noon")) {
      return `${minutes} past ${hour}`;
    }
    return `${minutes} past ${hour} ${endStr}`;
  } else if (numMinutes === 15) {
    if (hour.includes("midnight") || hour.includes("noon")) {
      return `quarter past ${hour}`;
    }
    return `quarter past ${hour} ${endStr}`
  }
  else if (numMinutes === 30) {
    if (hour.includes("midnight") || hour.includes("noon")) {
      return `half past ${hour}`;
    }
    return `half past ${hour} ${endStr}`;
  } else if (numMinutes < 10 && numMinutes !== 5) {
    return `${hour} oh ${minutes} ${endStr}`
  } else if (numMinutes === 40) {
    if (hour.includes("midnight") || hour.includes("noon")) {
      return `twenty to ${hour}`;
    }
    return `twenty to ${hour} ${endStr}`
  } else if (numMinutes === 45) {
      if (hour.includes("midnight") || hour.includes("noon")) {
          return `quarter to ${hour}`;
      }
      return `quarter to ${hour} ${endStr}`;
  }
  else if (numMinutes === 50) {
    if (hour.includes("midnight") || hour.includes("noon")) {
      return `ten to ${hour}`;
    }
    return `ten to ${hour} ${endStr}`;
  }
  else if (numMinutes === 55) {
    if (hour.includes("midnight") || hour.includes("noon")) {
      return `five to ${hour}`;
    }
    return `five to ${hour} ${endStr}`;
  } else {
    return hour + " " + minutes + " " + endStr;
  }
  //minutes

  //   0 = "hour" oclock
  // 5 = 5 past the hour
  // 10 = 10 past the hour
  // 15 = quarter past the hour
  // 20 = 20 past the hour
  // 30 = half past the hour
  // 0 < 5 && 5 < 10 = oh minutes
  // 40 = 20 to the hour (hour + 1)

  // 45 = quarter to (hour + 1)
  // 50 = 10 to the hour (hour + 1)
  // 55 = 5 to the hour (hour + 1)
  // none of these = minutes
  // if (minutes === "00") {
}

function convertMinutesToText(num) {
    let onesDigit = 0
    let tensDigit = 0

    onesDigit = num % 10
    tensDigit = Math.floor(num - onesDigit);
    let result = ""

    let firstHalf = {
      0: "oh",
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
      10: "ten",
      11: "eleven",
      12: "twelve",
      13: "thirteen",
      14: "fourteen",
      15: "fifteen",
      16: "sixteen",
      17: "seventeen",
      18: "eighteen",
      19: "nineteen"
    }

    let secondHalf = {
      20: "twenty",
      30: "thirty",
      40: "fourty",
      50: "fifty"
    }

    if (firstHalf[num]) {
      return firstHalf[num]
    } else if (secondHalf[num]) {
      return secondHalf[num]
    } else {
      return secondHalf[tensDigit] + "-" + firstHalf[onesDigit]
    }
}

function convertHoursToText(hour, min) {

  if (min === 40 || min === 45 || min === 50 || min === 55) {
    hour += 1
  }

  let dic = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve"
  }
  let special = [0, 5, 10, 15, 20, 30, 40, 45, 50, 55];

  if (hour === 24 || hour === 0) {
    if (special.includes(min)) {
      return "midnight"
    }
    return "twelve"
  } else if (hour === 12) {
    if (special.includes(min)) {
      return "noon"
    }
    return "twelve"
  } else {
    hour = hour > 12 ? hour - 12 : hour;
    return dic[hour]
  }
}

function convertHoursToString(hour, min) {
  /*
  HOURS
  before noon = "in the morning"
  noon = "noon"
  noon - 6 PM = "in the afternoon"
  6 pm - midnight = " in the evening"
  midnight = "midnight"
  */
  if (min === 40 || min === 45 || min === 50 || min === 55) {
    hour += 1
  }

  if (hour > 24) {
    hour = 0
  }

  if (hour < 12) { return "in the morning" }
  else if (hour >= 12 && hour < 18) { return "in the afternoon" }
  else { return "in the evening" }
}

module.exports = time2text
