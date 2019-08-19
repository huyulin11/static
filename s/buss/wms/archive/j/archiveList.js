function addArchive() {
    window.pageii = layer.open({
        title: "新增",
        type: 2,
        area: ["600px", "60%"],
        content: '/s/wms/h/archiveAddUI.html'
    });
}

function addInventoryPlan() {
    window.pageii = layer.open({
        title: "新建盘点计划",
        type: 2,
        area: ["600px", "60%"],
        content: '/s/wms/h/archiveAddInventoryPlanUI.html'
    });
}

function editInventoryPlan() {
    window.pageii = layer.open({
        title: "修改盘点计划",
        type: 2,
        area: ["600px", "60%"],
        content: '/s/wms/h/archiveEditInventoryPlanUI.html'
    });
}

function viewInventoryPlan() {
    window.pageii = layer.open({
        title: "修改盘点计划",
        type: 2,
        area: ["600px", "60%"],
        content: '/s/wms/h/archiveViewInventoryPlanUI.html'
    });
}

function activateInventoryPlan() {
    layer.confirm('确定下达该盘点计划吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        layer.msg('盘点计划下达成功！', { icon: 1 });
    });
}

function activateInventoryPlan() {
    layer.confirm('确定下达该盘点计划吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        layer.msg('盘点计划下达成功！', { icon: 1 });
    });
}

function cancelInventoryPlan() {
    layer.confirm('确定撤销该盘点计划吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        layer.msg('盘点计划撤销成功！', { icon: 1 });
    });
}

function executeInventoryPlan() {
    layer.confirm('确定执行该盘点计划吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        layer.msg('盘点计划开始执行！', { icon: 1 });
    });
}

$("#addArchive").click("click", function () {
    addArchive();
});

$("#addInventoryPlan").click("click", function () {
    addInventoryPlan();
});

$("#editInventoryPlan").click("click", function () {
    editInventoryPlan();
});

$("#viewInventoryPlan").click("click", function () {
    viewInventoryPlan();
});

$("#activateInventoryPlan").click("click", function () {
    activateInventoryPlan();
});

$("#cancelInventoryPlan").click("click", function () {
    cancelInventoryPlan();
});

$("#executeInventoryPlan").click("click", function () {
    executeInventoryPlan();
});
