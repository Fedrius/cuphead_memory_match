$(document).ready(initializeApp);

var firstCardClicked = 0,
    secondCardClicked = 0,
    matchCounter = 0,
    totalPossibleMatches = 9,
    storedCard = null,
    matches = 0,
    attempts = 0,
    accuracy = 0 + '%',
    gamesPlayed = 9000;

var randomCardArray = ['Blind_Specter.png',
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

var storedCardArray = randomCardArray.slice();

function initializeApp() {
    createCards();
    applyCardClickHandler();
    displayStats();
    $('.reset').click(resetButton);
}

function applyCardClickHandler() {
    $('.card').click(cardClicked);
}

function displayStats() {
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);

    if(matches > 0 || attempts > 0){
        accuracy = ((matches / attempts) * 100).toFixed(2) + '%';
    }
    $('.accuracy .value').text(accuracy);
}

function resetStats() {
    storedCard = null;
    firstCardClicked = 0;
    secondCardClicked = 0;
    matchCounter = 0;
    matches = 0;
    attempts = 0;
    accuracy = 0 + '%';
    displayStats();
}

function resetButton() {
    gamesPlayed++;
    resetStats();
    $('.card').remove();
    createCards();
    applyCardClickHandler();
}

function cardClicked() {

    var cardHideBack = this;
    $(cardHideBack).find('.back').hide();
    console.log('cardhidden', cardHideBack);

    var matchCard = this;
    console.log('matchcardclicked', $(matchCard).find('.front').attr('src'));

    if (firstCardClicked === 0) {
        firstCardClicked = $(matchCard).find('.front').attr('src');
        $(this).off();
        storedCard = cardHideBack;
        return;
    }

    if (firstCardClicked !== 0) {
        attempts++;
        displayStats();
        secondCardClicked = $(matchCard).find('.front').attr('src');
        if (secondCardClicked === firstCardClicked) {
            matchCounter++;
            matches++;
            displayStats();
            $(this).off();
            console.log('MATCHED CARDS!');
            storedCard = null;
            firstCardClicked = 0;
            secondCardClicked = 0;
            if (matchCounter === totalPossibleMatches) {
                console.log('WON DA GAME');
                console.log('WON DA GAME');
                console.log('WON DA GAME');
                console.log('WON DA GAME');
                console.log('WON DA GAME');
                console.log('WON DA GAME');
            }
        } else {
            $('.card').off();
            setTimeout(function(){

                $(storedCard).find('.back').show();
                $(cardHideBack).find('.back').show();
                applyCardClickHandler();
                storedCard = null;

            }, 2000);
            firstCardClicked = 0;
            secondCardClicked = 0;
            console.log('work??')
        }
    }
}

function createCards() {
    while(randomCardArray.length > 0){

        var randomizedCardIndex = Math.floor(Math.random() * (randomCardArray.length));
        var newDiv = $('<div>').addClass('card');
        var newFront = $('<img>').addClass('front').attr('src',randomCardArray[randomizedCardIndex]);
        var newBack = $('<img>').addClass('back').attr('src', "Cupheadcardback.png");
        randomCardArray.splice(randomizedCardIndex, 1);

        newDiv.append(newFront);
        newDiv.append(newBack);
        $('#game-area').append(newDiv);
    }

randomCardArray = storedCardArray.slice();
}



