class Ultraviolet {
    constructor() {
        this.html = new HTMLRewriter();
        this.css = new CSSRewriter();
        this.js = new JSRewriter();
    }

    encodeProtocol(protocol) {
        if (typeof protocol !== 'string') {
            throw new TypeError('protocol must be a string');
        }

        let result = '';

        for (let i = 0; i < protocol.length; i++) {
            const char = protocol[i];

            if (char === '%') {
                const code = parseInt(protocol.slice(i + 1, i + 3), 16);
                const encoded = '%' + code.toString(16).padStart(2, '0');

                result += encoded;
                i += 2;
            } else {
                result += char;
            }
        }

        return result;
    }

    decodeProtocol(protocol) {
        if (typeof protocol !== 'string') {
            throw new TypeError('protocol must be a string');
        }

        let result = '';

        for (let i = 0; i < protocol.length; i++) {
            const char = protocol[i];

            if (char === '%') {
                const code = parseInt(protocol.slice(i + 1, i + 3), 16);
                const decoded = String.fromCharCode(code);

                result += decoded;
                i += 2;
            } else {
                result += char;
            }
        }

        return result;
    }

    implementUVMiddleware() {
        // HTML
        attributes(this);
        text(this);
        injectHead(this);
        // CSS
        url(this);
        importStyle(this);
        // JS
        importDeclaration(this);
        dynamicImport(this);
        property(this);
        wrapEval(this);
        identifier(this);
        unwrap(this);
    }

    get rewriteHtml() {
        return this.html.rewrite.bind(this.html);
    }

    get sourceHtml() {
        return this.html.source.bind(this.html);
    }

    get rewriteCSS() {
        return this.css.rewrite.bind(this.css);
    }

    get sourceCSS() {
        return this.css.source.bind(this.css);
    }

    get rewriteJS() {
        return this.js.rewrite.bind(this.js);
    }

    get sourceJS() {
        return this.js.source.bind(this.js);
    }

    static codec = { xor: xor, base64: base64, plain: plain };
    static mime = mime;
    static setCookie = setCookie;
    static openDB = openDB;
    static Bowser = Bowser;
}

// Add this line to mark the beginning of your bundled code
/******/ (() => { 

// Contents of your uv.bundle.js file here...
// Replace the placeholder comments with the actual content of your uv.bundle.js file

// Assuming other UV files are included here
// import { HTMLRewriter, CSSRewriter, JSRewriter } from './uv-rewriter.js';
// import { xor, base64, plain } from './uv-codec.js';
// import { mime } from './uv-mime.js';
// import { setCookie, openDB } from './uv-utils.js';
// import { Bowser } from './uv-bowser.js';

// Example:
// const myModule1 = require('./myModule1');
// const myModule2 = require('./myModule2');
// const myFunction = () => { /* Your function implementation */ };

/******/ })() 
// Add this line to mark the end of your bundled code
;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ultraviolet);
if (typeof self === 'object') self.Ultraviolet = Ultraviolet;
