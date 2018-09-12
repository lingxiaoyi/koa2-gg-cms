// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    extends: 'standard',
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    /*globals: {
        // Put things like jQuery, etc
        jQuery: true,
        $: true
    },*/
    env: {
        browser: true,
        jquery: true,
        "node": true
    },
    // required to lint *.vue files
    plugins: [],
    // add your custom rules here
    rules: {
        // allow debugger during development
        'no-debugger':/* process.env.NODE_ENV === 'production' ? 2 :*/ 0,
        'camelcase': 0,
        "dot-location": [2, "property"], // 强制使用.号取属性     .换行不报错
        'no-extra-boolean-cast': 0,
        'no-extend-native': 1,//禁止扩展native对象 警告
        'space-before-function-paren': ['error', 'never'],//函数定义时括号前面要不要有空格
        'spaced-comment': 0,//注释风格要不要有空格什么的
        //"semi": ["error", "always"],
        'semi': [2, 'never'],   //分号不出现
        'comma-dangle': [0, 'never'], //对象字面量项尾不能有逗号["error", "always"]这个是必须要逗号
        'no-console': 0, //console 未删除
        'no-var': 0,
        'no-new': 0,
        'import/no-unresolved': 0,
        'indent': [0, 4],//缩进风格
        'no-underscore-dangle': [0],
        'no-tabs': 'off', //无tab
        'prefer-template': 0,
        'object-shorthand': [0],
        'prefer-arrow-callback': 0,
        'prefer-rest-params': 0,
        'no-param-reassign': 0,
       /* 'max-len': [
            'error', {
                'code': 2000,
                'tabWidth': 4,
                'comments': 200,
                'ignoreComments': false,
                'ignoreTrailingComments': false,
                'ignoreUrls': true,
            }],*/
        'global-require': 0,
        'no-restricted-syntax': [
            2,
            'LabeledStatement',
            'WithStatement',
        ],
        'no-template-curly-in-string': 0 //config.tagMap = '${tagMap.entrySet()}' 不会报错
    },
};
/*airbnb*/
/*module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
        "es6": true
    },
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules":
        {
            "func-names": ["error", "never"],
            "linebreak-style": ["error", "windows"],
            "semi": [2, "never"],   //分号不出现
            "indent": ["error", 4], //空格
            "jsx-a11y/href-no-hash": "off",
            "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
        }
}*/

