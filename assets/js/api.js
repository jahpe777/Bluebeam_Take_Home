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
      } else if (result.length && result[0].isUpgradeable === false) {
        console.log('not upgradeable');
      } else {
        console.log('not found');
      }
    });
}

//run submit via click
document.getElementById('initialSubmit').addEventListener('click', login);

//run upgrade
function upgradeDisplay() {
  let upgrade = document.getElementById('#upgrade');
  if (upgrade.style.display === 'none') {
    upgrade.style.display = 'block';
  } else {
    upgrade.style.display = 'none';
  }
}

//run not
function notUpgradeableDisplay() {
  let notUpgradeable = document.getElementById('#noUpgrade');
  if (notUpgradeable.style.display === 'none') {
    notUpgradeable.style.display = 'block';
  } else {
    notUpgradeable.style.display = 'none';
  }
}

//run failed
function notFoundDisplay() {
  let notFound = document.getElementById('#noLicense');
  if (notFound.style.display === 'none') {
    notFound.style.display = 'block';
  } else {
    notFound.style.display = 'none';
  }
}
