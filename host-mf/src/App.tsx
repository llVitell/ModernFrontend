import { Suspense } from 'react'
import ReactLogo from 'reactMF/Logo'
import VueLogo from 'vueMF/Logo'

function App() {
  return (
    <div 
      className="App" 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        justifyContent: 'center',
        alignItems: 'center', 
        gap: '2rem', 
		padding: '2rem',
		height: '90%',
		width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', border: '1px solid #61dafb', borderRadius: '10px' }}>
        <Suspense fallback={<div>Loading React component...</div>}>
          <ReactLogo />
        </Suspense>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', border: '1px solid #40b883', borderRadius: '10px' }}>
        <Suspense fallback={<div>Loading Vue component...</div>}>
          <VueLogo />
        </Suspense>
      </div>
    </div>
  );
}

export default App;