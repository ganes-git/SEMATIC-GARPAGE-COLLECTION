// Background Service Worker

// Default Blocklist
const DEFAULT_BLOCKLIST = [
    "facebook.com",
    "instagram.com",
    "twitter.com",
    "x.com",
    "tiktok.com",
    "reddit.com",
    "youtube.com",
    "netflix.com"
];

// Initialize state
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        isFocusMode: false,
        blocklist: DEFAULT_BLOCKLIST,
        distractionCount: 0
    });
});

// Listen for updates to focus mode
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.isFocusMode) {
        updateBlockingRules(changes.isFocusMode.newValue);
    }
    if (namespace === 'local' && changes.blocklist) {
        // If blocklist changes while active, re-apply
        chrome.storage.local.get(['isFocusMode'], (result) => {
            if (result.isFocusMode) {
                updateBlockingRules(true);
            }
        });
    }
});

function updateBlockingRules(enabled) {
    if (!enabled) {
        // Clear all rules
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1], // We'll use ID 1 for the main block set
            addRules: []
        });
        chrome.action.setBadgeText({ text: "" });
        return;
    }

    chrome.storage.local.get(['blocklist'], (result) => {
        const domains = result.blocklist || DEFAULT_BLOCKLIST;

        // Construct rule conditions
        const urlFilter = domains.map(d => `*://*.${d}/*`);
        // Note: declaritiveNetRequest regexFilter is powerful but limited in number.
        // Simplest is to redirect any match to our local page.
        // However, urlFilter in 'condition' takes a single string, not array in older docs, 
        // but specific domains can be handled via mapping.

        // Actually, let's use 'requestDomains' if available, or just create multiple rules?
        // Max rules is high. Let's create one rule per domain? Or regex?
        // "regexFilter": "^https?://(www\\.)?(facebook\\.com|twitter\\.com)/.*"

        const regexDomains = domains.map(d => d.replace('.', '\\.')).join('|');
        const regex = `^https?://(www\\.)?(${regexDomains})/.*`;

        const rule = {
            id: 1,
            priority: 1,
            action: {
                type: "redirect",
                redirect: { extensionPath: "/blocked.html" }
            },
            condition: {
                regexFilter: regex,
                resourceTypes: ["main_frame"]
            }
        };

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
            addRules: [rule]
        });

        chrome.action.setBadgeText({ text: "ON" });
        chrome.action.setBadgeBackgroundColor({ color: "#6d28d9" });
    });
}
