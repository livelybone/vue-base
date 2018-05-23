// 语言国际化
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { CN } from "assets/lang/CN";
import { CNT } from "assets/lang/CN-T";

export function initialI18n() {
  Vue.use(VueI18n);
  return new VueI18n({
    locale: 'CN',
    messages: {
      CN,
      CNT,
    },
  });
}
