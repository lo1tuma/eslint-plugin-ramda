'use strict';

var R = require('ramda');

var getPropertyName = R.pipe(R.prop('property'), R.either(R.prop('name'), R.prop('value')));

var isRamdaMethod = R.curry(function (methodName, callee) {
    return callee.type === 'MemberExpression' && callee.object.name === 'R' && getPropertyName(callee) === methodName;
});

var isRamdaFilterCall = R.propSatisfies(isRamdaMethod('filter'), 'callee');
var isCallExpression = R.propEq('type', 'CallExpression');
var isRamdaFilterCallExpression = R.allPass([ isCallExpression, isRamdaFilterCall ]);

module.exports = function (context) {
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
