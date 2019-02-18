var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = document.getElementById('countries');
var SVG_NS = 'http://www.w3.org/2000/svg';
var XLink_NS = 'http://www.w3.org/1999/xlink';
document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if (!countryName.length) countryName = 'Poland';
    fetch(url + countryName).then(function(resp) {
        return resp.json();
    }).then(showCountriesList).catch(function(error) {
        // code that will be executed in the case of an incorrect response from the server
    });
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function(item) {
        var liEl = document.createElement('li');
        liEl.innerHTML = item.name + ', capital city:' + item.capital;

        var svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute('width', 20);
        svg.setAttribute('height', 15);
        var flag = document.createElementNS(SVG_NS, 'image');
        flag.setAttributeNS(null, 'width', '20');
        flag.setAttributeNS(null, 'height', '15');
        flag.setAttributeNS(XLink_NS, 'xlink:href', item.flag);
        svg.appendChild(flag);
       
        liEl.appendChild(svg);
        countriesList.appendChild(liEl);
    });
}
