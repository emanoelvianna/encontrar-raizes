(function() {

    var gulp = require('gulp');
    var bs = require('browser-sync').create(); // create a browser sync instance.

    //TODO: criar o codigo minificado!

    gulp.task('browser-sync', function() {
        bs.init({
            server: {
                baseDir: "./"
            }
        });
    });

}());