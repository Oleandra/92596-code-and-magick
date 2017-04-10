'use strict';
var userProfile = document.querySelector('.setup');
userProfile.classList.remove('hidden');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var FAMILY_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var personsLook = [];


for (var i = 0; i < 4; i++) {
  var person = {
    name: NAMES[Math.floor((Math.random() * NAMES.length) + 0)] + ' ' + FAMILY_NAMES[Math.floor((Math.random() * FAMILY_NAMES.length))],
    coatColor: coatColors[Math.floor((Math.random() * coatColors.length))],
    eyesColor: eyesColors[Math.floor((Math.random() * eyesColors.length))],

  };

  personsLook.push(person);

}
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var renderWizard = function (p) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = p.name;
  wizardElement.querySelector('.wizard-coat').style.fill = p.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = p.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < personsLook.length; j++) {
  var item = personsLook[j];
  fragment.appendChild(renderWizard(item));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
