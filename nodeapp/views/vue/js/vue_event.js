var app61 = new Vue({
	el: '#app61',
	data: {
		counter: 0
	}
});

var app62 = new Vue({
	el: '#app62',
	data: {
		name: '손지연'
	},
	methods: {
		whatsYourName: function(event) {
			alert('내이름은 ' + this.name + '이예요~');

			// event는 네이티브 DOM 이벤트입니다
			if (event) {
				// 이벤트 (클릭이나 뭐 변형 등등)에 의해서 탐지되었다면
				alert(event.target.tagName + '에서 탐지되었습니당');
			}
		}
	}
});

var app63 = new Vue({
	el: '#app63',
	methods: {
		sayHo: function(cnt) {
			for (var i = 0; i < cnt; i++) {
				alert((i+1) + '번째 Say Hoooooo!!');
			}
		}
	}
});

var app64 = new Vue({
	el: '#app64'
});

var app64_1 = new Vue({
	el: '#app64-1',
	data: {
		eventList: ['.stop', '.prevent', '.capture', '.self', '.once']
	}
});

var app65 = new Vue({
	el: '#app65',
	data: {
		whatIAmDoing: '유튜부 봄!!'
	},
	methods: {
		whatRUDoing: function() {
			alert('나는 지금 ' + this.whatIAmDoing);
		}
	}
});

var app65_1 = new Vue({
	el: '#app65-1',
	data: {
		eventList: [
			{name: '.enter', desc: ''},
			{name: '.tab', desc: ''},
			{name: '.delete', desc: 'delete와 backspace키 모두 캡쳐합니다'},
			{name: '.esc', desc: ''},
			{name: '.space', desc: ''},
			{name: '.up', desc: ''},
			{name: '.down', desc: ''},
			{name: '.left', desc: ''},
			{name: '.right', desc: ''}
		]
	}
});


var app66 = new Vue({
	el: '#app66',
	data: {
		whatIAmDoing: '유튜부 봄!!'
	},
	methods: {
		whatRUDoing: function() {
			alert('나는 지금 ' + this.whatIAmDoing);
		}
	}
});

var app66_1 = new Vue({
	el: '#app66-1',
	data: {
		eventList: [
			{name: '.ctrl', desc: ''},
			{name: '.alt', desc: ''},
			{name: '.shift', desc: ''},
			{name: '.meta', desc: ''},
		]
	}
});
