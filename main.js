/*
Consegna:
Dato un array di oggetti letterali con:
 - url dell'immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Consiglio: gestite bene il tempo. si può sempre tornare in seguito a migliorare la grafica, ma dedicargli molto tempo da subito può farvi rimanere indietro.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l'array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l'immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l'immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/

// DICHIARO L'ARRAY DI SLIDES
const images = [
    {
        image: 'img 2/01.webp',
        title: "Marvel's Spiderman Miles Morale",
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    },
    {
        image: 'img 2/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    },
    {
        image: 'img 2/03.webp',
        title: 'Fortnite',
        text: 'Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.',
    },
    {
        image: 'img 2/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    },
    {
        image: 'img 2/05.webp',
        title: "Marvel's Avengers",
        text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
    },
];


// creo lo slider-items di destra
const sliderContainerRight = document.querySelector('.slider-items');

// carico le nuove immagini a destra
for (let i = 0; i < images.length; i++) {
    const imageS = images[i];
    const sliderItem = `<div class="item"><img src="${imageS.image}" alt=""></div>`;
    sliderContainerRight.innerHTML += sliderItem;
    console.log(sliderContainerRight);
}


// faccio mostrare le img una alla volta mettendo la classe active
// prendo item dal Html e lo metto in JS con inglobatto in una nuova variabile
let rowItemRight = document.getElementsByClassName("item");
// inizializzo la variabile del contattore che parte da 0
let index = 0;
// man mano che l'index itera il ciclo aggiungo la classe active a ciascuno uno dopo l'altro
rowItemRight[index].classList.add("active");


//creazione  variabile button prev/next dello slider
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
console.log(prev, next);

//creazione variabile nell html imagine grande con img attuale,titolo,paragrafo
let card = document.querySelector('.actual-image');
console.log(card, typeof card);

let autoPlay = 0;
let reverseAutoPlay = 0;
let sensoMarciaAvanti = true;
let contatore = 0;
// prendo prev e next dal html 
const btnPlayStop = document.querySelector('#play-stop');
const btnUpDown = document.querySelector('#up-down');
console.log(btnPlayStop, btnUpDown);
// inserisco l'imagine che fara da schermo
card.innerHTML = `<img src="${images[0].image}" alt="Card">`
// aggiungo il titolo sopra l'immagine
card.innerHTML += `<h3 class="title text-center">${images[0].title}</h3>`
// aggiungo il testo sopra l'immagine
card.innerHTML += `<h5 class="text">${images[0].text}</h5>`
// funzione che attiva l'autoplay in avanti al caricamento della pagina

// Alla pressione del tasto next
next.addEventListener("click", nextBtn);

// Alla pressione del tasto prev
prev.addEventListener("click", prevBtn);
let firstAutoPlay;
function generalAutoPlay() {
    firstAutoPlay = setInterval(() => {
        resetMouse();
        if (sensoMarciaAvanti === true) {
            // tolgo la active per darla alla successiva
            rowItemRight[index].classList.remove("active");
            // incremento dell indice
            index++;
            // controllo per comminciare da capo
            if (index === images.length) {
                index = 0;
            }
            card.innerHTML = `<img src="${images[index].image}" alt="Card">`;
            card.innerHTML += `<h3 class="title text-center">${images[index].title}</h3>`;
            card.innerHTML += `<h5 class="text">${images[index].text}</h5>`;
            rowItemRight[index].classList.add("active");
            contatore++;
            console.log(contatore, "lo slider gira in avanti dato che la variabile senso di marcia è: ", sensoMarciaAvanti);
        } else {
            rowItemRight[index].classList.remove("active");
            index--;
            if (index < 0) {
                index = images.length - 1;
            }
            rowItemRight[index].classList.add("active");
            card.innerHTML = rowItemRight[index].innerHTML;
            contatore++;
            console.log(contatore, "lo slider gira all'indietro dato che la variabile senso di marcia è: ", sensoMarciaAvanti);
        }


    }, 3000);
}
function nextBtn() {
    contatore = 0; // Reimposta il contatore delle iterazioni a zero
    sensoMarciaAvanti = true; // Imposta il senso di marcia in avanti
    clearInterval(firstAutoPlay); // Interrompe l'autoplay in corso
    generalAutoPlay(); // Riavvia l'autoplay
}
function prevBtn() {
    contatore = 0; // Reimposta il contatore delle iterazioni a zero
    sensoMarciaAvanti = false; // Imposta il senso di marcia all'indietro
    clearInterval(firstAutoPlay); // Interrompe l'autoplay in corso
    generalAutoPlay(); // Riavvia l'autoplay
}

function resetMouse() {
    clearInterval(reverseAutoPlay); // Interrompe l'autoplay all'indietro (reverse)
    clearInterval(autoPlay); // Interrompe l'autoplay standard (in avanti)
}
