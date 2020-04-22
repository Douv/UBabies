  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/',
        url: 'index.html',
      },
  
      {
        path: '/about/',
        url: 'about.html',
      },
      {
        path: '/panel/',
        url: '/panel.html/',
      },
      {
        path: '/registro/',
        url: 'registrarse.html',
      },
      {
        path: '/firstlog/',
        url: 'firstlog.html',
      },
      {
        path: '/iniciar/',
        url: 'iniciar.html',
      },

    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});



// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})



/*Option 2. Using live 'page:init' event handlers for each page*/
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
    // Inicio Panel
    console.log(e);

    $$('#registro').on('click', fnSetEmail)

    $$('#registro').on('click', fnRegistro)
})

$$(document).on('page:init', '.page[data-name="iniciar"]', function (e) {
    // Inicio Panel
    console.log(e);

    $$('#inicio').on('click', fnLogIn)
})


/*$$(document).on('page:init', '.page[data-name="panel"]', function(e){
    //Inicio Panel
    console.log(e);
})*/


/** FUNCIONES PROPIAS **/

function fnSetEmail() {
    var elMail = $$('#email').val(); //recupero el valor del input mail

    //lo seteo en el panel del menu
    $$('#labelEmail').text(elMail);
  }



/** funccion de registro - falta la base de datos **/

function fnRegistro() {

    var elMail = $$('#email').val(); // es un input... uso val!
    var laClave = $$('#password').val(); // es un input... uso val!

    email = elMail;

    var huboError = 0;

    firebase.auth().createUserWithEmailAndPassword(elMail, laClave)          
      .catch(function(error) {       
        // Handle Errors here.
        huboError = 1;
        var errorCode = error.code;
        var errorMessage = error.message; 
        
        fnMostrarError(errorCode);
        fnMostrarError(errorMessage);
      })
      .then(function(){
          if(huboError == 0){
            // alert('OK');
            // lo seteo en el panel.... contenedor lblEmail
            $$('#lblEmail').text(elMail);   // es una etiqueta html. Text va sin formato
            mainView.router.navigate("/datospersonales/");
          }
      });
}



