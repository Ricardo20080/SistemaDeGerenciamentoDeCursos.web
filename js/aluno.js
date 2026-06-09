// =======================================================
// SISTEMA DE ALUNOS - CRUD COMPLETO
// =======================================================

let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

// SALVAR NO LOCALSTORAGE
function salvarAlunos() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
}

// CREATE (CRIAR)
function cadastrarAluno() {

    const nome = document.getElementById("nomeAluno").value.trim();
    const idade = document.getElementById("idadeAluno").value.trim();
    const email = document.getElementById("emailAluno").value.trim();

    if (!nome || !idade || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    alunos.push({
        nome,
        idade,
        email
    });

    salvarAlunos();
    renderizarAlunos();
    limparCampos();
}

// READ (LISTAR)
function renderizarAlunos() {

    const tabela = document.getElementById("listaAlunos");

    tabela.innerHTML = "";

    alunos.forEach((aluno, index) => {

        tabela.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.email}</td>
                <td>
                    <button class="acao-editar" onclick="editarAluno(${index})">Editar</button>
                    <button class="acao-excluir" onclick="excluirAluno(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

// DELETE (EXCLUIR)
function excluirAluno(index) {

    if (confirm("Deseja excluir este aluno?")) {

        alunos.splice(index, 1);
        salvarAlunos();
        renderizarAlunos();
    }
}

// UPDATE (EDITAR)
function editarAluno(index) {

    const aluno = alunos[index];

    document.getElementById("nomeAluno").value = aluno.nome;
    document.getElementById("idadeAluno").value = aluno.idade;
    document.getElementById("emailAluno").value = aluno.email;

    alunos.splice(index, 1);

    salvarAlunos();
    renderizarAlunos();
}

// LIMPAR CAMPOS
function limparCampos() {
    document.getElementById("nomeAluno").value = "";
    document.getElementById("idadeAluno").value = "";
    document.getElementById("emailAluno").value = "";
}

// INICIALIZAR
document.addEventListener("DOMContentLoaded", renderizarAlunos);