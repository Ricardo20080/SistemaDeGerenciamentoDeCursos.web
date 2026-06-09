function gerarCertificado(
    aluno,
    curso,
    cargaHoraria
) {

    const conteudo = `
    CERTIFICADO

    Certificamos que

    ${aluno}

    concluiu com êxito o curso

    ${curso}

    com carga horária de
    ${cargaHoraria} horas.
    `;

    const novaJanela =
        window.open("", "_blank");

    novaJanela.document.write(`
        <h1>CERTIFICADO</h1>

        <p>${conteudo}</p>
    `);

    novaJanela.print();
}