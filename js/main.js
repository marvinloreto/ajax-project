var formSearch = document.querySelector('.poke-submit');
var pokeInput = document.querySelector('.poke-input');
var searchBox = document.querySelector('.searchbox-container');
var resultsPage = document.querySelector('.result-container');
var viewPage = document.querySelectorAll('.view');
var ul = document.querySelector('.results-list');
var detailsPage = document.querySelector('.details-container');

formSearch.addEventListener('submit', handleSubmit);
window.addEventListener('click', handleViewSwap);

function handleViewSwap(event) {
  if (event.target.matches('.button-search')) {
    for (let i = 0; i < viewPage.length; i++) {
      if (searchBox.getAttribute('data-view') === viewPage[i].getAttribute('data-view')) {
        viewPage[i].classList.add('hidden');
      } else {
        viewPage[i].classList.remove('hidden');
      }
    }
  }
  if (event.target.matches('.nav-home')) {
    for (let i = 0; i < viewPage.length; i++) {
      if (resultsPage.getAttribute('data-view') === viewPage[i].getAttribute('data-view')) {
        viewPage[i].classList.add('hidden');
      } else {
        viewPage[i].classList.remove('hidden');
      }
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();
  pokeName(pokeInput.value);
  formSearch.reset();
}

function pokeName(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name.toLowerCase());
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var character = xhr.response;
    ul.textContent = '';

    ul.appendChild(getCharacterList(character));
  });
  xhr.send();
}

function getCharacterList(character) {
  var li = document.createElement('li');
  li.setAttribute('class', 'column-full');
  li.setAttribute('data-character-id', character.id);

  var img = document.createElement('img');
  img.setAttribute('src', character.sprites.other['official-artwork'].front_default);

  var name = document.createElement('p');
  name.textContent = character.name.toUpperCase();
  name.setAttribute('class', 'name');

  var characterData = {};

  characterData.name = character.name.toUpperCase();
  characterData.image = character.sprites.other['official-artwork'].front_default;
  characterData.charID = character.id;
  characterData.type1 = character.types[0].type.name;
  characterData.statsHP = character.stats[0].base_stat;

  data.entries.push(CharacterData);

  li.appendChild(name);
  li.appendChild(img);

  return li;
}

ul.addEventListener('click', handleListClick);

function handleListClick(event) {
  var liCharacter = event.target.closest('li');

  console.log(liCharacter);

  var nameChar = document.querySelector('.details-container .name');
  var imgChar = document.querySelector('.details-container .details-img');
  var indexChar = document.querySelector('.details-container .pokedexNumber');
  var typeChar = document.querySelector('.details-container .type');
  var statsCharHP = document.querySelector('.details-container .stats');

  for (let i = 0; i < data.entries.length; i++) {
    if (liCharcter.getAttribute('data-character-id') === data.entries[i].CharID) {
      nameChar.textContent = 'Name: ' + data.entries[i].name.toUpperCase();
      indexChar.textContent = 'Pokedex Number: ' + data.entries[i].id;
      typeChar.textContent = 'Type 1: ' + data.entries[i].types[0].type.name;
      statsCharHP.textContent = 'HP Stat: ' + data.entries[i].stats[0].base_stat;
      imgChar.setAttribute('src', data.entries[i].sprites.other['official-artwork'].front_default);
    }
  }

  resultsPage.classList.add('hidden');
  searchBox.classList.add('hidden');
  detailsPage.classList.remove('hidden');
  data.view = 'details-page';
}
