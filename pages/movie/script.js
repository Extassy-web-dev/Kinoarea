import { Chart, DoughnutController, ArcElement } from "chart.js";
import { fetchData } from "../../modules/http.js"
import { reloadActors, siquels_priquels, similar, reloadResult, reloadResultPerson } from "../../modules/ui.js";

let dataId = localStorage.getItem("userId")


fetchData(`/movie/${dataId}`)
    .then(res => reloadUI(res.data))

function reloadUI(data) {
    let nameh1 = document.querySelector(".nameh1")
    let name = document.querySelector(".name")
    let overwiew = document.querySelector(".overwiew")
    let nameEn = document.querySelector(".nameEn")
    let img = document.querySelector(".content img")
    let rating = document.querySelector(".rating")
    let relize_date = document.querySelector(".relize_date")
    let country = document.querySelector(".country")
    let language = document.querySelector(".language")
    let speak_language = document.querySelector(".speak_language")
    let genre = document.querySelector(".genre")
    let budget = document.querySelector(".budget")
    let time = document.querySelector(".time")
    let dohod = document.querySelector(".dohod")
    let slogan = document.querySelector(".slogan")
    let company = document.querySelector(".company")

    if (data.tagline) {
        slogan.textContent = data.tagline
    } else {
        slogan.textContent = "-"
    }
    company.textContent = data.production_companies[0].name
    country.textContent = data.origin_country[0]
    language.textContent = data.original_language
    speak_language.textContent = data.spoken_languages[0].name
    genre.textContent = data.genres[0].name
    budget.textContent = data.budget + "$"
    time.textContent = data.runtime + " " + "минут"
    dohod.textContent = data.revenue + "$"
    relize_date.textContent = data.release_date
    rating.textContent = data.vote_average
    img.src = "https://image.tmdb.org/t/p/original" + data.poster_path
    nameEn.textContent = data.original_title
    name.textContent = data.title
    nameh1.textContent = data.title
    overwiew.textContent = data.overview
}

Chart.register(DoughnutController, ArcElement);

let ctx = document.querySelector("#ratingChart");

fetchData(`/movie/${dataId}`)
    .then((res) => reloadMovie(res.data))
    .catch((error) => console.error(error));

function reloadMovie(movie) {
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Rating", "Remaining"],
            datasets: [
                {
                    label: "Movie Ratings",
                    data: [movie.vote_average, 10 - movie.vote_average], // Display the rating out of 10
                    backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)"],
                    borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: false,
        },
    });

}
let all_act = document.querySelector(".all-act")

all_act.onclick = () => {
    fetchData(`/movie/${dataId}/credits`)
        .then(res => reloadActors(res.data.cast, actors__grid))
}

let actors__grid = document.querySelector(".actors__grid")

fetchData(`/movie/${dataId}/credits`)
    .then(res => reloadActors(res.data.cast.slice(0, 10), actors__grid))


let iframe = document.querySelector("iframe")

fetchData(`/movie/${dataId}/videos`)
    .then(res => videos(res.data.results))

function videos(data) {
    let notName = document.querySelector(".notName")

    if (!data[0]) {
        notName.textContent = "У этого фильма нет трейлера"
        iframe.src = "https://www.youtube.com/embed/22134123123132"
    }

    iframe.src = "https://www.youtube.com/embed/" + data[0].key

}

let cartfilm = document.querySelector(".cartfilm")

fetchData(`/movie/${dataId}`)
    .then(res => bg(res.data))

function bg(data) {

    cartfilm.style.backgroundImage = `url("https://image.tmdb.org/t/p/original" + ${data.backdrop_path})`
    cartfilm.style.backgroundSize = "contain"
    cartfilm.style.backgroundRepeat = "no-repeat"
}

let box = document.querySelector(".boxPreq")



let start = 0
let end = 4

function paginateElems(arr) {
    let next = document.querySelector(".next")
    let prev = document.querySelector('.prev')
    let count = document.querySelector(".count")
    next.onclick = () => {

        if (end < arr.length) {
            start += 4
            end += 4
            fetchRecommendMovies()

            count.textContent = +count.textContent + 1
        }
    }

    prev.onclick = () => {

        if (start >= 0) {
            start -= 4
            end -= 4
            fetchRecommendMovies()

            count.textContent = +count.textContent - 1
        }


    }

    return arr.slice(start, end)
}

function fetchRecommendMovies() {
    fetchData(`/movie/${dataId}/recommendations`)
        .then(res => siquels_priquels(paginateElems(res.data.results), box))
}

fetchRecommendMovies()

let similar__box = document.querySelector(".similar__box")

let start1 = 0
let end1 = 4

function paginateElemsSimilar(arr) {
    let next = document.querySelector(".nextsimilar")
    let prev = document.querySelector('.prevsimilar')
    let count = document.querySelector(".countsimilar")
    next.onclick = () => {

        if (end1 < arr.length) {
            start1 += 4
            end1 += 4
            fetchSimialrdMovies()

            count.textContent = +count.textContent + 1
        }
    }

    prev.onclick = () => {

        if (start1 >= 0) {
            start1 -= 4
            end1 -= 4
            fetchSimialrdMovies()

            count.textContent = +count.textContent - 1
        }


    }

    return arr.slice(start1, end1)
}

function fetchSimialrdMovies() {
    fetchData(`/movie/${dataId}/similar`)
        .then(res => similar(paginateElemsSimilar(res.data.results), similar__box))
}

fetchSimialrdMovies()

let btn = document.querySelector(".search")
let search_modal = document.querySelector(".search_modal")
let close = document.querySelector(".closeImg")



btn.onclick = () => {
    search_modal.style.visibility = "visible"
    search_modal.style.opacity = 1
}

close.onclick = () => {

    search_modal.style.opacity = 0
    search_modal.style.visibility = "hidden"
}

let search_results = document.querySelector(".search_results")
let categories_btn = document.querySelectorAll(".category")
let searchInp = document.querySelector('.searchInp')
let init = "movie"
categories_btn.forEach(btn => {
    btn.onclick = () => {
        categories_btn.forEach(elem => {
            elem.classList.remove("active")
        })
        init = btn.id
        btn.classList.add("active")
    }
})

searchInp.onkeyup = debounce((e) => {
    processChange(e.target.value)
}, 500)

function fetchSearchData(value, category) {
    fetchData(`/search/${category}?query=${value}`)
        .then(res => reloadResult(res.data.results, search_results))


}

function debounce(func, timeout = 500) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function processChange(value) {
    fetchSearchData(value, init)
}
