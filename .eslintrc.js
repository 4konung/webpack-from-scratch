module.exports = {
    "extends": [
        "airbnb",
        "plugin:flowtype/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/recommended"
    ],
    "plugins" : [
        "import",
        "jsx-a11y",
        "react",
        "flowtype"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": 0
    }
};
