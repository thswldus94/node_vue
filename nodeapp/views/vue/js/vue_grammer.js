
var app11 = new Vue({
	el: '#app11',
	data: {
		message: '아따 이것이 그냥 string을 찍어분거여'
	}
});

var app12 = new Vue({
	el: '#app12',
	data: {
		rawHTML: '<span style="color: red">빨간색으로 나오는게 맞지요?!</span>'
	}
});

var app13 = new Vue({
	el: '#app13',
	data: {
		imageSrc: getImageSrcPath(),
		imageSizeStyle: {'width' : '100px'}
	}
});

function getImageSrcPath() {
	return 'http://cfile239.uf.daum.net/image/998901475A781C593E04EF';
}
