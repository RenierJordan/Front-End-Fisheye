import { mediaListener } from "../utils/lightbox.js";

//Mettre le code JavaScript lié à la page photographer.html
export function getPhotographersId(){
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return id;
};

async function getPhotographers(Id) {
    const response = await fetch('/data/photographers.json');
    const jsonData = await response.json();
    
    return jsonData.photographers.find(photographer => photographer.id == Id);
}

async function displayPhotographer(photographers) {
    const photographHeader = document.querySelector(".photograph-header")   
    const photographerModel = photographerFactory(photographers);
    const InfoCardDOM = photographerModel.getInfoCardDOM();
    const PictureCardDOM = photographerModel.getPictureCardDOM();
    photographHeader.insertBefore(InfoCardDOM, photographHeader.firstChild);
    photographHeader.appendChild(PictureCardDOM);
    
    
};

export async function getMedias(Id) {
    const response = await fetch('/data/photographers.json');
    const jsonData = await response.json();
    
    return jsonData.media.filter(media => media.photographerId == Id);
};




async function displayMedias(medias) {
    
    const galerySection = document.querySelector(".galery-section");


    medias.forEach((media) => {
        const galeryModel = galeryFactory(media);
        const galeryCardDOM = galeryModel.getGaleryCardDOM();
        galerySection.appendChild(galeryCardDOM);
    });

    mediaListener();
    
};

async function replaceMedias(medias) {
   
    
    const galerySection = document.querySelector(".galery-section");
    const galeryArticles = document.querySelectorAll(".galery-article");

    galeryArticles.forEach((article) => {
        article.remove();
    });

    displayMedias(medias);
    
};

 async function displayEncart(medias, photographers) {
    const photographerModel = photographerFactory(photographers);

    let SumLikes = 0;
    
    medias.forEach((media) => {
        const galeryModel = galeryFactory(media);
        SumLikes+= galeryModel.likes;
    });

    const encartTarif = document.querySelector(".tarif");
    const prix = document.createElement( 'p' );
    prix.textContent = photographerModel.price+"€ / jour";
    encartTarif.appendChild(prix);

    
    const Likes = document.createElement( 'p' );
    Likes.textContent = SumLikes;
    encartTarif.insertBefore(Likes, encartTarif.firstChild);
}


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
    

};

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
    
};

init();
