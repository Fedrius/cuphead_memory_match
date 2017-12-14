$(document).ready(initializeApp);

var firstCardClicked = 0,
    secondCardClicked = 0,
    matchCounter = 0,
    totalPossibleMatches = 9,
    storedCard = null,
    matches = 0,
    attempts = 0,
    accuracy = 0;
    gamesPlayed = 9000;

function initializeApp() {
    $('.card').click(cardClicked);
    displayStats();
    $('.reset').click(resetButton);
}

function displayStats() {
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);

    if(accuracy === 0){
        accuracy = 0 + '%';
    }else {
        accuracy=  accuracy.toFixed(2) + '%';
    }
    $('.accuracy .value').text(accuracy);
}

function resetStats() {
    matches = 0;
    attempts = 0;
    displayStats();
}

function resetButton() {
    gamesPlayed++;
    resetStats()
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

                $('.card').on('click', cardClicked);

                storedCard = null;

            }, 2000);
            firstCardClicked = 0;
            secondCardClicked = 0;
            console.log('work??')

        }
    }
}





