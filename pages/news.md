---
layout: page
title: News
permalink: /news/
lang: de
ref: news
---

# Neuigkeiten

<div class="news-list">
{% for post in site.posts %}
  <article class="news-item">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-meta">
      <time datetime="{{ post.date | date_to_xmlschema }}">
        {{ post.date | date: "%d.%m.%Y" }}
      </time>
    </p>
    <p>{{ post.excerpt }}</p>
  </article>
{% endfor %}
</div>
