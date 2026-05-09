let cursos =
    JSON.parse(localStorage.getItem("cursos")) || [];

let cursoEditando = null;

/* =====================================
   ESTRUTURAS
===================================== */

function adicionarEstrutura() {

    const container =
        document.getElementById("estruturaContainer");

    const div =
        document.createElement("div");

    div.className = "item-estrutura";

    div.innerHTML = `
        <input
            type="text"
            placeholder="Nome da estrutura">

        <button
            type="button"
            class="botao"
            onclick="this.parentElement.remove()">

            Remover

        </button>
    `;

    container.appendChild(div);

}

/* =====================================
   DISCIPLINAS
===================================== */

function adicionarDisciplina() {

    const container =
        document.getElementById("disciplinasContainer");

    const div =
        document.createElement("div");

    div.className = "item-disciplina";

    div.innerHTML = `
        <input
            type="text"
            placeholder="Nome da disciplina">

        <input
            type="text"
            placeholder="Professor">

        <input
            type="number"
            placeholder="Carga Horária">

        <input
            type="text"
            placeholder="Estrutura (Ex: Módulo 1)">

        <button
            type="button"
            class="botao"
            onclick="this.parentElement.remove()">

            Remover

        </button>
    `;

    container.appendChild(div);

}

/* =====================================
   SALVAR CURSO
===================================== */

function salvarCurso() {

    const nome =
        document.getElementById("nomeCurso").value.trim();

    if(nome === "") {

        alert("Informe o nome do curso.");
        return;

    }

    const estruturas = [];

    document
        .querySelectorAll(".item-estrutura input")
        .forEach(input => {

            if(input.value.trim() !== "") {

                estruturas.push(
                    input.value.trim()
                );

            }

        });

    const disciplinas = [];

    document
        .querySelectorAll(".item-disciplina")
        .forEach(item => {

            const campos =
                item.querySelectorAll("input");

            disciplinas.push({

                nome:
                    campos[0].value,

                professor:
                    campos[1].value,

                cargaHoraria:
                    campos[2].value,

                estrutura:
                    campos[3].value

            });

        });

    const curso = {

        id:
            cursoEditando || Date.now(),

        nome:
            nome,

        descricao:
            document.getElementById("descricaoCurso").value,

        professor:
            document.getElementById("professor").value,

        cargaHoraria:
            document.getElementById("cargaHoraria").value,

        limiteAlunos:
            document.getElementById("limiteAlunos").value,

        modelo:
            document.getElementById("modeloCurso").value,

        tipoAvaliacao:
            document.getElementById("tipoAvaliacao").value,

        notaMinima:
            document.getElementById("notaMinima").value,

        frequenciaMinima:
            document.getElementById("frequenciaMinima").value,

        textoCertificado:
            document.getElementById("textoCertificado").value,

        estruturas:
            estruturas,

        disciplinas:
            disciplinas

    };

    if(cursoEditando) {

        cursos =
            cursos.map(c =>
                c.id === cursoEditando
                    ? curso
                    : c
            );

    } else {

        cursos.push(curso);

    }

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    limparFormulario();

    renderizarCursos();

    alert("Curso salvo com sucesso!");

}

/* =====================================
   LISTAGEM
===================================== */

function renderizarCursos(lista = cursos) {

    const tbody =
        document.getElementById("listaCursos");

    if(!tbody) return;

    tbody.innerHTML = "";

    lista.forEach(curso => {

        tbody.innerHTML += `
            <tr>

                <td>${curso.nome}</td>

                <td>${curso.modelo}</td>

                <td>${curso.cargaHoraria}h</td>

                <td>${curso.professor}</td>

                <td>

                    <button
                        class="botao"
                        onclick="visualizarCurso(${curso.id})">

                        Ver

                    </button>

                    <button
                        class="botao"
                        onclick="editarCurso(${curso.id})">

                        Editar

                    </button>

                    <button
                        class="botao"
                        onclick="excluirCurso(${curso.id})">

                        Excluir

                    </button>

                </td>

            </tr>
        `;

    });

}

