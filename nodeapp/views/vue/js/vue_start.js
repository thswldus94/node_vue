
var app = new Vue({
	el: '#app',
	data: {
		message: 'hihi 안녕들하신가~'
	}
});

var app2 = new Vue({
	el: '#app2',
	data: {
		message: '이 페이지는 ' + new Date() + '로드 되었소'
	}
});

var app3 = new Vue({
	el: '#app3',
	data: {
		seen: true
	}
});

var app4 = new Vue({
	el: '#app4',
	data: {
		todos: [
			{ content: 'Vue 배우기' },
			{ content : 'ㅇㅈ하기' },
			{ content : '좋은곳 가즈아...' }
		]
	}
});

var app5 = new Vue({
	el: '#app5',
	data: {
		message: '이제부터 메시지를 뒤집어볼거예요'
	},
	methods: {
		reverseWords: function() {
			this.message = this.message.split('').reverse().join('');
		}
	}
});

var app6 = new Vue({
	el: '#app6',
	data: {
		message: '6. Input에다가 동일한 내용을 써볼게예요'
	}
});

Vue.component('todo-item', {
	// prop 이라고 하는 사용자 정의 속성 같은 것을 입력할 수 있어요. todo 라는 이름을 사용해서 정의했습니다.
	props: ['todo'],
	//template: '<li>할 일 항목 입니다. 쭉쭉 써 내볼게요. 이것은 vue입니다.</li>'
	template: '<li>{{ todo.text }}</li>'
});

var app7 = new Vue({
	el: '#app7',
	data: {
		supermarket: [
			{id: 0, text: 'my love jelly'},
			{id: 1, text: 'today\'s food potato curry'},
			{id: 2, text: '私が好きな料理の材料！何があったけ、、ブルゴギ？笑'}
		]
	}
});
