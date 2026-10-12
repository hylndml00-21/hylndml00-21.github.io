"use strict";
document.addEventListener("DOMContentLoaded", function () {
 loadPortfolio();
 setupContactForm();
 setupBackToTop();
});
async function loadPortfolio() {
 const projectsMessage = document.getElementById("projectsMessage");
 try {
 const response = await fetch("data/projects.json");
 if (!response.ok) throw new Error("Unable to load projects.json");
 const data = await response.json();
 document.getElementById("studentName").textContent = data.name;
 document.getElementById("tagline").textContent = data.tagline;
 document.getElementById("introduction").textContent = data.introduction;
 document.getElementById("profileImage").src = data.profileImage;
 document.getElementById("biography").textContent = data.about.biography;
 document.getElementById("education").textContent =
 data.about.program + " - " + data.about.school;
 document.getElementById("graduation").textContent = data.about.graduation;
 document.getElementById("careerGoal").textContent = data.about.careerGoal;
 document.getElementById("interests").textContent = data.about.interests;
document.getElementById("contactEmail").textContent = data.contact.email;
 document.getElementById("contactEmail").href = "mailto:" + data.contact.email;
 document.getElementById("contactLocation").textContent =
 "Location: " + data.contact.location;
 document.getElementById("linkedinLink").href = data.contact.linkedin;
 document.getElementById("footerText").textContent =
 "\u00A9 " + new Date().getFullYear() + " " + data.name + " | Student Portfolio";
 displaySkills(data.skills);
 displayProjects(data.projects);
 loadGitHubRepositories(data.githubUsername);
 } catch (error) {
 console.error("Portfolio loading error:", error);
 projectsMessage.textContent =
 "Unable to load portfolio data. Check data/projects.json and try again.";
 document.getElementById("skillsContainer").textContent =
 "Skills could not be loaded.";
 document.getElementById("githubMessage").textContent =
 "GitHub information is currently unavailable.";
 }
}
function displaySkills(skills) {
  const container = document.getElementById("skillsContainer");
  container.replaceChildren();
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";
  container.style.marginTop = "1rem";
  skills.forEach(function (skill) {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.textContent = skill;
    card.style.background = "rgba(233,78,119,0.11)";
    card.style.color = "#7A2E45";
    card.style.border = "1px solid rgba(233,78,119,0.20)";
    card.style.borderRadius = "12px";
    card.style.padding = "10px 16px";
    card.style.fontSize = "0.88rem";
    card.style.display = "inline-block";
    card.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    container.appendChild(card);
  });
}
function displayProjects(projects) {
 const container = document.getElementById("projectsContainer");
 const message = document.getElementById("projectsMessage");
 container.replaceChildren();
 if (!Array.isArray(projects) || projects.length === 0) {
 message.textContent = "No projects are available at the moment.";
 return;
 }
 message.textContent = "";
 projects.forEach(function (project) {
 const card = document.createElement("article");
 card.className = "project-card";
 const image = document.createElement("img");
 image.src = project.image;
 image.alt = "Screenshot of " + project.title;
 image.loading = "lazy";
 const content = document.createElement("div");
 content.className = "project-content";
 const title = document.createElement("h3");
 title.textContent = project.title;
 const description = document.createElement("p");
 description.textContent = project.description;
const technologies = document.createElement("p");
 technologies.className = "project-tech";
 technologies.textContent = "Technologies: " + project.technologies;
 const role = document.createElement("p");
 role.textContent = "My Role: " + project.role;
 content.append(title, description, technologies, role);
 if (project.link) {
 const link = document.createElement("a");
link.href = project.link;
link.textContent = "View Project";
link.className = "project-link";
link.target = "_blank";
link.rel = "noopener noreferrer";
link.style.background = "none";
link.style.color = "#D14D5F";
link.style.display = "block";
link.style.width = "100%";
link.style.margin = "15px 0 15px 20px";
link.style.padding = "0";
link.style.borderRadius = "0";
link.style.textAlign = "left";
link.style.textDecoration = "underline";
content.appendChild(link);
}
 card.append(image, content);
 container.appendChild(card);
 });
}
async function loadGitHubRepositories(username) {
 const container = document.getElementById("githubRepos");
 const message = document.getElementById("githubMessage");
 const profileLink = document.getElementById("githubProfile");
 container.replaceChildren();
 if (!username || username === "yourusername") {
 message.textContent = "Update githubUsername in projects.json to your actual username.";
 return;
 }
 profileLink.href = "https://github.com/" + encodeURIComponent(username);
 try {
 const apiURL = "https://api.github.com/users/" +
 encodeURIComponent(username) +
 "/repos?sort=updated&per_page=5&type=public";
 const response = await fetch(apiURL);
 if (!response.ok) throw new Error("GitHub API request failed");
 const repositories = await response.json();
 if (repositories.length === 0) {
 message.textContent = "No public repositories were found.";
 return;
 }
 message.textContent = "";
 repositories.forEach(function (repo) {
 const item = document.createElement("li");
 const link = document.createElement("a");
 link.href = repo.html_url;
 link.textContent = repo.name;
 link.target = "_blank";
 link.rel = "noopener noreferrer";
 const language = document.createElement("p");
 language.className = "repository-language";
 language.textContent = "Main language: " + (repo.language || "Not specified");
item.append(link, language);
 container.appendChild(item);
 });
 } catch (error) {
 console.error("GitHub API error:", error);
 message.textContent =
 "GitHub repositories are unavailable. Please try again later.";
 }
}
function setupContactForm() {
 const form = document.getElementById("contactForm");
 const feedback = document.getElementById("formFeedback");
 form.addEventListener("submit", function (event) {
 event.preventDefault();
 if (!form.checkValidity()) {
 form.reportValidity();
 feedback.textContent = "Please complete all fields correctly.";
 return;
 }
 const visitorName = document.getElementById("visitorName").value.trim();
 const visitorMessage = document.getElementById("visitorMessage").value.trim();
 if (visitorName.length < 2 || visitorMessage.length < 10) {
 feedback.textContent =
 "Enter a valid name and a message of at least 10 characters.";
 return;
 }
 feedback.textContent = "Thank you, " + visitorName +
 "! Your form passed validation. No message was sent because this is a static website.";
 form.reset();
 });
}
function setupBackToTop() {
 const button = document.getElementById("backToTop");
 window.addEventListener("scroll", function () {
 button.classList.toggle("visible", window.scrollY > 300);
 });
 button.addEventListener("click", function () {
 window.scrollTo({ top: 0, behavior: "smooth" });
 });
}
// BACK TO TOP FUNCTION
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});