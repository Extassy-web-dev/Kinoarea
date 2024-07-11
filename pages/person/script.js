import { fetchData } from "../../modules/http.js"
import { bestMovies, images, reloadResult, reloadResultPerson } from "../../modules/ui"

let personId = localStorage.getItem("personId")

fetchData(`/person/${personId}`)
    .then(res => reloadPerson(res.data))

function reloadPerson(data) {
    let bd = document.querySelector(".bd")
    let placebd = document.querySelector(".placeBd")
    let genres = document.querySelector(".genres")
    let biography = document.querySelector("#biography")
    let profileImg = document.querySelector(".profileImg")
    let nameh1 = document.querySelector(".nameh1")
    let namePic = document.querySelector(".namePic")
    let nameen = document.querySelector(".nameEn")
    let nameSpan = document.querySelector(".name")


    biography.textContent = data.biography
    namePic.textContent = data.name
    bd.textContent = data.birthday
    placebd.textContent = data.place_of_birth
    genres.textContent = data.known_for_department
    
    profileImg.src = "https://image.tmdb.org/t/p/original" + data.profile_path
    profileImg.style.width = "400px"
    profileImg.style.borderRadius = "10px"
    nameh1.textContent = data.name
    nameen.textContent = data.name
    nameSpan.textContent = data.name
}

let boxFilms = document.querySelector(".boxFilms")



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
            fetchBestMovies()

            count.textContent = +count.textContent + 1
        }
    }

    prev.onclick = () => {

        if (start >= 0) {
            start -= 4
            end -= 4
            fetchBestMovies()

            count.textContent = +count.textContent - 1
        }


    }

    return arr.slice(start, end)
}

function fetchBestMovies() {
    fetchData(`/person/${personId}/movie_credits`)
        .then(res => bestMovies(paginateElems(res.data.cast), boxFilms))
}

fetchBestMovies()

let images__box = document.querySelector(".images__box")

fetchData(`/person/${personId}/images`)
    .then(res => images(res.data.profiles.slice(0, 8), images__box))

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
    