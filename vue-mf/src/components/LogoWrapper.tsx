import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import Logo from './Logo.vue';

const LogoWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vueAppRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !vueAppRef.current) {
      vueAppRef.current = createApp(Logo);
      vueAppRef.current.mount(containerRef.current as HTMLElement);
    }

    return () => {
      if (vueAppRef.current) {
        vueAppRef.current.unmount();
        vueAppRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}></div>;
};

export default LogoWrapper;