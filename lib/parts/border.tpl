<draw_ops name="bg_borders">
    <? if (borderWidth > 1) { ?>
    <rectangle color="gtk:bg[NORMAL]" filled="true" width="<?= borderWidth ?>" height="height-<?= topBarEffectiveHeight ?>-1" x="0" y="<?= topBarEffectiveHeight ?>"/>
    
    <rectangle color="gtk:bg[NORMAL]" filled="true" width="<?= borderWidth ?>" height="height-<?= topBarEffectiveHeight ?>-1" x="width-<?= borderWidth ?>" y="<?= topBarEffectiveHeight ?>"/>
    
    <rectangle color="gtk:bg[NORMAL]" filled="true" width="width" height="<?= borderWidth ?>" x="0" y="height-<?= borderWidth ?>"/>
    <? } ?>
</draw_ops>
