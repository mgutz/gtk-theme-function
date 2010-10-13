/**
 * Generates metacity theme.
 *
 * To run
 *   node metacity.js
 */

require('ext');
require('underscore');
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');
var ejs = require('ejs');
ejs.open = '<?';
ejs.close = '?>';
ejs.debug = true;

var DEBIAN_RED = "#D70751";
var UBUNTU_ORANGE = "#F47421";
var LINUXMINT_GREEN = "#8DD346";
var FEDORA_BLUE = "#3C6EB4";

var ravenTheme = {
    border_width : 3,

    topbar_focused: {
        topBorderAlpha: 0.05,
        bottomBorderAlpha: 0.03,
        bottomBorder: "shade/#101010/0.8",
        leftRightBorderAlpha: 0.03,
        gradient:  ['#282828', '#1c1c1c', '#1a1a1a', '#101010'],
    },

    topbar_unfocused: {
        topBorderAlpha: 0.05,
        bottomBorderAlpha: 0.03,
        bottomBorder: "shade/#181818/0.8",
        leftRightBorderAlpha: 0.03,
        gradient:  ['#303030', '#242424', '#222222', '#181818'],
    },

    topbar_small_focused: {
        topBorderAlpha: 0.05,
        bottomBorderAlpha: 0.03,
        bottomBorder: "shade/#101010/0.8",
        leftRightBorderAlpha: 0.03,
        gradient:  ['#282828', '#1c1c1c', '#1a1a1a', '#101010'],
    },

    topbar_small_unfocused: {
        topBorderAlpha: 0.05,
        bottomBorderAlpha: 0.03,
        bottomBorder: "shade/#181818/0.8",
        leftRightBorderAlpha: 0.03,
        gradient:  ['#303030', '#242424', '#222222', '#181818'],
    },

    // control inset
    focused_hilite: "#0c0c0c",
    unfocused_hilite : "#181818",

    title_focused: {
        text: '#aa9b8b', 
        hilite: "#202020" //focused_hilite 
    },

    title_unfocused: {
        text: '#4d463f', 
        hilite: "#242424" //unfocused_hilite 
    },

    widget_normal : "shade/#aa9b8b/0.8",

    widget_prelight : "shade/#aa9b8b/0.5",

    widget_pressed : "shade/#aa9b8b/0.2",

    widget_unfocused_normal: "shade/#4d463f/0.8",

    widget_unfocused_prelight : "shade/#80756a/0.6",

    widget_unfocused_pressed : "shade/#80756a/0.3",

    close_button: function() { 
        return function(draw_ops, render) {
            var data = {};
            Object.merge(data, this);
            data.widget_normal = DEBIAN_RED;
            data.widget_prelight = 'shade/' + DEBIAN_RED + '/0.6';
            data.widget_pressed = 'shade/' + DEBIAN_RED + '/0.3';
            data.widget_prelight = 'shade/' + DEBIAN_RED + '/0.6';
            data.widget_pressed = 'shade/' + DEBIAN_RED + '/0.3';

            var section = widget_section('close_button', data, draw_ops);
            return render(section);
        };
    },

    shade_button: function() { 
        return function(draw_ops, render) {
            //var data = {};
            //Object.merge(data, this);
            //data.widget_normal = "#000000"; // shade of bottom gradient of title bar
            //var section = widget_section('shade_button', data, draw_ops);

            var section = widget_section('shade_button', this, draw_ops);
            return render(section);
        };
    },

    unshade_button: function() { 
        return function(draw_ops, render) {
            //var data = {};
            //Object.merge(data, this);
            //data.widget_normal = "#000000"; // shade of bottom gradient of title bar
            //var section = widget_section('unshade_button', data, draw_ops);
            var section = widget_section('unshade_button', this, draw_ops);
            return render(section);
        };
    },
};

var shinyTheme = {
    drawTopBars: function() {
        var data = {
            topBar: {
                effectiveHeight: "(title_height + 8)",
                name: 'bg_topbar_focused',

                // [0,1]=top 50% [2,3]=bottom 50%
                gradients:  ['#cbcbcb', '#b6b6b6', '#b1b1b1', '#9c9c9c'],

                // white alpha: [0]=top [1]=left [2]=right [3]=bottom
                highlights: [0.09, 0.04, 0.04, 0.04],

                // white alpha
                highlightArc: 1.36,
            },
            theme: {
                isRounded: this.isRounded
            }
        };
        var xml = drawTopBar(data);

        // used by maximize, get rid of rounding
        data.topBar.name = "bg_topbar_focused_max";
        data.theme.isRounded = false;
        xml += drawTopBar(data);

        data.topBar.name = "bg_topbar_small_focused";
        data.topBar.effectiveHeight = "(title_height+4)";
        data.theme.isRounded = false;
        xml += drawTopBar(data);

        data.topBar.name = "bg_topbar_unfocused";
        data.topBar.effectiveHeight = "(title_height+8)";
        data.theme.isRounded = this.isRounded;
        data.topBar.gradients = ['#dfdfdf', '#cacaca', '#c5c5c5', '#b0b0b0'],
        data.topBar.highlights = [0.09, 0.04, 0.04, 0.04];
        data.topBar.highlightArc = 1.45;
        xml += drawTopBar(data);

        // used by maximize, get rid of rounding
        data.topBar.name = "bg_topbar_unfocused_max";
        data.theme.isRounded = false;
        xml += drawTopBar(data);

        data.topBar.name = "bg_topbar_small_unfocused";
        data.topBar.effectiveHeight = "(title_height+4)";
        data.theme.isRounded = false;
        xml += drawTopBar(data);

        return xml;
    },
};

var dotTheme = {
};

