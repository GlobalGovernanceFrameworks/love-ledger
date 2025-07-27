// src/lib/i18n/index.js - Love Ledger custom i18n system
import { browser } from '$app/environment';
import { derived, writable, get } from 'svelte/store';
import { base } from '$app/paths';

// Define supported languages
const supportedLocales = ['en', 'sv'];

// Create stores for the current locale and translations
const locale = writable('en');
const translations = writable({});
const currentRoute = writable('/');

// Add loading state tracking
const translationsLoading = writable(false);
const translationsLoaded = writable(false);

// Utility functions
function getLocalStorage(key, defaultValue) {
  if (!browser) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalStorage(key, value) {
  if (!browser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Fail silently
  }
}

function getBrowserLanguage() {
  if (!browser) return 'en';
  const lang = navigator.language.split('-')[0];
  return supportedLocales.includes(lang) ? lang : 'en';
}

// Page-specific translations map for Love Ledger
const pageSpecificTranslationsMap = [
  // Dashboard and user areas
  { route: '/dashboard', dataKey: 'dashboard', fileName: 'dashboard' },
  { route: '/care/log', dataKey: 'careLog', fileName: 'careLog' },
  { route: '/validate', dataKey: 'validate', fileName: 'validate' },
  { route: '/community', dataKey: 'community', fileName: 'community' },
  { route: '/settings', dataKey: 'settings', fileName: 'settings' },
  
  // Auth pages
  { route: '/auth/login', dataKey: 'auth', fileName: 'auth' },
  { route: '/auth/register', dataKey: 'auth', fileName: 'auth' },
  { route: '/auth', dataKey: 'auth', fileName: 'auth' },
  
  // Static pages
  { route: '/about', dataKey: 'about', fileName: 'about' },
  { route: '/contact', dataKey: 'contact', fileName: 'contact' },
  { route: '/privacy', dataKey: 'privacy', fileName: 'privacy' },
  { route: '/terms', dataKey: 'terms', fileName: 'terms' },
  
  // Home route (most general - must be last!)
  { route: '/', dataKey: 'home', fileName: 'home' }
];

// Reusable translation loader function
async function loadAndAssignTranslation(locale, fileName, dataKey, translationData) {
  console.log(`🔍 Loading: ${locale}/${fileName}.json for dataKey: ${dataKey}`);
  try {
    const module = await import(`./${locale}/${fileName}.json`);
    translationData[dataKey] = module.default;
    console.log(`✅ Loaded ${dataKey} translations for locale: ${locale}`);
    return true;
  } catch (e) {
    console.error(`❌ Error loading ${dataKey} translations for ${locale}:`, e);
    // Fallback to English if the specified locale fails (and it's not English)
    if (locale !== 'en') {
      try {
        const fallbackModule = await import(`./en/${fileName}.json`);
        translationData[dataKey] = fallbackModule.default;
        console.log(`✅ Fallback loaded ${dataKey} translations for locale: ${locale}`);
        return true;
      } catch (fallbackError) {
        console.error(`❌ Fallback failed for ${dataKey}:`, fallbackError);
      }
    }
    return false;
  }
}

// Load translations for a specific language and route
async function loadTranslations(newLocale, route = '/') {
  console.log('=== loadTranslations called ===');
  console.log('Locale:', newLocale);
  console.log('Route:', route);
  
  translationsLoading.set(true);
  translationsLoaded.set(false);
  
  // Normalize route path and remove hash fragments
  if (route.startsWith(base)) route = route.slice(base.length);
  if (!route) route = '/';
  
  // Remove hash fragments and query parameters for translation matching
  const cleanRoute = route.split('#')[0].split('?')[0];
  
  console.log(`Loading translations - Original route: ${route}, Clean route: ${cleanRoute}, Locale: ${newLocale}`);

  try {
    currentRoute.set(cleanRoute);
    
    let translationData = {};

    // 1. Always load common translations first
    console.log('Loading common translations...');
    await loadAndAssignTranslation(newLocale, 'common', 'common', translationData);

    // 2. Load page-specific translations using the map
    console.log('Checking page-specific translations for route:', cleanRoute);
    
    let matchFound = false;
    for (const mapping of pageSpecificTranslationsMap) {
      // Use exact match or startsWith for route matching
      if (cleanRoute === mapping.route || cleanRoute.startsWith(mapping.route)) {
        console.log(`✅ Found translation mapping for route ${cleanRoute}: ${mapping.dataKey} -> ${mapping.fileName}`);
        const success = await loadAndAssignTranslation(newLocale, mapping.fileName, mapping.dataKey, translationData);
        console.log(`Translation loading success for ${mapping.dataKey}:`, success);
        matchFound = true;
        break; 
      }
    }
    
    if (!matchFound) {
      console.log('❌ No translation mapping found for route:', cleanRoute);
      // Default to home translations if no specific match found
      await loadAndAssignTranslation(newLocale, 'home', 'home', translationData);
    }

    console.log('Final loaded translations data for clean route:', cleanRoute, Object.keys(translationData));

    // Update the stores
    locale.set(newLocale);
    
    // Preserve existing translations and merge with new ones
    translations.update(existingTranslations => {
      console.log('Existing translations before merge:', Object.keys(existingTranslations));
      console.log('New translations to merge:', Object.keys(translationData));
      
      const merged = { ...existingTranslations, ...translationData };
      console.log('Merged translations:', Object.keys(merged));
      return merged;
    });

    if (browser) {
      localStorage.setItem('locale', newLocale);
    }

    // Mark translations as loaded
    translationsLoaded.set(true);
    translationsLoading.set(false);
    
    console.log('=== Translation loading complete ===');
    console.log('Returning translation data:', Object.keys(translationData));

    return translationData;
  } catch (e) {
    console.error('General error in loadTranslations:', e);
    console.error('Error stack:', e.stack);
    translationsLoading.set(false);
    return {};
  }
}

// Create a derived store that returns a translation function
const t = derived(
  [locale, translations, translationsLoaded],
  ([$locale, $translations, $loaded]) => {
    // Return a function that takes a key and returns the translation
    return (key, params = {}) => {
      // If translations are not loaded yet, return empty string to prevent flash
      if (!$loaded) {
        console.log('Translations not loaded yet for key:', key);
        return '';
      }
      
      // If the key is empty or not a string, return an empty string
      if (!key || typeof key !== 'string') {
        return '';
      }
      
      // Split the key by dots to navigate nested objects
      const parts = key.split('.');
      let result = $translations;
      
      // Navigate through the translation object
      for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          // If in development, log warning
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Translation key not found: ${key}`, 'Available translations:', Object.keys($translations));
          }
          // Return empty string instead of the key to avoid showing raw translation keys
          return '';
        }
      }
      
      // Handle different types of results
      if (result === null || result === undefined) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation value is null or undefined for key: ${key}`);
        }
        return '';
      }
      
      // Handle string interpolation for parameters like {current} and {total}
      if (typeof result === 'string' && Object.keys(params).length > 0) {
        return result.replace(/\{(\w+)\}/g, (match, paramName) => {
          return params[paramName] !== undefined ? params[paramName] : match;
        });
      }
      
      return result;
    };
  }
);

