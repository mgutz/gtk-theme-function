/**
 * Generates metacity theme.
 *
 * To run
 *   node metacity.js
 */

require('underscore');
require('underscore.strings');
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');
var ejs = require('ejs');
ejs.open = '<?';
ejs.close = '?>';
ejs.debug = true;
var merger = require('./merger');
var pp = require('eyes').inspector({
    maxLength: 4096 
});


var DEBIAN_RED = "#D70751";
var UBUNTU_ORANGE = "#F47421";
var LINUXMINT_GREEN = "#8DD346";
var FEDORA_BLUE = "#3C6EB4";

var BUTTON_STYLE_DEFAULT = 0; // display a fg image on top of bg iamge
var BUTTON_STYLE_REVEAL_ICON = 1; // reveal icon on prelight, pressed
var BUTTON_STYLE_SINGLE_IMAGE = 2; // reveal icon on prelight, pressed

var styles = {
    titleBottomInset: 0,
    titleTopInset: 1
};


function readFile(relativePath) {
    return fs.readFileSync(__dirname + '/' + relativePath, 'utf8');
}

function renderEjsFile(templateFile, data) {
    var template = readFile(templateFile);
    return ejs.render(template, {locals: data});
}

var draw = {
    point: function(color, x, y, alpha) {
        if (!alpha) {
            ops = '<line color="' +color+ '" width="0" x1="' +x+ '" y1="' +y+ '" x2="' +x+ '" y2="' +y+ '"/>';
        }
        else {
            ops = '<tint color="' +color+ '" alpha="' +alpha+ '" x="' +x+ '" y="' +y+ '" width="1" height="1"/>';
        }

        return ops;
    }
};


function fillArray(value, count) {
    var result = [];
    for (var i = 0; i < count; i ++) {
        result[i] = value;
    }


    return result;
}


function shade(color, factor) {
    var result;

    if (_.isArray(factor)) {
        result = []; 

        for (var i = 0; i < factor.length; i++) {
            result[i] =  _.sprintf('shade/%s/%.2f', color, factor[i]);
        }
    }
    else {
        result = _.sprintf('shade/%s/%.2f', color, factor);
    }


    return result;
}

function blend(color, blendColor, blendFactor) {
    var result;

    if (_.isArray(blendFactor)) {
        result = []; 

        for (var i = 0; i < factor.length; i++) {
            result[i] =  _.sprintf('blend/%s/%s/%.2f', color, blendColor, blendFactor[i]);
        }
    }
    else {
        result = _.sprintf('blend/%s/%s/%.2f', color, blendColor, blendFactor);
    }

    return result;
}


function drawOutline(data) {
    data.draw = draw;
    return renderEjsFile('parts/outline.tpl', data);
}

function drawTopBar(data) {
    return renderEjsFile('parts/topbar.tpl', data);
}



function drawTitle(name, colors, draw_ops) {
    var data = merger.cloneextend(colors,  {
        name: name
    });

    return renderEjsFile('parts/title.tpl', data);

    
    //var ops = draw_ops.replace(/HILITE/g, colors.highlight);
    //ops = ops.replace(/COLOR/g, colors.text);

    //return '<draw_ops name="' + name + '">\n' + ops +  '</draw_ops>\n';
}



var titles = {
    // dark text uses brightened inset
    windowsTextDark: {
        focused: {
            text: 'shade/gtk:fg[NORMAL]/1.0', 
            highlight: "shade/gtk:bg[NORMAL]/1.0"
        },

        unfocused: {
            text: 'shade/gtk:fg[NORMAL]/1.2', 
            highlight: 'shade/gtk:bg[NORMAL]/1.2'
        }
    }
};


