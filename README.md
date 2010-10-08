# Function Metacity + GTK2 Theme

Clean. Gray. Function'al metacity theme.

Got tired of customizing the colors of Nub whenever I switched wallpapers.
Gray goes with everything.


## Build

To compile the metacity theme:

    node lib/metacity.js

## Changelog

0.1.1
- Hide menu underscores (mnemonics).
- Reduce size of expander arrow in treeviews
- Selected text to white
- Flat popup menu style
- Lots of color tweaks

0.1.2
- Increased contrast of focused/unfocused title bars
- Lowered brightness (was too bright)
- Added panel background
- reduced size of maximize icon

0.1.3
- Vastly improved Gnome panel
  * inset active window buttons
  * inset title text
  * 2px taller

0.1.4
- New GTK Theme based on Radiance
- Added powder blue color to selection/progressbar/scrollbar
- Lighter panel bg

0.1.5
- Lighten TreeView/ListView headers
- Bluer radio button/checkbox
- Use blue when pressing scrollbar
- Toolbar toggle button depressed (comboboxes seem to use togglebutton shading, bug in Murrine?)

0.1.6
- Fix selected menu items always using black instead of Appearance's selected text color

0.1.7
- Set default terminal colors
- Use shade of selected bg on toggle buttons
- Diagonal hashes on progress bar

0.1.8
- Reduced width of scrollbars
- Adjusted colors of windows list on panel
- Lowered brightness of blue selection color a tad
- Consistent toggle button
- Flatter comboboxes (everything looks like a button in most gnome themes)

0.1.9
- Tooltips color white on black
- Chiclet buttons for comboboxes/toggle buttons

0.2
- Cleaned up tabs

0.2.2
- x close button

0.2.3
- x glyph fix

0.2.4
- red hover over close button

0.2.5
- base comboboxes, etc on windows bg not input bg

0.2.6
- raven: more conrast active/inactive window bars

0.2.7
- raven: odd/even listview colors (doesn't fix nautilus though)
- raven: select text color

0.2.8
- removed hidden window menu button

0.2.9
- Rounded corners

0.3.0
- Create a seperate Lambda theme set for rounded corners

0.3.1
! Strange bug in Appearance Preferences. Switching between Function and Lambda themes
does not always change the theme correctly. I'm guessing because I'm sharing GTK
themes. Workaround is to choose another theme like Clearlooks and then Function or Lambda.

- Improved highlighting to lessen the effect of jagged round corners
- Keep square corners on utility windows (GIMP toolboxes) 
- Change nautilus side pane bg to be consistent with open file dialog
