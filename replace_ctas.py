import os
import re

directory = 'c:/Users/pavit/OneDrive/Desktop/stackly-event-fixed (2)/stackly-event-fixed/event'

# Patterns for CTA buttons
# We want to replace href="..." with href="404.html" for <a> tags with class containing 'btn'
# But we only want to do it if the href is not already 404.html

html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

for file in html_files:
    filepath = os.path.join(directory, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace href="booking.html" inside any a tag with class btn
    content = re.sub(r'(<a\s+[^>]*href=")booking\.html("[^>]*class="[^"]*btn[^"]*"[^>]*>)', r'\g<1>404.html\g<2>', content)
    
    # Replace href="services.html" inside any a tag with class btn
    content = re.sub(r'(<a\s+[^>]*href=")services\.html("[^>]*class="[^"]*btn[^"]*"[^>]*>)', r'\g<1>404.html\g<2>', content)
    
    # Replace href="events.html" inside any a tag with class btn
    content = re.sub(r'(<a\s+[^>]*href=")events\.html("[^>]*class="[^"]*btn[^"]*"[^>]*>)', r'\g<1>404.html\g<2>', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print('Done replacing.')
