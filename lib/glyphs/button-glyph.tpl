<?
    // images[]
    var _names = ['_button_normal', '_button_prelight', '_button_pressed', '_button_unfocused_normal', '_button_unfocused_prelight', '_button_unfocused_pressed'];
    for (var i = 0; i < _names.length; i++) {
        var name = _names[i];
        // 0=focused 1=unfocused 
        var which = (name.indexOf('unfocused') > -1) ? 1 : 0;

        var image = button.images[which];
        var bgImage = button.bgImages[which];

        if (button.buttonStyle == 0) {
            bgYOffset = button.bgYOffset[which];
            if (bgYOffset > -1) {
                bgYOffset = '+' + bgYOffset;
            }
        }
        else {
            bgYOffset = '';
        }
        

        // reveal icon only on prelight, pressed
        var hideFg = (button.buttonStyle == 1) && (name.indexOf('normal') > -1);
        var hideBg = false;

        if (button.buttonStyle == 2) {
            hideBg = true;
            hideFg = false;
        }



?>

<draw_ops name="<?= button.name + _names[i] ?>">
    <? if (!hideBg) { ?>
    <image filename="<?= bgImage ?>" x="(height-15)/2" y="(height-15)/2 <?=bgYOffset?>" width="15" height="15" colorize="<?= button.bgColors[i] ?>" />
    <? } ?>

    <? if (!hideFg) { ?>
    <image filename="<?= image ?>" x="(height-15)/2" y="(height-15)/2" width="15" height="15" colorize="<?= button.colors[i] ?>"/> 
    <? } ?>
</draw_ops>

<?  } ?>
