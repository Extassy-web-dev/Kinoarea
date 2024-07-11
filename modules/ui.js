
export function reloadFilms(arr, place) {
    place.textContent = ""
    for (let item of arr) {

        let elem = document.createElement('div')
        let img = document.createElement("img")
        let name = document.createElement("p")
        let category = document.createElement("p")

        img.onmouseenter = () => {
            let nowplaying = document.querySelector('.backdrop')

            nowplaying.style.backgroundImage = `url(${"https://image.tmdb.org/t/p/original" + item.backdrop_path})`
            nowplaying.style.backgroundSize = "contain"
            nowplaying.style.backgroundRepeat = "no-repeat"


        }

        img.onclick = () => {
            localStorage.setItem("userId", item.id)
            window.location.pathname = "/pages/movie/"
        }

        img.style.borderRadius = "10px"
        img.style.width = "100%"
        img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
        name.textContent = item.title
        category.textContent = item.release_date
        category.classList.add('category')
        name.classList.add('name')

        place.append(elem)
        elem.append(img, name, category)
    }
}

export function reloadPopularFilms(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let elem = document.createElement('div')
        let img = document.createElement("img")
        let name = document.createElement("p")
        let category = document.createElement("p")

        img.onclick = () => {
            localStorage.setItem("userId", item.id)
            window.location.pathname = "/pages/movie/"
        }

        img.style.width = "100%"
        img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
        name.textContent = item.title
        category.classList.add('category')
        name.classList.add('name')
        category.textContent = item.release_date
        place.append(elem)
        elem.append(img, name, category)
    }
}

