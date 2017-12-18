$(document).ready(initializeApp);

var firstCardClicked = 0,
    secondCardClicked = 0,
    matchCounter = 0,
    totalPossibleMatches = 9,
    storedCard = null,
    matches = 0,
    attempts = 0,
    accuracy = 0 + '.00%',
    gamesPlayed = 9000,
    setTimeOutTimer = null;

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

var cupheadOrMugmanCard = ["Cupheadcardback.png", "mugmanCard.jpg"];

function initializeApp(){
    createCards();
    applyCardClickHandler();
    buttonAndModalClickHandlers();
    displayStats();
    // $('.settings').click(showSettings);
}

// function showSettings(){
//     $('.settingsModal').show();
// }
function buttonAndModalClickHandlers(){
    $('.reset').click(resetButton);
    $('.winnerModal').on('click', hideWinner);
    $(window).keydown(function(){
        $('.winnerModal').fadeOut(500);
    });
    $('.aboutMe>span').click(showAboutMe);
    $('.close').click(hideAboutMe);

    // $('.settings').click(showSettings);
}

function showAboutMe(){
    $('.aboutMeModal').fadeIn(200);
}

function hideAboutMe(){
    $('.aboutMeModal').fadeOut(200);
}

function showWinner(){
    $('.winnerModal').fadeIn(1000);
}

function hideWinner(){
    $('.winnerModal').fadeOut(500);
}

function applyCardClickHandler(){
    $('.card').click(cardClicked);
}

function toggleClickOnOff(card){
    $(card).toggleClass('disableClick');
}

function displayStats(){
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);

    if(attempts > 0){
        accuracy = ((matches / attempts) * 100).toFixed(2) + '%';
    }
    $('.accuracy .value').text(accuracy);
}

function resetStats(){
    storedCard = null;
    firstCardClicked = 0;
    secondCardClicked = 0;
    matchCounter = 0;
    matches = 0;
    attempts = 0;
    accuracy = 0 + '.00%';
    displayStats();
}

function resetButton(){
    clearTimeOut();
    gamesPlayed++;
    resetStats();
    $('.reset').text('Reset Game');
    $('.card').remove();
    createCards();
    applyCardClickHandler();
}

function cardClicked(){
    var matchCard = this;
    $(this).toggleClass('transformBack hover');

    if (firstCardClicked === 0){
        firstCardClicked = $(matchCard).find('.front').attr('src');
        toggleClickOnOff(this);
        storedCard = matchCard;
        return;
    }

    if (firstCardClicked !== 0){
        attempts++;
        displayStats();
        secondCardClicked = $(matchCard).find('.front').attr('src');
        if (secondCardClicked === firstCardClicked) {
            matchCounter++;
            matches++;
            displayStats();
            toggleClickOnOff(this);
            storedCard = null;
            firstCardClicked = 0;
            secondCardClicked = 0;
            if (matchCounter === totalPossibleMatches){
                showWinner();
                $('.reset').text('Play Again!');
            }
        } else {
            $('.card').off();
            setTimer(this);
            firstCardClicked = 0;
            secondCardClicked = 0;
        }
    }

    function setTimer(temp){
        setTimeOutTimer = setTimeout(function(){
            $(storedCard).toggleClass('transformBack hover');
            $(temp).toggleClass('transformBack hover');

            applyCardClickHandler();
            toggleClickOnOff(storedCard);
            storedCard = null;

        }, 1000);
    }
}

function createCards(){
    var storedCardArray = randomCardArray.slice();
    var cupmanOrMugmanIndex = Math.floor(Math.random() * 2);

    while(randomCardArray.length > 0){

        var randomizedCardIndex = Math.floor(Math.random() * (randomCardArray.length));
        var newDiv = $('<div>',{
            class: 'card hover'
        });
        var newFront = $('<img>').addClass('front').attr('src',randomCardArray[randomizedCardIndex]);
        var newBack = $('<img>').addClass('back').attr('src', cupheadOrMugmanCard[cupmanOrMugmanIndex]);
        randomCardArray.splice(randomizedCardIndex, 1);

        newDiv.append(newFront);
        newDiv.append(newBack);
        $('#game-area').append(newDiv);
    }

randomCardArray = storedCardArray.slice();
}

function clearTimeOut(){
    clearTimeout(setTimeOutTimer);
}