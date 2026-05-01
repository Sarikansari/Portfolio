// PROJECT
function filterProjects(cat, el) {
  document.querySelectorAll('.pj-filter').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.pj-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// ========================================
// NAV — mobile open/close
// ========================================
function openmenu() {
  document.getElementById('sidemenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closemenu() {
  document.getElementById('sidemenu').classList.remove('open');
  document.body.style.overflow = '';
}

// Close menu when a nav link is clicked
document.querySelectorAll('#sidemenu li a').forEach(function(link) {
  link.addEventListener('click', closemenu);
});

// Close menu on outside click
document.addEventListener('click', function(e) {
  var menu = document.getElementById('sidemenu');
  var bars = document.querySelector('.fa-bars');
  if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== bars) {
    closemenu();
  }
});

// ========================================
// NAV — active link highlight on scroll
// ========================================
var sections = document.querySelectorAll('div[id]');
var navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', function() {
  var scrollY = window.scrollY;

  sections.forEach(function(section) {
    var sectionTop    = section.offsetTop - 80;
    var sectionHeight = section.offsetHeight;
    var sectionId     = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });

  // Sticky nav shadow on scroll
  var nav = document.querySelector('nav');
  if (scrollY > 10) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ========================================
// ABOUT — tab switcher
// ========================================
function opentab(tabname) {
  var contents = document.querySelectorAll('.tab-contents');
  var links    = document.querySelectorAll('.tab-links');

  contents.forEach(function(c) { c.classList.remove('active-tab'); });
  links.forEach(function(l)    { l.classList.remove('active-link'); });

  document.getElementById(tabname).classList.add('active-tab');
  event.currentTarget.classList.add('active-link');
}

// ========================================
// PROJECTS — filter cards
// ========================================
function filterProjects(cat, el) {
  document.querySelectorAll('.pj-filter').forEach(function(b) {
    b.classList.remove('active');
  });
  el.classList.add('active');

  document.querySelectorAll('.pj-card').forEach(function(card) {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.classList.add('hidden');
    }
  });
}

// ========================================
// SCROLL REVEAL — fade in sections
// ========================================
var revealElements = document.querySelectorAll(
  '#about, #services, #projects, #contact, .sv-card, .pj-card, .skill-icon-card'
);

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(function(el) {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ========================================
// FADE IN KEYFRAME (injected)
// ========================================
var style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }';
document.head.appendChild(style);

// CONTACT
// ================================================
//  EMAILJS CONTACT FORM
//  Step-by-step setup instructions are below
// ================================================

// ------ STEP 1: Replace these 3 values ----------
var EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // from EmailJS dashboard
var EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
var EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz456"
// ------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

  // Initialise EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  var form      = document.getElementById('contact-form');
  var btn       = document.getElementById('cf-submit');
  var btnText   = document.getElementById('cf-btn-text');
  var btnIcon   = document.getElementById('cf-btn-icon');
  var msgBox    = document.getElementById('msg');

  // ---- Inline validation helpers ----
  function showError(fieldId, errId, message) {
    var field = document.getElementById(fieldId);
    var err   = document.getElementById(errId);
    if (field)  field.classList.add('invalid');
    if (err)    err.textContent = message;
  }

  function clearError(fieldId, errId) {
    var field = document.getElementById(fieldId);
    var err   = document.getElementById(errId);
    if (field)  field.classList.remove('invalid');
    if (err)    err.textContent = '';
  }

  // Clear errors on input
  ['cf-name','cf-email','cf-subject','cf-message'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function() {
        clearError(id, 'err-' + id.replace('cf-',''));
        msgBox.className = '';
        msgBox.textContent = '';
      });
    }
  });

  // ---- Validate form ----
  function validateForm() {
    var valid = true;

    var name    = document.getElementById('cf-name').value.trim();
    var email   = document.getElementById('cf-email').value.trim();
    var subject = document.getElementById('cf-subject').value.trim();
    var message = document.getElementById('cf-message').value.trim();

    clearError('cf-name',    'err-name');
    clearError('cf-email',   'err-email');
    clearError('cf-subject', 'err-subject');
    clearError('cf-message', 'err-message');

    if (!name) {
      showError('cf-name', 'err-name', 'Please enter your name.');
      valid = false;
    }

    if (!email) {
      showError('cf-email', 'err-email', 'Please enter your email.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('cf-email', 'err-email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!subject) {
      showError('cf-subject', 'err-subject', 'Please enter a subject.');
      valid = false;
    }

    if (!message || message.length < 10) {
      showError('cf-message', 'err-message', 'Message must be at least 10 characters.');
      valid = false;
    }

    return valid;
  }

  // ---- Loading state ----
  function setLoading(loading) {
    btn.disabled = loading;
    if (loading) {
      btnText.textContent = 'Sending...';
      btnIcon.className   = 'fa-solid fa-spinner fa-spin';
    } else {
      btnText.textContent = 'Send Message';
      btnIcon.className   = 'fa-solid fa-paper-plane';
    }
  }

  // ---- Submit ----
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    msgBox.className  = '';
    msgBox.textContent = '';

    var templateParams = {
      from_name:  document.getElementById('cf-name').value.trim(),
      from_email: document.getElementById('cf-email').value.trim(),
      subject:    document.getElementById('cf-subject').value.trim(),
      message:    document.getElementById('cf-message').value.trim(),
      reply_to:   document.getElementById('cf-email').value.trim()
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function () {
        setLoading(false);
        msgBox.className   = 'success';
        msgBox.textContent = 'Message sent! I will get back to you within 24 hours.';
        form.reset();
      })
      .catch(function (error) {
        setLoading(false);
        msgBox.className   = 'error';
        msgBox.textContent = 'Something went wrong. Please try again or email me directly.';
        console.error('EmailJS error:', error);
      });
  });
});
