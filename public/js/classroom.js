document.addEventListener("DOMContentLoaded", function () {
  initDetails();
  initBooking();
});

// selecting globals
const bookingModal = document.getElementById("booking-modal");
const modalText = document.getElementById("modalText");
const yesButton = document.getElementById("m-confirmBtn");
const noButton = document.getElementById("m-cancelBtn");

let selectedSeatNumber = null;
let selectedDate = null;

// define month array
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function initDetails() {
  // get reference for dom elements
  const dateContainer = document.getElementById("date-container");
  const monthYearDisplay = document.getElementById("current-month-year");
  // get date properties
  const { currentDate, firstDay, daysInMonth, currentMonth, currentYear } =
    getCurrentMonthYear();

  // Update month and year display
  monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  //  draw calender
  const fragment = drawCalendar(currentDate, firstDay, daysInMonth);
  dateContainer.innerHTML = "";
  dateContainer.appendChild(fragment);
  // for selecting and deselecting the date
  const dates = document.querySelectorAll(".date");
  const todayDate = document.querySelector(".date.selected-date");
  // format date
  let inputDate = calculateDateInput(currentYear, currentMonth, todayDate);
  // function to send socket event
  getAvailableSeat(inputDate);

  Array.from(dates).forEach((date) => {
    date.addEventListener("click", function (e) {
      selectDate(date, todayDate);
      inputDate = calculateDateInput(currentYear, currentMonth, date);
      // finction to send socket event
      getAvailableSeat(inputDate);
    });
  });
}

// curent date properties
function getCurrentMonthYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  return { currentDate, firstDay, daysInMonth, currentMonth, currentYear };
}

// create empty divs

function createDiv(classes = []) {
  const div = document.createElement("div");
  div.classList.add(...classes);
  return div;
}
// attach empty divs when days start doesn't start from sunday
function createEmptyDays(row, firstDay, fragment) {
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = createDiv(["c-btn", "empty-date"]);
    row.appendChild(emptyDiv);
  }
  fragment.appendChild(row);
}

function drawCalendar(currentDate, firstDay, daysInMonth) {
  // using DocumentFragment to minimize reflows
  const fragment = document.createDocumentFragment();
  let currentRow = createDiv(["d-flex", "date-row"]);

  // Add empty divs for the days before the 1st of the month
  createEmptyDays(currentRow, firstDay, fragment);

  // Generate the actual days in the calendar
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = createDiv(["c-btn", "date"]);
    dayDiv.textContent = day;

    // Highlight the current day
    if (day === currentDate.getDate()) {
      dayDiv.classList.add("selected-date");
    }

    currentRow.appendChild(dayDiv);

    // If the row completes 7 days
    //   append the row and start a new one

    if ((firstDay + day) % 7 === 0) {
      fragment.appendChild(currentRow);
      currentRow = createDiv(["d-flex", "date-row"]);
    }
  }

  // Append the last row if it has remaining days
  if (currentRow.children.length > 0) {
    fragment.appendChild(currentRow);
  }

  return fragment;
}

function calculateDateInput(currentYear, month, date) {
  const formattedMonth = (month + 1).toString().padStart(2, "0");
  const formattedDay = date.innerText.toString().padStart(2, "0");

  const inputDate = currentYear + "-" + formattedMonth + "-" + formattedDay;
  document.getElementById("dateInput").value = inputDate;
  return inputDate;
}

function deselectDate(dateElement) {
  if (dateElement) {
    dateElement.classList.remove("selected-date");
  }
}
// Function to handle the selection of a date
function selectDate(dateElement, todayDate) {
  deselectDate(selectedDate);
  deselectDate(todayDate, todayDate);

  dateElement.classList.add("selected-date");
  selectedDate = dateElement;
}

function updateSeatAnalysis(domElement, data) {
  domElement.children[0].innerText = `Total seat: ${data.socketData?.totalSeats}`;
  domElement.children[1].innerHTML = `<span class="box remaining-seat"></span>Available seat: ${data.socketData?.availableSeats}`;
  domElement.children[2].innerHTML = `<span class="box booked"></span>Booked Seat : ${
    data.socketData?.bookedSeats.length || 0
  }`;
  domElement.children[3].innerHTML = `<span class="box selected-seat"></span>Selected Seat : ${
    data.socketData?.selectedSeat || 0
  }`;
}

