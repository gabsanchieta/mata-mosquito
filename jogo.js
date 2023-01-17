//cria as variáveis globais para armazenar a altura e largura do jogo
var altura,
  largura = 0;
  var vidas = 4;
  var pontos = 0;
//função para capturar o tamanho da janela sempre que o evento onResize do Body for disparado
function ajustaTamanhoPalcoJogo() {
  //captura o tamanho da janela e armazena nas variáveis altura e largura
  altura = window.innerHeight;
  largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo();

function posicaoRandomica() {
  //remove o mosquito anterior, caso exista
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();
    vidas -= 1;
    if(vidas < 1){
        window.location.href = "fim_de_jogo.html?" + pontos;
    } else{
        document.getElementById("v" + vidas).src="imagens/coracao_vazio.png";
    }
    console.log("vidas:" + vidas);
  }

  //sorteia um numero aleatório para definir os valores de x e y do mosquito
  //subtrai 90 para que parte do mosquito não fique para fora da janela do jogo
  var posicaoX = Math.floor(Math.random() * largura - 90);
  var posicaoY = Math.floor(Math.random() * altura - 90);

  //se os valores sorteados forem zero, com a subtração de 90 eles desaparecem no canto superior e esquedo
  //para evitar isso, se o valor sorteado for menor que 0 define o valor 0 para a posição de x e/ou y
  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoY < 0 ? 0 : posicaoY;

  //criar o mosquito
  var mosquito = document.createElement("img");
  mosquito.src = "imagens/mosquito.png";
  //define os estilos
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
  mosquito.style.left = posicaoX + "px";
  mosquito.style.top = posicaoY + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";

  //inclui o mosquino no documento
  document.body.appendChild(mosquito);
  mosquito.addEventListener('click', marcaPontos, false);
}
function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3);
  switch (classe) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}
function ladoAleatorio() {
  var classe = Math.floor(Math.random() * 2);
  switch (classe) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}
function marcaPontos(){
    document.getElementById("mosquito").remove();
    pontos += 1;
    console.log("Pontos:" + pontos);
    document.getElementById("placar").innerHTML = pontos;
}