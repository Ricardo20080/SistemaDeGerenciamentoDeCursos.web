let notas = [];

/* =========================
CARREGAR
========================= */

function carregarNotas() {

    const matriculas =
        JSON.parse(localStorage.getItem("matriculas")) || [];

    const notasSalvas =
        JSON.parse(localStorage.getItem("notas")) || [];

    notas = matriculas.map(m => {

        const existente =
            notasSalvas.find(n => n.id === m.id);

        return {
            id: m.id,
            nome: m.nome,
            curso: m.curso,
            notas: existente?.notas || {}
        };
    });

    renderNotas();
}

/* =========================
SALVAR
========================= */

function salvarNotasStorage() {

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );

}

/* =========================
STATUS
========================= */

function calcularStatus(aluno) {

    const curso =
        obterCurso(aluno.curso);

    if (!curso)
        return "PENDENTE";

    const notasArr =
        Object.values(aluno.notas);

    if (notasArr.length === 0)
        return "PENDENTE";

    const media =
        notasArr.reduce((a,b)=>a+b,0)
        / notasArr.length;

    return media >= Number(curso.notaMinima || 0)
        ? "APROVADO"
        : "REPROVADO";
}

/* =========================
CURSO
========================= */

function obterCurso(nomeCurso) {

    const cursos =
        JSON.parse(localStorage.getItem("cursos")) || [];

    return cursos.find(c =>
        c.nome?.trim().toLowerCase() ===
        nomeCurso?.trim().toLowerCase()
    );
}

/* =========================
RENDER
========================= */

function renderNotas() {

    const tbody =
        document.getElementById("listaNotas");

    if (!tbody) return;

    tbody.innerHTML = "";

    notas.forEach(aluno => {

        const status =
            calcularStatus(aluno);

        tbody.innerHTML += `

            <tr>

                <td>${aluno.nome}</td>

                <td>${aluno.curso}</td>

                <td class="status-${status.toLowerCase()}">
                    ${status}
                </td>

                <td>

                    <button
                        class="botao"
                        onclick="toggleNotas('${aluno.id}')">

                        ▼

                    </button>

                </td>

            </tr>

            <tr
                id="detalhes-${aluno.id}"
                style="display:none;">

                <td colspan="4">

                    <div
                        id="conteudo-${aluno.id}">
                    </div>

                </td>

            </tr>

        `;
    });
}

/* =========================
ABRIR / FECHAR
========================= */

function toggleNotas(id) {

    const linha =
        document.getElementById(
            `detalhes-${id}`
        );

    if (!linha) return;

    if (linha.style.display === "table-row") {

        linha.style.display = "none";
        return;

    }

    linha.style.display = "table-row";

    carregarDisciplinasAluno(id);
}

/* =========================
DISCIPLINAS
========================= */

function carregarDisciplinasAluno(id) {

    const aluno =
        notas.find(n => n.id === id);

    if (!aluno) return;

    const curso =
        obterCurso(aluno.curso);

    const container =
        document.getElementById(
            `conteudo-${id}`
        );

    if (!container) return;

    if (!curso || !curso.disciplinas) {

        container.innerHTML =
            "<p>Nenhuma disciplina encontrada.</p>";

        return;
    }

    let html = "";

    curso.disciplinas.forEach(d => {

        html += `

            <div class="linha-disciplina">

                <label>

                    <strong>${d.nome}</strong>

                    ${d.estrutura
                        ? `(${d.estrutura})`
                        : ""
                    }

                </label>

                <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"

                    value="${
                        aluno.notas[d.nome] || ""
                    }"

                    onchange="
                        salvarNota(
                            '${id}',
                            '${d.nome}',
                            this.value
                        )
                    "
                >

            </div>

        `;
    });

    const media =
        calcularMedia(aluno);

    html += `

        <div class="resultado-notas">

            <strong>
                Média Final:
            </strong>

            ${media.toFixed(2)}

        </div>

    `;

    container.innerHTML = html;
}

/* =========================
SALVAR NOTA
========================= */

function salvarNota(
    alunoId,
    disciplina,
    valor
) {

    const aluno =
        notas.find(n => n.id === alunoId);

    if (!aluno) return;

    aluno.notas[disciplina] =
        Number(valor);

    salvarNotasStorage();

    renderNotas();

    setTimeout(() => {
        toggleNotas(alunoId);
    }, 10);
}

/* =========================
MEDIA
========================= */

function calcularMedia(aluno) {

    const notasArr =
        Object.values(aluno.notas);

    if (!notasArr.length)
        return 0;

    return (
        notasArr.reduce((a,b)=>a+b,0)
        / notasArr.length
    );
}

/* =========================
INIT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    carregarNotas
);