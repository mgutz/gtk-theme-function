<? if (theme.style == 'sox') { ?>

<draw_ops name="maximize_button_normal">
    <image filename="images/circle-11-gray.png" x="(width-11)/2" y="(height-11)/2 +1" width="11" height="11" colorize="shade/gtk:bg[SELECTED]/0.96"/>
</draw_ops>
<draw_ops name="maximize_button_prelight">
    <image filename="images/circle-11-gray.png" x="(width-11)/2" y="(height-11)/2 +1" width="11" height="11" colorize="shade/gtk:bg[SELECTED]/1.1"/>
    <image filename="images/black/maximize-8.png" x="(width-8)/2 " y="(height-8)/2" width="8" height="8" alpha="0.7"/> 
</draw_ops>
<draw_ops name="maximize_button_pressed">
    <image filename="images/circle-11-gray.png" x="(width-11)/2" y="(height-11)/2 +1" width="11" height="11" colorize="shade/gtk:bg[SELECTED]/0.8"/>
    <image filename="images/black/maximize-8.png" x="(width-8)/2 " y="(height-8)/2" width="8" height="8" alpha="0.7"/> 
</draw_ops>

<draw_ops name="maximize_button_unfocused_normal">
    <image filename="images/circle-11-gray.png" x="(width-11)/2" y="(height-11)/2 " width="11" height="11" colorize="shade/gtk:bg[NORMAL]/0.83"/>
</draw_ops>
<draw_ops name="maximize_button_unfocused_prelight">
    <image filename="images/circle-11-gray.png" x="(width-11)/2" y="(height-11)/2 +1" width="11" height="11" colorize="shade/gtk:bg[NORMAL]/1.0"/>
    <image filename="images/black/maximize-8.png" x="(width-8)/2 " y="(height-8)/2" width="8" height="8" alpha="0.7"/> 
</draw_ops>
<draw_ops name="maximize_button_unfocused_pressed">
    <image filename="images/circle-11-gray.png" x="(width-11)/2" y="(height-11)/2 +1" width="11" height="11" colorize="shade/gtk:bg[NORMAL]/0.7"/>
    <image filename="images/black/maximize-8.png" x="(width-8)/2 " y="(height-8)/2" width="8" height="8" alpha="0.7"/> 
</draw_ops>

<? } ?>
