<template>
  <v-layout column>
    <v-container fluid grid-list-md>
      <v-layout row wrap>

<!-- RAPORT: Toti utilizatorii -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    id="id1"
                    color="normal"
                    name="input1"
                    label="Caută utilizator după nume sau prenume"
                    v-model= "input1"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="filteredUsers"
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
                  <td class="text-xs-left">
                    <router-link :to="{ name: 'UserCollaborationsHistory', params: { id: props.item.Key}}" style="cursor:pointer;color: #433d6b;">
                      Vezi colaborări
                    </router-link>
                  </td>
                  <td class="text-xs-left">
                    <router-link :to="{ name: 'UsersHistory', params: { id: props.item.Key}}" style="cursor:pointer;color: #433d6b;">
                      Vezi istoric
                    </router-link>
                  </td>
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
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="date"
              >
                <v-text-field
                  slot="activator"
                  label="De la"
                  v-model="date"
                  color="normal"
                  prepend-icon="event"
                  readonly
                >
                </v-text-field>
                <v-date-picker v-model="date" no-title scrollable @change="$refs.menu.save(date)">
                </v-date-picker>
              </v-menu>
              <v-spacer>
              </v-spacer>
              <v-btn flat style="color: #f86c5c;" @click = "date = null, date1 = null">
                  Reset
              </v-btn>
              <v-spacer>
              </v-spacer>
              <v-menu
                ref="menu1"
                lazy
                :close-on-content-click="false"
                v-model="menu1"
                transition="scale-transition"
                offset-y
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="date1"
              >
                <v-text-field
                  slot="activator"
                  label="Până la"
                  v-model="date1"
                  color="normal"
                  prepend-icon="event"
                  readonly
                >
                </v-text-field>
                <v-date-picker v-model="date1" no-title scrollable @change="$refs.menu1.save(date1)">
                </v-date-picker>
              </v-menu>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers2"
                :items="filterCollabs"
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

<!-- RAPORT: Toate destinatiile -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    id="id3"
                    name="input3"
                    label="Caută destinația"
                    v-model= "input3"
                    color="normal"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers3"
                :items="filteredDestinations"
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
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left" value>{{ props.item.freq}}</td>
                </template>
              </v-data-table>
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
  name: "Search",
  data() {
    return {
      menu: false,
      input1: null,
      input3: null,
      date: null,
      menu1: false,
      date1: null,
      allDestinations: [],
      allUniqueDestinations: [],
      headers: [
        { text: '-', value: 'a' },
        { text: '--', value: 'b' },
        { text: 'Key', align: 'left', value: 'key' },
        { text: 'Nume', value: 'Name' },
        { text: 'Prenume', value: 'Surname' },
        { text: 'Data nașterii', value: 'BirthDate' },
        { text: 'Email', value: 'Email' },
        { text: 'Localitate', value: 'Locality' }
      ],
      items: [],
      headers2: [
        { text: 'Utilizator', align: 'left', value: 'utilizator'},
        { text: 'Data start', align: 'left', value: 'dataStart'},
        { text: 'Tip colaborare', value: 'tipColaborare'},
        { text: 'Companie', value: 'data'},
        { text: 'Descriere companie', value: ''}
      ],
      headers3: [
        { text: 'Destinație', value: 'destination' },
        { text: 'Frecvență (căutări)', value: 'frequence' }
      ],
      items2: []
    }
  },
  computed: {
    filteredUsers () {
      if (this.input1) {
        return this.items.filter(post => {
          return post.Name.toLowerCase().includes(this.input1.toLowerCase()) || post.Surname.toLowerCase().includes(this.input1.toLowerCase())
        })
      } else return this.items
    },
    filteredDestinations () {
      if (this.input3) {
        return this.allUniqueDestinations.filter(post => {
          return post.name.toLowerCase().includes(this.input3.toLowerCase())
        })
      } else return this.allUniqueDestinations
    },
    filterCollabs () {
      return this.items2.filter(item => {
        let beforeData = true
        let afterData = true
        let betweenData = true
        if (this.date || this.date1) {
          const data = moment(item.StartDate)
          const after = moment(this.date)
          const before = moment(this.date1)
          if (this.date === null && before) {
            beforeData = before ? data.isSameOrBefore(before) : true
          } else if (after && this.date1 === null) {
            afterData = after ? data.isSameOrAfter(after) : true
          } else if (after && before) {
            betweenData = (before && after) ? data.isBetween(after, before, null, '[]') : true
          }
        }
        return beforeData && afterData && betweenData
      })
    }
  },
  created () {
    this.userdetails()
    this.allUsersDestinations()
    this.collaborationsDetails()
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
        var allDestt =[]
        for (var j=0; j < uniqueArray.length; j++) {
          var count = 0
          for (var i=0; i < allDest.length; i++) {
            if(allDest[i] === uniqueArray[j]) {
              count++
            }
          }
          allDestt.push({ name: uniqueArray[j], freq: count})
        }
        this.allUniqueDestinations = allDestt
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
    }
  }
}
</script>