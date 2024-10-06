$(document).ready(function(){

    //Activate one of these case

    // Case 1: Dragging and Dropping an Element
    dragDrop();

    // Case 2: Swapping two Elements
    //swappingElements();

    // Case 3: Drag & Drop a Group of Elements
    //dragDropGroupElements();
});

// Case 1: Dragging and Dropping an Element
function dragDrop(){
    console.log("Drag & drop an element");
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
}

// Case 2: Swapping two Elements
function swappingElements(){
    console.log("Swap two elements ..");
    $(".draggable").draggable({
        containment: "#dragDropTab",
        axis: "y",
        tolerance: "pointer",
        cursor: "move",
        revert: "invalid",
        helper: "clone",
        scroll: true,
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
        if (confirm("Are you sure to swap " + source + " and " + target + "?")) {
            $($(this).find('div')).swapWith($(ui.draggable));
            } else {
                ui.draggable.draggable('option', 'revert', true);
            }
        }
    });
}

jQuery.fn.swapWith = function(to) {
    return this.each(function() {
        var clone_to = $(to).clone(true);
        var clone_from = $(this).clone(true);
        $(to).replaceWith(clone_from);
        $(this).replaceWith(clone_to);
    });
}

// Case 3: Drag & Drop a Group of Elements
function dragDropGroupElements(){
    console.log("Swap & drop a group of elements ..");
    $(".draggable").draggable({
        containment: "#dragDropTab",
        axis: "y",
        tolerance: "pointer",
        cursor: "move",
        revert: "invalid",
        helper: "clone",
        scroll: true,
        opacity: 0.5,
        cancel: ".non-draggable",
        helper: function(){
            var selected = $('#dragDropTab tr td').children(".draggable");
            if (selected.length === 0) {
                selected = $(this);
            }
            var container = $('<div/>').attr('id', 'draggingContainer');
            container.append(selected.clone());
            return container;
        }
    });

    $(".droppable").droppable({
        accept: ".draggable",
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        greedy: true,
        drop: function(event, ui) {
            let source = "(" + $.map(ui.helper.children(), function(element) { return $(element).text()}).join(", ") + ")";
            let target = "(" + $.map($(event.target).parent('tr').find('td'), function(element) { return $(element).text()}).join(", ") + ")";
            if (confirm("Are you sure to move " + source + " to " + target + "?")) {
                let cell = $(this);
                   $.each(ui.helper.children(), function() {
                       let child = $(this);
                       cell.empty();
                       cell.append(child);
                       cell = cell.next();
                   });
            } else {
                ui.draggable.draggable('option', 'revert', true);
            }
        }
    });
}