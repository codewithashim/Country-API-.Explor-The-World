const loadData = () => {
    const url = 'https://restcountries.com/v3.1/all'
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountry(data))
}

const displayCountry = (eliment) => {
    const countryDiv = document.getElementById('countryList')

    eliment.forEach(country => {

        console.log(country)

        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100 p-4">
            <img class="flagImg" src="${country.flags.png}" />
                <div class="card-body">
                    <h5 class="card-title">Country Name : ${country.name.common}</h5>
                    <p class="card-text">Capital : ${country.capital ? country.capital[0] : 'No Capital'}</p>
                    <p class="card-text">Region : ${country.region}</p>
                    <button class="countyDetailsBtn" onclick="countryDetails('${country.cca2}')">Details</button>
                </div>
            </div>

            `
        countryDiv.appendChild(div)

    })

}

const countryDetails = (code) => {
    const url = `https://restcountries.com/v3.1/alpha/${code}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetails(data))
}

const displayCountryDetails = (eliment) => {
    const countryDetailsDiv = document.getElementById('showDetails')

    eliment.forEach(countryDetails => {

        const { currencies } = countryDetails
        const currency = Object.keys(currencies)

        // console.log(currency)

        const div = document.createElement('div')
        div.classList.add('col', 'countryDetails')

        div.innerHTML = `
        <div class="card text-center p-3" style="width: 80%;">
                <img src="${countryDetails.flags.png}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Country Name : ${countryDetails.name.common}</h5>
                <h5 class="card-title">Country Code : ${countryDetails.cca2}</h5>
                <h5 class="card-title">Country Official Name : ${countryDetails.name.official}</h5>
                <h5 class="card-title">Country Independent : ${countryDetails.independent}</h5>
                <h5 class="card-title">Country Currencies : ${currencies[currency[0]].symbol} ${currencies[currency[0]].name}</h5>
            </div>
        </div>
        `
        countryDetailsDiv.appendChild(div)
    })

    toggoleSpiner(true)
}


const toggoleSpiner = (isLodaing) => {
    const loadingSection = document.getElementById('loading')
    if (isLodaing) {
        loadingSection.classList.remove('d-none')
    } else {
        loadingSection.classList.add('d-none')
    }
}



loadData()