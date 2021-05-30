import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCnKJYJPDPPKIwcf8fnDC7FXvUhRgPg1Gc",
  authDomain: "waffic1997.firebaseapp.com",
  databaseURL: "https://waffic1997.firebaseio.com",
  projectId: "waffic1997",
  storageBucket: "waffic1997.appspot.com",
  messagingSenderId: "967640093583"
}

export default firebase.initializeApp(config)

// firebase.database().ref('/events/MYUID')
//   .set({
//     id: 1,
//     titlu: 'Meeting2',
//     avatar: 'http://lorempixel.com/100/100/',
//     descriere: 'Intalnire nr 2',
//     data: new Date('June 2, 2017'),
//     prezenta: true
//   })