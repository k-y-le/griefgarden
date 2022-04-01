import { xnum, ynum } from './static/constants.js';
import { zoneColors, zoneSymbols } from './static/zones.js';
import {Cell, Plant, Animal, Substrate, Memorial} from './static/classes.js';
import { cells } from './grid.js';

function showSpeech (agent) {
    if ( $('.speechpanel').is(":visible") ){
        hideSpeech();
    } else {
        var $speechPanel =  $('<div/>', {
            class: 'speechpanel',
        })
        .appendTo('#container')
        .html(agent.narrative[Math.floor(Math.random() * agent.narrative.length)] + "</br></br><a target='_blank' href='" + agent.link + "'> read more </a></br>")

        $speechPanel.scrollTop($($speechPanel)[0].scrollHeight);
    }
}
// shows the input form for adding a new memorial
function showMemorialInput (cellID) {
    if ( $('.speechpanel').is(":visible") ){
        hideSpeech();
    }

    else{
        var $speechPanel =  $('<div/>', {
            class: 'speechpanel',
        })
        .appendTo('#container')
        .html("<form action='addmem' method='POST'><p id='errorText' style='color:red;display:none;'>please fill out all required fields in order to share your memorial</p>"
        + "<label for='memTitleInput'>what are you mourning?</label></br><textarea id='memTitleInput' type='text' name='memTitle' class='memInput'></textarea></br></br>"
        + "<label for='memDescInput'>why are you mourning? share a story, emotion, or message for your memorial.</label></br><textarea id='memDescInput' type='text' name='memDesc' class='memInput'></textarea></br></br>"
        + "<label for='memAuthorInput'>what is your name? (optional)</label></br><textarea id='memAuthorInput' type='text' name='memAuthor' class='memInput'></textarea></br></br>"
        + "<label for='memLinkInput'>if you would like to include a link to learn more or take action, please submit it here. (optional)</label></br><input id='memLinkInput' type='text' name='memLink' class='memInput'></input></br></br>"
        + "<label for='memColorInput'>pick a color for your memorial</labl></br><input id='memColorInput' type='color' name='memColor'></input></br></br>"
        + "<button id='addMemorial' type='button'>add memorial</button></form>")

        $('#addMemorial').click(function(){addMemorial(cellID)});
        // var $memAddButton = $('<button/>', {
        //   class: 'addMemorial',
        //   type: 'submit',
        //   click: (function(){ addMemorial(cellID) } )
        // })
        // .appendTo($speechPanel)
        // .html("add memorial");

        $speechPanel.scrollTop($($speechPanel)[0].scrollHeight);
    }
}

function hideSpeech () {
    $('.speechpanel').remove();
}

function addMemorial (cellID) {
  var title = $('#memTitleInput').val();
  var desc = $('#memDescInput').val();
  var color = $('#memColorInput').val();
  var author = $('#memAuthorInput').val();
  var link = $('#memLinkInput').val();
  if (title && desc && color) {
    if (title.length <= 1000 && desc.length <= 5000 && author.length <= 1000 && link.length <= 1000) {
      $('#errorText').hide();
      var memSymb = zoneSymbols[cells[cellID].zone - 1];
      var mem = new Memorial(cellID, $('#memTitleInput').val(), $('#memAuthorInput').val(), [$('#memDescInput').val()], $('#memColorInput').val(), memSymb[Math.floor(Math.random() * memSymb.length)]);
      var zoneCol = zoneColors[cells[mem.id].zone - 1];
      cells[cellID].zone = 7;
      cells[cellID].memorial = mem;
      if (link) {
        var sanitizeLink;
        link.includes("https://") ? sanitizeLink = link : sanitizeLink = "https://" + link;
        try {
          sanitizeLink = new URL(sanitizeLink);
        } catch (_) {
          $('#errorText').html('your link seems to be invalid. please try again with a corrected link (be sure to include https://)').show();
          $('#errorText').scrollTop($('#errorText')[0].scrollHeight);
          return;
        }
        mem.link = sanitizeLink.toString();
      }
      console.log(cells[cellID]);
      $(`#${cellID}`).css({'background-color': mem.color, 'color': zoneCol}).html("<span>" + mem.symbol + "</span>");
      hideSpeech();
      $('.infopanel').toggle();

      $.post("/addmem", mem, function(data, status){
        console.log("memorial being added to database");
      });
    } else {
      $('#errorText').html('please limit your information to 1000 characters for title/author/link, and 5000 characters for description').show();
      $('#errorText').scrollTop($('#errorText')[0].scrollHeight);
    }
  } else {
    $('#errorText').html('please fill out all required fields in order to share your memorial').show();
    $('#errorText').scrollTop($('#errorText')[0].scrollHeight);
  }
}

