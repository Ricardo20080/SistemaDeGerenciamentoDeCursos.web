let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
let cursoEditando = null;

/* ===============================
   ESTRUTURAS
=============================== */

function adicionarEstrutura() {

    const container = document.getElementById("estruturaContainer");
    if (!container) return;

    const div = document.createElement("div");
    div.className = "item-estrutura";

    div.innerHTML = `
        <input type="text" placeholder="Nome da estrutura">

        <button type="button" class="botao"
            onclick="this.parentElement.remove()">
            Remover
        </button>
    `;

    container.appendChild(div);
}

/* ===============================
   DISCIPLINAS
=============================== */

function adicionarDisciplina() {

    const container = document.getElementById("disciplinasContainer");
    if (!container) return;

    const div = document.createElement("div");
    div.className = "item-disciplina";

    div.innerHTML = `
        <input type="text" placeholder="Nome da disciplina">
        <input type="text" placeholder="Professor">
        <input type="number" placeholder="Carga Horária">
        <input type="text" placeholder="Estrutura">

        <button type="button" class="botao"
            onclick="this.parentElement.remove()">
            Remover
        </button>
    `;

    container.appendChild(div);
}

/* ===============================
   SALVAR CURSO (CORRIGIDO)
=============================== */

function salvarCurso() {

    const nome = document.getElementById("nomeCurso")?.value?.trim();

    if (!nome) {
        alert("Informe o nome do curso.");
        return;
    }

    const estruturas = [];
    document.querySelectorAll(".item-estrutura input").forEach(i => {
        if (i.value.trim()) estruturas.push(i.value.trim());
    });

    const disciplinas = [];
    document.querySelectorAll(".item-disciplina").forEach(item => {

        const campos = item.querySelectorAll("input");

        if (campos.length < 4) return;

        disciplinas.push({
            nome: campos[0]?.value || "",
            professor: campos[1]?.value || "",
            cargaHoraria: campos[2]?.value || "",
            estrutura: campos[3]?.value || ""
        });
    });

    const curso = {
        id: cursoEditando || Date.now(),

        nome,
        descricao: document.getElementById("descricaoCurso")?.value || "",
        professor: document.getElementById("professor")?.value || "",
        cargaHoraria: document.getElementById("cargaHoraria")?.value || "",
        limiteAlunos: document.getElementById("limiteAlunos")?.value || "",
        modelo: document.getElementById("modeloCurso")?.value || "",
        tipoAvaliacao: document.getElementById("tipoAvaliacao")?.value || "",
        notaMinima: document.getElementById("notaMinima")?.value || "",
        frequenciaMinima: document.getElementById("frequenciaMinima")?.value || "",
        textoCertificado: document.getElementById("textoCertificado")?.value || "",

        estruturas,
        disciplinas
    };

    if (cursoEditando) {
        cursos = cursos.map(c =>
            c.id === cursoEditando ? curso : c
        );
    } else {
        cursos.push(curso);
    }

    localStorage.setItem("cursos", JSON.stringify(cursos));

    cursoEditando = null;

    limparFormulario();
    renderizarCursos();

    alert("Curso salvo com sucesso!");
}

/* ===============================
   LISTAGEM
=============================== */

