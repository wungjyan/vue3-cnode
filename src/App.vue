<template>
  <router-view />
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
}
.markdown-text {
  img {
    width: 95%;
  }
  a {
    width: 100%;
    word-wrap: break-word;
  }
  p {
    font-size: 14px;
    color: #333;
  }
  code,
  pre {
    display: block;
    overflow: auto;
    background: #f4f4f4;
    padding: 2px 5px;
    border: 1px solid #eee;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
