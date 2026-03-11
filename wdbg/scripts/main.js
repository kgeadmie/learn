function loadCustomCSSWithFallback() {
    const customCssUrl = localStorage.getItem('CSS');

    if (customCssUrl && customCssUrl.trim().length > 0) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = customCssUrl;
        link.id = 'dynamic-custom-css';

        link.onload = () => {
            console.log(`Custom CSS loaded from: ${customCssUrl}`);
        };

        link.onerror = () => {
            console.warn(`Failed to load custom CSS from: ${customCssUrl}`);
        };

        document.head.appendChild(link);
    } else {
        console.log(`No custom CSS URL found`);
    }
}


function applyCustomSettings() {
    const defaultTitle = "WDBG";
    const defaultFavicon = "https://wowdabug.github.io/wdbg/images/favicon.png";
    const title = localStorage.getItem('customTitle');
    const favicon = localStorage.getItem('customFavicon');

    document.title = title || defaultTitle;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = favicon || defaultFavicon;

    document.addEventListener('keydown', e => {
        const tag = document.activeElement.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;

        const panicKey = localStorage.getItem('panicKey');
        const panicUrl = localStorage.getItem('panicUrl');
        if (panicKey && panicUrl && e.key.toLowerCase() === panicKey) {
            window.open(panicUrl, '_blank');
        }
    });
}

function loadCustomScriptFromURL() {
    const urlKey = 'JS';
    const scriptURL = localStorage.getItem(urlKey);

    if (scriptURL && scriptURL.trim().length > 0) {
        const scriptTag = document.createElement('script');
        scriptTag.src = scriptURL;
        scriptTag.id = 'dynamic-custom-script';

        scriptTag.onerror = () => {
            console.error(`Failed to load custom script from URL: ${scriptURL}`);
            applyCustomSettings();
        };

        scriptTag.onload = () => {
            console.log(`Custom script from URL loaded successfully!`);
        };

        document.body.appendChild(scriptTag);
    } else {
        console.log("No custom script URL found in Local Storage. Applying custom settings.");
        applyCustomSettings();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCustomScriptFromURL();
    loadCustomCSSWithFallback();
});
