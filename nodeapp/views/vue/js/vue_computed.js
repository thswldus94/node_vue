
var app21 = new Vue({
	el: '#app21',
	data: {
		message: '글자를 거꾸로 찍어봐요'
	},
	computed: {
		reverseMessage: function() {
			return this.message.split('').reverse().join('')
		}
	},
	methods: {
		reverseMessageFunction: function() {
			return this.message.split('').reverse().join('')
		}
	}
});

var app23 = new Vue({
	el: '#app23',
	data : {
		firstName: 'Jiyeon',
		lastName: 'Son',
		fullName: 'Son Jiyeon'
	},
	// 명령형 코딩. 했던 코드를 계속해서 반복함
	// watch: {
	// 	firstName: function(val) {
	// 		this.fullName = val + ' ' + this.lastName
	// 	},
	// 	lastName: function(val) {
	// 		this.fullName = this.firstName + ' ' + val
	// 	}
	// }
	// 선언형 코딩. 좀더 간결하고 불필요한 함수 실행을 하지 않는다.
	computed: {
		fullName: {
			// fullname의 getter부분
			get: function() {
				return this.firstName + ' ' + this.lastName;
			},
			// fullname의 setter 부분
			set: function(name) {
				var names = name.split(' ');
				this.firstName = names[0];
				this.lastName = names[names.length - 1];
			}
		},
		//
	}
});

var app24 = new Vue({
	el: '#app24',
	data: {
		question : '',
		answer: '질문 하기 전까지 대답하면 술래임 ㅋ'
	},
	watch: {
		// 질문이 변경될 때마다 이 함수가 실행됩니다
		question: function(newQ) {
			this.answer = '아따 빨리 말하랑께'
			this.getAnswer()
		}
	},
	methods: {
		getAnswer: _.debounce(
			function() {
				if (this.question.indexOf('?') === -1) {
					this.answer = '질문을 할라면 물음표를 붙여야제'
					return
				}
				this.answer = '생각중이여,,,쪼까 기다려';
				var vm = this;
				axios.get('https://yesno.wtf/api')
					.then(function(response) {
						vm.answer = _.capitalize(response.data.answer)
					})
					.catch(function (error) {
						vm.answer = '오메 에러여! API 에러구먼' + error
					})
			},
			// 사용자가 입력을 기다리는 시간 밀리세컨드 입니다
			500
		)
	}
});
