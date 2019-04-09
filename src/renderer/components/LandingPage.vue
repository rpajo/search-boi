<template>
  <div class="wrapper">
    <main>
      <h1 class="title">
        <span class="title-1">Search</span>
        <span class="title-2">- boi</span>
      </h1>
      <form class="search-wrapper" v-on:submit.prevent="executeSearch">
        <input class="main-search" type="text"
          v-model="searchTerm"
          placeholder="Search...">
        <button class="button" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </main>

    <div style="text-align: center; margin-top: 2rem">
      <router-link to="/settings">
        <button class="button alt">Settings</button>
      </router-link>
    </div>
<!-- 
      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <button class="button alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="button alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
        </div>
      </div> -->

  </div>
</template>

<script>
  // const storage = require('../../main/Storage.js');
  import { storage } from '../../main/Storage.js';
  export default {
    name: 'landing-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      executeSearch() {
        const pageList = storage.get('pages');
        console.log(this.searchTerm, this.$data.searchTerm);
        pageList.forEach(page => {
          const searchTerm = (`${page.prefix || ''} ${this.searchTerm.trim()} ${page.sufix || ''}`).trim().replace(/\s/g, page.delimiter);
          const formatedUrl = page.url.replace(/%s/g, searchTerm);
          console.log(formatedUrl);
          this.$electron.shell.openExternal(formatedUrl);
        });
      }
    },
    data: function() {
      return {
        searchTerm: ''
      }
    }
  }
</script>

<style lang="scss">

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    max-width: 500px;
    margin: auto;
  }


  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }


  .search-wrapper {
    text-align: center;
    padding-top: 10%;
    color: var(--primary-color);
    position: relative;

    .button {
      position: absolute;
      right: 0.2rem;
      bottom: 0.25rem;
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
    }
  }

  .title {
    font-size: 4rem;
    font-weight: normal;
    color: var(--primary-color);
    text-align: center;

    .title-2 { 
      color: var(--secondary-color);
    }
  }

  

  .main-search {
    height: 3rem;
    width: 100%;
    border-radius: 30px;
    border: none;
    background: #ffffffad;
    font-size: 2rem;
    padding: 0 1rem;
    color: #2c2c2c;
    box-shadow: #ffffff30 0px 5px 17px 3px;
    border: 1.5px solid var(--primary-color);
    &::placeholder {
      color: #d5d5d5
    }
    &:focus {
      outline: none;
    }
  }

</style>
