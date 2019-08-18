class Cell {
  constructor(id, zoneName, substrate) {
    this.id = id;
    this.zoneName = zoneName;
    this.substrate = substrate;
    this.plant ='';
  }
}

class Plant {
  constructor(name, arabic, type, soil, water, temp, personality, speech, symbol, color, flowering, flowercolor) {
  	this.id = '';
  	this.name = name;
  	this.arabic = arabic;
  	this.type = type;
  	this.soil = soil;
  	this.water = water;
  	this.temp = temp;
  	this.personality = personality;
  	this.speech = [speech];
  	this.symbol = symbol;
  	this.color = color;
  	this.flowering = flowering;
  	this.flowercolor = flowercolor;
  	this.notes = '';
  	this.latin = '';
  }
}

class Substrate {
  constructor(name, arabic, type, personality, fertility, depth, symbol, color, speech) {
  	this.id = '';
  	this.name = name;
    this.arabic = arabic;
  	this.type = type;
  	this.personality = personality;
  	this.fertility = fertility;
  	this.depth = depth;
  	this.symbol = symbol;
  	this.color = color;
  	this.speech = [speech];
  }

}

class Animal {
  constructor(id, parentArray, x, y, name, arabic, type, personality, symbol, color, speech) {
    this.id = id;
    this.parentArray = parentArray;
    this.x = x;
    this.y = y;
    this.name = name;
    this.arabic = arabic;
    this.type = type;
    this.personality = personality
    this.symbol = symbol;
    this.color = color;
    this.speech = [speech];
    this.latin = '';    
    this.notes = '';
  }
}

class Speech {
  constructor(sender, receiver, message, timestamp) {
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
    this.timestamp = timestamp;
  }
}

export {Cell, Plant, Substrate, Animal, Speech };
