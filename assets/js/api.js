//run upgrade
function upgradeDisplay() {
  let upgrade = document.getElementById('upgrade');
  let initial = document.getElementById('initial');
  if (upgrade.style.display === 'none') {
    upgrade.style.display = 'block';
    initial.style.display = 'none';
  } else {
    upgrade.style.display = 'none';
  }
}

//run not upgradeable
function notUpgradeableDisplay() {
  let notUpgradeable = document.getElementById('noUpgrade');
  let initial = document.getElementById('initial');
  if (notUpgradeable.style.display === 'none') {
    notUpgradeable.style.display = 'block';
    initial.style.display = 'none';
  } else {
    notUpgradeable.style.display = 'none';
  }
}

//run not found
function notFoundDisplay() {
  let notFound = document.getElementById('noLicense');
  let initial = document.getElementById('initial');
  if (notFound.style.display === 'none') {
    notFound.style.display = 'block';
    initial.style.display = 'none';
  } else {
    notFound.style.display = 'none';
  }
}

// verifying upgrade
function login() {
  fetch(`http://www.mocky.io/v2/5dea8af93000001d442b09cd`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      let serialNumberInput = document.getElementById('testSerialNumber').value;
      let integer = parseInt(serialNumberInput, 10);

      let productKeyInput = document.getElementById('testProductKey').value;
      let emailInput = document.getElementById('testEmail').value;

      let result = data.filter(item => {
        return (
          item.serialNumber === integer &&
          item.productKey === productKeyInput &&
          item.email === emailInput
        );
      });
      if (result.length && result[0].isUpgradeable === true) {
        console.log('success');
        upgradeDisplay();
      } else if (result.length && result[0].isUpgradeable === false) {
        console.log('not upgradeable');
        notUpgradeableDisplay();
      } else {
        console.log('not found');
        notFoundDisplay();
      }
    });
}

//run submit via click
document.getElementById('initialSubmit').addEventListener('click', login);
