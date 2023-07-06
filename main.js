let input = document.getElementById('input');
let ipContainer = document.getElementById('ip-res');
let locationContainer = document.getElementById('location-res');
let timeZoneContainer = document.getElementById('timezone-res');
let ispContainer = document.getElementById('isp-res');
let btn = document.getElementById('btn');
let map ;
// to get the user ip address /\ api url : https://api.ipify.org/?format=json
// api url : https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_kGELZ4mYKT3l2MH2BXqgebGl8lyj7&ipAddress=8.8.8.8


getUserLocation()
function getUserLocation(){
  axios.get('https://api.ipify.org/?format=json')
  .then((res) => {
    let userIp = res.data.ip;
    getLocation(userIp , true)
  })
  .catch((err) => {
    let map = L.map('map' , { zoomControl: false }).setView([51.505, -0.09], 13);
  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
  }).addTo(map);
  
  let myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  L.marker([51.5, -0.09], {icon: myIcon}).addTo(map);
  });
}

function getLocation(ip , isItFirstTime) {
  axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_kGELZ4mYKT3l2MH2BXqgebGl8lyj7&ipAddress=${ip}`)
  .then((res) => {
    let lat = res.data.location.lat;
    let lng = res.data.location.lng;
    ipContainer.innerHTML = ip;
    locationContainer.innerHTML = res.data.location.city;
    timeZoneContainer.innerHTML =  `UTC ${res.data.location.timezone}`;
    ispContainer.innerHTML = res.data.isp;
    /*********************************************************************************************/
    if(isItFirstTime){
      map = L.map('map', { zoomControl: false }).setView([lat, lng], 13);
    }else{
      map.panTo(new L.LatLng(lat, lng));
    }
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map);
    myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    });
    L.marker([lat, lng], {icon: myIcon}).addTo(map);
  })
  .catch((err) => {
    console.log(err);
  })
}


btn.addEventListener('click', () => {
  if(input.value != ''){
    getLocation(input.value , false)
  }
  else {
    alert('please enter an ip address')
  }
})