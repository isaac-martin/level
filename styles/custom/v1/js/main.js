var percent_82 = null;
var percent_92 = null;
var animateOnce = true;


/************************ INIT THE PAGE *****************************/
$(document).ready(function() {



	/************************ FORM SPREE AJAX BABY ******************/


		var $contactForm = $('#contactForm');

	 $contactForm.submit(function(e) {
	 	e.preventDefault();
	 	var $submit = $('input:submit', $contactForm);
	 	var defaultSubmitText = $submit.val();

	 	$.ajax({
				url: '//formspree.io/contact@isaacmartin.co',
	 		method: 'POST',
	 		data: $(this).serialize(),
	 		dataType: 'json',
	 		beforeSend: function() {
	 			$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
	 		},
	 		success: function(data) {
	 			$contactForm.append('<div class="alert alert--success">Message sent!</div>');
				$contactForm.fadeOut(3000);
				console.log('Message Sent');
	 		},
	 		error: function(err) {
	 			$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
	 			$('.alert--error').remove();
				console.log('Ops, there was an error');
	 		}
	 	});
	 });


	//*******************************************/
	//video carousel
	$('#carouselVideo ol li').click(function () {
		if(!$('#carouselVideo ol li').hasClass('onActive')) {
			$('#carouselVideo ol li').addClass('onActive');

			var curr  = $('#carouselVideo ol li.active').attr("data-slide-to");
			var index = $(this).attr("data-slide-to");

			$('#carouselVideo ol li.active').removeClass('active');
			$('#carouselVideo ol li[data-slide-to='+index+']').addClass('active');

			$('#carouselVideo .carousel-item[slide-id='+curr+']').animate({
				opacity: 0,
				zIndex: 1,
			}, 1000);

			$('#carouselVideo .carousel-item[slide-id='+index+']').animate({
				opacity: 1,
				zIndex: 2,
			}, 1000, function() {
				$('#carouselVideo ol li').removeClass('onActive');
			});
		}
	})
	//*******************************************/

	$('#thanks').hide()


	//Scroll
	$('.linkScroll').on('click', function(e) {
		e.preventDefault();
		var scrollTarget = $(this).attr("data-target");

		$('html, body').animate({
			scrollTop: $("#"+scrollTarget).offset().top + 2
		}, 500);
	})
	//Page Down
	$('#pageDown').on('click', clickPageDown)

	setHeightOfVideo();

	// specifySection();

	$(window).scroll(function(){
		setHeightOfVideo();
		// specifySection();
		if($("#pageDown").attr("data-section") == 5) {
			$("#pageDown").addClass("pageUp");
		} else $("#pageDown").removeClass("pageUp");
	});

	$(window).resize(function() {
		setHeightOfVideo()
	})

	//percent motion
	// percent_82 = getCircleLoader('#percent_82');
	// percent_92 = getCircleLoader('#percent_92');
	// percent_82.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
	// percent_82.text.style.fontSize = '2rem';

	// floating($('.media1'));
	// floating($('.media2'));
	// floating($('.media3'));
})

/************************ CLICK DOWN BUTTON *****************************/

function OLD_clickPageDown(e){
	if (e) e.preventDefault();

	var section_index = $(this).attr("data-section");
	if (section_index < 5) {
		var next_section = parseInt(section_index) + 1;
		$(this).attr("data-section", next_section);

		$('html, body').animate({
			scrollTop: $("div[section="+next_section+"]").offset().top + 5
		}, 500);
	} else {
		$(this).attr("data-section", 1);

		$('html, body').animate({
			scrollTop: 0
		}, 500);
	};
}

function clickPageDown(e){
	if (e) e.preventDefault();

	var section_index = $(this).attr("data-section");
	if (section_index < 5) {

		$('html, body').animate({
			//manage the pagination position
			scrollTop: (Math.round($(window).scrollTop() / window.innerHeight) +1 ) * window.innerHeight + $('header').height() - 10
		}, 500);
	} else {
		$(this).attr("data-section", 1);

		$('html, body').animate({
			scrollTop: 0
		}, 500);
	};
}

/************************ SECTION *****************************/

