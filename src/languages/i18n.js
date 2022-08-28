import i18next from 'i18next';
import en from "./en.json";
import vi from "./vi.json";
import {initReactI18next} from 'react-i18next';
import {LANGUAGE_EN} from '../utils/constants';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
        return LANGUAGE_EN;
    },
    init: () => {

    },
    cacheUserLanguage: (user) => {

    }
}

i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: LANGUAGE_EN,
        lng: LANGUAGE_EN,
        resources: {
            vi: {
                translation: vi
            },
            en: {
                translation: en
            },
        },
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    })

export default i18next;
