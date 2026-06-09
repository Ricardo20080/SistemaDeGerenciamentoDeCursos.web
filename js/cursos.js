let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
let editandoId = null;

// -----------------------------
// ADICIONAR ESTRUTURA
// -----------------------------
function adicionarEstrutura() {

    const container = document.getElementById("estruturaContainer");

    const div = document.createElement("div");
    div.classList.add("item-estrutura");

    div.innerHTML = `
        <input placeholder="Nome (Módulo/Semestre/Disciplina)">
        <input placeholder="Descrição">
        <button type="button" onclick="this.parentElement.remove()">X</button>
    `;

    container.appendChild(div);
}

// -----------------------------
// SALVAR CURSO
// -----------------------------
function salvarCurso() {

    const nome = document.getElementById("nomeCurso").value;
    const tipo = document.getElementById("tipoCurso").value;
    const carga = document.getElementById("cargaHoraria").value;
    const professor = document.getElementById("professor").value;

    const itens = document.querySelectorAll("#estruturaContainer .item-estrutura");

    let estrutura = [];

    itens.forEach(item => {

        const inputs = item.querySelectorAll("input");

        estrutura.push({
            nome: inputs[0].value,
            descricao: inputs[1].value
        });
    });

    const curso = {
        id: editandoId ? editandoId : Date.now(),
        nome,
        tipo,
        cargaHoraria: carga,
        professor,
        estrutura
    };

    if (editandoId) {

        cursos = cursos.map(c =>
            c.id === editandoId ? curso : c
        );

        editandoId = null;

    } else {
        cursos.push(curso);
    }

    localStorage.setItem("cursos", JSON.stringify(cursos));

    limparFormulario();
    listarCursos();
}

// -----------------------------
// LISTAR CURSOS
// -----------------------------
function listarCursos() {

    const tabela = document.getElementById("listaCursos");

    tabela.innerHTML = "";

    cursos.forEach(curso => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${curso.nome}</td>
            <td>${curso.cargaHoraria}h</td>
            <td>${curso.professor}</td>
            <td>
                <button class="acao-editar" onclick="editarCurso(${curso.id})">Editar</button>
                <button class="acao-excluir" onclick="excluirCurso(${curso.id})">Excluir</button>
            </td>
        `;

        tabela.appendChild(tr);

        // linha de detalhes
        const tr2 = document.createElement("tr");

        let estruturaHTML = "";

        curso.estrutura.forEach(e => {
            estruturaHTML += `<li><strong>${e.nome}</strong> - ${e.descricao}</li>`;
        });

        tr2.innerHTML = `
            <td colspan="4">
                <div class="detalhes">
                    <h4>Estrutura do Curso (${curso.tipo})</h4>
                    <ul>${estruturaHTML}</ul>
                </div>
            </td>
        `;

        tabela.appendChild(tr2);
    });
}

// -----------------------------
// EDITAR
// -----------------------------
function editarCurso(id) {

    const curso = cursos.find(c => c.id === id);

    document.getElementById("nomeCurso").value = curso.nome;
    document.getElementById("tipoCurso").value = curso.tipo;
    document.getElementById("cargaHoraria").value = curso.cargaHoraria;
    document.getElementById("professor").value = curso.professor;

    document.getElementById("estruturaContainer").innerHTML = "";

    curso.estrutura.forEach(e => {

        const div = document.createElement("div");

        div.classList.add("item-estrutura");

        div.innerHTML = `
            <input value="${e.nome}">
            <input value="${e.descricao}">
            <button type="button" onclick="this.parentElement.remove()">X</button>
        `;

        document.getElementById("estruturaContainer").appendChild(div);
    });

    editandoId = id;
}

// -----------------------------
// EXCLUIR
// -----------------------------
function excluirCurso(id) {

    cursos = cursos.filter(c => c.id !== id);

    localStorage.setItem("cursos", JSON.stringify(cursos));

    listarCursos();
}

// -----------------------------
// LIMPAR FORM
// -----------------------------
function limparFormulario() {

    document.getElementById("formCurso").reset();
    document.getElementById("estruturaContainer").innerHTML = "";
}

// init
listarCursos();