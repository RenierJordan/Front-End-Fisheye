import { getPhotographersId, getMedias, sortGalery} from "../pages/photographer.js";


function displayLightbox() {
    const lightboxModal = document.getElementById("lightbox_modal");
	lightboxModal.style.display = "flex";
}

function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox_modal");
    const lightboxFigure = document.querySelector(".lightboxFigure")
    lightboxModal.style.display = "none";
    lightboxFigure.remove();
}

const closebox = document.getElementById("closeLightbox");
closebox.addEventListener('click', ()=>closeLightbox());

const btnPrevious = document.getElementById("previous");
const btnNext = document.getElementById("next");

let testId = 0 ;

async function openLightboxModal(mediaId) {
    testId = mediaId;
    const photographerId = getPhotographersId();
    const galery = await getMedias(photographerId);
    const mediaObject = galery.find(media => media.id == mediaId);

    

    const { id, title, image, video } = mediaObject;
    const lightboxModalMain = document.getElementById('lightbox_modal_main');

    const lightboxFigure = document.createElement('figure');
    lightboxFigure.setAttribute('class', 'lightboxFigure');
    

    let lightboxMedia, mediaLink;

    if (mediaObject.hasOwnProperty('image')) {
        lightboxMedia = document.createElement('img');
        mediaLink = `./assets/photographers/${photographerId}/${image}`;
    } else if (mediaObject.hasOwnProperty('video')) {
        lightboxMedia = document.createElement('video');
        mediaLink = `./assets/photographers/${photographerId}/${video}`;
        lightboxMedia.setAttribute('controls', '')
    };
    lightboxMedia.setAttribute('src', mediaLink);
    lightboxMedia.setAttribute('id', 'lightbox_modal_media');
    lightboxMedia.setAttribute('data-mediaid', `${id}`)
    lightboxMedia.setAttribute('aria-label', 'image closeup view');
    lightboxMedia.setAttribute('tabindex', '0');

    const mediaTitle = document.createElement('figcaption');
    mediaTitle.setAttribute('id', 'lightbox_modal_title');
    mediaTitle.setAttribute('tabindex', '0');
    mediaTitle.textContent = title;

    lightboxFigure.appendChild(lightboxMedia);
    lightboxFigure.appendChild(mediaTitle);
    lightboxModalMain.insertBefore(lightboxFigure,lightboxModalMain.lastElementChild);

    displayLightbox();

}

export function mediaListener() {
const mediaDOM = document.querySelectorAll('.article-media');

    mediaDOM.forEach((media) => {
        
        media.addEventListener('click', function(e) {
            const mediaId = parseInt(this.dataset.id);
            
            openLightboxModal(mediaId);
        });
    });

};

async function NextMedia(mediaId) {
    const photographerId = getPhotographersId();
    const galery = await getMedias(photographerId);
    const sortOption = document.getElementById("Tri").value;
    let sortedGalery = sortGalery(galery, sortOption);
    const mediaObject = sortedGalery.find(media => media.id == mediaId);

    
    const lightboxFigure = document.querySelector(".lightboxFigure")
    
    
    for(let i=0; i<sortedGalery.length; i++) {
        if (sortedGalery[i]== mediaObject) {
            lightboxFigure.remove();
            if (i==sortedGalery.length-1){
                openLightboxModal(sortedGalery[0].id);
            }
            else  openLightboxModal(sortedGalery[i+1].id);
            
        }
    }
 
}

async function PreviousMedia(mediaId) {
    const photographerId = getPhotographersId();
    const galery = await getMedias(photographerId);
    const sortOption = document.getElementById("Tri").value;
    let sortedGalery = sortGalery(galery, sortOption);
    const mediaObject = sortedGalery.find(media => media.id == mediaId);

    
    const lightboxFigure = document.querySelector(".lightboxFigure")
    
    
    for(let i=0; i<sortedGalery.length; i++) {
        if (sortedGalery[i]== mediaObject) {
            lightboxFigure.remove();
            if (i==0){
                openLightboxModal(sortedGalery[sortedGalery.length-1].id);
            }
            else  openLightboxModal(sortedGalery[i-1].id);
            
        }
    }
 
}



btnNext.addEventListener('click',()=> NextMedia(testId) );
btnPrevious.addEventListener('click',()=> PreviousMedia(testId) );