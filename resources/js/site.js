document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-copy]').forEach(function(el) {
        let tooltip;
        let copiedTimeout;
        el.addEventListener('mouseenter', function() {
            tooltip = document.createElement('span');
            tooltip.textContent = 'Click to copy';
            tooltip.className = 'copy-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.background = '#fff';
            tooltip.style.color = '#333';
            tooltip.style.padding = '2px 8px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '14px';
            tooltip.style.zIndex = '1000';
            document.body.appendChild(tooltip);
            const rect = el.getBoundingClientRect();
            tooltip.style.left = (rect.right + window.scrollX + 8) + 'px';
            tooltip.style.top = (rect.top + window.scrollY + (rect.height - tooltip.offsetHeight) / 2) + 'px';
        });
        el.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
        el.addEventListener('click', function() {
            const value = el.getAttribute('data-copy');
            if (value) {
                navigator.clipboard.writeText(value);
                if (tooltip) {
                    tooltip.textContent = 'Copied!';
                    tooltip.style.background = '#4caf50';
                    tooltip.style.color = '#fff';
                    clearTimeout(copiedTimeout);
                    copiedTimeout = setTimeout(function() {
                        if (tooltip) {
                            tooltip.remove();
                            tooltip = null;
                        }
                    }, 1500);
                }
            }
        });
    });
});
