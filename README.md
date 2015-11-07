[![NPM Version](https://img.shields.io/npm/v/eslint-plugin-ramda.svg?style=flat)](https://www.npmjs.org/package/eslint-plugin-ramda)
[![Build Status](https://img.shields.io/travis/lo1tuma/eslint-plugin-ramda/master.svg?style=flat)](https://travis-ci.org/lo1tuma/eslint-plugin-ramda)
[![Dependencies](http://img.shields.io/david/lo1tuma/eslint-plugin-ramda.svg?style=flat)](https://david-dm.org/lo1tuma/eslint-plugin-ramda)
[![NPM Downloads](https://img.shields.io/npm/dm/eslint-plugin-ramda.svg?style=flat)](https://www.npmjs.org/package/eslint-plugin-ramda)

# eslint-plugin-ramda

ESLint rules for [ramda](http://ramdajs.com).

## Install and configure

`npm install --save-dev eslint-plugin-ramda`

Then add a reference to this plugin and selected rules in your eslint config:

```json
{
  "plugins": [
    "ramda"
  ],
  "rules": {
    "ramda/prefer-reject": 2
  }
}
```

See [Configuring Eslint](http://eslint.org/docs/user-guide/configuring) on [eslint.org](http://eslint.org) for more info.
