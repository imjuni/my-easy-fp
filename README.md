Simple functional programming utility & programming helper tools
----

# Either
Either utility class and function

## Why epass & efail?
jest already use a fail function. So if you use jest, ts-jest fail function is don't cause compile-time error.

## Example

```ts
import { Either, epass, efail, isPass } from 'my-easy-fp';

function hello(greeting: string): Either<string, Error> {
  try {
    if (greeting === 'hi') {
      throw new Error('invalid greeting');
    }

    return epass('hello');
  } catch (err) {
    return efail(err);
  }
}

const greet = hello('hi');

if (isPass(greet)) {
  console.log(greet.pass, 'world');
} else {
  console.log(greet.fail, 'want hello');
}
```

# Empty check
Why need this utility?

```ts
import { isFalse } from 'my-easy-fp'

const iamboolean = false;

// this line easily miss in refactoring or changing
if (!iamboolean) {
  console.log('I am execute false-case');
}

// more than better!
if (isFalse(iamboolean)) {
  console.log('I am execute false-case');
}
```
