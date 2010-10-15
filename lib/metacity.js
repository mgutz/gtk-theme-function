/**
 * Generates metacity theme.
 *
 * To run
 *   node metacity.js
 */

require('underscore');
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

var ravenTheme = {
    border_width : 3,

    topBars: {
        windowFocused: {
            effectiveHeight: "(title_height + 8)",
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
        },
    },

    outlines: {
        windowFocused: {
            topBar: {
                shadow: "#0c0c0c",
            },
            outline: {
                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#2c2c2c', '#181818', '#181818', '#181818'],
                arc: 'shade/#2c2c2c/1.02',
            },
        },


        windowUnfocused: {
            topBar: {
                shadow: "#101010",
            },

            outline: {
                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#2c2c2c', '#181818', '#181818', '#181818'],
                arc: 'shade/#2c2c2c/1.02',
            },
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
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // unfocused
            ],

        },

        close: {
            colors: [
                'shade/red/0.7', 'red', 'shade/red/0.5', 
                "shade/#4d463f/0.82", 'shade/red/0.7', 'shade/red/0.5',
            ],
            bgColors: [
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // focused
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // unfocused
            ],


            images: ['images/gray-15/close-2px-x.png', 'images/gray-15/close-1px-x.png'],
            bgImages: ['images/gray-15/close-2px-x.png', 'images/gray-15/close-1px-x.png'],
        },
    }
};

var topBars = {
    shiny: {
        windowFocused: {
            // [0,1]=top 50% [2,3]=bottom 50%
            gradients:  ['#cbcbcb', '#b6b6b6', '#b1b1b1', '#9c9c9c'],

            // white alpha: [0]=top [1]=left [2]=right [3]=bottom
            highlights: [0.09, 0.04, 0.04, 0.04],

            // white alpha
            highlightArc: 'shade/#808080/1.40',
        },

        windowUnfocused: {
            gradients: ['#dfdfdf', '#cacaca', '#c5c5c5', '#b0b0b0'],
            highlights: [0.09, 0.04, 0.04, 0.04],
            highlightArc: 'shade/#808080/1.48',
        },
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
            gradients:  ['#c4c4c4', '#b0b0b0', '#afafaf', '#9b9b9b'],

            // white alpha: [0]=top [1]=left [2]=right [3]=bottom
            highlights: ['0.1', '0.0', '0.0', '0.0'],

            // white alpha
            highlightArc:'shade/#808080/1.4',
        },

        windowUnfocused: {
            name: 'bg_topbar_unfocused',
            gradients: ['#dadada', '#c6c6c6', '#c5c5c5', '#b0b0b0'],
            highlights: [0.1, 0.0, 0.0, 0.0],
            highlightArc:'shade/#808080/1.48',
        },

        windowMaxFocused: {
            name: 'bg_topbar_focused_max',
            isRounded: false,
        },

        windowMaxUnfocused: {
            name: 'bg_topbar_unfocused_max',
            isRounded: false,
        },

        utilityFocused: {
            effectiveHeight: "(title_height + 4)",
            name: 'bg_topbar_small_focused',
            isRounded: false,
        },

        utilityUnfocused: {
            effectiveHeight: "(title_height + 4)",
            name: 'bg_topbar_small_unfocused',
            isRounded: false,
        }
    },
};


var shinyTheme = {
    topBars: topBars.shiny,
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
            bgImages: ['images/gray-15/close-dot.png', 'images/gray-15/close-dot.png'],
        },
    },
};


var buttons = {
    leafy: {
        close: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.8', 'shade/' + DEBIAN_RED + '/0.85', 'shade/' + DEBIAN_RED + '/0.7', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            bgColors: [
                'shade/white/0.73', 'shade/white/0.73', 'shade/white/0.73', 
                'shade/white/0.8', 'shade/white/0.8', 'shade/white/0.8'
            ],


            // 0=focused 1=unfocused
            images: ['images/gray-15/close-leafy.png', 'images/gray-15/close-leafy.png'],
            bgImages: ['images/gray-15/close-leafy.png', 'images/gray-15/close-leafy.png'],
        },
    }
};




