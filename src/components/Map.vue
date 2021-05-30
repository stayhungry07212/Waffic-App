<template>
  <v-container fluid grid-list-md>
    <v-flex>
      <div id="map"></div>
    </v-flex>

  </v-container>
</template>

<script>
  import firebase from '@/firebase'
  export default {
    name: 'Map',
    data () {
      return {
        map: null,
        directions: {
          service: null,
          display: null,
          start: null,
          end: null
        },
        vremeStart: {
          icon: null,
          temperatura: null
        },
        vremeFinish: {
          icon: null,
          temperatura: null
        }
      }
    },
    computed: {
      coords () {
        return this.$store.getters.location
      },
      Destination () {
        return this.$store.getters.Destination
      },
      location () {
        return this.$store.getters.location
      },
      collaborationsData () {
        return this.$store.getters.collaborationsData
      },
      mapPins () {
        var alCollabs = []
        firebase.database().ref('Collaborations')
        .on('value', snap => {
          const myObj = snap.val()
          const keysCollaborations = Object.keys(snap.val())
          keysCollaborations.forEach(key => {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(+myObj[key].CoordonataLatitudine, +myObj[key].CoordonataLongitudine),
              map: this.map,
              title: myObj[key].DenumireCompanie
            })
            const distanta = (Math.sqrt(Math.pow((+this.coords.lat - myObj[key].CoordonataLatitudine), 2) + Math.pow((+this.coords.long - myObj[key].CoordonataLongitudine), 2)) * 100 * 1000)
            console.log(distanta)
            if (distanta < 500) {
              alert("Ești aproape de "+ myObj[key].DenumireCompanie + " (" + myObj[key].DescriereCompanie + ")");
            }
            var infowindow = new google.maps.InfoWindow()
            google.maps.event.addListener( marker, 'click', function(){
              infowindow.setContent( myObj[key].DenumireCompanie )
              infowindow.open( this.map, this )
            }.bind( marker ) )
          })
        }, function (error) {
          console.log('Error: ' + error.message)
        })
      }
    },
    watch: {
      Destination: {
        deep: true,
        immediate: false,
        handler (newDest) {
          if (newDest && this.directions.service) {
            this.renderDirections()
          }
        }
      }
    },
    methods: {
      renderDirections () {
        this.getCity()
        if (this.Destination && this.directions.service) {
          this.directions.start = new google.maps.LatLng(this.location.lat, this.location.long)
          this.directions.end = this.Destination.geometry.location
          const request = {
            origin: this.directions.start,
            destination: this.directions.end,
            travelMode: 'DRIVING'
          }
          this.directions.service.route(request, (response, status) => {
            if (status === 'OK') {
              this.directions.display.setDirections(response)
            } else {
              window.alert('Directions request failed due to ' + status)
            }
          })
          // WEATHER
          // var apikey = "nIT7Uk4fHN82eVK6A6RoTOz1ABFZv6WN"
          var apikey = "gUErMQHAYCriONeCNTM7FhzxSz8wGygD"
          // var apikey = "MCkhPDniBk1LXiAVoHQF8oBcBfcMR250"
          // var apikey = "Hl2mLAz2LxmKsiGn9YNJyKqlhbH69mJr"
          // var apikey = "FhkABGhGW6SPZDZFxamNnyK9j2gz4EhG"
          const latlong = this.location.lat + ',' + this.location.long
          // ACTUAL LOCATION WEATHER
          const vremea = new XMLHttpRequest()
          vremea.open("GET","http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apikey + "&q=" + latlong + "&details=true", true)
          vremea.onload = () => {
            const locationKey = JSON.parse(vremea.responseText)
            const key1 = locationKey.Key
            const vremeaStatus = new XMLHttpRequest()
            vremeaStatus.open("GET","http://dataservice.accuweather.com/currentconditions/v1/" + key1 + "?apikey=" + apikey + "&details=true", true)
            vremeaStatus.send()
            vremeaStatus.onload = () => {
              const stareVreme = JSON.parse(vremeaStatus.responseText)
              const iconVreme = stareVreme[0].WeatherIcon
              this.vremeStart.icon = iconVreme
              const tempVreme = stareVreme[0].Temperature.Metric.Value
              this.vremeStart.temperatura = tempVreme
              }
          }
          vremea.send()
          // DESTINATION WEATHER
          const vremea2 = new XMLHttpRequest()
          vremea2.open("GET","http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + apikey + "&q=" + this.Destination.vicinity + "&details=true", true)
          vremea2.onload = () => {
            const locationKey2 = JSON.parse(vremea2.responseText)
            const key1 = locationKey2[0].Details.Key
            const vremea2Status = new XMLHttpRequest()
            vremea2Status.open("GET","http://dataservice.accuweather.com/currentconditions/v1/" + key1 + "?apikey=" + apikey + "&details=true", true)
            vremea2Status.send()
            vremea2Status.onload = () => {
              const stareVreme2 = JSON.parse(vremea2Status.responseText)
              const iconVreme2 = stareVreme2[0].WeatherIcon
              this.vremeFinish.icon = iconVreme2
              const tempVreme2 = stareVreme2[0].Temperature.Metric.Value
              this.vremeFinish.temperatura = tempVreme2
              }
            }
          vremea2.send()
          setTimeout(() => {
            this.sendWeather()
          }, 3000)
          setTimeout(this.renderDirections, 600000)
        }
      },
      sendWeather () {
        this.$store.dispatch('getDestinationWeather', {icon: this.vremeFinish.icon, temperature: this.vremeFinish.temperatura})
        this.$store.dispatch('getWeather', {icon: this.vremeStart.icon, temperature: this.vremeStart.temperatura})
      },
      getCity () {
        var latlng
        latlng = new google.maps.LatLng(this.location.lat, this.location.long)
        new google.maps.Geocoder().geocode({'latLng' : latlng}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var country = null, countryCode = null, city = null, cityAlt = null;
                    var c, lc, component
                    for (var r = 0, rl = results.length; r < rl; r += 1) {
                        var result = results[r]
                        if (!city && result.types[0] === 'locality') {
                            for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                                component = result.address_components[c]
                                if (component.types[0] === 'locality') {
                                    city = component.long_name;
                                    break;
                                }
                            }
                        }
                        else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
                            for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                                component = result.address_components[c]
                                if (component.types[0] === 'administrative_area_level_1') {
                                    cityAlt = component.long_name
                                    break;
                                }
                            }
                        } else if (!country && result.types[0] === 'country') {
                            country = result.address_components[0].long_name
                            countryCode = result.address_components[0].short_name
                        }
                        if (city && country) {
                            break;
                        }
                    }
                    this.$store.dispatch('saveInHistory', city)
                }
            }
        })
      }
    },
    mounted () {
      this.$store.dispatch('getCollaborations')
      // INIT MAP
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: +this.coords.lat, lng: +this.coords.long},
        zoom: 16
      })
      // DIRECTIONS
      this.directions.service = new google.maps.DirectionsService
      this.directions.display = new google.maps.DirectionsRenderer
      this.directions.start = new google.maps.LatLng(this.location.lat, this.location.long)
      this.directions.end = this.Destination.geometry.location
      this.directions.display.setMap(this.map)
      this.renderDirections()
      try {
        this.mapPins()
      } catch (e) {
        //
      }
    }
  }
</script>

<style scoped>
 #map {
   width: 100%;
   min-height: 570px;
   background-color: grey;
 }
</style>