<template>
  <v-container grid-list-sm class="pa-4">
    <v-alert :value="true" type="warning" v-if="getCollaborationData">
    Colaborarea ta {{CollaborationWarning.Name}} pentru compania {{CollaborationWarning.CompanyName}} a fost activată în data de {{CollaborationWarning.StartDate}}.
    Aceasta are o durată totală de {{CollaborationWarning.Duration}} zile până la reactivarea automată.
    </v-alert>
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          label="Email"
          name="email"
          :value= getuserdetails.Email
          color="normal"
          id="Email"
          :rules="[rules.email]">
        </v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Nume"
          name="nume"
          color="normal"
          :value= getuserdetails.Name
          id="Name"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Prenume"
          name="prenume"
          color="normal"
          :value= getuserdetails.Surname
          id="Surname"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Localitate"
          name="localitate"
          color="normal"
          :value= getuserdetails.Locality
          id="Locality"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-menu
          ref="BirthDateMenu"
          lazy
          :close-on-content-click="false"
          v-model="BirthDateMenu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
          :return-value.sync="BirthDate">
          <v-text-field
            :label= getuserdetails.BirthDate
            name="Data nașterii"
            slot="activator"
            color="normal"
            v-model="BirthDate"
            prepend-icon="event"
            readonly
            id = "BirthDate">
          </v-text-field>
          <v-date-picker v-model="BirthDate" no-title scrollable @change="$refs.BirthDateMenu.save(BirthDate)">
            <v-spacer>
            </v-spacer>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          name="parolaactuala"
          label="Parolă actuală"
          hint="Minim 6 caractere"
          v-model="OldPassword"
          color="normal"
          min="6"
          :type="'password'"
          id = "OldPassword"
          required>
        </v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
            label="Parolă nouă"
            name="NewPassword"
            hint="Minim 6 caractere"
            color="normal"
            v-model="password"
            min="6"
            :append-icon-cb="() => (e1 = !e1)"
            :type="'password'"
            counter
          >
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            name="NewPasswordconfirm"
            label="Confirmă parolă nouă"
            hint="Minim 6 caractere"
            color="normal"
            v-model="confirmPassword"
            min="6"
            :type="'password'"
            :rules="[comparePasswords]"
            id = "NewPassword"
          >
        </v-text-field>
      </v-flex>
      <v-btn @click="savenewdetails">
        Salveaza modificările
      </v-btn>
    </v-layout>
  </v-container>
</template>

<style scoped>
</style>

<script>
  import firebase from '@/firebase'
  import moment from 'moment'
  import router from '@/router'
  export default {
    name: 'AccountDetails',
    data () {
      return {
        BirthDate: null,
        BirthDateMenu: false,
        password: '',
        email: '',
        e1: true,
        oldpassword: '',
        confirmPassword: '',
        OldPassword: '',
        user1: null,
        ceva: null,
        rules: {
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email invalid.'
          }
        },
        CollaborationWarning: {
          Name: null,
          Duration: null,
          CompanyName: null,
          StartDate: null
        }
      }
    },
    created: function () {
      this.$store.dispatch('getCollaborationData')
      this.$store.dispatch('getTypesOfCollaborations')
      this.$store.dispatch('getUserData')
    },
    watch: {
      getNameCollaboration (value) {
        this.CollaborationWarning = value
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      userdetails () {
        return this.$store.getters.userdetails
      },
      getCollaborationData () {
        return this.$store.getters.getCollaborationData
      },
      keysUsers () {
        return this.$store.getters.keysUsers
      },
      getuserdetails () {
        const x = this.keysUsers.indexOf(this.user.uid)
        const userdet = this.userdetails[x]
        return userdet
      },
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Parolele nu corespund' : ''
      },
      getTypesOfCollaborations () {
        return this.$store.getters.TypesOfCollaborations
      },
      getNameCollaboration () {
        try {
          this.CollaborationWarning.Name = this.getTypesOfCollaborations[this.getCollaborationData.TypesOfCollaboration].Name
          this.CollaborationWarning.CompanyName = this.getCollaborationData.DenumireCompanie
          this.CollaborationWarning.StartDate = this.getCollaborationData.StartDate
          this.CollaborationWarning.Duration = this.getTypesOfCollaborations[this.getCollaborationData.TypesOfCollaboration].Duration
        } catch (e) {
          //
        }
      },
    },
    methods: {
      savenewdetails () {
        const user = this.user.uid
        const Name = document.getElementById('Name').value
        const Surname = document.getElementById('Surname').value
        const Email = document.getElementById('Email').value
        const Locality = document.getElementById('Locality').value
        if (this.BirthDate) {
          const Birth = this.BirthDate
        } else {
          const Birth = this.getuserdetails.BirthDate
        }
        const NewPassword = document.getElementById('NewPassword').value
        const cale = firebase.database().ref('UserDetails/' + user)
        firebase.auth().signInWithEmailAndPassword(this.user.email,this.OldPassword).then( function () {
          cale.update({Name: Name, Surname: Surname, Locality: Locality, BirthDate: Birth})
          if(NewPassword !== null) {
          firebase.auth().currentUser.updatePassword(NewPassword).then(function() {
            console.log("Parola a fost schimbată")
          }).catch(function(error) {
                  console.log(error.message)
            })
          }
          if(Email !== null) {
          firebase.auth().currentUser.updateEmail(Email).then(function () {
            console.log('Emailul a fost schimbat')
            cale.update({Email: Email})
          }).catch(function (error) {
              console.log(error.message)
            })
          }
        }).catch(function(error){
          console.log(error.message)
        })
      }
    }
  }
</script>