import R from 'ramda';

const getPropertyName = R.pipe(R.prop('property'), R.either(R.prop('name'), R.prop('value')));

const isOneRamdaMethodOf = R.curry((list, callee) =>
    callee.type === 'MemberExpression' && callee.object.name === 'R' && R.contains(getPropertyName(callee), list)
);

const deprecatedFunctions = [
    'isSet',
    'mapObj',
    'containsWith',
    'createMapEntry',
    'functions',
    'functionsIn'
];

export default function (context) {
    return {
        CallExpression(node) {
            if (isOneRamdaMethodOf(deprecatedFunctions, node.callee)) {
                context.report({
                    node,
                    message: `${getPropertyName(node.callee)} is deprecated : omit use of deprecated functions`
                });
            }
        }
    };
}
