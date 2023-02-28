function galeryFactory(data) {
    const { date, id, likes, photographerId, price, title, image, video } = data;

    const picture = `assets/photographers/${photographerId}/${image}`;
    const videos = `assets/photographers/${photographerId}/${video}`;

    function getGaleryCardDOM() {

        const article = document.createElement( 'article' );
        article.setAttribute('class', 'galery-article')

        let media;
        if (data.hasOwnProperty('image')) {
            media = document.createElement( 'img' );
            media.setAttribute("src", picture);
        }
        else if (data.hasOwnProperty('video')) {
            media = document.createElement('video');
            media.setAttribute("src", videos);
        }
        media.setAttribute("class", "article-media notLiked");
        media.setAttribute('data-id', `${id}`)
        
        


        const description = document.createElement( 'div' );

        const titre =  document.createElement( 'p' );
        titre.textContent = title;

        const divlike = document.createElement( 'div' );
        divlike.setAttribute("class", "article-media-likes")
        const like = document.createElement( 'p' );
        const likesvg = document.createElement( 'i' );
        likesvg.setAttribute("class", "fa-regular fa-heart like-click")
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

    return { title, picture, likes, price,  getGaleryCardDOM}
}