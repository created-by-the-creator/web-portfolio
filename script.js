// script.js
document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // --- Typed/Animated text (simple rotator + typing) ---
  const typedEl = document.getElementById('typed');
  const typedPhrases = [
    'Computer Science Student at Batangas State University',
    'A student, developer, and creator.',
    'Learning C++, C, HTML and CSS',
    'Aspiring future Cybersecurity Professional'
  ];
  let typeIdx = 0, charIdx = 0, deleting = false;
  function typeLoop() {
    if (!typedEl) return;
    const current = typedPhrases[typeIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 900);
      } else {
        setTimeout(typeLoop, 55);
      }
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        typeIdx = (typeIdx + 1) % typedPhrases.length;
        setTimeout(typeLoop, 200);
      } else {
        setTimeout(typeLoop, 30);
      }
    }
  }
  typeLoop();

  // --- Back to top button ---
  const backTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) backTop.style.display = 'block';
    else backTop.style.display = 'none';

    // Intersection observer handles active nav; handled below
  });
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // --- Active nav highlighting (IntersectionObserver) ---
  const sections = document.querySelectorAll('main section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          navLinksAll.forEach(n => n.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }, { root: null, rootMargin: '-35% 0px -35% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));

  // Close mobile menu after clicking a nav link
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('show'));
  });

  // --- Theme toggle (light/dark) ---
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('venice-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    if (next === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem('venice-theme', next);
    themeToggle.setAttribute('aria-pressed', next === 'dark');
  });

  // --- Contact form: simple validation + UX ---
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cname').value.trim();
    const email = document.getElementById('cemail').value.trim();
    const message = document.getElementById('cmessage').value.trim();
    if (!name || !email || !message) {
      alert('Please complete all fields before sending.');
      return;
    }
    // For prototype: show success, clear form
    alert('Thanks — your message was captured locally (prototype). In production this sends to an email or backend.');
    contactForm.reset();
  });

  // --- Project modal logic ---
  const modal = document.getElementById('projModal');
  const modalBody = document.getElementById('projModalBody');
  const modalClose = modal.querySelector('.modal-close');

  document.querySelectorAll('[data-proj]').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const id = btn.getAttribute('data-proj');
      openProjectModal(id);
    });
  });

  modalClose?.addEventListener('click', closeProjectModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeProjectModal(); });

  function openProjectModal(id) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = projectDetails(id);
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeProjectModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
  }
  
  // --- Blog modal logic ---
const blogModal = document.getElementById('blogModal');
const blogModalBody = document.getElementById('blogModalBody');
const blogModalClose = blogModal?.querySelector('.modal-close');

document.querySelectorAll('[data-blog]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = btn.getAttribute('data-blog');
    openBlogModal(id);
  });
});

blogModalClose?.addEventListener('click', closeBlogModal);
blogModal?.addEventListener('click', (e) => { if (e.target === blogModal) closeBlogModal(); });

function openBlogModal(id) {
  if (!blogModal || !blogModalBody) return;
  blogModalBody.innerHTML = blogDetails(id);
  blogModal.setAttribute('aria-hidden', 'false');
}

function closeBlogModal() {
  if (!blogModal) return;
  blogModal.setAttribute('aria-hidden', 'true');
  blogModalBody.innerHTML = '';
}

function blogDetails(id) {
  if (id === 'c') {
    return `
      <h3>My First Experience to C Language</h3>
      <p>C was the first programming language I learned, and it truly sparked my interest in coding. Although I didn’t fully master it because I later shifted to C++, it gave me a strong foundation and helped me understand programming logic better. I even went live on TikTok while using C, and that experience allowed me to connect with many other programmers. The C language is simple yet powerful, and learning it made me even more excited to continue growing in the world of programming.</p>
      <p><em>It was the foundation that taught me how computers truly think.</em></p>
    `;
  } else if (id === 'cpp') {
    return `
      <h3>My Experience to C++ Language</h3>
      <p>My journey with C++ began quite unexpectedly. Fun fact: my first self-learning experience with programming was actually with C, because I thought it was the language we would be using in our upcoming class. Fortunately, that early start helped me a lot when I began learning C++ just a week before classes officially started. Having a basic background in C made understanding C++ easier, though I still find myself struggling a bit with loops. To improve, I often go live on TikTok, where I connect with other programmers who generously share their advice and insights. It’s been a challenging but exciting experience that continues to motivate me to grow as a programmer.</p>
      <p><em>Every project I make helps me grow more confident as a student.</em></p>
    `;
  } else if (id === 'self') {
    return `
      <h3>Understanding My Self through Personality</h3>
      <p>My personality shows a mix of creativity, discipline, and empathy. I enjoy exploring new ideas but stay practical and organized. I’m calm, quiet, and value deep connections over large crowds.</p> <p>I believe personality changes as we grow and face new experiences. The people around us and the challenges we meet shape how we think and act over time.</p> <p>Personality is what others see, while the self is who I truly am. I am Venice Anne Manacop, an 18-year-old Computer Science student who keeps learning, growing, and striving to be kind and confident.</p>
    `;
  }

  return `<h3>Reflection</h3><p>More reflections coming soon.</p>`;
}

// Accessibility: Escape to close blog modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && blogModal && blogModal.getAttribute('aria-hidden') === 'false') {
    closeBlogModal();
  }
});


  function projectDetails(id) {
  // Expandable project descriptions
  if (id === 'info') {
    return `
      <h3>Basic Information System</h3>
      <p>A small C++ student information system built for taking student registration and calculating grades.</p>
      <p>Features: Simple form validation and computes up to 8 grades.</p>
      <p><strong>Tech:</strong> C++ Programming Language</p>
      <p><a href="https://github.com/created-by-the-creator/project-activities/blob/main/grade.cpp" target="_blank" rel="noopener">View on GitHub</a></p>
    `;
  } else if (id === 'grade') {
    return `
      <h3>Simple To-Do List</h3>
      <p>A C++ program that lets you add, view, and delete tasks from your personal to-do list.</p>
      <p><strong>Tech:</strong> C++ Programming Language</p>
      <p><a href="https://github.com/created-by-the-creator/project-activities/blob/main/toDoList.cpp" target="_blank" rel="noopener">View on GitHub</a></p>
    `;
  } else if (id === 'distance') {
    return `
      <h3>Distance Conversion</h3>
      <p>A simple C++ converter that lets you convert miles into kilometers easily.</p>
      <p>Features: Real-time conversion with formatted numeric output.</p>
      <p><strong>Tech:</strong> C++ Programming Language</p>
      <p><a href="https://github.com/created-by-the-creator/project-activities/blob/main/miles-km.cpp" target="_blank" rel="noopener">View on GitHub</a></p>
    `;
  } else if (id === 'wish') {
    return `
      <h3>Make A Wish Genie</h3>
      <p>A short and funny C++ activity that gives you three magical wishes — try your luck!</p>
      <p>Features: Randomized responses and playful humor.</p>
      <p><strong>Tech:</strong> C++ Programming Language</p>
      <p><a href="https://github.com/created-by-the-creator/project-activities/blob/main/miles-km.cpp" target="_blank" rel="noopener">View on GitHub</a></p>
    `;
  }

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { Accept: "application/json" },
  });

  if (response.ok) {
    alert("✅ Message sent successfully!");
    form.reset();
  } else {
    alert("❌ Something went wrong. Please try again.");
  }
});

});



  // Default placeholder
  return `<h3>Project</h3><p>More details coming soon.</p>`;
}


  // Accessibility: allow escape to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeProjectModal();
    }
  });
});
