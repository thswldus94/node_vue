// 데이터 객체
var newData = { a : 1 };

// Vue 인스턴스에 데이터 객체를 추가함
var vm = new Vue({
	data : newData
});

console.log(vm.a === newData.a);

vm.a = 2;
console.log(newData.a);


var obj = { foo : 'hello hi 안녕?' };

// 이것을 쓰면 더이상 값이 변경되는것을 막습니다
Object.freeze(obj);

new Vue({
	el: '#app',
	data: obj
});
