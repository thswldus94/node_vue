
var app51 = new Vue({
	el: '#app51',
	data: {
		items: [
			{ id : 1, message : '안녕하슈 1' },
			{ id : 2, message : '안녕하슈 2' },
			{ id : 3, message : '안녕하슈 3' }
		]
	}
});

var app52 = new Vue({
	el: '#app52',
	data: {
		parentMessage: '부모 속성의 메시지유!',
		items: [
			{ id : 1, message : '안녕하슈 1' },
			{ id : 2, message : '안녕하슈 2' },
			{ id : 3, message : '안녕하슈 3' }
		]
	}
});

var app53 = new Vue({
	el: '#app53',
	data: {
		object: {
			myName: 'Son Jiyeon',
			myAge: 26,
			'여행좋아하는곳': 'Japan'
		}
	}
});

var app54 = new Vue({
	el: '#app54',
	data: {
		trs: [
			{ id : 11, name : '손지연', age : 26, sex : 'female' },
			{ id : 12, name : '송수호', age : 31, sex : 'male' },
			{ id : 13, name : '손정연', age : 24, sex : 'female' }
		]
	}
});

var app55 = new Vue({
	el: '#app55',
	data: {
		methods: [
			{ name : 'push()' },
			{ name : 'pop()' },
			{ name : 'shift()' },
			{ name : 'unshift()' },
			{ name : 'splice()' },
			{ name : 'sort()' },
			{ name : 'reverse()' }
		]
	}
});

var app56 = new Vue({
	el: '#app56',
	data: {
		methods: [
			{ name : 'filter()' },
			{ name : 'contat()' },
			{ name : 'slice()' }
		]
	}
});

var app57 = new Vue({
	el: '#app57',
	data: {
		numbers: [1,2,3,4,5]
	},
	computed: {
		evenNumbers: function() {
			return this.numbers.filter(function (number) {
				return number % 2 === 0;
			});
		}
	}
});

var app58 = new Vue({
	el: '#app58'
});

var app59 = new Vue({
	el: '#app59',
	data: {
		trs: [
			{ id : 31, fruit : '딸기', quantity : 26},
			{ id : 54, fruit : '청포도', quantity : 31},
			{ id : 76, fruit : '자몽', quantity : 24}
		]
	}
});
