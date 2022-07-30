// WIP - the logic's here, it just needs to be optimized as we're getting excessive type instantiation on nested string to number.


/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math
  
  ### Question
  
  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:
  
  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.
  
  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**
  
  > View on GitHub: https://tsch.js.org/274
*/


/* _____________ Your Code Here _____________ */

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type AsArray<Number extends number, Array extends any[] = []> = 
  Array extends { length: Number }
  ? Array
  : AsArray<Number, [...Array, any]>

// todo: what about hitting a negative here? pre-condition that L > R?
type Minus_no<Left extends number, Right extends number> = 
  AsArray<Left> extends [...infer Minuend, AsArray<Right>]
  ? Minuend['length']
  : never

// type X = Minus_no<1, 555>

// type Minus<Left extends number, Right extends number> = 
//   AsArray<Right> extends [...infer LeftDiff, ...AsArray<Left>]
//     ? LeftDiff extends [] // then Right > Left
//     : AsArray<Left> extends [...infer RightDiff, ...AsArray<Right>]
//       ? RightDiff['length']
//       : never

// type Comparator<A extends number, B extends number> = 
//   AsArray<A> extends [...infer ADiff, AsArray<B>]
//   ? ADiff['length'] extends 0
//     ? AsArray<B> extends [...infer BDiff, AsArray<A>]
//       ? BDiff['length'] extends 0
//         ? Comparison.Lower
//         : Comparison.Equal
//       : never
//     : Comparison.Greater
//   : never

/*
 to handle neggos
 if both pos - done
 if one neg - ez?
 if both neg  - you wanna invert both?
*/ 

type StringToNumber<T extends string, A extends any[] = []> =
  T extends keyof [0, ...A] ? A['length'] : StringToNumber<T, [0, ...A]>
type IsNegative<A extends number> = `${A}` extends `-${string}` ? true : false
type Absolute<A extends number> = `${A}` extends `-${infer B}` ? StringToNumber<B> : A

type IsNaturalLessThanOrEqualTo<A extends number, B extends number> =
   AsArray<A> extends [...infer Diff, ...AsArray<B>]
   ? Diff['length'] extends 0
     ? true
     : false
   : true

type IsLessThanOrEqualTo<A extends number, B extends number> = 
  // AsArray<A> extends [...infer Diff, ...AsArray<B>]
  // ? Diff['length'] extends 0
  //   ? true
  //   : false
  // : true


// type IsAbsoluteLessThanOrEqualTo<A extends number, B extends number>
//   = IsNaturalLessThanOrEqualTo<Absolute<A>, Absolute<B>>

// type IsLessThanOrEqualTo<A extends number, B extends number> = 
//   AsArray<A> extends [...infer Diff, ...AsArray<B>]
//   ? Diff['length'] extends 0
//     ? true
//     : false
//   : true

// type Comparator<A extends number, B extends number> = 
//   IsLessThanOrEqualTo<A, B> extends true
//   ? IsLessThanOrEqualTo<B, A> extends true
//     ? Comparison.Equal
//     : Comparison.Lower
//   : Comparison.Greater

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/

