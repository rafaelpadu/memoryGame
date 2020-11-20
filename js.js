const cards = document.querySelectorAll('.card');
let cartaVirada = false; 
let firstCard, secondCard;
let lockBoard = false;
function flipCard () {
    if(lockBoard) return; 
    if(this === firstCard) return;
    this.classList.add('flip');
    if (!cartaVirada){ //questiona se já possui alguma carta virada
         cartaVirada = true;
         firstCard = this;
         return
    }
    secondCard = this; //segunda carta selecionada
    cartaVirada = false;
    checkForMath();
}
function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card){ //compara se as duas cartas são identicas
        disableCards(); //se forem desabilita essas cartas
        return
    }
    else{
        unflipCard(); //se nao forem identicas desvira as cartas
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard); //a primera e segunda carta não podem mais ouvir o click para executar a função flipcard()
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

(function shuffle() {
    cards.forEach((card) => {
        let randomNumber = Math.floor(Math.random() * 12); 
        card.style.order = randomNumber;
    })
})();

function unflipCard() {
    lockBoard= true; //enquanto o cronometro não acabar, não será executada a função flipCard()
    setTimeout(() => { //desvira as cartas no final da contagem, e desabilta o lockBoard
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500)
}

function resetBoard(){ //zera as contagems do jogo, cartavirada vira falso, lockboard fica falso, first e second card ficam nulos para continuar o jogo
    [cartaVirada, lockBoard, firstCard, secondCard] = [false, false , null, null];
}

 cards.forEach((card) => { // a cada click em alguma div card executar a função flipCard()
     card.addEventListener('click', flipCard);
 })
