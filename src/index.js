import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import API from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const STYLES = "<style>li{list-style-type: none;display: flex;align-items: center;}img{margin-right: 10px;margin-bottom:5px;}div{font-size:14px;}</style>";

const searchBox = document.getElementById('search-box');
const countryInfo = document.querySelector('.country-info');
searchBox.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
  e.preventDefault();
  const searchCountry = e.target.value.trim();
  if (searchCountry === '') {
    clearCountry();
  } else {
      API.fetchCountries(searchCountry).then(renderCountry).catch(onFitchError);
  }
  
}

function renderCountry(countries) {
    if (countries.length > 10) {
      clearCountry();
      Notify.info(
        'Too many matches found. Please enter a more specific name.',
        {
          showOnlyTheLastOne: true,
        }
      );
    } else if (countries.length > 2) {
      clearCountry();
      countryInfo.innerHTML = '<ul></ul>';
      const markup = countries
        .map(
          country =>
            `<li>
              <img src="${country.flag}" alt="${country.name}" width="30" height="30"
          <div class="country_name">${country.name}</div>
          </li>
${STYLES}
          `
        )
        .join('');

      countryInfo.insertAdjacentHTML('beforeend', markup);
    } else {
      clearCountry();
      countryInfo.innerHTML = '<ul></ul>';
      const markup = countries
        .map(
          country =>
            `<li>
            <img src="${country.flag}" alt="${country.name}" width="30" height="30"
            <div>${country.name}</div>
            </li>
            <div><b>Capital: </b>${country.capital}</div>
            <div><b>Population: </b>${country.population}</div>
            <div><b>Languages: </b>${country.languages[0].name}</div>
${STYLES}
          `
        )
        .join('');
      countryInfo.insertAdjacentHTML('beforeend', markup);
    }
}

function clearCountry(country) {
  countryInfo.innerHTML = '';
}

function onFitchError(error) {
  Notify.failure('Oops, there is no country with that name', {
    showOnlyTheLastOne: true,
  });
}
