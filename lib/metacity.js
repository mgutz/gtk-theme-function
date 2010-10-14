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
            highlightArc: '1.4'
        },

        windowUnfocused: {
            name: 'bg_topbar_unfocused',
            gradients:  ['#303030', '#242424', '#222222', '#181818'],
            highlights: [0.01, 0.0, 0.0, 0.0],
            highlightArc: 1.44
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
                arc: 'shade/#2c2c2c/0.98',
            },
        },


        windowUnfocused: {
            topBar: {
                shadow: "#101010",
            },

            outline: {
                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#2c2c2c', '#181818', '#181818', '#181818'],
                arc: 'shade/#2c2c2c/0.98',
            },
        }
    },


    title_focused: {
        text: '#aa9b8b', 
        hilite: "#202020" //focusedhilite 
    },

    title_unfocused: {
        text: 'shade/#4d463f/1.03', 
        hilite: 'shade/#808080/0.12' //unfocused_hilite 
    },


    buttons: {
        common: {
            // 0=focused normal   1=focused  prelight  2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: [
                "shade/#aa9b8b/0.8", "shade/#aa9b8b/0.5", "shade/#aa9b8b/0.2",
                "shade/#4d463f/0.82", "shade/#80756a/1.0", "shade/#80756a/0.5"
            ],
            insetColors: [
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // focused
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // unfocused
            ],
        },

        close: {
            colors: [
                'shade/red/0.7', 'red', 'shade/red/0.5', 
                "shade/#4d463f/0.82", 'shade/red/0.7', 'shade/red/0.5',
            ],
            insetColors: [
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // focused
                'shade/#808080/0.05', 'shade/#808080/0.05', 'shade/#808080/0.05',     // unfocused
            ],

            image: ['images/gray-15/close-2px-x.png', 'images/gray-15/close-1px-x.png'],
        },
    }
};


var shinyTheme = {
    topBars: {
        windowFocused: {
            // [0,1]=top 50% [2,3]=bottom 50%
            gradients:  ['#cbcbcb', '#b6b6b6', '#b1b1b1', '#9c9c9c'],

            // white alpha: [0]=top [1]=left [2]=right [3]=bottom
            highlights: [0.09, 0.04, 0.04, 0.04],

            // white alpha
            highlightArc: 1.36,
        },

        windowUnfocused: {
            gradients: ['#dfdfdf', '#cacaca', '#c5c5c5', '#b0b0b0'],
            highlights: [0.09, 0.04, 0.04, 0.04],
            highlightArc: 1.45,
        },
    }
};

var dotTheme = {
    buttons : {
        close: {
            colors: ['shade/#808080/0.6', '#808080', 'shade/#808080/0.6', 'shade/#808080/0.7', 'shade/#808080/0.7', 'shade/#808080/0.35' ],
            image: ['images/gray-15/close-dot.png', 'images/gray-15/close-dot.png']
        },
    },
};


var soxTheme = {
    theme: {
        style: 'sox',
    }
}

var smoothTheme = {};