// function specifySection() {
// 	var window_top     = $(window).scrollTop();
// 	var top_space 	   = $('#sectionAbout').offset().top / 2;
// 	var about_top      = $('#sectionAbout').offset().top - top_space;
// 	var howItWork_top  = $('#sectionHowItWork').offset().top - top_space;
// 	var team_top       = $('#sectionTeam').offset().top - top_space;
// 	var getInTouch_top = $('#getInTouchForm').offset().top - top_space;
// 	var percent_top	   = $('#percent_92').offset().top;
//
// 	$('aside a').removeClass('active').removeClass('active-white').removeClass('active-blue');
// 	$('body').removeClass("bg-color-black bg-color-gray bg-color-pink")
//
// 	var duration = 300;
//
// 	//Show Header
// 	if (window_top >= about_top && window.innerWidth > 767) {
// 		$('#header').fadeOut(duration);
// 		$('#headerFixed').fadeIn(duration);
// 		$('aside').fadeIn(duration);
// 	} else {
// 		$('#header').fadeIn(duration);
// 		$('#headerFixed').fadeOut(duration);
// 		$('aside').fadeOut(duration);
// 	}
//
// 	//what is the current section
// 	var section_index = $('#pageDown').attr("data-section");
//
// 	//we need to select the good get in touch bouton with the right background color
// 	if (window_top < about_top) {
// 		$('#pageDown').attr("data-section", 1);
// 	} else if (window_top >= about_top && window_top < howItWork_top) {
//
// 		//************************************************************/
// 		//Percents animation when shown
// 		var distance_percent_top = percent_top - window_top
//
// 		if( distance_percent_top >= - $('#percent_92').height() * 0.3
// 		 && distance_percent_top < window.innerHeight * .7){
// 			  animatePercent()
// 		 }
// 		 //************************************************************/
//
// 		$('aside a[data-target="sectionAbout"]').addClass('active-white');
// 		$('#pageDown').attr("data-section", 2);
// 		$('body').addClass("bg-color-black");
//
// 	} else if (window_top >= howItWork_top && window_top < team_top) {
// 		$('aside a[data-target="sectionHowItWork"]').addClass('active-blue');
// 		$('#pageDown').attr("data-section", 3);
// 		$('body').addClass("bg-color-gray");
//
// 	} else if (window_top >= team_top && window_top < getInTouch_top) {
// 		$('aside a[data-target="sectionTeam"]').addClass('active-white');
// 		$('#pageDown').attr("data-section", 4);
// 		$('body').addClass("bg-color-pink");
//
// 	} else {
// 		$('body').addClass("bg-color-gray");
// 		$('#pageDown').attr("data-section", 5);
// 	}
// }


/************************ VIDEO *****************************/

//Define the video height
function setHeightOfVideo() {
	var rate = 9/16;
	var window_width = $(window).width();
	$('#carouselVideo').css("height", window_width*rate);
}


/************************ LOADER *****************************/
//Animate the percent loader
function animatePercent(){

	if (animateOnce && percent_82 && percent_92){
		percent_82.animate(0.82);
		percent_92.animate(0.92);
		animateOnce = false;
		console.log("animate percet")
	}
}

//Create a loader for the percent shown
function getCircleLoader(elt){
	return new ProgressBar.Circle(elt, {
	color: '#888',
	// This has to be the same size as the maximum width to
	// prevent clipping
	strokeWidth: 4,
	trailWidth: 1,
	easing: 'easeInOut',
	duration: 1400,
	text: {
		autoStyleContainer: false
	},
	from: { color: '#EB004F', width: 4 },
	to: { color: '#fff', width: 4 },
	// Set default step function for all animate calls
	step: function(state, circle) {
		circle.path.setAttribute('stroke', state.color);
		circle.path.setAttribute('stroke-width', state.width);

		var value = Math.round(circle.value() * 100);
		// if (value === 0) {
		// circle.setText('');
		// } else {
		// circle.setText(value+" %");
		// }

	}
	});
}

/************************ SIMPLE MAP FUNCTION *****************************/
// var mapValue = [];
// var mapHash = [];
//
// function getMap(div){
// 	var i = mapHash.indexOf(div);
//
// 	if (i < 0){
// 		mapHash.push(div);
// 		mapValue.push(0);
//
// 		return 0;
// 	}
//
// 	return mapValue[i];
// }
//
// function setMap(div, value){
// 	var i = mapHash.indexOf(div);
//
// 	if (i < 0){
// 		mapHash.push(div);
// 		mapValue.push(value);
// 	}else{
// 		 mapValue[i] = value;
// 	}
// }



/************************ ANIMATION *****************************/
const MAX_TIME 		= 10000;
const MAX_ANGLE 	= 25;
const MAX_HEIGHT 	= 30;
const MAX_WIDTH 	= 30;

function getDirection(){
	return  Math.random() < 0.5 ? "-=" : "+=" ;
}

function getAngle(){
	return getDirection() + Math.round(MAX_ANGLE * Math.random())
}

function getHeight(){
	return getDirection() + Math.round(MAX_HEIGHT * Math.random())
}

function getWidth(){
	return getDirection() + Math.round(MAX_WIDTH * Math.random())
}

function getTime(){
	return MAX_TIME * 0.5 + Math.round(MAX_TIME * 0.5 * Math.random())
}

function floating(div){
	div.animate({top: getHeight(), left: getWidth(), deg: getAngle()}, {
		duration : getTime(),
		// step: function(val, fx) {
		// 	if (fx.prop != 'deg' ) return;
        //     div.css({
        //        transform: 'rotate(' + val + 'deg)'
        //     });
        // },
		complete : function() {
			floating(div)
		}
	});
}