var soxxTheme = {
    topBars: topBars.shiny,
    buttons: buttons.leafy,
    titleBarLRPadding: 6,
    buttonPadding: 3,
};


var draw = {
    point: function(color, x, y, alpha) {
        if (!alpha) {
            ops = '<line color="' +color+ '" width="0" x1="' +x+ '" y1="' +y+ '" x2="' +x+ '" y2="' +y+ '"/>';
        }
        else {
            ops = '<tint color="' +color+ '" alpha="' +alpha+ '" x="' +x+ '" y="' +y+ '" width="1" height="1"/>';
        }

        return ops;
    },
};



var soxTheme = {
    topBars: topBars.shiny,
    buttonPadding: 4,

    buttons: {
        common: {
            // 0=focused normal 1=focused  prelight 2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: [
                'shade/#808080/0.55', 'shade/#808080/0.3', 'shade/#808080/0.1', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            bgColors: [
                'shade/white/0.75', 'shade/white/0.75', 'shade/white/0.75',
                'shade/white/0.8', 'shade/white/0.8', 'shade/white/0.8'
            ],

        },

        close: {
            // copy color to maximize, restore, minimize
            colors: [
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
            ],
            bgColors: [
                'shade/gtk:bg[SELECTED]/0.88', 'shade/gtk:bg[SELECTED]/0.98', 'shade/gtk:bg[SELECTED]/0.78', 
                'shade/white/0.66', 'shade/white/0.76', 'shade/white/0.66'
            ],

            // 0=focused 1=unfocused 
            images: ['images/gray-15/close-x.png', 'images/gray-15/close-x.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON,
        },

        utility_close: {
            images: ['images/gray-15/close-x.png', 'images/gray-15/close-x.png'],
            bgImages: ['images/gray-15/close-x.png', 'images/gray-15/close-x.png'],
            buttonStyle: BUTTON_STYLE_DEFAULT,
        },

        maximize: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
            ],
            bgColors: [
                'shade/gtk:bg[SELECTED]/0.95', 'shade/gtk:bg[SELECTED]/1.05', 'shade/gtk:bg[SELECTED]/0.85', 
                'shade/white/0.7', 'shade/white/0.8', 'shade/white/0.6'
            ],
            images: ['images/gray-15/maximize-small.png', 'images/gray-15/maximize-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON,
        },

        restore: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
            ],
            bgColors: [
                'shade/gtk:bg[SELECTED]/0.95', 'shade/gtk:bg[SELECTED]/1.05', 'shade/gtk:bg[SELECTED]/0.85', 
                'shade/white/0.70', 'shade/white/0.80', 'shade/white/0.6'
            ],
            images: ['images/gray-15/restore-small.png', 'images/gray-15/restore-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON,
        },

        minimize: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
                'shade/white/0.70', 'shade/white/0.5', 'shade/white/0.3'
            ],
            bgColors: [
                'shade/gtk:bg[SELECTED]/1.02', 'shade/gtk:bg[SELECTED]/1.12', 'shade/gtk:bg[SELECTED]/0.92', 
                'shade/white/0.74', 'shade/white/0.84', 'shade/white/0.64'
            ],
            images: ['images/gray-15/minimize-small.png', 'images/gray-15/minimize-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON,
        },

        shade: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.8', 'shade/gtk:bg[SELECTED]/0.8', 'shade/gtk:bg[SELECTED]/0.8', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            images: ['images/gray-15/shade-filled.png', 'images/gray-15/shade-filled.png'],
            bgImages: ['images/gray-15/blank.png', 'images/gray-15/blank.png'],
        },

        unshade: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.8', 'shade/gtk:bg[SELECTED]/0.8', 'shade/gtk:bg[SELECTED]/0.8', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            images: ['images/gray-15/unshade-filled.png', 'images/gray-15/unshade-filled.png'],
            bgImages: ['images/gray-15/blank.png', 'images/gray-15/blank.png'],
        },

        menu: {
            images: ['images/gray-15/shade-filled.png', 'images/gray-15/shade-filled.png'],
        },
    },
};

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
            buttonStyle: BUTTON_STYLE_REVEAL_ICON,
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
            buttonStyle: BUTTON_STYLE_REVEAL_ICON,
        },

        minimize: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
                'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 'shade/gtk:bg[SELECTED]/0.5', 
            ],
            bgColors: [
                'shade/gtk:bg[SELECTED]/0.95', 'shade/gtk:bg[SELECTED]/1.05', 'shade/gtk:bg[SELECTED]/0.85', 
                'shade/white/0.7', 'shade/white/0.80', 'shade/white/0.6'
            ],
            images: ['images/gray-15/minimize-small.png', 'images/gray-15/minimize-small.png'],
            bgImages: ['images/gray-15/circle.png', 'images/gray-15/circle.png'],
            buttonStyle: BUTTON_STYLE_REVEAL_ICON,
        },

        unshade: {
            colors: [
                'shade/gtk:bg[SELECTED]/0.8', 'shade/gtk:bg[SELECTED]/0.8', 'shade/gtk:bg[SELECTED]/0.8', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            images: ['images/gray-15/unshade-left-filled.png', 'images/gray-15/unshade-left-filled.png'],
            bgImages: ['images/gray-15/blank.png', 'images/gray-15/blank.png'],
        },

    },
    
});


