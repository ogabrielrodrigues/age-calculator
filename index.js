import { parse, intervalToDuration } from "https://esm.run/date-fns";

const day_container = document.querySelector("#container-dd");
const month_container = document.querySelector("#container-mm");
const year_container = document.querySelector("#container-yyyy");

const day_display = document.querySelector("#display-dd");
const month_display = document.querySelector("#display-mm");
const year_display = document.querySelector("#display-yyyy");

const day_input = document.querySelector("#container-dd input");
const month_input = document.querySelector("#container-mm input");
const year_input = document.querySelector("#container-yyyy input");

const calculate_button = document.querySelector("#calculate-button");

function calculateFullAge(dob) {
  const birthDate = parse(dob, "MM/dd/yyyy", new Date());
  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: new Date(),
  });
  return { years, months, days };
}

function checkDay() {
  const day = parseInt(day_input.value);

  if (isNaN(day)) {
    day_container.classList.add("error");
    day_container.querySelector("span").innerHTML = "Must be a valid day";
  } else {
    day_container.classList.remove("error");
  }

  if (day < 1 || day > 31) {
    day_container.classList.add("error");
    day_container.querySelector("span").innerHTML = "Must be a valid day";
  } else {
    day_container.classList.remove("error");
  }
}

function checkMonth() {
  const month = parseInt(month_input.value);

  if (isNaN(month)) {
    month_container.classList.add("error");
    month_container.querySelector("span").innerHTML = "Must be a valid month";
  } else {
    month_container.classList.remove("error");
  }
}

function checkYear() {
  const year = parseInt(year_input.value);

  if (isNaN(year)) {
    year_container.classList.add("error");
    year_container.querySelector("span").innerHTML = "Must be a valid year";
  } else {
    year_container.classList.remove("error");
  }
}

function calculateAge() {
  if (day_input.value.trim() === "") {
    day_container.classList.add("error");
    day_container.querySelector("span").innerHTML = "This field is required";
  } else {
    day_container.classList.remove("error");
  }

  if (month_input.value.trim() === "") {
    month_container.classList.add("error");
    month_container.querySelector("span").innerHTML = "This field is required";
  } else {
    month_container.classList.remove("error");
  }

  if (year_input.value.trim() === "") {
    year_container.classList.add("error");
    year_container.querySelector("span").innerHTML = "This field is required";
  } else {
    year_container.classList.remove("error");
  }

  const date = new Date(
    `${parseInt(day_input.value)}/${parseInt(month_input.value)}/${parseInt(
      year_input.value
    )}`
  );

  const userDate = date.toLocaleDateString({ region: "us" });

  const { days, months, years } = calculateFullAge(userDate);

  day_display.innerHTML = days;
  month_display.innerHTML = months;
  year_display.innerHTML = years;
}

day_input.addEventListener("keyup", checkDay);
month_input.addEventListener("keyup", checkMonth);
year_input.addEventListener("keyup", checkYear);
calculate_button.addEventListener("click", calculateAge);
