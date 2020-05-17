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
        console.log(item.serialNumber, integer);
        console.log(item.productKey, productKeyInput);
        console.log(item.email, emailInput);
        console.log(item.isUpgradeable);
        return (
          item.serialNumber === integer &&
          item.productKey === productKeyInput &&
          item.email === emailInput &&
          item.isUpgradeable === true
        );
      });
      if (result.length) {
        // successDisplay();
        console.log('success');
      } else if (
        item.serialNumber === integer &&
        item.productKey === productKeyInput &&
        item.email === emailInput &&
        item.isUpgradeable === false
      ) {
        console.log('failed');
      }
    });
}

//run submit via click
document.getElementById('initialSubmit').addEventListener('click', login);

//run success
function successDisplay() {
  let success = document.getElementById('#success');
  if (success.style.display === 'none') {
    success.style.display = 'block';
  } else {
    success.style.display = 'none';
  }
}

//run failed
function failedDisplay() {
  let failed = document.getElementById('#failed');
  if (failed.style.display === 'none') {
    failed.style.display = 'block';
  } else {
    failed.style.display = 'none';
  }
}
