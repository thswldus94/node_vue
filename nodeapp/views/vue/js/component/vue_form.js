Vue.component('currency-input', {
	template: '\
		<span>\
			$\
			<input\
				ref="input"\
				v-bind:value="value"\
				v-on:input="updateValue($event.target.value)">\
		</span>\
	',
	props: ['value'],
	methods: {
		// 값을 직접 업데이트 하는 대신 이 메소드를 사용하여 입력 값에 대한 서식을 지정할 수 있습니다.
		updateValue: function(value) {
			var formattedValue = value.trim().slice(0, value.indexOf('.') === -1 ? value.length : value.indexOf('.') + 3)

			if (formattedValue !== value) {
				this.$refs.input.value = formattedValue;
			}

			this.$emit('input', Number(formattedValue));
		}
	}
});
new Vue({
	'el' : '#form01'
});
