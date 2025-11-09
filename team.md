---
layout: page
title: Team
permalink: /team/
lang: de
ref: team
---

# Unser Team

<div class="team-grid">
{% for member in site.team %}
  <div class="team-member-card">
    {% if member.image %}
    <img src="{{ member.image | relative_url }}" alt="{{ member.name }}">
    {% endif %}
    <h3>
      {% if member.url %}
        <a href="{{ member.url | relative_url }}">{{ member.name }}</a>
      {% else %}
        {{ member.name }}
      {% endif %}
    </h3>
    <p class="role">{{ member.role }}</p>
    {% if member.excerpt %}
    <p>{{ member.excerpt }}</p>
    {% endif %}
  </div>
{% endfor %}
</div>

<style>
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-member-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: box-shadow 0.3s;
}

.team-member-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.team-member-card img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.team-member-card .role {
  color: #666;
  font-style: italic;
  margin: 0.5rem 0;
}
</style>
