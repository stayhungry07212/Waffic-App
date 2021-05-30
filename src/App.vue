<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list dense>
        <!-- INTRARE CONT / CREARE CONT NOU -->

        <v-list-tile v-if="!user">
          <v-list-tile-action @click="signin=true" style="cursor:pointer">
            <v-icon style="color: #f86c5c;">account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            @click="signin=true"
            style="cursor:pointer"
          >Intră în cont / Creează cont nou</v-list-tile-title>
        </v-list-tile>

        <!-- DETALII CONT -->

        <v-subheader inset v-if="user">Detalii cont</v-subheader>

        <!-- DATE PERSONALE -->

        <v-list-tile v-if="user">
          <router-link to="/AccountDetails" tag="li" style="cursor:pointer">
            <v-list-tile-action>
              <v-icon style="color: #433d6b;">person</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link to="/AccountDetails" tag="li" style="cursor:pointer">
            <v-list-tile-title>Date personale</v-list-tile-title>
          </router-link>
        </v-list-tile>

        <!-- ISTORIC RUTE -->

        <v-list-tile v-if="user">
          <router-link to="/History/:uid" tag="li" style="cursor:pointer">
            <v-list-tile-action>
              <v-icon style="color: #433d6b;">directions</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link to="/History" tag="li" style="cursor:pointer">
            <v-list-tile-title>Călătoriile tale</v-list-tile-title>
          </router-link>
        </v-list-tile>

        <!-- ADMINISTRARE-->

        <v-subheader inset v-if="admin === true && user">ADMINISTRARE</v-subheader>

        <!-- MESAJE RECEPTIONATE -->

        <v-list-tile v-if="admin === true && user">
          <router-link to="/ReceivedMessages" tag="li" style="cursor:pointer">
            <v-list-tile-action>
              <v-icon style="color: #433d6b;">question_answer</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link to="/ReceivedMessages" tag="li" style="cursor:pointer">
            <v-list-tile-title>Mesaje</v-list-tile-title>
          </router-link>
        </v-list-tile>

        <!-- STATISTICI -->

        <v-list-tile v-if="admin === true && user">
          <router-link to="/Statistics" tag="li" style="cursor:pointer">
            <v-list-tile-action>
              <v-icon style="color: #433d6b;">donut_large</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link to="/Statistics" tag="li" style="cursor:pointer">
            <v-list-tile-title>Statistici și rapoarte</v-list-tile-title>
          </router-link>
        </v-list-tile>

        <!-- CAUTA -->

        <v-list-tile v-if="admin === true && user">
          <router-link to="/Search" tag="li" style="cursor:pointer">
            <v-list-tile-action>
              <v-icon style="color: #433d6b;">search</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link to="/Search" tag="li" style="cursor:pointer">
            <v-list-tile-title>Caută...</v-list-tile-title>
          </router-link>
        </v-list-tile>

        <v-divider inset></v-divider>

        <!-- CONTACT -->

        <v-list-tile>
          <v-list-tile-action @click="contactform=true" style="cursor:pointer">
            <v-icon style="color: #433d6b;">chat</v-icon>
          </v-list-tile-action>
          <v-list-tile-title @click="contactform=true" style="cursor:pointer">Contact</v-list-tile-title>
        </v-list-tile>

        <!-- STIRI -->
        <!--
          <v-list-tile>
            <router-link to="/News" tag="li" style="cursor:pointer">
              <v-list-tile-action>
                <v-icon> announcement
                </v-icon>
              </v-list-tile-action>
            </router-link>
            <router-link to="/News" tag="li" style="cursor:pointer">
              <v-list-tile-title>
                Știri
              </v-list-tile-title>
            </router-link>
          </v-list-tile>
        -->

        <!-- COLABORARI -->

        <v-list-tile>
          <router-link to="/Collaboration" tag="li" style="cursor:pointer">
            <v-list-tile-action>
              <v-icon style="color: #f86c5c;">add_shopping_cart</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link to="/Collaboration" tag="li" style="cursor:pointer">
            <v-list-tile-title>Colaborări</v-list-tile-title>
          </router-link>
        </v-list-tile>

        <!-- AJUTOR -->

        <v-list-tile>
          <router-link to="/Help" tag="li" style="cursor:pointer">
            <v-list-tile-action>
              <v-icon style="color: #433d6b;">help</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link to="/Help" tag="li" style="cursor:pointer">
            <v-list-tile-title>Ajutor</v-list-tile-title>
          </router-link>
        </v-list-tile>

        <!-- IESIRE CONT -->

        <v-list-tile v-if="user">
          <router-link to="/" style="cursor:pointer">
            <v-list-tile-action @click="onSignOut" style="cursor:pointer">
              <v-icon>block</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link to="/" tag="li" style="cursor:pointer">
            <v-list-tile-title @click="onSignOut" style="cursor:pointer">Ieșire cont</v-list-tile-title>
          </router-link>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      dark
      app
      style="background: linear-gradient(to right, #433d6b , #f86c5c);"
      id="toolb"
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" style="color: white;"></v-toolbar-side-icon>
        <router-link to="/" style="cursor:pointer; color: white;">WAFFIC</router-link>
      </v-toolbar-title>
      <v-toolbar-title
        v-if="(this.Weather.temperature) && (this.user)"
      >{{Weather.temperature}} &ordm;C</v-toolbar-title>
      <img
        v-if="(this.Weather.icon) && (this.user)"
        :src="require('./assets/WeatherIcons/' + Weather.icon + '.png')"
      />
      <v-spacer></v-spacer>
      <v-icon v-if="this.user" style="color: white;">directions_car</v-icon>
      <v-icon v-if="this.user" style="color: white;">play_arrow</v-icon>
      <vue-google-autocomplete
        id="searchMap"
        v-if="this.user"
        type="text"
        types="(cities)"
        style="width: 40%"
        class="input"
        placeholder="Caută destinația"
        @placechanged="getAddressData"
      ></vue-google-autocomplete>
      <v-spacer></v-spacer>
      <img
        v-if="(this.destinationWeather.icon) && (this.user)"
        :src="require('./assets/WeatherIcons/' + destinationWeather.icon + '.png')"
      />
      <v-toolbar-title
        v-if="(this.destinationWeather.temperature) && (this.user)"
      >{{destinationWeather.temperature}} &ordm;C</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <!-- LOGIN -->

    <v-dialog v-model="signin" max-width="490">
      <v-card>
        <v-card-title
          style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;"
        >Intră în cont</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="email"
                color="normal"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                name="input-10-1"
                label="Parola"
                hint="Minim 8 caractere"
                v-model="password"
                min="8"
                color="normal"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                :rules="[rules.required]"
                counter
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn
            style="color: #f86c5c;"
            type="submit"
            @click="(signup=true) && (signin=false)"
          >Cont nou</v-btn>
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
          style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;"
        >Crează cont nou</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="email"
                color="normal"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Phone number"
                v-model="phone"
                color="normal"
                :type="'number'"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Nume" v-model="nume" color="normal"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Prenume" color="normal" v-model="prenume"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select
                :items="locations"
                v-model="localitate"
                color="normal"
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
              ></v-text-field>
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
              ></v-text-field>
            </v-flex>
          </v-layout>Prin crearea contului declar că sunt de acord cu Termenii și Condițiile de utilizare a aplicației, cât și cu Politica de Confidențialitate.
        </v-container>
        <v-card-actions>
          <v-btn
            style="color: #f86c5c;"
            type="submit"
            @click="(signin=true) && (signup=false)"
          >Înapoi</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="color: #f86c5c;" type="submit" @click="userSignUp">Înregistrare</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- TERMENI SI CONDITII -->

    <v-dialog v-model="termeni" fullscreen>
      <v-card>
        <v-card-title
          style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;"
        >Termeni și condiții de utilizare</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <b>
                <p>Bine ați venit la Waffic</p>
              </b>
              <br />Acești Termeni de utilizare ("Termeni") vă guvernează drepturile și obligațiile privind utilizarea Software-ului
              <b>Waffic</b> ("Software") și a serviciului (denumite în cele mai multe cazuri " Serviciul ") pe Internet sau în mass-media celulară. Acești Termeni constituie un acord pe deplin obligatoriu între Waffic (inclusiv filialele sale). Prin urmare, vă recomandăm să citiți cu atenție acești Termeni.
              Folosind serviciul Waffic, indicați acordul dvs. pentru acești termeni:
              <br />- Politica de confidențialitate a Waffic ("Politica de confidențialitate") și
              <br />- Politica privind drepturile de autor a Waffic ("Politica privind drepturile de autor"),
              toți aceștia fiind parte integrantă a acestor Termeni.
              <br />
              <br />Dacă nu sunteți de acord cu acești Termeni sau cu oricare dintre părțile sale, atunci trebuie să vă abțineți de la utilizarea Serviciului.
              <br />
              <br />
              <p>
                <b>Puncte cheie</b>
              </p>Următoarele puncte-cheie ale Termenilor sunt evidențiate aici doar pentru comoditatea dvs. Aceste puncte cheie nu sunt făcute în locul termenilor deplini și prezența acestora în această secțiune nu înseamnă că acestea sunt destinate să înlocuiască sau să înlocuiască orice alți termeni sau condiții furnizate de Waffic.
              <br />
              <br />1.
              <b>Informațiile rutiere</b>
              <br />
              <br />Informațiile furnizate de Serviciu nu sunt destinate să înlocuiască informațiile furnizate pe șosea, cum ar fi direcția de deplasare, restricțiile bazate pe timp, restricțiile pe bandaje, blocajele rutiere, semnele de circulație, semafoarele, instrucțiunile poliției etc.
              <br />
              <br />2.
              <b>Călătoriți cu grijă</b>
              <br />
              <br />Acționați întotdeauna vigilent în funcție de condițiile rutiere și în conformitate cu legile privind traficul. Este strict interzis să trimiteți actualizări de trafic (cum ar fi actualizări privind accidentele rutiere și congestionarea traficului) sau să interacționați non-verbal cu Serviciul sau să utilizați Serviciul într-o manieră non-verbală pentru orice alt scop decât navigarea în timpul conducerii. Actualizările de trafic sau rapoartele non-verbale pe care doriți să le trimiteți Serviciului pot fi trimise numai după ce ați oprit autovehiculul într-o locație adecvată permisă de lege. În mod alternativ, astfel de actualizări pot fi trimise de un alt pasager decât șoferul, cu condiția ca acesta să nu interfereze cu parcursul de conducere și să nu distragă atenția conducătorului auto pe șosea.
              <br />
              <br />3.
              <b>Actualizări necontinuale</b>
              <br />
              <br />Informațiile furnizate de Serviciu provin de la alți utilizatori ai Serviciului. Aceste informații sunt fluctuante intrinsec și pot fi inexacte, incomplete sau depășite. Waffic nu oferă nicio garanție pentru credibilitatea sau fiabilitatea acestor informații.
              <br />
              <br />4.
              <b>Serviciu bazat pe locație</b>
              <br />
              <br />Unele caracteristici ale Serviciului utilizează informații detaliate privind locația și traseul, de exemplu sub formă de semnale GPS și alte informații trimise de dispozitivul dumneavoastră pe care este activată aplicația Waffic. Aceste caracteristici nu pot fi furnizate fără a utiliza această tehnologie. Rețineți, după cum este descris în detaliu în Politica de confidențialitate .
              <br />
              <br />
              <b>(I)</b> Waffic utilizează informațiile despre locație și de ruta dvs. pentru a crea un istoric detaliat al localizării tuturor călătoriilor făcute atunci când utilizați Serviciul. Waffic folosește această istorie pentru a vă oferi Serviciu, pentru a îmbunătăți calitatea Serviciului pe care îl oferă dvs. și tuturor utilizatorilor săi și pentru a îmbunătăți acuratețea datelor sale de cartografiere și de navigare. Acest istoric este asociat cu contul dvs. și cu numele de utilizator (dacă ați ales să configurați un nume de utilizator). Acest istoric este reținut de Waffic pentru o perioadă limitată de timp și în conformitate cu Politica de confidențialitate.
              <br />
              <b>(II)</b> Wafic vă permite să utilizați serviciul dacă doriți sau nu să vă configurați un nume de utilizator. Dacă alegeți să utilizați Serviciul fără a configura un nume de utilizator, puteți face acest lucru prin sări peste stadiul de configurare a numelui de utilizator. Waffic va conecta în continuare toate informațiile dvs. cu contul dvs. și un identificator unic generat de Waze în conformitate cu Politica de confidențialitate. Rețineți că pentru a accesa anumite caracteristici ale Serviciului (de exemplu, istoricul rutelor, destinații favorite), va trebui să configurați un nume de utilizator.
              <br />
              <br />
              <p>
                <b>Reclame</b>
              </p>Anunțurile terță parte pot apărea periodic în cadrul Serviciului.
              <br />
              <br />
              <p>
                <b>Conexiunea la Internet</b>
              </p>Este necesară pentru a utiliza Serviciul și eventualele costuri asociate (de exemplu, cheltuieli de transfer de date mobile) generate de utilizarea de către dvs. a Serviciului sunt responsabilitatea dvs. exclusivă și sunt efectuate exclusiv pe cheltuiala dumneavoastră . Transmiterea și primirea de actualizări în timp real către și de la serviciu necesită o conexiune online (de exemplu, Wi-Fi, 3G, 4G) între dispozitivul dvs. mobil și Internet.Cheltuielile unei astfel de conexiuni sunt cele prescrise în acordul dintre dvs. și furnizorul de servicii de comunicații (cum ar fi compania dvs. de telefonie mobilă) și în conformitate cu termenii de plată aplicabili.
              <br />
              <br />
              <p>
                <b>Software gratuit</b>
              </p>
              <br />Serviciul utilizează Software pentru afișarea hărților, actualizări și informații despre drum. În ceea ce privește unele dispozitive de telefonie mobilă care rulează Software-ul, Software-ul este un software gratuit. În astfel de cazuri, puteți redistribui Software-ul sau îl puteți modifica în conformitate cu Licența Publică GNU Generală publicată de Fundația pentru Software Liber, indiferent dacă este versiunea 2.0 a licenței sau orice versiune ulterioară aleasă de dvs. Pentru informații suplimentare, consultați Licența publică generală GNU. Serviciul, baza sa de date, mărcile comerciale ale Waffic, designul hărților serviciului și fișierele vocale integrate în Software.
              <br />
              <br />
              <p>
                <b>Vârsta ta</b>
              </p>Serviciul este destinat utilizării de către utilizatorii care au vârsta legală necesară pentru a deține un permis de conducere. În orice caz, conturile utilizatorilor cu vârsta sub 13 ani vor fi anulate și șterse de Waze, după primirea notificării.
              <br />
              <br />
              <p>
                <b>Confidențialitate</b>
              </p>Confidențialitatea dvs. este importantă pentru noi. În timpul utilizării Serviciului, informațiile personale pot fi furnizate de dvs. sau colectate de Waffic, așa cum este detaliat în Politica de confidențialitate. Politica de confidențialitate explică practicile noastre referitoare la utilizarea informațiilor dvs. personale și vă cerem să citiți cu atenție o astfel de Politică de confidențialitate. Prin acceptarea acestor Termeni, prin prezenta sunteți de acord cu colectarea, stocarea și utilizarea informațiilor dvs. personale de către Waffic, sub rezerva acestei secțiuni, a Politicii de confidențialitate și a tuturor legilor și regulamentelor aplicabile.
              <br />
              <br />
              <p>
                <b>LICENȚĂ</b>
              </p>Waffic vă acordă astfel o licență revocabilă, gratuită, neexclusivă, limitată în timp, netransferabilă, pentru a utiliza Serviciul (inclusiv Software-ul) în scopuri necomerciale, sub rezerva acestor Termeni.
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat style="color: #f86c5c;" @click="termeni = false">Înapoi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- CONFIDENTIALITATE -->

    <v-dialog v-model="confidențialitate" fullscreen>
      <v-card>
        <v-card-title
          style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;"
        >Politica de confidențialitate</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <p>
                <b>1. Politica prelucrarii datelor cu caracter personal</b>
              </p>SC Waffic SRL in calitate de autor, propietar si administrator al site-ului web www.waffic.ro, respecta caracterul privat si securitatea prelucrarii datelor cu caracter personal al fiecarei persoane care acceseaza site-ul web in vederea obținerii de informații.
              <br />In conformitate cu dispozitiile Legii nr. 677/2001 pentru protectia persoanelor cu privire la prelucrarea datelor cu caracter personal si libera circulatie a acestor date si ale Legii nr. 506/2004 privind prelucrarea datelor cu caracter personal si protectia vietii private, Waffic are obligatia de a administra in conditii de siguranta si numai pentru scopurile prezentate mai jos, datele personale care ne sunt furnizate.
              <br />Societatea noastra se obliga sa pastreze confidentialitatea datelor personale furnizate prin intermediul site-ului www.waffic.ro, asa cum prevad dispozitiile legii 677/2001 cu modificarile ulterioare privind protectia datelor personale.
              <br />In conformitate cu dispozitiile Legii nr. 677/2001, persoanele inregistrate, in caliatate de persoane vizate, au urmatoarele drepturi:
              <br />- Dreptul la informare (art.12)
              <br />- Dreptul de acces la date cu caracter personal (art.13);
              <br />- Dreptul de interventie asupra datelor cu caracter personal (art.14);
              <br />- Dreptul de opozitie (art.15);
              <br />- Dreptul de a nu fi supus unei decizii individuale (art.17);
              <br />- Dreptul de a se adresa justitiei (art.18).
              <br />Orice informatie furnizata de dumneavoastra va fi considerata si va reprezenta consimtamintul dumneavoastra expres ca datele dumneavoastra personale sa fie folosite de Waffic in conformitate cu scopurile mentionate mai jos.
              <br />Daca doriti ca datele dumneavoastra personale sa fie actualizate sau scoase din baza de date, ori aveti intrebari legate de confidentialitatea datelor, ne puteti contacta / notifica oricand utilizand datele de contact existente pe site.
              <br />Daca nu doriti ca datele dumneavoastra sa fie colectate, va rugam sa nu ni le furnizati.
              <br />
              <br />
              <p>
                <b>2. Scopul colectarii datelor</b>
              </p>- oferirea serviciilor solicitate de dumneavoastra;
              <br />- transmiterii de oferte, mesaje publicitare si de marketing;
              <br />- pentru activitati specifice departamentului Resurse Umane, in situatia in care sunteti interesati sa faceti parte din echipa Waffic si ati trimis un CV, catre departamentul Resurse Umane, prin intermediul site-ului.
              <br />Waffic nu va dezvalui unei terte parti niciuna dintre datele dumneavoastra (informatii personale sau informatii optionale) fara acordul dumneavoastra, cu exceptia cazului in care avem convingerea, de buna credinta, ca legislatia ne impune acest lucru sau ca acest lucru este necesar pentru protejarea drepturilor sau a proprietatii societatii noastre.
              <br />
              <br />
              <p>
                <b>3. Securitatea datelor colectate si procesate</b>
              </p>Waffic utilizeaza metode si tehnologii de securitate avansate, impreuna cu politici stricte aplicate salariatilor si procedurilor de lucru, incluzand audit-ul periodic pentru a proteja datele cu caracter personal, colectate si procesate conform prevederilor legale in vigoare.
              <br />Echipamentul de tip server pe care este gazduit site-ul web prin intermediul caruia colectam date cu caracter personal este protejat atat la accesul fizic cat si la accesul de la distanta (limitat), fiind instalat intr-un centru de date si supus periodic unui audit de securitate.
              <br />Depunem toate eforturile rezonabile, justificate comercial pentru a va proteja datele cu caracter personal colectate, analizam noile tehnologii in domeniu si, atunci si daca este cazul, le aplicam in vederea upgrade-ului sistemelor noastre de securitate.
              <br />
              <br />
              <p>
                <b>4. Definitii</b>
              </p>
              <b>Date cu caracter personal</b>: Orice informatii referitoare la o persoana fizica identificata sau identificabila; o persoana identificabila este acea persoana care poate fi identificata, direct sau indirect, in mod particular prin referire la un numar de identificare ori la unul sau la mai multi factori specifici identitatii sale fizice, fiziologice, psihice, economice, culturale sau sociale.
              <br />
              <b>Prelucrarea datelor cu caracter personal</b>: Orice operatiune sau set de operatiuni care se efectueaza asupra datelor cu character personal, prin mijloace automate sau neautomate, cum ar fi colectarea, inregistrarea, organizarea, stocarea, adaptarea ori modificarea, extragerea, consultarea, utilizarea, dezvaluirea catre terti prin transmitere, diseminare sau in orice alt mod, alaturarea ori combinarea, blocarea, stergerea sau distrugerea.
              <br />
              <b>Stocarea</b>: Pastrarea pe orice fel de suport a datelor cu caracter personal culese.
              <br />
              <b>Operator</b>: Orice persoana fizica sau juridica, de drept privat ori de drept public, inclusiv autoritatile publice, institutiile si structurile teritoriale ale acestora, care stabileste scopul si mijloacele de prelucrare a datelor cu caracter personal.
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat style="color: #f86c5c;" @click="confidențialitate = false">Înapoi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DREPTURI DE AUTOR -->

    <v-dialog v-model="drepturiautor" fullscreen>
      <v-card>
        <v-card-title
          style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;"
        >Politica privind drepturile de autor</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <p>
                <b>Waffic</b> respectă drepturile de proprietate intelectuală ale altora și solicită utilizatorilor serviciilor să facă același lucru. Dacă credeți că un anumit conținut, care apare pe hărțile rutiere în timp real ale Waffic, încalcă drepturile de autor pe care le dețineți sau le reprezentați, puteți trimite o notificare scrisă, în conformitate cu prevederile Digital Millennium Copyright Act ("DMCA").
              </p>
              <br />Pentru eficiență, notificarea dumneavoastră privind încălcarea presupusă trebuie să includă următoarele informații:
              <br />- O semnătură fizică sau electronică a unei persoane autorizate să acționeze în numele proprietarului unui drept exclusiv care se presupune că a fost încălcat;
              <br />- Identificarea operei protejate prin drepturi de autor, despre care se susține că a fost încălcată prin utilizarea site-ului web sau dacă mai multe lucrări protejate prin drepturi de autor sunt acoperite printr-o singură notificare, o listă reprezentativă a acestor lucrări;
              <br />- Identificarea materialului despre care se presupune că încalcă sau care face obiectul unei activități care încalcă drepturile și că accesul la acesta este dezactivat și informații suficient de rezonabile pentru a permite Waffic să localizeze materialul, inclusiv identificatorul exact al resurselor (Uniform Resource Identifier) ​​sau coordonatele pe hărțile Serviciului în care ați descoperit locul de muncă protejat prin drepturi de autor susținând că a fost încălcat;
              <br />- Informații suficiente pentru a permite Waffic să vă contacteze, cum ar fi o adresă, un număr de telefon și, dacă este disponibil, o adresă de poștă electronică la care puteți fi contactat;
              <br />- O declarație conform căreia aveți convingerea că utilizarea materialului în modul în care se plânge nu este autorizată de proprietarul drepturilor de autor, de agentul său sau de lege;
              <br />- O declarație conform căreia informațiile din notificare sunt corecte și sub sancțiunea pedepsei cu privire la faptul că sunteți autorizat să acționați în numele proprietarului unui drept exclusiv despre care se presupune că a fost încălcat.
              <br />
              <br />După primirea comunicării, Waffic vă poate solicita să furnizați informații suplimentare, înainte de a elimina orice conținut afișat pe site, pe care Waffic îl consideră necesar pentru a respecta prevederile DMCA.
              <br />
              <br />
              <p>
                <b>Contra-notificare</b>
              </p>Puteți să trimiteți o contra-notificare agentului pentru drepturile de autor. Pentru a fi eficient, contranotificarea dvs. trebuie să fie o comunicare scrisă furnizată agentului pentru drepturile de autor care include în mod substanțial următoarele:
              <br />- Semnătura dvs. fizică sau electronică;
              <br />- Identificarea materialului la care a fost dezactivat accesul și locația la care a apărut materialul înainte de accesul la acesta a fost dezactivată.
              <br />- O declarație sub sancțiunea sperjurului că aveți o credință de bună credință că materialul a fost dezactivat ca urmare a unei greșeli sau a unei identificări greșite a materialului care urmează să fie dezactivat;
              <br />- Numele dvs., adresa și numărul de telefon și o declarație conform căreia sunteți de acord cu jurisdicția Curții Districtuale Federale.
              <br />
              <br />După primirea unei contranotificări, Waffic va furniza cu promptitudine persoanei care a trimis notificarea privind încălcarea drepturilor de autor cu o copie a contranotificării și va informa acea persoană că Waffic va înlocui materialul eliminat sau va înceta să dezactiveze accesul la materialul respectiv.
              <br />
              <br />
              <p>
                <b>Declarații false</b>
              </p>În conformitate cu dispozițiile DMCA, orice persoană care prezintă în mod deliberat o eroare materială: (1) că materialul încalcă sau (2) materialul a fost eliminat sau dezactivat din greșeală sau prin identificarea greșită, va fi răspunzător pentru orice daune, inclusiv costurile și onorariile avocaților.
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat style="color: #f86c5c;" @click="drepturiautor = false">Înapoi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- CONTACT -->

    <v-dialog v-model="contactform" max-width="490">
      <v-card>
        <v-card-title
          style="background: linear-gradient(to right, #433d6b , #f86c5c); color: white;"
        >Trimite-ne un mesaj</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="emailcontact"
                color="normal"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                label="Nume"
                v-model="numecontact"
                :rules="[rules.required]"
                color="normal"
              ></v-text-field>
              <v-text-field
                label="Mesaj"
                v-model="mesajcontact"
                :rules="[rules.required]"
                color="normal"
                multi-line
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn style="color: #f86c5c;" type="submit" @click="contactform=false">Anulează</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="color: #f86c5c;" type="submit" @click="contactForm">Trimite</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- GDPR -->
    <v-dialog v-model="userGDRP" v-if="user" persistent max-width="290">
      <v-card>
        <v-card-text>Acest site utilizează module cookie pentru a vă asigura că beneficiați de cea mai bună experiență pe site-ul nostru.</v-card-text>
        <v-card-actions>
          <a v-bind:href="cookies" style="color: #433d6b;" target="_blank">Află mai multe</a>
          <v-spacer></v-spacer>
          <v-btn style="color: #f86c5c;" flat="flat" @click.native="agreeGdpr">Sunt de acord</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- FOOTER -->

    <v-footer app font-size="3px">
      <v-spacer></v-spacer>
      <v-btn flat style="color: #f86c5c;" @click="drepturiautor = true">Drepturi de autor</v-btn>-
      <v-btn flat style="color: #f86c5c;" @click="termeni = true">Termeni și condiții</v-btn>-
      <v-btn
        flat
        style="color: #f86c5c;"
        @click="confidențialitate = true"
      >Politica de confidențialitate</v-btn>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "@/firebase";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import moment from "moment";
