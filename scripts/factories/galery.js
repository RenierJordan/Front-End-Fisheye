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
        media.setAttribute("class", "article-media");
        media.setAttribute('data-id', `${id}`)

        const description = document.createElement( 'div' );

        const titre =  document.createElement( 'p' );
        titre.textContent = title;

        const like = document.createElement( 'p' );
        like.textContent = likes;

        article.appendChild(media);
        article.appendChild(description);
        description.appendChild(titre);
        description.appendChild(like);

        return (article);
    }

    return { title, picture, likes, price,  getGaleryCardDOM}
}