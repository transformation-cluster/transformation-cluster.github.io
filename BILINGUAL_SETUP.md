# Bilingual Setup Summary

## ✅ What's Been Implemented

### 1. Language Switcher
- Appears in the top-right corner of every page
- Shows "EN" button on German pages, "DE" button on English pages
- Automatically links to the corresponding page in the other language

### 2. English Pages Created
- `index-en.md` - Home (English)
- `about-en.md` - About Us
- `news-en.md` - News
- `team-en.md` - Team
- `projects-en.md` - Projects
- `contact-en.md` - Contact
- `impressum-en.md` - Legal Notice

### 3. Smart Navigation
- Navigation menu shows only pages in the current language
- German pages when viewing German content
- English pages when viewing English content

## 🔧 How It Works

### The `ref` Field
Pages with the same `ref` value are translations of each other:

```yaml
# about.md
ref: about
lang: de

# about-en.md
ref: about
lang: en
```

The language switcher uses this to find the translated version.

### Automatic Detection
- Layout checks `page.lang` to determine current language
- Navigation filters pages by language automatically
- Language switcher finds pages with matching `ref`

## 📝 Adding New Bilingual Content

### For Pages

1. Create German version:
```markdown
---
layout: page
title: Neue Seite
lang: de
ref: new-page
permalink: /neue-seite/
---
```

2. Create English version:
```markdown
---
layout: page
title: New Page
lang: en
ref: new-page
permalink: /en/new-page/
---
```

### For Posts

1. German post: `_posts/2025-11-09-titel.md`
```yaml
---
lang: de
ref: my-post
---
```

2. English post: `_posts/2025-11-09-title.md`
```yaml
---
lang: en
ref: my-post
---
```

### For Team Members

Add `lang` field to team member files in `_team/`:

```yaml
---
name: "Dr. Max Mustermann"
lang: de
# or create separate English version with lang: en
---
```

## 🎨 Styling

The language switcher styling is in `_includes/language-switcher.html`:
- Fixed position top-right on desktop
- Responsive on mobile
- Light gray background with hover effect

## 🔄 Future Improvements

Optional enhancements you could add:

1. **Language flags** instead of text
2. **Dropdown menu** for more than 2 languages
3. **Remember language preference** with cookies/localStorage
4. **Automatic language detection** based on browser settings

## 📚 Documentation

See `CONTENT_GUIDE.md` for detailed instructions on creating bilingual content.

## ✨ Benefits

- ✅ Works with GitHub Pages (no plugins required)
- ✅ Clean URLs (`/about/` vs `/en/about/`)
- ✅ Easy to maintain (standard Jekyll features)
- ✅ Accessible to visitors from both language backgrounds
- ✅ SEO-friendly (proper lang attributes)

---

**Your site is now fully bilingual!** 🌍
