---
layout: page
title: Publikationen
permalink: /publications/
lang: de
ref: publications
---

# Publikationen

<div class="publications-list">
{% assign publications_by_year = site.publications | group_by: "year" | sort: "name" | reverse %}

{% for year_group in publications_by_year %}
  <h2>{{ year_group.name }}</h2>
  {% for pub in year_group.items %}
    <article class="publication-item">
      <h3>
        {% if pub.url %}
          <a href="{{ pub.url | relative_url }}">{{ pub.title }}</a>
        {% else %}
          {{ pub.title }}
        {% endif %}
      </h3>
      {% if pub.authors %}
      <p class="authors">{{ pub.authors }}</p>
      {% endif %}
      {% if pub.venue %}
      <p class="venue"><em>{{ pub.venue }}</em></p>
      {% endif %}
      {% if pub.doi %}
      <p class="doi">DOI: <a href="https://doi.org/{{ pub.doi }}" target="_blank">{{ pub.doi }}</a></p>
      {% endif %}
    </article>
  {% endfor %}
{% endfor %}
</div>

<style>
.publications-list h2 {
  margin-top: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e0e0;
}

.publication-item {
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.publication-item .authors {
  color: #555;
  margin: 0.5rem 0;
}

.publication-item .venue {
  color: #666;
  margin: 0.5rem 0;
}

.publication-item .doi {
  font-size: 0.9rem;
  color: #777;
}
</style>
