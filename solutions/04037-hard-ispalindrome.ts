/*
  4037 - IsPalindrome
  -------
  by jiangshan (@jiangshanmeta) #hard #string
  
  ### Question
  
  Implement type ```IsPalindrome<T>``` to check whether  a string or number is palindrome.
  
  For example:
  
  ```typescript
  IsPalindrome<'abc'> // false
  IsPalindrome<121> // true
  ```
  
  > View on GitHub: https://tsch.js.org/4037
*/


/* _____________ Your Code Here _____________ */


type LiteralToStringArray<S extends string | number, Array extends string[] = []> = 
  `${S}` extends `${infer First}${infer Rest}`
    ? LiteralToStringArray<Rest, [...Array, First]>
    : Array

type Reverse<T extends readonly any[], Array extends any[] = []> = 
  T extends [infer First, ...infer Rest]
    ? Reverse<Rest, [First, ...Array]>
    : Array

type IsPalindrome<T extends string | number> = 
  LiteralToStringArray<T> extends Reverse<LiteralToStringArray<T>> 
    ? true 
    : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4037/answer
  > View solutions: https://tsch.js.org/4037/solutions
  > More Challenges: https://tsch.js.org
*/

