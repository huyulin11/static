var rv = window.rv || {};
rv.requires = (function(){
	var _queue = [] ;
	var _current = {} ;
	var thisObject ; // used for changing scope 
	var defines = function(name,body,evaluate){
		if (arguments.length < 2){
			throw 'arguments\' length is expected to be not less than 2' ;
		}
		if (thisObject[name]){
			throw 'property ' + name + ' has been existed';
		}
		_current.name = name ;
		_current.evaluate = evaluate ;
		_current.body = body ;
		_queue.push(_current);
		load();
		return {
			'_queue' : _queue ,
			'_current': _current ,
			'defines' : defines 
		}
	}
	var load = function(){
		do{
			var length = _queue.length ;
			for(var i=0;i< _queue.length ;i++){
				var current = _queue[i];
				if (current && checkRequires(current.requires)){
					var property = (typeof current.body == 'function' && current.evaluate) ? 
							current.body.call(thisObject) : current.body ; 
					if (current.name && typeof current.name == 'string' && current.name.length > 0 ){
						if (current.name.startsWith('.')){
							thisObject[current.name.substring(1)] = property ;
						}else {
							thisObject[current.name] = property ;
						}
					}
					_queue.splice(i--,1);
				}
			}
		}while(length > _queue.length); // _queue array's length decreased
	}
	// check if all requirements is ready
	function checkRequires(requires){
		for(var i=0;i<requires.length;i++){
			if(!getObject(requires[i])){
				return false ;
			}
		}
		return true ;
	}
	
	// input classname 'a.b.c' ,return the instance 'a.b.c'
	// If input '.b.c' ,means 'this.b.c',return instance this.b.c
	// Else if this scope and window scope both have 'a.b.c' , then return instance this.a.b.c .
	// however,if just input 'a'(not contains '.'),do the same logic here
	function getObject(classname){
		var classArr = classname.split(".");
		if (classArr.length == 1 ){
			return thisObject[classname] || window[classname] ;
		}else if ( classArr[0] == '' ){ 
			// case 1: classname = '*' (not contain '.')
			// case 2: classname = '.*.*' 
			return getInstance(thisObject,classArr.splice(1));// be careful : classArr change here
		}
		return getInstance(thisObject,classArr) || getInstance(window,classArr);
	}
	// input classname 'a.b.c' ,return the instance 'a.b'
	// If input '.b.c' ,means 'this.b.c',return instance this.b 
	// Else if this scope and window scope both have 'a.b.c' , then return instance this.a.b .
	// however,if just input 'a'(not contains '.'),do the same logic here
	function getNamespace(classname){ 
		var classArr = classname.split(".");
		if (classArr.length == 1){
			return thisObject[classname] ? thisObject : 
					window[classname] ? window : null ;
		}
		var PackageArr = classname.split(".").splice(0,classArr.length - 1) ;
		if (classArr[0] == ''){ 
			return getInstance(thisObject,PackageArr);
		} 
		// here: suppose input classname 'a.b.c' 
		// this logic means that if this scope has a.b.c ,return instance this.a.b.
		//     if not ,then check it in global scope window
		if (getInstance(thisObject,classArr)){
			return getInstance(thisObject,PackageArr);
		}else if (getInstance(window,classArr)){
			return getInstance(window,PackageArr);
		}else{
			return null ;
		}
	}
	function getInstance(scope,arr){ // e.g: getInstance(window,['Array','bind']) 
		if (scope && arr.length == 1){
			return scope[arr[0]] ;
		}
		if (!scope[arr[0]]){
			return null ;
		}
		return getInstance(scope[arr[0]],arr.splice(1));
	}
	
	return function(requires){
		_current = {
			name : undefined ,
			requires : Array.prototype.slice.call(arguments),
			evaluate : undefined,
			body : undefined 
		}
		thisObject = this ;
		return {
			'_queue' : _queue ,
			'_current': _current ,
			'defines' : defines ,
			'load' : load
		}
	}
})();

/*
rv.requires().defines('.fun1',function(){
	console.log("evaluate fun1");
	return function(){
		console.log("This\'s fun1");
	}
},true)
rv.requires(".fun4").defines('.fun2',function(){
	console.log("evaluate fun2");
	return function(){
		console.log("This\'s fun1");
	}
},true)
rv.requires(".fun1",".fun2").defines('.fun3',function(){
	console.log("evaluate fun3");
	return function(){
		console.log("This\'s fun1");
	}
},true)
rv.requires(".fun1").defines('.fun4',function(){
	console.log("evaluate fun4");
	return function(){
		console.log("This\'s fun1");
	}
},true)


var a = {
	'name' : 'a' ,
	'b' : {
		'name' : 'b' ,
		'c' : {
			'name' : 'd' ,
			'd' : 1 
		}
	}
}
rv.requires.call(a,'a');

*/