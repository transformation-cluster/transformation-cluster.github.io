---
layout: page
title: Team
permalink: /team/
lang: de
ref: team
---

# Unser Team

<div class="team-grid">
{% assign sorted_team = site.team | sort: 'order' %}
{% for member in sorted_team %}
  <a href="{{ member.url | relative_url }}" class="card team-card animate-on-scroll">
    {% if member.image %}
    <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="team-card-image">
    {% endif %}
    <h3 class="card-title">{{ member.name }}</h3>
    {% if member.role %}
    <p class="card-subtitle">{{ member.role }}</p>
    {% endif %}
    {% if member.email %}
    <p class="text-muted text-sm">{{ member.email }}</p>
    {% endif %}
  </a>
{% endfor %}
</div>

{% if site.team.size == 0 %}
<div class="highlight-box">
  <p>Derzeit sind keine Team-Mitglieder verfügbar. Bitte fügen Sie Dateien im <code>_team/</code> Verzeichnis hinzu.</p>
</div>
{% endif %}
