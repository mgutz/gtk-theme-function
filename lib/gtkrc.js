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

var ravenTheme = {
    darkTheme: true,
    panelBg: "panel_bg_shady.png",
    highlightShade: "1.1",

    bgColor: "#1c1c1c",
    fgColor: '#66635c',

    selectedBgColor: '#0089bd',
    selectedFgColor: '#000000',

    baseColor: '#242424',
    textColor: '#a6a194',

    tooltipBgColor: '#000000',
    tooltipFgColor: '#eeeeee',

    linkColor: '#19486b'
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
    fgColor: '#101010',

    selectedBgColor: '#73ADE6',
    selectedFgColor: '#101010',

    baseColor: '#f4f4f4',
    textColor: '#101010',

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
    renderTheme(ravenTheme, __dirname + '/../../Function Raven');
}

run();
