//Mettre le code JavaScript lié à la page photographer.html

let params = (new URL(document.location)).searchParams;
let id = params.get('id');

async function getPhotographers(Id) {
    const response = await fetch('/data/photographers.json');
    const jsonData = await response.json();
    
    return jsonData.photographers.find(photographer => photographer.id == Id);
}

async function displayPhotographer(photographers) {
    console.log(photographers);
    const photographHeader = document.querySelector(".photograph-header")   
    const photographerModel = photographerFactory(photographers);
    const InfoCardDOM = photographerModel.getInfoCardDOM();
    const PictureCardDOM = photographerModel.getPictureCardDOM();
    photographHeader.insertBefore(InfoCardDOM, photographHeader.firstChild);
    photographHeader.appendChild(PictureCardDOM);
    
    const encartTarif = document.querySelector(".tarif");
    const prix = document.createElement( 'p' );
    prix.textContent = photographerModel.price+"€ / jour";
    encartTarif.appendChild(prix);
};

async function getMedias(Id) {
    const response = await fetch('/data/photographers.json');
    const jsonData = await response.json();
    
    return jsonData.media.filter(media => media.photographerId == Id);
}


async function displayMedias(medias) {
    console.log(medias);
    let SumLikes = 0;
    const galerySection = document.querySelector(".galery-section");
    
    medias.forEach((media) => {
        const galeryModel = galeryFactory(media);
        SumLikes+= galeryModel.likes;
        const galeryCardDOM = galeryModel.getGaleryCardDOM();
        galerySection.appendChild(galeryCardDOM);
    });
    
    const encartTarif = document.querySelector(".tarif");
    const Likes = document.createElement( 'p' );
    Likes.textContent = SumLikes;
    encartTarif.insertBefore(Likes, encartTarif.firstChild);
};



async function init() {
    // Récupère les datas du photographe
    const photographers = await getPhotographers(id);
    const medias = await getMedias(id);
    displayPhotographer(photographers);
    displayMedias(medias);
};

init();
