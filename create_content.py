"""
Helper script to create new content for the Transformations Cluster website.

Usage:
    python create_content.py post "Mein Titel"
    python create_content.py team "Dr. Max Mustermann"
    python create_content.py project "Projektname"
    python create_content.py publication "Erstautor 2024"
"""

import sys
import os
from datetime import datetime
import re

def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def create_post(title):
    """Create a new blog post."""
    date = datetime.now()
    slug = slugify(title)
    filename = f"_posts/{date.strftime('%Y-%m-%d')}-{slug}.md"
    
    content = f"""---
layout: post
title: "{title}"
date: {date.strftime('%Y-%m-%d %H:%M:%S %z')}
lang: de
categories: news
author: "Ihr Name"
---

Schreiben Sie hier Ihren Inhalt...

## Überschrift

Weiterer Text...
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Post erstellt: {filename}")
    print(f"   Bearbeiten Sie die Datei und fügen Sie Ihren Inhalt hinzu.")

def create_team_member(name):
    """Create a new team member profile."""
    slug = slugify(name)
    filename = f"_team/{slug}.md"
    
    content = f"""---
name: "{name}"
role: "Position/Funktion"
image: "/assets/images/team/{slug}.jpg"
email: "email@example.com"
phone: "+49 (0) XXX XXXXXX"
office: "Raum XXX, Gebäude X"
website: ""
orcid: ""
order: 10
---

Kurze Biografie von {name}...

## Forschungsschwerpunkte

- Thema 1
- Thema 2
- Thema 3

## Ausbildung

- 20XX: Promotion in [Fach] an der [Universität]
- 20XX: Master in [Fach] an der [Universität]

## Ausgewählte Publikationen

[Liste wichtiger Publikationen]
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Team-Mitglied erstellt: {filename}")
    print(f"   Vergessen Sie nicht, ein Foto hinzuzufügen:")
    print(f"   assets/images/team/{slug}.jpg")

def create_project(title):
    """Create a new project."""
    slug = slugify(title)
    filename = f"_projects/{slug}.md"
    
    content = f"""---
title: "{title}"
duration: "2024-2027"
funding: "Förderorganisation (z.B. DFG, BMBF)"
team_members:
  - "Name 1"
  - "Name 2"
order: 1
---

## Projektziel

Beschreiben Sie hier die Ziele des Projekts...

## Hintergrund

Kontext und Motivation...

## Methoden

Verwendete Methoden und Ansätze...

## Erwartete Ergebnisse

Was erwarten Sie von diesem Projekt?

## Projektpartner

- Institution A
- Institution B
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Projekt erstellt: {filename}")

def create_publication(citation):
    """Create a new publication."""
    slug = slugify(citation)
    filename = f"_publications/{slug}.md"
    
    content = f"""---
title: "Vollständiger Titel der Publikation"
authors: "Autor1, A., Autor2, B., & Autor3, C."
venue: "Name des Journals oder der Konferenz"
year: {datetime.now().year}
doi: "10.XXXX/XXXXX"
pdf: "/assets/publications/{slug}.pdf"
bibtex: |
  @article{{{slug},
    title={{Vollständiger Titel}},
    author={{Autor1, A. and Autor2, B.}},
    journal={{Journal Name}},
    year={{{datetime.now().year}}},
    doi={{10.XXXX/XXXXX}}
  }}
---

## Abstract

Zusammenfassung der Publikation...

## Key Findings

- Wichtiges Ergebnis 1
- Wichtiges Ergebnis 2
- Wichtiges Ergebnis 3
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Publikation erstellt: {filename}")
    print(f"   Vergessen Sie nicht, das PDF hinzuzufügen:")
    print(f"   assets/publications/{slug}.pdf")

def main():
    if len(sys.argv) < 3:
        print("Usage: python create_content.py <type> <title>")
        print("\nTypes:")
        print("  post        - Create a new blog post")
        print("  team        - Create a new team member")
        print("  project     - Create a new project")
        print("  publication - Create a new publication")
        print("\nExamples:")
        print('  python create_content.py post "Neue Publikation veröffentlicht"')
        print('  python create_content.py team "Dr. Jane Doe"')
        print('  python create_content.py project "Transformations in der Gesellschaft"')
        print('  python create_content.py publication "Mustermann 2024"')
        sys.exit(1)
    
    content_type = sys.argv[1].lower()
    title = sys.argv[2]
    
    # Create directories if they don't exist
    os.makedirs('_posts', exist_ok=True)
    os.makedirs('_team', exist_ok=True)
    os.makedirs('_projects', exist_ok=True)
    os.makedirs('_publications', exist_ok=True)
    
    if content_type == 'post':
        create_post(title)
    elif content_type == 'team':
        create_team_member(title)
    elif content_type == 'project':
        create_project(title)
    elif content_type == 'publication':
        create_publication(title)
    else:
        print(f"❌ Unknown type: {content_type}")
        print("   Valid types: post, team, project, publication")
        sys.exit(1)

if __name__ == '__main__':
    main()
