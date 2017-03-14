## vue-ios-alertview

> iOS7+ style alertview service for Vue 2

Vue port of [angular-ios-alertview](https://github.com/Treri/angular-ios-alertview).

#### Install

```
npm install vue-ios-alertview
```

#### Dependences

Promise

#### Usage

```
import Vue from 'vue';
import iosAlertView from 'vue-ios-alertview';

Vue.use(iosAlertView);

new Vue({
  el: '#container',
  methods: {
    alert: function(){
      this.$iosAlert('alert').then(function(){
        console.log('alert);
      });
    }
  }
});
```

#### Options

(Note: some options are specific to different alertview type, e.g. `remindDuration` is only for `$iosRemind`).

- `title`, alertview title, default empty
- `text`, alertview content, support html string. default empty
- `input`, whether show input form, default false
- `placeholder`, input field placeholder, default empty
- `cancelText`, cancel button text, default `Cancel`
- `okText`, ok button text, default `OK`
- `remindDuration`, remind show duration, default 650ms
- `buttons`, array of button object.

    an example of button object

        {
          text: 'OK',
          bold: true,
          onClick: function(data){
            // data.index
            // data.button
            // data.value
          }
        }
- `defaultOption`, the option key if you just pass in a string when you invoke `$iosAlert`, `$iosConfirm`, `$iosPrompt` or `$iosRemind`. default `text`, you can set it to `title` or something else.

#### License
MIT
