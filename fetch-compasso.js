const fs = require('fs');
const brands = [
  { slug: 'buick', fname: 'buick' },
  { slug: 'gmc', fname: 'gmc' },
  { slug: 'lincoln', fname: 'lincoln' },
  { slug: 'avatar', fname: 'avatar' },
  { slug: 'geely', fname: 'geely' },
  { slug: 'nio', fname: 'nio' },
  { slug: 'li-auto', fname: 'li-auto' },
  { slug: 'changan', fname: 'changan' },
  { slug: 'gac', fname: 'gac' }
];

async function fetchCompasso({ slug, fname }) {
  try {
    const res = await fetch(`https://cdn.jsdelivr.net/gh/filippella/Compasso@main/assets/brand-logos/${slug}.svg`);
    if (res.status === 200) {
      fs.writeFileSync(`public/logos/${fname}.svg`, await res.text());
      console.log('Downloaded', fname);
    } else {
      console.log('Failed', fname, res.status);
    }
  } catch (e) {
    console.log('Error', fname, e.message);
  }
}

Promise.all(brands.map(fetchCompasso));
