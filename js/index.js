// ======================================================
// DASHBOARD
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    atualizarDashboard();

});

function atualizarDashboard() {

    const cursos =
        JSON.parse(localStorage.getItem("cursos")) || [];

    const alunos =
        JSON.parse(localStorage.getItem("alunos")) || [];

    const matriculas =
        JSON.parse(localStorage.getItem("matriculas")) || [];

    const certificados =
        JSON.parse(localStorage.getItem("certificados")) || [];

    const totalCursos =
        document.getElementById("totalCursos");

    const totalAlunos =
        document.getElementById("totalAlunos");

    const totalMatriculas =
        document.getElementById("totalMatriculas");

    const totalCertificados =
        document.getElementById("totalCertificados");

    if (totalCursos)
        totalCursos.textContent = cursos.length;

    if (totalAlunos)
        totalAlunos.textContent = alunos.length;

    if (totalMatriculas)
        totalMatriculas.textContent = matriculas.length;

    if (totalCertificados)
        totalCertificados.textContent = certificados.length;
}