var topBars = {

    windowsBackground: {
        windowFocused: {
            name: 'bg_topbar_focused',

            // [0,1]=top 50% [2,3]=bottom 50%
            gradients:  ['shade/gtk:bg[NORMAL]/0.9', 'shade/gtk:bg[NORMAL]/0.8', 'shade/gtk:bg[NORMAL]/0.8', 'shade/gtk:bg[NORMAL]/0.7'],

            // white alpha: [0]=top [1]=left [2]=right [3]=bottom
            highlights: [0.05, 0.00, 0.00, 0.00],

            // white alpha
            highlightArc: 'shade/gtk:bg[NORMAL]/0.88'
        },

        windowUnfocused: {
            name: 'bg_topbar_unfocused',
            gradients:  ['shade/gtk:bg[NORMAL]/1.3', 'shade/gtk:bg[NORMAL]/1.1', 'shade/gtk:bg[NORMAL]/1.1', 'shade/gtk:bg[NORMAL]/0.9'],
            highlights: [0.05, 0.0, 0.0, 0.0],
            highlightArc: 'shade/gtk:bg[NORMAL]/1.28'
        }
    },


    raven: {
        windowFocused: {
            name: 'bg_topbar_focused',

            // [0,1]=top 50% [2,3]=bottom 50%
            gradients:  ['#282828', '#1c1c1c', '#1a1a1a', '#101010'],

            // white alpha: [0]=top [1]=left [2]=right [3]=bottom
            highlights: [0.01, 0.00, 0.00, 0.00],

            // white alpha
            highlightArc: '#2a2a2a'
        },

        windowUnfocused: {
            name: 'bg_topbar_unfocused',
            gradients:  ['#303030', '#242424', '#222222', '#181818'],
            highlights: [0.01, 0.0, 0.0, 0.0],
            highlightArc: '#323232'
        }
    },

    shiny: {
        windowFocused: {
            // [0,1]=top 50% [2,3]=bottom 50%
            gradients:  ['#cbcbcb', '#b6b6b6', '#b1b1b1', '#9c9c9c'],

            // white alpha: [0]=top [1]=left [2]=right [3]=bottom
            //highlights: [0.09, 0.00, 0.00, 0.00],

            // white alpha
            highlightArc: 'shade/#808080/1.42'
        },

        windowUnfocused: {
            gradients: ['#dfdfdf', '#cacaca', '#c5c5c5', '#b0b0b0'],
            //highlights: [0.09, 0.04, 0.04, 0.04],
            highlightArc: 'shade/#808080/1.48'
        }
    },

    smooth: {
        init: function() {
            // unfocused is based on focused
            merger.add(this.windowUnfocused, this.windowFocused);

            // utility focused is drawn like window unfocused
            merger.add(this.utilityFocused, this.windowFocused);

            // utility unfocused is drawn like window unfocused
            merger.add(this.utilityUnfocused, this.windowUnfocused);

            merger.add(this.windowMaxUnfocused, this.windowUnfocused);
            merger.add(this.windowMaxFocused, this.windowFocused);
        },

        windowFocused: {
            effectiveHeight: "(title_height + 8)",

            name: 'bg_topbar_focused',

            // [0,1]=top 50% [2,3]=bottom 50%
            //gradients:  ['#c4c4c4', '#b0b0b0', '#afafaf', '#9b9b9b'],
            gradients:  ['#c6c6c6', '#b0b0b0', '#afafaf', '#999999'],

            // white alpha: [0]=top [1]=left [2]=right [3]=bottom
            highlights: ['0.1', '0.03', '0.03', '0.03'],

            // white alpha
            highlightArc:'shade/#808080/1.4'
        },

        windowUnfocused: {
            name: 'bg_topbar_unfocused',
            gradients: ['#dadada', '#c6c6c6', '#c5c5c5', '#b0b0b0'],
            highlightArc:'shade/#808080/1.48'
        },

        windowMaxFocused: {
            name: 'bg_topbar_focused_max',
            isRounded: false
        },

        windowMaxUnfocused: {
            name: 'bg_topbar_unfocused_max',
            isRounded: false
        },

        utilityFocused: {
            effectiveHeight: "(title_height + 4)",
            name: 'bg_topbar_small_focused',
            isRounded: false
        },

        utilityUnfocused: {
            effectiveHeight: "(title_height + 4)",
            name: 'bg_topbar_small_unfocused',
            isRounded: false
        }
    }
};


/*
        # Windows : Text
	fg[NORMAL]        = @fg_color
	fg[PRELIGHT]      = @fg_color
	fg[ACTIVE]        = @fg_color
	fg[SELECTED]      = @selected_fg_color
	fg[INSENSITIVE]   = darker (@bg_color)

        # Windows : Background
	bg[NORMAL]        = @bg_color
	bg[PRELIGHT]      = shade (1.02, @bg_color)
	bg[ACTIVE]        = shade (0.88, @bg_color)
	bg[SELECTED]	  = @selected_bg_color
	bg[INSENSITIVE]   = @bg_color

        # Input boxes : Background
	base[NORMAL]      = @base_color
	base[PRELIGHT]    = shade (0.95, @bg_color)
	base[ACTIVE]      = mix (0.7, @selected_bg_color, @bg_color)
	base[SELECTED]    = @selected_bg_color
	base[INSENSITIVE] = @bg_color

        # Input boxes : Text
	text[NORMAL]      = @text_color
	text[PRELIGHT]    = @text_color
	text[ACTIVE]      = @selected_fg_color
	text[SELECTED]    = @selected_fg_color
	text[INSENSITIVE] = darker (@bg_color)
*/


