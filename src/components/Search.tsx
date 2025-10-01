import { Search} from 'lucide-react'

export interface SearchComponentProps {
  query: string
  setQuery: (query: string) => void
  borderColor: string
}

const SearchComponent = ({query, setQuery, borderColor}: SearchComponentProps) => {
  return (
    <div className="w-full border rounded-sm h-10 px-3 flex items-center gap-x-2" style={{ borderColor }}>
        <Search className='search-icons'
        />
        <input value={query}
            onChange={e => setQuery(e.target.value)} 
            type="search" 
            className='w-full h-full focus:outline-none ' 
        />
    </div>
  )
}

export default SearchComponent