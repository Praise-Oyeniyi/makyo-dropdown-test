import React from 'react'
import { useState, useMemo, useRef } from 'react'
import { filterHighlight } from '../utilities/textHighlighter'
import { ChevronDown, XCircle } from 'lucide-react'
import SearchComponent from './Search'
import DropdownComponent from './Dropdown'

export interface SelectComponentsProps {
    options: Array<string>
    multiple: boolean
    searchable: boolean
    highlightColor: string
    textColor: string
    borderColor: string
    placeholder: string
    usePortal?: boolean
    zIndex?: number
}

const SelectComponents = ({ options, multiple, searchable, highlightColor, textColor, borderColor, placeholder, usePortal = false, zIndex}: SelectComponentsProps) => {
    const [selected, setSelected] = useState<string[]>([])
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("")
    const triggerRef = useRef<HTMLDivElement>(null)
  
    // Handle filtered and highlighted options using the textHighlighter utility
    const filteredAndHighlightedOptions = useMemo(() => 
        options && options.length > 0 ? filterHighlight({options, query, highlightColor}) : [],
    [options, query, highlightColor])
          
  // Handle select option
    const handleSelect = (option: string) => {
      if (multiple) {
          if (!selected.includes(option)) {
          setSelected([...selected, option]);
          }
      } else {
          setSelected([option]);
          setOpen(false); 
      }
    };
  
    // Handle submit form
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
  
      if (query && options.includes(query)) {
        if(multiple){
          setSelected([...selected, query]);
        } else {
          setSelected([query]);
          setOpen(false);
        }
        setQuery("");
      }
  
    }
  
    return (
      <div className='max-w-screen w-full overflow-hidden mx-auto'>
          <form onSubmit={(e)=>{onSubmit(e)}} className='w-5/6 mx-auto'>
            <div className='w-full space-y-2'>
              <div className='w-full flex gap-x-10 justify-between items-center'>
                <label htmlFor="select" className='text-sm font-medium w-1/6'>{placeholder + ":"}</label>
  
                <div ref={triggerRef} id="select" className="min-w-5/6 w-5/6 relative border rounded-sm h-10 px-2 focus:outline-none flex gap-x-2 justify-start items-center overflow-x-auto scrollbar-hide" style={{ borderColor }} onClick={()=>setOpen(!open)}>
                  {selected.length > 0 && selected.map((selectedItem, index) => (
                  <div key={index} className="flex items-center gap-x-2 rounded-full px-2 bg-gray-100 cursor-pointer flex-nowrap min-w-fit" style={{ color: textColor }}>
                    <button className='text-base font-medium'>{selectedItem}</button>
                    <XCircle className="search-icons size-4" style={{ color: textColor }} onClick={()=>setSelected(selected.filter(item => item !== selectedItem))}/>
                  </div>))}
                
                <ChevronDown className={`size-4 cursor-pointer z-20 bg-white rounded-full absolute right-3 top-1/2 -translate-y-1/2 animate-prop ${open ? 'rotate-180' : ''}`} style={{ color: textColor }} onClick={()=>setOpen(!open)}/>  
                </div>               
              </div>
  
              {/* If usePortal is false, show the dropdown component inside the form*/}
              {!usePortal && (
                <div className={`w-5/6 ml-auto ${open ? 'block' : 'hidden'}`}>
                  <div className='w-full z-[99999]'>
                    {searchable && <SearchComponent query={query} setQuery={setQuery} borderColor={borderColor} />}
                    <DropdownComponent 
                      filteredAndHighlightedOptions={filteredAndHighlightedOptions} 
                      handleSelect={handleSelect} 
                      multiple={multiple}
                      usePortal={usePortal}
                      triggerRef={triggerRef}
                      zIndex={zIndex}
                    />
                  </div>
                </div>
              )}
              
              {/* If usePortal is true; floating dropdown component */}
              {usePortal && open && (
                <DropdownComponent 
                  filteredAndHighlightedOptions={filteredAndHighlightedOptions} 
                  handleSelect={handleSelect} 
                  multiple={multiple}
                  usePortal={usePortal}
                  triggerRef={triggerRef}
                  zIndex={zIndex}
                  searchable={searchable}
                  query={query}
                  setQuery={setQuery}
                  borderColor={borderColor}
                />
              )}
  
              
  
            </div>
            
          </form>
      </div>
  )
}

export default SelectComponents