function renderizarCursos(lista = cursos) {

    const tbody =
        document.getElementById("listaCursos");

    if (!tbody) return;

    if (!lista.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum curso cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML = lista.map(curso => `
        <tr>
            <td>${curso.nome}</td>

            <td>${curso.modelo || "-"}</td>

            <td>${curso.cargaHoraria || 0}h</td>

            <td>${curso.professor || "-"}</td>

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
    `).join("");
}

/* ===============================
   PESQUISA
=============================== */

function pesquisarCurso() {

    const texto = document.getElementById("pesquisaCurso")?.value.toLowerCase() || "";

    const resultado = cursos.filter(c =>
        c.nome.toLowerCase().includes(texto)
    );

    renderizarCursos(resultado);
}

/* ===============================
   VISUALIZAR
=============================== */

function visualizarCurso(id) {

    const curso = cursos.find(c => c.id === id);
    if (!curso) return;

    let disciplinasHTML = "";

    curso.disciplinas.forEach(d => {

    disciplinasHTML += `
        <li>
            <strong>${d.nome}</strong>
            (${d.cargaHoraria}h)
            ${d.professor ? ` - ${d.professor}` : ""}

            <br>
            <small>
                📦 Estrutura: ${d.estrutura || "Não definida"}
            </small>
        </li>
    `;
});;

    document.getElementById("tituloModal").textContent = curso.nome;

    document.getElementById("conteudoModal").innerHTML = `
        <h3>Informações</h3>

        <p><b>Professor:</b> ${curso.professor}</p>
        <p><b>Carga Horária:</b> ${curso.cargaHoraria}</p>
        <p><b>Modelo:</b> ${curso.modelo}</p>
        <p><b>Limite:</b> ${curso.limiteAlunos}</p>
        <p><b>Descrição:</b> ${curso.descricao}</p>

        <hr>

        <h3>Disciplinas</h3>
        <ul>${disciplinasHTML || "<li>Nenhuma disciplina</li>"}</ul>

        <hr>

        <h3>Avaliação</h3>
        <p><b>Tipo:</b> ${curso.tipoAvaliacao}</p>
        <p><b>Nota mínima:</b> ${curso.notaMinima}</p>

        <hr>

        <h3>Frequência</h3>
        <p>${curso.frequenciaMinima}%</p>

        <hr>

        <h3>Certificado</h3>
        <p>${curso.textoCertificado || "Certificado habilitado"}</p>
    `;

    document.getElementById("modalDetalhes").style.display = "flex";
}

/* ===============================
   FECHAR MODAL
=============================== */

function fecharModal() {
    document.getElementById("modalDetalhes").style.display = "none";
}

/* ===============================
   EXCLUIR
=============================== */

function excluirCurso(id) {

    if (!confirm("Deseja excluir este curso?")) return;

    cursos = cursos.filter(c => c.id !== id);

    localStorage.setItem("cursos", JSON.stringify(cursos));

    renderizarCursos();
}

/* ===============================
   EDITAR
=============================== */

function editarCurso(id) {

    const curso = cursos.find(c => c.id === id);
    if (!curso) return;

    cursoEditando = id;

const container =
    document.getElementById("disciplinasContainer");

container.innerHTML = "";

(curso.disciplinas || []).forEach(d => {

    const div = document.createElement("div");

    div.className = "item-disciplina";

    div.innerHTML = `
        <input
            type="text"
            placeholder="Nome da disciplina"
            value="${d.nome || ""}">

        <input
            type="text"
            placeholder="Professor"
            value="${d.professor || ""}">

        <input
            type="number"
            placeholder="Carga Horária"
            value="${d.cargaHoraria || ""}">

        <input
            type="text"
            placeholder="Estrutura"
            value="${d.estrutura || ""}">

        <button
            type="button"
            class="botao"
            onclick="this.parentElement.remove()">

            Remover

        </button>
    `;

    container.appendChild(div);
});

    document.getElementById("nomeCurso").value = curso.nome;
    document.getElementById("descricaoCurso").value = curso.descricao;
    document.getElementById("professor").value = curso.professor;
    document.getElementById("cargaHoraria").value = curso.cargaHoraria;
    document.getElementById("limiteAlunos").value = curso.limiteAlunos;
    document.getElementById("modeloCurso").value = curso.modelo;
    document.getElementById("tipoAvaliacao").value = curso.tipoAvaliacao;
    document.getElementById("notaMinima").value = curso.notaMinima;
    document.getElementById("frequenciaMinima").value = curso.frequenciaMinima;
    document.getElementById("textoCertificado").value = curso.textoCertificado;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===============================
   LIMPAR
=============================== */

function limparFormulario() {

    document.getElementById("formCurso")?.reset();

    document.getElementById(
        "disciplinasContainer"
    ).innerHTML = "";

    cursoEditando = null;
}

/* ===============================
   INIT
=============================== */

document.addEventListener("DOMContentLoaded", () => {
    renderizarCursos();
});