
var app00 = new Vue({
	el: '#app00',
	data: {
		message: '',
		areaMessage: ''
	}
});

var app01 = new Vue({
	el: '#app01',
	data: {
		isChecked: true,
		myFoodCheckes: [],
		dietFoodChecked: 'oi',
		carList: '귀요미 모닝',
		selectMulti: [],
		selectItems: [
			{'id' : 1, 'name': 'AAA'},
			{'id' : 2, 'name': 'BBB'},
			{'id' : 3, 'name': 'CCC'},
			{'id' : 4, 'name': 'DDD'},
			{'id' : 5, 'name': 'EEE'},
		]
	}
});

var app02 = new Vue({
	el: '#app02',
	data: {
		message: '',
		changeTypeNumber: '',
		trimString: ''
	}
});
