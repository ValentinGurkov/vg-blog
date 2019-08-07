exports.getLastModifiedDate = date =>
  `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`

exports.formatArticleDate = datePublished => {
  const date = new Date(datePublished)
  const d = date.getDate()
  let mm = date.getMonth() + 1
  const yyyy = date.getFullYear()

  if (mm < 10) {
    mm = `0${mm}`
  }
  return `${d}.${mm}.${yyyy}`
}
