// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'mono-homework',
    appId: '1:1057559321446:web:f62abb9a02a8da37c146a7',
    storageBucket: 'mono-homework.appspot.com',
    apiKey: 'AIzaSyAHsot2vj4cJsfR5u07lXYrUdduqBOS0AY',
    authDomain: 'mono-homework.firebaseapp.com',
    messagingSenderId: '1057559321446',
  },
  production: false,
  BACK_URL: 'http://localhost:3000/',
  API: {
    actions: 'actions',
    categories: 'categories',
    products: 'products',
    users: 'users'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
