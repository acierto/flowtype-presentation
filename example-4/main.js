/* @flow */
let tuple: [string, number, boolean] = ["foo", 0, true];

// Indexing into the array will return the type at a given index.
(tuple[0]: string);
(tuple[1]: string);

// Indexing into an statically unknown index will return a general type.
declare var unknownNumber: number;

// `void` is none of `string`, `number`, or `boolean`
(tuple[unknownNumber]: void);
(tuple[unknownNumber]: string|number|boolean); // OK

// Values written must be compatible with the type at that index.
tuple[1] = -1;
tuple[0] = 'fla';