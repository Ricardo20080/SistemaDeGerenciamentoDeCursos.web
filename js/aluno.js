let alunos = [];

/* =========================
PEGAR MATRICULAS E GERAR ALUNOS
========================= */

function carregarAlunos() {
    const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];

    // transforma matrículas em alunos únicos
    const mapa = new Map();

    matriculas.forEach(m => {
        if (!m.id) return;

        mapa.set(m.id, {
            id: m.id,
            nome: m.nome,
            curso: m.curso
        });
    });

    alunos = Array.from(mapa.values());

    renderAlunos(alunos);
}

/* =========================
RENDER
========================= */

function renderAlunos(lista) {
    const tbody = document.getElementById("listaAlunos");
    if (!tbody) return;

    tbody.innerHTML = "";

    lista.forEach(a => {
        tbody.innerHTML += `
            <tr>
                <td>${a.nome}</td>
                <td>${a.id}</td>
                <td>${a.curso}</td>
                <td>
                    <button class="botao" onclick="removerAluno('${a.id}')">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

/* =========================
BUSCAR POR NOME
========================= */

function buscarAluno() {
    const termo = document.getElementById("buscaAluno").value.trim().toLowerCase();

    if (!termo) {
        renderAlunos(alunos);
        return;
    }

    const filtrados = alunos.filter(a =>
        a.nome.toLowerCase().includes(termo)
    );

    renderAlunos(filtrados);
}

/* =========================
REMOVER ALUNO (remove matrícula também)
========================= */

function removerAluno(id) {
    let matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];

    matriculas = matriculas.filter(m => m.id !== id);

    localStorage.setItem("matriculas", JSON.stringify(matriculas));

    carregarAlunos(); // atualiza tudo
}

/* =========================
AUTO UPDATE (quando salvar matrícula)
========================= */

window.addEventListener("storage", (e) => {
    if (e.key === "matriculas") {
        carregarAlunos();
    }
});

/* =========================
INIT
========================= */

document.addEventListener("DOMContentLoaded", carregarAlunos);