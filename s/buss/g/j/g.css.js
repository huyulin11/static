/**只对系统整体样式做控制，细节样式到css文件中定义**/
export let globalCss = (target) => {
    let csss = [];
    if (localStorage.projectKey == 'BJJK_HUIRUI') {
        csss.push(
            { name: "body", content: { "color": "#333" } },
            { name: "a", content: { "color": "#333" } },
        );
    } else {
        csss.push(
            { name: "body", content: { "color": "#2e72ab" } },
            { name: "a", content: { "color": "#2e72ab" } },
        );
        if (window.IN_THE_MGR || parent.IN_THE_MGR) {
            csss.push(
                { name: "button", content: { "background-color": "#2e72ab", "color": "#FFF" } },
            );
        }
    }
    renderCss('globalCss', target, csss);
};

export let renderCss = (name, target, csss) => {
    let style = $(`<style id='${name}'></style>`);
    for (let css of csss) {
        let contents = "";
        for (let content in css.content) {
            contents += `${content}:${css.content[content]};`;
        }
        $(style).append(`${css.name} {${contents}}`);
    }
    if (!target) { target = "head"; }
    if ($(target).find(`style#${name}`).length == 0) $(target).append(style);
};