var smoothTheme = {};

var base = {
    theme: {
        style: '',
    },
    titleBarLRPadding: 5,
    buttonPadding: 1,

    border_width: 1,
    topRounding: false, // version 1 can only be true | false
    isRounded: false,

    titles: {
        focused: {
            text: '#222222', 
            highlight: "#b8b8b8"
        },

        unfocused: {
            text: '#585858', 
            highlight: "#c8c8c8"
        }
    },

    buttons: {
        common: {
            // 0=focused normal 1=focused  prelight 2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: [
                'shade/#808080/0.55', 'shade/#808080/0.3', 'shade/#808080/0.1', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            bgColors: ['shade/white/0.75', 'shade/white/0.75', 'shade/white/0.75', 'shade/white/0.8', 'shade/white/0.8', 'shade/white/0.8' ],


            buttonStyle: BUTTON_STYLE_DEFAULT,
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
            bgImages: ['images/gray-15/close-1px-x.png', 'images/gray-15/close-1px-aa-x.png'],
        },

        utility_close: {
            images: ['images/gray-15/close-x.png','images/gray-15/close-x.png'],
            bgImages: ['images/gray-15/close-x.png','images/gray-15/close-x.png'],
        },

        maximize: {
            images: ['images/gray-15/maximize.png','images/gray-15/maximize.png'],
            bgImages: ['images/gray-15/maximize.png','images/gray-15/maximize.png'],
        },

        restore: {
            images: ['images/gray-15/restore.png','images/gray-15/restore.png'],
            bgImages: ['images/gray-15/restore.png','images/gray-15/restore.png'],
        },

        minimize: {
            images: ['images/gray-15/minimize.png','images/gray-15/minimize.png'],
            bgImages: ['images/gray-15/minimize.png','images/gray-15/minimize.png'],
        },

        shade: {
            images:['images/gray-15/shade.png','images/gray-15/shade.png'],
            bgImages:['images/gray-15/shade.png','images/gray-15/shade.png'],
        },

        unshade: {
            images:['images/gray-15/unshade.png','images/gray-15/unshade.png'],
            bgImages:['images/gray-15/unshade.png','images/gray-15/unshade.png'],
        },

        menu: {
            images:['images/gray-15/shade.png','images/gray-15/shade.png'],
            bgImages:['images/gray-15/shade.png','images/gray-15/shade.png'],
        },
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
                var data = {}
                data.topBar = topBars[name];
                data.draw = draw;
                data.topBar.isRounded = parent.isRounded;

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
                effectiveHeight: "(title_height + 8)",
                shadow: "#707070",
            },

            outline: {
                name: "outline_focused",

                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#9c9c9c', '#808080', '#808080', '#707070'],
                arc: 'shade/#9c9c9c/1.02',
            },

            theme: {}
        },


        windowUnfocused: {
            topBar: {
                effectiveHeight: "(title_height + 8)",
                shadow: "#808080",
            },

            outline: {
                name: "outline_unfocused",

                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#909090', '#8a8a8a','#8a8a8a', '#808080'],
                arc: 'shade/#909090/1.02',
            },

            theme: {}
        }
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
        var button = _.clone(this.buttons.common);
        _.extend(button, this.buttons[name]);
        button.name = name;

        return renderEjsFile('glyphs/button-glyph.tpl', {button: button});
    },


    drawButtons: function() {
        var xml = '';

        var self = this;
        _(this.buttons).chain()
            .keys()
            .without('common')
            .each(function(key) {
                xml += self.drawButtonGlyph(key);
            });

        return xml;
    },


    title: function() {
        return function(draw_ops, render) {
            var section = drawTitle('title_focused', this.titles.focused, draw_ops);
            section += drawTitle('title_unfocused', this.titles.unfocused, draw_ops);

            return render(section);
        };
    },
};


