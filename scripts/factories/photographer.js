function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const description = document.createElement( 'div' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement( 'p' );
        location.textContent = city+", "+country;
        const bio = document.createElement( 'p' );
        bio.textContent = tagline;
        const prix = document.createElement( 'p' );
        prix.textContent = price+"€/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(description);
        description.appendChild(location);
        description.appendChild(bio);
        description.appendChild(prix);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}