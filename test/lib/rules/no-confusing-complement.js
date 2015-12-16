import { RuleTester } from 'eslint';
import rule from '../../../src/rules/no-confusing-complement';

const ruleTester = new RuleTester();

ruleTester.run('no-confusing-complement', rule, {
    valid: [
        'R.filter(a);',
        'R.reject(a);',
        'filter(a);',
        'reject(a);',
        'R.complement(a);',
        'R.complement(R.equals(1));',
        'R.complement();',
        'complement(a);',
        'P.filter(R.complement(a));',
        'R.find(R.complement(a));',
        'R.filter(f(a));',
        'R.reject(f(a));',
        'R.filter(P.complement(a));',
        'R.reject(P.complement(a));',
        'R.filter(complement(a));',
        'R.reject(f(g(h(a))));'
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
        },
        {
            code: 'R.reject(R.complement(a));',
            errors: [
                {
                    message: 'R.reject used with negated predicate: Use R.filter instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        },
        {
            code: 'R.all(R.complement(a));',
            errors: [
                {
                    message: 'R.all used with negated predicate: Use R.none instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        },
        {
            code: 'R.any(R.complement(a));',
            errors: [
                {
                    message: 'R.any used with negated predicate: Use R.none instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        },
        {
            code: 'R.when(R.complement(a));',
            errors: [
                {
                    message: 'R.when used with negated predicate: Use R.unless instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        },
        {
            code: 'R.unless(R.complement(a));',
            errors: [
                {
                    message: 'R.unless used with negated predicate: Use R.when instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        },
        {
            code: 'R.complement(R.not);',
            errors: [
                {
                    message: 'R.not wrapped with R.complement: Use Boolean instead.',
                    line: 1,
                    column: 1,
                    type: 'CallExpression'
                }
            ]
        }
    ]
});
