var champ = document.getElementById("texte")
var envoie = document.getElementById("submit")
var contenu = document.getElementById("contenu")
var httpRequest = new XMLHttpRequest()

envoie.addEventListener("click", function (e) {
    e.preventDefault(e)
    contenu.innerHTML = ""
    let film = champ.value
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            let tempJSON = JSON.parse(httpRequest.response)
            console.log(tempJSON)
            tempJSON.results.forEach(element => {
                card(element)
            });
        }
    }
    httpRequest.open("GET", "https://swapi.co/api/films/?search=" + film, true)
    httpRequest.send()
})
function card(film) {
    let card = document.createElement("div")
    card.id = "card"
    card.classList = "card text-white bg-dark card border-warning offset-md-2"
    card.style = "width: 40rem;"
    let titre = document.createElement("h5")
    let cardBody = document.createElement("div")
    cardBody.classList = "card-body"
    let body = document.createElement("p")
    body.id = "para"
    body.classList = "card-text"
    body.innerHTML = " Directeur : " + film.director + "<br>" + "Date de sortie : " + film.release_date + "<br>" + film.opening_crawl
    titre.innerHTML = film.title
    titre.id = "title"
    cardBody.appendChild(body)
    card.appendChild(titre)
    card.appendChild(cardBody)
    contenu.appendChild(card)
    let footer = document.createElement("div")
    let button1 = document.createElement("button")
    footer.classList = "card-footer bg-transparent border-warning"
    footer.id = "footer"
    button1.type = "button"
    button1.id = "car"
    button1.classList = "btn btn-warning px-3"
    button1.innerHTML = "véhicules"
    footer.appendChild(button1)
    card.appendChild(footer)
    button1.addEventListener("click", function (e) {
        e.preventDefault(e)
        var ulElement = document.createElement("ul")
        for (let i = 0; i < film.vehicles.length; i++) {
            var http = new XMLHttpRequest()
            http.onreadystatechange = function () {
                if (http.readyState === 4 && http.status === 200) {
                    let vehiclesJSON = JSON.parse(http.response)
                    console.log(vehiclesJSON);
                    var liElement = document.createElement("li")
                    liElement.innerHTML = vehiclesJSON.name + " " + "modèle : " + vehiclesJSON.model + " taille du vaisseau : " + vehiclesJSON.length + " m "
                    ulElement.appendChild(liElement)
                }
            }
            http.open("GET", film.vehicles[i], false)
            http.send()
        }
        footer.appendChild(ulElement)
        footer.removeChild(button1)
    })
    let button2 = document.createElement("button")
    button2.classList = "btn btn-warning px-3"
    button2.innerHTML = "planètes"
    button2.id = "plan"
    footer.appendChild(button2)
    button2.addEventListener("click", function (e) {
        e.preventDefault(e)
        var ulPlanetes = document.createElement("ul")
        for (let i = 0; i < film.planets.length; i++) {
            let httpReq = new XMLHttpRequest()
            httpReq.onreadystatechange = function () {
                if (httpReq.readyState === 4 && httpReq.status === 200) {
                    let planJSON = JSON.parse(httpReq.response)
                    console.log(planJSON);
                    var liPlanetes = document.createElement("li")
                    liPlanetes.innerHTML = planJSON.name + "  " + planJSON.climate
                    ulPlanetes.appendChild(liPlanetes)
                }
            }
            httpReq.open("GET", film.planets[i], false)
            httpReq.send()
        }
        footer.appendChild(ulPlanetes)
        footer.removeChild(button2)
    })
}
// cré div si dif de null