---
layout: page
title: Projekte
permalink: /projects/
lang: de
ref: projects
---

# Forschungsprojekte

<div class="projects-list">
{% for project in site.projects %}
  <article class="project-item">
    <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
    {% if project.duration %}
    <p class="project-meta">Laufzeit: {{ project.duration }}</p>
    {% endif %}
    {% if project.excerpt %}
    <p>{{ project.excerpt }}</p>
    {% endif %}
    {% if project.funding %}
    <p class="funding"><strong>Förderung:</strong> {{ project.funding }}</p>
    {% endif %}
  </article>
{% endfor %}
</div>
