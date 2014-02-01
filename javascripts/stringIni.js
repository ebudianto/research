if(typeof origConcat == 'undefined') {
    //add the taint property using definegetter here also 

    var origConcat = String.prototype.concat;
    String.prototype.concat = function() {
        var str = origConcat.apply(this, arguments);
        var myString = '';
        if (str != '') {
            myString = new String(str);
            Object.defineProperty(myString, 'instrumented', {
                enumerable: false,
                writable: true,
                value: 1
            });
            myString.taint = this.taint || arguments[0].taint;
            if (!myString.taint && arguments.length > 1) {
                for (var i = 0, l = arguments.length; i < l; i++) {
                    if (arguments[i].taint == 1) {
                        Object.defineProperty(myString, 'taint', {
                            enumerable: false,
                            writable: true,
                            value: 1
                        });
                        break;
                    }
                }
            }
        }
        return myString;
    };

    var origtoLowerCase = String.prototype.toLowerCase;
    String.prototype.toLowerCase = function() {
        var str = origtoLowerCase.apply(this, arguments);
        var mString = '';
        if (str != '') {
            mString = new String(str);
            Object.defineProperty(mString, 'instrumented', {
                enumerable: false,
                writable: true,
                value: 1
            });
            if (this.taint == 1) {
                Object.defineProperty(mString, 'taint', {
                    enumerable: false,
                    writable: true,
                    value: 1
                });
            }
        }
        return mString;
    };

    var origtoUpperCase = String.prototype.toUpperCase;
    String.prototype.toUpperCase = function() {
        var str = origtoUpperCase.apply(this, arguments);
        var mString = '';
        if (str != '') {
            mString = new String(str);
            Object.defineProperty(mString, 'instrumented', {
                enumerable: false,
                writable: true,
                value: 1
            });
            if (this.taint == 1) {
                Object.defineProperty(mString, 'taint', {
                    enumerable: false,
                    writable: true,
                    value: 1
                });
            }
        }
        return mString;
    };

    var origMatch = String.prototype.match;
    String.prototype.match = function(regexp) {
        var a = origMatch.apply(this, arguments);
        if (this.taint == 1 && a != null) {
            for (var i = 0, l = a.length; i < l; i++) {
                if (a[i] && a[i] != '') {
                    a[i] = new String(a[i]);
                    Object.defineProperty(a[i], 'instrumented', {
                        enumerable: false,
                        writable: true,
                        value: 1
                    });
                    Object.defineProperty(a[i], 'taint', {
                        enumerable: false,
                        writable: true,
                        value: 1
                    });
                }
            }
        }
        return a;
    }

    var origReplace = String.prototype.replace;
    String.prototype.replace = function(regexp, newstr) {
        var str = origReplace.apply(this, arguments);
        var mString = '';
        if (str != '') {
            mString = new String(str);
            Object.defineProperty(mString, 'instrumented', {
                enumerable: false,
                writable: true,
                value: 1
            });
            if (this.taint == 1) {
                Object.defineProperty(mString, 'taint', {
                    enumerable: false,
                    writable: true,
                    value: 1
                });
            }
            if (newstr instanceof String && newstr.taint == 1) {
                Object.defineProperty(mString, 'taint', {
                    enumerable: false,
                    writable: true,
                    value: 1
                });
            }
        }
        return mString;
    };

    var origSlice = String.prototype.slice;
    String.prototype.slice = function() {
        var str = origSlice.apply(this, arguments);
        var mString;
        if (str != -1) {
            if (str !== '') {
                mString = new String(str);
                Object.defineProperty(mString, 'instrumented', {
                    enumerable: false,
                    writable: true,
                    value: 1
                });
                if (this.taint == 1) {
                    Object.defineProperty(mString, 'taint', {
                        enumerable: false,
                        writable: true,
                        value: 1
                    });
                }
            } else {
                mString = str;
            }
            return mString;
        } else {
            return -1;
        }
    };

    var origSplit = String.prototype.split;
    String.prototype.split = function(seperator, limit) {
        var a = origSplit.apply(this, arguments);
        if (this.taint == 1) {
            for (var i = 0, l = a.length; i < l; i++) {
                if (a[i] != '') {
                    a[i] = new String(a[i]);
                    Object.defineProperty(a[i], 'instrumented', {
                        enumerable: false,
                        writable: true,
                        value: 1
                    });
                    Object.defineProperty(a[i], 'taint', {
                        enumerable: false,
                        writable: true,
                        value: 1
                    });
                }
            }
        }
        return a;
    };

    var origSubstr = String.prototype.substr;
    String.prototype.substr = function(start, length) {
        var str = origSubstr.apply(this, arguments);
        var mString = '';
        if (str != '') {
            mString = new String(str);
            Object.defineProperty(mString, 'instrumented', {
                enumerable: false,
                writable: true,
                value: 1
            });
            if (this.taint == 1) {
                Object.defineProperty(mString, 'taint', {
                    enumerable: false,
                    writable: true,
                    value: 1
                });
            }
        }
        return mString;
    };

    var origSubstring = String.prototype.substring;
    String.prototype.substring = function(from, to) {
        var str = origSubstring.apply(this, arguments);
        var mString = '';
        if (str != '') {
            mString = new String(str);
            Object.defineProperty(mString, 'instrumented', {
                enumerable: false,
                writable: true,
                value: 1
            });
            if (this.taint == 1) {
                Object.defineProperty(mString, 'taint', {
                    enumerable: false,
                    writable: true,
                    value: 1
                });
            }
        }
        return mString;
    };

    //toString of a string can be made to return the string object
    // var origToString = String.prototype.toString;
    // String.prototype.toString = function() {
    //     var str = origToString.apply(this, arguments);
    //     var mString = new String(str);
    //     if(this.taint == 1) {
    //         mString.taint = 1;
    //     }
    //     return mString;
    // };

    // Array functions
    var origIndexOf = Array.prototype.indexOf;
    Array.prototype.indexOf = function(search, from) {
        if (search instanceof String && search.hasOwnProperty("instrumented")) {
            search = search.toString();
        }
        var searchArray = [];
        var i, a;
        for (i = 0; i < this.length; i++) {
            a = this[i];
            if (a instanceof String && a.hasOwnProperty("instrumented")) {
                a = a.toString();
            }
            searchArray[i] = a;
        }
        var index = origIndexOf.myApply(searchArray, arguments);
        return index;
    };
    var origLastIndexOf = Array.prototype.lastIndexOf;
    Array.prototype.lastIndexOf = function(search, from) {
        if (search instanceof String && search.hasOwnProperty("instrumented")) {
            search = search.toString();
        }
        var searchArray = [];
        var i, a;
        for (i = 0; i < this.length; i++) {
            a = this[i];
            if (a instanceof String && a.hasOwnProperty("instrumented")) {
                a = a.toString();
            }
            searchArray[i] = a;
        }
        var index = origLastIndexOf.myApply(searchArray, arguments);
        return index;
    };
    var origSort = Array.prototype.sort;
    Array.prototype.sort = function() {
        var i, origImplementation;
        for(i = 0; i < this.length; i++) {
            if(this[i].toString().hasOwnProperty("instrumented")) {
                origImplementation = this[i].toString;
                this[i].toString = function() {
                    return origImplementation.myApply(this, arguments).toString();
                };
            }
        }
        return origSort.myApply(this, arguments);
    };
    var origJoin = Array.prototype.join;
    Array.prototype.join = function() {
        var i, origImplementation;
        for(i = 0; i < this.length; i++) {
            if(this[i] && this[i].toString().hasOwnProperty("instrumented")) {
                origImplementation = this[i].toString;
                this[i].toString = function() {
                    return origImplementation.myApply(this, arguments).toString();
                };
            }
        }
        return origJoin.myApply(this, arguments);
    };
}
