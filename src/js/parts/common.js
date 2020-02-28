/* метод установки класса для body */
function setBodyClass(_class) {
	setTimeout(() => {
		document.body.classList.add(_class);
	}, 200);
}
/* метод удаления класса у элемента */
function removeClass(elem, deleteClass) {
	$(elem).removeClass(deleteClass);
}

/* метод проверки ширины экрана */
function checkWidthScreen(operator, width) {
	var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	switch(operator) {
		case ">":
			return screenWidth >= width ? true : false;
		case "<":
			return screenWidth <= width ? true : false;
	}
}

/* Метод для получения высоты/ширины экрана */
let getScreen = {
	width: function() {
		var viewportwidth;
		if (typeof window.innerWidth != 'undefined') {
			viewportwidth = window.innerWidth;
		} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
			viewportwidth = document.documentElement.clientWidth;
		} else {
			viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
		}
		return viewportwidth;
	},
	height: function() {
		var viewportheight;
		if (typeof window.innerHeight != 'undefined') {
			viewportheight = window.innerHeight
		} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientHeight != 'undefined' && document.documentElement.clientHeight != 0) {
			viewportheight = document.documentElement.clientHeight
		} else {
			viewportheight = document.getElementsByTagName('body')[0].clientHeight
		}
		return viewportheight;
	}
}

/* Метод для получения высоты/ширины элемента */
let getElement = {
	searchElement: function(elemName) {
		return document.querySelector(elemName);
	},
	width: function(elemName) {
		if(typeof elemName != "object") {
			let elem = getElement.searchElement(elemName);
			if(elem) {
				return elem.clientWidth;
			}
		} else if(typeof elemName == "object") {
			return elemName.clientWidth;
		}
		return;
	},
	height: function(elemName) {
		if(typeof elemName != "object") {
			let elem = getElement.searchElement(elemName);
			if(elem) {
				return elem.clientHeight;
			}
		} else if(typeof elemName == "object") {
			return elemName.clientHeight;
		}
		return;
	}
}

function getScrollbarSize() { // получение ширины скролла
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

let bodyScrollInit = {
	body: document.body,
	scrollTopBody: null,
	hideScroll: function() {
		bodyScrollInit.scrollTopBody = window.pageYOffset;
		bodyScrollInit.body.style.position = 'fixed';
		if (hasScrollbar()) {
		// с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
			bodyScrollInit.body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
		} else {
			bodyScrollInit.body.style.width = '100%';
		}
		bodyScrollInit.body.style.top = -bodyScrollInit.scrollTopBody + 'px';
	},
	showScroll: function() {
		bodyScrollInit.body.style.position = '';
		bodyScrollInit.body.style.top = '';
		bodyScrollInit.body.style.width = '';
		window.scroll(0, bodyScrollInit.scrollTopBody);
	}
}
function toggleScrollScreen() {
	document.body.classList.toggle('no-scroll');
	bodyScroll();
}
function bodyScroll() {
	var noScroll = document.querySelector(".no-scroll");
	if(noScroll) {
		bodyScrollInit.hideScroll();
	} else {
		bodyScrollInit.showScroll();
	}
}
function hasScrollbar() { // проверка на боковой скролл
    return document.body.scrollHeight > document.body.clientHeight;
}

window.scrollPostById = (function () {
	var timer, start, factor;
	
	return function (target, duration) {
	  var offset = window.pageYOffset,
		  delta  = target - window.pageYOffset; // Y-offset difference
		duration = duration || 1000;              // default 1 sec animation
		start = Date.now();                       // get start time
		factor = 0;
	  
	  if( timer ) {
		clearInterval(timer); // stop any running animations
	  }
	  
	  function step() {
		var y;
		factor = (Date.now() - start) / duration; // get interpolation factor
		if( factor >= 1 ) {
		  clearInterval(timer); // stop animation
		  factor = 1;           // clip to max 1.0
		} 
		y = factor * delta + offset;
		window.scrollBy(0, y - window.pageYOffset);
	  }
	  
	  timer = setInterval(step, 10);
	  return timer;
	};
}());