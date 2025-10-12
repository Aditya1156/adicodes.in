# 🚀 Vercel Deployment Guide

## Quick Deployment Steps

### 1. **Connect to Vercel**
Visit [vercel.com](https://vercel.com) and sign in with your GitHub account.

### 2. **Import Repository**
- Click "New Project"
- Select `adicodes.in` from your GitHub repositories
- Vercel will automatically detect Vite configuration

### 3. **Configure Environment Variables**
Add these environment variables in Vercel dashboard:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_ANALYTICS_ID=your_ga_id_here (optional)
```

To add environment variables:
- Go to Project Settings > Environment Variables
- Add each variable for Production, Preview, and Development

### 4. **Deploy**
- Click "Deploy" button
- Wait for build to complete (~2-3 minutes)
- Your site will be live at `your-project.vercel.app`

### 5. **Custom Domain (Optional)**
- Go to Project Settings > Domains
- Add your custom domain (adicodes.in)
- Follow DNS configuration instructions
- SSL certificate will be automatically provisioned

## ✅ What's Included

The project is fully optimized for Vercel with:

### Configuration (`vercel.json`)
- ✅ Optimized build settings
- ✅ Security headers (CSP, HSTS, X-Frame-Options, etc.)
- ✅ Cache control for static assets (1 year)
- ✅ SPA routing configuration
- ✅ Service Worker support
- ✅ SEO-friendly redirects

### Performance Features
- ✅ Code splitting and lazy loading
- ✅ Optimized bundle sizes (<150KB gzipped)
- ✅ Fast CDN delivery
- ✅ Automatic image optimization
- ✅ Edge network distribution

### Automatic Features
- ✅ **Production Deploys**: Auto-deploy on push to `main` branch
- ✅ **Preview Deploys**: Automatic preview URLs for pull requests
- ✅ **Instant Rollbacks**: One-click rollback to previous versions
- ✅ **Analytics**: Built-in Web Vitals and performance tracking
- ✅ **SSL/HTTPS**: Automatic SSL certificate provisioning

## 📊 Expected Build Output

```
✓ built in 3-4s
dist/index.html                   ~6 kB
dist/assets/css/index-*.css       ~4 kB
dist/assets/js/components-*.js    ~141 kB (gzipped: ~35 kB)
dist/assets/js/react-vendor-*.js  ~224 kB (gzipped: ~72 kB)
```

## 🔧 Troubleshooting

### Build Fails
- Check TypeScript errors: `npm run build` locally
- Verify all dependencies are in `package.json`
- Check Node.js version (should be 18+)

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

### 404 Errors on Refresh
- Already handled by `vercel.json` SPA routing configuration
- If issues persist, check `routes` section in `vercel.json`

## 🎯 Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages accessible (Home, About, Projects, etc.)
- [ ] AI Chatbot working (check VITE_GEMINI_API_KEY)
- [ ] Contact form submitting
- [ ] Mobile responsive design working
- [ ] Custom domain connected (if applicable)
- [ ] Analytics tracking (if configured)
- [ ] Loading screen and animations working

## 📈 Monitoring

### Vercel Dashboard
- View deployment status and logs
- Monitor performance metrics
- Check error rates and logs
- View real-time analytics

### Performance
- Lighthouse scores should be 90+
- Core Web Vitals in green
- Fast page load times (<2s)

## 🔄 Continuous Deployment

Every push to `main` branch automatically:
1. Triggers new deployment
2. Runs build process
3. Deploys to production
4. Updates live site
5. Provides deployment URL

## 🆘 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**Ready to deploy!** 🎉 Your project is fully configured for Vercel deployment.
