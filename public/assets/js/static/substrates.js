var substrateNames = [

//zones: 1 rocky, 2 soil, 3 trees, 4 farm, 5 path, 6 spring

	{
		'name': 'limestone',
		'1': 'high',
		'2': 'low',
		'3': 'low',
		'4': 'none',
		'5': 'med',
		'6': 'none',
		'type': 'rock',
		'personality': 'flighty',
		'fertility': 0.015,
		'symbol': '',
		'color': '#ebebe0',
	},

	{
		'name': 'dolomite',
		'1': 'high',
		'2': 'none',
		'3': 'low',
		'4': 'none',
		'5': 'low',
		'6': 'none',
		'type': 'rock',
		'personality': 'wise',
		'fertility': 0.01,
		'symbol': '',
		'color': '#b3b3cc',
	},

	{
		'name':'terra rossa',
		'1': 'low',
		'2': 'high',
		'3': 'high',
		'4': 'low',
		'5': 'high',
		'6': 'none',
		'type': 'soil',
		'personality': 'flighty',
		'fertility': 0.08,
		'symbol': '',
		'color':'#66001a',
	},

	{
		'name': 'compost',
		'1': 'none',
		'2': 'none',
		'3': 'low',
		'4': 'high',
		'5': 'none',
		'6': 'none',
		'type': 'soil',
		'personality': 'moody',
		'fertility': 0.15,
		'symbol': '',
		'color': '#3b2b2f',
	},

	{
		'name': 'clay',
		'1': 'low',
		'2': 'med',
		'3': 'low',
		'4': 'none',
		'5': 'med',
		'6': 'none',
		'type': 'soil',
		'personality': 'solemn', //add clingy back?
		'fertility': 0.04,
		'symbol': '',
		'color': '#e6e600',
	},

	{
		'name': 'water',
		'1': 'none',
		'2': 'none',
		'3': 'none',
		'4': 'none',
		'5': 'none',
		'6': 'high',
		'type': 'liquid',
		'personality': 'chatty',
		'fertility': 0,
		'symbol': '≈',
		'color': '#99e6ff',
	},

	{
		'name': 'water',
		'1': 'none',
		'2': 'none',
		'3': 'none',
		'4': 'none',
		'5': 'none',
		'6': 'high',
		'type': 'liquid',
		'personality': 'friendly',
		'fertility': 0,
		'symbol': '~',
		'color': '#99e6ef',
	},

]

export default  substrateNames ;
