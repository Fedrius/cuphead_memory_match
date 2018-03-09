document.addEventListener('DOMContentLoaded', initializeApp);

let memoryGame = null;

function initializeApp(){
    memoryGame = new MemoryGame();
    memoryGame.init();
}

class MemoryGame{
    constructor(){
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
        //set it to a variable because there were issues removing the event listener
        this.cardHandler = this.cardClicked.bind(this);
    }

    init(){
        this.createCards();
        this.applyCardClickHandler();
        this.buttonAndModalClickHandlers();
        this.displayStats();
    }

    buttonAndModalClickHandlers(){
        let winModal = document.getElementsByClassName('winnerModal')[0];
        let aboutModal = document.getElementsByClassName('aboutMeModal')[0];

        winModal.addEventListener('click', ()=>this.toggleModal(winModal));
        document.getElementById('reset').addEventListener('click', ()=>this.resetButton());
        document.getElementById('aboutBtn').addEventListener('click', ()=>this.toggleModal(aboutModal));
        document.getElementsByClassName('close')[0].addEventListener('click', ()=>this.toggleModal(aboutModal));

        // $(window).keydown(()=>{
        //     $('.winnerModal').fadeOut(500);
        //     $('.aboutMeModal').fadeOut(500);
        // });
    }

    toggleModal(modal){
        modal.classList.toggle('showModal')
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

    clearTimeOut(){
        clearTimeout(this.setTimeOutTimer);
    }

    displayStats(){
        let stats = document.getElementsByClassName('value');
        stats[0].innerText = this.gamesPlayed;
        stats[1].innerText = this.attempts;

        if(this.attempts > 0){
            this.accuracy = ((this.matches / this.attempts) * 100).toFixed(2) + '%';
        }
        stats[2].innerText = this.accuracy;
    }

    resetStats(){
        this.storedCard = null;
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.gamesPlayed++;
        this.matchCounter = 0;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0 + '.00%';
        this.displayStats();
    }

    resetButton(){
        let container = document.getElementsByClassName('container');
        let gameArea = document.getElementById('game-area');
        container[0].removeChild(gameArea);
        document.getElementById('reset').innerText = 'Reset Game';

        this.clearTimeOut();
        this.resetStats();
        this.createCards();
    }

    createCards(){
        //reference variable
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

    cardClicked(event){
        let matchCard = event.currentTarget;
        let frontCard = event.currentTarget.firstChild;

        matchCard.classList.toggle('transformBack');
        matchCard.classList.toggle('hover');

        if (this.firstCardClicked === null){
            this.firstCardClicked = frontCard.getAttribute('src');
            this.toggleClickOnOff(event.currentTarget);
            this.storedCard = matchCard;
            return;
        }

        if (this.firstCardClicked !== null){
            this.attempts++;
            this.displayStats();
            this.secondCardClicked = frontCard.getAttribute('src');

            if (this.secondCardClicked === this.firstCardClicked) {
                this.matchCounter++;
                this.matches++;
                this.displayStats();
                this.toggleClickOnOff(event.currentTarget);
                this.storedCard = null;
                this.firstCardClicked = null;
                this.secondCardClicked = null;
                if (this.matchCounter === this.totalPossibleMatches) {
                    let modal = document.getElementsByClassName('winnerModal')[0];
                    this.toggleModal(modal);
                    document.getElementById('reset').innerText = 'Play Again!';
                }
            } else {
                this.removeCardClickHandler();
                this.setTimer(event.currentTarget);
                this.firstCardClicked = null;
                this.secondCardClicked = null;
            }
        }
    }

    setTimer(card){
        let gameObject = this;
        this.setTimeOutTimer = setTimeout(function(){
            gameObject.storedCard.classList.toggle('transformBack');
            gameObject.storedCard.classList.toggle('hover');
            card.classList.toggle('transformBack');
            card.classList.toggle('hover');

            gameObject.applyCardClickHandler();
            gameObject.toggleClickOnOff(gameObject.storedCard);
            gameObject.storedCard = null;
        }, 1000);
    }
}