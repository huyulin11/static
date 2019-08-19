//滚动
function marquee(i, direction)
{
	var obj = document.getElementById("marquee" + i);
	var obj1 = document.getElementById("marquee" + i + "_1");
	var obj2 = document.getElementById("marquee" + i + "_2");

	if (direction == "up")
	{
		if (obj2.offsetTop - obj.scrollTop <= 0)
		{
			obj.scrollTop -= (obj1.offsetHeight + 20);
		}
		else
		{
			var tmp = obj.scrollTop;
			obj.scrollTop++;
			if (obj.scrollTop == tmp)
			{
				obj.scrollTop = 1;
			}
		}
	}
	else
	{
		if (obj2.offsetWidth - obj.scrollLeft <= 0)
		{
			obj.scrollLeft -= obj1.offsetWidth;
		}
		else
		{
			obj.scrollLeft++;
		}
	}
}

function marqueeStart(i, direction)
{
	var obj = document.getElementById("marquee" + i);
	var obj1 = document.getElementById("marquee" + i + "_1");
	var obj2 = document.getElementById("marquee" + i + "_2");

	obj2.innerHTML = obj1.innerHTML;
	var marqueeVar = window.setInterval("marquee("+ i +", '"+ direction +"')", 20);
	obj.onmouseover = function(){window.clearInterval(marqueeVar);}
	obj.onmouseout = function(){marqueeVar = window.setInterval("marquee("+ i +", '"+ direction +"')", 20);}
}

//搜索相关
function searchSubmit()
{
	var obj = document.searchForm;

	if (obj.search.value == "")
	{
		obj.search.focus();
		return;
	}

	obj.submit();
}

//下拉菜单相关
var navCurrentId = "";
function showMenu(id)
{
	var objMenu = document.getElementById("menu" + id);
	objMenu.style.visibility = "visible";

	var objMenuA = document.getElementById("menuA" + id);
	if (objMenuA.className == "current")
	{
		navCurrentId = objMenuA.id;
	}
	else
	{
		objMenuA.className = "current";
	}
}

function hiddMenu(id)
{
	var objMenu = document.getElementById("menu" + id);
	objMenu.style.visibility = "hidden";

	var objMenuA = document.getElementById("menuA" + id);
	if (objMenuA.id != navCurrentId)
	{
		objMenuA.className = "";

	}
}

//显示或隐藏语言版下拉框
function languageOver()
{
	var obj = document.getElementById("lbox");
	obj.style.display = "block";
}
function languageOut(theEvent)
{
	var obj = document.getElementById("lbox");
	obj.style.display = "none";
}

//屏蔽右键相关
var jsArgument = document.getElementsByTagName("script")[document.getElementsByTagName("script").length-1].src;	//获取传递的参数
rightButton = jsArgument.substr(jsArgument.indexOf("rightButton=") + "rightButton=".length, 1);
if (rightButton == "1")
{
	document.oncontextmenu = function(e){return false;}
	document.onselectstart = function(e){return false;}
	if (navigator.userAgent.indexOf("Firefox") > 0)
	{
		document.writeln("<style>body {-moz-user-select: none;}</style>");
	}
}

//设置字体大小
function setFontSize(size)
{
	var obj = document.getElementById("info_content");
	if (obj)
	{
		obj.style.fontSize = size + "px";
	}
}

