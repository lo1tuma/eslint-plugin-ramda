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
    "ramda/prefer-reject" 2
  }
}
```

See [Configuring Eslint](http://eslint.org/docs/user-guide/configuring) on [eslint.org](http://eslint.org) for more info.
