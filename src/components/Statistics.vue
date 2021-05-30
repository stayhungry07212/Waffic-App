<template>
  <v-layout column>
    <v-container fluid grid-list-md>
      <v-layout row wrap>

<!-- RAPORT: Toti utilizatorii -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" > account_box
              </v-icon>
              Toți utilizatorii
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="items"
                item-key="name"
                class="elevation-1">
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.Key }}</td>
                  <td class="text-xs-left">{{ props.item.Name }}</td>
                  <td class="text-xs-left">{{ props.item.Surname }}</td>
                  <td class="text-xs-left">{{ props.item.BirthDate }}</td>
                  <td class="text-xs-left">{{ props.item.Email }}</td>
                  <td class="text-xs-left">{{ props.item.Locality }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Toate colaborarile -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" > add_shopping_cart
              </v-icon>
              Toate colaborările
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers2"
                :items="items2"
                item-key="name"
                class="elevation-1">
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.Utilizator }}</td>
                  <td class="text-xs-left">{{ props.item.StartDate }}</td>
                  <td class="text-xs-left">{{ props.item.TypesOfCollaboration }}</td>
                  <td class="text-xs-left">{{ props.item.DenumireCompanie }}</td>
                  <td class="text-xs-left">{{ props.item.DescriereCompanie }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Top utilizatori activi -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" > sentiment_very_satisfied
              </v-icon>
              Top utilizatori activi
            </v-card-title>
            <v-card-text>
              <v-card>
              <v-list>
                <v-list-tile v-for="(item, index) in topusersHistory" :key="index">
                  <v-list-tile-action>
                    <v-icon v-if="index === 0" style="color: #433d6b;" >star</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Top destinatii dupa cautari -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" > directions_car
              </v-icon>
              Top destinații căutate
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in topDestination" :key="index">
                    <v-list-tile-action>
                      <v-icon v-if="index === 0" style="color: #433d6b;" >star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
           </v-card>
        </v-flex>

<!-- RAPORT: Top cei mai activi colaboratori -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" > business_center
              </v-icon>
              Top colaboratori
            </v-card-title>
            <v-card-text>
              <v-card>
              <v-list>
                <v-list-tile v-for="(item, index) in topusersCollab" :key="index">
                  <v-list-tile-action>
                    <v-icon v-if="index === 0" style="color: #433d6b;" >star</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- STATISTICA: Useri CU/FARA colaborari -->
        <v-flex xs6>
          <v-card>
            <v-card-title>
              <v-icon style="color: #f86c5c;">
                work
              </v-icon>
              Utilizatori cu/fără colaborări
            </v-card-title>
            <v-card-text>
              <div id="piechart1"></div>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- STATISTICA: Useri CU/FARA istoric -->
        <v-flex xs6>
          <v-card>
            <v-card-title>
              <v-icon style="color: #f86c5c;">
                history
              </v-icon>
              Utilizatori cu/fără istoric
            </v-card-title>
            <v-card-text>
              <div id="piechart2"></div>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Top locații utilizatori -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" > location_city
              </v-icon>
              Top domicilii utilizatori
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in usersLocations" :key="index">
                    <v-list-tile-action>
                      <v-icon v-if="index === 0" style="color: #433d6b;" >star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
           </v-card>
        </v-flex>

<!-- RAPORT: Top tipuri colaborari active -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" > attach_money
              </v-icon>
              Top tip colaborari active
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in topCollabs" :key="index">
                    <v-list-tile-action>
                      <v-icon v-if="index === 0" style="color: #433d6b;" >star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
           </v-card>
        </v-flex>

<!-- RAPORT: Top tipuri colaborari active -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" > calendar_today
              </v-icon>
              Top vârste utilizatori
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in userAges" :key="index">
                    <v-list-tile-action>
                      <v-icon v-if="index === 0" style="color: #433d6b;" >star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
           </v-card>
        </v-flex>

<!-- STATISTICA: Barchart frecventa varste -->
        <v-flex>
          <v-card>
            <v-card-title>
              <v-icon style="color: #f86c5c;">
                perm_identity
              </v-icon>
              Frecvența vârstelor utilizatorilor
            </v-card-title>
            <v-card-text>
              <div id="barchart1"></div>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Toate destinatiile -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-icon style="color: #433d6b;" >
                location_on
              </v-icon>
              Toate destinațiile căutate de utilizatori
            </v-card-title>
            <v-card-text>
            <v-select
              v-model="allUniqueDestinations"
              chips
              tags
              solo
              disabled>
              <template slot="selection" slot-scope="data">
                <v-chip style="color: #433d6b;"  label outline>
                 {{ data.item }}
                </v-chip>
              </template>
            </v-select>
          </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import firebase from "@/firebase"
import moment from "moment"
export default {
  name: "Statistics",
  data() {
    return {
      items1: [
        { icon: true, title: 'Jason Oner', avatar: '/static/doc-images/lists/1.jpg' },
        { title: 'Travis Howard', avatar: '/static/doc-images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: '/static/doc-images/lists/4.jpg' }
      ],
      nr1: [3, 5, 10],
      e1: 3,
      allDestinations: [],
      allUniqueDestinations: [],
      headers: [
        { text: 'Key', align: 'left', value: 'key' },
        { text: 'Nume', value: 'Name' },
        { text: 'Prenume', value: 'Surname' },
        { text: 'Data nașterii', value: 'BirthDate' },
        { text: 'Email', value: 'Email' },
        { text: 'Localitate', value: 'Locality' }
      ],
      items: [],
      usersLocations: [],
      headers2: [
        { text: 'Utilizator', align: 'left', value: 'utilizator'},
        { text: 'Data start', align: 'left', value: 'dataStart'},
        { text: 'Tip colaborare', value: 'tipColaborare'},
        { text: 'Companie', value: 'data'},
        { text: 'Descriere companie', value: ''}
      ],
      items2: [],
      topDestination: [],
      topusersHistory: [],
      topusersCollab: [],
      usersWithCollab: 0,
      usersWithoutCollab: 0,
      usersWithHistory: 0,
      usersWithoutHistory: 0,
      topCollabs: [],
      userAges: [],
      allUsersAges: []
    }
  },
  mounted () {
    this.topusersbyCollaborations()
    this.userdetails()
    this.allUsersDestinations()
    this.collaborationsDetails()
    this.topDestinations()
    this.topUsersbySearch()
    this.piechart1()
    this.piechart2()
    this.topUsersLocations()
    this.topCollaborations()
    this.usersAges()
    this.barchart()
  },
  methods: {
    userdetails () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        const myObj = snap.val()
        var alluserdetails = []
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          const userdetails = {}
          userdetails.BirthDate = myObj[key].BirthDate
          userdetails.Locality = myObj[key].Locality
          userdetails.Name = myObj[key].Name
          userdetails.Surname = myObj[key].Surname
          userdetails.Email = myObj[key].Email
          userdetails.Key = key
          alluserdetails.push(userdetails)
        })
        this.items = alluserdetails
      }, function (error) {
        console.log('Error: ' + error.message)
      })
    },
    allUsersDestinations () {
      return firebase.database().ref('userDestinationsHistory')
      .on('value', snap => {
        var allDest = []
        const myObj = snap.val()
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          const keysHistory = Object.keys(myObj[key])
          keysHistory.forEach(key1 => {
            allDest.push(myObj[key][key1].Finish)
          })
        })
        this.allDestinations = allDest
        var uniqueArray = allDest.filter(function(item, pos) {
            return allDest.indexOf(item) == pos;
        })
        this.allUniqueDestinations = uniqueArray
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
    collaborationsDetails () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        var myObj = snap.val()
        var alldetails = []
        var keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          if(myObj[key].Collaborations) {
            var keysCollaborations = Object.keys(myObj[key].Collaborations)
            keysCollaborations.forEach(key2 => {
              var details = {}
              details.Utilizator = key
              details.StartDate = myObj[key].Collaborations[key2].StartDate
              details.TypesOfCollaboration = myObj[key].Collaborations[key2].TypesOfCollaboration
              details.DenumireCompanie = myObj[key].Collaborations[key2].DenumireCompanie
              details.DescriereCompanie = myObj[key].Collaborations[key2].DescriereCompanie
              alldetails.push(details)
            })
          }
        })
        this.items2 = alldetails
      }, function (error) {
        console.log('Error: ' + error.message)
      })
    },
    topDestinations () {
      return firebase.database().ref('userDestinationsHistory')
      .on('value', snap => {
        var allDest = []
        const myObj = snap.val()
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          const keysHistory = Object.keys(myObj[key])
          keysHistory.forEach(key1 => {
            allDest.push(myObj[key][key1].Finish)
          })
        })
        allDest.sort()
        for(var j = 0; j < 3; j ++) {
          if(allDest.length == 0) console.log('e gol')
          var modeMap = {}
          var maxEl = allDest[0], maxCount = 1
          for(var i = 0; i < allDest.length; i++)
            {
              var el = allDest[i]
              if(modeMap[el] == null)
                modeMap[el] = 1
              else
                modeMap[el]++
              if(modeMap[el] > maxCount)
              {
                maxEl = el
                maxCount = modeMap[el]
              }
            }
            for(var i = 0; i < allDest.length; i++)
            {
              if(maxEl.localeCompare(allDest[i]) == 0) {
                allDest.splice(i,maxCount)
              }
            }
          this.topDestination.push(maxEl)
        }
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
    topUsersbySearch () {
      return firebase.database().ref('userDestinationsHistory')
      .on('value', snap => {
        const myObj = snap.val()
        const topSearch = []
        const numbers = []
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          numbers.push(Object.keys(myObj[key]).length)
        })
        this.usersWithHistory = keysUsers.length
        for(var i = 0; i < 3; i ++) {
          if(numbers.length == 0) console.log('e gol')
            if(Math.max(...numbers) !== 0) {
            var a = numbers.indexOf(Math.max(...numbers))
            topSearch.push(keysUsers[a])
            numbers[a] = 0
            }
          }
         this.topusersHistory = topSearch
        }, error => {
        console.log('Error: ' + error.message)
      })
    },
    topusersbyCollaborations () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        const topSearch = []
        const numbers = []
        var myObj = snap.val()
        var keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          numbers.push(Object.keys(myObj[key].Collaborations).length)
          if(Object.keys(myObj[key].Collaborations).length === 0) {
            this.usersWithoutCollab = +this.usersWithoutCollab + 1
          } else {
            this.usersWithCollab = +this.usersWithCollab + 1
          }
        })
        for(var i = 0; i < 3; i ++) {
          if(numbers.length == 0) console.log('e gol')
            if(Math.max(...numbers) !== 0) {
            var a = numbers.indexOf(Math.max(...numbers))
            topSearch.push(keysUsers[a])
            numbers[a] = 0
            }
          }
        this.topusersCollab = topSearch
      }, function (error) {
        console.log('Error: ' + error.message)
      })
    },
    piechart1 () {
      var colors = ['#9c5463', '#7b4c67', '#c86060', '#5e4469', '#7f4c66','#b25a62']
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('piechart1'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Tip', 'Numar'],
          ['Cu Colaborări', this.usersWithCollab],
          ['Fără Colaborări', this.usersWithoutCollab]
        ]), { is3D: false, colors: ['#f86c5c', colors[Math.floor(Math.random() * colors.length)]] })
     }})
    },
    piechart2 () {
      var myObjwith = []
      var myObj = []
      var colors = ['#9c5463', '#7b4c67', '#c86060', '#5e4469', '#7f4c66','#b25a62']
      firebase.database().ref('UserDetails')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      firebase.database().ref('userDestinationsHistory')
        .on('value', snap => {
          myObjwith = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('piechart2'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Tip', 'Numar'],
          ['Cu Istoric', Object.keys(myObjwith).length],
          ['Fără Istoric', Object.keys(myObj).length - Object.keys(myObjwith).length]
        ]), { is3D: false, colors: ['#f86c5c', colors[Math.floor(Math.random() * colors.length)]]})
      }})
    },
    topUsersLocations () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        var allLocations = []
        const myObj = snap.val()
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          allLocations.push(myObj[key].Locality)
        })
        allLocations.sort()
        for(var j = 0; j < 3; j ++) {
          if(allLocations.length == 0) console.log('e gol')
          var modeMap = {}
          var maxEl = allLocations[0], maxCount = 1
          for(var i = 0; i < allLocations.length; i++)
            {
              var el = allLocations[i]
              if(modeMap[el] == null)
                modeMap[el] = 1
              else
                modeMap[el]++
             if(modeMap[el] > maxCount)
              {
                maxEl = el
                maxCount = modeMap[el]
              }
            }
            for(var i = 0; i < allLocations.length; i++)
            {
              if(maxEl.localeCompare(allLocations[i]) == 0) {
                allLocations.splice(i,maxCount)
              }
            }
          this.usersLocations.push(maxEl)
        }
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
    topCollaborations () {
      return firebase.database().ref('Collaborations')
      .on('value', snap => {
        var collaborationTypes =['1week','HappyMonth','BeOnline','What about six?','Forget about payment']
        var allTopCollabs = []
        var allCollabs = []
        const myObj = snap.val()
        const keysCollabs = Object.keys(snap.val())
        keysCollabs.forEach(key => {
          allCollabs.push(myObj[key].TypesOfCollaboration)
        })
        allCollabs.sort()
        for(var j = 0; j < 3; j ++) {
          var modeMap = {}
          var maxEl = allCollabs[0], maxCount = 1
          for(var i = 0; i < allCollabs.length; i++)
            {
              var el = allCollabs[i]
              if(modeMap[el] == null)
                modeMap[el] = 1
              else
                modeMap[el]++
             if(modeMap[el] > maxCount)
              {
                maxEl = el
                maxCount = modeMap[el]
              }
            }
            for(var i = 0; i < allCollabs.length; i++)
            {
              if(maxEl === allCollabs[i]) {
                allCollabs.splice(i,maxCount)
              }
            }
          allTopCollabs.push(maxEl)
        }
        for(var i = 0; i < allTopCollabs.length; i++)
        {
          allTopCollabs[i] = collaborationTypes[i]
        }
        this.topCollabs = allTopCollabs
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
    usersAges () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        var allAgesinNumber = []
        var allAges = []
        const myObj = snap.val()
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          var x = myObj[key].BirthDate
          allAges.push(moment(x).format())
        })
        for(var i = 0; i < allAges.length; i ++) {
          allAges[i] = Math.round(moment.duration(moment(new Date()).diff(moment(allAges[i]))).asYears())
          this.allUsersAges.push(allAges[i])
        }
        allAges.sort()
        for(var j = 0; j < 3; j ++) {
          if(allAges.length == 0) console.log('e gol')
          var modeMap = {}
          var maxEl = allAges[0], maxCount = 1
          for(var i = 0; i < allAges.length; i++)
            {
              var el = allAges[i]
              if(modeMap[el] == null)
                modeMap[el] = 1
              else
                modeMap[el]++
             if(modeMap[el] > maxCount)
              {
                maxEl = el
                maxCount = modeMap[el]
              }
            }
            for(var i = 0; i < allAges.length; i++)
            {
              if(maxEl === allAges[i]) {
                allAges.splice(i,maxCount)
              }
            }
          this.userAges.push(maxEl)
        }
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
    barchart () {
        var a = []
        var b = []
        var colors = ['#9c5463', '#7b4c67', '#c86060', '#5e4469', '#7f4c66','#b25a62','#f86c5c']
        var prev
        this.allUsersAges.sort()
        for ( var i = 0; i < this.allUsersAges.length; i++ ) {
            if ( this.allUsersAges[i] !== prev ) {
                a.push(this.allUsersAges[i])
                b.push(1)
            } else {
                b[b.length-1]++
            }
            prev = this.allUsersAges[i]
        }
        var x = [[ 'Ani', 'Frecvență', { role: 'style' } ]]
        for (var i = 0; i < a.length; i++) {
          x.push([a[i], b[i], colors[Math.floor(Math.random() * colors.length)]])
        }
        window.google.charts.setOnLoadCallback(() => {
          var view = new window.google.visualization.DataView(
            window.google.visualization.arrayToDataTable(x))
           view.setColumns([0, 1,
             { calc: 'stringify',
               sourceColumn: 1,
               type: 'string',
               role: 'annotation' },
             2])
          var chart = new window.google.visualization.ColumnChart(document.getElementById('barchart1'))
          chart.draw(view, {
             height: 400,
             bar: {groupWidth: '95%'},
            legend: { position: 'none' }})
        })
    }
  }
}
</script>