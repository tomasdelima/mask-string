const maskChars = {
  9: /[0-9]/,
  A: /[a-zA-Z]/,
  S: /[a-zA-Z0-9]/,
  '*': /./,
}

const formatMaskChar = (text, maskChar, index) => {
  if (!text[index + this.shift]) {
    return ''
  } else if (maskChars[maskChar]) {
    if (text[index + this.shift].match(maskChars[maskChar])) {
      return text[index + this.shift]
    } else {
      this.shift += 1
      return formatMaskChar(text, maskChar, index)
    }
  } else {
    this.shift -= 1
    return maskChar
  }
}

export default (text, mask) => {
  this.shift = 0
  return mask.split('').map((maskChar, index) => formatMaskChar(text, maskChar, index)).join('')
}
