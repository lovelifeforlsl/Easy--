<template>
  <div id="app">
      <router-view />
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a {
  margin: 0;
  padding: 0;
}

.fr {
  float: right;
}

.fl {
  float: left;
}

.clearfix::before,
.clearfix::after {
  clear: both;
  content: "";
  display: block;
}
.auto-img {
  width: 100%;
  display: block;
}
</style>
