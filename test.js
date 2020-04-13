const MaskString = require('./index');
const assert = require('assert');

const when = (name, callback) => {
  this.prefix = `When ${name}`
  callback()
}

const it = (name, callback) => {
  this.prefix = `It ${name}`
  callback()
}

const assertEquals = (subject, test) => {
  try {
    assert.equal(subject, test)
  } catch (e) {
    console.error(`${this.prefix}: The values are different: ${JSON.stringify(subject)} and ${JSON.stringify(test)}`)
  }
}

const assertLess = (subject, test) => {
  try {
    assert(subject < test)
  } catch (e) {
    console.error(`${this.prefix}: ${JSON.stringify(subject)} is not less than ${JSON.stringify(test)}`)
  }
}

when('the mask is empty', () => {
  assertEquals(MaskString('123', ''), '')
})

when('the mask has no masking chars', () => {
  assertEquals(MaskString('123', '999'), '123')
})

when('the text is longer than the mask', () => {
  assertEquals(MaskString('123456', '999'), '123')
})

when('there are some masking chars', () => {
  assertEquals(MaskString('123', '9.9-9'), '1.2-3')
  assertEquals(MaskString('1.2-3', '9.9-9'), '1.2-3')
})

when('the mask has letters', () => {
  assertEquals(MaskString('123abc', 'A.A-A'), 'a.b-c')
})

when('the mask has letters and numbers', () => {
  assertEquals(MaskString('1a2b3c', 'S.S-S'), '1.a-2')
})

when('the mask has wildcards', () => {
  assertEquals(MaskString('1a!-=;', '***.***'), '1a!.-=;')
})

when('there are two consecutive masking chars', () => {
  let mask = '99..99'

  assertEquals(MaskString('123456', mask), '12..34')
  assertEquals(MaskString('123', mask), '12..3')
  assertEquals(MaskString('12', mask), '12')
  assertEquals(MaskString('12.', mask), '12')
})

it('is fast', () => {
  let start = new Date()
  MaskString('1234567890abcdefghijklmnopqrstuvwxyz', '1234567890abcdefghijklmnopqrstuvwxyz')
  assertLess(new Date() - start, 5)
})
