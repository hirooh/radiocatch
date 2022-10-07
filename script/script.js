//iniciar
function iniciar(){
    let jogo = document.querySelector(".jogo");
    let item = document.querySelector(".item");
    let vidas = document.querySelector(".vidas");
    let pontuacao = document.querySelector(".pontuacao");
    let chao = document.querySelector(".chao");
    let coletor = document.getElementById("coletor");
    let startButton = document.querySelector(".startButton");
    let telaFinal = document.querySelector(".telaFinal");
    let painel = document.querySelector(".painel");
    let buttonControleEsquerda = document.getElementById("esquerda");
    let buttonControleDireita = document.getElementById("direita");
    jogo.style.height = "100%";
    item.style.opacity = "0";
    vidas.style.opacity = "0";
    pontuacao.style.opacity = "0";
    chao.style.visibility = "hidden";
    coletor.style.opacity = "0";
    telaFinal.style.display = "none";
    buttonControleEsquerda.style.opacity = "0";
    buttonControleDireita.style.opacity = "0";
    painel.style.visibility = "hidden";
    
    document.querySelector(".startButton").onclick = function(){
        item.remove();
        vidas.style.opacity = "1";
        pontuacao.style.opacity = "1";
        chao.style.visibility = "visible";
        coletor.style.opacity = "1";
        buttonControleEsquerda.style.opacity = "1";
        buttonControleDireita.style.opacity = "1";
        painel.style.visibility = "visible";

        bgAudio.load();
        bgAudio.play();
        bgAudio.volume = 0.05;
        bgAudio.loop = true;
        gerarItens();
        startButton.remove();
    }
}

iniciar();

let bgAudio = new Audio("./audio/idioteque.mp3");
let danoAudio = new Audio("./audio/dano.mp3");
let fimAudio = new Audio("./audio/fim.mp3");
let coleta1Audio = new Audio("./audio/coleta1.mp3");
let coleta2Audio = new Audio("./audio/coleta2.mp3");
let coleta3Audio = new Audio("./audio/coleta3.mp3");
let coleta4Audio = new Audio("./audio/coleta4.mp3");

let coletorTop = parseInt(getComputedStyle(coletor).top);
let coletorBottom = parseInt(getComputedStyle(coletor).bottom);
let coletorLeft = parseInt(getComputedStyle(coletor).left);
let coletorWidth = parseInt(getComputedStyle(coletor).width);
let coletorHeight = parseInt(getComputedStyle(coletor).height);

let item = document.querySelector(".item");
let itemTop = parseInt(getComputedStyle(item).top);
let itemLeft = parseInt(getComputedStyle(item).left);
let itemWidth = parseInt(getComputedStyle(item).width);
let itemHeight = parseInt(getComputedStyle(item).height);

let jogoWidth = parseInt(getComputedStyle(jogo).width);
let jogoHeight = parseInt(getComputedStyle(jogo).height);

let vida = 5;
let pontuacao = 0;
let coletaMusica = 0;
let contador = 0;

document.addEventListener("keydown", control);
document.querySelector("#esquerda").addEventListener("click",() => { move('esquerda') });
document.querySelector("#direita").addEventListener("click",() => { move('direita') });

//movimentação do coletor
function move(direcao){
    if (contador !== 0){
        para();
    }
    if (direcao == "esquerda"){
        timer = setInterval("esquerda()", 15);
        contador++;
    }
    if (direcao == "direita"){
        timer = setInterval("direita()", 15);
        contador++;
    }
}

function direita(){
    let coletorLeft = parseInt(getComputedStyle(coletor).left);
    let jogoWidth = parseInt(getComputedStyle(jogo).width);
    let coletorWidth = parseInt(getComputedStyle(coletor).width);

    coletor.style.transform = 'scaleX(-1)';
    coletor.style.left = coletorLeft + 6;
    if (coletorLeft >= jogoWidth - coletorWidth){
        clearInterval(timer);
        timer = setInterval ("esquerda()", 15);
    }
}

function esquerda(){
    let coletorLeft = parseInt(getComputedStyle(coletor).left);
    
    coletor.style.transform = 'scaleX(1)';
    coletor.style.left = coletorLeft - 6;
    if (coletorLeft <= 0){
        clearInterval(timer);
        timer = setInterval ("direita()", 15);
    }
}

