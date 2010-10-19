<draw_ops name="<?= name ?>">
    <clip x="0" y="0" width="width" height="height"/>
    <? if (style == 0) { ?>
        <title color="<?= highlight ?>" x="(width - title_width) / 2" y="(height-title_height) / 2 + 1"/>
    <? } else { ?>
        <title color="<?= highlight ?>" x="(width - title_width) / 2" y="(height-title_height) / 2 - 1"/>
    <? } ?>
    <title color="<?= text ?>" x="(width - title_width) / 2" y="(height-title_height) / 2"/>
</draw_ops>
