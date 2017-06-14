import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/iosAlertview.js',
  dest: 'dist/vue-ios-alertview.js',
  format: 'umd',
  moduleName: 'vueIosAlertview',
  exports: 'named',

  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    vue({
      compileTemplate: true,
      css: true
    }),
    buble()
  ]
}
