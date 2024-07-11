import { fetchData } from "./modules/http.js";
import {
    reloadFilms,
    reloadPopularFilms,
    reloadPersons,
    reloadUpcoming,
    reloadResult,
    listTrailers,
} from "./modules/ui.js"

let box = document.querySelector(".nowplaying__grid")
let popular = document.querySelector('.popular__grid')
let popularPersons = document.querySelector(".popularPersons__grid")
let upcoming = document.querySelector('.upcoming__grid')
let allNews = document.querySelector(".allNews")

fetchData("/movie/now_playing")
    .then((res) => reloadFilms(res.data.results.slice(0, 8), box));

fetchData("/movie/popular")
    .then(res => reloadPopularFilms(res.data.results.slice(0, 4), popular))

fetchData("/person/popular")
    .then(res => reloadPersons(res.data.results.slice(0, 8), popularPersons))


allNews.onclick = () => {

    fetchData("/movie/now_playing")
        .then((res) => reloadFilms(res.data.results, box));

    if (allNews.classList.contains("active")) {
        fetchData("/movie/now_playing")
            .then((res) => reloadFilms(res.data.results.slice(0, 8), box));
        allNews.textContent = 'Все новинки'
    }

    allNews.textContent = 'Скрыть'
    allNews.classList.toggle("active")
}



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
            fetchUpcomingMovies()

            count.textContent = +count.textContent + 1
        }
    }

    prev.onclick = () => {
        if (start >= 0) {
            start -= 4
            end -= 4
            fetchUpcomingMovies()

            count.textContent = +count.textContent - 1
        }
    }

    return arr.slice(start, end)
}

let start1 = 0
let end1 = 4
let countPopular = document.querySelector(".countPopular")
function paginateElemsPopular(arr) {
    let nexted = document.querySelector(".nexted")
    let prevment = document.querySelector('.prevment')
    nexted.onclick = () => {
        if (end1 < arr.length) {
            start1 += 4
            end1 += 4

            fetchPopularMovies()
            countPopular.textContent = +countPopular.textContent + 1

        }
    }

    prevment.onclick = () => {
        if (start1 >= 0) {
            start1 -= 4
            end1 -= 4

            fetchPopularMovies()
            countPopular.textContent = +countPopular.textContent - 1
        }
    }

    return arr.slice(start1, end1)
}

function fetchUpcomingMovies() {
    fetchData("/movie/upcoming")
        .then((res) => reloadUpcoming(paginateElems(res.data.results), upcoming))

}

fetchUpcomingMovies()

function fetchPopularMovies() {
    fetchData("/movie/popular")
        .then(res => reloadPopularFilms(paginateElemsPopular(res.data.results), popular))
}

fetchPopularMovies()


let trailer__list = document.querySelector(".trailer__list")

fetchData("/movie/now_playing")
    .then(res => listTrailers(res.data.results.slice(0, 8), trailer__list))



fetchData("/movie/786892/videos")
    .then(res => reloadIframe(res.data.results))

function reloadIframe(data) {
    let iframe = document.querySelector("#iframe")
    let nameTrailer = document.querySelector(".nameTrailer")


    nameTrailer.textContent = data[0].name
    iframe.src = "https://www.youtube.com/embed/" + data[0].key
}

let trailerId = localStorage.getItem("trailerId")

fetchData(`/movie/${trailerId}/videos`)
    .then(res => reloadIframeId(res.data.results))


export function reloadIframeId(data) {
    let iframe = document.querySelector("#iframe")
    let nameTrailer = document.querySelector(".nameTrailer")

    if (!data[0]) {

        iframe.src = "https://www.youtube.com/embed/3212343243241325"
        nameTrailer.textContent = "У этого фильма нет трейлера"
    }

    nameTrailer.textContent = data[0].name
    iframe.src = "https://www.youtube.com/embed/" + data[0].key
}