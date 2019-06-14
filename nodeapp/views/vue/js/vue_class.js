
var app31 = new Vue({
	el: '#app31',
	data: {
		successClass: true,
		errorClass: false
	}
});

var app32 = new Vue({
	el: '#app32',
	// data: {
	// 	classObject: {
	// 		'text-success': false,
	// 		'text-danger' : true
	// 	}
	// },
	data: {
		isSuccess: false,
		errorMessage: 'Error 메시지 입니다!! 테스트로 만들어봤어요 ㅎㅎ'
	},
	computed: {
		classObject: function() {
			return {
				'text-success': this.isSuccess && !this.errorMessage,
				'text-danger': this.errorMessage
			}
		}
	}
});

var app33 = new Vue({
	el: '#app33',
	data: {
		activeClass: 'active',
		errorClass: 'text-danger'
	}
});

var app34 = new Vue({
	el: '#app34',
	data: {
		warningColor: '#ff00c8',
		fontSize: 24
	}
});

var app35 = new Vue({
	el: '#app35',
	data: {
		colorCss: {
			color: '#fff',
			background: '#000'
		},
		sizeCss: {
			fontSize: String(3*6) + 'px'
		}
	}
});
