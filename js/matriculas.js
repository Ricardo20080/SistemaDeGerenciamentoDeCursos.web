let matriculas =
JSON.parse(
    localStorage.getItem("matriculas")
) || [];

function salvarMatriculas() {

    localStorage.setItem(
        "matriculas",
        JSON.stringify(matriculas)
    );

}

function matricularAluno() {

    const aluno =
        document.getElementById("alunoMatricula").value;

    const curso =
        document.getElementById("cursoMatricula").value;

    matriculas.push({

        id: Date.now(),

        aluno,
        curso,

        status: "Ativo"

    });

    salvarMatriculas();

    listarMatriculas();
}

function listarMatriculas() {

    const tabela =
        document.getElementById("listaMatriculas");

    if (!tabela) return;

    tabela.innerHTML = "";

    matriculas.forEach(item => {

        tabela.innerHTML += `
        <tr>
            <td>${item.aluno}</td>
            <td>${item.curso}</td>
            <td>${item.status}</td>
        </tr>
        `;

    });
}

document.addEventListener(
    "DOMContentLoaded",
    listarMatriculas
);