import { RuleTester } from 'eslint';
import rule from '../../../src/rules/prefer-reject.js';

const ruleTester = new RuleTester();

ruleTester.run('prefer-reject', rule, {
    valid: [
        'R.filter(a);',
        'filter(a);',
        'R.complement(a);',
        'complement(a);',
        'P.filter(R.complement(a));',
        'R.find(R.complement(a));',
        'R.filter(f(a));',
        'R.filter(P.complement(a));',
        'R.filter(complement(a));'
    ],

    invalid: [
        {
            code: 'R.filter(R.complement(a));',
            errors: [
                {
                    message: 'R.filter used with negated predicate: Use R.reject instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        },
        {
            code: 'R.filter(R.complement(a), [1,2,3]);',
            errors: [
                {
                    message: 'R.filter used with negated predicate: Use R.reject instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        },
        {
            code: 'R["filter"](R.complement(a));',
            errors: [
                {
                    message: 'R.filter used with negated predicate: Use R.reject instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        },
        {
            code: 'R.filter(R["complement"](a));',
            errors: [
                {
                    message: 'R.filter used with negated predicate: Use R.reject instead.',
                    type: 'CallExpression'
                }
            ]
        }
    ]
});
