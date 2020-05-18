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
  document.getElementById(
    'maintenanceDataSuccess'
  ).innerHTML = `Maintenance: ${result[0].maintenance}`;
  document.getElementById(
    'expirationDateDataSuccess'
  ).innerHTML = `Expiration Date: ${result[0].dateRegistered}`;
}

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
  document.getElementById(
    'maintenanceDataFailed'
  ).innerHTML = `Maintenance: ${result[0].maintenance}`;
  document.getElementById(
    'expirationDateDataFailed'
  ).innerHTML = `Expiration Date: ${result[0].dateRegistered}`;
}

// function formatDate(value) {
//   return value.getMonth() + 1 + '/' + value.getDate() + '/' + value.getYear();
// }

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
        //upgrade display
        upgradeDisplay();
        //update successful license details
        successfulLicenseDetails(result);
      } else if (result.length && result[0].isUpgradeable === false) {
        //not upgrade display
        notUpgradeableDisplay();
        //update failed license details
        failedLicenseDetails(result);
      } else {
        notFoundDisplay();
      }
    });
}

//run submit via click
document.getElementById('initialSubmit').addEventListener('click', login);
// //reset form
// document.getElementById('initialSubmit').addEventListener('click', resetForm);

// function resetForm() {
//   document.getElementById('submitForm').reset();
// }
