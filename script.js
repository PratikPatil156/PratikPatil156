// Interactive Scripts for Pratik Patil's Portfolio

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dynamic Typewriter Effect
  const phrases = [
    "Autonomous AI Agents with LangGraph",
    "Production RAG Pipelines with ChromaDB",
    "High-Performance APIs with FastAPI",
    "Responsive Web Applications with React.js"
  ];

  let currentPhraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextEl = document.getElementById('typed-text');

  function typeEffect() {
    if (!typedTextEl) return;
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 1800; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before new phrase
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. Navbar scroll style enhancement
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('bg-[#080c14]/95', 'shadow-xl', 'border-slate-800');
    } else {
      navbar.classList.remove('bg-[#080c14]/95', 'shadow-xl');
    }
  });

  // 4. Project Filtering
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active styling
      filterBtns.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Construct mailto link as fallback/convenient direct email
      const mailtoLink = `mailto:pratikarjunpatil2863@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Pratik,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      if (formStatus) {
        formStatus.classList.remove('hidden', 'text-red-400');
        formStatus.classList.add('text-cyan-400');
        formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Opening your email client to send message...`;
      }

      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 700);
    });
  }

});
