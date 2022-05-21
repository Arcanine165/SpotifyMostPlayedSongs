import { getArtistTopTracks,getArtistInfo } from "./getTopTracks.js";

const artista = document.querySelector('#form');
const input = document.querySelector('#buscar');
const ctx = document.getElementById('myCanvas').getContext('2d');
let tracks;
let data  = [];
let labels = [];
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Popularity',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

artista.addEventListener('submit',async (e)=> {
    e.preventDefault();
    removeData(chart)
    const whiteSpaces = /  +/g;
    const artist = input.value.trim().replace(whiteSpaces,'+');
    tracks = await getArtistTopTracks(artist);
    
    console.log(tracks)
    labels = tracks.map(track => track.name);
    data = tracks.map(track => track.popularity);
    addData(chart,labels,data)
    chart.update();
    
})


function addData(chart, label, data) {
    chart.data.labels = label
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function createArtistCard(){
    
}