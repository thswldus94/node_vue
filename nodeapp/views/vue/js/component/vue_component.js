
// 등록
Vue.component('my-component', {
	template: '<div>사용자 정의 컴포넌트 입니다!!!</div>'
});

// 루트 인스턴스 생성
new Vue({
	el: '#com01'
});


var Child = {
	template: '<div>사용자 정의 컴포넌트 지역 등록이예요!!</div>'
};

new Vue({
	el: '#com02',
	components: {
		'my-component' : Child
	}
});


var rows = {
	template: '<tr><td>에러1</td><td>에러2</td></tr>'
};

new Vue({
	el: '#com03-error',
	components: {
		'my-row': rows
	}
});


// Vue.component('my-com', {
// 	template: '<span>{{message}}</span>',
// 	data: {
// 		message: '아아아'
// 	}
// });
// new Vue({
// 	'el': '#com04'
// });



var data = { counter: 0 };

Vue.component('simple-counter', {
	template: '<button class="btn btn-xs btn-warning" v-on:click="counter += 1">{{ counter }}</button>',
	data: function() {
		return data;
	}
});

new Vue({
	el: '#com05'
});


var num = { counter: 0 };

Vue.component('simple-counter', {
	template: '<button class="btn btn-xs btn-warning" v-on:click="counter += 1">{{ counter }}</button>',
	data: function() {
		return {
			counter : 0
		}
	}
});

new Vue({
	el: '#com05-1'
});
