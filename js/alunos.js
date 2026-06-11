let alunos = [];

/* =========================
CARREGAR ALUNOS (BASEADO EM MATRÍCULAS)
========================= */

function carregarAlunos() {

    const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];

    const mapa = new Map();

    matriculas.forEach(m => {

        if (!m || !m.id) return;

        mapa.set(m.id, {
            id: m.id,
            nome: m.nome || "",
            curso: m.curso || "",
            status: m.status || "ativo"
        });
    });

    alunos = Array.from(mapa.values());

    renderAlunos(alunos);
}

/* =========================
RENDER
========================= */

function renderAlunos(lista = alunos) {

    const tbody = document.getElementById("listaAlunos");
    if (!tbody) return;

    tbody.innerHTML = "";

    lista.forEach(a => {

        tbody.innerHTML += `
            <tr>
                <td>${a.nome}</td>
                <td>${a.id}</td>
                <td>${a.curso}</td>
                <td>${a.status}</td>
                <td>
                    <button
        class="botao-excluir"
        onclick="removerAluno('${a.id}')">

        🗑 Excluir

    </button>
                </td>
            </tr>
        `;
    });
}

/* =========================
BUSCA
========================= */

function buscarAluno() {

    const termo = document.getElementById("buscaAluno")?.value?.toLowerCase() || "";

    if (!termo) {
        renderAlunos(alunos);
        return;
    }

    const filtrados = alunos.filter(a =>
        (a.nome || "").toLowerCase().includes(termo) ||
        (a.curso || "").toLowerCase().includes(termo) ||
        (a.id || "").toLowerCase().includes(termo)
    );

    renderAlunos(filtrados);
}

/* =========================
REMOVER (REMOVE MATRÍCULA REAL)
========================= */

function removerAluno(id) {

    let matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];

    matriculas = matriculas.filter(m => m.id !== id);

    localStorage.setItem("matriculas", JSON.stringify(matriculas));

    carregarAlunos();
}

/* =========================
AUTO SYNC (QUANDO MATRÍCULA MUDA)
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