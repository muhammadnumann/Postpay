require('dotenv').config();
const fs = require('fs');

function getPagesObject() {
  const fileObj = {};

  const walkSync = dir => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = `${dir}${file}`;
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        const cleanFileName = filePath.replace('pages/', '');
        fileObj[`/${cleanFileName}`] = {
          page: `/${cleanFileName}`,
          lastModified: fileStat.mtime
        };
      } else if (filePath.endsWith('_document.tsx' === false)) {
        const cleanFileName = filePath
          .substr(0, filePath.lastIndexOf('.'))
          .replace('pages/', '')
          .replace('index', '');

        fileObj[`/${cleanFileName}`] = {
          page: `/${cleanFileName}`,
          lastModified: fileStat.mtime
        };
      }
    });
  };

  walkSync('pages/');

  return fileObj;
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const pathsObj = getPagesObject();

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Object.keys(pathsObj)
    .map(
      path => `<url>
    <loc>${
      process.env.DOMAIN ? process.env.DOMAIN : 'https://postpay.io'
    }${path}</loc>
    <lastmod>${formatDate(new Date(pathsObj[path].lastModified))}</lastmod>
  </url>`
    )
    .join('')}
</urlset>`;

fs.writeFileSync('out/sitemap.xml', sitemapXml);
