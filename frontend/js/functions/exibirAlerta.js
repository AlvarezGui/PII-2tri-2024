export function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout){
    let alert = document.querySelector(seletor);
    alert.innerHTML = innerHTML;
    alert.classList.add(...classesToAdd);
    alert.classList.remove(...classesToRemove);
    setTimeout(() => {
        alert.classList.remove(...classesToAdd);
        alert.classList.add(...classesToRemove);
    }, timeout);
}