// modal script

function openModal() {
  console.log("open modal clikced");
  bookingModal.classList.add("show");
  bookingModal.children[0].classList.add("display");
}
function closeModal() {
  bookingModal.classList.remove("show");
  bookingModal.children[0].classList.remove("display");
}

noButton.addEventListener("click", function () {
  document.querySelector(".clicked-seat").classList.remove("clicked-seat");
  // close modal
  closeModal();
});
yesButton.addEventListener("click", closeModal);

// ========   for classroom seat
// for booked seat number
const bookedSeats = [1, 5, 10, 12];
let selectedSeat = null;

function initBooking() {
  const defaultData = {
    totalSeats: 36,
    availableSeats: 36,
    bookedSeats: [],
    selectedSeat: 0,
  };

  setupClassroom((totalSeats = 36), (seatsPerRow = 8), defaultData);
}

function addSeatEventListeners() {
  const seats = document.querySelectorAll(".seat");
  Array.from(seats).forEach((seat) => {
    seat.addEventListener("click", function () {
      selectSeat(seat);
      selectedSeatNumber = seat.getAttribute("data-seat-number");
      modalText.textContent = `Do you want to book Seat-${selectedSeatNumber} ?`;
      document.getElementById("seatInput").value = selectedSeatNumber;
      openModal();
    });
  });
}

function setupClassroom(totalSeats, seatsPerRow, data) {
  console.log("data----------", data.bookedSeats);

  const seatingArea = document.querySelector(".seating-area");
  seatingArea.innerHTML = "";

  // definig contants
  const rows = Math.ceil(totalSeats / seatsPerRow);
  const mid = Math.ceil(seatsPerRow / 2);

  createClassroom(
    rows,
    seatsPerRow,
    mid,
    totalSeats,
    data.bookedSeats,
    data.selectedSeat,
    seatingArea
  );
}

function createClassroom(
  rows,
  seatsPerRow,
  mid,
  totalSeats,
  bookedSeats,
  selectedSeat,
  seatingArea
) {
  let seatNumber = 1;

  for (let row = 1; row <= rows; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for (let seat = 1; seat <= seatsPerRow; seat++) {
      if (seat === mid + 1) {
        const gapDiv = document.createElement("div");
        gapDiv.classList.add("middle-gap");
        rowDiv.appendChild(gapDiv);
      }

      if (seatNumber <= totalSeats) {
        const seatDiv = document.createElement("div");
        seatDiv.classList.add("seat");
        seatDiv.textContent = `s-${seatNumber}`;
        seatDiv.setAttribute("data-seat-number", seatNumber);
        rowDiv.appendChild(seatDiv);

        // for booked seats
        if (bookedSeats.includes(seatNumber)) {
          seatDiv.classList.add("booked");
        }
        if (seatNumber == selectedSeat) {
          seatDiv.classList.add("selected-seat");
          seatDiv.style.pointerEvents = "none";
        }

        seatNumber++;
      }
    }
    // seatingArea.innerHTML = "";
    seatingArea.appendChild(rowDiv);
  }
  addSeatEventListeners();
}

// Function to create a middle gap div
function createMiddleGap() {
  const gapDiv = document.createElement("div");
  gapDiv.classList.add("middle-gap");
  return gapDiv;
}

// for selecting and deselecting the seats

// Function to handle seat selection
function selectSeat(seat) {
  // Deselect the previously selected seat if it exists
  if (selectedSeat) {
    updateSeatState(selectedSeat, false);
  }

  // Select the current seat
  updateSeatState(seat, true);
  selectedSeat = seat;
}

// Function to update the visual state of a seat
function updateSeatState(seat, isSelected) {
  if (isSelected) {
    seat.classList.add("clicked-seat");
  } else {
    seat.classList.remove("clicked-seat");
  }
}
