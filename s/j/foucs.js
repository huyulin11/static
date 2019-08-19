var foucsbox = function(time) {
	time = time || 2500;
	var T = function(id) {
		return document.getElementById(id);
	};
	var topCon = T('divimgplay');
	var big = T('divimginfog_imgPlayer');
	var samll = T('divpageinfog_imgPlayer');
	var tip = T('ptitleg_imgPlayer');
	var bigimgs = big.getElementsByTagName('li');
	var samllimgs = samll.getElementsByTagName('li');
	var imglink = tip.getElementsByTagName('a')[0];
	var slide = function(z) {
		samllimgs[lastIndex].className = '';
		samllimgs[z].className = 'current';
		bigimgs[lastIndex].style.display = 'none';
		bigimgs[z].style.display = 'block';
		try {
			imglink.innerHTML = samllimgs[z].getElementsByTagName('img')[0].alt;
		} catch (e) {
			imglink.innerText = samllimgs[z].firstChild.firstChild.alt;
		}
		lastIndex = i = z;
	};
	var helper = function(z) {
		return function(e) {
			var na;
			if (!e) {
				e = window.event;
				na = e.srcElement.nodeName;
			} else {
				na = e.target.nodeName;
			}
			if (na === 'IMG') {
				slide(z);
			}
		};
	};
	var lastIndex = i = 0, x, y = bigimgs.length;
	var getPrevI = function(q) {
		return i - q < 0 ? y - q : i - 1;
	};
	var getNextI = function(q) {
		return i + q >= y ? i + q - y : i + 1;
	};
	var s = setInterval(function() {
		slide(i);
		i = getNextI(1);
	}, time);
	try {
		imglink.innerText = samllimgs[0].getElementsByTagName('img')[0].alt;
	} catch (e) {
		imglink.innerText = samllimgs[0].firstChild.firstChild.alt;
	}
	for (x = 1; x < y; x += 1) {
		bigimgs[x].style.display = 'none';
	}
	for (x = 0; x < y; x += 1) {
		samllimgs[x].onmouseover = helper(x);
	}
	topCon.children[2].onclick = function(e) {
		i = lastIndex;
		var t;
		if (!e) {
			e = window.event;
			t = e.srcElement;
		} else {
			t = e.target;
		}
		switch (t.className) {
		case 'icon_prev':
			slide(getPrevI(1));
			break;
		case 'icon_next':
			slide(getNextI(1));
			break;
		}
	};
	topCon.onmouseover = function() {
		clearInterval(s);
	};
	topCon.onmouseout = function() {
		s = setInterval(function() {
			slide(i);
			i = getNextI(1);
		}, time);
	};
};