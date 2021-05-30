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
          <td class="text-xs-left">{{ props.item.StartDate }}</td>
          <td class="text-xs-left">{{ props.item.TypesOfCollaboration }}</td>
          <td class="text-xs-left">{{ props.item.DenumireCompanie }}</td>
          <td class="text-xs-left">{{ props.item.DescriereCompanie }}</td>
          <td class="text-xs-left">{{ props.item.CoordonataLatitudine }}</td>
          <td class="text-xs-left">{{ props.item.CoordonataLongitudine }}</td>
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
  name: "UserCollaborationsHistory",
  data() {
    return {
      headers: [
        { text: "Data start", align: "left", value: "dataStart" },
        { text: "Tip colaborare", value: "tipColaborare" },
        { text: "Companie", value: "Companie" },
        { text: "Descriere companie", value: "DescriereCompanie" },
        { text: "Coordonata Latitudine", value: "CoordonataLatitudine" },
        { text: "Coordonata Longitudine", value: "CoordonataLongitudine" }
      ],
      items: [],
      id: this.$route.params.id
    }
  },
  watch: {
    collaborationsDetails (value) {
      this.items = value
    }
  },
  computed: {
    keysUsers() {
      return this.$store.getters.keysUsers
    },
    findIndex() {
      return this.keysUsers.indexOf(this.id)
    },
    collaborationsDetails() {
      return firebase.database().ref("UserDetails/" + this.id + '/Collaborations').on("value",snap => {
            var myObj = snap.val()
            if (myObj) {
              var keysCollaborations = Object.keys(snap.val())
                keysCollaborations.forEach(key => {
                  var details = {}
                  details.StartDate = myObj[key].StartDate
                  details.TypesOfCollaboration = myObj[key].TypesOfCollaboration
                  details.DenumireCompanie = myObj[key].DenumireCompanie
                  details.DescriereCompanie = myObj[key].DescriereCompanie
                  details.CoordonataLatitudine = myObj[key].CoordonataLatitudine
                  details.CoordonataLongitudine = myObj[key].CoordonataLongitudine
                  this.items.push(details)
              })
            } else {
              var details = {}
              details.StartDate = "none"
              details.TypesOfCollaboration = "none"
              details.DenumireCompanie = "none"
              details.DescriereCompanie = "none"
              details.CoordonataLatitudine = "none"
              details.CoordonataLongitudine = "none"
              this.items.push(details)
            }
          },
          function(error) {
            console.log("Error: " + error.message)
          }
        )
    }
  }
}
</script>