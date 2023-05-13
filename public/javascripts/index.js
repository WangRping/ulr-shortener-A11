const copyButton = document.querySelector('#copy-button')
const resultUrl = document.querySelector('#result-url')

copyButton.addEventListener('click', function () {
  const url = resultUrl.textContent
  navigator.clipboard.writeText(url)
})