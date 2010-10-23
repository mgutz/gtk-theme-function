<draw_ops name="bg_borders">
    <rectangle color="gtk:bg[NORMAL]" filled="true" width="Borderwidth `max` 1" height="height-<?= topBarEffectiveHeight ?>-1" x="0" y="<?= topBarEffectiveHeight ?>"/>
    
    <rectangle color="gtk:bg[NORMAL]" filled="true" width="BorderWidth `max` 1" height="height-<?= topBarEffectiveHeight ?>-1" x="width - (BorderWidth `max` 1)" y="<?= topBarEffectiveHeight ?>"/>
    
    <rectangle color="gtk:bg[NORMAL]" filled="true" width="width" height="BorderWidth `max` 1" x="0" y="height - (BorderWidth `max` 1)"/>
</draw_ops>
