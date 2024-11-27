const url = "http://localhost:3000/";

const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    helpers: {
        limitTo: (array, limit) => {
            return array.slice(0, limit);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Função auxiliar para validar o formato de e-mail
function isValidEmail(email) {
    // Use uma expressão regular simples para validar o formato do e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  
  // Função para exibir mensagens de erro usando SweetAlert
  function showMessage(message) {
    const divMessage = document.getElementById('resposta');
    divMessage.textContent = '! ' + message;
  }

  function validateForm(formData) {
    // Obtenha os valores dos campos
    const email = formData.get('email');
    const nome = formData.get('nome');
    const mensagem = formData.get('mensagem');
  
    // Valide o campo de e-mail
    if (!email || !email.trim()) {
        showMessage('Por favor, preencha o campo de e-mail.');
      return false; // Impede o envio do formulário
    } else if (!isValidEmail(email)) {
        showMessage('Por favor, insira um endereço de e-mail válido.');
      return false; // Impede o envio do formulário
    }
  
    // Valide o campo de senha
    if (!nome || !nome.trim()) {
        showMessage('Por favor, preencha o campo de nome.');
      return false; // Impede o envio do formulário
    } 

    // Valide o campo de senha
    if (!mensagem || !mensagem.trim()) {
        showMessage('Por favor, preencha o campo de mensagem.');
        return false; // Impede o envio do formulário
    }
  
    return true; // Todos os campos estão preenchidos corretamente
  }

  document.querySelector('#sendMessage').addEventListener('click',function(){
    const formData = new FormData(document.querySelector('#formSendMessage'));
    if (validateForm(formData)){
        const serializedData = new URLSearchParams(formData).toString();
        const config = {
            headers :{
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }

        axios.post(url+'api/contato/enviar', serializedData, config)
        .then(response =>{
            showMessage(response.data.message)
        })
        .catch(error => {
            showMessage(error.response.data.error)
        })


    }
  })
  
  document.getElementById("navbarToggle").addEventListener("click", function () {
    const navbarMenu = document.getElementById("navbarMenu");
    navbarMenu.classList.toggle("active"); // Alterna a exibição do menu
});