export function reloadPersons(arr, place) {
    for (let item of arr) {

        let elem = document.createElement("div")
        let top = document.createElement("div")
        let bottom = document.createElement("div")
        let yellow = document.createElement("p")
        let name = document.createElement("h1")
        let nameEn = document.createElement("p")
        let age = document.createElement("p")

        elem.onclick = () => {
            localStorage.setItem("personId", item.id)
            window.location.pathname = "/pages/person/"
        }

        elem.classList.add('elem')
        elem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.profile_path})`
        elem.style.backgroundSize = "contain"
        top.classList.add('top')
        bottom.classList.add('bottom')
        yellow.classList.add("yellow")
        name.classList.add("name")
        nameEn.classList.add("nameEn")
        age.classList.add("age")

        yellow.textContent = item.popularity
        name.textContent = item.name
        nameEn.textContent = item.original_name
        age.textContent = "20"

        place.append(elem)
        elem.append(top, bottom)
        top.append(yellow)
        bottom.append(name, nameEn, age)
    }
}



export function reloadUpcoming(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let elem = document.createElement('div')
        let img = document.createElement("img")
        let name = document.createElement("p")
        let relize = document.createElement("p")

        img.onclick = () => {
            localStorage.setItem("userId", item.id)
            window.location.pathname = "/pages/movie/"
        }

        img.style.width = "100%"
        img.style.height = "auto"
        img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
        name.textContent = item.title
        relize.textContent = item.release_date
        relize.classList.add('category')
        name.classList.add('name')

        place.append(elem)
        elem.append(img, name, relize)
    }
}

export function reloadResult(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let search_results_item = document.createElement("div")
        let img = document.createElement("img")
        let search_results_info = document.createElement("div")
        let h2 = document.createElement("h2")
        let search_results_date = document.createElement('div')
        let rate = document.createElement("span")

        img.onclick = () => {
            localStorage.setItem("userId", item.id)
            window.location.pathname = "/pages/movie/"
        }

        search_results_item.classList.add("search_result-item")
        img.classList.add("search_results-img")
        rate.classList.add("search_results-rate")

        img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
        h2.textContent = item.title
        search_results_date.textContent = item.release_date
        rate.textContent = item.vote_average

        place.append(search_results_item)
        search_results_item.append(img, search_results_info, rate)
        search_results_info.append(h2, search_results_date)
    }
}

export function listTrailers(arr, place) {
    for (let item of arr) {
        let trailer__elem = document.createElement("div")
        let h2 = document.createElement("h2")
        let img = document.createElement("img")

        trailer__elem.classList.add("trailer__elem")
        h2.textContent = item.title
        img.src = "https://image.tmdb.org/t/p/original" + item.poster_path

        place.append(trailer__elem)
        trailer__elem.append(img, h2)

        trailer__elem.onclick = () => {
            localStorage.setItem("trailerId", item.id)
            window.location.reload()
        }


    }
}

export function reloadActors(arr, place) {
    for (let item of arr) {
        let elem = document.createElement("div")
        let name = document.createElement("p")
        let origin_name = document.createElement("p")
        let characters = document.createElement("p")
        let profile = document.createElement("img")
        elem.classList.add("elemActors")


        profile.onclick = () => {
            localStorage.setItem("personId", item.id)
            window.location.pathname = "/pages/person/"
        }

        profile.src = "https://image.tmdb.org/t/p/original" + item.profile_path
        name.textContent = item.name
        origin_name.textContent = item.original_name
        characters.textContent = item.character


        name.classList.add("nameA")
        origin_name.classList.add("nameO")
        characters.classList.add("character")

        place.append(elem)
        elem.append(profile, name, origin_name, characters)
    }
}

export function siquels_priquels(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let elem = document.createElement('div')
        let img = document.createElement("img")
        let name = document.createElement("p")


        img.onclick = () => {
            localStorage.setItem("userId", item.id)
            window.location.reload()
        }

        img.style.width = "100%"
        img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
        name.textContent = item.title
        name.classList.add('name')

        place.append(elem)
        elem.append(img, name)
    }
}
export function similar(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let elem = document.createElement('div')
        let img = document.createElement("img")
        let name = document.createElement("p")

        img.onclick = () => {
            localStorage.setItem("userId", item.id)
            window.location.reload()
        }

        img.style.width = "100%"
        img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
        name.textContent = item.title
        name.classList.add('name')

        place.append(elem)
        elem.append(img, name)
    }
}
export function bestMovies(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let elem = document.createElement('div')
        let img = document.createElement("img")
        let name = document.createElement("p")

        img.onclick = () => {
            localStorage.setItem("userId", item.id)
            window.location.pathname = "/pages/movie/"
        }

        img.style.width = "100%"
        img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
        name.textContent = item.title
        name.classList.add('name')

        place.append(elem)
        elem.append(img, name)
    }
}

export function images(arr, place) {
    for (let item of arr) {
        let img = document.createElement("img")
        let vote_average = document.createElement("p")
        let elem = document.createElement("div")
        img.src = "https://image.tmdb.org/t/p/original" + item.file_path

        vote_average.textContent = "vote_average:" + " " + item.vote_average
        vote_average.style.color = "white"
        vote_average.style.padding = "20px 0 30px"
        img.style.width = "300px"
        img.style.height = "400px"
        img.style.borderRadius = "10px"

        img.classList.add("grid")

        place.append(elem)
        elem.append(img, vote_average)

    }
}

export function reloadResultPerson(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let search_results_item = document.createElement("div")
        let img = document.createElement("img")
        let search_results_info = document.createElement("div")
        let h2 = document.createElement("h2")
        let search_results_date = document.createElement('div')
        let rate = document.createElement("span")

        img.onclick = () => {
            localStorage.setItem("personId", item.id)
            window.location.pathname = "/pages/person/"
        }

        search_results_item.classList.add("search_result-item")
        img.classList.add("search_results-img")
        rate.classList.add("search_results-rate")

        img.src = "https://image.tmdb.org/t/p/original" + item.profile_path
        h2.textContent = item.name
        search_results_date.textContent = item.original_name
        rate.textContent = item.popularity

        place.append(search_results_item)
        search_results_item.append(img, search_results_info, rate)
        search_results_info.append(h2, search_results_date)
    }
}