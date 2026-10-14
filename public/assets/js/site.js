function revealLinkedSection() {
  const target = document.getElementById(window.location.hash.slice(1));
  const section = target?.closest('details');
  if (section) {
    section.open = true;
    target.scrollIntoView({ block: 'start' });
  }
}

revealLinkedSection();
window.addEventListener('load', revealLinkedSection);
window.addEventListener('hashchange', revealLinkedSection);
