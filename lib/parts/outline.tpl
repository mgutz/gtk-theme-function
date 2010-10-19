<draw_ops name="<?= outline.name + '_topbar_shadow' ?>">
    <!-- topbar shadow -->
    <line color="<?= topBar.shadow ?>" width="1" x1="0" y1="<?=topBar.effectiveHeight ?> -1" x2="width" y2="<?=topBar.effectiveHeight ?> -1"/>
</draw_ops>

<!-- Draws the 1px outline around entire window. The title bar's bottom shadow is
     also drawn here, otherwise the border is drawn over by the outline. -->
<draw_ops name="<?= outline.name ?>">
    <!-- TOP LINE -->
    <line color="<?= outline.gradients[0] ?>" width="1" x1="0" y1="0" x2="width" y2="0"/>

    <? if (theme.isRounded) { ?>
    <!-- ROUNDING ANTIALIAS -->

    <!-- top-left arc hilite -->
    <?- draw.point(outline.arc, 2, 1) ?>
    <?- draw.point(outline.arc, 1, 2) ?>

    <!-- top-right arc hilite -->
    <?- draw.point(outline.arc, "width-2 -1", 1) ?>
    <?- draw.point(outline.arc, "width-1 -1", 2) ?>
    <? } ?>

    <!-- LEFT LINE -->
    <!-- topbar -->
    <gradient type="vertical" x="0" y="0" width="1" height="<?= topBar.effectiveHeight ?>">
    <color value="<?= outline.gradients[0] ?>"/>
    <color value="<?= outline.gradients[1] ?>"/>
    </gradient>
    <!-- client area -->
    <gradient type="vertical" x="0" y="<?=topBar.effectiveHeight ?>" width="1" height="height - <?=topBar.effectiveHeight ?>">
    <color value="<?= outline.gradients[2] ?>"/>
    <color value="<?= outline.gradients[3] ?>"/>
    </gradient>

    <!-- RIGHT LINE -->
    <!-- topbar -->
    <gradient type="vertical" x="width-1" y="0" width="1" height="<?= topBar.effectiveHeight ?>">
    <color value="<?= outline.gradients[0] ?>"/>
    <color value="<?= outline.gradients[1] ?>"/>
    </gradient>
    <!-- client area -->
    <gradient type="vertical" x="width-1" y="<?= topBar.effectiveHeight ?>" width="1" height="height - <?= topBar.effectiveHeight ?>">
        <color value="<?= outline.gradients[2] ?>"/>
        <color value="<?= outline.gradients[3] ?>"/>
    </gradient>

    <!-- bottom line -->
    <line color="<?= outline.gradients[3] ?>" width="1" x1="0" y1="height - 1" x2="width" y2="height - 1"/>

    <include name="<?= outline.name + '_topbar_shadow' ?>" />
</draw_ops>

<!-- vim: set ft=xml : -->
