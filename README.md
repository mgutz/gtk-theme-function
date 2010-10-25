
# Function Metacity + GTK2 Theme

Clean. Gray. Function'al metacity theme.

Got tired of customizing the colors of Nub whenever I switched wallpapers.
Gray goes with everything.


## Installation

If you have a version <= 0.4.7, remove

    rm -rf ~/.themes/{Function*,Lambda*,Fn*}

To install (replace tar file with appropriate file):
    
    # install locally 
    tar xfz Lambda-{{version}}.tar.gz -C ~/.themes

OR
    
    # install globally
    sudo tar xfz Lambda-{{version}}.tar.gz -C /usr/share/themes

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

0.4.1

Ubuntu 10.10 fixes

0.4.2

X was too faint. Trying red close.

0.4.3

Silky smooth metacity corners!

- Added outline. Windows were melding into light backgrounds.
- Much better round corners.
- Improved close button hover.

0.4.4

- Reduce size of close button by 1px. X glyph was 1 pixel off center.

0.4.5

- Tweaked outline
- Fixed shaded title bar
- Improved close button.

0.4.6

- Minimize looks like an underscore. Increased margin a little.
- Increased size of close button 

0.4.7

- Use square border on maximize
- GIMP toolbox shade
- Use small x for utility windows (GIMP toolbox)

0.4.8

- Simplified core
- Split archives

0.4.9

- Moved Function Dot and Lambda Dot to Extras archive
- Slightly brighten Raven panel background 

0.5.0

- Rounding looks more diagonal after Ubuntu 10.10 fixes
- Changed SO X shade button

0.5.1

- Improved rounding antialiasing on smooth theme corners
- Add outline on utility dialogs (GIMP toolboxes)
- Remove white line under utility dialogs when shaded

0.5.2

- Slightly increased smooth focused window gradient
- Slightly darkened top bar separator
- Changed shade button on SO X themes
- SO X Bar Theme - shade button could be improved

0.5.3

- Prelight hover on unfocused utility windows
- Improved shade button on gloss themes
- Slight changes to window button spacing

0.5.4

- Window buttons vertical center off by 1 pixel.

0.5.5

- Darkened terminal selected tab
- Tweaked shade button yet again
- Status bar resize gripper in Faenza style

0.5.6

IO theme. I find, as a web developer, using a very dark theme
strains the eyes more than using a light scheme since I use the browser
so much. Going from a black, dark theme to browsing white pages is cause
for retina burn.

- Adjusted shade button again.
- Adjusted red hover color on leaf theme.
- Lightened unselected tabs a tad
- Reduced status bar window resize gripper.

0.5.7

- Added left variants for: SO X X, SO X Bar, SO X IO
- Repackage into left and right variants
- Slight gloss on IO controls
- Switched to bzip for archiving

0.5.8

Some usability changes:

- BorderWidth constant in metacity theme (set value of >=3 if you're having problems resizing)
- More contrast between inactive/active tab
- Replace Raven with IO as core coding theme

Other fixes:

- Move Raven to Extras archive
- Removed padding in treeviews, scrollwindows

0.5.9

- Installer. Verifies Murrine is installed, options for border width and left controls.
- Simplified menu/listview/treeview highlights
- Slight adjustment to button dimensions
