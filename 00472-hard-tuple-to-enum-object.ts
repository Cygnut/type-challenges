/*
  472 - Tuple to Enum Object
  -------
  by Ryo Hanafusa (@softoika) #hard #tuple #template-literal
  
  ### Question
  
  The enum is an original syntax of TypeScript (it does not exist in JavaScript). So it is converted to like the following form as a result of transpilation:
  ```js
  let OperatingSystem;
  (function (OperatingSystem) {
      OperatingSystem[OperatingSystem["MacOS"] = 0] = "MacOS";
      OperatingSystem[OperatingSystem["Windows"] = 1] = "Windows";
      OperatingSystem[OperatingSystem["Linux"] = 2] = "Linux";
  })(OperatingSystem || (OperatingSystem = {}));
  ```
  In this question, the type should convert a given string tuple to an object that behaves like an enum.
  Moreover, the property of an enum is preferably a pascal case.
  ```ts
  Enum<["macOS", "Windows", "Linux"]>
  // -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
  ```
  If `true` is given in the second argument, the value should be a number literal.
  ```ts
  Enum<["macOS", "Windows", "Linux"], true>
  // -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
  ```
  
  > View on GitHub: https://tsch.js.org/472
*/


/* _____________ Your Code Here _____________ */

// We need to do a bit of work over the next few types to be able to increment a literal number,
// so in the case that `N extends true`, that we have the index of the enum element to emit.

type ToArray<N extends number, _Result extends any[] = []> = 
  _Result extends { length: N }
    ? _Result
    : ToArray<N, [..._Result, any]>

// Add together two whole numbers, i.e. both >= 0
type Add<A extends number, B extends number> = 
  [...ToArray<A>, ...ToArray<B>] extends infer T
    ? T extends any[]
      ? T['length']
      : never
    : never

// Convert an enum array element to an interface with the required format - e.g. 'macOs' to
// { MacOS: 'macOS' }. Note that we don't bother with the readonly part as that'll get lost
// in the merge, so we just apply Readonly<> at the end.
type Convert<String extends string, Value extends any> = {
  [P in String as Capitalize<String>]: Value
}

// Map each enum array element to the object format required, carrying along the array index
// so that we can emit that instead of the string value when `N extends true`.
type Map<
  Array extends readonly string[], 
  N extends boolean = false, 
  _Result extends object[] = [], 
  _Index extends number = 0
> = 
  Array extends readonly [infer First extends string, ...infer Rest extends readonly string[]]
    ? Map<
        Rest, 
        N,
        [..._Result, Convert<First, N extends true ? _Index : First>], 
        Add<_Index, 1>
      >
    : _Result

// Reduce all mapped enum array values to the final object required.
type Reduce<Array extends object[], _Result extends object = {}> = 
  Array extends [infer First extends object, ...infer Rest extends object[]]
    ? Reduce<Rest, _Result & First>
    : _Result

// Ensure we apply Readonly<> at the end here to match the required object.
type Enum<T extends readonly string[], N extends boolean = false> 
  = Readonly<Reduce<Map<T, N>>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
  Enum<typeof OperatingSystem>,
  {
    readonly MacOS: 'macOS'
    readonly Windows: 'Windows'
    readonly Linux: 'Linux'
  }
  >>,
  Expect<Equal<
  Enum<typeof OperatingSystem, true>,
  {
    readonly MacOS: 0
    readonly Windows: 1
    readonly Linux: 2
  }
  >>,
  Expect<Equal<
  Enum<typeof Command>,
  {
    readonly Echo: 'echo'
    readonly Grep: 'grep'
    readonly Sed: 'sed'
    readonly Awk: 'awk'
    readonly Cut: 'cut'
    readonly Uniq: 'uniq'
    readonly Head: 'head'
    readonly Tail: 'tail'
    readonly Xargs: 'xargs'
    readonly Shift: 'shift'
  }
  >>,
  Expect<Equal<
  Enum<typeof Command, true>,
  {
    readonly Echo: 0
    readonly Grep: 1
    readonly Sed: 2
    readonly Awk: 3
    readonly Cut: 4
    readonly Uniq: 5
    readonly Head: 6
    readonly Tail: 7
    readonly Xargs: 8
    readonly Shift: 9
  }
  >>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/472/answer
  > View solutions: https://tsch.js.org/472/solutions
  > More Challenges: https://tsch.js.org
*/

