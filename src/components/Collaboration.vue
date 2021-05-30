<template>
  <v-container fluid grid-list-md>
    <v-alert :value="true" type="warning">
      Adăugarea unei noi colaborări la cont duce la anularea colaborării deja active, fără posibilitatea recuperării sumei precedente.
    </v-alert>
    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination">
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3>
        <v-card>
          <v-card-title><h4>{{ props.item.Name }}</h4></v-card-title>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Durată:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Duration }} zile</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Preț:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Price }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-icon @click="BuyColaboration(props.index)" style="cursor:pointer; color: #f86c5c;"> shopping_cart </v-icon>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
                  </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            {{ props.item.Description }}
          </v-card-text>
        </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-data-iterator>

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
            v-model="email"
            color="normal"
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
                :rules="[rules.required, rules.email]">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Nume"
                color="normal"
                v-model="nume"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Prenume"
                color="normal"
                v-model="prenume"
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
                :close-on-content-click="false"
                v-model="datanamenu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="datana"
                  label="Birthday date"
                  color="normal"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="datana"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="$refs.datanamenu.save(datana)"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                name="input-10-1"
                label="Parolă"
                color="normal"
                hint="Minim 8 caractere"
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
        Prin crearea contului declar că sunt de acord cu Termenii și Condițiile de utilizare a aplicației, cât și cu Politica de Confidențialitate.
        </v-container>
        <v-card-actions>
          <v-btn style="color: #f86c5c;" type="submit" @click="(signin=true) && (signup=false)">Înapoi</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="color: #f86c5c;" type="submit" @click="userSignUp">Înregistrare</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- formBuy -->
    <v-dialog v-model="buy" max-width="490">
      <v-card>
        <v-card-title
          style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;">
          Achiziționează colaborarea 
          <span v-if="items">
            "{{items[selected].Name}}"
          </span>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="Denumire companie"
                color="normal"
                v-model="DenumireCompanie"
                :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Descriere companie"
                color="normal"
                v-model="DescriereCompanie"
                :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Coordonata latitudine"
                color="normal"
                v-model="CoordonataLatitudine"
                :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Coordonata longitudine"
                color="normal"
                v-model="CoordonataLongitudine"
                :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs12 class='text-xs-center'>
              <v-btn v-bind:href='items[selected].payLink' target='_blank' flat style='color: #f86c5c;'  @click='Payment'>
                Înregistrează colaborarea
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  import firebase from '@/firebase'
  import moment from 'moment'
  import LocalitatiRO from '@/components/LocalitatiRO'
  export default {
    data () {
      return {
        DenumireCompanie: null,
        DescriereCompanie: null,
        CoordonataLatitudine: null,
        CoordonataLongitudine: null,
        show: false,
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 8
        },
        items: [],
        e1: true,
        signin: false,
        password: '',
        email: '',
        address: '',
        nume: null,
        prenume: null,
        buy: false,
        e3: null,
        localitate: null,
        datana: null,
        datanamenu: false,
        signup: false,
        confirmPassword: '',
        rules: {
          required: (value) => !!value || 'Obligatoriu.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email invalid.'
          }
        },
        locations: [],
        selected: 0
      }
    },
    created: function () {
      this.$store.dispatch('getTypesOfCollaborations')
      this.locations = LocalitatiRO
    },
    watch: {
      getTypesOfCollaborations (value) {
        this.items = value
      }
    },
    computed: {
      getTypesOfCollaborations () {
        return this.$store.getters.TypesOfCollaborations
      },
      user () {
        return this.$store.getters.user
      },
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Parolele nu corespund' : ''
      }
    },
    methods: {
      BuyColaboration (index) {
        if(this.user) {
          this.buy = true
            } else {
          this.signin = true
        }
        this.selected = index
      },
      Payment() {
        console.log("do it "+ this.items[this.selected].payLink)
        this.buy = false
        var day = new Date()
        var dayWrapper = moment(day)
        var dayString = dayWrapper.format("YYYY-MM-DD")
        firebase.database().ref('/UserDetails/' + this.user.uid + '/Collaborations/').push({
          StartDate: dayString,
          TypesOfCollaboration: this.selected,
          DenumireCompanie: this.DenumireCompanie,
          DescriereCompanie: this.DescriereCompanie,
          CoordonataLatitudine: this.CoordonataLatitudine,
          CoordonataLongitudine: this.CoordonataLongitudine
        })
        firebase.database().ref('/Collaborations/' + this.user.uid).set({
          StartDate: dayString,
          TypesOfCollaboration: this.selected,
          DenumireCompanie: this.DenumireCompanie,
          DescriereCompanie: this.DescriereCompanie,
          CoordonataLatitudine: this.CoordonataLatitudine,
          CoordonataLongitudine: this.CoordonataLongitudine
        })
      },
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
      },
    }
  }
</script>

<style scoped>
a, ul, li {
  text-decoration: none;
  list-style-type: none;
}
</style>