var smoothTheme = {};

var base = {
    topBarHeight: "(title_height + 8)",


    border_width: 1,
    topRounding: false, // version 1 can only be true | false
    isRounded: false,


    // control inset
    //focused_hilite: "#bdbdbd",
    //unfocused_hilite : "#cccccc",
    focused_hilite: "0.2",
    unfocused_hilite : "0.15",

    title_focused: {
        text: '#222222', 
        hilite: "#b8b8b8" //focused_hilite 
    },

    title_unfocused: {
        text: '#545454', 
        hilite: "#c8c8c8" //unfocused_hilite 
    },

    widget_normal : "0.65",

    widget_prelight : "1.0",

    widget_pressed : "0.6",

    widget_unfocused_normal: "0.35",

    widget_unfocused_prelight : "0.7",

    widget_unfocused_pressed : "0.35",

    drawTopBars: function() {
        var data = {
            topBar: {
                effectiveHeight: "(title_height + 8)",
                name: 'bg_topbar_focused',

                // [0,1]=top 50% [2,3]=bottom 50%
                gradients:  ['#c4c4c4', '#b0b0b0', '#afafaf', '#9b9b9b'],

                // white alpha: [0]=top [1]=left [2]=right [3]=bottom
                highlights: ['0.1', '0.0', '0.0', '0.0'],

                // white alpha
                highlightArc: '1.4'
            },
            theme: {
                isRounded: this.isRounded
            }
        };
        var xml = drawTopBar(data);

        // used by maximize, get rid of rounding
        data.topBar.name = "bg_topbar_focused_max";
        data.theme.isRounded = false;
        xml += drawTopBar(data);

        data.topBar.name = "bg_topbar_small_focused";
        data.topBar.effectiveHeight = "(title_height+4)";
        data.theme.isRounded = false;
        xml += drawTopBar(data);

        data.topBar.name = "bg_topbar_unfocused";
        data.topBar.effectiveHeight = "(title_height+8)";
        data.theme.isRounded = this.isRounded;
        data.topBar.gradients = ['#dadada', '#c6c6c6', '#c5c5c5', '#b0b0b0'],
        data.topBar.highlights = [0.1, 0.0, 0.0, 0.0];
        data.topBar.highlightArc = 1.44;
        xml += drawTopBar(data);

        // used by maximize, get rid of rounding
        data.topBar.name = "bg_topbar_unfocused_max";
        data.theme.isRounded = false;
        xml += drawTopBar(data);

        data.topBar.name = "bg_topbar_small_unfocused";
        data.topBar.effectiveHeight = "(title_height+4)";
        data.theme.isRounded = false;
        xml += drawTopBar(data);

        return xml;
    },

    outlineWindowFocused: function() {
        var data = {
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

            theme: {
                isRounded: this.isRounded 
            }
        };

        return drawOutline(data);
    },

    outlineWindowUnfocused: function() {
        var data = {
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

            theme: {
                isRounded: this.isRounded 
            }
        };

        return drawOutline(data);
    },
    
    close_button: function() { 
        return function(draw_ops, render) {
            var section = widget_section('close_button', this, draw_ops);
            return render(section);
        };
    },
    
    menu_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('menu_button', this, draw_ops);
            return render(section);
        };
    },

    shade_button: function() { 
        return function(draw_ops, render) {
            var section = widget_section('shade_button', this, draw_ops);
            return render(section);
        };
    },

    unshade_button: function() { 
        return function(draw_ops, render) {
            var section = widget_section('unshade_button', this, draw_ops);
            return render(section);
        };
    },

    maximize_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('maximize_button', this, draw_ops);
            return render(section);
        };
    },

    minimize_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('minimize_button', this, draw_ops);
            return render(section);
        };
    },

    restore_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('restore_button', this, draw_ops);
            return render(section);
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


function widget_section(name, data, draw_ops) {
    var viewData = data;
    var result = "";

    states = ["normal", "prelight", "pressed"];

    _(['normal', 'prelight', 'pressed']).each(function(state) {
        var ops = draw_ops.replace(/BLACK_ALPHA/g, viewData['widget_' + state]);
        ops = ops.replace(/WHITE_ALPHA/g, viewData.focused_hilite);

        result += '<draw_ops name="' + name + '_' + state + '">\n' + ops + "</draw_ops>\n";
    });


    _(['unfocused_normal', 'unfocused_prelight', 'unfocused_pressed']).each(function(state) {
        var ops = draw_ops.replace(/BLACK_ALPHA/g, viewData['widget_' + state]);
        ops = ops.replace(/WHITE_ALPHA/g, viewData.unfocused_hilite);

        result += '<draw_ops name="' + name + '_' + state + '">\n' + ops + "</draw_ops>\n";
    });

    return result;
} 

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

    var data = {};
    Object.merge(data, base);
    Object.merge(data, themeData);
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

    partials.close_button = readFile('glyphs/close_2px_dot.mustache');
    renderTheme(dotTheme, __dirname + '/../../Function Dot', false, partials);
    renderTheme(dotTheme, __dirname + '/../../Lambda Dot', true, partials);

    partials.close_button = readFile('glyphs/close_circle.mustache');

    renderTheme(smoothTheme, __dirname + '/..', false, partials);
    renderTheme(shinyTheme, __dirname + '/../../Function Shiny', false, partials);
    //renderTheme(ravenTheme, __dirname + '/../../Function Raven', false, partials);


    renderTheme(smoothTheme, __dirname + '/../../Lambda', true, partials);
    renderTheme(shinyTheme, __dirname + '/../../Lambda Shiny', true, partials);
    //renderTheme(ravenTheme, __dirname + '/../../Lambda Raven', true, partials);
}

run();
