/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #extreme #template-literal
  
  ### Question
  
  You're required to implement a type-level parser to parse URL query string into a object literal type.
  
  Some detailed requirements:
  
  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.
  
  > View on GitHub: https://tsch.js.org/151
*/


/* _____________ Your Code Here _____________ */

// Split a string literal by a separator.
type Split<String extends string, Separator extends string, Array extends string[] = []> = 
 String extends `${infer Left}${Separator}${infer Rest}`
  ? Split<Rest, Separator, [...Array, Left]>
  : Separator extends ''
    ? Array
    : String extends '' 
      ? Array 
      : [...Array, String]

// Map a key-value pair - e.g. k=v (or just k) to { k: 'v' } (or just { k: true }).
type Map<String extends string> = 
  String extends `${infer Key}=${infer Value}`
  ? { [P in Key]: Value }
  : { [P in String]: true }

// If something isn't already an array type, then make it an array containing that element.
type Arrayify<Value> = Value extends any[] ? Value : [Value]

// Determine if a tuple contains a given needle - e.g. '4' is contained in [ 1, true, number, '4' ] (this isn't 
// perfect as it doesn't handle equality very well, e.g. for `never` (we need to write an Equals<> type).
type Contains<Needle, Tuple extends any[]> =
  Tuple['length'] extends 0
    ? false
    : Tuple extends [infer First, ...infer Rest]
      ? First extends Needle
        ? true
        : Contains<Needle, Rest>
      : false

// Merge two objects in the format we're Map<>-ing to - the only difficulty being in resolving the ambiguity
// if both objects have the same key. We merge those values using the logic outlined above, with deduplication.
type Merge<Left extends object, Right extends object> = {
    [P in keyof Left | keyof Right]: 
      P extends keyof Left
        ? P extends keyof Right 
          ? Contains<Right[P], Arrayify<Left[P]>> extends true
            ? Left[P]
            : [...Arrayify<Left[P]>, ...Arrayify<Right[P]>]
          : Left[P]
        : P extends keyof Right
          ? Right[P]
          : never
  }

// Run through the tuple of key-value pairs and reduce their mappings with Merge<> and string concatenation. 
type Process<Items extends string[], Result extends object = {}> =
  Items extends [infer Left extends string, ...infer Rest extends string[]]
    ? Process<Rest, Merge<Result, Map<Left>>>
    : Result

// Parse a provided query string.
type ParseQueryString<Query extends string> = Process<Split<Query, '&'>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/151/answer
  > View solutions: https://tsch.js.org/151/solutions
  > More Challenges: https://tsch.js.org
*/

