/**
 * Final Multilingual Support for 51Talk Landing Page
 * Supports Chinese (zh), English (en), Arabic (ar)
 * Default language: Arabic (RTL)
 */

class FinalI18n {
    constructor() {
        this.currentLanguage = 'zh'; // Default to Chinese
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadLanguage(this.currentLanguage);
        this.setupDirectionHandling();
        this.addLanguageSelector();
    }

    // Load translation file
    async loadLanguage(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            this.translations = await response.json();
            this.currentLanguage = lang;
            this.updatePageLanguage();
            this.updateHTMLLang();
            this.updateDirection();
        } catch (error) {
            console.error(`Failed to load language ${lang}:`, error);
            // Fallback to Arabic if load fails
            if (lang !== 'ar') {
                await this.loadLanguage('ar');
            }
        }
    }

    // Update all text elements with data-i18n attribute
    updatePageLanguage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            const translation = this.getNestedTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    // Get nested translation using dot notation
    getNestedTranslation(key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], this.translations);
    }

    // Update HTML lang attribute
    updateHTMLLang() {
        document.documentElement.lang = this.currentLanguage;
    }

    // Update text direction
    updateDirection() {
        const isRTL = this.currentLanguage === 'ar';
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

        // Add/remove RTL class for additional styling if needed
        if (isRTL) {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
    }

    // Handle direction-specific styling
    setupDirectionHandling() {
        // Add CSS for RTL-specific adjustments
        const style = document.createElement('style');
        style.textContent = `
            .rtl .grid {
                direction: rtl;
            }
            .rtl .flex {
                direction: rtl;
            }
            .rtl .text-center {
                text-align: center;
            }
            .rtl .text-left {
                text-align: right;
            }
            .rtl .text-right {
                text-align: left;
            }
            .rtl .ml-8 {
                margin-left: 0;
                margin-right: 2rem;
            }
            .rtl .mr-8 {
                margin-right: 0;
                margin-left: 2rem;
            }
            .rtl .pl-8 {
                padding-left: 0;
                padding-right: 2rem;
            }
            .rtl .pr-8 {
                padding-right: 0;
                padding-left: 2rem;
            }
            .rtl .order-1 {
                order: 2;
            }
            .rtl .order-2 {
                order: 1;
            }
            /* For language selector positioning in RTL */
            .rtl .language-selector {
                left: 20px;
                right: auto;
            }

            /* Ensure language selector is always visible */
            .language-selector {
                z-index: 9999 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Add language selector to page
    addLanguageSelector() {
        const selectorHTML = `
            <div class="language-selector fixed top-6 right-6 z-50 bg-white rounded-lg shadow-xl p-3 border border-gray-300" style="min-width: 120px;">
                <label for="language-selector" class="block text-xs font-semibold text-gray-600 mb-1">Language / 语言</label>
                <select id="language-selector" class="w-full bg-transparent text-sm font-medium text-text-primary focus:outline-none cursor-pointer border border-gray-200 rounded px-2 py-1">
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                </select>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', selectorHTML);

        // Setup selector event listeners
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = this.currentLanguage;
            selector.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }
    }

    // Switch language
    async switchLanguage(lang) {
        if (lang !== this.currentLanguage) {
            await this.loadLanguage(lang);

            // Save language preference to localStorage
            localStorage.setItem('preferred-language', lang);

            // Update selector if it exists
            const selector = document.getElementById('language-selector');
            if (selector) {
                selector.value = lang;
            }
        }
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Get translation for a specific key
    t(key) {
        return this.getNestedTranslation(key) || key;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new FinalI18n();

    // Load saved language preference if exists
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && ['ar', 'zh', 'en'].includes(savedLanguage)) {
        window.i18n.switchLanguage(savedLanguage);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FinalI18n;
}