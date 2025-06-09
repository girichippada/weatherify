# Weather App Monorepo (React + Vite + Express + Turbo + pnpm)

This monorepo contains a full-stack weather application with a React frontend (Vite, TypeScript) and an Express API backend (TypeScript). It uses TurboRepo for monorepo orchestration and pnpm for fast, reliable package management.

---

## Prerequisites

- **nvm** (Node Version Manager)
  - [nvm for Windows](https://github.com/coreybutler/nvm-windows)
  - [nvm for Mac/Linux](https://github.com/nvm-sh/nvm)
- **Node.js** (Latest LTS recommended, e.g. 22.x)
- **pnpm** ([Install guide](https://pnpm.io/installation))
- **TurboRepo** (installed automatically as a devDependency)

---

## Setup Instructions

### 1. Install Node.js (using nvm recommended)

#### Windows
```powershell
nvm install 22
nvm use 22
```
#### Mac/Linux
```bash
nvm install 22
nvm use 22
```

### 2. Install pnpm (if not already installed)
```bash
npm install -g pnpm
```

### 3. Install dependencies (from project root)
```bash
pnpm install
```

---

## Development

### Start both frontend and backend (in separate terminals):

#### API Backend
```bash
pnpm -F api dev
```
Runs the Express API server on http://localhost:4000

#### Web Frontend
```bash
pnpm -F web dev
```
Runs the React app on http://localhost:5173

---

## Build

To build all apps/packages:
```bash
pnpm run build
```

---

## Testing

Run all tests:
```bash
pnpm run test
```
Or run tests for a specific workspace:
```bash
pnpm -F web test
pnpm -F api test
```

---

## TurboRepo

- TurboRepo is used for orchestrating builds, tests, and linting across the monorepo.
- You can run any script with Turbo using:
  ```bash
  pnpm run <script>
  ```
  or filter to a specific workspace:
  ```bash
  pnpm -F <workspace> <script>
  ```

---

## Project Structure

- `apps/web` - React + Vite frontend
- `apps/api` - Express API backend
- `packages/shared-types` - Shared TypeScript types

---

## Notes
- Make sure ports 4000 (API) and 5173 (web) are free.
- For Windows, use PowerShell or Command Prompt. For Mac/Linux, use your preferred shell.
- If you encounter type errors with Express, ensure you are using @types/express@4.x (not 5.x).
- For any issues, delete `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again.

---

## Useful Links
- [pnpm documentation](https://pnpm.io/)
- [TurboRepo documentation](https://turbo.build/)
- [Vite documentation](https://vitejs.dev/)
- [Express documentation](https://expressjs.com/)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
