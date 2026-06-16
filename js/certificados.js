let certificados = [];

/* =========================
CARREGAR
========================= */

function carregarCertificados() {

    const matriculas = Storage.get("matriculas");
    const cursos = Storage.get("cursos");
    const notas = Storage.get("notas");

    certificados = matriculas.map(m => {

        const curso =
            cursos.find(c =>
                c.nome === m.curso
            );

        const notaAluno =
            notas.find(n =>
                n.id === m.id
            );

        return {
            id: m.id,
            nome: m.nome,
            curso: m.curso,

            cargaHoraria:
                curso?.cargaHoraria || 0,

            textoCertificado:
                curso?.textoCertificado ||
                "Concluiu o curso com aproveitamento.",

            status:
                notaAluno
                    ? calcularStatusCertificado(notaAluno)
                    : "PENDENTE"
        };

    });

    Storage.set(
        "certificados",
        certificados
    );

    renderizarCertificados();
}
/* =========================
calcular status
========================= */
function calcularStatusCertificado(aluno) {

    const cursos = Storage.get("cursos");

    const curso = cursos.find(
        c => c.nome === aluno.curso
    );

    if (!curso)
        return "PENDENTE";

    const notasAluno =
        Object.values(aluno.notas || {});

    if (notasAluno.length === 0)
        return "PENDENTE";

    const media =
        notasAluno.reduce((a, b) => a + b, 0)
        / notasAluno.length;

    const notaMinima =
        Number(curso.notaMinima || 7);

    return media >= notaMinima
        ? "APROVADO"
        : "REPROVADO";
}
/* =========================
RENDER
========================= */

function renderizarCertificados(lista = certificados) {

    const tbody =
        document.getElementById("listaCertificados");

    if (!tbody) return;

    tbody.innerHTML = "";

    lista.forEach(c => {

        tbody.innerHTML += `

            <tr>

                <td>${c.nome}</td>

                <td>${c.curso}</td>

                <td>${c.cargaHoraria}h</td>

                <td>
                    <span class="status-${c.status.toLowerCase()}">
                        ${c.status}
                    </span>
                </td>

                <td>

                    <button
                        class="botao-certificado"
                        onclick="gerarCertificado('${c.id}')"
                        ${c.status !== "APROVADO"
                            ? "disabled"
                            : ""}>

                        📄 Gerar PDF

                    </button>

                </td>

            </tr>

        `;
    });
}



function buscarCertificado() {

    const termo =
        document.getElementById("buscaCertificado")
        ?.value
        ?.toLowerCase()
        || "";

    if (!termo) {

        renderizarCertificados();

        return;
    }

    const filtrados =
        certificados.filter(c =>

            (c.nome || "")
                .toLowerCase()
                .includes(termo)

            ||

            (c.curso || "")
                .toLowerCase()
                .includes(termo)

            ||

            String(c.id)
                .toLowerCase()
                .includes(termo)

        );

    renderizarCertificados(filtrados);
}

/* =========================
PDF
========================= */

function gerarCertificado(id) {

    const aluno =
        certificados.find(c => c.id === id);

    if (!aluno) return;

    const { jsPDF } = window.jspdf;

    const pdf =
        new jsPDF("landscape");

    const largura =
        pdf.internal.pageSize.getWidth();

    const altura =
        pdf.internal.pageSize.getHeight();

    pdf.setDrawColor(0);
    pdf.setLineWidth(2);

    pdf.rect(
        10,
        10,
        largura - 20,
        altura - 20
    );

    pdf.setFont("times");

    pdf.setFontSize(30);

    pdf.text(
        "CERTIFICADO",
        largura / 2,
        40,
        { align: "center" }
    );

    pdf.setFontSize(16);

    pdf.text(
        "Certificamos que",
        largura / 2,
        65,
        { align: "center" }
    );

    pdf.setFontSize(24);

    pdf.text(
        aluno.nome.toUpperCase(),
        largura / 2,
        90,
        { align: "center" }
    );

    pdf.setFontSize(16);

    pdf.text(
        `concluiu com êxito o curso ${aluno.curso}`,
        largura / 2,
        115,
        { align: "center" }
    );

    pdf.text(
        `Carga Horária: ${aluno.cargaHoraria} horas`,
        largura / 2,
        130,
        { align: "center" }
    );

    pdf.text(
        aluno.textoCertificado,
        largura / 2,
        150,
        { align: "center" }
    );

    pdf.text(
        "________________________",
        largura / 2,
        185,
        { align: "center" }
    );

    pdf.text(
        "Assinatura da Instituição",
        largura / 2,
        195,
        { align: "center" }
    );

    pdf.save(
        `certificado-${aluno.nome}.pdf`
    );
}

/* =========================
INIT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    carregarCertificados
);



