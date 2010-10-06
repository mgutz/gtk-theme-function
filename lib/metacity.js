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


var view = {
    topbar_focused_bg : "#313633",

    draw_1px_outline : false,

    border_width : 1,

    focused_hilite: "#bdbdbd",

    unfocused_hilite : "#cecece",

    widget_normal : "#484848",

    widget_prelight : "#181818",

    widget_pressed : "#000000",

    widget_unfocused_normal: "#6c6c6c",

    widget_unfocused_prelight : "#3c3c3c",

    widget_unfocused_pressed : "#000000",

    close_button: function() { 
        return function(draw_ops, render) {
            var section = widget_section('close_button', draw_ops);
            return render(section);
        };
    },
    
    menu_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('menu_button', draw_ops);
            return render(section);
        };
    },

    maximize_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('maximize_button', draw_ops);
            return render(section);
        };
    },

    minimize_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('minimize_button', draw_ops);
            return render(section);
        };
    },

    restore_button: function() {
        return function(draw_ops, render) {
            var section = widget_section('restore_button', draw_ops);
            return render(section);
        };
    },

    topbar: function() {
        return function(draw_ops, render) {
            var focused = {
                hilite:  '#d0d0d0',
                gradient:  ['#c4c4c4', '#9c9c9c'],
                shadow: '#7c7c7c'
            };

            var unfocused = {
                hilite: '#e4e4e4',
                gradient: ['#d8d8d8', '#b0b0b0'],
                shadow: '#a0a0a0'
            };

            var section = draw_topbar('bg_topbar_focused', focused, draw_ops);
            section += draw_topbar('bg_topbar_unfocused', unfocused, draw_ops);

            return render(section);
        };
    },

    topbar_small: function() {
        return function(draw_ops, render) {
            var focused = {
                hilite: '#cccccc',
                gradient: ['#c4c4c4', '#949494'],
                shadow: '#848484'
            };

            var unfocused = {
                hilite: '#e8e8e8',
                gradient: ['#e0e0e0', '#b2b2b2'],
                shadow: '#a4a4a4'
            }

            var section = draw_topbar('bg_topbar_small_focused', focused, draw_ops);
            section += draw_topbar('bg_topbar_small_unfocused', unfocused, draw_ops)

            return render(section);
        };
    },

    title: function() {
        return function(draw_ops, render) {
            var focused = {
                text: '#222222', 
                hilite: this.focused_hilite
            };

            var unfocused = {
                text: '#505050', 
                hilite:  this.unfocused_hilite
            };

            var section = draw_title('title_focused', focused, draw_ops);
            section += draw_title('title_unfocused', unfocused, draw_ops)

            return render(section);
        };
    },
};


function widget_section(name, draw_ops) {
    result = "<!-- " + name + "-->\n";
    states = ["normal", "prelight", "pressed"];

    _(['normal', 'prelight', 'pressed']).each(function(state) {
        var ops = draw_ops.replace(/COLOR/g, view['widget_' + state]);
        ops = ops.replace(/HILITE/g, view.focused_hilite);

        result += '<draw_ops name="' + name + '_' + state + '">\n' + ops + "</draw_ops>\n";
    });


    _(['unfocused_normal', 'unfocused_prelight', 'unfocused_pressed']).each(function(state) {
        var ops = draw_ops.replace(/COLOR/g, view['widget_' + state]);
        ops = ops.replace(/HILITE/g, view.unfocused_hilite);

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


function run() {
    var template = fs.readFileSync(__dirname + '/metacity.mustache', 'utf8');
    var html = mustache.to_html(template, view);
    var theme = __dirname + '/../metacity-1/metacity-theme-1.xml';
    fs.writeFileSync(theme, html);
}

run();