import { cells, animals } from './grid.js';
import animalNames from './static/animals.js';
import { Animal } from './static/classes.js';
import { xnum, ynum } from './static/constants.js'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function regrowCell(cellNumber){
	var cell = cells[cellNumber];

	$('#'+cellNumber).html(cell.substrate.symbol).css({'color': cell.substrate.color})

	if(cell.plant){
		$('#'+cellNumber).html(cell.plant.symbol).css({'color': cell.plant.color})
	}

	cell.occupant = false;
}


//for noodling animals
function moveAnimals(animals) {
	for(var i=0; i<animals.length; i++){
		if(animals[i]){
			regrowCell(animals[i].y*xnum+animals[i].x);

			var nextX, nextY, newCellNumber;
			var nextStep = false;

			do {
				nextX = (animals[i].x + Math.floor(Math.random()*3)-1)%xnum;
				nextY = (animals[i].y + Math.floor(Math.random()*3)-1)%ynum;

				newCellNumber = nextY*xnum + nextX;

				if(cells[newCellNumber])
				{
					if(!cells[newCellNumber].occupant && animals[i].zones.some(zone => cells[newCellNumber].zone === zone)) nextStep = true;
				}

			} while (nextStep === false)

			animals[i].x = nextX;
			animals[i].y = nextY;

			//test
			if(newCellNumber > ynum*xnum || newCellNumber < 0)
				console.log('the mod thing isnt working');

			else{
				cells[newCellNumber].occupant = animals[i];
				$('#'+newCellNumber).html(animals[i].symbol).css({'color': animals[i].color})
			}
		}
	}
}

function reset() {
	console.log('gd morning friends');
}

function eachMinute() {
  console.log('a minute has passed woo');
}

function eachHour() {
	console.log('an hour!!')
}

function eachTenSeconds() {
	//find some animalNames/plant's speech and print it
  printQuote();
}

function printQuote() {
	var message, symbol;
  // get a random cell with a plant on it
	var randCellNumber = Math.floor(Math.random()*ynum*xnum);
  while (!cells[randCellNumber].plant && !cells[randCellNumber].occupant) {
    randCellNumber = Math.floor(Math.random()*ynum*xnum);
  }

	var randCell = cells[randCellNumber];

	var cellPos = $("#"+randCellNumber).position();

	$('.speechbox').remove()
  if (cells[randCellNumber].occupant) var quoteHTML = '['+randCell.occupant.symbol+'] '+randCell.occupant.quote
  else var quoteHTML = '['+randCell.plant.symbol+'] '+randCell.plant.quote
	//put speech above cell
	var $speechBox = $('<div/>', {
			class: "speechbox",
		})
		.css({
			left: cellPos.left,
			top: cellPos.top-20,
		})
		.html(quoteHTML)
		.appendTo('#container')

}

function eachSecond() {
  // adjusts the water cells to give appearance of movement
	$('.water').each( function() {
		var wave = $( this ).html() === "~" ? '≈' : "~"
		$( this ).html(wave);
	})

	moveAnimals(animals);
}

//queries the time every second, runs regular events
async function runMainLoop(){

	while(true){
		var today = new Date();

		if(today.getSeconds()%10 === 0){
			eachTenSeconds();
		}

		if(today.getSeconds() === 0){
			eachMinute();
		}

		if(today.getMinutes() === 0 && today.getSeconds() === 0){
			eachHour();
		}

		if(today.getHours() === 0 && today.getMinutes() === 0 && today.getSeconds() === 0){
			reset();
		}

		eachSecond();
		await sleep(1000);

	}
}

export {runMainLoop};
