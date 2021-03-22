import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { updatePointId } from "/s/buss/acs/location/point/point.draw.js";
import { updatePathWhenDragPoint } from "/s/buss/acs/location/path/path.update.js";
import { editLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";

var flag = false;
export default {
    start() {
        if (!flag) {
            conf.pathHome3.selectAll(".clashLine").remove();
            let id = $(this).attr('id'),
                x = parseFloat($(this).attr('cx')),
                y = parseFloat($(this).attr('cy'));
            undoStack.push({ 'name': 'circledrag', 'id': id, 'x': x, 'y': y });
            flag = true;
        }
    },
    drag() {
        const { x, y } = d3.event;
        var id = $(this).attr('id');
        $(this).attr('cx', x)
            .attr('cy', y);
        updatePointId(id, x, y);
        updatePathWhenDragPoint(id, x, y);
    },
    end() {
        const { x, y } = d3.event;
        var id = $(this).attr('id');
        var location = tool.windowToDB(id, x, y);
        editLocation(id, location);
        var pop = undoStack.pop();
        pop.xx = x;
        pop.yy = y;
        undoStack.push(pop);
        flag = false;
    }
}