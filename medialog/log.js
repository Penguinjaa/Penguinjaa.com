function showTab(tab) {
    document.querySelectorAll('.tab-section').forEach(s => s.style.display = 'none');
    const active = document.getElementById(tab);
    if (active) active.style.display = 'flex';
    document.querySelectorAll('.media-tab[data-tab]').forEach(btn => {
        btn.style.opacity = btn.dataset.tab === tab ? '1' : '0.4';
    });
    history.pushState(null, '', `#${tab}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    showTab(['movies','music','games','shows','manga'].includes(hash) ? hash : 'movies');
});
document.addEventListener('toggle', e => {
    if (e.target.tagName === 'DETAILS' && e.target.open) {
        e.target.closest('.entry').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}, true);