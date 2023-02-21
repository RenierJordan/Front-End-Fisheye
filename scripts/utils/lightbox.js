import { getPhotographersId, getMedias} from "../pages/photographer.js";


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

async function openLightboxModal(mediaId) {
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
    lightboxModalMain.appendChild(lightboxFigure);

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