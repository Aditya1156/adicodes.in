// Sitemap generator for better SEO
export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string = 'https://adicodes.in'): string => {
  const currentDate = new Date().toISOString().split('T')[0] as string;
  
  const pages: SitemapEntry[] = [
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: '/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/projects',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      url: '/resume',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: '/contact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: '/blog',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = (baseUrl: string = 'https://adicodes.in'): string => {
  return `User-agent: *
Allow: /

# Optimize crawling
Crawl-delay: 1

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Block unnecessary paths
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important CSS and JS files
Allow: /assets/
Allow: /*.css
Allow: /*.js

# Additional directives for better SEO
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`;
};

// Generate and save sitemap
export const saveSitemap = (): void => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Generate and save robots.txt
export const saveRobotsTxt = (): void => {
  const robotsTxt = generateRobotsTxt();
  const blob = new Blob([robotsTxt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};