# 🔧 Vercel Deployment Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: White Screen / Blank Page After Deployment ✅ FIXED

**Symptoms:**
- Build succeeds in Vercel
- Deployment shows "Ready" status
- Website shows blank/white screen
- Works fine on localhost

**Root Causes:**
1. ❌ Overly strict security headers (CSP, COEP, CORP)
2. ❌ Complex route configuration
3. ❌ Missing base path in Vite config

**Solutions Applied:**
✅ **Simplified `vercel.json`** - Removed complex routing and strict security headers
✅ **Added `base: '/'`** in `vite.config.ts` - Ensures correct asset paths
✅ **Used `rewrites`** instead of `routes` - Modern Vercel configuration

---

### Issue 2: 404 Errors on Page Refresh

**Symptoms:**
- Homepage loads fine
- Navigation works
- Refreshing any page shows 404

**Solution:**
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
This ensures all routes serve `index.html` for client-side routing.

---

### Issue 3: Environment Variables Not Working

**Symptoms:**
- Features requiring API keys fail (e.g., Chatbot)
- Console shows `undefined` for env variables

**Solution:**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add variables:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   VITE_GOOGLE_ANALYTICS_ID=your_ga_id_here
   ```
3. **Important:** Select all environments (Production, Preview, Development)
4. Redeploy the project after adding variables

**Check in Code:**
```typescript
// Should work after deployment
console.log(import.meta.env.VITE_GEMINI_API_KEY); 
```

---

### Issue 4: Assets Not Loading (CSS/JS/Images)

**Symptoms:**
- Broken styling
- Missing images
- JavaScript errors

**Solutions:**
1. **Check base path in `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/', // Should be '/' for Vercel
   });
   ```

2. **Use absolute paths in code:**
   ```tsx
   // ✅ Correct
   <img src="/images/logo.png" />
   
   // ❌ Wrong
   <img src="images/logo.png" />
   ```

3. **Check build output:**
   ```bash
   npm run build
   # Verify files exist in dist/assets/
   ```

---

### Issue 5: Build Fails on Vercel

**Symptoms:**
- Local build works: `npm run build` ✅
- Vercel build fails ❌

**Common Causes & Solutions:**

1. **TypeScript Errors:**
   ```bash
   # Run locally first
   npm run build
   # Fix all TypeScript errors
   ```

2. **Missing Dependencies:**
   ```json
   // Ensure all deps are in package.json dependencies, not devDependencies
   {
     "dependencies": {
       "react": "^19.1.1",
       "react-dom": "^19.1.1",
       // ... all production deps
     }
   }
   ```

3. **Node.js Version:**
   - Vercel uses Node 18.x by default
   - Check your local version: `node -v`
   - If different, create `.nvmrc`:
     ```
     18
     ```

4. **Build Command:**
   ```json
   // vercel.json
   {
     "buildCommand": "npm run build",
     "installCommand": "npm install"
   }
   ```

---

### Issue 6: Slow Loading / Performance Issues

**Solutions:**

1. **Enable Asset Caching:**
   ```json
   // vercel.json
   {
     "headers": [
       {
         "source": "/assets/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       }
     ]
   }
   ```

2. **Check Bundle Sizes:**
   ```bash
   npm run build
   # Look for large chunks > 500KB
   ```

3. **Optimize Images:**
   - Use WebP format
   - Compress before uploading
   - Use responsive images

---

### Issue 7: Console Errors in Production

**Common Errors:**

1. **"Failed to fetch":**
   - Check CORS settings
   - Verify API endpoints are accessible
   - Check network tab in DevTools

2. **"Hydration mismatch":**
   - Remove server/client differences
   - Check for browser-only code in SSR context
   - Ensure consistent state between builds

3. **CSP Violations:**
   - Check browser console for blocked resources
   - Add sources to CSP headers if needed
   - Or simplify CSP (as we did)

---

## Debugging Steps

### 1. Check Vercel Build Logs
1. Go to Vercel Dashboard
2. Click on your project
3. Click on latest deployment
4. Check "Building" section for errors

### 2. Check Runtime Logs
1. In deployment page, click "Functions" tab
2. Look for runtime errors
3. Check API route logs

### 3. Test Locally with Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173
# Should match production behavior
```

### 4. Check Browser Console
1. Open deployed site
2. Press F12 (DevTools)
3. Check Console tab for errors
4. Check Network tab for failed requests

### 5. Verify Environment Variables
```bash
# In Vercel Dashboard → Settings → Environment Variables
# Ensure all VITE_ prefixed variables are set
```

---

## Quick Fix Checklist

When deployment shows blank screen:

- [ ] Check `vercel.json` is simplified (no complex routes)
- [ ] Verify `base: '/'` in `vite.config.ts`
- [ ] Confirm build succeeds: `npm run build`
- [ ] Check environment variables are set in Vercel
- [ ] Verify `rewrites` configuration for SPA routing
- [ ] Remove strict security headers temporarily
- [ ] Check browser console for errors
- [ ] Test production build locally: `npm run preview`
- [ ] Clear Vercel cache and redeploy

---

## Current Working Configuration

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### vite.config.ts (key settings)
```typescript
export default defineConfig({
  base: '/', // Important for Vercel
  build: {
    outDir: 'dist',
    // ... other optimizations
  }
});
```

---

## Still Having Issues?

1. **Redeploy:** Sometimes a fresh deployment fixes issues
2. **Clear Cache:** In Vercel Dashboard → Settings → General → Clear Cache
3. **Check Vercel Status:** [vercel-status.com](https://www.vercel-status.com/)
4. **Contact Support:** [vercel.com/support](https://vercel.com/support)
5. **Community Help:** [GitHub Discussions](https://github.com/vercel/vercel/discussions)

---

**Last Updated:** After fixing blank screen deployment issue
**Status:** ✅ Working - Site deploys successfully
