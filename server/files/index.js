const xhr = new XMLHttpRequest()

xhr.onload = function () {
    const movies = JSON.parse(xhr.responseText)
    const bodyElement = document.body

    movies.forEach(function (movie) {
     const article = document.createElement("article");
article.id = movie.imdbID || "";

const poster = document.createElement("img");
poster.src = movie.poster || "";
poster.alt = (movie.title || "movie") + " poster";
poster.classList.add("poster");

const content = document.createElement("div");
content.classList.add("movie-content");

const topRow = document.createElement("div");
topRow.classList.add("movie-top");

const title = document.createElement("h1");
title.textContent = movie.title || "";

const editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.onclick = function () {
    location.href = "edit.html?imdbID=" + movie.imdbID;
};

topRow.append(title);
topRow.append(editButton);

const details = document.createElement("div");
details.classList.add("movie-details");

const released = document.createElement("p");
released.textContent = "Released: " + (movie.released || "");

const runtime = document.createElement("p");
runtime.textContent = "Runtime: " + (movie.runtime || "") + " min";

const directors = document.createElement("p");
directors.textContent = "Directors: " + (movie.directors || []).join(", ");

const writers = document.createElement("p");
writers.textContent = "Writers: " + (movie.writers || []).join(", ");

const actors = document.createElement("p");
actors.textContent = "Actors: " + (movie.actors || []).join(", ");

const metascore = document.createElement("p");
metascore.textContent = "Metascore: " + (movie.metascore || "");

const imdbRating = document.createElement("p");
imdbRating.textContent = "IMDb Rating: " + (movie.imdbRating || "");

const genreBlock = document.createElement("div");
genreBlock.classList.add("genre-block");

const genreLabel = document.createElement("p");
genreLabel.textContent = "Genres:";

const genreList = document.createElement("div");
genreList.classList.add("genre-list");

(movie.genres || []).forEach(function (genre) {
    const genreSpan = document.createElement("span");
    genreSpan.textContent = genre;
    genreSpan.classList.add("genre");
    genreList.append(genreSpan);
});

genreBlock.append(genreLabel);
genreBlock.append(genreList);

const plot = document.createElement("p");
plot.classList.add("plot");
plot.textContent = "Plot: " + (movie.plot || "");

details.append(released);
details.append(runtime);
details.append(genreBlock);
details.append(directors);
details.append(writers);
details.append(actors);
details.append(metascore);
details.append(imdbRating);

content.append(topRow);
content.append(details);
content.append(plot);

article.append(poster);
article.append(content);

bodyElement.append(article);
    })
}

xhr.open("GET", "/movies")
xhr.send()