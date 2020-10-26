const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const ticketPrice = +movieSelect.value; /* logs the movie datat type */

// updating the seat count & total
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // console.log(selectedSeats); counting Node List
  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount); counting single seat numbers
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Event Listener
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
