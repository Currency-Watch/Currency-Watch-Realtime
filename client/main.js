const baseUrl = "http://localhost:3001"

function checkAuth() {
  if(localStorage.access_token) {
    $(`#login-page`).hide()
    $(`#currency-list`).show()
    $(`#btn-logout`).show()
    $(`#navbar`).show()
    $(`#register-page`).hide()
  } else {
    $(`#login-page`).show()
    $(`#btn-logout`).show()
    $(`#navbar`).hide()
    $(`#currency-list`).hide()
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

$(document).ready(function(){
  checkAuth()

  //Login button

  $(`#btn-login`).click(function(event) {
    event.preventDefault()
    const email = $(`#input-email`).val()
    const password = $(`#input-password`).val()
    // console.log(email,password);
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
  $(`#btn-logout`).click(function() {
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