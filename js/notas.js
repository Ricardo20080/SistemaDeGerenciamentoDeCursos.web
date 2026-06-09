let notas =
JSON.parse(
    localStorage.getItem("notas")
) || [];

function salvarNotas() {

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );

}

function cadastrarNota() {

    const aluno =
        document.getElementById("alunoNota").value;

    const nota1 =
        Number(
            document.getElementById("nota1").value
        );

    const nota2 =
        Number(
            document.getElementById("nota2").value
        );

    const media =
        (nota1 + nota2) / 2;

    const situacao =
        media >= 7
        ? "Aprovado"
        : "Reprovado";

    notas.push({

        aluno,
        nota1,
        nota2,
        media,
        situacao

    });

    salvarNotas();

    listarNotas();
}

function listarNotas() {

    const tabela =
        document.getElementById("listaNotas");

    if (!tabela) return;

    tabela.innerHTML = "";

    notas.forEach(item => {

        tabela.innerHTML += `
        <tr>
            <td>${item.aluno}</td>
            <td>${item.nota1}</td>
            <td>${item.nota2}</td>
            <td>${item.media.toFixed(1)}</td>
            <td>${item.situacao}</td>
        </tr>
        `;

    });
}

document.addEventListener(
    "DOMContentLoaded",
    listarNotas
);