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

// task4-module1
'use strict';

window.enableSetup = (function () {
  var setup = document.querySelector('.setup');
  var nameField = document.querySelector('.setup-user-name');
  var setupClose = setup.querySelector('.setup-close');
  var onSetupClose = null;
  var timer;
  var THROTTLE_TIMEOUT = 5000;

  var openSetup = function () {

    setup.classList.remove('invisible');
    document.addEventListener('keydown', setupKeydownHandler);
  };
  var setupKeydownHandler = function (evt) {
    if (window.settings.isDeactivationEvent(evt)) {
      setup.classList.add('invisible');
    }
  };

  var closeSetup = function () {
    setup.classList.add('invisible');
    document.removeEventListener('keydown', setupKeydownHandler);

    if (typeof onSetupClose === 'function') {
      onSetupClose();
    }
  };

  var onKeyDown = function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      closeSetup();
    }
  };
  setupClose.addEventListener('click', function () {
    closeSetup();
    window.settings.changeAria(setupClose);
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      closeSetup();
      window.settings.changeAria(setupClose);
    }
  });
  nameField.required = true;
  nameField.maxLength = 50;

  var coatNode = document.querySelector('#wizard-coat');
  var fireBallNode = document.querySelector('.setup-fireball-wrap');
  var eyesNode = document.querySelector('#wizard-eyes');

  var startTimer = function () {
    timer = setTimeout(window.renderWizards, THROTTLE_TIMEOUT);
  };

  var throttle = function () {
    clearTimeout(timer);
    startTimer();
  };

  coatNode.addEventListener('click', function () {
    window.getColorElement(coatNode,
      ['#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848'],
        'fill',
        function (colors, property) {
          coatNode.style[property] = colors;
        }
    );

    throttle();
  });
  coatNode.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      window.getColorElement(coatNode,
        ['#ee4830',
          '#30a8ee',
          '#5ce6c0',
          '#e848d5',
          '#e6e848'],
          'fill',
          function (colors, property) {
            coatNode.style[property] = colors;
          }
      );
      throttle();
    }
  });
  fireBallNode.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      window.getColorElement(fireBallNode,
        ['#ee4830',
          '#30a8ee',
          '#5ce6c0',
          '#e848d5',
          '#e6e848'],
          'backgroundColor',
          function (colors, property) {
            fireBallNode.style[property] = colors;
          }
        );
      throttle();
    }
  });
  fireBallNode.addEventListener('click', function () {
    window.getColorElement(fireBallNode,
      ['#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848'],
        'backgroundColor',
        function (colors, property) {
          fireBallNode.style[property] = colors;
        }
      );
    throttle();
  });

  eyesNode.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      window.getColorElement(eyesNode,
        ['black',
          'red',
          'blue',
          'yellow',
          'green'],
          'fill',
          function (colors, property) {
            eyesNode.style[property] = colors;
          }
        );
      throttle();
    }
  });
  eyesNode.addEventListener('click', function () {
    window.getColorElement(eyesNode,
      ['black',
        'red',
        'blue',
        'yellow',
        'green'],
        'fill',
        function (colors, property) {
          eyesNode.style[property] = colors;
        }
      );
    throttle();
  });

  return function (cb) {
    openSetup();
    setupClose.addEventListener('keydown', onKeyDown);

    onSetupClose = cb;
  };
})();



