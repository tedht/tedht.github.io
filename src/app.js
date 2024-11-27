let localisation = {};

function applyLanguage(language) {
	const elements = document.querySelectorAll("[data-key]");
	elements.forEach(element => {
		const key = element.getAttribute("data-key");
		element.textContent = localisation[language][key] || key;
	});

	// Update the visible language link text
	updateLangBtns(language);

	localStorage.setItem('language', language);
}

function updateLangBtns(language) {
	const activeLangBtn = document.getElementById("active-lang-button");
	const langDropdown = document.querySelector("lang-dropdown");
  
	// Update the button text
	const currentLanguage = activeLangBtn.textContent;
	activeLangBtn.textContent = getLanguageName(language);
  
	langDropdown.innerHTML = '';
	const languages = ["en", "fr", "es"].filter(lang => lang !== language);
  
	// Create new options excluding the current language
	languages.forEach(lang => {
		const langListeItem = document.createElement("li");
		langListeItem.classList.add("lang-dropdown-item");

		const langBtn = document.createElement("li");
		langBtn.classList.add("lang-button")
		langBtn.textContent = getLanguageName(lang);
		langBtn.setAttribute("data-lang", lang)
		langBtn.onclick = () => applyLanguage(lang);
		
		langListeItem.appendChild(langBtn);
		langDropdown.appendChild(langListeItem);
	});
}

function getLanguageName(language) {
	switch(language) {
	  case 'en':
		return 'English';
	  case 'fr':
		return 'Français';
	  case 'es':
		return 'Español';
	  default:
		return 'English';
	}
}

function loadLocalisation(language) {
	const rootPath = window.location.origin;
	fetch(`${rootPath}/data/localisation.json`)
	  .then(response => response.json())
	  .then(data => {
		localisation = data;
		applyLanguage(language);
	  })
	  .catch(error => console.error('Error loading localisation:', error));
  }
  

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem('language') || 'en';
  loadLocalisation(savedLanguage);
  updateLangBtns(savedLanguage);  // Set the initial language link text
});
