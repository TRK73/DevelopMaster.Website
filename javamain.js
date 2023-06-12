

window.onload = function (){
    

  function smoothScroll(target) {
    const targetSection = document.querySelector(target);
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  }
  


    const menu_btn = document.querySelector('.hamburger')
    const mobile_menu = document.querySelector('.mobile-nav')
    


    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
     
        
    });
     
      
      
  
    
    window.addEventListener('scroll', function() {

      
        if (window.scrollY > 200) {
          document.querySelector('.back-to-top').style.display = 'block';
          document.querySelector('header').classList.add('invisible');
        
          menu_btn.classList.remove('is-active');
          mobile_menu.classList.remove('is-active');
        } else {
          document.querySelector('.back-to-top').style.display = 'none';
          document.querySelector('header').classList.remove('invisible');
          menu_btn.classList.add('is-active');
          mobile_menu.classList.add('is-active');
             
             
          

        }
      
      
      });
      
      document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      if (window.scrollY > 200) {
        document.querySelector('.back-to-top').style.display = 'block';
        document.querySelector('header').classList.add('invisible');
      }
      
}


const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const xhr = new XMLHttpRequest();
  const url = "https://formspree.io/f/mwkjrknn"; // replace with your form endpoint

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        
        document.getElementById("status").innerHTML = "Message sent successfully!";

        form.reset();
        
        
      } 
      else {
        document.getElementById("status").innerHTML = "Message sent successfully!";


      }
    }
  };

  const data = {
    name: name,
    email: email,
    message: message
  };

  xhr.send(JSON.stringify(data));
});

function searchProjects() {
  // Declare variables
  var input, filter, projects, projectCards, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  projects = document.getElementById("projects-list");
  projectCards = projects.getElementsByClassName('project-card2');

  // Loop through all project cards and hide those that don't match the search query
  for (i = 0; i < projectCards.length; i++) {
    txtValue = projectCards[i].getAttribute('data-title');
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      projectCards[i].style.display = "";
    } else {
      projectCards[i].style.display = "none";
    }
  }
}


search_btn.addEventListener('click', () => {
});

// To re-enable scrolling:
document.body.classList.remove('no-scroll');

