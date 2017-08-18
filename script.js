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

    var localScroll;

    var caixaDaSombra;


//Pegar container
var container  = document.getElementById("container");

////Escutando click nos addCaixa e Adicionando Caixas
var addCaixa = document.querySelector(".addCaixa");
  addCaixa.addEventListener("click", function(){
    novaCaixa = document.createElement('div');
    novaCaixa.className = "caixa";
    var tituloDaCaixa = prompt('Digite o titulo');
    if(titulo){
      novaCaixa.innerHTML =  '<header><div>'+tituloDaCaixa+'<i class="material-icons">&#xE254;</i></div></header><div class="addElemento">Adicionar elemento</div>'
  ;


      this.parentNode.insertBefore(novaCaixa, this.parentNode.querySelector(".addCaixa"));
      escutaEAdicionaElementos();
    }


  });


//Escutando click nos addElemento e Adicionando Elementos
escutaEAdicionaElementos();
function escutaEAdicionaElementos(){
  var addElemento = document.querySelectorAll(".addElemento");
  console.log(addElemento);
  for (i = 0; i < addElemento.length; i++) {
    addElemento[i].addEventListener("click", function(){
      // console.log(this.parentNode);
      novoElemento = document.createElement('div');
      novoElemento.className = "elemento";
      var conteudo = prompt('Digite o conteudo');
      if(conteudo){
        novoElemento.innerHTML = conteudo;
        this.parentNode.insertBefore(novoElemento, this.parentNode.querySelector(".addElemento"));
        conteudo = null;
      }

    });
  }
}



//Escutando os mousedown nos elementos
var elemento = document.querySelectorAll(".elemento");;
for (i = 0; i < elemento.length; i++) {
  elemento[i].addEventListener("mousedown", getPosInicial);
}
//MouseMove e Up
  container.addEventListener("mousemove", getMouseMove);
  container.addEventListener("mouseup", getPosFinal);

//larguraDaCaixa
  larguraDaCaixa = document.getElementsByClassName('caixa')[0].clientWidth;
  larguraDaCaixa = larguraDaCaixa - (larguraDaCaixa * 0.1);
  console.log(larguraDaCaixa);
// //AlturaDoElemento
// alturaDoElemento =  document.getElementsByClassName('elemento')[0].clientHeight;
// console.log(alturaDoElemento);


  function getPosInicial(event) {
      posInicialX = event.clientX + getScroll();
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

    if(posInicialX){
      // console.log(event.clientX);
      fazScroll(event.clientX);
      // console.log(-localScroll.left);
      diferencaX = (event.clientX )  - posInicialX;
      if(getScroll()) {
        diferencaX = (event.clientX + (getScroll())) - posInicialX;
        console.log('------------')
        console.log(diferencaX);
      }
      diferencaY = event.clientY - posInicialY;


      bloco.style.transform = 'translate(' + diferencaX + 'px, ' + diferencaY + 'px) rotate(7deg)';
      bloco.style.opacity = '0.5';
      bloco.style.position = 'absolute';
      bloco.style.width = larguraDaCaixa;
      bloco.style.top = posInicialY - bloco.clientHeight;
      bloco.style.left = posInicialX - larguraDaCaixa;

          if(pegaLocalNaOrdem()) {
            caixaDestino().insertBefore(sombra, pegaLocalNaOrdem());
          } else {
            caixaDestino().insertBefore(sombra, caixaDestino().querySelector(".addElemento"));
          }

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
                  caixaDestino().insertBefore(bloco, caixaDestino().querySelector(".addElemento"));
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
      // console.log(els);
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
      if( els && els.length == 0) {
        // console.log('Entrou Aqui []')
        local = null;
      }
      // if(local == null) {
      //   local = els[els.lenght];
      //   console.log(local)
      //   console.log('Entrou Aqui')
      // }
      // console.log('---END---')
      return local;
}

function recriaListener(){
  var elemento = document.querySelectorAll(".elemento");
  for (i = 0; i < elemento.length; i++) {
    // console.log(elemento[i]);
    elemento[i].addEventListener("mousedown", getPosInicial);
  }
}

function fazScroll(mouse){
  tamanhoDaTela = window.innerWidth;
  areaDeScroll = tamanhoDaTela * 0.1;

  if(mouse > tamanhoDaTela - areaDeScroll) {
      window.scrollBy(20, 0);
      console.log('Right')
  }
  if(areaDeScroll > mouse) {
    window.scrollBy(-20, 0);
    console.log('Left')
  }
}
function getScroll(){
    var scroll = container.getBoundingClientRect().left;
    return -scroll;
}

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