var colors = {
    fgNormal: 'gtk:fg[NORMAL]',
    fgPrelight: 'gtk:fg[PRELIGHT]',
    fgActive: 'gtk:fg[ACTIVE]',
    fgSelected: 'gtk:fg[SELECTED]',
    fgInsensitive: 'gtk:fg[INSENSITIVE]',

    bgNormal: 'gtk:bg[NORMAL]',
    bgPrelight: 'gtk:bg[PRELIGHT]',
    bgActive: 'gtk:bg[ACTIVE]',
    bgSelected: 'gtk:bg[SELECTED]',
    bgInsensitive: 'gtk:bg[INSENSITIVE]',


    baseNormal: 'gtk:base[NORMAL]',
    basePrelight: 'gtk:base[PRELIGHT]',
    baseActive: 'gtk:base[ACTIVE]',
    baseSelected: 'gtk:base[SELECTED]',
    baseInsensitive: 'gtk:base[INSENSITIVE]',

    textNormal: 'gtk:text[NORMAL]',
    textPrelight: 'gtk:text[PRELIGHT]',
    textActive: 'gtk:text[ACTIVE]',
    textSelected: 'gtk:text[SELECTED]',
    textInsensitive: 'gtk:text[INSENSITIVE]'
};


var ioTheme = {
    borderWidth : 1,
    buttonPadding: 0,
    titleBarLRPadding: 8,

    topBars: {
        windowFocused: {
            name: 'bg_topbar_focused',

            // [0,1]=top 50% [2,3]=bottom 50%
            gradients: shade(colors.bgNormal, [0.9, 0.77, 0.73, 0.60]),

            // white alpha: [0]=top [1]=left [2]=right [3]=bottom
            highlights: [0.04, 0.00, 0.00, 0.00],

            // white alpha
            highlightArc: shade(colors.bgNormal, 0.93)
        },
        windowUnfocused: {
            name: 'bg_topbar_unfocused',
            gradients: shade(colors.bgNormal, [1.15, 1.02, 0.98, 0.85]),
            highlights: [0.05, 0.0, 0.0, 0.0],
            highlightArc: shade(colors.bgNormal, 1.08)
        }
    },


    titles: {
        focused: {
            //text: shade(colors.fgNormal, 0.6), 
            text: blend('#cccccc', colors.bgSelected, 0.5), 
            style: styles.titleTopInset,
            highlight: shade(colors.bgNormal, 0.55) 
        },

        unfocused: {
            text: blend(colors.bgNormal, colors.fgNormal, 0.8),
            highlight: shade(colors.bgNormal, 1.1)
        }
    },

    outlines: { 
        windowFocused: { 
            topBar: {
                shadow: shade(colors.bgNormal, 0.4)
            },
            outline: {
                // [0]=title top [1]=client top [2]=client bottom
                gradients: shade(colors.bgNormal, [0.8, 0.5, 0.5, 0.5]),
                arc: shade(colors.bgNormal, 0.77)
            }
        },
        windowUnfocused: {
            topBar: {
                shadow: shade(colors.bgNormal, 0.65)
            },
            outline: {
                // [0]=title top [1]=client top [2]=client bottom
                gradients: shade(colors.bgNormal, [0.8, 0.7, 0.7, 0.7]),
                arc: shade(colors.bgNormal, 0.83)
            }
        }
    },

    buttons: {
        common: {
            // 0=focused normal 1=focused  prelight 2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: shade('#808080', [0.55, 0.30, 0.10,   0.90, 0.50, 0.35]),
            bgColors: shade('white', [0.75, 0.75, 0.75,   0.80, 0.80, 0.80])
        },

        close: {
            // copy color to maximize, restore, minimize
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [0.90, 1.0, 0.80]).concat(
                      shade(colors.bgNormal, [1.0, 1.1, 0.9])
            ),

            // 0=focused 1=unfocused 
            images: fillArray('images/gray-15/close-x.png', 2),
            bgImages: fillArray('images/gray-15/bar-right.png', 2),
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        maximize: {
            // copy color to maximize, restore, minimize
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [1.0, 1.1, 0.9]).concat(
                      shade(colors.bgNormal, [1.1, 1.2, 1.0])
            ),

            images: fillArray('images/gray-15/maximize-small.png', 2),
            bgImages: fillArray('images/gray-15/bar-mid.png', 2),
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        restore: {
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [1.0, 1.1, 0.9]).concat(
                      shade(colors.bgNormal, [1.1, 1.2, 1.0])
            ),

            images: fillArray('images/gray-15/restore-small.png', 2),
            bgImages: fillArray('images/gray-15/bar-mid.png', 2),
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        minimize: {
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [1.1, 1.2, 1.1]).concat(
                      shade(colors.bgNormal, [1.2, 1.3, 1.1])
            ),

            images: fillArray('images/gray-15/minimize-small.png', 2),
            bgImages: fillArray('images/gray-15/bar-left.png', 2),
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        shade: {
            colors: shade(colors.bgSelected, [0.90, 1.0, 0.80]).concat(
                      shade(colors.bgNormal, [1.0, 1.1, 0.9])
            ),
            images: fillArray('images/gray-15/shade-gloss.png', 2), 
            buttonStyle: BUTTON_STYLE_SINGLE_IMAGE
        },

        unshade: {
            colors: shade(colors.bgSelected, [0.90, 1.0, 0.80]).concat(
                      shade(colors.bgNormal, [1.0, 1.1, 0.9])
            ),
            images: fillArray('images/gray-15/unshade-right-gloss.png', 2), 
            buttonStyle: BUTTON_STYLE_SINGLE_IMAGE
        },

        utility_close: {
            colors: ['white', 'shade/red/0.9', 'shade/red/0.7', // focused
                blend(colors.bgNormal, colors.fgNormal, 0.8), blend(colors.bgNormal, colors.fgNormal, 0.6), blend(colors.bgNormal, colors.fgNormal, 0.7)
            ],
            bgColors: shade('white', fillArray(0.8, 6)),
            images: fillArray('images/gray-15/close-x.png', 2), 
            bgImages: fillArray('images/gray-15/blank.png', 2),
            buttonStyle: BUTTON_STYLE_DEFAULT
        },

        utility_shade: {
            colors: [shade('white', 1.0), shade('white', 1.1), shade('white', 0.9), // focused
                blend(colors.bgNormal, colors.fgNormal, 0.8), blend(colors.bgNormal, colors.fgNormal, 0.6), blend(colors.bgNormal, colors.fgNormal, 0.7)
            ],
            bgColors: shade('white', fillArray(0.8, 6)),
            images: fillArray('images/gray-15/shade.png', 2),
            bgImages: fillArray('images/gray-15/blank.png', 2),
            buttonStyle: BUTTON_STYLE_DEFAULT
        },

        utility_unshade: {
            colors: [shade('white', 1.0), shade('white', 1.1), shade('white', 0.9), // focused
                blend(colors.bgNormal, colors.fgNormal, 0.8), blend(colors.bgNormal, colors.fgNormal, 0.6), blend(colors.bgNormal, colors.fgNormal, 0.7)
            ],
            bgColors: shade('white', fillArray(0.8, 6)),
            images: fillArray('images/gray-15/unshade.png', 2),
            bgImages: fillArray('images/gray-15/blank.png', 2),
            buttonStyle: BUTTON_STYLE_DEFAULT
        },

        dialog_close: {
            bgImages: ['images/gray-15/bar-solo.png', 'images/gray-15/bar-solo.png']
        },

        menu: {
            images: ['images/gray-15/shade-filled.png', 'images/gray-15/shade-filled.png']
        }
    }
};

