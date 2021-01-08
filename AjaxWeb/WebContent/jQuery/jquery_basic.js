console.log('first');
		$(document).ready(function () {
			console.log('second');
		console.log(document.getElementById('food_1').childNodes[1].childNodes[0].nodeValue);
		console.log($('#food_1').children().eq(0).html()); 
		//jquery로 id값 food_1의 children()의 첫번째 값의 html값 (.html() => .innerHTML)
		$('#food_1>ul>li').eq(0).css('background','red');
		$('#food_1>ul>li').eq(1).html('bulgogi'); // innerHTML 속성에 ()속 값을 넣는것
		});  //document('../js/jquery-3.5.1.min.js)를 다 읽어온 다음에 ()안 기능을 실행하세요.
		console.log('third');