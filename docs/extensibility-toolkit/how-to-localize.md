---
title: How to localize your workload
description: Learn how you can localize your workload using the Fabric Extensibility Toolkit and support various languages in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/18/2025
---

# Localize your workload in Microsoft Fabric

Localization is the process of adapting a product to serve other markets by changing the language or the content. Localizing your workload enables you to reach a wider audience and provide your customers with the best, most personalized experience. For example, a localized workload is more attractive to a user whose default language isn't English in the Microsoft Fabric workload hub.

The Fabric Extensibility Toolkit comes pre-configured with localization support, including i18next setup and example translations in English and Spanish.

The following image shows an example of a localized workload in the workload hub.

:::image type="content" source="./media/how-to-localize/workload-hub-in-spanish.png" alt-text="Screenshot of a sample product localized to Spanish." lightbox="./media/how-to-localize/workload-hub-in-spanish.png":::

For a Fabric workload built with the Extensibility Toolkit, localization involves two distinct aspects:

* **Manifest localization**: Translating strings that are part of the Fabric shell experience (workload name, item names, descriptions, etc.). These are uploaded to Fabric as part of the manifest package and displayed in Fabric's UI outside the iframe.
* **App localization**: Translating text within your workload's iframe (your app's UI), which runs independently in the iframe using [i18next configuration](#app-level-localization-with-i18next).

These two localization systems work independently but together provide a complete localized experience.

## Supported languages

Fabric currently supports the following 44 languages:

Language code | Language
-----------------|-------------------------
ar               | العربية (Arabic)
bg               | български (Bulgarian)
ca               | català (Catalan)
cs               | čeština (Czech)
da               | dansk (Danish)
de               | Deutsche (German)
el               | ελληνικά (Greek)
en-US            | English (English)
es               | español (Spanish)
et               | eesti (Estonian)
eu               | Euskal (Basque)
fi               | suomi (Finnish)
fr               | français (French)
gl               | galego (Galician)
he               | עברית (Hebrew)
hi               | हिन्दी (Hindi)
hr               | hrvatski (Croatian)
hu               | magyar (Hungarian)
id               | Bahasa Indonesia (Indonesian)
it               | italiano (Italian)
ja               | 日本の (Japanese)
kk               | Қазақ (Kazakh)
ko               | 한국의 (Korean)
lt               | Lietuvos (Lithuanian)
lv               | Latvijas (Latvian)
ms               | Bahasa Melayu (Malay)
nb               | norsk (Norwegian)
nl               | Nederlands (Dutch)
pl               | polski (Polish)
pt-BR            | português (Portuguese - Brazil)
pt-PT            | português (Portuguese - Portugal)
ro               | românesc (Romanian)
ru               | русский (Russian)
sk               | slovenský (Slovak)
sl               | slovenski (Slovenian)
sr-Cyrl          | српски (Serbian - Cyrillic)
sr-Latn          | srpski (Serbian - Latin)
sv               | svenska (Swedish)
th               | ไทย (Thai)
tr               | Türk (Turkish)
uk               | український (Ukrainian)
vi               | tiếng Việt (Vietnamese)
zh-Hans          | 中国 (Chinese - Simplified)
zh-Hant          | 中國 (Chinese - Traditional)

You can choose to provide some or all of these languages. The only language that's required is English (US), because it's the default language of Fabric.

## Package structure

The Fabric Extensibility Toolkit uses two separate localization systems with different file locations:

### Manifest localization (uploaded to Fabric)

All strings in the manifest files must be replaced with keys. These translations are uploaded to Fabric as part of the manifest package and control how your workload appears in Fabric's shell UI (outside the iframe).

For example, if your `Product.json` manifest previously started as follows:

```json
{
    "name": "Product",
    "displayName": "Hello Fabric!",
    "fullDisplayName": "Hello Fabric!",
    "description": "See how to build, customize, and publish your first Fabric workload in minutes.",
    "favicon": "assets/images/HelloFabricWorkloadIcon.png",
    "icon": {
      "name": "assets/images/HelloFabricWorkloadIcon.png"
    },
    "homePage": {
...
```

Your `Product.json` manifest should now be something like this example:

```json
{
    "name": "Product",
    "displayName": "Workload_Display_Name",
    "fullDisplayName": "Workload_Full_Display_Name",
    "description": "Workload_Description",
    "favicon": "assets/images/HelloFabricWorkloadIcon.png",
    "icon": {
      "name": "assets/images/HelloFabricWorkloadIcon.png"
    },
    "homePage": {
        ...
```

### App localization (deployed with your workload)

Your workload app's UI strings are handled separately using i18next and are deployed with your workload application that runs in the iframe.

To support both localization systems in the Fabric Extensibility Toolkit, your package must have the following structure:

```text
Workload/
├── Manifest/
│   └── assets/
│       ├── images/
│       │   └── # Images and icons uploaded to Fabric with the manifest
│       └── locales/
│           ├── en-US/
│           │   └── translations.json  # Manifest strings (uploaded to Fabric)
│           ├── es/
│           │   └── translations.json
│           └── # More locales for manifest
└── app/
    ├── i18n.js  # i18next configuration for app UI
    └── assets/
        └── locales/
            ├── en-US/
            │   └── translation.json  # App UI strings (deployed with app)
            ├── es/
            │   └── translation.json
            └── # More locales for app UI
```

### Manifest translation files

Each locale has its own folder under `Manifest/assets/locales`. Each locale contains a single file, `translations.json`. This file contains a dictionary of key/value pairs for strings that appear in Fabric's shell UI (workload hub, create experience, etc.).

For example, the `translations.json` file for English could contain:

```json
{
    "Workload_Display_Name": "Hello Fabric!",
    "Workload_Full_Display_Name": "Hello Fabric!",
    "Workload_Description": "See how to build, customize, and publish your first Fabric workload in minutes.",
    "Workload_Hub_Workload_Slogan": "The fastest way to build, test, and publish your first Fabric workload.",
    "HelloWorldItem_DisplayName": "Hello World",
    "HelloWorldItem_DisplayName_Plural": "Hello Worlds",
    "HelloWorldItem_Description": "A Hello World Item to start your Dev Experience"
}
```

Whereas the translations.json file for Spanish could contain:

```json
{
    "Workload_Display_Name": "¡Hola Fabric!",
    "Workload_Full_Display_Name": "¡Hola Fabric!",
    "Workload_Description": "Vea cómo crear, personalizar y publicar su primera carga de trabajo de Fabric en minutos.",
    "Workload_Hub_Workload_Slogan": "La forma más rápida de crear, probar y publicar su primera carga de trabajo de Fabric.",
    "HelloWorldItem_DisplayName": "Hola Mundo",
    "HelloWorldItem_DisplayName_Plural": "Hola Mundos",
    "HelloWorldItem_Description": "Un artículo Hello World para comenzar su experiencia de desarrollo"
}
```

### App translation files

Your workload app uses separate translation files located at `app/assets/locales/[language]/translation.json`. These files contain strings for your app's UI that runs inside the iframe and are loaded dynamically by i18next.

## Default behavior

### Manifest localization behavior

* The only required language for manifest localization is English.
* If a workload manifest is localized, *all* of the translatable strings must be provided as keys in the `translations.json` file for English.
* Other provided languages aren't required to translate all keys. Any keys that are left untranslated default to the provided English translation. For example, if your workload name should always be in English, you don't need to provide a translation in any other language.
* Fabric supports both localized and unlocalized workloads. If any image files are *directly* in the `Manifest/assets` folder, the assumption is that the workload is unlocalized.
* For a workload to be treated as localized, it must have only two subdirectories in the `Manifest/assets` folder: `images` and `locales`. No other files can be in the `Manifest/assets` folder.

### App localization behavior

* Your app's i18next configuration determines which languages are supported for the iframe UI.
* App translations are loaded dynamically when your workload app runs in the iframe.
* The app can detect the Fabric portal language and adjust accordingly, but it operates independently from manifest localization.

## Language of the Fabric portal

The `workloadClient` code [provides an API](/javascript/api/@ms-fabric/workload-client/settingsapi) to retrieve the workload settings, which contain the current language of the Fabric portal. For example:

```javascript
export async function callLanguageGet(workloadClient: WorkloadClientAPI): Promise<string> {
    const settings = await workloadClient.settings.get();
    return settings.currentLanguageLocale;
}
```

## App-level localization with i18next

For localizing your workload's user interface, the Fabric Extensibility Toolkit uses [i18next](https://www.i18next.com/). The configuration is already set up in `Workload/app/i18n.js`:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en-US',
        supportedLngs: ['en-US', 'es', 'he'],
        debug: false,
        useSuspense: false,
        backend: {
            loadPath: "/assets/locales/{{lng}}/translation.json"
        }
    });

