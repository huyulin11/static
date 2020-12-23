/**只对系统整体样式做控制，细节样式到css文件中定义**/
let style = $(`<style id='globalCss'></style>`);
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
        { name: "button", content: { "background-color": "#2e72ab" } },
    );
}
for (let css of csss) {
    let contents = "";
    for (let content in css.content) {
        contents += `${content}:${css.content[content]}`;
    }
    $(style).append(`${css.name} {${contents}}`);
}
$("head").append(style);