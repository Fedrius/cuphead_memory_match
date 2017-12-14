$(document).ready(initializeApp);

var firstCardClicked = 0;
var secondCardClicked = 0;
var matchCounter = 0;
var totalPossibleMatches = 9;
var storedCard = null;

function initializeApp() {
    $('.card').click(cardClicked);
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
        secondCardClicked = $(matchCard).find('.front').attr('src');
        if (secondCardClicked === firstCardClicked) {
            matchCounter++;
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