export default i18n;
```

### Adding new languages

To add support for additional languages:

1. **Update the i18n configuration**: Add your language code to the `supportedLngs` array in `app/i18n.js`
2. **Create manifest translation files**: Add `translations.json` files in `Workload/Manifest/assets/locales/[language-code]/` for Fabric shell strings
3. **Create app translation files**: Add `translation.json` files in `Workload/app/assets/locales/[language-code]/` for your app's UI strings

**Important**: The manifest translations are uploaded to Fabric with your manifest package, while the app translations are deployed with your workload application and loaded dynamically in the iframe.

### Using translations in React components

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
    const { t } = useTranslation();
    
    return (
        <div>
            <h1>{t('Welcome_Title')}</h1>
            <p>{t('Welcome_Description')}</p>
        </div>
    );
}
```

With the provided `currentLanguageLocale` from the workload settings, you can dynamically change the language or use it to customize your workload's behavior based on the user's preferred language.

## Key differences summary

Understanding the two localization systems is crucial for proper implementation:

Aspect | Manifest Localization | App Localization
-------|----------------------|------------------
**Location** | `Workload/Manifest/assets/locales/` | `Workload/app/assets/locales/`
**File name** | `translations.json` | `translation.json`
**Upload/Deploy** | Uploaded to Fabric with manifest package | Deployed with workload app to hosting location
**Controls** | Fabric shell UI (workload hub, create experience) | Your app's iframe UI
**Loading** | Loaded by Fabric when displaying manifest info | Loaded dynamically by i18next in iframe
**Examples** | Workload names, item descriptions, create cards | App buttons, forms, error messages, tooltips


