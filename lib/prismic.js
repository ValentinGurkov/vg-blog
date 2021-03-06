function linkResolver(doc) {
  if (doc.type === 'blog_post') {
    return `/articles/${doc.uid}`;
  }
  return '/';
}

module.exports = {
  linkResolver
};
