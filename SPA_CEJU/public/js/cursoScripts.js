const url = "http://localhost:3000/";

///     FUNÇÕES DO CADASTRO DE CURSOS  ///
// Função para confirmar a exclusão do curso
function confirmDeleteCurso(id) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    axios.delete(`${url}api/cursos/${id}`, config)
        .then(response => {
            console.log(response.data);

            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Curso excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = `../cursos/`;
            });
        })
        .catch(error => {
            console.error(error);
            // Handle errors if necessary
        });
}

// Função para validar as extensões de arquivo
function validateFileExtension(file) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
}

// Função para validar o formulário
function validateForm(formData, isEdit = false) {
    const titulo = formData.get('titulo');
    const conteudo = formData.get('conteudo');
    const imagem_principal = formData.get('imagem_principal');

    if (!titulo.trim() || !conteudo.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false;
    }

    if (!isEdit || (imagem_principal && imagem_principal.size)) {
        if (!imagem_principal.size) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, selecione uma imagem principal!',
            });
            return false;
        }

        if (!validateFileExtension(imagem_principal)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'A imagem principal deve ser um arquivo de imagem válido (jpg, jpeg, png, gif)!',
            });
            return false;
        }
    }

    const imagensInternas = formData.getAll('imagens_internas');
    for (let i = 0; i < imagensInternas.length; i++) {
        if (!validateFileExtension(imagensInternas[i])) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Uma das imagens internas não é válida. Certifique-se de que todos os arquivos são jpg, jpeg, png, ou gif.',
            });
            return false;
        }
    }

    return true;
}

// Função para manipular o envio do formulário de criação
function CreateCursoClick(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#createCursoForm'));

    if (validateForm(formData)) {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        axios.post(`${url}api/cursos/`, formData, config)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Curso criado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.href = `../cursos/`;
                });
            })
            .catch(error => {
                console.error('Erro ao criar curso:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao criar o curso. Por favor, tente novamente.',
                });
            });
    }
}

// Evento quando o botão "Salvar" do formulário de edição de curso é clicado
function UpdateCursoClick(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#editCursoForm'));
    const cursoId = document.querySelector('#editCursoId').value;

    if (validateForm(formData, true)) { // Passando "true" para indicar que é uma edição
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        axios.put(`${url}api/cursos/${cursoId}`, formData, config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Curso alterado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = `../cursos/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Handle errors if necessary
            });
    }
}