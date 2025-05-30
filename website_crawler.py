#!/usr/bin/env python3
"""
Website Content Crawler
Extracts complete content structure from websites for reference analysis
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time
import re
from typing import Set, Dict, List
import os

class WebsiteCrawler:
    def __init__(self, base_url: str, max_pages: int = 50):
        self.base_url = base_url
        self.domain = urlparse(base_url).netloc
        self.visited_urls: Set[str] = set()
        self.max_pages = max_pages
        self.content = {}
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def is_valid_url(self, url: str) -> bool:
        """Check if URL is valid for crawling"""
        parsed = urlparse(url)
        return (
            parsed.netloc == self.domain and
            not url.endswith(('.pdf', '.jpg', '.jpeg', '.png', '.gif', '.zip', '.exe')) and
            '#' not in url and
            '?' not in url  # Skip URLs with parameters for simplicity
        )
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text content"""
        # Remove extra whitespace and normalize
        text = re.sub(r'\s+', ' ', text.strip())
        # Remove empty lines
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        return '\n'.join(lines)
    
    def extract_page_content(self, url: str) -> Dict:
        """Extract structured content from a single page"""
        try:
            print(f"Crawling: {url}")
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style", "nav", "footer"]):
                script.decompose()
            
            page_content = {
                'url': url,
                'title': '',
                'headings': [],
                'paragraphs': [],
                'links': [],
                'lists': [],
                'tables': []
            }
            
            # Extract title
            title_tag = soup.find('title')
            if title_tag:
                page_content['title'] = self.clean_text(title_tag.get_text())
            
            # Extract headings (h1-h6)
            for i in range(1, 7):
                headings = soup.find_all(f'h{i}')
                for heading in headings:
                    text = self.clean_text(heading.get_text())
                    if text:
                        page_content['headings'].append({
                            'level': i,
                            'text': text
                        })
            
            # Extract paragraphs
            paragraphs = soup.find_all('p')
            for p in paragraphs:
                text = self.clean_text(p.get_text())
                if text and len(text) > 10:  # Filter out very short paragraphs
                    page_content['paragraphs'].append(text)
            
            # Extract lists
            lists = soup.find_all(['ul', 'ol'])
            for list_elem in lists:
                items = []
                for li in list_elem.find_all('li'):
                    text = self.clean_text(li.get_text())
                    if text:
                        items.append(text)
                if items:
                    page_content['lists'].append({
                        'type': list_elem.name,
                        'items': items
                    })
            
            # Extract tables
            tables = soup.find_all('table')
            for table in tables:
                rows = []
                for tr in table.find_all('tr'):
                    cells = []
                    for cell in tr.find_all(['td', 'th']):
                        text = self.clean_text(cell.get_text())
                        if text:
                            cells.append(text)
                    if cells:
                        rows.append(cells)
                if rows:
                    page_content['tables'].append(rows)
            
            # Extract internal links
            links = soup.find_all('a', href=True)
            for link in links:
                href = link.get('href')
                if href:
                    full_url = urljoin(url, href)
                    if self.is_valid_url(full_url) and full_url not in self.visited_urls:
                        link_text = self.clean_text(link.get_text())
                        page_content['links'].append({
                            'url': full_url,
                            'text': link_text
                        })
            
            return page_content
            
        except Exception as e:
            print(f"Error crawling {url}: {str(e)}")
            return None
    
    def crawl_website(self) -> Dict:
        """Crawl the entire website"""
        urls_to_visit = [self.base_url]
        
        while urls_to_visit and len(self.visited_urls) < self.max_pages:
            current_url = urls_to_visit.pop(0)
            
            if current_url in self.visited_urls:
                continue
                
            self.visited_urls.add(current_url)
            page_content = self.extract_page_content(current_url)
            
            if page_content:
                self.content[current_url] = page_content
                
                # Add new links to visit
                for link in page_content['links']:
                    if link['url'] not in self.visited_urls:
                        urls_to_visit.append(link['url'])
            
            # Be respectful - small delay between requests
            time.sleep(1)
        
        return self.content
    
    def generate_markdown(self, output_file: str):
        """Generate markdown file with all content"""
        domain_name = self.domain.replace('www.', '').replace('.', '_')
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"# Complete Website Content Analysis: {self.domain}\n\n")
            f.write(f"**Base URL:** {self.base_url}\n")
            f.write(f"**Crawled Pages:** {len(self.content)}\n")
            f.write(f"**Generated:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write("---\n\n")
            
            for url, content in self.content.items():
                f.write(f"## Page: {content['title'] or 'Untitled'}\n")
                f.write(f"**URL:** {url}\n\n")
                
                # Write headings
                if content['headings']:
                    f.write("### Headings Structure\n")
                    for heading in content['headings']:
                        indent = "  " * (heading['level'] - 1)
                        f.write(f"{indent}- H{heading['level']}: {heading['text']}\n")
                    f.write("\n")
                
                # Write paragraphs
                if content['paragraphs']:
                    f.write("### Content Paragraphs\n")
                    for i, paragraph in enumerate(content['paragraphs'], 1):
                        f.write(f"{i}. {paragraph}\n\n")
                
                # Write lists
                if content['lists']:
                    f.write("### Lists\n")
                    for i, list_data in enumerate(content['lists'], 1):
                        f.write(f"**List {i} ({list_data['type']}):**\n")
                        for item in list_data['items']:
                            f.write(f"- {item}\n")
                        f.write("\n")
                
                # Write tables
                if content['tables']:
                    f.write("### Tables\n")
                    for i, table in enumerate(content['tables'], 1):
                        f.write(f"**Table {i}:**\n")
                        for row in table:
                            f.write("| " + " | ".join(row) + " |\n")
                        f.write("\n")
                
                f.write("---\n\n")

def main():
    """Crawl the three specified websites"""
    websites = [
        "https://originsteel.fr/",
        "https://pmr.sk/en",
        "https://www.metalhom.com/"
    ]
    
    for website in websites:
        print(f"\n🕷️  Starting crawl of {website}")
        
        crawler = WebsiteCrawler(website, max_pages=30)
        content = crawler.crawl_website()
        
        # Generate output filename
        domain = urlparse(website).netloc.replace('www.', '').replace('.', '_')
        output_file = f"reference-{domain}-complete.md"
        
        crawler.generate_markdown(output_file)
        
        print(f"✅ Completed crawl of {website}")
        print(f"   📄 {len(content)} pages crawled")
        print(f"   💾 Saved to: {output_file}")
        
        # Delay between websites
        time.sleep(3)
    
    print("\n🎉 All websites crawled successfully!")

if __name__ == "__main__":
    main()