//预定义动画有关
function bannerShow(mode, flashWidth, flashHeight, bgcolor, defaultBannerId)
{
	if (mode == "3D")
	{
		var flashVars = "&xml=banner/banner.asp?defaultBannerId=" + defaultBannerId;

		document.write('<div style="width:' + flashWidth + 'px;margin:0 auto;">');
		document.write('<object id="banner" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + flashWidth + '" height="' + flashHeight + '" align="left" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="FlashVars" value="flashVars=' + flashVars + '" /> <param name="movie" value="banner/banner' + mode + '.swf" /> <param name="quality" value="high" /> <param name="play" value="true" /> <param name="loop" value="true" /> <param name="scale" value="noscale" /> <param name="wmode" value="transparent" /> <param name="devicefont" value="false" /> <param name="bgcolor" value="' + bgcolor + '" /> <param name="menu" value="true" /> <param name="allowFullScreen" value="false" /> <param name="allowScriptAccess" value="sameDomain" /> <param name="salign" value="lt" /> <embed name="banner" FlashVars="flashVars=' + flashVars + '" width="' + flashWidth + '" height="' + flashHeight + '" src="banner/banner' + mode + '.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" align="left" play="true" loop="true" scale="noscale" wmode="transparent" devicefont="false" bgcolor="' + bgcolor + '" menu="true" allowFullScreen="false" allowScriptAccess="sameDomain" salign="lt" type="application/x-shockwave-flash" > </embed> </object>');
		document.write('</div>');
	}
	else if (mode == 5)
	{	
		var html = $.ajax({url: "banner/banner.asp?mode=js&defaultBannerId=" + defaultBannerId, async: false}).responseText;
		document.write(html);
	}
	else if (mode == 6)
	{	
		var html = $.ajax({url: "../banner/banner.asp?mode=jsMobile&defaultBannerId=" + defaultBannerId, async: false}).responseText;
		document.write(html);
	}
	else if (mode == 7)
	{	
		var html = $.ajax({url: "banner/banner.asp?mode=jsbanner&defaultBannerId=" + defaultBannerId, async: false}).responseText;
		document.write(html);
	}
	else
	{
		var flashVars = "&xml=banner/banner.asp?defaultBannerId=" + defaultBannerId;

		document.write('<div style="width:' + flashWidth + 'px;margin:0 auto;">');
		document.write('<object id="banner" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + flashWidth + '" height="' + flashHeight + '" align="left" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="FlashVars" value="flashVars=' + flashVars + '" /> <param name="movie" value="banner/banner' + mode + '.swf" /> <param name="quality" value="high" /> <param name="play" value="true" /> <param name="loop" value="true" /> <param name="scale" value="noscale" /> <param name="wmode" value="transparent" /> <param name="devicefont" value="false" />  <param name="menu" value="true" /> <param name="allowFullScreen" value="false" /> <param name="allowScriptAccess" value="sameDomain" /> <param name="salign" value="lt" /> <embed name="banner" FlashVars="flashVars=' + flashVars + '" width="' + flashWidth + '" height="' + flashHeight + '" src="banner/banner' + mode + '.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" align="left" play="true" loop="true" scale="noscale" wmode="transparent" devicefont="false" menu="true" allowFullScreen="false" allowScriptAccess="sameDomain" salign="lt" type="application/x-shockwave-flash" > </embed> </object>');
		document.write('</div>');
	}
}

function setHome(obj, vrl)
{
	try
	{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(vrl);
	}
	catch(e)
	{
		if(window.netscape)
		{
			try 
			{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch (e) 
			{
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
			return;
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', vrl);

		}
	}
} 

function addFavorite(sURL, sTitle)
{
	try
	{
		window.external.addFavorite(sURL, sTitle);
	}
	catch (e)
	{
		try
		{
			window.sidebar.addPanel(sTitle, sURL, "");
		}
		catch (e)
		{
			alert("您使用的浏览器不支持此功能，请使用Ctrl+D进行添加");
		}
	}
}
$(window).scroll(function(){if($(window).scrollTop()>120){$('#pageTop').fadeIn();}else{$('#pageTop').fadeOut();}});
$(document).ready(function(){
	//judge browser
	if ($.browser.msie&&$.browser.version<6){
	$('#tips').html('<div style="border:1px solid #E3AE47;background:#FFEF81;padding:10px;">您现在使用的浏览器版本较低，有可能导致部分功能不能使用，<a href="http://dlc2.pconline.com.cn/filedown_49581_6850103/amItNHax/bdbrowser_setup.exe" target="_black">点此升级浏览器！</a></div>').css({'padding':'8px','text-align':'center'})
	return;
}
});
