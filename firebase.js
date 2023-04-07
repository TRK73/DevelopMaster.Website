var firebaseConfig = {
    apiKey: "AIzaSyDjYppLG4hNfSV-jHluOyHADtlyhaijvOs",
    authDomain: "signup-login-90211.firebaseapp.com",
    projectId: "signup-login-90211",
    storageBucket: "signup-login-90211.appspot.com",
    messagingSenderId: "183494741824",
    appId: "1:183494741824:web:2210d42663ab10f0d634a5",
    measurementId: "G-EGW4LH3V3P"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  // Get a reference to the authentication service
  var auth = firebase.auth();
  
  // Get a reference to the database service
  var database = firebase.database();
  
  // Login function
  function login() {
    var email = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Redirect to example.html after successful login
        window.location.href = "profile.html";
      })
      .catch(function(error) {
        // Handle login error
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('login-error-message').innerHTML = errorMessage;
      });
  }
  
  // Register function
  function register() {
    var email = document.getElementById('register-username').value;
    var password = document.getElementById('register-password').value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Save user data to the database
        var user = userCredential.user;
        database.ref('users/' + user.uid).set({
          email: email
        });
        window.location.href = "index.html";
        // Show success message and clear form
        document.getElementById('register-error-message').style.display = "none";
        document.getElementById('register-success-message').style.display = "block";
        document.getElementById('register-form').reset();
      })
      .catch(function(error) {
        // Handle registration error
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('register-error-message').innerHTML = errorMessage;
      });
  }
  