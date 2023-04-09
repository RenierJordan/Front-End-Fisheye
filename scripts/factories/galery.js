// eslint-disable-next-line no-unused-vars
function galeryFactory(data) {
    const { date, id, likes, photographerId, price, title, image, video } = data;

    const picture = `assets/photographers/${photographerId}/${image}`;
    const videos = `assets/photographers/${photographerId}/${video}`;

    function getGaleryCardDOM() {

        const article = document.createElement( 'article' );
        article.setAttribute('class', 'galery-article')
        

        let media;
        if (Object.prototype.hasOwnProperty.call(data, 'image')) {
            media = document.createElement( 'img' );
            media.setAttribute("src", picture);
            media.setAttribute('alt', `${title} , closeup view`)
        }
        else if (Object.prototype.hasOwnProperty.call(data, 'video')) {
            media = document.createElement('video');
            media.setAttribute("src", videos);
            media.setAttribute('title', `${title} , closeup view`)
        }
        media.setAttribute("class", "article-media notLiked");
        media.setAttribute('data-id', `${id}`)
        media.setAttribute("tabindex", 0);

        
        


        const description = document.createElement( 'div' );

        const titre =  document.createElement( 'p' );
        titre.textContent = title;
        titre.setAttribute("tabindex", 0);

        const divlike = document.createElement( 'div' );
        divlike.setAttribute("class", "article-media-likes")
        divlike.setAttribute("tabindex", 0);
        const like = document.createElement( 'p' );
        const likesvg = document.createElement( 'i' );
        likesvg.setAttribute("class", "fa-regular fa-heart like-click")
        likesvg.setAttribute("aria-label", "likes")
        likesvg.setAttribute('data-isLiked', false)
        like.textContent = likes;
        divlike.appendChild(like);
        divlike.appendChild(likesvg);

        article.appendChild(media);
        article.appendChild(description);
        description.appendChild(titre);
        description.appendChild(divlike);

        return (article);
    }

    return { date, title, picture, likes, price,  getGaleryCardDOM}
}