import './App.css'
import SelectComponents from './components/SelectComponents'

function App() {
  return (
    <SelectComponents options={['Option 1', 'Option 2', 'Option 3']} multiple={false} searchable={true} highlightColor='blue' textColor='black' borderColor='gray' placeholder='Select an option' />
  )
}

export default App





  