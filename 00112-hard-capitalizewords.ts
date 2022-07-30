/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal
  
  ### Question
  
  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.
  
  For example
  
  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```
  
  > View on GitHub: https://tsch.js.org/112
*/


/* _____________ Your Code Here _____________ */

// To start with, we want a union of all alphabetical characters - you could just type this out, haha!
type Split<String extends string, Separator extends string, Array extends string[] = []> = 
  String extends `${infer Left}${Separator}${infer Rest}`
   ? Split<Rest, Separator, [...Array, Left]>
   : Separator extends ''
     ? Array
     : [...Array, String]

type Alphabet = 'abcdefghijklmnopqrstuvwxyz'
type AlphabetUnion = Split<Alphabet | Uppercase<Alphabet>, ''>[number]

// This gives us the type we want - one that can determine if a given string is a alphabetical character.
type IsAlphabetical<S extends string> = S extends AlphabetUnion ? true : false

// These boolean types are useful, but not 100% necessary
type And<A extends boolean, B extends boolean> = 
  A extends true 
    ? B extends true 
      ? true 
      : false 
    : false

type Not<A extends boolean> = A extends true ? false : true

// The idea here is to walk through the string, mapping character by character through the string into Result - deciding
// if we need to Uppercase<> it or not.
//   We track our position (well, just the necessary contextual positional information) in AfterNonAlphabetical, initialising
// it to true so we always capitalize the first character if it's alphabetical.
//   We then just need to capitalize if we're at the first alphabetical character after a non-alphabetical one - otherwise
// just leave it as-is.
type CapitalizeWords<S extends string, Result extends string = '', AfterNonAlphabetical extends boolean = true> = 
  S extends `${infer First}${infer Rest}`
    ? CapitalizeWords<
        Rest,
        And<IsAlphabetical<First>, AfterNonAlphabetical> extends true 
          ? `${Result}${Uppercase<First>}` 
          : `${Result}${First}`, 
        Not<IsAlphabetical<First>>
      >
    : Result

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
