// ======================================================
// DASHBOARD CORRIGIDO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
    atualizarDashboard();
});

function atualizarDashboard() {

    const cursos =
        JSON.parse(localStorage.getItem("cursos")) || [];

    const matriculas =
        JSON.parse(localStorage.getItem("matriculas")) || [];

    const certificados =
        JSON.parse(localStorage.getItem("certificados")) || [];

    // alunos = derivados das matrículas
    const alunos = new Map();

    matriculas.forEach(m => {
        if (!m.id) return;

        alunos.set(m.id, {
            id: m.id,
            nome: m.nome,
            curso: m.curso
        });
    });

    const totalCursos = document.getElementById("totalCursos");
    const totalAlunos = document.getElementById("totalAlunos");
    const totalMatriculas = document.getElementById("totalMatriculas");
    const totalCertificados = document.getElementById("totalCertificados");

    if (totalCursos)
        totalCursos.textContent = cursos.length;

    if (totalAlunos)
        totalAlunos.textContent = alunos.size; 

    if (totalMatriculas)
        totalMatriculas.textContent = matriculas.length;

    if (totalCertificados)
        totalCertificados.textContent = certificados.length;
}