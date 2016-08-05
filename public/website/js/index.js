/**
 * index.js
 * @date 2016-07-18
 * @author SongCR
 */

$(function(){
	$("#audio,#audio1,#video").addClass('load');
	$(".play1").click(function(){
		$('.bg_ph').css("background","url(img/iphone2.png)center no-repeat");
		$('.bg_ph').css("background-size","100% 100%");
		$(".adv_line1").css("border-top","1px solid #F18181");
		$(".r_spot1,.adv_bg").show();
		$(".adv_line,.adv_line2").css("border-top","1px solid #E6E6E6");
		$(".r_spot,.r_spot2,#video").hide();
		if ($('#audio').hasClass('load'))
		{
			$("#audio").trigger("play");
			$('#audio').removeClass('load');
			$('#audio').addClass('play');
			$("#audio1,#video").trigger("load");
			$('#audio1,#video').removeClass('play');
			$('#audio1,#video').addClass('load');
		}
		else
		{
			$("#audio").trigger("play");
			$('#audio').removeClass('load');
			$('#audio').addClass('play');
			$("#audio1,#video").trigger("load");
			$('#audio1,#video').removeClass('play');
			$('#audio1,#video').addClass('load');
		}
	})

	$(".play").click(function(){
		$('.bg_ph').css("background","url(img/iphone2.png)center no-repeat");
		$('.bg_ph').css("background-size","100% 100%");
		$(".adv_line").css("border-top","1px solid #F18181");
		$(".r_spot").show();
		$(".adv_line1,.adv_line2").css("border-top","1px solid #E6E6E6");
		$(".r_spot1,.r_spot2,.adv_bg,#video").hide();
		if ($('#audio1').hasClass('load'))
		{
			$("#audio1").trigger("play");
			$('#audio1').removeClass('load');
			$('#audio1').addClass('play');
			$("#audio,#video").trigger("load");
			$('#audio,#video').removeClass('play');
			$('#audio,#video').addClass('load');
		}
		else
		{
			$("#audio1").trigger("play");
			$('#audio1').removeClass('load');
			$('#audio1').addClass('play');
			$("#audio,#video").trigger("load");
			$('#audio,#video').removeClass('play');
			$('#audio,#video').addClass('load');
		}
	})

	$(".play2").click(function(){
		$('.bg_ph').css("background","url(img/iphone1.png)center no-repeat");
		$('.bg_ph').css("background-size","100% 100%");
		$(".adv_line2").css("border-top","1px solid #F18181");
		$(".r_spot2,#video").show();
		$(".adv_line1,.adv_line").css("border-top","1px solid #E6E6E6");
		$(".r_spot,.adv_bg,.r_spot1").hide();

		if ($('#video').hasClass('load'))
		{
			$("#video").trigger("play");
			$('#video').removeClass('load');
			$('#video').addClass('play');
			$("#audio1").trigger("load");
			$('#audio1').removeClass('play');
			$('#audio1').addClass('load');
			$("#audio").trigger("load");
			$('#audio').removeClass('play');
			$('#audio').addClass('load');
		}
		else
		{
			$("#video").trigger("play");
			$('#video').removeClass('load');
			$('#video').addClass('play');
			$("#audio1").trigger("load");
			$('#audio1').removeClass('play');
			$('#audio1').addClass('load');
			$("#audio").trigger("load");
			$('#audio').removeClass('play');
			$('#audio').addClass('load');

		}
	})

	var intDiff =14;//倒计时总秒数量
	var	f1;
	function timer1(a){
		window.clearInterval(f1);
		f1 = window.setInterval(function(){
		$('#second_show1').html('<s></s>'+intDiff);
		intDiff = a--;
		if(intDiff <10){
			$('#second_show1').html( '0'+'<s></s>'+intDiff);
		}

			if (intDiff == 0) {
				$(".adv_bg").hide();
				$(".stop_btn").hide();
				window.clearInterval(f1);
				intDiff =14;
			}
		}, 1000);
	}

	var intDiff2 = 14;//倒计时总秒数量
	var	f2;
	function timer2(a){
	window.clearInterval(f2);
	f2 = window.setInterval(function(){
		$('#second_show2').html('<s></s>'+a);
		intDiff2 = a--;
		if(intDiff2 <10){
			$('#second_show2').html( '0'+'<s></s>'+a);
		}
			if (intDiff2 == 0) {
				$('.countdown_a,.countdown_b,.vid').hide();
				$('.bg_ph').css("background","url(img/iphone.png)center no-repeat");
				$('.bg_ph').css("background-size","100% 100%");
				window.clearInterval(f2);
				intDiff2 = 14;
			}
		}, 1000);
	}
	$(".play1").click(function(){
		if(intDiff==14){
			timer1(intDiff);
			$('#second_show1').html("15");
		}
			$('.countdown_a,.countdown_b').hide();
			window.clearInterval(f2);
			intDiff2 =14;

	});

	$(".play2").click(function(){
		if(intDiff2==14){
			timer2(intDiff2);
			$('#second_show2').html("15");
		}
		intDiff =14;
		$('.countdown_a,.countdown_b').show();
		window.clearInterval(f1);

	});
	$(".play").click(function(){
		window.clearInterval(f2);
		window.clearInterval(f1);
		$('.countdown_a,.countdown_b').hide();
		intDiff =14;
		intDiff2 =14;
	});

//此处引用：鼠标滚轮mousewheel插件
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

	var i=0;
	var $btn = $('.section-btn li'),
		$wrap = $('.section-wrap'),
		$arrow = $('.arrow');
	/*当前页面赋值*/
	function up(){i++;if(i==$btn.length){i=0};}
	function down(){i--;if(i<0){i=$btn.length-1};}
	/*页面滑动*/
	function run(){
		$btn.eq(i).addClass('on').siblings().removeClass('on');
		$wrap.attr("class","section-wrap").addClass(function() { return "put-section-"+i; }).find('.section').eq(i).find('.title').addClass('active');
		if(i!=6){
			$("#audio1,#audio,#video").trigger("load");
			$('#audio1,#audio,#video').removeClass('play');
			$('#audio1,#audio,#video').addClass('load');
			$(".r_spot,.adv_bg,.r_spot1").hide();
			$(".countdown_a,.r_spot2,#video,.countdown_b").hide();
			$('.bg_ph').css("background","url(img/iphone2.png)center no-repeat");
			window.clearInterval(f1);
			window.clearInterval(f2);
		}
	};

	/*右侧按钮点击*/
	$btn.each(function(index) {
		$(this).click(function(){
			i=index;
			run();
		})
	});

	/*翻页按钮点击*/
	$arrow.one('click',go);
	function go(){
		up();run();
		setTimeout(function(){$arrow.one('click',go)},1000)
	};

	/*响应鼠标*/
	$wrap.one('mousewheel',mouse_);
	function mouse_(event){
		if(event.deltaY<0) {up()}
		else{down()}
		run();
		setTimeout(function(){$wrap.one('mousewheel',mouse_)},1000)
	};

	/*响应键盘上下键*/
	$(document).one('keydown',k);
	function k(event){
		var e=event||window.event;
		var key=e.keyCode||e.which||e.charCode;
		switch(key)	{
			case 38: down();run();
			break;
			case 40: up();run();
			break;
		};
		setTimeout(function(){$(document).one('keydown',k)},1000);
	}
});
									