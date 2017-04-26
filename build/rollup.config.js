import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/iosAlertview.js',
  dest: 'dist/vue-ios-alertview.js',
  format: 'umd',
  moduleName: 'vueIosAlertview',
  exports: 'named',

  plugins: [
    vue({
      compileTemplate: true,
      css: true
    }),
    buble()
  ]
}
