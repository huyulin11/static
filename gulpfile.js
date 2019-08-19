// 获取 gulp
var gulp = require('gulp');
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务

var fs = require("fs")
var path = require("path")

var root = path.join(__dirname)

readDirSync(root)
function readDirSync(path) {
    var pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            console.log("dir: " + ele)
            readDirSync(path + "/" + ele);
        } else {
            console.log("file: " + ele)
        }
    })
}

gulp.task('jscompress', function () {
    var combined = gulp.src('s/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

    combined.on('error', console.error.bind(console));
    return combined;
});