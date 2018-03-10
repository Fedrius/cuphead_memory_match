document.addEventListener('DOMContentLoaded', initializeGame);

let memoryGame = null;

function initializeGame(){
    memoryGame = new MemoryGame();
    memoryGame.init();
}

class MemoryGame {
    constructor(){
        this.model = null;
        this.view = null;
    }

    init(){
        this.model = new Model(this);
        this.view = new View(this);
        this.view.init();
    }

    reset(){
        this.model.reset();
        this.view.reset();
    }

    cardClicked(event){
        let matchCard = event.currentTarget;
        let frontCard = event.currentTarget.firstChild;

        matchCard.classList.toggle('transformBack');
        matchCard.classList.toggle('hover');

        if (this.model.firstCardClicked === null){
            this.model.firstCardClicked = frontCard.getAttribute('src');
            this.view.toggleClickOnOff(event.currentTarget);
            this.model.storedCard = matchCard;
            return;
        }

        if (this.model.firstCardClicked !== null){
            this.model.attempts++;
            this.view.displayStats();
            this.model.secondCardClicked = frontCard.getAttribute('src');

            if (this.model.secondCardClicked === this.model.firstCardClicked) {
                this.model.matchCounter++;
                this.model.matches++;
                this.view.displayStats();
                this.view.toggleClickOnOff(event.currentTarget);
                this.model.storedCard = null;
                this.model.firstCardClicked = null;
                this.model.secondCardClicked = null;
                if (this.model.matchCounter === this.model.totalPossibleMatches) {
                    let modal = document.getElementsByClassName('winnerModal')[0];
                    this.view.toggleModal(modal);
                    document.getElementById('reset').innerText = 'Play Again!';
                }
            } else {
                this.view.removeCardClickHandler();
                this.model.setTimer(event.currentTarget);
                this.model.firstCardClicked = null;
                this.model.secondCardClicked = null;
            }
        }
    }
}

class Model {
    constructor(controller){
        this.controller = controller;
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.storedCard = null;
        this.setTimeOutTimer = null;
        this.matchCounter = 0;
        this.totalPossibleMatches = 9;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0 + '.00%';
        this.gamesPlayed = 0;
    }

    reset(){
        this.storedCard = null;
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.gamesPlayed++;
        this.matchCounter = 0;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0 + '.00%';
        this.clearTimeOut()
    }

    setTimer(card){
        let gameObject = this;
        this.setTimeOutTimer = setTimeout(function(){
            gameObject.storedCard.classList.toggle('transformBack');
            gameObject.storedCard.classList.toggle('hover');
            card.classList.toggle('transformBack');
            card.classList.toggle('hover');

            gameObject.controller.view.applyCardClickHandler();
            gameObject.controller.view.toggleClickOnOff(gameObject.storedCard);
            gameObject.storedCard = null;
        }, 1000);
    }

    clearTimeOut(){
        clearTimeout(this.setTimeOutTimer);
    }
}

class View {
    constructor(controller){
        this.controller = controller;
        this.randomCardArray = ['Blind_Specter.png',
            'Cagney_carnation_2.png',
            'Cala_maria.png',
            'Croak.png',
            'Devil.png',
            'Honeybottoms.jpg',
            'KingTheDice.jpg',
            'Match.png',
            'Psycarrot_brain_minding.png',
            'Blind_Specter.png',
            'Cagney_carnation_2.png',
            'Cala_maria.png',
            'Croak.png',
            'Devil.png',
            'Honeybottoms.jpg',
            'KingTheDice.jpg',
            'Match.png',
            'Psycarrot_brain_minding.png'];
        this.cardHandler = this.controller.cardClicked.bind(controller);
    }

    init(){
        this.createCards();
        this.buttonAndModalClickHandlers();
        this.displayStats();
    }

    reset(){
        let container = document.getElementsByClassName('container');
        let gameArea = document.getElementById('game-area');
        container[0].removeChild(gameArea);
        document.getElementById('reset').innerText = 'Reset Game';

        this.displayStats();
        this.createCards();
    }

    buttonAndModalClickHandlers(){
        let winModal = document.getElementsByClassName('winnerModal')[0];
        let aboutModal = document.getElementsByClassName('aboutMeModal')[0];

        winModal.addEventListener('click', ()=>this.toggleModal(winModal));
        document.getElementById('reset').addEventListener('click', ()=>this.controller.reset());
        document.getElementById('aboutBtn').addEventListener('click', ()=>this.toggleModal(aboutModal));
        document.getElementsByClassName('close')[0].addEventListener('click', ()=>this.toggleModal(aboutModal));
    }

    applyCardClickHandler(){
        let cards = document.getElementsByClassName('card');
        for(let cardIndex = 0; cardIndex < cards.length; cardIndex++){
            cards[cardIndex].addEventListener('click', this.cardHandler);
        }
    }

    removeCardClickHandler(){
        let cards = document.getElementsByClassName('card');
        for(let cardIndex = 0; cardIndex < cards.length; cardIndex++){
            cards[cardIndex].removeEventListener('click', this.cardHandler);
        }
    }

    toggleClickOnOff(card){
        card.classList.toggle('disableClick');
    }

    toggleModal(modal){
        modal.classList.toggle('showModal')
    }

    createCards(){
        let randomCards = this.randomCardArray;
        let gameArea = document.createElement('div');
        gameArea.id = 'game-area';

        //card array randomize loop
        for (let cardIndex = randomCards.length - 1; cardIndex > 0; cardIndex--) {
            let randomIndex = Math.floor(Math.random() * (cardIndex + 1));
            let temp = randomCards[cardIndex];
            randomCards[cardIndex] = randomCards[randomIndex];
            randomCards[randomIndex] = temp;
        }

        for(let cardIndex = 0; cardIndex < randomCards.length; cardIndex++){
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'hover');
            cardDiv.addEventListener('click', this.cardHandler);

            let cardFront = document.createElement('img');
            cardFront.classList.add('front');
            cardFront.setAttribute('src', `images/${randomCards[cardIndex]}`);

            let cardBack = document.createElement('img');
            cardBack.classList.add('back');
            cardBack.setAttribute('src', 'images/Cupheadcardback.png');

            cardDiv.appendChild(cardFront);
            cardDiv.appendChild(cardBack);
            gameArea.appendChild(cardDiv);
        }
        document.getElementsByClassName('container')[0].appendChild(gameArea);
    }

    displayStats(){
        let stats = document.getElementsByClassName('value');
        stats[0].innerText = this.controller.model.gamesPlayed;
        stats[1].innerText = this.controller.model.attempts;

        if(this.controller.model.attempts > 0){
            this.controller.model.accuracy = ((this.controller.model.matches / this.controller.model.attempts) * 100).toFixed(2) + '%';
        }
        stats[2].innerText = this.controller.model.accuracy;
    }
}