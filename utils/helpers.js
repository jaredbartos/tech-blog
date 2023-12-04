// Handlebars helper to format date for displaying
const formatDate = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

module.exports = { formatDate };