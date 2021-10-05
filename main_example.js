'use strict';

// *** Variables del mundo html a js
const seriesSection = document.querySelector('.js_series_section');
const searchInput = document.querySelector('.js_search_input');
const submit = document.querySelector('.js_button');
const favouriteSection = document.querySelector('.js_favourite');

// *** Variables globales
let dataShows = [];


// *** Recoger input de la usuaria y hacer petición al servidor

// * Funcion manejadora
function handlerSearch(event) {
    let valueInput =  searchInput.value;

    // *** Hacer petición al servidor - Fetch
    fetch (`http://api.tvmaze.com/search/shows?q=${valueInput}`)
    .then((response) => response.json())
    .then((data) => {

        // * Este arreglo esta vacio para cuando se vuelva hacer un fetch la ventana se vacie
        dataShows = [];

        // * Tomar la info de data.show para añadir en un nuevo array dataShows**
        for (const eachEl of data) {
            let eachShow = eachEl.show;
            dataShows.push(eachShow);
        }

        // * Pintar en pantalla los datos recibidos por el servidor
        renderSearch();

        // * Guardar los datos que ha dado el servidor en localStorage
        setInLocalStorage();

    });

    event.preventDefault();
}

// * Listener
submit.addEventListener('click', handlerSearch);


// *** Mostrar en pantalla la busqueda de las series
function renderSearch() {
    seriesSection.innerHTML = '';
    let favClass = '';

    // * Un for para cojer cada uno de los elementos del array como uno solo
    for (const dataShow of dataShows) {

        // * Variable que muestra el objeto de la info de la serie
        let dataImage = dataShow.image;
        let dataId = dataShow.id;

        // * Crear elementos html a js
        const newArticleItemEl = document.createElement('article');
        const newImgItemEl = document.createElement('img');
        const newh3ItemEl = document.createElement('h3');

        // * Ejecuta isFavourite() para saber si el elemento esta en favoritos
        // * true or false
        const isNewArticleFav = isFavourite(dataShow);

        // * Comprobar si hay elementos fav (true), para agregar la clase fav 
        if (isNewArticleFav) {
            favClass = 'series__card--fav';
            newArticleItemEl.classList.add(`${favClass}`);
        } else {
            favClass = '';
        }

        // * Configuracion de los elementos
        newArticleItemEl.classList.add('series__card');
        newArticleItemEl.classList.add('js_series_card');
        newImgItemEl.classList.add('js_img_serie');
        newImgItemEl.classList.add('series__img');
        newh3ItemEl.classList.add('js_name_serie');
        newh3ItemEl.classList.add('series__title');

        // * Configuración de la card
        newArticleItemEl.id = `${dataId}`

        // * Configuración de la imagen
        const imageNull = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        if (dataImage === null) {
            newImgItemEl.src = `${imageNull}`;
        } else {
            let dataImgContent = dataImage.medium;
            newImgItemEl.src = `${dataImgContent}`;
        }

        // * Añadir contenido: Titulo de la serie
        let newContentTitle = document.createTextNode(`${dataShow.name}`);
        newh3ItemEl.appendChild(newContentTitle);

        // * Añadir <img> y <h3> a <article>
        newArticleItemEl.appendChild(newImgItemEl);
        newArticleItemEl.appendChild(newh3ItemEl);

        // * Añadir <article> a <section> de la pág. HTML
        seriesSection.appendChild(newArticleItemEl);
    }

    listenerFav();
}

// *** Click de la usuaria sobre la card para añadir fav

// * Variable global de favoritos 
let dataFavourites = [];

// * Funcion manejadora
function handlerFav(event) {
    // * Accede al id del elemento clickado
    let clickCard = parseInt(event.currentTarget.id);

    // * Encontrar en el array dataShows la misma info al elemento que ha sido clickado
    const findId = dataShows.find(dataShow =>
        dataShow.id === clickCard);
    
    // ** Buscar que el fav seleccionado no este en el array de fav., para evitar duplicar contenido
    // * Encontrar posición del elemento clickado: si es -1 no esta en el arrray dataFavourites
    const favouriteFound = dataFavourites.findIndex(dataFavorite =>
        clickCard === dataFavorite.id );
    
    // * Añadir el elemento clickado si no esta en el array
    if (favouriteFound === -1) {
        // * Añadir al array dataFavourites la info del elemento clickado  
        dataFavourites.push(findId);
    } else {
        // * Quitar elemento si la usuaria vuelve a dar click sobre el (quitar fav.)
        dataFavourites.splice(favouriteFound, 1);
    }

    renderSearch();
    favouriteSection.innerHTML = '';
    renderFav();
    setInLocalStorage();

    

}

