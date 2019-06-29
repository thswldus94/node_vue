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
