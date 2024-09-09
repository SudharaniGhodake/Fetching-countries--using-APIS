const countryName = new URLSearchParams(window.location.search).get('name')
const flagImg = document.querySelector('.country-details img')
const countryTitle = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const Population = document.querySelector('.Population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const language = document.querySelector('.language')
const borderCountries = document.querySelector('.border-country')
const backBtn = document.querySelector('.back-btn')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country);
    flagImg.src = country.flags.svg
    countryTitle.innerText = country.name.common
    Population.innerText = `${country.population.toLocaleString('en-IN')}`
    region.innerText = country.region
    // subRegion.innerText = country.subregion
    topLevelDomain.innerText = country.tld.join(', ')
    // capital.innerText = country.capital
    language.innerText = country.languages

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      nativeName.innerText = country.name.common
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion
    }

    if (country.capital) {
      capital.innerText = country.capital
    }

    if (country.languages) {
      language.innerText = Object.values(country.languages).join(', ')
    } else {
      language.innerText = ' '
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `http://127.0.0.1:5500/country.html?name=${borderCountry.name.common}`
           borderCountries.append(borderCountryTag)
          })
      })
    }
  })
