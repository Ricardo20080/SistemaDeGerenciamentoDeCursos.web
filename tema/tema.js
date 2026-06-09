/* =======================================================
   SISTEMA DE GESTÃO DE CURSOS
   CONTROLE DE TEMA
======================================================= */

/* =======================================================
   ELEMENTOS
======================================================= */

const botaoTema = document.getElementById("alternarTema");

/* =======================================================
   CARREGAR TEMA SALVO
======================================================= */

function carregarTema() {

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {

        document.body.classList.add("escuro");

        if (botaoTema) {
            botaoTema.textContent = "☀️ Tema Claro";
        }

    } else {

        document.body.classList.remove("escuro");

        if (botaoTema) {
            botaoTema.textContent = "🌙 Tema Escuro";
        }

    }

}

/* =======================================================
   ALTERAR TEMA
======================================================= */

function alternarTema() {

    document.body.classList.toggle("escuro");

    const modoEscuro =
        document.body.classList.contains("escuro");

    localStorage.setItem(
        "tema",
        modoEscuro ? "escuro" : "claro"
    );

    if (botaoTema) {

        botaoTema.textContent =
            modoEscuro
                ? "☀️ Tema Claro"
                : "🌙 Tema Escuro";

    }

}

/* =======================================================
   EVENTOS
======================================================= */

if (botaoTema) {

    botaoTema.addEventListener(
        "click",
        alternarTema
    );

}

/* =======================================================
   INICIALIZAÇÃO
======================================================= */

carregarTema();