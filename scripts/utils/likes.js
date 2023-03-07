export async function UpdateLikes(mediaId) {

    
    const mediaObject = document.querySelector("[data-id=" + CSS.escape(mediaId) + "]");
    const likeElement = mediaObject.nextSibling.childNodes[1].childNodes[1];
    const TotalLikes = document.querySelector(".totalLikes");
    const isLiked = likeElement.dataset.isliked;
    
    if (isLiked == "true"){
        likeElement.previousSibling.innerHTML --
        TotalLikes.innerHTML -- ;
        likeElement.setAttribute('data-isliked', false) 
        likeElement.setAttribute("class", "fa-regular fa-heart like-click")
    }
    else {
        likeElement.previousSibling.innerHTML ++
        TotalLikes.innerHTML ++ ;
        likeElement.setAttribute('data-isliked', true)
        likeElement.setAttribute('class', "fa-solid fa-heart like-click")
    }
}


export function LikeListener(){
    const mediaDOM = document.querySelectorAll('.article-media');

        mediaDOM.forEach((media) => {

            media.nextSibling.childNodes[1].childNodes[1].addEventListener('click', function() {
                
                const mediaId =media.dataset.id;
                UpdateLikes(mediaId);                            
               
            });
        });
}