
步骤：
--	
	一、npm install 安装依赖
	
	二、修改配置
		1.打开node_modules\gulp-rev\index.js 
			第135行:manifest[originalFile] = revisionedFile;
			修改为: manifest[originalFile] = originalFile + '?v=' +file.revHash;

		2.打开node_modules\rev-path\index.js 
			第9行:return modifyFilename(pth, (filename, ext) => `${filename}-${hash}${ext}`);
			修改为: return modifyFilename(pth, (filename, ext) => `${filename}${ext}`);

		3.打开node_modules\gulp-rev-collector\index.js 
			第40行:var cleanReplacement =  path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' );
			修改为: var cleanReplacement = path.basename(json[key]).split('?')[0];
		
	三、gulp build
	
	四、gulp dev	

	
包含：
--
```
    gulp = require("gulp"),                         // gulp主组件
    babel = require('gulp-babel'),                  // 编译es6
    sass = require('gulp-sass'),                    // 编译sass
    cssmin = require('gulp-clean-css'),             // 压缩css文件
    uglify = require("gulp-uglify"),                // 压缩丑化js文件
    imagemin = require('gulp-tinypng-nokey'),       // 压缩图片
    htmlmin = require('gulp-htmlmin'),              // 压缩html文件
    zip = require('gulp-zip'),                      // 打包成压缩文件
    rev = require('gulp-rev'),                      // 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   // 替换被gulp-rev改名的文件名
    copy = require('gulp-copy'),                    // 拷贝文件
    watch = require('gulp-watch'),                  // 监听文件
    browserSync = require('browser-sync').create(), // 自动刷新文件
    runSequence = require('run-sequence');          // 按顺序执行
```	
	
版本：
--

```
    "babel-core": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "browser-sync": "^2.23.7",
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.0",
    "gulp-clean-css": "^3.9.2",
    "gulp-copy": "^1.1.0",
    "gulp-htmlmin": "^4.0.0",
    "gulp-rev": "^8.1.1",
    "gulp-rev-collector": "^1.3.1",
    "gulp-sass": "^4.0.1",
    "gulp-tinypng-nokey": "^1.1.0",
    "gulp-uglify": "^3.0.0",
    "gulp-watch": "^5.0.0",
    "gulp-zip": "^4.1.0",
    "run-sequence": "^2.2.0"

```