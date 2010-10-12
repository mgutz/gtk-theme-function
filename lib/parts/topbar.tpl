<!-- Draws the topbar. -->
<draw_ops name="<?= topBar.name ?>">
    <gradient type="vertical" x="0" y="0" width="width" height="<?= topBar.effectiveHeight ?> /2">
        <color value="<?= topBar.gradients[0] ?>"/>
        <color value="<?= topBar.gradients[1] ?>"/>
    </gradient>

    <gradient type="vertical" x="0" y="<?= topBar.effectiveHeight ?> /2" width="width" height="<?= topBar.effectiveHeight ?> /2">
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

    <? if (theme.isRounded) { ?>
        <!-- top-left arc hilite -->
        <arc color="shade/#808080/<?= topBar.highlightArc ?>" from="270.0" to="360.0" filled="false"  x="1" y="1" width="6" height="6"/>

        <!-- top-right arc hilite shade/#808080/ARC_SHADE -->
        <arc color="shade/#808080/<?= topBar.highlightArc ?>" from="0.0" to="90.0" filled="false"  x="width-8" y="1" width="6" height="6"/>
    <? } ?>
</draw_ops>

<!-- vim: set ft=xml : -->