import LocalitatiRO from "@/components/LocalitatiRO";
export default {
  components: { VueGoogleAutocomplete },
  name: "profil",
  data() {
    return {
      address: "",
      nume: null,
      numecontact: null,
      emailcontact: null,
      mesajcontact: null,
      contactform: false,
      prenume: null,
      localitate: null,
      datana: null,
      phone: null,
      datanamenu: false,
      termeni: false,
      confidențialitate: false,
      drepturiautor: false,
      clipped: false,
      signin: false,
      signup: false,
      drawer: null,
      e1: true,
      password: "",
      email: "",
      confirmPassword: "",
      rules: {
        required: value => !!value || "Obligatoriu.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalid.";
        }
      },
      locations: [],
      cookies: "https://cookiesandyou.com/"
    };
  },
  created() {
    this.$store.dispatch("getUserData");
    this.$store.dispatch("AuthChange");
  },
  mounted() {
    this.$store.dispatch("getLocation");
    this.locations = LocalitatiRO;
  },
  computed: {
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    user() {
      return this.$store.getters.user;
    },
    admin() {
      return this.$store.getters.admin;
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Parolele nu corespund"
        : "";
    },
    location() {
      return this.$store.getters.location;
    },
    Weather() {
      return this.$store.getters.Weather;
    },
    destinationWeather() {
      return this.$store.getters.destinationWeather;
    },
    userGDRP() {
      return !this.$store.getters.userGDPR;
    }
  },
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut");
    },
    userSignin() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password
      });
      this.signin = false;
    },
    contactForm() {
      firebase
        .database()
        .ref("/ContactMessages/")
        .push({
          Email: this.emailcontact,
          Message: this.mesajcontact,
          Name: this.numecontact,
          Responded: false
        });
      this.contactform = false;
      this.emailcontact = null;
      this.mesajcontact = null;
      this.numecontact = null;
    },
    userRecover() {
      const emailprompt = prompt(
        "Introdu emailul pentru care dorești recuperarea parolei",
        ""
      );
      firebase
        .auth()
        .sendPasswordResetEmail(emailprompt)
        .then(function() {
          window.alert(
            "A fost trimis un email de recuperare a parolei la adresa: " +
              emailprompt
          );
        })
        .catch(function(error) {
          window.alert(error.message);
        });
    },
    onLoad() {
      if (this.userIsAuthenticated) {
        this.$router.push("/map");
      } else {
        this.$router.push("/");
      }
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userSignUp() {
      this.$store.dispatch("signUp", {
        email: this.email,
        password: this.password,
        nume: this.nume,
        prenume: this.prenume,
        localitate: this.localitate,
        datana: this.datana,
        phone: this.phone
      });
      this.signup = false;
    },
    getAddressData(addressData, placeResultData, id) {
      this.address = addressData;
      this.$store.dispatch("getDestination", placeResultData);
      this.$router.push("/map");
    },
    agreeGdpr() {
      const user = this.user.uid;
      const cale = firebase.database().ref("UserDetails/" + user);
      cale.update({ GDPR: true }).catch(error => {
        console.log(error.message);
      });
      this.GDPRdialog = false;
    }
  },
  props: {
    source: String
  }
};
</script>

<style scoped>
a,
ul,
li {
  text-decoration: none;
  list-style-type: none;
}
</style>