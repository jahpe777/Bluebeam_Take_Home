//run transition display
function transitionDisplay() {
  let initial = document.getElementById('initial');
  let upgrade = document.getElementById('upgrade');
  let notUpgradeable = document.getElementById('noUpgrade');
  let notFound = document.getElementById('noLicense');

  initial.style.display = 'none';
  upgrade.style.display = 'none';
  notUpgradeable.style.display = 'none';
  notFound.style.display = 'none';
}

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

//run successful update for license details
function successfulLicenseDetails(result) {
  document.getElementById(
    'serialNumberDataSuccess'
  ).innerHTML = `Serial Number: ${result[0].serialNumber}`;
  document.getElementById(
    'productKeyDataSuccess'
  ).innerHTML = `Product Key: ${result[0].productKey}`;
  document.getElementById(
    'regesteredEmailDataSuccess'
  ).innerHTML = `Registered Email: ${result[0].email}`;
  document.getElementById(
    'seatsAvailableDataSuccess'
  ).innerHTML = `Total Seats Available: ${result[0].totalSeats}`;
  document.getElementById(
    'seatsInstalledDataSuccess'
  ).innerHTML = `Total Seats Installed: ${result[0].totalSeatsInstalled}`;
  document.getElementById(
    'seatsEligibleDataSuccess'
  ).innerHTML = `Total Seats Eligible for Upgrade: ${result[0].totalSeatsEligible}`;
  let maintenance = result[0].maintenance;
  let maintenanceOutput = maintenance
    ? 'Premium Maintenance'
    : 'General Maintenance';

  document.getElementById(
    'maintenanceDataSuccess'
  ).innerHTML = `Maintenance: ${maintenanceOutput}`;
  let initialDate = result[0].dateRegistered.split('T');
  let finalDate = initialDate[0].split('-');
  document.getElementById(
    'expirationDateDataSuccess'
  ).innerHTML = `Expiration Date: ${finalDate[1]}/${finalDate[2]}/${
    finalDate[0]
  }`;
}

//run failed update for license details
function failedLicenseDetails(result) {
  document.getElementById(
    'serialNumberDataFailed'
  ).innerHTML = `Serial Number: ${result[0].serialNumber}`;
  document.getElementById(
    'productKeyDataFailed'
  ).innerHTML = `Product Key: ${result[0].productKey}`;
  document.getElementById(
    'regesteredEmailDataFailed'
  ).innerHTML = `Registered Email: ${result[0].email}`;
  document.getElementById(
    'seatsAvailableDataFailed'
  ).innerHTML = `Total Seats Available: ${result[0].totalSeats}`;
  document.getElementById(
    'seatsInstalledDataFailed'
  ).innerHTML = `Total Seats Installed: ${result[0].totalSeatsInstalled}`;
  document.getElementById(
    'seatsEligibleDataFailed'
  ).innerHTML = `Total Seats Eligible for Upgrade: ${result[0].totalSeatsEligible}`;
  let maintenance = result[0].maintenance;
  let maintenanceOutput = maintenance
    ? 'Premium Maintenance'
    : 'General Maintenance';

  document.getElementById(
    'maintenanceDataFailed'
  ).innerHTML = `Maintenance: ${maintenanceOutput}`;
  let initialDate = result[0].dateRegistered.split('T');
  let finalDate = initialDate[0].split('-');
  document.getElementById(
    'expirationDateDataFailed'
  ).innerHTML = `Expiration Date: ${finalDate[1]}/${finalDate[2]}/${
    finalDate[0]
  }`;
}

//validate serial number
function validateSerialNumber(value) {
  let maxLength = 7;
  return (
    value.toString().length === maxLength && parseInt(Number(value)) == value
  );
}

//validate product key
function validateProductKey(value) {
  return value.includes('-');
}

//validate email
function validateEmail(value) {
  let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validEmail.test(String(value).toLowerCase());
}

// verifying upgrade
function login() {
  let serialNumberInput = document.getElementById('testSerialNumber').value;
  let integer = parseInt(serialNumberInput, 10);

  let productKeyInput = document.getElementById('testProductKey').value;
  let emailInput = document.getElementById('testEmail').value;

  if (!validateSerialNumber(integer)) {
    alert('"Serial Number" is invalid');
    return;
  }
  if (!validateProductKey(productKeyInput)) {
    alert('"Product Key" is invalid');
    return;
  }
  if (!validateEmail(emailInput)) {
    alert('"Primary Contact Email" is invalid');
    return;
  }

  transitionDisplay();

  fetch(`https://www.mocky.io/v2/5dea8af93000001d442b09cd`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      let reset = document.getElementById('form').reset();

      let result = data.filter(item => {
        return (
          item.serialNumber === integer &&
          item.productKey === productKeyInput &&
          item.email === emailInput
        );
      });
      if (result.length && result[0].isUpgradeable === true) {
        upgradeDisplay();
        successfulLicenseDetails(result);
      } else if (result.length && result[0].isUpgradeable === false) {
        notUpgradeableDisplay();
        failedLicenseDetails(result);
      } else {
        notFoundDisplay();
      }
      reset;
    });
}

//run submit via click
document.getElementById('initialSubmit').addEventListener('click', login);
