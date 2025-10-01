import React, { useEffect, useRef, useState } from 'react'
import Portal from './Portal'
import ZIndexManager from '../utilities/zIndexManager'
import SearchComponent from './Search'

export interface DropdownComponentProps {
  filteredAndHighlightedOptions: { option: string; highlighted: string | (string | React.ReactElement)[] }[]
  multiple: boolean;
  handleSelect: (option: string) => void;
  usePortal?: boolean;
  triggerRef?: React.RefObject<HTMLElement | null>;
  zIndex?: number;
  searchable?: boolean;
  query?: string;
  setQuery?: (query: string) => void;
  borderColor?: string;
}

const DropdownComponent = ({ 
  filteredAndHighlightedOptions, 
  handleSelect, 
  multiple, 
  usePortal = false,
  triggerRef,
  zIndex,
  searchable = false,
  query = "",
  setQuery,
  borderColor = "#d1d5db"
}: DropdownComponentProps) => {
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [dynamicZIndex, setDynamicZIndex] = useState<number>(zIndex || 10000);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (usePortal && triggerRef?.current) {
      // Get smart z-index
      const zIndexManager = ZIndexManager.getInstance();
      const newZIndex = zIndex || zIndexManager.getZIndexForType('dropdown');
      setDynamicZIndex(newZIndex);

      // Calculate position
      const updatePosition = () => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width
          });
        }
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
        if (!zIndex) {
          zIndexManager.releaseZIndex(newZIndex);
        }
      };
    }
  }, [usePortal, triggerRef, zIndex]);

  const dropdownContent = (
    <div 
      ref={dropdownRef}
      className='w-full max-h-[400px] overflow-y-auto scrollbar-hide mb-10 shadow-lg bg-white border border-gray-300 rounded-sm'
      style={usePortal ? { zIndex: dynamicZIndex } : {}}
    >
      {searchable && setQuery && (
        <SearchComponent query={query} setQuery={setQuery} borderColor={borderColor} />
      )}
      <ul className='w-full text-left'>
        <li className='dropdown-items cursor-default select-none'>Please select {!multiple ? 'an option' : 'your options'}</li>
        {filteredAndHighlightedOptions && filteredAndHighlightedOptions.length > 0 ? filteredAndHighlightedOptions.map(({option, highlighted}, index)=>(
          <li  
            key={index}
            className={`dropdown-items hover:bg-green-100 animate-prop ${index === 0 ? 'bg-green-100' : 'transparent'}`}
            onClick={()=>handleSelect(option)}
          >
            {highlighted}
          </li>
        ))
        :
        <li className="dropdown-items cursor-default select-none">
          No options found
        </li>
        }
      </ul>
    </div>
  );

  if (usePortal && position) {
    return (
      <Portal
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          width: position.width,
          zIndex: dynamicZIndex
        }}
      >
        {dropdownContent}
      </Portal>
    );
  }

  return dropdownContent;
}

export default DropdownComponent