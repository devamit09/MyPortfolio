document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your public key
  emailjs.init("XHG1vEVYIOOrSMnaW");

  // Navigation active state
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // EmailJS Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm("service_rs9wakc", "template_jbgt3fc", this).then(
        function () {
          alert("✅ Message sent successfully!");
          contactForm.reset();
        },
        function (error) {
          alert("❌ Failed to send message. Please try again later.");
          console.error("EmailJS error:", error);
        }
      );
    });
  }

  // GitHub API Integration
  const username = "devamit09";
  const projectsContainer = document.getElementById("projects-container");
  const githubStatsContainer = document.getElementById("github-stats");

  if (projectsContainer) {
    fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`
    )
      .then((response) => response.json())
      .then((repos) => {
        projectsContainer.innerHTML = "";

        const featuredRepos = repos
          .filter((repo) => !repo.fork && !repo.archived)
          .slice(0, 6);

        featuredRepos.forEach((repo) => {
          const projectCard = document.createElement("div");
          projectCard.className = "col-lg-6 mb-4";
          projectCard.innerHTML = `
            <div class="card project-card h-100">
              <div class="card-body">
                <h4>${repo.name}</h4>
                <p>${repo.description || "No description available"}</p>
                <a href="${repo.html_url}" target="_blank" class="btn btn-primary">View Code</a>
              </div>
            </div>`;
          projectsContainer.appendChild(projectCard);
        });
      })
      .catch((error) => {
        console.error("Error fetching GitHub projects:", error);
        projectsContainer.innerHTML = `
          <div class="col-12">
            <div class="alert alert-warning">
              Couldn't load projects from GitHub. Please visit my <a href="https://github.com/devamit09" target="_blank">GitHub profile</a>.
            </div>
          </div>`;
      });
  }

  // Scroll Animation
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".skill-card, .project-card");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});
