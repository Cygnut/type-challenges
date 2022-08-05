> Please follow the template and fill the info. A PR will be auto-generated and always reflect on your changes.
>
> Detailed solution/guide is not required, but please be sure the challenge is solvable.

## Info

Basic info of your challenge questions,

```yaml
difficulty: hard
title: FizzBuzz
tags: array, math, infer
```

## Question

<!--question-start-->

The FizzBuzz problem is a classic test given in coding interviews. The task is simple:

Print integers 1 to N, except:

- Print "Fizz" if an integer is divisible by 3;
- Print "Buzz" if an integer is divisible by 5;
- Print "FizzBuzz" if an integer is divisible by both 3 and 5.

For example, for N = 20, the output should be:
`1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz`

In the challenge below, we will want to generate this as an array of string literals.

For large values of N, you will need to ensure that any types generated do so efficiently (e.g. by
correctly using the tail-call optimisation for recursion).

<!--question-end-->

## Template

```ts
type FizzBuzz<N extends number> = any
```

## Test Cases

Provide some test cases for your challenge, you can use some utils from `@type-challenges/utils` for asserting.

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FizzBuzz<1>, ["1"]>>,
  Expect<Equal<FizzBuzz<5>, ["1", "2", "Fizz", "4", "Buzz"]>>,
  Expect<Equal<FizzBuzz<20>, [
    "1",
    "2",
    "Fizz",
    "4",
    "Buzz",
    "Fizz",
    "7",
    "8",
    "Fizz",
    "Buzz",
    "11",
    "Fizz",
    "13",
    "14",
    "FizzBuzz",
    "16",
    "17",
    "Fizz",
    "19",
    "Buzz"
  ]>>,
  Expect<Equal<FizzBuzz<100>, [
    "1",
    "2",
    "Fizz",
    "4",
    "Buzz",
    "Fizz",
    "7",
    "8",
    "Fizz",
    "Buzz",
    "11",
    "Fizz",
    "13",
    "14",
    "FizzBuzz",
    "16",
    "17",
    "Fizz",
    "19",
    "Buzz",
    "Fizz",
    "22",
    "23",
    "Fizz",
    "Buzz",
    "26",
    "Fizz",
    "28",
    "29",
    "FizzBuzz",
    "31",
    "32",
    "Fizz",
    "34",
    "Buzz",
    "Fizz",
    "37",
    "38",
    "Fizz",
    "Buzz",
    "41",
    "Fizz",
    "43",
    "44",
    "FizzBuzz",
    "46",
    "47",
    "Fizz",
    "49",
    "Buzz",
    "Fizz",
    "52",
    "53",
    "Fizz",
    "Buzz",
    "56",
    "Fizz",
    "58",
    "59",
    "FizzBuzz",
    "61",
    "62",
    "Fizz",
    "64",
    "Buzz",
    "Fizz",
    "67",
    "68",
    "Fizz",
    "Buzz",
    "71",
    "Fizz",
    "73",
    "74",
    "FizzBuzz",
    "76",
    "77",
    "Fizz",
    "79",
    "Buzz",
    "Fizz",
    "82",
    "83",
    "Fizz",
    "Buzz",
    "86",
    "Fizz",
    "88",
    "89",
    "FizzBuzz",
    "91",
    "92",
    "Fizz",
    "94",
    "Buzz",
    "Fizz",
    "97",
    "98",
    "Fizz",
    "Buzz",
  ]>>
]
```

## Sample Solution

```ts
type ToArray<N extends number, _Result extends number[] = []> =
  _Result extends { length: N }
  ? _Result
  : ToArray<N, [..._Result, any]>;

type Subtract<A extends any[], B extends any[]> =
  A extends [...infer C, ...B]
  ? C
  : never;

type ModulusOfArray<A extends any[], N extends any[]> =
  Subtract<A, N> extends never
  ? A['length']
  : ModulusOfArray<Subtract<A, N>, N>;

type Modulus<A extends number, N extends number> = ModulusOfArray<ToArray<A>, ToArray<N>>;

type Divides<A extends number, N extends number> = Modulus<A, N> extends 0 ? true : false;

type Join<A extends string[], _Result extends string = ''>
  = A extends [infer First extends string, ...infer Rest extends string[]]
  ? Join<Rest, `${_Result}${First}`>
  : _Result;

type Increment<N extends number> =
  [...ToArray<N>, any]['length'] extends infer I extends number
  ? I
  : never;

type Coalesce<A extends string, B extends string> = A extends '' ? B : A;

type FizzBuzzOfNumber<N extends number> = Coalesce<Join<[
  Divides<N, 3> extends true ? 'Fizz' : '',
  Divides<N, 5> extends true ? 'Buzz' : ''
]>, `${N}`>;

type FizzBuzzOfArray<N extends any[], _Result extends string[] = []> =
  _Result['length'] extends N['length']
  ? _Result
  : FizzBuzzOfArray<N, [..._Result, FizzBuzzOfNumber<Increment<_Result['length']>>]>;

type FizzBuzz<N extends number> = FizzBuzzOfArray<ToArray<N>>;
```