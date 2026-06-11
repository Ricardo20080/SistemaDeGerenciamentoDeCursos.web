let matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
let editando = null;

/* =========================
GERAR ID ÚNICO
========================= */

function gerarId() {
    let id;

    do {
        id = "MAT-" + Math.floor(100000 + Math.random() * 900000);
    } while (matriculas.some(m => m.id === id));

    return id;
}

/* =========================
SALVAR
========================= */

function salvarMatricula() {

    const m = {
        id: editando ?? gerarId(),

        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        rg: document.getElementById("rg").value,
        nascimento: document.getElementById("nascimento").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        curso: document.getElementById("curso").value,
        status: document.getElementById("status").value
    };

    // garante estado sempre atualizado do storage
    let lista = JSON.parse(localStorage.getItem("matriculas")) || [];

    if (editando) {
        lista = lista.map(x =>
            x.id === editando ? m : x
        );
        editando = null;
    } else {
        lista.push(m);
    }

    localStorage.setItem("matriculas", JSON.stringify(lista));

    limpar();

    // sincroniza variável global
    matriculas = lista;

    render(matriculas);
}

/* =========================
EXCLUIR MATRICULA
========================= */

function excluirMatricula(id) {

    const confirmar = confirm("Tem certeza que deseja excluir esta matrícula?");

    if (!confirmar) return;

    matriculas = matriculas.filter(m => m.id !== id);

    localStorage.setItem("matriculas", JSON.stringify(matriculas));

    render(matriculas);
}

/* =========================
RENDER (SEGURADO)
========================= */

function render(lista = matriculas) {

    const tbody = document.getElementById("lista");
    if (!tbody) return;

    tbody.innerHTML = "";

    lista.forEach(m => {

        tbody.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.nome}</td>
                <td>${m.curso}</td>
                <td>${m.status}</td>
                <td>
                    <button onclick="ver('${m.id}')">Ver</button>
                    <button onclick="editar('${m.id}')">Editar</button>
                    <button onclick="excluirMatricula('${m.id}')">Excluir</button>
                </td>
            </tr>
        `;
    });
}

/* =========================
BUSCAR (FIX DEFINITIVO)
========================= */

function buscarMatricula() {

    const input = document.getElementById("buscaId");
    const id = (input?.value || "").trim();

    if (!id) {
        render(matriculas);
        return;
    }

    const resultado = matriculas.filter(m =>
        (m.id || "").toLowerCase().includes(id.toLowerCase())
    );

    render(resultado);
}

/* =========================
VER
========================= */

function ver(id) {

    const m = matriculas.find(x => x.id === id);
    if (!m) return;

    document.getElementById("titulo").innerText = m.nome;

    document.getElementById("conteudo").innerHTML = `
        <div class="modal-grid">
            <p><b>ID:</b> ${m.id}</p>
            <p><b>CPF:</b> ${m.cpf}</p>
            <p><b>RG:</b> ${m.rg}</p>
            <p><b>Nascimento:</b> ${m.nascimento}</p>
            <p><b>Telefone:</b> ${m.telefone}</p>
            <p><b>Email:</b> ${m.email}</p>
            <p><b>Endereço:</b> ${m.endereco}</p>
            <p><b>Curso:</b> ${m.curso}</p>
            <p><b>Status:</b> ${m.status}</p>
        </div>
    `;

    document.getElementById("modal").style.display = "flex";
}

/* =========================
EDITAR
========================= */

function editar(id) {

    const m = matriculas.find(x => x.id === id);
    if (!m) return;

    editando = id;

    Object.keys(m).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = m[key];
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================
FECHAR MODAL
========================= */

function fechar() {
    document.getElementById("modal").style.display = "none";
}

/* =========================
LIMPAR
========================= */

function limpar() {
    ["nome","cpf","rg","nascimento","telefone","email","endereco","curso"]
        .forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = "";
        });
}

/* =========================
INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
    render(matriculas);
});