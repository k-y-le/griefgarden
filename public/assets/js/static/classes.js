class Cell {
  constructor(id, zone, zoneName, substrate) {
    this.id = id;
    this.zone = zone;
    this.zoneName = zoneName;
    this.substrate = substrate;
    this.plant ='';
    this.memorial = '';
  }
}

class Plant {
  constructor(name, type, temp, personality, symbol, color, narrative) {
  	this.id = '';
  	this.name = name;
  	this.type = type;
  	this.temp = temp;
  	this.personality = personality;
  	this.symbol = symbol;
  	this.color = color;
  	this.notes = '';
  	this.author = '';
    this.narrative = narrative;
    this.link = '';
  }
}

class Substrate {
  constructor(name, type, personality, fertility, depth, symbol, color) {
  	this.id = '';
  	this.name = name;
  	this.type = type;
  	this.personality = personality;
  	this.fertility = fertility;
  	this.depth = depth;
  	this.symbol = symbol;
  	this.color = color;
    this.narrative = '';
  }

}

class Animal {
  constructor(id, parentArray, x, y, name, zones, type, personality, symbol, color) {
    this.id = id;
    this.parentArray = parentArray;
    this.x = x;
    this.y = y;
    this.name = name;
    this.zones = zones;
    this.type = type;
    this.personality = personality
    this.symbol = symbol;
    this.color = color;
    this.latin = '';
    this.notes = '';
    this.narrative = '';
  }
}

class Memorial {
  constructor(title, author, narrative, color, symbol) {
    this.title = title;
    this.author = author;
    this.narrative = narrative;
    this.color = color;
    this.symbol = symbol;
  }
}

export {Cell, Plant, Substrate, Animal, Memorial };
