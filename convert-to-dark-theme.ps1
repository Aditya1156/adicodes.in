# PowerShell script to convert conditional dark: classes to fixed dark theme
param(
    [string]$Path = ".",
    [string[]]$Extensions = @("*.tsx", "*.ts", "*.jsx", "*.js")
)

Write-Host "Converting conditional dark: classes to fixed dark theme..." -ForegroundColor Green

# Get all TypeScript/React files
$files = Get-ChildItem -Path $Path -Include $Extensions -Recurse | Where-Object { 
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "dist" -and
    $_.FullName -notmatch "\.git"
}

$totalFiles = $files.Count
$processedFiles = 0
$totalReplacements = 0

foreach ($file in $files) {
    $processedFiles++
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Common dark theme class mappings
    $replacements = @{
        # Text colors
        'text-gray-900 dark:text-white' = 'text-white'
        'text-gray-800 dark:text-gray-100' = 'text-gray-100'
        'text-gray-700 dark:text-gray-200' = 'text-gray-200'
        'text-gray-600 dark:text-gray-300' = 'text-gray-300'
        'text-gray-500 dark:text-gray-400' = 'text-gray-400'
        'text-black dark:text-white' = 'text-white'
        
        # Background colors
        'bg-white dark:bg-gray-900' = 'bg-gray-900'
        'bg-gray-50 dark:bg-gray-800' = 'bg-gray-800'
        'bg-gray-100 dark:bg-gray-800' = 'bg-gray-800'
        'bg-gray-200 dark:bg-gray-700' = 'bg-gray-700'
        'bg-white dark:bg-gray-800' = 'bg-gray-800'
        'bg-gray-50 dark:bg-gray-900' = 'bg-gray-900'
        
        # Border colors
        'border-gray-200 dark:border-gray-700' = 'border-gray-700'
        'border-gray-300 dark:border-gray-600' = 'border-gray-600'
        'border-gray-200 dark:border-gray-600' = 'border-gray-600'
        
        # Hover states
        'hover:bg-gray-50 dark:hover:bg-gray-800' = 'hover:bg-gray-800'
        'hover:bg-gray-100 dark:hover:bg-gray-700' = 'hover:bg-gray-700'
        'hover:text-gray-900 dark:hover:text-white' = 'hover:text-white'
        
        # Ring colors
        'ring-gray-200 dark:ring-gray-700' = 'ring-gray-700'
        'ring-gray-300 dark:ring-gray-600' = 'ring-gray-600'
        
        # Placeholder colors
        'placeholder-gray-400 dark:placeholder-gray-500' = 'placeholder-gray-500'
        'placeholder-gray-500 dark:placeholder-gray-400' = 'placeholder-gray-400'
    }
    
    # Apply replacements
    foreach ($pattern in $replacements.Keys) {
        $replacement = $replacements[$pattern]
        if ($content -match [regex]::Escape($pattern)) {
            $content = $content -replace [regex]::Escape($pattern), $replacement
            $totalReplacements++
        }
    }
    
    # Additional regex patterns for more complex cases
    # Remove standalone dark: prefixes when they appear alone
    $content = $content -replace 'dark:([a-zA-Z0-9-]+)', '$1'
    
    # Save if changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated: $($file.Name)" -ForegroundColor Yellow
    }
    
    Write-Progress -Activity "Converting files" -Status "Processing $($file.Name)" -PercentComplete (($processedFiles / $totalFiles) * 100)
}

Write-Host "`nConversion complete!" -ForegroundColor Green
Write-Host "Processed $processedFiles files" -ForegroundColor Cyan
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Cyan
