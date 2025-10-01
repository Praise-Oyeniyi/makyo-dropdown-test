# Makyo Dropdown Test

A dropdown component built with React and TypeScript. P

## Features

- Fuzzy search with text highlighting
- Customizable  colors and appearance
- Portal Support- Floating dropdowns that escape container boundaries
- Smart layering for complex UIs
- Only requires React and Lucide React icons

## Installation
### For Create React App Projects

```bash
npm install makyo-dropdown-test
# or
yarn add makyo-dropdown-test
```

### Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom lucide-react
# or
yarn add react react-dom lucide-react
```

## Quick Start

### Basic Usage


import React from 'react';
import SelectComponents from 'makyo-dropdown-test';

function App() {
  const options = [
    'Option 1',
    'Option 2', 
    'Option 3',
    'Long Option Name',
    'Another Option'
  ];

  return (
    <div className="App">
      <SelectComponents
        options={options}
        multiple={true}
        searchable={true}
        placeholder="Select Options"
        highlightColor="#fef3c7"
        textColor="#6b7280"
        borderColor="#d1d5db"
      />
    </div>
  );
}

export default App;

import React from 'react';
import SelectComponents from 'makyo-dropdown-test';

function App() {
  const options = [
    'Option 1',
    'Option 2', 
    'Option 3',
    'Long Option Name',
    'Another Option'
  ];

  return (
    <div className="App">
      <SelectComponents
        options={options}
        multiple={true}
        searchable={true}
        placeholder="Floating Dropdown"
        highlightColor="#fef3c7"
        textColor="#6b7280"
        borderColor="#d1d5db"
        usePortal={true}
        zIndex={15000}
      />
    </div>
  );
}

export default App;
```



## Styling

### CSS Classes

The component uses the following CSS classes that you can customize:

```css
/* Search icons */
.search-icons {
  @apply size-4 cursor-pointer;
}

/* Dropdown items */
.dropdown-items {
  @apply h-8 px-3 flex justify-start items-center w-full text-sm;
}

/* Animations */
.animate-prop {
  @apply transition-all duration-300 ease-in-out;
}

/* Scrollbar hiding */
.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
```

### Custom Styling

You can override the default styles by targeting the component's classes:

```css
/* Custom dropdown styling */
.makyo-dropdown-test .dropdown-items {
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: 2px 0;
}

.makyo-dropdown-test .dropdown-items:hover {
  background-color: #e9ecef;
}

/* Custom search styling */
.makyo-dropdown-test .search-icons {
  color: #007bff;
}
```

