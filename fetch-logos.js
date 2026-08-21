const fs = require('fs');
const path = require('path');
const outDir = path.join(process.cwd(), 'public', 'logos');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive: true});
const missing = ['Buick', 'GMC', 'Lincoln', 'Avatar', 'Geely', 'NIO', 'Li Auto', 'Changan', 'GAC', 'Alfa Romeo', 'BYD', 'Dodge', 'Jaguar', 'Land Rover', 'Lexus', 'Mercedes-Benz', 'Cupra', 'Lancia', 'Chery'];

const customSearches = {
  'Alfa Romeo': 'Alfa Romeo logo 2015.svg',
  'BYD': 'BYD Auto Logo.svg',
  'Buick': 'Buick logo.svg',
  'Dodge': 'Dodge logo.svg',
  'GMC': 'GMC logo.svg',
  'Jaguar': 'Jaguar logo.svg',
  'Land Rover': 'Land Rover logo.svg',
  'Lexus': 'Lexus logo.svg',
  'Lincoln': 'Lincoln Motor Company Logo.svg',
  'Mercedes-Benz': 'Mercedes-Benz logo.svg',
  'Cupra': 'Cupra logo.svg',
  'Lancia': 'Lancia 2022 logo.svg',
  'Avatar': 'Avatr logo.svg',
  'Geely': 'Geely Auto logo.svg',
  'NIO': 'Nio logo.svg',
  'Li Auto': 'Li Auto logo.svg',
  'Changan': 'Changan Automobile logo.svg',
  'Chery': 'Chery logo.svg',
  'GAC': 'GAC Group logo.svg'
};

async function fetchWikiSvg(brand) {
  try {
    const fileName = customSearches[brand] || `${brand} logo.svg`;
    const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)' };
    let url = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url&format=json`;
    let res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    let data = await res.json();
    let pages = data.query.pages;
    let pageId = Object.keys(pages)[0];
    
    // If not found, try a search
    if (pageId === '-1') {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=File:${encodeURIComponent(brand + ' logo.svg')}&utf8=&format=json`;
      const searchRes = await fetch(searchUrl, { headers });
      if (!searchRes.ok) throw new Error(`HTTP ${searchRes.status}: ${await searchRes.text()}`);
      const searchData = await searchRes.json();
      const title = searchData.query.search[0]?.title;
      if (!title) { console.log('No wiki file found for', brand); return false; }
      
      url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
      res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      data = await res.json();
      pages = data.query.pages;
      pageId = Object.keys(pages)[0];
    }
    
    if (!pages[pageId] || !pages[pageId].imageinfo) {
       console.log('No image info for', brand); return false;
    }

    const fileUrl = pages[pageId].imageinfo[0].url;
    if (!fileUrl.endsWith('.svg')) { console.log('Not SVG for', brand); return false; }
    
    const svgRes = await fetch(fileUrl, { headers });
    if (!svgRes.ok) throw new Error(`HTTP ${svgRes.status}: ${await svgRes.text()}`);
    const svgData = await svgRes.text();
    
    const slug = brand.toLowerCase().replace(/\s+/g, '-');
    fs.writeFileSync(path.join(outDir, `${slug}.svg`), svgData);
    console.log('Downloaded', brand);
    return true;
  } catch (err) {
    console.error('Error fetching', brand, err.message);
  }
}

async function run() {
  for (const brand of missing) {
    await fetchWikiSvg(brand);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to prevent rate limiting
  }
}

run();
