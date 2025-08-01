const fs = require('fs');

const blogDataPath = './.data/blogs.json';
const readmePath = './README.md';
const blogBaseUrl = 'https://mohsinkhansab.hashnode.dev/';

const data = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));

let latestPosts = data.posts
  .filter(post => post.isActive) // only published
  .slice(0, 5) // last 5 posts
  .map(post => `- [${post.title}](${blogBaseUrl}${post.slug}) - ${post.metaDescription || ''} (${post.createdAt.substring(0,10)})`)
  .join('\n');

// Update README.md (insert or replace between markers)
let readme = fs.readFileSync(readmePath, 'utf-8');
const start = '<!-- BLOG-POST-LIST:START -->';
const end = '<!-- BLOG-POST-LIST:END -->';

const regex = new RegExp(`${start}[\\s\\S]*?${end}`);
const newSection = `${start}\n${latestPosts}\n${end}`;
readme = readme.replace(regex, newSection);

fs.writeFileSync(readmePath, readme);

