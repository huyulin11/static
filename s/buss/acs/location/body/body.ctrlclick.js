export var deselect = function () {
    d3.selectAll('circle').on('click', function () {
        d3.event.stopPropagation();
        $(this).attr('fill', 'red').removeClass('selectelement');
    });
    d3.selectAll('rect').on('click', function () {
        d3.event.stopPropagation();
        $(this).attr('fill', '#e0e053').removeClass('selectelement');
    });
    d3.selectAll('path').on('click', function () {
        d3.event.stopPropagation();
        $(this).attr('stroke', '#8a8a8a').removeClass('selectelement');
        d3.select('#mar' + $(this).attr('id').slice(1)).select('path').attr('fill', '#8a8a8a')
        $('#mar' + $(this).attr('id').slice(1)).removeClass('selectelement');
    });
}