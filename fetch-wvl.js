const fs = require('fs');
const brands = [
  { slug: 'buick', fname: 'buick' },
  { slug: 'gmc', fname: 'gmc' },
  { slug: 'lincoln', fname: 'lincoln' },
  { slug: 'avatr', fname: 'avatar' },
  { slug: 'geely', fname: 'geely' },
  { slug: 'nio', fname: 'nio' },
  { slug: 'li-auto', fname: 'li-auto' },
  { slug: 'changan', fname: 'changan' },
  { slug: 'gac-group', fname: 'gac' }
];

async function fetchWVL({ slug, fname }) {
  try {
    const urls = [
      `https://worldvectorlogo.com/download/${slug}-1.svg`,
      `https://worldvectorlogo.com/download/${slug}.svg`,
      `https://worldvectorlogo.com/download/${slug}-logo.svg`
    ];
    
    for (const url of urls) {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.status === 200) {
        const text = await res.text();
        if (text.includes('<svg')) {
          fs.writeFileSync(`public/logos/${fname}.svg`, text);
          console.log('Downloaded', fname, 'from', url);
          return;
        }
      }
    }
    console.log('Failed', fname);
  } catch (e) {
    console.log('Error', fname, e.message);
  }
}

Promise.all(brands.map(fetchWVL));