var ioThemeLeft = merger.cloneextend(ioTheme, {
    buttons: {
        utility_unshade: {
            images: fillArray('images/gray-15/unshade-left.png', 2)
        },

        close: {
            // copy color to maximize, restore, minimize
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [0.90, 1.0, 0.80]).concat(
                      shade(colors.bgNormal, [1.0, 1.1, 0.9])
            ),

            // 0=focused 1=unfocused 
            images: fillArray('images/gray-15/close-x.png', 2),
            bgImages: fillArray('images/gray-15/bar-left.png', 2),
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        maximize: {
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [1.1, 1.2, 1.1]).concat(
                      shade(colors.bgNormal, [1.2, 1.3, 1.1])
            ),

            images: fillArray('images/gray-15/maximize-small.png', 2),
            bgImages: fillArray('images/gray-15/bar-right.png', 2),
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        restore: {
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [1.1, 1.2, 1.1]).concat(
                      shade(colors.bgNormal, [1.2, 1.3, 1.1])
            ),

            images: fillArray('images/gray-15/restore-small.png', 2),
            bgImages: fillArray('images/gray-15/bar-right.png', 2),
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        minimize: {
            // copy color to maximize, restore, minimize
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [1.0, 1.1, 0.9]).concat(
                      shade(colors.bgNormal, [1.1, 1.2, 1.0])
            ),

            images: fillArray('images/gray-15/minimize-small.png', 2),
            bgImages: fillArray('images/gray-15/bar-mid.png', 2),
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        unshade: {
            images: fillArray('images/gray-15/unshade-left-gloss.png', 2) 
        }
    }

});

