import { getArtistTopTracks,getArtistInfo } from "./getTopTracks.js";
import { commafy } from "./helpers/commify.js";

const artista = document.querySelector('#form');
const input = document.querySelector('#buscar');
const ctx = document.getElementById('myCanvas').getContext('2d');
const artistInfo = document.getElementById('artistInfo');
const myChart = document.querySelector('#chart');

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
                beginAtZero: true,
                ticks:{
                    color: 'white', beginAtZero: true 
                }
            },
            x:{
                ticks:{
                    callback: function(value){
                        const valueLegend = this.getLabelForValue(value);
                        return valueLegend.substring(0,10) + '...'
                    },
                    color: 'white', beginAtZero: true 
                }
            }
            
        },
        plugins:{
            legend: {
             display: true,
             color:'white'
            }
           }
    }
});

artista.addEventListener('submit',async (e)=> {
    

    e.preventDefault();
    myChart.classList.remove('none');
    myChart.classList.add('visible');
    removeData(chart)
    const whiteSpaces = /  +/g;
    const artist = input.value.trim().replace(whiteSpaces,'+');
    tracks = await getArtistTopTracks(artist);
    
    labels = tracks.map(track => track.name);
    data = tracks.map(track => track.popularity);
   
    addData(chart,labels,data)
    chart.update();
    createArtistCard(artist).then();
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

async function createArtistCard(name){
    const info = await getArtistInfo(name);
    const genres = info.genres.join();
    const followers = commafy(info.followers)
    artistInfo.classList.add('artistInfo')
    
    artistInfo.innerHTML = `<img src="${info.image.url}"/>
                            <div class="artist">
                                <h2>${info.name}</h2>
                                <h3>Generos: ${genres}</h3>
                                <p>Followers: ${followers}</p>
                                <a target="_blank" href="${info.externalUrl}" class="btn btn-success">Escuchar en spotify!</a>
                            </div>
    
    `
}