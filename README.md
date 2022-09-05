# Simple functional programming utility & programming helper tools

[![Download Status](https://img.shields.io/npm/dw/my-easy-fp.svg)](https://npmcharts.com/compare/my-easy-fp?minimal=true) [![Github Star](https://img.shields.io/github/stars/imjuni/my-easy-fp.svg?style=popout)](https://github.com/imjuni/my-easy-fp) [![Github Issues](https://img.shields.io/github/issues-raw/imjuni/my-easy-fp.svg)](https://github.com/imjuni/my-easy-fp/issues) [![NPM version](https://img.shields.io/npm/v/my-easy-fp.svg)](https://www.npmjs.com/package/my-easy-fp) [![License](https://img.shields.io/npm/l/my-easy-fp.svg)](https://github.com/imjuni/my-easy-fp/blob/master/LICENSE)

Simple utility functions that can use browser, node.

## Function list

### boolean

| name    | description                    |
| ------- | ------------------------------ |
| isFalse | If argument false, return true |
| isTrue  | If argument true, return true  |
| invert  | return inverted boolean value  |

### array

| name     | description                                                                       |
| -------- | --------------------------------------------------------------------------------- |
| populate | populate array zero base, if you pass second argument true that populate one base |
| chunk    | array split given size                                                            |
| last     | pick last element from array                                                      |
| first    | pick first element from array                                                     |
| toArray  | make array given argument                                                         |
| settify  | make it set and convert it back to array                                          |

### empty

| name              | description                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| isUndefined       | if argument undefiend, return true                                                                    |
| isNotUndefined    | if argument not undefined, return true                                                                |
| isNull            | if argument null, return true                                                                         |
| isNotNull         | if argument not null, return true                                                                     |
| isNotEmpty        | if argument not null and undefined, return true                                                       |
| isEmpty           | if argument null or undefined, return true                                                            |
| isComplexEmpty    | if argument not undefined and null, do additional test isNaN, empty string, empty array, empty object |
| isNotComplexEmpty | return inverted value isComplexEmpty                                                                  |

### misc

| name              | description                                           |
| ----------------- | ----------------------------------------------------- |
| typedkey          | same work Object.keys, but typed key in Recoed        |
| getRandomRange    | return random value in min and max                    |
| getRandomRangeInt | return random integer value in min and max            |
| isError           | if argument is Error return Error or return undefined |

### sleep

| name  | description             |
| ----- | ----------------------- |
| sleep | sleep given millisecond |

### Custom Utility Types

| name               | description                            |
| ------------------ | -------------------------------------- |
| TResolvePromise    | get type resolved promise              |
| TResolveArray      | get type resolve array                 |
| TNullablePick      | convert specific field to nullable     |
| TNonNullableObject | object type each field to non nullable |
| TNonNullablePick   | convert specific field to non nullable |

## False & True checker

Why need this utility?

```ts
import { isFalse } from 'my-easy-fp';

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

## Empty checker

Why need this utility?

```ts
const iamempty?: string | null = undefined;

// this line some boring task
if (iamempty === undefined || iamempty === null || iamempty !== '') {
  console.log('i am empty');
}

// more than better!
if (isComplexEmpty(iamempty)) {
  console.log('i am empty');
}
```

You need only `undefined` and `null` check, use double equal operator.

```ts
const iamempty?: string | null = undefined;

// Recently ESLint allow double equal for null check
// see https://eslint.org/docs/latest/rules/eqeqeq#allow-null
if (iamempty == null) {
  console.log('i am empty');
}
```

## Sleep

Why need this utility?

```ts
const ms = 1000;

// this line some boring task
await new Promise((resolve) => setTimeout(() => resolve(), ms));

// more than better!
await sleep(ms);
```

## Array

populate, chunk utility here.

```ts
// seq is [0,1,2,3,4,5,6,7,8,9]
const seq = populate(10);

// seq is [1,2,3,4,5,6,7,8,9,10]
const seq = populate(10, true);

// chunked is [[1,2],[3,4],[5,6],[7]]
const chunked = chunk([1, 2, 3, 4, 5, 6, 7], 2);

// settify is [ 1, 2, 3, 4 ]
const settified = settify([1, 1, 2, 3, 2, 3, 4]);

// zeroIndex is 1
const zeroIndex = atOrThrow([1, 2, 3], 0);
```

## Type Helper

resolve promise, array. But you can use [type-fest](https://github.com/sindresorhus/type-fest) or [ts-essentials](https://github.com/ts-essentials/ts-essentials). Recommand use type-fest and tsessentials.

```ts
// you can get string | Buffer type
type TResolvedPromiseType = TResolvePromise<ReturnType<typeof fs.promises.readFile>>;

// you can get number type
type TResolvedArrayType = TResolveArray<number[]>;

interface IStudent {
  name: string;
  major: string;
  grade: number;
}

// you can get { name?: string; major?: string; grade: number; }
// converted Omit<IStudent, 'name' | 'major'> & Pick<Partial<IStudent>, 'name' | 'major'>
type TCliArgumentStudent = TNullablePick<IStudent, 'name' | 'major'>;
```
