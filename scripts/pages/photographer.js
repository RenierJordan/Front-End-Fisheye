import { mediaListener } from "../utils/lightbox.js";
import { LikeListener } from "../utils/likes.js";


//Recupere l'ID present dans l'URL
export function getPhotographersId(){
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return id;
}

//Recupere le photographe correspondant a l'ID
async function getPhotographers(Id) {
    const response = await fetch('./data/photographers.json');
    const jsonData = await response.json();
    
    return jsonData.photographers.find(photographer => photographer.id == Id);
}

async function displayPhotographer(photographers) {
    const photographHeader = document.querySelector(".photograph-header")   
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographers);
    const InfoCardDOM = photographerModel.getInfoCardDOM();
    const PictureCardDOM = photographerModel.getPictureCardDOM();
    photographHeader.insertBefore(InfoCardDOM, photographHeader.firstChild);
    photographHeader.appendChild(PictureCardDOM);
    
    let ContactName = document.getElementById("ContactName")
    ContactName.textContent += photographerModel.name
    
    
}

//Recupere les medias grace a l'ID du photographe
export async function getMedias(Id) {
    const response = await fetch('./data/photographers.json');
    const jsonData = await response.json();
    
    return jsonData.media.filter(media => media.photographerId == Id);
}




async function displayMedias(medias, MemoireLike) {
    
    const galerySection = document.querySelector(".galery-section");


    medias.forEach((media) => {
        // eslint-disable-next-line no-undef
        const galeryModel = galeryFactory(media);
        const galeryCardDOM = galeryModel.getGaleryCardDOM();
        galerySection.appendChild(galeryCardDOM);

        
    });

    const mediaDOM = document.querySelectorAll('.article-media');

        mediaDOM.forEach((media) => {
        const mediaId = media.dataset.id;
        const likeElement = media.nextSibling.childNodes[1].childNodes[1]
        likeElement.setAttribute('data-isliked', MemoireLike[mediaId])

        if (likeElement.dataset.isliked == "true") {
            likeElement.previousSibling.innerHTML ++
            likeElement.setAttribute('class', "fa-solid fa-heart like-click")
        }
        
    });

    mediaListener();
    LikeListener();
    
}

//Fonction qui permet de réorganiser l'affichage des médias
async function replaceMedias(medias) {
   
    
    const galeryArticles = document.querySelectorAll(".galery-article");

    let MemoireLike = {}


    galeryArticles.forEach((article) => {
        const LikeId = article.firstChild.dataset.id
        const isLiked = article.childNodes[1].childNodes[1].childNodes[1].dataset.isliked
        MemoireLike[LikeId]= isLiked
        article.remove();
    });
    console.log(MemoireLike)
    displayMedias(medias, MemoireLike);
    
}

let SumLikes = 0;
 async function displayEncart(medias, photographers) {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographers);

    
    
    medias.forEach((media) => {
        // eslint-disable-next-line no-undef
        const galeryModel = galeryFactory(media);
        SumLikes+= galeryModel.likes;
    });

    const encartTarif = document.querySelector(".encart-tarif");
    const encartLikes = document.querySelector(".encart-tarif_likes");
    const prix = document.createElement( 'p' );
    prix.textContent = photographerModel.price+"€ / jour";
    encartTarif.appendChild(prix);

    
    const Likes = document.createElement( 'p' );
    Likes.setAttribute("class","totalLikes");
    Likes.textContent = SumLikes;
    encartLikes.insertBefore(Likes, encartLikes.firstChild);

   
}


//fonction qui permet de trier les medias dans un tableau en fonction de l'option de tri
export function sortGalery(galery, sortOption) {
    let sortedGalery = galery;

    switch (sortOption) {
        case 'date': {
            let sorted = sortedGalery.sort((a, b) => a.date.localeCompare(b.date)).reverse();
            return sorted;
        }
        case 'title': {
            let sorted = sortedGalery.sort((a, b) => a.title.localeCompare(b.title));
            return sorted;
        }
        case 'likes':  
        default: {
            let sorted = sortedGalery.sort((a, b) => a.likes - b.likes).reverse();
            return sorted;
        }
    }
} 

// Fonction fait appel a la fonction d'affichage ou de reorganisation  des medias 
async function updateGalery(sortOption) {
    const galerySection = document.querySelector(".galery-section");
    const id = getPhotographersId();
    const photographerGalery = await getMedias(id);
    let sortedGalery = sortGalery(photographerGalery, sortOption);
    if (galerySection.childNodes.length>1){
        replaceMedias(sortedGalery);
    }
    else {
        displayMedias(sortedGalery);
    }
    
    
}

// Ajout d'un EventListener sur le bouton de filtre qui fait appel a la fonction au dessus avec comme parametre le filtre selectioné
const SelectTri = document.getElementById("Tri");
SelectTri.addEventListener("change", ()=>updateGalery(SelectTri.value) ); 


async function init() {
    // Récupère les datas du photographe
    const id = getPhotographersId();
    const photographers = await getPhotographers(id);
    const medias = await getMedias(id);
    

    await updateGalery(SelectTri.value);
    displayPhotographer(photographers);
    displayEncart(medias, photographers);
    
}

init();