function control(e){
    if(e.key == "ArrowLeft"){
        move("esquerda");
    }
    if(e.key == "ArrowRight"){
        move("direita");
    }
}

function para(){
    clearInterval(timer);
}

//aleatorização de itens
function numItens(){
    let numItens = 8;
    arrayItens = new Array("./img/item1.png", "./img/item2.png", "./img/item3.png", "./img/item4.png", "./img/item5.png", "./img/item6.png", "./img/item7.png", "./img/item8.png");
    randomItens = (Math.floor(Math.random()*numItens));
    randomItem = (arrayItens[randomItens]);
    return "url("+randomItem+")";
    //document.querySelector(".item").style.backgroundImage = "url("+randomItem+")";
}

//geração de itens
function gerarItens(){
    let itemTop = -40;
    let jogoWidth = parseInt(getComputedStyle(jogo).width);
    let itemLeft = Math.floor(Math.random() * (jogoWidth - 50));
    let itens = document.querySelector(".itens");
    let item = document.createElement("div");
    item.setAttribute("class", "item");
    item.style.backgroundImage = numItens();
    itens.appendChild(item);

    let coletado = 0;

    //coleta (colisão)
    function coleta(){
        let coletor = document.getElementById("coletor");
        let item = document.querySelector(".item");
        if ((parseInt(getComputedStyle(item).top)) >= (parseInt(getComputedStyle(coletor).top) - parseInt(getComputedStyle(item).width)) && parseInt(getComputedStyle(item).left) >= parseInt(getComputedStyle(coletor).left) && parseInt(getComputedStyle(item).left) < (parseInt(getComputedStyle(coletor).left) + parseInt(getComputedStyle(coletor).height))){
            clearInterval(coletaInterval);
            coletado = 1;
            pontuacao++;
            pontos = document.querySelector(".pontos");
            pontos.innerHTML = "Pontos: " +pontuacao;
            console.log("pontuação: " +pontuacao);

            coletaMusica += 1;

            if(coletaMusica == 5){
                coletaMusica = 1;
            }

            switch(coletaMusica){
                case 1:
                    coleta1Audio.load();
                    coleta1Audio.play();
                    coleta1Audio.volume = 0.3;
                    break;
                case 2:
                    coleta2Audio.load();
                    coleta2Audio.play();
                    coleta2Audio.volume = 0.3;
                    break;
                case 3:
                    coleta3Audio.load();
                    coleta3Audio.play();
                    coleta3Audio.volume = 0.3;
                    break;
                case 4:
                    coleta4Audio.load();
                    coleta4Audio.play();
                    coleta4Audio.volume = 0.3;
                    break;
            }

            item.remove();
        }
    }

    //queda dos itens
    function cairItens(){
        if(itemTop > coletorTop + 100 && coletado == 0){
            clearInterval(cairItensInterval);
            let vidaImg = document.querySelector(".vidaImg");
            vidaImg.remove();
            vida--;
            console.log("vida: " +vida);
            danoAudio.load();
            danoAudio.play();
            danoAudio.volume = 0.1;
            item = document.querySelector(".item");
            item.remove();
            
            if (vida == 0){
                clearInterval(cairItensInterval);
                clearTimeout(gerarItensTimeout);
                fim();
            }
            
        }
        itemTop += 5;
        item.style.top = itemTop;
    }
        
    let cairItensInterval = setInterval(cairItens, 20);
    let gerarItensTimeout = setTimeout(gerarItens, 4000);
    let coletaInterval = setInterval(coleta, 5);
    item.style.top = itemTop;
    item.style.left = itemLeft;
}

//fim
function fim(){
    bgAudio.loop = false;
    bgAudio.pause();
    bgAudio.currentTime = 0;
    fimAudio.load();
    fimAudio.play();
    fimAudio.volume = 0.1;
    let escore = document.querySelector(".escore");
    let telaFinal = document.querySelector(".telaFinal");
    escore.style.opacity = "0";
    telaFinal.style.display = "flex";
    let pontosFinal = document.querySelector(".pontosFinal");
    pontosFinal.innerHTML = "Pontuação final: " +pontuacao;
}