// * Funcion Listener
function listenerFav () {
    // * Variable que trae todos los elementos (cards) encontrados
    const cardsList = document.querySelectorAll('.js_series_card');

    // * Escucho el evento sobre cada elemento (card)
    for (const favouriteEl of cardsList ) {
        favouriteEl.addEventListener('click', handlerFav);
}}


// *** Comprobar si hay elementos favoritos 
function isFavourite(dataShow) {
    // * Encontrar si en dataFavourites hay elementos de dataShow 
    const favFound = dataFavourites.find(dataFav => 
        dataFav.id === dataShow.id);
        
    // * Si no hay elementos devolvera undefined y la función será 
    // * false y si tiene fav. devolvera true
    if (favFound === undefined) {
        return false;
    } else {
        return true;
    }

}


// *** Mostrar en pantalla los favoritos, en su sección 
function renderFav() {
    
    for (const dataFavourite of dataFavourites) {
        
        // * Variable que muestra el objeto de la info de la serie
        let dataImage = dataFavourite.image;
        let dataId = dataFavourite.id;

        // * Crear elementos html a js
        const newLiItemEl = document.createElement('li');
        const newH3FavItemEl = document.createElement('h3');
        const newImgFavItemEl = document.createElement('img');
        const newSpamItemEl = document.createElement('span');

        // * Configuracion de los elementos
        newLiItemEl.classList.add('favourite__li');
        newH3FavItemEl.classList.add('favourite__name');
        newImgFavItemEl.classList.add('favourite__img');
        newSpamItemEl.classList.add('favourite__close');

        // * Configución del li 
        newLiItemEl.id = `${dataId}`;

        // * Configuración de la imagen
        const imageNull = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        if (dataImage === null) {
            newImgFavItemEl.src = `${imageNull}`;
        } else {
            let dataImgContent = dataImage.medium;
            newImgFavItemEl.src = `${dataImgContent}`;
        }

        // * Añadir contenido: Titulo de la serie
        let newContentTitle = document.createTextNode(`${dataFavourite.name}`);
        newH3FavItemEl.appendChild(newContentTitle);

        // * Añadir contenido: span
        let newContentSpan = document.createTextNode('x');
        newSpamItemEl.appendChild(newContentSpan);

        // * Añadir <h3>, <img> y <span> al <ul>
        newLiItemEl.appendChild(newH3FavItemEl);
        newLiItemEl.appendChild(newImgFavItemEl);
        newLiItemEl.appendChild(newSpamItemEl);

        // * Añadir <li> al <ul> de la pág. HTML
        favouriteSection.appendChild(newLiItemEl);

    }
}

// *** Añadir la información de favoritos a local storage
function setInLocalStorage() {
    // * Convertir a string el array de favoritos
    const stringFavourites = JSON.stringify(dataFavourites);

    // * Añadir a local storage los datos converitdos a string
    localStorage.setItem('favourite', stringFavourites);
}

// * Funcion que revisa si hay info en el localStorage para no hacer peticiones al servidor cada vez que carga la pág.
function getLocalStorage() {
    // *  Pedir lo que hay en el localStorage
    const localStorageFav = localStorage.getItem('favourite');

    // * Comprobar que hay datos en localStorage,
    if (localStorageFav === null) {
        // * Ya que no tengo datos en lS, se puede ejecutar la api
        handlerSearch();
    } else {
        // * sí tengo datos en el local storage, lo convierto de nuevo a JSON para imprimirlo en pantalla
        const arrayFav = JSON.parse(localStorageFav);
        // * Y se guarda en la variable global de favoritos
        dataFavourites = arrayFav;

        // * cada vez que se modifica el arrays de favoritos se vuelve a  pintar y a escuchar eventos
        renderFav();
    }
}

// * Se carga localStorage cuando carga la pagina para asi mostrar lo que este guardado
getLocalStorage();