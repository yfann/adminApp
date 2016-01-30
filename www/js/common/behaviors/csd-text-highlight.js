angular.module('starter.common').filter('csdTextHighlight' , function() {
    // create highlight bit map, highlighted character will be marked value as 'true'
    // for example, {0: false, 1: true, 2: true}
    var buildPhoneNumberHighlightMap = function (highlightMap, lowerCaseText, searchTermArray) {
        
        searchTermArray.forEach(function(term) {
               if (!isNaN(term)) {
                   buildHighlightMap(highlightMap, lowerCaseText, term);
                }
        });
    };

    var buildNormalHighlightMap = function (highlightMap, lowerCaseText, searchTermArray) {

        searchTermArray.forEach(function (term) {
            buildHighlightMap(highlightMap, lowerCaseText, term);
        });
    };

    var buildHighlightMap = function (highlightMap, lowerCaseText, term) {
        var startIndex = -1;
        do {
            startIndex = lowerCaseText.indexOf(term.toLowerCase(), startIndex + 1);
            if (startIndex !== -1) {
                for (var k = startIndex; k < startIndex + term.length; k++) {
                    highlightMap[k] = true;
                }
            } else {
                break;
            }
        } while (((startIndex + term.length) <= lowerCaseText.length) && term.length!=0);
    };
    // split the text to be slices by hightlighted text. 
    // for example, text = 'James', searchString = 'ame'. textSliceArray will be [{'J', false}, {'ame', true}, {'s', false}]  
    var splitTextByHighlightedText = function(text, highlightMap) {
        // append a flag for the ending
        highlightMap[text.length] = !highlightMap[text.length - 1];
        var textSliceArray = [];
        var highlightFlag = highlightMap[0];
        var textSiice = [];
        for (var j = 0; j <= text.length; j++) {
            if (highlightFlag !== highlightMap[j]) {
                textSliceArray.push({
                    value: textSiice.join(''),
                    highlight: highlightFlag
                });
                textSiice = [];
                highlightFlag = highlightMap[j];
            }
            if (j < text.length) {
                textSiice.push(text[j]);
            }
        };
        return textSliceArray;
    };

    var buildHighlightHTML = function(text, highlightMap) {
        var textSliceArray = splitTextByHighlightedText(text, highlightMap);
        var highlightedHTML = '';
        _.each(textSliceArray, function(textSlice) {
            highlightedHTML += textSlice.highlight ? ('<span class="search-text-highlight">' + _.escape(textSlice.value) + '</span>') : _.escape(textSlice.value);
        });
        return highlightedHTML;
    };

    var buildSSNHighlightHTML = function(text) {
        // for SSN display ***-**-**** and show text as tooltip
        return '<span class="search-text-highlight" title="' + text + '">***-**-****</span>';
    };

    return function(text, searchString, customHightLightType) {
        /// <summary>
        /// Filter to highlight text. This filter will return html, so it will work with 'ng-bind-html'.
        /// This filter also depends on css class '.search-text-highlight' for the highlight style.
        /// @example,
        /// <span ng-bind-html="item.value | csdTextHighlight : highlightTexts"></span>
        /// <span ng-bind-html="item.value | csdTextHighlight : highlightTexts : item.name==='SSN'"></span>
        /// </summary>
        /// <param name="text">text to be highlighted</param>
        /// <param name="searchString">search string which can contain multiple terms with a space ' '.</param>
        /// <param name="customHightLightType">indicate if the text need be highlight in different way.</param>
        /// <returns type="">formatted html for highlighting</returns>
        if ((text || angular.isNumber(text)) && (searchString || angular.isNumber(searchString))) {

            text = text.toString();
            searchString = searchString.toString();

            var highlightMap = {};
            for (var i = 0; i < text.length; i++) {
                // set all as 'false' by default
                highlightMap[i] = false;
            }
            var searchTermArray = searchString.trim().split(/\s+/gi);

            switch (customHightLightType) {
                case "SSN":
                    return buildSSNHighlightHTML(text);
                case "PhoneNumber":
                    buildPhoneNumberHighlightMap(highlightMap, text.toLowerCase(), searchTermArray);
                    break;
                default:
                    buildNormalHighlightMap(highlightMap, text.toLowerCase(), searchTermArray);
            }

            var hasMatchedText = _.contains(highlightMap, true);

            if (hasMatchedText) {
                return buildHighlightHTML(text, highlightMap);
            } else {
                return _.escape(text);
            }
        } else {
                return _.escape(text);
        }
    };
});