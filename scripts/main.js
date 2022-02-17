const mainUrl = 'http://127.0.0.1:8000/api/v1/titles/?page='
 
let top_film_page = 1
let adventure_film_page = 1
let family_film_page = 1
let action_film_page = 1

// Get category list of films
function get_films(source, page, category) {
  fetch(mainUrl + page + '&page_size=7&genre=' + category + '&sort_by=-imdb_score')
  .then(response => response.json())
  .then(data => {
    data.results.forEach((titles) => {
        display_films(source, titles);
    });
  });
}

// Get category list of films random best rated
function suggested_films(source) {
  let page = Math.floor(Math.random() * 6);
  fetch(mainUrl + page + '&page_size=1&sort_by=-imdb_score')
    .then(response => response.json())
    .then(data => {
      data.results.forEach((titles) => {
      display_films(source, titles);
    });
  });
}

// Display informations by film
function display_films(source, titles) {
  const films = document.getElementById(source); 
  let div = document.createElement('div');
  div.className = "container"
  let img_src = document.createElement('img');
  img_src.className = "raw_image"
  img_src.src = titles.image_url;
  div.appendChild(img_src)
  let img_div = document.createElement('div');
  img_div.className = "image_overlay"
  let img_name = document.createElement('div');
  img_name.className = "title"
  img_name.textContent = titles.title;
  img_div.appendChild(img_name)
  div.appendChild(img_div)
  if(films.id === "suggested_films"){
      films.appendChild(div)
  }else{
      films.children[1].appendChild(div)
  }
  add_click_event(img_div, titles.id)
}

//Window listener for click next or prev button by category
window.addEventListener('load', () => {
  let buttons = document.getElementsByClassName('button')
  for(let i of buttons){
    i.addEventListener('click', e => {
        let category = e.target.closest('.category')
        let buttonType = e.target.className.split(' ')[1]
        let categoryName = category.id
        removeFilms(category.children[1])
        handlePages(buttonType, categoryName)
    })
  }
})

// Handled pages
function handlePages(buttonType, category){
  switch(category){
    case 'img_top_films':
        top_film_page = buttonType === 'next' ? top_film_page+=1 : top_film_page === 1 ? 1 : top_film_page-=1;
        get_films(category, top_film_page, '')
        break;
    case 'img_adventure':
        adventure_film_page = buttonType === 'next' ? adventure_film_page+=1 : adventure_film_page === 1 ? 1 : adventure_film_page-=1;
        get_films(category, adventure_film_page, 'adventure')
        break;
    case 'img_family':
        family_film_page = buttonType === 'next' ? family_film_page+=1 : family_film_page === 1 ? 1 : family_film_page-=1;
        get_films(category, family_film_page, 'family')
        break;
    case 'img_action':
        action_film_page = buttonType === 'next' ? action_film_page+=1 : action_film_page === 1 ? 1 : action_film_page-=1;
        get_films(category, action_film_page, 'action')
        break;
    default:
        break;
  }

}

// Remove film when click next or back
const removeFilms = (category) =>{
  let elementArray= new Array()
  for(let i = 0 ; i < 7 ; i++){
      let elementToDelete = category.children[i]
      elementArray.push(elementToDelete)
  }
  for(let j of elementArray){
      j.remove()
  }
}

// Modal window
let modal = document.getElementById("myModal");
function add_click_event(div, id) {
  div.onclick = function() {
    let modal = document.getElementById("myModal");
    fetch('http://127.0.0.1:8000/api/v1/titles/' + id)
    .then(response => response.json())
    .then(data => {
      modal.style.display = "block";
      let text_space = document.getElementById('text_space');
      let text_div = document.createElement('div');
      text_div.className = "text_div";
      let image = document.createElement('img');
      image.src = data.image_url;
      let dl = document.createElement('dl');
      let titre = document.createElement('dt');
      titre.textContent = "Titre : ";
      let title = document.createElement('dd');
      title.textContent = data.title;
      let category = document.createElement('dt');
      category.textContent = "Catégorie : ";
      let genre = document.createElement('dd');
      genre.textContent = data.genres;
      let annee = document.createElement('dt');
      annee.textContent = "Année : ";
      let year = document.createElement('dd');
      year.textContent = data.year;
      let score = document.createElement('dt');
      score.textContent = "Score : ";
      let avg_vote = document.createElement('dd');
      avg_vote.textContent = + data.avg_vote;
      let score_imdb = document.createElement('dt');
      score_imdb.textContent = "Score IMDB : ";
      let imdb_score = document.createElement('dd');
      imdb_score.textContent = data.imdb_score;
      let directeurs = document.createElement('dt');
      directeurs.textContent = "Directeur : ";
      let directors = document.createElement('dd');
      directors.textContent = data.directors;
      let acteurs = document.createElement('dt');
      acteurs.textContent = "Acteurs : ";
      let actors = document.createElement('dd');
      actors.textContent = data.actors;
      let duree = document.createElement('dt');
      duree.textContent = "Durée : ";
      let duration = document.createElement('dd');
      duration.textContent = data.duration + " min";
      let pays = document.createElement('dt');
      pays.textContent = "Pays : ";
      let countries = document.createElement('dd');
      countries.textContent = data.countries;
      let worldwide = document.createElement('dt');
      worldwide.textContent = "Résultat au BoxOffice : ";
      let worldwide_gross_income = document.createElement('dd');
      worldwide_gross_income.textContent = data.worldwide_gross_income+ " $";
      let long_desc = document.createElement('dt');
      long_desc.textContent = "Description : ";
      let long_description = document.createElement('dd');
      long_description.textContent = data.long_description;
      
      text_div.appendChild(image)
      dl.append(titre, title, category, genre, annee, year, score, avg_vote, score_imdb, imdb_score, directeurs, directors, acteurs, actors, duree, duration, pays, countries, worldwide, worldwide_gross_income, long_desc, long_description);
      text_div.appendChild(dl);
      text_space.appendChild(text_div)
    })
  }
}

let span = document.getElementsByClassName("close")[0];

// When the user click on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  let parent = document.getElementById("text_space");
  let child = parent.getElementsByClassName("text_div")[0];
  parent.removeChild(child)
}

// When the user click anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    let parent = document.getElementById("text_space");
    let child = parent.getElementsByClassName("text_div")[0];
    parent.removeChild(child)
  }
}

//Main function
suggested_films("suggested_films")
get_films("img_top_films", top_film_page, "")
get_films("img_adventure", adventure_film_page, "adventure")
get_films("img_family", family_film_page, "family")
get_films("img_action", action_film_page, "action")
