# Commandos utilizados

**_ Criando o projeto _**
create-react-app nome-do-projeto

**_ Instalando as dependências _**
yarn add eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

**_ Configurando o EditorConfig _**
Criar o arquivo .editorconfig
Configurar da seguinte maneira:

```
root = true

[*]
indent_style = space
indent_size = 4
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf

```

**_ Configurando o ESLint _**
Criar o arquivo .eslintrc.json
Configurar da seguinte maneira:

```
{
  "env": {
    "browser": true,
    "jest": true,
    "es6": true
  },
  "extends": ["react-app", "airbnb"],
  "plugins": ["import", "jsx-a11y", "react"],
  "rules": {
    "react/jsx-filename-extension": [
      "error",
      { "extensions": [".js", ".jsx"] }
    ],
    "import/prefer-default-export": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prefer-stateless-function": [
            0,
            { "ignorePureComponents": false }
        ]
  }
}
```

# Tecnologias utilizadas

> CSSINJS (styled-components)
