ace.define("ace/theme/Dark",[], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-Dark";
exports.cssText = ".ace-Dark .ace_gutter {\
background: #141414;\
color: #595959\
}\
.ace-Dark .ace_print-margin {\
width: 1px;\
background: #555651\
}\
.ace-Dark {\
background-color: #161616;\
color: #E6E1DC\
}\
.ace-Dark .ace_cursor {\
color: #F8F8F0\
}\
.ace-Dark .ace_marker-layer .ace_selection {\
background: #49483E\
}\
.ace-Dark.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #272822;\
}\
.ace-Dark .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-Dark .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #49483E\
}\
.ace-Dark .ace_marker-layer .ace_active-line {\
background: #202020\
}\
.ace-Dark .ace_gutter-active-line {\
background-color: #272727\
}\
.ace-Dark .ace_marker-layer .ace_selected-word {\
border: 1px solid #49483E\
}\
.ace-Dark .ace_invisible {\
color: #52524d\
}\
.ace-Dark .ace_entity.ace_name.ace_tag,\
.ace-Dark .ace_keyword,\
.ace-Dark .ace_meta.ace_tag,\
.ace-Dark .ace_storage {\
color: #F92672\
}\
.ace-Dark .ace_punctuation,\
.ace-Dark .ace_punctuation.ace_tag {\
color: #fff\
}\
.ace-Dark .ace_constant.ace_character,\
.ace-Dark .ace_constant.ace_language,\
.ace-Dark .ace_constant.ace_numeric,\
.ace-Dark .ace_constant.ace_other {\
color: #AE81FF\
}\
.ace-Dark .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.ace-Dark .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.ace-Dark .ace_support.ace_constant,\
.ace-Dark .ace_support.ace_function {\
color: #66D9EF\
}\
.ace-Dark .ace_fold {\
background-color: #A6E22E;\
border-color: #F8F8F2\
}\
.ace-Dark .ace_storage.ace_type,\
.ace-Dark .ace_support.ace_class,\
.ace-Dark .ace_support.ace_type {\
font-style: italic;\
color: #66D9EF\
}\
.ace-Dark .ace_entity.ace_name.ace_function,\
.ace-Dark .ace_entity.ace_other,\
.ace-Dark .ace_entity.ace_other.ace_attribute-name,\
.ace-Dark .ace_variable {\
color: #A6E22E\
}\
.ace-Dark .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F\
}\
.ace-Dark .ace_string {\
color: #E6DB74\
}\
.ace-Dark .ace_comment {\
color: #75715E\
}\
.ace-Dark .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
                (function() {
                    ace.require(["ace/theme/Dark"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            