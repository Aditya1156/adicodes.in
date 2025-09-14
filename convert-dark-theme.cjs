const fs = require('fs');
const path = require('path');

// Common dark theme class replacements
const replacements = [
  // Additional specific patterns that were missed
  { from: /text-gray-700 dark:text-gray-300/g, to: 'text-gray-300' },
  { from: /bg-gray-300 dark:bg-gray-600/g, to: 'bg-gray-600' },
  { from: /hover:text-gray-700 dark:hover:text-gray-300/g, to: 'hover:text-gray-300' },
  { from: /bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900\/50 dark:to-purple-900\/50/g, to: 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50' },
  { from: /from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400/g, to: 'from-indigo-400 via-purple-400 to-pink-400' },
  { from: /bg-white\/70 dark:bg-gray-800\/70 text-gray-700 dark:text-gray-300 border-gray-200\/50 dark:border-gray-700\/50 hover:bg-white\/90 dark:hover:bg-gray-800\/90/g, to: 'bg-gray-800/70 text-gray-300 border-gray-700/50 hover:bg-gray-800/90' },

  // Text colors
  { from: /text-gray-900 dark:text-white/g, to: 'text-white' },
  { from: /text-gray-800 dark:text-gray-100/g, to: 'text-gray-100' },
  { from: /text-gray-700 dark:text-gray-200/g, to: 'text-gray-200' },
  { from: /text-gray-600 dark:text-gray-300/g, to: 'text-gray-300' },
  { from: /text-gray-500 dark:text-gray-400/g, to: 'text-gray-400' },
  { from: /text-black dark:text-white/g, to: 'text-white' },
  { from: /text-gray-900 dark:text-gray-100/g, to: 'text-gray-100' },
  
  // Background colors
  { from: /bg-white dark:bg-gray-900/g, to: 'bg-gray-900' },
  { from: /bg-gray-50 dark:bg-gray-800/g, to: 'bg-gray-800' },
  { from: /bg-gray-100 dark:bg-gray-800/g, to: 'bg-gray-800' },
  { from: /bg-gray-200 dark:bg-gray-700/g, to: 'bg-gray-700' },
  { from: /bg-white dark:bg-gray-800/g, to: 'bg-gray-800' },
  { from: /bg-gray-50 dark:bg-gray-900/g, to: 'bg-gray-900' },
  { from: /bg-gray-100 dark:bg-gray-700/g, to: 'bg-gray-700' },
  
  // Border colors
  { from: /border-gray-200 dark:border-gray-700/g, to: 'border-gray-700' },
  { from: /border-gray-300 dark:border-gray-600/g, to: 'border-gray-600' },
  { from: /border-gray-200 dark:border-gray-600/g, to: 'border-gray-600' },
  
  // Hover states
  { from: /hover:bg-gray-50 dark:hover:bg-gray-800/g, to: 'hover:bg-gray-800' },
  { from: /hover:bg-gray-100 dark:hover:bg-gray-700/g, to: 'hover:bg-gray-700' },
  { from: /hover:text-gray-900 dark:hover:text-white/g, to: 'hover:text-white' },
  { from: /hover:bg-gray-200 dark:hover:bg-gray-600/g, to: 'hover:bg-gray-600' },
  
  // Ring colors
  { from: /ring-gray-200 dark:ring-gray-700/g, to: 'ring-gray-700' },
  { from: /ring-gray-300 dark:ring-gray-600/g, to: 'ring-gray-600' },
  
  // Placeholder colors
  { from: /placeholder-gray-400 dark:placeholder-gray-500/g, to: 'placeholder-gray-500' },
  { from: /placeholder-gray-500 dark:placeholder-gray-400/g, to: 'placeholder-gray-400' },
  
  // Special color variants
  { from: /text-indigo-600 dark:text-indigo-400/g, to: 'text-indigo-400' },
  { from: /text-blue-600 dark:text-blue-400/g, to: 'text-blue-400' },
  { from: /text-green-600 dark:text-green-400/g, to: 'text-green-400' },
  { from: /text-purple-600 dark:text-purple-400/g, to: 'text-purple-400' },
  { from: /text-indigo-700 dark:text-indigo-300/g, to: 'text-indigo-300' },
  
  // Background gradients
  { from: /bg-blue-100 dark:bg-blue-900\/30/g, to: 'bg-blue-900/30' },
  { from: /bg-green-100 dark:bg-green-900\/30/g, to: 'bg-green-900/30' },
  { from: /bg-purple-100 dark:bg-purple-900\/30/g, to: 'bg-purple-900/30' },
  { from: /bg-indigo-100 dark:bg-indigo-900\/50/g, to: 'bg-indigo-900/50' },
  
  // Border variants
  { from: /border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900\/20/g, to: 'border-blue-800 bg-blue-900/20' },
  { from: /border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900\/20/g, to: 'border-green-800 bg-green-900/20' },
  { from: /border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900\/20/g, to: 'border-purple-800 bg-purple-900/20' },
  { from: /border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900\/20/g, to: 'border-orange-800 bg-orange-900/20' },
  { from: /border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/g, to: 'border-gray-700 bg-gray-800' },
  
  // Complex states
  { from: /bg-green-100 text-green-800 dark:bg-green-900\/50 dark:text-green-400/g, to: 'bg-green-900/50 text-green-400' },
  { from: /bg-blue-100 text-blue-800 dark:bg-blue-900\/50 dark:text-blue-400/g, to: 'bg-blue-900/50 text-blue-400' },
  { from: /bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400/g, to: 'bg-gray-700 text-gray-400' },
  
  // Group hover states
  { from: /group-hover:text-indigo-600 dark:group-hover:text-indigo-400/g, to: 'group-hover:text-indigo-400' },
  
  // Ternary conditions in className
  { from: /'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'/g, to: "'bg-gray-700 text-gray-300 hover:bg-gray-600'" },
  { from: /'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'/g, to: "'bg-gray-600 text-indigo-400 shadow-sm'" },
  { from: /'text-gray-600 dark:text-gray-400'/g, to: "'text-gray-400'" },
];

// Function to process a file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    replacements.forEach(({ from, to }) => {
      if (from.test(content)) {
        content = content.replace(from, to);
        changed = true;
      }
    });
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${path.basename(filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find TypeScript/React files
function findFiles(dir, extensions = ['.tsx', '.ts']) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules, dist, .git directories
        if (!['node_modules', 'dist', '.git'].includes(item)) {
          traverse(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Main execution
console.log('Converting remaining conditional dark: classes to fixed dark theme...');

const files = findFiles('.');
let processedCount = 0;
let changedCount = 0;

files.forEach(file => {
  processedCount++;
  if (processFile(file)) {
    changedCount++;
  }
});

console.log(`\nConversion complete!`);
console.log(`Processed ${processedCount} files`);
console.log(`Changed ${changedCount} files`);
