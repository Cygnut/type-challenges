> Please follow the template and fill the info. A PR will be auto-generated and always reflect on your changes.
>
> Detailed solution/guide is not required, but please be sure the challenge is solvable.

## Info

Basic info of your challenge questions,

```yaml
difficulty: medium
title: Modulo
tags: array, math, infer
```

## Question

Javascript and a lot of other programming languages support the modulo (also know as remainder) operator `%` which returns the remainder when an integer is divided by another integer. For Javascript's implementation - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder.

Here's some examples:

```js
5 % 4 === 1     // Since 5 divided by 4 is 1 with a remainder of 1
9 % 4 === 1     // Since 9 divided by 4 is 2 with a remainder of 1
16 % 2 === 0    // Since 16 divided by 4 is 8 with a remainder of 0
```

You do not need to worry about the case when the left or right hand sides are negative.

## Template

This is the template for challengers to start the coding. Basically, you just need to change the name of your generic/function and leave to implementation `any`.

```ts
type Modulo<M extends number, N extends number> = any
```

## Test Cases

Provide some test cases for your challenge, you can use some utils from `@type-challenges/utils` for asserting.

```ts
import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Modulo<5, 4>, 1>>,
  Expect<Equal<Modulo<9, 4>, 1>>,
  Expect<Equal<Modulo<16, 2>, 0>>,
  Expect<Equal<Modulo<35, 1>, 1>>,
  Expect<Equal<Modulo<35, 10>, 5>>
]
```
