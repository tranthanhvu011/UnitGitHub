/**
 * members-render.js — Render member cards from data.
 */

import { members } from './members-data.js';

/**
 * Sanitize text to prevent XSS when injecting into innerHTML.
 * Defensive coding theo DEV.md Step 5.
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildCard(member) {
  const name = escapeHtml(member.name);
  const role = escapeHtml(member.role);
  const initials = escapeHtml(member.initials || name.charAt(0));
  const skills = (member.skills || [])
    .map((s) => `<span class="member-card__skill">${escapeHtml(s)}</span>`)
    .join('');

  const article = document.createElement('article');
  article.className = 'member-card fade-in';
  article.innerHTML = `
    <div class="member-card__avatar" aria-hidden="true">${initials}</div>
    <h3 class="member-card__name">${name}</h3>
    <p class="member-card__role">${role}</p>
    <div class="member-card__skills">${skills}</div>
  `;
  return article;
}

export function renderMembers(targetSelector = '#membersGrid') {
  const root = document.querySelector(targetSelector);
  if (!root) {
    console.warn(`[members-render] target not found: ${targetSelector}`);
    return;
  }

  if (!Array.isArray(members) || members.length === 0) {
    root.innerHTML = '<p class="empty-state">Chưa có thành viên nào.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  members.forEach((m) => fragment.appendChild(buildCard(m)));
  root.replaceChildren(fragment);
}
