  /////////////////////////////////////////////
 //////// Created by Luis Mendes Jorge////////
/////////////////////////////////////////////

// to slide a set of images in a class called 'sp'

var timer;
var autoSliderTime = 2500;

var nextImg = function(){
    var oldElem = $('.activeElem').removeClass('activeElem');

    if ( oldElem.is(':last-child')) {
        $('.sp').first().addClass('activeElem');
    }
    else {
        oldElem.next().addClass('activeElem');
    }

    oldElem.fadeOut();
    $('.activeElem').fadeIn();
};

$(document).ready(function() {

    //set images status
    setImagesStatus();


    $('.sp').first().addClass('activeElem');
    $('.sp').hide();    
    $('.activeElem').fadeIn();

    timer = setInterval(nextImg, autoSliderTime);

    $('button#next').click(nextImg);

    $('button#previous').click(function() {
        var oldElem = $('.activeElem').removeClass('activeElem');    
        if ( oldElem.is(':first-child')) {
            $('.sp').last().addClass('activeElem');
        }
        else {
            oldElem.prev().addClass('activeElem');
        }
        oldElem.fadeOut();
        $('.activeElem').fadeIn();
    });

    $('div#slider').hover(function(){
        clearInterval(timer)
    }, function(){
        timer = setInterval(nextImg, autoSliderTime);
    });

});