function showInfo (cellID) {
    hideSpeech();
    var cell = cells[cellID];
    $('.infopanel').children().remove();

    $('.infopanel').html("<p style='padding:20px'> in " + cell.zoneName + "...</p>");

    if (cell.zone != 6 && cell.zone != 5) {
      // panel with information about memorial
      var $memInfo = $('<div/>', {
        class: 'infobox',
      })
      .appendTo('.infopanel')

      $('.infopanel').show();
      if(cell.memorial) {
        // $memInfo =  $('<div/>', {
        //     class: 'speechpanel',
        // })
        // .appendTo('#container')
        var cellHTML = cell.memorial.title + "[<font color='" + cell.memorial.color + "'>" + cell.memorial.symbol + "</font>]   </br><i>"
        + cell.memorial.author + "</i>" + "</br></br>"
        + cell.memorial.narrative + "</br></br>";
        if (cell.memorial.link){
          cellHTML += "<a target='_blank' href='" + cell.memorial.link + "'>visit link</a>";
        }
        // show the memorial title, author, description
        // TODO: change this to be centered modal
        var $symbolInfo =  $('<p/>', {
            class: 'symbolinfo',
        })
        .appendTo($memInfo)
        .html(cellHTML);

        // $('<span/>', {
        //     class: 'companion',
        //     click: (function(){ showSpeech(cell.memorial) } ),
        // }).appendTo($symbolInfo)
        // .html("show description")
      } else {
        // $('.speechpanel').hide();
        // $('.infopanel').show();
        // input field to add a new memorial
        var $symbolInfo =  $('<p/>', {
            class: 'symbolinfo',
            click: (function(){ showMemorialInput(cellID) } )
        })
        .appendTo($memInfo)
        .html("<span class='addMemLink'>add memorial</span>")
      }
    }



    // var $substrateInfo =  $('<div/>', {
    //     class: 'infobox',
    // })
    // .appendTo('.infopanel')
    //
    // var $symbolInfo =  $('<p/>', {
    //     class: 'symbolinfo',
    // })
    // .appendTo($substrateInfo)
    // .html(cell.substrate.name + "   " + "[<font color= "+ cell.substrate.color +">" + cell.substrate.symbol + "</font>]" + "<br>" +
    //     "a kind of " + cell.substrate.type + "</br> </br>")
    //
    // $('<span/>', {
    //     class: 'companion',
    //     click: (function(){   showSpeech(cell.substrate) }),
    // }).appendTo($symbolInfo)
    // .html("show narrative")

    if(cell.plant && $('.infopanel').is(":visible")){
        var $plantInfo = $('<div/>', {
            class: 'infobox',
        }).appendTo('.infopanel')

        var $symbolInfo =  $('<p/>', {
            class: 'symbolinfo',
        })
        .appendTo($plantInfo)
        .html(cell.plant.name + "   " + "[<font color= "+ cell.plant.color +">" + cell.plant.symbol + "</font>]" + "<br>" +
            "<i>" + cell.plant.author + "</i>" + "</br></br>" + cell.plant.narrative[Math.floor(Math.random() * cell.plant.narrative.length)] + "<br><br><a href='" + cell.plant.link + "'>read more</a>")

        // $('<span/>', {
        //     class: 'companion',
        //     click: (function(){ showSpeech(cell.plant) } ),
        // }).appendTo($symbolInfo)
        // .html("read memorial")

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
        .html(cell.occupant.name + "   " + "[<font color= "+ cell.occupant.color +">" + cell.occupant.symbol + "</font>]" + "<br>" +
             "<i>" + cell.occupant.author + "</i>" + "</br></br>" + cell.occupant.narrative[Math.floor(Math.random() * cell.occupant.narrative.length)] + "<br><br><a href='" + cell.occupant.link + "'>read more</a>")
        //
        // $('<span/>', {
        //     class: 'companion',
        //     click: (function(){   showSpeech(occupant) } ),
        // }).appendTo($symbolInfo)
        // .html("read memorial")
    }

}

export { showInfo };
