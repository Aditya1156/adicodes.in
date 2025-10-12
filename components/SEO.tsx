import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  robots?: string;
  canonical?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Aditya Kumar | Full Stack Developer & Software Engineer',
  description = 'Experienced Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies. Building scalable applications and innovative solutions.',
  keywords = [
    'Aditya Kumar',
    'Full Stack Developer',
    'MERN Stack',
    'React Developer',
    'Node.js',
    'TypeScript',
    'Software Engineer',
    'Web Development',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript',
    'Portfolio'
  ],
  image = '/og-image.jpg',
  url = 'https://adicodes.in',
  type = 'website',
  author = 'Aditya Kumar',
  siteName = 'Aditya Kumar Portfolio',
  twitterCard = 'summary_large_image',
  robots = 'index, follow',
  canonical,
  structuredData
}) => {
  const fullTitle = title.includes('Aditya Kumar') ? title : `${title} | Aditya Kumar`;
  const fullUrl = canonical || url;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;

  // Default structured data for person/developer
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aditya Kumar',
    jobTitle: 'Full Stack Developer',
    description: description,
    url: url,
    image: fullImageUrl,
    sameAs: [
      'https://github.com/Aditya1156',
      'https://linkedin.com/in/aditya-kumar', // Update with actual LinkedIn
      'https://twitter.com/aditya_codes', // Update with actual Twitter
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'MongoDB',
      'Express.js',
      'Full Stack Development',
      'Web Development',
      'Software Engineering'
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Your University' // Update with actual education
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance Developer'
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@aditya_codes" />
      <meta name="twitter:site" content="@aditya_codes" />
      
      {/* Additional Meta Tags for better SEO */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="application-name" content={siteName} />
      
      {/* Viewport and mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Language and region */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="//cdn.tailwindcss.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
    </Helmet>
  );
};

export default SEO;