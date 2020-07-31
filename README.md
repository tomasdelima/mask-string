A simple library to apply masks to strings

# Instalation

```yarn add mask-string```
or
```npm instal mask-string --save```

# Usage

```
import MaskString from 'mask-string'

MaskString('123456789', '99.99-99')
// 12.34-56

MaskString('AbcD', 'AA.AA-AA')
// Ab.cD

MaskString('Abc123', 'SS.SS-SS')
// Ab.c1-23

MaskString('==||==', '**.**-**')
// ==.||-==

MaskString('123abc=', '99.AA-SS')
// 12.ab-c

```
