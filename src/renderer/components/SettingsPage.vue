<template>
<div id="settings" class="wrapper">
  <h1>Settings</h1>

  <div class="settings-content">
    <h2>Pages:</h2>

    <div class="page-settings">
      <div class="page-info" v-for="(page, index) in pages" :key="`${index}`">
        <input class="input small url-input" v-model=page.url placeholder="Search Url" />
        <input class="input small input-md" v-model=page.prefix placeholder="Prefix" />
        <input class="input small input-md" v-model=page.sufix placeholder="Sufix" />
        <input class="input small input-sm" v-model=page.delimiter placeholder="" />
        <button class="button alt icon" @click="removePage(index)">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <button class="button alt icon" @click="addPage()">
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <div class="usage-info">
      Page parameters:
      <ul>
        <li>Column 1: Search url,</li>
        <li>Column 2: search prefix,</li>
        <li>Column 2: search sufix,</li>
        <li>Column 4: space delimiter</li>
      </ul>
      <br>
      <p>
        On search, any '%s' strings will be replaced by the seach query. Spaces will be replaced by the set delimiter.
      </p>
    </div>
  </div>
  <router-link to="/">
    <button class="button alt">Back</button>
  </router-link>
  <button class="button" @click="saveSettings()">Save</button>

  <span style="margin-left: 1rem; color: gray">{{ status }}</span>

</div>
</template>

<script>
  import { storage } from '../../main/Storage';
  import { delimiter } from 'path';

  export default {
    name: 'settings-page',
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
      },
      addPage() {
        this.pages.push({
          url: 'https://www.google.com/search?q=%s',
          prefix: '',
          sufix: '',
          delimiter: '+'
        });
      },
      removePage(index) {
        console.log('Remove: ', index);
        this.pages.splice(index, 1);
      },
      saveSettings() {
        console.log(this.data, this.$data.pages.map(p => {
          return {
            'url': p.url,
            'prefix': '',
            'sufix': '',
            'delimiter': p.delimiter
          }
        }));

        const saveStatus = storage.set('pages', this.$data.pages);
        console.log(saveStatus);
        this.status = saveStatus === true ? 'Settings saved' : 'Error while saving';

        setTimeout(() => {
          this.status = '';
        }, 2000);
      }
    },
    data: function() {
      return {
        pages: storage.get('pages'),
        status: ''
      }
    }
  }
</script>

<style lang="scss">
  h2 {
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
  }

  .settings-content {
    padding: 1rem 0;
  }

  a {
    text-decoration: none;
  }

  .page-info {
    display: flex;
    & > * {
      margin-right: 0.5rem; 
    }
    .url-input {
      flex: 1 1 auto;
    }
    .input-sm {
      flex: 0 1 2rem;
      width: 100%;
    }
    .input-md {
      flex: 0 1 3rem;
      width: 100%;
    }
    .button {
      flex: 0 1 2rem;
    }
    .small {
      font-size: .9rem;
    }
  }

  
  .usage-info {
    margin: 1rem 0 .5rem 0;
    font-size: .8rem;
    color: gray;
  }

</style>
