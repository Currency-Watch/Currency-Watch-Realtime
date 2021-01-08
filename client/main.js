const baseUrl = "http://localhost:3001"
let weather = []
let currency = []

function checkAuth() {
  if (localStorage.access_token) {
    $(`#login-page`).hide()
    getWeather()
    getCurrency()
    $(`#currency-list`).show()
    $(`#btn-logout`).show()
    $(`#navbar`).show()

    $(`#weather-div`).show()

    $(`#register-page`).hide()

  } else {
    $(`#login-page`).show()
    $(`#btn-logout`).show()
    $(`#navbar`).hide()
    $(`#currency-list`).hide()

    $(`#weather-div`).hide()

    $(`#currency-list2`).hide()
    $(`#register-page`).hide()

  }
}
function showRegisterForm(){
  $(`#login-page`).hide()
  $(`#register-page`).show()
}
function cancelRegister(){
  $(`#login-page`).show()
  $(`#register-page`).hide()
}

function getWeather() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/weather`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      // console.log(response.current)
      weather = response
      $('#weather-div').empty()
      $('#weather-div').append(`
    <div class="card-body">
        <p>${weather.location.name}</p>
        <p>${weather.current.temperature}&deg;</p>
        <img src="${weather.current.weather_icons}">
      </div>
    `)
    })
    .fail(err => {
      console.log(err, '<< err')
    })
    .always(() => {
      console.log('always')
    })
}

const getRates = () => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/currency`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      console.log(response.rates)
      currency = response
      $('#currency-list').empty()
      for (let i in currency.rates) {
        console.log(i, '<<< rates')
        $('#currency-list').append(`
        <div class="card-body">
          <p class="card-title" id="currency-name">${i}</p>
          <h1 class="card-text" id="currency-value">14500</h1>
        </div>
        `)

      }

    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      console.log('always');
    })
}

$(document).ready(function () {
  checkAuth()

  //Login button

  $(`#btn-login`).click(function (event) {
    event.preventDefault()
    const email = $(`#input-email`).val()
    const password = $(`#input-password`).val()

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/login`,
      data: {
        email,
        password
      }
    })
    
    .done(response => {
      console.log(response,"response");
      localStorage.setItem("access_token",response.access_token)
      checkAuth()
    })
    .fail(err => {
      console.log(err,`err`);
    })
    .always(() => {
      $(`#input-email`).val('')
      $(`#input-password`).val('')
    })

  })
  $(`#btn-logout`).click(function () {
    localStorage.clear()
    checkAuth()
  })
  $(`#btn-add-user`).click(function(event) {
    event.preventDefault()
    const email = $(`#register-input-email`).val()
    const password = $(`#register-input-password`).val()
    console.log(email,password);
    $.ajax({
      method: 'POST',
      url: `${baseUrl}/register`,
      data: {
        email,
        password
      }
    })
    .done(response => {
      console.log(response,"response");
      cancelRegister()
    })
    .fail(err => {
      console.log(err,`err`);
    })
    .always(() => {
      $(`#input-email`).val('')
      $(`#input-password`).val('')
    })
  })
  $(`#btn-register`).click(function() {
    showRegisterForm();
  })
  $(`#btn-register-cancel`).click(function() {
    cancelRegister();
  })
});