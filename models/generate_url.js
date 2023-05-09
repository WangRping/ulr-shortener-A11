function generateUrl() {
  const qty = 5

  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // let box = []
  // box = box.concat(lowerCaseLetters.split(''))
  // box = box.concat(upperCaseLetters.split(''))
  // box = box.concat(numbers.split(''))
  const box = [...lowerCaseLetters, ...upperCaseLetters, ...numbers]

  let randomCharacters = ''

  for (let i = 0; i < qty; i++) {
    randomCharacters += box[Math.floor(Math.random() * box.length)]
  }

  console.log(`for迴圈結果:${randomCharacters}`)

}

generateUrl()