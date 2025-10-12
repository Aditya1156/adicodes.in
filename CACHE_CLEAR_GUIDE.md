# 🔄 Cache Clearing Guide for Vercel Deployment

## Current Deployment Issue: Cached Old Version

Your site is showing a blank page because it's loading the old cached version with `HashRouter`. Here's how to fix it:

---

## **Immediate Solutions:**

### 1. **Clear Browser Cache (User Side)**
**In your browser:**
```
1. Open DevTools (F12)
2. Right-click the refresh button
3. Click "Empty Cache and Hard Reload"
```

**Or use keyboard shortcut:**
- **Windows/Linux:** `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`

---

### 2. **Clear Vercel Cache (Required)**

**Option A: Via Vercel Dashboard**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **General**
4. Scroll down to **Build & Development Settings**
5. Click **"Redeploy"** button
6. Check **"Use existing build cache"** and **UNCHECK IT**
7. Click **"Redeploy"**

**Option B: Via Vercel CLI** (Faster)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Clear cache and redeploy
vercel --prod --force
```

---

### 3. **Unregister Service Worker (Users)**

If users still see the old site, they need to:

```javascript
// Run this in browser console (F12)
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
    console.log('Service worker unregistered');
  }
  location.reload(true);
});
```

---

## **What We Changed:**

### 1. **Router Fix**
```tsx
// Old (causing blank page on Vercel)
import { HashRouter } from 'react-router-dom';
<HashRouter>...</HashRouter>

// New (works with Vercel)
import { BrowserRouter } from 'react-router-dom';
<BrowserRouter>...</BrowserRouter>
```

### 2. **Service Worker Cache Version**
```javascript
// Updated to force cache refresh
const CACHE_NAME = 'adicodes-portfolio-v1.1.0'; // was v1.0.0
```

---

## **Verification Steps:**

After clearing cache and redeploying:

1. **Check URL Format:**
   - ❌ Old: `adicodes.in/#/blog` (HashRouter)
   - ✅ New: `adicodes.in/blog` (BrowserRouter)

2. **Check Console:**
   - Open DevTools (F12) → Console
   - Should see: `App initialized - Router: BrowserRouter`

3. **Test Navigation:**
   - Click navigation links
   - URLs should change without `#`
   - Page should load with content

---

## **For Users Experiencing Issues:**

Add this notice to your site (temporary):

```markdown
**Notice:** If you're seeing a blank page, please:
1. Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) to hard refresh
2. Clear your browser cache
3. If issue persists, try in an incognito/private window
```

---

## **Automated Cache Busting (Future Prevention):**

### Add to `vite.config.ts`:
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Add timestamp to filenames
        entryFileNames: `assets/js/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/js/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash]-${Date.now()}[extname]`,
      }
    }
  }
});
```

---

## **Current Status:**

- ✅ Code fixed (BrowserRouter)
- ✅ Service Worker version updated (v1.1.0)
- ✅ Debug logging added
- ✅ Pushed to GitHub (commit: 927fa45)
- ⏳ Vercel deploying (wait 2-3 minutes)
- ⚠️ **Action Required:** Clear Vercel cache via dashboard

---

## **Quick Fix Checklist:**

- [ ] Wait for Vercel deployment to complete
- [ ] Clear Vercel build cache and redeploy
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check URL format (should be `/blog` not `/#/blog`)
- [ ] Verify in incognito mode
- [ ] Test navigation links
- [ ] Check console for "Router: BrowserRouter" message

---

## **Still Having Issues?**

1. **Check Vercel Deployment Logs:**
   - Verify build succeeded
   - Check for any errors

2. **Test in Incognito Mode:**
   - Opens fresh session without cache
   - Should show new version immediately

3. **Verify DNS/CDN:**
   - Cloudflare or other CDN might cache
   - May need to purge CDN cache

4. **Nuclear Option (Last Resort):**
   ```bash
   # Delete all cache, node_modules, dist
   rm -rf node_modules dist .vercel
   npm install
   npm run build
   vercel --prod --force
   ```

---

**Expected Timeline:**
- Vercel auto-deploy: 2-3 minutes
- CDN propagation: 5-10 minutes
- Full global cache clear: 1-2 hours

**After 1-2 hours, all users should see the new version automatically.**
