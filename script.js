//Variaveis
    var posInicialX;
    var posInicialY;

    var posFinalX;
    var posFinalY;

    var bloco;
    var caixa;
    var sombra;
    var sombraX = null;
    var sombraY = null;
    var clicou = false;

    var caixaDaSombra;



//Escutando os mousedown
var elemento = document.querySelectorAll(".elemento");;
for (i = 0; i < elemento.length; i++) {
  elemento[i].addEventListener("mousedown", getPosInicial);
}

  var container  = document.getElementById("container");

  container.addEventListener("mouseup", getPosFinal);
  container.addEventListener("mousemove", getMouseMove);
  larguraDaCaixa = document.getElementsByClassName('caixa')[0].clientWidth;
  larguraDaCaixa = larguraDaCaixa - (larguraDaCaixa * 0.1);
  console.log(larguraDaCaixa);
  alturaDoElemento =  document.getElementsByClassName('elemento')[0].clientHeight;
  console.log(alturaDoElemento);


  function getPosInicial(event) {

      posInicialX = event.clientX;
      posInicialY = event.clientY;
      bloco = this;

      PosicaoBlocoX = bloco.getBoundingClientRect().left;
      PosicaoBlocoY = bloco.getBoundingClientRect().top;

      caixa = event.target.parentNode;

        container.style.cursor = 'move';

        sombra = document.createElement('div');
        sombra.className = "sombra";
    }

  function getMouseMove(event){

    // scroll(event.clientX);

    diferencaX = event.clientX - posInicialX;
    diferencaY = event.clientY - posInicialY;

    if(posInicialX){
      bloco.style.transform = 'translate(' + diferencaX + 'px, ' + diferencaY + 'px) rotate(7deg)';
      bloco.style.opacity = '0.5';
      bloco.style.position = 'absolute';
      bloco.style.width = larguraDaCaixa;
      bloco.style.top = posInicialY - bloco.clientHeight;
      bloco.style.left = posInicialX - larguraDaCaixa;



      // if(caixaDestino() == caixa) {
          if(pegaLocalNaOrdem()) {
            caixaDestino().insertBefore(sombra, pegaLocalNaOrdem());
          } else {
            caixaDestino().appendChild(sombra);
          }
      // } else {
      //   caixaDestino().appendChild(sombra);
      // }

      clicou = true;
  }
}

  function getPosFinal(event) {

            if(clicou) {
              caixaDestino().removeChild(sombra);
              caixa.removeChild(bloco);
              if(pegaLocalNaOrdem()){
                  caixaDestino().insertBefore(bloco, pegaLocalNaOrdem());
              } else {
                  caixaDestino().appendChild(bloco);
              }
              bloco.style = '';
            }
            reset();
            recriaListener();
}

function caixaDestino() {
      if(diferencaX && diferencaX > larguraDaCaixa) {
        quantidadeDeIrmaos = Math.floor(diferencaX / larguraDaCaixa);
        cxDestino = caixa.nextElementSibling;
          for(i=1; i < quantidadeDeIrmaos; i++){
            cxDestino = cxDestino.nextElementSibling;
          }
      }
      else if(diferencaX && diferencaX < -larguraDaCaixa) {
        quantidadeDeIrmaos = Math.floor(diferencaX / -larguraDaCaixa);
        cxDestino = caixa.previousElementSibling;
            for(i=1; i < quantidadeDeIrmaos; i++){
                cxDestino = cxDestino.previousElementSibling
           }
      }
      else {
        cxDestino = caixa;
      }
      return cxDestino;
}

function pegaLocalNaOrdem(){
  // posFinalY = bloco.getBoundingClientRect().top;
  // posFinalX = bloco.getBoundingClientRect().left;

  posFinalY = event.clientY - 40;

  // console.log("Y: " + posFinalY );

      els = caixaDestino().querySelectorAll(".elemento");
      verificacao = false;
      local = null;
      for(i=0; i < els.length; i++) {
          PosicaoY = els[i].getBoundingClientRect().top;
          if(posFinalY < PosicaoY && bloco !== els[i]) {
              if(verificacao == false) {
                  verificacao = true;
                  local = els[i];
            }
          }
      }
      console.log('---END---')

      return local;
}






function recriaListener(){
  var elemento = document.querySelectorAll(".elemento");
  for (i = 0; i < elemento.length; i++) {
    // console.log(elemento[i]);
    elemento[i].addEventListener("mousedown", getPosInicial);
  }
}

// function scroll(mouse){
//   tamanhoDaTela = window.innerWidth;
//   areaDeScroll = tamanhoDaTela * 0.1;
//
//
//   console.log(tamanhoDaTela, areaDeScroll);
//
//   if(mouse > tamanhoDaTela - areaDeScroll) {
//       window.scrollBy(20, 0);
//       console.log("Right");
//   }
//   if(areaDeScroll > mouse) {
//     window.scrollBy(-20, 0);
//     console.log("left");
//   }
// }

function reset(){
  posInicialX = 0;
  posInicialY = 0;

  PosicaoBlocoX = 0;
  PosicaoBlocoY = 0;

  posFinalX = 0;
  posFinalY = 0;
  bloco = null;
  caixa = null
  diferencaX = 0;
  diferencaY = 0;
  sombra = null;
  sombraX = null;
  sombraY = null;
  mexeu = false;
  clicou = false;
}
