<template>
  <v-container fluid>
    <v-data-table
      :headers='headers'
      :items='items'
      item-key='name'
      class='elevation-1'>
      <template slot='headerCell' slot-scope='props'>
        <v-tooltip bottom>
          <span slot='activator'>
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot='items' slot-scope='props'>
        <td class='text-xs-left'>{{ props.item.Email }}</td>
        <td class='text-xs-left'>{{ props.item.Name }}</td>
        <td class='text-xs-left'>{{ props.item.Message }}</td>
        <td>
          <v-btn icon v-if="props.item.Responded === false" @click="toogleFavourite(props.item)">
            <v-icon style="color: #f86c5c;">chat_bubble_outline</v-icon>
          </v-btn>
          <v-btn icon v-else><v-icon style="color: #f86c5c;">chat</v-icon></v-btn>
          <v-btn icon class="text-xs-right" @click="deleteItem(props.item)" style="color: #433d6b;">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>



<script>
import firebase from '@/firebase'
export default {
  name: 'ReceivedMessages',
  data() {
    return {
      headers: [
        { text: 'Email', align: 'left', value: 'Email' },
        { text: 'Nume', value: 'Name' },
        { text: 'Mesaj', value: 'Message' },
        { text: '', value: 'delete' }
      ],
      items: [],
      keysItems: []
    }
  },
  computed: {
    messages() {
      return firebase.database().ref('ContactMessages').on('value',snap => {
        this.items = []
        this.keysItems = []
        var myObj = snap.val()
        if (myObj) {
          var keysMessages = Object.keys(snap.val())
            keysMessages.forEach(key => {
              var messagesDetails = {}
              messagesDetails.Email = myObj[key].Email
              messagesDetails.Name = myObj[key].Name
              messagesDetails.Message = myObj[key].Message
              messagesDetails.Responded = myObj[key].Responded
              this.items.push(messagesDetails)
          })
          this.keysItems = keysMessages
        } else {
          var messagesDetails = {}
          messagesDetails.Email = 'none'
          messagesDetails.Name = 'none'
          messagesDetails.Message = 'none'
          this.items.push(messagesDetails)
        }
      },
      function(error) {
        console.log('Error: ' + error.message)
      }
    )}
  },
  mounted () {
    return firebase.database().ref('ContactMessages').on('value',snap => {
      this.items = []
      this.keysMessages = []
      var myObj = snap.val()
      if (myObj) {
        var keysMessages = Object.keys(snap.val())
          keysMessages.forEach(key => {
            var messagesDetails = {}
            messagesDetails.Email = myObj[key].Email
            messagesDetails.Name = myObj[key].Name
            messagesDetails.Message = myObj[key].Message
            messagesDetails.Responded = myObj[key].Responded
            this.items.push(messagesDetails)
          })
        this.keysItems = keysMessages
      } else {
        var messagesDetails = {}
        messagesDetails.Email = 'none'
        messagesDetails.Name = 'none'
        messagesDetails.Message = 'none'
        this.items.push(messagesDetails)
      }
    },
    function(error) {
      console.log('Error: ' + error.message)
    }
  )},
  methods: {
    deleteItem (item) {
      var index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?')
      firebase.database().ref('/ContactMessages/' + this.keysItems[index]).remove()
    },
    toogleFavourite (item) {
      var index = this.items.indexOf(item)
      var thisMessage = this.items[index]
      if(thisMessage.Responded === false) {
        return firebase.database().ref('ContactMessages/' + this.keysItems[index]).update({Responded: true})
        }
      }
    }
  }
</script>