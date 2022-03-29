import { zones, zoneNames, zoneColors, zoneSymbols } from './static/zones.js';
import plantNames from './static/plants.js';
import animalNames from './static/animals.js';
import substrateNames from './static/substrates.js';
import { xnum, ynum, squareSize } from './static/constants.js';
import {Cell, Plant, Animal, Substrate, Memorial} from './static/classes.js';
import { runMainLoop } from './animation.js';
import { showInfo } from './info.js';

var cells = new Array(xnum*ynum);
var animals = [];

function getEntries(array, type, val) {
  return array.filter(function (el) {
    return el[type] === val;
  });
}

function rollDice() {
    var rand = Math.random();
    var level;

    if(rand < 0.8) level = 'high';
    else if(rand < 0.95) level = 'med';
    else level = 'low';

    return level;
}

function setDepth(zone, substrateType) {
    var depth = (4-zone)/3*Math.random();
    var level;

    if(depth < 0.5) level = 'shallow';
    else if(depth < 0.8) level = 'med';
    else level = 'deep';

    if(substrateType === 'rock') level = 'shallow';

    return level;
}

function distributeAnimals(){
    var animalID = 0;
    for (var index in animalNames){
        var animal = animalNames[index]

        for(var i=0; i<animal.number; i++){
            var cellPicked = false;
            var randCellNumber = 0;

            do{
                randCellNumber = Math.floor(Math.random()*ynum*xnum);
                if(!cells[randCellNumber].occupant && animal.zones.some(zone => cells[randCellNumber].zone === zone)) {
                    cellPicked = true;
                    //console.log("zone picking initial", i, animal.name, animal.zones, cells[randCellNumber].zone);
                }
            } while (cellPicked === false);

            var y = Math.floor(randCellNumber/xnum);
            var x = randCellNumber - y*xnum;

            var color = animal.shades[Math.floor(Math.random()*animal.shades.length)];

            var occupant = new Animal(animalID, animals, x, y, animal.name, animal.zones,
                animal.type, animal.personality, animal.symbol, color, animal.narrative);
            occupant.author = animal.author;
            if(animal.link) occupant.link = animal.link;
            if(animal.quote) occupant.quote = animal.quote;

            cells[randCellNumber].occupant = occupant;
            animals.push(occupant);
            animalID+=1;
        }
    }
}

function getSubstrate(zone) {
    var entries = [];

    do{
        var level = rollDice();
        entries = getEntries(substrateNames, zone, level);
    }while (entries.length === 0)

    var substrateType = entries[Math.floor(Math.random()*(entries.length))];

    //set substrate depth: random but as a function of zone
    var depth = setDepth(zone, substrateType.type);

    var substrate = new Substrate(substrateType.name, substrateType.type, substrateType.personality,
        substrateType.fertility, depth, substrateType.symbol, substrateType.color )

    return substrate;
}

function getPlant(zone) {
    do{
        var level = rollDice();
        var entries = getEntries(plantNames, zone, level);
    } while (entries.length === 0)
    var plantType = entries[Math.floor(Math.random()*(entries.length))];
    //here create new plant


    var plant = new Plant(plantType.name, plantType.type, plantType.temp,
        plantType.personality, plantType.symbol, plantType.color, plantType.narrative)

    if(plantType.notes) plant.notes = plantType.notes;
    if(plantType.author) plant.author = plantType.author;
    if(plantType.link) plant.link = plantType.link;
    if(plantType.quote) plant.quote = plantType.quote;

    return plant;
}

var generateGrid = new Promise( function(resolve, reject){
    //subdivide the document into 10x10 squares to use as co-ordinate system
    var leftMargin = ($(document).width() - Math.floor($(document).width()/squareSize)*squareSize)/2;
    var topMargin = ($(document).height() - Math.floor($(document).height()/squareSize)*squareSize)/2;

    for(var j=0; j<ynum; j++){
        for(var i=0; i<xnum; i++){
            var zone = zones[j*xnum + i];
            var plant;
            var substrate = getSubstrate(zone);
            var symbol = substrate.symbol;
            var color = substrate.color;

            var zoneName = zoneNames[zone]
            var id = j*xnum+i;
            var cell = new Cell(id, zone, zoneName, substrate);

            var divClass = "square zone" + zone + " " + cell.substrate.name.replace(/\s/g, '');

            // add plant to cell
            if(Math.random() < substrate.fertility && zone !== 5){
                plant = getPlant(zone);
                symbol = plant.symbol;
                divClass = divClass + " " + plant.name.replace(/\s/g, '');

                cell.plant = plant;

                color = plant.color;
            }

            $('<div/>', {
                id: i+xnum*j,
                class: divClass,
                click: (function(){ showInfo(this.id) } )
            }).css({
            'width': squareSize,
            'height': squareSize,
            'left':squareSize*i+leftMargin+'px',
            'top':squareSize*j+topMargin+'px',
            'color': color,
            'position':'absolute',
            'text-align' : 'center',
            }).html(symbol)
            .appendTo( '#container' );

            cells[j*xnum + i] = cell;
        }
    }
    $.get('/getmem', function(data, status){
      data.forEach((mem) => {
        console.log(mem);
        var newMem = new Memorial(mem.id, mem.title, mem.author, mem.narrative, mem.color, zoneSymbols[cells[mem.id].zone - 1]);
        var zoneCol = zoneColors[cells[mem.id].zone - 1];
        cells[mem.id].zone = 7;
        cells[mem.id].memorial = newMem;
        // make the memorial show up now!

        $(`#${newMem.id}`).css({'background-color': newMem.color, 'color': zoneCol}).html("<span>" + newMem.symbol + "</span>");
      });
    });
    distributeAnimals();
    resolve('generated grid!!');
})

generateGrid.then(function(value) {
    runMainLoop();
});

export { cells, getEntries, animals };
