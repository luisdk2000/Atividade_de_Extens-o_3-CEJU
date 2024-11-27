const url = "http://localhost:3000/";

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
  
    // Valide o campo de nome do curso
    if (!nome || !nome.trim()) {
        showMessage('Por favor, preencha o campo de nome do curso.');
        return false; // Impede o envio do formulário
    }

    // Valide o campo de mensagem
    if (!mensagem || !mensagem.trim()) {
        showMessage('Por favor, preencha o campo de mensagem.');
        return false; // Impede o envio do formulário
    }
  
    return true; // Todos os campos estão preenchidos corretamente
}

document.querySelector('#sendMessage').addEventListener('click', function(){
    const formData = new FormData(document.querySelector('#formSendMessage'));
    if (validateForm(formData)){
        const serializedData = new URLSearchParams(formData).toString();
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post(url + 'api/cursos/enviar', serializedData, config)
        .then(response => {
            showMessage(response.data.message)
        })
        .catch(error => {
            showMessage(error.response.data.error)
        })
    }
})