import { fetchBreeds, fetchCatByBreed } from './js/services/cat-api';
import createMarkup from './js/services/createMarkup';
import SlimSelect from 'slim-select';
import refs from './js/services/refs';
const { selectEl } = refs;
const { catInfoEl } = refs;
const { loaderEl } = refs;
const { errorEl } = refs;

const sel = new SlimSelect({
  select: '.breed-select',
});

fetchBreeds()
  .then(element => {
    sel.setData(createMarkup(element));
  })
  .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
  });

selectEl.addEventListener('change', onSelectedCat);

function onSelectedCat(event) {
  const id = event.target.value;
  console.log(id);
  console.log(loaderEl);
  loaderEl.classList.remove('js-style');
  
  fetchCatByBreed(id)
    .then(id => {
      const markup = `<div class="cat-info">
	<img src='${id[0].url}' width='600' alt="${id[0].breeds[0].name}">
	<div class="cat-box">
		<h2>${id[0].breeds[0].name}</h2>
		<p>${id[0].breeds[0].description}</p>
    <h2>Temperament</h2>
    <p>${id[0].breeds[0].temperament}</p>
	</div>
</div>`;
      catInfoEl.innerHTML = markup;
      loaderEl.classList.remove('js-style');
      catInfoEl.classList.remove('js-style');
    })

    .catch(error => {
      console.log(error);
      errorEl.classList.add('error-none');
    });
}