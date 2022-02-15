const mainUrl = 'http://127.0.0.1:8000/api/v1/titles/?page='

let top_film_page = 1
let adventure_film_page = 1
let family_film_page = 1
let action_film_page = 1

function display_films(source, titles, button) {
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
  films.appendChild(div)
  add_click_event(img_div, titles.id)

  document.getElementById(source).appendChild(
  document.getElementById(button)
    );
}

function get_films(source, page, category, button) {
  fetch(mainUrl + page + '&page_size=7&genre=' + category + '&sort_by=-imdb_score')
    .then(response => response.json())
    .then(data => {
      data.results.forEach((titles) => {
        display_films(source, titles, button);
      });
    });
}

function suggested_films(source) {
  let page = Math.floor(Math.random() * 85850);
  fetch(mainUrl + page + '&page_size=1')
    .then(response => response.json())
    .then(data => {
      data.results.forEach((titles) => {
        display_films(source, titles);
      });
    });
}

function next(source, page, category, button) {
  let parent = document.getElementById(source);
  let child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  get_films(source, page, category, button)
}

function back(source, page, category, button) {
  let parent = document.getElementById(source);
  let child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
  child = parent.getElementsByClassName("container")[0];
  parent.removeChild(child)
 get_films(source, page, category, button)
}

suggested_films("suggested_films")
get_films("img_top_films", top_film_page, "", "top_films_next")
get_films("img_adventure", adventure_film_page, "adventure", "adventure_next")
get_films("img_family", family_film_page, "family", "family_next")
get_films("img_action", action_film_page, "action", "action_next")

function top_films_next() {
  top_film_page = top_film_page + 1;
  next("img_top_films", top_film_page, "", "top_films_next")
}

function top_films_back() {
  if (top_film_page == 1) {
    top_film_page == 1;
  }
  if (top_film_page > 1) {
    top_film_page = top_film_page - 1;
    back("img_top_films", top_film_page, "", "top_films_next")
  }
}

function adventure_next() {
  adventure_film_page = adventure_film_page + 1;
  next("img_adventure", adventure_film_page, "adventure", "adventure_next")
}

function adventure_back() {
  if (adventure_film_page == 1) {
    adventure_film_page == 1;
  }
  if (adventure_film_page > 1) {
    adventure_film_page = adventure_film_page - 1;
    back("img_adventure", adventure_film_page, "adventure", "adventure_next")
  }
}

function family_next() {
  family_film_page = family_film_page + 1;
  next("img_family", family_film_page, "family", "family_next")
}

function family_back() {
  if (family_film_page == 1) {
    family_film_page == 1;
  }
  if (family_film_page > 1) {
    family_film_page = family_film_page - 1;
    back("img_family", family_film_page, "family", "family_next")
  }
}

function action_next() {
  action_film_page = action_film_page + 1;
  next("img_action", action_film_page, "action", "action_next")
}

function action_back() {
  if (action_film_page == 1) {
    action_film_page == 1;
  }
  if (action_film_page > 1) {
    action_film_page = action_film_page - 1;
    back("img_action", action_film_page, "action", "action_next")
  }
}

let images = document.getElementsByClassName("image_overlay")
for (const image of Object.values(images)) {
  image.onclick = function() {}
}

let modal = document.getElementById("myModal");
function add_click_event(div, id) {
  div.onclick = function() {
    let modal = document.getElementById("myModal");
    fetch('http://127.0.0.1:8000/api/v1/titles/' + id)
    .then(response => response.json())
    .then(data => {
      modal.style.display = "block";
      console.log(data);
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
      dl.appendChild(titre);
      dl.appendChild(title);
      dl.appendChild(category);
      dl.appendChild(genre);
      dl.appendChild(annee);
      dl.appendChild(year);
      dl.appendChild(score);
      dl.appendChild(avg_vote);
      dl.appendChild(score_imdb);
      dl.appendChild(imdb_score);
      dl.appendChild(directeurs);
      dl.appendChild(directors);
      dl.appendChild(acteurs);
      dl.appendChild(actors);
      dl.appendChild(duree);
      dl.appendChild(duration);
      dl.appendChild(pays);
      dl.appendChild(countries);
      dl.appendChild(worldwide);
      dl.appendChild(worldwide_gross_income);
      dl.appendChild(long_desc);
      dl.appendChild(long_description);
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