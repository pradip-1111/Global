# Deployment Guide for Aryan Global Commerce

This guide will help you deploy your website and optimize it for search engines (SEO).

## 1. Deployment Options

Since this is a static website (HTML, CSS, JavaScript), you can deploy it for free on several platforms.

### Option A: Netlify (Recommended for ease of use)
1.  Go to [Netlify](https://www.netlify.com/) and sign up.
2.  Once logged in, drag and drop your project folder (the folder containing `index.html`, `pages`, `css`, etc.) into the "Sites" area.
3.  Netlify will upload and deploy your site instantly.
4.  You will get a URL like `random-name.netlify.app`. You can change the site name in "Site Settings".

### Option B: Vercel
1.  Go to [Vercel](https://vercel.com/) and sign up.
2.  Install Vercel CLI: `npm i -g vercel`
3.  Run `vercel` in your project terminal.
4.  Follow the prompts (accept defaults).
5.  Your site will be live.

## 2. Domain Name Setup
To appear professional and rank better, you should connect a custom domain (e.g., `aryanglobalcommerce.com`).
1.  Buy a domain from a registrar (GoDaddy, Namecheap, etc.).
2.  In your Netlify/Vercel dashboard, go to "Domain Management".
3.  Add your custom domain.
4.  Follow the instructions to update your DNS records (usually adding A records or CNAME).

## 3. SEO Optimization (Ranking First on Google)

We have already added technical SEO elements:
*   **Sitemap**: `sitemap.xml` helps Google find all your pages.
*   **Robots.txt**: `robots.txt` tells Google what to crawl.
*   **Structured Data**: Added JSON-LD to `homepage.html` and `product_catalog.html` so Google understands your organization and products.
*   **Meta Tags**: Titles and descriptions are set.

### Next Steps for You:
1.  **Google Search Console**:
    *   Go to [Google Search Console](https://search.google.com/search-console).
    *   Add your property (your deployed URL).
    *   Verify ownership (Netlify/Vercel makes this easy with a DNS record or HTML file).
    *   **Submit your sitemap**: Go to "Sitemaps" and enter `sitemap.xml`.

2.  **Google Business Profile**:
    *   Create a profile at [Google Business Profile](https://www.google.com/business/).
    *   Fill in all details (Address, Phone, Website). This is CRITICAL for local SEO and showing up on the right side of search results.

3.  **Content & Backlinks**:
    *   Ranking #1 takes time. Keep your content updated.
    *   Get other reputable websites to link to yours (partners, directories, social media).

## 4. Final Check
Before deploying, ensure all your images are loading correctly and links work. The `index.html` currently redirects to `pages/homepage.html`. For better SEO in the future, consider moving the homepage content to the root `index.html`.
