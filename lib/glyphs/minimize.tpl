<? if (theme.style == 'sox') { ?>

<draw_ops name="minimize_button_normal">
    <image filename="images/circle-9-gray.png" x="(width-9)/2" y="(height-9)/2 +1" width="9" height="9" colorize="shade/gtk:bg[SELECTED]/0.97"/>
</draw_ops>
<draw_ops name="minimize_button_prelight">
    <image filename="images/circle-9-gray.png" x="(width-9)/2" y="(height-9)/2 +1" width="9" height="9" colorize="shade/gtk:bg[SELECTED]/1.1"/>
    <image filename="images/black/minimize-8.png" x="(width-8)/2" y="(height-8)/2" width="8" height="8" alpha="0.7"/> 
</draw_ops>
<draw_ops name="minimize_button_pressed">
    <image filename="images/circle-9-gray.png" x="(width-9)/2" y="(height-9)/2 +1" width="9" height="9" colorize="shade/gtk:bg[SELECTED]/0.7"/>
    <image filename="images/black/minimize-8.png" x="(width-8)/2" y="(height-8)/2" width="8" height="8" alpha="0.7"/> 
</draw_ops>

<draw_ops name="minimize_button_unfocused_normal">
    <image filename="images/circle-9-gray.png" x="(width-9)/2" y="(height-9)/2 " width="9" height="9" colorize="shade/gtk:bg[NORMAL]/0.83"/>
</draw_ops>
<draw_ops name="minimize_button_unfocused_prelight">
    <image filename="images/circle-9-gray.png" x="(width-9)/2" y="(height-9)/2 +1" width="9" height="9" colorize="shade/gtk:bg[NORMAL]/1.0"/>
    <image filename="images/black/minimize-8.png" x="(width-8)/2" y="(height-8)/2" width="8" height="8" alpha="0.7"/> 
</draw_ops>
<draw_ops name="minimize_button_unfocused_pressed">
    <image filename="images/circle-9-gray.png" x="(width-9)/2" y="(height-9)/2 +1" width="9" height="9" colorize="shade/gtk:bg[NORMAL]/0.7"/>
    <image filename="images/black/minimize-8.png" x="(width-8)/2" y="(height-8)/2" width="8" height="8" alpha="0.7"/> 
</draw_ops>

<? } ?>