var ravenTheme = {
    borderWidth : 3,

    topBars: topBars.raven,

    outlines: {
        windowFocused: {
            topBar: {
                shadow: "#0c0c0c"
            },
            outline: {
                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#2c2c2c', '#181818', '#181818', '#181818'],
                arc: 'shade/#2c2c2c/1.02'
            }
        },

        windowUnfocused: {
            topBar: {
                shadow: "#101010"
            },

            outline: {
                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#2c2c2c', '#181818', '#181818', '#181818'],
                arc: 'shade/#2c2c2c/1.02'
            }
        }
    },


    titles: {
        focused: {
            text: 'shade/#aa9b8b/0.97', 
            highlight: "#202020"
        },

        unfocused: {
            text: 'shade/#4d463f/1.03', 
            highlight: 'shade/#808080/0.12'
        }
    },


    buttons: {
        common: {
            // 0=focused normal   1=focused  prelight  2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: [
                "shade/#aa9b8b/0.8", "shade/#aa9b8b/0.5", "shade/#aa9b8b/0.2",
                "shade/#4d463f/0.82", "shade/#80756a/1.0", "shade/#80756a/0.5"
            ],
            bgColors: [
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // focused
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05'     // unfocused
            ]

        },

        close: {
            colors: [
                'shade/red/0.7', 'red', 'shade/red/0.5', 
                "shade/#4d463f/0.82", 'shade/red/0.7', 'shade/red/0.5'
            ],
            bgColors: [
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // focused
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05'     // unfocused
            ],


            images: ['images/gray-15/close-2px-x.png', 'images/gray-15/close-1px-x.png'],
            bgImages: ['images/gray-15/close-2px-x.png', 'images/gray-15/close-1px-x.png']
        }
    }
};


var shinyTheme = {
    topBars: topBars.shiny
};



var dotTheme = {
    buttons : {
        close: {
            // 0=focused normal 1=focused  prelight 2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: [
                'shade/#808080/0.55', 'shade/#808080/0.3', 'shade/#808080/0.1', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            bgColors: ['shade/white/0.75', 'shade/white/0.75', 'shade/white/0.75', 'shade/white/0.8', 'shade/white/0.8', 'shade/white/0.8' ],


            // 0=focused 1=unfocused
            images: ['images/gray-15/close-dot.png', 'images/gray-15/close-dot.png'],
            bgImages: ['images/gray-15/close-dot.png', 'images/gray-15/close-dot.png']
        }
    }
};


var buttons = {
    leafy: {
        close: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.8', 'shade/red/0.9', 'shade/red/0.6', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            bgColors: [
                'shade/white/0.73', 'shade/white/0.73', 'shade/white/0.73', 
                'shade/white/0.8', 'shade/white/0.8', 'shade/white/0.8'
            ],


            // 0=focused 1=unfocused
            images: ['images/gray-15/close-leafy.png', 'images/gray-15/close-leafy.png'],
            bgImages: ['images/gray-15/close-leafy.png', 'images/gray-15/close-leafy.png']
        }
    }
};




var soxxTheme = {
    topBars: topBars.shiny,
    buttons: buttons.leafy,
    titleBarLRPadding: 6,
    buttonPadding: 3
};


