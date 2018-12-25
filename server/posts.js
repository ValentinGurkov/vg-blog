/* eslint-disable camelcase */
const Prismic = require('prismic-javascript')

const PRISMIC_API_URL = 'https://uniblog.prismic.io/api'

const getPosts = async currPage => {
  try {
    const API = await Prismic.api(PRISMIC_API_URL)
    // we pass up the slug to request the correct post
    const response = await API.query(Prismic.Predicates.at('document.type', 'blog_post'), {
      pageSize: 100,
      page: currPage
    })
    const { page, results_size, results } = response
    return { page, results_size, results }
  } catch (error) {
    console.error(error)
    return error
  }
}

module.exports = (async () => {
  try {
    let articles = []
    let { page, total_pages, results_size, results } = await getPosts(1)
    if (results_size !== 0) {
      articles = [...results]
      while (page < total_pages) {
        ;({ page, results } = await getPosts(page + 1))
        articles = [...articles, ...results]
      }
    }
    return articles
  } catch (error) {
    console.error(error)
    return error
  }
})()
/* eslint-enable camelcase */
