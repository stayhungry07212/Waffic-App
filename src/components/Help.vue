<template>
  <v-layout>
    <v-container fluid>
      <h2><p> Tutorial de utilizare a aplicației </p></h2>
      <p>
      Încă din pagina principală a aplicației, vizitatorului i se oferă posibilitatea de a intra în cont sau crea un cont nou, de a vedea abonamentele, trimite un contact, citi știrile în domeniu sau vizualiza ghidul pentru utilizarea aplicației. Accesarea unei astfel de funcționalități se face prin apăsarea butonului corespondent din meniul lateral. De asemenea, în subsolul paginii se pot vizualiza Termenii și condițiile, Politica de confidențialitate și Drepturile de autor, urmând aceeași procedură. 
      </p><p>
      Apăsarea butonului de ”Intră în cont / Creează cont nou” conduce la fereastra ce oferă posibilitatea utilizatorului să intre în contul personal prin completarea câmpurilor ”Email” și ”Parolă”, să își creeze un cont nou apăsând butonul de ”Cont nou” sau să recupereze parola și adresa electronică aferentă contului pentru care se dorește recuperarea parolei.
      </p><p>
      Intrarea în cont se poate face doar cu date valide. Din această cauză, există corectare automată pentru câmpurile cărora le este necesar. Adresei electronice îi este necesară prezența semnului ”@” și a punctului de legătură cu domeniul, pentru a putea fi declarată validă.
      </p><p>
      În cazul în care adresa electronică este corect formată, însă inexistentă în baza de date, se va primi o eroare.
      </p><p>
      În cazul în care adresa electronică este validă, însă parola este incorectă, se va primi eroarea în care se specifică acest aspect.
      </p><p>
      Pașii de recuperare a parolei sunt:
      -	Introducerea adresei electronice pentru care se dorește recuperarea parolei (în cazul în care aceasta nu există în baza de date, se va primi o eroare)
      -	Primirea unui mesaj cu instrucțiunile de recuperare a parolei pe adresa electronică
      </p><p>
      -	Introducerea unei noi parole aleasă de către utilizator. La acest pas se ajunge apăsând pe referința oferită automat în mesajul primit. Acesta poate vedea ce parolă introduce prin apăsarea iconiței alăturate câmpului de ”Parolă nouă”.
      </p><p>
      -	După introducerea unei noi parole și salvarea acesteia prin apăsarea butonului ”Save”, acesta este înștiințat că schimbarea parolei a fost efectuată cu succes și se poate întoarce la autentificare cu noua parolă.
      </p><p>
      Apăsarea butonului ”Cont nou” duce la apariția une ferestre, unde i se solicită noului utilizator să introducă adresa electronică, numele, prenumele, localitatea, data nașterii și parola contului. Pentru parola contului este necesară introducerea de două ori, pentru a se verifica corectitudinea acesteia.
      </p><p>
      Câmpurile considerate obligatorii pentru crearea contului sunt adresa electronică și parola. În cazul omiterii completării acestora, noul utilizator va fi notificat. Dacă acesta apasă pe butonul ”Înregistrare” cu omiterea acestor câmpuri, va fi notificat iar înregistrarea nu va avea loc. În cazul în care se dorește anularea acțiunii de creare a unui cont nou, acesta poate apăsa butonul ”Înapoi”.
      </p><p>
      În cazul în care utilizatorul sau noul utilizator nu se descurcă în utilizarea aplicației, acesta poate accesa din meniul lateral butonul de ”Ajutor” unde i se va afișa ghidul de utilizare.
      </p><p>
      Pentru a obține diverse beneficii pe contul său, utilizatorul poate accesa butonul ”Abonamente”, vizibil și în cazul inexistenței unui cont. Pentru achiziționarea unui astfel de abonament, acesta trebuie să intre în cont și să completeze datele necesare finalizării plății în pagina către care va fi trimis.
      Abonamentele disponibile sunt:
      </p><p>
      1.	1week: abonament valabil 7 zile, începând din ziua confirmării plății, cu prețul de 5 ron;
      <br>2.	Happy Month: abonament valabil 30 de zile, începând din ziua confirmării plății, cu prețul de 15 ron;
      <br>3.	BeOnline: abonament valabil 90 de zile, începând din ziua confirmării plății, cu prețul de 30 ron;
      <br>4.	What about six?: abonament valabil 180 de zile, începând din ziua confirmării plății, cu prețul de 50 ron.
      </p><p>
      După intrarea în cont, utilizatorului îi vor fi disponibile în meniul lateral și butoanele ”Hartă”, ”Date personale” și ”Călătoriile tale”. De asemenea, se activează și câmpul de căutare a destinației.
      </p><p>
      Butonul ”Hartă” conduce la pagina esențială și la aplicația în sine, la care se poate ajunge și doar cu introducerea unei destinații în câmpul de căutare. Câmpul de căutare, pe parcursul tastării, va oferi sugestii de completare pentru ușurința utilizării și găsirii destinației dorite.
      </p><p>
      Alegerea unei destinații va porni algoritmul aplicației și va calcula traseul cel mai eficient de la locația actuală preluată de la utilizator. Condițiile meteo actualizate se vor încadra pe bara de căutare. În stânga destinației căutate de către utilizator se vor afla condițiile meteo pentru locația actuală, iar în dreapta destinației, condițiile meteo de la destinația aleasă.
      </p><p>
      Pentru vizualizarea istoricului destinațiilor căutate de către utilizator, acesta va accesa din meniul lateral butonul ”Călătoriile tale” unde se vor găsi locația de start, destinația, data căutării și butonul pentru ștergerea înregistrării de pe același rând. Aceste informații se găsesc structurate sub forma unui tabel.
      </p><p>
      În cazul în care utilizatorul dorește să își vizualizeze informațiile personale salvate în contul acestuia, sau să modifice una dintre aceste informații, se poate accesa butonul ”Date personale” aflat în meniul lateral. Apăsarea unui câmp din această pagină va activa posibilitatea de editare, iar butonul ”Salvează modificările” va salva toate noile modificări în cazul în care există. Modificările în baza de date vor avea loc doar în cazul în care utilizatorul completează, pentru siguranță, parola în câmpul obligatoriu ”Parola actuală”.
      </p>
    </v-container>
  </v-layout>
</template>

<style>
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>