const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; /* logs the movie datat type */

// save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// updating the seat count & total
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // console.log(selectedSeats); counting Node List

  // Set to local storage blueprint:
  // 1. Copy selected seats into an array
  // 2. Map through the array
  //  3. Return a new array indexes
  // - use the spread operator to copy elements of the array
  // 4. save to local storage

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  // console.log(seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount); counting single seat numbers
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate the UI

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select - Event Listener
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Event Listener - Seat click event
container.addEventListener('click', (e) => {
  //   console.log(e.target);
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // console.log(e.target); click events are working on available seats
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});


