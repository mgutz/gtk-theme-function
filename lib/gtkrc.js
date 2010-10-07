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

var shinyTheme = {
    panelBg: "panel_bg_shiny.png",
    highlightShade: "1.06",
};


var smoothTheme = {
    panelBg: "panel_bg_smooth.png",
    highlightShade: "1.0",
};

function renderTheme(data, outputDir) {
    var template = fs.readFileSync(__dirname + '/gtkrc.mustache', 'utf8');
    var gtkrc = mustache.to_html(template, data);
    var theme = outputDir + '/gtk-2.0/gtkrc';
    fs.writeFileSync(theme, gtkrc);
}

function run() {
    renderTheme(smoothTheme, __dirname + '/..');

    renderTheme(shinyTheme, __dirname + '/../../Function Shiny');
}

run();
