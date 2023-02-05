const BASE_URL = 'https://restcountries.com/v2';
const options = 'name,capital,population,flag,languages';

function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=${options}`)
        .then(response => response.json());
}

export default { fetchCountries };