var soxTheme = {
    topBars: topBars.shiny,
    buttonPadding: 3,

    buttons: {
        common: {
            // 0=focused normal 1=focused  prelight 2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: shade('#808080', [0.55, 0.30, 0.10,   0.90, 0.50, 0.35]),
            bgColors: shade('white', [0.75, 0.75, 0.75,   0.80, 0.80, 0.80])
        },

        close: {
            // copy color to maximize, restore, minimize
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [0.88, 0.98, 0.78]).concat(
                shade('white', [0.66, 0.76, 0.66])
            ),

            // 0=focused 1=unfocused 
            images: ['images/gray-15/close-x.png', 'images/gray-15/close-x.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },


        maximize: {
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [0.95, 1.05, 0.85]).concat(
                shade('white', [0.7, 0.8, 0.6])
            ),
            images: ['images/gray-15/maximize-small.png', 'images/gray-15/maximize-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        restore: {
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [0.95, 1.05, 0.85]).concat(
                shade('white', [0.7, 0.8, 0.6])
            ),
            images: ['images/gray-15/restore-small.png', 'images/gray-15/restore-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        minimize: {
            colors: shade(colors.bgSelected, [0.5, 0.5, 0.5,  0.5, 0.5, 0.5]),
            bgColors: shade(colors.bgSelected, [1.02, 1.12, 0.92]).concat(
                shade('white', [0.74, 0.84, 0.64])
            ),

            images: ['images/gray-15/minimize-small.png', 'images/gray-15/minimize-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        shade: {
            colors: shade(colors.bgSelected, [0.88, 0.98, 0.78]).concat(
                shade('white', [0.66, 0.76, 0.66])
            ),
            images: ['images/gray-15/shade-gloss-lb.png', 'images/gray-15/shade-gloss-lb.png'],
            buttonStyle: BUTTON_STYLE_SINGLE_IMAGE
        },

        unshade: {
            colors: shade(colors.bgSelected, [0.88, 0.98, 0.78]).concat(
                shade('white', [0.66, 0.76, 0.66])
            ),
            images: ['images/gray-15/unshade-right-gloss-lb.png', 'images/gray-15/unshade-right-gloss-lb.png'],
            buttonStyle: BUTTON_STYLE_SINGLE_IMAGE
        },

        menu: {
            images: ['images/gray-15/shade-filled.png', 'images/gray-15/shade-filled.png']
        },

        utility_close: {
            images: ['images/gray-15/close-x.png', 'images/gray-15/close-x.png'],
            bgImages: ['images/gray-15/close-x.png', 'images/gray-15/close-x.png'],
            buttonStyle: BUTTON_STYLE_DEFAULT
        }
    }
};

var soxBarTheme = merger.cloneextend(soxTheme, {
    buttonPadding: 0,
    titleBarLRPadding: 8,
    buttons: {
        close: {
            bgImages: ['images/gray-15/bar-right.png', 'images/gray-15/bar-right.png']
        },
        dialog_close: {
            bgImages: ['images/gray-15/bar-solo.png', 'images/gray-15/bar-solo.png']
        },
        maximize: {
            bgImages: ['images/gray-15/bar-mid.png', 'images/gray-15/bar-mid.png']
        },
        restore: {
            bgImages: ['images/gray-15/bar-mid.png', 'images/gray-15/bar-mid.png']
        },
        minimize: {
            bgImages: ['images/gray-15/bar-left.png', 'images/gray-15/bar-left.png']
        },
        shade: {
            images: ['images/gray-15/shade-gloss.png', 'images/gray-15/shade-gloss.png']
        },
        unshade: {
            images: ['images/gray-15/unshade-right-gloss.png', 'images/gray-15/unshade-right-gloss.png']
        }
    }
});


var soxlTheme = merger.cloneextend(soxTheme, {
    buttons: {
        maximize: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
                'shade/white/0.70', 'shade/white/0.5', 'shade/white/0.3'
            ],
            bgColors: [
                'shade/gtk:bg[SELECTED]/1.02', 'shade/gtk:bg[SELECTED]/1.12', 'shade/gtk:bg[SELECTED]/0.92', 
                'shade/white/0.74', 'shade/white/0.84', 'shade/white/0.64'
            ],
            images: ['images/gray-15/maximize-small.png', 'images/gray-15/maximize-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        restore: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
                'shade/white/0.70', 'shade/white/0.5', 'shade/white/0.3'
            ],
            bgColors: [
                'shade/gtk:bg[SELECTED]/1.02', 'shade/gtk:bg[SELECTED]/1.12', 'shade/gtk:bg[SELECTED]/0.92', 
                'shade/white/0.74', 'shade/white/0.84', 'shade/white/0.64'
            ],
            images: ['images/gray-15/restore-small.png', 'images/gray-15/restore-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        minimize: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5' 
            ],
            bgColors: [
                'shade/gtk:bg[SELECTED]/0.95', 'shade/gtk:bg[SELECTED]/1.05', 'shade/gtk:bg[SELECTED]/0.85', 
                'shade/white/0.7', 'shade/white/0.80', 'shade/white/0.6'
            ],
            images: ['images/gray-15/minimize-small.png', 'images/gray-15/minimize-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON
        },

        unshade: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.9', 'shade/gtk:bg[SELECTED]/1.0', 'shade/gtk:bg[SELECTED]/0.8', 
                'shade/#808080/1.3', 'shade/#808080/1.4', 'shade/#808080/1.2' 
            ],
            images: ['images/gray-15/unshade-left-gloss-lb.png', 'images/gray-15/unshade-left-gloss-lb.png'],
            buttonStyle: BUTTON_STYLE_SINGLE_IMAGE
        }

    }
    
});

var soxBarLeftTheme = merger.cloneextend(soxlTheme, {
    buttonPadding: 0,
    titleBarLRPadding: 8,
    buttons: {
        close: {
            bgImages: fillArray('images/gray-15/bar-left.png', 2) 
        },
        dialog_close: {
            bgImages: fillArray('images/gray-15/bar-solo.png', 2)
        },
        maximize: {
            bgImages: fillArray('images/gray-15/bar-right.png', 2)
        },
        restore: {
            bgImages: fillArray('images/gray-15/bar-right.png', 2)
        },
        minimize: {
            bgImages: fillArray('images/gray-15/bar-mid.png', 2)
        },
        shade: {
            images: fillArray('images/gray-15/shade-gloss.png', 2) 
        },
        unshade: {
            images: fillArray('images/gray-15/unshade-left-gloss.png', 2) 
        }
    }
});


var smoothTheme = {};

