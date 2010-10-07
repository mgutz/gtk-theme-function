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

var shadyTheme = {
    border_width : 3,

    topbar_focused: {
        hilite:  '#2c2c2c',
        gradient:  ['#242424', '#1a1a1a', '#161616', '#0c0c0c'],
        shadow: '#000000'
    },

    topbar_unfocused: {
        hilite:  '#343434',
        gradient:  ['#2c2c2c', '#222222', '#1e1e1e', '#141414'],
        shadow: '#121212'
    },

    topbar_small_focused: {
        hilite:  '#2c2c2c',
        gradient:  ['#242424', '#1a1a1a', '#161616', '#0c0c0c'],
        shadow: '#000000'
    },

    topbar_small_unfocused: {
        hilite:  '#343434',
        gradient:  ['#2c2c2c', '#222222', '#1e1e1e', '#141414'],
        shadow: '#121212'
    },

    // control inset
    focused_hilite: "#202020",
    unfocused_hilite : "#242424",

    title_focused: {
        text: '#80756a', 
        hilite: "#202020" //focused_hilite 
    },

    title_unfocused: {
        text: '#4d463f', 
        hilite: "#242424" //unfocused_hilite 
    },

    widget_normal : "shade/#80756a/0.8",

    widget_prelight : "shade/#80756a/0.5",

    widget_pressed : "shade/#80756a/0.2",

    widget_unfocused_normal: "#36302b",

    widget_unfocused_prelight : "shade/#80756a/0.6",

    widget_unfocused_pressed : "shade/#80756a/0.3",

    close_button: function() { 
        return function(draw_ops, render) {
            var data = {};
            Object.merge(data, this);
            data.widget_normal = "#900";
            data.widget_prelight = "#600";
            data.widget_pressed = "#300";
            data.widget_unfocused_prelight = "#600";
            data.widget_unfocused_pressed = "#300";

            var section = widget_section('close_button', data, draw_ops);
            return render(section);
        };
    },
};

var shinyTheme = {
    topbar_focused: {
        hilite:  '#dbdbdb',
        gradient:  ['#cbcbcb', '#b7b7b7', '#b0b0b0', '#9c9c9c'],
        shadow: '#7c7c7c'
    },

    topbar_unfocused: {
        hilite: '#efefef',
        gradient: ['#dfdfdf', '#cbcbcb', '#c4c4c4', '#b0b0b0'],
        shadow: '#a0a0a0'
    },

    topbar_small_focused: {
        hilite:  '#dbdbdb',
        gradient:  ['#cbcbcb', '#b7b7b7', '#b0b0b0', '#9c9c9c'],
        shadow: '#7c7c7c'
    },

    topbar_small_unfocused: {
        hilite: '#efefef',
        gradient: ['#dfdfdf', '#cbcbcb', '#c4c4c4', '#b0b0b0'],
        shadow: '#a0a0a0'
    },

};

var smoothTheme = {};

var base = {
    border_width : 1,

    // control inset
    focused_hilite: "#bdbdbd",
    unfocused_hilite : "#cccccc",

    title_focused: {
        text: '#222222', 
        hilite: "#bdbdbd" //focused_hilite 
    },

    title_unfocused: {
        text: '#545454', 
        hilite: "#cccccc" //unfocused_hilite 
    },

    topbar_focused:  {
        hilite:  '#d0d0d0',
        gradient:  ['#c4c4c4', '#b0b0b0', '#b0b0b0', '#9c9c9c'],
        shadow: '#7c7c7c'
    },

    topbar_unfocused: {
        hilite: '#e4e4e4',
        gradient: ['#d8d8d8', '#c4c4c4', '#c4c4c4', '#b0b0b0'],
        shadow: '#a0a0a0'
    },
    
    topbar_small_focused: {
        hilite:  '#d0d0d0',
        gradient:  ['#c4c4c4', '#b0b0b0', '#b0b0b0', '#9c9c9c'],
        shadow: '#7c7c7c'
    },

    topbar_small_unfocused: {
        hilite: '#e4e4e4',
        gradient: ['#d8d8d8', '#c4c4c4', '#c4c4c4', '#b0b0b0'],
        shadow: '#a0a0a0'
    },

    widget_normal : "#484848",

    widget_prelight : "#181818",

    widget_pressed : "#000000",

    widget_unfocused_normal: "#747474",

    widget_unfocused_prelight : "#444444",

    widget_unfocused_pressed : "#000000",

    close_button: function() { 
        return function(draw_ops, render) {
            var data = {};
            Object.merge(data, this);
            data.widget_prelight = "#a00";
            data.widget_pressed = "#600";
            data.widget_unfocused_prelight = "#a00";
            data.widget_unfocused_pressed = "#600";

            var section = widget_section('close_button', data, draw_ops);
            return render(section);
        };
    },
    
    menu_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('menu_button', this, draw_ops);
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
            var section = draw_topbar('bg_topbar_focused', this.topbar_focused, draw_ops);
            section += draw_topbar('bg_topbar_unfocused', this.topbar_unfocused, draw_ops);

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

    result = "<!-- " + name + "-->\n";
    states = ["normal", "prelight", "pressed"];

    _(['normal', 'prelight', 'pressed']).each(function(state) {
        var ops = draw_ops.replace(/COLOR/g, viewData['widget_' + state]);
        ops = ops.replace(/HILITE/g, viewData.focused_hilite);

        result += '<draw_ops name="' + name + '_' + state + '">\n' + ops + "</draw_ops>\n";
    });


    _(['unfocused_normal', 'unfocused_prelight', 'unfocused_pressed']).each(function(state) {
        var ops = draw_ops.replace(/COLOR/g, viewData['widget_' + state]);
        ops = ops.replace(/HILITE/g, viewData.unfocused_hilite);

        result += '<draw_ops name="' + name + '_' + state + '">\n' + ops + "</draw_ops>\n";
    });

    return result;
} 


/**
 * Draws the top bar of a window.
 */
function draw_topbar(name, colors, draw_ops) {
    var ops = draw_ops.replace(/HILITE/g, colors.hilite);
    ops = ops.replace(/GRADIENT0/g, colors.gradient[0]);
    ops = ops.replace(/GRADIENT1/g, colors.gradient[1]);
    ops = ops.replace(/GRADIENT2/g, colors.gradient[2]);
    ops = ops.replace(/GRADIENT3/g, colors.gradient[3]);
    ops = ops.replace(/SHADOW/g, colors.shadow);

    return '<draw_ops name="' + name + '">\n'  + ops + "</draw_ops>\n";
}


function draw_title(name, colors, draw_ops) {
    var ops = draw_ops.replace(/HILITE/g, colors.hilite);
    ops = ops.replace(/COLOR/g, colors.text);

    return '<draw_ops name="' + name + '">\n' + ops +  '</draw_ops>\n';
}

function renderTheme(themeData, outputDir) {
    var data = {};
    Object.merge(data, base);
    Object.merge(data, themeData);

    var template = fs.readFileSync(__dirname + '/metacity.mustache', 'utf8');
    var html = mustache.to_html(template, data);
    var theme = outputDir + '/metacity-1/metacity-theme-1.xml';
    fs.writeFileSync(theme, html);
}

function run() {
    renderTheme(smoothTheme, __dirname + '/..');
    renderTheme(shinyTheme, __dirname + '/../../Function Shiny');
    renderTheme(shadyTheme, __dirname + '/../../Function Raven');
}

run();
