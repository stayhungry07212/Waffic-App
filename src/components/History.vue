<template>
  <v-layout>
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
          <td>
            <v-btn icon class="text-xs-right" @click="deleteItem(props.item)">
              <v-icon style="color: #433d6b;">delete</v-icon>
            </v-btn>
          </td>
          <td>
            <v-icon v-if="props.item.Favourite === false" @click="toogleFavourite(props.item)" style="color: #f86c5c;">star_border</v-icon>
            <v-icon v-else @click="toogleFavourite(props.item)" style="color: #f86c5c;">star</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-layout>
</template>

<script>
  /* eslint-disable no-unused-vars */
  export default {
    name: 'profil',
    data () {
      return {
        headers: [
          { text: 'Pornire', align: 'left', value: 'locstart'},
          { text: 'Destinație', value: 'locfinish'},
          { text: 'Data', value: 'data'},
          { text: 'Șterge', sortable: false, value: ''},
          { text: '', sortable: false, value: ''}
        ],
        items: []
      }
    },
    created: function () {
      this.$store.dispatch('getData')
    },
    watch: {
      userHistory (value) {
        this.items = value
      }
    },
    computed: {
      userHistory () {
        return this.$store.getters.userHistory
      },
      user () {
        return this.$store.getters.user
      },
      keysHistory () {
        return this.$store.getters.keysHistory
      }
    },
    methods: {
      deleteItem (item) {
        var index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?')
        this.$store.dispatch('deleteHistory', index)
      },
      toogleFavourite (item) {
        var index = this.items.indexOf(item)
        var index = this.items.indexOf(item)
        var thisHistory = this.userHistory[index]
        if(thisHistory.Favourite === false) {
          this.$store.dispatch('toogleFavouriteAdd', index) }
          else {
            this.$store.dispatch('toogleFavouriteDelete', index)
          }
      }
    }
  }
</script>