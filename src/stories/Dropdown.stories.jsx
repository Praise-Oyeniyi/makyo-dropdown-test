import React from 'react'
import SelectComponents from '../components/SelectComponents'


export default {
    title: 'Dropdown',
    component: SelectComponents,
    argTypes: {
        options: {
            control: { type: 'array' },
            description: 'Array of options to display in the dropdown'
        },
        multiple: {
            control: { type: 'boolean' },
            description: 'Allow multiple selections'
        },
        searchable: {
            control: { type: 'boolean' },
            description: 'Enable search functionality'
        },
        highlightColor: {
            control: { type: 'color' },
            description: 'Color for highlighting search matches'
        },
        textColor: {
            control: { type: 'color' },
            description: 'Text color for the icons in the component'
        },
        borderColor: {
            control: { type: 'color' },
            description: 'Border color for the search component'
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text for the dropdown label'
        },
        usePortal: {
            control: { type: 'boolean' },
            description: 'Use portal for dropdown positioning'
        },
        zIndex: {
            control: { type: 'number' },
            description: 'Custom z-index for the dropdown'
        }
    }
}

const Template = (args) => <SelectComponents {...args} />

export const DropdownField = Template.bind({});

DropdownField.args = {
    options: [
        'option 1',
        'option 2',
        'option 3',
        'option 4',
        'option 5',
        'Long',
        'Long 25',
        'Long Long long'
    ],
    multiple:true,
    searchable:true,
    highlightColor:'#fef3c7',
    textColor:'#6b7280',
    borderColor:'#d1d5db',
    placeholder:'Label',
    usePortal: false,
    zIndex: 10000,
}