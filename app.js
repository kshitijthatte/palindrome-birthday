const reverseStr = (str) => {
  return str.split("").reverse().join("");
};

const isStringPalindrome = (str) => {
  return str == reverseStr(str);
};

const dateToString = (date) => {
  const dateInStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }
  dateInStr.year = date.year.toString();
  return dateInStr;
};

const getDateInAllFormats = (date) => {
  const dateStr = dateToString(date);

  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllDateFormats = (date) => {
  const dateList = getDateInAllFormats(date);
  let flag = false;
  for (let i = 0; i < dateList.length; i++) {
    if (isStringPalindrome(dateList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
};

const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month += 1;
    }
  }
  if (month > 12) {
    month = 1;
    year += 1;
  }
  return {
    day,
    month,
    year,
  };
};

const getNextPalindromeDate = (date) => {
  let nextDate = getNextDate(date);
  console.log(nextDate);
  let count = 0;
  while (1) {
    count++;

    if (checkPalindromeForAllDateFormats(nextDate)) {
      return [count, nextDate];
    }
    nextDate = getNextDate(nextDate);
  }
};

const date = {
  day: 31,
  month: 12,
  year: 2020,
};

const bday = document.querySelector("#bday-input");
const showbtn = document.querySelector("#show-btn");
const result = document.querySelector("#result");

showbtn.addEventListener("click", () => {
  const bdayStr = bday.value;
  if (bdayStr !== "") {
    const listDate = bdayStr.split("-");
    const date = {
      day: Number(listDate[2]),
      month: Number(listDate[1]),
      year: Number(listDate[0]),
    };
    if (checkPalindromeForAllDateFormats(date)) {
      result.innerText = "Yay! Your birthday is palindrome!";
    } else {
      const [count, nextDate] = getNextPalindromeDate(date);
      result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days`;
    }
  }
});
