export var initBtns = jQuery.parseJSON(localStorage.agvControl);
switch (localStorage.projectKey) {
	case "QDTY_SELF":
		initBtns = [
			{ "id": "PAUSE_USER", "name": "暂停" },
			{ "id": "CONTINUE", "name": "继续" },
			{ "id": "GOTO_INIT", "name": "返回初始位置", "color": "red" },
			{ "id": "SHUTDOWN", "name": "取消任务", "color": "red" }
		];
		break;
	default:
		break;
}