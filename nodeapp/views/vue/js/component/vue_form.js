Vue.component('child', {
	props: ['whatdidyousay'],
	template: '<span>{{ whatdidyousay }}</span>'
});
new Vue({
	el: '#prop01'
});


Vue.component('jiyeon', {
	props: ['myMessage'],
	template: '<span>{{ myMessage }}</span>'
});
new Vue({
	el: '#prop02'
});


Vue.component('child', {
	props: ['myMessage'],
	template: '<span>{{ myMessage }}</span>'
});
new Vue({
	el: '#prop03',
	data: {
		parentMsg: ''
	}
});


new Vue({
	el: '#prop04',
	data: {
		types : ['String', 'Number', 'Boolean', 'Function', 'Object', 'Array', 'Symbol']
	}
});


Vue.component('button-counter', {
	template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
	data: function() {
		return {
			counter: 0
		}
	},
	methods: {
		incrementCounter: function() {
			this.counter++;
			this.$emit('increment');
		}
	}
});
new Vue({
	el: '#counter-event-example',
	data: {
		total: 0
	},
	methods: {
		incrementTotal: function() {
			this.total++;
		}
	}
});
