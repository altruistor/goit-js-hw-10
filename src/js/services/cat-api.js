const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_fRvdM39UyWpG1VRu0qNwCaa1vYapeLE4fe77bZjBdQqLR9WVdK6v2mzyPYQ2N4qa';

 function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(response => {
        if(!response.ok) {
            throw new Error (response.status)
        }
        return response.json();
    })
}

function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
       .then(response => {
        if(!response.ok) {
            throw new Error (response.status)
        }
        return response.json();
    }) 
}

export {fetchBreeds, fetchCatByBreed};