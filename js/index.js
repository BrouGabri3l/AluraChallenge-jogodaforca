let palavras = ['Roupa', 'Cavalo', 'Carro', 'Celular', 'Arroz', 'Rodovia', 'Galinha', 'Boi']
const campoLetras = document.querySelector(".letras")
let palavraSelecionada
let err = []
let acertos = []
let resultado = document.querySelector('main h2')
let botaoDesistir = document.getElementById('desistir')
let palavrasCriadas = JSON.parse(localStorage.getItem("palavra"))
let campoAdicionar = document.querySelector("textarea")

function addPalavra() {
    console.log(campoAdicionar)
    if (campoAdicionar.value.length > 3 && campoAdicionar.value.length <= 8 && !/[á-ùÁ-Ù]/gm.test(campoAdicionar.value)) {
        palavrasCriadas.push(campoAdicionar.value)
        localStorage.setItem("palavra", JSON.stringify(palavrasCriadas))
        window.location.assign("jogo.html")
    } else {
        alert("Digite uma palavra válida")
    }

}
function selectPalavra(wordList) {

    console.log(wordList)
    const random = Math.floor(Math.random() * wordList.length)
    return wordList[random]
}
function criarCampos(palavra) {

    palavra.split('').forEach(letra => {
        campoLetras.innerHTML += `<span class="letter"></span>`
    })

}
function iniciarJogo() {

    palavraSelecionada = selectPalavra([...palavras, ...palavrasCriadas])
    console.log(palavraSelecionada)
    criarCampos(palavraSelecionada)
}
function verificaLetra(key) {
    if (palavraSelecionada.toLowerCase().includes(key.toLowerCase())) {
        salvaLetra(key.toLowerCase())
    } else {
        adicionaErro(key)

    }
}
function adicionaErro(key) {
    const letraErrada = document.querySelector('.letraerrada span')
    if (!err.includes(key)) {
        err.push(key)
        letraErrada.innerHTML += key
    }
    switch (err.length) {
        case 1:

            ctx.arc(175, 85, 30, 0, 2 * Math.PI)
            ctx.stroke()
            break;
        case 2:
            ctx.moveTo(175, 115)
            ctx.lineTo(175, 195)
            ctx.stroke()
            break;
        case 3:
            ctx.moveTo(175, 135)
            ctx.lineTo(125, 175)
            ctx.stroke()
            break;
        case 4:
            ctx.moveTo(175, 135)
            ctx.lineTo(225, 175)
            ctx.stroke()
            break;
        case 5:
            ctx.moveTo(175, 190)
            ctx.lineTo(125, 255)
            ctx.stroke()
            break;
        case 6:
            ctx.moveTo(175, 190)
            ctx.lineTo(225, 255)
            ctx.stroke()
            perdeu()
            break;
        default:
            break;
    }
}
function desistir() {
    const letras = document.querySelectorAll('.letter')
    palavraSelecionada.split('').forEach((letra, i) => {
        letras[i].innerHTML = letra
        acertos.push(letra)

    })
    perdeu()
}
function perdeu() {
    resultado.classList.add("lose")
    resultado.textContent = "Você Perdeu!"
}
function salvaLetra(key) {
    const letras = document.querySelectorAll('.letter')

    palavraSelecionada.toLowerCase().split('').forEach((letra, i) => {

        if (letra == key) {
            acertos.push(key)
            letras[i].innerHTML = letra

        }
        if (acertos.length == palavraSelecionada.length) {
            resultado.classList.add("win")
            resultado.textContent = "Você Ganhou!"
            botaoDesistir.style.display = 'none'
        }
    })
}

document.addEventListener('keydown', (e) => {
    if (err.length < 6) {
        if (e.keyCode >= 65 && e.keyCode < 91 && !acertos.includes(e.key) && acertos.length < palavraSelecionada.length) {
            verificaLetra(e.key)
        }
    }
})
botaoDesistir.addEventListener('click', () => {
    desistir()
})