var base = {
    theme: {
        style: ''
    },

    topBarEffectiveHeight: topBars.smooth.windowFocused.effectiveHeight,
    titleBarLRPadding: 5,
    buttonPadding: 1,

    borderWidth: 1,
    topRounding: false, // version 1 can only be true | false
    isRounded: false,

    titles: {
        focused: {
            text: '#222222', 
            style: styles.titleBottomInset,
            highlight: "#b8b8b8"
        },

        unfocused: {
            text: '#585858', 
            style: styles.titleBottomInset,
            highlight: "#c8c8c8"
        }
    },

    buttons: {
        init: function() {
            // dialog_close should be same as close in most cases
            merger.add(this.dialog_close, this.close);
            merger.add(this.utility_shade, this.shade);
            merger.add(this.utility_unshade, this.unshade);

            // add common properties if not found on target button
            var buttons = this;
            _(buttons).chain()
                .keys().without('common', 'init')
                .each(function(name) {
                    merger.add(buttons[name], buttons.common);
                });
        },

        common: {
            // 0=focused normal 1=focused  prelight 2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: shade('#808080', [0.55, 0.3, 0.1,  0.9, 0.5, 0.35]),
            colors2: [
                'shade/#808080/0.55', 'shade/#808080/0.3', 'shade/#808080/0.1', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            bgColors: shade('white', [0.75, 0.75, 0.76,   0.8, 0.8, 0.8]),
            bgColors2: ['shade/white/0.75', 'shade/white/0.75', 'shade/white/0.75', 
                'shade/white/0.8', 'shade/white/0.8', 'shade/white/0.8' ],


            buttonStyle: BUTTON_STYLE_DEFAULT
        },

        close: {
            colors: [
                'shade/#808080/0.6', 'shade/' + DEBIAN_RED + '/0.85', 'shade/' + DEBIAN_RED + '/0.7', 
                'shade/#808080/0.7', 'shade/#808080/0.5', 'shade/#808080/0.35'
            ],
            bgColors: [
                'shade/white/0.75', 'shade/white/0.75', 'shade/white/0.75', 
                'shade/white/0.85', 'shade/white/0.8', 'shade/white/0.8'
            ],


            // 0=focused 1=unfocused
            images: ['images/gray-15/close-1px-x.png', 'images/gray-15/close-1px-aa-x.png'],
            bgImages: ['images/gray-15/close-1px-x.png', 'images/gray-15/close-1px-aa-x.png']
        },

        dialog_close: {
        },

        utility_close: {
            images: ['images/gray-15/close-x.png','images/gray-15/close-x.png'],
            bgImages: ['images/gray-15/close-x.png','images/gray-15/close-x.png']
        },

        maximize: {
            images: ['images/gray-15/maximize.png','images/gray-15/maximize.png'],
            bgImages: ['images/gray-15/maximize.png','images/gray-15/maximize.png']
        },

        restore: {
            images: ['images/gray-15/restore.png','images/gray-15/restore.png'],
            bgImages: ['images/gray-15/restore.png','images/gray-15/restore.png']
        },

        minimize: {
            images: ['images/gray-15/minimize.png','images/gray-15/minimize.png'],
            bgImages: ['images/gray-15/minimize.png','images/gray-15/minimize.png']
        },

        shade: {
            images:['images/gray-15/shade.png','images/gray-15/shade.png'],
            bgImages:['images/gray-15/shade.png','images/gray-15/shade.png']
        },

        unshade: {
            images:['images/gray-15/unshade.png','images/gray-15/unshade.png'],
            bgImages:['images/gray-15/unshade.png','images/gray-15/unshade.png']
        },


        utility_shade: {
            images:['images/gray-15/shade.png','images/gray-15/shade.png'],
            bgImages:['images/gray-15/shade.png','images/gray-15/shade.png']
        },

        utility_unshade: {
            images:['images/gray-15/unshade.png','images/gray-15/unshade.png'],
            bgImages:['images/gray-15/unshade.png','images/gray-15/unshade.png']
        },

        menu: {
            images:['images/gray-15/shade.png','images/gray-15/shade.png'],
            bgImages:['images/gray-15/shade.png','images/gray-15/shade.png']
        }
    },


    topBars: topBars.smooth,


    drawTopBars: function() {
        var parent = this;
        var topBars = this.topBars;
        topBars.init(); 
        var xml = '';

        _(this.topBars).chain()
            .keys()
            .without('init')
            .each(function(name) {
                var data = {};
                data.topBar = merger.clone(topBars[name]);
                data.draw = draw;

                // skip utility windows
                if (name.indexOf('utility') < 0) {
                    data.topBar.isRounded = parent.isRounded;
                }

                xml += drawTopBar(data);
            });

        return xml;
    },


    outlines: {
        init: function(isRounded) {
            this.windowFocused.theme.isRounded = isRounded;
            this.windowUnfocused.theme.isRounded = isRounded;
        },

        windowFocused: {
            topBar: {
                effectiveHeight: topBars.smooth.windowFocused.effectiveHeight,
                shadow: "#6a6a6a"
            },

            outline: {
                name: "outline_focused",

                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#9c9c9c', '#808080', '#808080', '#707070'],
                arc: 'shade/#9c9c9c/1.02'
            },

            theme: {}
        },


        windowUnfocused: {
            topBar: {
                effectiveHeight: topBars.smooth.windowFocused.effectiveHeight,
                shadow: "#7c7c7c"
            },

            outline: {
                name: "outline_unfocused",

                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#909090', '#8a8a8a','#8a8a8a', '#808080'],
                arc: 'shade/#909090/1.02'
            },

            theme: {}
        },

        utilityFocused: {
            topBar: {
                effectiveHeight: topBars.smooth.utilityFocused.effectiveHeight,
                shadow: "#6a6a6a"
            },

            outline: {
                name: "outline_utility_focused",

                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#9c9c9c', '#808080', '#808080', '#707070'],
                arc: 'shade/#9c9c9c/1.02'
            },

            theme: {
                isRounded: false
            }

        },


        utilityUnfocused: {
            topBar: {
                effectiveHeight: topBars.smooth.utilityFocused.effectiveHeight,
                shadow: "#7c7c7c"
            },

            outline: {
                name: "outline_utility_unfocused",

                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#909090', '#8a8a8a','#8a8a8a', '#808080'],
                arc: 'shade/#909090/1.02'
            },

            theme: {
                isRounded: false
            }
        }
    },


    drawBorders: function() {
        return renderEjsFile('parts/border.tpl', {
            borderWidth: this.borderWidth,
            topBarEffectiveHeight: this.topBarEffectiveHeight
        });
    },


    drawOutlines: function() {
        var xml = '';
        var outlines = this.outlines;
        outlines.init(this.isRounded);

        _(this.outlines).chain()
            .keys().without('init')
            .each(function(key) {
                xml += drawOutline(outlines[key]);
            });

        return xml; 
    },


    drawButtonGlyph: function(name) {
        var button = _.clone(this.buttons[name]);
        button.name = name;

        return renderEjsFile('glyphs/button-glyph.tpl', {button: button});
    },


    drawButtons: function() {
        var xml = '';
        this.buttons.init();

        var self = this;
        _(this.buttons).chain()
            .keys()
            .without('common', 'init')
            .each(function(key) {
                xml += self.drawButtonGlyph(key);
            });

        return xml;
    },


    drawTitles: function() {
        var xml = '';
        xml += drawTitle('title_focused', this.titles.focused);
        xml += drawTitle('title_unfocused', this.titles.unfocused);
        return xml;
    }
};


function renderTheme(themeData, outputDir, isRounded) {
    var theme = outputDir + '/metacity-1/metacity-theme-1.xml';
    fs.writeFileSync(theme, '<!-- v1 placeholder, must exist for v2 but not used -->');


    var data = merger.cloneextend(base, themeData);
    data.topRounding = isRounded ? "4" : "false";
    data.isRounded = isRounded;
    
         
    var template = readFile('metacity.mustache');
    var html = mustache.to_html(template, data);
    theme = outputDir + '/metacity-1/metacity-theme-2.xml';
    fs.writeFileSync(theme, html);
}


function run() {
    // constants
    var square = false;
    var rounded = true; 

    var themes = {
        // make local copy for debugging
        "src": [smoothTheme, rounded],

        "Function": [smoothTheme, square],
        "Function Shiny": [shinyTheme, square],
        "Function Dot": [dotTheme, square],
        "Function Raven": [ravenTheme, square],

        "Lambda": [smoothTheme, rounded],
        "Lambda Shiny": [shinyTheme, rounded],
        "Lambda Dot": [dotTheme, rounded],
        "Lambda Raven": [ravenTheme, rounded],

        "SO X.": [soxTheme, rounded],
        "SO X. Bar": [soxBarTheme, rounded],
        "SO X. Bar Left": [soxBarLeftTheme, rounded],
        "SO X. IO": [ioTheme, rounded],
        "SO X. IO Left": [ioThemeLeft, rounded],
        "SO X. X": [soxxTheme, rounded],
        "SO X. Left": [soxlTheme, rounded]
    };


    for (var theme in themes) {
        if (themes.hasOwnProperty(theme)) {
            var data = themes[theme][0];
            var isRounded = themes[theme][1];

            renderTheme(data, __dirname + '/../../' + theme, isRounded);
        }
    }
}

run();