// Derived store to check if translations are ready
const isLocaleLoaded = derived(
  [translationsLoaded, translationsLoading],
  ([$loaded, $loading]) => $loaded && !$loading
);

// Function to reload translations when locale changes
function setLocale(newLocale) {
  if (supportedLocales.includes(newLocale)) {
    // Load translations for the current route with the new locale
    const route = get(currentRoute);
    loadTranslations(newLocale, route);
    
    // Update localStorage
    setLocalStorage('locale', newLocale);
    
    // Set cookie for server-side locale detection
    if (browser) {
      document.cookie = `locale=${newLocale}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
    }
    
    // Update URL with language parameter for immediate effect
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);
      window.history.replaceState(null, '', url.toString());
    }
  }
}

// Utility function to detect the user's preferred locale
const detectLocale = () => {
  if (!browser) return 'en';
  
  // First check URL params
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && supportedLocales.includes(urlLang)) {
    return urlLang;
  }
  
  // Then check localStorage
  const savedLocale = getLocalStorage('locale', null);
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale;
  }
  
  // Finally fall back to browser language
  const userLocale = getBrowserLanguage();
  return supportedLocales.includes(userLocale) ? userLocale : 'en';
};

// Add information about available languages
const languageData = {
  en: { language: 'English' },
  sv: { language: 'Svenska' }
};

// Function to get language name
function getLanguageName(localeCode) {
  return languageData[localeCode]?.language || localeCode;
}

// Export everything needed by the app
export {
  loadTranslations,
  locale,
  t,
  setLocale,
  detectLocale,
  languageData,
  getLanguageName,
  currentRoute,
  translations,
  isLocaleLoaded,
  translationsLoaded,
  translationsLoading,
  supportedLocales
};
