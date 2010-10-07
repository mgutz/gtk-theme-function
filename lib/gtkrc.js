/*
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
    panelBg: "panel_bg_shady.png",
    highlightShade: "1.07",

    bgColor: "#1c1c1c",
    fgColor: '#66635c',

    selectedBgColor: '#1F5B87',
    selectedFgColor: '#101010',

    baseColor: '#242424',
    textColor: '#a6a194',

    tooltipBgColor: '#242424',
    tooltipFgColor: '#f4f4f4',

    linkColor: '#3476B8'
};

var shinyTheme = {
    panelBg: "panel_bg_shiny.png",
    highlightShade: "1.055",
};


var smoothTheme = {
    panelBg: "panel_bg_smooth.png",
};

var base = {
    panelBg: "panel_bg_smooth.png",
    highlightShade: "1.0",
    bgColor: "#dcdcdc",
    selectedBgColor: '#73ADE6',
    fgColor: '#181818',
    selectedFgColor: '#181818',
    baseColor: '#f4f4f4',
    textColor: '#181818',
    tooltipBgColor: '#242424',
    tooltipFgColor: '#f4f4f4',
    linkColor: '#3476B8'
};

function renderTheme(themeData, outputDir) {
    var data = {};
    Object.merge(data, base);
    Object.merge(data, themeData);

    var template = fs.readFileSync(__dirname + '/gtkrc.mustache', 'utf8');
    var gtkrc = mustache.to_html(template, data);
    var theme = outputDir + '/gtk-2.0/gtkrc';
    fs.writeFileSync(theme, gtkrc);
}

function run() {
    renderTheme(smoothTheme, __dirname + '/..');
    renderTheme(shinyTheme, __dirname + '/../../Function Shiny');
    renderTheme(shadyTheme, __dirname + '/../../Function Raven');
}

run();