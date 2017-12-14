$(document).ready(initializeApp);

var firstCardClicked = 0;
var secondCardClicked = 0;
var matchCounter = 0;
var totalPossibleMatches = 3;

var storedCard = null;

var clickHandleOffandOn = null;

function initializeApp() {
    $('.card').click(cardClicked);
}


function cardClicked() {

    var cardHide = $(this).find('.back').hide();
    console.log('hidden: ',cardHide);

    var matchCard = $(this).find('.front').attr('src');
    console.log('matchcard:',matchCard);
    console.log('firstcardclicked:',firstCardClicked);

    if(firstCardClicked === 0){
        firstCardClicked = matchCard;
        storedCard = cardHide;
        clickHandleOffandOn = $(this).off();
        return;
    }

    if(firstCardClicked !== 0){
        secondCardClicked = matchCard;

        if(secondCardClicked !== firstCardClicked){
            matchCounter++;
            console.log('MATCHED!');
            $(this).off();
            firstCardClicked = 0;
            secondCardClicked = 0;
            if(matchCounter === totalPossibleMatches){
                    console.log('WON DA GAME')
            }

        } else {
            $(this).off();
            setTimeout(function(){
                storedCard.show();
                cardHide.show();
                storedCard = null;
                clickHandleOffandOn.click(cardClicked);
                $(this).click(cardClicked);
                clickHandleOffandOn = null;
            }, 2000);
            firstCardClicked = 0;
            secondCardClicked = 0;
            console.log('work??')
        }
    }

}




