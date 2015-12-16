# Disallows the Confusing Use of `R.complement` (no-confusing-complement)

Ramda has a rich set of small and simple functions which can be easily combined with other functions in order to do more powerful things.
But sometimes Ramda already provides the same functionality you can get with combining two functions with a single function.
`R.complement` is such a function which can be avoided often by using a different Ramda function.

Example:

```js
R.filter(R.complement(a));
```

Can be written as:

```js
R.reject(a);
```

## Rule Details

This rule aims to prevent usages of `R.complement` that can be substituted by a different simpler Ramda function.

The following patterns are considered problems:

```js
R.filter(R.complement(a));

R.reject(R.complement(a));

R.complement(R.not));

R.all(R.complement(a));

R.any(R.complement(a));

R.when(R.complement(a));

R.unless(R.complement(a));
```

These patterns would not be considered problems:

```js
R.filter(a);

R.reject(a);

R.none(a);

R.when(a);

R.unless(a);

R.dropWhile(R.complement(a));
```

## Caveats

Currently the rule can only identify the use of the complement function if you write it as `R.complement`. The rule doesn’t infers the identifier `R` nor the identifier `complement`.

## Further Reading

* [`R.complement` documentation](http://ramdajs.com/docs/#complement)
