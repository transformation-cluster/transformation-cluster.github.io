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

<style>
.projects-list {
  margin-top: 2rem;
}

.project-item {
  border-left: 4px solid #2a7ae2;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
}

.project-meta {
  color: #666;
  font-size: 0.9rem;
}

.funding {
  font-size: 0.9rem;
  color: #555;
}
</style>

---

*Deutsche Version: [Projekte](/projects/)*
