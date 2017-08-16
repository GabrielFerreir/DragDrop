//Variaveis
    var posInicialX;
    var posInicialY;

    var posFinalX;
    var posFinalY;

    var bloco;
    var caixa;

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
    X = event.clientX;
    Y = event.clientY;
    console.log("X:"+X+" " + "Y:"+Y)
    posInicialX = X;
    posInicialY = Y;
    bloco = this;
    PosicaoBlocoX = bloco.getBoundingClientRect();
    PosicaoBlocoX = PosicaoBlocoX.left;
    PosicaoBlocoY = bloco.getBoundingClientRect();
    PosicaoBlocoY = PosicaoBlocoY.top;
    caixa = event.target.parentNode;
    caixa.removeChild(this);
    console.log("Bloco: " + bloco)
    caixa.appendChild(bloco);


    container.style.cursor = 'move';
      bloco.style.width = larguraDaCaixa;
      bloco.style.top = Y ;
      bloco.style.left = X - larguraDaCaixa;
    bloco.style.position = 'absolute';
  }
  function getMouseMove(event){

    diferencaX = event.clientX - posInicialX;
    diferencaY = event.clientY - posInicialY;
    if(diferencaX && diferencaY && bloco){

      bloco.style.transform = 'translate(' + diferencaX + 'px, ' + diferencaY + 'px) rotate(7deg)';
      bloco.style.opacity = '0.5';
  }
}

  function getPosFinal(event) {
    if(bloco){
      bloco.style.transform = '';
      bloco.style.opacity = '1';
    }

    posFinalX = event.clientX;
    posFinalY = event.clientY;
    console.log("posInicial: " + posInicialX + " " +posInicialY);
    console.log("posFinal: " + posFinalX + " " + posFinalY);
    console.log("Diferença X: " + (diferencaX = posFinalX - posInicialX));
    console.log("Diferença Y: " + (diferencaY = posFinalY - posInicialY));



      if(diferencaX > larguraDaCaixa) {
          quantidadeDeIrmaos = Math.floor(diferencaX / larguraDaCaixa);
  	      caixaDestino = caixa.nextElementSibling;
        		for(i=1; i < quantidadeDeIrmaos; i++){
        			caixaDestino = caixaDestino.nextElementSibling;
        		}
        // console.log(caixaDestino);
        texto = bloco.innerHTML;
        caixa.removeChild(bloco);
        var newEl = document.createElement('div');
        newEl.className = "elemento";
        // newEl.setAttribute("id", bloco.id);
        var novo_texto = document.createTextNode(texto);
        newEl.appendChild(novo_texto);
        caixaDestino.appendChild(newEl);

        els = caixaDestino.querySelectorAll(".elemento");
        console.log(els[0])
        console.log(els.length);
            verificacao = false;
        for(i=0; i < els.length; i++) {
          PosicaoY = els[i].getBoundingClientRect();
          PosicaoY = PosicaoY.top;
          nextPosicaoY = 0;
          if(els[i + 1]) {
            nextPosicaoY = els[i + 1].getBoundingClientRect();
            nextPosicaoY = nextPosicaoY.top;
          }
          console.log("posFinalY"+ posFinalY + "PosicaoY" + PosicaoY)
          if(posFinalY < PosicaoY) {
              if(verificacao == false) {
              caixaDestino.insertBefore(newEl, els[i]);
              verificacao = true;
            }
          }
        }
        recriaListener();
      }
      else if(diferencaX < -larguraDaCaixa) {
        quantidadeDeIrmaos = Math.floor(diferencaX / -larguraDaCaixa);
  	    caixaDestino = caixa.previousElementSibling;
      		for(i=1; i < quantidadeDeIrmaos; i++){
      		    caixaDestino = caixaDestino.previousElementSibling
      	 }
         console.log(caixaDestino)
         texto = bloco.innerHTML;
         caixa.removeChild(bloco);
         var newEl = document.createElement('div');
         newEl.className = "elemento";
        //  newEl.setAttribute("id", bloco.id);
         var novo_texto = document.createTextNode(texto);
         newEl.appendChild(novo_texto);
         caixaDestino.appendChild(newEl);

         els = caixaDestino.querySelectorAll(".elemento");
         console.log(els[0])
         console.log(els.length);
             verificacao = false;
         for(i=0; i < els.length; i++) {
           PosicaoY = els[i].getBoundingClientRect();
           PosicaoY = PosicaoY.top;
           nextPosicaoY = 0;
           if(els[i + 1]) {
             nextPosicaoY = els[i + 1].getBoundingClientRect();
             nextPosicaoY = nextPosicaoY.top;
           }
           console.log("posFinalY"+ posFinalY + "PosicaoY" + PosicaoY)
           if(posFinalY < PosicaoY) {
               if(verificacao == false) {
               caixaDestino.insertBefore(newEl, els[i]);
               verificacao = true;
             }
           }
         }


         recriaListener();
      }
      else {
        caixaDestino = caixa;
        texto = bloco.innerHTML;
        caixa.removeChild(bloco);
        var newEl = document.createElement('div');
        newEl.className = "elemento";
        var novo_texto = document.createTextNode(texto);
        newEl.appendChild(novo_texto);
        caixaDestino.appendChild(newEl);

        els = caixaDestino.querySelectorAll(".elemento");
        console.log(els[0])
        console.log(els.length);

            verificacao = false;
        for(i=0; i < els.length; i++) {
          PosicaoY = els[i].getBoundingClientRect();
          PosicaoY = PosicaoY.top;

          console.log("posFinalY"+ posFinalY + "PosicaoY" + PosicaoY)

          if(posFinalY < PosicaoY) {
              if(verificacao == false) {
              caixaDestino.insertBefore(newEl, els[i]);
              verificacao = true;
            }
          }
        }


        recriaListener();
     }


  container.style.cursor = 'default';
}

function recriaListener(){
  var elemento = document.querySelectorAll(".elemento");
  for (i = 0; i < elemento.length; i++) {
    // console.log(elemento[i]);
    elemento[i].addEventListener("mousedown", getPosInicial);
  }
}




function reset(){
  posInicialX = 0;
  posInicialY = 0;

  posFinalX = 0;
  posFinalY = 0;
  bloco = null;
  caixa = null
}
