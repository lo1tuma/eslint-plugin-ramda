import R from 'ramda';

const getPropertyName = R.pipe(R.prop('property'), R.either(R.prop('name'), R.prop('value')));

const isRamdaMethod = R.curry((methodName, callee) =>
    callee.type === 'MemberExpression' && callee.object.name === 'R' && getPropertyName(callee) === methodName
);

const isRamdaFilterCall = R.propSatisfies(isRamdaMethod('filter'), 'callee');
const isCallExpression = R.propEq('type', 'CallExpression');
const isRamdaFilterCallExpression = R.allPass([ isCallExpression, isRamdaFilterCall ]);

export default function (context) {
    return {
        CallExpression: function (node) {
            if (isRamdaMethod('complement', node.callee) && isRamdaFilterCallExpression(node.parent)) {
                    context.report({
                        node: node.parent,
                        message: 'R.filter used with negated predicate: Use R.reject instead.'
                    });
            }
        } 
    };
};
