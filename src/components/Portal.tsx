import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Portal: React.FC<PortalProps> = ({ children, style, className }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create portal container
    const portalContainer = document.createElement('div');
    portalContainer.style.position = 'fixed';
    portalContainer.style.top = '0';
    portalContainer.style.left = '0';
    portalContainer.style.width = '100%';
    portalContainer.style.height = '100%';
    portalContainer.style.pointerEvents = 'none';
    portalContainer.style.zIndex = '9999';
    
    if (className) {
      portalContainer.className = className;
    }
    
    if (style) {
      Object.assign(portalContainer.style, style);
    }

    document.body.appendChild(portalContainer);
    setContainer(portalContainer);

    return () => {
      if (portalContainer && document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [style, className]);

  if (!container) return null;

  return createPortal(
    <div style={{ pointerEvents: 'auto' }}>
      {children}
    </div>,
    container
  );
};

export default Portal;