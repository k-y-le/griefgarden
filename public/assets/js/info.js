import { cells } from './grid.js';
import { goats } from './animation.js';

function showSpeech (agent, offset) {
    hideSpeech();
    var $speechPanel =  $('<div/>', {
        class: 'speechpanel',
    })
    .css({'top': offset})
    .mouseleave(function() { hideSpeech()})
    .appendTo('#container')

    for(var i=0; i<agent.speech.length; i++){
        var offsetLeft = (agent.speech[i].sender === agent.speech[i].receiver) ? 50 : 10;

        var $messageBox = $('<div/>', {
            class: 'messagebox',
        })
        .css({'left': offsetLeft})
        .html(agent.speech[i].sender.symbol + ': ' + agent.speech[i].message)
        .appendTo($speechPanel)
    }

    $speechPanel.scrollTop($($speechPanel)[0].scrollHeight);
}

function hideSpeech () {
    $('.speechpanel').remove();
}

function showInfo (cellID) {
    hideSpeech();
    var cell = cells[cellID];
    $('.infopanel').children().remove()
    $('.infopanel').toggle()
    
    $('.infopanel').html("<p style='padding:20px'> in " + cell.zoneName + "...</p>")

    var $substrateInfo =  $('<div/>', {
        class: 'infobox',
    })
    .appendTo('.infopanel')
    
    var $symbolInfo =  $('<p/>', {
        class: 'symbolinfo',
    })
    .appendTo($substrateInfo)
    .mouseenter(function() { showSpeech(cell.substrate, ($substrateInfo).offset().top)})
    .html(cell.substrate.name + "   " + "[" + cell.substrate.symbol + "]" + "<br>" +
     "<p class='artext' lang='ar'>" + cell.substrate.arabic + "</p>" + "<br>" +
        "a kind of " + cell.substrate.type)

    if(cell.plant){
        var $plantInfo = $('<div/>', {
            class: 'infobox',
        }).appendTo('.infopanel')

        var $symbolInfo =  $('<p/>', {
            class: 'symbolinfo',
        })
        .appendTo($plantInfo)
        .mouseenter(function() { showSpeech(cell.plant, ($plantInfo).offset().top)})
        //.mouseleave(function() { hideSpeech()})
        .html(cell.plant.name + "   " + "[" + cell.plant.symbol + "]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.plant.arabic + "</p>" + "<br>" +
            "<i>" + cell.plant.latin + "</i>" + "</br>" + "a kind of " + cell.plant.type)
      
        if(cell.plant.notes !== '') $symbolInfo.append("</br> </br>" + cell.plant.notes)
      }

    if(cell.occupant){
        var occupant = cell.occupant.parentArray[cell.occupant.id];

        var $occupantInfo = $('<div/>', {
            class: 'infobox',
        }).appendTo('.infopanel')

        var $symbolInfo =  $('<p/>', {
            class: 'symbolinfo',
        })
        .appendTo($occupantInfo)
        .mouseenter(function() { showSpeech(occupant, ($occupantInfo).offset().top)})
        //.mouseleave(function() { hideSpeech()})
        .html(cell.occupant.name + "   " + "[" + cell.occupant.symbol + "]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.occupant.arabic + "</p>" + "<br>" +
            "</br>" + "a kind of " + cell.occupant.type)

    }

}

export { showInfo };