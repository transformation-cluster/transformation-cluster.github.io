---
layout: page
title: Projects
permalink: /en/projects/
lang: en
ref: projects
---

# Research Projects

<div class="projects-list">
{% for project in site.projects %}
  <article class="project-item">
    <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
    {% if project.duration %}
    <p class="project-meta">Duration: {{ project.duration }}</p>
    {% endif %}
    {% if project.excerpt %}
    <p>{{ project.excerpt }}</p>
    {% endif %}
    {% if project.funding %}
    <p class="funding"><strong>Funding:</strong> {{ project.funding }}</p>
    {% endif %}
  </article>
{% endfor %}
</div>

---

*Deutsche Version: [Projekte](/projects/)*
