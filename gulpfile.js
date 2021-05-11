// 解构gulp
const {src, dest, watch, series, parallel} = require('gulp')
// 全自动化构建项目：改变文件，就会自动执行任务并自动刷新浏览器 - gulp-connect，当第一次执行任务，先将所有文件都进行处理，自动打开浏览器 - open
// const connect = require('gulp-connect')
// const sass = require('gulp-sass')
const open = require('open')
// const cleanCss = require('gulp-clean-css')
// const autoprefixer = require('gulp-autoprefixer')
// const rename = require('gulp-rename')
// const babel = require('gulp-babel')
// const uglify = require('gulp-uglify')
// const htmlmin = require('gulp-htmlmin')
// const loadPlugins = require('gulp-load-plugins')


// function print(cb){
//     console.log(_);
//     cb()
// }
// exports.default = print
/*
下载插件：
npm i gulp-connect open gulp-sass gulp-clean-css gulp-autoprefixer gulp-rename gulp-babel@7.0.1 babel-core babel-preset-es2015 gulp-uglify gulp-htmlmin gulp-load-plugins gulp-imagemin

gulp-load-plugins - 这一个插件就可以代表所有下载好的插件
*/
// 导入别的插件
const _ = require('gulp-load-plugins')()
// 编译sass - 添加前缀 - 压缩css
// function handlerCss(cb){
//     // 读取文件
//     src('./src/sass/*.scss')
//     // 编译
//     .pipe(_.sass())
//     // 添加前缀
//     .pipe(_.autoprefixer())
//     // 压缩
//     .pipe(_.cleanCss())
//     // 重命名
//     .pipe(_.rename({
//         suffix:".min"
//     }))
//     // 保存
//     .pipe(dest('./dist/css'))
//     .pipe(_.connect.reload())
//     cb()
// }
// 压缩并移动css文件
// 编译sass - 添加前缀 - 压缩css
function moveCss(cb){
    // 读取文件
    src('./src/css/*.css')
    // 添加前缀
    .pipe(_.autoprefixer())
    // 压缩
    .pipe(_.cleanCss())
    // 重命名
    .pipe(_.rename({
        suffix:".min"
    }))
    // 保存
    .pipe(dest('./dist/css'))
    .pipe(_.connect.reload())
    cb()
}
function moveJs(cb){
    src('./src/js/layer/**')
    .pipe(dest("./dist/js/layer"))
    cb()
}
// es6~es5 - 压缩
function handlerJS(cb){
    // 读取文件
    src('./src/js/*.js')
    // 转es5
    .pipe(_.babel({
        presets: ['es2015']
    }))
    // 压缩
    .pipe(_.uglify())
    // 重命名
    .pipe(_.rename({
        suffix:".min"
    }))
    // 保存
    .pipe(dest("./dist/js"))
    .pipe(_.connect.reload())
    cb()
}

// 压缩html
function handlerHTML(cb){
    // 读取
    src('./src/*.html')
    // 压缩
    .pipe(_.htmlmin({
        collapseWhitespace: true
    }))
    // 保存
    .pipe(dest('./dist'))
    .pipe(_.connect.reload())
    cb()
}
// 处理图片
function handlerImg(cb){
    src(['./src/img/*.jpg','./src/img/*.png'])
    .pipe(_.imagemin())
    .pipe(dest('./dist/img'))
    .pipe(_.connect.reload())
    cb()
}
// 处理网站图标
// function handlerIco(cb){
//     src('./src/*.ico')
//     .pipe(dest('./dist'))
//     cb()    
// }
// 处理php
function handlerPHP(cb){
    src('./src/php/*.php')
    .pipe(dest('./dist/php'))
    .pipe(_.connect.reload())
    cb()
}
// 自动刷新
function server(cb){
    // 设置服务器
    _.connect.server({
        root:"./dist",
        port:9527,
        livereload:true
    })
    // 监视任务
    // watch('./src/sass/*.scss',{ignoreInitial:false},handlerCss)
    watch('./src/js/*.js',{ignoreInitial:false},handlerJS)
    watch('./src/*.html',{ignoreInitial:false},handlerHTML)
    watch('./src/php/*.php',{ignoreInitial:false},handlerPHP)
    watch(['./src/images/*.jpg','./src/images/*.png'],{ignoreInitial:false},handlerImg)
    watch('./src/js/layer',{ignoreInitial:false},moveJs)
    // 任务完成然后生成文件，但是任务完成立马就打开浏览器，会造成任务完成文件还没有生成的时候，打开了浏览器 - 浏览器中打不开这个文件
    // 自动打开浏览器
    setTimeout(function(){
        open('http://localhost:9527/home.html')
    },1000)
}
// 清空目标文件夹
function cleanDir(cb){
    src('./dist',{allowEmpty:true})
    .pipe(_.clean())
    cb()
}
// 导出任务
exports.default = series(cleanDir,parallel(server,moveCss))
// function print(cb){
//     console.log(_);
//     cb()
// }
// exports.default = print