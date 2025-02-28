# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules with the Esri ArcGIS Maps SDK for JavaScript and Vite.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh

### Start using Node Version Manager (NVM) to manage Node Package Manager (npm) versions.
Install nvm either for Windows, Mac, or Linux and then run these commands:
```bash
nvm install 18
nvm use 18
```

### 1. Install Dependencies for Vite with React

Install vite with the react typescript template:
```bash
npm create vite@latest my-arcgis-app --template react-ts
cd my-arcgis-app
```

Install the ArcGIS Core package:
```bash
npm install @arcgis/core
```

### 2. Configure `vite.config.ts` for ArcGIS Compatibility
Modify vite.config.ts in the root folder:
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}, // Required for ArcGIS API compatibility
  },
});
```

### 3. Update tsconfig.json for ArcGIS
Modify tsconfig.json to add:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "ESNext",
    "esModuleInterop": true
  }
}
```

### 4. Create a Basic ArcGIS Webmap Component
```tsx
import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

const MapComponent: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webMap = new WebMap({
        portalItem: {
          id: "e691172598f04ea8881cd2a4adaa45ba", // Sample ArcGIS Online WebMap ID
        },
      });

      new MapView({
        container: mapDiv.current,
        map: webMap,
      });
    }
  }, []);

  return <div style={{ width: "100%", height: "500px" }} ref={mapDiv}></div>;
};

export default MapComponent;
```

### 5. Use the Component in `App.tsx`
Modify `src/App.tsx`:
```tsx
import React from "react";
import MapComponent from "./MapComponent";

function App() {
  return (
    <div>
      <h1>ArcGIS + React + Vite</h1>
      <MapComponent />
    </div>
  );
}

export default App;
```

### 5. Start the Dev Server
Run the following command to start the project:
```bash
npm run dev
```

### 6. Open the Webmap Locally
Navigate to your preferred browser and open `http://localhost:<port #>`

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
