'use strict';

/////////////////////////////////////////////////////////////////////////
// Declarations

const navList = document.querySelector('nav ul');
const navIcon = document.querySelector('nav .icon');
const mainContainer = document.querySelector('main .row');

let isOpen = false;
const baseUrl = 'https://forkify-api.herokuapp.com/api/search';

let options = [
  'carrot',
  'broccoli',
  'asparagus',
  'cauliflower',
  'corn',
  'cucumber',
  'green pepper',
  'lettuce',
  'mushrooms',
  'onion',
  'potato',
  'pumpkin',
  'red pepper',
  'tomato',
  'beetroot',
  'brussel sprouts',
  'peas',
  'zucchini',
  'radish',
  'sweet potato',
  'artichoke',
  'leek',
  'cabbage',
  'celery',
  'chili',
  'garlic',
  'basil',
  'coriander',
  'parsley',
  'dill',
  'rosemary',
  'oregano',
  'cinnamon',
  'saffron',
  'green bean',
  'bean',
  'chickpea',
  'lentil',
  'apple',
  'apricot',
  'avocado',
  'banana',
  'blackberry',
  'blackcurrant',
  'blueberry',
  'boysenberry',
  'cherry',
  'coconut',
  'fig',
  'grape',
  'grapefruit',
  'kiwifruit',
  'lemon',
  'lime',
  'lychee',
  'mandarin',
  'mango',
  'melon',
  'nectarine',
  'orange',
  'papaya',
  'passion fruit',
  'peach',
  'pear',
  'pineapple',
  'plum',
  'pomegranate',
  'quince',
  'raspberry',
  'strawberry',
  'watermelon',
  'salad',
  'pizza',
  'pasta',
  'popcorn',
  'lobster',
  'steak',
  'bbq',
  'pudding',
  'hamburger',
  'pie',
  'cake',
  'sausage',
  'tacos',
  'kebab',
  'poutine',
  'seafood',
  'chips',
  'fries',
  'masala',
  'paella',
  'som tam',
  'chicken',
  'toast',
  'marzipan',
  'tofu',
  'ketchup',
  'hummus',
  'chili',
  'maple syrup',
  'parma ham',
  'fajitas',
  'champ',
  'lasagna',
  'poke',
  'chocolate',
  'croissant',
  'arepas',
  'bunny chow',
  'pierogi',
  'donuts',
  'rendang',
  'sushi',
  'ice cream',
  'duck',
  'curry',
  'beef',
  'goat',
  'lamb',
  'turkey',
  'pork',
  'fish',
  'crab',
  'bacon',
  'ham',
  'pepperoni',
  'salami',
  'ribs',
];

/////////////////////////////////////////////////////////////////////////
// Functions
(function () {
  options.forEach(opt => {
    navList.insertAdjacentHTML(
      'beforeend',
      `<li class="link" data-opt="${opt}">${
        opt[0].toUpperCase() + opt.slice(1)
      }</li>`
    );
  });
})();

const fetchAndDisplayRecipes = function (option) {
  const finalURL = `${baseUrl}?q=${option}`;
  fetch(finalURL)
    .then(response => {
      return response.json();
    })
    .then(data => displayRecipes(data.recipes))
    .catch(error =>
      console.error('There was a problem with the fetch operation:', error)
    );
};
fetchAndDisplayRecipes('pizza');

const displayRecipes = function (recipes) {
  mainContainer.innerHTML = '';
  recipes.forEach(recipe => {
    const card = `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="d-flex h-100">
                    <div class="card mb-5 flex-fill">
                        <img src="${recipe.image_url}" class="card-img-top" alt="" />
                        <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <p class="card-text">
                            ${recipe.publisher}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>`;
    mainContainer.insertAdjacentHTML('beforeend', card);
  });
};

////////////////////////////////////////////////////////////////////////////
// Event Listeners

navIcon.addEventListener('click', function () {
  isOpen = !isOpen;
  if (isOpen) navList.classList.remove('hide');
  else navList.classList.add('hide');
});

document.addEventListener('click', function (e) {
  if (
    e.target.closest('nav ul') != navList &&
    e.target.closest('nav .icon') != navIcon
  )
    navList.classList.add('hide');
});

navList.addEventListener('click', function (e) {
  console.log(e);
  console.log(e.target.classList.contains('link'));
  if (e.target.classList.contains('link')) {
    console.log(e.target.dataset.opt);
    fetchAndDisplayRecipes(e.target.dataset.opt);
  }
});
