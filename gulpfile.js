var gulp = require("gulp"),                         // gulp主组件
    babel = require('gulp-babel'),                  // 编译es6
    sass = require('gulp-sass'),                    // 编译sass
    cssmin = require('gulp-clean-css'),             // 压缩css文件
	uglify = require("gulp-uglify"),		        // 压缩丑化js文件
	imagemin = require('gulp-tinypng-nokey'),       // 压缩图片
	htmlmin = require('gulp-htmlmin'),              // 压缩html文件
    zip = require('gulp-zip'),                      // 打包成压缩文件
    rev = require('gulp-rev'),                      // 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   // 替换被gulp-rev改名的文件名
    copy = require('gulp-copy'),                    // 拷贝文件
    watch = require('gulp-watch'),                  // 监听文件
    browserSync = require('browser-sync').create(), // 自动刷新文件
    {createProxyMiddleware} = require('http-proxy-middleware'),
    runSequence = require('run-sequence');          // 按顺序执行




//先编译es6,再压缩js
gulp.task('compress_js',function(){
    return gulp.src(['./src/js/*.js','!./src/js/*.min.js'])   // 获取.js文件，同时过滤掉.min.js文件
        .pipe(babel())          // 编译es6
        // .pipe(uglify({preserveComments:'some'}))    // 使用uglify进行压缩，并保留部分注释
        .pipe(uglify())         // 压缩js
        .pipe(browserSync.reload({stream:true}))       // 实时刷新
        .pipe(rev())            // 给文件添加hash编码    
        .pipe(gulp.dest('./build/js'))
        .pipe(rev.manifest())   // 生成rev-mainfest.json文件作为记录
        .pipe(gulp.dest('./build/js'))
});


// JS生成文件hash编码并生成 rev-manifest.json文件名对照映射  
gulp.task('revHtmlJs', function () {
    return gulp.src(['./build/js/*.json', './build/index.html'])
        .pipe(revCollector())  // 替换html中对应的记录  
        .pipe(gulp.dest('build/'))
});



// 先编译sass,再压缩css
gulp.task('compress_sass', function(){
    return gulp.src(['./src/css/*.css','./src/css/*.scss','!./src/css/*.min.css'])
        .pipe(sass())          // 编译sass
        .pipe(cssmin())        // 压缩css
        .pipe(browserSync.reload({stream:true}))       // 实时刷新
        .pipe(rev())           // 给文件添加hash编码   
        .pipe(gulp.dest('./build/css'))
        .pipe(rev.manifest())  // 生成rev-mainfest.json文件作为记录
        .pipe(gulp.dest('./build/css'))
});


// CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revHtmlCss', function () {
    return gulp.src(['./build/css/*.json', './build/index.html'])  
        .pipe(revCollector())  // 替换html中对应的记录 
        .pipe(gulp.dest('./build/'))
}); 



// 图片压缩
gulp.task('compress_img', function () {      
    gulp.src('./src/img/*.{png,jpg,jpeg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img/'))
        .pipe(browserSync.reload({stream:true}));      // 实时刷新
});



// 压缩html文件
gulp.task('compress_html', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.reload({stream:true}));      // 实时刷新
});



// *.min.*压缩文件直接复制
gulp.task('copy',function () {
    gulp.src('./src/js/*.min.js')
        .pipe(gulp.dest('./build/js/'))
    gulp.src('src/css/*.min.css')
        .pipe(gulp.dest('./build/css/'))   
});



// 压缩整个gulp后的文件(丢给后台上线用)
gulp.task('compress_zip',function () {
    gulp.src('./build/**')
        .pipe(zip('backup.zip'))
        .pipe(gulp.dest('./build/'))
});






// 开发用(监听、刷新)
gulp.task('dev', function() {

    browserSync.init({                 // 启动Browsersync服务,实时刷新
        server: {
            baseDir: './src',   // 启动服务的目录 默认 index.html    
            index: 'index.html',        // 自定义启动文件名
            middleware:createProxyMiddleware('/api', {
                target: 'http://p.shuohongkeji.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'http://p.shuohongkeji.com'
                },
                logLevel: 'debug'
            })
        },
        port:8051,                     // 指定访问服务器的端口号
    });

    // 监听文件变化，执行相应任务
    gulp.watch('./src/**/*.js', ['compress_js']);
    gulp.watch('./src/**/*.html', ['compress_html']);
    gulp.watch('./src/**/*.css', ['compress_sass']);
    gulp.watch('./src/**/*.scss', ['compress_sass']);
    gulp.watch('./src/**/*.{png,jpg,gif,ico}', ['compress_img']);

})




// 测试或上线用(压缩、打包)
gulp.task('build', function (done) {

    condition = false;
    runSequence(
        'compress_js',
        'compress_sass',
        'compress_img',
        'compress_html',
        'copy',
        'revHtmlJs',
        'revHtmlCss',
        'compress_zip',
    done);
    
});