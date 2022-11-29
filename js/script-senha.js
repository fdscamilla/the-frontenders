function validarEmail(){
    var email = document.querySelector('#email');
    var error = document.querySelector('#error-email');
    
    if(!email.checkValidity()){
      error.innerHTML = "Email invalido"
      alerta.disabled = true;
    }
    var botao = document.querySelector(".confirma")
  }
  
  function redefinirMsg(){
    var error = document.querySelector('#error-email');
    if (error.innerHTML == "Email invalido"){
      error.innerHTML = " ";
    }

  }
  var botao = document.querySelector(".confirma")
       if ("Email invalido"){
        button.disabled = true;
       }

  var Email = document.getElementById('email').value;

  function alerta(){
    swal({
        title: "Certifique-se que o Email está correto",
        text: "Verifque se este Email é o seu",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Enviaremos um código para seu Email", {
            icon: "success",
          });
        }
      });
  };
