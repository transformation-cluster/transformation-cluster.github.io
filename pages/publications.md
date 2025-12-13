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
