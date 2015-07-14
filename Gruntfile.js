module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
                'src/Leaflet.VectorTools.js',
                'src/Toolbar.js',
                'src/Tooltip.js',
                'src/ext/GeometryUtil.js',
                'src/ext/LatLngUtil.js',
                'src/ext/LineUtil.Intersect.js',
                'src/ext/Polygon.Intersect.js',
                'src/ext/Polyline.Intersect.js',
                'src/draw/DrawToolbar.js',
                'src/draw/handler/Draw.Feature.js',
                'src/draw/handler/Draw.SimpleShape.js',
                'src/draw/handler/Draw.Polyline.js',
                'src/draw/handler/Draw.Circle.js',
                'src/draw/handler/Draw.Marker.js',
                'src/draw/handler/Draw.Polygon.js',
                'src/draw/handler/Draw.Rectangle.js',
                'src/edit/EditToolbar.js',
                'src/edit/handler/EditToolbar.Edit.js',
                'src/edit/handler/EditToolbar.Delete.js',
                'src/Control.Draw.js',
                'src/edit/handler/Edit.Poly.js',
                'src/edit/handler/Edit.SimpleShape.js',
                'src/edit/handler/Edit.Circle.js',
                'src/edit/handler/Edit.Rectangle.js',
                'src/edit/handler/Edit.Marker.js'
        ],
        //src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};