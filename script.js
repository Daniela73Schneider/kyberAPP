/* Skripty pro ověření kódu na stránce pro přihlášení a
kontrolu správnosti hesla na stránce pro obnovu hesla. Tímto způsobem budou děti
postupovat přes jednotlivé úrovně mise, přičemž každá úroveň představuje jiný
aspekt kyberbezpečnosti. 
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const securityCodeInput = document.getElementById('securityCode');
  const errorDiv = document.getElementById('error');
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const newPasswordInput = document.getElementById('newPassword');

  const code = document.getElementById('password');

  const strengthbar = document.getElementById('meter');
  const display = document.getElementsByClassName('textbox')[0];

  code.addEventListener('keyup', function () {
    checkpassword(code.value);
  });

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const correctSecurityCode = 'tajnykod123'; // Předpokládaný správný bezpečnostní kód
      if (securityCodeInput.value === correctSecurityCode) {
        window.location.href = 'resetPassword.html';
      } else {
        errorDiv.style.display = 'block';
      }
    });
  }

  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newPassword = newPasswordInput.value;
      window.location.href = 'index.html';
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const newPasswordInput = document.getElementById('newPassword');

  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newPassword = newPasswordInput.value;

      // Pokud je heslo platné, můžeme přesměrovat uživatele na hlavní stránku
      if (checkpassword(newPassword)) {
        window.location.href = 'index.html';
      }
    });
  }

  // Funkce pro zobrazení síly hesla po kliknutí na tlačítko
  const showStrengthBtn = document.querySelector('.show-strength-btn');
  if (showStrengthBtn) {
    showStrengthBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const newPassword = newPasswordInput.value;
      checkpassword(newPassword);
    });
  }
});

function checkpassword(password) {
  var strength = 0;
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }

  const display = document.getElementById('strength-display');
  const strengthbar = document.getElementById('strength-bar');

  if (password.length < 6) {
    display.innerHTML = 'Minimum number of characters is 6';
  } else if (password.length > 12) {
    display.innerHTML = 'Maximum number of characters is 12';
  } else {
    switch (strength) {
      case 0:
        display.innerHTML = 'Very weak';
        strengthbar.value = 20;
        break;
      case 1:
        display.innerHTML = 'Weak';
        strengthbar.value = 40;
        break;
      case 2:
        display.innerHTML = 'Moderate';
        strengthbar.value = 60;
        break;
      case 3:
        display.innerHTML = 'Strong';
        strengthbar.value = 80;
        break;
      case 4:
        display.innerHTML = 'Very strong';
        strengthbar.value = 100;
        break;
    }
    return true; // Heslo je platné
  }
  return false; // Heslo je neplatné
}
*/

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const securityCodeInput = document.getElementById('securityCode');
  const errorDiv = document.getElementById('error');
  const newPasswordInput = document.getElementById('newPassword');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const correctSecurityCode = 'tajnykod123';
      if (securityCodeInput.value === correctSecurityCode) {
        window.location.href = 'resetPassword.html';
      } else {
        errorDiv.style.display = 'block';
      }
    });
  }

  if (newPasswordInput) {
    newPasswordInput.addEventListener('input', function () {
      checkPasswordStrength(newPasswordInput.value);
    });
  }

  const resetPasswordForm = document.getElementById('resetPasswordForm');
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newPassword = newPasswordInput.value;
      if (checkPasswordStrength(newPassword)) {
        window.location.href = 'email.html';
      }
    });
  }
});

function checkPasswordStrength(password) {
  const strengthbar = document.getElementById('strength-bar');
  const strengthDisplay = document.getElementById('strength-display');

  let strength = 0;
  if (password.length >= 6 && password.length <= 12) {
    strength += 1;
  }
  if (/[a-z]/.test(password)) {
    strength += 1;
  }
  if (/[A-Z]/.test(password)) {
    strength += 1;
  }
  if (/[0-9]/.test(password)) {
    strength += 1;
  }
  if (/[!@#$%^&*()-_+={}[\]|;:'",.<>?~`]/.test(password)) {
    strength += 1;
  }

  switch (strength) {
    case 0:
      strengthDisplay.innerText = 'Very weak';
      strengthbar.value = 20;
      break;
    case 1:
      strengthDisplay.innerText = 'Weak';
      strengthbar.value = 40;
      break;
    case 2:
      strengthDisplay.innerText = 'Moderate';
      strengthbar.value = 60;
      break;
    case 3:
      strengthDisplay.innerText = 'Strong';
      strengthbar.value = 80;
      break;
    case 4:
      strengthDisplay.innerText = 'Very strong';
      strengthbar.value = 100;
      break;
  }
  // Vrátí true, pokud je heslo dostatečně silné, jinak false
  return strength >= 5;
}
