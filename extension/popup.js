document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('focus-toggle');
    const statusText = document.getElementById('status-text');
    const countDisplay = document.getElementById('distraction-count');

    // Load state
    chrome.storage.local.get(['isFocusMode', 'distractionCount'], (result) => {
        toggle.checked = result.isFocusMode || false;
        updateStatus(result.isFocusMode);
        countDisplay.textContent = result.distractionCount || 0;
    });

    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        chrome.storage.local.set({ isFocusMode: isEnabled });
        updateStatus(isEnabled);
    });

    function updateStatus(enabled) {
        statusText.textContent = enabled ? "Focus Mode ON" : "Focus Mode Off";
        statusText.style.fontWeight = enabled ? "bold" : "normal";
        statusText.style.color = enabled ? "#7c3aed" : "#64748b";
    }
});
