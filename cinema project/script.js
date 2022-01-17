"use strict";
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectELementMovie = document.querySelector('#movie');

let ticketPrice = +selectELementMovie.value;
container.addEventListener('click' , e => {
     if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
         e.target.classList.toggle('selected');
         updateSelectedCount();
     }
})

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    count.innerHTML = selectedSeats.length
    total.innerHTML = count.innerHTML * ticketPrice;

    // an array to collect the indexes of the seats;
    const arr = [];

    // new array and loop to convert the nodeList to normal array so we don't have to use spread op;
    const res = [];
    for (let i = 0 ; i<seats.length ; i++){
        const element = seats[i];
        res.push(element)
    }

    //looping the selected seats and pushing their indexes to the new array based on the converted array;
    for(let j = 0 ; j< selectedSeats.length ; j++){
        const element = selectedSeats[j];
        arr.push(res.indexOf(element))
    }
    localStorage.setItem('selectedSeats' , JSON.stringify(arr));

}

selectELementMovie.addEventListener('change', e=> {
    ticketPrice = +e.target.value;
    console.log(e.target.selectedIndex); 
    updateSelectedCount()
    setMovieData(e.target.selectedIndex , e.target.value)
})

function setMovieData(movieIdx , moviePrice){
    localStorage.setItem('selectedMovie' ,movieIdx);
    localStorage.setItem('selectedMoviePrice' , moviePrice);
}

function getData(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats[0]){

        for(let i = 0 ; i < seats.length; i++){
            const seat = seats[i];
            for(let idx = 0 ; idx< selectedSeats.length; idx++){
                const selectedSeat = selectedSeats[idx];
                if (i === selectedSeat){
                    seat.classList.add('selected')
                }
            }
        }

        const selectedMovieIdx = localStorage.getItem('selectedMovie');
        if (selectedMovieIdx){
            selectELementMovie.selectedIndex = selectedMovieIdx;
            count.innerHTML = selectedSeats.length;
            total.innerHTML = selectedSeats.length * selectELementMovie.value;
        }


    }
}
getData()
