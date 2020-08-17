<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input v-model="article.title" type="text" class="form-control form-control-lg"
                       placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="article.description" type="text" class="form-control"
                       placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="article.body" class="form-control" rows="8"
                          placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="tagInput" type="text" class="form-control" placeholder="Enter tags"
                       @keydown.enter.prevent="addTag(tagInput)"
                >
                <div class="tag-list">
                  <span
                      class="tag-default tag-pill"
                      v-for="(tag, index) of article.tagList"
                      :key="tag + index"
                  >
                      <i class="ion-close-round" @click="removeTag(tag)"> </i>
                      {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="handlePublish">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '~/api/article'

export default {
  name: 'EditorIndex',
  middleware: 'authenticated',
  data () {
    return {
      article: {
        title: 'Qimo Test Article 2',
        description: 'A test',
        body: '> JavaScript 高级程序设计第四版要出了！！！\n' +
            '\n' +
            '买买买！！！',
        tagList: [],
      },
      tagInput: '',
    }
  },
  methods: {
    // 发布文章
    async handlePublish () {
      await createArticle(this.article)
      this.$router.push({ name: 'home' })
    },
    removeTag (tag) {
      const index = this.article.tagList.findIndex(v => v === tag)
      if (index >= -1) {
        this.article.tagList.splice(index, 1)
      }
    },
    addTag (tag) {
      if (this.article.tagList.includes(tag)) return
      this.article.tagList.push(tag)
      this.tagInput = null
    },
  },
}
</script>

<style scoped>

</style>