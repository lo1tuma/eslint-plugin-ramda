import R from 'ramda-t';

const confusingCombinations = [
    {
        method: 'filter',
        replacement: 'reject'
    },
    {
        method: 'reject',
        replacement: 'filter'
    },
    {
        method: 'all',
        replacement: 'none'
    },
    {
        method: 'any',
        replacement: 'none'
    },
    {
        method: 'when',
        replacement: 'unless'
    },
    {
        method: 'unless',
        replacement: 'when'
    }




];

const getPropertyName = R.pipe(R.prop('property'), R.either(R.prop('name'), R.prop('value')));

const isRamdaMethod = R.curry((methodName, memberExpression) =>
    memberExpression.type === 'MemberExpression' && memberExpression.object.name === 'R' && getPropertyName(memberExpression) === methodName
);

const isCallExpression = R.propEq('type', 'CallExpression');

const findConfusingComplementUse = (callExpr) => {
    return R.find((combination) => {
        const isConfusingComplementMethod = R.propSatisfies(isRamdaMethod(combination.method), 'callee');
        return R.allPass([ isCallExpression, isConfusingComplementMethod ])(callExpr);
    }, confusingCombinations);
}

export default function (context) {
    return {
        CallExpression(node) {
            if (isRamdaMethod('complement', node.callee)) {
                const combination = findConfusingComplementUse(node.parent);
                const [ firstArgument ] = node.arguments;

                if (combination) {
                    context.report({
                        node: node.parent,
                        message: `R.${combination.method} used with negated predicate: Use R.${combination.replacement} instead.`
                    });
                } else if (firstArgument && isRamdaMethod('not', firstArgument)) {
                    context.report({
                        node,
                        message: 'R.not wrapped with R.complement: Use Boolean instead.'
                    });
                }
            }
        }
    };
}
