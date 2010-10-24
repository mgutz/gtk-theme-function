<? 
    var upperPercent = topBar.gradientMidPercent;
    var lowerPercent = 1 - topBar.gradientMidPercent;
?>

<!-- Draws the topbar. -->
<draw_ops name="<?= topBar.name ?>">
    <gradient type="vertical" x="0" y="0" width="width" height="<?= topBar.effectiveHeight ?> * <?= upperPercent ?>">
        <color value="<?= topBar.gradients[0] ?>"/>
        <color value="<?= topBar.gradients[1] ?>"/>
    </gradient>

    <gradient type="vertical" x="0" y="<?= topBar.effectiveHeight ?> * <?= upperPercent ?>" width="width" height="<?= topBar.effectiveHeight ?> * <?= lowerPercent ?>">
        <color value="<?= topBar.gradients[2] ?>"/>
        <color value="<?= topBar.gradients[3] ?>"/>
    </gradient>

    <!-- left hilite -->
    <tint color="white" alpha="<?= topBar.highlights[1] ?>" x="1" y="0" width="1" height="<?= topBar.effectiveHeight ?> - 1"/>

    <!-- right hilite -->
    <tint color="white" alpha="<?= topBar.highlights[2] ?>" x="width-2" y="0" width="1" height="<?= topBar.effectiveHeight ?> - 1"/>

    <!-- top hilite -->
    <tint color="white" alpha="<?= topBar.highlights[0] ?>" x="0" y="1" width="width" height="1"/>

    <!-- bottom hilite -->
    <tint color="white" alpha="<?= topBar.highlights[3] ?>" x="0" y="<?= topBar.effectiveHeight ?> - 2" width="width" height="1"/>

    <? if (topBar.isRounded) { ?>

        <!-- top-left arc hilite -->
        <?- draw.point(topBar.highlightArc, 3, 1) ?>
        <?- draw.point(topBar.highlightArc, 1, 3) ?>
        
        <!-- top-right arc hilite -->
        <?- draw.point(topBar.highlightArc, "width - 3 -1", 1) ?>
        <?- draw.point(topBar.highlightArc, "width - 1 -1", 3) ?>
    <? } ?>
</draw_ops>

<!-- vim: set ft=xml : -->
