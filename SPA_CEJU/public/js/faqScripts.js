const url = "http://localhost:3000/";

///     FUNÇÕES DO CADASTRO DE FAQS  ///
// Função para confirmar a exclusão da FAQ
function confirmDeleteFaq(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Token não encontrado. Por favor, faça login novamente.',
        });
        return;
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    axios.delete(`${url}api/faqs/${id}`, config)
        .then(response => {
            console.log(response.data);

            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'FAQ excluída com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = `../faqs/`;
            });
        })
        .catch(error => {
            console.error('Erro ao excluir FAQ:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao excluir a FAQ. Por favor, tente novamente.',
            });
        });
}

// Função de validação do formulário
function validateForm(formData) {
    const titulo = formData.get('titulo');
    const resposta = formData.get('resposta');
    const ordem = formData.get('ordem');

    if (!titulo || !resposta || !ordem) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false;
    }
    if (ordem < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ordem deve ser um número maior ou igual a 1!',
        });
        return false;
    }

    return true;
}

function UpdateFaqClick(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#editFaqForm'));
    const faqId = document.querySelector('#editFaqId').value;

    if (validateForm(formData)) {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Token não encontrado. Por favor, faça login novamente.',
            });
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        // Convert FormData to a plain object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        axios.put(`${url}api/faqs/${faqId}`, data, config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'FAQ alterada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = `../faqs/`;
                });
            })
            .catch(error => {
                console.error('Erro ao atualizar FAQ:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao atualizar a FAQ. Por favor, tente novamente.',
                });
            });
    }
}

// Evento quando o botão "Salvar" do formulário de criação é clicado
function CreateFaqClick(event) {
    event.preventDefault();

    const formData = {
        titulo: document.querySelector('#createTitulo').value,
        resposta: document.querySelector('#createResposta').value,
        ordem: document.querySelector('#createOrdem').value
    };

    if (validateForm(new FormData(document.querySelector('#createFaqForm')))) {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Token não encontrado. Por favor, faça login novamente.',
            });
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        axios.post(`${url}api/faqs/`, JSON.stringify(formData), config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'FAQ criada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = `../faqs/`;
                });
            })
            .catch(error => {
                console.error('Erro ao criar FAQ:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao criar a FAQ. Por favor, tente novamente.',
                });
            });
    }
}