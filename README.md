# Frontend Moderno II: Optimización y Micro Frontends


Guía práctica de desarrollo frontend moderno con optimizaciones avanzadas y arquitecturas escalables.

## 🚀 Webpack/Vite y Bundle Optimization

### Webpack vs Vite
- **Webpack**: Bundler maduro, configuración compleja, ideal para proyectos grandes
- **Vite**: Build tool moderno, HMR ultra-rápido, configuración mínima

### Optimizaciones Clave

```javascript
// webpack.config.js - Optimizaciones principales
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    },
    usedExports: true,
    sideEffects: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

```javascript
// vite.config.js - Configuración optimizada
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

## ⚡ Lazy Loading & Tree Shaking

### Lazy Loading de Componentes

```jsx
// Lazy loading con React.lazy()
const HomePage = lazy(() => import('./pages/HomePage'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Suspense>
  );
}
```

### Tree Shaking Efectivo

```javascript
// ❌ Malo - importa toda la librería
import _ from 'lodash';

// ✅ Bueno - solo importa lo necesario
import { debounce } from 'lodash';

// ✅ Mejor - import específico
import debounce from 'lodash/debounce';
```

```json
// package.json - Habilitar tree shaking
{
  "sideEffects": false,
  "type": "module"
}
```

### Lazy Loading de Recursos

```javascript
// Lazy loading de imágenes
const LazyImage = ({ src, alt }) => {
  const [imageRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={imageRef}>
      {inView && <img src={src} alt={alt} loading="lazy" />}
    </div>
  );
};
```

## 🏗️ Introducción a Micro Frontends

Arquitectura que divide una aplicación frontend en múltiples aplicaciones independientes, cada una mantenida por equipos diferentes.

### Enfoques Principales

#### 1. Module Federation (Webpack 5)

```javascript
// Host App - webpack.config.js
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        mfe1: 'mfe1@http://localhost:3001/remoteEntry.js',
        mfe2: 'mfe2@http://localhost:3002/remoteEntry.js'
      }
    })
  ]
};
```

```javascript
// Micro Frontend - webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe1',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
        './UserCard': './src/UserCard'
      }
    })
  ]
};
```

#### 2. Single-SPA Framework

```javascript
// Registro de aplicaciones
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'navbar',
  app: () => import('./navbar/navbar.app.js'),
  activeWhen: ['/']
});

registerApplication({
  name: 'dashboard',
  app: () => import('./dashboard/dashboard.app.js'),
  activeWhen: ['/dashboard']
});

start();
```

### Ventajas y Desventajas

| Ventajas | Desventajas |
|----------|-------------|
| ✅ Desarrollo independiente | ❌ Complejidad de setup |
| ✅ Tecnologías heterogéneas | ❌ Overhead de red |
| ✅ Escalabilidad de equipos | ❌ Duplicación de dependencias |
| ✅ Despliegue independiente | ❌ Gestión de estado compleja |

### Estructura Recomendada

```
micro-frontends/
├── shell-app/          # Aplicación contenedora
├── header-mfe/         # Micro frontend del header
├── sidebar-mfe/        # Micro frontend del sidebar
├── dashboard-mfe/      # Micro frontend del dashboard
└── shared/             # Librerías compartidas
    ├── components/
    ├── utils/
    └── types/
```

## 📊 Métricas de Performance

### Bundle Analysis
```bash
# Webpack Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/static/js/*.js

# Vite Bundle Analyzer
npm run build -- --report
```

