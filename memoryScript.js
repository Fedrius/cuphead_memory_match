$(document).ready(initializeApp);

let memoryGame = null;

function initializeApp(){
    memoryGame = new MemoryGame();
    memoryGame.init();
}

class MemoryGame{
    constructor(){
        this.firstCardClicked = 0;
        this.secondCardClicked = 0;
        this.matchCounter = 0;
        this.totalPossibleMatches = 9;
        this.storedCard = null;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0 + '.00%';
        this.gamesPlayed = 9000;
        this.setTimeOutTimer = null;
        this.cupheadOrMugmanCard = ["Cupheadcardback.png", "mugmanCard.jpg"];
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
    }

    init(){
        this.createCards();
        this.applyCardClickHandler();
        this.buttonAndModalClickHandlers();
        this.displayStats();
    }

    buttonAndModalClickHandlers(){
        $('.reset').on('click', ()=>this.resetButton());
        $('.winnerModal').on('click', ()=>this.hideWinner());
        $(window).keydown(function(){
            $('.winnerModal').fadeOut(500);
        });
        $('.aboutMe>span').on('click', ()=>this.showAboutMe());
        $('.close').on('click', ()=>this.hideAboutMe());
    }

    showAboutMe(){
        $('.aboutMeModal').fadeIn(200);
    }

    hideAboutMe(){
        $('.aboutMeModal').fadeOut(200);
    }

    showWinner(){
        $('.winnerModal').fadeIn(1000);
    }

    hideWinner(){
        $('.winnerModal').fadeOut(500);
    }

    applyCardClickHandler(){
        $('.card').on('click', ()=>this.cardClicked(event));
    }

    toggleClickOnOff(card){
        $(card).toggleClass('disableClick');
    }

    clearTimeOut(){
        clearTimeout(this.setTimeOutTimer);
    }

    displayStats(){
        $('.games-played .value').text(this.gamesPlayed);
        $('.attempts .value').text(this.attempts);

        if(this.attempts > 0){
            this.accuracy = ((this.matches / this.attempts) * 100).toFixed(2) + '%';
        }
        $('.accuracy .value').text(this.accuracy);
    }

    resetStats(){
        this.storedCard = null;
        this.firstCardClicked = 0;
        this.secondCardClicked = 0;
        this.matchCounter = 0;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0 + '.00%';
        this.displayStats();
    }

    resetButton(){
        this.clearTimeOut();
        this.gamesPlayed++;
        this.resetStats();
        $('.reset').text('Reset Game');
        $('.card').remove();
        this.createCards();
        this.applyCardClickHandler();
    }

    createCards(){
        let storedCardArray = this.randomCardArray.slice();
        let cupmanOrMugmanIndex = Math.floor(Math.random() * 2);

        while(this.randomCardArray.length > 0){

            let randomizedCardIndex = Math.floor(Math.random() * (this.randomCardArray.length));
            let newDiv = $('<div>',{
                class: 'card hover'
            });
            let newFront = $('<img>').addClass('front').attr('src',this.randomCardArray[randomizedCardIndex]);
            let newBack = $('<img>').addClass('back').attr('src', this.cupheadOrMugmanCard[cupmanOrMugmanIndex]);
            this.randomCardArray.splice(randomizedCardIndex, 1);

            newDiv.append(newFront);
            newDiv.append(newBack);
            $('#game-area').append(newDiv);
        }

        this.randomCardArray = storedCardArray.slice();
    }

    cardClicked(event){
        let matchCard = event.currentTarget;
        $(event.currentTarget).toggleClass('transformBack hover');
        let frontCard = event.currentTarget.firstChild;

        if (this.firstCardClicked === 0){
            this.firstCardClicked = $(frontCard).attr('src');
            this.toggleClickOnOff(event.currentTarget);
            this.storedCard = matchCard;
            return;
        }

        if (this.firstCardClicked !== 0){
            this.attempts++;
            this.displayStats();
            this.secondCardClicked = $(frontCard).attr('src');
            if (this.secondCardClicked === this.firstCardClicked) {
                this.matchCounter++;
                this.matches++;
                this.displayStats();
                this.toggleClickOnOff(event.currentTarget);
                this.storedCard = null;
                this.firstCardClicked = 0;
                this.secondCardClicked = 0;
                if (this.matchCounter === this.totalPossibleMatches) {
                    this.showWinner();
                    $('.reset').text('Play Again!');
                }
            } else {
                $('.card').off();
                this.setTimer(event.currentTarget);
                this.firstCardClicked = 0;
                this.secondCardClicked = 0;
            }
        }
    }

    setTimer(temp){
        let theObject = this;
        this.setTimeOutTimer = setTimeout(function(){
            $(theObject.storedCard).toggleClass('transformBack hover');
            $(temp).toggleClass('transformBack hover');

            theObject.applyCardClickHandler();
            theObject.toggleClickOnOff(theObject.storedCard);
            theObject.storedCard = null;
        }, 1000);
    }
}