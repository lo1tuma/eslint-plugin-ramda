import { RuleTester } from 'eslint';
import rule from '../../../src/rules/no-deprecated-functions.js';

const ruleTester = new RuleTester();

ruleTester.run('no-deprecated-functions', rule, {
    valid: [
        'R.filter(a);',
        'R.add(1,2);',
        'R.map(R.inc, [12,3]);'
    ],

    invalid: [
        {
            code: 'R.isSet(xs)',
            errors: [
                {
                    message: 'isSet is deprecated : omit use of deprecated functions',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        }, {
            code: 'R.isSet()',
            errors: [
                {
                    message: 'isSet is deprecated : omit use of deprecated functions',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        }, {
            code: 'x = R.isSet([1,2,3])',
            errors: [
                {
                    message: 'isSet is deprecated : omit use of deprecated functions',
                    line: 1,
                    column: 5,
                    type: 'CallExpression'
                }
            ]
        }, {
            code: 'R.mapObj(f, obj)',
            errors: [
                {
                    message: 'mapObj is deprecated : omit use of deprecated functions',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        }, {
            code: 'R.containsWith(absEq, 5, [1, 2, 3]);',
            errors: [
                {
                    message: 'containsWith is deprecated : omit use of deprecated functions',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        }, {
            code: 'R.functionsIn(X);',
            errors: [
                {
                    message: 'functionsIn is deprecated : omit use of deprecated functions',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        }
    ]
});
