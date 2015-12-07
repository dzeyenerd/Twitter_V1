$(function() {

var user = {
	handle: '@BryanPena101',
	img: 'Bryan.jpeg'
}

var tweetHtml = $('#template-tweet').html()
var tweetTempl = Handlebars.compile(tweetHtml)
var tweetRender = function (user, message) {
	return tweetTempl({ 
		img: user.img,
		handle: user.handle,
		message: message
	})
}
console.log(tweetTempl({
	img:'Bryan.jpeg',
	handle:'@BryanPena101',
	message:'Hello World'
}))


var composeHtml = $('#template-compose').html()
var composeTempl = Handlebars.compile(composeHtml)
var composeRender = function() {
	return composeTempl()
}


var threadHtml = $('#template-thread').html()
var threadTempl = Handlebars.compile(threadHtml)
var threadRender = function(user, message) {
	return threadTempl( {
		tweetTempl: tweetRender(user, message),
		composeTempl: composeRender()
	})
}






$('main').on('focus', '.compose textarea', function() {
	$(this).parents('.compose').addClass('expand')
})

$('.tweets').on('click', '.thread > .tweet',function() {
	$(this).parents('.thread').toggleClass('expand')
})

$('main').on('submit', '.compose', function() {
	var message = $(this).find('textarea').val()
	if ($(this).parent('header').length) {
		$('.tweets').append(threadRender(user, message))
	} else {
		$(this).parent('.replies').append(tweetRender(user, message))
	}

	$(this).find('textarea').val('')
	console.log(message)
	console.log(tweetRender(user, message))
	return false
})




})