/* =====================================
   PESQUISA
===================================== */

function pesquisarCurso() {

    const texto =
        document
            .getElementById("pesquisaCurso")
            .value
            .toLowerCase();

    const resultado =
        cursos.filter(curso =>

            curso.nome
                .toLowerCase()
                .includes(texto)

        );

    renderizarCursos(resultado);

}

/* =====================================
   VISUALIZAR
===================================== */

function visualizarCurso(id) {

    const curso =
        cursos.find(c => c.id === id);

    if (!curso) return;

    let disciplinasHTML = "";

    curso.disciplinas.forEach(d => {

        disciplinasHTML += `
            <li>
                <strong>${d.nome}</strong>
                (${d.cargaHoraria}h)
                ${d.professor ? `- ${d.professor}` : ""}
            </li>
        `;

    });

    document.getElementById("tituloModal")
        .textContent = curso.nome;

    document.getElementById("conteudoModal")
        .innerHTML = `

            <h3>📚 Informações Gerais</h3>

            <p><strong>Professor:</strong> ${curso.professor}</p>

            <p><strong>Carga Horária:</strong> ${curso.cargaHoraria}h</p>

            <p><strong>Modelo:</strong> ${curso.modelo}</p>

            <p><strong>Limite de Alunos:</strong> ${curso.limiteAlunos}</p>

            <p><strong>Descrição:</strong> ${curso.descricao}</p>

            <hr>

            <h3>📖 Disciplinas</h3>

            <ul>
                ${disciplinasHTML || "<li>Nenhuma disciplina cadastrada.</li>"}
            </ul>

            <hr>

            <h3>📊 Avaliação</h3>

            <p>
                <strong>Tipo:</strong>
                ${curso.tipoAvaliacao}
            </p>

            <p>
                <strong>Nota Mínima:</strong>
                ${curso.notaMinima}
            </p>

            <hr>

            <h3>📅 Frequência</h3>

            <p>
                <strong>Frequência Mínima:</strong>
                ${curso.frequenciaMinima}%
            </p>

            <hr>

            <h3>🏆 Certificação</h3>

            <p>
                ${curso.textoCertificado || "Certificado habilitado para emissão."}
            </p>

    `;

    document
        .getElementById("modalDetalhes")
        .style.display = "flex";

}

function fecharModal() {

    document
        .getElementById("modalDetalhes")
        .style.display = "none";

}

/* =====================================
   EXCLUIR
===================================== */

function excluirCurso(id) {

    if(!confirm("Deseja excluir este curso?"))
        return;

    cursos =
        cursos.filter(c => c.id !== id);

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    renderizarCursos();

}

/* =====================================
   EDITAR
===================================== */

function editarCurso(id) {

    const curso =
        cursos.find(c => c.id === id);

    if(!curso) return;

    cursoEditando = id;

    document.getElementById("nomeCurso").value =
        curso.nome;

    document.getElementById("descricaoCurso").value =
        curso.descricao;

    document.getElementById("professor").value =
        curso.professor;

    document.getElementById("cargaHoraria").value =
        curso.cargaHoraria;

    document.getElementById("limiteAlunos").value =
        curso.limiteAlunos;

    document.getElementById("modeloCurso").value =
        curso.modelo;

    document.getElementById("tipoAvaliacao").value =
        curso.tipoAvaliacao;

    document.getElementById("notaMinima").value =
        curso.notaMinima;

    document.getElementById("frequenciaMinima").value =
        curso.frequenciaMinima;

    document.getElementById("textoCertificado").value =
        curso.textoCertificado;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* =====================================
   LIMPAR
===================================== */

function limparFormulario() {

    document
        .getElementById("formCurso")
        .reset();

    document
        .getElementById("estruturaContainer")
        .innerHTML = "";

    document
        .getElementById("disciplinasContainer")
        .innerHTML = "";

    cursoEditando = null;

}

/* =====================================
   INICIAR
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderizarCursos();

    }
);