let localisation = {};

function changeLanguage(language)
{
	applyLanguage(language);
	/*
	const button = document.getElementById(language+'-button');
	const activeButton = document.getElementById('active-language');

	button.textContent = activeButton.textContent.substring(0,2);
	activeButton.textContent = language;*/
}

function loadLocalisation(language) {
  fetch('data/localisation.json')
    .then(response => response.json())
    .then(data => {
      localisation = data;
      applyLanguage(language);
    })
    .catch(error => console.error('Error loading localisation:', error));
}

function applyLanguage(language) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach(element => {
    const key = element.getAttribute("data-key");
    element.textContent = localisation[language][key] || key;
  });

  localStorage.setItem('language', language);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem('language') || 'en';
  loadLocalisation(savedLanguage);
});
