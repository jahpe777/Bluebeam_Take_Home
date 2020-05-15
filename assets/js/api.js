let success = `<h1>Sucess</h1>`;

let fail = `<h1>Fail</h1>`;

function login(e) {
  fetch(`http://www.mocky.io/v2/5dea8af93000001d442b09cd`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      let serialNumber = e.target.serialNumber.value;
      let productKey = e.target.password.value;
      let email = e.target.email.value;

      let result = data.filter(item => {
        return (
          item.serialNumber === serialNumber &&
          item.productKey === productKey &&
          item.email === email
        );
      });
      if (result.length) {
        $('.col').hide();
      } else {
        console.error('This is not valid');
      }
    });
}
login();

function postSuccess(e) {
  fetch(`http://www.mocky.io/v2/5dea8af93000001d442b09cd`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // .then(res => res.json())
  // .then(data => {
  //   let serialNumber = e.target.serialNumber.value;
  //   let productKey = e.target.password.value;
  //   let email = e.target.email.value;

  //   let result = data.filter(item => {
  //     return (
  //       item.serialNumber === serialNumber &&
  //       item.productKey === productKey &&
  //       item.email === email
  //     );
  //   });
  //   if (result.length) {
  //     $('.col').hide();
  //   } else {
  //     console.error('This is not valid');
  //   }
  // });
}
postSuccess();
