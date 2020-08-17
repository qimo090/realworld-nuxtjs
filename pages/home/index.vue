<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <!-- feed -->
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                    exact
                    :to="{ name: 'home', query: { tab: 'your_feed' }}"
                    class="nav-link"
                    :class="{active: tab === 'your_feed'}"
                >Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                    exact
                    :to="{ name: 'home' }"
                    class="nav-link"
                    :class="{active: tab === 'global_feed'}"
                >Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                    exact
                    :to="{ name: 'home', query: { tab: 'tag', tag }}"
                    class="nav-link"
                    :class="{active: tab === 'tag'}"
                ># {{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{ name: 'profile', params: { username: article.author.username}}">
                <!-- <img :src="article.author.image" alt="avatar"/>-->
                <img src="" alt="">
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="{ name: 'profile', params: { username: article.author.username}}">
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button :disabled="article.favoriteDisabled" @click="onFavorite(article)"
                      class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{ active: article.favorited }">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{ name: 'article', params: { slug: article.slug }}" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li v-for="item in totalPage" :key="item" class="page-item" :class="{ active: item === page}">
                <nuxt-link :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab
                  }
                }" class="page-link">{{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                  :to="{name: 'home', query: { tag, tab: 'tag' }}"
                  v-for="tag in tags" :key="tag"
                  class="tag-pill tag-default">{{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { addFavorite, deleteFavorite, getArticles, getYourFeedArticles } from '@/api/article'
import { getTags } from '@/api/tag'

export default {
  name: 'HomeIndex',
  async asyncData ({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    console.log('query =>', query)
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles = tab === 'global_feed' ?
        getArticles : getYourFeedArticles
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    articles.forEach(article => article.favoriteDisabled = false)
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tab,
      tag,
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
  methods: {
    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      console.log('article =>', article)
      article.favoriteDisabled = false
    },
  },
}
</script>

<style scoped>

</style>