var base = {
    theme: {
        style: '',
    },

    border_width: 1,
    topRounding: false, // version 1 can only be true | false
    isRounded: false,

    title_focused: {
        text: '#222222', 
        hilite: "#b8b8b8" //focused_hilite 
    },

    title_unfocused: {
        text: '#525252', 
        hilite: "#c8c8c8" //unfocused_hilite 
    },

    buttons: {
        common: {
            // 0=focused normal 1=focused  prelight 2=focused pressed 
            // 3=unfocused normal 4=unfocused prelight 5=unfocused pressed
            colors: [
                'shade/#808080/0.55', 'shade/#808080/0.3', 'shade/#808080/0.1', 
                'shade/#808080/0.9', 'shade/#808080/0.5', 'shade/#808080/0.35' 
            ],
            insetColors: ['shade/white/0.75', 'shade/white/0.75', 'shade/white/0.75', 'shade/white/0.8', 'shade/white/0.8', 'shade/white/0.8' ],
        },

        close: {
            colors: [
                'shade/#808080/0.6', 'shade/' + DEBIAN_RED + '/0.85', 'shade/' + DEBIAN_RED + '/0.7', 
                'shade/#808080/0.7', 'shade/#808080/0.5', 'shade/#808080/0.35'
            ],
            image: ['images/gray-15/close-1px-x.png', 'images/gray-15/close-1px-aa-x.png'],
            insetColors: [
                'shade/white/0.75', 'shade/white/0.75', 'shade/white/0.75', 
                'shade/white/0.85', 'shade/white/0.8', 'shade/white/0.8'
            ],
        },

        utility_close: {
            image: 'images/gray-15/close-x.png'
        },

        maximize: {
            image: 'images/gray-15/maximize.png'
        },

        restore: {
            image: 'images/gray-15/restore.png'
        },

        minimize: {
            image: 'images/gray-15/minimize.png'
        },

        shade: {
            image: 'images/gray-15/shade.png'
        },

        unshade: {
            image: 'images/gray-15/unshade.png'
        },

        menu: {
            image: 'images/gray-15/shade.png'
        },
    },


    topBars: {
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
            highlightArc: '1.4'
        },

        windowUnfocused: {
            name: 'bg_topbar_unfocused',
            gradients: ['#dadada', '#c6c6c6', '#c5c5c5', '#b0b0b0'],
            highlights: [0.1, 0.0, 0.0, 0.0],
            highlightArc: 1.44
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
                if (data.isRounded === undefined) {
                    data.isRounded = parent.isRounded;
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
                effectiveHeight: "(title_height + 8)",
                shadow: "#707070",
            },

            outline: {
                name: "outline_focused",

                // [0]=title top [1]=client top [2]=client bottom
                gradients: ['#9c9c9c', '#808080', '#808080', '#707070'],
                arc: 'shade/#9c9c9c/0.98',
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
                arc: 'shade/#909090/0.98',
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


    
    close_button: function() { 
        return this.drawButtonGlyph('close');
    },

    
    shade_button: function() { 
        return function(draw_ops, render) {
            var html;
            if (this.theme.style == 'sox') {
                html = renderEjsFile('glyphs/shade.tpl', {theme: this.theme});
            }
            else {
                html = this.drawButtonGlyph('shade');
            }
            return html; 
        };
    },

    unshade_button: function() { 
        return function(draw_ops, render) {
            var html;
            if (this.theme.style == 'sox') {
                html = renderEjsFile('glyphs/unshade.tpl', {theme: this.theme});
            }
            else {
                html = this.drawButtonGlyph('unshade');
            }
            return html; 
        };
    },

    maximize_button: function() {
        return function(draw_ops, render) {
            var html;
            if (this.theme.style == 'sox') {
                html = renderEjsFile('glyphs/maximize.tpl', {theme: this.theme});
            }
            else {
                html = this.drawButtonGlyph('maximize');
            }
            return html; 
        };
    },

    minimize_button: function() {
        return function(draw_ops, render) {
            var html;
            if (this.theme.style == 'sox') {
                html = renderEjsFile('glyphs/minimize.tpl', {theme: this.theme});
            }
            else {
                html = this.drawButtonGlyph('minimize');
            }
            return html; 
        };
    },

    restore_button: function() {
        return function(draw_ops, render) {
            var html;
            if (this.theme.style == 'sox') {
                html = renderEjsFile('glyphs/restore.tpl', {theme: this.theme});
            }
            else {
                html = this.drawButtonGlyph('restore');
            }
            return html; 
        };
    },

    topbar: function() {
        return function(draw_ops, render) {
            var section = draw_topbar('bg_topbar_unfocused', this.topbar_unfocused, draw_ops);

            return render(section);
        };
    },

    topbar_small: function() {
        return function(draw_ops, render) {
            var section = draw_topbar('bg_topbar_small_focused', this.topbar_small_focused, draw_ops);
            section += draw_topbar('bg_topbar_small_unfocused', this.topbar_small_unfocused, draw_ops)

            return render(section);
        };
    },

    title: function() {
        return function(draw_ops, render) {
            var section = draw_title('title_focused', this.title_focused, draw_ops);
            section += draw_title('title_unfocused', this.title_unfocused, draw_ops);

            return render(section);
        };
    },
};


function drawOutline(data) {
    return renderEjsFile('parts/outline.tpl', data);
}

function drawTopBar(data) {
    return renderEjsFile('parts/topbar.tpl', data);
}


/**
 * Draws the top bar of a window.
 */
function draw_topbar(name, colors, draw_ops) {
    var ops = draw_ops.replace(/T_BORDER_ALPHA/g, colors.topBorderAlpha);
    ops = ops.replace(/B_BORDER_ALPHA/g, colors.bottomBorderAlpha);
    ops = ops.replace(/B_BORDER/g, colors.bottomBorder);
    ops = ops.replace(/LR_BORDER_ALPHA/g, colors.leftRightBorderAlpha);
    ops = ops.replace(/GRADIENT0/g, colors.gradient[0]);
    ops = ops.replace(/GRADIENT1/g, colors.gradient[1]);
    ops = ops.replace(/GRADIENT2/g, colors.gradient[2]);
    ops = ops.replace(/GRADIENT3/g, colors.gradient[3]);
    ops = ops.replace(/ARC_SHADE/g, colors.arcShade);

    return '<draw_ops name="' + name + '">\n'  + ops + "</draw_ops>\n";
}


function draw_title(name, colors, draw_ops) {
    var ops = draw_ops.replace(/HILITE/g, colors.hilite);
    ops = ops.replace(/COLOR/g, colors.text);

    return '<draw_ops name="' + name + '">\n' + ops +  '</draw_ops>\n';
}


function renderTheme(themeData, outputDir, isRounded, partials) {
    var theme = outputDir + '/metacity-1/metacity-theme-1.xml';
    fs.writeFileSync(theme, '<!-- v1 placeholder, must exist for v2 but not used -->');


    pp(base, "BASE")
    pp(themeData, "THEMEDATA")
    var data = merger.cloneextend(base, themeData);
    pp(base, "DATA")

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

    //renderTheme(smoothTheme, __dirname + '/..', false, partials); // add to current directory for debugging

    renderTheme(smoothTheme, __dirname + '/../../Function', false, partials);
    renderTheme(dotTheme, __dirname + '/../../Function Dot', false, partials);
    renderTheme(shinyTheme, __dirname + '/../../Function Shiny', false, partials);
    renderTheme(ravenTheme, __dirname + '/../../Function Raven', false, partials);

    renderTheme(smoothTheme, __dirname + '/../../Lambda', true, partials);
    renderTheme(dotTheme, __dirname + '/../../Lambda Dot', true, partials);
    renderTheme(shinyTheme, __dirname + '/../../Lambda Shiny', true, partials);
    renderTheme(ravenTheme, __dirname + '/../../Lambda Raven', true, partials);

    //renderTheme(soxTheme, __dirname + '/../../Lambda SO X', true, partials);
}

run();
