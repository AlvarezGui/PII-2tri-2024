

async function postar() {
    const URL = "http://localhost:3000/postar";

    // inputs
    let tituloInput = document.querySelector("#tituloInput");
    let textoInput = document.querySelector("#textoInput");
    let titulo = tituloInput.value;
    let texto = textoInput.value;

    if(titulo && texto){
        tituloInput.value = "";
        textoInput.value = "";

        await axios.post(URL, {titulo, texto}).data;
    }
    else exibirAlerta(".alert-cadastrar-post", "Preencha todos os campos",  ["show", "alert-danger"], ["d-none"], 2000);
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout){
    let alert = document.querySelector(seletor);
    alert.innerHTML = innerHTML;
    alert.classList.add(...classesToAdd);
    alert.classList.remove(...classesToRemove);
    setTimeout(() => {
        alert.classList.remove(...classesToAdd);
        alert.classList.add(...classesToRemove);
    }, timeout);
}