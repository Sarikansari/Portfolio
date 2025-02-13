var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ---------------Menu button in small screen --------------

var sidemenu = document.querySelector("#sidemenu");
console.log(sidemenu);

function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}

// ----------- Google Sheet ------------


  const scriptURL = 'https://script.google.com/macros/s/AKfycbyoeyiDzag-Ygdh5qJ-Ac84-Wgs4oRwH-WemhonQcsH_xQDppHFy-URMrZq9K-svimL/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(function(){
            msg.innerHTML = ""
        }, 2000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })

  // sticky nav bar

  var navbar = document.querySelector("#navbar");

  var menu = document.querySelector("#menu");

  window.onscroll = function(){
    if(window.pageYOffset >= menu.offsetTop){
      navbar.classList.add("sticky");
    }
    else{
      navbar.classList.remove("sticky");
    }
  }