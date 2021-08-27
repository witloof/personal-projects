/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
;
/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.1'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.1'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.1'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var delta = direction == 'prev' ? -1 : 1
    var activeIndex = this.getItemIndex(active)
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.1'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true,
    trigger: '[data-toggle="collapse"]'
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.find('> .panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this })

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.1'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.1'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (that.options.backdrop) that.adjustBackdrop()
      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .prependTo(this.$element)
        .on('click.dismiss.bs.modal', $.proxy(function (e) {
          if (e.target !== e.currentTarget) return
          this.options.backdrop == 'static'
            ? this.$element[0].focus.call(this.$element[0])
            : this.hide.call(this)
        }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    if (this.options.backdrop) this.adjustBackdrop()
    this.adjustDialog()
  }

  Modal.prototype.adjustBackdrop = function () {
    this.$backdrop
      .css('height', 0)
      .css('height', this.$element[0].scrollHeight)
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.1'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
    this.arrow()
      .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isHorizontal ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.tooltip')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.tooltip', (data = {}))
        if (!data[selector]) data[selector] = new Tooltip(this, options)
      } else {
        if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.1'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.popover')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.popover', (data = {}))
        if (!data[selector]) data[selector] = new Popover(this, options)
      } else {
        if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.1'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.1'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.1'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && colliderTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $('body').height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com> 
(function ($) {
    $.fn.extend({
        easyResponsiveTabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',
                fit: true,
                closed: false,
                tabidentify: '',
                activetab_bg: 'white',
                inactive_bg: '#F5F5F5',
                active_border_color: '#c1c1c1',
                active_content_border_color: '#c1c1c1',
                activate: function () {
                }
            }
            //Variables
            var options = $.extend(defaults, options);
            var opt = options, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';
            var hash = window.location.hash;
            var historyApi = !!(window.history && history.replaceState);

            //Events
            $(this).bind('tabactivate', function (e, currentTab) {
                if (typeof options.activate === 'function') {
                    options.activate.call(currentTab, e)
                }
            });

            //Main function
            this.each(function () {
                var $respTabs = $(this);
                var $respTabsList = $respTabs.find('ul.resp-tabs-list.' + options.tabidentify);
                var respTabsId = $respTabs.attr('id');
                $respTabs.find('ul.resp-tabs-list.' + options.tabidentify + ' li').addClass('resp-tab-item').addClass(options.tabidentify);
                $respTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                if (options.type == 'vertical')
                    $respTabsList.css('margin-top', '3px');

                $respTabs.find('.resp-tabs-container.' + options.tabidentify).css('border-color', options.active_content_border_color);
                $respTabs.find('.resp-tabs-container.' + options.tabidentify + ' > div').addClass('resp-tab-content').addClass(options.tabidentify);
                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        $respTabs.addClass('resp-vtabs').addClass(options.tabidentify);
                    }
                    if (jfit == true) {
                        $respTabs.css({ width: '100%', margin: '0px' });
                    }
                    if (jtype == accord) {
                        $respTabs.addClass('resp-easy-accordion').addClass(options.tabidentify);
                        $respTabs.find('.resp-tabs-list').css('display', 'none');
                    }
                }

                //Assigning the h2 markup to accordion title
                var $tabItemh2;
                $respTabs.find('.resp-tab-content.' + options.tabidentify).before("<h2 class='resp-accordion " + options.tabidentify + "' role='tab'><span class='resp-arrow ti-angle-down'></span></h2>");

                $respTabs.find('.resp-tab-content.' + options.tabidentify).prev("h2").css({
                    'background-color': options.inactive_bg,
                    'border-color': options.active_border_color
                });

                var itemCount = 0;
                $respTabs.find('.resp-accordion').each(function () {
                    $tabItemh2 = $(this);
                    var $tabItem = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')');
                    var $accItem = $respTabs.find('.resp-accordion:eq(' + itemCount + ')');
                    $accItem.append($tabItem.html());
                    $accItem.data($tabItem.data());
                    $tabItemh2.attr('aria-controls', options.tabidentify + '_tab_item-' + (itemCount));
                    itemCount++;
                });

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    $tabContent;
                $respTabs.find('.resp-tab-item').each(function () {
                    $tabItem = $(this);
                    $tabItem.attr('aria-controls', options.tabidentify + '_tab_item-' + (count));
                    $tabItem.attr('role', 'tab');
                    $tabItem.css({
                        'background-color': options.inactive_bg,
                        'border-color': 'none'
                    });

                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    $respTabs.find('.resp-tab-content.' + options.tabidentify).each(function () {
                        $tabContent = $(this);
                        $tabContent.attr('aria-labelledby', options.tabidentify + '_tab_item-' + (tabcount)).css({
                            'border-color': options.active_border_color
                        });
                        tabcount++;
                    });
                    count++;
                });

                // Show correct content area
                var tabNum = 0;
                if (hash != '') {
                    var matches = hash.match(new RegExp(respTabsId + "([0-9]+)"));
                    if (matches !== null && matches.length === 2) {
                        tabNum = parseInt(matches[1], 10) - 1;
                        if (tabNum > count) {
                            tabNum = 0;
                        }
                    }
                }

                //Active correct tab
                $($respTabs.find('.resp-tab-item.' + options.tabidentify)[tabNum]).addClass('resp-tab-active').css({
                    'background-color': options.activetab_bg,
                    'border-color': options.active_border_color
                });

                //keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode
                if (options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {
                    $($respTabs.find('.resp-accordion.' + options.tabidentify)[tabNum]).addClass('resp-tab-active').css({
                        'background-color': options.activetab_bg + ' !important',
                        'border-color': options.active_border_color,
                        'background': 'none'
                    });

                    $($respTabs.find('.resp-tab-content.' + options.tabidentify)[tabNum]).addClass('resp-tab-content-active').addClass(options.tabidentify).attr('style', 'display:block');
                }
                //assign proper classes for when tabs mode is activated before making a selection in accordion mode
                else {
                   // $($respTabs.find('.resp-tab-content.' + options.tabidentify)[tabNum]).addClass('resp-accordion-closed'); //removed resp-tab-content-active
                }

                //Tab Click action function
                $respTabs.find("[role=tab]").each(function () {

                    var $currentTab = $(this);
                    $currentTab.click(function () {

                        var $currentTab = $(this);
                        var $tabAria = $currentTab.attr('aria-controls');

                        if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                            $respTabs.find('.resp-tab-content-active.' + options.tabidentify).slideUp('', function () {
                                $(this).addClass('resp-accordion-closed');
                            });
                            $currentTab.removeClass('resp-tab-active').css({
                                'background-color': options.inactive_bg,
                                'border-color': 'none'
                            });
                            return false;
                        }
                        if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                            $respTabs.find('.resp-tab-active.' + options.tabidentify).removeClass('resp-tab-active').css({
                                'background-color': options.inactive_bg,
                                'border-color': 'none'
                            });
                            $respTabs.find('.resp-tab-content-active.' + options.tabidentify).slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active').css({
                                'background-color': options.activetab_bg,
                                'border-color': options.active_border_color
                            });

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + '].' + options.tabidentify).slideDown().addClass('resp-tab-content-active');
                        } else {
                        
                            $respTabs.find('.resp-tab-active.' + options.tabidentify).removeClass('resp-tab-active').css({
                                'background-color': options.inactive_bg,
                                'border-color': 'none'
                            });

                            $respTabs.find('.resp-tab-content-active.' + options.tabidentify).removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');

                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active').css({
                                'background-color': options.activetab_bg,
                                'border-color': options.active_border_color
                            });

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + '].' + options.tabidentify).addClass('resp-tab-content-active').attr('style', 'display:block');
                        }
                        //Trigger tab activation event
                        $currentTab.trigger('tabactivate', $currentTab);

                        //Update Browser History
                        if (historyApi) {
                            var currentHash = window.location.hash;
                            var tabAriaParts = $tabAria.split('tab_item-');
                            // var newHash = respTabsId + (parseInt($tabAria.substring(9), 10) + 1).toString();
                            var newHash = respTabsId + (parseInt(tabAriaParts[1], 10) + 1).toString();
                            if (currentHash != "") {
                                var re = new RegExp(respTabsId + "[0-9]+");
                                if (currentHash.match(re) != null) {
                                    newHash = currentHash.replace(re, newHash);
                                }
                                else {
                                    newHash = currentHash + "|" + newHash;
                                }
                            }
                            else {
                                newHash = '#' + newHash;
                            }

                            history.replaceState(null, null, newHash);
                        }
                    });

                });

                //Window resize function                   
                $(window).resize(function () {
                    $respTabs.find('.resp-accordion-closed').removeAttr('style');
                });
            });
        }
    });
})(jQuery);

/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
/**
 * hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 **/

(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);
/*
 * jQuery Superfish Menu Plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */


(function ($, w) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
				if (ios) {
					// iOS clicks only bubble as far as body children
					$(w).load(function () {
						$('body').children().on('click', $.noop);
					});
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			unprefixedPointerEvents = (function () {
				return (!!w.PointerEvent);
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var msTouchAction = $menu.css('ms-touch-action');
				var touchAction = $menu.css('touch-action');
				touchAction = touchAction || msTouchAction;
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css({
					'ms-touch-action': touchAction,
					'touch-action': touchAction
				});
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (unprefixedPointerEvents) {
					touchevent = 'pointerdown.superfish';
				}
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					$ul = $this.siblings(e.data.popUpSelector);

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown' || e.type === 'pointerdown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;
					o.onBeforeHide.call($ul);
					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				o.onBeforeShow.call($ul);
				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop
	};

})(jQuery, window);
/*! Magnific Popup - v0.9.9 - 2014-09-06
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2014 Dmitry Semenov; */

(function(e){var t,n,i,o,r,a,s,l="Close",c="BeforeClose",d="AfterClose",u="BeforeAppend",p="MarkupParse",f="Open",m="Change",g="mfp",h="."+g,v="mfp-ready",C="mfp-removing",y="mfp-prevent-close",w=function(){},b=!!window.jQuery,I=e(window),x=function(e,n){t.ev.on(g+e+h,n)},k=function(t,n,i,o){var r=document.createElement("div");return r.className="mfp-"+t,i&&(r.innerHTML=i),o?n&&n.appendChild(r):(r=e(r),n&&r.appendTo(n)),r},T=function(n,i){t.ev.triggerHandler(g+n,i),t.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1),t.st.callbacks[n]&&t.st.callbacks[n].apply(t,e.isArray(i)?i:[i]))},E=function(n){return n===s&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),s=n),t.currTemplate.closeBtn},_=function(){e.magnificPopup.instance||(t=new w,t.init(),e.magnificPopup.instance=t)},S=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1};w.prototype={constructor:w,init:function(){var n=navigator.appVersion;t.isIE7=-1!==n.indexOf("MSIE 7."),t.isIE8=-1!==n.indexOf("MSIE 8."),t.isLowIE=t.isIE7||t.isIE8,t.isAndroid=/android/gi.test(n),t.isIOS=/iphone|ipad|ipod/gi.test(n),t.supportsTransition=S(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),o=e(document),t.popupsCache={}},open:function(n){i||(i=e(document.body));var r;if(n.isObj===!1){t.items=n.items.toArray(),t.index=0;var s,l=n.items;for(r=0;l.length>r;r++)if(s=l[r],s.parsed&&(s=s.el[0]),s===n.el[0]){t.index=r;break}}else t.items=e.isArray(n.items)?n.items:[n.items],t.index=n.index||0;if(t.isOpen)return t.updateItemHTML(),void 0;t.types=[],a="",t.ev=n.mainEl&&n.mainEl.length?n.mainEl.eq(0):o,n.key?(t.popupsCache[n.key]||(t.popupsCache[n.key]={}),t.currTemplate=t.popupsCache[n.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,n),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=k("bg").on("click"+h,function(){t.close()}),t.wrap=k("wrap").attr("tabindex",-1).on("click"+h,function(e){t._checkIfClose(e.target)&&t.close()}),t.container=k("container",t.wrap)),t.contentContainer=k("content"),t.st.preloader&&(t.preloader=k("preloader",t.container,t.st.tLoading));var c=e.magnificPopup.modules;for(r=0;c.length>r;r++){var d=c[r];d=d.charAt(0).toUpperCase()+d.slice(1),t["init"+d].call(t)}T("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(x(p,function(e,t,n,i){n.close_replaceWith=E(i.type)}),a+=" mfp-close-btn-in"):t.wrap.append(E())),t.st.alignTop&&(a+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:I.scrollTop(),position:"absolute"}),(t.st.fixedBgPos===!1||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:o.height(),position:"absolute"}),t.st.enableEscapeKey&&o.on("keyup"+h,function(e){27===e.keyCode&&t.close()}),I.on("resize"+h,function(){t.updateSize()}),t.st.closeOnContentClick||(a+=" mfp-auto-cursor"),a&&t.wrap.addClass(a);var u=t.wH=I.height(),m={};if(t.fixedContentPos&&t._hasScrollBar(u)){var g=t._getScrollbarSize();g&&(m.marginRight=g)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):m.overflow="hidden");var C=t.st.mainClass;return t.isIE7&&(C+=" mfp-ie7"),C&&t._addClassToMFP(C),t.updateItemHTML(),T("BuildControls"),e("html").css(m),t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo||i),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(v),t._setFocus()):t.bgOverlay.addClass(v),o.on("focusin"+h,t._onFocusIn)},16),t.isOpen=!0,t.updateSize(u),T(f),n},close:function(){t.isOpen&&(T(c),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(C),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){T(l);var n=C+" "+v+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(n+=t.st.mainClass+" "),t._removeClassFromMFP(n),t.fixedContentPos){var i={marginRight:""};t.isIE7?e("body, html").css("overflow",""):i.overflow="",e("html").css(i)}o.off("keyup"+h+" focusin"+h),t.ev.off(h),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&t.currTemplate[t.currItem.type]!==!0||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,T(d)},updateSize:function(e){if(t.isIOS){var n=document.documentElement.clientWidth/window.innerWidth,i=window.innerHeight*n;t.wrap.css("height",i),t.wH=i}else t.wH=e||I.height();t.fixedContentPos||t.wrap.css("height",t.wH),T("Resize")},updateItemHTML:function(){var n=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),n.parsed||(n=t.parseEl(t.index));var i=n.type;if(T("BeforeChange",[t.currItem?t.currItem.type:"",i]),t.currItem=n,!t.currTemplate[i]){var o=t.st[i]?t.st[i].markup:!1;T("FirstMarkupParse",o),t.currTemplate[i]=o?e(o):!0}r&&r!==n.type&&t.container.removeClass("mfp-"+r+"-holder");var a=t["get"+i.charAt(0).toUpperCase()+i.slice(1)](n,t.currTemplate[i]);t.appendContent(a,i),n.preloaded=!0,T(m,n),r=n.type,t.container.prepend(t.contentContainer),T("AfterChange")},appendContent:function(e,n){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&t.currTemplate[n]===!0?t.content.find(".mfp-close").length||t.content.append(E()):t.content=e:t.content="",T(u),t.container.addClass("mfp-"+n+"-holder"),t.contentContainer.append(t.content)},parseEl:function(n){var i,o=t.items[n];if(o.tagName?o={el:e(o)}:(i=o.type,o={data:o,src:o.src}),o.el){for(var r=t.types,a=0;r.length>a;a++)if(o.el.hasClass("mfp-"+r[a])){i=r[a];break}o.src=o.el.attr("data-mfp-src"),o.src||(o.src=o.el.attr("href"))}return o.type=i||t.st.type||"inline",o.index=n,o.parsed=!0,t.items[n]=o,T("ElementParse",o),t.items[n]},addGroup:function(e,n){var i=function(i){i.mfpEl=this,t._openClick(i,e,n)};n||(n={});var o="click.magnificPopup";n.mainEl=e,n.items?(n.isObj=!0,e.off(o).on(o,i)):(n.isObj=!1,n.delegate?e.off(o).on(o,n.delegate,i):(n.items=e,e.off(o).on(o,i)))},_openClick:function(n,i,o){var r=void 0!==o.midClick?o.midClick:e.magnificPopup.defaults.midClick;if(r||2!==n.which&&!n.ctrlKey&&!n.metaKey){var a=void 0!==o.disableOn?o.disableOn:e.magnificPopup.defaults.disableOn;if(a)if(e.isFunction(a)){if(!a.call(t))return!0}else if(a>I.width())return!0;n.type&&(n.preventDefault(),t.isOpen&&n.stopPropagation()),o.el=e(n.mfpEl),o.delegate&&(o.items=i.find(o.delegate)),t.open(o)}},updateStatus:function(e,i){if(t.preloader){n!==e&&t.container.removeClass("mfp-s-"+n),i||"loading"!==e||(i=t.st.tLoading);var o={status:e,text:i};T("UpdateStatus",o),e=o.status,i=o.text,t.preloader.html(i),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),n=e}},_checkIfClose:function(n){if(!e(n).hasClass(y)){var i=t.st.closeOnContentClick,o=t.st.closeOnBgClick;if(i&&o)return!0;if(!t.content||e(n).hasClass("mfp-close")||t.preloader&&n===t.preloader[0])return!0;if(n===t.content[0]||e.contains(t.content[0],n)){if(i)return!0}else if(o&&e.contains(document,n))return!0;return!1}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?o.height():document.body.scrollHeight)>(e||I.height())},_setFocus:function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},_onFocusIn:function(n){return n.target===t.wrap[0]||e.contains(t.wrap[0],n.target)?void 0:(t._setFocus(),!1)},_parseMarkup:function(t,n,i){var o;i.data&&(n=e.extend(i.data,n)),T(p,[t,n,i]),e.each(n,function(e,n){if(void 0===n||n===!1)return!0;if(o=e.split("_"),o.length>1){var i=t.find(h+"-"+o[0]);if(i.length>0){var r=o[1];"replaceWith"===r?i[0]!==n[0]&&i.replaceWith(n):"img"===r?i.is("img")?i.attr("src",n):i.replaceWith('<img src="'+n+'" class="'+i.attr("class")+'" />'):i.attr(o[1],n)}}else t.find(h+"-"+e).html(n)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:w.prototype,modules:[],open:function(t,n){return _(),t=t?e.extend(!0,{},t):{},t.isObj=!0,t.index=n||0,this.instance.open(t)},close:function(){return e.magnificPopup.instance&&e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},e.fn.magnificPopup=function(n){_();var i=e(this);if("string"==typeof n)if("open"===n){var o,r=b?i.data("magnificPopup"):i[0].magnificPopup,a=parseInt(arguments[1],10)||0;r.items?o=r.items[a]:(o=i,r.delegate&&(o=o.find(r.delegate)),o=o.eq(a)),t._openClick({mfpEl:o},i,r)}else t.isOpen&&t[n].apply(t,Array.prototype.slice.call(arguments,1));else n=e.extend(!0,{},n),b?i.data("magnificPopup",n):i[0].magnificPopup=n,t.addGroup(i,n);return i};var P,O,z,M="inline",B=function(){z&&(O.after(z.addClass(P)).detach(),z=null)};e.magnificPopup.registerModule(M,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(M),x(l+"."+M,function(){B()})},getInline:function(n,i){if(B(),n.src){var o=t.st.inline,r=e(n.src);if(r.length){var a=r[0].parentNode;a&&a.tagName&&(O||(P=o.hiddenClass,O=k(P),P="mfp-"+P),z=r.after(O).detach().removeClass(P)),t.updateStatus("ready")}else t.updateStatus("error",o.tNotFound),r=e("<div>");return n.inlineElement=r,r}return t.updateStatus("ready"),t._parseMarkup(i,{},n),i}}});var F,H="ajax",L=function(){F&&i.removeClass(F)},A=function(){L(),t.req&&t.req.abort()};e.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(H),F=t.st.ajax.cursor,x(l+"."+H,A),x("BeforeChange."+H,A)},getAjax:function(n){F&&i.addClass(F),t.updateStatus("loading");var o=e.extend({url:n.src,success:function(i,o,r){var a={data:i,xhr:r};T("ParseAjax",a),t.appendContent(e(a.data),H),n.finished=!0,L(),t._setFocus(),setTimeout(function(){t.wrap.addClass(v)},16),t.updateStatus("ready"),T("AjaxContentAdded")},error:function(){L(),n.finished=n.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",n.src))}},t.st.ajax.settings);return t.req=e.ajax(o),""}}});var j,N=function(n){if(n.data&&void 0!==n.data.title)return n.data.title;var i=t.st.image.titleSrc;if(i){if(e.isFunction(i))return i.call(t,n);if(n.el)return n.el.attr(i)||""}return""};e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var e=t.st.image,n=".image";t.types.push("image"),x(f+n,function(){"image"===t.currItem.type&&e.cursor&&i.addClass(e.cursor)}),x(l+n,function(){e.cursor&&i.removeClass(e.cursor),I.off("resize"+h)}),x("Resize"+n,t.resizeImage),t.isLowIE&&x("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e&&e.img&&t.st.image.verticalFit){var n=0;t.isLowIE&&(n=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-n)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,j&&clearInterval(j),e.isCheckingImgSize=!1,T("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var n=0,i=e.img[0],o=function(r){j&&clearInterval(j),j=setInterval(function(){return i.naturalWidth>0?(t._onImageHasSize(e),void 0):(n>200&&clearInterval(j),n++,3===n?o(10):40===n?o(50):100===n&&o(500),void 0)},r)};o(1)},getImage:function(n,i){var o=0,r=function(){n&&(n.img[0].complete?(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("ready")),n.hasSize=!0,n.loaded=!0,T("ImageLoadComplete")):(o++,200>o?setTimeout(r,100):a()))},a=function(){n&&(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("error",s.tError.replace("%url%",n.src))),n.hasSize=!0,n.loaded=!0,n.loadError=!0)},s=t.st.image,l=i.find(".mfp-img");if(l.length){var c=document.createElement("img");c.className="mfp-img",n.img=e(c).on("load.mfploader",r).on("error.mfploader",a),c.src=n.src,l.is("img")&&(n.img=n.img.clone()),c=n.img[0],c.naturalWidth>0?n.hasSize=!0:c.width||(n.hasSize=!1)}return t._parseMarkup(i,{title:N(n),img_replaceWith:n.img},n),t.resizeImage(),n.hasSize?(j&&clearInterval(j),n.loadError?(i.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",n.src))):(i.removeClass("mfp-loading"),t.updateStatus("ready")),i):(t.updateStatus("loading"),n.loading=!0,n.hasSize||(n.imgHidden=!0,i.addClass("mfp-loading"),t.findImageSize(n)),i)}}});var W,R=function(){return void 0===W&&(W=void 0!==document.createElement("p").style.MozTransform),W};e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,n=t.st.zoom,i=".zoom";if(n.enabled&&t.supportsTransition){var o,r,a=n.duration,s=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),i="all "+n.duration/1e3+"s "+n.easing,o={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},r="transition";return o["-webkit-"+r]=o["-moz-"+r]=o["-o-"+r]=o[r]=i,t.css(o),t},d=function(){t.content.css("visibility","visible")};x("BuildControls"+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.content.css("visibility","hidden"),e=t._getItemToZoom(),!e)return d(),void 0;r=s(e),r.css(t._getOffset()),t.wrap.append(r),o=setTimeout(function(){r.css(t._getOffset(!0)),o=setTimeout(function(){d(),setTimeout(function(){r.remove(),e=r=null,T("ZoomAnimationEnded")},16)},a)},16)}}),x(c+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.st.removalDelay=a,!e){if(e=t._getItemToZoom(),!e)return;r=s(e)}r.css(t._getOffset(!0)),t.wrap.append(r),t.content.css("visibility","hidden"),setTimeout(function(){r.css(t._getOffset())},16)}}),x(l+i,function(){t._allowZoom()&&(d(),r&&r.remove(),e=null)})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return t.currItem.hasSize?t.currItem.img:!1},_getOffset:function(n){var i;i=n?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem);var o=i.offset(),r=parseInt(i.css("padding-top"),10),a=parseInt(i.css("padding-bottom"),10);o.top-=e(window).scrollTop()-r;var s={width:i.width(),height:(b?i.innerHeight():i[0].offsetHeight)-a-r};return R()?s["-moz-transform"]=s.transform="translate("+o.left+"px,"+o.top+"px)":(s.left=o.left,s.top=o.top),s}}});var Z="iframe",q="//about:blank",D=function(e){if(t.currTemplate[Z]){var n=t.currTemplate[Z].find("iframe");n.length&&(e||(n[0].src=q),t.isIE8&&n.css("display",e?"block":"none"))}};e.magnificPopup.registerModule(Z,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(Z),x("BeforeChange",function(e,t,n){t!==n&&(t===Z?D():n===Z&&D(!0))}),x(l+"."+Z,function(){D()})},getIframe:function(n,i){var o=n.src,r=t.st.iframe;e.each(r.patterns,function(){return o.indexOf(this.index)>-1?(this.id&&(o="string"==typeof this.id?o.substr(o.lastIndexOf(this.id)+this.id.length,o.length):this.id.call(this,o)),o=this.src.replace("%id%",o),!1):void 0});var a={};return r.srcAction&&(a[r.srcAction]=o),t._parseMarkup(i,a,n),t.updateStatus("ready"),i}}});var K=function(e){var n=t.items.length;return e>n-1?e-n:0>e?n+e:e},Y=function(e,t,n){return e.replace(/%curr%/gi,t+1).replace(/%total%/gi,n)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var n=t.st.gallery,i=".mfp-gallery",r=Boolean(e.fn.mfpFastClick);return t.direction=!0,n&&n.enabled?(a+=" mfp-gallery",x(f+i,function(){n.navigateByImgClick&&t.wrap.on("click"+i,".mfp-img",function(){return t.items.length>1?(t.next(),!1):void 0}),o.on("keydown"+i,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),x("UpdateStatus"+i,function(e,n){n.text&&(n.text=Y(n.text,t.currItem.index,t.items.length))}),x(p+i,function(e,i,o,r){var a=t.items.length;o.counter=a>1?Y(n.tCounter,r.index,a):""}),x("BuildControls"+i,function(){if(t.items.length>1&&n.arrows&&!t.arrowLeft){var i=n.arrowMarkup,o=t.arrowLeft=e(i.replace(/%title%/gi,n.tPrev).replace(/%dir%/gi,"left")).addClass(y),a=t.arrowRight=e(i.replace(/%title%/gi,n.tNext).replace(/%dir%/gi,"right")).addClass(y),s=r?"mfpFastClick":"click";o[s](function(){t.prev()}),a[s](function(){t.next()}),t.isIE7&&(k("b",o[0],!1,!0),k("a",o[0],!1,!0),k("b",a[0],!1,!0),k("a",a[0],!1,!0)),t.container.append(o.add(a))}}),x(m+i,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),x(l+i,function(){o.off(i),t.wrap.off("click"+i),t.arrowLeft&&r&&t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(),t.arrowRight=t.arrowLeft=null}),void 0):!1},next:function(){t.direction=!0,t.index=K(t.index+1),t.updateItemHTML()},prev:function(){t.direction=!1,t.index=K(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,n=t.st.gallery.preload,i=Math.min(n[0],t.items.length),o=Math.min(n[1],t.items.length);for(e=1;(t.direction?o:i)>=e;e++)t._preloadItem(t.index+e);for(e=1;(t.direction?i:o)>=e;e++)t._preloadItem(t.index-e)},_preloadItem:function(n){if(n=K(n),!t.items[n].preloaded){var i=t.items[n];i.parsed||(i=t.parseEl(n)),T("LazyLoad",i),"image"===i.type&&(i.img=e('<img class="mfp-img" />').on("load.mfploader",function(){i.hasSize=!0}).on("error.mfploader",function(){i.hasSize=!0,i.loadError=!0,T("LazyLoadError",i)}).attr("src",i.src)),i.preloaded=!0}}}});var U="retina";e.magnificPopup.registerModule(U,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,n=e.ratio;n=isNaN(n)?n():n,n>1&&(x("ImageHasSize."+U,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/n,width:"100%"})}),x("ElementParse."+U,function(t,i){i.src=e.replaceSrc(i,n)}))}}}}),function(){var t=1e3,n="ontouchstart"in window,i=function(){I.off("touchmove"+r+" touchend"+r)},o="mfpFastClick",r="."+o;e.fn.mfpFastClick=function(o){return e(this).each(function(){var a,s=e(this);if(n){var l,c,d,u,p,f;s.on("touchstart"+r,function(e){u=!1,f=1,p=e.originalEvent?e.originalEvent.touches[0]:e.touches[0],c=p.clientX,d=p.clientY,I.on("touchmove"+r,function(e){p=e.originalEvent?e.originalEvent.touches:e.touches,f=p.length,p=p[0],(Math.abs(p.clientX-c)>10||Math.abs(p.clientY-d)>10)&&(u=!0,i())}).on("touchend"+r,function(e){i(),u||f>1||(a=!0,e.preventDefault(),clearTimeout(l),l=setTimeout(function(){a=!1},t),o())})})}s.on("click"+r,function(){a||o()})})},e.fn.destroyMfpFastClick=function(){e(this).off("touchstart"+r+" click"+r),n&&I.off("touchmove"+r+" touchend"+r)}}(),_()})(window.jQuery||window.Zepto);
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this.drag=a.extend({},m),this.state=a.extend({},n),this.e=a.extend({},o),this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._invalidated={},this._pipe=[],a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a[0].toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Pipe,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}function f(a){if(a.touches!==d)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(a.touches===d){if(a.pageX!==d)return{x:a.pageX,y:a.pageY};if(a.pageX===d)return{x:a.clientX,y:a.clientY}}}function g(a){var b,d,e=c.createElement("div"),f=a;for(b in f)if(d=f[b],"undefined"!=typeof e.style[d])return e=null,[d,b];return[!1]}function h(){return g(["transition","WebkitTransition","MozTransition","OTransition"])[1]}function i(){return g(["transform","WebkitTransform","MozTransform","OTransform","msTransform"])[0]}function j(){return g(["perspective","webkitPerspective","MozPerspective","OPerspective","MsPerspective"])[0]}function k(){return"ontouchstart"in b||!!navigator.msMaxTouchPoints}function l(){return b.navigator.msPointerEnabled}var m,n,o;m={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,offsetX:0,offsetY:0,distance:null,startTime:0,endTime:0,updatedX:0,targetEl:null},n={isTouch:!1,isScrolling:!1,isSwiping:!1,direction:!1,inMotion:!1},o={_onDragStart:null,_onDragMove:null,_onDragEnd:null,_transitionEnd:null,_resizer:null,_responsiveCall:null,_goToLoop:null,_checkVisibile:null},e.Defaults={items:3,loop:!1,center:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,responsiveClass:!1,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",themeClass:"owl-theme",baseClass:"owl-carousel",itemClass:"owl-item",centerClass:"center",activeClass:"active"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Plugins={},e.Pipe=[{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){var a=this._clones,b=this.$stage.children(".cloned");(b.length!==a.length||!this.settings.loop&&a.length>0)&&(this.$stage.children(".cloned").remove(),this._clones=[])}},{filter:["items","settings"],run:function(){var a,b,c=this._clones,d=this._items,e=this.settings.loop?c.length-Math.max(2*this.settings.items,4):0;for(a=0,b=Math.abs(e/2);b>a;a++)e>0?(this.$stage.children().eq(d.length+c.length-1).remove(),c.pop(),this.$stage.children().eq(0).remove(),c.pop()):(c.push(c.length/2),this.$stage.append(d[c[c.length-1]].clone().addClass("cloned")),c.push(d.length-1-(c.length-1)/2),this.$stage.prepend(d[c[c.length-1]].clone().addClass("cloned")))}},{filter:["width","items","settings"],run:function(){var a,b,c,d=this.settings.rtl?1:-1,e=(this.width()/this.settings.items).toFixed(3),f=0;for(this._coordinates=[],b=0,c=this._clones.length+this._items.length;c>b;b++)a=this._mergers[this.relative(b)],a=this.settings.mergeFit&&Math.min(a,this.settings.items)||a,f+=(this.settings.autoWidth?this._items[this.relative(b)].width()+this.settings.margin:e*a)*d,this._coordinates.push(f)}},{filter:["width","items","settings"],run:function(){var b,c,d=(this.width()/this.settings.items).toFixed(3),e={width:Math.abs(this._coordinates[this._coordinates.length-1])+2*this.settings.stagePadding,"padding-left":this.settings.stagePadding||"","padding-right":this.settings.stagePadding||""};if(this.$stage.css(e),e={width:this.settings.autoWidth?"auto":d-this.settings.margin},e[this.settings.rtl?"margin-left":"margin-right"]=this.settings.margin,!this.settings.autoWidth&&a.grep(this._mergers,function(a){return a>1}).length>0)for(b=0,c=this._coordinates.length;c>b;b++)e.width=Math.abs(this._coordinates[b])-Math.abs(this._coordinates[b-1]||0)-this.settings.margin,this.$stage.children().eq(b).css(e);else this.$stage.children().css(e)}},{filter:["width","items","settings"],run:function(a){a.current&&this.reset(this.$stage.children().index(a.current))}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children("."+this.settings.activeClass).removeClass(this.settings.activeClass),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass(this.settings.activeClass),this.settings.center&&(this.$stage.children("."+this.settings.centerClass).removeClass(this.settings.centerClass),this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))}}],e.prototype.initialize=function(){if(this.trigger("initialize"),this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl",this.settings.rtl),this.browserSupport(),this.settings.autoWidth&&this.state.imagesLoaded!==!0){var b,c,e;if(b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e)return this.preloadAutoWidthImages(b),!1}this.$element.addClass("owl-loading"),this.$stage=a("<"+this.settings.stageElement+' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this._width=this.$element.width(),this.refresh(),this.$element.removeClass("owl-loading").addClass("owl-loaded"),this.eventsCall(),this.internalEvents(),this.addTriggerableEvents(),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),delete e.responsive,e.responsiveClass&&this.$element.attr("class",function(a,b){return b.replace(/\b owl-responsive-\S+/g,"")}).addClass("owl-responsive-"+d)):e=a.extend({},this.options),(null===this.settings||this._breakpoint!==d)&&(this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}}))},e.prototype.optionsLogic=function(){this.$element.toggleClass("owl-center",this.settings.center),this.settings.loop&&this._items.length<this.settings.items&&(this.settings.loop=!1),this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.settings.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={}},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){if(0===this._items.length)return!1;(new Date).getTime();this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$stage.addClass("owl-refresh"),this.update(),this.$stage.removeClass("owl-refresh"),this.state.orientation=b.orientation,this.watchVisibility(),this.trigger("refreshed")},e.prototype.eventsCall=function(){this.e._onDragStart=a.proxy(function(a){this.onDragStart(a)},this),this.e._onDragMove=a.proxy(function(a){this.onDragMove(a)},this),this.e._onDragEnd=a.proxy(function(a){this.onDragEnd(a)},this),this.e._onResize=a.proxy(function(a){this.onResize(a)},this),this.e._transitionEnd=a.proxy(function(a){this.transitionEnd(a)},this),this.e._preventClick=a.proxy(function(a){this.preventClick(a)},this)},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this.e._onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.trigger("resize").isDefaultPrevented()?!1:(this._width=this.$element.width(),this.invalidate("width"),this.refresh(),void this.trigger("resized")):!1},e.prototype.eventsRouter=function(a){var b=a.type;"mousedown"===b||"touchstart"===b?this.onDragStart(a):"mousemove"===b||"touchmove"===b?this.onDragMove(a):"mouseup"===b||"touchend"===b?this.onDragEnd(a):"touchcancel"===b&&this.onDragEnd(a)},e.prototype.internalEvents=function(){var c=(k(),l());this.settings.mouseDrag?(this.$stage.on("mousedown",a.proxy(function(a){this.eventsRouter(a)},this)),this.$stage.on("dragstart",function(){return!1}),this.$stage.get(0).onselectstart=function(){return!1}):this.$element.addClass("owl-text-select-on"),this.settings.touchDrag&&!c&&this.$stage.on("touchstart touchcancel",a.proxy(function(a){this.eventsRouter(a)},this)),this.transitionEndVendor&&this.on(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd,!1),this.settings.responsive!==!1&&this.on(b,"resize",a.proxy(this.onThrottledResize,this))},e.prototype.onDragStart=function(d){var e,g,h,i;if(e=d.originalEvent||d||b.event,3===e.which||this.state.isTouch)return!1;if("mousedown"===e.type&&this.$stage.addClass("owl-grab"),this.trigger("drag"),this.drag.startTime=(new Date).getTime(),this.speed(0),this.state.isTouch=!0,this.state.isScrolling=!1,this.state.isSwiping=!1,this.drag.distance=0,g=f(e).x,h=f(e).y,this.drag.offsetX=this.$stage.position().left,this.drag.offsetY=this.$stage.position().top,this.settings.rtl&&(this.drag.offsetX=this.$stage.position().left+this.$stage.width()-this.width()+this.settings.margin),this.state.inMotion&&this.support3d)i=this.getTransformProperty(),this.drag.offsetX=i,this.animate(i),this.state.inMotion=!0;else if(this.state.inMotion&&!this.support3d)return this.state.inMotion=!1,!1;this.drag.startX=g-this.drag.offsetX,this.drag.startY=h-this.drag.offsetY,this.drag.start=g-this.drag.startX,this.drag.targetEl=e.target||e.srcElement,this.drag.updatedX=this.drag.start,("IMG"===this.drag.targetEl.tagName||"A"===this.drag.targetEl.tagName)&&(this.drag.targetEl.draggable=!1),a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",a.proxy(function(a){this.eventsRouter(a)},this))},e.prototype.onDragMove=function(a){var c,e,g,h,i,j;this.state.isTouch&&(this.state.isScrolling||(c=a.originalEvent||a||b.event,e=f(c).x,g=f(c).y,this.drag.currentX=e-this.drag.startX,this.drag.currentY=g-this.drag.startY,this.drag.distance=this.drag.currentX-this.drag.offsetX,this.drag.distance<0?this.state.direction=this.settings.rtl?"right":"left":this.drag.distance>0&&(this.state.direction=this.settings.rtl?"left":"right"),this.settings.loop?this.op(this.drag.currentX,">",this.coordinates(this.minimum()))&&"right"===this.state.direction?this.drag.currentX-=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length):this.op(this.drag.currentX,"<",this.coordinates(this.maximum()))&&"left"===this.state.direction&&(this.drag.currentX+=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length)):(h=this.coordinates(this.settings.rtl?this.maximum():this.minimum()),i=this.coordinates(this.settings.rtl?this.minimum():this.maximum()),j=this.settings.pullDrag?this.drag.distance/5:0,this.drag.currentX=Math.max(Math.min(this.drag.currentX,h+j),i+j)),(this.drag.distance>8||this.drag.distance<-8)&&(c.preventDefault!==d?c.preventDefault():c.returnValue=!1,this.state.isSwiping=!0),this.drag.updatedX=this.drag.currentX,(this.drag.currentY>16||this.drag.currentY<-16)&&this.state.isSwiping===!1&&(this.state.isScrolling=!0,this.drag.updatedX=this.drag.start),this.animate(this.drag.updatedX)))},e.prototype.onDragEnd=function(b){var d,e,f;if(this.state.isTouch){if("mouseup"===b.type&&this.$stage.removeClass("owl-grab"),this.trigger("dragged"),this.drag.targetEl.removeAttribute("draggable"),this.state.isTouch=!1,this.state.isScrolling=!1,this.state.isSwiping=!1,0===this.drag.distance&&this.state.inMotion!==!0)return this.state.inMotion=!1,!1;this.drag.endTime=(new Date).getTime(),d=this.drag.endTime-this.drag.startTime,e=Math.abs(this.drag.distance),(e>3||d>300)&&this.removeClick(this.drag.targetEl),f=this.closest(this.drag.updatedX),this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(f),this.invalidate("position"),this.update(),this.settings.pullDrag||this.drag.updatedX!==this.coordinates(f)||this.transitionEnd(),this.drag.distance=0,a(c).off(".owl.dragEvents")}},e.prototype.removeClick=function(c){this.drag.targetEl=c,a(c).on("click.preventClick",this.e._preventClick),b.setTimeout(function(){a(c).off("click.preventClick")},300)},e.prototype.preventClick=function(b){b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation&&b.stopPropagation(),a(b.target).off("click.preventClick")},e.prototype.getTransformProperty=function(){var a,c;return a=b.getComputedStyle(this.$stage.get(0),null).getPropertyValue(this.vendorName+"transform"),a=a.replace(/matrix(3d)?\(|\)/g,"").split(","),c=16===a.length,c!==!0?a[4]:a[12]},e.prototype.closest=function(b){var c=-1,d=30,e=this.width(),f=this.coordinates();return this.settings.freeDrag||a.each(f,a.proxy(function(a,g){return b>g-d&&g+d>b?c=a:this.op(b,"<",g)&&this.op(b,">",f[a+1]||g-e)&&(c="left"===this.state.direction?a+1:a),-1===c},this)),this.settings.loop||(this.op(b,">",f[this.minimum()])?c=b=this.minimum():this.op(b,"<",f[this.maximum()])&&(c=b=this.maximum())),c},e.prototype.animate=function(b){this.trigger("translate"),this.state.inMotion=this.speed()>0,this.support3d?this.$stage.css({transform:"translate3d("+b+"px,0px, 0px)",transition:this.speed()/1e3+"s"}):this.state.isTouch?this.$stage.css({left:b+"px"}):this.$stage.animate({left:b},this.speed()/1e3,this.settings.fallbackEasing,a.proxy(function(){this.state.inMotion&&this.transitionEnd()},this))},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(a){this._invalidated[a]=!0},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(b,c){var e=c?this._items.length:this._items.length+this._clones.length;return!a.isNumeric(b)||1>e?d:b=this._clones.length?(b%e+e)%e:Math.max(this.minimum(c),Math.min(this.maximum(c),b))},e.prototype.relative=function(a){return a=this.normalize(a),a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=0,f=this.settings;if(a)return this._items.length-1;if(!f.loop&&f.center)b=this._items.length-1;else if(f.loop||f.center)if(f.loop||f.center)b=this._items.length+f.items;else{if(!f.autoWidth&&!f.merge)throw"Can not detect maximum absolute position.";for(revert=f.rtl?1:-1,c=this.$stage.width()-this.$element.width();(d=this.coordinates(e))&&!(d*revert>=c);)b=++e}else b=this._items.length-f.items;return b},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c=null;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[b-1]||0))/2*(this.settings.rtl?-1:1)):c=this._coordinates[b-1]||0,c)},e.prototype.duration=function(a,b,c){return Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(c,d){if(this.settings.loop){var e=c-this.relative(this.current()),f=this.current(),g=this.current(),h=this.current()+e,i=0>g-h?!0:!1,j=this._clones.length+this._items.length;h<this.settings.items&&i===!1?(f=g+this._items.length,this.reset(f)):h>=j-this.settings.items&&i===!0&&(f=g-this._items.length,this.reset(f)),b.clearTimeout(this.e._goToLoop),this.e._goToLoop=b.setTimeout(a.proxy(function(){this.speed(this.duration(this.current(),f+e,d)),this.current(f+e),this.update()},this),30)}else this.speed(this.duration(this.current(),c,d)),this.current(c),this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.transitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.state.inMotion=!1,void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)},this)),this.reset(a.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(a,b){b=b===d?this._items.length:this.normalize(b,!0),this.trigger("add",{content:a,position:b}),0===this._items.length||b===this._items.length?(this.$stage.append(a),this._items.push(a),this._mergers.push(1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)):(this._items[b].before(a),this._items.splice(b,0,a),this._mergers.splice(b,0,1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)),this.invalidate("items"),this.trigger("added",{content:a,position:b})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.addTriggerableEvents=function(){var b=a.proxy(function(b,c){return a.proxy(function(a){a.relatedTarget!==this&&(this.suppress([c]),b.apply(this,[].slice.call(arguments,1)),this.release([c]))},this)},this);a.each({next:this.next,prev:this.prev,to:this.to,destroy:this.destroy,refresh:this.refresh,replace:this.replace,add:this.add,remove:this.remove},a.proxy(function(a,c){this.$element.on(a+".owl.carousel",b(c,a+".owl.carousel"))},this))},e.prototype.watchVisibility=function(){function c(a){return a.offsetWidth>0&&a.offsetHeight>0}function d(){c(this.$element.get(0))&&(this.$element.removeClass("owl-hidden"),this.refresh(),b.clearInterval(this.e._checkVisibile))}c(this.$element.get(0))||(this.$element.addClass("owl-hidden"),b.clearInterval(this.e._checkVisibile),this.e._checkVisibile=b.setInterval(a.proxy(d,this),500))},e.prototype.preloadAutoWidthImages=function(b){var c,d,e,f;c=0,d=this,b.each(function(g,h){e=a(h),f=new Image,f.onload=function(){c++,e.attr("src",f.src),e.css("opacity",1),c>=b.length&&(d.state.imagesLoaded=!0,d.initialize())},f.src=e.attr("src")||e.attr("data-src")||e.attr("data-src-retina")})},e.prototype.destroy=function(){this.$element.hasClass(this.settings.themeClass)&&this.$element.removeClass(this.settings.themeClass),this.settings.responsive!==!1&&a(b).off("resize.owl.carousel"),this.transitionEndVendor&&this.off(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd);for(var d in this._plugins)this._plugins[d].destroy();(this.settings.mouseDrag||this.settings.touchDrag)&&(this.$stage.off("mousedown touchstart touchcancel"),a(c).off(".owl.dragEvents"),this.$stage.get(0).onselectstart=function(){},this.$stage.off("dragstart",function(){return!1})),this.$element.off(".owl"),this.$stage.children(".cloned").remove(),this.e=null,this.$element.removeData("owlCarousel"),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.unwrap()},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d){var e={item:{count:this._items.length,index:this.current()}},f=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),g=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},e,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(g)}),this.$element.trigger(g),this.settings&&"function"==typeof this.settings[f]&&this.settings[f].apply(this,g)),g},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.browserSupport=function(){if(this.support3d=j(),this.support3d){this.transformVendor=i();var a=["transitionend","webkitTransitionEnd","transitionend","oTransitionEnd"];this.transitionEndVendor=a[h()],this.vendorName=this.transformVendor.replace(/Transform/i,""),this.vendorName=""!==this.vendorName?"-"+this.vendorName.toLowerCase()+"-":""}this.state.orientation=b.orientation},a.fn.owlCarousel=function(b){return this.each(function(){a(this).data("owlCarousel")||a(this).data("owlCarousel",new e(this,b))})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b){var c=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,d=c.center&&Math.ceil(c.items/2)||c.items,e=c.center&&-1*d||0,f=(b.property&&b.property.value||this._core.current())+e,g=this._core.clones().length,h=a.proxy(function(a,b){this.load(b)},this);e++<d;)this.load(g/2+this._core.relative(f)),g&&a.each(this._core.clones(this._core.relative(f++)),h)},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this._core.$element.on(this._handlers)};c.Defaults={lazyLoad:!1},c.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},c.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=c}(window.Zepto||window.jQuery,window,document),function(a){var b=function(c){this._core=c,this._handlers={"initialized.owl.carousel":a.proxy(function(){this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass)===this._core.$stage.children().eq(this._core.current())&&this.update()},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this._core.$element.on(this._handlers)};b.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},b.prototype.update=function(){this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)},b.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=b}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this._core=b,this._videos={},this._playing=null,this._fullscreen=!1,this._handlers={"resize.owl.carousel":a.proxy(function(a){this._core.settings.video&&!this.isInFullScreen()&&a.preventDefault()},this),"refresh.owl.carousel changed.owl.carousel":a.proxy(function(){this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))},this)},this._core.options=a.extend({},d.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};d.Defaults={video:!1,videoHeight:!1,videoWidth:!1},d.prototype.fetch=function(a,b){var c=a.attr("data-vimeo-id")?"vimeo":"youtube",d=a.attr("data-vimeo-id")||a.attr("data-youtube-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else{if(!(d[3].indexOf("vimeo")>-1))throw new Error("Video URL not supported.");c="vimeo"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},d.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="http://img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type&&a.ajax({type:"GET",url:"http://vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}))},d.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null},d.prototype.play=function(b){this._core.trigger("play",null,"video"),this._playing&&this.stop();var c,d,e=a(b.target||b.srcElement),f=e.closest("."+this._core.settings.itemClass),g=this._videos[f.attr("data-video")],h=g.width||"100%",i=g.height||this._core.$stage.height();"youtube"===g.type?c='<iframe width="'+h+'" height="'+i+'" src="http://www.youtube.com/embed/'+g.id+"?autoplay=1&v="+g.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===g.type&&(c='<iframe src="http://player.vimeo.com/video/'+g.id+'?autoplay=1" width="'+h+'" height="'+i+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),f.addClass("owl-video-playing"),this._playing=f,d=a('<div style="height:'+i+"px; width:"+h+'px" class="owl-video-frame">'+c+"</div>"),e.after(d)},d.prototype.isInFullScreen=function(){var d=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return d&&a(d).parent().hasClass("owl-video-frame")&&(this._core.speed(0),this._fullscreen=!0),d&&this._fullscreen&&this._playing?!1:this._fullscreen?(this._fullscreen=!1,!1):this._playing&&this._core.state.orientation!==b.orientation?(this._core.state.orientation=b.orientation,!1):!0},d.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=d}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){this.swapping="translated"==a.type},this),"translate.owl.carousel":a.proxy(function(){this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&this.core.support3d){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c)),f&&e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.transitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this.core=b,this.core.options=a.extend({},d.Defaults,this.core.options),this.handlers={"translated.owl.carousel refreshed.owl.carousel":a.proxy(function(){this.autoplay()
},this),"play.owl.autoplay":a.proxy(function(a,b,c){this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(){this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.autoplay()},this)},this.core.$element.on(this.handlers)};d.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},d.prototype.autoplay=function(){this.core.settings.autoplay&&!this.core.state.videoPlay?(b.clearInterval(this.interval),this.interval=b.setInterval(a.proxy(function(){this.play()},this),this.core.settings.autoplayTimeout)):b.clearInterval(this.interval)},d.prototype.play=function(){return c.hidden===!0||this.core.state.isTouch||this.core.state.isScrolling||this.core.state.isSwiping||this.core.state.inMotion?void 0:this.core.settings.autoplay===!1?void b.clearInterval(this.interval):void this.core.next(this.core.settings.autoplaySpeed)},d.prototype.stop=function(){b.clearInterval(this.interval)},d.prototype.pause=function(){b.clearInterval(this.interval)},d.prototype.destroy=function(){var a,c;b.clearInterval(this.interval);for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=d}(window.Zepto||window.jQuery,window,document),function(a){"use strict";var b=function(c){this._core=c,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"add.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.splice(b.position,0,a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"remove.owl.carousel prepared.owl.carousel":a.proxy(function(a){this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"change.owl.carousel":a.proxy(function(a){if("position"==a.property.name&&!this._core.state.revert&&!this._core.settings.loop&&this._core.settings.navRewind){var b=this._core.current(),c=this._core.maximum(),d=this._core.minimum();a.data=a.property.value>c?b>=c?d:c:a.property.value<d?c:a.property.value}},this),"changed.owl.carousel":a.proxy(function(a){"position"==a.property.name&&this.draw()},this),"refreshed.owl.carousel":a.proxy(function(){this._initialized||(this.initialize(),this._initialized=!0),this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation")},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this.$element.on(this._handlers)};b.Defaults={nav:!1,navRewind:!0,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotData:!1,dotsSpeed:!1,dotsContainer:!1,controlsClass:"owl-controls"},b.prototype.initialize=function(){var b,c,d=this._core.settings;d.dotsData||(this._templates=[a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]),d.navContainer&&d.dotsContainer||(this._controls.$container=a("<div>").addClass(d.controlsClass).appendTo(this.$element)),this._controls.$indicators=d.dotsContainer?a(d.dotsContainer):a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container),this._controls.$indicators.on("click","div",a.proxy(function(b){var c=a(b.target).parent().is(this._controls.$indicators)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(c,d.dotsSpeed)},this)),b=d.navContainer?a(d.navContainer):a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container),this._controls.$next=a("<"+d.navElement+">"),this._controls.$previous=this._controls.$next.clone(),this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click",a.proxy(function(){this.prev(d.navSpeed)},this)),this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click",a.proxy(function(){this.next(d.navSpeed)},this));for(c in this._overrides)this._core[c]=a.proxy(this[c],this)},b.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},b.prototype.update=function(){var a,b,c,d=this._core.settings,e=this._core.clones().length/2,f=e+this._core.items().length,g=d.center||d.autoWidth||d.dotData?1:d.dotsEach||d.items;if("page"!==d.slideBy&&(d.slideBy=Math.min(d.slideBy,d.items)),d.dots||"page"==d.slideBy)for(this._pages=[],a=e,b=0,c=0;f>a;a++)(b>=g||0===b)&&(this._pages.push({start:a-e,end:a-e+g-1}),b=0,++c),b+=this._core.mergers(this._core.relative(a))},b.prototype.draw=function(){var b,c,d="",e=this._core.settings,f=(this._core.$stage.children(),this._core.relative(this._core.current()));if(!e.nav||e.loop||e.navRewind||(this._controls.$previous.toggleClass("disabled",0>=f),this._controls.$next.toggleClass("disabled",f>=this._core.maximum())),this._controls.$previous.toggle(e.nav),this._controls.$next.toggle(e.nav),e.dots){if(b=this._pages.length-this._controls.$indicators.children().length,e.dotData&&0!==b){for(c=0;c<this._controls.$indicators.children().length;c++)d+=this._templates[this._core.relative(c)];this._controls.$indicators.html(d)}else b>0?(d=new Array(b+1).join(this._templates[0]),this._controls.$indicators.append(d)):0>b&&this._controls.$indicators.children().slice(b).remove();this._controls.$indicators.find(".active").removeClass("active"),this._controls.$indicators.children().eq(a.inArray(this.current(),this._pages)).addClass("active")}this._controls.$indicators.toggle(e.dots)},b.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotData?1:c.dotsEach||c.items)}},b.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,function(a){return a.start<=b&&a.end>=b}).pop()},b.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},b.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},b.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},b.prototype.to=function(b,c,d){var e;d?a.proxy(this._overrides.to,this._core)(b,c):(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c))},a.fn.owlCarousel.Constructor.Plugins.Navigation=b}(window.Zepto||window.jQuery,window,document),function(a,b){"use strict";var c=function(d){this._core=d,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(){"URLHash"==this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");this._hashes[c]=b.content},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(){var a=b.location.hash.substring(1),c=this._core.$stage.children(),d=this._hashes[a]&&c.index(this._hashes[a])||0;return a?void this._core.to(d,!1,!0):!1},this))};c.Defaults={URLhashListener:!1},c.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=c}(window.Zepto||window.jQuery,window,document);
;(function () {

	'use strict';

	// iPad and iPod detection
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	}

	var isiPhone = function(){
    return (
      (navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPod") != -1)
    );
	}

	// Mobile Menu Clone ( Mobiles/Tablets )
	var mobileMenu = function() {
		if ( $(window).width() < 769 ) {
			$('html,body').addClass('fh5co-overflow');

			if ( $('#fh5co-mobile-menu').length < 1 ) {

				var clone = $('#fh5co-primary-menu').clone().attr({
					id: 'fh5co-mobile-menu-ul',
					class: ''
				});
				var cloneLogo = $('#fh5co-logo').clone().attr({
					id : 'fh5co-logo-mobile',
					class : ''
				});

				$('<div id="fh5co-logo-mobile-wrap">').append(cloneLogo).insertBefore('#fh5co-header-section');
				// $('#fh5co-logo-mobile-wrap').append('<a href="#" id="fh5co-mobile-menu-btn"><i class="ti-menu"></i></a>')
				$('#fh5co-logo-mobile-wrap').append('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white " data-toggle="collapse" data-target="#fh5co-navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>');
				$('<div id="fh5co-mobile-menu">').append(clone).insertBefore('#fh5co-header-section');

				$('#fh5co-header-section').hide();
				$('#fh5co-logo-mobile-wrap').show();
			} else {
				$('#fh5co-header-section').hide();
				$('#fh5co-logo-mobile-wrap').show();
			}

		} else {

			$('#fh5co-logo-mobile-wrap').hide();
			$('#fh5co-header-section').show();
			$('html,body').removeClass('fh5co-overflow');
			$('.js-fh5co-nav-toggle').removeClass('active');
			if ( $('body').hasClass('fh5co-mobile-menu-visible')) {
				$('body').removeClass('fh5co-mobile-menu-visible');
			}
		}
	};


	// ScrollTop
	var scrlTop =  function() {
		$('.fh5co-gotop').click(function(event){
			$('html, body').animate({
		        scrollTop: 0
		    }, 500, 'easeInOutExpo');

		    event.preventDefault();
		    return false;
		});
	};

	// SmoothScroll
	var smoothScroll = function() {
		$('.smoothscroll').click(function(){

	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 700, 'easeInOutExpo');
	    return false;
		});
	};


	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#fh5co-mobile-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      $('body').removeClass('fh5co-mobile-menu-visible');
              $('.js-fh5co-nav-toggle').removeClass('active');
	    }
		});
	};


	// Mobile Button Click
	var mobileBtnClick = function() {
		$(document).on('click', '.js-fh5co-nav-toggle', function(e){
			e.preventDefault();
			// fh5co-mobile-menu-visible
			if ( $('body').hasClass('fh5co-mobile-menu-visible') ) {
				$('body').removeClass('fh5co-mobile-menu-visible');
				$(this).removeClass('active');
			} else {
				$('body').addClass('fh5co-mobile-menu-visible');
				$(this).addClass('active');
			}

		});
	};


	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Superfish Sub Menu Click ( Mobiles/Tablets )
	var mobileClickSubMenus = function() {

		$('body').on('click', '.fh5co-sub-ddown', function(event) {
			event.preventDefault();
			var $this = $(this),
				li = $this.closest('li');
			li.find('> .fh5co-sub-menu').slideToggle(200);
		});

	};

	// Window Resize
	var windowResize = function() {
		$(window).resize(function(){
			mobileMenu();
		});

	};

	// Window Scroll
	var windowScroll = function() {
		$(window).scroll(function() {

			var scrollPos = $(this).scrollTop();
			if ( $('body').hasClass('fh5co-mobile-menu-visible') ) {
				$('body').removeClass('fh5co-mobile-menu-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}

		});
	};

	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	// Easy Repsonsive Tabs
	var responsiveTabs = function(){

		$('#fh5co-tab-feature').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'

    });
    $('#fh5co-tab-feature-center').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'

    });
    $('#fh5co-tab-feature-vertical').easyResponsiveTabs({
      type: 'vertical',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
    });
	};


	// Owl Carousel
	var owlCrouselFeatureSlide = function() {
		var owl = $('.owl-carousel');
		owl.owlCarousel({
			items: 1,
		    loop: true,
		    margin: 0,
		    responsiveClass: true,
		    nav: true,
		    dots: true,
		    smartSpeed: 500,
		    navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});
	};

	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
		    loop: true,
		    margin: 0,
		    responsiveClass: true,
		    nav: false,
		    dots: true,
		    smartSpeed: 500,
		    autoHeight: true
		});
	};

	// MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	};


	// Scroll Animations

	// Animate Feature
	var animateFeature = function() {
		if ( $('.feature-box').length > 0 ) {
			$('.feature-box').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					// el.animate({opacity: 1} , 600 );
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );

			});
		}
	};
	// Animate Works
	var animateWork = function() {
		if ( $('.work-box').length > 0 ) {
			$('.work-box').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					// el.animate({opacity: 1} , 600 );
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );

			});
		}
	};

	// Animate Works
	var animateFooter = function() {

		$('.footer-box').each(function( k ) {

			var el = $(this);

			setTimeout ( function () {
				// el.animate({opacity: 1} , 600 );
				el.addClass('fadeInUp animated');
			},  k * 200, 'easeInOutExpo' );

		});
	};


	// Waypoints
	var featureWayPoint = function() {
		if ($('#fh5co-features').length > 0 ) {
			$('#fh5co-features').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateFeature , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '70%' } );
		}
	};

	var worksWayPoint = function() {
		if ($('#fh5co-works').length > 0 ) {
			$('#fh5co-works').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateWork , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '70%' } );
		}
	};

	var footerWayPoint = function() {
		if ( $('#fh5co-footer').length > 0 ) {
			$('#fh5co-footer').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateFooter , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '70%' } );
		}
	};

	var heroWayPoint = function() {
		if ( $('#fh5co-hero').length > 0 ) {
			$('#fh5co-hero').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {


					setTimeout(function(){
						$('.hero-animate-1').addClass('fadeInUp animated');
					}, 100);
					setTimeout(function(){
						$('.hero-animate-2').addClass('fadeInUp animated');
					}, 400);
					setTimeout(function(){
						$('.hero-animate-3').addClass('fadeInUp animated');
					}, 600);
					setTimeout(function(){
						$('.hero-animate-4').addClass('fadeInDown animated');
					}, 1000);

					$(this).addClass('animated');

				}
			} , { offset: '70%' } );
		}
	};

	var contentWayPoint = function() {

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {
				//console.log($(this.element).addClass('fadeInUp animated'));
			}

		} , { offset: '70%' } );

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {
			//	console.log($(this.element).addClass('fadeInUp animated'));
			}

		} , { offset: '70%' } );

	};





	$(function(){

		mobileFastClick();
		responsiveTabs();
		mobileMenu();
		mainMenu();
		magnifPopup();
		mobileBtnClick();
		mobileClickSubMenus();
		mobileMenuOutsideClick();
		owlCrouselFeatureSlide();
		testimonialCarousel();
		windowResize();
		smoothScroll();
		windowScroll();
		scrlTop();

		heroWayPoint();
		featureWayPoint();
		worksWayPoint();
		footerWayPoint();
		contentWayPoint();


	});


}());
/*!
 * FormValidation (http://formvalidation.io)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation, Pure, SemanticUI, UIKit and custom frameworks
 *
 * @version     v0.8.1, built on 2016-07-29 1:10:55 AM
 * @author      https://twitter.com/formvalidation
 * @copyright   (c) 2013 - 2016 Nguyen Huu Phuoc
 * @license     http://formvalidation.io/license/
 */

if(window.FormValidation={AddOn:{},Framework:{},I18n:{},Validator:{}},"undefined"==typeof jQuery)throw new Error("FormValidation requires jQuery");!function(a){var b=a.fn.jquery.split(" ")[0].split(".");if(+b[0]<2&&+b[1]<9||1===+b[0]&&9===+b[1]&&+b[2]<1)throw new Error("FormValidation requires jQuery version 1.9.1 or higher")}(jQuery),function(a){FormValidation.Base=function(b,c,d){this.$form=a(b),this.options=a.extend({},a.fn.formValidation.DEFAULT_OPTIONS,c),this._namespace=d||"fv",this.$invalidFields=a([]),this.$submitButton=null,this.$hiddenButton=null,this.STATUS_NOT_VALIDATED="NOT_VALIDATED",this.STATUS_VALIDATING="VALIDATING",this.STATUS_INVALID="INVALID",this.STATUS_VALID="VALID",this.STATUS_IGNORED="IGNORED",this.DEFAULT_MESSAGE=a.fn.formValidation.DEFAULT_MESSAGE,this._ieVersion=function(){for(var a=3,b=document.createElement("div"),c=b.all||[];b.innerHTML="<!--[if gt IE "+ ++a+"]><br><![endif]-->",c[0];);return a>4?a:document.documentMode}();var e=document.createElement("div");this._changeEvent=9!==this._ieVersion&&"oninput"in e?"input":"keyup",this._submitIfValid=null,this._cacheFields={},this._init()},FormValidation.Base.prototype={constructor:FormValidation.Base,_exceedThreshold:function(b){var c=this._namespace,d=b.attr("data-"+c+"-field"),e=this.options.fields[d].threshold||this.options.threshold;if(!e)return!0;var f=-1!==a.inArray(b.attr("type"),["button","checkbox","file","hidden","image","radio","reset","submit"]);return f||b.val().length>=e},_init:function(){var b=this,c=this._namespace,d={addOns:{},autoFocus:this.$form.attr("data-"+c+"-autofocus"),button:{selector:this.$form.attr("data-"+c+"-button-selector")||this.$form.attr("data-"+c+"-submitbuttons"),disabled:this.$form.attr("data-"+c+"-button-disabled")},control:{valid:this.$form.attr("data-"+c+"-control-valid"),invalid:this.$form.attr("data-"+c+"-control-invalid")},err:{clazz:this.$form.attr("data-"+c+"-err-clazz"),container:this.$form.attr("data-"+c+"-err-container")||this.$form.attr("data-"+c+"-container"),parent:this.$form.attr("data-"+c+"-err-parent")},events:{formInit:this.$form.attr("data-"+c+"-events-form-init"),formPreValidate:this.$form.attr("data-"+c+"-events-form-prevalidate"),formError:this.$form.attr("data-"+c+"-events-form-error"),formReset:this.$form.attr("data-"+c+"-events-form-reset"),formSuccess:this.$form.attr("data-"+c+"-events-form-success"),fieldAdded:this.$form.attr("data-"+c+"-events-field-added"),fieldRemoved:this.$form.attr("data-"+c+"-events-field-removed"),fieldInit:this.$form.attr("data-"+c+"-events-field-init"),fieldError:this.$form.attr("data-"+c+"-events-field-error"),fieldReset:this.$form.attr("data-"+c+"-events-field-reset"),fieldSuccess:this.$form.attr("data-"+c+"-events-field-success"),fieldStatus:this.$form.attr("data-"+c+"-events-field-status"),localeChanged:this.$form.attr("data-"+c+"-events-locale-changed"),validatorError:this.$form.attr("data-"+c+"-events-validator-error"),validatorSuccess:this.$form.attr("data-"+c+"-events-validator-success"),validatorIgnored:this.$form.attr("data-"+c+"-events-validator-ignored")},excluded:this.$form.attr("data-"+c+"-excluded"),icon:{valid:this.$form.attr("data-"+c+"-icon-valid")||this.$form.attr("data-"+c+"-feedbackicons-valid"),invalid:this.$form.attr("data-"+c+"-icon-invalid")||this.$form.attr("data-"+c+"-feedbackicons-invalid"),validating:this.$form.attr("data-"+c+"-icon-validating")||this.$form.attr("data-"+c+"-feedbackicons-validating"),feedback:this.$form.attr("data-"+c+"-icon-feedback")},live:this.$form.attr("data-"+c+"-live"),locale:this.$form.attr("data-"+c+"-locale"),message:this.$form.attr("data-"+c+"-message"),onPreValidate:this.$form.attr("data-"+c+"-onprevalidate"),onError:this.$form.attr("data-"+c+"-onerror"),onReset:this.$form.attr("data-"+c+"-onreset"),onSuccess:this.$form.attr("data-"+c+"-onsuccess"),row:{selector:this.$form.attr("data-"+c+"-row-selector")||this.$form.attr("data-"+c+"-group"),valid:this.$form.attr("data-"+c+"-row-valid"),invalid:this.$form.attr("data-"+c+"-row-invalid"),feedback:this.$form.attr("data-"+c+"-row-feedback")},threshold:this.$form.attr("data-"+c+"-threshold"),trigger:this.$form.attr("data-"+c+"-trigger"),verbose:this.$form.attr("data-"+c+"-verbose"),fields:{}};this.$form.attr("novalidate","novalidate").addClass(this.options.elementClass).on("submit."+c,function(a){a.preventDefault(),b.validate()}).on("click."+c,this.options.button.selector,function(){b.$submitButton=a(this),b._submitIfValid=!0}),(this.options.declarative===!0||"true"===this.options.declarative)&&this.$form.find("[name], [data-"+c+"-field]").each(function(){var e=a(this),f=e.attr("name")||e.attr("data-"+c+"-field"),g=b._parseOptions(e);g&&(e.attr("data-"+c+"-field",f),d.fields[f]=a.extend({},g,d.fields[f]))}),this.options=a.extend(!0,this.options,d),"string"==typeof this.options.err.parent&&(this.options.err.parent=new RegExp(this.options.err.parent)),this.options.container&&(this.options.err.container=this.options.container,delete this.options.container),this.options.feedbackIcons&&(this.options.icon=a.extend(!0,this.options.icon,this.options.feedbackIcons),delete this.options.feedbackIcons),this.options.group&&(this.options.row.selector=this.options.group,delete this.options.group),this.options.submitButtons&&(this.options.button.selector=this.options.submitButtons,delete this.options.submitButtons),FormValidation.I18n[this.options.locale]||(this.options.locale=a.fn.formValidation.DEFAULT_OPTIONS.locale),(this.options.declarative===!0||"true"===this.options.declarative)&&(this.options=a.extend(!0,this.options,{addOns:this._parseAddOnOptions()})),this.$hiddenButton=a("<button/>").attr("type","submit").prependTo(this.$form).addClass("fv-hidden-submit").css({display:"none",width:0,height:0}),this.$form.on("click."+this._namespace,'[type="submit"]',function(c){if(!c.isDefaultPrevented()){var d=a(c.target),e=d.is('[type="submit"]')?d.eq(0):d.parent('[type="submit"]').eq(0);if(b.options.button.selector&&!e.is(b.options.button.selector)&&!e.is(b.$hiddenButton))return b.$form.off("submit."+b._namespace).submit(),!1}});for(var e in this.options.fields)this._initField(e);for(var f in this.options.addOns)"function"==typeof FormValidation.AddOn[f].init&&FormValidation.AddOn[f].init(this,this.options.addOns[f]);this.$form.trigger(a.Event(this.options.events.formInit),{bv:this,fv:this,options:this.options}),this.options.onPreValidate&&this.$form.on(this.options.events.formPreValidate,function(a){FormValidation.Helper.call(b.options.onPreValidate,[a])}),this.options.onSuccess&&this.$form.on(this.options.events.formSuccess,function(a){FormValidation.Helper.call(b.options.onSuccess,[a])}),this.options.onError&&this.$form.on(this.options.events.formError,function(a){FormValidation.Helper.call(b.options.onError,[a])}),this.options.onReset&&this.$form.on(this.options.events.formReset,function(a){FormValidation.Helper.call(b.options.onReset,[a])})},_initField:function(b){var c=this._namespace,d=a([]);switch(typeof b){case"object":d=b,b=b.attr("data-"+c+"-field");break;case"string":d=this.getFieldElements(b),d.attr("data-"+c+"-field",b)}if(0!==d.length&&null!==this.options.fields[b]&&null!==this.options.fields[b].validators){var e,f,g=this.options.fields[b].validators;for(e in g)f=g[e].alias||e,FormValidation.Validator[f]||delete this.options.fields[b].validators[e];null===this.options.fields[b].enabled&&(this.options.fields[b].enabled=!0);for(var h=this,i=d.length,j=d.attr("type"),k=1===i||"radio"===j||"checkbox"===j,l=this._getFieldTrigger(d.eq(0)),m=this.options.err.clazz.split(" ").join("."),n=a.map(l,function(a){return a+".update."+c}).join(" "),o=0;i>o;o++){var p=d.eq(o),q=this.options.fields[b].row||this.options.row.selector,r=p.closest(q),s="function"==typeof(this.options.fields[b].container||this.options.fields[b].err||this.options.err.container)?(this.options.fields[b].container||this.options.fields[b].err||this.options.err.container).call(this,p,this):this.options.fields[b].container||this.options.fields[b].err||this.options.err.container,t=s&&"tooltip"!==s&&"popover"!==s?a(s):this._getMessageContainer(p,q);s&&"tooltip"!==s&&"popover"!==s&&t.addClass(this.options.err.clazz),t.find("."+m+"[data-"+c+"-validator][data-"+c+'-for="'+b+'"]').remove(),r.find("i[data-"+c+'-icon-for="'+b+'"]').remove(),p.off(n).on(n,function(){h.updateStatus(a(this),h.STATUS_NOT_VALIDATED)}),p.data(c+".messages",t);for(e in g)p.data(c+".result."+e,this.STATUS_NOT_VALIDATED),k&&o!==i-1||a("<small/>").css("display","none").addClass(this.options.err.clazz).attr("data-"+c+"-validator",e).attr("data-"+c+"-for",b).attr("data-"+c+"-result",this.STATUS_NOT_VALIDATED).html(this._getMessage(b,e)).appendTo(t),f=g[e].alias||e,"function"==typeof FormValidation.Validator[f].init&&FormValidation.Validator[f].init(this,p,this.options.fields[b].validators[e],e);if(this.options.fields[b].icon!==!1&&"false"!==this.options.fields[b].icon&&this.options.icon&&this.options.icon.valid&&this.options.icon.invalid&&this.options.icon.validating&&(!k||o===i-1)){r.addClass(this.options.row.feedback);var u=a("<i/>").css("display","none").addClass(this.options.icon.feedback).attr("data-"+c+"-icon-for",b).insertAfter(p);(k?d:p).data(c+".icon",u),("tooltip"===s||"popover"===s)&&((k?d:p).on(this.options.events.fieldError,function(){r.addClass("fv-has-tooltip")}).on(this.options.events.fieldSuccess,function(){r.removeClass("fv-has-tooltip")}),p.off("focus.container."+c).on("focus.container."+c,function(){h._showTooltip(a(this),s)}).off("blur.container."+c).on("blur.container."+c,function(){h._hideTooltip(a(this),s)})),"string"==typeof this.options.fields[b].icon&&"true"!==this.options.fields[b].icon?u.appendTo(a(this.options.fields[b].icon)):this._fixIcon(p,u)}}var v=[];for(e in g)f=g[e].alias||e,g[e].priority=parseInt(g[e].priority||FormValidation.Validator[f].priority||1,10),v.push({validator:e,priority:g[e].priority});v=v.sort(function(a,b){return a.priority-b.priority}),d.data(c+".validators",v).on(this.options.events.fieldSuccess,function(a,b){var c=h.getOptions(b.field,null,"onSuccess");c&&FormValidation.Helper.call(c,[a,b])}).on(this.options.events.fieldError,function(a,b){var c=h.getOptions(b.field,null,"onError");c&&FormValidation.Helper.call(c,[a,b])}).on(this.options.events.fieldReset,function(a,b){var c=h.getOptions(b.field,null,"onReset");c&&FormValidation.Helper.call(c,[a,b])}).on(this.options.events.fieldStatus,function(a,b){var c=h.getOptions(b.field,null,"onStatus");c&&FormValidation.Helper.call(c,[a,b])}).on(this.options.events.validatorError,function(a,b){var c=h.getOptions(b.field,b.validator,"onError");c&&FormValidation.Helper.call(c,[a,b])}).on(this.options.events.validatorIgnored,function(a,b){var c=h.getOptions(b.field,b.validator,"onIgnored");c&&FormValidation.Helper.call(c,[a,b])}).on(this.options.events.validatorSuccess,function(a,b){var c=h.getOptions(b.field,b.validator,"onSuccess");c&&FormValidation.Helper.call(c,[a,b])}),this.onLiveChange(d,"live",function(){h._exceedThreshold(a(this))&&h.validateField(a(this))}),d.trigger(a.Event(this.options.events.fieldInit),{bv:this,fv:this,field:b,element:d})}},_isExcluded:function(b){var c=this._namespace,d=b.attr("data-"+c+"-excluded"),e=b.attr("data-"+c+"-field")||b.attr("name");switch(!0){case!!e&&this.options.fields&&this.options.fields[e]&&("true"===this.options.fields[e].excluded||this.options.fields[e].excluded===!0):case"true"===d:case""===d:return!0;case!!e&&this.options.fields&&this.options.fields[e]&&("false"===this.options.fields[e].excluded||this.options.fields[e].excluded===!1):case"false"===d:return!1;case!!e&&this.options.fields&&this.options.fields[e]&&"function"==typeof this.options.fields[e].excluded:return this.options.fields[e].excluded.call(this,b,this);case!!e&&this.options.fields&&this.options.fields[e]&&"string"==typeof this.options.fields[e].excluded:case d:return FormValidation.Helper.call(this.options.fields[e].excluded,[b,this]);default:if(this.options.excluded){"string"==typeof this.options.excluded&&(this.options.excluded=a.map(this.options.excluded.split(","),function(b){return a.trim(b)}));for(var f=this.options.excluded.length,g=0;f>g;g++)if("string"==typeof this.options.excluded[g]&&b.is(this.options.excluded[g])||"function"==typeof this.options.excluded[g]&&this.options.excluded[g].call(this,b,this)===!0)return!0}return!1}},_getFieldTrigger:function(a){var b=this._namespace,c=a.data(b+".trigger");if(c)return c;var d=a.attr("type"),e=a.attr("data-"+b+"-field"),f="radio"===d||"checkbox"===d||"file"===d||"SELECT"===a.get(0).tagName?"change":this._ieVersion>=10&&a.attr("placeholder")?"keyup":this._changeEvent;return c=((this.options.fields[e]?this.options.fields[e].trigger:null)||this.options.trigger||f).split(" "),a.data(b+".trigger",c),c},_getMessage:function(a,b){if(!this.options.fields[a]||!this.options.fields[a].validators)return"";var c=this.options.fields[a].validators,d=c[b]&&c[b].alias?c[b].alias:b;if(!FormValidation.Validator[d])return"";switch(!0){case!!c[b].message:return c[b].message;case!!this.options.fields[a].message:return this.options.fields[a].message;case!!this.options.message:return this.options.message;case!!FormValidation.I18n[this.options.locale]&&!!FormValidation.I18n[this.options.locale][d]&&!!FormValidation.I18n[this.options.locale][d]["default"]:return FormValidation.I18n[this.options.locale][d]["default"];default:return this.DEFAULT_MESSAGE}},_getMessageContainer:function(a,b){if(!this.options.err.parent)throw new Error("The err.parent option is not defined");var c=a.parent();if(c.is(b))return c;var d=c.attr("class");return d&&this.options.err.parent.test(d)?c:this._getMessageContainer(c,b)},_parseAddOnOptions:function(){var a=this._namespace,b=this.$form.attr("data-"+a+"-addons"),c=this.options.addOns||{};if(b){b=b.replace(/\s/g,"").split(",");for(var d=0;d<b.length;d++)c[b[d]]||(c[b[d]]={})}var e,f,g,h;for(e in c)if(FormValidation.AddOn[e]){if(f=FormValidation.AddOn[e].html5Attributes)for(g in f)h=this.$form.attr("data-"+a+"-addons-"+e.toLowerCase()+"-"+g.toLowerCase()),h&&(c[e][f[g]]=h)}else delete c[e];return c},_parseOptions:function(b){var c,d,e,f,g,h,i,j,k,l=this._namespace,m=b.attr("name")||b.attr("data-"+l+"-field"),n={},o=new RegExp("^data-"+l+"-([a-z]+)-alias$"),p=a.extend({},FormValidation.Validator);a.each(b.get(0).attributes,function(a,b){b.value&&o.test(b.name)&&(d=b.name.split("-")[2],p[b.value]&&(p[d]=p[b.value],p[d].alias=b.value))});for(d in p)if(c=p[d],e="data-"+l+"-"+d.toLowerCase(),f=b.attr(e)+"",k="function"==typeof c.enableByHtml5?c.enableByHtml5(b):null,k&&"false"!==f||k!==!0&&(""===f||"true"===f||e===f.toLowerCase())){c.html5Attributes=a.extend({},{message:"message",onerror:"onError",onreset:"onReset",onsuccess:"onSuccess",priority:"priority",transformer:"transformer"},c.html5Attributes),n[d]=a.extend({},k===!0?{}:k,n[d]),c.alias&&(n[d].alias=c.alias);for(j in c.html5Attributes)g=c.html5Attributes[j],h="data-"+l+"-"+d.toLowerCase()+"-"+j,i=b.attr(h),i&&("true"===i||h===i.toLowerCase()?i=!0:"false"===i&&(i=!1),n[d][g]=i)}var q={autoFocus:b.attr("data-"+l+"-autofocus"),err:b.attr("data-"+l+"-err-container")||b.attr("data-"+l+"-container"),enabled:b.attr("data-"+l+"-enabled"),excluded:b.attr("data-"+l+"-excluded"),icon:b.attr("data-"+l+"-icon")||b.attr("data-"+l+"-feedbackicons")||(this.options.fields&&this.options.fields[m]?this.options.fields[m].feedbackIcons:null),message:b.attr("data-"+l+"-message"),onError:b.attr("data-"+l+"-onerror"),onReset:b.attr("data-"+l+"-onreset"),onStatus:b.attr("data-"+l+"-onstatus"),onSuccess:b.attr("data-"+l+"-onsuccess"),row:b.attr("data-"+l+"-row")||b.attr("data-"+l+"-group")||(this.options.fields&&this.options.fields[m]?this.options.fields[m].group:null),selector:b.attr("data-"+l+"-selector"),threshold:b.attr("data-"+l+"-threshold"),transformer:b.attr("data-"+l+"-transformer"),trigger:b.attr("data-"+l+"-trigger"),verbose:b.attr("data-"+l+"-verbose"),validators:n},r=a.isEmptyObject(q),s=a.isEmptyObject(n);return!s||!r&&this.options.fields&&this.options.fields[m]?q:null},_submit:function(){var b=this.isValid();if(null!==b){var c=b?this.options.events.formSuccess:this.options.events.formError,d=a.Event(c);this.$form.trigger(d),this.$submitButton&&(b?this._onSuccess(d):this._onError(d))}},_onError:function(b){if(!b.isDefaultPrevented()){if("submitted"===this.options.live){this.options.live="enabled";var c=this;for(var d in this.options.fields)!function(b){var d=c.getFieldElements(b);d.length&&c.onLiveChange(d,"live",function(){c._exceedThreshold(a(this))&&c.validateField(a(this))})}(d)}for(var e=this._namespace,f=0;f<this.$invalidFields.length;f++){var g=this.$invalidFields.eq(f),h=this.isOptionEnabled(g.attr("data-"+e+"-field"),"autoFocus");if(h){g.focus();break}}}},_onFieldValidated:function(b,c){var d=this._namespace,e=b.attr("data-"+d+"-field"),f=this.options.fields[e].validators,g={},h=0,i={bv:this,fv:this,field:e,element:b,validator:c,result:b.data(d+".response."+c)};if(c)switch(b.data(d+".result."+c)){case this.STATUS_INVALID:b.trigger(a.Event(this.options.events.validatorError),i);break;case this.STATUS_VALID:b.trigger(a.Event(this.options.events.validatorSuccess),i);break;case this.STATUS_IGNORED:b.trigger(a.Event(this.options.events.validatorIgnored),i)}g[this.STATUS_NOT_VALIDATED]=0,g[this.STATUS_VALIDATING]=0,g[this.STATUS_INVALID]=0,g[this.STATUS_VALID]=0,g[this.STATUS_IGNORED]=0;for(var j in f)if(f[j].enabled!==!1){h++;var k=b.data(d+".result."+j);k&&g[k]++}g[this.STATUS_VALID]+g[this.STATUS_IGNORED]===h?(this.$invalidFields=this.$invalidFields.not(b),b.trigger(a.Event(this.options.events.fieldSuccess),i)):(0===g[this.STATUS_NOT_VALIDATED]||!this.isOptionEnabled(e,"verbose"))&&0===g[this.STATUS_VALIDATING]&&g[this.STATUS_INVALID]>0&&(this.$invalidFields=this.$invalidFields.add(b),b.trigger(a.Event(this.options.events.fieldError),i))},_onSuccess:function(a){a.isDefaultPrevented()||this.disableSubmitButtons(!0).defaultSubmit()},_fixIcon:function(a,b){},_createTooltip:function(a,b,c){},_destroyTooltip:function(a,b){},_hideTooltip:function(a,b){},_showTooltip:function(a,b){},defaultSubmit:function(){var b=this._namespace;this.$submitButton&&a("<input/>").attr({type:"hidden",name:this.$submitButton.attr("name")}).attr("data-"+b+"-submit-hidden","").val(this.$submitButton.val()).appendTo(this.$form),this.$form.off("submit."+b).submit()},disableSubmitButtons:function(a){return a?"disabled"!==this.options.live&&this.$form.find(this.options.button.selector).attr("disabled","disabled").addClass(this.options.button.disabled):this.$form.find(this.options.button.selector).removeAttr("disabled").removeClass(this.options.button.disabled),this},getFieldElements:function(b){if(!this._cacheFields[b])if(this.options.fields[b]&&this.options.fields[b].selector){var c=this.$form.find(this.options.fields[b].selector);this._cacheFields[b]=c.length?c:a(this.options.fields[b].selector)}else this._cacheFields[b]=this.$form.find('[name="'+b+'"]');return this._cacheFields[b]},getFieldValue:function(a,b){var c,d=this._namespace;if("string"==typeof a){if(c=this.getFieldElements(a),0===c.length)return null}else c=a,a=c.attr("data-"+d+"-field");if(!a||!this.options.fields[a])return c.val();var e=(this.options.fields[a].validators&&this.options.fields[a].validators[b]?this.options.fields[a].validators[b].transformer:null)||this.options.fields[a].transformer;return e?FormValidation.Helper.call(e,[c,b,this]):c.val()},getNamespace:function(){return this._namespace},getOptions:function(a,b,c){var d=this._namespace;if(!a)return c?this.options[c]:this.options;if("object"==typeof a&&(a=a.attr("data-"+d+"-field")),!this.options.fields[a])return null;var e=this.options.fields[a];return b?e.validators&&e.validators[b]?c?e.validators[b][c]:e.validators[b]:null:c?e[c]:e},getStatus:function(a,b){var c=this._namespace;switch(typeof a){case"object":return a.data(c+".result."+b);case"string":default:return this.getFieldElements(a).eq(0).data(c+".result."+b)}},isOptionEnabled:function(a,b){return!this.options.fields[a]||"true"!==this.options.fields[a][b]&&this.options.fields[a][b]!==!0?!this.options.fields[a]||"false"!==this.options.fields[a][b]&&this.options.fields[a][b]!==!1?"true"===this.options[b]||this.options[b]===!0:!1:!0},isValid:function(){for(var a in this.options.fields){var b=this.isValidField(a);if(null===b)return null;if(b===!1)return!1}return!0},isValidContainer:function(b){var c=this,d=this._namespace,e=[],f="string"==typeof b?a(b):b;if(0===f.length)return!0;f.find("[data-"+d+"-field]").each(function(){var b=a(this);c._isExcluded(b)||e.push(b)});for(var g=e.length,h=this.options.err.clazz.split(" ").join("."),i=0;g>i;i++){var j=e[i],k=j.attr("data-"+d+"-field"),l=j.data(d+".messages").find("."+h+"[data-"+d+"-validator][data-"+d+'-for="'+k+'"]');if(!this.options.fields||!this.options.fields[k]||"false"!==this.options.fields[k].enabled&&this.options.fields[k].enabled!==!1){if(l.filter("[data-"+d+'-result="'+this.STATUS_INVALID+'"]').length>0)return!1;if(l.filter("[data-"+d+'-result="'+this.STATUS_NOT_VALIDATED+'"]').length>0||l.filter("[data-"+d+'-result="'+this.STATUS_VALIDATING+'"]').length>0)return null}}return!0},isValidField:function(b){var c=this._namespace,d=a([]);switch(typeof b){case"object":d=b,b=b.attr("data-"+c+"-field");break;case"string":d=this.getFieldElements(b)}if(0===d.length||!this.options.fields[b]||"false"===this.options.fields[b].enabled||this.options.fields[b].enabled===!1)return!0;for(var e,f,g,h=d.attr("type"),i="radio"===h||"checkbox"===h?1:d.length,j=0;i>j;j++)if(e=d.eq(j),!this._isExcluded(e))for(f in this.options.fields[b].validators)if(this.options.fields[b].validators[f].enabled!==!1){if(g=e.data(c+".result."+f),g===this.STATUS_VALIDATING||g===this.STATUS_NOT_VALIDATED)return null;if(g===this.STATUS_INVALID)return!1}return!0},offLiveChange:function(b,c){if(null===b||0===b.length)return this;var d=this._namespace,e=this._getFieldTrigger(b.eq(0)),f=a.map(e,function(a){return a+"."+c+"."+d}).join(" ");return b.off(f),this},onLiveChange:function(b,c,d){if(null===b||0===b.length)return this;var e=this._namespace,f=this._getFieldTrigger(b.eq(0)),g=a.map(f,function(a){return a+"."+c+"."+e}).join(" ");switch(this.options.live){case"submitted":break;case"disabled":b.off(g);break;case"enabled":default:b.off(g).on(g,function(a){d.apply(this,arguments)})}return this},updateMessage:function(b,c,d){var e=this._namespace,f=a([]);switch(typeof b){case"object":f=b,b=b.attr("data-"+e+"-field");break;case"string":f=this.getFieldElements(b)}var g=this.options.err.clazz.split(" ").join(".");return f.each(function(){a(this).data(e+".messages").find("."+g+"[data-"+e+'-validator="'+c+'"][data-'+e+'-for="'+b+'"]').html(d)}),this},updateStatus:function(b,c,d){var e=this._namespace,f=a([]);switch(typeof b){case"object":f=b,b=b.attr("data-"+e+"-field");break;case"string":f=this.getFieldElements(b)}if(!b||!this.options.fields[b])return this;c===this.STATUS_NOT_VALIDATED&&(this._submitIfValid=!1);for(var g=this,h=f.attr("type"),i=this.options.fields[b].row||this.options.row.selector,j="radio"===h||"checkbox"===h?1:f.length,k=this.options.err.clazz.split(" ").join("."),l=0;j>l;l++){var m=f.eq(l);if(!this._isExcluded(m)){var n,o,p=m.closest(i),q=m.data(e+".messages"),r=q.find("."+k+"[data-"+e+"-validator][data-"+e+'-for="'+b+'"]'),s=d?r.filter("[data-"+e+'-validator="'+d+'"]'):r,t=m.data(e+".icon"),u="function"==typeof(this.options.fields[b].container||this.options.fields[b].err||this.options.err.container)?(this.options.fields[b].container||this.options.fields[b].err||this.options.err.container).call(this,m,this):this.options.fields[b].container||this.options.fields[b].err||this.options.err.container,v=null;if(d)m.data(e+".result."+d,c);else for(var w in this.options.fields[b].validators)m.data(e+".result."+w,c);switch(s.attr("data-"+e+"-result",c),c){case this.STATUS_VALIDATING:v=null,this.disableSubmitButtons(!0),m.removeClass(this.options.control.valid).removeClass(this.options.control.invalid),p.removeClass(this.options.row.valid).removeClass(this.options.row.invalid),t&&t.removeClass(this.options.icon.valid).removeClass(this.options.icon.invalid).addClass(this.options.icon.validating).show();break;case this.STATUS_INVALID:v=!1,this.disableSubmitButtons(!0),m.removeClass(this.options.control.valid).addClass(this.options.control.invalid),p.removeClass(this.options.row.valid).addClass(this.options.row.invalid),t&&t.removeClass(this.options.icon.valid).removeClass(this.options.icon.validating).addClass(this.options.icon.invalid).show();break;case this.STATUS_IGNORED:case this.STATUS_VALID:n=r.filter("[data-"+e+'-result="'+this.STATUS_VALIDATING+'"]').length>0,o=r.filter("[data-"+e+'-result="'+this.STATUS_NOT_VALIDATED+'"]').length>0;var x=r.filter("[data-"+e+'-result="'+this.STATUS_IGNORED+'"]').length;v=n||o?null:r.filter("[data-"+e+'-result="'+this.STATUS_VALID+'"]').length+x===r.length,m.removeClass(this.options.control.valid).removeClass(this.options.control.invalid),v===!0?(this.disableSubmitButtons(this.isValid()===!1),c===this.STATUS_VALID&&m.addClass(this.options.control.valid)):v===!1&&(this.disableSubmitButtons(!0),c===this.STATUS_VALID&&m.addClass(this.options.control.invalid)),t&&(t.removeClass(this.options.icon.invalid).removeClass(this.options.icon.validating).removeClass(this.options.icon.valid),(c===this.STATUS_VALID||x!==r.length)&&t.addClass(n?this.options.icon.validating:null===v?"":v?this.options.icon.valid:this.options.icon.invalid).show());var y=this.isValidContainer(p);null!==y&&(p.removeClass(this.options.row.valid).removeClass(this.options.row.invalid),(c===this.STATUS_VALID||x!==r.length)&&p.addClass(y?this.options.row.valid:this.options.row.invalid));break;case this.STATUS_NOT_VALIDATED:default:v=null,this.disableSubmitButtons(!1),m.removeClass(this.options.control.valid).removeClass(this.options.control.invalid),p.removeClass(this.options.row.valid).removeClass(this.options.row.invalid),t&&t.removeClass(this.options.icon.valid).removeClass(this.options.icon.invalid).removeClass(this.options.icon.validating).hide()}!t||"tooltip"!==u&&"popover"!==u?c===this.STATUS_INVALID?s.show():s.hide():v===!1?this._createTooltip(m,r.filter("[data-"+e+'-result="'+g.STATUS_INVALID+'"]').eq(0).html(),u):this._destroyTooltip(m,u),m.trigger(a.Event(this.options.events.fieldStatus),{bv:this,fv:this,field:b,element:m,status:c,validator:d}),this._onFieldValidated(m,d)}}return this},validate:function(){if(a.isEmptyObject(this.options.fields))return this._submit(),this;this.$form.trigger(a.Event(this.options.events.formPreValidate)),this.disableSubmitButtons(!0),this._submitIfValid=!1;for(var b in this.options.fields)this.validateField(b);return this._submit(),this._submitIfValid=!0,this},validateField:function(b){var c=this._namespace,d=a([]);switch(typeof b){case"object":d=b,b=b.attr("data-"+c+"-field");break;case"string":d=this.getFieldElements(b)}if(0===d.length||!this.options.fields[b]||"false"===this.options.fields[b].enabled||this.options.fields[b].enabled===!1)return this;for(var e,f,g,h=this,i=d.attr("type"),j="radio"!==i&&"checkbox"!==i||"disabled"===this.options.live?d.length:1,k="radio"===i||"checkbox"===i,l=this.options.fields[b].validators,m=this.isOptionEnabled(b,"verbose"),n=0;j>n;n++){var o=d.eq(n);if(!this._isExcluded(o))for(var p=!1,q=o.data(c+".validators"),r=q.length,s=0;r>s&&(e=q[s].validator,o.data(c+".dfs."+e)&&o.data(c+".dfs."+e).reject(),!p);s++){var t=o.data(c+".result."+e);if(t!==this.STATUS_VALID&&t!==this.STATUS_INVALID)if(l[e].enabled!==!1)if(o.data(c+".result."+e,this.STATUS_VALIDATING),f=l[e].alias||e,g=FormValidation.Validator[f].validate(this,o,l[e],e),"object"==typeof g&&g.resolve)this.updateStatus(k?b:o,this.STATUS_VALIDATING,e),o.data(c+".dfs."+e,g),g.done(function(a,b,d){a.removeData(c+".dfs."+b).data(c+".response."+b,d),d.message&&h.updateMessage(a,b,d.message),h.updateStatus(k?a.attr("data-"+c+"-field"):a,d.valid===!0?h.STATUS_VALID:d.valid===!1?h.STATUS_INVALID:h.STATUS_IGNORED,b),d.valid&&h._submitIfValid===!0?h._submit():d.valid!==!1||m||(p=!0)});else if("object"==typeof g&&void 0!==g.valid){if(o.data(c+".response."+e,g),g.message&&this.updateMessage(k?b:o,e,g.message),this.updateStatus(k?b:o,g.valid===!0?this.STATUS_VALID:g.valid===!1?this.STATUS_INVALID:this.STATUS_IGNORED,e),g.valid===!1&&!m)break}else if("boolean"==typeof g){if(o.data(c+".response."+e,g),this.updateStatus(k?b:o,g?this.STATUS_VALID:this.STATUS_INVALID,e),!g&&!m)break}else null===g&&(o.data(c+".response."+e,g),this.updateStatus(k?b:o,this.STATUS_IGNORED,e));else this.updateStatus(k?b:o,this.STATUS_IGNORED,e);else this._onFieldValidated(o,e)}}return this},addField:function(b,c){var d=this._namespace,e=a([]);switch(typeof b){case"object":e=b,b=b.attr("data-"+d+"-field")||b.attr("name");break;case"string":delete this._cacheFields[b],e=this.getFieldElements(b)}e.attr("data-"+d+"-field",b);for(var f=e.attr("type"),g="radio"===f||"checkbox"===f?1:e.length,h=0;g>h;h++){var i=e.eq(h),j=this._parseOptions(i);j=null===j?c:a.extend(!0,j,c),this.options.fields[b]=a.extend(!0,this.options.fields[b],j),this._cacheFields[b]=this._cacheFields[b]?this._cacheFields[b].add(i):i,this._initField("checkbox"===f||"radio"===f?b:i)}return this.disableSubmitButtons(!1),this.$form.trigger(a.Event(this.options.events.fieldAdded),{field:b,element:e,options:this.options.fields[b]}),this},destroy:function(){var a,b,c,d,e,f,g,h,i=this._namespace;for(b in this.options.fields)for(c=this.getFieldElements(b),a=0;a<c.length;a++){d=c.eq(a);for(e in this.options.fields[b].validators)d.data(i+".dfs."+e)&&d.data(i+".dfs."+e).reject(),d.removeData(i+".result."+e).removeData(i+".response."+e).removeData(i+".dfs."+e),h=this.options.fields[b].validators[e].alias||e,"function"==typeof FormValidation.Validator[h].destroy&&FormValidation.Validator[h].destroy(this,d,this.options.fields[b].validators[e],e)}var j=this.options.err.clazz.split(" ").join(".");for(b in this.options.fields)for(c=this.getFieldElements(b),g=this.options.fields[b].row||this.options.row.selector,a=0;a<c.length;a++){d=c.eq(a);var k=d.data(i+".messages");k&&k.find("."+j+"[data-"+i+"-validator][data-"+i+'-for="'+b+'"]').remove(),d.removeData(i+".messages").removeData(i+".validators").closest(g).removeClass(this.options.row.valid).removeClass(this.options.row.invalid).removeClass(this.options.row.feedback).end().off("."+i).removeAttr("data-"+i+"-field");var l="function"==typeof(this.options.fields[b].container||this.options.fields[b].err||this.options.err.container)?(this.options.fields[b].container||this.options.fields[b].err||this.options.err.container).call(this,d,this):this.options.fields[b].container||this.options.fields[b].err||this.options.err.container;("tooltip"===l||"popover"===l)&&this._destroyTooltip(d,l),f=d.data(i+".icon"),f&&f.remove(),d.removeData(i+".icon").removeData(i+".trigger")}for(var m in this.options.addOns)"function"==typeof FormValidation.AddOn[m].destroy&&FormValidation.AddOn[m].destroy(this,this.options.addOns[m]);this.disableSubmitButtons(!1),this.$hiddenButton.remove(),this.$form.removeClass(this.options.elementClass).off("."+i).removeData("bootstrapValidator").removeData("formValidation").find("[data-"+i+"-submit-hidden]").remove().end().find('[type="submit"]').off("click."+i)},enableFieldValidators:function(a,b,c){var d=this.options.fields[a].validators;if(c&&d&&d[c]&&d[c].enabled!==b)this.options.fields[a].validators[c].enabled=b,this.updateStatus(a,this.STATUS_NOT_VALIDATED,c);else if(!c&&this.options.fields[a].enabled!==b){this.options.fields[a].enabled=b;for(var e in d)this.enableFieldValidators(a,b,e)}return this},getDynamicOption:function(a,b){var c="string"==typeof a?this.getFieldElements(a):a,d=c.val();if("function"==typeof b)return FormValidation.Helper.call(b,[d,this,c]);if("string"==typeof b){var e=this.getFieldElements(b);return e.length?e.val():FormValidation.Helper.call(b,[d,this,c])||b}return null},getForm:function(){return this.$form},getInvalidFields:function(){
return this.$invalidFields},getLocale:function(){return this.options.locale},getMessages:function(b,c){var d=this,e=this._namespace,f=[],g=a([]);switch(!0){case b&&"object"==typeof b:g=b;break;case b&&"string"==typeof b:var h=this.getFieldElements(b);if(h.length>0){var i=h.attr("type");g="radio"===i||"checkbox"===i?h.eq(0):h}break;default:g=this.$invalidFields}var j=c?"[data-"+e+'-validator="'+c+'"]':"",k=this.options.err.clazz.split(" ").join(".");return g.each(function(){f=f.concat(a(this).data(e+".messages").find("."+k+"[data-"+e+'-for="'+a(this).attr("data-"+e+"-field")+'"][data-'+e+'-result="'+d.STATUS_INVALID+'"]'+j).map(function(){var b=a(this).attr("data-"+e+"-validator"),c=a(this).attr("data-"+e+"-for");return d.options.fields[c].validators[b].enabled===!1?"":a(this).html()}).get())}),f},getSubmitButton:function(){return this.$submitButton},removeField:function(b){var c=this._namespace,d=a([]);switch(typeof b){case"object":d=b,b=b.attr("data-"+c+"-field")||b.attr("name"),d.attr("data-"+c+"-field",b);break;case"string":d=this.getFieldElements(b)}if(0===d.length)return this;for(var e=d.attr("type"),f="radio"===e||"checkbox"===e?1:d.length,g=0;f>g;g++){var h=d.eq(g);this.$invalidFields=this.$invalidFields.not(h),this._cacheFields[b]=this._cacheFields[b].not(h)}return this._cacheFields[b]&&0!==this._cacheFields[b].length||delete this.options.fields[b],("checkbox"===e||"radio"===e)&&this._initField(b),this.disableSubmitButtons(!1),this.$form.trigger(a.Event(this.options.events.fieldRemoved),{field:b,element:d}),this},resetField:function(b,c){var d=this._namespace,e=a([]);switch(typeof b){case"object":e=b,b=b.attr("data-"+d+"-field");break;case"string":e=this.getFieldElements(b)}var f=0,g=e.length;if(this.options.fields[b])for(f=0;g>f;f++)for(var h in this.options.fields[b].validators)e.eq(f).removeData(d+".dfs."+h);if(c){var i=e.attr("type");"radio"===i||"checkbox"===i?e.prop("checked",!1).removeAttr("selected"):e.val("")}for(this.updateStatus(b,this.STATUS_NOT_VALIDATED),f=0;g>f;f++)e.eq(f).trigger(a.Event(this.options.events.fieldReset),{fv:this,field:b,element:e.eq(f),resetValue:c});return this},resetForm:function(b){for(var c in this.options.fields)this.resetField(c,b);return this.$invalidFields=a([]),this.$submitButton=null,this.disableSubmitButtons(!1),this.$form.trigger(a.Event(this.options.events.formReset),{fv:this,resetValue:b}),this},revalidateField:function(a){return this.updateStatus(a,this.STATUS_NOT_VALIDATED).validateField(a),this},setLocale:function(b){return this.options.locale=b,this.$form.trigger(a.Event(this.options.events.localeChanged),{locale:b,bv:this,fv:this}),this},updateOption:function(a,b,c,d){var e=this._namespace;return"object"==typeof a&&(a=a.attr("data-"+e+"-field")),this.options.fields[a]&&this.options.fields[a].validators[b]&&(this.options.fields[a].validators[b][c]=d,this.updateStatus(a,this.STATUS_NOT_VALIDATED,b)),this},validateContainer:function(b){var c=this,d=this._namespace,e=[],f="string"==typeof b?a(b):b;if(0===f.length)return this;f.find("[data-"+d+"-field]").each(function(){var b=a(this);c._isExcluded(b)||e.push(b)});for(var g=e.length,h=0;g>h;h++)this.validateField(e[h]);return this}},a.fn.formValidation=function(b){var c=arguments;return this.each(function(){var d=a(this),e=d.data("formValidation"),f="object"==typeof b&&b;if(!e){var g=(f.framework||d.attr("data-fv-framework")||"bootstrap").toLowerCase(),h=g.substr(0,1).toUpperCase()+g.substr(1);if("undefined"==typeof FormValidation.Framework[h])throw new Error("The class FormValidation.Framework."+h+" is not implemented");e=new FormValidation.Framework[h](this,f),d.addClass("fv-form-"+g).data("formValidation",e)}"string"==typeof b&&e[b].apply(e,Array.prototype.slice.call(c,1))})},a.fn.formValidation.Constructor=FormValidation.Base,a.fn.formValidation.DEFAULT_MESSAGE="This value is not valid",a.fn.formValidation.DEFAULT_OPTIONS={autoFocus:!0,declarative:!0,elementClass:"fv-form",events:{formInit:"init.form.fv",formPreValidate:"prevalidate.form.fv",formError:"err.form.fv",formReset:"rst.form.fv",formSuccess:"success.form.fv",fieldAdded:"added.field.fv",fieldRemoved:"removed.field.fv",fieldInit:"init.field.fv",fieldError:"err.field.fv",fieldReset:"rst.field.fv",fieldSuccess:"success.field.fv",fieldStatus:"status.field.fv",localeChanged:"changed.locale.fv",validatorError:"err.validator.fv",validatorSuccess:"success.validator.fv",validatorIgnored:"ignored.validator.fv"},excluded:[":disabled",":hidden",":not(:visible)"],fields:null,live:"enabled",locale:"en_US",message:null,threshold:null,verbose:!0,button:{selector:'[type="submit"]:not([formnovalidate])',disabled:""},control:{valid:"",invalid:""},err:{clazz:"",container:null,parent:null},icon:{valid:null,invalid:null,validating:null,feedback:""},row:{selector:null,valid:"",invalid:"",feedback:""}}}(jQuery),function(a){FormValidation.Helper={call:function(a,b){if("function"==typeof a)return a.apply(this,b);if("string"==typeof a){"()"===a.substring(a.length-2)&&(a=a.substring(0,a.length-2));for(var c=a.split("."),d=c.pop(),e=window,f=0;f<c.length;f++)e=e[c[f]];return"undefined"==typeof e[d]?null:e[d].apply(this,b)}},date:function(a,b,c,d){if(isNaN(a)||isNaN(b)||isNaN(c))return!1;if(c.length>2||b.length>2||a.length>4)return!1;if(c=parseInt(c,10),b=parseInt(b,10),a=parseInt(a,10),1e3>a||a>9999||0>=b||b>12)return!1;var e=[31,28,31,30,31,30,31,31,30,31,30,31];if((a%400===0||a%100!==0&&a%4===0)&&(e[1]=29),0>=c||c>e[b-1])return!1;if(d===!0){var f=new Date,g=f.getFullYear(),h=f.getMonth(),i=f.getDate();return g>a||a===g&&h>b-1||a===g&&b-1===h&&i>c}return!0},format:function(b,c){a.isArray(c)||(c=[c]);for(var d in c)b=b.replace("%s",c[d]);return b},luhn:function(a){for(var b=a.length,c=0,d=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],e=0;b--;)e+=d[c][parseInt(a.charAt(b),10)],c^=1;return e%10===0&&e>0},mod11And10:function(a){for(var b=5,c=a.length,d=0;c>d;d++)b=(2*(b||10)%11+parseInt(a.charAt(d),10))%10;return 1===b},mod37And36:function(a,b){b=b||"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";for(var c=b.length,d=a.length,e=Math.floor(c/2),f=0;d>f;f++)e=(2*(e||c)%(c+1)+b.indexOf(a.charAt(f)))%c;return 1===e}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{base64:{"default":"Please enter a valid base 64 encoded"}}}),FormValidation.Validator.base64={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);return""===e?!0:/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(e)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{between:{"default":"Please enter a value between %s and %s",notInclusive:"Please enter a value between %s and %s strictly"}}}),FormValidation.Validator.between={html5Attributes:{message:"message",min:"min",max:"max",inclusive:"inclusive"},enableByHtml5:function(a){return"range"===a.attr("type")?{min:a.attr("min"),max:a.attr("max")}:!1},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;f=this._format(f);var g=b.getLocale(),h=a.isNumeric(d.min)?d.min:b.getDynamicOption(c,d.min),i=a.isNumeric(d.max)?d.max:b.getDynamicOption(c,d.max),j=this._format(h),k=this._format(i);return d.inclusive===!0||void 0===d.inclusive?{valid:a.isNumeric(f)&&parseFloat(f)>=j&&parseFloat(f)<=k,message:FormValidation.Helper.format(d.message||FormValidation.I18n[g].between["default"],[h,i])}:{valid:a.isNumeric(f)&&parseFloat(f)>j&&parseFloat(f)<k,message:FormValidation.Helper.format(d.message||FormValidation.I18n[g].between.notInclusive,[h,i])}},_format:function(a){return(a+"").replace(",",".")}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{bic:{"default":"Please enter a valid BIC number"}}}),FormValidation.Validator.bic={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);return""===e?!0:/^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/.test(e)}}}(jQuery),function(a){FormValidation.Validator.blank={validate:function(a,b,c,d){return!0}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{callback:{"default":"Please enter a valid value"}}}),FormValidation.Validator.callback={priority:999,html5Attributes:{message:"message",callback:"callback"},validate:function(b,c,d,e){var f=b.getFieldValue(c,e),g=new a.Deferred,h={valid:!0};if(d.callback){var i=FormValidation.Helper.call(d.callback,[f,b,c]);h="boolean"==typeof i||null===i?{valid:i}:i}return g.resolve(c,e,h),g}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{choice:{"default":"Please enter a valid value",less:"Please choose %s options at minimum",more:"Please choose %s options at maximum",between:"Please choose %s - %s options"}}}),FormValidation.Validator.choice={html5Attributes:{message:"message",min:"min",max:"max"},validate:function(b,c,d,e){var f=b.getLocale(),g=b.getNamespace(),h=c.is("select")?b.getFieldElements(c.attr("data-"+g+"-field")).find("option").filter(":selected").length:b.getFieldElements(c.attr("data-"+g+"-field")).filter(":checked").length,i=d.min?a.isNumeric(d.min)?d.min:b.getDynamicOption(c,d.min):null,j=d.max?a.isNumeric(d.max)?d.max:b.getDynamicOption(c,d.max):null,k=!0,l=d.message||FormValidation.I18n[f].choice["default"];switch((i&&h<parseInt(i,10)||j&&h>parseInt(j,10))&&(k=!1),!0){case!!i&&!!j:l=FormValidation.Helper.format(d.message||FormValidation.I18n[f].choice.between,[parseInt(i,10),parseInt(j,10)]);break;case!!i:l=FormValidation.Helper.format(d.message||FormValidation.I18n[f].choice.less,parseInt(i,10));break;case!!j:l=FormValidation.Helper.format(d.message||FormValidation.I18n[f].choice.more,parseInt(j,10))}return{valid:k,message:l}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{color:{"default":"Please enter a valid color"}}}),FormValidation.Validator.color={html5Attributes:{message:"message",type:"type"},enableByHtml5:function(a){return"color"===a.attr("type")},SUPPORTED_TYPES:["hex","rgb","rgba","hsl","hsla","keyword"],KEYWORD_COLORS:["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","transparent","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;if(this.enableByHtml5(c))return/^#[0-9A-F]{6}$/i.test(f);var g=d.type||this.SUPPORTED_TYPES;a.isArray(g)||(g=g.replace(/s/g,"").split(","));for(var h,i,j=!1,k=0;k<g.length;k++)if(i=g[k],h="_"+i.toLowerCase(),j=j||this[h](f))return!0;return!1},_hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},_hsl:function(a){return/^hsl\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/.test(a)},_hsla:function(a){return/^hsla\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/.test(a)},_keyword:function(b){return a.inArray(b,this.KEYWORD_COLORS)>=0},_rgb:function(a){var b=/^rgb\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){2}(\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*)\)$/,c=/^rgb\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/;return b.test(a)||c.test(a)},_rgba:function(a){var b=/^rgba\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/,c=/^rgba\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;return b.test(a)||c.test(a)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{creditCard:{"default":"Please enter a valid credit card number"}}}),FormValidation.Validator.creditCard={validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;if(/[^0-9-\s]+/.test(f))return!1;if(f=f.replace(/\D/g,""),!FormValidation.Helper.luhn(f))return!1;var g,h,i={AMERICAN_EXPRESS:{length:[15],prefix:["34","37"]},DANKORT:{length:[16],prefix:["5019"]},DINERS_CLUB:{length:[14],prefix:["300","301","302","303","304","305","36"]},DINERS_CLUB_US:{length:[16],prefix:["54","55"]},DISCOVER:{length:[16],prefix:["6011","622126","622127","622128","622129","62213","62214","62215","62216","62217","62218","62219","6222","6223","6224","6225","6226","6227","6228","62290","62291","622920","622921","622922","622923","622924","622925","644","645","646","647","648","649","65"]},ELO:{length:[16],prefix:["4011","4312","4389","4514","4573","4576","5041","5066","5067","509","6277","6362","6363","650","6516","6550"]},FORBRUGSFORENINGEN:{length:[16],prefix:["600722"]},JCB:{length:[16],prefix:["3528","3529","353","354","355","356","357","358"]},LASER:{length:[16,17,18,19],prefix:["6304","6706","6771","6709"]},MAESTRO:{length:[12,13,14,15,16,17,18,19],prefix:["5018","5020","5038","5868","6304","6759","6761","6762","6763","6764","6765","6766"]},MASTERCARD:{length:[16],prefix:["51","52","53","54","55"]},SOLO:{length:[16,18,19],prefix:["6334","6767"]},UNIONPAY:{length:[16,17,18,19],prefix:["622126","622127","622128","622129","62213","62214","62215","62216","62217","62218","62219","6222","6223","6224","6225","6226","6227","6228","62290","62291","622920","622921","622922","622923","622924","622925"]},VISA_ELECTRON:{length:[16],prefix:["4026","417500","4405","4508","4844","4913","4917"]},VISA:{length:[16],prefix:["4"]}};for(g in i)for(h in i[g].prefix)if(f.substr(0,i[g].prefix[h].length)===i[g].prefix[h]&&-1!==a.inArray(f.length,i[g].length))return{valid:!0,type:g};return!1}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{cusip:{"default":"Please enter a valid CUSIP number"}}}),FormValidation.Validator.cusip={validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;if(f=f.toUpperCase(),!/^[0-9A-Z]{9}$/.test(f))return!1;for(var g=a.map(f.split(""),function(a){var b=a.charCodeAt(0);return b>="A".charCodeAt(0)&&b<="Z".charCodeAt(0)?b-"A".charCodeAt(0)+10:a}),h=g.length,i=0,j=0;h-1>j;j++){var k=parseInt(g[j],10);j%2!==0&&(k*=2),k>9&&(k-=9),i+=k}return i=(10-i%10)%10,i===parseInt(g[h-1],10)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{cvv:{"default":"Please enter a valid CVV number"}}}),FormValidation.Validator.cvv={html5Attributes:{message:"message",ccfield:"creditCardField"},init:function(a,b,c,d){if(c.creditCardField){var e=a.getFieldElements(c.creditCardField);a.onLiveChange(e,"live_"+d,function(){var c=a.getStatus(b,d);c!==a.STATUS_NOT_VALIDATED&&a.revalidateField(b)})}},destroy:function(a,b,c,d){if(c.creditCardField){var e=a.getFieldElements(c.creditCardField);a.offLiveChange(e,"live_"+d)}},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;if(!/^[0-9]{3,4}$/.test(f))return!1;if(!d.creditCardField)return!0;var g=b.getFieldValue(d.creditCardField,"creditCard");if(null===g||""===g)return!0;g=g.replace(/\D/g,"");var h,i,j={AMERICAN_EXPRESS:{length:[15],prefix:["34","37"]},DANKORT:{length:[16],prefix:["5019"]},DINERS_CLUB:{length:[14],prefix:["300","301","302","303","304","305","36"]},DINERS_CLUB_US:{length:[16],prefix:["54","55"]},DISCOVER:{length:[16],prefix:["6011","622126","622127","622128","622129","62213","62214","62215","62216","62217","62218","62219","6222","6223","6224","6225","6226","6227","6228","62290","62291","622920","622921","622922","622923","622924","622925","644","645","646","647","648","649","65"]},ELO:{length:[16],prefix:["4011","4312","4389","4514","4573","4576","5041","5066","5067","509","6277","6362","6363","650","6516","6550"]},FORBRUGSFORENINGEN:{length:[16],prefix:["600722"]},JCB:{length:[16],prefix:["3528","3529","353","354","355","356","357","358"]},LASER:{length:[16,17,18,19],prefix:["6304","6706","6771","6709"]},MAESTRO:{length:[12,13,14,15,16,17,18,19],prefix:["5018","5020","5038","5868","6304","6759","6761","6762","6763","6764","6765","6766"]},MASTERCARD:{length:[16],prefix:["51","52","53","54","55"]},SOLO:{length:[16,18,19],prefix:["6334","6767"]},UNIONPAY:{length:[16,17,18,19],prefix:["622126","622127","622128","622129","62213","62214","62215","62216","62217","62218","62219","6222","6223","6224","6225","6226","6227","6228","62290","62291","622920","622921","622922","622923","622924","622925"]},VISA_ELECTRON:{length:[16],prefix:["4026","417500","4405","4508","4844","4913","4917"]},VISA:{length:[16],prefix:["4"]}},k=null;for(h in j)for(i in j[h].prefix)if(g.substr(0,j[h].prefix[i].length)===j[h].prefix[i]&&-1!==a.inArray(g.length,j[h].length)){k=h;break}return null===k?!1:"AMERICAN_EXPRESS"===k?4===f.length:3===f.length}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{date:{"default":"Please enter a valid date",min:"Please enter a date after %s",max:"Please enter a date before %s",range:"Please enter a date in the range %s - %s"}}}),FormValidation.Validator.date={html5Attributes:{message:"message",format:"format",min:"min",max:"max",separator:"separator"},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;d.format=d.format||"MM/DD/YYYY","date"===c.attr("type")&&(d.format="YYYY-MM-DD");var g=b.getLocale(),h=d.message||FormValidation.I18n[g].date["default"],i=d.format.split(" "),j=i[0],k=i.length>1?i[1]:null,l=i.length>2?i[2]:null,m=f.split(" "),n=m[0],o=m.length>1?m[1]:null;if(i.length!==m.length)return{valid:!1,message:h};var p=d.separator;if(p||(p=-1!==n.indexOf("/")?"/":-1!==n.indexOf("-")?"-":-1!==n.indexOf(".")?".":null),null===p||-1===n.indexOf(p))return{valid:!1,message:h};if(n=n.split(p),j=j.split(p),n.length!==j.length)return{valid:!1,message:h};var q=n[a.inArray("YYYY",j)],r=n[a.inArray("MM",j)],s=n[a.inArray("DD",j)];if(!q||!r||!s||4!==q.length)return{valid:!1,message:h};var t=null,u=null,v=null;if(k){if(k=k.split(":"),o=o.split(":"),k.length!==o.length)return{valid:!1,message:h};if(u=o.length>0?o[0]:null,t=o.length>1?o[1]:null,v=o.length>2?o[2]:null,""===u||""===t||""===v)return{valid:!1,message:h};if(v){if(isNaN(v)||v.length>2)return{valid:!1,message:h};if(v=parseInt(v,10),0>v||v>60)return{valid:!1,message:h}}if(u){if(isNaN(u)||u.length>2)return{valid:!1,message:h};if(u=parseInt(u,10),0>u||u>=24||l&&u>12)return{valid:!1,message:h}}if(t){if(isNaN(t)||t.length>2)return{valid:!1,message:h};if(t=parseInt(t,10),0>t||t>59)return{valid:!1,message:h}}}var w=FormValidation.Helper.date(q,r,s),x=null,y=null,z=d.min,A=d.max;switch(z&&(x=z instanceof Date?z:this._parseDate(z,j,p)||this._parseDate(b.getDynamicOption(c,z),j,p),z=this._formatDate(x,d.format)),A&&(y=A instanceof Date?A:this._parseDate(A,j,p)||this._parseDate(b.getDynamicOption(c,A),j,p),A=this._formatDate(y,d.format)),n=new Date(q,r-1,s,u,t,v),!0){case z&&!A&&w:w=n.getTime()>=x.getTime(),h=d.message||FormValidation.Helper.format(FormValidation.I18n[g].date.min,z);break;case A&&!z&&w:w=n.getTime()<=y.getTime(),h=d.message||FormValidation.Helper.format(FormValidation.I18n[g].date.max,A);break;case A&&z&&w:w=n.getTime()<=y.getTime()&&n.getTime()>=x.getTime(),h=d.message||FormValidation.Helper.format(FormValidation.I18n[g].date.range,[z,A])}return{valid:w,date:n,message:h}},_parseDate:function(b,c,d){if(b instanceof Date)return b;if("string"!=typeof b)return null;var e=a.inArray("YYYY",c),f=a.inArray("MM",c),g=a.inArray("DD",c);if(-1===e||-1===f||-1===g)return null;var h=0,i=0,j=0,k=b.split(" "),l=k[0].split(d);if(l.length<3)return null;if(k.length>1){var m=k[1].split(":");i=m.length>0?m[0]:null,h=m.length>1?m[1]:null,j=m.length>2?m[2]:null}return new Date(l[e],l[f]-1,l[g],i,h,j)},_formatDate:function(a,b){b=b.replace(/Y/g,"y").replace(/M/g,"m").replace(/D/g,"d").replace(/:m/g,":M").replace(/:mm/g,":MM").replace(/:S/,":s").replace(/:SS/,":ss");var c={d:function(a){return a.getDate()},dd:function(a){var b=a.getDate();return 10>b?"0"+b:b},m:function(a){return a.getMonth()+1},mm:function(a){var b=a.getMonth()+1;return 10>b?"0"+b:b},yy:function(a){return(""+a.getFullYear()).substr(2)},yyyy:function(a){return a.getFullYear()},h:function(a){return a.getHours()%12||12},hh:function(a){var b=a.getHours()%12||12;return 10>b?"0"+b:b},H:function(a){return a.getHours()},HH:function(a){var b=a.getHours();return 10>b?"0"+b:b},M:function(a){return a.getMinutes()},MM:function(a){var b=a.getMinutes();return 10>b?"0"+b:b},s:function(a){return a.getSeconds()},ss:function(a){var b=a.getSeconds();return 10>b?"0"+b:b}};return b.replace(/d{1,4}|m{1,4}|yy(?:yy)?|([HhMs])\1?|"[^"]*"|'[^']*'/g,function(b){return c[b]?c[b](a):b.slice(1,b.length-1)})}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{different:{"default":"Please enter a different value"}}}),FormValidation.Validator.different={html5Attributes:{message:"message",field:"field"},init:function(b,c,d,e){for(var f=d.field.split(","),g=0;g<f.length;g++){var h=b.getFieldElements(a.trim(f[g]));b.onLiveChange(h,"live_"+e,function(){var a=b.getStatus(c,e);a!==b.STATUS_NOT_VALIDATED&&b.revalidateField(c)})}},destroy:function(b,c,d,e){for(var f=d.field.split(","),g=0;g<f.length;g++){var h=b.getFieldElements(a.trim(f[g]));b.offLiveChange(h,"live_"+e)}},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;for(var g=d.field.split(","),h=!0,i=0;i<g.length;i++){var j=b.getFieldElements(a.trim(g[i]));if(null!=j&&0!==j.length){var k=b.getFieldValue(j,e);f===k?h=!1:""!==k&&b.updateStatus(j,b.STATUS_VALID,e)}}return h}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{digits:{"default":"Please enter only digits"}}}),FormValidation.Validator.digits={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);return""===e?!0:/^\d+$/.test(e)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{ean:{"default":"Please enter a valid EAN number"}}}),FormValidation.Validator.ean={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;if(!/^(\d{8}|\d{12}|\d{13})$/.test(e))return!1;for(var f=e.length,g=0,h=8===f?[3,1]:[1,3],i=0;f-1>i;i++)g+=parseInt(e.charAt(i),10)*h[i%2];return g=(10-g%10)%10,g+""===e.charAt(f-1)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{ein:{"default":"Please enter a valid EIN number"}}}),FormValidation.Validator.ein={CAMPUS:{ANDOVER:["10","12"],ATLANTA:["60","67"],AUSTIN:["50","53"],BROOKHAVEN:["01","02","03","04","05","06","11","13","14","16","21","22","23","25","34","51","52","54","55","56","57","58","59","65"],CINCINNATI:["30","32","35","36","37","38","61"],FRESNO:["15","24"],KANSAS_CITY:["40","44"],MEMPHIS:["94","95"],OGDEN:["80","90"],PHILADELPHIA:["33","39","41","42","43","48","62","63","64","66","68","71","72","73","74","75","76","77","81","82","83","84","85","86","87","88","91","92","93","98","99"],INTERNET:["20","26","27","45","46","47"],SMALL_BUSINESS_ADMINISTRATION:["31"]},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;if(!/^[0-9]{2}-?[0-9]{7}$/.test(f))return!1;var g=f.substr(0,2)+"";for(var h in this.CAMPUS)if(-1!==a.inArray(g,this.CAMPUS[h]))return{valid:!0,campus:h};return!1}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{emailAddress:{"default":"Please enter a valid email address"}}}),FormValidation.Validator.emailAddress={html5Attributes:{message:"message",multiple:"multiple",separator:"separator"},enableByHtml5:function(a){return"email"===a.attr("type")},validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;var f=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,g=c.multiple===!0||"true"===c.multiple;if(g){for(var h=c.separator||/[,;]/,i=this._splitEmailAddresses(e,h),j=0;j<i.length;j++)if(!f.test(i[j]))return!1;return!0}return f.test(e)},_splitEmailAddresses:function(a,b){for(var c=a.split(/"/),d=c.length,e=[],f="",g=0;d>g;g++)if(g%2===0){var h=c[g].split(b),i=h.length;if(1===i)f+=h[0];else{e.push(f+h[0]);for(var j=1;i-1>j;j++)e.push(h[j]);f=h[i-1]}}else f+='"'+c[g],d-1>g&&(f+='"');return e.push(f),e}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{file:{"default":"Please choose a valid file"}}}),FormValidation.Validator.file={Error:{EXTENSION:"EXTENSION",MAX_FILES:"MAX_FILES",MAX_SIZE:"MAX_SIZE",MAX_TOTAL_SIZE:"MAX_TOTAL_SIZE",MIN_FILES:"MIN_FILES",MIN_SIZE:"MIN_SIZE",MIN_TOTAL_SIZE:"MIN_TOTAL_SIZE",TYPE:"TYPE"},html5Attributes:{extension:"extension",maxfiles:"maxFiles",minfiles:"minFiles",maxsize:"maxSize",minsize:"minSize",maxtotalsize:"maxTotalSize",mintotalsize:"minTotalSize",message:"message",type:"type"},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;var g,h=d.extension?d.extension.toLowerCase().split(","):null,i=d.type?d.type.toLowerCase().split(","):null,j=window.File&&window.FileList&&window.FileReader;if(j){var k=c.get(0).files,l=k.length,m=0;if(d.maxFiles&&l>parseInt(d.maxFiles,10))return{valid:!1,error:this.Error.MAX_FILES};if(d.minFiles&&l<parseInt(d.minFiles,10))return{valid:!1,error:this.Error.MIN_FILES};for(var n={},o=0;l>o;o++){if(m+=k[o].size,g=k[o].name.substr(k[o].name.lastIndexOf(".")+1),n={file:k[o],size:k[o].size,ext:g,type:k[o].type},d.minSize&&k[o].size<parseInt(d.minSize,10))return{valid:!1,error:this.Error.MIN_SIZE,metaData:n};if(d.maxSize&&k[o].size>parseInt(d.maxSize,10))return{valid:!1,error:this.Error.MAX_SIZE,metaData:n};if(h&&-1===a.inArray(g.toLowerCase(),h))return{valid:!1,error:this.Error.EXTENSION,metaData:n};if(k[o].type&&i&&-1===a.inArray(k[o].type.toLowerCase(),i))return{valid:!1,error:this.Error.TYPE,metaData:n}}if(d.maxTotalSize&&m>parseInt(d.maxTotalSize,10))return{valid:!1,error:this.Error.MAX_TOTAL_SIZE,metaData:{totalSize:m}};if(d.minTotalSize&&m<parseInt(d.minTotalSize,10))return{valid:!1,error:this.Error.MIN_TOTAL_SIZE,metaData:{totalSize:m}}}else if(g=f.substr(f.lastIndexOf(".")+1),h&&-1===a.inArray(g.toLowerCase(),h))return{valid:!1,error:this.Error.EXTENSION,metaData:{ext:g}};return!0}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{greaterThan:{"default":"Please enter a value greater than or equal to %s",notInclusive:"Please enter a value greater than %s"}}}),FormValidation.Validator.greaterThan={html5Attributes:{message:"message",value:"value",inclusive:"inclusive"},enableByHtml5:function(a){var b=a.attr("type"),c=a.attr("min");return c&&"date"!==b?{value:c}:!1},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;f=this._format(f);var g=b.getLocale(),h=a.isNumeric(d.value)?d.value:b.getDynamicOption(c,d.value),i=this._format(h);return d.inclusive===!0||void 0===d.inclusive?{valid:a.isNumeric(f)&&parseFloat(f)>=i,message:FormValidation.Helper.format(d.message||FormValidation.I18n[g].greaterThan["default"],h)}:{valid:a.isNumeric(f)&&parseFloat(f)>i,message:FormValidation.Helper.format(d.message||FormValidation.I18n[g].greaterThan.notInclusive,h)}},_format:function(a){return(a+"").replace(",",".")}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{grid:{"default":"Please enter a valid GRId number"}}}),FormValidation.Validator.grid={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);return""===e?!0:(e=e.toUpperCase(),/^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g.test(e)?(e=e.replace(/\s/g,"").replace(/-/g,""),"GRID:"===e.substr(0,5)&&(e=e.substr(5)),FormValidation.Helper.mod37And36(e)):!1)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{hex:{"default":"Please enter a valid hexadecimal number"}}}),FormValidation.Validator.hex={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);return""===e?!0:/^[0-9a-fA-F]+$/.test(e)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{iban:{"default":"Please enter a valid IBAN number",country:"Please enter a valid IBAN number in %s",countries:{AD:"Andorra",AE:"United Arab Emirates",AL:"Albania",AO:"Angola",AT:"Austria",AZ:"Azerbaijan",BA:"Bosnia and Herzegovina",BE:"Belgium",BF:"Burkina Faso",BG:"Bulgaria",BH:"Bahrain",BI:"Burundi",BJ:"Benin",BR:"Brazil",CH:"Switzerland",CI:"Ivory Coast",CM:"Cameroon",CR:"Costa Rica",CV:"Cape Verde",CY:"Cyprus",CZ:"Czech Republic",DE:"Germany",DK:"Denmark",DO:"Dominican Republic",DZ:"Algeria",EE:"Estonia",ES:"Spain",FI:"Finland",FO:"Faroe Islands",FR:"France",GB:"United Kingdom",GE:"Georgia",GI:"Gibraltar",GL:"Greenland",GR:"Greece",GT:"Guatemala",HR:"Croatia",HU:"Hungary",IE:"Ireland",IL:"Israel",IR:"Iran",IS:"Iceland",IT:"Italy",JO:"Jordan",KW:"Kuwait",KZ:"Kazakhstan",LB:"Lebanon",LI:"Liechtenstein",LT:"Lithuania",LU:"Luxembourg",LV:"Latvia",MC:"Monaco",MD:"Moldova",ME:"Montenegro",MG:"Madagascar",MK:"Macedonia",ML:"Mali",MR:"Mauritania",MT:"Malta",MU:"Mauritius",MZ:"Mozambique",NL:"Netherlands",NO:"Norway",PK:"Pakistan",PL:"Poland",PS:"Palestine",PT:"Portugal",QA:"Qatar",RO:"Romania",RS:"Serbia",SA:"Saudi Arabia",SE:"Sweden",SI:"Slovenia",SK:"Slovakia",SM:"San Marino",SN:"Senegal",TL:"East Timor",TN:"Tunisia",TR:"Turkey",VG:"Virgin Islands, British",XK:"Republic of Kosovo"}}}}),FormValidation.Validator.iban={html5Attributes:{message:"message",country:"country",sepa:"sepa"},REGEX:{AD:"AD[0-9]{2}[0-9]{4}[0-9]{4}[A-Z0-9]{12}",AE:"AE[0-9]{2}[0-9]{3}[0-9]{16}",AL:"AL[0-9]{2}[0-9]{8}[A-Z0-9]{16}",AO:"AO[0-9]{2}[0-9]{21}",AT:"AT[0-9]{2}[0-9]{5}[0-9]{11}",AZ:"AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}",BA:"BA[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}",BE:"BE[0-9]{2}[0-9]{3}[0-9]{7}[0-9]{2}",BF:"BF[0-9]{2}[0-9]{23}",BG:"BG[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}",BH:"BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}",BI:"BI[0-9]{2}[0-9]{12}",BJ:"BJ[0-9]{2}[A-Z]{1}[0-9]{23}",BR:"BR[0-9]{2}[0-9]{8}[0-9]{5}[0-9]{10}[A-Z][A-Z0-9]",CH:"CH[0-9]{2}[0-9]{5}[A-Z0-9]{12}",CI:"CI[0-9]{2}[A-Z]{1}[0-9]{23}",CM:"CM[0-9]{2}[0-9]{23}",CR:"CR[0-9]{2}[0-9]{3}[0-9]{14}",CV:"CV[0-9]{2}[0-9]{21}",CY:"CY[0-9]{2}[0-9]{3}[0-9]{5}[A-Z0-9]{16}",CZ:"CZ[0-9]{2}[0-9]{20}",DE:"DE[0-9]{2}[0-9]{8}[0-9]{10}",DK:"DK[0-9]{2}[0-9]{14}",DO:"DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}",DZ:"DZ[0-9]{2}[0-9]{20}",EE:"EE[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}",ES:"ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}",FI:"FI[0-9]{2}[0-9]{6}[0-9]{7}[0-9]{1}",FO:"FO[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",FR:"FR[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",GB:"GB[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",GE:"GE[0-9]{2}[A-Z]{2}[0-9]{16}",GI:"GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}",GL:"GL[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",GR:"GR[0-9]{2}[0-9]{3}[0-9]{4}[A-Z0-9]{16}",GT:"GT[0-9]{2}[A-Z0-9]{4}[A-Z0-9]{20}",HR:"HR[0-9]{2}[0-9]{7}[0-9]{10}",HU:"HU[0-9]{2}[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}",
IE:"IE[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",IL:"IL[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{13}",IR:"IR[0-9]{2}[0-9]{22}",IS:"IS[0-9]{2}[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}",IT:"IT[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",JO:"JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}",KW:"KW[0-9]{2}[A-Z]{4}[0-9]{22}",KZ:"KZ[0-9]{2}[0-9]{3}[A-Z0-9]{13}",LB:"LB[0-9]{2}[0-9]{4}[A-Z0-9]{20}",LI:"LI[0-9]{2}[0-9]{5}[A-Z0-9]{12}",LT:"LT[0-9]{2}[0-9]{5}[0-9]{11}",LU:"LU[0-9]{2}[0-9]{3}[A-Z0-9]{13}",LV:"LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}",MC:"MC[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",MD:"MD[0-9]{2}[A-Z0-9]{20}",ME:"ME[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",MG:"MG[0-9]{2}[0-9]{23}",MK:"MK[0-9]{2}[0-9]{3}[A-Z0-9]{10}[0-9]{2}",ML:"ML[0-9]{2}[A-Z]{1}[0-9]{23}",MR:"MR13[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}",MT:"MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}",MU:"MU[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}",MZ:"MZ[0-9]{2}[0-9]{21}",NL:"NL[0-9]{2}[A-Z]{4}[0-9]{10}",NO:"NO[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{1}",PK:"PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",PL:"PL[0-9]{2}[0-9]{8}[0-9]{16}",PS:"PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",PT:"PT[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}",QA:"QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",RO:"RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",RS:"RS[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",SA:"SA[0-9]{2}[0-9]{2}[A-Z0-9]{18}",SE:"SE[0-9]{2}[0-9]{3}[0-9]{16}[0-9]{1}",SI:"SI[0-9]{2}[0-9]{5}[0-9]{8}[0-9]{2}",SK:"SK[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{10}",SM:"SM[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",SN:"SN[0-9]{2}[A-Z]{1}[0-9]{23}",TL:"TL38[0-9]{3}[0-9]{14}[0-9]{2}",TN:"TN59[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",TR:"TR[0-9]{2}[0-9]{5}[A-Z0-9]{1}[A-Z0-9]{16}",VG:"VG[0-9]{2}[A-Z]{4}[0-9]{16}",XK:"XK[0-9]{2}[0-9]{4}[0-9]{10}[0-9]{2}"},SEPA_COUNTRIES:["AT","BE","BG","CH","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GI","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","MC","MT","NL","NO","PL","PT","RO","SE","SI","SK","SM"],validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;f=f.replace(/[^a-zA-Z0-9]/g,"").toUpperCase();var g=d.country;g?"string"==typeof g&&this.REGEX[g]||(g=b.getDynamicOption(c,g)):g=f.substr(0,2);var h=b.getLocale();if(!this.REGEX[g])return!1;if(void 0!==typeof d.sepa){var i=-1!==a.inArray(g,this.SEPA_COUNTRIES);if(("true"===d.sepa||d.sepa===!0)&&!i||("false"===d.sepa||d.sepa===!1)&&i)return!1}if(!new RegExp("^"+this.REGEX[g]+"$").test(f))return{valid:!1,message:FormValidation.Helper.format(d.message||FormValidation.I18n[h].iban.country,FormValidation.I18n[h].iban.countries[g])};f=f.substr(4)+f.substr(0,4),f=a.map(f.split(""),function(a){var b=a.charCodeAt(0);return b>="A".charCodeAt(0)&&b<="Z".charCodeAt(0)?b-"A".charCodeAt(0)+10:a}),f=f.join("");for(var j=parseInt(f.substr(0,1),10),k=f.length,l=1;k>l;++l)j=(10*j+parseInt(f.substr(l,1),10))%97;return{valid:1===j,message:FormValidation.Helper.format(d.message||FormValidation.I18n[h].iban.country,FormValidation.I18n[h].iban.countries[g])}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{id:{"default":"Please enter a valid identification number",country:"Please enter a valid identification number in %s",countries:{BA:"Bosnia and Herzegovina",BG:"Bulgaria",BR:"Brazil",CH:"Switzerland",CL:"Chile",CN:"China",CZ:"Czech Republic",DK:"Denmark",EE:"Estonia",ES:"Spain",FI:"Finland",HR:"Croatia",IE:"Ireland",IS:"Iceland",LT:"Lithuania",LV:"Latvia",ME:"Montenegro",MK:"Macedonia",NL:"Netherlands",PL:"Poland",RO:"Romania",RS:"Serbia",SE:"Sweden",SI:"Slovenia",SK:"Slovakia",SM:"San Marino",TH:"Thailand",TR:"Turkey",ZA:"South Africa"}}}}),FormValidation.Validator.id={html5Attributes:{message:"message",country:"country"},COUNTRY_CODES:["BA","BG","BR","CH","CL","CN","CZ","DK","EE","ES","FI","HR","IE","IS","LT","LV","ME","MK","NL","PL","RO","RS","SE","SI","SK","SM","TH","TR","ZA"],validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;var g=b.getLocale(),h=d.country;if(h?("string"!=typeof h||-1===a.inArray(h.toUpperCase(),this.COUNTRY_CODES))&&(h=b.getDynamicOption(c,h)):h=f.substr(0,2),-1===a.inArray(h,this.COUNTRY_CODES))return!0;var i=["_",h.toLowerCase()].join(""),j=this[i](f);return j=j===!0||j===!1?{valid:j}:j,j.message=FormValidation.Helper.format(d.message||FormValidation.I18n[g].id.country,FormValidation.I18n[g].id.countries[h.toUpperCase()]),j},_validateJMBG:function(a,b){if(!/^\d{13}$/.test(a))return!1;var c=parseInt(a.substr(0,2),10),d=parseInt(a.substr(2,2),10),e=(parseInt(a.substr(4,3),10),parseInt(a.substr(7,2),10)),f=parseInt(a.substr(12,1),10);if(c>31||d>12)return!1;for(var g=0,h=0;6>h;h++)g+=(7-h)*(parseInt(a.charAt(h),10)+parseInt(a.charAt(h+6),10));if(g=11-g%11,(10===g||11===g)&&(g=0),g!==f)return!1;switch(b.toUpperCase()){case"BA":return e>=10&&19>=e;case"MK":return e>=41&&49>=e;case"ME":return e>=20&&29>=e;case"RS":return e>=70&&99>=e;case"SI":return e>=50&&59>=e;default:return!0}},_ba:function(a){return this._validateJMBG(a,"BA")},_mk:function(a){return this._validateJMBG(a,"MK")},_me:function(a){return this._validateJMBG(a,"ME")},_rs:function(a){return this._validateJMBG(a,"RS")},_si:function(a){return this._validateJMBG(a,"SI")},_bg:function(a){if(!/^\d{10}$/.test(a)&&!/^\d{6}\s\d{3}\s\d{1}$/.test(a))return!1;a=a.replace(/\s/g,"");var b=parseInt(a.substr(0,2),10)+1900,c=parseInt(a.substr(2,2),10),d=parseInt(a.substr(4,2),10);if(c>40?(b+=100,c-=40):c>20&&(b-=100,c-=20),!FormValidation.Helper.date(b,c,d))return!1;for(var e=0,f=[2,4,8,5,10,9,7,3,6],g=0;9>g;g++)e+=parseInt(a.charAt(g),10)*f[g];return e=e%11%10,e+""===a.substr(9,1)},_br:function(a){if(a=a.replace(/\D/g,""),!/^\d{11}$/.test(a)||/^1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}$/.test(a))return!1;for(var b=0,c=0;9>c;c++)b+=(10-c)*parseInt(a.charAt(c),10);if(b=11-b%11,(10===b||11===b)&&(b=0),b+""!==a.charAt(9))return!1;var d=0;for(c=0;10>c;c++)d+=(11-c)*parseInt(a.charAt(c),10);return d=11-d%11,(10===d||11===d)&&(d=0),d+""===a.charAt(10)},_ch:function(a){if(!/^756[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{2}$/.test(a))return!1;a=a.replace(/\D/g,"").substr(3);for(var b=a.length,c=0,d=8===b?[3,1]:[1,3],e=0;b-1>e;e++)c+=parseInt(a.charAt(e),10)*d[e%2];return c=10-c%10,c+""===a.charAt(b-1)},_cl:function(a){if(!/^\d{7,8}[-]{0,1}[0-9K]$/i.test(a))return!1;for(a=a.replace(/\-/g,"");a.length<9;)a="0"+a;for(var b=0,c=[3,2,7,6,5,4,3,2],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b=11-b%11,11===b?b=0:10===b&&(b="K"),b+""===a.charAt(8).toUpperCase()},_cn:function(b){if(b=b.trim(),!/^\d{15}$/.test(b)&&!/^\d{17}[\dXx]{1}$/.test(b))return!1;var c={11:{0:[0],1:[[0,9],[11,17]],2:[0,28,29]},12:{0:[0],1:[[0,16]],2:[0,21,23,25]},13:{0:[0],1:[[0,5],7,8,21,[23,33],[81,85]],2:[[0,5],[7,9],[23,25],27,29,30,81,83],3:[[0,4],[21,24]],4:[[0,4],6,21,[23,35],81],5:[[0,3],[21,35],81,82],6:[[0,4],[21,38],[81,84]],7:[[0,3],5,6,[21,33]],8:[[0,4],[21,28]],9:[[0,3],[21,30],[81,84]],10:[[0,3],[22,26],28,81,82],11:[[0,2],[21,28],81,82]},14:{0:[0],1:[0,1,[5,10],[21,23],81],2:[[0,3],11,12,[21,27]],3:[[0,3],11,21,22],4:[[0,2],11,21,[23,31],81],5:[[0,2],21,22,24,25,81],6:[[0,3],[21,24]],7:[[0,2],[21,29],81],8:[[0,2],[21,30],81,82],9:[[0,2],[21,32],81],10:[[0,2],[21,34],81,82],11:[[0,2],[21,30],81,82],23:[[0,3],22,23,[25,30],32,33]},15:{0:[0],1:[[0,5],[21,25]],2:[[0,7],[21,23]],3:[[0,4]],4:[[0,4],[21,26],[28,30]],5:[[0,2],[21,26],81],6:[[0,2],[21,27]],7:[[0,3],[21,27],[81,85]],8:[[0,2],[21,26]],9:[[0,2],[21,29],81],22:[[0,2],[21,24]],25:[[0,2],[22,31]],26:[[0,2],[24,27],[29,32],34],28:[0,1,[22,27]],29:[0,[21,23]]},21:{0:[0],1:[[0,6],[11,14],[22,24],81],2:[[0,4],[11,13],24,[81,83]],3:[[0,4],11,21,23,81],4:[[0,4],11,[21,23]],5:[[0,5],21,22],6:[[0,4],24,81,82],7:[[0,3],11,26,27,81,82],8:[[0,4],11,81,82],9:[[0,5],11,21,22],10:[[0,5],11,21,81],11:[[0,3],21,22],12:[[0,2],4,21,23,24,81,82],13:[[0,3],21,22,24,81,82],14:[[0,4],21,22,81]},22:{0:[0],1:[[0,6],12,22,[81,83]],2:[[0,4],11,21,[81,84]],3:[[0,3],22,23,81,82],4:[[0,3],21,22],5:[[0,3],21,23,24,81,82],6:[[0,2],4,5,[21,23],25,81],7:[[0,2],[21,24],81],8:[[0,2],21,22,81,82],24:[[0,6],24,26]},23:{0:[0],1:[[0,12],21,[23,29],[81,84]],2:[[0,8],21,[23,25],27,[29,31],81],3:[[0,7],21,81,82],4:[[0,7],21,22],5:[[0,3],5,6,[21,24]],6:[[0,6],[21,24]],7:[[0,16],22,81],8:[[0,5],11,22,26,28,33,81,82],9:[[0,4],21],10:[[0,5],24,25,81,[83,85]],11:[[0,2],21,23,24,81,82],12:[[0,2],[21,26],[81,83]],27:[[0,4],[21,23]]},31:{0:[0],1:[0,1,[3,10],[12,20]],2:[0,30]},32:{0:[0],1:[[0,7],11,[13,18],24,25],2:[[0,6],11,81,82],3:[[0,5],11,12,[21,24],81,82],4:[[0,2],4,5,11,12,81,82],5:[[0,9],[81,85]],6:[[0,2],11,12,21,23,[81,84]],7:[0,1,3,5,6,[21,24]],8:[[0,4],11,26,[29,31]],9:[[0,3],[21,25],28,81,82],10:[[0,3],11,12,23,81,84,88],11:[[0,2],11,12,[81,83]],12:[[0,4],[81,84]],13:[[0,2],11,[21,24]]},33:{0:[0],1:[[0,6],[8,10],22,27,82,83,85],2:[0,1,[3,6],11,12,25,26,[81,83]],3:[[0,4],22,24,[26,29],81,82],4:[[0,2],11,21,24,[81,83]],5:[[0,3],[21,23]],6:[[0,2],21,24,[81,83]],7:[[0,3],23,26,27,[81,84]],8:[[0,3],22,24,25,81],9:[[0,3],21,22],10:[[0,4],[21,24],81,82],11:[[0,2],[21,27],81]},34:{0:[0],1:[[0,4],11,[21,24],81],2:[[0,4],7,8,[21,23],25],3:[[0,4],11,[21,23]],4:[[0,6],21],5:[[0,4],6,[21,23]],6:[[0,4],21],7:[[0,3],11,21],8:[[0,3],11,[22,28],81],10:[[0,4],[21,24]],11:[[0,3],22,[24,26],81,82],12:[[0,4],21,22,25,26,82],13:[[0,2],[21,24]],14:[[0,2],[21,24]],15:[[0,3],[21,25]],16:[[0,2],[21,23]],17:[[0,2],[21,23]],18:[[0,2],[21,25],81]},35:{0:[0],1:[[0,5],11,[21,25],28,81,82],2:[[0,6],[11,13]],3:[[0,5],22],4:[[0,3],21,[23,30],81],5:[[0,5],21,[24,27],[81,83]],6:[[0,3],[22,29],81],7:[[0,2],[21,25],[81,84]],8:[[0,2],[21,25],81],9:[[0,2],[21,26],81,82]},36:{0:[0],1:[[0,5],11,[21,24]],2:[[0,3],22,81],3:[[0,2],13,[21,23]],4:[[0,3],21,[23,30],81,82],5:[[0,2],21],6:[[0,2],22,81],7:[[0,2],[21,35],81,82],8:[[0,3],[21,30],81],9:[[0,2],[21,26],[81,83]],10:[[0,2],[21,30]],11:[[0,2],[21,30],81]},37:{0:[0],1:[[0,5],12,13,[24,26],81],2:[[0,3],5,[11,14],[81,85]],3:[[0,6],[21,23]],4:[[0,6],81],5:[[0,3],[21,23]],6:[[0,2],[11,13],34,[81,87]],7:[[0,5],24,25,[81,86]],8:[[0,2],11,[26,32],[81,83]],9:[[0,3],11,21,23,82,83],10:[[0,2],[81,83]],11:[[0,3],21,22],12:[[0,3]],13:[[0,2],11,12,[21,29]],14:[[0,2],[21,28],81,82],15:[[0,2],[21,26],81],16:[[0,2],[21,26]],17:[[0,2],[21,28]]},41:{0:[0],1:[[0,6],8,22,[81,85]],2:[[0,5],11,[21,25]],3:[[0,7],11,[22,29],81],4:[[0,4],11,[21,23],25,81,82],5:[[0,3],5,6,22,23,26,27,81],6:[[0,3],11,21,22],7:[[0,4],11,21,[24,28],81,82],8:[[0,4],11,[21,23],25,[81,83]],9:[[0,2],22,23,[26,28]],10:[[0,2],[23,25],81,82],11:[[0,4],[21,23]],12:[[0,2],21,22,24,81,82],13:[[0,3],[21,30],81],14:[[0,3],[21,26],81],15:[[0,3],[21,28]],16:[[0,2],[21,28],81],17:[[0,2],[21,29]],90:[0,1]},42:{0:[0],1:[[0,7],[11,17]],2:[[0,5],22,81],3:[[0,3],[21,25],81],5:[[0,6],[25,29],[81,83]],6:[[0,2],6,7,[24,26],[82,84]],7:[[0,4]],8:[[0,2],4,21,22,81],9:[[0,2],[21,23],81,82,84],10:[[0,3],[22,24],81,83,87],11:[[0,2],[21,27],81,82],12:[[0,2],[21,24],81],13:[[0,3],21,81],28:[[0,2],22,23,[25,28]],90:[0,[4,6],21]},43:{0:[0],1:[[0,5],11,12,21,22,24,81],2:[[0,4],11,21,[23,25],81],3:[[0,2],4,21,81,82],4:[0,1,[5,8],12,[21,24],26,81,82],5:[[0,3],11,[21,25],[27,29],81],6:[[0,3],11,21,23,24,26,81,82],7:[[0,3],[21,26],81],8:[[0,2],11,21,22],9:[[0,3],[21,23],81],10:[[0,3],[21,28],81],11:[[0,3],[21,29]],12:[[0,2],[21,30],81],13:[[0,2],21,22,81,82],31:[0,1,[22,27],30]},44:{0:[0],1:[[0,7],[11,16],83,84],2:[[0,5],21,22,24,29,32,33,81,82],3:[0,1,[3,8]],4:[[0,4]],5:[0,1,[6,15],23,82,83],6:[0,1,[4,8]],7:[0,1,[3,5],81,[83,85]],8:[[0,4],11,23,25,[81,83]],9:[[0,3],23,[81,83]],12:[[0,3],[23,26],83,84],13:[[0,3],[22,24],81],14:[[0,2],[21,24],26,27,81],15:[[0,2],21,23,81],16:[[0,2],[21,25]],17:[[0,2],21,23,81],18:[[0,3],21,23,[25,27],81,82],19:[0],20:[0],51:[[0,3],21,22],52:[[0,3],21,22,24,81],53:[[0,2],[21,23],81]},45:{0:[0],1:[[0,9],[21,27]],2:[[0,5],[21,26]],3:[[0,5],11,12,[21,32]],4:[0,1,[3,6],11,[21,23],81],5:[[0,3],12,21],6:[[0,3],21,81],7:[[0,3],21,22],8:[[0,4],21,81],9:[[0,3],[21,24],81],10:[[0,2],[21,31]],11:[[0,2],[21,23]],12:[[0,2],[21,29],81],13:[[0,2],[21,24],81],14:[[0,2],[21,25],81]},46:{0:[0],1:[0,1,[5,8]],2:[0,1],3:[0,[21,23]],90:[[0,3],[5,7],[21,39]]},50:{0:[0],1:[[0,19]],2:[0,[22,38],[40,43]],3:[0,[81,84]]},51:{0:[0],1:[0,1,[4,8],[12,15],[21,24],29,31,32,[81,84]],3:[[0,4],11,21,22],4:[[0,3],11,21,22],5:[[0,4],21,22,24,25],6:[0,1,3,23,26,[81,83]],7:[0,1,3,4,[22,27],81],8:[[0,2],11,12,[21,24]],9:[[0,4],[21,23]],10:[[0,2],11,24,25,28],11:[[0,2],[11,13],23,24,26,29,32,33,81],13:[[0,4],[21,25],81],14:[[0,2],[21,25]],15:[[0,3],[21,29]],16:[[0,3],[21,23],81],17:[[0,3],[21,25],81],18:[[0,3],[21,27]],19:[[0,3],[21,23]],20:[[0,2],21,22,81],32:[0,[21,33]],33:[0,[21,38]],34:[0,1,[22,37]]},52:{0:[0],1:[[0,3],[11,15],[21,23],81],2:[0,1,3,21,22],3:[[0,3],[21,30],81,82],4:[[0,2],[21,25]],5:[[0,2],[21,27]],6:[[0,3],[21,28]],22:[0,1,[22,30]],23:[0,1,[22,28]],24:[0,1,[22,28]],26:[0,1,[22,36]],27:[[0,2],22,23,[25,32]]},53:{0:[0],1:[[0,3],[11,14],21,22,[24,29],81],3:[[0,2],[21,26],28,81],4:[[0,2],[21,28]],5:[[0,2],[21,24]],6:[[0,2],[21,30]],7:[[0,2],[21,24]],8:[[0,2],[21,29]],9:[[0,2],[21,27]],23:[0,1,[22,29],31],25:[[0,4],[22,32]],26:[0,1,[21,28]],27:[0,1,[22,30]],28:[0,1,22,23],29:[0,1,[22,32]],31:[0,2,3,[22,24]],34:[0,[21,23]],33:[0,21,[23,25]],35:[0,[21,28]]},54:{0:[0],1:[[0,2],[21,27]],21:[0,[21,29],32,33],22:[0,[21,29],[31,33]],23:[0,1,[22,38]],24:[0,[21,31]],25:[0,[21,27]],26:[0,[21,27]]},61:{0:[0],1:[[0,4],[11,16],22,[24,26]],2:[[0,4],22],3:[[0,4],[21,24],[26,31]],4:[[0,4],[22,31],81],5:[[0,2],[21,28],81,82],6:[[0,2],[21,32]],7:[[0,2],[21,30]],8:[[0,2],[21,31]],9:[[0,2],[21,29]],10:[[0,2],[21,26]]},62:{0:[0],1:[[0,5],11,[21,23]],2:[0,1],3:[[0,2],21],4:[[0,3],[21,23]],5:[[0,3],[21,25]],6:[[0,2],[21,23]],7:[[0,2],[21,25]],8:[[0,2],[21,26]],9:[[0,2],[21,24],81,82],10:[[0,2],[21,27]],11:[[0,2],[21,26]],12:[[0,2],[21,28]],24:[0,21,[24,29]],26:[0,21,[23,30]],29:[0,1,[21,27]],30:[0,1,[21,27]]},63:{0:[0],1:[[0,5],[21,23]],2:[0,2,[21,25]],21:[0,[21,23],[26,28]],22:[0,[21,24]],23:[0,[21,24]],25:[0,[21,25]],26:[0,[21,26]],27:[0,1,[21,26]],28:[[0,2],[21,23]]},64:{0:[0],1:[0,1,[4,6],21,22,81],2:[[0,3],5,[21,23]],3:[[0,3],[21,24],81],4:[[0,2],[21,25]],5:[[0,2],21,22]},65:{0:[0],1:[[0,9],21],2:[[0,5]],21:[0,1,22,23],22:[0,1,22,23],23:[[0,3],[23,25],27,28],28:[0,1,[22,29]],29:[0,1,[22,29]],30:[0,1,[22,24]],31:[0,1,[21,31]],32:[0,1,[21,27]],40:[0,2,3,[21,28]],42:[[0,2],21,[23,26]],43:[0,1,[21,26]],90:[[0,4]],27:[[0,2],22,23]},71:{0:[0]},81:{0:[0]},82:{0:[0]}},d=parseInt(b.substr(0,2),10),e=parseInt(b.substr(2,2),10),f=parseInt(b.substr(4,2),10);if(!c[d]||!c[d][e])return!1;for(var g=!1,h=c[d][e],i=0;i<h.length;i++)if(a.isArray(h[i])&&h[i][0]<=f&&f<=h[i][1]||!a.isArray(h[i])&&f===h[i]){g=!0;break}if(!g)return!1;var j;j=18===b.length?b.substr(6,8):"19"+b.substr(6,6);var k=parseInt(j.substr(0,4),10),l=parseInt(j.substr(4,2),10),m=parseInt(j.substr(6,2),10);if(!FormValidation.Helper.date(k,l,m))return!1;if(18===b.length){var n=0,o=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];for(i=0;17>i;i++)n+=parseInt(b.charAt(i),10)*o[i];n=(12-n%11)%11;var p="X"!==b.charAt(17).toUpperCase()?parseInt(b.charAt(17),10):10;return p===n}return!0},_cz:function(a){if(!/^\d{9,10}$/.test(a))return!1;var b=1900+parseInt(a.substr(0,2),10),c=parseInt(a.substr(2,2),10)%50%20,d=parseInt(a.substr(4,2),10);if(9===a.length){if(b>=1980&&(b-=100),b>1953)return!1}else 1954>b&&(b+=100);if(!FormValidation.Helper.date(b,c,d))return!1;if(10===a.length){var e=parseInt(a.substr(0,9),10)%11;return 1985>b&&(e%=10),e+""===a.substr(9,1)}return!0},_dk:function(a){if(!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(a))return!1;a=a.replace(/-/g,"");var b=parseInt(a.substr(0,2),10),c=parseInt(a.substr(2,2),10),d=parseInt(a.substr(4,2),10);switch(!0){case-1!=="5678".indexOf(a.charAt(6))&&d>=58:d+=1800;break;case-1!=="0123".indexOf(a.charAt(6)):case-1!=="49".indexOf(a.charAt(6))&&d>=37:d+=1900;break;default:d+=2e3}return FormValidation.Helper.date(d,c,b)},_ee:function(a){return this._lt(a)},_es:function(a){var b=/^[0-9]{8}[-]{0,1}[A-HJ-NP-TV-Z]$/.test(a),c=/^[XYZ][-]{0,1}[0-9]{7}[-]{0,1}[A-HJ-NP-TV-Z]$/.test(a),d=/^[A-HNPQS][-]{0,1}[0-9]{7}[-]{0,1}[0-9A-J]$/.test(a);if(!b&&!c&&!d)return!1;a=a.replace(/-/g,"");var e,f,g=!0;if(b||c){f="DNI";var h="XYZ".indexOf(a.charAt(0));return-1!==h&&(a=h+a.substr(1)+"",f="NIE"),e=parseInt(a.substr(0,8),10),e="TRWAGMYFPDXBNJZSQVHLCKE"[e%23],{valid:e===a.substr(8,1),type:f}}e=a.substr(1,7),f="CIF";for(var i=a[0],j=a.substr(-1),k=0,l=0;l<e.length;l++)if(l%2!==0)k+=parseInt(e[l],10);else{var m=""+2*parseInt(e[l],10);k+=parseInt(m[0],10),2===m.length&&(k+=parseInt(m[1],10))}var n=k-10*Math.floor(k/10);return 0!==n&&(n=10-n),g=-1!=="KQS".indexOf(i)?j==="JABCDEFGHI"[n]:-1!=="ABEH".indexOf(i)?j===""+n:j===""+n||j==="JABCDEFGHI"[n],{valid:g,type:f}},_fi:function(a){if(!/^[0-9]{6}[-+A][0-9]{3}[0-9ABCDEFHJKLMNPRSTUVWXY]$/.test(a))return!1;var b=parseInt(a.substr(0,2),10),c=parseInt(a.substr(2,2),10),d=parseInt(a.substr(4,2),10),e={"+":1800,"-":1900,A:2e3};if(d=e[a.charAt(6)]+d,!FormValidation.Helper.date(d,c,b))return!1;var f=parseInt(a.substr(7,3),10);if(2>f)return!1;var g=a.substr(0,6)+a.substr(7,3)+"";return g=parseInt(g,10),"0123456789ABCDEFHJKLMNPRSTUVWXY".charAt(g%31)===a.charAt(10)},_hr:function(a){return/^[0-9]{11}$/.test(a)?FormValidation.Helper.mod11And10(a):!1},_ie:function(a){if(!/^\d{7}[A-W][AHWTX]?$/.test(a))return!1;var b=function(a){for(;a.length<7;)a="0"+a;for(var b="WABCDEFGHIJKLMNOPQRSTUV",c=0,d=0;7>d;d++)c+=parseInt(a.charAt(d),10)*(8-d);return c+=9*b.indexOf(a.substr(7)),b[c%23]};return 9!==a.length||"A"!==a.charAt(8)&&"H"!==a.charAt(8)?a.charAt(7)===b(a.substr(0,7)):a.charAt(7)===b(a.substr(0,7)+a.substr(8)+"")},_is:function(a){if(!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(a))return!1;a=a.replace(/-/g,"");var b=parseInt(a.substr(0,2),10),c=parseInt(a.substr(2,2),10),d=parseInt(a.substr(4,2),10),e=parseInt(a.charAt(9),10);if(d=9===e?1900+d:100*(20+e)+d,!FormValidation.Helper.date(d,c,b,!0))return!1;for(var f=0,g=[3,2,7,6,5,4,3,2],h=0;8>h;h++)f+=parseInt(a.charAt(h),10)*g[h];return f=11-f%11,f+""===a.charAt(8)},_lt:function(a){if(!/^[0-9]{11}$/.test(a))return!1;var b=parseInt(a.charAt(0),10),c=parseInt(a.substr(1,2),10),d=parseInt(a.substr(3,2),10),e=parseInt(a.substr(5,2),10),f=b%2===0?17+b/2:17+(b+1)/2;if(c=100*f+c,!FormValidation.Helper.date(c,d,e,!0))return!1;for(var g=0,h=[1,2,3,4,5,6,7,8,9,1],i=0;10>i;i++)g+=parseInt(a.charAt(i),10)*h[i];if(g%=11,10!==g)return g+""===a.charAt(10);for(g=0,h=[3,4,5,6,7,8,9,1,2,3],i=0;10>i;i++)g+=parseInt(a.charAt(i),10)*h[i];return g%=11,10===g&&(g=0),g+""===a.charAt(10)},_lv:function(a){if(!/^[0-9]{6}[-]{0,1}[0-9]{5}$/.test(a))return!1;a=a.replace(/\D/g,"");var b=parseInt(a.substr(0,2),10),c=parseInt(a.substr(2,2),10),d=parseInt(a.substr(4,2),10);if(d=d+1800+100*parseInt(a.charAt(6),10),!FormValidation.Helper.date(d,c,b,!0))return!1;for(var e=0,f=[10,5,8,4,2,1,6,3,7,9],g=0;10>g;g++)e+=parseInt(a.charAt(g),10)*f[g];return e=(e+1)%11%10,e+""===a.charAt(10)},_nl:function(a){if(a.length<8)return!1;if(8===a.length&&(a="0"+a),!/^[0-9]{4}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{3}$/.test(a))return!1;if(a=a.replace(/\./g,""),0===parseInt(a,10))return!1;for(var b=0,c=a.length,d=0;c-1>d;d++)b+=(9-d)*parseInt(a.charAt(d),10);return b%=11,10===b&&(b=0),b+""===a.charAt(c-1)},_pl:function(a){if(!/^[0-9]{11}$/.test(a))return!1;for(var b=0,c=a.length,d=[1,3,7,9,1,3,7,9,1,3,7],e=0;c-1>e;e++)b+=d[e]*parseInt(a.charAt(e),10);return b%=10,0===b&&(b=10),b=10-b,b+""===a.charAt(c-1)},_ro:function(a){if(!/^[0-9]{13}$/.test(a))return!1;var b=parseInt(a.charAt(0),10);if(0===b||7===b||8===b)return!1;var c=parseInt(a.substr(1,2),10),d=parseInt(a.substr(3,2),10),e=parseInt(a.substr(5,2),10),f={1:1900,2:1900,3:1800,4:1800,5:2e3,6:2e3};if(e>31&&d>12)return!1;if(9!==b&&(c=f[b+""]+c,!FormValidation.Helper.date(c,d,e)))return!1;for(var g=0,h=[2,7,9,1,4,6,3,5,8,2,7,9],i=a.length,j=0;i-1>j;j++)g+=parseInt(a.charAt(j),10)*h[j];return g%=11,10===g&&(g=1),g+""===a.charAt(i-1)},_se:function(a){if(!/^[0-9]{10}$/.test(a)&&!/^[0-9]{6}[-|+][0-9]{4}$/.test(a))return!1;a=a.replace(/[^0-9]/g,"");var b=parseInt(a.substr(0,2),10)+1900,c=parseInt(a.substr(2,2),10),d=parseInt(a.substr(4,2),10);return FormValidation.Helper.date(b,c,d)?FormValidation.Helper.luhn(a):!1},_sk:function(a){return this._cz(a)},_sm:function(a){return/^\d{5}$/.test(a)},_th:function(a){if(13!==a.length)return!1;for(var b=0,c=0;12>c;c++)b+=parseInt(a.charAt(c),10)*(13-c);return(11-b%11)%10===parseInt(a.charAt(12),10)},_tr:function(a){if(11!==a.length)return!1;for(var b=0,c=0;10>c;c++)b+=parseInt(a.charAt(c),10);return b%10===parseInt(a.charAt(10),10)},_za:function(a){if(!/^[0-9]{10}[0|1][8|9][0-9]$/.test(a))return!1;var b=parseInt(a.substr(0,2),10),c=(new Date).getFullYear()%100,d=parseInt(a.substr(2,2),10),e=parseInt(a.substr(4,2),10);return b=b>=c?b+1900:b+2e3,FormValidation.Helper.date(b,d,e)?FormValidation.Helper.luhn(a):!1}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{identical:{"default":"Please enter the same value"}}}),FormValidation.Validator.identical={html5Attributes:{message:"message",field:"field"},init:function(a,b,c,d){var e=a.getFieldElements(c.field);a.onLiveChange(e,"live_"+d,function(){var c=a.getStatus(b,d);c!==a.STATUS_NOT_VALIDATED&&a.revalidateField(b)})},destroy:function(a,b,c,d){var e=a.getFieldElements(c.field);a.offLiveChange(e,"live_"+d)},validate:function(a,b,c,d){var e=a.getFieldValue(b,d),f=a.getFieldElements(c.field);if(null===f||0===f.length)return!0;var g=a.getFieldValue(f,d);return e===g?(a.updateStatus(f,a.STATUS_VALID,d),!0):!1}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{imei:{"default":"Please enter a valid IMEI number"}}}),FormValidation.Validator.imei={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;switch(!0){case/^\d{15}$/.test(e):case/^\d{2}-\d{6}-\d{6}-\d{1}$/.test(e):case/^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(e):return e=e.replace(/[^0-9]/g,""),FormValidation.Helper.luhn(e);case/^\d{14}$/.test(e):case/^\d{16}$/.test(e):case/^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(e):case/^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(e):return!0;default:return!1}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{imo:{"default":"Please enter a valid IMO number"}}}),FormValidation.Validator.imo={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;if(!/^IMO \d{7}$/i.test(e))return!1;for(var f=0,g=e.replace(/^.*(\d{7})$/,"$1"),h=6;h>=1;h--)f+=g.slice(6-h,-h)*(h+1);return f%10===parseInt(g.charAt(6),10)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{integer:{"default":"Please enter a valid number"}}}),FormValidation.Validator.integer={html5Attributes:{message:"message",thousandsseparator:"thousandsSeparator",decimalseparator:"decimalSeparator"},enableByHtml5:function(a){return"number"===a.attr("type")&&(void 0===a.attr("step")||a.attr("step")%1===0)},validate:function(a,b,c,d){if(this.enableByHtml5(b)&&b.get(0).validity&&b.get(0).validity.badInput===!0)return!1;var e=a.getFieldValue(b,d);if(""===e)return!0;var f=c.decimalSeparator||".",g=c.thousandsSeparator||"";f="."===f?"\\.":f,g="."===g?"\\.":g;var h=new RegExp("^-?[0-9]{1,3}("+g+"[0-9]{3})*("+f+"[0-9]+)?$"),i=new RegExp(g,"g");return h.test(e)?(g&&(e=e.replace(i,"")),f&&(e=e.replace(f,".")),isNaN(e)||!isFinite(e)?!1:(e=parseFloat(e),Math.floor(e)===e)):!1}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{ip:{"default":"Please enter a valid IP address",ipv4:"Please enter a valid IPv4 address",ipv6:"Please enter a valid IPv6 address"}}}),FormValidation.Validator.ip={html5Attributes:{message:"message",ipv4:"ipv4",ipv6:"ipv6"},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;d=a.extend({},{ipv4:!0,ipv6:!0},d);var g,h=b.getLocale(),i=/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))?$/,j=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*(\/(\d|\d\d|1[0-1]\d|12[0-8]))?$/,k=!1;switch(!0){case d.ipv4&&!d.ipv6:k=i.test(f),g=d.message||FormValidation.I18n[h].ip.ipv4;break;case!d.ipv4&&d.ipv6:k=j.test(f),g=d.message||FormValidation.I18n[h].ip.ipv6;break;case d.ipv4&&d.ipv6:default:k=i.test(f)||j.test(f),g=d.message||FormValidation.I18n[h].ip["default"]}return{valid:k,message:g}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{isbn:{"default":"Please enter a valid ISBN number"}}}),FormValidation.Validator.isbn={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;var f;switch(!0){case/^\d{9}[\dX]$/.test(e):case 13===e.length&&/^(\d+)-(\d+)-(\d+)-([\dX])$/.test(e):case 13===e.length&&/^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(e):f="ISBN10";break;case/^(978|979)\d{9}[\dX]$/.test(e):case 17===e.length&&/^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(e):case 17===e.length&&/^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(e):f="ISBN13";break;default:return!1}e=e.replace(/[^0-9X]/gi,"");var g,h,i=e.split(""),j=i.length,k=0;switch(f){case"ISBN10":for(k=0,g=0;j-1>g;g++)k+=parseInt(i[g],10)*(10-g);return h=11-k%11,11===h?h=0:10===h&&(h="X"),{type:f,valid:h+""===i[j-1]};case"ISBN13":for(k=0,g=0;j-1>g;g++)k+=g%2===0?parseInt(i[g],10):3*parseInt(i[g],10);return h=10-k%10,10===h&&(h="0"),{type:f,valid:h+""===i[j-1]};default:return!1}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{isin:{"default":"Please enter a valid ISIN number"}}}),FormValidation.Validator.isin={COUNTRY_CODES:"AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW",validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;e=e.toUpperCase();var f=new RegExp("^("+this.COUNTRY_CODES+")[0-9A-Z]{10}$");if(!f.test(e))return!1;for(var g="",h=e.length,i=0;h-1>i;i++){var j=e.charCodeAt(i);g+=j>57?(j-55).toString():e.charAt(i)}var k="",l=g.length,m=l%2!==0?0:1;for(i=0;l>i;i++)k+=parseInt(g[i],10)*(i%2===m?2:1)+"";var n=0;for(i=0;i<k.length;i++)n+=parseInt(k.charAt(i),10);return n=(10-n%10)%10,n+""===e.charAt(h-1)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{ismn:{"default":"Please enter a valid ISMN number"}}}),FormValidation.Validator.ismn={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;var f;switch(!0){case/^M\d{9}$/.test(e):case/^M-\d{4}-\d{4}-\d{1}$/.test(e):case/^M\s\d{4}\s\d{4}\s\d{1}$/.test(e):f="ISMN10";break;case/^9790\d{9}$/.test(e):case/^979-0-\d{4}-\d{4}-\d{1}$/.test(e):case/^979\s0\s\d{4}\s\d{4}\s\d{1}$/.test(e):f="ISMN13";break;default:return!1}"ISMN10"===f&&(e="9790"+e.substr(1)),e=e.replace(/[^0-9]/gi,"");for(var g=e.length,h=0,i=[1,3],j=0;g-1>j;j++)h+=parseInt(e.charAt(j),10)*i[j%2];return h=10-h%10,{type:f,valid:h+""===e.charAt(g-1)}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{issn:{"default":"Please enter a valid ISSN number"}}}),FormValidation.Validator.issn={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;if(!/^\d{4}\-\d{3}[\dX]$/.test(e))return!1;e=e.replace(/[^0-9X]/gi,"");var f=e.split(""),g=f.length,h=0;"X"===f[7]&&(f[7]=10);for(var i=0;g>i;i++)h+=parseInt(f[i],10)*(8-i);return h%11===0}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{lessThan:{"default":"Please enter a value less than or equal to %s",notInclusive:"Please enter a value less than %s"}}}),FormValidation.Validator.lessThan={html5Attributes:{message:"message",value:"value",inclusive:"inclusive"},enableByHtml5:function(a){var b=a.attr("type"),c=a.attr("max");return c&&"date"!==b?{value:c}:!1},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;f=this._format(f);var g=b.getLocale(),h=a.isNumeric(d.value)?d.value:b.getDynamicOption(c,d.value),i=this._format(h);return d.inclusive===!0||void 0===d.inclusive?{valid:a.isNumeric(f)&&parseFloat(f)<=i,message:FormValidation.Helper.format(d.message||FormValidation.I18n[g].lessThan["default"],h)}:{valid:a.isNumeric(f)&&parseFloat(f)<i,message:FormValidation.Helper.format(d.message||FormValidation.I18n[g].lessThan.notInclusive,h)}},_format:function(a){return(a+"").replace(",",".")}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{mac:{"default":"Please enter a valid MAC address"}}}),FormValidation.Validator.mac={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);return""===e?!0:/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(e)||/^([0-9A-Fa-f]{4}\.){2}([0-9A-Fa-f]{4})$/.test(e)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{meid:{"default":"Please enter a valid MEID number"}}}),FormValidation.Validator.meid={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;switch(!0){case/^[0-9A-F]{15}$/i.test(e):case/^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}[- ][0-9A-F]$/i.test(e):case/^\d{19}$/.test(e):case/^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}[- ]\d$/.test(e):var f=e.charAt(e.length-1);if(e=e.replace(/[- ]/g,""),e.match(/^\d*$/i))return FormValidation.Helper.luhn(e);e=e.slice(0,-1);for(var g="",h=1;13>=h;h+=2)g+=(2*parseInt(e.charAt(h),16)).toString(16);var i=0;for(h=0;h<g.length;h++)i+=parseInt(g.charAt(h),16);return i%10===0?"0"===f:f===(2*(10*Math.floor((i+10)/10)-i)).toString(16);case/^[0-9A-F]{14}$/i.test(e):case/^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}$/i.test(e):case/^\d{18}$/.test(e):case/^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}$/.test(e):return!0;default:return!1}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{notEmpty:{"default":"Please enter a value"}}}),FormValidation.Validator.notEmpty={enableByHtml5:function(a){var b=a.attr("required")+"";return"required"===b||"true"===b},validate:function(b,c,d,e){var f=c.attr("type");if("radio"===f||"checkbox"===f){var g=b.getNamespace();return b.getFieldElements(c.attr("data-"+g+"-field")).filter(":checked").length>0}if("number"===f&&c.get(0).validity&&c.get(0).validity.badInput===!0)return!0;var h=b.getFieldValue(c,e);return""!==a.trim(h)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{numeric:{"default":"Please enter a valid float number"}}}),FormValidation.Validator.numeric={html5Attributes:{message:"message",separator:"separator",thousandsseparator:"thousandsSeparator",decimalseparator:"decimalSeparator"
},enableByHtml5:function(a){return"number"===a.attr("type")&&void 0!==a.attr("step")&&a.attr("step")%1!==0},validate:function(a,b,c,d){if(this.enableByHtml5(b)&&b.get(0).validity&&b.get(0).validity.badInput===!0)return!1;var e=a.getFieldValue(b,d);if(""===e)return!0;var f=c.separator||c.decimalSeparator||".",g=c.thousandsSeparator||"";e.substr(0,1)===f?e="0"+f+e.substr(1):e.substr(0,2)==="-"+f&&(e="-0"+f+e.substr(2)),f="."===f?"\\.":f,g="."===g?"\\.":g;var h=new RegExp("^-?[0-9]{1,3}("+g+"[0-9]{3})*("+f+"[0-9]+)?$"),i=new RegExp(g,"g");return h.test(e)?(g&&(e=e.replace(i,"")),f&&(e=e.replace(f,".")),!isNaN(parseFloat(e))&&isFinite(e)):!1}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{phone:{"default":"Please enter a valid phone number",country:"Please enter a valid phone number in %s",countries:{AE:"United Arab Emirates",BG:"Bulgaria",BR:"Brazil",CN:"China",CZ:"Czech Republic",DE:"Germany",DK:"Denmark",ES:"Spain",FR:"France",GB:"United Kingdom",IN:"India",MA:"Morocco",NL:"Netherlands",PK:"Pakistan",RO:"Romania",RU:"Russia",SK:"Slovakia",TH:"Thailand",US:"USA",VE:"Venezuela"}}}}),FormValidation.Validator.phone={html5Attributes:{message:"message",country:"country"},COUNTRY_CODES:["AE","BG","BR","CN","CZ","DE","DK","ES","FR","GB","IN","MA","NL","PK","RO","RU","SK","TH","US","VE"],validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;var g=b.getLocale(),h=d.country;if(("string"!=typeof h||-1===a.inArray(h,this.COUNTRY_CODES))&&(h=b.getDynamicOption(c,h)),!h||-1===a.inArray(h.toUpperCase(),this.COUNTRY_CODES))return!0;var i=!0;switch(h.toUpperCase()){case"AE":f=a.trim(f),i=/^(((\+|00)?971[\s\.-]?(\(0\)[\s\.-]?)?|0)(\(5(0|2|5|6)\)|5(0|2|5|6)|2|3|4|6|7|9)|60)([\s\.-]?[0-9]){7}$/.test(f);break;case"BG":f=f.replace(/\+|\s|-|\/|\(|\)/gi,""),i=/^(0|359|00)(((700|900)[0-9]{5}|((800)[0-9]{5}|(800)[0-9]{4}))|(87|88|89)([0-9]{7})|((2[0-9]{7})|(([3-9][0-9])(([0-9]{6})|([0-9]{5})))))$/.test(f);break;case"BR":f=a.trim(f),i=/^(([\d]{4}[-.\s]{1}[\d]{2,3}[-.\s]{1}[\d]{2}[-.\s]{1}[\d]{2})|([\d]{4}[-.\s]{1}[\d]{3}[-.\s]{1}[\d]{4})|((\(?\+?[0-9]{2}\)?\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}))$/.test(f);break;case"CN":f=a.trim(f),i=/^((00|\+)?(86(?:-| )))?((\d{11})|(\d{3}[- ]{1}\d{4}[- ]{1}\d{4})|((\d{2,4}[- ]){1}(\d{7,8}|(\d{3,4}[- ]{1}\d{4}))([- ]{1}\d{1,4})?))$/.test(f);break;case"CZ":i=/^(((00)([- ]?)|\+)(420)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(f);break;case"DE":f=a.trim(f),i=/^(((((((00|\+)49[ \-/]?)|0)[1-9][0-9]{1,4})[ \-/]?)|((((00|\+)49\()|\(0)[1-9][0-9]{1,4}\)[ \-/]?))[0-9]{1,7}([ \-/]?[0-9]{1,5})?)$/.test(f);break;case"DK":f=a.trim(f),i=/^(\+45|0045|\(45\))?\s?[2-9](\s?\d){7}$/.test(f);break;case"ES":f=a.trim(f),i=/^(?:(?:(?:\+|00)34\D?))?(?:5|6|7|8|9)(?:\d\D?){8}$/.test(f);break;case"FR":f=a.trim(f),i=/^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/.test(f);break;case"GB":f=a.trim(f),i=/^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/.test(f);break;case"IN":f=a.trim(f),i=/((\+?)((0[ -]+)*|(91 )*)(\d{12}|\d{10}))|\d{5}([- ]*)\d{6}/.test(f);break;case"MA":f=a.trim(f),i=/^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/.test(f);break;case"NL":f=a.trim(f),i=/^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/gm.test(f);break;case"PK":f=a.trim(f),i=/^0?3[0-9]{2}[0-9]{7}$/.test(f);break;case"RO":i=/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/g.test(f);break;case"RU":i=/^((8|\+7|007)[\-\.\/ ]?)?([\(\/\.]?\d{3}[\)\/\.]?[\-\.\/ ]?)?[\d\-\.\/ ]{7,10}$/g.test(f);break;case"SK":i=/^(((00)([- ]?)|\+)(421)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(f);break;case"TH":i=/^0\(?([6|8-9]{2})*-([0-9]{3})*-([0-9]{4})$/.test(f);break;case"VE":f=a.trim(f),i=/^0(?:2(?:12|4[0-9]|5[1-9]|6[0-9]|7[0-8]|8[1-35-8]|9[1-5]|3[45789])|4(?:1[246]|2[46]))\d{7}$/.test(f);break;case"US":default:i=/^(?:(1\-?)|(\+1 ?))?\(?\d{3}\)?[\-\.\s]?\d{3}[\-\.\s]?\d{4}$/.test(f)}return{valid:i,message:FormValidation.Helper.format(d.message||FormValidation.I18n[g].phone.country,FormValidation.I18n[g].phone.countries[h])}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{promise:{"default":"Please enter a valid value"}}}),FormValidation.Validator.promise={priority:999,html5Attributes:{message:"message",promise:"promise"},validate:function(b,c,d,e){var f=b.getFieldValue(c,e),g=new a.Deferred,h=FormValidation.Helper.call(d.promise,[f,b,c]);return h.done(function(a){g.resolve(c,e,a)}).fail(function(a){a=a||{},a.valid=!1,g.resolve(c,e,a)}),g}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{regexp:{"default":"Please enter a value matching the pattern"}}}),FormValidation.Validator.regexp={html5Attributes:{message:"message",flags:"flags",regexp:"regexp"},enableByHtml5:function(a){var b=a.attr("pattern");return b?{regexp:b}:!1},validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;var f="string"==typeof c.regexp?c.flags?new RegExp(c.regexp,c.flags):new RegExp(c.regexp):c.regexp;return f.test(e)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{remote:{"default":"Please enter a valid value"}}}),FormValidation.Validator.remote={priority:1e3,html5Attributes:{async:"async",crossdomain:"crossDomain",data:"data",datatype:"dataType",delay:"delay",message:"message",name:"name",type:"type",url:"url",validkey:"validKey"},destroy:function(a,b,c,d){var e=a.getNamespace(),f=b.data(e+"."+d+".timer");f&&(clearTimeout(f),b.removeData(e+"."+d+".timer"))},validate:function(b,c,d,e){function f(){var b=a.ajax(n);return b.success(function(a){a.valid=a[m]===!0||"true"===a[m]?!0:a[m]===!1||"false"===a[m]?!1:null,i.resolve(c,e,a)}).error(function(a){i.resolve(c,e,{valid:!1})}),i.fail(function(){b.abort()}),i}var g=b.getNamespace(),h=b.getFieldValue(c,e),i=new a.Deferred;if(""===h)return i.resolve(c,e,{valid:!0}),i;var j=c.attr("data-"+g+"-field"),k=d.data||{},l=d.url,m=d.validKey||"valid";"function"==typeof k&&(k=k.call(this,b,c,h)),"string"==typeof k&&(k=JSON.parse(k)),"function"==typeof l&&(l=l.call(this,b,c,h)),k[d.name||j]=h;var n={async:null===d.async||d.async===!0||"true"===d.async,data:k,dataType:d.dataType||"json",headers:d.headers||{},type:d.type||"GET",url:l};return null!==d.crossDomain&&(n.crossDomain=d.crossDomain===!0||"true"===d.crossDomain),d.delay?(c.data(g+"."+e+".timer")&&clearTimeout(c.data(g+"."+e+".timer")),c.data(g+"."+e+".timer",setTimeout(f,d.delay)),i):f()}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{rtn:{"default":"Please enter a valid RTN number"}}}),FormValidation.Validator.rtn={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;if(!/^\d{9}$/.test(e))return!1;for(var f=0,g=0;g<e.length;g+=3)f+=3*parseInt(e.charAt(g),10)+7*parseInt(e.charAt(g+1),10)+parseInt(e.charAt(g+2),10);return 0!==f&&f%10===0}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{sedol:{"default":"Please enter a valid SEDOL number"}}}),FormValidation.Validator.sedol={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;if(e=e.toUpperCase(),!/^[0-9A-Z]{7}$/.test(e))return!1;for(var f=0,g=[1,3,1,7,3,9,1],h=e.length,i=0;h-1>i;i++)f+=g[i]*parseInt(e.charAt(i),36);return f=(10-f%10)%10,f+""===e.charAt(h-1)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{siren:{"default":"Please enter a valid SIREN number"}}}),FormValidation.Validator.siren={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);return""===e?!0:/^\d{9}$/.test(e)?FormValidation.Helper.luhn(e):!1}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{siret:{"default":"Please enter a valid SIRET number"}}}),FormValidation.Validator.siret={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;for(var f,g=0,h=e.length,i=0;h>i;i++)f=parseInt(e.charAt(i),10),i%2===0&&(f=2*f,f>9&&(f-=9)),g+=f;return g%10===0}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{step:{"default":"Please enter a valid step of %s"}}}),FormValidation.Validator.step={html5Attributes:{message:"message",base:"baseValue",step:"step"},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;if(d=a.extend({},{baseValue:0,step:1},d),f=parseFloat(f),!a.isNumeric(f))return!1;var g=function(a,b){var c=Math.pow(10,b);a*=c;var d=a>0|-(0>a),e=a%1===.5*d;return e?(Math.floor(a)+(d>0))/c:Math.round(a)/c},h=function(a,b){if(0===b)return 1;var c=(a+"").split("."),d=(b+"").split("."),e=(1===c.length?0:c[1].length)+(1===d.length?0:d[1].length);return g(a-b*Math.floor(a/b),e)},i=b.getLocale(),j=h(f-d.baseValue,d.step);return{valid:0===j||j===d.step,message:FormValidation.Helper.format(d.message||FormValidation.I18n[i].step["default"],[d.step])}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{stringCase:{"default":"Please enter only lowercase characters",upper:"Please enter only uppercase characters"}}}),FormValidation.Validator.stringCase={html5Attributes:{message:"message","case":"case"},validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;var f=a.getLocale(),g=(c["case"]||"lower").toLowerCase();return{valid:"upper"===g?e===e.toUpperCase():e===e.toLowerCase(),message:c.message||("upper"===g?FormValidation.I18n[f].stringCase.upper:FormValidation.I18n[f].stringCase["default"])}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{stringLength:{"default":"Please enter a value with valid length",less:"Please enter less than %s characters",more:"Please enter more than %s characters",between:"Please enter value between %s and %s characters long"}}}),FormValidation.Validator.stringLength={html5Attributes:{message:"message",min:"min",max:"max",trim:"trim",utf8bytes:"utf8Bytes"},enableByHtml5:function(b){var c={},d=b.attr("maxlength"),e=b.attr("minlength");return d&&(c.max=parseInt(d,10)),e&&(c.min=parseInt(e,10)),a.isEmptyObject(c)?!1:c},validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if((d.trim===!0||"true"===d.trim)&&(f=a.trim(f)),""===f)return!0;var g=b.getLocale(),h=a.isNumeric(d.min)?d.min:b.getDynamicOption(c,d.min),i=a.isNumeric(d.max)?d.max:b.getDynamicOption(c,d.max),j=function(a){for(var b=a.length,c=a.length-1;c>=0;c--){var d=a.charCodeAt(c);d>127&&2047>=d?b++:d>2047&&65535>=d&&(b+=2),d>=56320&&57343>=d&&c--}return b},k=d.utf8Bytes?j(f):f.length,l=!0,m=d.message||FormValidation.I18n[g].stringLength["default"];switch((h&&k<parseInt(h,10)||i&&k>parseInt(i,10))&&(l=!1),!0){case!!h&&!!i:m=FormValidation.Helper.format(d.message||FormValidation.I18n[g].stringLength.between,[parseInt(h,10),parseInt(i,10)]);break;case!!h:m=FormValidation.Helper.format(d.message||FormValidation.I18n[g].stringLength.more,parseInt(h,10)-1);break;case!!i:m=FormValidation.Helper.format(d.message||FormValidation.I18n[g].stringLength.less,parseInt(i,10)+1)}return{valid:l,message:m}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{uri:{"default":"Please enter a valid URI"}}}),FormValidation.Validator.uri={html5Attributes:{message:"message",allowlocal:"allowLocal",allowemptyprotocol:"allowEmptyProtocol",protocol:"protocol"},enableByHtml5:function(a){return"url"===a.attr("type")},validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;var f=c.allowLocal===!0||"true"===c.allowLocal,g=c.allowEmptyProtocol===!0||"true"===c.allowEmptyProtocol,h=(c.protocol||"http, https, ftp").split(",").join("|").replace(/\s/g,""),i=new RegExp("^(?:(?:"+h+")://)"+(g?"?":"")+"(?:\\S+(?::\\S*)?@)?(?:"+(f?"":"(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})")+"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9])*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))"+(f?"?":"")+")(?::\\d{2,5})?(?:/[^\\s]*)?$","i");return i.test(e)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{uuid:{"default":"Please enter a valid UUID number",version:"Please enter a valid UUID version %s number"}}}),FormValidation.Validator.uuid={html5Attributes:{message:"message",version:"version"},validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;var f=a.getLocale(),g={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i},h=c.version?c.version+"":"all";return{valid:null===g[h]?!0:g[h].test(e),message:c.version?FormValidation.Helper.format(c.message||FormValidation.I18n[f].uuid.version,c.version):c.message||FormValidation.I18n[f].uuid["default"]}}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{vat:{"default":"Please enter a valid VAT number",country:"Please enter a valid VAT number in %s",countries:{AT:"Austria",BE:"Belgium",BG:"Bulgaria",BR:"Brazil",CH:"Switzerland",CY:"Cyprus",CZ:"Czech Republic",DE:"Germany",DK:"Denmark",EE:"Estonia",ES:"Spain",FI:"Finland",FR:"France",GB:"United Kingdom",GR:"Greek",EL:"Greek",HU:"Hungary",HR:"Croatia",IE:"Ireland",IS:"Iceland",IT:"Italy",LT:"Lithuania",LU:"Luxembourg",LV:"Latvia",MT:"Malta",NL:"Netherlands",NO:"Norway",PL:"Poland",PT:"Portugal",RO:"Romania",RU:"Russia",RS:"Serbia",SE:"Sweden",SI:"Slovenia",SK:"Slovakia",VE:"Venezuela",ZA:"South Africa"}}}}),FormValidation.Validator.vat={html5Attributes:{message:"message",country:"country"},COUNTRY_CODES:["AT","BE","BG","BR","CH","CY","CZ","DE","DK","EE","EL","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT","LT","LU","LV","MT","NL","NO","PL","PT","RO","RU","RS","SE","SK","SI","VE","ZA"],validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f)return!0;var g=b.getLocale(),h=d.country;if(h?("string"!=typeof h||-1===a.inArray(h.toUpperCase(),this.COUNTRY_CODES))&&(h=b.getDynamicOption(c,h)):h=f.substr(0,2),-1===a.inArray(h,this.COUNTRY_CODES))return!0;var i=["_",h.toLowerCase()].join(""),j=this[i](f);return j=j===!0||j===!1?{valid:j}:j,j.message=FormValidation.Helper.format(d.message||FormValidation.I18n[g].vat.country,FormValidation.I18n[g].vat.countries[h.toUpperCase()]),j},_at:function(a){if(/^ATU[0-9]{8}$/.test(a)&&(a=a.substr(2)),!/^U[0-9]{8}$/.test(a))return!1;a=a.substr(1);for(var b=0,c=[1,2,1,2,1,2,1],d=0,e=0;7>e;e++)d=parseInt(a.charAt(e),10)*c[e],d>9&&(d=Math.floor(d/10)+d%10),b+=d;return b=10-(b+4)%10,10===b&&(b=0),b+""===a.substr(7,1)},_be:function(a){if(/^BE[0]{0,1}[0-9]{9}$/.test(a)&&(a=a.substr(2)),!/^[0]{0,1}[0-9]{9}$/.test(a))return!1;if(9===a.length&&(a="0"+a),"0"===a.substr(1,1))return!1;var b=parseInt(a.substr(0,8),10)+parseInt(a.substr(8,2),10);return b%97===0},_bg:function(a){if(/^BG[0-9]{9,10}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{9,10}$/.test(a))return!1;var b=0,c=0;if(9===a.length){for(c=0;8>c;c++)b+=parseInt(a.charAt(c),10)*(c+1);if(b%=11,10===b)for(b=0,c=0;8>c;c++)b+=parseInt(a.charAt(c),10)*(c+3);return b%=10,b+""===a.substr(8)}if(10===a.length){var d=function(a){var b=parseInt(a.substr(0,2),10)+1900,c=parseInt(a.substr(2,2),10),d=parseInt(a.substr(4,2),10);if(c>40?(b+=100,c-=40):c>20&&(b-=100,c-=20),!FormValidation.Helper.date(b,c,d))return!1;for(var e=0,f=[2,4,8,5,10,9,7,3,6],g=0;9>g;g++)e+=parseInt(a.charAt(g),10)*f[g];return e=e%11%10,e+""===a.substr(9,1)},e=function(a){for(var b=0,c=[21,19,17,13,11,9,7,3,1],d=0;9>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b%=10,b+""===a.substr(9,1)},f=function(a){for(var b=0,c=[4,3,2,7,6,5,4,3,2],d=0;9>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b=11-b%11,10===b?!1:(11===b&&(b=0),b+""===a.substr(9,1))};return d(a)||e(a)||f(a)}return!1},_br:function(a){if(""===a)return!0;var b=a.replace(/[^\d]+/g,"");if(""===b||14!==b.length)return!1;if("00000000000000"===b||"11111111111111"===b||"22222222222222"===b||"33333333333333"===b||"44444444444444"===b||"55555555555555"===b||"66666666666666"===b||"77777777777777"===b||"88888888888888"===b||"99999999999999"===b)return!1;for(var c=b.length-2,d=b.substring(0,c),e=b.substring(c),f=0,g=c-7,h=c;h>=1;h--)f+=parseInt(d.charAt(c-h),10)*g--,2>g&&(g=9);var i=2>f%11?0:11-f%11;if(i!==parseInt(e.charAt(0),10))return!1;for(c+=1,d=b.substring(0,c),f=0,g=c-7,h=c;h>=1;h--)f+=parseInt(d.charAt(c-h),10)*g--,2>g&&(g=9);return i=2>f%11?0:11-f%11,i===parseInt(e.charAt(1),10)},_ch:function(a){if(/^CHE[0-9]{9}(MWST)?$/.test(a)&&(a=a.substr(2)),!/^E[0-9]{9}(MWST)?$/.test(a))return!1;a=a.substr(1);for(var b=0,c=[5,4,3,2,7,6,5,4],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b=11-b%11,10===b?!1:(11===b&&(b=0),b+""===a.substr(8,1))},_cy:function(a){if(/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(a)&&(a=a.substr(2)),!/^[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(a))return!1;if("12"===a.substr(0,2))return!1;for(var b=0,c={0:1,1:0,2:5,3:7,4:9,5:13,6:15,7:17,8:19,9:21},d=0;8>d;d++){var e=parseInt(a.charAt(d),10);d%2===0&&(e=c[e+""]),b+=e}return b="ABCDEFGHIJKLMNOPQRSTUVWXYZ"[b%26],b+""===a.substr(8,1)},_cz:function(a){if(/^CZ[0-9]{8,10}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{8,10}$/.test(a))return!1;var b=0,c=0;if(8===a.length){if(a.charAt(0)+""=="9")return!1;for(b=0,c=0;7>c;c++)b+=parseInt(a.charAt(c),10)*(8-c);return b=11-b%11,10===b&&(b=0),11===b&&(b=1),b+""===a.substr(7,1)}if(9===a.length&&a.charAt(0)+""=="6"){for(b=0,c=0;7>c;c++)b+=parseInt(a.charAt(c+1),10)*(8-c);return b=11-b%11,10===b&&(b=0),11===b&&(b=1),b=[8,7,6,5,4,3,2,1,0,9,10][b-1],b+""===a.substr(8,1)}if(9===a.length||10===a.length){var d=1900+parseInt(a.substr(0,2),10),e=parseInt(a.substr(2,2),10)%50%20,f=parseInt(a.substr(4,2),10);if(9===a.length){if(d>=1980&&(d-=100),d>1953)return!1}else 1954>d&&(d+=100);if(!FormValidation.Helper.date(d,e,f))return!1;if(10===a.length){var g=parseInt(a.substr(0,9),10)%11;return 1985>d&&(g%=10),g+""===a.substr(9,1)}return!0}return!1},_de:function(a){return/^DE[0-9]{9}$/.test(a)&&(a=a.substr(2)),/^[0-9]{9}$/.test(a)?FormValidation.Helper.mod11And10(a):!1},_dk:function(a){if(/^DK[0-9]{8}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{8}$/.test(a))return!1;for(var b=0,c=[2,7,6,5,4,3,2,1],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b%11===0},_ee:function(a){if(/^EE[0-9]{9}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{9}$/.test(a))return!1;for(var b=0,c=[3,7,1,3,7,1,3,7,1],d=0;9>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b%10===0},_es:function(a){if(/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(a)&&(a=a.substr(2)),!/^[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(a))return!1;var b=function(a){var b=parseInt(a.substr(0,8),10);return b="TRWAGMYFPDXBNJZSQVHLCKE"[b%23],b+""===a.substr(8,1)},c=function(a){var b=["XYZ".indexOf(a.charAt(0)),a.substr(1)].join("");return b=parseInt(b,10),b="TRWAGMYFPDXBNJZSQVHLCKE"[b%23],b+""===a.substr(8,1)},d=function(a){var b,c=a.charAt(0);if(-1!=="KLM".indexOf(c))return b=parseInt(a.substr(1,8),10),b="TRWAGMYFPDXBNJZSQVHLCKE"[b%23],b+""===a.substr(8,1);if(-1!=="ABCDEFGHJNPQRSUVW".indexOf(c)){for(var d=0,e=[2,1,2,1,2,1,2],f=0,g=0;7>g;g++)f=parseInt(a.charAt(g+1),10)*e[g],f>9&&(f=Math.floor(f/10)+f%10),d+=f;return d=10-d%10,10===d&&(d=0),d+""===a.substr(8,1)||"JABCDEFGHI"[d]===a.substr(8,1)}return!1},e=a.charAt(0);return/^[0-9]$/.test(e)?{valid:b(a),type:"DNI"}:/^[XYZ]$/.test(e)?{valid:c(a),type:"NIE"}:{valid:d(a),type:"CIF"}},_fi:function(a){if(/^FI[0-9]{8}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{8}$/.test(a))return!1;for(var b=0,c=[7,9,10,5,8,4,2,1],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b%11===0},_fr:function(a){if(/^FR[0-9A-Z]{2}[0-9]{9}$/.test(a)&&(a=a.substr(2)),!/^[0-9A-Z]{2}[0-9]{9}$/.test(a))return!1;if(!FormValidation.Helper.luhn(a.substr(2)))return!1;if(/^[0-9]{2}$/.test(a.substr(0,2)))return a.substr(0,2)===parseInt(a.substr(2)+"12",10)%97+"";var b,c="0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";return b=/^[0-9]{1}$/.test(a.charAt(0))?24*c.indexOf(a.charAt(0))+c.indexOf(a.charAt(1))-10:34*c.indexOf(a.charAt(0))+c.indexOf(a.charAt(1))-100,(parseInt(a.substr(2),10)+1+Math.floor(b/11))%11===b%11},_gb:function(a){if((/^GB[0-9]{9}$/.test(a)||/^GB[0-9]{12}$/.test(a)||/^GBGD[0-9]{3}$/.test(a)||/^GBHA[0-9]{3}$/.test(a)||/^GB(GD|HA)8888[0-9]{5}$/.test(a))&&(a=a.substr(2)),!(/^[0-9]{9}$/.test(a)||/^[0-9]{12}$/.test(a)||/^GD[0-9]{3}$/.test(a)||/^HA[0-9]{3}$/.test(a)||/^(GD|HA)8888[0-9]{5}$/.test(a)))return!1;var b=a.length;if(5===b){var c=a.substr(0,2),d=parseInt(a.substr(2),10);return"GD"===c&&500>d||"HA"===c&&d>=500}if(11===b&&("GD8888"===a.substr(0,6)||"HA8888"===a.substr(0,6)))return"GD"===a.substr(0,2)&&parseInt(a.substr(6,3),10)>=500||"HA"===a.substr(0,2)&&parseInt(a.substr(6,3),10)<500?!1:parseInt(a.substr(6,3),10)%97===parseInt(a.substr(9,2),10);if(9===b||12===b){for(var e=0,f=[8,7,6,5,4,3,2,10,1],g=0;9>g;g++)e+=parseInt(a.charAt(g),10)*f[g];return e%=97,parseInt(a.substr(0,3),10)>=100?0===e||42===e||55===e:0===e}return!0},_gr:function(a){if(/^(GR|EL)[0-9]{9}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{9}$/.test(a))return!1;8===a.length&&(a="0"+a);for(var b=0,c=[256,128,64,32,16,8,4,2],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b=b%11%10,b+""===a.substr(8,1)},_el:function(a){return this._gr(a)},_hu:function(a){if(/^HU[0-9]{8}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{8}$/.test(a))return!1;for(var b=0,c=[9,7,3,1,9,7,3,1],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b%10===0},_hr:function(a){return/^HR[0-9]{11}$/.test(a)&&(a=a.substr(2)),/^[0-9]{11}$/.test(a)?FormValidation.Helper.mod11And10(a):!1},_ie:function(a){if(/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(a))return!1;var b=function(a){for(;a.length<7;)a="0"+a;for(var b="WABCDEFGHIJKLMNOPQRSTUV",c=0,d=0;7>d;d++)c+=parseInt(a.charAt(d),10)*(8-d);return c+=9*b.indexOf(a.substr(7)),b[c%23]};return/^[0-9]+$/.test(a.substr(0,7))?a.charAt(7)===b(a.substr(0,7)+a.substr(8)+""):-1!=="ABCDEFGHIJKLMNOPQRSTUVWXYZ+*".indexOf(a.charAt(1))?a.charAt(7)===b(a.substr(2,5)+a.substr(0,1)+""):!0},_is:function(a){return/^IS[0-9]{5,6}$/.test(a)&&(a=a.substr(2)),/^[0-9]{5,6}$/.test(a)},_it:function(a){if(/^IT[0-9]{11}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{11}$/.test(a))return!1;if(0===parseInt(a.substr(0,7),10))return!1;var b=parseInt(a.substr(7,3),10);return 1>b||b>201&&999!==b&&888!==b?!1:FormValidation.Helper.luhn(a)},_lt:function(a){if(/^LT([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(a)&&(a=a.substr(2)),!/^([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(a))return!1;var b,c=a.length,d=0;for(b=0;c-1>b;b++)d+=parseInt(a.charAt(b),10)*(1+b%9);var e=d%11;if(10===e)for(d=0,b=0;c-1>b;b++)d+=parseInt(a.charAt(b),10)*(1+(b+2)%9);return e=e%11%10,e+""===a.charAt(c-1)},_lu:function(a){return/^LU[0-9]{8}$/.test(a)&&(a=a.substr(2)),/^[0-9]{8}$/.test(a)?parseInt(a.substr(0,6),10)%89+""===a.substr(6,2):!1},_lv:function(a){if(/^LV[0-9]{11}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{11}$/.test(a))return!1;var b,c=parseInt(a.charAt(0),10),d=0,e=[],f=a.length;if(c>3){for(d=0,e=[9,1,4,8,3,10,2,5,7,6,1],b=0;f>b;b++)d+=parseInt(a.charAt(b),10)*e[b];return d%=11,3===d}var g=parseInt(a.substr(0,2),10),h=parseInt(a.substr(2,2),10),i=parseInt(a.substr(4,2),10);if(i=i+1800+100*parseInt(a.charAt(6),10),!FormValidation.Helper.date(i,h,g))return!1;for(d=0,e=[10,5,8,4,2,1,6,3,7,9],b=0;f-1>b;b++)d+=parseInt(a.charAt(b),10)*e[b];return d=(d+1)%11%10,d+""===a.charAt(f-1)},_mt:function(a){if(/^MT[0-9]{8}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{8}$/.test(a))return!1;for(var b=0,c=[3,4,6,7,8,9,10,1],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b%37===0},_nl:function(a){if(/^NL[0-9]{9}B[0-9]{2}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{9}B[0-9]{2}$/.test(a))return!1;for(var b=0,c=[9,8,7,6,5,4,3,2],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b%=11,b>9&&(b=0),b+""===a.substr(8,1)},_no:function(a){if(/^NO[0-9]{9}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{9}$/.test(a))return!1;for(var b=0,c=[3,2,7,6,5,4,3,2],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b=11-b%11,11===b&&(b=0),b+""===a.substr(8,1)},_pl:function(a){if(/^PL[0-9]{10}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{10}$/.test(a))return!1;for(var b=0,c=[6,5,7,2,3,4,5,6,7,-1],d=0;10>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b%11===0},_pt:function(a){if(/^PT[0-9]{9}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{9}$/.test(a))return!1;for(var b=0,c=[9,8,7,6,5,4,3,2],d=0;8>d;d++)b+=parseInt(a.charAt(d),10)*c[d];return b=11-b%11,b>9&&(b=0),b+""===a.substr(8,1)},_ro:function(a){if(/^RO[1-9][0-9]{1,9}$/.test(a)&&(a=a.substr(2)),!/^[1-9][0-9]{1,9}$/.test(a))return!1;for(var b=a.length,c=[7,5,3,2,1,7,5,3,2].slice(10-b),d=0,e=0;b-1>e;e++)d+=parseInt(a.charAt(e),10)*c[e];return d=10*d%11%10,d+""===a.substr(b-1,1)},_ru:function(a){if(/^RU([0-9]{10}|[0-9]{12})$/.test(a)&&(a=a.substr(2)),!/^([0-9]{10}|[0-9]{12})$/.test(a))return!1;var b=0;if(10===a.length){var c=0,d=[2,4,10,3,5,9,4,6,8,0];for(b=0;10>b;b++)c+=parseInt(a.charAt(b),10)*d[b];return c%=11,c>9&&(c%=10),c+""===a.substr(9,1)}if(12===a.length){var e=0,f=[7,2,4,10,3,5,9,4,6,8,0],g=0,h=[3,7,2,4,10,3,5,9,4,6,8,0];for(b=0;11>b;b++)e+=parseInt(a.charAt(b),10)*f[b],g+=parseInt(a.charAt(b),10)*h[b];return e%=11,e>9&&(e%=10),g%=11,g>9&&(g%=10),e+""===a.substr(10,1)&&g+""===a.substr(11,1)}return!1},_rs:function(a){if(/^RS[0-9]{9}$/.test(a)&&(a=a.substr(2)),!/^[0-9]{9}$/.test(a))return!1;for(var b=10,c=0,d=0;8>d;d++)c=(parseInt(a.charAt(d),10)+b)%10,0===c&&(c=10),b=2*c%11;return(b+parseInt(a.substr(8,1),10))%10===1},_se:function(a){return/^SE[0-9]{10}01$/.test(a)&&(a=a.substr(2)),/^[0-9]{10}01$/.test(a)?(a=a.substr(0,10),FormValidation.Helper.luhn(a)):!1},_si:function(a){var b=a.match(/^(SI)?([1-9][0-9]{7})$/);if(!b)return!1;b[1]&&(a=a.substr(2));for(var c=0,d=[8,7,6,5,4,3,2],e=0;7>e;e++)c+=parseInt(a.charAt(e),10)*d[e];return c=11-c%11,10===c&&(c=0),c+""===a.substr(7,1)},_sk:function(a){return/^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(a)&&(a=a.substr(2)),/^[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(a)?parseInt(a,10)%11===0:!1},_ve:function(a){if(/^VE[VEJPG][0-9]{9}$/.test(a)&&(a=a.substr(2)),!/^[VEJPG][0-9]{9}$/.test(a))return!1;for(var b={V:4,E:8,J:12,P:16,G:20},c=b[a.charAt(0)],d=[3,2,7,6,5,4,3,2],e=0;8>e;e++)c+=parseInt(a.charAt(e+1),10)*d[e];return c=11-c%11,(11===c||10===c)&&(c=0),c+""===a.substr(9,1)},_za:function(a){return/^ZA4[0-9]{9}$/.test(a)&&(a=a.substr(2)),/^4[0-9]{9}$/.test(a)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{vin:{"default":"Please enter a valid VIN number"}}}),FormValidation.Validator.vin={validate:function(a,b,c,d){var e=a.getFieldValue(b,d);if(""===e)return!0;if(!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i.test(e))return!1;e=e.toUpperCase();for(var f={A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,J:1,K:2,L:3,M:4,N:5,P:7,R:9,S:2,T:3,U:4,V:5,W:6,X:7,Y:8,Z:9,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,0:0},g=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2],h=0,i=e.length,j=0;i>j;j++)h+=f[e.charAt(j)+""]*g[j];var k=h%11;return 10===k&&(k="X"),k+""===e.charAt(8)}}}(jQuery),function(a){FormValidation.I18n=a.extend(!0,FormValidation.I18n||{},{en_US:{zipCode:{"default":"Please enter a valid postal code",country:"Please enter a valid postal code in %s",countries:{AT:"Austria",BG:"Bulgaria",BR:"Brazil",CA:"Canada",CH:"Switzerland",CZ:"Czech Republic",DE:"Germany",DK:"Denmark",ES:"Spain",FR:"France",GB:"United Kingdom",IE:"Ireland",IN:"India",IT:"Italy",MA:"Morocco",NL:"Netherlands",PL:"Poland",PT:"Portugal",RO:"Romania",RU:"Russia",SE:"Sweden",SG:"Singapore",SK:"Slovakia",US:"USA"}}}}),FormValidation.Validator.zipCode={html5Attributes:{message:"message",country:"country"},COUNTRY_CODES:["AT","BG","BR","CA","CH","CZ","DE","DK","ES","FR","GB","IE","IN","IT","MA","NL","PL","PT","RO","RU","SE","SG","SK","US"],validate:function(b,c,d,e){var f=b.getFieldValue(c,e);if(""===f||!d.country)return!0;var g=b.getLocale(),h=d.country;if(("string"!=typeof h||-1===a.inArray(h,this.COUNTRY_CODES))&&(h=b.getDynamicOption(c,h)),!h||-1===a.inArray(h.toUpperCase(),this.COUNTRY_CODES))return!0;var i=!1;switch(h=h.toUpperCase()){case"AT":i=/^([1-9]{1})(\d{3})$/.test(f);break;case"BG":i=/^([1-9]{1}[0-9]{3})$/.test(a.trim(f));break;case"BR":i=/^(\d{2})([\.]?)(\d{3})([\-]?)(\d{3})$/.test(f);break;case"CA":i=/^(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}\s?[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}[0-9]{1}$/i.test(f);break;case"CH":i=/^([1-9]{1})(\d{3})$/.test(f);break;case"CZ":i=/^(\d{3})([ ]?)(\d{2})$/.test(f);break;case"DE":i=/^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/.test(f);break;case"DK":i=/^(DK(-|\s)?)?\d{4}$/i.test(f);break;case"ES":i=/^(?:0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/.test(f);break;case"FR":i=/^[0-9]{5}$/i.test(f);break;case"GB":i=this._gb(f);break;case"IN":i=/^\d{3}\s?\d{3}$/.test(f);break;case"IE":i=/^(D6W|[ACDEFHKNPRTVWXY]\d{2})\s[0-9ACDEFHKNPRTVWXY]{4}$/.test(f);break;case"IT":i=/^(I-|IT-)?\d{5}$/i.test(f);break;case"MA":i=/^[1-9][0-9]{4}$/i.test(f);break;case"NL":i=/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(f);break;case"PL":i=/^[0-9]{2}\-[0-9]{3}$/.test(f);break;case"PT":i=/^[1-9]\d{3}-\d{3}$/.test(f);break;case"RO":i=/^(0[1-8]{1}|[1-9]{1}[0-5]{1})?[0-9]{4}$/i.test(f);break;case"RU":i=/^[0-9]{6}$/i.test(f);break;case"SE":i=/^(S-)?\d{3}\s?\d{2}$/i.test(f);break;case"SG":i=/^([0][1-9]|[1-6][0-9]|[7]([0-3]|[5-9])|[8][0-2])(\d{4})$/i.test(f);break;case"SK":i=/^(\d{3})([ ]?)(\d{2})$/.test(f);break;case"US":default:i=/^\d{4,5}([\-]?\d{4})?$/.test(f)}return{valid:i,message:FormValidation.Helper.format(d.message||FormValidation.I18n[g].zipCode.country,FormValidation.I18n[g].zipCode.countries[h])}},_gb:function(a){for(var b="[ABCDEFGHIJKLMNOPRSTUWYZ]",c="[ABCDEFGHKLMNOPQRSTUVWXY]",d="[ABCDEFGHJKPMNRSTUVWXY]",e="[ABEHMNPRVWXY]",f="[ABDEFGHJLNPQRSTUWXYZ]",g=[new RegExp("^("+b+"{1}"+c+"?[0-9]{1,2})(\\s*)([0-9]{1}"+f+"{2})$","i"),new RegExp("^("+b+"{1}[0-9]{1}"+d+"{1})(\\s*)([0-9]{1}"+f+"{2})$","i"),new RegExp("^("+b+"{1}"+c+"{1}?[0-9]{1}"+e+"{1})(\\s*)([0-9]{1}"+f+"{2})$","i"),new RegExp("^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$","i"),/^(GIR)(\s*)(0AA)$/i,/^(BFPO)(\s*)([0-9]{1,4})$/i,/^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i,/^([A-Z]{4})(\s*)(1ZZ)$/i,/^(AI-2640)$/i],h=0;h<g.length;h++)if(g[h].test(a))return!0;return!1}}}(jQuery);
/*!
 * FormValidation (http://formvalidation.io)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation, Pure, SemanticUI, UIKit and custom frameworks
 *
 * @version     v0.8.1, built on 2016-07-29 1:10:56 AM
 * @author      https://twitter.com/formvalidation
 * @copyright   (c) 2013 - 2016 Nguyen Huu Phuoc
 * @license     http://formvalidation.io/license/
 */

!function(a){FormValidation.Framework.Bootstrap=function(b,c,d){c=a.extend(!0,{button:{selector:'[type="submit"]:not([formnovalidate])',disabled:"disabled"},err:{clazz:"help-block",parent:"^(.*)col-(xs|sm|md|lg)-(offset-){0,1}[0-9]+(.*)$"},icon:{valid:null,invalid:null,validating:null,feedback:"form-control-feedback"},row:{selector:".form-group",valid:"has-success",invalid:"has-error",feedback:"has-feedback"}},c),FormValidation.Base.apply(this,[b,c,d])},FormValidation.Framework.Bootstrap.prototype=a.extend({},FormValidation.Base.prototype,{_fixIcon:function(a,b){var c=this._namespace,d=a.attr("type"),e=a.attr("data-"+c+"-field"),f=this.options.fields[e].row||this.options.row.selector,g=a.closest(f);if("checkbox"===d||"radio"===d){var h=a.parent();h.hasClass(d)?b.insertAfter(h):h.parent().hasClass(d)&&b.insertAfter(h.parent())}0!==g.find(".input-group").length&&b.addClass("fv-bootstrap-icon-input-group").insertAfter(g.find(".input-group").eq(0))},_createTooltip:function(a,b,c){var d=this._namespace,e=a.data(d+".icon");if(e)switch(c){case"popover":e.css({cursor:"pointer","pointer-events":"auto"}).popover("destroy").popover({container:"body",content:b,html:!0,placement:"auto top",trigger:"hover click"});break;case"tooltip":default:e.css({cursor:"pointer","pointer-events":"auto"}).tooltip("destroy").tooltip({container:"body",html:!0,placement:"auto top",title:b})}},_destroyTooltip:function(a,b){var c=this._namespace,d=a.data(c+".icon");if(d)switch(b){case"popover":d.css({cursor:"","pointer-events":"none"}).popover("destroy");break;case"tooltip":default:d.css({cursor:"","pointer-events":"none"}).tooltip("destroy")}},_hideTooltip:function(a,b){var c=this._namespace,d=a.data(c+".icon");if(d)switch(b){case"popover":d.popover("hide");break;case"tooltip":default:d.tooltip("hide")}},_showTooltip:function(a,b){var c=this._namespace,d=a.data(c+".icon");if(d)switch(b){case"popover":d.popover("show");break;case"tooltip":default:d.tooltip("show")}}}),a.fn.bootstrapValidator=function(b){var c=arguments;return this.each(function(){var d=a(this),e=d.data("formValidation")||d.data("bootstrapValidator"),f="object"==typeof b&&b;e||(e=new FormValidation.Framework.Bootstrap(this,a.extend({},{events:{formInit:"init.form.bv",formPreValidate:"prevalidate.form.bv",formError:"error.form.bv",formSuccess:"success.form.bv",fieldAdded:"added.field.bv",fieldRemoved:"removed.field.bv",fieldInit:"init.field.bv",fieldError:"error.field.bv",fieldSuccess:"success.field.bv",fieldStatus:"status.field.bv",localeChanged:"changed.locale.bv",validatorError:"error.validator.bv",validatorSuccess:"success.validator.bv"}},f),"bv"),d.addClass("fv-form-bootstrap").data("formValidation",e).data("bootstrapValidator",e)),"string"==typeof b&&e[b].apply(e,Array.prototype.slice.call(c,1))})},a.fn.bootstrapValidator.Constructor=FormValidation.Framework.Bootstrap}(jQuery);
(function($) {
    /**
     * French language package
     * Translated by @dlucazeau. Updated by @neilime, @jazzzz
     */
    FormValidation.I18n = $.extend(true, FormValidation.I18n, {
        'fr_FR': {
            base64: {
                'default': 'Veuillez fournir une donnée correctement encodée en Base64'
            },
            between: {
                'default': 'Veuillez fournir une valeur comprise entre %s et %s',
                notInclusive: 'Veuillez fournir une valeur strictement comprise entre %s et %s'
            },
            bic: {
                'default': 'Veuillez fournir un code-barre BIC valide'
            },
            callback: {
                'default': 'Veuillez fournir une valeur valide'
            },
            choice: {
                'default': 'Veuillez fournir une valeur valide',
                less: 'Veuillez choisir au minimum %s options',
                more: 'Veuillez choisir au maximum %s options',
                between: 'Veuillez choisir de %s à %s options'
            },
            color: {
                'default': 'Veuillez fournir une couleur valide'
            },
            creditCard: {
                'default': 'Veuillez fournir un numéro de carte de crédit valide'
            },
            cusip: {
                'default': 'Veuillez fournir un code CUSIP valide'
            },
            cvv: {
                'default': 'Veuillez fournir un code CVV valide'
            },
            date: {
                'default': 'Veuillez fournir une date valide',
                'min': 'Veuillez fournir une date supérieure à %s',
                'max': 'Veuillez fournir une date inférieure à %s',
                'range': 'Veuillez fournir une date comprise entre %s et %s'
            },
            different: {
                'default': 'Veuillez fournir une valeur différente'
            },
            digits: {
                'default': 'Veuillez ne fournir que des chiffres'
            },
            ean: {
                'default': 'Veuillez fournir un code-barre EAN valide'
            },
            ein: {
                'default': 'Veuillez fournir un code-barre EIN valide'
            },
            emailAddress: {
                'default': 'Veuillez fournir une adresse e-mail valide'
            },
            file: {
                'default': 'Veuillez choisir un fichier valide'
            },
            greaterThan: {
                'default': 'Veuillez fournir une valeur supérieure ou égale à %s',
                notInclusive: 'Veuillez fournir une valeur supérieure à %s'
            },
            grid: {
                'default': 'Veuillez fournir un code GRId valide'
            },
            hex: {
                'default': 'Veuillez fournir un nombre hexadécimal valide'
            },
            iban: {
                'default': 'Veuillez fournir un code IBAN valide',
                country: 'Veuillez fournir un code IBAN valide pour %s',
                countries: {
                    AD: 'Andorre',
                    AE: 'Émirats Arabes Unis',
                    AL: 'Albanie',
                    AO: 'Angola',
                    AT: 'Autriche',
                    AZ: 'Azerbaïdjan',
                    BA: 'Bosnie-Herzégovine',
                    BE: 'Belgique',
                    BF: 'Burkina Faso',
                    BG: 'Bulgarie',
                    BH: 'Bahrein',
                    BI: 'Burundi',
                    BJ: 'Bénin',
                    BR: 'Brésil',
                    CH: 'Suisse',
                    CI: 'Côte d\'ivoire',
                    CM: 'Cameroun',
                    CR: 'Costa Rica',
                    CV: 'Cap Vert',
                    CY: 'Chypre',
                    CZ: 'République Tchèque',
                    DE: 'Allemagne',
                    DK: 'Danemark',
                    DO: 'République Dominicaine',
                    DZ: 'Algérie',
                    EE: 'Estonie',
                    ES: 'Espagne',
                    FI: 'Finlande',
                    FO: 'Îles Féroé',
                    FR: 'France',
                    GB: 'Royaume Uni',
                    GE: 'Géorgie',
                    GI: 'Gibraltar',
                    GL: 'Groënland',
                    GR: 'Gréce',
                    GT: 'Guatemala',
                    HR: 'Croatie',
                    HU: 'Hongrie',
                    IE: 'Irlande',
                    IL: 'Israël',
                    IR: 'Iran',
                    IS: 'Islande',
                    IT: 'Italie',
                    JO: 'Jordanie',
                    KW: 'Koweït',
                    KZ: 'Kazakhstan',
                    LB: 'Liban',
                    LI: 'Liechtenstein',
                    LT: 'Lithuanie',
                    LU: 'Luxembourg',
                    LV: 'Lettonie',
                    MC: 'Monaco',
                    MD: 'Moldavie',
                    ME: 'Monténégro',
                    MG: 'Madagascar',
                    MK: 'Macédoine',
                    ML: 'Mali',
                    MR: 'Mauritanie',
                    MT: 'Malte',
                    MU: 'Maurice',
                    MZ: 'Mozambique',
                    NL: 'Pays-Bas',
                    NO: 'Norvège',
                    PK: 'Pakistan',
                    PL: 'Pologne',
                    PS: 'Palestine',
                    PT: 'Portugal',
                    QA: 'Quatar',
                    RO: 'Roumanie',
                    RS: 'Serbie',
                    SA: 'Arabie Saoudite',
                    SE: 'Suède',
                    SI: 'Slovènie',
                    SK: 'Slovaquie',
                    SM: 'Saint-Marin',
                    SN: 'Sénégal',
                    TL: 'Timor oriental',
                    TN: 'Tunisie',
                    TR: 'Turquie',
                    VG: 'Îles Vierges britanniques',
                    XK: 'République du Kosovo'
                }
            },
            id: {
                'default': 'Veuillez fournir un numéro d\'identification valide',
                country: 'Veuillez fournir un numéro d\'identification valide pour %s',
                countries: {
                    BA: 'Bosnie-Herzégovine',
                    BG: 'Bulgarie',
                    BR: 'Brésil',
                    CH: 'Suisse',
                    CL: 'Chili',
                    CN: 'Chine',
                    CZ: 'République Tchèque',
                    DK: 'Danemark',
                    EE: 'Estonie',
                    ES: 'Espagne',
                    FI: 'Finlande',
                    HR: 'Croatie',
                    IE: 'Irlande',
                    IS: 'Islande',
                    LT: 'Lituanie',
                    LV: 'Lettonie',
                    ME: 'Monténégro',
                    MK: 'Macédoine',
                    NL: 'Pays-Bas',
                    PL: 'Pologne',
                    RO: 'Roumanie',
                    RS: 'Serbie',
                    SE: 'Suède',
                    SI: 'Slovénie',
                    SK: 'Slovaquie',
                    SM: 'Saint-Marin',
                    TH: 'Thaïlande',
                    TR: 'Turquie',
                    ZA: 'Afrique du Sud'
                }
            },
            identical: {
                'default': 'Veuillez fournir la même valeur'
            },
            imei: {
                'default': 'Veuillez fournir un code IMEI valide'
            },
            imo: {
                'default': 'Veuillez fournir un code IMO valide'
            },
            integer: {
                'default': 'Veuillez fournir un nombre valide'
            },
            ip: {
                'default': 'Veuillez fournir une adresse IP valide',
                ipv4: 'Veuillez fournir une adresse IPv4 valide',
                ipv6: 'Veuillez fournir une adresse IPv6 valide'
            },
            isbn: {
                'default': 'Veuillez fournir un code ISBN valide'
            },
            isin: {
                'default': 'Veuillez fournir un code ISIN valide'
            },
            ismn: {
                'default': 'Veuillez fournir un code ISMN valide'
            },
            issn: {
                'default': 'Veuillez fournir un code ISSN valide'
            },
            lessThan: {
                'default': 'Veuillez fournir une valeur inférieure ou égale à %s',
                notInclusive: 'Veuillez fournir une valeur inférieure à %s'
            },
            mac: {
                'default': 'Veuillez fournir une adresse MAC valide'
            },
            meid: {
                'default': 'Veuillez fournir un code MEID valide'
            },
            notEmpty: {
                'default': 'Veuillez fournir une valeur'
            },
            numeric: {
                'default': 'Veuillez fournir une valeur décimale valide'
            },
            phone: {
                'default': 'Veuillez fournir un numéro de téléphone valide',
                country: 'Veuillez fournir un numéro de téléphone valide pour %s',
                countries: {
                    AE: 'Émirats Arabes Unis',
                    BG: 'Bulgarie',
                    BR: 'Brésil',
                    CN: 'Chine',
                    CZ: 'République Tchèque',
                    DE: 'Allemagne',
                    DK: 'Danemark',
                    ES: 'Espagne',
                    FR: 'France',
                    GB: 'Royaume-Uni',
                    IN: 'Inde',
                    MA: 'Maroc',
                    NL: 'Pays-Bas',
                    PK: 'Pakistan',
                    RO: 'Roumanie',
                    RU: 'Russie',
                    SK: 'Slovaquie',
                    TH: 'Thaïlande',
                    US: 'USA',
                    VE: 'Venezuela'
                }
            },
            promise: {
                'default': 'Veuillez fournir une valeur valide'
            },
            regexp: {
                'default': 'Veuillez fournir une valeur correspondant au modèle'
            },
            remote: {
                'default': 'Veuillez fournir une valeur valide'
            },
            rtn: {
                'default': 'Veuillez fournir un code RTN valide'
            },
            sedol: {
                'default': 'Veuillez fournir a valid SEDOL number'
            },
            siren: {
                'default': 'Veuillez fournir un numéro SIREN valide'
            },
            siret: {
                'default': 'Veuillez fournir un numéro SIRET valide'
            },
            step: {
                'default': 'Veuillez fournir un écart valide de %s'
            },
            stringCase: {
                'default': 'Veuillez ne fournir que des caractères minuscules',
                upper: 'Veuillez ne fournir que des caractères majuscules'
            },
            stringLength: {
                'default': 'Veuillez fournir une valeur de longueur valide',
                less: 'Veuillez fournir moins de %s caractères',
                more: 'Veuillez fournir plus de %s caractères',
                between: 'Veuillez fournir entre %s et %s caractères'
            },
            uri: {
                'default': 'Veuillez fournir un URI valide'
            },
            uuid: {
                'default': 'Veuillez fournir un UUID valide',
                version: 'Veuillez fournir un UUID version %s number'
            },
            vat: {
                'default': 'Veuillez fournir un code VAT valide',
                country: 'Veuillez fournir un code VAT valide pour %s',
                countries: {
                    AT: 'Autriche',
                    BE: 'Belgique',
                    BG: 'Bulgarie',
                    BR: 'Brésil',
                    CH: 'Suisse',
                    CY: 'Chypre',
                    CZ: 'République Tchèque',
                    DE: 'Allemagne',
                    DK: 'Danemark',
                    EE: 'Estonie',
                    ES: 'Espagne',
                    FI: 'Finlande',
                    FR: 'France',
                    GB: 'Royaume-Uni',
                    GR: 'Grèce',
                    EL: 'Grèce',
                    HU: 'Hongrie',
                    HR: 'Croatie',
                    IE: 'Irlande',
                    IS: 'Islande',
                    IT: 'Italie',
                    LT: 'Lituanie',
                    LU: 'Luxembourg',
                    LV: 'Lettonie',
                    MT: 'Malte',
                    NL: 'Pays-Bas',
                    NO: 'Norvège',
                    PL: 'Pologne',
                    PT: 'Portugal',
                    RO: 'Roumanie',
                    RU: 'Russie',
                    RS: 'Serbie',
                    SE: 'Suède',
                    SI: 'Slovénie',
                    SK: 'Slovaquie',
                    VE: 'Venezuela',
                    ZA: 'Afrique du Sud'
                }
            },
            vin: {
                'default': 'Veuillez fournir un code VIN valide'
            },
            zipCode: {
                'default': 'Veuillez fournir un code postal valide',
                country: 'Veuillez fournir un code postal valide pour %s',
                countries: {
                    AT: 'Autriche',
                    BG: 'Bulgarie',
                    BR: 'Brésil',
                    CA: 'Canada',
                    CH: 'Suisse',
                    CZ: 'République Tchèque',
                    DE: 'Allemagne',
                    DK: 'Danemark',
                    ES: 'Espagne',
                    FR: 'France',
                    GB: 'Royaume-Uni',
                    IE: 'Irlande',
                    IN: 'Inde',
                    IT: 'Italie',
                    MA: 'Maroc',
                    NL: 'Pays-Bas',
                    PL: 'Pologne',
                    PT: 'Portugal',
                    RO: 'Roumanie',
                    RU: 'Russie',
                    SE: 'Suède',
                    SG: 'Singapour',
                    SK: 'Slovaquie',
                    US: 'USA'
                }
            }
        }
    });
}(jQuery));
//Query model with marque name
function fetchModels(marqueId){
  $.getJSON('/marques/'+marqueId+'/models', function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<option id='" + key + " value='" + val + "'>" + val + "</li>" );
  });

  $('#appointment_vehicule_attributes_model').append(items.join( "" ))

 });
}

function setDommage(value, id){
  $(".fh5co-card").removeClass('active')
  $('#'+id).addClass('active')
  $("input[name='appointment[dommage]']").val(value)
}

function next(stepNumber){
  switch (stepNumber) {
    case 2:
     var domageVal = $("input[name='appointment[dommage]']").val()
      if(!domageVal){
        $('#errorsMessages').removeClass('hidden')
        $('#errorsMessages').html('<p>Vueillez indiquer le vitre endomagé.</p>')
        return 0;
      }else{
        $('#errorsMessages').addClass('hidden')
      }
      break;
      case 3:
      var marque = $("select[name='appointment[vehicule_attributes][marque_id]']").val(),
      model = $("input[name='appointment[vehicule_attributes][model]']").val(), error = false
      if(marque){
        $('#marqueInput').removeClass('has-error')
      }else{
        $('#marqueInput').addClass('has-error')
        error = true
      }
      if(model){
          $('#modeleInput').removeClass('has-error')
      }else{
          $('#modeleInput').addClass('has-error')
          error = true
      }
      if(error){
        return 0
      }
      break;
    default:

  }

  $('.step').hide()
  $('#step-'+stepNumber).show()
  $('.step-icon').removeClass('active')
  $('#step-icon-'+stepNumber).addClass('active')
}


$( document ).ready(function() {

  var marqueInput = $('#appointment_vehicule_attributes_marque_id')
  marqueInput.change(function() {
    var marqueId = marqueInput.val()
    if(marqueId){
      fetchModels(marqueId)
    }
  })

  //Sow first step
  next(1)

 //Hide adresse input
  var adresseInput = $('#adresse_user')
  adresseInput.hide()

  //show adresse
  $("input[name='appointment[lieu]']").change(function() {
    if($(this).val() == 'Notre équipe se déplace chez vous'){
      adresseInput.show()
    }else{
      adresseInput.hide()
    }
  })

  //handle form submit ajax
  var appointForm = $("#form_appointment");

  appointForm.on("ajax:success", function(e, data, status, xhr) {
    $("#success_message").append(data.message)
  });

  appointForm.on("ajax:error", function(e, xhr, status, error) {

    //$("#new_article").append("<p>ERROR</p>")
  });

//Handle dommage select
$('.domage-card').click(function(){
  var id = this.id
  switch (id) {
    case "pare-brise":
      setDommage("Pare-brise", "pare-brise")
      break;
    case "lunette-arriere":
      setDommage("Lunette arriére", "lunette-arriere")
      break;
    case "vitre-gauche":
      setDommage("Vitre latérale gauche", "vitre-gauche")
      break;
    case "vitre-droite":
      setDommage("Vitre latérale droite", "vitre-droite")
      break;
    default:

  }
})


//form validation
$('#form_appointment').formValidation({
    framework: 'bootstrap',
    icon: {
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        "appointment[user_attributes][prenom]": {
            validators: {
                notEmpty: {
                    message: 'Veuillez indiquer votre prénom'
                }
            }
        },
        "appointment[user_attributes][nom]": {
            validators: {
                notEmpty: {
                    message: 'Veuillez indiquer votre nom'
                }
            }
        },
        "appointment[user_attributes][email]": {
            validators: {
                notEmpty: {
                    message: 'Veuillez indiquer votre E-mail'
                }
            }
        },
        "appointment[user_attributes][telephone]": {
            validators: {
                notEmpty: {
                    message: 'Veuillez indiquer votre numéro de téléphone '
                }
            }
        }
    }
});

});
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
$(document).ready(function(){
  $('#homeSlider').carousel({
  interval: 2000})

  jQuery("#home-gallery").unitegallery({
		gallery_theme: "tiles",
			tiles_type: "nested"						
	});
})
;
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
function fullWidht(){
  if($(window).width() <= 767){
    $('#fh5co-main > .container').removeClass('container');
  }else{
    $('#fh5co-main >  div').addClass('container');
  }
}
$(document).ready(function(){
  fullWidht()
  $(window).resize(function(){
      fullWidht()
    });
})
;

if(typeof g_ugFunctions != "undefined")
	g_ugFunctions.registerTheme("tiles");
else 
	jQuery(document).ready(function(){g_ugFunctions.registerTheme("tiles")});


/**
 * Grid gallery theme
 */
function UGTheme_tiles(){

	var t = this;
	var g_gallery = new UniteGalleryMain(), g_objGallery, g_objects, g_objWrapper; 
	var g_tiles = new UGTiles(), g_lightbox = new UGLightbox(), g_objPreloader, g_objTilesWrapper;
	var g_functions = new UGFunctions(), g_objTileDesign = new UGTileDesign();
	
	var g_options = {
			theme_enable_preloader: true,		//enable preloader circle
			theme_preloading_height: 200,		//the height of the preloading div, it show before the gallery
			theme_preloader_vertpos: 100,		//the vertical position of the preloader
			theme_gallery_padding: 0,			//the horizontal padding of the gallery from the sides
			theme_appearance_order: "normal",	//normal, shuffle, keep - the appearance order of the tiles. applying only to columns type
			theme_auto_open:null				//auto open lightbox at start
	};
	
	var g_defaults = {
			gallery_width: "100%"
	};
	
	//temp variables
	var g_temp = {
			showPreloader: false
	};
	
	
	/**
	 * Init the theme
	 */
	function initTheme(gallery, customOptions){
		
		g_gallery = gallery;
		
		//set default options
		g_options = jQuery.extend(g_options, g_defaults);
		
		//set custom options
		g_options = jQuery.extend(g_options, customOptions);
		
		modifyOptions();
		
		//set gallery options
		g_gallery.setOptions(g_options);
		
		g_gallery.setFreestyleMode();
		
		g_objects = gallery.getObjects();
		
		//get some objects for local use
		g_objGallery = jQuery(gallery);		
		g_objWrapper = g_objects.g_objWrapper;
		
		//init objects
		g_tiles.init(gallery, g_options);
		g_lightbox.init(gallery, g_options);
		
		g_objTileDesign = g_tiles.getObjTileDesign();

		
	}
	
	
	/**
	 * modift options
	 */
	function modifyOptions(){
		
		if(g_options.theme_enable_preloader == true)
			g_temp.showPreloader = true;
		
		switch(g_options.theme_appearance_order){
			default:
			case "normal":
			break;
			case "shuffle":
				g_gallery.shuffleItems();
			break;
			case "keep":
				g_options.tiles_keep_order = true;
			break;
		}
		
	}

	
	/**
	 * set gallery html elements
	 */
	function setHtml(){
		
		//add html elements
		g_objWrapper.addClass("ug-theme-tiles");
		
		g_objWrapper.append("<div class='ug-tiles-wrapper' style='position:relative'></div>");
		
		//add preloader
		if(g_temp.showPreloader == true){
			g_objWrapper.append("<div class='ug-tiles-preloader ug-preloader-trans'></div>");
			g_objPreloader = g_objWrapper.children(".ug-tiles-preloader");
			g_objPreloader.fadeTo(0,0);
		}
		
		g_objTilesWrapper = g_objWrapper.children(".ug-tiles-wrapper");
		
		//set padding
		if(g_options.theme_gallery_padding)
			g_objWrapper.css({
				"padding-left":g_options.theme_gallery_padding+"px",
				"padding-right":g_options.theme_gallery_padding+"px"
			});
		
		g_tiles.setHtml(g_objTilesWrapper);
		g_lightbox.putHtml();
	}
	
	/**
	 * actually run the theme
	 */
	function actualRun(){
		
		//set preloader mode
		if(g_objPreloader){
			g_objPreloader.fadeTo(0,1);
			g_objWrapper.height(g_options.theme_preloading_height);
			g_functions.placeElement(g_objPreloader, "center", g_options.theme_preloader_vertpos);
		}
		
		initEvents();
		
		g_tiles.run();
		g_lightbox.run();
		
	}

	
	/**
	 * run the theme
	 */
	function runTheme(){
		
		setHtml();
		
		actualRun();
		
	}
	
	
	
	/**
	 * init size of the thumbs panel
	 */
	function initThumbsPanel(){
		
		//set size:
		var objGallerySize = g_gallery.getSize();
			
		if(g_temp.isVertical == false)			
			g_objPanel.setWidth(objGallerySize.width);
		else
			g_objPanel.setHeight(objGallerySize.height);
		
		g_objPanel.run();
	}
	
	
	/**
	 * on tile click - open lightbox
	 */
	function onTileClick(data, objTile){
		
		objTile = jQuery(objTile);		
		
		var objItem = g_objTileDesign.getItemByTile(objTile);
		var index = objItem.index;		
		
		g_lightbox.open(index);
	}
	
	
	/**
	 * before items request: hide items, show preloader
	 */
	function onBeforeReqestItems(){
				
		g_objTilesWrapper.hide();
		
		if(g_objPreloader){
			g_objPreloader.show();
		
			var preloaderSize = g_functions.getElementSize(g_objPreloader);
			var galleryHeight = preloaderSize.bottom + 30;
			
			g_objWrapper.height(galleryHeight);
		}
		
	}

	/**
	 * open lightbox at start if needed
	 */
	function onLightboxInit(){

		if(g_options.theme_auto_open !== null){
			g_lightbox.open(g_options.theme_auto_open);
			g_options.theme_auto_open = null;
		}
		
	}
	
	
	/**
	 * init buttons functionality and events
	 */
	function initEvents(){
		
		//remove preloader on tiles first placed
		if(g_objPreloader){
			
			g_gallery.onEvent(g_tiles.events.TILES_FIRST_PLACED, function(){
				
				g_objWrapper.height("auto");
				g_objPreloader.hide();
			});			
		}
		
		jQuery(g_objTileDesign).on(g_objTileDesign.events.TILE_CLICK, onTileClick);
		
		g_objGallery.on(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS, onBeforeReqestItems);

		jQuery(g_lightbox).on(g_lightbox.events.LIGHTBOX_INIT, onLightboxInit);

	}
	
	
	/**
	 * destroy the theme
	 */
	this.destroy = function(){
				
		jQuery(g_objTileDesign).off(g_objTileDesign.events.TILE_CLICK);
		
		g_gallery.destroyEvent(g_tiles.events.TILES_FIRST_PLACED);
				
		g_objGallery.off(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS);

		jQuery(g_lightbox).off(g_lightbox.events.LIGHTBOX_INIT);
		
		g_tiles.destroy();
		g_lightbox.destroy();
	}
	
	
	/**
	 * run the theme setting
	 */
	this.run = function(){
		
		runTheme();
	}
	
	
	/**
	 * add items
	 */
	this.addItems = function(){
		
		g_tiles.runNewItems();
	}
	
	
	/**
	 * init 
	 */
	this.init = function(gallery, customOptions){
				
		initTheme(gallery, customOptions);
		
	}
	
	
}
;
// Unite Gallery, Version: 1.7.45, released 27 Feb 2017 

function debugLine(e,t,i){e===!0&&(e="true"),e===!1&&(e="false");var n=e;if("object"==typeof e){n="";for(name in e){var r=e[name];n+=" "+name+": "+r}}if(1!=t||i||(n+=" "+Math.random()),1==i){var o=jQuery("#debug_line");o.width(200),o.height()>=500&&o.html("");var a=o.html();n=a+"<br> -------------- <br>"+n}jQuery("#debug_line").show().html(n)}function debugSide(e){var t="";for(name in e){var i=e[name];t+=name+" : "+i+"<br>"}jQuery("#debug_side").show().html(t)}function trace(e){"undefined"!=typeof console&&console.log(e)}function UGFunctions(){function e(e,t,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent?t.attachEvent("on"+e,i):t[e]=i}var t=null,i=this,n={starTime:0,arrThemes:[],isTouchDevice:-1,isRgbaSupported:-1,timeCache:{},dataCache:{},lastEventType:"",lastEventTime:0,lastTouchStartElement:null,touchThreshold:700,handle:null};this.debugVar="",this.z__________FULL_SCREEN___________=function(){},this.toFullscreen=function(e,t){if(e.requestFullscreen)e.requestFullscreen();else if(e.mozRequestFullScreen)e.mozRequestFullScreen();else if(e.webkitRequestFullscreen)e.webkitRequestFullscreen();else{if(!e.msRequestFullscreen)return!1;e.msRequestFullscreen()}return!0},this.exitFullscreen=function(){if(0==i.isFullScreen())return!1;if(document.exitFullscreen)document.exitFullscreen();else if(document.cancelFullScreen)document.cancelFullScreen();else if(document.mozCancelFullScreen)document.mozCancelFullScreen();else if(document.webkitExitFullscreen)document.webkitExitFullscreen();else{if(!document.msExitFullscreen)return!1;document.msExitFullscreen()}return!0},this.addFullScreenChangeEvent=function(t){document.webkitCancelFullScreen?e("webkitfullscreenchange",document,t):document.msExitFullscreen?e("MSFullscreenChange",document,t):document.mozCancelFullScreen?e("mozfullscreenchange",document,t):e("fullscreenchange",document,t)},this.destroyFullScreenChangeEvent=function(){jQuery(document).unbind("fullscreenChange"),jQuery(document).unbind("mozfullscreenchange"),jQuery(document).unbind("webkitfullscreenchange"),jQuery(document).unbind("MSFullscreenChange")},this.getFullScreenElement=function(){var e=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;return e},this.isFullScreen=function(){var e=document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen||document.msFullscreenElement;return e=e?!0:!1},this.z__________GET_PROPS___________=function(){},this.getBrowserPrefix=function(){if(null!==t)return t;var e=["webkit","Moz","ms","O"],i=document.createElement("div");for(var n in e){var r=e[n];if(r+"Transform"in i.style)return r=r.toLowerCase(),t=r,r}return t="",""},this.getImageInsideParentDataByImage=function(e,t,n){var r=e.parent(),o=i.getImageOriginalSize(e),a=i.getImageInsideParentData(r,o.width,o.height,t,n);return a},this.getImageInsideParentData=function(e,t,i,n,r,o,a){if(!r)var r={};var s={};if("undefined"==typeof o)var o=e.width();if("undefined"==typeof a)var a=e.height();r.padding_left&&(o-=r.padding_left),r.padding_right&&(o-=r.padding_right),r.padding_top&&(a-=r.padding_top),r.padding_bottom&&(a-=r.padding_bottom);var l=null,u="100%",d=null,_=null,g="display:block;margin:0px auto;";if(t>0&&i>0){if("down"==n&&o>t&&a>i)u=i,l=t,_=(o-l)/2,d=(a-u)/2;else if("fill"==n){var c=t/i;u=a,l=u*c,o>l?(l=o,u=l/c,_=0,d=Math.round((u-a)/2*-1)):(d=0,_=Math.round((l-o)/2*-1))}else{var c=t/i;u=a,l=u*c,d=0,_=(o-l)/2,"fitvert"!=n&&l>o&&(l=o,u=l/c,_=0,d=(a-u)/2)}l=Math.floor(l),u=Math.floor(u),d=Math.floor(d),_=Math.floor(_),g="position:absolute;"}return r.padding_top&&(d+=r.padding_top),r.padding_left&&(_+=r.padding_left),s.imageWidth=l,s.imageHeight=u,s.imageTop=d,s.imageLeft=_,s.imageRight=_+l,0==d||"100%"==u?s.imageBottom=null:s.imageBottom=d+u,s.style=g,s},this.getElementCenterPosition=function(e,t){var n=e.parent(),r=i.getElementSize(e),o=i.getElementSize(n),a=o.width,s=o.height;t&&void 0!==t.padding_top&&(s-=t.padding_top),t&&void 0!==t.padding_bottom&&(s-=t.padding_bottom),t&&void 0!==t.padding_left&&(a-=t.padding_left),t&&void 0!==t.padding_right&&(a-=t.padding_right);var l={};return l.left=Math.round((a-r.width)/2),l.top=Math.round((s-r.height)/2),t&&void 0!==t.padding_top&&(l.top+=t.padding_top),t&&void 0!==t.padding_left&&(l.left+=t.padding_left),l},this.getElementCenterPoint=function(e,t){if(!t)var t=!1;var n=i.getElementSize(e),r={};return r.x=n.width/2,r.y=n.height/2,1==t&&(r.x+=n.left,r.y+=n.top),r.x=Math.round(r.x),r.y=Math.round(r.y),r},this.getMousePosition=function(e,t){var i={pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY};if(e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length>0&&(i.pageX=e.originalEvent.touches[0].pageX,i.pageY=e.originalEvent.touches[0].pageY,i.clientX=e.originalEvent.touches[0].clientX,i.clientY=e.originalEvent.touches[0].clientY),t){var n=t.offset();i.mouseX=i.pageX-n.left,i.mouseY=i.pageY-n.top}return i},this.getMouseElementPoint=function(e,t){var n={x:e.pageX,y:e.pageY},r=i.getElementLocalPoint(n,t);return r},this.getElementLocalPoint=function(e,t){var i={},n=t.offset();return i.x=Math.round(e.x-n.left),i.y=Math.round(e.y-n.top),i},this.getImageOriginalSize=function(e,t,i){if("undefined"!=typeof t&&"undefined"!=typeof i)return{width:t,height:i};var n=e[0];if("undefined"==typeof n)throw new Error("getImageOriginalSize error - Image not found");var r={};if("undefined"==typeof n.naturalWidth){if("number"==typeof e.data("naturalWidth")){var r={};return r.width=e.data("naturalWidth"),r.height=e.data("naturalHeight"),r}var o=new Image;return o.src=n.src,o.complete?(r.width=o.width,r.height=o.height,e.data("naturalWidth",r.width),e.data("naturalHeight",r.height),r):{width:0,height:0}}return r.width=n.naturalWidth,r.height=n.naturalHeight,r},this.getimageRatio=function(e){var t=i.getImageOriginalSize(e),n=i.getElementSize(e),r=n.width/t.width;return r},this.isImageFitParent=function(e){var t=e.parent(),n=i.getElementSize(e),r=i.getElementSize(t);return n.width<=r.width&&n.height<=r.height?!0:!1},this.getElementSize=function(e){if(void 0===e)throw new Error("Can't get size, empty element");var t=e.position();return t.height=e.outerHeight(),t.width=e.outerWidth(),t.left=Math.round(t.left),t.top=Math.round(t.top),t.right=t.left+t.width,t.bottom=t.top+t.height,t},this.isElementBiggerThenParent=function(e){var t=e.parent(),n=i.getElementSize(e),r=i.getElementSize(t);return n.width>r.width||n.height>r.height?!0:!1},this.isPointInsideElement=function(e,t){var i=e.x>=0&&e.x<t.width;if(0==i)return!1;var n=e.y>=0&&e.y<t.height;return 0==n?!1:!0},this.getElementRelativePos=function(e,t,n,r){if(!r)var r=e.parent();if("number"==typeof e)var o={width:e,height:e};else var o=i.getElementSize(e);var a=i.getElementSize(r);switch(t){case"top":case"left":t=0,n&&(t+=n);break;case"center":t=Math.round((a.width-o.width)/2),n&&(t+=n);break;case"right":t=a.width-o.width,n&&(t-=n);break;case"middle":t=Math.round((a.height-o.height)/2),n&&(t+=n);break;case"bottom":t=a.height-o.height,n&&(t-=n)}return t},this.z_________SET_ELEMENT_PROPS_______=function(){},this.zoomImageInsideParent=function(e,t,n,r,o,a,s){if(!n)var n=1.2;if(!o)var o="fit";var l,u,d,_,g=n,c=e.parent(),h=i.getElementSize(e),p=i.getImageOriginalSize(e),f=!1,m=0,v=0,b=0,y=0;if(r){var I=i.getMouseElementPoint(r,e);f=i.isPointInsideElement(I,h),b=I.x,y=I.y}else f=!1;if(0==f){var w=i.getElementCenterPoint(e);b=w.x,y=w.y}if(1==t)l=h.height*g,u=h.width*g,0!=b&&(m=-(b*g-b)),0!=y&&(v=-(y*g-y));else{l=h.height/g,u=h.width/g;var E=i.getImageInsideParentData(c,p.width,p.height,o,s);if(u<E.imageWidth)return i.scaleImageFitParent(e,p.width,p.height,o,s),!0;1==f&&(0!=b&&(m=-(b/g-b)),0!=y&&(v=-(y/g-y)))}if(a){var T=1;if(0!=p.width&&(T=u/p.width),T>a)return!1}if(i.setElementSize(e,u,l),0==t&&0==f){var S=i.getElementCenterPosition(e);d=S.left,_=S.top}else d=h.left+m,_=h.top+v;return i.placeElement(e,d,_),!0},this.placeElement=function(e,t,n,r,o,a){if(0==jQuery.isNumeric(t)||0==jQuery.isNumeric(n)){if(!a)var a=e.parent();var s=i.getElementSize(e),l=i.getElementSize(a)}if(0==jQuery.isNumeric(t))switch(t){case"left":t=0,r&&(t+=r);break;case"center":t=Math.round((l.width-s.width)/2),r&&(t+=r);break;case"right":t=l.width-s.width,r&&(t-=r)}if(0==jQuery.isNumeric(n))switch(n){case"top":n=0,o&&(n+=o);break;case"middle":case"center":n=Math.round((l.height-s.height)/2),o&&(n+=o);break;case"bottom":n=l.height-s.height,o&&(n-=o)}var u={position:"absolute",margin:"0px"};null!==t&&(u.left=t),null!==n&&(u.top=n),e.css(u)},this.placeElementInParentCenter=function(e){i.placeElement(e,"center","middle")},this.setElementSizeAndPosition=function(e,t,i,n,r){var o={width:n+"px",height:r+"px",left:t+"px",top:i+"px",position:"absolute",margin:"0px"};e.css(o)},this.setElementSize=function(e,t,i){var n={width:t+"px"};null!==i&&"undefined"!=typeof i&&(n.height=i+"px"),e.css(n)},this.cloneElementSizeAndPos=function(e,t,n,r,o){var a=e.position();if(void 0==a)throw new Error("Can't get size, empty element");n===!0?(a.height=e.outerHeight(),a.width=e.outerWidth()):(a.height=e.height(),a.width=e.width()),a.left=Math.round(a.left),a.top=Math.round(a.top),r&&(a.left+=r),o&&(a.top+=o),i.setElementSizeAndPosition(t,a.left,a.top,a.width,a.height)},this.placeImageInsideParent=function(e,t,n,r,o,a){var s=i.getImageInsideParentData(t,n,r,o,a),l="<img";null!==s.imageWidth&&(l+=" width = '"+s.imageWidth+"'",s.style+="width:"+s.imageWidth+";"),null!=s.imageHeight&&("100%"==s.imageHeight?(l+=" height = '"+s.imageHeight+"'",s.style+="height:"+s.imageHeight+";"):(l+=" height = '"+s.imageHeight+"'",s.style+="height:"+s.imageHeight+"px;")),null!==s.imageTop&&(s.style+="top:"+s.imageTop+"px;"),null!==s.imageLeft&&(s.style+="left:"+s.imageLeft+"px;"),e=i.escapeDoubleSlash(e),l+=" style='"+s.style+"'",l+=' src="'+e+'"',l+=">",t.html(l);var u=t.children("img");return u},this.scaleImageCoverParent=function(e,t,n){if("number"==typeof t)var r=t,o=n;else var r=t.outerWidth(),o=t.outerHeight();var a=i.getImageOriginalSize(e),s=a.width,l=a.height,u=s/l,d=o,_=d*u,g=0,c=0;r>_?(_=r,d=_/u,c=0,g=Math.round((d-o)/2*-1)):(g=0,c=Math.round((_-r)/2*-1)),_=Math.round(_),d=Math.round(d),e.css({width:_+"px",height:d+"px",left:c+"px",top:g+"px"})},this.scaleImageFitParent=function(e,t,n,r,o){var a=e.parent(),s=i.getImageInsideParentData(a,t,n,r,o),l=!1,u={};return null!==s.imageWidth&&(l=!0,e.removeAttr("width"),u.width=s.imageWidth+"px"),null!=s.imageHeight&&(l=!0,e.removeAttr("height"),u.height=s.imageHeight+"px"),null!==s.imageTop&&(l=!0,u.top=s.imageTop+"px"),null!==s.imageLeft&&(l=!0,u.left=s.imageLeft+"px"),1==l&&(u.position="absolute",u.margin="0px 0px",e.css(u)),s},this.scaleImageByHeight=function(e,t,n,r){var o=i.getImageOriginalSize(e,n,r),a=o.width/o.height,s=Math.round(t*a);t=Math.round(t),i.setElementSize(e,s,t)},this.scaleImageByWidth=function(e,t,n,r){var o=i.getImageOriginalSize(e,n,r),a=o.width/o.height,s=Math.round(t/a);t=Math.round(t),i.setElementSize(e,t,s)},this.scaleImageExactSizeInParent=function(e,t,n,r,o,a){var s=e.parent(),l=i.getElementSize(s);l.width<r&&(r=l.width),l.height<o&&(o=l.height);var u=i.getImageInsideParentData(null,t,n,a,null,r,o),d=r,_=o,g=u.imageLeft,c=u.imageLeft,h=u.imageTop,p=u.imageTop,f=Math.round((l.width-r)/2),m=Math.round((l.height-o)/2),v=u.imageWidth+g+c,b=r-v;0!=b&&(c+=b);var y=u.imageHeight+h+p,b=o-y;0!=b&&(p+=b),e.removeAttr("width"),e.removeAttr("height");var I={position:"absolute",margin:"0px 0px"};I.width=d+"px",I.height=_+"px",I.left=f+"px",I.top=m+"px",I["padding-left"]=g+"px",I["padding-top"]=h+"px",I["padding-right"]=c+"px",I["padding-bottom"]=p+"px",e.css(I);var w={};return w.imageWidth=d,w.imageHeight=_,w},this.showElement=function(e,t,i){e.show().fadeTo(0,1),t&&t.show().fadeTo(0,1),i&&i.show().fadeTo(0,1)},this.z_________GALLERY_RELATED_FUNCTIONS_______=function(){},this.disableButton=function(e,t){if(!t)var t="ug-button-disabled";0==i.isButtonDisabled(e,t)&&e.addClass(t)},this.convertCustomPrefixOptions=function(e,t,i){if(!t)return e;var n={};return jQuery.each(e,function(e,r){if(0===e.indexOf(t+"_"+i+"_")){var o=e.replace(t+"_"+i+"_",i+"_");n[o]=r}else n[e]=r}),n},this.enableButton=function(e,t){if(!t)var t="ug-button-disabled";1==i.isButtonDisabled(e,t)&&e.removeClass(t)},this.isButtonDisabled=function(e,t){if(!t)var t="ug-button-disabled";return e.hasClass(t)?!0:!1},this.z_________MATH_FUNCTIONS_______=function(){},this.normalizeSetting=function(e,t,i,n,r,o){if(!o)var o=!1;var a=(r-i)/(n-i);return r=e+(t-e)*a,1==o&&(e>r&&(r=e),r>t&&(r=t)),r},this.getNormalizedValue=function(e,t,i,n,r){var o=(r-e)/(t-e);return r=e+(n-i)*o},this.getDistance=function(e,t,i,n){var r=Math.round(Math.sqrt(Math.abs((i-e)*(i-e)+(n-t)*(n-t))));return r},this.getMiddlePoint=function(e,t,i,n){var r={};return r.x=e+Math.round((i-e)/2),r.y=t+Math.round((n-t)/2),r},this.getNumItemsInSpace=function(e,t,i){var n=Math.floor((e+i)/(t+i));return n},this.getNumItemsInSpaceRound=function(e,t,i){var n=Math.round((e+i)/(t+i));return n},this.getSpaceByNumItems=function(e,t,i){var n=e*t+(e-1)*i;return n},this.getItemSizeInSpace=function(e,t,i){var n=Math.floor((e-(t-1)*i)/t);return n},this.getColX=function(e,t,i){var n=e*(t+i);return n},this.getColByIndex=function(e,t){var i=t%e;return i},this.getColRowByIndex=function(e,t){var i=Math.floor(e/t),n=Math.floor(e%t);return{col:n,row:i}},this.getIndexByRowCol=function(e,t,i){if(0>e)return-1;if(0>t)return-1;var n=e*i+t;return n},this.getPrevRowSameColIndex=function(e,t){var n=i.getColRowByIndex(e,t),r=i.getIndexByRowCol(n.row-1,n.col,t);return r},this.getNextRowSameColIndex=function(e,t){var n=i.getColRowByIndex(e,t),r=i.getIndexByRowCol(n.row+1,n.col,t);return r},this.z_________DATA_FUNCTIONS_______=function(){},this.setGlobalData=function(e,t){jQuery.data(document.body,e,t)},this.getGlobalData=function(e){var t=jQuery.data(document.body,e);return t},this.z_________EVENT_DATA_FUNCTIONS_______=function(){},this.handleScrollTop=function(e){if(0==i.isTouchDevice())return null;var t=i.getStoredEventData(e),r=15,o=15;if(null===t.scrollDir&&(Math.abs(t.diffMouseX)>r?t.scrollDir="hor":Math.abs(t.diffMouseY)>o&&Math.abs(t.diffMouseY)>Math.abs(t.diffMouseX)&&(t.scrollDir="vert",t.scrollStartY=t.lastMouseClientY,t.scrollOrigin=jQuery(document).scrollTop(),n.dataCache[e].scrollStartY=t.lastMouseClientY,n.dataCache[e].scrollOrigin=t.scrollOrigin),n.dataCache[e].scrollDir=t.scrollDir),"vert"!==t.scrollDir)return t.scrollDir;var a=(jQuery(document).scrollTop(),t.scrollOrigin-(t.lastMouseClientY-t.scrollStartY));return a>=0&&jQuery(document).scrollTop(a),t.scrollDir},this.wasVerticalScroll=function(e){var t=i.getStoredEventData(e);return"vert"===t.scrollDir?!0:!1},this.storeEventData=function(e,t,r){var o=i.getMousePosition(e),a=jQuery.now(),s={startTime:a,lastTime:a,startMouseX:o.pageX,startMouseY:o.pageY,lastMouseX:o.pageX,lastMouseY:o.pageY,startMouseClientY:o.clientY,lastMouseClientY:o.clientY,scrollTop:jQuery(document).scrollTop(),scrollDir:null};r&&(s=jQuery.extend(s,r)),n.dataCache[t]=s},this.updateStoredEventData=function(e,t,r){if(!n.dataCache[t])throw new Error("updateEventData error: must have stored cache object");var o=n.dataCache[t],a=i.getMousePosition(e);o.lastTime=jQuery.now(),void 0!==a.pageX&&(o.lastMouseX=a.pageX,o.lastMouseY=a.pageY,o.lastMouseClientY=a.clientY),r&&(o=jQuery.extend(o,r)),n.dataCache[t]=o},this.getStoredEventData=function(e,t){if(!n.dataCache[e])throw new Error("updateEventData error: must have stored cache object");var i=n.dataCache[e];return i.diffMouseX=i.lastMouseX-i.startMouseX,i.diffMouseY=i.lastMouseY-i.startMouseY,i.diffMouseClientY=i.lastMouseClientY-i.startMouseClientY,i.diffTime=i.lastTime-i.startTime,t===!0?(i.startMousePos=i.lastMouseY,i.lastMousePos=i.lastMouseY,i.diffMousePos=i.diffMouseY):(i.startMousePos=i.lastMouseX,i.lastMousePos=i.lastMouseX,i.diffMousePos=i.diffMouseX),i},this.isApproveStoredEventClick=function(e,t){if(!n.dataCache[e])return!0;var r=i.getStoredEventData(e,t),o=Math.abs(r.diffMousePos);return r.diffTime>400?!1:o>30?!1:!0},this.clearStoredEventData=function(e){n.dataCache[e]=null},this.z_________CHECK_SUPPORT_FUNCTIONS_______=function(){},this.isCanvasExists=function(){var e=jQuery('<canvas width="500" height="500" > </canvas>')[0];return"function"==typeof e.getContext?!0:!1},this.isScrollbarExists=function(){var e=window.innerWidth>document.documentElement.clientWidth;return e},this.isTouchDevice=function(){if(-1!==n.isTouchDevice)return n.isTouchDevice;try{document.createEvent("TouchEvent"),n.isTouchDevice=!0}catch(e){n.isTouchDevice=!1}return n.isTouchDevice},this.isRgbaSupported=function(){if(-1!==n.isRgbaSupported)return n.isRgbaSupported;var e=document.getElementsByTagName("script")[0],t=e.style.color;try{e.style.color="rgba(1,5,13,0.44)"}catch(i){}var r=e.style.color!=t;return e.style.color=t,n.isRgbaSupported=r,r},this.z_________GENERAL_FUNCTIONS_______=function(){},this.checkMinJqueryVersion=function(e){for(var t=jQuery.fn.jquery.split("."),i=e.split("."),n=0,r=t.length;r>n;n++){var o=parseInt(t[n]),a=parseInt(i[n]);if("undefined"==typeof i[n])return!0;if(a>o)return!1;if(o>a)return!0}return!0},this.getCssSizeParam=function(e){return jQuery.isNumeric(e)?e+"px":e},this.convertHexToRGB=function(e,t){var i=e.replace("#","");return i===e?e:(r=parseInt(i.substring(0,2),16),g=parseInt(i.substring(2,4),16),b=parseInt(i.substring(4,6),16),result="rgba("+r+","+g+","+b+","+t+")",result)},this.timestampToString=function(e){var t=new Date(e),i=t.getDate()+"/"+t.getMonth();return i+=" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+":"+t.getMilliseconds()},this.getArrTouches=function(e){var t=[];return e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length>0&&(t=e.originalEvent.touches),t},this.getArrTouchPositions=function(e){for(var t=[],i=0;i<e.length;i++){var n={pageX:e[i].pageX,pageY:e[i].pageY};t.push(n)}return t},this.startTimeDebug=function(){n.starTime=jQuery.now()},this.showTimeDebug=function(){var e=jQuery.now(),t=e-n.starTime;debugLine({"Time Passed":t},!0)},this.initProgressIndicator=function(e,t,n){switch("bar"!=e&&0==i.isCanvasExists()&&(e="bar"),e){case"bar":var r=new UGProgressBar;r.putHidden(n,t);break;default:case"pie":var r=new UGProgressPie;r.putHidden(n,t);break;case"pie2":t.type_fill=!0;var r=new UGProgressPie;r.putHidden(n,t)}return r},this.setButtonMobileReady=function(e){e.on("touchstart",function(e){jQuery(this).addClass("ug-nohover")}),e.on("mousedown touchend",function(e){return e.stopPropagation(),e.stopImmediatePropagation(),!1})},this.registerTheme=function(e){n.arrThemes.push(e)},this.getArrThemes=function(){return n.arrThemes},this.isThemeRegistered=function(e){return-1!==jQuery.inArray(e,n.arrThemes)?!0:!1},this.getFirstRegisteredTheme=function(){if(0==n.arrThemes.length)return"";var e=n.arrThemes[0];return e},this.isTimePassed=function(e,t){if(!t)var t=100;var i=jQuery.now();0==n.timeCache.hasOwnProperty(e)?lastTime=0:lastTime=n.timeCache[e];var r=i-lastTime;return n.timeCache[e]=i,t>=r?!1:!0},this.whenContiniousEventOver=function(e,t,i){if(!i)var i=300;1==n.timeCache.hasOwnProperty(e)&&null!=n.timeCache[e]&&(clearTimeout(n.timeCache[e]),n.timeCache[e]=null),n.timeCache[e]=setTimeout(t,i)},this.validateClickTouchstartEvent=function(e){var t=!0,i=jQuery.now()-n.lastEventTime;return"click"==e&&"touchstart"==n.lastEventType&&1e3>i&&(t=!1),n.lastEventTime=jQuery.now(),n.lastEventType=e,t},this.addClassOnHover=function(e,t){if(!t)var t="ug-button-hover";e.hover(function(){jQuery(this).addClass(t)},function(){jQuery(this).removeClass(t)})},this.destroyButton=function(e){e.off("mouseenter"),e.off("mouseleave"),e.off("click"),e.off("touchstart"),e.off("touchend"),e.off("mousedown"),e.off("tap")},this.setButtonOnClick=function(e,t){i.setButtonMobileReady(e),e.on("click touchstart",function(e){return objThis=jQuery(this),e.stopPropagation(),e.stopImmediatePropagation(),0==i.validateClickTouchstartEvent(e.type)?!0:void t(objThis,e)})},this.setButtonOnTap=function(e,t){e.on("tap",t),0==i.isTouchDevice()?e.on("click",function(e){var t=jQuery(this);return 0==i.validateClickTouchstartEvent(e.type)?!0:void t.trigger("tap")}):(e.on("touchstart",function(e){var t=jQuery(this);t.addClass("ug-nohover"),n.lastTouchStartElement=jQuery(this),n.lastEventTime=jQuery.now()}),e.on("touchend",function(e){var t=jQuery(this);if(0==t.is(n.lastTouchStartElement))return!0;if(!n.lastEventTime)return!0;var i=jQuery.now()-n.lastEventTime;return i>n.touchThreshold?!0:void t.trigger("tap")}))},this.loadJs=function(e,t){t===!0&&(e=location.protocol+"//"+e);var i=document.createElement("script");i.src=e;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(i,n)},this.loadCss=function(e,t){t===!0&&(e=location.protocol+"//"+e);var i=document.createElement("link");i.setAttribute("rel","stylesheet"),i.setAttribute("type","text/css"),i.setAttribute("href",e),document.getElementsByTagName("head")[0].appendChild(i)},this.addEvent=function(e,t,i){"undefined"!=typeof e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent&&e.attachEvent("on"+t,i)},this.checkImagesLoaded=function(e,t,i){function n(e,n){r++,"function"==typeof i&&setTimeout(function(){i(e,n)}),r==o&&"function"==typeof t&&setTimeout(function(){t()})}var r=0,o=e.length;return 0==o&&t?(t(),!1):void setTimeout(function(){for(var t=0;o>t;t++){var i=e[t];if(void 0!==i.naturalWidth&&0!==i.naturalWidth)n(e[t],!1);else{var r=jQuery("<img/>");r.data("index",t),r.on("load",function(){var t=jQuery(this).data("index");n(e[t],!1)}),r.on("error",function(){var t=jQuery(this).data("index");n(e[t],!0)}),r.attr("src",i.src)}}})},this.waitForWidth=function(e,t){var i=e.width();return 0!=i?(t(),!1):void(n.handle=setInterval(function(){i=e.width(),0!=i&&(clearInterval(n.handle),t())},300))},this.arrayShuffle=function(e){if("object"!=typeof e)return e;for(var t,i,n=e.length;n;t=parseInt(Math.random()*n),i=e[--n],e[n]=e[t],e[t]=i);return e},this.getObjectLength=function(e){var t=0;for(var i in e)t++;return t},this.normalizePercent=function(e){return 0>e&&(e=0),e>1&&(e=1),e},this.stripTags=function(e){var t=e.replace(/(<([^>]+)>)/gi,"");return t},this.escapeDoubleSlash=function(e){return e.replace('"','"')},this.htmlentitles=function(e){var t=jQuery("<div/>").text(e).html();return t},this.z_________END_GENERAL_FUNCTIONS_______=function(){}}function UGThumbsGeneral(){function e(e,t){var i=w[e],n="";0==C.customThumbs&&(n=" ug-thumb-generated");var r=i.index+1,o="style='z-index:"+r+";'",a="<div class='ug-thumb-wrapper"+n+"' "+o+"></div>";if(1==j.thumb_wrapper_as_link){var s=i.link;""==i.link&&(s="javascript:void(0)");var l="";1==j.thumb_link_newpage&&i.link&&(l=" target='_blank'");var a="<a href='"+s+"'"+l+" class='ug-thumb-wrapper"+n+"'></a>"}var u=jQuery(a),d=i.objThumbImage;if(0==C.customThumbs){if(1==j.thumb_show_loader&&d){var _="ug-thumb-loader-dark";"bright"==j.thumb_loader_type&&(_="ug-thumb-loader-bright"),u.append("<div class='ug-thumb-loader "+_+"'></div>"),u.append("<div class='ug-thumb-error' style='display:none'></div>")}if(d){if(d.addClass("ug-thumb-image"),1==j.thumb_image_overlay_effect){var g=d.clone().appendTo(u);g.addClass("ug-thumb-image-overlay "+t).removeClass("ug-thumb-image"),g.fadeTo(0,0),i.objImageOverlay=g}u.append(d)}}return C.isEffectBorder&&u.append("<div class='ug-thumb-border-overlay'></div>"),C.isEffectOverlay&&u.append("<div class='ug-thumb-overlay'></div>"),E.append(u),C.customThumbs&&C.funcSetCustomThumbHtml(u,i),w[e].objThumbWrapper=u,u}function t(e,t,i,n){var r={width:e+"px",height:t+"px"},o={width:e-C.thumbInnerReduce+"px",height:t-C.thumbInnerReduce+"px"},a=".ug-thumb-loader, .ug-thumb-error, .ug-thumb-border-overlay, .ug-thumb-overlay";i?(n!==!0&&i.css(r),i.find(a).css(o)):(E.children(".ug-thumb-wrapper").css(r),E.find(a).css(o))}function i(e,t,i,n){if(!n)var n=!1;P.isFakeFullscreen()&&(n=!0);var r=e.children(".ug-thumb-border-overlay"),o={};o["border-width"]=t+"px",0!=t&&(o["border-color"]=i),n&&n===!0?(r.css(o),0==t?r.hide():r.show()):(0==t?r.stop().fadeOut(j.thumb_transition_duration):r.show().stop().fadeIn(j.thumb_transition_duration),l(r,o))}function n(e,t,i){var n=e.children(".ug-thumb-overlay"),r=j.thumb_transition_duration;i&&i===!0&&(r=0),t?n.stop(!0).fadeTo(r,C.colorOverlayOpacity):n.stop(!0).fadeTo(r,0)}function r(e,t,i){var n=e.children("img.ug-thumb-image"),r=e.children("img.ug-thumb-image-overlay"),o=j.thumb_transition_duration;i&&i===!0&&(o=0),t?r.stop(!0).fadeTo(o,1):(n.fadeTo(0,1),r.stop(!0).fadeTo(o,0))}function o(e,t){if(C.isEffectBorder&&i(e,j.thumb_selected_border_width,j.thumb_selected_border_color,t),C.isEffectOverlay){var o=1==j.thumb_overlay_reverse?!0:!1;n(e,o,t)}C.isEffectImage&&r(e,!1,t),S.trigger(T.events.SETSELECTEDSTYLE,e)}function a(e){var t=T.getItemByThumb(e);return t.isLoaded=!0,t.isThumbImageLoaded=!1,1==C.customThumbs?(S.trigger(T.events.IMAGELOADERROR,e),!0):(e.children(".ug-thumb-loader").hide(),void e.children(".ug-thumb-error").show())}function s(e){if(j.thumb_round_corners_radius<=0)return!1;var t={"border-radius":j.thumb_round_corners_radius+"px"};e?(e.css(t),e.find(".ug-thumb-border-overlay").css(t)):E.find(".ug-thumb-wrapper, .ug-thumb-wrapper .ug-thumb-border-overlay").css(t)}function l(e,t){e.stop(!0).animate(t,{duration:j.thumb_transition_duration,easing:j.thumb_transition_easing,queue:!1})}function u(e){1==c(e)?o(e,!0,"redraw"):T.setThumbNormalStyle(e,!0,"redraw")}function d(e,i,n){if(1==j.thumb_fixed_size)x.scaleImageCoverParent(i,e);else{"height"==j.thumb_resize_by?x.scaleImageByHeight(i,j.thumb_height):x.scaleImageByWidth(i,j.thumb_width);var r=x.getElementSize(i);x.placeElement(i,0,0),t(r.width,r.height,e)}e.children(".ug-thumb-loader").hide(),i.show(),0==j.thumb_image_overlay_effect?i.fadeTo(0,1):(1==j.thumb_image_overlay_effect&&_(i),i.fadeTo(0,0),u(e)),S.trigger(T.events.AFTERPLACEIMAGE,e)}function _(e){var t=e.siblings(".ug-thumb-image-overlay");if(0==t.length)return!1;var i=x.getElementSize(e),n={width:i.width+"px",height:i.height+"px",left:i.left+"px",top:i.top+"px"};t.css(n),0==C.customThumbs&&t.fadeTo(0,1)}function g(){var e="",t=j.thumb_image_overlay_type.split(",");for(var i in t){var n=t[i];switch(n){case"bw":e+=" ug-bw-effect";break;case"blur":e+=" ug-blur-effect";break;case"sepia":e+=" ug-sepia-effect"}}return e}function c(e){return e.hasClass("ug-thumb-selected")?!0:!1}function h(e,i){i=jQuery(i);var n=(T.getItemByThumb(i),x.getElementSize(i));t(n.width,n.height,i,!0),u(i)}function p(e){return 1==C.touchEnabled?(objThumbs.off("mouseenter").off("mouseleave"),!0):void(0==c(e)&&T.setThumbOverStyle(e))}function f(e){return 1==C.touchEnabled?!0:void(0==c(e)&&T.setThumbNormalStyle(e,!1))}function m(e,t){if(!t)var t=!1;var i=jQuery(e),n=i.parents(".ug-thumb-wrapper");return 0==n.parent().length?!1:(objItem=T.getItemByThumb(n),1==objItem.isLoaded&&t===!1?!1:(T.triggerImageLoadedEvent(n,i),void(1==C.customThumbs?S.trigger(T.events.PLACEIMAGE,[n,i]):d(n,i,objItem))))}function v(e,t,i){objItem=T.getItemByThumb(t),objItem.isLoaded=!0,objItem.isThumbImageLoaded=!0;var n=x.getImageOriginalSize(i);objItem.thumbWidth=n.width,objItem.thumbHeight=n.height,objItem.thumbRatioByWidth=n.width/n.height,objItem.thumbRatioByHeight=n.height/n.width,t.addClass("ug-thumb-ratio-set")}var b,y,I,w,E,T=this,S=jQuery(T),P=new UniteGalleryMain,x=new UGFunctions;this.type={GET_THUMBS_ALL:"all",GET_THUMBS_RATIO:"ratio",GET_THUMBS_NO_RATIO:"no_ratio",GET_THUMBS_NEW:"new"},this.events={SETOVERSTYLE:"thumbmouseover",SETNORMALSTYLE:"thumbmouseout",SETSELECTEDSTYLE:"thumbsetselected",PLACEIMAGE:"thumbplaceimage",AFTERPLACEIMAGE:"thumb_after_place_image",IMAGELOADERROR:"thumbimageloaderror",THUMB_IMAGE_LOADED:"thumb_image_loaded"};var j={thumb_width:88,thumb_height:50,thumb_fixed_size:!0,thumb_resize_by:"height",thumb_border_effect:!0,thumb_border_width:0,thumb_border_color:"#000000",thumb_over_border_width:0,thumb_over_border_color:"#d9d9d9",thumb_selected_border_width:1,thumb_selected_border_color:"#d9d9d9",thumb_round_corners_radius:0,thumb_color_overlay_effect:!0,thumb_overlay_color:"#000000",thumb_overlay_opacity:.4,thumb_overlay_reverse:!1,thumb_image_overlay_effect:!1,thumb_image_overlay_type:"bw",thumb_transition_duration:200,thumb_transition_easing:"easeOutQuad",thumb_show_loader:!0,thumb_loader_type:"dark",thumb_wrapper_as_link:!1,thumb_link_newpage:!1},C={touchEnabled:!1,num_thumbs_checking:0,customThumbs:!1,funcSetCustomThumbHtml:null,isEffectBorder:!1,isEffectOverlay:!1,isEffectImage:!1,colorOverlayOpacity:1,thumbInnerReduce:0,allowOnResize:!0,classNewThumb:"ug-new-thumb"},A={timeout_thumb_check:100,thumb_max_check_times:600,eventSizeChange:"thumb_size_change"};this.init=function(e,t){y=e.getObjects(),P=e,b=jQuery(e),I=y.g_objWrapper,w=y.g_arrItems,j=jQuery.extend(j,t),C.isEffectBorder=j.thumb_border_effect,C.isEffectOverlay=j.thumb_color_overlay_effect,C.isEffectImage=j.thumb_image_overlay_effect},this._____________EXTERNAL_SETTERS__________=function(){},this.setHtmlThumbs=function(t,i){if(E=t,1==C.isEffectImage)var n=g();if(i!==!0)for(var r=P.getNumItems(),o=0;r>o;o++)e(o,n);else{var a=T.getThumbs();a.removeClass(C.classNewThumb);var s=P.getNewAddedItemsIndexes();jQuery.each(s,function(t,i){var r=e(i,n);r.addClass(C.classNewThumb)})}},this.setThumbNormalStyle=function(e,t,o){if(1==C.customThumbs&&e.removeClass("ug-thumb-over"),C.isEffectBorder&&i(e,j.thumb_border_width,j.thumb_border_color,t),C.isEffectOverlay){var a=1==j.thumb_overlay_reverse?!1:!0;n(e,a,t)}C.isEffectImage&&r(e,!0,t),S.trigger(T.events.SETNORMALSTYLE,e)},this.setThumbOverStyle=function(e){if(1==C.customThumbs&&e.addClass("ug-thumb-over"),C.isEffectBorder&&i(e,j.thumb_over_border_width,j.thumb_over_border_color),C.isEffectOverlay){var t=1==j.thumb_overlay_reverse?!0:!1;n(e,t)}1==C.isEffectImage&&r(e,!1),S.trigger(T.events.SETOVERSTYLE,e)},this.setHtmlProperties=function(e){if(!e)var e=T.getThumbs();if(0==C.customThumbs){1==j.thumb_fixed_size&&t(j.thumb_width,j.thumb_height,e),s(e)}if(e.each(function(){var e=jQuery(this);u(e)}),C.isEffectOverlay&&j.thumb_overlay_color){var i={};if(x.isRgbaSupported()){var n=x.convertHexToRGB(j.thumb_overlay_color,j.thumb_overlay_opacity);i["background-color"]=n}else i["background-color"]=j.thumb_overlay_color,C.colorOverlayOpacity=j.thumb_overlay_opacity;e.find(".ug-thumb-overlay").css(i)}},this.setThumbSelected=function(e){return 1==C.customThumbs&&e.removeClass("ug-thumb-over"),1==c(e)?!0:(e.addClass("ug-thumb-selected"),void o(e))},this.setThumbUnselected=function(e){e.removeClass("ug-thumb-selected"),T.setThumbNormalStyle(e,!1,"set unselected")},this.setOptions=function(e){j=jQuery.extend(j,e)},this.setThumbInnerReduce=function(e){C.thumbInnerReduce=e},this.setCustomThumbs=function(e,t,i){if(C.customThumbs=!0,"function"!=typeof e)throw new Error("The argument should be function");C.funcSetCustomThumbHtml=e,-1==jQuery.inArray("overlay",t)&&(C.isEffectOverlay=!1),-1==jQuery.inArray("border",t)&&(C.isEffectBorder=!1),C.isEffectImage=!1,i&&i.allow_onresize===!1&&(C.allowOnResize=!1)},this._____________EXTERNAL_GETTERS__________=function(){},this.getOptions=function(){return j},this.getNumThumbs=function(){var e=w.length;return e},this.getThumbImage=function(e){var t=e.find(".ug-thumb-image");return t},this.getThumbByIndex=function(e){var t=T.getThumbs();if(e>=t.length||0>e)throw new Error("Wrong thumb index");var i=jQuery(t[e]);return i},this.getThumbs=function(e){var t=".ug-thumb-wrapper",i=".ug-thumb-ratio-set";switch(e){default:case T.type.GET_THUMBS_ALL:var n=E.children(t);break;case T.type.GET_THUMBS_NO_RATIO:var n=E.children(t).not(i);break;case T.type.GET_THUMBS_RATIO:var n=E.children(t+i);break;case T.type.GET_THUMBS_NEW:var n=E.children("."+C.classNewThumb)}return n},this.getItemByThumb=function(e){var t=e.data("index");void 0===t&&(t=e.index());var i=w[t];return i},this.isThumbLoaded=function(e){var t=T.getItemByThumb(e);return t.isLoaded},this.getGlobalThumbSize=function(){var e={width:j.thumb_width,
height:j.thumb_height};return e},this._____________EXTERNAL_OTHERS__________=function(){},this.initEvents=function(){var e=".ug-thumb-wrapper";1==C.allowOnResize&&I.on(A.eventSizeChange,h),S.on(T.events.THUMB_IMAGE_LOADED,v),E.on("touchstart",e,function(){C.touchEnabled=!0,E.off("mouseenter").off("mouseleave")}),E.on("mouseenter",e,function(e){var t=jQuery(this);p(t)}),E.on("mouseleave",e,function(e){var t=jQuery(this);f(t)})},this.destroy=function(){var e=".ug-thumb-wrapper";E.off("touchstart",e),I.off(A.eventSizeChange),E.off("mouseenter",e),E.off("mouseleave",e),S.off(T.events.THUMB_IMAGE_LOADED)},this.loadThumbsImages=function(){var e=E.find(".ug-thumb-image");x.checkImagesLoaded(e,null,function(e,t){if(0==t)m(e,!0);else{var i=jQuery(e).parent();a(i)}})},this.triggerImageLoadedEvent=function(e,t){S.trigger(T.events.THUMB_IMAGE_LOADED,[e,t])},this.hideThumbs=function(){E.find(".ug-thumb-wrapper").hide()}}function UGThumbsStrip(){function e(e,i){S=e.getObjects(),z=e,z.attachThumbsPanel("strip",O),T=jQuery(e),P=S.g_objWrapper,x=S.g_arrItems,k=jQuery.extend(k,i),H=k.strip_vertical_type,1==H&&(k=jQuery.extend(k,D),k=jQuery.extend(k,i),i.thumb_resize_by="width"),N.init(e,i),t()}function t(){var e=N.getOptions();R.isNotFixedThumbs=e.thumb_fixed_size===!1,H=k.strip_vertical_type}function n(){N.setHtmlProperties(),o(),l(),s(),0==R.isRunOnce&&(1==k.strip_control_touch&&(M=new UGTouchThumbsControl,M.init(O)),1==k.strip_control_avia&&(A=new UGAviaControl,A.init(O)),p(),N.loadThumbsImages(),y()),R.isRunOnce=!0}function r(e){G.stripSize=e,0==H?G.stripActiveSize=G.stripSize-k.strip_padding_left-k.strip_padding_right:G.stripActiveSize=G.stripSize-k.strip_padding_top-k.strip_padding_bottom,G.stripActiveSize<0&&(G.stripActiveSize=0)}function o(){var e=C.children(".ug-thumb-wrapper"),t=jQuery(e[0]),i=t.outerWidth(),n=t.outerHeight(),o=N.getOptions();0==H?(G.thumbSize=i,1==o.thumb_fixed_size?G.thumbSecondSize=n:G.thumbSecondSize=o.thumb_height,r(j.width()),G.stripInnerSize=C.width()):(G.thumbSize=n,1==o.thumb_fixed_size?G.thumbSecondSize=i:G.thumbSecondSize=o.thumb_width,r(j.height()),G.stripInnerSize=C.height())}function a(e){0==H?C.width(e):C.height(e),G.stripInnerSize=e,p(),jQuery(O).trigger(O.events.INNER_SIZE_CHANGE)}function s(){var e=C.children(".ug-thumb-wrapper"),t=0,n=0;for(0==H&&(n=k.strip_padding_top),i=0;i<e.length;i++){var r=jQuery(e[i]);if(1==R.isNotFixedThumbs){if(objItem=N.getItemByThumb(r),0==objItem.isLoaded)continue;r.show()}L.placeElement(r,t,n),0==H?t+=r.outerWidth()+k.strip_space_between_thumbs:n+=r.outerHeight()+k.strip_space_between_thumbs}if(0==H)var o=t-k.strip_space_between_thumbs;else var o=n-k.strip_space_between_thumbs;a(o)}function l(){if(0==H){var e=G.thumbSecondSize,t={};t.height=e+"px";var i={};i.height=e+"px"}else{var n=G.thumbSecondSize,t={};t.width=n+"px";var i={};i.width=n+"px"}j.css(t),C.css(i)}function u(e){var t=O.getInnerStripPos(),i=t+e;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function d(e){var t=E(e),i=-1*t.min;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function _(e){var t=E(e),i=-1*t.max+G.stripSize;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function g(e){if(0==I())return!1;var t=w(),i=E(e);if(i.min<t.minPosThumbs){var n=e.prev();d(n.length?n:e)}else if(i.max>t.maxPosThumbs){var r=e.next();_(r.length?r:e)}}function c(){var e=z.getSelectedItem();if(null==e)return!0;var t=e.objThumbWrapper;t&&g(t)}function h(){if(0==I())return!1;var e=O.getInnerStripPos(),t=O.fixInnerStripLimits(e);e!=t&&O.positionInnerStrip(t,!0)}function p(){var e=I();1==e?(A&&A.enable(),M&&M.enable()):(A&&A.disable(),M&&M.disable())}function f(){return I()?!1:void(0==H?L.placeElement(C,k.strip_thumbs_align,0):L.placeElement(C,0,k.strip_thumbs_align))}function m(e){if(O.isTouchMotionActive()){var t=M.isSignificantPassed();if(1==t)return!0}var i=N.getItemByThumb(e);z.selectItem(i)}function v(){clearTimeout(R.handle),R.handle=setTimeout(function(){s()},50)}function b(){var e=z.getSelectedItem();N.setThumbSelected(e.objThumbWrapper),g(e.objThumbWrapper)}function y(){N.initEvents();var e=j.find(".ug-thumb-wrapper");e.on("click touchend",function(e){var t=jQuery(this);m(t)}),T.on(z.events.ITEM_CHANGE,b),R.isNotFixedThumbs&&jQuery(N).on(N.events.AFTERPLACEIMAGE,v)}function I(){return G.stripInnerSize>G.stripActiveSize?!0:!1}function w(){var e={},t=O.getInnerStripPos();return e.minPosThumbs=-1*t+1,e.maxPosThumbs=-1*t+G.stripSize-1,e}function E(e){var t={},i=e.position();return 0==H?(t.min=i.left,t.max=i.left+G.thumbSize):(t.min=i.top,t.max=i.top+G.thumbSize),t}var T,S,P,x,j,C,A,M,O=this,z=new UniteGalleryMain,L=new UGFunctions,H=!1,N=new UGThumbsGeneral,L=new UGFunctions,k={strip_vertical_type:!1,strip_thumbs_align:"left",strip_space_between_thumbs:6,strip_thumb_touch_sensetivity:15,strip_scroll_to_thumb_duration:500,strip_scroll_to_thumb_easing:"easeOutCubic",strip_control_avia:!0,strip_control_touch:!0,strip_padding_top:0,strip_padding_bottom:0,strip_padding_left:0,strip_padding_right:0},R={isRunOnce:!1,is_placed:!1,isNotFixedThumbs:!1,handle:null},G={stripSize:0,stripActiveSize:0,stripInnerSize:0,thumbSize:0,thumbSecondSize:0};this.events={STRIP_MOVE:"stripmove",INNER_SIZE_CHANGE:"size_change"};var D={strip_thumbs_align:"top",thumb_resize_by:"width"};this.setHtml=function(e){if(!e){var e=P;null!=k.parent_container&&(e=k.parent_container)}e.append("<div class='ug-thumbs-strip'><div class='ug-thumbs-strip-inner'></div></div>"),j=e.children(".ug-thumbs-strip"),C=j.children(".ug-thumbs-strip-inner"),N.setHtmlThumbs(C),1==R.isNotFixedThumbs&&N.hideThumbs()},this.destroy=function(){var e=j.find(".ug-thumb-wrapper");e.off("click"),e.off("touchend"),T.off(z.events.ITEM_CHANGE),jQuery(N).off(N.events.AFTERPLACEIMAGE),M&&M.destroy(),A&&A.destroy(),N.destroy()},this.________EXTERNAL_GENERAL___________=function(){},this.init=function(t,i){e(t,i)},this.run=function(){n()},this.positionInnerStrip=function(e,t){if(void 0===t)var t=!1;if(0==H)var i={left:e+"px"};else var i={top:e+"px"};0==t?(C.css(i),O.triggerStripMoveEvent()):(O.triggerStripMoveEvent(),C.stop(!0).animate(i,{duration:k.strip_scroll_to_thumb_duration,easing:k.strip_scroll_to_thumb_easing,queue:!1,progress:function(){O.triggerStripMoveEvent()},always:function(){O.triggerStripMoveEvent()}}))},this.triggerStripMoveEvent=function(){jQuery(O).trigger(O.events.STRIP_MOVE)},this.isTouchMotionActive=function(){if(!M)return!1;var e=M.isTouchActive();return e},this.isItemThumbVisible=function(e){var t=e.objThumbWrapper,i=t.position(),n=-1*O.getInnerStripPos();if(0==H)var r=n+G.stripSize,o=i.left,a=i.left+t.width();else var r=n+G.stripSize,o=i.top,a=i.top+t.height();var s=!1;return a>=n&&r>=o&&(s=!0),s},this.getInnerStripPos=function(){return 0==H?C.position().left:C.position().top},this.getInnerStripLimits=function(){var e={};return 0==H?e.maxPos=k.strip_padding_left:e.maxPos=k.strip_padding_top,e.minPos=-(G.stripInnerSize-G.stripActiveSize),e},this.fixInnerStripLimits=function(e){var t=O.getInnerStripLimits();return e>t.maxPos&&(e=t.maxPos),e<t.minPos&&(e=t.minPos),e},this.scrollForeward=function(){u(-G.stripSize)},this.scrollBack=function(){u(G.stripSize)},this.________EXTERNAL_SETTERS___________=function(){},this.setOptions=function(e){k=jQuery.extend(k,e),N.setOptions(e),t()},this.setSizeVertical=function(e){if(0==H)throw new Error("setSizeVertical error, the strip size is not vertical");var t=G.thumbSecondSize,i={};i.width=t+"px",i.height=e+"px",j.css(i),r(e);var n={};n.width=t+"px",n.left="0px",n.top="0px",C.css(n),R.is_placed=!0,p()},this.setSizeHorizontal=function(e){if(1==H)throw new Error("setSizeHorizontal error, the strip size is not horizontal");var t=G.thumbSecondSize+k.strip_padding_top+k.strip_padding_bottom,i={};i.width=e+"px",i.height=t+"px",j.css(i),r(e);var n=k.strip_padding_left,o={};o.height=t+"px",o.left=n+"px",o.top="0px",C.css(o),R.is_placed=!0,p()},this.setPosition=function(e,t,i,n){L.placeElement(j,e,t,i,n)},this.resize=function(e){0==H?(j.width(e),G.stripActiveSize=e-k.strip_padding_left-k.strip_padding_right):(j.height(e),G.stripActiveSize=e-k.strip_padding_top-k.strip_padding_bottom),r(e),p(),h(),f(),c()},this.setThumbUnselected=function(e){N.setThumbUnselected(e)},this.setCustomThumbs=function(e){N.setCustomThumbs(e)},this.________EXTERNAL_GETTERS___________=function(){},this.getObjects=function(){var e=N.getOptions(),t=jQuery.extend(k,e),i={g_gallery:z,g_objGallery:T,g_objWrapper:P,g_arrItems:x,g_objStrip:j,g_objStripInner:C,g_aviaControl:A,g_touchThumbsControl:M,isVertical:H,g_options:t,g_thumbs:N};return i},this.getObjThumbs=function(){return N},this.getSelectedThumb=function(){var e=z.getSelectedItemIndex();return-1==e?null:N.getThumbByIndex(e)},this.getSizeAndPosition=function(){var e=L.getElementSize(j);return e},this.getHeight=function(){var e=j.outerHeight();return e},this.getWidth=function(){var e=j.outerWidth();return e},this.getSizes=function(){return G},this.isVertical=function(){return H},this.isPlaced=function(){return R.is_placed},this.isMoveEnabled=function(){var e=I();return e}}function UGTouchThumbsControl(){function e(){var e=jQuery.now(),t={};return t.passedTime=T.lastTime-T.startTime,t.lastActiveTime=e-T.buttonReleaseTime,t.passedDistance=T.lastPos-T.startPos,t.passedDistanceAbs=Math.abs(t.passedDistance),t}function t(){E.thumb_touch_slowFactor=w.normalizeSetting(5e-5,.01,1,100,y.strip_thumb_touch_sensetivity,!0)}function i(e){return 0==I?w.getMousePosition(e).pageX:w.getMousePosition(e).pageY}function n(e){var t=T.mousePos-e,i=T.innerPos-t,n=h.getInnerStripLimits();if(i>n.maxPos){var r=i-n.maxPos;i=n.maxPos+r/3}if(i<n.minPos){var r=n.minPos-i;i=n.minPos-r/3}h.positionInnerStrip(i)}function r(e){var t=h.getInnerStripPos();T.mousePos=e,T.innerPos=t,T.lastPortionPos=t,T.lastDeltaTime=0,T.lastDeltaPos=0,T.startTime=jQuery.now(),T.startPos=T.innerPos,T.lastTime=T.startTime,T.lastPos=T.startPos,T.speed=0}function o(){var e=jQuery.now(),t=e-T.lastTime;t>=E.touch_portion_time&&(T.lastDeltaTime=e-T.lastTime,T.lastDeltaTime>E.touch_portion_time&&(T.lastDeltaTime=E.touch_portion_time),T.lastDeltaPos=T.lastPos-T.lastPortionPos,T.lastPortionPos=T.lastPos,T.lastTime=e)}function a(){var e=E.thumb_touch_slowFactor,t=E.minDeltaTime,i=E.minPath,n=h.getInnerStripPos(),r=jQuery.now(),o=r-T.lastTime,a=n-T.lastPortionPos;t>o&&T.lastDeltaTime>0&&(o=T.lastDeltaTime,a=T.lastDeltaPos+a),t>o&&(o=t);var l=a>0?1:-1,u=0;o>0&&(u=a/o);var d=u*u/(2*e)*l;Math.abs(d)<=i&&(d=0);var _=h.getInnerStripPos(),g=_+d,c=h.fixInnerStripLimits(g),p=h.getInnerStripLimits(),f=E.limitsBreakAddition,m=!1,v=c;if(g>p.maxPos&&(m=!0,c=f,f>g&&(c=g)),g<p.minPos){m=!0;var y=p.minPos-f;c=y,g>y&&(c=g)}var w=c-_,S=Math.abs(Math.round(u/e));if(0!=d&&(S=S*w/d),_!=c){var P={left:c+"px"};1==I&&(P={top:c+"px"}),b.animate(P,{duration:S,easing:E.animationEasing,queue:!0,progress:s})}if(1==m){var x=E.returnAnimateSpeed,j={left:v+"px"};1==I&&(j={top:v+"px"}),b.animate(j,{duration:x,easing:E.returnAnimationEasing,queue:!0,progress:s})}}function s(){T.lastPos=h.getInnerStripPos(),h.triggerStripMoveEvent()}function l(){return 1==T.loop_active?!0:(T.loop_active=!0,void(T.handle=setInterval(o,10)))}function u(e){if(0==T.loop_active)return!0;if(e){var t=i(e);a(t)}T.loop_active=!1,T.handle=clearInterval(T.handle)}function d(e){return 0==T.isControlEnabled?!0:(T.buttonReleaseTime=jQuery.now(),0==T.touch_active?(u(e),!0):(e.preventDefault(),T.touch_active=!1,u(e),void v.removeClass("ug-dragging")))}function _(e){if(0==T.isControlEnabled)return!0;e.preventDefault(),T.touch_active=!0;var t=i(e);b.stop(!0),r(t),l(),v.addClass("ug-dragging")}function g(e){if(0==T.isControlEnabled)return!0;if(0==T.touch_active)return!0;if(e.preventDefault(),0==e.buttons)return T.touch_active=!1,u(e),!0;var t=i(e);T.lastPos=h.getInnerStripPos(),n(t),o()}function c(){v.bind("mousedown touchstart",_),jQuery(window).add("body").bind("mouseup touchend",d),jQuery("body").bind("mousemove touchmove",g)}var h,p,f,m,v,b,y,I,w=new UGFunctions,E={touch_portion_time:200,thumb_touch_slowFactor:0,minDeltaTime:70,minPath:10,limitsBreakAddition:30,returnAnimateSpeed:500,animationEasing:"easeOutCubic",returnAnimationEasing:"easeOutCubic"},T={touch_active:!1,loop_active:!1,mousePos:0,innerPos:0,startPos:0,startTime:0,lastTime:0,buttonReleaseTime:0,lastPos:0,lastPortionPos:0,lastDeltaTime:0,lastDeltaPos:0,speed:0,handle:"",touchEnabled:!1,isControlEnabled:!0};this.enable=function(){T.isControlEnabled=!0},this.disable=function(){T.isControlEnabled=!1},this.init=function(e){h=e,m=e.getObjects(),p=m.g_gallery,f=m.g_objGallery,v=m.g_objStrip,b=m.g_objStripInner,y=m.g_options,I=m.isVertical,t(),c()},this.isSignificantPassed=function(){var t=e();return t.passedTime>300?!0:t.passedDistanceAbs>30?!0:!1},this.isTouchActive=function(){if(1==T.touch_active)return!0;if(1==b.is(":animated"))return!0;var t=e();return t.lastActiveTime<50?!0:!1},this.destroy=function(){v.unbind("mousedown"),v.unbind("touchstart"),jQuery(window).add("body").unbind("mouseup").unbind("touchend"),jQuery("body").unbind("mousemove").unbind("touchmove")}}function UGPanelsBase(){function e(e,t){switch(n.orientation){case"right":case"left":var i={left:e+"px"};break;case"top":case"bottom":var i={top:e+"px"}}o.stop(!0).animate(i,{duration:300,easing:"easeInOutQuad",queue:!1,complete:function(){t&&t()}})}function t(e){switch(n.orientation){case"right":case"left":g.placeElement(o,e,null);break;case"top":case"bottom":g.placeElement(o,null,e)}}function i(){s.trigger(r.events.FINISH_MOVE)}var n,r,o,a,s,l,u,d=new UniteGalleryMain,_=this,g=new UGFunctions;this.init=function(e,t,i,o,l){n=t,r=i,d=e,a=o,s=l,u=jQuery(d)},this.setHtml=function(e){if(o=e,"strip"==n.panelType)var t=a.strippanel_enable_handle;else var t=a.gridpanel_enable_handle;if(1==t&&(l=new UGPanelHandle,l.init(r,o,a,n.panelType,d),l.setHtml()),n.isDisabledAtStart===!0){var i="<div class='ug-overlay-disabled'></div>";o.append(i),setTimeout(function(){o.children(".ug-overlay-disabled").hide()},n.disabledAtStartTimeout)}},this.placeElements=function(){l&&l.placeHandle()},this.initEvents=function(){l&&(l.initEvents(),u.on(d.events.SLIDER_ACTION_START,function(){l.hideHandle()}),u.on(d.events.SLIDER_ACTION_END,function(){l.showHandle()}))},this.destroy=function(){l&&(l.destroy(),u.off(d.events.SLIDER_ACTION_START),u.off(d.events.SLIDER_ACTION_END))},this.openPanel=function(a){if(!a)var a=!1;return o.is(":animated")?!1:0==n.isClosed?!1:(n.isClosed=!1,s.trigger(r.events.OPEN_PANEL),void(a===!1?e(n.originalPos,i):(t(n.originalPos),i())))},this.closePanel=function(a){if(!a)var a=!1;if(o.is(":animated"))return!1;if(1==n.isClosed)return!1;var l=_.getClosedPanelDest();n.isClosed=!0,s.trigger(r.events.CLOSE_PANEL),a===!1?e(l,i):(t(l),i())},this.setClosedState=function(e){n.originalPos=e,s.trigger(r.events.CLOSE_PANEL),n.isClosed=!0},this.setOpenedState=function(e){s.trigger(r.events.OPEN_PANEL),n.isClosed=!1},this.getClosedPanelDest=function(){var e,t=g.getElementSize(o);switch(n.orientation){case"left":n.originalPos=t.left,e=-n.panelWidth;break;case"right":n.originalPos=t.left;var i=d.getSize();e=i.width;break;case"top":n.originalPos=t.top,e=-n.panelHeight;break;case"bottom":n.originalPos=t.top;var i=d.getSize();e=i.height}return e},this.isPanelClosed=function(){return n.isClosed},this.setDisabledAtStart=function(e){return 0>=e?!1:(n.isDisabledAtStart=!0,void(n.disabledAtStartTimeout=e))}}function UGPanelHandle(){function e(){s.removeClass("ug-button-hover")}function t(){s.addClass("ug-button-closed")}function i(){s.removeClass("ug-button-closed")}function n(e){return e.stopPropagation(),e.stopImmediatePropagation(),0==l.validateClickTouchstartEvent(e.type)?!0:void(a.isPanelClosed()?a.openPanel():a.closePanel())}function r(){var e=a.getOrientation();switch(e){case"right":case"left":"top"!=u.panel_handle_align&&"bottom"!=u.panel_handle_align&&(u.panel_handle_align="top");break;case"bottom":"left"!=u.panel_handle_align&&"right"!=u.panel_handle_align&&(u.panel_handle_align="left");break;case"top":"left"!=u.panel_handle_align&&"right"!=u.panel_handle_align&&(u.panel_handle_align="right")}}var o,a,s,l=new UGFunctions,u={panel_handle_align:"top",panel_handle_offset:0,panel_handle_skin:0};this.init=function(e,t,i,n,r){switch(a=e,o=t,n){case"grid":u.panel_handle_align=i.gridpanel_handle_align,u.panel_handle_offset=i.gridpanel_handle_offset,u.panel_handle_skin=i.gridpanel_handle_skin;break;case"strip":u.panel_handle_align=i.strippanel_handle_align,u.panel_handle_offset=i.strippanel_handle_offset,u.panel_handle_skin=i.strippanel_handle_skin;break;default:throw new Error("Panel handle error: wrong panel type: "+n)}var s=r.getOptions(),l=s.gallery_skin;""==u.panel_handle_skin&&(u.panel_handle_skin=l)},this.setHtml=function(){var e=a.getOrientation(),t="ug-panel-handle-tip";switch(e){case"right":t+=" ug-handle-tip-left";break;case"left":t+=" ug-handle-tip-right";break;case"bottom":t+=" ug-handle-tip-top";break;case"top":t+=" ug-handle-tip-bottom"}o.append("<div class='"+t+" ug-skin-"+u.panel_handle_skin+"'></div>"),s=o.children(".ug-panel-handle-tip")},this.initEvents=function(){l.addClassOnHover(s),s.bind("click touchstart",n),jQuery(a).on(a.events.OPEN_PANEL,function(){e(),i()}),jQuery(a).on(a.events.CLOSE_PANEL,function(){e(),t()})},this.destroy=function(){l.destroyButton(s),jQuery(a).off(a.events.OPEN_PANEL),jQuery(a).off(a.events.CLOSE_PANEL)},this.placeHandle=function(){var e=l.getElementSize(s);r();var t=a.getOrientation();switch(t){case"left":l.placeElement(s,"right",u.panel_handle_align,-e.width);break;case"right":l.placeElement(s,-e.width,u.panel_handle_align,0,u.panel_handle_offset);break;case"top":l.placeElement(s,u.panel_handle_align,"bottom",u.panel_handle_offset,-e.height);break;case"bottom":l.placeElement(s,u.panel_handle_align,"top",u.panel_handle_offset,-e.height);break;default:throw new Error("Wrong panel orientation: "+t)}},this.hideHandle=function(){1==s.is(":visible")&&s.hide()},this.showHandle=function(){0==s.is(":visible")&&s.show()}}function UGStripPanel(){function e(e,t){T=e,m=jQuery(T),j=jQuery.extend(j,t);var i=!1;1==j.strippanel_vertical_type&&(j=jQuery.extend(j,C),i=!0),0==j.strippanel_enable_buttons&&(j=jQuery.extend(j,A),i=!0),1==i&&(j=jQuery.extend(j,t));var n=T.getOptions(),r=n.gallery_skin;""==j.strippanel_buttons_skin&&(j.strippanel_buttons_skin=r),v=T.getElement(),x.init(T,M,w,j,E),P=new UGThumbsStrip,P.init(T,j)}function t(){if(0==j.strippanel_vertical_type){if(0==M.panelWidth)throw new Error("Strip panel error: The width not set, please set width")}else if(0==M.panelHeight)throw new Error("Strip panel error: The height not set, please set height");if(null==M.orientation)throw new Error("Wrong orientation, please set panel orientation before run");return!0}function i(){return 1==M.isFirstRun&&0==t()?!1:(P.run(),s(),d(),f(),M.isFirstRun=!1,void c())}function n(e){if(!e)var e=v;if(e.append("<div class='ug-strip-panel'></div>"),b=e.children(".ug-strip-panel"),1==j.strippanel_enable_buttons){var t="ug-strip-arrow-left",i="ug-strip-arrow-right";1==j.strippanel_vertical_type&&(t="ug-strip-arrow-up",i="ug-strip-arrow-down"),b.append("<div class='ug-strip-arrow "+t+" ug-skin-"+j.strippanel_buttons_skin+"'><div class='ug-strip-arrow-tip'></div></div>"),b.append("<div class='ug-strip-arrow "+i+" ug-skin-"+j.strippanel_buttons_skin+"'><div class='ug-strip-arrow-tip'></div></div>")}x.setHtml(b),P.setHtml(b),1==j.strippanel_enable_buttons&&(I=b.children("."+t),y=b.children("."+i)),r()}function r(){""!=j.strippanel_background_color&&b.css("background-color",j.strippanel_background_color)}function o(){var e=P.getHeight(),t=M.panelWidth;if(y){I.height(e),y.height(e);var i=I.children(".ug-strip-arrow-tip");S.placeElement(i,"center","middle");var n=y.children(".ug-strip-arrow-tip");S.placeElement(n,"center","middle")}var r=e+j.strippanel_padding_top+j.strippanel_padding_bottom;b.width(t),b.height(r),M.panelHeight=r;var o=t-j.strippanel_padding_left-j.strippanel_padding_right;if(y){var a=y.outerWidth();o=o-2*a-2*j.strippanel_padding_buttons}P.resize(o)}function a(){var e=P.getWidth(),t=M.panelHeight;if(y){I.width(e),y.width(e);var i=I.children(".ug-strip-arrow-tip");S.placeElement(i,"center","middle");var n=y.children(".ug-strip-arrow-tip");S.placeElement(n,"center","middle")}var r=e+j.strippanel_padding_left+j.strippanel_padding_right;b.width(r),b.height(t),M.panelWidth=r;var o=t-j.strippanel_padding_top-j.strippanel_padding_bottom;if(y){var a=y.outerHeight();o=o-2*a-2*j.strippanel_padding_buttons}P.resize(o)}function s(){0==j.strippanel_vertical_type?o():a()}function l(){y&&(S.placeElement(I,"left","top",j.strippanel_padding_left,j.strippanel_padding_top),S.placeElement(y,"right","top",j.strippanel_padding_right,j.strippanel_padding_top));var e=j.strippanel_padding_left;y&&(e+=y.outerWidth()+j.strippanel_padding_buttons),P.setPosition(e,j.strippanel_padding_top)}function u(){y&&(S.placeElement(I,"left","top",j.strippanel_padding_left,j.strippanel_padding_top),S.placeElement(y,"left","bottom",j.strippanel_padding_left,j.strippanel_padding_bottom));var e=j.strippanel_padding_top;y&&(e+=y.outerHeight()+j.strippanel_padding_buttons),P.setPosition(j.strippanel_padding_left,e)}function d(){0==j.strippanel_vertical_type?l():u(),x.placeElements()}function _(e){return S.isButtonDisabled(e)?!0:void("advance_item"==j.strippanel_buttons_role?T.nextItem():P.scrollForeward())}function g(e){return S.isButtonDisabled(e)?!0:void("advance_item"==j.strippanel_buttons_role?T.prevItem():P.scrollBack())}function c(){if(!y)return!0;if(0==P.isMoveEnabled())return S.disableButton(I),S.disableButton(y),!0;var e=P.getInnerStripLimits(),t=P.getInnerStripPos();t>=e.maxPos?S.disableButton(I):S.enableButton(I),t<=e.minPos?S.disableButton(y):S.enableButton(y)}function h(){c()}function p(){T.isLastItem()?S.disableButton(y):S.enableButton(y),T.isFirstItem()?S.disableButton(I):S.enableButton(I)}function f(){if(1==M.isEventsInited)return!1;if(M.isEventsInited=!0,y)if(S.addClassOnHover(y,"ug-button-hover"),S.addClassOnHover(I,"ug-button-hover"),S.setButtonOnClick(I,g),S.setButtonOnClick(y,_),"advance_item"!=j.strippanel_buttons_role)jQuery(P).on(P.events.STRIP_MOVE,h),jQuery(P).on(P.events.INNER_SIZE_CHANGE,c),m.on(T.events.SIZE_CHANGE,c);else{var e=T.getOptions();0==e.gallery_carousel&&jQuery(T).on(T.events.ITEM_CHANGE,p)}x.initEvents()}var m,v,b,y,I,w=this,E=jQuery(this),T=new UniteGalleryMain,S=new UGFunctions,P=new UGThumbsStrip,x=new UGPanelsBase;this.events={FINISH_MOVE:"gridpanel_move_finish",OPEN_PANEL:"open_panel",CLOSE_PANEL:"close_panel"};var j={strippanel_vertical_type:!1,strippanel_padding_top:8,strippanel_padding_bottom:8,strippanel_padding_left:0,strippanel_padding_right:0,strippanel_enable_buttons:!0,strippanel_buttons_skin:"",strippanel_padding_buttons:2,strippanel_buttons_role:"scroll_strip",strippanel_enable_handle:!0,strippanel_handle_align:"top",strippanel_handle_offset:0,strippanel_handle_skin:"",strippanel_background_color:""},C={strip_vertical_type:!0,strippanel_padding_left:8,strippanel_padding_right:8,strippanel_padding_top:0,strippanel_padding_bottom:0},A={strippanel_padding_left:8,strippanel_padding_right:8,strippanel_padding_top:8,strippanel_padding_bottom:8},M={panelType:"strip",panelWidth:0,panelHeight:0,isEventsInited:!1,isClosed:!1,orientation:null,originalPos:null,isFirstRun:!0};this.destroy=function(){y&&(S.destroyButton(y),S.destroyButton(I),jQuery(P).off(P.events.STRIP_MOVE),jQuery(T).off(T.events.ITEM_CHANGE),jQuery(T).off(T.events.SIZE_CHANGE)),x.destroy(),P.destroy()},this.getOrientation=function(){return M.orientation},this.setOrientation=function(e){M.orientation=e},this.init=function(t,i){e(t,i)},this.run=function(){i()},this.setHtml=function(e){n(e)},this.getElement=function(){return b},this.getSize=function(){var e=S.getElementSize(b);return e},this.setWidth=function(e){M.panelWidth=e},this.setHeight=function(e){M.panelHeight=e},this.resize=function(e){w.setWidth(e),s(),d()},this.__________Functions_From_Base_____=function(){},this.isPanelClosed=function(){return x.isPanelClosed()},this.getClosedPanelDest=function(){return x.getClosedPanelDest()},this.openPanel=function(e){x.openPanel(e)},this.closePanel=function(e){x.closePanel(e)},this.setOpenedState=function(e){x.setOpenedState(e)},this.setClosedState=function(e){x.setClosedState(e)},this.setCustomThumbs=function(e){P.setCustomThumbs(e)},this.setDisabledAtStart=function(e){x.setDisabledAtStart(e)}}function UGGridPanel(){function e(e,i){x=e,t(),i&&i.vertical_scroll&&(M.gridpanel_vertical_scroll=i.vertical_scroll),M=jQuery.extend(M,i),1==L.isHorType?(M=jQuery.extend(M,z),M=jQuery.extend(M,i)):1==M.gridpanel_vertical_scroll&&(M=jQuery.extend(M,O),M=jQuery.extend(M,i),M.grid_panes_direction="bottom");var n=x.getOptions(),r=n.gallery_skin;""==M.gridpanel_arrows_skin&&(M.gridpanel_arrows_skin=r);var o=e.getObjects();I=o.g_objWrapper,A.init(x,L,S,M,P),C=new UGThumbsGrid,C.init(x,M)}function t(){if(null==L.orientation)throw new Error("Wrong orientation, please set panel orientation before run")}function i(){t(),o(),C.run(),l(),u(),y(),d()}function n(){I.append("<div class='ug-grid-panel'></div>"),w=I.children(".ug-grid-panel"),L.isHorType?(w.append("<div class='grid-arrow grid-arrow-left-hortype ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-right-hortype ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-left-hortype"),E=w.children(".grid-arrow-right-hortype")):0==M.gridpanel_vertical_scroll?(w.append("<div class='grid-arrow grid-arrow-left ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-right ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-left"),E=w.children(".grid-arrow-right")):(w.append("<div class='grid-arrow grid-arrow-up ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-down ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-up"),E=w.children(".grid-arrow-down")),A.setHtml(w),T.fadeTo(0,0),E.fadeTo(0,0),C.setHtml(w),r()}function r(){""!=M.gridpanel_background_color&&w.css("background-color",M.gridpanel_background_color)}function o(){"center"==M.gridpanel_grid_align&&(M.gridpanel_grid_align="middle")}function a(){var e=M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom,t=L.panelHeight-e;if(0==M.gridpanel_arrows_always_on){var i=C.getNumPanesEstimationByHeight(t);if(1==i)return t}var n=j.getElementSize(E),r=n.height,e=r+M.gridpanel_arrows_padding_vert;return 1==M.gridpanel_vertical_scroll&&(e*=2),e+=M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom,t=L.panelHeight-e}function s(){var e=M.gridpanel_padding_border_left+M.gridpanel_padding_border_right,t=L.panelWidth-e;if(0==M.gridpanel_arrows_always_on){var i=C.getNumPanesEstimationByWidth(t);if(1==i)return t}var n=j.getElementSize(E),r=n.width;return e+=2*(r+M.gridpanel_arrows_padding_hor),t=L.panelWidth-e}function l(){var e=!1;if(1==M.gridpanel_arrows_always_on)e=!0;else{var t=C.getNumPanes();t>1&&(e=!0)}1==e?(E.show().fadeTo(0,1),T.show().fadeTo(0,1),L.arrowsVisible=!0):(E.hide(),T.hide(),L.arrowsVisible=!1)}function u(){var e=C.getSize();1==L.isHorType?L.panelHeight=e.height+M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom:L.panelWidth=e.width+M.gridpanel_padding_border_left+M.gridpanel_padding_border_right,j.setElementSize(w,L.panelWidth,L.panelHeight)}function d(){return 1==L.isEventsInited?!1:(L.isEventsInited=!0,T&&(j.addClassOnHover(T),C.attachPrevPaneButton(T)),E&&(j.addClassOnHover(E),C.attachNextPaneButton(E)),void A.initEvents())}function _(){var e=M.gridpanel_padding_border_left;return e}function g(){var e=M.gridpanel_grid_align,t=0;switch(e){case"top":t=M.gridpanel_padding_border_top;break;case"bottom":t=M.gridpanel_padding_border_bottom}var i=_(),n=C.getElement();j.placeElement(n,i,e,0,t)}function c(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize();switch(M.gridpanel_grid_align){default:case"top":e=M.gridpanel_padding_border_top+r.height+M.gridpanel_arrows_padding_vert;break;case"middle":e="middle";break;case"bottom":e=L.panelHeight-o.height-r.height-M.gridpanel_padding_border_bottom-M.gridpanel_arrows_padding_vert}var a=_(),s=C.getElement();j.placeElement(s,a,e);var o=C.getSize();switch(M.gridpanel_arrows_align_vert){default:case"center":case"middle":t=(o.top-r.height)/2,i=o.bottom+(L.panelHeight-o.bottom-r.height)/2,n=0;break;case"grid":t=o.top-r.height-M.gridpanel_arrows_padding_vert_vert,i=o.bottom+M.gridpanel_arrows_padding_vert,n=0;break;case"border":case"borders":t=M.gridpanel_padding_border_top,i="bottom",n=M.gridpanel_padding_border_bottom}j.placeElement(T,"center",t),j.placeElement(E,"center",i,0,n)}function h(){1==L.arrowsVisible?c():g()}function p(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize(),a=M.gridpanel_padding_border_top;switch(M.gridpanel_grid_align){case"middle":switch(M.gridpanel_arrows_align_vert){default:var s=o.height+M.gridpanel_arrows_padding_vert+r.height;a=(L.panelHeight-s)/2;break;case"border":case"borders":var l=L.panelHeight-r.height-M.gridpanel_padding_border_bottom;a=(l-o.height)/2}break;case"bottom":var s=o.height+r.height+M.gridpanel_arrows_padding_vert;a=L.panelHeight-s-M.gridpanel_padding_border_bottom}var u=C.getElement(),d=_();j.placeElement(u,d,a);var o=C.getSize();switch(M.gridpanel_arrows_align_vert){default:case"center":case"middle":e=o.bottom+(L.panelHeight-o.bottom-r.height)/2,i=0;break;case"grid":e=o.bottom+M.gridpanel_arrows_padding_vert,i=0;break;case"border":case"borders":e="bottom",i=M.gridpanel_padding_border_bottom}t=-r.width/2-M.gridpanel_space_between_arrows/2,j.placeElement(T,"center",e,t,i);var n=Math.abs(t);j.placeElement(E,"center",e,n,i)}function f(){1==L.arrowsVisible?p():g()}function m(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize();switch(M.gridpanel_grid_align){default:case"left":e=M.gridpanel_padding_border_left+M.gridpanel_arrows_padding_hor+r.width;break;case"middle":case"center":e="center";break;case"right":e=L.panelWidth-o.width-r.width-M.gridpanel_padding_border_right-M.gridpanel_arrows_padding_hor}var a=C.getElement();switch(j.placeElement(a,e,M.gridpanel_padding_border_top),o=C.getSize(),M.gridpanel_arrows_align_vert){default:case"center":case"middle":n=(o.height-r.height)/2+o.top;break;case"top":n=M.gridpanel_padding_border_top+M.gridpanel_arrows_padding_vert;break;case"bottom":n=L.panelHeight-M.gridpanel_padding_border_bottom-M.gridpanel_arrows_padding_vert-r.height}switch(M.gridpanel_arrows_align_hor){default:case"borders":t=M.gridpanel_padding_border_left,i=L.panelWidth-M.gridpanel_padding_border_right-r.width;break;case"grid":t=o.left-M.gridpanel_arrows_padding_hor-r.width,i=o.right+M.gridpanel_arrows_padding_hor;break;case"center":t=(o.left-r.width)/2,i=o.right+(L.panelWidth-o.right-r.width)/2}j.placeElement(T,t,n),j.placeElement(E,i,n)}function v(){var e,t=C.getSize();switch(M.gridpanel_grid_align){default:case"left":e=M.gridpanel_padding_border_left;break;case"middle":case"center":e="center";break;case"right":e=L.panelWidth-t.width-M.gridpanel_padding_border_right}var i=C.getElement();j.placeElement(i,e,M.gridpanel_padding_border_top)}function b(){1==L.arrowsVisible?m():v()}function y(){0==L.isHorType?1==M.gridpanel_vertical_scroll?h():f():b(),A.placeElements()}var I,w,E,T,S=this,P=jQuery(this),x=new UniteGalleryMain,j=new UGFunctions,C=new UGThumbsGrid,A=new UGPanelsBase;this.events={FINISH_MOVE:"gridpanel_move_finish",OPEN_PANEL:"open_panel",CLOSE_PANEL:"close_panel"};var M={gridpanel_vertical_scroll:!0,gridpanel_grid_align:"middle",gridpanel_padding_border_top:10,gridpanel_padding_border_bottom:4,gridpanel_padding_border_left:10,gridpanel_padding_border_right:10,gridpanel_arrows_skin:"",gridpanel_arrows_align_vert:"middle",gridpanel_arrows_padding_vert:4,gridpanel_arrows_align_hor:"center",gridpanel_arrows_padding_hor:10,gridpanel_space_between_arrows:20,gridpanel_arrows_always_on:!1,gridpanel_enable_handle:!0,gridpanel_handle_align:"top",
gridpanel_handle_offset:0,gridpanel_handle_skin:"",gridpanel_background_color:""},O={gridpanel_grid_align:"middle",gridpanel_padding_border_top:2,gridpanel_padding_border_bottom:2},z={gridpanel_grid_align:"center"},L={panelType:"grid",isHorType:!1,arrowsVisible:!1,panelHeight:0,panelWidth:0,originalPosX:null,isEventsInited:!1,isClosed:!1,orientation:null};this.destroy=function(){T&&j.destroyButton(T),E&&j.destroyButton(E),A.destroy(),C.destroy()},this.getOrientation=function(){return L.orientation},this.setOrientation=function(e){switch(L.orientation=e,e){case"right":case"left":L.isHorType=!1;break;case"top":case"bottom":L.isHorType=!0;break;default:throw new Error("Wrong grid panel orientation: "+e)}},this.setHeight=function(e){if(1==L.isHorType)throw new Error("setHeight is not appliable to this orientatio ("+L.orientation+"). Please use setWidth");L.panelHeight=e;var t=a();C.setMaxHeight(t)},this.setWidth=function(e){if(0==L.isHorType)throw new Error("setWidth is not appliable to this orientatio ("+L.orientation+"). Please use setHeight");L.panelWidth=e;var t=s();C.setMaxWidth(t)},this.init=function(t,i){e(t,i)},this.setHtml=function(){n()},this.run=function(){i()},this.getElement=function(){return w},this.getSize=function(){var e=j.getElementSize(w);return e},this.__________Functions_From_Base_____=function(){},this.isPanelClosed=function(){return A.isPanelClosed()},this.getClosedPanelDest=function(){return A.getClosedPanelDest()},this.openPanel=function(e){A.openPanel(e)},this.closePanel=function(e){A.closePanel(e)},this.setOpenedState=function(e){A.setOpenedState(e)},this.setClosedState=function(e){A.setClosedState(e)},this.setDisabledAtStart=function(e){A.setDisabledAtStart(e)}}function UGThumbsGrid(){function e(e,t,i){if(N=e.getObjects(),B=e,B.attachThumbsPanel("grid",Q),H=jQuery(e),k=N.g_objWrapper,R=N.g_arrItems,i===!0&&(X.isTilesMode=!0),X.numThumbs=R.length,_(t),1==X.isTilesMode){U.setFixedMode(),U.setApproveClickFunction(x),U.init(e,V);var n=U.getOptions();X.tileMaxHeight=n.tile_height,X.tileMaxWidth=n.tile_width,Y=U.getObjThumbs()}else t.thumb_fixed_size=!0,Y.init(e,t)}function t(e){var t=k;e&&(t=e),t.append("<div class='ug-thumbs-grid'><div class='ug-thumbs-grid-inner'></div></div>"),G=t.children(".ug-thumbs-grid"),D=G.children(".ug-thumbs-grid-inner"),1==X.isTilesMode?U.setHtml(D):Y.setHtmlThumbs(D)}function n(){if(0==X.isHorizontal){if(0==X.gridHeight)throw new Error("You must set height before run.")}else if(0==X.gridWidth)throw new Error("You must set width before run.")}function r(){var e=B.getSelectedItem();if(n(),1==X.isFirstTimeRun)L(),1==X.isTilesMode?(a(),u(),U.run()):(Y.setHtmlProperties(),u(),Y.loadThumbsImages());else if(1==X.isTilesMode){var t=a();1==t&&(u(),U.run())}if(p(),1==X.isFirstTimeRun&&X.isTilesMode){var i=Y.getThumbs();i.each(function(e,t){k.trigger(X.eventSizeChange,jQuery(t))}),i.fadeTo(0,1)}null!=e&&d(e.index),W.trigger(Q.events.PANE_CHANGE,X.currentPane),X.isFirstTimeRun=!1}function o(){if(1==X.isTilesMode)var e=U.getGlobalTileSize();else var e=Y.getGlobalThumbSize();return e}function a(){if(0==X.isTilesMode)throw new Error("Dynamic size can be set only in tiles mode");var e=!1,t=B.isMobileMode(),i=X.spaceBetweenCols;1==t?(X.spaceBetweenCols=V.grid_space_between_mobile,X.spaceBetweenRows=V.grid_space_between_mobile):(X.spaceBetweenCols=V.grid_space_between_cols,X.spaceBetweenRows=V.grid_space_between_rows),X.spaceBetweenCols!=i&&(e=!0);var n=o(),r=n.width,a=X.tileMaxWidth,s=F.getNumItemsInSpace(X.gridWidth,X.tileMaxWidth,X.spaceBetweenCols);return s<V.grid_min_cols&&(a=F.getItemSizeInSpace(X.gridWidth,V.grid_min_cols,X.spaceBetweenCols)),U.setTileSizeOptions(a),a!=r&&(e=!0),e}function s(){var e=o(),t=e.height,i=X.gridWidth,n=V.grid_num_rows*t+(V.grid_num_rows-1)*X.spaceBetweenRows+2*V.grid_padding;X.gridHeight=n,F.setElementSize(G,i,n),F.setElementSize(D,i,n),X.innerWidth=i,X.innerHeight=n}function l(){var e=o(),t=e.width,i=V.grid_num_cols*t+(V.grid_num_cols-1)*X.spaceBetweenCols+2*V.grid_padding,n=X.gridHeight;X.gridWidth=i,F.setElementSize(G,i,n),F.setElementSize(D,i,n),X.innerWidth=i,X.innerHeight=n}function u(){0==X.isHorizontal?l():s()}function d(e){var t=T(e);return-1==t?!1:void Q.gotoPane(t,"scroll")}function _(e){V=jQuery.extend(V,e),Y.setOptions(e),X.isNavigationVertical="top"==V.grid_panes_direction||"bottom"==V.grid_panes_direction,X.spaceBetweenCols=V.grid_space_between_cols,X.spaceBetweenRows=V.grid_space_between_rows}function g(){var e=D.children(".ug-thumb-wrapper"),t=0,n=0,r=0,o=0,a=0,s=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(o);var l=e.length;for(i=0;i<l;i++){var u=jQuery(e[i]);F.placeElement(u,t,n);var d=u.outerWidth(),_=u.outerHeight();t>a&&(a=t);var g=n+_;g>s&&(s=g);var c=a+d;c>X.innerWidth&&(X.innerWidth=c),t+=d+X.spaceBetweenCols,r++,r>=V.grid_num_cols&&(n+=_+X.spaceBetweenRows,t=o,r=0),1==X.numPanes&&X.numThumbsInPane++,n+_>X.gridHeight&&(n=0,o=X.innerWidth+X.spaceBetweenCols,t=o,r=0,1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=s,G.height(X.gridHeight)),i<l-1&&(X.numPanes++,X.arrPanes.push(o)))}D.width(X.innerWidth),1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=s,G.height(s))}function c(){var e=D.children(".ug-thumb-wrapper"),t=0,n=0,r=0,o=0,a=0,s=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(a);var l=e.length;for(i=0;i<l;i++){var u=jQuery(e[i]);F.placeElement(u,t,n);var d=u.outerWidth(),_=u.outerHeight();t+=d+X.spaceBetweenCols;var g=n+_;g>r&&(r=g),o++,o>=V.grid_num_cols&&(n+=_+X.spaceBetweenRows,t=a,o=0),1==X.numPanes&&X.numThumbsInPane++,g=n+_;var c=s+X.gridHeight;g>c&&(1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=r,G.height(X.gridHeight),c=X.gridHeight),n=c+X.spaceBetweenRows,s=n,a=0,t=a,o=0,i<l-1&&(X.numPanes++,X.arrPanes.push(n)))}D.height(r),X.innerHeight=r,1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=r,G.height(r))}function h(){var e=D.children(".ug-thumb-wrapper"),t=V.grid_padding,n=V.grid_padding,r=n,o=t,a=0,s=0,l=0,u=0,d=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(t-V.grid_padding);var _=e.length;for(i=0;i<_;i++){var g=jQuery(e[i]),c=g.outerWidth(),h=g.outerHeight();o-t+c>X.gridWidth&&(d++,r=0,d>=V.grid_num_rows?(d=0,t=o,r=n,l=0,1==X.numPanes&&(X.gridWidth=a+V.grid_padding,G.width(X.gridWidth),X.gridHeight=u+V.grid_padding,G.height(X.gridHeight)),X.numPanes++,X.arrPanes.push(t-V.grid_padding)):(o=t,r=l+X.spaceBetweenRows)),F.placeElement(g,o,r);var p=o+c;p>a&&(a=p);var f=r+h;f>l&&(l=f),f>u&&(u=f),f>s&&(s=f);var p=a+c;p>X.innerWidth&&(X.innerWidth=p),o+=c+X.spaceBetweenCols,1==X.numPanes&&X.numThumbsInPane++}X.innerWidth=a+V.grid_padding,X.innerHeight=u+V.grid_padding,D.width(X.innerWidth),D.height(X.innerHeight),1==X.numPanes&&(X.gridWidth=a+V.grid_padding,X.gridHeight=u+V.grid_padding,G.width(X.gridWidth),G.height(X.gridHeight))}function p(){0==X.isHorizontal?X.isNavigationVertical?c():g():h()}function f(e){if(0>e||e>=X.numThumbs)throw new Error("Thumb not exists: "+e);return!0}function m(e){if(e>=X.numPanes||0>e)throw new Error("Pane "+index+" doesn't exists.");return!0}function v(e){var t=w(e);return 0==t?!1:void D.css(t)}function b(e){var t=w(e);return 0==t?!1:void D.stop(!0).animate(t,{duration:V.grid_transition_duration,easing:V.grid_transition_easing,queue:!1})}function y(){var e=-X.arrPanes[X.currentPane];b(e)}function I(){return 1==X.isNavigationVertical?X.gridHeight:X.gridWidth}function w(e){var t={};return 1==X.isNavigationVertical?t.top=e+"px":t.left=e+"px",t}function E(){var e=F.getElementSize(D);return 1==X.isNavigationVertical?e.top:e.left}function T(e){if(0==f(e))return-1;var t=Math.floor(e/X.numThumbsInPane);return t}function S(){if(1==X.numPanes)return!1;var e=F.getStoredEventData(X.storedEventID),t=e.diffTime,i=E(),n=Math.abs(i-e.startInnerPos);return n>30?!0:n>5&&t>300?!0:!1}function P(){var e=F.getStoredEventData(X.storedEventID),t=E();diffPos=Math.abs(e.startInnerPos-t);var i=I(),n=Math.round(3*i/8);return diffPos>=n?!0:e.diffTime<300&&diffPos>25?!0:!1}function x(){if(1==X.numPanes)return!0;var e=F.isApproveStoredEventClick(X.storedEventID,X.isNavigationVertical);return e}function j(e){if(1==S())return!0;var t=jQuery(this),i=Y.getItemByThumb(t);B.selectItem(i)}function C(e){if(1==X.numPanes)return!0;if(1==X.touchActive)return!0;0==X.isTilesMode&&e.preventDefault(),X.touchActive=!0;var t={startInnerPos:E()};F.storeEventData(e,X.storedEventID,t)}function A(){if(0==V.grid_vertical_scroll_ondrag)return!1;if(1==X.isNavigationVertical)return!1;var e=F.handleScrollTop(X.storedEventID);return"vert"===e?!0:!1}function M(e){if(0==X.touchActive)return!0;e.preventDefault(),F.updateStoredEventData(e,X.storedEventID);var t=F.getStoredEventData(X.storedEventID,X.isNavigationVertical),i=A();if(i)return!0;var n=t.diffMousePos,r=t.startInnerPos+n,o=n>0?"prev":"next",a=X.arrPanes[X.numPanes-1];0==V.grid_carousel&&r>0&&"prev"==o&&(r/=3),0==V.grid_carousel&&-a>r&&"next"==o&&(r=t.startInnerPos+n/3),v(r)}function O(e){if(0==X.touchActive)return!0;F.updateStoredEventData(e,X.storedEventID);var t=F.getStoredEventData(X.storedEventID,X.isNavigationVertical);if(X.touchActive=!1,0==P())return y(),!0;var i=E(),n=i-t.startInnerPos,r=n>0?"prev":"next";"next"==r?0==V.grid_carousel&&Q.isLastPane()?y():Q.nextPane():0==V.grid_carousel&&Q.isFirstPane()?y():Q.prevPane()}function z(){var e=B.getSelectedItem();Y.setThumbSelected(e.objThumbWrapper),d(e.index)}function L(){if(0==X.isTilesMode){Y.initEvents();var e=G.find(".ug-thumb-wrapper");e.on("click touchend",j),H.on(B.events.ITEM_CHANGE,z)}else U.initEvents();G.bind("mousedown touchstart",C),jQuery("body").bind("mousemove touchmove",M),jQuery(window).add("body").bind("mouseup touchend",O)}var H,N,k,R,G,D,Q=this,W=jQuery(this),B=new UniteGalleryMain,F=new UGFunctions,Y=new UGThumbsGeneral,U=new UGTileDesign,V={grid_panes_direction:"left",grid_num_cols:2,grid_min_cols:2,grid_num_rows:2,grid_space_between_cols:10,grid_space_between_rows:10,grid_space_between_mobile:10,grid_transition_duration:300,grid_transition_easing:"easeInOutQuad",grid_carousel:!1,grid_padding:0,grid_vertical_scroll_ondrag:!1};this.events={PANE_CHANGE:"pane_change"};var X={eventSizeChange:"thumb_size_change",isHorizontal:!1,isMaxHeight:!1,isMaxWidth:!1,gridHeight:0,gridWidth:0,innerWidth:0,innerHeight:0,numPanes:0,arrPanes:0,numThumbs:0,currentPane:0,numThumbsInPane:0,isNavigationVertical:!1,touchActive:!1,startScrollPos:0,isFirstTimeRun:!0,isTilesMode:!1,storedEventID:"thumbsgrid",tileMaxWidth:null,tileMaxHeight:null,spaceBetweenCols:null,spaceBetweenRows:null};this.destroy=function(){if(0==X.isTilesMode){var e=G.find(".ug-thumb-wrapper");e.off("click"),e.off("touchend"),H.on(B.events.ITEM_CHANGE),Y.destroy()}else U.destroy();G.unbind("mousedown"),G.unbind("touchstart"),jQuery("body").unbind("mousemove"),jQuery("body").unbind("touchmove"),jQuery(window).add("body").unbind("touchend"),jQuery(window).add("body").unbind("mouseup"),W.off(Q.events.PANE_CHANGE)},this.__________EXTERNAL_GENERAL_________=function(){},this.setThumbUnselected=function(e){Y.setThumbUnselected(e)},this.isItemThumbVisible=function(e){var t=e.index,i=T(t);return i==X.currentPane?!0:!1},this.__________EXTERNAL_API_________=function(){},this.getNumPanesEstimationByHeight=function(e){if(1==X.isTilesMode)var t=V.tile_height;else var i=Y.getOptions(),t=i.thumb_height;var n=Y.getNumThumbs(),r=Math.ceil(n/V.grid_num_cols),o=r*t+(r-1)*X.spaceBetweenRows,a=Math.ceil(o/e);return a},this.getNumPanesEstimationByWidth=function(e){if(X.isTilesMode)var t=V.tile_width;else var i=Y.getOptions(),t=i.thumb_width;var n=Y.getNumThumbs(),r=Math.ceil(n/V.grid_num_rows),o=r*t+(r-1)*X.spaceBetweenCols,a=Math.ceil(o/e);return a},this.getHeightEstimationByWidth=function(e){if(0==X.isTilesMode)throw new Error("This function works only with tiles mode");var t=Y.getNumThumbs(),i=F.getNumItemsInSpace(e,V.tile_width,X.spaceBetweenCols),n=Math.ceil(t/i);n>V.grid_num_rows&&(n=V.grid_num_rows);var r=F.getSpaceByNumItems(n,V.tile_height,X.spaceBetweenRows);return r+=2*V.grid_padding},this.getElement=function(){return G},this.getSize=function(){var e=F.getElementSize(G);return e},this.getNumPanes=function(){return X.numPanes},this.isFirstPane=function(){return 0==X.currentPane?!0:!1},this.isLastPane=function(){return X.currentPane==X.numPanes-1?!0:!1},this.getPaneInfo=function(){var e={pane:X.currentPane,total:X.numPanes};return e},this.getPane=function(){return X.currentPane},this.setWidth=function(e){X.gridWidth=e,X.isHorizontal=!0},this.setMaxWidth=function(e){X.gridWidth=e,X.isMaxWidth=!0,X.isHorizontal=!0},this.setHeight=function(e){X.gridHeight=e,X.isHorizontal=!1},this.setMaxHeight=function(e){X.gridHeight=e,X.isMaxHeight=!0,X.isHorizontal=!1},this.gotoPane=function(e,t){if(0==m(e))return!1;if(e==X.currentPane)return!1;var i=-X.arrPanes[e];X.currentPane=e,b(i),W.trigger(Q.events.PANE_CHANGE,e)},this.nextPane=function(){var e=X.currentPane+1;if(e>=X.numPanes){if(0==V.grid_carousel)return!0;e=0}Q.gotoPane(e,"next")},this.prevPane=function(){var e=X.currentPane-1;return 0>e&&(e=X.numPanes-1,0==V.grid_carousel)?!1:void Q.gotoPane(e,"prev")},this.attachNextPaneButton=function(e){return F.setButtonOnClick(e,Q.nextPane),1==V.grid_carousel?!0:(Q.isLastPane()&&e.addClass("ug-button-disabled"),void W.on(Q.events.PANE_CHANGE,function(){Q.isLastPane()?e.addClass("ug-button-disabled"):e.removeClass("ug-button-disabled")}))},this.attachPrevPaneButton=function(e){return F.setButtonOnClick(e,Q.prevPane),1==V.grid_carousel?!0:(Q.isFirstPane()&&e.addClass("ug-button-disabled"),void W.on(Q.events.PANE_CHANGE,function(){Q.isFirstPane()?e.addClass("ug-button-disabled"):e.removeClass("ug-button-disabled")}))},this.attachBullets=function(e){e.setActive(X.currentPane),jQuery(e).on(e.events.BULLET_CLICK,function(t,i){Q.gotoPane(i,"theme"),e.setActive(i)}),jQuery(Q).on(Q.events.PANE_CHANGE,function(t,i){e.setActive(i)})},this.getObjTileDesign=function(){return U},this.init=function(t,i,n){e(t,i,n)},this.run=function(){r()},this.setHtml=function(e){t(e)}}function UGTiles(){function e(e,i){g_objects=e.getObjects(),oe=e,K=jQuery(e),J=g_objects.g_objWrapper,ee=g_objects.g_arrItems,de=jQuery.extend(de,i),t(),se.init(e,de),le=se.getObjThumbs()}function t(){de.tiles_min_columns<1&&(de.tiles_min_columns=1),0!=de.tiles_max_columns&&de.tiles_max_columns<de.tiles_min_columns&&(de.tiles_max_columns=de.tiles_min_columns)}function i(e){if(!e)if($)e=$;else var e=J;$=e;var t=de.tiles_type;e.addClass("ug-tiletype-"+t),se.setHtml(e),e.children(".ug-thumb-wrapper").hide()}function n(){if($.addClass("ug-tiles-rest-mode"),_e.isTransInited=!0,1==de.tiles_enable_transition){$.addClass("ug-tiles-transit");var e=se.getOptions();1==e.tile_enable_image_effect&&0==e.tile_image_effect_reverse&&$.addClass("ug-tiles-transit-overlays"),_e.isTransActive=!0}}function r(){return ae.getElementSize($).width}function o(){return 0==_e.isTransInited?!1:($.addClass("ug-tiles-transition-active"),$.removeClass("ug-tiles-rest-mode"),0==_e.isTransActive?!1:void se.disableEvents())}function a(){return 0==_e.isTransInited?!1:($.removeClass("ug-tiles-transition-active"),void $.addClass("ug-tiles-rest-mode"))}function s(){1==_e.isTransActive?(setTimeout(function(){se.enableEvents(),se.triggerSizeChangeEventAllTiles(),a()},800),_e.handle&&clearTimeout(_e.handle),_e.handle=setTimeout(function(){a(),se.triggerSizeChangeEventAllTiles(),_e.handle=null},2e3)):(se.triggerSizeChangeEventAllTiles(),a())}function l(){ue.colWidth=(ue.availWidth-ue.colGap*(ue.numCols-1))/ue.numCols,ue.colWidth=Math.floor(ue.colWidth),ue.totalWidth=ae.getSpaceByNumItems(ue.numCols,ue.colWidth,ue.colGap)}function u(){if(ue.colWidth=de.tiles_col_width,ue.minCols=de.tiles_min_columns,ue.maxCols=de.tiles_max_columns,0==oe.isMobileMode()?ue.colGap=de.tiles_space_between_cols:ue.colGap=de.tiles_space_between_cols_mobile,ue.galleryWidth=r(),ue.availWidth=ue.galleryWidth,1==de.tiles_include_padding&&(ue.availWidth=ue.galleryWidth-2*ue.colGap),1==de.tiles_exact_width)ue.numCols=ae.getNumItemsInSpace(ue.availWidth,ue.colWidth,ue.colGap),ue.maxCols>0&&ue.numCols>ue.maxCols&&(ue.numCols=ue.maxCols),ue.numCols<ue.minCols?(ue.numCols=ue.minCols,l()):ue.totalWidth=ue.numCols*(ue.colWidth+ue.colGap)-ue.colGap;else{var e=ae.getNumItemsInSpaceRound(ue.availWidth,ue.colWidth,ue.colGap);e<ue.minCols?e=ue.minCols:0!=ue.maxCols&&e>ue.maxCols&&(e=ue.maxCols),ue.numCols=e,l()}switch(de.tiles_align){case"center":default:ue.addX=Math.round((ue.galleryWidth-ue.totalWidth)/2);break;case"left":ue.addX=0;break;case"right":ue.addX=ue.galleryWidth-ue.totalWidth}for(ue.arrPosx=[],col=0;col<ue.numCols;col++){var t=ae.getColX(col,ue.colWidth,ue.colGap);ue.arrPosx[col]=t+ue.addX}}function d(){ue.maxColHeight=0,ue.colHeights=[0]}function _(){var e=0,t=999999999;for(col=0;col<ue.numCols;col++){if(void 0==ue.colHeights[col]||0==ue.colHeights[col])return col;ue.colHeights[col]<t&&(e=col,t=ue.colHeights[col])}return e}function g(e,t,i,n){if(null===n||"undefined"==typeof n)var n=_();var r=0;void 0!==ue.colHeights[n]&&(r=ue.colHeights[n]);var o=se.getTileHeightByWidth(ue.colWidth,e);if(null===o){if(1==de.tiles_enable_transition)throw new Error("Can't know tile height, please turn off transition");var a=ae.getElementSize(e);o=a.height}var s=ue.arrPosx[n];ae.placeElement(e,s,r);var l=r+o;ue.colHeights[n]=l+ue.colGap,ue.maxColHeight<l&&(ue.maxColHeight=l),1==t&&e.show().fadeTo(0,1),1==i&&$.height(ue.maxColHeight)}function c(e){e||(e=!1),u(),d();var t=le.getThumbs(le.type.GET_THUMBS_RATIO);o(),se.resizeAllTiles(ue.colWidth,se.resizemode.VISIBLE_ELEMENTS,t);for(var i=0;i<t.length;i++){var n=jQuery(t[i]),r=void 0;1==de.tiles_keep_order&&(r=ae.getColByIndex(ue.numCols,i)),g(n,e,!1,r)}s();var a=$.height();1==_e.isTransActive&&a>ue.maxColHeight?setTimeout(function(){$.height(ue.maxColHeight)},700):$.height(ue.maxColHeight)}function h(e){var t=e.index(),i=oe.getItem(t);if(i.ordered_placed===!0)return!1;var n=ae.getPrevRowSameColIndex(t,ue.numCols);if(0>n)return!0;var r=oe.getItem(n);return r.ordered_placed===!0?!0:!1}function p(e,t){if(t!==!0){var i=h(e);if(0==i)return!1}var n=e.index(),r=ae.getColByIndex(ue.numCols,n),o=oe.getItem(n);se.resizeTile(e,ue.colWidth),g(e,!0,!0,r),o.ordered_placed=!0;var a=oe.getNumItems(),s=ae.getNextRowSameColIndex(n,ue.numCols);if(s>=a)return!1;var l=le.getThumbByIndex(s),u=oe.getItem(s);le.isThumbLoaded(l);le.isThumbLoaded(l)&&!u.ordered_placed&&p(l,!0)}function f(e,t){if(1==t)return!1;e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e),1==de.tiles_keep_order?p(i):(se.resizeTile(i,ue.colWidth),g(i,!0,!0))}function m(){var e=le.getThumbs(le.type.GET_THUMBS_NO_RATIO);if(!e||0==e.length)return!1;if(_e.isAllLoaded=!1,1==_e.isFirstPlaced){u(),d();var t=Math.abs(ue.galleryWidth-ue.totalWidth);if(1==de.tiles_set_initial_height&&0==ae.isScrollbarExists()&&25>t){var i=(e.length,Math.ceil(e.length/ue.numCols)),r=i*de.tiles_col_width*.75;$.height(r),u()}}e.fadeTo(0,0);var o=e.find("img.ug-thumb-image"),a=ue.numCols,s=ue.galleryWidth;ae.checkImagesLoaded(o,function(){u(),(a!=ue.numCols||s!=ue.galleryWidth)&&c(!1),n(),re.trigger(ne.events.ALL_TILES_LOADED)},function(e,t){1==_e.isFirstPlaced&&oe.triggerEvent(ne.events.TILES_FIRST_PLACED),f(e,t)})}function v(){var e=r(),t=le.getThumbs(!0),i=de.tiles_justified_row_height,n=[],o=0,a=de.tiles_justified_space_between,s=t.length;jQuery.each(t,function(e,t){t=jQuery(t);var r=le.getItemByThumb(t),a=r.thumbWidth,s=r.thumbHeight;s!==i&&(a=Math.floor(r.thumbRatioByWidth*i)),n[e]=a,o+=a});var l=Math.ceil(o/e);l>s&&(l=s);var u=o/l,d=[],_=0,g=[],c=[],h=0,p=0;jQuery.each(t,function(e,t){var i=n[e];h+i/2>(p+1)*u&&(g[d.length]=_,d.push(c),c=[],_=0,p++),h+=i,_+=i,c.push(t)}),g[d.length]=_,d.push(c);var f=[],m=[],v=0;jQuery.each(d,function(t,r){var o=(r.length,g[t]),s=(r.length-1)*a,l=(e-s)/o,u=Math.round(i*l);v+=u,t>0&&(v+=a),m.push(u);var d=u/i,_=[],c=s;jQuery.each(r,function(e,t){var i=jQuery(t),r=i.index(),o=n[r],a=Math.round(o*d);_[e]=a,c+=a});var h=c-e;jQuery.each(_,function(e,t){return 0==h?!1:(0>h?(_[e]=t+1,h++):(_[e]=t-1,h--),void(e==_.length-1&&0!=h&&(_[e]-=h)))}),f[t]=_});var b={arrRows:d,arrRowWidths:f,arrRowHeights:m,gap:a,totalHeight:v};return b}function b(e){if(!e)var e=!1;var t=r(),i=v();$.height(i.totalHeight);var n=r();n!=t&&(i=v()),o();var a=0,l=0;jQuery.each(i.arrRows,function(t,n){var r=i.arrRowWidths[t],o=i.arrRowHeights[t],s=0;jQuery.each(n,function(t,n){var u=jQuery(n),d=o,_=r[t];se.resizeTile(u,_,d,se.resizemode.VISIBLE_ELEMENTS),ae.placeElement(u,s,a),s+=_,s>l&&(l=s),s+=i.gap,1==e&&jQuery(n).show()}),a+=o+i.gap}),s()}function y(){var e=jQuery(J).find("img.ug-thumb-image"),t=le.getThumbs();_e.isAllLoaded=!1,t.fadeTo(0,0),ae.checkImagesLoaded(e,function(){setTimeout(function(){b(!0),t.fadeTo(0,1),oe.triggerEvent(ne.events.TILES_FIRST_PLACED),n(),re.trigger(ne.events.ALL_TILES_LOADED)})},function(e,t){e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e)})}function I(){var e=jQuery(J).find("img.ug-thumb-image"),t=le.getThumbs();_e.isAllLoaded=!1,t.fadeTo(0,0),ae.checkImagesLoaded(e,function(){1==oe.isMobileMode()?c(!0):E(!0),oe.triggerEvent(ne.events.TILES_FIRST_PLACED),n(),re.trigger(ne.events.ALL_TILES_LOADED)},function(e,t){e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e)})}function w(){var e=r();ge.galleryWidth=e,te={},ge.colWidth=de.tiles_nested_col_width,ge.optimalTileWidth=de.tiles_nested_optimal_tile_width,ge.currentGap=de.tiles_space_between_cols,1==oe.isMobileMode()&&(ge.currentGap=de.tiles_space_between_cols_mobile),null==ge.colWidth?ge.colWidth=Math.floor(ge.optimalTileWidth/ge.nestedOptimalCols):ge.optimalTileWidth>ge.colWidth?ge.nestedOptimalCols=Math.ceil(ge.optimalTileWidth/ge.colWidth):ge.nestedOptimalCols=1,ge.maxColumns=ae.getNumItemsInSpace(e,ge.colWidth,ge.currentGap),ge.colWidth=ae.getItemSizeInSpace(e,ge.maxColumns,ge.currentGap),ge.gridY=0,ie=[];var t=le.getThumbs(!0);switch(t.each(function(){var e=jQuery(this),t=T(e);ie.push(t)}),ge.optimalTileWidth>ge.colWidth?ge.nestedOptimalCols=Math.ceil(ge.optimalTileWidth/ge.colWidth):ge.nestedOptimalCols=1,ge.totalWidth=ge.maxColumns*(ge.colWidth+ge.currentGap)-ge.currentGap,de.tiles_align){case"center":default:ge.addX=Math.round((ge.galleryWidth-ge.totalWidth)/2);break;case"left":ge.addX=0;break;case"right":ge.addX=ge.galleryWidth-ge.totalWidth}ge.maxGridY=0}function E(e){var t=r();w(),x();var i=ge.maxGridY*(ge.colWidth+ge.currentGap)-ge.currentGap;$.height(i);var n=r();n!=t&&(w(),x()),0==de.tiles_nested_debug&&U(e)}function T(e){var t,i,n={},r=ge.colWidth,o=ge.currentGap,a=se.getTileImageSize(e),s=e.index(),l=Math.ceil(S(s)*(1*ge.nestedOptimalCols/3)+2*ge.nestedOptimalCols/3),u=a.width,d=a.height,_=u/d;return u>d?(t=l,i=Math.round(t/_),0==i&&(i=1)):(i=l,t=Math.round(i*_),0==t&&(t=1)),n.dimWidth=t,n.dimHeight=i,n.width=t*r+o*(t-1),n.height=i*r+o*(i-1),n.imgWidth=u,n.imgHeight=d,n.left=0,n.top=0,n}function S(e){return Math.abs(Math.sin(Math.abs(1e3*Math.sin(e))))}function P(e,t){if(0==t){for(var i=ge.currentItem;i<ie.length;i++)j(i,!0);ge.currentItem=ie.length-1}else j(ge.currentItem,!0);for(var i=0;i<=ge.currentItem;i++)V(i,!0);ge.currentItem++}function x(e){if(1==de.tiles_nested_debug)return"undefined"==typeof e&&(e=!0),P(!0,e),!1;for(var t=0;t<ie.length;t++)j(t,!0)}function j(e,t){if(!t)var t=!1;ge.maxColHeight=0;for(var i=ae.getObjectLength(te),n=ge.gridY;i+1>=n;n++){for(var r=0;r<ge.maxColumns;r++)if(0==Q(ge.gridY)||0==F(ge.gridY,r)){var o=D(r);return void C(e,o,r)}ge.gridY++}}function C(e,t,i){var n=jQuery.extend(!0,{},ie[e]),r=n.dimWidth,o=t-n.dimWidth,a=ge.nestedOptimalCols,s=t<=n.dimWidth||.33*a>=o||a>=t;if(s)N(e,t);else if(a>=o)a>=4?1==G(Math.floor(t/2),i)?N(e,Math.floor(t/2)+1):N(e,Math.floor(t/2)):N(objImage,t);else if(1==G(r,i))switch(r>=a){case!0:N(e,r-1);break;case!1:N(e,r+1)}n=jQuery.extend(!0,{},ie[e]);var l=L(e,n.dimWidth,i);if(ge.columnsValueToEnableHeightResize<=l[0]&&ge.maxColumns>=2*ge.nestedOptimalCols){var u=H(i,n),d=k(e,u.newHeight,!0);ie[e].dimHeight=d.dimHeight;var _=z(l,d.dimWidth,i),g=A(_),c=!1;g>=2&&(c=!0),u.newHeight>=n.dimHeight&&(n=k(e,u.newHeight,!0));var h=M(u.idToResize,u.newHeight,n.dimHeight);n.top=ge.gridY,n.left=i,h.push({tileID:e,sizes:n});var p=R(h),f=R(_);return f>p||1==c?void O(h):void O(_)}n.left=i,n.top=ge.gridY,ie[e]=n,W(e,n,i,ge.gridY),ge.maxGridY=n.top+n.dimHeight}function A(e){for(var t=0,i=0,n=0;n<e.length-1;n++){var r=e[n].sizes,o=-1,a=-1;Q(r.top+r.dimHeight)&&ge.maxColumns>r.left+r.dimWidth&&(o=te[r.top+r.dimHeight-1][r.left+r.dimWidth],a=te[r.top+r.dimHeight][r.left+r.dimWidth]),o!=a&&t++}for(var n=0;n<e.length-1;n++){var r=e[n].sizes,o=-1,a=-1;Q(r.top+r.dimHeight)&&r.left-1>=0&&(o=te[r.top+r.dimHeight-1][r.left-1],a=te[r.top+r.dimHeight][r.left-1]),o!=a&&i++}return Math.max(i,t)}function M(e,t,i){var n=ie[e],r=n.dimHeight,o=(n.dimWidth,n.left),a=n.top,s=(parseInt(a/(ge.colWidth+ge.currentGap)),parseInt(o/(ge.colWidth+ge.currentGap)),r-t+i),l=k(e,s,!0),u=[];return u.push({tileID:e,sizes:l}),u}function O(e){for(var t=0;t<e.length;t++){var i=e[t].sizes,n=e[t].tileID;ie[n]=jQuery.extend(!0,{},i),W(n,i,i.left,i.top)}}function z(e,t){for(var i=0,n=0,r=[],o=0,a=0,s=0;s<e[1].length;s++){var l=e[1][s],u=ie[e[1][s]];if(n+=u.dimHeight,0!=s)i+=u.dimHeight,r.push([l,u.dimHeight]);else{var d=N(l,t,!0);i+=d.dimHeight,r.push([e[1][s],d.dimHeight])}}o=u.left,a=u.top;for(var _=n,g=[],s=r.length-1;s>=0;s--){var c,l=r[s][0];0!=s?(c=Math.max(Math.round(1*n/3),Math.floor(r[s][1]*(n/i))),_-=c,d=k(l,c,!0),d.left=o,d.top=a,g.push({tileID:l,sizes:d}),a+=d.dimHeight):(c=_,d=k(l,c,!0),d.left=o,d.top=a,g.push({tileID:l,sizes:d}))}return g}function L(e,t,i){var n=ge.gridY-1,r=0,o=0,a=1,s=[],l=[];if(s.push(e),n>=0){for(o=0;n>=0;){if(r=te[n][i],"undefined"!=typeof te[n][i-1]&&te[n][i-1]==te[n][i]||"undefined"!=typeof te[n][i+t]&&te[n][i+t-1]==te[n][i+t]||te[n][i]!=te[n][i+t-1])return l.push(a),l.push(s),l;o!=r&&(a++,s.push(r)),n--,o=r}return l.push(a),l.push(s),l}return[0,[]]}function H(e,t){var i=0,n=0,r=t.dimWidth,o=t.dimHeight,a=0,s=0,l=jQuery.map(te,function(e,t){return[e]});if("undefined"==typeof l[ge.gridY]||"undefined"==typeof l[ge.gridY][e-1])n=0;else for(var u=0;;){if("undefined"==typeof te[ge.gridY+u]||-1==te[ge.gridY+u][e-1])break;a=te[ge.gridY+u][e-2],u++,n++}if("undefined"==typeof l[ge.gridY]||"undefined"==typeof l[ge.gridY][e+r])i=0;else for(u=0;;){if("undefined"==typeof te[ge.gridY+u]||-1==te[ge.gridY+u][e+r])break;s=te[ge.gridY+u][e+r+1],u++,i++}var d=0,_=0;Math.abs(o-n)<Math.abs(o-i)&&0!=n?(d=n,_=a):0!=i?(d=i,_=s):d=o;var g={newHeight:d,idToResize:_};return g}function N(e,t,i){i||(i=!1);var n=ge.colWidth,r=ge.currentGap,o=ie[e],a=o.imgWidth,s=o.imgHeight,l=a/s;if(dimWidth=t,dimHeight=Math.round(dimWidth/l),1==i){var u=jQuery.extend(!0,{},o);return u.dimWidth=dimWidth,u.dimHeight=dimHeight,u.width=dimWidth*n+r*(dimWidth-1),u.height=dimHeight*n+r*(dimHeight-1),u}o.dimWidth=dimWidth,o.dimHeight=dimHeight,o.width=dimWidth*n+r*(dimWidth-1),o.height=dimHeight*n+r*(dimHeight-1)}function k(e,t,i){i||(i=!1);var n=ie[e],r=n.dimWidth,o=ge.colWidth,a=ge.currentGap;if(1==i){var s=jQuery.extend(!0,{},n);return s.dimHeight=t,s.width=r*o+a*(r-1),s.height=t*o+a*(t-1),s}n.dimHeight=t,n.width=r*o+a*(r-1),n.height=t*o+a*(t-1)}function R(e){for(var t=0,i=0,n=0;n<e.length;n++){var r=ie[e[n].tileID];if(0==r.dimHeight||0==r.height)return;resizeVal=r.dimWidth/r.dimHeight/(r.imgWidth/r.imgHeight),resizeVal<1&&(resizeVal=1/resizeVal),t+=resizeVal,i++}return t/i}function G(e,t){var i=ge.gridY-1;return 0>=i||0==Q(i)?!1:te[i][t+e-1]!=te[i][t+e]?!0:!1}function D(e){var t=e,i=0;if(1==Q(ge.gridY))for(;0==F(ge.gridY,t);)i++,t++;else i=ge.maxColumns;return i}function Q(e){return"undefined"==typeof te[e]?!1:!0}function W(e,t,i,n){for(var r=0;r<t.dimHeight;r++)for(var o=0;o<t.dimWidth;o++)0==Q(n+r)&&B(n+r),Y(n+r,i+o,e)}function B(e){te[e]=new Object;for(var t=0;t<ge.maxColumns;t++)te[e][t]=-1}function F(e,t){return-1!=te[e][t]}function Y(e,t,i){te[e][t]=i}function U(e){if(!e)var e=!1;o();for(var t=0;t<ie.length;t++)V(t,e);$.height(ge.maxColHeight),s()}function V(e,t){var i=le.getThumbByIndex(e),n=ie[e],r=n.top*(ge.colWidth+ge.currentGap),o=ge.addX+n.left*(ge.colWidth+ge.currentGap);se.resizeTile(i,n.width,n.height,se.resizemode.VISIBLE_ELEMENTS),ae.placeElement(i,o,r),r+n.height>ge.maxColHeight&&(ge.maxColHeight=r+n.height),1==t&&i.fadeTo(0,1)}function X(){if(1==_e.isFirstTimeRun)return!0;if(0==_e.isAllLoaded)return!1;switch(de.tiles_type){case"columns":c(!1);break;case"justified":b(!1);break;case"nested":var e=oe.isMobileMode();1==e?c(!1):E(!1)}}function Z(){re.on(ne.events.ALL_TILES_LOADED,function(){_e.isAllLoaded=!0}),K.on(oe.events.SIZE_CHANGE,X),K.on(ne.events.TILES_FIRST_PLACED,function(){_e.isFirstPlaced=!1}),se.initEvents()}function q(){switch(J.children(".ug-tile").show(),1==_e.isFirstTimeRun&&Z(),se.run(),de.tiles_type){default:case"columns":m();break;case"justified":y();break;case"nested":I()}_e.isFirstTimeRun=!1}var K,J,$,ee,te,ie,ne=this,re=jQuery(this),oe=new UniteGalleryMain,ae=new UGFunctions,se=new UGTileDesign,le=new UGThumbsGeneral,ue={},de={tiles_type:"columns",tiles_col_width:250,tiles_align:"center",tiles_exact_width:!1,tiles_space_between_cols:3,tiles_space_between_cols_mobile:3,tiles_include_padding:!0,tiles_min_columns:2,tiles_max_columns:0,tiles_keep_order:!1,tiles_set_initial_height:!0,tiles_justified_row_height:150,tiles_justified_space_between:3,tiles_nested_optimal_tile_width:250,tiles_nested_col_width:null,tiles_nested_debug:!1,tiles_enable_transition:!0};this.events={THUMB_SIZE_CHANGE:"thumb_size_change",TILES_FIRST_PLACED:"tiles_first_placed",ALL_TILES_LOADED:"all_tiles_loaded"};var _e={isFirstTimeRun:!0,handle:null,isTransActive:!1,isTransInited:!1,isFirstPlaced:!0,isAllLoaded:!1},ge={colWidth:null,nestedOptimalCols:5,gridY:0,maxColumns:0,columnsValueToEnableHeightResize:3,resizeLeftRightToColumn:!0,currentItem:0,currentGap:null,optimalTileWidth:null,maxGridY:0};this.destroy=function(){K.off(oe.events.SIZE_CHANGE),se.destroy(),K.off(ne.events.TILES_FIRST_PLACED)},this.init=function(t,i){e(t,i)},this.setHtml=function(e){i(e)},this.getObjTileDesign=function(){return se},this.run=function(){q()},this.runNewItems=function(){if(!$)throw new Error("Can't run new items - parent not set");switch(se.setHtml($,!0),se.run(!0),de.tiles_type){case"columns":m();break;default:case"justified":case"nested":throw new Error("Tiles type: "+de.tiles_type+" not support load more yet")}}}function UGTileDesign(){function e(e,i){D=e,L=jQuery(e);var r=D.getObjects();N=r.g_objWrapper,k=D.getArrItems(),B=jQuery.extend(B,F),B=jQuery.extend(B,i),t(),W.init(e,B);var o={allow_onresize:!1},a=["overlay"];Y.funcCustomTileHtml&&(a=[]),W.setCustomThumbs(n,a,o);var s=W.getOptions();B=jQuery.extend(B,s),Y.ratioByWidth=B.tile_width/B.tile_height,Y.ratioByHeight=B.tile_height/B.tile_width,B.tile_size_by==R.sizeby.GLOBAL_RATIO&&Y.isTextpanelOutside&&(Y.hasImageContainer=!0)}function t(){if(1==B.tile_enable_overlay?(B.thumb_overlay_opacity=B.tile_overlay_opacity,B.thumb_overlay_color=B.tile_overlay_color):0==B.tile_enable_icons?B.thumb_color_overlay_effect=!1:B.thumb_overlay_opacity=0,B.tile_as_link&&(B.thumb_wrapper_as_link=!0,B.thumb_link_newpage=B.tile_link_newpage),1==B.tile_enable_outline&&0==B.tile_enable_border&&(B.tile_enable_outline=!1),Y.tileInnerReduce=0,B.tile_enable_border&&(Y.tileInnerReduce=2*B.tile_border_width,W.setThumbInnerReduce(Y.tileInnerReduce)),Y.isSaparateIcons=!Q.isRgbaSupported(),1==B.tile_enable_textpanel){switch(B.tile_textpanel_position){case"top":B.tile_textpanel_align="top";case"bottom":Y.isTextpanelOutside=!0,B.tile_textpanel_always_on=!0,B.tile_textpanel_offset=0;break;case"inside_top":B.tile_textpanel_align="top";break;case"middle":B.tile_textpanel_align="middle",B.tile_textpanel_appear_type="fade"}0==B.tile_textpanel_always_on&&(Y.isSaparateIcons=!0)}0!=B.tile_textpanel_offset&&(B.tile_textpanel_appear_type="fade",B.tile_textpanel_margin=B.tile_textpanel_offset),"title_and_desc"==B.tile_textpanel_source&&(B.tile_textpanel_enable_description=!0,
B.tile_textpanel_desc_style_as_title=!0)}function i(){var e=D.isMobileMode();switch(Y.isTextPanelHidden=!1,1==e&&0==B.tile_textpanel_always_on&&(Y.isTextPanelHidden=!0),Y.isVideoplayIconAlwaysOn=B.tile_videoplay_icon_always_on,B.tile_videoplay_icon_always_on){case"always":Y.isVideoplayIconAlwaysOn=!0;break;case"never":Y.isVideoplayIconAlwaysOn=!1;break;case"mobile_only":Y.isVideoplayIconAlwaysOn=1==e?!0:!1;break;case"desktop_only":Y.isVideoplayIconAlwaysOn=0==e?!0:!1}}function n(e,t){if(e.addClass("ug-tile"),Y.funcCustomTileHtml)return Y.funcCustomTileHtml(e,t),!1;var i="";1==Y.hasImageContainer&&(i+="<div class='ug-image-container ug-trans-enabled'>");var n="ug-thumb-image";(0==B.tile_enable_image_effect||1==B.tile_image_effect_reverse)&&(n+=" ug-trans-enabled");var r=Q.stripTags(t.title);r=Q.htmlentitles(r),i+='<img src="'+Q.escapeDoubleSlash(t.urlThumb)+"\" alt='"+r+"' class='"+n+"'>",1==Y.hasImageContainer&&(i+="</div>"),e.append(i),B.tile_size_by==R.sizeby.GLOBAL_RATIO&&e.fadeTo(0,0);var o={};if(1==B.tile_enable_background&&(o["background-color"]=B.tile_background_color),1==B.tile_enable_border&&(o["border-width"]=B.tile_border_width+"px",o["border-style"]="solid",o["border-color"]=B.tile_border_color,B.tile_border_radius&&(o["border-radius"]=B.tile_border_radius+"px")),1==B.tile_enable_outline&&(o.outline="1px solid "+B.tile_outline_color),1==B.tile_enable_shadow){var a=B.tile_shadow_h+"px ";a+=B.tile_shadow_v+"px ",a+=B.tile_shadow_blur+"px ",a+=B.tile_shadow_spread+"px ",a+=B.tile_shadow_color,o["box-shadow"]=a}e.css(o);var s="";if(B.tile_enable_icons){if(0==B.tile_as_link&&1==B.tile_enable_action){var l="ug-button-play ug-icon-zoom";"image"!=t.type&&(l="ug-button-play ug-icon-play"),s+="<div class='ug-tile-icon "+l+"' style='display:none'></div>"}if(t.link&&1==B.tile_show_link_icon||1==B.tile_as_link)if(0==B.tile_as_link){var u="";1==B.tile_link_newpage&&(u=" target='_blank'"),s+="<a href='"+t.link+"'"+u+" class='ug-tile-icon ug-icon-link'></a>"}else s+="<div class='ug-tile-icon ug-icon-link' style='display:none'></div>";var _=Y.isSaparateIcons;if(0==_&&"image"!=t.type&&1==Y.isVideoplayIconAlwaysOn&&(_=!0),_)var g=e;else var g=e.children(".ug-thumb-overlay");g.append(s);var c=g.children("."+l);0==c.length?c=null:c.hide();var h=g.children(".ug-icon-link");0==h.length?h=null:h.hide(),h||1!=B.tile_enable_action||e.addClass("ug-tile-clickable")}else 1==B.tile_enable_action&&e.addClass("ug-tile-clickable");if(1==B.tile_enable_image_effect){var p="";0==B.tile_image_effect_reverse&&(p=" ug-trans-enabled");var f="<div class='ug-tile-image-overlay"+p+"' >",m=" ug-"+B.tile_image_effect_type+"-effect";f+='<img src="'+Q.escapeDoubleSlash(t.urlThumb)+"\" alt='"+t.title+"' class='"+m+p+"'>",f+="</div>",e.append(f),1==B.tile_image_effect_reverse&&e.children(".ug-tile-image-overlay").fadeTo(0,0)}if(1==B.tile_enable_textpanel){var v=new UGTextPanel;v.init(D,B,"tile");var b="";(1==B.tile_textpanel_always_on||1==Y.isTextpanelOutside)&&(b="ug-trans-enabled"),v.appendHTML(e,b);var y=t.title,I="";switch(B.tile_textpanel_source){case"desc":case"description":y=t.description;break;case"desc_title":""!=t.description&&(y=t.description);break;case"title_and_desc":y=t.title,I=t.description}if(v.setTextPlain(y,I),0==B.tile_textpanel_always_on&&v.getElement().fadeTo(0,0),e.data("objTextPanel",v),1==B.tile_textpanel_always_on){var w=d(e);w.css("z-index",2)}if(1==Y.isTextpanelOutside){var E="<div class='ug-tile-cloneswrapper'></div>";e.append(E);var T=e.children(".ug-tile-cloneswrapper"),S=new UGTextPanel;S.init(D,B,"tile"),S.appendHTML(T),S.setTextPlain(y,I),e.data("objTextPanelClone",S)}}null!==t.addHtml&&e.append(t.addHtml)}function r(e){var t=e.children(".ug-tile-image-overlay");return t}function o(e){var t=e.children(".ug-thumb-overlay");return t}function a(e){if(0==Y.hasImageContainer)return null;var t=e.children(".ug-image-container");return t}function s(e){var t=e.find(".ug-tile-image-overlay img");return t}function l(e){var t=e.data("objTextPanel");return t}function u(e){var t=e.data("objTextPanelClone");return t}function d(e){var t=e.children(".ug-textpanel");return t}function _(e){var t=e.find(".ug-tile-cloneswrapper .ug-textpanel");if(0==t.length)throw new Error("text panel cloned element not found");return t}function g(e){if(1==Y.isTextpanelOutside)var t=_(e);else var t=d(e);if(!t)return 0;var i=Q.getElementSize(t);return i.height}function c(e){var t=e.find(".ug-icon-link");return 0==t.length?null:t}function h(e){var t=Y.ratioByHeight;switch(B.tile_size_by){default:t=Y.ratioByHeight;break;case R.sizeby.IMAGE_RATIO:if(!e)throw new Error("tile should be given for tile ratio");var i=R.getItemByTile(e);if("undefined"!=typeof i.thumbRatioByHeight){if(0==i.thumbRatioByHeight)throw trace(i),new Error("the item ratio not inited yet");t=i.thumbRatioByHeight}break;case R.sizeby.CUSTOM:return null}return t}function p(e){var t=e.find(".ug-button-play");return 0==t.length?null:t}function f(e){return e.hasClass("ug-thumb-over")?!0:!1}function m(e){return e.hasClass("ug-tile-clickable")}function v(e){return 1==B.tile_enable_icons&&1==Y.isVideoplayIconAlwaysOn&&"image"!=e.type?!0:!1}function b(e,t,i,n){var o=r(e),l=R.getTileImage(e),u=s(e);t-=Y.tileInnerReduce,i-=Y.tileInnerReduce;var d=null;if(1==Y.isTextpanelOutside){var _=g(e);if(i-=_,"top"==B.tile_textpanel_position&&(d=_),1==Y.hasImageContainer){var c=a(e);Q.setElementSize(c,t,i),null!==d&&Q.placeElement(c,0,d)}}if(0==B.tile_enable_image_effect)Q.scaleImageCoverParent(l,t,i),0==Y.hasImageContainer&&null!==d&&Q.placeElement(l,0,d);else{var h="nothing";n===!0&&0==Y.isTextpanelOutside&&(h=1==B.tile_image_effect_reverse?"effect":"image"),"effect"!=h&&(Q.setElementSize(o,t,i),null!==d&&Q.placeElement(o,0,d),Q.scaleImageCoverParent(u,t,i)),"image"!=h&&(1==Y.hasImageContainer?Q.scaleImageCoverParent(l,t,i):"effect"==h?(Q.scaleImageCoverParent(l,t,i),null!==d&&Q.placeElement(l,0,d)):Q.cloneElementSizeAndPos(u,l,!1,null,d))}}function y(e,t,i,n){var r=null;if(i&&(r=i-Y.tileInnerReduce),n&&(n-=Y.tileInnerReduce),"clone"==t){var o=u(e);o.refresh(!0,!0,r);var a=R.getItemByTile(e);return a.textPanelCloneSizeSet=!0,!1}var s=l(e);if(!s)return!1;var d=null;1==Y.isTextpanelOutside&&(d=g(e)),s.refresh(!1,!0,r,d);var _=1==B.tile_textpanel_always_on||"fade"==B.tile_textpanel_appear_type;if(_)if(1==Y.isTextpanelOutside&&n&&"bottom"==B.tile_textpanel_position){var c=n-d;s.positionPanel(c)}else s.positionPanel()}function I(e){var t=(R.getItemByTile(e),p(e)),i=c(e),n=Q.getElementSize(e);b(e,n.width,n.height),1==B.tile_enable_textpanel&&y(e,"regular",n.width,n.height);var r=n.width-Y.tileInnerReduce,a=n.height-Y.tileInnerReduce,s=0;if(1==Y.isTextpanelOutside){var l=g(e);a-=l,"top"==B.tile_textpanel_position&&(s=l)}var u=o(e);if(Q.setElementSizeAndPosition(u,0,s,r,a),t||i){var _=0;if(1==B.tile_enable_textpanel&&0==Y.isTextPanelHidden&&0==Y.isTextpanelOutside){var h=d(e),f=Q.getElementSize(h);f.height>0&&(_=Math.floor(f.height/2*-1))}}if(t&&i){var m=Q.getElementSize(t),v=Q.getElementSize(i),I=B.tile_space_between_icons,w=m.width+I+v.width,E=Math.floor((n.width-w)/2);I>E&&(I=Math.floor((n.width-m.width-v.width)/3),w=m.width+I+v.width,E=Math.floor((n.width-w)/2)),Q.placeElement(t,E,"middle",0,_),Q.placeElement(i,E+m.width+I,"middle",0,_)}else t&&Q.placeElement(t,"center","middle",0,_),i&&Q.placeElement(i,"center","middle",0,_);t&&t.show(),i&&i.show()}function w(e,t){var i=(R.getItemByTile(e),r(e)),n=B.thumb_transition_duration;if(0==B.tile_image_effect_reverse){var o=R.getTileImage(e);t?(o.fadeTo(0,1),i.stop(!0).fadeTo(n,0)):i.stop(!0).fadeTo(n,1)}else t?i.stop(!0).fadeTo(n,1):i.stop(!0).fadeTo(n,0)}function E(e,t){var i=B.thumb_transition_duration,n=d(e);if(!n)return!0;if("slide"==B.tile_textpanel_appear_type){var r=Q.getElementSize(n);if(0==r.width)return!1;var o=-r.height,a=0,s={},l={},u="bottom";"inside_top"==B.tile_textpanel_position&&(u="top"),s[u]=o+"px",l[u]=a+"px",1==t?(n.fadeTo(0,1),0==n.is(":animated")&&n.css(s),l.opacity=1,n.stop(!0).animate(l,i)):n.stop(!0).animate(s,i)}else 1==t?n.stop(!0).fadeTo(i,1):n.stop(!0).fadeTo(i,0)}function T(e,t,i){var n=B.thumb_transition_duration;i&&i===!0&&(n=0);var r=p(e),o=c(e),a=t?1:0;r&&r.stop(!0).fadeTo(n,a),o&&o.stop(!0).fadeTo(n,a)}function S(e,t){if(t=jQuery(t),B.tile_enable_image_effect&&w(t,!0),1==B.tile_enable_textpanel&&0==B.tile_textpanel_always_on&&0==Y.isTextPanelHidden&&E(t,!0),Y.isSaparateIcons&&1==B.tile_enable_icons){var i=1==B.thumb_overlay_reverse,n=R.getItemByTile(t);0==v(n)&&T(t,i,!1)}}function P(e,t){if(t=jQuery(t),B.tile_enable_image_effect&&w(t,!1),1==B.tile_enable_textpanel&&0==B.tile_textpanel_always_on&&E(t,!1),1==Y.isSaparateIcons&&1==B.tile_enable_icons){var i=1==B.thumb_overlay_reverse?!1:!0,n=R.getItemByTile(t);0==v(n)?T(t,i,!1):T(t,!0,!0)}}function x(e){var t=W.getThumbs().not(e);t.each(function(e,t){W.setThumbNormalStyle(jQuery(t))})}function j(e,t,i){return t=jQuery(t),1==B.tile_visible_before_image&&t.data("image_placed")!==!0&&i!==!0?!0:(I(t),void W.setThumbNormalStyle(t))}function C(e,t,i){I(t),i.fadeTo(0,1),t.data("image_placed",!0)}function A(e){return 1==m(e)?(G.trigger(R.events.TILE_CLICK,e),!0):void(0==f(e)&&(x(e),W.setThumbOverStyle(e)))}function M(e){var t=jQuery(this),i=t.prop("tagName").toLowerCase(),n=!0;if(Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&(n=!1),"a"==i)0==n&&e.preventDefault();else if(0==f(t))1==n&&A(t);else{if(0==m(t))return!0;1==n&&G.trigger(R.events.TILE_CLICK,t)}}function O(e){e.stopPropagation();var t=jQuery(this).parents(".ug-tile"),i=!0;return Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&(i=!1),0==f(t)?(A(t),!0):1==i?(G.trigger(R.events.TILE_CLICK,t),!1):void 0}function z(e){var t=jQuery(this).parents(".ug-tile");Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&e.preventDefault(),0==f(t)&&0==B.tile_as_link&&(e.preventDefault(),A(t))}var L,H,N,k,R=this,G=jQuery(this),D=new UniteGalleryMain,Q=new UGFunctions,W=new UGThumbsGeneral;this.resizemode={FULL:"full",WRAPPER_ONLY:"wrapper_only",VISIBLE_ELEMENTS:"visible_elements"},this.sizeby={GLOBAL_RATIO:"global_ratio",TILE_RATIO:"tile_ratio",IMAGE_RATIO:"image_ratio",CUSTOM:"custom"},this.events={TILE_CLICK:"tile_click"};var B={tile_width:250,tile_height:200,tile_size_by:R.sizeby.IMAGE_RATIO,tile_visible_before_image:!1,tile_enable_background:!0,tile_background_color:"#F0F0F0",tile_enable_border:!1,tile_border_width:3,tile_border_color:"#F0F0F0",tile_border_radius:0,tile_enable_outline:!1,tile_outline_color:"#8B8B8B",tile_enable_shadow:!1,tile_shadow_h:1,tile_shadow_v:1,tile_shadow_blur:3,tile_shadow_spread:2,tile_shadow_color:"#8B8B8B",tile_enable_action:!0,tile_as_link:!1,tile_link_newpage:!0,tile_enable_overlay:!0,tile_overlay_opacity:.4,tile_overlay_color:"#000000",tile_enable_icons:!0,tile_show_link_icon:!1,tile_videoplay_icon_always_on:"never",tile_space_between_icons:26,tile_enable_image_effect:!1,tile_image_effect_type:"bw",tile_image_effect_reverse:!1,tile_enable_textpanel:!1,tile_textpanel_source:"title",tile_textpanel_always_on:!1,tile_textpanel_appear_type:"slide",tile_textpanel_position:"inside_bottom",tile_textpanel_offset:0},F={thumb_color_overlay_effect:!0,thumb_overlay_reverse:!0,thumb_image_overlay_effect:!1,tile_textpanel_enable_description:!1,tile_textpanel_bg_opacity:.6,tile_textpanel_padding_top:8,tile_textpanel_padding_bottom:8},Y={ratioByHeight:0,ratioByWidth:0,eventSizeChange:"thumb_size_change",funcCustomTileHtml:null,funcCustomPositionElements:null,funcParentApproveClick:null,isSaparateIcons:!1,tileInnerReduce:0,isTextpanelOutside:!1,hasImageContainer:!1,isVideoplayIconAlwaysOn:!1,isTextPanelHidden:!1};this.loadTileImage=function(e){var t=R.getTileImage(e);Q.checkImagesLoaded(t,null,function(t,i){C(null,e,jQuery(t))})},this.setHtml=function(e,t){H=e,t!==!0&&i(),W.setHtmlThumbs(e,t)},this.initEvents=function(){W.initEvents(),jQuery(W).on(W.events.SETOVERSTYLE,S),jQuery(W).on(W.events.SETNORMALSTYLE,P),jQuery(W).on(W.events.PLACEIMAGE,C),N.on(Y.eventSizeChange,j),H.on("click",".ug-tile",M),H.on("click",".ug-tile .ug-button-play",O),H.on("click",".ug-tile .ug-icon-link",z)},this.destroy=function(){if(H.off("click",".ug-tile"),H.off("click",".ug-tile .ug-button-play"),H.off("click",".ug-tile .ug-icon-link"),jQuery(W).off(W.events.SETOVERSTYLE),jQuery(W).off(W.events.SETNORMALSTYLE),jQuery(W).off(W.events.PLACEIMAGE),N.off(Y.eventSizeChange),1==B.tile_enable_textpanel){var e=W.getThumbs();jQuery.each(e,function(e,t){var i=l(jQuery(t));i&&i.destroy()})}W.destroy()},this.init=function(t,i,n){e(t,i,n)},this.setFixedMode=function(){B.tile_size_by=R.sizeby.GLOBAL_RATIO,B.tile_visible_before_image=!0},this.setApproveClickFunction=function(e){Y.funcParentApproveClick=e},this.resizeTile=function(e,t,i,n){if(1==Y.isTextpanelOutside&&y(e,"clone",t),t){if(!i)var i=R.getTileHeightByWidth(t,e)}else var t=B.tile_width,i=B.tile_height;switch(Q.setElementSize(e,t,i),n){default:case R.resizemode.FULL:R.triggerSizeChangeEvent(e,!0);break;case R.resizemode.WRAPPER_ONLY:return!0;case R.resizemode.VISIBLE_ELEMENTS:if(Y.funcCustomTileHtml)return R.triggerSizeChangeEvent(e,!0),!0;b(e,t,i,!0),1==B.tile_enable_textpanel&&1==B.tile_textpanel_always_on&&t&&y(e,"regular",t,i)}},this.resizeAllTiles=function(e,t,n){i();var r=null;if(B.tile_size_by==R.sizeby.GLOBAL_RATIO&&(r=R.getTileHeightByWidth(e)),!n)var n=W.getThumbs();n.each(function(i,n){R.resizeTile(jQuery(n),e,r,t)})},this.triggerSizeChangeEvent=function(e,t){if(!e)return!1;if(!t)var t=!1;N.trigger(Y.eventSizeChange,[e,t])},this.triggerSizeChangeEventAllTiles=function(e){var t=W.getThumbs();t.each(function(){var t=jQuery(this);R.triggerSizeChangeEvent(t,e)})},this.disableEvents=function(){var e=W.getThumbs();e.css("pointer-events","none")},this.enableEvents=function(){var e=W.getThumbs();e.css("pointer-events","auto")},this.setOptions=function(e){B=jQuery.extend(B,e),W.setOptions(e)},this.setTileSizeOptions=function(e){if(B.tile_size_by!==R.sizeby.GLOBAL_RATIO)throw new Error("setNewTileOptions works with global ration only");B.tile_width=e,B.tile_height=Math.floor(e*Y.ratioByHeight)},this.setCustomFunctions=function(e,t){Y.funcCustomTileHtml=e,Y.funcCustomPositionElements=t},this.run=function(e){var t=W.type.GET_THUMBS_ALL;e===!0&&(t=W.type.GET_THUMBS_NEW);var i=W.getThumbs(t);B.tile_size_by==R.sizeby.GLOBAL_RATIO&&R.resizeAllTiles(B.tile_width,R.resizemode.WRAPPER_ONLY,i),1==B.tile_enable_image_effect&&0==B.tile_image_effect_reverse&&i.children(".ug-thumb-image").fadeTo(0,0),W.setHtmlProperties(i),1==B.tile_visible_before_image&&(i.children(".ug-thumb-image").fadeTo(0,0),W.loadThumbsImages())},this._____________EXTERNAL_GETTERS____________=function(){},this.getObjThumbs=function(){return W},this.getOptions=function(){return B},this.getTileImage=function(e){var t=e.find("img.ug-thumb-image");return t},this.getItemByTile=function(e){return W.getItemByThumb(e)},this.getTileHeightByWidth=function(e,t){var i=h(t);if(null===i)return null;var n=Math.floor((e-Y.tileInnerReduce)*i)+Y.tileInnerReduce;return t&&1==Y.isTextpanelOutside&&B.tile_size_by==R.sizeby.IMAGE_RATIO&&(n+=g(t)),n},this.getTileImageSize=function(e){var t=R.getItemByTile(e);if(!t.thumbWidth||!t.thumbHeight)throw new Error("Can't get image size - image not inited.");var i={width:t.thumbWidth,height:t.thumbHeight};return i},this.getGlobalTileSize=function(){if(B.tile_size_by!=R.sizeby.GLOBAL_RATIO)throw new Error("The size has to be global ratio");var e={width:B.tile_width,height:B.tile_height};return e}}function UGAviaControl(){function e(e){return 0==p?e.pageX:e.pageY}function t(t){jQuery("body").on("touchstart",function(e){return 0==f.isControlEnabled?!0:void(f.touchEnabled=!0)}),jQuery("body").mousemove(function(t){if(0==f.isControlEnabled)return!0;if(1==f.touchEnabled)return jQuery("body").off("mousemove"),!0;f.isMouseInsideStrip=g.ismouseover();var i=u.isTouchMotionActive();if(1==f.isMouseInsideStrip&&0==i){var n=e(t);l(n)}else a()})}function i(e){var t=h.strip_padding_top,i=(h.strip_padding_bottom,g.height()),n=c.height();if(i>n)return null;var r=g.offset(),o=r.top,a=e-o-t;if(0>a)return null;var s=h.thumb_height,l=i-h.thumb_height,u=l-s;s>a&&(a=s),a>l&&(a=l);var d=(a-s)/u,_=(n-i)*d;return _=-1*Math.round(_)+t}function n(e){var t=h.strip_padding_left,i=h.strip_padding_right,n=g.width()-t-i,r=c.width();if(n>r)return null;var o=g.offset(),a=o.left,s=e-a-t,l=h.thumb_width,u=n-h.thumb_width,d=u-l;l>s&&(s=l),s>u&&(s=u);var _=(s-l)/d,p=(r-n)*_;return p=-1*Math.round(p)+t}function r(){if(0==f.is_strip_moving)return!1;var e=u.getInnerStripPos();Math.floor(e)==Math.floor(f.strip_finalPos)&&a();var t,i=Math.abs(f.strip_finalPos-e);1>i?t=i:(t=i/4,t>0&&1>t&&(t=1)),f.strip_finalPos<e&&(t=-1*t);var n=e+t;u.positionInnerStrip(n)}function o(){return 1==f.isStripMoving?!1:(f.isStripMoving=!0,void(f.handle_timeout=setInterval(r,10)))}function a(){return 0==f.isStripMoving?!1:(f.isStripMoving=!1,void(f.handle_timeout=clearInterval(f.handle_timeout)))}function s(e){return 0==p?n(e):i(e)}function l(e){var t=s(e);return null===t?!1:(f.is_strip_moving=!0,f.strip_finalPos=t,void o())}var u,d,_,g,c,h,p,f={touchEnabled:!1,isMouseInsideStrip:!1,strip_finalPos:0,handle_timeout:"",isStripMoving:!1,isControlEnabled:!0};this.enable=function(){f.isControlEnabled=!0},this.disable=function(){f.isControlEnabled=!1},this.init=function(e){u=e,_=e.getObjects(),d=_.g_gallery,g=_.g_objStrip,c=_.g_objStripInner,h=_.g_options,p=_.isVertical,t()},this.destroy=function(){jQuery("body").off("touchstart"),jQuery("body").off("mousemove")}}function UGSlider(){function e(e,t,n){me=e,n&&(he=n,t=we.convertCustomPrefixOptions(t,he,"slider")),te=jQuery(e);var r=me.getObjects();if(ie=r.g_objWrapper,ne=r.g_objThumbs,t.hasOwnProperty("slider_progress_indicator_type")&&(Se.slider_progress_indicator_type=t.slider_progress_indicator_type),"bar"==Se.slider_progress_indicator_type&&(Se=jQuery.extend(Se,Pe)),t&&pe.setOptions(t),i(),1==Se.slider_enable_bullets){ye=new UGBullets;var o={bullets_skin:Se.slider_bullets_skin,bullets_space_between:Se.slider_bullets_space_between};ye.init(me,o)}Se.slider_enable_text_panel&&(Te=new UGTextPanel,Te.init(me,Se,"slider")),Se.slider_enable_zoom_panel&&(ce=new UGZoomButtonsPanel,ce.init(pe,Se));var a=me.getGalleryID();Ie.init(Se,!1,a)}function t(){if(1==xe.isRunOnce)return!1;if(xe.isRunOnce=!0,Se.slider_background_color){var e=Se.slider_background_color;1!=Se.slider_background_opacity&&(e=we.convertHexToRGB(e,Se.slider_background_opacity)),re.css("background-color",e)}else 1!=Se.slider_background_opacity&&(e=we.convertHexToRGB("#000000",Se.slider_background_opacity),re.css("background-color",e));1==Se.slider_control_swipe&&(_e=new UGTouchSliderControl,_e.init(pe,Se)),1==Se.slider_control_zoom&&(ge=new UGZoomSliderControl,ge.init(pe,Se)),Te&&Te.run(),X()}function i(){var e=me.getOptions(),t=e.gallery_skin;""==Se.slider_bullets_skin&&(Se.slider_bullets_skin=t),""==Se.slider_arrows_skin&&(Se.slider_arrows_skin=t),""==Se.slider_zoompanel_skin&&(Se.slider_zoompanel_skin=t),""==Se.slider_play_button_skin&&(Se.slider_play_button_skin=t),""==Se.slider_fullscreen_button_skin&&(Se.slider_fullscreen_button_skin=t),Se.video_enable_closebutton=Se.slider_video_enable_closebutton,"zoom"!=e.gallery_mousewheel_role&&(Se.slider_zoom_mousewheel=!1)}function n(e,t){var i="ug-type-square";"round"==Se.slider_videoplay_button_type&&(i="ug-type-round");var n="";return n+="<div class='ug-slide-wrapper ug-slide"+t+"'>",n+="<div class='ug-item-wrapper'></div>",n+="<div class='ug-slider-preloader "+e+"'></div>",n+="<div class='ug-button-videoplay "+i+"' style='display:none'></div>",n+="</div>"}function r(e){e&&(ie=e);var t=Z(),i=(me.getOptions(),"<div class='ug-slider-wrapper'>");if(i+="<div class='ug-slider-inner'>",i+=n(t,1),i+=n(t,2),i+=n(t,3),i+="</div>",1==Se.slider_enable_arrows&&(i+="<div class='ug-slider-control ug-arrow-left ug-skin-"+Se.slider_arrows_skin+"'></div>",i+="<div class='ug-slider-control ug-arrow-right ug-skin-"+Se.slider_arrows_skin+"'></div>"),1==Se.slider_enable_play_button&&(i+="<div class='ug-slider-control ug-button-play ug-skin-"+Se.slider_play_button_skin+"'></div>"),1==Se.slider_enable_fullscreen_button&&(i+="<div class='ug-slider-control ug-button-fullscreen ug-skin-"+Se.slider_fullscreen_button_skin+"'></div>"),i+="</div>",ie.append(i),re=ie.children(".ug-slider-wrapper"),oe=re.children(".ug-slider-inner"),ae=oe.children(".ug-slide1"),se=oe.children(".ug-slide2"),le=oe.children(".ug-slide3"),ae.data("slidenum",1),se.data("slidenum",2),le.data("slidenum",3),ye&&ye.appendHTML(re),1==Se.slider_enable_arrows&&(ue=re.children(".ug-arrow-left"),de=re.children(".ug-arrow-right")),1==Se.slider_enable_play_button&&(ve=re.children(".ug-button-play")),1==Se.slider_enable_fullscreen_button&&(be=re.children(".ug-button-fullscreen")),1==Se.slider_enable_progress_indicator){Ee=we.initProgressIndicator(Se.slider_progress_indicator_type,Se,re);var r=Ee.getType();"bar"==r&&"pie"==Se.slider_progress_indicator_type&&(Se.slider_progress_indicator_type="bar",Se=jQuery.extend(Se,Pe)),me.setProgressIndicator(Ee)}if(1==Se.slider_enable_text_panel&&(Te.appendHTML(re),0==Se.slider_textpanel_always_on)){var o=Te.getElement();o.hide().data("isHidden",!0),xe.isTextPanelSaparateHover=!0}1==Se.slider_enable_zoom_panel&&ce.appendHTML(re),Ie.setHtml(oe)}function o(e){var t=J(e);we.placeElementInParentCenter(t);var i=$(e);we.placeElementInParentCenter(i)}function a(){if(ye&&(objBullets=ye.getElement(),we.placeElement(objBullets,Se.slider_bullets_align_hor,Se.slider_bullets_align_vert,Se.slider_bullets_offset_hor,Se.slider_bullets_offset_vert),we.placeElement(objBullets,Se.slider_bullets_align_hor,Se.slider_bullets_align_vert,Se.slider_bullets_offset_hor,Se.slider_bullets_offset_vert)),1==Se.slider_enable_arrows&&(we.placeElement(ue,Se.slider_arrow_left_align_hor,Se.slider_arrow_left_align_vert,Se.slider_arrow_left_offset_hor,Se.slider_arrow_left_offset_vert),we.placeElement(de,Se.slider_arrow_right_align_hor,Se.slider_arrow_left_align_vert,Se.slider_arrow_right_offset_hor,Se.slider_arrow_right_offset_vert)),0==Se.slider_controls_always_on&&M(!0),Ee){var e=Ee.getElement();if("bar"==Se.slider_progress_indicator_type){var t=re.width();Ee.setSize(t),we.placeElement(e,"left",Se.slider_progress_indicator_align_vert,0,Se.slider_progress_indicator_offset_vert)}else we.placeElement(e,Se.slider_progress_indicator_align_hor,Se.slider_progress_indicator_align_vert,Se.slider_progress_indicator_offset_hor,Se.slider_progress_indicator_offset_vert)}Te&&Te.positionPanel(),s(),o(ae),o(se),o(le),C()}function s(){if(ve&&we.placeElement(ve,Se.slider_play_button_align_hor,Se.slider_play_button_align_vert,Se.slider_play_button_offset_hor,Se.slider_play_button_offset_vert),be&&we.placeElement(be,Se.slider_fullscreen_button_align_hor,Se.slider_fullscreen_button_align_vert,Se.slider_fullscreen_button_offset_hor,Se.slider_fullscreen_button_offset_vert),ce){var e=ce.getElement();we.placeElement(e,Se.slider_zoompanel_align_hor,Se.slider_zoompanel_align_vert,Se.slider_zoompanel_offset_hor,Se.slider_zoompanel_offset_vert)}}function l(){var e,t,i,n,r=pe.getSlidesReference(),o=0,a=0,s=0;i=pe.isSlideHasItem(r.objNextSlide),n=pe.isSlideHasItem(r.objPrevSlide),n?(s=r.objPrevSlide.outerWidth(),r.objPrevSlide.css("z-index",1)):r.objPrevSlide.hide(),t=s+r.objCurrentSlide.outerWidth(),e=t,i?(e=t+r.objNextSlide.outerWidth(),r.objPrevSlide.css("z-index",2)):r.objNextSlide.hide(),r.objCurrentSlide.css("z-index",3),we.placeElement(r.objCurrentSlide,s,o),oe.css({left:-s+"px",width:e+"px"}),n&&(we.placeElement(r.objPrevSlide,a,o),we.showElement(r.objPrevSlide)),i&&(we.showElement(r.objNextSlide),we.placeElement(r.objNextSlide,t,o))}function u(e){var t=e.data("index");if(void 0===t||null==t)return!1;var i=me.getItem(t);return i?void f(e,i):!1}function d(e){e.stop(!0).show(100)}function _(e){e.stop(!0).hide(100)}function g(e,t){var i=Se.slider_image_border_width;if(10>=i)return i;var n=we.getElementSize(e),r=n.width,o=n.height;if(t&&(t.hasOwnProperty("imageWidth")&&(r=t.imageWidth),t.hasOwnProperty("imageHeight")&&(o=t.imageHeight)),0>=r)return i;var a=o>r?r:o,s=2*i,l=s/a;if(l<Se.slider_image_border_maxratio)return i;var i=a*Se.slider_image_border_maxratio/2;return i=Math.round(i)}function c(e,t,i){var n={};if(1==Se.slider_image_border){n["border-style"]="solid";var r=g(e,i);n["border-width"]=r+"px",n["border-color"]=Se.slider_image_border_color,n["border-radius"]=Se.slider_image_border_radius}"image"!=t&&1==Se.slider_video_constantsize&&(n["background-color"]="#000000"),1==Se.slider_image_shadow&&(n["box-shadow"]="3px 3px 10px 0px #353535"),e.css(n)}function h(e,t){var i=Se.slider_video_constantsize_width,n=Se.slider_video_constantsize_height,r=Se.slider_video_constantsize_scalemode,o=we.scaleImageExactSizeInParent(e,t.imageWidth,t.imageHeight,i,n,r);return o}function p(e,t,i){var n=e.children(".ug-item-wrapper"),r=J(e);if("undefined"==typeof t.urlImage||""==t.urlImage)throw new Error("The slide don't have big image defined ( data-image='imageurl' ). Please check gallery items.","showbig");var o=t.urlImage,a=e.data("urlImage");e.data("urlImage",o);var s=pe.getScaleMode(e),l=pe.getSlideType(e);if(objPadding=pe.getObjImagePadding(),a==o&&i!==!0){var u=n.children("img");(0==t.imageWidth||0==t.imageHeight)&&me.checkFillImageSize(u,t);var g={};g="image"!=l&&1==Se.slider_video_constantsize?h(u,t):we.scaleImageFitParent(u,t.imageWidth,t.imageHeight,s,objPadding),c(u,l,g),fe.trigger(pe.events.AFTER_PUT_IMAGE,e)}else if(u=we.placeImageInsideParent(o,n,t.imageWidth,t.imageHeight,s,objPadding),1==t.isBigImageLoaded){if(u.fadeTo(0,1),_(r),"image"!=l&&1==Se.slider_video_constantsize)var g=h(u,t);else var g=we.getImageInsideParentData(n,t.imageWidth,t.imageHeight,s,objPadding);u.css("width",g.imageWidth+"px"),c(u,l,g),fe.trigger(pe.events.AFTER_PUT_IMAGE,e)}else u.fadeTo(0,0),d(r),e.data("isLoading",!0),pe.isSlideCurrent(e)&&fe.trigger(pe.events.CURRENTSLIDE_LOAD_START),u.data("itemIndex",t.index),u.on("load",function(){var e=jQuery(this),t=e.data("itemIndex");e.fadeTo(0,1);var i=e.parent().parent(),n=pe.getSlideType(i),r=J(i),o=pe.getObjImagePadding(),a=pe.getScaleMode(i);_(r),i.data("isLoading",!1),pe.isSlideCurrent(i)&&fe.trigger(pe.events.CURRENTSLIDE_LOAD_END),me.onItemBigImageLoaded(null,e);var s=me.getItem(t),l={};"image"!=n&&1==Se.slider_video_constantsize?h(e,s):l=we.scaleImageFitParent(e,s.imageWidth,s.imageHeight,a,o),e.fadeTo(0,1),c(e,n,l),fe.trigger(pe.events.AFTER_PUT_IMAGE,i)})}function f(e,t){try{var i=e.children(".ug-item-wrapper");if(null==t)return i.html(""),e.removeData("index"),e.removeData("type"),e.removeData("urlImage"),!1;e.data("index");e.data("index",t.index),e.data("type",t.type),1==Se.slider_enable_links&&"image"==t.type&&(t.link?e.addClass("ug-slide-clickable"):e.removeClass("ug-slide-clickable")),p(e,t);var n=$(e);switch(t.type){case"image":n.hide();break;default:n.show()}}catch(r){throw"undefined"!=typeof r.fileName&&"showbig"==r.fileName&&me.showErrorMessageReplaceGallery(r.message),i.html(""),new Error(r)}}function m(){if(!Te)return!1;if(1==b())return!1;var e=Te.getElement(),t=0;(1==xe.isTextPanelSaparateHover||1==Se.slider_textpanel_always_on)&&(t=Se.slider_controls_appear_duration),e.stop().fadeTo(t,0),e.data("isHidden",!0)}function v(){if(!Te)return!1;if(0==b())return!1;var e=Te.getElement(),t=0;(1==xe.isTextPanelSaparateHover||1==Se.slider_textpanel_always_on)&&(e.show(),Te.positionElements(),t=Se.slider_controls_appear_duration),e.stop().show().fadeTo(t,1),e.data("isHidden",!1)}function b(){var e=Te.getElement(),t=e.data("isHidden");return t===!1?!1:!0}function y(e,t){if(void 0==t)var t=pe.getCurrentSlide();var i=pe.getSlideType(t);if(i!=e)throw new Error("Wrong slide type: "+i+", should be: "+e);return!0}function I(){var e=pe.getCurrentSlide(),t=pe.getSlideImage(e),i=we.getElementSize(e),n=i.left,r=i.top;if(1==Se.slider_video_constantsize){var o=we.getElementSize(t);n+=o.left,r+=o.top}else n+=Se.slider_video_padding_left,r+=Se.slider_video_padding_top;Ie.setPosition(n,r)}function w(){var e=Se.slider_video_constantsize_width,t=Se.slider_video_constantsize_height;Ie.setSize(e,t);var i=Ie.getObject();c(i,"video")}function E(e,t,i){fe.trigger(pe.events.TRANSITION_START);var n=Se.slider_transition;switch(i&&(n=i),pe.stopSlideAction(null,!0),n){default:case"fade":P(t);break;case"slide":T(e,t);break;case"lightbox_open":P(t,!1,!0)}}function T(e,t){var i=pe.isAnimating();if(1==i)return xe.itemWaiting=t,!0;null!=xe.itemWaiting&&(xe.itemWaiting=null);var n=pe.getSlidesReference();switch(e){case"right":f(n.objPrevSlide,t),l();var r=we.getElementSize(n.objPrevSlide),o=-r.left;pe.switchSlideNums("right");break;case"left":f(n.objNextSlide,t),l();var a=we.getElementSize(n.objNextSlide),o=-a.left;pe.switchSlideNums("left");break;default:throw new Error("wrong direction: "+e)}var s=Se.slider_transition_speed,u=Se.slider_transition_easing,d={duration:s,easing:u,queue:!1,always:function(){if(pe.stopSlideAction(),Ie.hide(),null!=xe.itemWaiting){var e=K(xe.itemWaiting);T(e,xe.itemWaiting)}else pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END)}};oe.animate({left:o+"px"},d)}function S(e,t,i){i?e.fadeTo(Se.slider_transition_speed,t,i):e.fadeTo(Se.slider_transition_speed,t)}function P(e,t,i){if(!t)var t=!1;var n=pe.getSlidesReference();f(n.objNextSlide,e);var r=we.getElementSize(n.objCurrentSlide);we.placeElement(n.objNextSlide,r.left,r.top);var o=xe.numCurrent;if(xe.numCurrent=xe.numNext,xe.numNext=o,fe.trigger(pe.events.ITEM_CHANGED),n.objNextSlide.stop(!0),n.objCurrentSlide.stop(!0),1==t)n.objCurrentSlide.fadeTo(0,0),n.objNextSlide.fadeTo(0,1),pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END),i!==!0&&Ie.hide();else{if(n.objNextSlide.fadeTo(0,0),S(n.objCurrentSlide,0,function(){pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END),i!==!0&&Ie.hide()}),1==Ie.isVisible()){var a=Ie.getObject();S(a,0)}S(n.objNextSlide,1)}}function x(){1==Se.slider_fullscreen_button_mobilehide&&be&&be.hide(),1==Se.slider_play_button_mobilehide&&ve&&ve.hide(),1==Se.slider_zoompanel_mobilehide&&ce&&ce.getElement().hide()}function j(){1==Se.slider_fullscreen_button_mobilehide&&be&&be.show(),1==Se.slider_play_button_mobilehide&&ve&&ve.show(),1==Se.slider_zoompanel_mobilehide&&ce&&ce.getElement().show()}function C(){var e=me.isMobileMode();e?x():j()}function A(){var e=re.children(".ug-slider-control");return e}function M(e){if(0==we.isTimePassed("sliderControlsToggle"))return!1;if(0==xe.isControlsVisible)return!1;if(!e)var e=!1;var t=A();e===!0?t.stop().fadeTo(0,0).hide():t.stop().fadeTo(Se.slider_controls_appear_duration,0,function(){t.hide()}),xe.isControlsVisible=!1}function O(e){if(0==we.isTimePassed("sliderControlsToggle"))return!1;if(1==xe.isControlsVisible)return!0;if(!e)var e=!1;var t=A();e===!0?t.stop().show():(t.stop().show().fadeTo(0,0),t.fadeTo(Se.slider_controls_appear_duration,1)),xe.isControlsVisible=!0}function z(){0==xe.isControlsVisible?O():M()}function L(e){if(e==xe.currentControlsMode)return!1;switch(e){case"image":ce&&ce.getElement().show();break;case"video":ce&&ce.getElement().hide();break;default:throw new Error("wrong controld mode: "+e)}xe.currentControlsMode=e}function H(e,t,i){var n=me.getSelectedItem();pe.setItem(n,!1,i);var r=n.index;ye&&ye.setActive(r),Te&&0==xe.isTextPanelSaparateHover&&v(),L("image"==n.type?"image":"video")}function N(e,t){me.selectItem(t)}function k(e){return _e&&0==_e.isTapEventOccured(e)?!0:void fe.trigger(pe.events.CLICK,e)}function R(){var e=pe.getCurrentSlide(),t=e.hasClass("ug-slide-clickable"),i=pe.getCurrentItem();return t?(0==Se.slider_links_newpage?location.href=i.link:window.open(i.link,"_blank"),!0):void(0==Se.slider_controls_always_on&&1==Se.slider_controls_appear_ontap&&1==pe.isCurrentSlideType("image")&&(z(),Te&&1==Se.slider_textpanel_always_on&&pe.isCurrentSlideType("image")&&pe.isCurrentSlideImageFit()&&v()))}function G(e){Te&&pe.isCurrentSlideType("image")&&0==pe.isCurrentSlideImageFit()&&m()}function D(){O()}function Q(){
M()}function W(e){var t=e.parent();pe.startSlideAction(t)}function B(){me.isPlayMode()&&me.pausePlaying(),fe.trigger(pe.events.ACTION_START)}function F(){me.isPlayMode()&&me.continuePlaying(),fe.trigger(pe.events.ACTION_END)}function Y(e,t,i){ae.data("index")==t&&(objItem=me.getItem(t),p(ae,objItem,!0)),se.data("index")==t&&(objItem=me.getItem(t),p(se,objItem,!0)),le.data("index")==t&&(objItem=me.getItem(t),p(le,objItem,!0))}function U(e,t){t=jQuery(t);var i=pe.getSlideImage(t),n=$(t),r=we.getElementSize(i);we.placeElement(n,"center","middle",r.left,r.top,i)}function V(e){var t=$(e);we.addClassOnHover(t),we.setButtonOnClick(t,W)}function X(){te.on(me.events.ITEM_IMAGE_UPDATED,Y),te.on(me.events.ITEM_CHANGE,H),ye&&jQuery(ye).on(ye.events.BULLET_CLICK,N),1==Se.slider_enable_arrows&&(we.addClassOnHover(de,"ug-arrow-hover"),we.addClassOnHover(ue,"ug-arrow-hover"),me.setNextButton(de),me.setPrevButton(ue)),0==Se.slider_controls_always_on&&re.hover(D,Q),re.on("touchend click",k),fe.on(pe.events.CLICK,R),Te&&1==xe.isTextPanelSaparateHover&&re.hover(v,m),ve&&(we.addClassOnHover(ve,"ug-button-hover"),me.setPlayButton(ve)),be&&(we.addClassOnHover(be,"ug-button-hover"),me.setFullScreenToggleButton(be)),ge&&fe.on(pe.events.ZOOM_CHANGE,G),ce&&ce.initEvents(),Ie.initEvents(),jQuery(Ie).on(Ie.events.SHOW,B),jQuery(Ie).on(Ie.events.HIDE,F),V(ae),V(se),V(le),fe.on(pe.events.AFTER_PUT_IMAGE,U),re.on("mouseenter",".ug-item-wrapper img",function(e){fe.trigger(pe.events.IMAGE_MOUSEENTER)}),re.on("mouseleave",".ug-item-wrapper img",function(e){var t=pe.isMouseInsideSlideImage(e);0==t&&fe.trigger(pe.events.IMAGE_MOUSELEAVE)})}function Z(){var e;switch(Se.slider_loader_type){default:case 1:e="ug-loader1";break;case 2:e="ug-loader2";break;case 3:e="ug-loader3";break;case 4:e="ug-loader4";break;case 5:e="ug-loader5";break;case 6:e="ug-loader6";break;case 7:e="ug-loader7";break;case 8:e="ug-loader8";break;case 9:e="ug-loader9"}return"black"==Se.slider_loader_color&&(e+=" ug-loader-black"),e}function q(e){switch(e){case 1:return ae;case 2:return se;case 3:return le;default:throw new Error("wrong num: "+e)}}function K(e){var t=pe.getSlidesReference(),i=t.objCurrentSlide.data("index"),n=e.index,r="left";return i>n&&(r="right"),r}function J(e){if(!e)var e=pe.getCurrentSlide();var t=e.children(".ug-slider-preloader");return t}function $(e){var t=e.children(".ug-button-videoplay");return t}function ee(e){if(!e)var e=pe.getCurrentSlide();var t=e.data("index");if(void 0==t)return null;var i=me.getItem(t);return i}var te,ie,ne,re,oe,ae,se,le,ue,de,_e,ge,ce,he,pe=this,fe=jQuery(pe),me=new UniteGalleryMain,ve=null,be=null,ye=null,Ie=new UGVideoPlayer,we=new UGFunctions,Ee=null,Te=null;this.events={ITEM_CHANGED:"item_changed",BEFORE_SWITCH_SLIDES:"before_switch",BEFORE_RETURN:"before_return",AFTER_RETURN:"after_return",ZOOM_START:"slider_zoom_start",ZOOM_END:"slider_zoom_end",ZOOMING:"slider_zooming",ZOOM_CHANGE:"slider_zoom_change",START_DRAG:"start_drag",AFTER_DRAG_CHANGE:"after_drag_change",ACTION_START:"action_start",ACTION_END:"action_end",CLICK:"slider_click",TRANSITION_START:"slider_transition_start",TRANSITION_END:"slider_transition_end",AFTER_PUT_IMAGE:"after_put_image",IMAGE_MOUSEENTER:"slider_image_mouseenter",IMAGE_MOUSELEAVE:"slider_image_mouseleave",CURRENTSLIDE_LOAD_START:"slider_current_loadstart",CURRENTSLIDE_LOAD_END:"slider_current_loadend"};var Se={slider_scale_mode:"fill",slider_scale_mode_media:"fill",slider_scale_mode_fullscreen:"down",slider_item_padding_top:0,slider_item_padding_bottom:0,slider_item_padding_left:0,slider_item_padding_right:0,slider_background_color:"",slider_background_opacity:1,slider_image_padding_top:0,slider_image_padding_bottom:0,slider_image_padding_left:0,slider_image_padding_right:0,slider_image_border:!1,slider_image_border_width:10,slider_image_border_color:"#ffffff",slider_image_border_radius:0,slider_image_border_maxratio:.35,slider_image_shadow:!1,slider_video_constantsize:!1,slider_video_constantsize_scalemode:"fit",slider_video_constantsize_width:854,slider_video_constantsize_height:480,slider_video_padding_top:0,slider_video_padding_bottom:0,slider_video_padding_left:0,slider_video_padding_right:0,slider_video_enable_closebutton:!0,slider_transition:"slide",slider_transition_speed:300,slider_transition_easing:"easeInOutQuad",slider_control_swipe:!0,slider_control_zoom:!0,slider_zoom_mousewheel:!0,slider_vertical_scroll_ondrag:!1,slider_loader_type:1,slider_loader_color:"white",slider_enable_links:!0,slider_links_newpage:!1,slider_enable_bullets:!1,slider_bullets_skin:"",slider_bullets_space_between:-1,slider_bullets_align_hor:"center",slider_bullets_align_vert:"bottom",slider_bullets_offset_hor:0,slider_bullets_offset_vert:10,slider_enable_arrows:!0,slider_arrows_skin:"",slider_arrow_left_align_hor:"left",slider_arrow_left_align_vert:"middle",slider_arrow_left_offset_hor:20,slider_arrow_left_offset_vert:0,slider_arrow_right_align_hor:"right",slider_arrow_right_align_vert:"middle",slider_arrow_right_offset_hor:20,slider_arrow_right_offset_vert:0,slider_enable_progress_indicator:!0,slider_progress_indicator_type:"pie",slider_progress_indicator_align_hor:"right",slider_progress_indicator_align_vert:"top",slider_progress_indicator_offset_hor:10,slider_progress_indicator_offset_vert:10,slider_enable_play_button:!0,slider_play_button_skin:"",slider_play_button_align_hor:"left",slider_play_button_align_vert:"top",slider_play_button_offset_hor:40,slider_play_button_offset_vert:8,slider_play_button_mobilehide:!1,slider_enable_fullscreen_button:!0,slider_fullscreen_button_skin:"",slider_fullscreen_button_align_hor:"left",slider_fullscreen_button_align_vert:"top",slider_fullscreen_button_offset_hor:11,slider_fullscreen_button_offset_vert:9,slider_fullscreen_button_mobilehide:!1,slider_enable_zoom_panel:!0,slider_zoompanel_skin:"",slider_zoompanel_align_hor:"left",slider_zoompanel_align_vert:"top",slider_zoompanel_offset_hor:12,slider_zoompanel_offset_vert:92,slider_zoompanel_mobilehide:!1,slider_controls_always_on:!1,slider_controls_appear_ontap:!0,slider_controls_appear_duration:300,slider_enable_text_panel:!0,slider_textpanel_always_on:!0,slider_videoplay_button_type:"square"},Pe={slider_progress_indicator_align_hor:"left",slider_progress_indicator_align_vert:"bottom",slider_progress_indicator_offset_hor:0,slider_progress_indicator_offset_vert:0},xe={isRunOnce:!1,isTextPanelSaparateHover:!1,numPrev:1,numCurrent:2,numNext:3,isControlsVisible:!0,currentControlsMode:"image"};this.switchSlideNums=function(e){switch(fe.trigger(pe.events.BEFORE_SWITCH_SLIDES),e){case"left":var t=xe.numCurrent;xe.numCurrent=xe.numNext,xe.numNext=xe.numPrev,xe.numPrev=t;break;case"right":var t=xe.numCurrent;xe.numCurrent=xe.numPrev,xe.numPrev=xe.numNext,xe.numNext=t;break;default:throw new Error("wrong direction: "+e)}fe.trigger(pe.events.ITEM_CHANGED)},this.destroy=function(){fe.off(pe.events.AFTER_PUT_IMAGE),te.off(me.events.ITEM_IMAGE_UPDATED),te.off(me.events.ITEM_CHANGE),ye&&jQuery(ye).on(ye.events.BULLET_CLICK),re.off("mouseenter"),re.off("mouseleave"),re.off("touchend"),re.off("click"),fe.off(pe.events.CLICK),ge&&fe.off(pe.events.ZOOM_CHANGE),fe.off(pe.events.BEFORE_SWITCH_SLIDES),jQuery(Ie).off(Ie.events.SHOW),jQuery(Ie).off(Ie.events.HIDE),Ie.destroy(),re.off("mouseenter",".ug-item-wrapper img"),re.off("mouseleave",".ug-item-wrapper img")},this.________EXTERNAL_GENERAL___________=function(){},this.init=function(t,i,n){e(t,i,n)},this.getSlideImage=function(e){if(!e)var e=pe.getCurrentSlide();var t=e.find(".ug-item-wrapper img");return t},this.setHtml=function(e){r(e)},this.run=function(){t()},this.isInnerInPlace=function(){var e=pe.getSlidesReference(),t=we.getElementSize(e.objCurrentSlide),i=-t.left,n=we.getElementSize(oe);return i==n.left?!0:!1},this.isAnimating=function(){var e=oe.is(":animated");return e},this.isSlideCurrent=function(e){var t=e.data("slidenum");return xe.numCurrent==t?!0:!1},this.isSlideHasItem=function(e){var t=e.data("index");return void 0===t||null===t?!1:!0},this.getObjImagePadding=function(){var e={padding_top:Se.slider_image_padding_top,padding_bottom:Se.slider_image_padding_bottom,padding_left:Se.slider_image_padding_left,padding_right:Se.slider_image_padding_right};return e},this.getSlidesReference=function(){var e={objPrevSlide:q(xe.numPrev),objNextSlide:q(xe.numNext),objCurrentSlide:q(xe.numCurrent)};return e},this.getCurrentSlide=function(){var e=pe.getSlidesReference();return e.objCurrentSlide},this.getCurrentItemIndex=function(){var e=pe.getSlidesReference(),t=e.objCurrentSlide.data("index");return(null===t||void 0===t)&&(t=-1),t},this.getCurrentItem=function(){var e=pe.getCurrentItemIndex();if(-1==e)return null;var t=me.getItem(e);return t},this.getSlideType=function(e){void 0==e&&(e=pe.getCurrentSlide());var t=e.data("type");return t},this.isMouseInsideSlideImage=function(e){var t=pe.getSlideImage(),i=we.getMousePosition(e);void 0===i.pageX&&(i=_e.getLastMousePos());var n=we.getMouseElementPoint(i,t),r=we.getElementSize(t);return isMouseInside=we.isPointInsideElement(n,r),isMouseInside},this.isCurrentSlideType=function(e){var t=pe.getSlideType();return t==e?!0:!1},this.isCurrentSlideLoadingImage=function(){var e=pe.getCurrentSlide(),t=e.data("isLoading");return t===!0?!0:!1},this.setItem=function(e,t,i){var n=pe.getSlidesReference(),r=n.objCurrentSlide.data("index"),o=e.index;if(o==r)return!0;var a=void 0==r;if(a)f(n.objCurrentSlide,e),pe.placeNabourItems();else{var s="left";me.getNumItems();"next"==i?s="left":"prev"==i||r>o?s="right":r>o&&(s="right"),E(s,e,t)}},this.placeNabourItems=function(){var e=pe.getSlidesReference(),t=e.objCurrentSlide.data("index"),i=me.getPrevItem(t),n=me.getNextItem(t);f(e.objNextSlide,n),f(e.objPrevSlide,i),l()},this.________EXTERNAL_API___________=function(){},this.stopSlideAction=function(e,t){e||(e=pe.getCurrentSlide()),t===!0?Ie.pause():Ie.hide()},this.startSlideAction=function(e){e||(e=pe.getCurrentSlide());var t=ee(e);if("image"==t.type)return!0;switch(1==Se.slider_video_constantsize&&w(),I(),Ie.show(),t.type){case"youtube":Ie.playYoutube(t.videoid);break;case"vimeo":Ie.playVimeo(t.videoid);break;case"html5video":Ie.playHtml5Video(t.videoogv,t.videowebm,t.videomp4,t.urlImage);break;case"soundcloud":Ie.playSoundCloud(t.trackid);break;case"wistia":Ie.playWistia(t.videoid)}},this.getScaleMode=function(e){if(!e)var e=pe.getCurrentSlide();var t=pe.getSlideType(e);return"image"!=t?Se.slider_scale_mode_media:Se.slider_scale_mode==Se.slider_scale_mode_fullscreen?Se.slider_scale_mode:1==me.isFullScreen()?Se.slider_scale_mode_fullscreen:Se.slider_scale_mode},this.getObjects=function(){var e={g_objSlider:re,g_objInner:oe,g_options:Se,g_objZoomSlider:ge};return e},this.getObjZoom=function(){return ge},this.getOptions=function(){return Se},this.getElement=function(){return re},this.getVideoObject=function(){return Ie},this.isCurrentSlideImageFit=function(){var e=pe.getCurrentSlide();pe.getSlideType(e);y("image",e);var t=pe.getSlideImage(e);if(0==t.length)return!1;var i=we.isImageFitParent(t);return i},this.isCurrentImageInPlace=function(){var e=pe.getSlideImage();if(0==e.length)return!1;var t=pe.getScaleMode(),i=pe.getObjImagePadding(),n=ee(),r=e.parent(),o=we.getImageInsideParentData(r,n.imageWidth,n.imageHeight,t,i),a=we.getElementSize(e),s=!1;return o.imageWidth==a.width&&(s=!0),s},this.isSlideActionActive=function(){return Ie.isVisible()},this.isSwiping=function(){if(!_e)return!1;var e=_e.isTouchActive();return e},this.isPreloading=function(){var e=J();return e.is(":visible")?!0:!1},this.setOptions=function(e){he&&(e=we.convertCustomPrefixOptions(e,he,"slider")),Se=jQuery.extend(Se,e)},this.setSize=function(e,t){if(0>e||0>t)return!0;var i={};i.width=e+"px",i.height=t+"px",re.css(i);var n={};n.height=t+"px",n.top="0px",n.left="0px",oe.css(n);var r={};r.height=t+"px",r.width=e+"px",ae.css(r),se.css(r),le.css(r);var o=e-Se.slider_item_padding_left-Se.slider_item_padding_right,s=t-Se.slider_item_padding_top-Se.slider_item_padding_bottom,d={};d.width=o+"px",d.height=s+"px",d.top=Se.slider_item_padding_top+"px",d.left=Se.slider_item_padding_left+"px",re.find(".ug-item-wrapper").css(d),Te&&Te.setSizeByParent(),a(),u(ae),u(se),u(le),l();var _=pe.getSlideType();if("image"!=_&&1==Se.slider_video_constantsize)w();else{var g=e-Se.slider_video_padding_left-Se.slider_video_padding_right,c=t-Se.slider_video_padding_top-Se.slider_video_padding_bottom;Ie.setSize(g,c)}I()},this.refreshSlideItems=function(){return 1==pe.isAnimating()?!0:(u(ae),u(se),u(le),void l())},this.isMouseOver=function(){return re.ismouseover()},this.setPosition=function(e,t){we.placeElement(re,e,t)},this.zoomIn=function(){return ge?void ge.zoomIn():!0},this.zoomOut=function(){return ge?void ge.zoomOut():!0},this.zoomBack=function(){return ge?void ge.zoomBack():!0}}function UGTextPanel(){function e(e,t){if(!t)var t=v.textpanel_padding_top;var i=t;if(d){var n=i;f.placeElement(d,0,n);var o=d.is(":visible");if(1==o){var a=f.getElementSize(d),i=a.bottom;i>0&&(b.lastTitleBottom=i)}else{var i=20;b.lastTitleBottom>0&&(i=b.lastTitleBottom)}}var s="";if(_&&(s=jQuery.trim(_.text())),""!=s){var l=i;d&&(l+=v.textpanel_padding_title_description),f.placeElement(_,0,l);var u=jQuery(_).is(":visible");if(1==u){var g=f.getElementSize(_);i=g.bottom,g.height>0&&(b.lastDescHeight=g.height)}else{var c=16;b.lastDescHeight>0&&(c=b.lastDescHeight),i=l+c}}if(!v.textpanel_height&&1==b.setInternalHeight){var h=i+v.textpanel_padding_bottom;r(h,e)}}function t(){var e=0;if(d&&(e+=d.outerHeight()),_){var t="";_&&(t=jQuery.trim(_.text())),""!=t&&(d&&(e+=v.textpanel_padding_title_description),e+=_.outerHeight())}return e}function i(){var i=t(),n=(c.height()-i)/2;e(!1,n)}function n(){var i=t(),n=c.height()-i-v.textpanel_padding_bottom;e(!1,n)}function r(e,t){if(!t)var t=!1;if(1==t){if(g){var i=g.height();e>i&&g.height(e)}var n={height:e+"px"};l.add(c).animate(n,v.textpanel_fade_duration)}else g&&g.height(e),l.add(c).height(e)}function o(){if(1==v.textpanel_enable_bg){g=l.children(".ug-textpanel-bg"),g.fadeTo(0,v.textpanel_bg_opacity);var e={"background-color":v.textpanel_bg_color};e=jQuery.extend(e,v.textpanel_bg_css),g.css(e)}if(1==v.textpanel_enable_title){d=c.children(".ug-textpanel-title");var t={};null!==v.textpanel_title_color&&(t.color=v.textpanel_title_color),null!==v.textpanel_title_font_family&&(t["font-family"]=v.textpanel_title_font_family),null!==v.textpanel_title_text_align&&(t["text-align"]=v.textpanel_title_text_align),null!==v.textpanel_title_font_size&&(t["font-size"]=v.textpanel_title_font_size+"px"),null!==v.textpanel_title_bold&&(v.textpanel_title_bold===!0?t["font-weight"]="bold":t["font-weight"]="normal"),v.textpanel_css_title&&(t=jQuery.extend(t,v.textpanel_css_title)),d.css(t)}if(1==v.textpanel_enable_description){_=c.children(".ug-textpanel-description");var i={};null!==v.textpanel_desc_color&&(i.color=v.textpanel_desc_color),null!==v.textpanel_desc_font_family&&(i["font-family"]=v.textpanel_desc_font_family),null!==v.textpanel_desc_text_align&&(i["text-align"]=v.textpanel_desc_text_align),null!==v.textpanel_desc_font_size&&(i["font-size"]=v.textpanel_desc_font_size+"px"),null!==v.textpanel_desc_bold&&(v.textpanel_desc_bold===!0?i["font-weight"]="bold":i["font-weight"]="normal"),v.textpanel_css_title&&(i=jQuery.extend(i,v.textpanel_css_description)),_.css(i)}}function a(){var e=h.getSelectedItem();p.setText(e.title,e.description)}function s(){jQuery(h).on(h.events.ITEM_CHANGE,a)}var l,u,d,_,g,c,h,p=this,f=new UGFunctions,m="",v={textpanel_align:"bottom",textpanel_margin:0,textpanel_text_valign:"middle",textpanel_padding_top:10,textpanel_padding_bottom:10,textpanel_height:null,textpanel_padding_title_description:5,textpanel_padding_right:11,textpanel_padding_left:11,textpanel_fade_duration:200,textpanel_enable_title:!0,textpanel_enable_description:!0,textpanel_enable_bg:!0,textpanel_bg_color:"#000000",textpanel_bg_opacity:.4,textpanel_title_color:null,textpanel_title_font_family:null,textpanel_title_text_align:null,textpanel_title_font_size:null,textpanel_title_bold:null,textpanel_css_title:{},textpanel_desc_color:null,textpanel_desc_font_family:null,textpanel_desc_text_align:null,textpanel_desc_font_size:null,textpanel_desc_bold:null,textpanel_css_description:{},textpanel_desc_style_as_title:!1,textpanel_bg_css:{}},b={isFirstTime:!0,setInternalHeight:!0,lastTitleBottom:0,lastDescHeight:0};this.positionElements=function(t){if(!v.textpanel_height||"top"==v.textpanel_text_valign)return e(t),!1;switch(v.textpanel_text_valign){default:case"top":e(!1);break;case"bottom":n();break;case"center":case"middle":i()}},this.init=function(e,t,i){if(h=e,i&&(m=i,t=f.convertCustomPrefixOptions(t,m,"textpanel")),t&&(v=jQuery.extend(v,t)),0==v.textpanel_enable_title&&0==v.textpanel_enable_description)throw new Error("Textpanel Error: The title or description must be enabled");v.textpanel_height&&v.textpanel_height<0&&(v.textpanel_height=null),1==v.textpanel_desc_style_as_title&&(v.textpanel_desc_color||(v.textpanel_desc_color=v.textpanel_title_color),v.textpanel_desc_bold||(v.textpanel_desc_bold=v.textpanel_title_bold),v.textpanel_desc_font_family||(v.textpanel_desc_font_family=v.textpanel_title_font_family),v.textpanel_desc_font_size||(v.textpanel_desc_font_size=v.textpanel_title_font_size),v.textpanel_desc_text_align||(v.textpanel_desc_text_align=v.textpanel_title_text_align))},this.appendHTML=function(e,t){u=e,t=t?" "+t:"";var i="<div class='ug-textpanel"+t+"'>";1==v.textpanel_enable_bg&&(i+="<div class='ug-textpanel-bg"+t+"'></div>"),i+="<div class='ug-textpanel-textwrapper"+t+"'>",1==v.textpanel_enable_title&&(i+="<div class='ug-textpanel-title"+t+"'></div>"),1==v.textpanel_enable_description&&(i+="<div class='ug-textpanel-description"+t+"'></div>"),i+="</div></div>",e.append(i),l=e.children(".ug-textpanel"),c=l.children(".ug-textpanel-textwrapper"),o()},this.destroy=function(){jQuery(h).off(h.events.ITEM_CHANGE)},this.run=function(){p.setSizeByParent(),s()},this.setPanelSize=function(e,t){if(b.setInternalHeight=!0,t)b.setInternalHeight=!1;else var t=80;v.textpanel_height&&(t=v.textpanel_height),l.width(e),l.height(t),g&&(g.width(e),g.height(t));var i=e-v.textpanel_padding_left-v.textpanel_padding_right,n=v.textpanel_padding_left;f.setElementSizeAndPosition(c,n,0,i,t),d&&d.width(i),_&&_.width(i),0==b.isFirstTime&&p.positionElements(!1)},this.setSizeByParent=function(){var e=f.getElementSize(u);p.setPanelSize(e.width)},this.setTextPlain=function(e,t){d&&d.html(e),_&&_.html(t)},this.setText=function(e,t){1==b.isFirstTime?(p.setTextPlain(e,t),b.isFirstTime=!1,p.positionElements(!1)):c.stop().fadeTo(v.textpanel_fade_duration,0,function(){p.setTextPlain(e,t),p.positionElements(!0),jQuery(this).fadeTo(v.textpanel_fade_duration,1)})},this.positionPanel=function(e,t){var i={};if(void 0!==e&&null!==e)i.top=e,i.bottom="auto";else switch(v.textpanel_align){case"top":i.top=v.textpanel_margin+"px";break;case"bottom":i.top="auto",i.bottom=v.textpanel_margin+"px";break;case"middle":i.top=f.getElementRelativePos(l,"middle",v.textpanel_margin)}void 0!==t&&null!==t&&(i.left=t),l.css(i)},this.setOptions=function(e){m&&(e=f.convertCustomPrefixOptions(e,m,"textpanel")),v=jQuery.extend(v,e)},this.getElement=function(){return l},this.getSize=function(){var e=f.getElementSize(l);return e},this.refresh=function(e,t,i,n){o(),i?p.setPanelSize(i,n):p.setSizeByParent(),p.positionElements(!1),t!==!0&&p.positionPanel(),e===!0&&p.show()},this.hide=function(){l.hide()},this.show=function(){l.show()},this.getOptions=function(){return v},this.getOption=function(e){return 0==v.hasOwnProperty(e)?null:v[e]}}function UGZoomButtonsPanel(){function e(e){return e?e.hasClass("ug-zoompanel-button-disabled")?!0:!1:!0}function t(e){e&&e.addClass("ug-zoompanel-button-disabled")}function i(e){e&&e.removeClass("ug-zoompanel-button-disabled")}function n(){if(0==d.isCurrentSlideType("image"))return!0;var n=d.isCurrentSlideImageFit();1==n?0==e(s)&&(t(s),t(l)):1==e(s)&&(i(s),i(l))}var r,o,a,s,l,u=this,d=new UGSlider,_=new UGFunctions,g={slider_zoompanel_skin:""};this.init=function(e,t){d=e,t&&(g=jQuery.extend(g,t))},this.appendHTML=function(e){o=e;var t="<div class='ug-slider-control ug-zoompanel ug-skin-"+g.slider_zoompanel_skin+"'>";t+="<div class='ug-zoompanel-button ug-zoompanel-plus'></div>",t+="<div class='ug-zoompanel-button ug-zoompanel-minus ug-zoompanel-button-disabled'></div>",t+="<div class='ug-zoompanel-button ug-zoompanel-return ug-zoompanel-button-disabled'></div>",t+="</div>",e.append(t),r=e.children(".ug-zoompanel"),a=r.children(".ug-zoompanel-plus"),s=r.children(".ug-zoompanel-minus"),l=r.children(".ug-zoompanel-return")},this.setObjects=function(e,t,i){a=e,s=t,l=i,s&&s.addClass("ug-zoompanel-button-disabled"),l&&l.addClass("ug-zoompanel-button-disabled")},this.getElement=function(){return r},u.initEvents=function(){_.addClassOnHover(a,"ug-button-hover"),_.addClassOnHover(s,"ug-button-hover"),_.addClassOnHover(l,"ug-button-hover"),_.setButtonOnClick(a,function(){return 1==e(a)?!0:void d.zoomIn()}),_.setButtonOnClick(s,function(){return 1==e(s)?!0:void d.zoomOut()}),_.setButtonOnClick(l,function(){return 1==e(l)?!0:void d.zoomBack()}),jQuery(d).on(d.events.ZOOM_CHANGE,n),jQuery(d).on(d.events.ITEM_CHANGED,n)}}function UGBullets(){function e(){var e="",t="";-1!=h.bullets_space_between&&(t=" style='margin-left:"+h.bullets_space_between+"px'");for(var i=0;u>i;i++)e+=0==i?"<div class='ug-bullet'></div>":"<div class='ug-bullet'"+t+"></div>";if(o.html(e),!s){var n=o.find(".ug-bullet:first-child");n.length&&(s=n.width())}}function t(e){if(1==l.isActive(e))return!0;var t=e.index();jQuery(l).trigger(l.events.BULLET_CLICK,t)}function i(){var e=o.children(".ug-bullet");g.setButtonOnClick(e,t),e.on("mousedown mouseup",function(e){return!1})}function n(e){if(0>e||e>=u)throw new Error("wrong bullet index: "+e)}function r(){if(1==c.isInited)return!0;throw new Error("The bullets are not inited!")}var o,a,s,l=this,u=0,d=new UniteGalleryMain,_=-1,g=new UGFunctions,c={isInited:!1},h={bullets_skin:"",bullets_addclass:"",bullets_space_between:-1};this.events={BULLET_CLICK:"bullet_click"},this.init=function(e,t,i){d=e,u=i?i:d.getNumItems(),c.isInited=!0,h=jQuery.extend(h,t),""==h.bullets_skin&&(h.bullets_skin=h.gallery_skin)},this.getBulletsWidth=function(){if(0==u)return 0;if(!s)return 0;var e=u*s+(u-1)*h.bullets_space_between;return e},this.appendHTML=function(t){a=t,r();var n="";""!=h.bullets_addclass&&(n=" "+h.bullets_addclass);var s="<div class='ug-slider-control ug-bullets ug-skin-"+h.bullets_skin+n+"'>";s+="</div>",o=jQuery(s),t.append(o),e(),i()},this.updateNumBullets=function(t){u=t,e(),i()},this.getElement=function(){return o},this.setActive=function(e){r(),n(e);var t=o.children(".ug-bullet");t.removeClass("ug-bullet-active");var i=jQuery(t[e]);i.addClass("ug-bullet-active"),_=e},this.isActive=function(e){if(n(e),"number"!=typeof e)var t=e;else var t=o.children(".ug-bullet")[e];return t.hasClass("ug-bullet-active")?!0:!1},this.getNumBullets=function(){return u}}function UGProgressBar(){var e,t,i=this,n=0,r=new UGFunctions,o={slider_progressbar_color:"#ffffff",slider_progressbar_opacity:.6,slider_progressbar_line_width:5};this.put=function(i,n){n&&(o=jQuery.extend(o,n)),i.append("<div class='ug-progress-bar'><div class='ug-progress-bar-inner'></div></div>"),e=i.children(".ug-progress-bar"),t=e.children(".ug-progress-bar-inner"),t.css("background-color",o.slider_progressbar_color),e.height(o.slider_progressbar_line_width),t.height(o.slider_progressbar_line_width),t.width("0%");var r=o.slider_progressbar_opacity,a=t[0];a.style.opacity=r,a.style.filter="alpha(opacity="+100*r+")"},this.putHidden=function(t,n){i.put(t,n),e.hide()},this.getElement=function(){return e},this.setSize=function(n){e.width(n),t.width(n),i.draw()},this.setPosition=function(t,i,n,o){r.placeElement(e,t,i,n,o)},this.draw=function(){var e=100*n;t.width(e+"%")},this.setProgress=function(e){n=r.normalizePercent(e),i.draw()},this.getType=function(){return"bar"}}function UGProgressPie(){function e(e){if(!e)var e=0;var t=Math.min(a.slider_progresspie_width,a.slider_progresspie_height)/2,n=i[0].getContext("2d");0==r&&(r=!0,n.rotate(1.5*Math.PI),n.translate(-2*t,0)),n.clearRect(0,0,a.slider_progresspie_width,a.slider_progresspie_height);var o=a.slider_progresspie_width/2,s=a.slider_progresspie_height/2,l=0,u=e*Math.PI*2;if(1==a.slider_progresspie_type_fill)n.beginPath(),n.moveTo(o,s),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath();else{n.globalCompositeOperation="source-over",n.beginPath(),n.moveTo(o,s),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath(),n.globalCompositeOperation="destination-out";var d=t-a.slider_progresspie_stroke_width;n.beginPath(),n.moveTo(o,s),n.arc(o,s,d,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath()}1==a.slider_progresspie_type_fill&&(l=u,u=2*Math.PI,n.beginPath(),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color2,n.fill(),n.closePath())}var t,i,n=this,r=!1,o=new UGFunctions,a={slider_progresspie_type_fill:!1,slider_progresspie_color1:"#B5B5B5",slider_progresspie_color2:"#E5E5E5",slider_progresspie_stroke_width:6,slider_progresspie_width:30,slider_progresspie_height:30};this.put=function(e,t){t&&(a=jQuery.extend(a,t)),e.append("<canvas class='ug-canvas-pie' width='"+a.slider_progresspie_width+"' height='"+a.slider_progresspie_height+"'></canvas>"),i=e.children(".ug-canvas-pie")},this.putHidden=function(t,r){n.put(t,r),e(.1),i.hide()},this.getElement=function(){return i},this.setPosition=function(e,t){o.placeElement(i,e,t)},this.getSize=function(){var e={width:a.slider_progresspie_width,height:a.slider_progresspie_height};return e},this.setProgress=function(i){i=o.normalizePercent(i),t=i,e(i)},this.getType=function(){return"pie"}}function UGTouchSliderControl(){function e(e){if(!e)var e=m.getSlidesReference();var t=v.getElementSize(e.objCurrentSlide),i=-t.left,n=v.getElementSize(h),r=i-n.left;return r}function t(){var t=m.getSlidesReference(),i=e(t),n=Math.round(3*t.objCurrentSlide.width()/8);if(Math.abs(i)>=n)return!0;var r=Math.abs(b.lastMouseX-b.startMouseX);Math.abs(b.lastMouseY-b.startMouseY);if(20>r)return!1;var o=jQuery.now(),a=o-b.startTime;return 500>a?!0:!1}function i(e){if(1==m.isInnerInPlace())return!1;if(p.trigger(m.events.BEFORE_RETURN),!e)var e=m.getSlidesReference();var t=v.getElementSize(e.objCurrentSlide),i=-t.left;h.animate({left:i+"px"},{duration:f.slider_transition_return_speed,easing:f.slider_transition_continuedrag_easing,queue:!1,progress:function(e,t,n){if(1==b.isDragVideo){var r=v.getElementSize(h),o=r.left,a=o-i,s=b.videoStartX+a;b.videoObject.css("left",s)}},complete:function(){p.trigger(m.events.AFTER_RETURN)}})}function n(e){m.getVideoObject().hide(),m.switchSlideNums(e),m.placeNabourItems()}function r(){var t=m.getSlidesReference(),r=e(t);if(0==r)return!1;var o=r>0?"left":"right",a=!1;switch(o){case"right":if(m.isSlideHasItem(t.objPrevSlide))var s=v.getElementSize(t.objPrevSlide),l=-s.left;else a=!0;break;case"left":if(m.isSlideHasItem(t.objNextSlide))var u=v.getElementSize(t.objNextSlide),l=-u.left;else a=!0}1==a?i(t):h.stop().animate({left:l+"px"},{duration:f.slider_transition_continuedrag_speed,easing:f.slider_transition_continuedrag_easing,queue:!1,progress:function(){if(1==b.isDragVideo){var e=v.getElementSize(h),t=e.left,i=t-b.startPosx,n=b.videoStartX+i;b.videoObject.css("left",n)}},always:function(){n(o),p.trigger(m.events.AFTER_DRAG_CHANGE)}})}function o(e){var t=b.lastMouseX-b.startMouseX;if(0==t)return!0;var i=0>t?"left":"right",n=m.getObjZoom();if(n){var r=n.isPanEnabled(e,i);if(1==r)return b.isInitDataValid=!1,!0;if(0==b.isInitDataValid)return a(e),!0}var o=b.startPosx+t;if(t>0&&o>0)o/=3;else if(0>t){var s=o+h.width(),l=c.width();l>s&&(o=b.startPosx+t/3)}if(0==b.isDragging&&(b.isDragging=!0,p.trigger(m.events.START_DRAG)),h.css("left",o+"px"),1==b.isDragVideo){var u=o-b.startPosx,d=b.videoStartX+u;b.videoObject.css("left",d)}}function a(e){var t=v.getMousePosition(e);b.startMouseX=t.pageX,b.startMouseY=t.pageY,b.lastMouseX=b.startMouseX,b.lastMouseY=b.startMouseY,b.startTime=jQuery.now();var i=v.getArrTouches(e);b.startArrTouches=v.getArrTouchPositions(i);var n=v.getElementSize(h);b.startPosx=n.left,b.isInitDataValid=!0,b.isDragVideo=!1,v.storeEventData(e,b.storedEventID)}function s(e){b.touch_active=!1}function l(e,t){b.touch_active=!0,a(t)}function u(e){e.preventDefault(),b.isDragging=!1,1==m.isAnimating()&&h.stop(!0,!0);var t=v.getArrTouches(e);return t.length>1?(1==b.touch_active&&s("1"),!0):1==b.touch_active?!0:void l("1",e)}function d(e){if(0==b.touch_active)return!0;if(0==e.buttons)return s("2"),r(),!0;v.updateStoredEventData(e,b.storedEventID),e.preventDefault();var t=v.getMousePosition(e);b.lastMouseX=t.pageX,b.lastMouseY=t.pageY;var i=null;1==f.slider_vertical_scroll_ondrag&&(i=v.handleScrollTop(b.storedEventID)),"vert"!==i&&o(e)}function _(e){var n=v.getArrTouches(e),o=n.length,a=m.isInnerInPlace();if(1==a&&0==b.touch_active&&0==o)return!0;if(0==o&&1==b.touch_active){s("3");var u=!1,d=v.wasVerticalScroll(b.storedEventID);0==d&&(u=t()),1==u?r():i()}else 1==o&&0==b.touch_active&&l("2",e)}function g(){c.bind("mousedown touchstart",u),jQuery("body").bind("mousemove touchmove",d),jQuery(window).add("body").bind("mouseup touchend",_)}var c,h,p,f,m=new UGSlider,v=new UGFunctions,f={slider_transition_continuedrag_speed:250,slider_transition_continuedrag_easing:"linear",slider_transition_return_speed:300,slider_transition_return_easing:"easeInOutQuad"},b={touch_active:!1,startMouseX:0,startMouseY:0,lastMouseX:0,lastMouseY:0,startPosx:0,startTime:0,isInitDataValid:!1,slides:null,lastNumTouches:0,isDragging:!1,storedEventID:"touchSlider",videoStartX:0,isDragVideo:!1,videoObject:null};this.isTapEventOccured=function(t){var i=v.getArrTouches(t),n=i.length;if(0!=n||0!=b.lastNumTouches)return b.lastNumTouches=n,!1;b.lastNumTouches=n;var r=m.getSlidesReference(),o=(e(r),Math.abs(b.lastMouseX-b.startMouseX)),a=Math.abs(b.lastMouseY-b.startMouseY),s=jQuery.now(),l=s-b.startTime;return 20>o&&50>a&&500>l?!0:!1},this.init=function(e,t){m=e,p=jQuery(m),g_objects=e.getObjects(),c=g_objects.g_objSlider,h=g_objects.g_objInner,f=jQuery.extend(f,t),g()},this.getLastMousePos=function(){var e={pageX:b.lastMouseX,pageY:b.lastMouseY};return e},this.isTouchActive=function(){return b.touch_active}}function UGZoomSliderControl(){function e(e,t){E=e,w=jQuery(E),g_objects=e.getObjects(),y=g_objects.g_objSlider,I=g_objects.g_objInner,S=jQuery.extend(S,t),b()}function t(){var e=E.getScaleMode();return"down"!=e&&(e="fit"),e}function i(){var e=jQuery.now(),i=e-P.storeImageLastTime;if(20>i)return!1;var n=E.getSlidesReference();if(P.objSlide=n.objCurrentSlide,P.objImage=n.objCurrentSlide.find("img"),0==P.objImage.length)return!1;P.objImageSize=T.getElementSize(P.objImage),P.objParent=P.objImage.parent(),P.objParentSize=T.getElementSize(P.objParent);var r=t();objPadding=E.getObjImagePadding(),P.objFitImageSize=T.getImageInsideParentDataByImage(P.objImage,r,objPadding);var e=jQuery.now();return P.storeImageLastTime=e,!0}function n(e,i){var n=E.getSlidesReference(),r=n.objCurrentSlide.find("img"),o=t();w.trigger(E.events.ZOOM_START);var a=!0,s=E.getObjImagePadding();if("back"==e){var l=T.getImageOriginalSize(r);T.scaleImageFitParent(r,l.width,l.height,o,s)}else{var u="in"==e?!0:!1;a=T.zoomImageInsideParent(r,u,S.slider_zoom_step,i,o,S.slider_zoom_max_ratio,s)}1==a&&(w.trigger(E.events.ZOOMING),w.trigger(E.events.ZOOM_CHANGE),w.trigger(E.events.ZOOM_END))}function r(e,t,i){var n=T.getArrTouches(t);if(i===!0){if(1!=n.length)return!1}else if(n.length>1)return!1;return T.isElementBiggerThenParent(e)?!0:!1}function o(e){var t=T.getMousePosition(e);P.startMouseX=t.pageX,P.startMouseY=t.pageY,P.lastMouseX=P.startMouseX,P.lastMouseY=P.startMouseY,P.startImageX=P.objImageSize.left,P.startImageY=P.objImageSize.top,P.panXActive=P.objImageSize.width>P.objParentSize.width,
P.panYActive=P.objImageSize.height>P.objParentSize.height}function a(e){P.isPanActive=!0,o(e)}function s(e){if(void 0==P.objImage||0==P.objImage.length)return!0;var t=T.getMousePosition(e),i=(t.pageX-P.startMouseX,t.pageY-P.startMouseY,t.pageX-P.lastMouseX),n=t.pageY-P.lastMouseY,r=0>i?"left":"right",o=0>n?"up":"down";P.lastMouseX=t.pageX,P.lastMouseY=t.pageY;var a=T.getElementSize(P.objImage);0==P.panYActive?n=0:"down"==o&&a.top>0?n/=3:"up"==o&&a.bottom<P.objParentSize.height&&(n/=3),0==P.panXActive||0==E.isInnerInPlace()?i=0:"right"==r&&a.left>0?i/=3:"left"==r&&a.right<P.objParentSize.width&&(i/=3);var s=a.left+i,l=a.top+n;T.placeElement(P.objImage,s,l)}function l(){var e=!1,t=!1,i=0,n=0,r=T.getElementSize(P.objImage),o=E.getObjImagePadding(),a=T.getElementCenterPosition(P.objImage,o);P.panXActive=P.objImageSize.width>P.objParentSize.width,P.panYActive=P.objImageSize.height>P.objParentSize.height,1==P.panYActive?r.top>0?(n=0,t=!0):r.bottom<P.objParentSize.height&&(n=P.objParentSize.height-r.height,t=!0):r.top!=a.top&&(t=!0,n=a.top),1==P.panXActive?r.left>0?(i=0,e=!0):r.right<P.objParentSize.width&&(i=P.objParentSize.width-r.width,e=!0):r.left!=a.left&&(e=!0,i=a.left);var s={};1==t&&(s.top=n+"px"),1==e&&(s.left=i+"px"),(1==t||1==e)&&P.objImage.animate(s,{duration:S.slider_zoom_return_pan_duration,easing:S.slider_zoom_return_pan_easing,queue:!1})}function u(){return P.objImage&&P.objImage.is(":animated")?!0:!1}function d(e){P.isZoomActive=!0,P.startDistance=T.getDistance(e[0].pageX,e[0].pageY,e[1].pageX,e[1].pageY),0==P.startDistance&&(P.startDistance=1),P.startMiddlePoint=T.getMiddlePoint(e[0].pageX,e[0].pageY,e[1].pageX,e[1].pageY),P.objImageSize=T.getElementSize(P.objImage),P.startImageX=P.objImageSize.left,P.startImageY=P.objImageSize.top,P.imageOrientPoint=T.getElementLocalPoint(P.startMiddlePoint,P.objImage);var t=T.isPointInsideElement(P.imageOrientPoint,P.objImageSize);0==t&&(P.imageOrientPoint=T.getElementCenterPoint(P.objImage)),w.trigger(E.events.ZOOM_START)}function _(e){if(0==P.isZoomActive)return!1;var t=T.getArrTouches(e);2!=t.length&&(P.isZoomActive=!1,w.trigger(E.events.ZOOM_END))}function g(e){if(1==P.isZoomActive)return!0;var t=T.getArrTouches(e);return 2!=t.length?!0:void d(t)}function c(e){var t=T.getArrTouches(e),i=T.getDistance(t[0].pageX,t[0].pageY,t[1].pageX,t[1].pageY),n=i/P.startDistance,r=T.getMiddlePoint(t[0].pageX,t[0].pageY,t[1].pageX,t[1].pageY),o=P.objImageSize.width*n,a=P.objImageSize.height*n,s=T.getImageOriginalSize(P.objImage),l=1;if(s.width>0&&(l=o/s.width),l>S.slider_zoom_max_ratio)return!0;panX=-(P.imageOrientPoint.x*n-P.imageOrientPoint.x),panY=-(P.imageOrientPoint.y*n-P.imageOrientPoint.y);var u=r.x-P.startMiddlePoint.x,d=r.y-P.startMiddlePoint.y,_=P.startImageX+panX+u,g=P.startImageY+panY+d;T.setElementSizeAndPosition(P.objImage,_,g,o,a),w.trigger(E.events.ZOOMING),w.trigger(E.events.ZOOM_CHANGE)}function h(){if(void 0==P.objImage||0==P.objImage.length)return!0;var e=T.getElementSize(P.objImage);if(e.width<P.objFitImageSize.imageWidth){P.objImage.css({position:"absolute",margin:"none"});var t={top:P.objFitImageSize.imageTop+"px",left:P.objFitImageSize.imageLeft+"px",width:P.objFitImageSize.imageWidth+"px",height:P.objFitImageSize.imageHeight+"px"};P.objImage.animate(t,{duration:S.slider_zoom_return_pan_duration,easing:S.slider_zoom_return_pan_easing,queue:!1})}else l()}function p(e){if(0==E.isCurrentSlideType("image"))return!0;i();return void 0==P.objImage||0==P.objImage.length?!0:(e.preventDefault(),1==u()&&P.objImage.stop(!0),1==P.isZoomActive?_(e):g(e),void(1==P.isZoomActive?P.isPanActive=!1:1==r(P.objImage,e)&&1==P.isZoomedOnce&&a(e)))}function f(e){if(0==E.isCurrentSlideType("image"))return!0;var t=jQuery(e.target);if(1==t.data("ug-button"))return!1;i();if(void 0==P.objImage||0==P.objImage.length)return!0;var n=P.isPanActive,o=P.isZoomActive;if(0==E.isInnerInPlace())return P.isZoomActive=!1,P.isPanActive=!1,!0;if(1==P.isZoomActive?_(e):g(e),1==P.isZoomActive)P.isPanActive=!1;else{var s=r(P.objImage,e,!0);1==P.isPanActive?P.isPanActive=!1:1==s&&a(e)}(n||o)&&0==P.isZoomActive&&0==P.isPanActive&&h()}function m(e){return 0==E.isCurrentSlideType("image")?!0:void(1==P.isZoomActive?c(e):1==P.isPanActive&&s(e))}function v(e,t,i,r){if(0==S.slider_zoom_mousewheel)return!0;if(0==E.isCurrentSlideType("image"))return!0;e.preventDefault();var o=t>0,a=T.getMousePosition(e),s=1==o?"in":"out";n(s,a)}function b(){y.on("mousewheel",v),y.bind("mousedown touchstart",p),jQuery("body").bind("mousemove touchmove",m),jQuery(window).add("body").bind("mouseup touchend",f),w.bind(E.events.BEFORE_RETURN,function(){h()}),w.bind(E.events.ITEM_CHANGED,function(){P.isZoomedOnce=!1}),w.bind(E.events.ZOOM_CHANGE,function(){P.isZoomedOnce=!0})}var y,I,w,E=new UGSlider,T=new UGFunctions,S={slider_zoom_step:1.2,slider_zoom_max_ratio:6,slider_zoom_return_pan_duration:400,slider_zoom_return_pan_easing:"easeOutCubic"},P={isPanActive:!1,startMouseX:0,startMouseY:0,lastMouseX:0,lastMouseY:0,startImageX:0,startImageY:0,panXActive:!1,panYActive:!1,objImage:null,objImageSize:null,objParent:null,objParentSize:null,objSlide:null,storeImageLastTime:0,isZoomActive:!1,startDistance:0,startMiddlePoint:null,imageOrientPoint:null,objFitImageSize:null,isZoomedOnce:!1};this.________EXTERNAL_____________=function(){},this.isPanEnabled=function(e,t){if(i(),void 0==P.objImage||0==P.objImage.length)return!1;if(0==P.isZoomedOnce)return!1;if(0==r(P.objImage,e))return!1;if(0==E.isInnerInPlace())return!1;if("left"==t){if(P.objImageSize.right<=P.objParentSize.width)return!1}else if(P.objImageSize.left>=0)return!1;return!0},this.init=function(t,i){e(t,i)},this.zoomIn=function(){n("in")},this.zoomOut=function(){n("out")},this.zoomBack=function(){n("back")}}function UGWistiaAPI(){function e(){return"undefined"!=typeof Wistia}function t(e,t,n,o,a){r=null,s=!1;var l=e+"_video",u="<div id='"+l+"' class='wistia_embed' style='width:"+n+";height:"+o+";' data-video-width='"+n+"' data-video-height='"+o+"'>&nbsp;</div>";jQuery("#"+e).html(u),r=Wistia.embed(t,{version:"v1",videoWidth:n,videoHeight:o,container:l,autoPlay:a}),s=!0,i()}function i(){r.bind("play",function(){a.trigger(o.events.START_PLAYING)}),r.bind("pause",function(){a.trigger(o.events.STOP_PLAYING)}),r.bind("end",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this),s=!1;this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugWistiaAPI.isAPILoaded?!0:e()?(g_ugWistiaAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("fast.wistia.com/assets/external/E-v1.js",!0),void(g_ugWistiaAPI.isAPILoaded=!0))},this.doCommand=function(e){if(null==r)return!1;if(0==s)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.isPlayerReady=function(){return s&&r?!0:!1}}function UGSoundCloudAPI(){function e(){return"undefined"!=typeof SC}function t(e,t,n,a,s){r=null,g_isPlayerReady=!1;var l=e+"_iframe",u=location.protocol+"//w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/"+t;u+="&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=true&show_comments=false&amp;show_playcount=true&amp;show_user=false&amp;hide_related=true&amp;visual=true&amp;start_track=0&amp;callback=true",u+=s===!0?"&amp;auto_play=true":"&amp;auto_play=false";var d="<iframe id='"+l+"' src="+u+" width='"+n+"' height='"+a+"' frameborder='0' scrolling='no' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";jQuery("#"+e).html(d),r=SC.Widget(l),r.bind(SC.Widget.Events.READY,function(){r&&(g_isPlayerReady=!0,i())}),o=e}function i(){r.bind(SC.Widget.Events.PLAY,function(){s.trigger(a.events.START_PLAYING)}),r.bind(SC.Widget.Events.PAUSE,function(){s.trigger(a.events.STOP_PLAYING)}),r.bind(SC.Widget.Events.FINISH,function(){s.trigger(a.events.STOP_PLAYING),s.trigger(a.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o,a=this,s=jQuery(this);this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugSoundCloudAPI.isAPILoaded?!0:e()?(g_ugSoundCloudAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("w.soundcloud.com/player/api.js",!0),void(g_ugSoundCloudAPI.isAPILoaded=!0))},this.putSound=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.doCommand=function(e){if(null==r)return!1;if(0==g_isPlayerReady)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){a.doCommand("pause")},this.play=function(){a.doCommand("play")},this.destroy=function(){g_isPlayerReady=!1,r=null,o&&(jQuery("#"+o).html(""),o=null)}}function UGHtml5MediaAPI(){function e(){return"undefined"!=typeof mejs}function t(e,t,n,o,a){r=null,g_isPlayerReady=!1;var s=location.protocol+"//cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/flashmediaelement-cdn.swf",l=location.protocol+"//cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/silverlightmediaelement.xap",u=e+"_video",d="";a&&a===!0&&(d="autoplay='autoplay'");var _="";t.posterImage&&(_="poster='"+t.posterImage+"'");var g="<video id='"+u+"' width='"+n+"' height='"+o+"'  controls='controls' preload='none' "+d+" "+_+">";""!=t.mp4&&(g+="<source type='video/mp4' src='"+t.mp4+"' />"),""!=t.webm&&(g+="<source type='video/webm' src='"+t.webm+"' />"),""!=t.ogv&&(g+="<source type='video/ogg' src='"+t.ogv+"' />"),g+="<object width='"+n+"' height='"+o+"' type='application/x-shockwave-flash' data='"+s+"'>",g+="<param name='movie' value='"+s+"' />",g+="<param name='flashvars' value='controls=true&file="+t.mp4+"' />",g+="</object>",g+="</video>",jQuery("#"+e).html(g),new MediaElement(u,{enablePluginDebug:!1,flashName:s,silverlightName:l,success:function(e,t){g_isPlayerReady=!0,r=e,0==a&&r.pause(),i()},error:function(e){trace(e)}})}function i(){g_ugFunctions.addEvent(r,"play",function(){a.trigger(o.events.START_PLAYING)}),g_ugFunctions.addEvent(r,"pause",function(){a.trigger(o.events.STOP_PLAYING)}),g_ugFunctions.addEvent(r,"ended",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this);this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugHtml5MediaAPI.isAPILoaded?!0:e()?(g_ugHtml5MediaAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/mediaelement.min.js",!0),g_ugFunctions.loadCss("cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/mediaelementplayer.min.css",!0),void(g_ugHtml5MediaAPI.isAPILoaded=!0))},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.doCommand=function(e){if(null==r)return!1;if(0==g_isPlayerReady)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")}}function UGVimeoAPI(){function e(){return"undefined"!=typeof Froogaloop}function t(e,t,n,o,a){s=null,l=!1;var u=location.protocol+"//player.vimeo.com/video/"+t+"?api=1";a===!0&&(u+="&amp;byline=0&amp;autoplay=1&amp;title=0&amp;portrait=0");var d="<iframe src="+u+" width='"+n+"' height='"+o+"' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";jQuery("#"+e).html(d);var _=jQuery("#"+e+" iframe")[0];s=Froogaloop(_),s.addEvent("ready",function(){s&&(l=!0,i())}),r=e}function i(){return s?(s.addEvent("cuechange",function(){1==u&&o.play()}),s.addEvent("play",function(){a.trigger(o.events.START_PLAYING)}),s.addEvent("pause",function(){a.trigger(o.events.STOP_PLAYING)}),void s.addEvent("finish",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})):!1}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this),s=null,l=!1,u=!1;this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugVimeoAPI.isAPILoaded?!0:e()?(g_ugVimeoAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("f.vimeocdn.com/js/froogaloop2.min.js",!0),void(g_ugVimeoAPI.isAPILoaded=!0))},this.doCommand=function(e){if(null==s)return!1;if(0==l)return!1;switch(e){default:s.api(e)}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")},this.destroy=function(){s&&(s.api("unload"),s=null,l=!1),r&&jQuery("#"+r).html("")},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.isPlayerReady=function(){return l&&s?!0:!1},this.changeVideo=function(e,t){return 0==o.isPlayerReady()?!1:(u=t,void s.api("loadVideo",e))},this.getVideoImages=function(e,t,i){var n=location.protocol+"//vimeo.com/api/v2/video/"+e+".json";jQuery.get(n,{},function(e){var n={};n.preview=e[0].thumbnail_large,n.thumb=e[0].thumbnail_medium,i(t,n)})}}function UGYoutubeAPI(){function e(e,t,r,a,u){s&&l&&s.destroy();var d={controls:2,showinfo:_.video_youtube_showinfo,rel:0};u===!0&&(d.autoplay=1),l=!1,s=new YT.Player(e,{height:a,width:r,videoId:t,playerVars:d,events:{onReady:i,onStateChange:n}}),o=e}function t(){return"undefined"!=typeof YT&&"undefined"!=typeof YT.Player?!0:!1}function i(){l=!0}function n(){if("function"!=typeof s.getPlayerState)return trace("Youtube API error: can't get player state"),!1;var e=s.getPlayerState();switch(e){case YT.PlayerState.PLAYING:u.trigger(a.events.START_PLAYING);break;case YT.PlayerState.ENDED:u.trigger(a.events.STOP_PLAYING),u.trigger(a.events.VIDEO_ENDED);break;default:d==YT.PlayerState.PLAYING&&u.trigger(a.events.STOP_PLAYING)}d=e}this.isAPILoaded=!1;var r,o,a=this,s=null,l=!1,u=jQuery(this),d=-1,_={video_youtube_showinfo:!0};this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.setOptions=function(e){_=jQuery.extend(_,e)},this.putVideo=function(i,n,o,a,s){return t()?(e(i,n,o,a,s),!0):(this.loadAPI(),void(r=setInterval(function(){t()&&(e(i,n,o,a,s),clearInterval(r))},500)))},this.loadAPI=function(){return 1==g_ugYoutubeAPI.isAPILoaded?!0:"undefined"!=typeof YT?(g_ugYoutubeAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("https://www.youtube.com/player_api",!1),void(g_ugYoutubeAPI.isAPILoaded=!0))},this.doCommand=function(e,t){if(!s)return!0;if(0==l)return!1;switch(e){case"play":if("function"!=typeof s.playVideo)return!1;s.playVideo();break;case"pause":if("function"!=typeof s.pauseVideo)return!1;s.pauseVideo();break;case"seek":if("function"!=typeof s.seekTo)return!1;s.seekTo(t);break;case"stopToBeginning":var i=s.getPlayerState();switch(s.pauseVideo(),i){case YT.PlayerState.PLAYING:case YT.PlayerState.ENDED:case YT.PlayerState.PAUSED:s.seekTo(0)}}},this.play=function(){a.doCommand("play")},this.pause=function(){a.doCommand("pause")},this.destroy=function(){try{s&&(l=!1,s.clearVideo(),s.destroy())}catch(e){jQuery("#"+o).html("")}},this.stopToBeginning=function(){a.doCommand("stopToBeginning")},this.changeVideo=function(e,t){return 0==a.isPlayerReady()?!1:void(t&&1==t?s.loadVideoById(e,0,"large"):s.cueVideoById(e,0,"large"))},this.isPlayerReady=function(){return l&&s?!0:!1},this.getVideoImages=function(e){var t={};return t.preview="https://i.ytimg.com/vi/"+e+"/sddefault.jpg",t.thumb="https://i.ytimg.com/vi/"+e+"/default.jpg",t}}function UGVideoPlayer(){function e(){h.hide()}function t(){p.trigger(h.events.PLAY_START),_&&_.hide()}function i(){p.trigger(h.events.PLAY_STOP),_&&_.show()}function n(){p.trigger(h.events.VIDEO_ENDED)}function r(){_&&(f.setButtonMobileReady(_),f.setButtonOnClick(_,e)),jQuery(m).on(m.events.START_PLAYING,t),jQuery(m).on(m.events.STOP_PLAYING,i),jQuery(m).on(m.events.VIDEO_ENDED,n),jQuery(v).on(v.events.START_PLAYING,t),jQuery(v).on(v.events.STOP_PLAYING,i),jQuery(v).on(v.events.VIDEO_ENDED,n),jQuery(b).on(b.events.START_PLAYING,t),jQuery(b).on(b.events.STOP_PLAYING,i),jQuery(b).on(b.events.VIDEO_ENDED,n),jQuery(y).on(y.events.START_PLAYING,t),jQuery(y).on(y.events.STOP_PLAYING,i),jQuery(y).on(y.events.VIDEO_ENDED,n),jQuery(I).on(I.events.START_PLAYING,t),jQuery(I).on(I.events.STOP_PLAYING,i),jQuery(I).on(I.events.VIDEO_ENDED,n)}function o(e){var t=["youtube","vimeo","html5","soundcloud","wistia"];for(var i in t){var n=t[i];if(n!=e)switch(n){case"youtube":m.pause(),m.destroy(),l.hide();break;case"vimeo":v.pause(),v.destroy(),u.hide();break;case"html5":b.pause(),d.hide();break;case"soundcloud":y.pause(),y.destroy(),g.hide();break;case"wistia":I.pause(),c.hide()}}}var a,s,l,u,d,_,g,c,h=this,p=jQuery(this),f=new UGFunctions,m=new UGYoutubeAPI,v=new UGVimeoAPI,b=new UGHtml5MediaAPI,y=new UGSoundCloudAPI,I=new UGWistiaAPI,w=null,E={video_enable_closebutton:!0};this.events={SHOW:"video_show",HIDE:"video_hide",PLAY_START:"video_play_start",PLAY_STOP:"video_play_stop",VIDEO_ENDED:"video_ended"};var T={standAloneMode:!1,youtubeInnerID:"",vimeoPlayerID:"",html5PlayerID:"",wistiaPlayerID:"",soundCloudPlayerID:""};this.init=function(e,t,i){if(a=i,!a)throw new Error("missing gallery ID for video player, it's a must!");E=jQuery.extend(E,e),m.setOptions(E),t&&1==t&&(T.standAloneMode=!0)},this.setHtml=function(e){T.youtubeInnerID=a+"_youtube_inner",T.vimeoPlayerID=a+"_videoplayer_vimeo",T.html5PlayerID=a+"_videoplayer_html5",T.wistiaPlayerID=a+"_videoplayer_wistia",T.soundCloudPlayerID=a+"_videoplayer_soundcloud";var t="<div class='ug-videoplayer' style='display:none'>";t+="<div class='ug-videoplayer-wrapper ug-videoplayer-youtube' style='display:none'><div id='"+T.youtubeInnerID+"'></div></div>",t+="<div id='"+T.vimeoPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-vimeo' style='display:none'></div>",t+="<div id='"+T.html5PlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-html5'></div>",t+="<div id='"+T.soundCloudPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-soundcloud'></div>",t+="<div id='"+T.wistiaPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-wistia'></div>",0==T.standAloneMode&&1==E.video_enable_closebutton&&(t+="<div class='ug-videoplayer-button-close'></div>"),t+="</div>",e.append(t),s=e.children(".ug-videoplayer"),l=s.children(".ug-videoplayer-youtube"),u=s.children(".ug-videoplayer-vimeo"),d=s.children(".ug-videoplayer-html5"),g=s.children(".ug-videoplayer-soundcloud"),c=s.children(".ug-videoplayer-wistia"),0==T.standAloneMode&&1==E.video_enable_closebutton&&(_=s.children(".ug-videoplayer-button-close"))},this.destroy=function(){_&&(_.off("click"),_.off("touchend")),jQuery(m).off(m.events.START_PLAYING),jQuery(m).off(m.events.STOP_PLAYING),jQuery(v).off(v.events.START_PLAYING),jQuery(v).off(v.events.STOP_PLAYING),jQuery(b).off(b.events.START_PLAYING),jQuery(b).off(b.events.STOP_PLAYING),jQuery(y).off(y.events.START_PLAYING,t),jQuery(y).off(y.events.STOP_PLAYING,i),jQuery(I).off(I.events.START_PLAYING,t),jQuery(I).off(I.events.STOP_PLAYING,i),w=null},this.initEvents=function(){r()},this.setSize=function(e,t){f.setElementSize(s,e,t),_&&f.placeElement(_,"right","top")},this.setPosition=function(e,t){f.placeElement(s,e,t)},this.getObject=function(){return s},this.show=function(){return 1==h.isVisible()?!0:(s.show(),s.fadeTo(0,1),_&&_.show(),void p.trigger(h.events.SHOW))},this.hide=function(){return 0==h.isVisible()?!0:(o(),w=null,s.hide(),void p.trigger(h.events.HIDE))},this.getActiveAPI=function(){switch(w){case"youtube":return m;case"vimeo":return v;case"wistia":return I;case"soundcloud":return y;case"html5":return b;default:return null}},this.pause=function(){var e=h.getActiveAPI();return null==e?!1:void("function"==typeof e.pause&&e.pause())},this.isVisible=function(){return s.is(":visible")},this.playYoutube=function(e,t){if("undefined"==typeof t)var t=!0;o("youtube"),l.show();var i=l.children("#"+T.youtubeInnerID);0==i.length&&l.append("<div id='"+T.youtubeInnerID+"'></div>"),1==m.isPlayerReady()&&1==T.standAloneMode?m.changeVideo(e,t):m.putVideo(T.youtubeInnerID,e,"100%","100%",t),w="youtube"},this.playVimeo=function(e,t){if("undefined"==typeof t)var t=!0;o("vimeo"),u.show(),v.putVideo(T.vimeoPlayerID,e,"100%","100%",t),w="vimeo"},this.playHtml5Video=function(e,t,i,n,r){if("undefined"==typeof r)var r=!0;o("html5"),d.show();var a={ogv:e,webm:t,mp4:i,posterImage:n};b.putVideo(T.html5PlayerID,a,"100%","100%",r),w="html5"},this.playSoundCloud=function(e,t){if("undefined"==typeof t)var t=!0;o("soundcloud"),g.show(),y.putSound(T.soundCloudPlayerID,e,"100%","100%",t),w="soundcloud"},this.playWistia=function(e,t){if("undefined"==typeof t)var t=!0;o("wistia"),c.show(),I.putVideo(T.wistiaPlayerID,e,"100%","100%",t),w="wistia"}}function ugCheckForMinJQueryVersion(){var e=g_ugFunctions.checkMinJqueryVersion("1.8.0");if(0==e)throw new Error("The gallery can run from jquery 1.8 You have jQuery "+jQuery.fn.jquery+" Please update your jQuery library.")}function ugCheckForErrors(e,t){function i(){if("undefined"==typeof jQuery)throw new Error("jQuery library not included")}function n(){if("function"==typeof jQuery.fn.unitegallery)return!0;var e="You have some jquery.js library include that comes after the gallery files js include.";throw e+="<br> This include eliminates the gallery libraries, and make it not work.","cms"==t?(e+="<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Gallery Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.",e+="<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it."):e+="<br><br> Please find and remove this jquery.js include and the gallery will work. <br> * There should be only one jquery.js include before all other js includes in the page.",new Error(e)}try{"jquery"==t?(i(),ugCheckForMinJQueryVersion()):(ugCheckForMinJQueryVersion(),n())}catch(r){var o=r.message;if(o="Unite Gallery Error: "+o,o="<div style='font-size:16px;color:#BC0C06;max-width:900px;border:1px solid red;padding:10px;'>"+o+"</div>","jquery"==t){var a=document.getElementById(e);a.innerHTML=o,a.style.display="block"}else jQuery(e).show().html(o);return!1}return!0}function UniteGalleryMain(){function __________INIT_GALLERY_______(){}function getThemeFunction(e){var t=e;return-1==t.indexOf("UGTheme_")&&(t="UGTheme_"+t),t}function initTheme(objCustomOptions){if(objCustomOptions.hasOwnProperty("gallery_theme"))g_options.gallery_theme=objCustomOptions.gallery_theme;else{var defaultTheme=g_options.gallery_theme;0==g_ugFunctions.isThemeRegistered(defaultTheme)&&(g_options.gallery_theme=g_ugFunctions.getFirstRegisteredTheme())}var themeFunction=getThemeFunction(g_options.gallery_theme);try{g_options.gallery_theme=eval(themeFunction)}catch(e){}g_options.gallery_theme=eval(themeFunction),g_objTheme=new g_options.gallery_theme,g_objTheme.init(t,objCustomOptions)}function resetOptions(){g_options=jQuery.extend({},g_temp.originalOptions),g_selectedItemIndex=-1,g_selectedItem=null,g_objSlider=void 0,g_objThumbs=void 0,g_objSlider=void 0}function checkForStartupErrors(){try{ugCheckForMinJQueryVersion()}catch(e){throwErrorShowMessage(e.message)}"object"==typeof g_objWrapper.outerWidth()&&throwErrorShowMessage("You have some buggy script. most chances jquery-ui.js that destroy jquery outerWidth, outerHeight functions. The gallery can't run. Please update jquery-ui.js to latest version."),setTimeout(function(){ugCheckForErrors(g_galleryID,"cms")},5e3)}function runGallery(e,i,n,r){var o="object"==typeof i;if(o&&(g_temp.objCustomOptions=i),1==g_temp.isRunFirstTime){if(g_galleryID=e,g_objWrapper=jQuery(g_galleryID),0==g_objWrapper.length)return trace("div with id: "+g_galleryID+" not found"),!1;g_objParent=g_objWrapper.parent(),checkForStartupErrors(),g_temp.originalOptions=jQuery.extend({},g_options),o&&(g_options=jQuery.extend(g_options,i)),1==g_options.gallery_enable_cache&&g_options.gallery_initial_catid&&cacheItems(g_options.gallery_initial_catid),t.setSizeClass();var a=g_objWrapper.children();fillItemsArray(a),loadAPIs(),g_objWrapper.find("img").fadeTo(0,0).hide(),g_objWrapper.show(),clearInitData()}else if(t.destroy(),resetOptions(),g_options=jQuery.extend(g_options,g_temp.objCustomOptions),n){if(r&&1==g_options.gallery_enable_cache&&cacheItems(r,n),"noitems"==n)return showErrorMessage("No items in this category",""),!1;g_objWrapper.html(n);var a=g_objWrapper.children();fillItemsArray(a),loadAPIs(),g_objWrapper.children().fadeTo(0,0).hide(),g_objWrapper.show(),clearInitData()}1==g_temp.isRunFirstTime&&1==g_options.gallery_enable_tabs&&(g_objTabs=new UGTabs,g_objTabs.init(t,g_options)),1==g_temp.isRunFirstTime&&1==g_options.gallery_enable_loadmore&&(g_objLoadMore=new UGLoadMore,g_objLoadMore.init(t,g_options)),o&&modifyInitParams(g_temp.objCustomOptions),validateParams(),1==g_options.gallery_shuffle&&t.shuffleItems(),initTheme(g_temp.objCustomOptions),setGalleryHtml(),setHtmlObjectsProperties();var s=g_objWrapper.width();0==s?g_functions.waitForWidth(g_objWrapper,runGalleryActually):runGalleryActually()}function runGalleryActually(){t.setSizeClass(),0==g_temp.isFreestyleMode&&1==g_options.gallery_preserve_ratio&&setHeightByOriginalRatio(),g_objTheme.run(),g_objTabs&&g_temp.isRunFirstTime&&g_objTabs.run(),preloadBigImages(),initEvents(),g_numItems>0&&t.selectItem(0),1==g_options.gallery_autoplay&&t.startPlayMode(),g_temp.isRunFirstTime=!1}function showErrorMessage(e,t){if("undefined"==typeof t)var t="<b>Unite Gallery Error: </b>";else t="<b>"+t+": </b>";e=t+e;var i="<div class='ug-error-message-wrapper'><div class='ug-error-message'>"+e+"</div></div>";g_objWrapper.children().remove(),g_objWrapper.html(i),g_objWrapper.show()}function throwErrorShowMessage(e){throw showErrorMessage(e),new Error(e)}function modifyInitParams(){g_options.gallery_images_preload_type||(g_options.gallery_images_preload_type="minimal"),(void 0==g_options.gallery_min_height||g_options.gallery_height<g_options.gallery_min_height)&&(g_options.gallery_min_height=0),(void 0==g_options.gallery_min_width||g_options.gallery_width<g_options.gallery_min_width)&&(g_options.gallery_min_width=0)}function validateParams(){if(!g_options.gallery_theme)throw new Error("The gallery can't run without theme");if(jQuery.isNumeric(g_options.gallery_height)&&g_options.gallery_height<g_options.gallery_min_height)throw new Error("The <b>gallery_height</b> option must be bigger then <b>gallery_min_height option</b>");if(g_options.gallery_width<g_options.gallery_min_width)throw new Error("The <b>gallery_width</b> option must be bigger then <b>gallery_min_width option</b>")}function setGalleryHtml(){g_objWrapper.addClass("ug-gallery-wrapper"),g_objWrapper.append("<div class='ug-overlay-disabled' style='display:none'></div>"),t.setSizeClass()}function clearInitData(){g_objWrapper.children().remove()}function storeLastSize(){var e=t.getSize();g_temp.lastWidth=e.width,g_temp.lastHeight=e.height}function setHeightByOriginalRatio(){var e=t.getSize(),i=e.width/e.height;if(i!=e.orig_ratio){var n=e.width/e.orig_ratio;n=Math.round(n),n<g_options.gallery_min_height&&(n=g_options.gallery_min_height),g_objWrapper.height(n)}}function setHtmlObjectsProperties(){var e=g_functions.getCssSizeParam(g_options.gallery_width),t={"max-width":e,"min-width":g_functions.getCssSizeParam(g_options.gallery_min_width)};if(0==g_temp.isFreestyleMode){var i=g_functions.getCssSizeParam(g_options.gallery_height);t.height=i}else t.overflow="visible";g_options.gallery_background_color&&(t["background-color"]=g_options.gallery_background_color),g_objWrapper.css(t)}function fillItemByChild(e){var i=t.isMobileMode(),n=e.prop("tagName").toLowerCase(),r="";if("a"==n){r=e.attr("href"),e=e.children();var n=e.prop("tagName").toLowerCase()}var o=e.data("type");void 0==o&&(o="image");var a={};if(a.type=o,"img"==n){var s=e.data("lazyload-src");s&&""!=s&&(e.attr("src",s),jQuery.removeData(e,"lazyload-src"));var l=e.data("image"),u=e.data("thumb");"undefined"==typeof l&&(l=null),"undefined"==typeof u&&(u=null);var d=e.attr("src");l||(l=d),u||(u=d),u||(u=l),l||(l=u),a.urlThumb=u,a.urlImage=l,a.title=e.attr("alt"),a.objThumbImage=e,a.objThumbImage.attr("src",a.urlThumb)}else{if("image"==o)throw trace("Problematic gallery item found:"),trace(e),trace("Please look for some third party js script that could add this item to the gallery"),new Error("The item should not be image type");a.urlThumb=e.data("thumb"),a.title=e.data("title"),a.objThumbImage=null,a.urlImage=e.data("image")}if(1==i){var _=e.data("thumb-mobile");"undefined"!=typeof _&&""!=_&&(a.urlThumb=_,"img"==n&&e.attr("src",a.urlThumb));var g=e.data("image-mobile");"undefined"!=typeof g&&""!=g&&(a.urlImage=g)}a.link=r,a.description=e.attr("title"),a.description||(a.description=e.data("description")),a.description||(a.description=""),a.isNewAdded=!1,a.isLoaded=!1,a.isThumbImageLoaded=!1,a.objPreloadImage=null,a.isBigImageLoadStarted=!1,a.isBigImageLoaded=!1,a.isBigImageLoadError=!1,a.imageWidth=0,a.imageHeight=0,a.thumbWidth=0,a.thumbHeight=0,a.thumbRatioByWidth=0,a.thumbRatioByHeight=0;var c=e.data("width"),h=e.data("height");c&&"number"==typeof c&&h&&"number"==typeof h&&(a.thumbWidth=c,a.thumbHeight=h,a.thumbRatioByWidth=c/h,a.thumbRatioByHeight=h/c),a.addHtml=null;var p=void 0==a.urlImage||""==a.urlImage,f=void 0==a.urlThumb||""==a.urlThumb;switch(a.type){case"youtube":if(a.videoid=e.data("videoid"),p||f){var m=g_ugYoutubeAPI.getVideoImages(a.videoid);p&&(a.urlImage=m.preview),f&&(a.urlThumb=m.thumb,"img"==n&&e.attr("src",a.urlThumb))}g_temp.isYoutubePresent=!0;break;case"vimeo":a.videoid=e.data("videoid"),g_temp.isVimeoPresent=!0;break;case"html5video":a.videoogv=e.data("videoogv"),a.videowebm=e.data("videowebm"),a.videomp4=e.data("videomp4"),g_temp.isHtml5VideoPresent=!0;break;case"soundcloud":a.trackid=e.data("trackid"),g_temp.isSoundCloudPresent=!0;break;case"wistia":a.videoid=e.data("videoid"),g_temp.isWistiaPresent=!0;break;case"custom":var v=e.children("img");v.length&&(v=jQuery(v[0]),a.urlThumb=v.attr("src"),a.title=v.attr("alt"),a.objThumbImage=v);var b=e.children().not("img:first-child");b.length&&(a.addHtml=b.clone())}return a.objThumbImage&&(a.objThumbImage.removeAttr("data-description",""),a.objThumbImage.removeAttr("data-image",""),a.objThumbImage.removeAttr("data-thumb",""),a.objThumbImage.removeAttr("title","")),a}function fillItemsArray(e,t){if(t!==!0)g_arrItems=[];else for(var i=0;g_numItems>i;i++)g_arrItems[i].isNewAdded=!1;for(var i=0;i<e.length;i++){var n=jQuery(e[i]),r=fillItemByChild(n);numIndex=g_arrItems.length,r.index=numIndex,t===!0&&(r.isNewAdded=!0),g_arrItems.push(r)}g_numItems=g_arrItems.length}function loadAPIs(){g_temp.isYoutubePresent&&g_ugYoutubeAPI.loadAPI(),g_temp.isVimeoPresent&&g_ugVimeoAPI.loadAPI(),g_temp.isHtml5VideoPresent&&g_ugHtml5MediaAPI.loadAPI(),g_temp.isSoundCloudPresent&&g_ugSoundCloudAPI.loadAPI(),g_temp.isWistiaPresent&&g_ugWistiaAPI.loadAPI()}function preloadBigImages(){if("visible"!=g_options.gallery_images_preload_type||g_objThumbs||(g_options.gallery_images_preload_type="minimal"),1==g_temp.isAllItemsPreloaded)return!0;switch(g_options.gallery_images_preload_type){default:case"minimal":break;case"all":jQuery(g_arrItems).each(function(){preloadItemImage(this)});break;case"visible":jQuery(g_arrItems).each(function(){var e=this,t=g_objThumbs.isItemThumbVisible(e);1==t&&preloadItemImage(e)})}}function checkPreloadItemImage(e){if(1==e.isBigImageLoadStarted||1==e.isBigImageLoaded||1==e.isBigImageLoadError)return!1;switch(g_options.gallery_images_preload_type){default:case"minimal":break;case"all":preloadItemImage(e);break;case"visible":var t=g_objThumbs.isItemThumbVisible(e);1==t&&preloadItemImage(e)}}function preloadItemImage(e){if(1==e.isBigImageLoadStarted||1==e.isBigImageLoaded||1==e.isBigImageLoadError)return!0;var i=e.urlImage;
return""==i||void 0==i?(e.isBigImageLoadError=!0,!1):(e.isBigImageLoadStarted=!0,e.objPreloadImage=jQuery("<img/>").attr("src",i),e.objPreloadImage.data("itemIndex",e.index),e.objPreloadImage.on("load",t.onItemBigImageLoaded),e.objPreloadImage.on("error",function(){var e=jQuery(this),i=e.data("itemIndex"),n=g_arrItems[i];n.isBigImageLoadError=!0,n.isBigImageLoaded=!1;var r=jQuery(this).attr("src");console.log("Can't load image: "+r),g_objGallery.trigger(t.events.ITEM_IMAGE_UPDATED,[i,n.urlImage]),n.objThumbImage.attr("src",n.urlThumb)}),void checkAllItemsStartedPreloading())}function preloadNearBigImages(e){if(1==g_temp.isAllItemsPreloaded)return!1;if(!e)var e=g_selectedItem;if(!e)return!0;var t=e.index,i=t-1,n=t+1;i>0&&preloadItemImage(g_arrItems[i]),g_numItems>n&&preloadItemImage(g_arrItems[n])}function checkAllItemsStartedPreloading(){if(1==g_temp.isAllItemsPreloaded)return!1;for(var e in g_arrItems)if(0==g_arrItems[e].isBigImageLoadStarted)return!1;g_temp.isAllItemsPreloaded=!0}function __________END_INIT_GALLERY_______(){}function __________EVENTS_____________(){}function onSliderMouseEnter(e){1==g_options.gallery_pause_on_mouseover&&0==t.isFullScreen()&&1==g_temp.isPlayMode&&g_objSlider&&0==g_objSlider.isSlideActionActive()&&t.pausePlaying()}function onSliderMouseLeave(e){if(1==g_options.gallery_pause_on_mouseover&&1==g_temp.isPlayMode&&g_objSlider&&0==g_objSlider.isSlideActionActive()){var i=g_objSlider.isCurrentSlideLoadingImage();0==i&&t.continuePlaying()}}function onKeyPress(e){var i=jQuery(e.target);if(i.is("textarea")||i.is("select")||i.is("input"))return!0;var n=e.charCode?e.charCode:e.keyCode?e.keyCode:e.which?e.which:0,r=!0;switch(n){case 39:t.nextItem();break;case 37:t.prevItem();break;default:r=!1}1==r&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()),g_objGallery.trigger(t.events.GALLERY_KEYPRESS,[n,e])}function onGalleryResized(){var e=t.getSize();if(0==e.width)return!0;t.setSizeClass();var e=t.getSize();if(e.width!=g_temp.lastWidth||0==g_temp.isFreestyleMode&&e.height!=g_temp.lastHeight){var i=!1;if(g_temp.funcCustomHeight){var n=g_temp.funcCustomHeight(e);n&&(g_objWrapper.height(n),i=!0)}0==i&&1==g_options.gallery_preserve_ratio&&0==g_temp.isFreestyleMode&&setHeightByOriginalRatio(),storeLastSize(),g_objGallery.trigger(t.events.SIZE_CHANGE)}}function onThumbsChange(e){"visible"==g_options.gallery_images_preload_type&&0==g_temp.isAllItemsPreloaded&&preloadBigImages()}function onFullScreenChange(){var e=g_functions.isFullScreen(),i=e?t.events.ENTER_FULLSCREEN:t.events.EXIT_FULLSCREEN,n=g_functions.getGlobalData("fullscreenID");return g_galleryID!==n?!0:(e?g_objWrapper.addClass("ug-fullscreen"):g_objWrapper.removeClass("ug-fullscreen"),g_objGallery.trigger(i),void onGalleryResized())}function onItemImageUpdated(e,i){var n=t.getItem(i);checkPreloadItemImage(n)}function onCurrentSlideImageLoadEnd(){1==t.isPlayMode()&&t.continuePlaying()}function initEvents(){if(g_objWrapper.on("dragstart",function(e){e.preventDefault()}),g_objGallery.on(t.events.ITEM_IMAGE_UPDATED,onItemImageUpdated),g_objThumbs)switch(g_temp.thumbsType){case"strip":jQuery(g_objThumbs).on(g_objThumbs.events.STRIP_MOVE,onThumbsChange);break;case"grid":jQuery(g_objThumbs).on(g_objThumbs.events.PANE_CHANGE,onThumbsChange)}if("advance"==g_options.gallery_mousewheel_role&&0==g_temp.isFreestyleMode&&g_objWrapper.on("mousewheel",t.onGalleryMouseWheel),storeLastSize(),jQuery(window).resize(function(){g_objWrapper.css("width","auto"),g_functions.whenContiniousEventOver("gallery_resize",onGalleryResized,g_temp.resizeDelay)}),setTimeout(function(){setInterval(onGalleryResized,2e3)},1e4),g_functions.addFullScreenChangeEvent(onFullScreenChange),g_objSlider){if(jQuery(g_objSlider).on(g_objSlider.events.ITEM_CHANGED,function(){var e=g_objSlider.getCurrentItemIndex();-1!=e&&t.selectItem(e)}),1==g_options.gallery_pause_on_mouseover){var e=g_objSlider.getElement();e.hover(onSliderMouseEnter,onSliderMouseLeave),g_objGallery.on(t.events.ENTER_FULLSCREEN,function(){onSliderMouseLeave()})}retriggerEvent(g_objSlider,g_objSlider.events.ACTION_START,t.events.SLIDER_ACTION_START),retriggerEvent(g_objSlider,g_objSlider.events.ACTION_END,t.events.SLIDER_ACTION_END),jQuery(g_objSlider).on(g_objSlider.events.CURRENTSLIDE_LOAD_END,onCurrentSlideImageLoadEnd)}1==g_options.gallery_control_keyboard&&jQuery(document).keydown(onKeyPress)}function __________GENERAL_______(){}function cacheItems(e,t){if(t){var i=t;"noitems"!=i&&(i=jQuery(t).clone())}else var i=g_objWrapper.children().clone();g_objCache[e]=i}function removeAllSizeClasses(e){e||(e=g_objWrapper),e.removeClass("ug-under-480"),e.removeClass("ug-under-780"),e.removeClass("ug-under-960")}function retriggerEvent(e,t,i){jQuery(e).on(t,function(e){g_objGallery.trigger(i,[this])})}function advanceNextStep(){var e=jQuery.now(),i=e-g_temp.playTimeLastStep;g_temp.playTimeLastStep=e;var n=t.isGalleryVisible();if(0==n)return!1;if(g_temp.playTimePassed+=i,g_temp.objProgress){var r=g_temp.playTimePassed/g_options.gallery_play_interval;g_temp.objProgress.setProgress(r)}g_temp.playTimePassed>=g_options.gallery_play_interval&&(t.nextItem(),g_temp.playTimePassed=0)}function unselectSeletedItem(){return null==g_selectedItem?!0:(g_objThumbs&&g_objThumbs.setThumbUnselected(g_selectedItem.objThumbWrapper),g_selectedItem=null,void(g_selectedItemIndex=-1))}function toFakeFullScreen(){jQuery("body").addClass("ug-body-fullscreen"),g_objWrapper.addClass("ug-fake-fullscreen"),g_temp.isFakeFullscreen=!0,g_objGallery.trigger(t.events.ENTER_FULLSCREEN),g_objGallery.trigger(t.events.SIZE_CHANGE)}function exitFakeFullscreen(){jQuery("body").removeClass("ug-body-fullscreen"),g_objWrapper.removeClass("ug-fake-fullscreen"),g_temp.isFakeFullscreen=!1,g_objGallery.trigger(t.events.EXIT_FULLSCREEN),g_objGallery.trigger(t.events.SIZE_CHANGE)}var t=this,g_galleryID,g_objGallery=jQuery(t),g_objWrapper,g_objParent,g_objThumbs,g_objSlider,g_functions=new UGFunctions,g_objTabs,g_objLoadMore,g_arrItems=[],g_numItems,g_selectedItem=null,g_selectedItemIndex=-1,g_objTheme,g_objCache={};this.events={ITEM_CHANGE:"item_change",SIZE_CHANGE:"size_change",ENTER_FULLSCREEN:"enter_fullscreen",EXIT_FULLSCREEN:"exit_fullscreen",START_PLAY:"start_play",STOP_PLAY:"stop_play",PAUSE_PLAYING:"pause_playing",CONTINUE_PLAYING:"continue_playing",SLIDER_ACTION_START:"slider_action_start",SLIDER_ACTION_END:"slider_action_end",ITEM_IMAGE_UPDATED:"item_image_updated",GALLERY_KEYPRESS:"gallery_keypress",GALLERY_BEFORE_REQUEST_ITEMS:"gallery_before_request_items",OPEN_LIGHTBOX:"open_lightbox",CLOSE_LIGHTBOX:"close_lightbox"};var g_options={gallery_width:900,gallery_height:500,gallery_min_width:150,gallery_min_height:100,gallery_theme:"default",gallery_skin:"default",gallery_images_preload_type:"minimal",gallery_autoplay:!1,gallery_play_interval:3e3,gallery_pause_on_mouseover:!0,gallery_mousewheel_role:"zoom",gallery_control_keyboard:!0,gallery_carousel:!0,gallery_preserve_ratio:!0,gallery_background_color:"",gallery_debug_errors:!1,gallery_shuffle:!1,gallery_urlajax:null,gallery_enable_tabs:!1,gallery_enable_loadmore:!1,gallery_enable_cache:!0,gallery_initial_catid:""},g_temp={objCustomOptions:{},isAllItemsPreloaded:!1,isFreestyleMode:!1,lastWidth:0,lastHeigh:0,handleResize:null,isInited:!1,isPlayMode:!1,isPlayModePaused:!1,playTimePassed:0,playTimeLastStep:0,playHandle:"",playStepInterval:33,objProgress:null,isFakeFullscreen:!1,thumbsType:null,isYoutubePresent:!1,isVimeoPresent:!1,isHtml5VideoPresent:!1,isSoundCloudPresent:!1,isWistiaPresent:!1,resizeDelay:100,isRunFirstTime:!0,originalOptions:{},funcCustomHeight:null};this.onItemBigImageLoaded=function(e,t){if(!t)var t=jQuery(this);var i=t.data("itemIndex"),n=g_arrItems[i];n.isBigImageLoaded=!0;var r=g_functions.getImageOriginalSize(t);n.imageWidth=r.width,n.imageHeight=r.height},this.checkFillImageSize=function(e,t){if(!t){var i=e.data("itemIndex");if(void 0===i)throw new Error("Wrong image given to gallery.checkFillImageSize");var t=g_arrItems[i]}var n=g_functions.getImageOriginalSize(e);t.imageWidth=n.width,t.imageHeight=n.height},this.setFreestyleMode=function(){g_temp.isFreestyleMode=!0},this.attachThumbsPanel=function(e,t){g_temp.thumbsType=e,g_objThumbs=t},this.initSlider=function(e,i){if(!e)var e={};e=jQuery.extend(g_temp.objCustomOptions,e),g_objSlider=new UGSlider,g_objSlider.init(t,e,i)},this.onGalleryMouseWheel=function(e,i,n,r){e.preventDefault(),i>0?t.prevItem():t.nextItem()},this.destroy=function(){if(g_objWrapper.off("dragstart"),g_objGallery.off(t.events.ITEM_IMAGE_UPDATED),g_objThumbs)switch(g_temp.thumbsType){case"strip":jQuery(g_objThumbs).off(g_objThumbs.events.STRIP_MOVE);break;case"grid":jQuery(g_objThumbs).off(g_objThumbs.events.PANE_CHANGE)}if(g_objWrapper.off("mousewheel"),jQuery(window).off("resize"),g_functions.destroyFullScreenChangeEvent(),g_objSlider){jQuery(g_objSlider).off(g_objSlider.events.ITEM_CHANGED);var e=g_objSlider.getElement();e.off("mouseenter"),e.off("mouseleave"),g_objGallery.off(t.events.ENTER_FULLSCREEN),jQuery(g_objSlider).off(g_objSlider.events.ACTION_START),jQuery(g_objSlider).off(g_objSlider.events.ACTION_END),jQuery(g_objSlider).off(g_objSlider.events.CURRENTSLIDE_LOAD_END)}1==g_options.gallery_control_keyboard&&jQuery(document).off("keydown"),g_objTheme&&"function"==typeof g_objTheme.destroy&&g_objTheme.destroy(),g_objWrapper.html("")},this.getArrItems=function(){return g_arrItems},this.getObjects=function(){var e={g_galleryID:g_galleryID,g_objWrapper:g_objWrapper,g_objThumbs:g_objThumbs,g_objSlider:g_objSlider,g_options:g_options,g_arrItems:g_arrItems,g_numItems:g_numItems};return e},this.getObjSlider=function(){return g_objSlider},this.getItem=function(e){if(0>e)throw new Error("item with index: "+e+" not found");if(e>=g_numItems)throw new Error("item with index: "+e+" not found");return g_arrItems[e]},this.getWidth=function(){var e=t.getSize();return e.width},this.getHeight=function(){var e=t.getSize();return e.height},this.getSize=function(){var e=g_functions.getElementSize(g_objWrapper);return e.orig_width=g_options.gallery_width,e.orig_height=g_options.gallery_height,e.orig_ratio=e.orig_width/e.orig_height,e},this.getGalleryID=function(){var e=g_galleryID.replace("#","");return e},this.getNextItem=function(e,t){"object"==typeof e&&(e=e.index);var i=e+1;if(t!==!0&&1==g_numItems)return null;if(i>=g_numItems){if(1!=g_options.gallery_carousel&&t!==!0)return null;i=0}var n=g_arrItems[i];return n},this.getPrevItem=function(e){"object"==typeof e&&(e=e.index);var t=e-1;if(0>t){if(1!=g_options.gallery_carousel&&forceCarousel!==!0)return null;t=g_numItems-1}var i=g_arrItems[t];return i},this.getSelectedItem=function(){return g_selectedItem},this.getSelectedItemIndex=function(){return g_selectedItemIndex},this.getNumItems=function(){return g_numItems},this.isLastItem=function(){return g_selectedItemIndex==g_numItems-1?!0:!1},this.isFirstItem=function(){return 0==g_selectedItemIndex?!0:!1},this.getOptions=function(){return g_options},this.getElement=function(){return g_objWrapper},this.___________SET_CONTROLS___________=function(){},this.setNextButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.nextItem)},this.setPrevButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.prevItem)},this.setFullScreenToggleButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnTap(e,t.toggleFullscreen),g_objGallery.on(t.events.ENTER_FULLSCREEN,function(){e.addClass("ug-fullscreenmode")}),g_objGallery.on(t.events.EXIT_FULLSCREEN,function(){e.removeClass("ug-fullscreenmode")})},this.destroyFullscreenButton=function(e){g_functions.destroyButton(e),g_objGallery.off(t.events.ENTER_FULLSCREEN),g_objGallery.off(t.events.EXIT_FULLSCREEN)},this.setPlayButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.togglePlayMode),g_objGallery.on(t.events.START_PLAY,function(){e.addClass("ug-stop-mode")}),g_objGallery.on(t.events.STOP_PLAY,function(){e.removeClass("ug-stop-mode")})},this.destroyPlayButton=function(e){g_functions.destroyButton(e),g_objGallery.off(t.events.START_PLAY),g_objGallery.off(t.events.STOP_PLAY)},this.setProgressIndicator=function(e){g_temp.objProgress=e},this.setTextContainers=function(e,i){g_objGallery.on(t.events.ITEM_CHANGE,function(){var n=t.getSelectedItem();e.html(n.title),i.html(n.description)})},this.showDisabledOverlay=function(){g_objWrapper.children(".ug-overlay-disabled").show()},this.hideDisabledOverlay=function(){g_objWrapper.children(".ug-overlay-disabled").hide()},this.___________END_SET_CONTROLS___________=function(){},this.___________PLAY_MODE___________=function(){},this.startPlayMode=function(){if(g_temp.isPlayMode=!0,g_temp.isPlayModePaused=!1,g_temp.playTimePassed=0,g_temp.playTimeLastStep=jQuery.now(),g_temp.playHandle=setInterval(advanceNextStep,g_temp.playStepInterval),g_temp.objProgress){var e=g_temp.objProgress.getElement();g_temp.objProgress.setProgress(0),e.show()}g_objGallery.trigger(t.events.START_PLAY),g_objSlider&&1==g_objSlider.isCurrentSlideLoadingImage()&&t.pausePlaying()},this.resetPlaying=function(){return 0==g_temp.isPlayMode?!0:(g_temp.playTimePassed=0,void(g_temp.playTimeLastStep=jQuery.now()))},this.pausePlaying=function(){return 1==g_temp.isPlayModePaused?!0:(g_temp.isPlayModePaused=!0,clearInterval(g_temp.playHandle),void g_objGallery.trigger(t.events.PAUSE_PLAYING))},this.continuePlaying=function(){return 0==g_temp.isPlayModePaused?!0:(g_temp.isPlayModePaused=!1,g_temp.playTimeLastStep=jQuery.now(),void(g_temp.playHandle=setInterval(advanceNextStep,g_temp.playStepInterval)))},this.stopPlayMode=function(){if(g_temp.isPlayMode=!1,clearInterval(g_temp.playHandle),g_temp.playTimePassed=0,g_temp.objProgress){var e=g_temp.objProgress.getElement();e.hide()}g_objGallery.trigger(t.events.STOP_PLAY)},this.isPlayMode=function(){return g_temp.isPlayMode},this.togglePlayMode=function(){0==t.isPlayMode()?t.startPlayMode():t.stopPlayMode()},this.___________GENERAL_EXTERNAL___________=function(){},this.shuffleItems=function(){g_arrItems=g_functions.arrayShuffle(g_arrItems);for(var e in g_arrItems)g_arrItems[e].index=parseInt(e)},this.setOptions=function(e){g_options=jQuery.extend(g_options,e)},this.selectItem=function(e,i){"number"==typeof e&&(e=t.getItem(e));var n=e.index;if(n==g_selectedItemIndex)return!0;if(unselectSeletedItem(),g_selectedItem=e,g_selectedItemIndex=n,g_objGallery.trigger(t.events.ITEM_CHANGE,[e,i]),1==g_temp.isPlayMode){t.resetPlaying();var r=g_objSlider.isCurrentSlideLoadingImage();1==r&&t.pausePlaying()}},this.nextItem=function(){var e=g_selectedItemIndex+1;return 0==g_numItems?!0:0==g_options.gallery_carousel&&e>=g_numItems?!0:(e>=g_numItems&&(e=0),void t.selectItem(e,"next"))},this.prevItem=function(){var e=g_selectedItemIndex-1;return-1==g_selectedItemIndex&&(e=0),0==g_numItems?!0:0==g_options.gallery_carousel&&0>e?!0:(0>e&&(e=g_numItems-1),void t.selectItem(e,"prev"))},this.isFullScreen=function(){return 1==g_temp.isFakeFullscreen?!0:1==g_functions.isFullScreen()?!0:!1},this.isFakeFullscreen=function(){return g_temp.isFakeFullscreen},this.toFullScreen=function(){g_functions.setGlobalData("fullscreenID",g_galleryID);var e=g_objWrapper.get(0),t=g_functions.toFullscreen(e);0==t&&toFakeFullScreen()},this.exitFullScreen=function(){1==g_temp.isFakeFullscreen?exitFakeFullscreen():g_functions.exitFullscreen()},this.toggleFullscreen=function(){0==t.isFullScreen()?t.toFullScreen():t.exitFullScreen()},this.resize=function(e,t,i){g_objWrapper.css("width","auto"),g_objWrapper.css("max-width",e+"px"),t&&g_objWrapper.height(t),i||i===!0||onGalleryResized()},this.setSizeClass=function(e,i){if(!e)var e=g_objWrapper;if(!i)var n=t.getSize(),i=n.width;if(0==i)var i=jQuery(window).width();var r="";return 480>=i?r="ug-under-480":780>=i?r="ug-under-780":960>i&&(r="ug-under-960"),1==e.hasClass(r)?!0:(removeAllSizeClasses(e),void(""!=r&&e.addClass(r)))},this.isMobileMode=function(){return g_objWrapper.hasClass("ug-under-480")?!0:!1},this.isSmallWindow=function(){var e=jQuery(window).width();return e?480>=e?!0:!1:!0},this.isGalleryVisible=function(){var e=g_objWrapper.is(":visible");return e},this.changeItems=function(e,t){if(!e)var e="noitems";runGallery(g_galleryID,"nochange",e,t)},this.addItems=function(e){if(!e||0==e.length)return!1;var t=g_objWrapper.children(".ug-newitems-wrapper");0==t.length&&g_objWrapper.append("<div class='ug-newitems-wrapper' style='display:none'></div>"),t=g_objWrapper.children(".ug-newitems-wrapper"),t.append(e);var i=jQuery(t.children());if(fillItemsArray(i,!0),loadAPIs(),!g_objTheme||"function"!=typeof g_objTheme.addItems)throw new Error("addItems function not found in the theme");t.remove(),g_objTheme.addItems()},this.getNewAddedItemsIndexes=function(){var e=[];return jQuery.each(g_arrItems,function(t,i){1==i.isNewAdded&&e.push(t)}),e},this.showErrorMessageReplaceGallery=function(e){showErrorMessage(e)},this.setFuncCustomHeight=function(e){g_temp.funcCustomHeight=e},this.__________EXTERNAL_EVENTS_______=function(){},this.triggerEvent=function(e,t){t?("array"!=jQuery.type(t)&&(t=[t]),g_objGallery.trigger(e,t)):g_objGallery.trigger(e)},this.onEvent=function(e,t){g_objGallery.on(e,t)},this.destroyEvent=function(e){g_objGallery.off(e)},this.__________AJAX_REQUEST_______=function(){},this.ajaxRequest=function(e,t,i,n){if(!i||"function"!=typeof i)throw new Error("ajaxRequest error: success function should be passed");var r=g_options.gallery_urlajax;if(!r||""==r)throw new Error("ajaxRequest error: Ajax url don't passed");if("undefined"==typeof t)var t={};var o={action:"unitegallery_ajax_action",client_action:e,galleryID:g_galleryID,data:t};jQuery.ajax({type:"post",url:g_options.gallery_urlajax,dataType:"json",data:o,success:function(e){if(!e)throw new Error("Empty ajax response!");if(-1==e||0===e)throw new Error("ajax error!!!");if("undefined"==typeof e.success)throw new Error("ajax error!!!");return 0==e.success?(showErrorMessage(e.message,"ajax error"),!1):void i(e)},error:function(e,t,i){console.log("Ajax Error!!! "+t),responseText=e.responseText,n&&"function"==typeof n?n(responseText):trace(responseText)}})},this.requestNewItems=function(e,i,n){var r=g_options.gallery_enable_cache;if(n||(n=e),1==i&&(r=!1),1==r&&g_objCache.hasOwnProperty(n)){var o=g_objCache[n];t.changeItems(o,n)}else g_objGallery.trigger(t.events.GALLERY_BEFORE_REQUEST_ITEMS),t.ajaxRequest("front_get_cat_items",{catid:e},function(e){var i=e.html;t.changeItems(i,n)})},this.run=function(e,t){g_options.gallery_debug_errors;if(t&&t.hasOwnProperty("gallery_debug_errors")&&(g_options.gallery_debug_errors=t.gallery_debug_errors),1==g_options.gallery_debug_errors)try{runGallery(e,t)}catch(i){if("object"==typeof i){var n=i.message,r=i.lineNumber,o=i.fileName;i.stack;n+=" <br><br> in file: "+o,n+=" <b> line "+r+"</b>",trace(i)}else var n=i;n=n.replace("Error:",""),showErrorMessage(n)}else runGallery(e,t)}}function UGLightbox(){function e(e,i){ie=e,U=jQuery(e),ae=jQuery.extend(ae,le),ae=jQuery.extend(ae,i),se.originalOptions=jQuery.extend({},ae),"compact"==ae.lightbox_type&&(se.isCompact=!0,ae=jQuery.extend(ae,ue),ae=jQuery.extend(ae,i)),t(),1==se.putSlider?(ie.initSlider(ae,"lightbox"),g_objects=e.getObjects(),ne=g_objects.g_objSlider):ne=null,1==ae.lightbox_show_textpanel?oe.init(ie,ae,"lightbox"):oe=null}function t(){1==se.isCompact&&1==ae.lightbox_show_textpanel&&(ae.lightbox_slider_image_padding_bottom=se.initTextPanelHeight),1==se.isCompact&&"inside"==ae.lightbox_arrows_position&&(se.isArrowsInside=!0),1==se.isArrowsInside&&0==ae.lightbox_arrows_inside_alwayson&&(se.isArrowsOnHoverMode=!0),0==ae.lightbox_show_textpanel&&(se.isTopPanelEnabled=!1,se.topPanelHeight=0,ae.lightbox_slider_image_padding_top=0)}function i(){var e="",t="";1==se.isCompact&&(t=" ug-lightbox-compact"),e+="<div class='ug-gallery-wrapper ug-lightbox"+t+"'>",e+="<div class='ug-lightbox-overlay'></div>",0==se.isCompact&&se.isTopPanelEnabled?(e+="<div class='ug-lightbox-top-panel'>",e+="<div class='ug-lightbox-top-panel-overlay'></div>",ae.lightbox_show_numbers&&(e+="<div class='ug-lightbox-numbers'></div>"),e+="</div>"):ae.lightbox_show_numbers&&(e+="<div class='ug-lightbox-numbers'></div>"),e+="<div class='ug-lightbox-button-close'></div>",e+="<div class='ug-lightbox-arrow-left'></div>",e+="<div class='ug-lightbox-arrow-right'></div>",e+="</div>",V=jQuery(e),jQuery("body").append(V),ne&&ne.setHtml(V),X=V.children(".ug-lightbox-overlay"),0==se.isCompact&&1==se.isTopPanelEnabled&&($=V.children(".ug-lightbox-top-panel"),0==$.length&&($=null)),K=V.find(".ug-lightbox-button-close"),ae.lightbox_show_numbers&&(J=V.find(".ug-lightbox-numbers")),Z=V.children(".ug-lightbox-arrow-left"),q=V.children(".ug-lightbox-arrow-right"),oe&&($?oe.appendHTML($):oe.appendHTML(V))}function n(){if(null!==ae.lightbox_overlay_color&&X.css("background-color",ae.lightbox_overlay_color),null!==ae.lightbox_overlay_opacity&&X.fadeTo(0,ae.lightbox_overlay_opacity),$&&null!==ae.lightbox_top_panel_opacity&&$.children(".ug-lightbox-top-panel-overlay").fadeTo(0,ae.lightbox_top_panel_opacity),J){var e={};null!==ae.lightbox_numbers_size&&(e["font-size"]=ae.lightbox_numbers_size+"px"),ae.lightbox_numbers_color&&(e.color=ae.lightbox_numbers_color),null!==ae.lightbox_numbers_padding_right&&(e["padding-right"]=ae.lightbox_numbers_padding_right+"px"),null!==ae.lightbox_numbers_padding_top&&(e["padding-top"]=ae.lightbox_numbers_padding_top+"px"),J.css(e)}}function r(e){if(!ne)return!0;var t={slider_image_padding_top:e};ne.setOptions(t),ne.refreshSlideItems()}function o(e){if(!$)return!1;if(!oe)return!1;var t=$.height();if(0==t)return!1;if(0==$.is(":visible"))return!1;var i=t,n=oe.getSize(),o=n.height;t!=se.topPanelHeight&&(i=se.topPanelHeight),o>i&&(i=o),t!=i&&($.height(i),ne&&0==ne.isAnimating()&&r(i))}function a(e){var t={},i=ae.lightbox_textpanel_width,n=47,r=40,a=e.width-n-r;i>a?(t.textpanel_padding_left=n,t.textpanel_padding_right=r,t.textpanel_title_text_align="center",t.textpanel_desc_text_align="center"):(t.textpanel_padding_left=Math.floor((e.width-i)/2),t.textpanel_padding_right=t.textpanel_padding_left,t.textpanel_title_text_align="left",t.textpanel_desc_text_align="left",ae.lightbox_textpanel_title_text_align&&(t.textpanel_title_text_align=ae.lightbox_textpanel_desc_text_align),ae.lightbox_textpanel_desc_text_align&&(t.textpanel_desc_text_align=ae.lightbox_textpanel_desc_text_align)),oe.setOptions(t),oe.refresh(!0,!0),o("positionTextPanelWide"),oe.positionPanel()}function s(){return $?void $.hide():!1}function l(){return $?void $.show():!1}function u(e){if(0==se.isOpened)return!1;if(!oe)return!1;if(!ne)return!1;var t=re.getElementSize(V),i=oe.getSize();if(0==i.width||i.height>120)return!1;if(!e)var n=ne.getSlideImage(),e=re.getElementSize(n);if(0==e.height||0==e.width)return!1;var r=e.bottom+i.height;if(r<t.height)return!1;var o=ne.getOptions(),a=i.height;if(a!=o.slider_image_padding_bottom){var s={slider_image_padding_bottom:a};if(0==ne.isAnimating())return ne.setOptions(s),ne.refreshSlideItems(),!0}return!1}function d(e,t){if(!e)var i=ne.getSlideImage(),e=re.getElementSize(i);se.textPanelTop=e.bottom,t===!0&&oe.positionPanel(se.textPanelTop,se.textPanelLeft)}function _(e){var t=(re.getElementSize(V),ne.getSlideImage()),i=re.getElementSize(t);if(0==i.width)return!1;se.textPanelLeft=i.left,se.textPanelTop=i.bottom;var n=i.width;if(J){var r=re.getElementSize(J);n-=r.width;var o=i.right-r.width;re.placeElement(J,o,se.textPanelTop)}oe&&(oe.show(),oe.refresh(!0,!0,n),d(i));var a=u(i);0==a&&(se.positionFrom="handleCompactTextpanelSizes",oe&&(oe.positionPanel(se.textPanelTop,se.textPanelLeft),e===!0&&(e(),j())))}function g(){if(0==ne.isCurrentSlideType("image"))return!0;var e=1==ne.isCurrentImageInPlace();return e}function c(e,t){if(0==se.isArrowsInside)return!1;if(!Z)return!1;var i=g();if(Z.show(),q.show(),se.positionFrom="positionArrowsInside",1==se.isArrowsOnHoverMode&&1==i&&0==y()&&I(!0),0==i)var n=re.getElementRelativePos(Z,"left",ae.lightbox_arrows_offset),r=re.getElementRelativePos(Z,"middle"),o=re.getElementRelativePos(q,"right",ae.lightbox_arrows_offset),a=r;else var s=ne.getSlideImage(),l=re.getElementSize(s),n=(re.getElementSize(ne.getElement()),re.getElementRelativePos(Z,"left",0,s)+l.left+ae.lightbox_arrows_inside_offset),r=re.getElementRelativePos(Z,"middle",0,s)+l.top,o=re.getElementRelativePos(Z,"right",0,s)+l.left-ae.lightbox_arrows_inside_offset,a=r;if(t===!0){var u={left:n,top:r},d={left:o,top:a};Z.stop().animate(u,{duration:se.fadeDuration}),q.stop().animate(d,{duration:se.fadeDuration})}else Z.stop(),q.stop(),re.placeElement(Z,n,r),re.placeElement(q,o,a);1==e&&E(t)}function h(e,t){se.positionFrom=null;var i=g(),n=2,r=re.getElementRelativePos(K,"right",2,V);if(0==i)var o=n,a=r;else{var s=ne.getSlideImage(),l=re.getElementSize(s),u=re.getElementSize(ne.getElement()),d=re.getElementSize(K);u.top==u.height&&(u.top=0);var a=u.left+l.right-d.width/2+ae.lightbox_compact_closebutton_offsetx,o=u.top+l.top-d.height/2-ae.lightbox_compact_closebutton_offsety;n>o&&(o=n),a>r&&(a=r)}if(t===!0){var _={left:a,top:o};K.stop().animate(_,{duration:se.fadeDuration})}else K.stop(),re.placeElement(K,a,o);e===!0&&T(t)}function p(){K&&K.stop().fadeTo(se.fadeDuration,0),v(),b(),se.positionFrom="hideCompactElements",1==se.isArrowsInside&&I()}function f(){K&&K.hide(),Z&&1==se.isArrowsInside&&(Z.hide(),q.hide()),J&&J.hide(),oe&&oe.hide()}function m(){var e=re.getElementSize(V);$&&re.setElementSizeAndPosition($,0,0,e.width,se.topPanelHeight),Z&&0==se.isArrowsInside&&(1==ae.lightbox_hide_arrows_onvideoplay&&(Z.show(),q.show()),re.placeElement(Z,"left","middle",ae.lightbox_arrows_offset),re.placeElement(q,"right","middle",ae.lightbox_arrows_offset)),0==se.isCompact&&re.placeElement(K,"right","top",2,2),oe&&(se.positionFrom="positionElements",0==se.isCompact?a(e):(x(),j()));var t=e.width,i=e.height,n=0,r=0;if(ne){if($){var o=$.height(),s={slider_image_padding_top:o};ne.setOptions(s)}ne.setSize(t,i),ne.setPosition(r,n)}}function v(){oe&&oe.getElement().stop().fadeTo(se.fadeDuration,0)}function b(){J&&J.stop().fadeTo(se.fadeDuration,0)}function y(){if(!se.lastMouseX)return!0;var e={pageX:se.lastMouseX,pageY:se.lastMouseY},t=ne.isMouseInsideSlideImage(e);return t}function I(e,t){return Z?1==se.isArrowsOnHoverMode&&t===!1?(1==y(),!0):void(e===!0?(Z.stop().fadeTo(0,0),q.stop().fadeTo(0,0)):(Z.stop().fadeTo(se.fadeDuration,0),q.stop().fadeTo(se.fadeDuration,0))):!1}function w(){if(!Z)return!0;if(0==Z.is(":visible"))return!0;var e=Z.css("opacity");return 1!=e?!0:!1}function E(e,t){return Z?1==se.isArrowsOnHoverMode&&t!==!0&&1==g()?!0:1==ne.isSwiping()?!0:(e!==!0&&(Z.stop(),q.stop()),Z.fadeTo(se.fadeDuration,1),void q.fadeTo(se.fadeDuration,1)):!1}function T(e){e!==!0&&K.stop(),K.fadeTo(se.fadeDuration,1)}function S(e){if(!oe)return!1;if(!e)var e=ne.getCurrentItem();oe.setTextPlain(e.title,e.description)}function P(e){if(!J)return!1;if(!e)var e=ne.getCurrentItem();var t=ie.getNumItems(),i=e.index+1;J.html(i+" / "+t)}function x(){return oe?void oe.getElement().show().stop().fadeTo(se.fadeDuration,1):!1}function j(){J&&J.stop().fadeTo(se.fadeDuration,1)}function C(){return 0==se.isCompact?!0:void p()}function A(){if(0==se.isCompact)return!0;if(se.positionFrom="onZoomChange",h(!1,!0),c(!1,!0),1==se.isCompact){var e=ne.isCurrentSlideType("image")&&1==ne.isCurrentImageInPlace();0==e?(v(),b()):(se.positionFrom="onZoomChange",x(),j())}}function M(){if(0==se.isCompact)return!0;se.positionFrom="onSliderAfterReturn",h(!0),c(!0);var e=u();0==e&&_(),x(),j()}function O(e,t){return t=jQuery(t),0==se.isCompact?!0:0==ne.isSlideCurrent(t)?!0:(se.positionFrom="onSliderAfterPutImage",h(!0),c(!0),void _())}function z(){var e=ne.getOptions(),t=e.slider_image_padding_top;if($){var i=$.height();i!=t&&r(i)}if(1==se.isCompact){if(S(),P(),se.positionFrom="onSliderTransitionEnd",h(!0),c(!0),0==ne.isSlideActionActive()){var n=u();0==n&&_()}x(),j()}}function L(e,t){0==se.isCompact?(J&&P(t),oe&&(S(t),0==se.isRightNowOpened&&(oe.positionElements(!1),o("onchange"),oe.positionPanel()))):0==ne.isAnimating()&&(oe&&S(t),J&&P(t)),0==se.isSliderChangedOnce&&(se.isSliderChangedOnce=!0,te.trigger(ee.events.LIGHTBOX_INIT))}function H(e,t){var i=ne.getSlideType();if("image"!=i&&0==se.isCompact&&ne.isSlideActionActive())return!0;var n=ne.isPreloading();if(1==n)return ee.close("slider"),!0;if(1==ae.lightbox_close_on_emptyspace){var r=ne.isMouseInsideSlideImage(t);0==r&&ee.close("slider_inside")}}function N(){m()}function k(){$?s():J&&J.hide(),Z&&1==ae.lightbox_hide_arrows_onvideoplay&&(Z.hide(),q.hide())}function R(){$?(l(),o("onStopVideo")):J&&J.show(),Z&&1==ae.lightbox_hide_arrows_onvideoplay&&(Z.show(),q.show())}function G(e,t,i){var n=!1;switch(t){case 27:1==se.isOpened&&ee.close("keypress");break;case 38:case 40:case 33:case 34:n=!0}1==se.isOpened&&1==n&&i.preventDefault()}function D(){1==se.isArrowsOnHoverMode&&E(!1,!0)}function Q(e){se.positionFrom="hideCompactElements",1==se.isArrowsOnHoverMode&&1==g()&&I(!1,!0)}function W(e){se.lastMouseX=e.pageX,se.lastMouseY=e.pageY;var t=w();1==t&&y()&&0==ne.isAnimating()&&(se.positionFrom="onMouseMove",Z&&0==Z.is(":animated")&&E(!1,!0))}function B(e,t,i,n){if(0==se.isOpened)return!0;switch(ae.gallery_mousewheel_role){default:case"zoom":var r=ne.getSlideType();"image"!=r&&e.preventDefault();break;case"none":e.preventDefault();break;case"advance":ie.onGalleryMouseWheel(e,t,i,n)}}function F(){if(X.on("touchstart",function(e){e.preventDefault()}),X.on("touchend",function(e){ee.close("overlay")}),re.addClassOnHover(q,"ug-arrow-hover"),re.addClassOnHover(Z,"ug-arrow-hover"),re.addClassOnHover(K),ie.setNextButton(q),ie.setPrevButton(Z),K.click(function(){ee.close("button")}),U.on(ie.events.ITEM_CHANGE,L),ne){jQuery(ne).on(ne.events.TRANSITION_END,z),jQuery(ne).on(ne.events.CLICK,H);var e=ne.getVideoObject();jQuery(e).on(e.events.PLAY_START,k),jQuery(e).on(e.events.PLAY_STOP,R),jQuery(ne).on(ne.events.START_DRAG,C),jQuery(ne).on(ne.events.TRANSITION_START,C),jQuery(ne).on(ne.events.AFTER_DRAG_CHANGE,M),jQuery(ne).on(ne.events.AFTER_RETURN,M),jQuery(ne).on(ne.events.AFTER_PUT_IMAGE,O),jQuery(ne).on(ne.events.ZOOM_CHANGE,A),jQuery(ne).on(ne.events.IMAGE_MOUSEENTER,D),jQuery(ne).on(ne.events.IMAGE_MOUSELEAVE,Q)}jQuery(window).resize(function(){return 0==se.isOpened?!0:void re.whenContiniousEventOver("lightbox_resize",N,100)}),U.on(ie.events.GALLERY_KEYPRESS,G),1==se.isArrowsOnHoverMode&&jQuery(document).bind("mousemove",W),V.on("mousewheel",B)}function Y(){se.isCompact=!1,t(),se.isArrowsInside=!1,se.isArrowsOnHoverMode=!1,ae=jQuery.extend({},se.originalOptions),ae.lightbox_arrows_position="sides",ne.setOptions(ae)}var U,V,X,Z,q,K,J,$,ee=this,te=jQuery(this),ie=new UniteGalleryMain,ne=new UGSlider,re=new UGFunctions,oe=new UGTextPanel,ae={lightbox_type:"wide",lightbox_show_textpanel:!0,lightbox_textpanel_width:550,lightbox_hide_arrows_onvideoplay:!0,lightbox_arrows_position:"sides",lightbox_arrows_offset:10,lightbox_arrows_inside_offset:10,lightbox_arrows_inside_alwayson:!1,lightbox_overlay_color:null,lightbox_overlay_opacity:1,lightbox_top_panel_opacity:null,lightbox_show_numbers:!0,lightbox_numbers_size:null,lightbox_numbers_color:null,lightbox_numbers_padding_top:null,lightbox_numbers_padding_right:null,lightbox_compact_closebutton_offsetx:1,lightbox_compact_closebutton_offsety:1,lightbox_close_on_emptyspace:!0};this.events={LIGHTBOX_INIT:"lightbox_init"};var se={topPanelHeight:44,initTextPanelHeight:26,isOpened:!1,isRightNowOpened:!1,putSlider:!0,isCompact:!1,fadeDuration:300,positionFrom:null,textPanelTop:null,textPanelLeft:null,isArrowsInside:!1,isArrowsOnHoverMode:!1,lastMouseX:null,lastMouseY:null,originalOptions:null,isSliderChangedOnce:!1,isTopPanelEnabled:!0},le={lightbox_slider_controls_always_on:!0,lightbox_slider_enable_bullets:!1,lightbox_slider_enable_arrows:!1,lightbox_slider_enable_progress_indicator:!1,lightbox_slider_enable_play_button:!1,lightbox_slider_enable_fullscreen_button:!1,lightbox_slider_enable_zoom_panel:!1,lightbox_slider_enable_text_panel:!1,
lightbox_slider_scale_mode_media:"down",lightbox_slider_scale_mode:"down",lightbox_slider_loader_type:3,lightbox_slider_loader_color:"black",lightbox_slider_transition:"fade",lightbox_slider_image_padding_top:se.topPanelHeight,lightbox_slider_image_padding_bottom:0,lightbox_slider_video_padding_top:0,lightbox_slider_video_padding_bottom:0,lightbox_textpanel_align:"middle",lightbox_textpanel_padding_top:5,lightbox_textpanel_padding_bottom:5,slider_video_constantsize:!1,lightbox_slider_image_border:!1,lightbox_textpanel_enable_title:!0,lightbox_textpanel_enable_description:!1,lightbox_textpanel_desc_style_as_title:!0,lightbox_textpanel_enable_bg:!1,video_enable_closebutton:!1,lightbox_slider_video_enable_closebutton:!1,video_youtube_showinfo:!1,lightbox_slider_enable_links:!1},ue={lightbox_overlay_opacity:.6,lightbox_slider_image_border:!0,lightbox_slider_image_shadow:!0,lightbox_slider_image_padding_top:30,lightbox_slider_image_padding_bottom:30,slider_video_constantsize:!0,lightbox_textpanel_align:"bottom",lightbox_textpanel_title_text_align:"left",lightbox_textpanel_desc_text_align:"left",lightbox_textpanel_padding_left:10,lightbox_textpanel_padding_right:10};this.destroy=function(){if(jQuery(document).unbind("mousemove"),X.off("touchstart"),X.off("touchend"),K.off("click"),U.off(ie.events.ITEM_CHANGE),ne){jQuery(ne).off(ne.events.TRANSITION_END),jQuery(ne).off(ne.events.CLICK),jQuery(ne).off(ne.events.START_DRAG),jQuery(ne).off(ne.events.TRANSITION_START),jQuery(ne).off(ne.events.AFTER_DRAG_CHANGE),jQuery(ne).off(ne.events.AFTER_RETURN);var e=ne.getVideoObject();jQuery(e).off(e.events.PLAY_START),jQuery(e).off(e.events.PLAY_STOP),jQuery(ne).on(ne.events.IMAGE_MOUSEENTER,D),jQuery(ne).on(ne.events.IMAGE_MOUSELEAVE,Q),ne.destroy()}jQuery(window).unbind("resize"),U.off(ie.events.GALLERY_KEYPRESS,G),V.off("mousewheel"),V.remove()},this.open=function(e){var t=ie.getItem(e);if(se.isOpened=!0,se.isRightNowOpened=!0,setTimeout(function(){se.isRightNowOpened=!1},100),ne&&ne.setItem(t,"lightbox_open"),oe&&oe.setTextPlain(t.title,t.description),X.stop().fadeTo(0,0),V.show(),V.fadeTo(0,1),X.stop().fadeTo(se.fadeDuration,ae.lightbox_overlay_opacity),m(),1==se.isCompact){var i=ne.isPreloading();1==i?f():1==se.isArrowsInside&&(Z.hide(),q.hide())}ne&&ne.startSlideAction(),U.trigger(ie.events.OPEN_LIGHTBOX,t)},this.close=function(e){se.isOpened=!1,1==se.isCompact&&p(),ne&&ne.stopSlideAction();var t=ne.getSlideType();"image"!=t?V.hide():V.fadeTo(se.fadeDuration,0,function(){V.hide()}),U.trigger(ie.events.CLOSE_LIGHTBOX)},this.init=function(t,i){e(t,i)},this.putHtml=function(){var e=ie.isSmallWindow();e&&1==se.isCompact&&Y(),i()},this.run=function(){n(),ne&&ne.run(),F()}}function UGCarousel(){function e(e,t){g_objects=e.getObjects(),W=e,H=jQuery(e),N=g_objects.g_objWrapper,k=g_objects.g_arrItems,U=jQuery.extend(U,t),F.setFixedMode(),F.setApproveClickFunction(L),F.init(e,U),Y=F.getObjThumbs(),U=F.getOptions(),V.initTileWidth=U.tile_width,V.initTileHeight=U.tile_height,V.tileWidth=U.tile_width}function t(e){if(!e)var e=N;var t="<div class='ug-carousel-wrapper'><div class='ug-carousel-inner'></div></div>";N.append(t),R=N.children(".ug-carousel-wrapper"),G=R.children(".ug-carousel-inner"),F.setHtml(G),Y.getThumbs().fadeTo(0,1)}function i(e,t){if(!t)var t=V.initTileHeight/V.initTileWidth*e;V.tileWidth=e;var i={tile_width:e,tile_height:t};F.setOptions(i),U.tile_width=e,U.tile_height=t,F.resizeAllTiles(e),m(!0)}function n(){if(null===V.carouselMaxWidth)throw new Error("The carousel width not set");if(V.tileWidth<V.initTileWidth){var e=V.carouselMaxWidth-2*U.carousel_padding;e>V.initTileWidth&&(e=V.initTileWidth),i(e);var t=B.getNumItemsInSpace(V.carouselMaxWidth,e,U.carousel_space_between_tiles)}else{var t=B.getNumItemsInSpace(V.carouselMaxWidth,V.tileWidth,U.carousel_space_between_tiles);if(0>=t){t=1;var e=V.carouselMaxWidth-2*U.carousel_padding;i(e)}}var n=B.getSpaceByNumItems(t,V.tileWidth,U.carousel_space_between_tiles);n+=2*U.carousel_padding,R.width(n),1==V.isFirstTimeRun?(z(),F.run(),jQuery.each(k,function(e,t){t.objThumbWrapper.data("index",e),N.trigger(V.eventSizeChange,[t.objThumbWrapper,!0]),t.objTileOriginal=t.objThumbWrapper.clone(!0,!0)}),m(!0),1==U.carousel_autoplay&&D.startAutoplay()):(1==U.carousel_autoplay&&D.pauseAutoplay(),w(0,!1),1==U.carousel_autoplay&&D.startAutoplay()),P(),V.isFirstTimeRun=!1}function r(){return B.getElementSize(G).left}function o(e){return B.getMousePosition(e).pageX}function a(){var e=G.children(".ug-thumb-wrapper");return e}function s(e){var t=B.getNumItemsInSpace(e,V.tileWidth,U.carousel_space_between_tiles);return t}function l(){return a().length}function u(e){v(e);var t=a(),i=jQuery(t[e]);return i}function d(){return G.children(".ug-thumb-wrapper").first()}function _(){return G.children(".ug-thumb-wrapper").last()}function g(e,t,i){var n=e.data("index");if(void 0==n)throw new Error("every tile should have index!");for(var r=[],o=0;t>o;o++){if("prev"==i)var a=W.getPrevItem(n,!0);else var a=W.getNextItem(n,!0);if(!a)throw new Error("the item to add is empty");var s=a.objTileOriginal.clone(!0,!0);n=a.index,s.addClass("cloned"),r.push(s)}return r}function c(){var e=B.getElementSize(R),t=B.getElementSize(G),i=t.width-e.width+t.left,n=V.sideSpace-i;return n}function h(){var e=-r(),t=V.sideSpace-e;return t}function p(){var e=B.getElementSize(R);return e.width}function f(){var e=p(),t=s(e);return t}function m(e){if(!e)var e=!1;var t,i=a(),n=0,r=0;return jQuery.each(i,function(e,o){o=jQuery(o),B.placeElement(o,n,0);var a=B.getElementSize(o);n+=a.width+U.carousel_space_between_tiles,r=Math.max(r,a.height),e==i.length-1&&(t=a.right)}),G.width(t),r+=2*U.carousel_padding,e===!0&&(G.height(r),R.height(r)),w(V.numCurrent,!1),t}function v(e){if(e>a().length-1)throw new Error("Wrogn tile number: "+e)}function b(e,t){if("left"==t)var i=d();else var i=_();var n="left"==t?"prev":"next",r=g(i,e,n);jQuery.each(r,function(e,i){"left"==t?G.prepend(i):G.append(i),N.trigger(V.eventSizeChange,i),F.loadTileImage(i)})}function y(e,t){v(n);for(var i=a(),n=i.length,r=0;e>r;r++)"left"==t?jQuery(i[r]).remove():jQuery(i[n-1-r]).remove()}function I(e){var t={left:e+"px"};G.css(t)}function w(e,t,i){if(void 0===t){var t=!0;if(G.is(":animated"))return!0}var n=u(e),r=B.getElementSize(n),o=-r.left+U.carousel_padding,a={left:o+"px"};if(t===!0){var s=U.carousel_scroll_duration,l=U.carousel_scroll_easing;i===!0&&(s=V.scrollShortDuration,l=V.scrollShortEasing),G.stop(!0).animate(a,{duration:s,easing:l,queue:!1,complete:function(){V.numCurrent=e,S(!0)}})}else V.numCurrent=e,G.css(a)}function E(){var e=-r(),t=s(e),i=B.getElementSize(u(t)).left,n=B.getElementSize(u(t+1)).left;return Math.abs(i-e)<Math.abs(n-e)?t:t+1}function T(){var e=E();w(e,!0,!0)}function S(){var e=h(),t=c(),i=0,n=0,r=0,o=0,a=l();if(e>V.spaceActionSize)i=s(e),b(i,"left"),V.numCurrent+=i;else if(e<-V.spaceActionSize){var r=s(Math.abs(e));y(r,"left"),V.numCurrent-=r}if(t>V.spaceActionSize?(n=s(t),b(n,"right")):t<-V.spaceActionSize&&(o=s(Math.abs(t)),y(o,"right")),o>a)throw new Error("Can't remove more then num tiles");var u=!1;return(i||n||r||o)&&(m(),u=!0),u}function P(e){B.placeElement(G,0,U.carousel_padding),S()}function x(){"left"==U.carousel_autoplay_direction?D.scrollRight(1):D.scrollLeft(1)}function j(e){return 1==V.touchActive?!0:(V.touchActive=!0,D.pauseAutoplay(),V.startTime=jQuery.now(),V.startMousePos=o(e),V.startInnerPos=r(),V.lastTime=V.startTime,V.lastMousePos=V.startMousePos,void B.storeEventData(e,V.storedEventID))}function C(e){if(0==V.touchActive)return!0;B.updateStoredEventData(e,V.storedEventID),e.preventDefault();var t=null;if(1==U.carousel_vertical_scroll_ondrag&&(t=B.handleScrollTop(V.storedEventID)),"vert"===t)return!0;V.lastMousePos=o(e);var i=V.lastMousePos-V.startMousePos,n=V.startInnerPos+i,r=i>0?"prev":"next",a=B.getElementSize(G).width;n>0&&"prev"==r&&(n/=3),-a>n&&"next"==r&&(n=V.startInnerPos+i/3),I(n)}function A(e){return 0==V.touchActive?!0:(V.touchActive=!1,T(),void D.unpauseAutoplay())}function M(e){return 0==U.carousel_autoplay_pause_onhover?!0:void(1==V.isPlayMode&&0==V.isPaused&&D.pauseAutoplay())}function O(e){return 0==U.carousel_autoplay_pause_onhover?!0:void D.unpauseAutoplay()}function z(){F.initEvents(),R.bind("mousedown touchstart",j),jQuery("body").bind("mousemove touchmove",C),jQuery(window).add("body").bind("mouseup touchend",A),R.hover(M,O)}function L(){var e=V.lastTime-V.startTime,t=Math.abs(V.lastMousePos-V.startMousePos);return e>300?!1:t>30?!1:!0}var H,N,k,R,G,D=this,Q=jQuery(this),W=new UniteGalleryMain,B=new UGFunctions,F=new UGTileDesign,Y=new UGThumbsGeneral,U={carousel_padding:8,carousel_space_between_tiles:20,carousel_navigation_numtiles:3,carousel_scroll_duration:500,carousel_scroll_easing:"easeOutCubic",carousel_autoplay:!0,carousel_autoplay_timeout:3e3,carousel_autoplay_direction:"right",carousel_autoplay_pause_onhover:!0,carousel_vertical_scroll_ondrag:!1};this.events={START_PLAY:"carousel_start_play",PAUSE_PLAY:"carousel_pause_play",STOP_PLAY:"carousel_stop_play"};var V={eventSizeChange:"thumb_size_change",isFirstTimeRun:!0,carouselMaxWidth:null,tileWidth:0,initTileWidth:0,initTileHeight:0,sideSpace:1500,spaceActionSize:500,numCurrent:0,touchActive:!1,startInnerPos:0,lastTime:0,startTime:0,startMousePos:0,lastMousePos:0,scrollShortDuration:200,scrollShortEasing:"easeOutQuad",handle:null,isPlayMode:!1,isPaused:!1,storedEventID:"carousel"};this.startAutoplay=function(){V.isPlayMode=!0,V.isPaused=!1,Q.trigger(D.events.START_PLAY),V.handle&&clearInterval(V.handle),V.handle=setInterval(x,U.carousel_autoplay_timeout)},this.unpauseAutoplay=function(){return 0==V.isPlayMode?!0:0==V.isPaused?!0:void D.startAutoplay()},this.pauseAutoplay=function(){return 0==V.isPlayMode?!0:(V.isPaused=!0,V.handle&&clearInterval(V.handle),void Q.trigger(D.events.PAUSE_PLAY))},this.stopAutoplay=function(){return 0==V.isPlayMode?!0:(V.isPaused=!1,V.isPlayMode=!1,V.handle&&clearInterval(V.handle),void Q.trigger(D.events.STOP_PLAY))},this.destroy=function(){V.handle&&clearInterval(V.handle),Q.off(D.events.START_PLAY),Q.off(D.events.STOP_PLAY),R.unbind("mousedown"),R.unbind("touchstart"),jQuery("body").unbind("mousemove"),jQuery("body").unbind("touchmove"),jQuery(window).add("body").unbind("mouseup").unbind("touchend"),R.off("mouseenter").off("mouseleave"),F.destroy()},this.init=function(t,i,n){n&&this.setMaxWidth(n),e(t,i)},this.setMaxWidth=function(e){V.carouselMaxWidth=e},this.setHtml=function(e){t(e)},this.getElement=function(){return R},this.getObjTileDesign=function(){return F},this.getEstimatedHeight=function(){var e=U.tile_height+2*U.carousel_padding;return e},this.run=function(){n()},this.scrollRight=function(e){if(!e||"object"==typeof e)var e=U.carousel_navigation_numtiles;var t=f();e>t&&(e=t);var i=V.numCurrent-e;0>=i&&(i=0),w(i)},this.scrollLeft=function(e){if(!e||"object"==typeof e)var e=U.carousel_navigation_numtiles;var t=f();e>t&&(e=t);var i=l(),n=V.numCurrent+e;n>=i&&(n=i-1),w(n)},this.setScrollLeftButton=function(e){B.setButtonMobileReady(e),B.setButtonOnClick(e,D.scrollLeft)},this.setScrollRightButton=function(e){B.setButtonMobileReady(e),B.setButtonOnClick(e,D.scrollRight)},this.setPlayPauseButton=function(e){B.setButtonMobileReady(e),1==V.isPlayMode&&0==V.isPaused&&e.addClass("ug-pause-icon"),Q.on(D.events.START_PLAY,function(){e.addClass("ug-pause-icon")}),Q.on(D.events.STOP_PLAY,function(){e.removeClass("ug-pause-icon")}),B.setButtonOnClick(e,function(){0==V.isPlayMode||1==V.isPaused?D.startAutoplay():D.stopAutoplay()})}}function UGTabs(){function e(e,t){u=e,a=jQuery(u),d=jQuery.extend(d,t),"select"==d.tabs_type?l=jQuery(d.tabs_container):s=jQuery(d.tabs_container+" .ug-tab")}function t(){o()}function i(e){u.requestNewItems(e)}function n(){var e=d.tabs_class_selected,t=jQuery(this);if(t.hasClass(e))return!0;s.not(t).removeClass(e),t.addClass(e);var n=t.data("catid");return n?void i(n):!0}function r(){var e=jQuery(this),t=e.val();return t?void i(t):!0}function o(){"select"==d.tabs_type?l.change(r):s.click(n)}var a,s,l,u=(jQuery(this),new UniteGalleryMain),d=(new UGFunctions,{tabs_type:"tabs",tabs_container:"#ug_tabs",tabs_class_selected:"ug-tab-selected"});this.events={},this.destroy=function(){l&&l.off("change"),s&&s.off("click")},this.init=function(t,i){e(t,i)},this.run=function(){t()}}function UG_API(e){function t(e){var t={index:e.index,title:e.title,description:e.description,urlImage:e.urlImage,urlThumb:e.urlThumb},i=e.objThumbImage.data();for(var n in i){switch(n){case"image":case"description":continue}t[n]=i[n]}return t}var i,n=this,r=(jQuery(n),new UniteGalleryMain),o=[];r=e,i=jQuery(e),this.events={API_INIT_FUNCTIONS:"api_init",API_ON_EVENT:"api_on_event"},this.on=function(e,a,s){switch(s!==!0&&o.push({event:e,func:a}),e){case"item_change":i.on(r.events.ITEM_CHANGE,function(){var e=r.getSelectedItem(),i=t(e);a(i.index,i)});break;case"resize":i.on(r.events.SIZE_CHANGE,a);break;case"enter_fullscreen":i.on(r.events.ENTER_FULLSCREEN,a);break;case"exit_fullscreen":i.on(r.events.EXIT_FULLSCREEN,a);break;case"play":i.on(r.events.START_PLAY,a);break;case"stop":i.on(r.events.STOP_PLAY,a);break;case"pause":i.on(r.events.PAUSE_PLAYING,a);break;case"continue":i.on(r.events.CONTINUE_PLAYING,a);break;case"open_lightbox":i.on(r.events.OPEN_LIGHTBOX,a);break;case"close_lightbox":i.on(r.events.CLOSE_LIGHTBOX,a);break;default:console&&console.log("wrong api event: "+e)}i.trigger(n.events.API_ON_EVENT,[e,a])},this.play=function(){r.startPlayMode()},this.stop=function(){r.stopPlayMode()},this.togglePlay=function(){r.togglePlayMode()},this.enterFullscreen=function(){r.toFullScreen()},this.exitFullscreen=function(){r.exitFullScreen()},this.toggleFullscreen=function(){r.toggleFullscreen()},this.resetZoom=function(){var e=r.getObjSlider();return e?void e.zoomBack():!1},this.zoomIn=function(){var e=r.getObjSlider();return e?void e.zoomIn():!1},this.zoomOut=function(){var e=r.getObjSlider();return e?void e.zoomOut():!1},this.nextItem=function(){r.nextItem()},this.prevItem=function(){r.prevItem()},this.selectItem=function(e){r.selectItem(e)},this.resize=function(e,t){t?r.resize(e,t):r.resize(e)},this.getItem=function(e){var i=r.getItem(e),n=t(i);return n},this.getNumItems=function(){var e=r.getNumItems();return e},this.reloadGallery=function(e){if(!e)var e={};r.run(null,e),o.map(function(e){n.on(e.event,e.func,!0)})},this.destroy=function(){r.destroy()},i.trigger(n.events.API_INIT_FUNCTIONS,n)}function UGLoadMore(){function e(){return o=jQuery("#"+_.loadmore_container),0==o.length?!1:(a=o.find(".ug-loadmore-button"),0==a.length?!1:(s=o.find(".ug-loadmore-loader"),0==s.length?!1:(l=o.find(".ug-loadmore-error"),0==l.length?!1:void(d.isInited=!0))))}function t(){o.show()}function i(){a.hide(),s.show();var e={numitems:u.getNumItems()};u.ajaxRequest("front_loadmore",e,function(e){s.hide();var t=e.html_items,i=e.show_loadmore;1==i?(a.blur().show(),s.hide()):o.hide(),u.addItems(t)},function(e){e="Ajax Error!"+e,s.hide(),l.show(),l.html(e)})}function n(){u.onEvent("tiles_first_placed",t),a.click(i)}var r,o,a,s,l,u=(jQuery(this),new UniteGalleryMain),d=(new UGFunctions,{isInited:!1}),_={loadmore_container:"ug_loadmore_wrapper"};this.events={},this.destroy=function(){return 0==d.isInited?!1:void 0},this.init=function(t,i){return u=t,r=jQuery(u),_=jQuery.extend(_,i),e(),0==d.isInited?(trace("load more not inited, something is wrong"),!1):void n()}}var g_ugFunctions=new UGFunctions;!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var a=t||window.event,s=l.call(arguments,1),u=0,d=0,_=0,g=0;if(t=e.event.fix(a),t.type="mousewheel","detail"in a&&(_=-1*a.detail),"wheelDelta"in a&&(_=a.wheelDelta),"wheelDeltaY"in a&&(_=a.wheelDeltaY),"wheelDeltaX"in a&&(d=-1*a.wheelDeltaX),"axis"in a&&a.axis===a.HORIZONTAL_AXIS&&(d=-1*_,_=0),u=0===_?d:_,"deltaY"in a&&(_=-1*a.deltaY,u=_),"deltaX"in a&&(d=a.deltaX,0===_&&(u=-1*d)),0!==_||0!==d){if(1===a.deltaMode){var c=e.data(this,"mousewheel-line-height");u*=c,_*=c,d*=c}else if(2===a.deltaMode){var h=e.data(this,"mousewheel-page-height");u*=h,_*=h,d*=h}return g=Math.max(Math.abs(_),Math.abs(d)),(!o||o>g)&&(o=g,n(a,g)&&(o/=40)),n(a,g)&&(u/=40,d/=40,_/=40),u=Math[u>=1?"floor":"ceil"](u/o),d=Math[d>=1?"floor":"ceil"](d/o),_=Math[_>=1?"floor":"ceil"](_/o),t.deltaX=d,t.deltaY=_,t.deltaFactor=o,t.deltaMode=0,s.unshift(t,u,d,_),r&&clearTimeout(r),r=setTimeout(i,200),(e.event.dispatch||e.event.handle).apply(this,s)}}function i(){o=null}function n(e,t){return d.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120===0}var r,o,a=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],s="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l=Array.prototype.slice;if(e.event.fixHooks)for(var u=a.length;u;)e.event.fixHooks[a[--u]]=e.event.mouseHooks;var d=e.event.special.mousewheel={version:"3.1.9",setup:function(){if(this.addEventListener)for(var i=s.length;i;)this.addEventListener(s[--i],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",d.getLineHeight(this)),e.data(this,"mousewheel-page-height",d.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var e=s.length;e;)this.removeEventListener(s[--e],t,!1);else this.onmousewheel=null},getLineHeight:function(t){return parseInt(e(t)["offsetParent"in e.fn?"offsetParent":"parent"]().css("fontSize"),10)},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),function(e){"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t)}):"object"==typeof module&&"object"==typeof module.exports?exports=e(require("jquery")):e(jQuery)}(function(e){function t(e){var t=7.5625,i=2.75;return 1/i>e?t*e*e:2/i>e?t*(e-=1.5/i)*e+.75:2.5/i>e?t*(e-=2.25/i)*e+.9375:t*(e-=2.625/i)*e+.984375}e.easing.jswing=e.easing.swing;var i=Math.pow,n=Math.sqrt,r=Math.sin,o=Math.cos,a=Math.PI,s=1.70158,l=1.525*s,u=s+1,d=2*a/3,_=2*a/4.5;e.extend(e.easing,{def:"easeOutQuad",swing:function(t){return e.easing[e.easing.def](t)},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return 1-(1-e)*(1-e)},easeInOutQuad:function(e){return.5>e?2*e*e:1-i(-2*e+2,2)/2},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return 1-i(1-e,3)},easeInOutCubic:function(e){return.5>e?4*e*e*e:1-i(-2*e+2,3)/2},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1-i(1-e,4)},easeInOutQuart:function(e){return.5>e?8*e*e*e*e:1-i(-2*e+2,4)/2},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1-i(1-e,5)},easeInOutQuint:function(e){return.5>e?16*e*e*e*e*e:1-i(-2*e+2,5)/2},easeInSine:function(e){return 1-o(e*a/2)},easeOutSine:function(e){return r(e*a/2)},easeInOutSine:function(e){return-(o(a*e)-1)/2},easeInExpo:function(e){return 0===e?0:i(2,10*e-10)},easeOutExpo:function(e){return 1===e?1:1-i(2,-10*e)},easeInOutExpo:function(e){return 0===e?0:1===e?1:.5>e?i(2,20*e-10)/2:(2-i(2,-20*e+10))/2},easeInCirc:function(e){return 1-n(1-i(e,2))},easeOutCirc:function(e){return n(1-i(e-1,2))},easeInOutCirc:function(e){return.5>e?(1-n(1-i(2*e,2)))/2:(n(1-i(-2*e+2,2))+1)/2},easeInElastic:function(e){return 0===e?0:1===e?1:-i(2,10*e-10)*r((10*e-10.75)*d)},easeOutElastic:function(e){return 0===e?0:1===e?1:i(2,-10*e)*r((10*e-.75)*d)+1},easeInOutElastic:function(e){return 0===e?0:1===e?1:.5>e?-(i(2,20*e-10)*r((20*e-11.125)*_))/2:i(2,-20*e+10)*r((20*e-11.125)*_)/2+1},easeInBack:function(e){return u*e*e*e-s*e*e},easeOutBack:function(e){return 1+u*i(e-1,3)+s*i(e-1,2)},easeInOutBack:function(e){return.5>e?i(2*e,2)*(2*(l+1)*e-l)/2:(i(2*e-2,2)*((l+1)*(2*e-2)+l)+2)/2},easeInBounce:function(e){return 1-t(1-e)},easeOutBounce:t,easeInOutBounce:function(e){return.5>e?(1-t(1-2*e))/2:(1+t(2*e-1))/2}})}),!function(e,t){function i(e,t,i){var n=_[t.type]||{};return null==e?i||!t.def?null:t.def:(e=n.floor?~~e:parseFloat(e),isNaN(e)?t.def:n.mod?(e+n.mod)%n.mod:0>e?0:n.max<e?n.max:e)}function n(t){var i=u(),n=i._rgba=[];return t=t.toLowerCase(),h(l,function(e,r){var o,a=r.re.exec(t),s=a&&r.parse(a),l=r.space||"rgba";return s?(o=i[l](s),i[d[l].cache]=o[d[l].cache],n=i._rgba=o._rgba,!1):void 0}),n.length?("0,0,0,0"===n.join()&&e.extend(n,o.transparent),i):o[t]}function r(e,t,i){return i=(i+1)%1,1>6*i?e+(t-e)*i*6:1>2*i?t:2>3*i?e+(t-e)*(2/3-i)*6:e}if("undefined"==typeof e.cssHooks)return!1;var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",s=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],u=e.Color=function(t,i,n,r){return new e.Color.fn.parse(t,i,n,r)},d={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},_={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},g=u.support={},c=e("<p>")[0],h=e.each;c.style.cssText="background-color:rgba(1,1,1,.5)",g.rgba=c.style.backgroundColor.indexOf("rgba")>-1,h(d,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),u.fn=e.extend(u.prototype,{parse:function(r,a,s,l){if(r===t)return this._rgba=[null,null,null,null],this;(r.jquery||r.nodeType)&&(r=e(r).css(a),a=t);var _=this,g=e.type(r),c=this._rgba=[];return a!==t&&(r=[r,a,s,l],g="array"),"string"===g?this.parse(n(r)||o._default):"array"===g?(h(d.rgba.props,function(e,t){c[t.idx]=i(r[t.idx],t)}),this):"object"===g?(r instanceof u?h(d,function(e,t){r[t.cache]&&(_[t.cache]=r[t.cache].slice())}):h(d,function(t,n){var o=n.cache;h(n.props,function(e,t){if(!_[o]&&n.to){if("alpha"===e||null==r[e])return;_[o]=n.to(_._rgba)}_[o][t.idx]=i(r[e],t,!0)}),_[o]&&e.inArray(null,_[o].slice(0,3))<0&&(_[o][3]=1,n.from&&(_._rgba=n.from(_[o])))}),this):void 0},is:function(e){var t=u(e),i=!0,n=this;return h(d,function(e,r){var o,a=t[r.cache];return a&&(o=n[r.cache]||r.to&&r.to(n._rgba)||[],h(r.props,function(e,t){return null!=a[t.idx]?i=a[t.idx]===o[t.idx]:void 0})),i}),i},_space:function(){var e=[],t=this;return h(d,function(i,n){t[n.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var n=u(e),r=n._space(),o=d[r],a=0===this.alpha()?u("transparent"):this,s=a[o.cache]||o.to(a._rgba),l=s.slice();return n=n[o.cache],h(o.props,function(e,r){var o=r.idx,a=s[o],u=n[o],d=_[r.type]||{};null!==u&&(null===a?l[o]=u:(d.mod&&(u-a>d.mod/2?a+=d.mod:a-u>d.mod/2&&(a-=d.mod)),l[o]=i((u-a)*t+a,r)))}),this[r](l)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),n=i.pop(),r=u(t)._rgba;return u(e.map(i,function(e,t){return(1-n)*r[t]+n*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),n=i.pop();return t&&i.push(~~(255*n)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),u.fn.parse.prototype=u.fn,d.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,n=e[0]/255,r=e[1]/255,o=e[2]/255,a=e[3],s=Math.max(n,r,o),l=Math.min(n,r,o),u=s-l,d=s+l,_=.5*d;return t=l===s?0:n===s?60*(r-o)/u+360:r===s?60*(o-n)/u+120:60*(n-r)/u+240,i=0===u?0:.5>=_?u/d:u/(2-d),[Math.round(t)%360,i,_,null==a?1:a]},d.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],n=e[2],o=e[3],a=.5>=n?n*(1+i):n+i-n*i,s=2*n-a;return[Math.round(255*r(s,a,t+1/3)),Math.round(255*r(s,a,t)),Math.round(255*r(s,a,t-1/3)),o]},h(d,function(n,r){var o=r.props,a=r.cache,l=r.to,d=r.from;u.fn[n]=function(n){if(l&&!this[a]&&(this[a]=l(this._rgba)),n===t)return this[a].slice();var r,s=e.type(n),_="array"===s||"object"===s?n:arguments,g=this[a].slice();return h(o,function(e,t){var n=_["object"===s?e:t.idx];null==n&&(n=g[t.idx]),g[t.idx]=i(n,t)}),d?(r=u(d(g)),r[a]=g,r):u(g)},h(o,function(t,i){u.fn[t]||(u.fn[t]=function(r){var o,a=e.type(r),l="alpha"===t?this._hsla?"hsla":"rgba":n,u=this[l](),d=u[i.idx];return"undefined"===a?d:("function"===a&&(r=r.call(this,d),a=e.type(r)),null==r&&i.empty?this:("string"===a&&(o=s.exec(r),o&&(r=d+parseFloat(o[2])*("+"===o[1]?1:-1))),u[i.idx]=r,this[l](u)))})})}),u.hook=function(t){var i=t.split(" ");h(i,function(t,i){e.cssHooks[i]={set:function(t,r){var o,a,s="";if("transparent"!==r&&("string"!==e.type(r)||(o=n(r)))){if(r=u(o||r),!g.rgba&&1!==r._rgba[3]){for(a="backgroundColor"===i?t.parentNode:t;(""===s||"transparent"===s)&&a&&a.style;)try{s=e.css(a,"backgroundColor"),a=a.parentNode}catch(l){}r=r.blend(s&&"transparent"!==s?s:"_default")}r=r.toRgbaString()}try{t.style[i]=r}catch(l){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=u(t.elem,i),t.end=u(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},u.hook(a),e.cssHooks.borderColor={expand:function(e){var t={};return h(["Top","Right","Bottom","Left"],function(i,n){t["border"+n+"Color"]=e}),t}},o=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),!function(e){function t(){try{var i=this===document?e(this):e(this).contents()}catch(n){return!1}i.mousemove(function(t){e.mlp={x:t.pageX,y:t.pageY}}),i.find("iframe").on("load",t)}e.mlp={x:0,y:0},e(t),e.fn.ismouseover=function(){var t=!1;return this.eq(0).each(function(){var i=e(this).is("iframe")?e(this).contents().find("body"):e(this),n=i.offset();t=n.left<=e.mlp.x&&n.left+i.outerWidth()>e.mlp.x&&n.top<=e.mlp.y&&n.top+i.outerHeight()>e.mlp.y}),t}}(jQuery);var g_ugYoutubeAPI=new UGYoutubeAPI,g_ugVimeoAPI=new UGVimeoAPI,g_ugHtml5MediaAPI=new UGHtml5MediaAPI,g_ugSoundCloudAPI=new UGSoundCloudAPI,g_ugWistiaAPI=new UGWistiaAPI;jQuery.fn.unitegallery=function(e){var t=jQuery(this),i="#"+t.attr("id");if(!e)var e={};var n=new UniteGalleryMain;n.run(i,e);var r=new UG_API(n);return r};
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//














//= font-awesome

;
