/**
 * main.js — Entry point.
 * Khởi tạo các module trong thứ tự: render → nav → animations.
 */

import { initNav } from './nav.js';
import { renderMembers } from './members-render.js';
import { initAnimations, autoTagFadeIn } from './animations.js';

function bootstrap() {
  try {
    renderMembers('#membersGrid');
    initNav();
    autoTagFadeIn();
    initAnimations('.fade-in');
    console.info('[TeamGit] App initialized.');
  } catch (err) {
    console.error('[TeamGit] Bootstrap failed:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
