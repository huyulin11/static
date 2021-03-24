import { undoStack } from "/s/buss/acs/location/location.stack.js";

export var deselect = function () {
    d3.selectAll('circle').on('click', function () {
        d3.event.stopPropagation();
        if ($(this).hasClass('selectelement')) {
            $(this).attr('fill', 'red').removeClass('selectelement');
        } else $(this).addClass('selectelement').attr('fill', 'rgb(30 178 206 )');
    });
    d3.selectAll('rect').on('click', function () {
        d3.event.stopPropagation();
        if ($(this).hasClass('selectelement')) {
            $(this).attr('fill', '#e0e053').removeClass('selectelement');
        } else $(this).addClass('selectelement').attr('fill', 'rgb(30 178 206 )');
    });
    d3.selectAll('path').on('click', function () {
        d3.event.stopPropagation();
        var id = $(this).attr('id').slice(1);
        if ($(this).hasClass('selectelement')) {
            $(this).attr('stroke', '#113a7394').removeClass('selectelement');
            d3.select('#mar' + $(this).attr('id').slice(1)).select('path').attr('fill', '#113a7394')
            $('#mar' + $(this).attr('id').slice(1)).removeClass('selectelement');
        } else {
            $(this).addClass('selectelement').attr('stroke', 'rgb(30 178 206 )');
            $('#mar' + id).addClass('selectelement');
            $('#mar' + id + " " + 'path').addClass('selectelement').attr('fill', 'rgb(30 178 206 )');
        }
    });
}