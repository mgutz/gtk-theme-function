<?
    // images[]
    var _names = ['_button_normal', '_button_prelight', '_button_pressed', '_button_unfocused_normal', '_button_unfocused_prelight', '_button_unfocused_pressed'];
    for (var i = 0; i < _names.length; i++) {
        // 0=focused 1=unfocused 
        var which = (_names[i].indexOf('unfocused') > -1) ? 1 : 0;
        image = button.images[which];
        bgImage = button.bgImages[which];
?>

<draw_ops name="<?= button.name + _names[i] ?>">
    <image filename="<?= bgImage ?>" x="(height-15)/2 + (<?= button.offsets[2] ?>)" y="(height-15)/2 + (<?= button.offsets[3] ?>)" width="15" height="15" colorize="<?= button.bgColors[i] ?>" />
    <image filename="<?= image ?>" x="(height-15)/2 + (<?= button.offsets[0] ?>)" y="(height-15)/2 + (<?= button.offsets[1] ?>)" width="15" height="15" colorize="<?= button.colors[i] ?>"/> 
</draw_ops>

<?  } ?>