function drawOutline(data) {
    data.draw = draw;
    return renderEjsFile('parts/outline.tpl', data);
}

function drawTopBar(data) {
    return renderEjsFile('parts/topbar.tpl', data);
}


function drawTitle(name, colors, draw_ops) {
    var ops = draw_ops.replace(/HILITE/g, colors.highlight);
    ops = ops.replace(/COLOR/g, colors.text);

    return '<draw_ops name="' + name + '">\n' + ops +  '</draw_ops>\n';
}


function renderTheme(themeData, outputDir, isRounded, partials) {
    var theme = outputDir + '/metacity-1/metacity-theme-1.xml';
    fs.writeFileSync(theme, '<!-- v1 placeholder, must exist for v2 but not used -->');


    //pp(base, "BASE")
    //pp(themeData, "THEMEDATA")
    var data = merger.cloneextend(base, themeData);
    //pp(base, "DATA")

    data.topRounding = isRounded ? "4" : "false";
    data.isRounded = isRounded;
    
         
    var template = readFile('metacity.mustache');
    var html = mustache.to_html(template, data, partials);
    theme = outputDir + '/metacity-1/metacity-theme-2.xml';
    fs.writeFileSync(theme, html);
}


function renderEjsFile(templateFile, data) {
    var template = readFile(templateFile);
    return ejs.render(template, {locals: data});
}

function readFile(relativePath) {
    return fs.readFileSync(__dirname + '/' + relativePath, 'utf8');
}

function run() {
    var partials = {};

    renderTheme(smoothTheme, __dirname + '/..', true, partials); // add to current directory for debugging

    renderTheme(smoothTheme, __dirname + '/../../Function', false, partials);
    renderTheme(dotTheme, __dirname + '/../../Function Dot', false, partials);
    renderTheme(shinyTheme, __dirname + '/../../Function Shiny', false, partials);
    renderTheme(ravenTheme, __dirname + '/../../Function Raven', false, partials);

    renderTheme(smoothTheme, __dirname + '/../../Lambda', true, partials);
    renderTheme(dotTheme, __dirname + '/../../Lambda Dot', true, partials);
    renderTheme(shinyTheme, __dirname + '/../../Lambda Shiny', true, partials);
    renderTheme(ravenTheme, __dirname + '/../../Lambda Raven', true, partials);

    renderTheme(soxTheme, __dirname + '/../../SO X.', true, partials);
    renderTheme(soxxTheme, __dirname + '/../../SO X. X', true, partials);
    renderTheme(soxlTheme, __dirname + '/../../SO X. Left', true, partials);
}

run();
