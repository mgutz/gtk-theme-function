<?
    // button.image may be string in which case, it used as both focused and unfocused image
    // button.image: [0]=focused [1]=unfocused
    if (_.isArray(button.image)) {
        focusedImage = button.image[0]
        unfocusedImage = button.image[1]
    } 
    else {
        focusedImage = button.image
        unfocusedImage = button.image
    }

    var _names = ['_button_normal', '_button_prelight', '_button_pressed', '_button_unfocused_normal', '_button_unfocused_prelight', '_button_unfocused_pressed'];
    for (var i = 0; i < _names.length; i++) {
        image = _names[i].indexOf('unfocused') > -1 ? unfocusedImage : focusedImage
?>

<draw_ops name="<?= button.name + _names[i] ?>">
    <image filename="<?= image ?>" x="(height-15)/2" y="(height-15)/2 + 1" width="15" height="15" colorize="<?= button.insetColors[i] ?>" />
    <image filename="<?= image ?>" x="(height-15)/2" y="(height-15)/2" width="15" height="15" colorize="<?= button.colors[i] ?>"/> 
</draw_ops>

<?  } ?>
