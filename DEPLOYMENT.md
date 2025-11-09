# GitHub Pages Deployment Guide

## Quick Answer

You can **just commit and push** your changes! GitHub Pages will automatically build and deploy your Jekyll site. However, you need to enable GitHub Pages in your repository settings first (one-time setup).

## Initial Setup (One-Time)

### Step 1: Push Your Code to GitHub

```bash
# If you haven't already, initialize git and push
git add .
git commit -m "Initial Jekyll setup for Transformations Cluster website"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/transformation-cluster/transformation-cluster.github.io`

2. Click on **Settings** (top right)

3. In the left sidebar, click **Pages**

4. Under "Source", select:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`

5. Click **Save**

6. Wait 1-2 minutes for the initial build

7. Your site will be available at: **`https://transformation-cluster.github.io`**

### That's it! 🎉

From now on, every time you push to the `main` branch, GitHub Pages will automatically rebuild and deploy your site.

---

## How It Works

### Automatic Deployment

GitHub Pages has **native Jekyll support**. When you push:

1. GitHub detects Jekyll files (`_config.yml`, `Gemfile`, etc.)
2. Automatically runs `jekyll build`
3. Deploys the `_site/` output to your GitHub Pages URL
4. Usually takes **1-2 minutes**

### What You Need to Do

```bash
# Make changes to your files
# Then:
git add .
git commit -m "Add new team member"
git push origin main

# GitHub Pages handles the rest automatically!
```

---

## Checking Build Status

### Method 1: Actions Tab

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see all deployments and their status:
   - ✅ Green checkmark = successful
   - ❌ Red X = failed (check logs)
   - 🟡 Yellow dot = in progress

### Method 2: Deployment Badge

Add this to your `README.md` to show build status:

```markdown
![GitHub Pages](https://github.com/transformation-cluster/transformation-cluster.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)
```

---

## Important Notes

### What Gets Deployed

- Jekyll automatically builds your site
- Only the **built HTML/CSS/JS** is deployed (from `_site/`)
- The `_site/` folder is **NOT** in your git repository (it's in `.gitignore`)

### GitHub Pages Limitations

GitHub Pages has some restrictions:

1. **Plugins**: Only [these plugins](https://pages.github.com/versions/) are allowed
   - ✅ `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap` (all included in your setup)
   - ❌ Custom plugins won't work on GitHub Pages

2. **Build Time**: Maximum 10 minutes

3. **Site Size**: Recommended < 1 GB

4. **Bandwidth**: 100 GB/month soft limit

### Our Setup is Compatible! ✅

All the features in this project work with GitHub Pages:
- ✅ Minima theme
- ✅ Collections (`_team`, `_projects`, `_publications`)
- ✅ Plotly visualizations
- ✅ Custom layouts
- ✅ All plugins we use

---

## Workflow

### Daily Workflow

```bash
# 1. Make local changes
# Edit files in VS Code

# 2. Test locally (optional but recommended)
bundle exec jekyll serve
# Visit http://localhost:4000

# 3. Commit and push
git add .
git commit -m "Add new publication"
git push origin main

# 4. Wait 1-2 minutes
# Your changes are live at https://transformation-cluster.github.io
```

### Development Best Practices

1. **Test locally first**:
   ```bash
   bundle exec jekyll serve
   ```
   This helps catch errors before deployment.

2. **Check the build on GitHub**:
   - Go to Actions tab after pushing
   - Make sure the build succeeded

3. **Use branches for major changes**:
   ```bash
   git checkout -b new-feature
   # Make changes
   git push origin new-feature
   # Create Pull Request on GitHub
   # Merge to main when ready
   ```

---

## Troubleshooting

### Site Not Updating?

1. **Check Actions tab** for build errors
2. **Clear browser cache** (Cmd+Shift+R on Mac)
3. **Wait a bit longer** (sometimes takes 3-5 minutes)

### Build Failed?

Common issues:

1. **YAML syntax error** in front matter
   ```yaml
   # ❌ Wrong
   title: This has a: colon
   
   # ✅ Correct
   title: "This has a: colon"
   ```

2. **Invalid date format** in posts
   ```bash
   # ❌ Wrong
   _posts/2025-11-9-post.md
   
   # ✅ Correct
   _posts/2025-11-09-post.md
   ```

3. **Liquid syntax error**
   - Check your `{% %}` tags are properly closed

### How to Debug

1. Click on the failed build in Actions tab
2. Click on the job that failed
3. Expand the logs to see the error message
4. Fix the error locally
5. Push again

---

## Advanced: Custom Domain (Optional)

If you want to use a custom domain like `transformation-cluster.de`:

### Step 1: Configure DNS

Add these DNS records at your domain provider:

```
# For apex domain (transformation-cluster.de)
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153

# For www subdomain
CNAME www   transformation-cluster.github.io
```

### Step 2: Configure GitHub Pages

1. Go to Settings → Pages
2. Under "Custom domain", enter: `transformation-cluster.de`
3. Wait for DNS check (can take a few hours)
4. Enable "Enforce HTTPS"

### Step 3: Update `_config.yml`

```yaml
url: "https://transformation-cluster.de"
baseurl: ""
```

---

## Testing Before Push (Recommended)

### Local Preview

Always test locally before pushing:

```bash
# Start local server
bundle exec jekyll serve

# Visit http://localhost:4000
# Test all pages, links, and features
```

### Test with Production Settings

```bash
# Build with production environment
JEKYLL_ENV=production bundle exec jekyll build

# Serve the production build
cd _site && python3 -m http.server 4000
```

---

## Summary

### ✅ To Deploy Your Site:

1. **One-time**: Enable GitHub Pages in repository settings
2. **Always**: Just `git push origin main`
3. **Wait**: 1-2 minutes for automatic deployment
4. **Done**: Visit `https://transformation-cluster.github.io`

### 🚀 Quick Commands:

```bash
# Test locally
bundle exec jekyll serve

# Deploy to GitHub Pages
git add .
git commit -m "Your message"
git push origin main
```

### 📝 Remember:

- GitHub Pages builds **automatically**
- No manual deployment needed
- Check **Actions** tab for build status
- Test **locally** before pushing

---

**You're all set! Just push your changes and GitHub Pages handles everything else! 🎉**
