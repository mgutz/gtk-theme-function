<? 
    var _names = ['_button_normal', '_button_prelight', '_button_pressed', '_button_unfocused_normal', '_button_unfocused_prelight', '_button_unfocused_pressed'];
    for (var i = 0; i < _names.length; i++) {
?>

<draw_ops name="<?= button.name + _names[i] ?>">
    <image filename="<?= button.image ?>" x="(height-15)/2" y="(height-15)/2 + 1" width="15" height="15" colorize="<?= button.insetColors[i] ?>" />
    <image filename="<?= button.image ?>" x="(height-15)/2" y="(height-15)/2" width="15" height="15" colorize="<?= button.colors[i] ?>"/> 
</draw_ops>

<?  } ?>
