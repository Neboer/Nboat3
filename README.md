# Nboat3

**N**eboer's **B**log isn't **O**nly **A**bout **T**echnique!

## Neboer的博客

Nboat3是Neboer本人的个人站点。目前主要用来展示我的个人主页和一些文章，以及和游客们互动。

同时，Nboat3也是一个博客的框架，具有一个个人博客站点的全部基础功能。
- 文章列表
- 添加文章
  - 大博文
  - 小博文
- 修改和删除文章
  - 向大博文中添加和删除文章
  - 修改文章的内容、头图、标签、可见性等
- 基于markdown的文章编辑，向文章中添加自定义的CSS
- 单一、基于cookies的管理员认证识别机制
- 还算说得过去的阅读和编辑体验
- 通过留言板发布公告，保持和用户互动，通过个人网站扩大自己的影响力。

## 技术细节
前端基于Nuxt（Vue2），后端基于express.js，数据库为mongodb。项目尽可能多的采用ES6语法。

比起之前的版本，Nboat3是一个非常现代化的项目，Nuxt颠覆性的创造了不同的前端开发体验，一方面
兼顾了传统基于模板文件的SSR渲染技术，另一方面极大的拓展了Vue的服务端渲染能力，开发体验完全不可同日而语。
Nuxt直接整合了“后端代码”到了“前端框架”，进一步削弱了后端对运行环境的限制，开发和部署之间的界限逐渐变得模糊。

项目的后端依旧采用非常优秀的mongodb数据库。对于个人博客而言，mongodb解决的问题远远多于它带来的问题，是一个非常优秀的数据库。

前端依旧是基于bootstrap和fontawesome，充分发挥了nuxt生态的优势（这句话应该这么理解：
Nuxt不兼容很多的原生vue插件，但是nuxt社区移植了许多优秀的vue插件到了Nuxt生态圈中，因此正好为我们所用。）
，同时又不至于产生很多的不兼容问题。
## 新版本新在何处

Nboat3是我写的第三版Nboat，技术上稍有创新，主要是使用了Nuxt框架。
值得一提的是，express5在今天依旧没有稳定版本放出，因此整个博客的后端依旧是基于express4来开发。
不过，后端并不是一成不变。本次更新优化了后端的大结构，可以全局访问数据库，使用ES5和异步方法（而不是显式的promise）
开发后端，增强了后端代码的可读性。唯一的遗憾就是，express4的错误处理依旧比较复杂，等express5有正式版放出之后，
说不定还会再更新一次后端。

前端不再是jquery+bootstrap了。一方面，bootstrap5已经发布了正式版，另一方面，真的很想在这里用一下Nuxt.js这个框架来开发。
Nuxt不但继承了Vuejs的所有优势，同时还增强了对ssr(服务端渲染)的支持，是当时也是目前JavaScript社区非常新的Web前端（全栈）框架。

Nboat3增加了“留言板”的功能，同时决定不开放对博客文章的“评论”功能。而是将其改成在留言板中与访客们互动的形式。

同时，Nboat3修复了Nboat2中的几个bug。

Nboat3新增了博客标题的“N”设计。这个设计正好充当了网站的favicon。总体来说是一个比较协调的icon。

## 存在的一些问题

虽然Nuxtjs支持了服务端渲染，但是它也带来了一些问题。
比如没有办法添加内建的CSS，只能把样式表内联到markdown文档或者HTML文档之中。
