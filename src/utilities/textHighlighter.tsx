import React from 'react';

export interface TextHighlighterProps {
  options: string[];
  query: string;
  highlightColor?: string;
}

export function filterHighlight({options, query, highlightColor}: TextHighlighterProps){
  if (!query) return options.map(option => ({ option, highlighted: option }));
    
    const normalizedQuery = query.toLowerCase().replace(/\s+/g, '');
    
    return options
      .map(option => {
        const normalizedOption = option.toLowerCase().replace(/\s+/g, '');
        
        // Check if option matches
        const directMatch = option.toLowerCase().includes(query.toLowerCase());
        
        let queryIndex = 0;
        for (let i = 0; i < normalizedOption.length && queryIndex < normalizedQuery.length; i++) {
          if (normalizedOption[i] === normalizedQuery[queryIndex]) {
            queryIndex++;
          }
        }
        const sequentialMatch = queryIndex === normalizedQuery.length;
        
        if (directMatch || sequentialMatch) {
          // Find matching positions for highlighting
          const matchedPositions: number[] = [];
          queryIndex = 0;
          for (let i = 0; i < normalizedOption.length && queryIndex < normalizedQuery.length; i++) {
            if (normalizedOption[i] === normalizedQuery[queryIndex]) {
              matchedPositions.push(i);
              queryIndex++;
            }
          }
          
          // Build highlighted text
          const parts: (string | React.ReactElement)[] = [];
          let currentIndex = 0;
          for (const pos of matchedPositions) {
            if (currentIndex < pos) {
              parts.push(option.slice(currentIndex, pos));
            }
            parts.push(
              <mark key={`highlight-${pos}`} style={{ backgroundColor: highlightColor }}>
                {option.slice(pos, pos + 1)}
              </mark>
            );
            currentIndex = pos + 1;
          }
          if (currentIndex < option.length) {
            parts.push(option.slice(currentIndex));
          }
          
          return { option, highlighted: parts };
        }
        return null;
      })
      .filter(Boolean) as { option: string; highlighted: string | (string | React.ReactElement)[] }[];
}