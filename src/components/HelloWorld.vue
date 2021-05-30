<template>
  <v-layout column align-center>
    <v-container fluid>
      <v-jumbotron
        gradient='to right, rgba(67, 61, 107), rgba(248, 108, 92)'
        :src="require('../assets/HelloWorld/HelloWorld.jpg')"
        style="position: absolute; top:0; left:0; width:100%; height:100%; display: block; z-index:0;"
        dark>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-right>
              <div class="title mb-3">
                <img :src="require('../assets/LOGO-EXTINS.png')"/>
              </div>
              <v-btn style="color: #f86c5c; background-color: white;" @click="(signin=true) && (signup=false)" v-if="!user">Intră în cont</v-btn>
              <v-btn style="color: #f86c5c; background-color: white;" @click="(signup=true) && (signin=false)" v-if="!user">Crează un cont nou</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

  <!-- SIGN IN -->
      <v-dialog v-model="signin" max-width="490">
        <v-card>
          <v-card-title
            style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;">
            Intră în cont
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
              <v-text-field
              label="Email"
              color="normal"
              v-model="email"
              :rules="[rules.required, rules.email]"
              >
              </v-text-field>
              <v-text-field
                name="input-10-1"
                label="Parola"
                hint="Minim 8 caractere"
                v-model="password"
                color="normal"
                min="8"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                :rules="[rules.required]"
                counter
              >
              </v-text-field>
            </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn style="color: #f86c5c;" type="submit" @click="(signup=true) && (signin=false)">Cont nou</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="normal" type="submit" @click="userRecover">Am uitat parola</v-btn>
            <v-btn style="color: #f86c5c;" type="submit" @click="userSignin">Intră în cont</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  <!-- SIGNUP -->
      <v-dialog v-model="signup" max-width="490">
        <v-card>
          <v-card-title
            style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;">
            Crează cont nou
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-text-field
                  label="Email"
                  v-model="email"
                  color="normal"
                  :rules="[rules.required, rules.email]"
                >
              </v-text-field>
              </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Nume"
                    v-model="nume"
                    color="normal"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Prenume"
                    v-model="prenume"
                    color="normal"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :items="locations"
                    color="normal"
                    v-model="localitate"
                    label="Localitate"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-menu
                    ref="datanamenu"
                    lazy
                    :close-on-content-click="false"
                    v-model="datanamenu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    min-width="290px"
                    :return-value.sync="datana"
                  >
                    <v-text-field
                      slot="activator"
                      label="Data nașterii"
                      color="normal"
                      v-model="datana"
                      prepend-icon="event"
                      readonly
                    >
                    </v-text-field>
                    <v-date-picker v-model="datana" no-title scrollable @change="$refs.datanamenu.save(datana)">
                      <v-spacer>
                      </v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="input-10-1"
                    label="Parolă"
                    hint="Minim 8 caractere"
                    color="normal"
                    v-model="password"
                    min="8"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="'password'"
                    :rules="[rules.required]"
                    counter
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="input-10-1"
                    label="Confirmă parolă"
                    hint="Minim 8 caractere"
                    color="normal"
                    v-model="confirmPassword"
                    min="8"
                    :type="'password'"
                    :rules="[comparePasswords]"
                  >
                  </v-text-field>
                </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn style="color: #f86c5c;" type="submit" @click="(signin=true) && (signup=false)">Înapoi</v-btn>
            <v-spacer></v-spacer>
            <v-btn style="color: #f86c5c;" type="submit" @click="userSignUp">Înregistrare</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-layout>
</template>

<script>
  import firebase from '@/firebase'
  import moment from "moment"
  import LocalitatiRO from "@/components/LocalitatiRO"
  export default {
    name: 'HOME',
    data () {
      return {
        e1: true,
        signin: false,
        password: '',
        email: '',
        address: '',
        nume: null,
        prenume: null,
        localitate: null,
        datana: null,
        datanamenu: false,
        signup: false,
        confirmPassword: '',
        locations: [],
        rules: {
          required: (value) => !!value || 'Obligatoriu.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email invalid.'
          }
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Parolele nu corespund' : ''
      }
    },
    methods: {
      userSignin () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
        this.signin=false
      },
      userRecover () {
        const emailprompt = prompt("Introdu emailul pentru care dorești recuperarea parolei", "");
        firebase.auth().sendPasswordResetEmail(emailprompt).then(function() {
          window.alert("A fost trimis un email de recuperare a parolei la adresa: "+ emailprompt)
        }).catch(function(error) {
          window.alert(error.message)
        })
      },
      userSignUp () {
        this.$store.dispatch('signUp', {email: this.email, password: this.password, nume: this.nume, prenume: this.prenume, localitate: this.localitate, datana: this.datana})
        this.signup=false
      }
    },
    created () {
      this.locations = LocalitatiRO
    }
  }
</script>

<style>
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>