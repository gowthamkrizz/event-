import os
import re

directory = '.'

navbar_pattern = re.compile(r'<!-- Navbar -->\s*<nav class="navbar.*?">.*?</nav>', re.DOTALL)
footer_pattern = re.compile(r'<!-- (?:Premium )?Footer.*?-->\s*<footer class="premium-footer">.*?</footer>', re.DOTALL)

html_files = [f for f in os.listdir(directory) if f.endswith('.html') and f not in ('header.html', 'footer.html')]

for file in html_files:
    filepath = os.path.join(directory, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace Navbar
    new_content = navbar_pattern.sub('<div id="header-placeholder"></div>', content)
    
    # Replace Footer (optional if we want to do both)
    # new_content = footer_pattern.sub('<div id="footer-placeholder"></div>', new_content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
    else:
        print(f"No changes for {file}")

print("Done refactoring headers.")
