document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const securityCodeInput = document.getElementById('securityCode');
  const errorDiv = document.getElementById('error');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const correctSecurityCode = 'kobliha';
      if (securityCodeInput.value === correctSecurityCode) {
        window.location.href = 'resetPassword.html';
      } else {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Nesprávný bezpečnostní kód.';
      }
    });
  }

  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const newPasswordInput = document.getElementById('newPassword');
  const strengthbar = document.getElementById('strength-bar');
  const strengthDisplay = document.getElementById('strength-display');
  const confirmButton = document.getElementById('confirmButton'); // Přidáno

  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newPassword = newPasswordInput.value;
      if (checkPasswordStrength(newPassword)) {
        window.location.href = 'email.html';
      } else {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Heslo nesplňuje požadovaná kritéria.';
      }
    });

    newPasswordInput.addEventListener('input', function () {
      checkPasswordStrength(newPasswordInput.value);
    });
  }

  function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 12) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*()-_+={}[\]|;:'",.<>?~`]/.test(password)) strength += 1;

    switch (strength) {
      case 0:
        strengthDisplay.innerText = 'Velmi slabé';
        strengthbar.value = 20;
        break;
      case 1:
        strengthDisplay.innerText = 'Slabé';
        strengthbar.value = 40;
        break;
      case 2:
        strengthDisplay.innerText = 'Průměrné';
        strengthbar.value = 60;
        break;
      case 3:
        strengthDisplay.innerText = 'Silné';
        strengthbar.value = 80;
        break;
      case 4:
        strengthDisplay.innerText = 'Velmi silné';
        strengthbar.value = 100;
        break;
      case 5:
        strengthDisplay.innerText = 'Nepřekonatelné!';
        strengthbar.value = 100;
        break;
    }

    // Přidáno: Aktivace/deaktivace tlačítka "Potvrdit" na základě síly hesla
    if (strength >= 4) {
      confirmButton.removeAttribute('disabled');
    } else {
      confirmButton.setAttribute('disabled', 'true');
    }

    return strength >= 4;
  }
});

//desktop verze - emaila atrezor
document.addEventListener('DOMContentLoaded', function () {
  const emailIcon = document.getElementById('emailIcon');
  const emailModal = document.getElementById('emailModal');
  const phishingLink = document.getElementById('phishingLink');
  const phishingInfoModal = document.getElementById('phishingInfoModal');
  const closeButtons = document.querySelectorAll('.close');
  const closePhishingInfoButton = document.getElementById('closePhishingInfo');

  if (emailIcon) {
    emailIcon.addEventListener('click', function () {
      emailModal.style.display = 'block';
    });
  }

  if (phishingLink) {
    phishingLink.addEventListener('click', function (event) {
      event.preventDefault();
      emailModal.style.display = 'none';
      phishingInfoModal.style.display = 'block';
    });
  }

  closeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      button.closest('.modal').style.display = 'none';
    });
  });

  if (closePhishingInfoButton) {
    closePhishingInfoButton.addEventListener('click', function () {
      phishingInfoModal.style.display = 'none';
      window.location.href = 'index.html';
    });
  }

  window.addEventListener('click', function (event) {
    if (event.target == emailModal) {
      emailModal.style.display = 'none';
    }
    if (event.target == phishingInfoModal) {
      phishingInfoModal.style.display = 'none';
    }
  });

  window.addEventListener('beforeunload', function () {
    if (emailModal && phishingInfoModal) {
      emailModal.style.display = 'none';
      phishingInfoModal.style.display = 'none';
    }
  });

  window.openMail = function (event, mailName) {
    const emails = document.querySelectorAll('.email');
    emails.forEach((email) => (email.style.display = 'none'));
    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach((link) => {
      link.className = link.className.replace(' active', '');
    });
    document.getElementById(mailName).style.display = 'block';
    event.currentTarget.className += ' active';
  };

  // Kontrola a diagnostické výstupy pro cestu
  const currentPath = window.location.pathname;
  console.log('Current Path:', currentPath);

  if (window.location.pathname === '/email') {
    // Najdeme ikonu a modální okno
    const treasureIcon = document.getElementById('treasureIcon');
    const treasureMessageModal = document.getElementById(
      'treasureMessageModal',
    );

    // Diagnostický výstup
    console.log('treasureIcon: ', treasureIcon);
    console.log('treasureMessageModal: ', treasureMessageModal);

    // Přidáme posluchač události pro kliknutí na ikonu
    treasureIcon.addEventListener('click', function () {
      // Zobrazíme modální okno
      treasureMessageModal.style.display = 'block';
    });

    // Najdeme tlačítko zavření a přidáme posluchač události pro zavření modálního okna
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function () {
      // Skryjeme modální okno
      treasureMessageModal.style.display = 'none';
    });
  }
});
