/*
  3326 - BEM style string
  -------
  by Songhn (@songhn233) #medium #template-literal #union #tuple
  
  ### Question
  
  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS. 
  
  For example, the block component would be represented as `btn`, element that depends upon the block would be represented as `btn__price`, modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.
  
  Implement `BEM<B, E, M>` which generate string union from these three parameters. Where `B` is a string literal, `E` and `M` are string arrays (can be empty).
  
  > View on GitHub: https://tsch.js.org/3326
*/


/* _____________ Your Code Here _____________ */

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

type FizzBuzzOfNumber<N extends number> = Join<[
  Divides<N, 3> extends true ? 'Fizz' : '', 
  Divides<N, 5> extends true ? 'Buzz' : '' 
]>;

type FizzBuzzOfArray<N extends any[], _Result extends string[] = []> = 
  _Result['length'] extends N['length']
  ? _Result
  : FizzBuzzOfArray<N, [..._Result, FizzBuzzOfNumber<Increment<_Result['length']>>]>;

type FizzBuzz<N extends number> = FizzBuzzOfArray<ToArray<N>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FizzBuzz<1>, ['']>>,
  Expect<Equal<FizzBuzz<5>, ["", "", "Fizz", "", "Buzz"]>>,
  Expect<Equal<FizzBuzz<20>, ["", "", "Fizz", "", "Buzz", "Fizz", "", "", "Fizz", "Buzz", "", "Fizz", "", "", "FizzBuzz", "", "", "Fizz", "", "Buzz"]>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3326/answer
  > View solutions: https://tsch.js.org/3326/solutions
  > More Challenges: https://tsch.js.org
*/

