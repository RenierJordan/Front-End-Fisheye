//Mettre le code JavaScript lié à la page photographer.html

let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);

async function getPhotographers(photographerId) {
    const response = await fetch('/data/photographers.json');
    const jsonData = await response.json();
    
    for (let i=0; i<jsonData.photographers.length; i++){
        if ( jsonData.photographers[i].id == photographerId ) {
            console.log(jsonData.photographers[i]);
            //return jsonData.photographers[i];
        }
    };
    
    return jsonData.photographers.find(photographer => photographer.id == photographerId);
}

console.log(getPhotographers(id));