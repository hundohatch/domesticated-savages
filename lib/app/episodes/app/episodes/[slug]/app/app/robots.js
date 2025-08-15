export default function robots(){
  const u = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return { rules: [{ userAgent:'*', allow:'/' }], sitemap: `${u}/sitemap.xml` }
}
