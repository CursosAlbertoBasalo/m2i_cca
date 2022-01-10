# M2i - Clean Code Avanzado

> Taller online enero 2022

## Option 1️⃣ : Local

```terminal
git clone https://github.com/LabsAdemy/m2i_cca.git your-project-name-or-m2i_cca
cd your-project-name-or-m2i_cca
npm install
npm test
npm run test:dev
```

## Option 2️⃣ :Web

[stackblitz](https://stackblitz.com/github/LabsAdemy/m2i_cca)

## Option 3️⃣ : Translate to C# or Java ...

### 🤖 Scripts

Here you have a recap of the available scripts

```json
  "scripts": {
    "start": "node ./dist/main.js",
    "test": "jest --coverage",
    "build": "tsc -p tsconfig.json",
    "dev": "ts-node ./src/main.ts",
    "test:dev": "jest --watchAll ",
    "ts-node": "ts-node",
    "format": "prettier --write \"./**/*.{ts,json}\"",
    "lint": "eslint src --ext .ts",
    "lint:fix": "npm run lint -- --fix",
    "update": "ncu -u"
  }
```

## 🛠 VS Code

### 🧩 Extensions

Recommendations

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Prettier](https://github.com/prettier/prettier-vscode)
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

### 👽 Extra

#### 🔧 Settings and Snippets

> See User and WorkSpace configurations at `.vscode` folder as an inspiration for yours
> See also `.vscode\ts-snippets.json` to use in your TypeScript snippets for easy testing

#### ⌨ New to VS Code? Top 10 Shortcuts

- `F1` :command list
- `CTRL+P` : file
- `CTRL+T` : search code
- `CTRL+K CTRL+Z` : code comment
- `CTRL+K CTRL+U` : uncomment code
- `F12` : go to definition
- `CTRL+Ñ` : show hide terminal
- `CTRL+B`: show hide navigation bar
- `CTRL+K S` : save al files
- `ALT+up|dawn` : move line

## 👨 Created by Alberto Basalo

[@albertobasalo](https://twitter.com/albertobasalo)
