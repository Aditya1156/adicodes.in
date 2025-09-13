import React, { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    const removeMetaTag = (name: string) => {
        const element = document.querySelector(`meta[name="${name}"]`);
        if (element) {
            element.remove();
        }
    };

    setMetaTag('description', description);

    if (keywords) {
      setMetaTag('keywords', keywords);
    } else {
      removeMetaTag('keywords');
    }

  }, [title, description, keywords]);

  return null; // This component does not render anything to the DOM
};

export default MetaTags;
