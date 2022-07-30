/*
  7561 - Subtract
  -------
  by Lo (@LoTwT) #extreme #tuple
  
  ### Question
  
  Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.
  
  If the minuend is less than the subtrahend, it should be `never`.
  
  It's a simple version.
  
  For example
  
  ```ts
  Subtract<2, 1> // expect to be 1
  Subtract<1, 2> // expect to be never
  ```
  
  > View on GitHub: https://tsch.js.org/7561
*/


/* _____________ Your Code Here _____________ */

type ToArray<Number extends number, _Result extends any[] = []> =
  _Result extends { length: Number }
    ? _Result
    : ToArray<Number, [..._Result, any]>

type Subtract<M extends number, S extends number> = 
  ToArray<M> extends ToArray<S>
  ? 0
  : ToArray<M> extends [...infer Diff, ToArray<S>]
    ? Diff['length'] extends 0
      ? never
      : Diff['length']
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7561/answer
  > View solutions: https://tsch.js.org/7561/solutions
  > More Challenges: https://tsch.js.org
*/

