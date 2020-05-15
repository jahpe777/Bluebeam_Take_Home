function login(e) {
  e.preventDefault();
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
        console.log('This is valid');
      } else {
        console.error('This is not valid');
      }
    });
}

// let cityName = "";

// //function for submit
// function citySubmit() {
//         let cityState = $(".city").val()
//         let city = cityState.split(",")[0]
//         let state = cityState.split(",")[1]

//         if (!city || !state) {
//             alert("Check city and state formatting")
//             return
//         }
//         cityName = cityState;
//         $(".tempTextContainer").empty()
//         $(".loader-container").show()
//         $(".tempModal").css("display", "flex");

//         city = city.replace(/\s/g,"").toLowerCase()
//         state = state.replace(/\s/g,"").toLowerCase()

//         let found;

//         for (let key in cities) {
//             let tempData = cities[key].properties
//             let cleanedCity = tempData.name.replace(/\s/g,"").toLowerCase()
//             let cleanedState = tempData.admin.replace(/\s/g,"").toLowerCase()

//             if (cleanedCity === city && cleanedState === state) {
//                 found = cities[key]
//                 break
//             }
//          }

//          if (!found) {
//             alert("Couldn't find city")
//             $(".loader-container").hide()
//             $(".tempModal").hide()
//             return
//          }

//          handleSubmitCity(found.id);
//     };
//     $(".close").click(function (event) {
//         event.preventDefault();
//         cityName = "";
//         $(".tempModal").css("display", "none");
//     });

// //run submit via click
// $(".submit").click(function (event) {
//     event.preventDefault();
//     citySubmit();
// });

// //run submit via keypress
// $(".city").keypress(function (event) {
//     if (event.keyCode == 13) {
//         event.preventDefault();
//         citySubmit();
//     }
// });

// //click event for markers
// function latLngSubmit(marker) {
//     google.maps.event.addListener(marker, "click", function (event) {
//         let latitude = event.latLng.lat();
//         let longitude = event.latLng.lng();
//         console.log(latitude)
//         console.log(longitude)
//         $(".tempTextContainer").empty()
//         $(".loader-container").show()
//         $(".tempModal").css("display", "flex");
//         handleSubmit(latitude, longitude);
//     });
//     $(".close").click(function (event) {
//         event.preventDefault();
//         $(".tempModal").css("display", "none");
//     });
// }

// //handle the search term
// function handleSubmitCity (city) {
//     fetch(`https://app.climate.azavea.com/api/climate-data/${encodeURIComponent(city)}/RCP85?dataset=LOCA&years=2019,2020,2030,2040,2050,2060,2070,2080,2090,2100`, {
//             headers: {
//                 Authorization: "token 8428d0e3ca7a3f5862681ad13cb428d7e6f77a9d"
//             }
//         })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             $(".loader-container").hide()
//             displayData(data)
//         })
//         .catch(error => {
//             console.log(error)
//             alert("error fetching results")
//         })
// }

// //handle the lat, lng
// function handleSubmit(lat, lng) {
//     fetch(`https://app.climate.azavea.com/api/climate-data/${lat}/${lng}/RCP85?dataset=LOCA&years=2019,2020,2030,2040,2050,2060,2070,2080,2090,2100`, {
//             headers: {
//                 Authorization: "token 8428d0e3ca7a3f5862681ad13cb428d7e6f77a9d"
//             }
//         })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             $(".loader-container").hide()
//             displayData(data)
//         })
//         .catch(error => {
//             alert("error fetching results")
//         })
// }

// //display the temperature results in the modal
// function displayData(data) {
//     let day = getCurrentDay()
//     if (!cityName) {
//         let { coordinates } = data.feature.geometry
//         cityName = `${coordinates[0]}, ${coordinates[1]}`
//     }
//     let htmlString = `<p>${cityName}</p>`
//     let htmlStringCityState = ""
//     let keys = Object.keys(data.data)
//     for (let key of keys) {
//         htmlString += `<p>Temperature for ${key} | ${conversion(data.data[key].tasmax[day-1])}°F</p>`
//     }
//     $(".tempTextContainer").append(htmlString);
// };

//     //for markers on map
//     let marker = new google.maps.Marker({
//         position: coordinates,
//         map: map
//     });
// };

// //initial fetch request
// fetch(`https://app.climate.azavea.com/api/climate-data/${cities[0].geometry.coordinates[1]}/${cities[0].geometry.coordinates[0]}/RCP85?dataset=LOCA`, {
//         headers: {
//             Authorization: "token 8428d0e3ca7a3f5862681ad13cb428d7e6f77a9d"
//         }
//     })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });
