"use strict";

var a = "import { vue } from 'vue' ";
a.replace(/from ['"](.*)['"]/, function (s1, s2) {
  console.log('s1', s1);
  console.log('s2', s2);
});