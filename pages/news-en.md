---
layout: page
title: News
permalink: /en/news/
lang: en
ref: news
---

# News

<div class="news-list">
{% assign english_posts = site.posts | where: "lang", "en" %}
{% for post in english_posts %}
  <article class="news-item">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-meta">
      <time datetime="{{ post.date | date_to_xmlschema }}">
        {{ post.date | date: "%B %d, %Y" }}
      </time>
    </p>
    <p>{{ post.excerpt }}</p>
  </article>
{% endfor %}
</div>

---

*Deutsche Version: [News](/news/)*
