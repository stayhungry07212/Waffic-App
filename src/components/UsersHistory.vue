<template>
    <v-container fluid>
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
          <td class="text-xs-left">{{ props.item.Start }}</td>
          <td class="text-xs-left">{{ props.item.Finish }}</td>
          <td class="text-xs-left">{{ props.item.Date }}</td>
          <td class="text-xs-left">{{ props.item.Favourite }}</td>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn flat style="color: #f86c5c;" router to = "/Search">Back</v-btn>
      </v-card-actions>
    </v-container>
</template>

<script>
import firebase from "@/firebase"
export default {
  name: "UsersHistory",
  data() {
    return {
      headers: [
        { text: "Start", align: "left", value: "start" },
        { text: "Destinatie", value: "finish" },
        { text: "Data", value: "Data" },
        { text: "Favorit", value: "favorit" }
      ],
      items: [],
      id: this.$route.params.id
    }
  },
  computed: {
    keysUsers() {
      return this.$store.getters.keysUsers
    },
    findIndex() {
      return this.keysUsers.indexOf(this.id)
    },
    userHistoryDetails() {
      return firebase.database().ref('userDestinationsHistory/' + this.id)
        .on('value', snap => {
          this.items = []
          const myObj = snap.val()
          const allHistory = []
          try {
            const keys = Object.keys(snap.val())
            keys.forEach(key => {
              const thisHistory = {}
              thisHistory.Date = myObj[key].Date
              thisHistory.Favourite = myObj[key].Favourite
              thisHistory.Finish = myObj[key].Finish
              thisHistory.Start = myObj[key].Start
              allHistory.push(thisHistory)
            })
            this.items = allHistory
          } catch (e) {
            console.log('no more history')
          }
        }, function (error) {
          console.log('Error: ' + error.message)
      })
    }
  },
  mounted () {
    return firebase.database().ref('userDestinationsHistory/' + this.id)
      .on('value', snap => {
        this.items = []
        const myObj = snap.val()
        const allHistory = []
        try {
          const keys = Object.keys(snap.val())
          keys.forEach(key => {
            const thisHistory = {}
            thisHistory.Date = myObj[key].Date
            thisHistory.Favourite = myObj[key].Favourite
            thisHistory.Finish = myObj[key].Finish
            thisHistory.Start = myObj[key].Start
            allHistory.push(thisHistory)
          })
          this.items = allHistory
        } catch (e) {
          console.log('no more history')
        }
      }, function (error) {
        console.log('Error: ' + error.message)
    })
  }
}
</script>