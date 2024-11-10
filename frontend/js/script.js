// TODO: conferir se usuario existe no banco de dados
// TODO: cadastrar usuarioscadastrar

async function entrarUsuario(){
    let usuarioEntrarInput = document.querySelector("#usuarioEntrarInput");
    let passwordEntrarInput = document.querySelector("#passwordEntrarInput");
    let usuarioEntrar = usuarioEntrarInput.value;
    let passwordEntrar = passwordEntrarInput.value;

    if(usuarioEntrar && passwordEntrar){
        try{
            const entrarEnpoint = '/login';
            const URLcompleta = `http://localhost:3000${entrarEnpoint}`;
            await axios.post(URLcompleta, {login: usuarioEntrar, password: passwordEntrar});
            usuarioEntrarInput.value = "";
            passwordEntrarInput.value = "";
            
            exibirAlerta(".alert-modal-entrar", "Login Realizado!", ["show", "alert-success"], ["d-none"], 2000);
            OcultarModal("#modalEntrar", 2000);
        }
        catch(err){
            // console.log(err);
            exibirAlerta(".alert-modal-entrar", "Não foi possível entrar", ["show", "alert-danger"], ["d-none"], 2000);
        }
    }
    else{
        exibirAlerta('.alert-modal-entrar', "Preencha todos os campos", ["show", "alert-danger"], ["d-none"], 2000);
    }
}

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

function OcultarModal(seletor, timeout){
    setTimeout(() => {
        let modalEntrar = bootstrap.Modal.getInstance(document.querySelector(seletor));
        modalEntrar.hide();
    }, timeout);
}