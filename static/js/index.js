$(document).ready(function(){
    $(".draggable").draggable({
        containment: "#dragDropTab",
        axis: "y",
        tolerance: "pointer",
        cursor: "move",
        revert: "invalid",
        helper: "original", //clone
        scroll: true,
        opacity: 0.5,
        cancel: ".non-draggable"
    });

    $(".droppable").droppable({
        accept: ".draggable",
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        greedy: true,
        drop: function(event, ui) {
        let source = ui.draggable.text();
        let target = $(event.target).find('div').text();
        if (confirm("Are you sure to move " + source + " to " + target + "?")) {
            $(this).find('div').replaceWith(ui.draggable.html())
                ui.draggable.remove();
            } else {
                ui.draggable.draggable('option', 'revert', true);
            }
        }
    });
});