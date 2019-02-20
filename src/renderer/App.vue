<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'search-boi'
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  
  :root {
    --primary-color: #4fc08d;
    --secondary-color: #2c3e50;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  .wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
    overflow: auto;
  }

  button.button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: var(--primary-color);
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid var(--primary-color);
  }

  .button.alt {
    color: #42b983;
    background-color: transparent;
  }

  .button.icon {
    padding: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .input {
    background: transparent;
    border: 0;
    border-bottom: 2px solid var(--primary-color);
    padding: 0.2rem 0.1rem;
    margin-bottom: .5rem;
    font-size: 1.15rem;
  }


</style>
