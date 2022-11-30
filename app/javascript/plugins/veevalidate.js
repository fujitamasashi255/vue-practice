import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, max, min, confirmed, required, image } from 'vee-validate/dist/rules';
import Vue from 'vue';

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('image', {
  ...image,
  message: `画像ファイルを登録してください`,
})

extend('required', {
  ...required,
  message: `{_field_}は必須項目です`,
})

extend('max', {
  ...max,
  message: `{_field_}は{length}文字以下で入力してください`,
})

extend('confirmed', {
  ...confirmed,
  message: 'パスワードと一致しません',
})

extend('email', {
  ...email,
  message: 'メールアドレスの形式で入力してください',
});

extend('min', {
  ...min,
  message: `{_field_}は{length}文字以上で入力してください`,
});