import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import glslify from 'rollup-plugin-glslify';

export default {
  input: 'main.js',
  plugins: [
    glslify(),
    commonjs(),
    resolve({
      browser: true,
      main: true
    }),
    globals(),
    builtins(),
    babel({
      babelrc: false,
      presets: [ 'es2015-rollup' ]
    }),
  ],
  output: {
    file: 'dist/app.js',
    format: 'iife',
    name: 'QuickVoxel',
    sourcemap: 'inline'
  }
};
