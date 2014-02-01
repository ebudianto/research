if(typeof htmlElements == 'undefined') {
	function myStrictCompare(arg1, arg2) {
		var argValue1 = arg1,
			argValue2 = arg2;
		if (arg1 instanceof String && arg1.hasOwnProperty("instrumented")) {
			argValue1 = arg1.toString();
		}
		if (arg2 instanceof String && arg2.hasOwnProperty("instrumented")) {
			argValue2 = arg2.toString();
		}
		return argValue1 === argValue2;
	}

	function myStrictNotCompare(arg1, arg2) {
		var argValue1 = arg1,
			argValue2 = arg2;
		if (arg1 instanceof String && arg1.hasOwnProperty("instrumented")) {
			argValue1 = arg1.toString();
		}
		if (arg2 instanceof String && arg2.hasOwnProperty("instrumented")) {
			argValue2 = arg2.toString();
		}
		return argValue1 !== argValue2;
	}

	function myCompare(arg1, arg2) {
		var argValue1 = arg1,
			argValue2 = arg2;
		if (arg1 instanceof String && arg1.hasOwnProperty("instrumented")) {
			argValue1 = arg1.toString();
		}
		if (arg2 instanceof String && arg2.hasOwnProperty("instrumented")) {
			argValue2 = arg2.toString();
		}
		return argValue1 == argValue2;
	}

	function myNotCompare(arg1, arg2) {
		var argValue1 = arg1,
			argValue2 = arg2;
		if (arg1 instanceof String && arg1.hasOwnProperty("instrumented")) {
			argValue1 = arg1.toString();
		}
		if (arg2 instanceof String && arg2.hasOwnProperty("instrumented")) {
			argValue2 = arg2.toString();
		}
		return argValue1 != argValue2;
	}

	function mytypeof(arg) {
		if (arg instanceof String && arg.hasOwnProperty("instrumented")) return 'string';
		else return typeof arg;
	}

	function myInstanceof(arg1, arg2) {
		if (arg1 instanceof String && arg1.hasOwnProperty("instrumented")) {
			arg1 = arg1.toString();
		}
		return arg1 instanceof arg2;
	}

	function checkNative(functionString) {
		var len = functionString.length;
		if (functionString[--len] == '}' && functionString[--len] == " " && functionString[--len] == "]" && functionString[--len] == "e" && functionString[--len] == "d" && functionString[--len] == "o" && functionString[--len] == "c" && functionString[--len] == " " && functionString[--len] == "e" && functionString[--len] == "v" && functionString[--len] == "i" && functionString[--len] == "t" && functionString[--len] == "a" && functionString[--len] == "n") {
			return true;
		}
		return false;
	}
	//mostly will be combining two ranges only i think
	function combineRanges(ranges) {
		var combinedRange;
		var range1 = ranges.pop(),
			range2 = ranges.pop();
		// console.log('combining ' + range1 + ' and ' + range2); 
		// console.log(new Error().stack);
		for (ini_i = 0; ini_i < range2.range.length; ini_i++) {
			range2.range[ini_i][0] += range1.rangelength;
			range2.range[ini_i][1] += range1.rangelength;
		}
		combinedRange = {
			rangelength: (range1.rangelength + range2.rangelength),
			range: range1.range.concat(range2.range)
		};
		ranges.push(combinedRange);
		return ranges;
	}

	htmlElements = ['HTMLAnchorElement', 'HTMLAreaElement', 'HTMLAudioElement', 'HTMLBaseElement', 'HTMLBodyElement', 'HTMLBRElement', 'HTMLButtonElement', 'HTMLCanvasElement', 'HTMLDataElement', 'HTMLDataListElement', 'HTMLDivElement', 'HTMLDListElement', 'HTMLElement', 'HTMLEmbedElement', 'HTMLFieldSetElement', 'HTMLFormElement', 'HTMLHeadElement', 'HTMLHeadingElement', 'HTMLHtmlElement', 'HTMLHRElement', 'HTMLIFrameElement', 'HTMLImageElement', 'HTMLImageElement', 'HTMLInputElement', 'HTMLKeygenElement', 'HTMLLabelElement', 'HTMLLegendElement', 'HTMLLIElement', 'HTMLLinkElement', 'HTMLMapElement', 'HTMLMediaElement', 'HTMLMetaElement', 'HTMLMeterElement', 'HTMLModElement', 'HTMLObjectElement', 'HTMLOListElement', 'HTMLOListElement', 'HTMLOptGroupElement', 'HTMLOptionElement', 'HTMLOutputElement', 'HTMLOutputElement', 'HTMLParagraphElement', 'HTMLParamElement', 'HTMLPreElement', 'HTMLProgressElement', 'HTMLQuoteElement', 'HTMLScriptElement', 'HTMLSelectElement', 'HTMLSourceElement', 'HTMLSpanElement', 'HTMLStyleElement', 'HTMLTableElement', 'HTMLTableCaptionElement', 'HTMLTableCellElement', 'HTMLTableDataCellElement', 'HTMLHeaderCellElement', 'HTMLTableColElement', 'HTMLTableRowElement', 'HTMLTableSectionElement', 'HTMLTextAreaElement', 'HTMLTimeElement', 'HTMLTitleElement', 'HTMLTrackElement', 'HTMLUListElement', 'HTMLUnknownElement', 'HTMLVideoElement'];
	memberExpressionsSources = {
		'cookie': ['HTMLDocument'],
		'lastModified': ['HTMLDocument'],
		'referrer': ['HTMLDocument'],
		'title': ['HTMLDocument'],
		'URL': ['HTMLDocument'],
		'URLUnencoded': ['HTMLDocument'],
		'domain': ['HTMLDocument'],
		'baseURI': ['HTMLDocument'],
		//global stuff
		'defaultStatus': ['Window'],
		'status': ['Window'],
		'location': ['Window', 'HTMLDocument'],
		'opener': ['Window'],
		'parent': ['Window'],
		'top': ['Window'],
		'content': ['Window'],
		'self': ['Window'],
		'frames': ['Window'],
		'dialogArguments': ['Window'],
		'localStorage': ['Window'],
		'sessionStorage': ['Window'],

		'hash': ['Location', 'HTMLAnchorElement'],
		'host': ['Location', 'HTMLAnchorElement'],
		'hostname': ['Location', 'HTMLAnchorElement'],
		'href': ['Location', 'HTMLAnchorElement'],
		'pathname': ['Location', 'HTMLAnchorElement'],
		// 'port': ['Location', 'HTMLAnchorElement'], //port is anyway a number so wont get tainted, so removing it
		'protocol': ['Location', 'HTMLAnchorElement'],
		'search': ['Location', 'HTMLAnchorElement'],
		'toString': ['Location', 'HTMLAnchorElement', 'HTMLInputElement'],
		'checked': ['HTMLInputElement'],
		'defaultChecked': ['HTMLInputElement'],
		'defaultValue': ['HTMLInputElement'],
		'name': ['HTMLInputElement', 'Window'],
		'selectedIndex': ['HTMLInputElement'],
		'value': ['HTMLInputElement', 'HTMLSelectElement'],
		'defaultSelected': ['HTMLSelectElement'],
		'selected': ['HTMLSelectElement'],
		'text': ['HTMLSelectElement'],
		'action': ['HTMLFormElement'],
		'getAllResponseHeaders': ['XMLHttpRequest'],
		'responseText': ['XMLHttpRequest'],
		'responseXML': ['XMLHttpRequest'],
		'message': ['Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'],
		'data':['MessageEvent'],
		//actarus
		//'innerText': htmlElements
		'innerHTML': htmlElements
	};
	functionSources = [prompt, showModalDialog, HTMLElement.prototype.getAttribute];

	functionSinks = [document.write, document.writeln, document.create,
		eval, setTimeout, setInterval,
		location.assign, location.replace,
		String.prototype.match,
		String.prototype.anchor, String.prototype.big, String.prototype.blink, String.prototype.bold, String.prototype.fixed, String.prototype.fontcolor, String.prototype.fontsize, String.prototype.italics, String.prototype.link, String.prototype.small, String.prototype.strike, String.prototype.sub, String.prototype.sup,
		window.execScript, document.execCommand, document.evaluate, document.selectNodes,
		window.attachEvent, document.attachEvent,
		XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.setRequestHeader, XMLHttpRequest.prototype.getResponseHeader,
		window.showModalDialog, window.open, window.openDialog,
		RegExp,
		HTMLElement.prototype.insertAdjacentHTML
	];
	taintedSinks = {
		'location': ['Window', 'HTMLDocument'],
		'src': htmlElements, //actarus says allelements, before oly script element
		'text': ['HTMLScriptElement'],
		'textContent': ['HTMLScriptElement'],
		'innerText': ['HTMLScriptElement'],
		'cookie': ['HTMLDocument'],
		'href': ['Location'],
		'pathname': ['Location'],
		'search': ['Location'],
		'protocol': ['Location'],
		'hostname': ['Location'],
		'value': ['HTMLButtonElement'],
		'innerHTML': htmlElements,
		'outerHTML': htmlElements,
		'onafterprint': ['HTMLBodyElement'],
		'onbeforeprint': ['HTMLBodyElement'],
		'onbeforeunload': ['HTMLBodyElement'],
		'onerror': htmlElements,
		'onhaschange': ['HTMLBodyElement'],
		'onload': ['HTMLBodyElement'],
		'onmessage': ['HTMLBodyElement'],
		'onoffline': ['HTMLBodyElement'],
		'ononline': ['HTMLBodyElement'],
		'onpagehide': ['HTMLBodyElement'],
		'onpageshow': ['HTMLBodyElement'],
		'onpopstate': ['HTMLBodyElement'],
		'onredo': ['HTMLBodyElement'],
		'onresize': ['HTMLBodyElement'],
		'onstorage': ['HTMLBodyElement'],
		'onundo': ['HTMLBodyElement'],
		'onunload': ['HTMLBodyElement'],
		'onblur': htmlElements,
		'onchange': htmlElements,
		'oncontextmenu': htmlElements,
		'onfocus': htmlElements,
		'onformChange': ['HTMLFormElement'],
		'onforminput': ['HTMLFormElement'],
		'oninput': htmlElements,
		'oninvalid': htmlElements,
		'onreset': htmlElements,
		'onselect': htmlElements,
		'onsubmit': htmlElements,
		'onkeydown': htmlElements,
		'onkeypress': htmlElements,
		'onkeyup': htmlElements,
		'onclick': htmlElements,
		'ondbclick': htmlElements,
		'ondrag': htmlElements,
		'ondragend': htmlElements,
		'ondragenter': htmlElements,
		'ondragleave': htmlElements,
		'ondragover': htmlElements,
		'ondragstart': htmlElements,
		'ondrop': htmlElements,
		'onmousedown': htmlElements,
		'onmousemove': htmlElements,
		'onmouseout': htmlElements,
		'onmouseover': htmlElements,
		'onmouseup': htmlElements,
		'onmousewheel': htmlElements,
		'onscroll': htmlElements,
		//media
		'onabort': htmlElements,
		'oncanplay': htmlElements,
		'oncanplaythrough': htmlElements,
		'ondurationchange': htmlElements,
		'onemptied': htmlElements,
		'onended': htmlElements,
		'onloadeddata': htmlElements,
		'onloadedmetadata': htmlElements,
		'onloadstart': htmlElements,
		'onpause': htmlElements,
		'onplay': htmlElements,
		'onplaying': htmlElements,
		'onprogress': htmlElements,
		'onratechage': htmlElements,
		'onreadystatechange': htmlElements,
		'onseeked': htmlElements,
		'onseeking': htmlElements,
		'onstalled': htmlElements,
		'onsuspend': htmlElements,
		'ontimeupdate': htmlElements,
		'onvolumechange': htmlElements,
		'onwaiting': htmlElements,
		//other
		'action': ['HTMLFormElement'],
		'loadXML': ['ActiveXObject'],
		//actarus
		'title': ['HTMLDocument'],
		'background': ['CSSStyleDeclaration']
	};

	Object.defineProperty(Function.prototype, 'myCall', {
		enumerable: false,
		writable: true,
		value: Function.prototype.call
	});
	Object.defineProperty(Function.prototype, 'myBind', {
		enumerable: false,
		writable: true,
		value: Function.prototype.bind
	});
	Object.defineProperty(Array.prototype, 'myIndexof', {
		enumerable: false,
		writable: true,
		value: Array.prototype.indexOf
	});
	Object.defineProperty(Function.prototype, 'myApply', {
		enumerable: false,
		writable: true,
		value: Function.prototype.apply
	});
	myStringifyIni = JSON.stringify;
	/*
'document': body
//addeventlistener?
*/
}
