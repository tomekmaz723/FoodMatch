import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

const siteId = Number(import.meta.env.VITE_HOTJAR_SITE_ID);
const hotjarVersion = Number(import.meta.env.VITE_HOTJAR_VERSION || 6);

let isInitialized = false;

function HotjarInitializer() {
  useEffect(() => {
    if (!siteId || isInitialized) return;

    Hotjar.init(siteId, hotjarVersion);
    isInitialized = true;
  }, []);

  return null;
}

export default HotjarInitializer;
