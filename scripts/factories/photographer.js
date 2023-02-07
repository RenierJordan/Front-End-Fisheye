function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const lien = document.createElement( 'a' );
        lien.setAttribute("href", `./photographer.html?id=${id}`);//
        const article = document.createElement( 'article' );
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const description = document.createElement( 'div' );

        const location = document.createElement( 'p' );
        location.textContent = city+", "+country;
        location.setAttribute("class", "description-location");

        const bio = document.createElement( 'p' );
        bio.textContent = tagline;
        bio.setAttribute("class", "description-bio");

        const prix = document.createElement( 'p' );
        prix.textContent = price+"€/jour";
        prix.setAttribute("class", "description-prix");

        lien.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(description);
        description.appendChild(location);
        description.appendChild(bio);
        description.appendChild(prix);
        return (lien);
    }
    return { name, picture, getUserCardDOM }
}