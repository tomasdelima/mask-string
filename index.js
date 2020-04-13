const maskChars = {
  9: /[0-9]/,
  A: /[a-zA-Z]/,
  S: /[a-zA-Z0-9]/,
  '*': /./,
}

const formatMaskChar = (text, maskChar, index) => {
  if (!text[index + this.shift]) {
    return {text: '', matched: false}
  } else if (maskChars[maskChar]) {
    if (text[index + this.shift].match(maskChars[maskChar])) {
      return {text: text[index + this.shift], matched: true}
    } else {
      this.shift += 1
      return formatMaskChar(text, maskChar, index)
    }
  } else {
    this.shift -= 1
    return {text: maskChar, matched: false}
  }
}

const filter = (item) => {
  this.matched = item.matched || this.matched
  return this.matched
}

module.exports = (text, mask) => {
  this.shift = 0
  this.matched = false

  return mask.split('')
    .map((maskChar, index) => formatMaskChar(text, maskChar, index))
    .reverse()
    .filter(filter)
    .reverse()
    .map(item => item.text)
    .join('')
}
