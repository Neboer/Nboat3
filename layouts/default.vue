<template>
  <div class="biggest">
    <header class="py-lg-2">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <div class="text-center mx-auto">
          <h1 class="large-op">
            <img src="@/static/nboat.svg" id="banner"/>
            eboer's Boat
          </h1>
          <small>
            <strong>N</strong>eboer's
            <strong>B</strong>log
            isn't
            <strong>O</strong>nly
            <strong>A</strong>bout
            <strong>T</strong>echnique
          </small>
        </div>
        <div class="icon-plate">
          <a class="text-muted alignement" href="https://github.com/Neboer">
            <font-awesome-icon :icon="['fab', 'github']"/>
          </a>
          <a class="text-muted alignement" href="mailto:rubinposter@gmail.com">
            <font-awesome-icon :icon="['fas', 'envelope']"/>
          </a>
          <a class="text-muted alignement" href="https://www.google.com">
            <font-awesome-icon :icon="['fas', 'search']"/>
          </a>
        </div>
      </div>
    </header>
    <b-nav tabs fill>
      <b-nav-item v-for="(item, index) in menu" :key="index" :to="item.href" :exact="item.exact" active-class="active">
        <font-awesome-icon :icon="item.icon"/>
        {{ item.name }}
      </b-nav-item>
    </b-nav>
    <Nuxt/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      ext_menu: []
    }
  },
  fetch () {
    if (this.$nuxt.context.store.state.admin) {
      this.ext_menu.push({
        name: '添加文章',
        href: { name: 'create' },
        icon: ['fas', 'pen']
      })
    }
  },
  computed: {
    menu () {
      const ori_menu = [{
        name: '主页',
        href: { name: 'index' },
        icon: ['fas', 'home'],
        exact: true
      }, {
        name: '文章列表',
        href: { name: 'list' },
        icon: ['fas', 'list']
      }, {
        name: '留言墙',
        href: { name: 'wall' },
        icon: ['fas', 'chalkboard']
      }]
      if (this.$nuxt.$route.name === 'blog-blog_id') {
        ori_menu.push({
          name: '看博文',
          href: {
            name: 'blog-blog_id',
            params: this.$route.params
          },
          icon: ['fas', 'book-open']
        })
      }
      return ori_menu.concat(this.ext_menu)
    }
  }
}
</script>

<style>
.alignement {
  margin-right: .5em;
}

.banner {
  max-width: 100%;
}

.biggest {
  width: 75%;
  margin: auto;
}

.icon-plate {
  position: absolute;
  right: 13%;
}

p img {
  max-width: 100%;
}

#footer {
  text-align: center;
  color: grey;
  display: block;
  margin-top: 7em;
}

#banner {
  width: 30px;
  position: relative;
  bottom: 5px;
  right: -9px;
}

@media (max-width: 576px) {
  .biggest {
    width: 98%;
    margin: auto;
  }

  .icon-plate {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
