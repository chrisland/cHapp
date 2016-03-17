module.exports = function(grunt) {
  grunt.initConfig({
    'build-electron-app': {
        options: {
            electron_version: 'v0.36.8',
            build_dir: 'build',
            app_dir: 'source',
            platforms: ["darwin", "win32"]
        }
    }
  });
  grunt.loadNpmTasks('grunt-electron-app-builder');

  grunt.registerTask('default', ['build-electron-app']);
};
