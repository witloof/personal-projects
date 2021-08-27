require("@rails/ujs").start();
//require("turbolinks").start();
require("@rails/activestorage").start();
global.$ = require("jquery");
global.jQuery = require("jquery");
require("popper.js");
require("bootstrap");
require("bootstrap-toggle");
global.intlTelInput = require("intl-tel-input");
window.intlTelInputGlobals.loadUtils(
  require("intl-tel-input/build/js/utils.js")
);
require("./scrypts");
require("channels");
