import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { lang = 'zh', pageId = 'academy' } = req.query;

  try {
    const contentPath = path.join(process.cwd(), 'content', 'generated', `content_${lang}.json`);

    if (fs.existsSync(contentPath)) {
      const fullContent = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
      // Extract content for specific pageId, default to 'academy'
      const pageContent = fullContent[pageId] || fullContent.academy || {};
      res.status(200).json(pageContent);
    } else {
      res.status(404).json({ error: `Content not found for language: ${lang}` });
    }
  } catch (error) {
    console.error('Error loading content:', error);
    res.status(500).json({ error: 'Failed to load content' });
  }
}