---
title: Localize Your Workload
description: Learn how you can localize your workload and support various languages in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom:
ms.date: 08/14/2024
---

# Localize your workload

Localization is the process of adapting a product to serve other markets by changing the language or the content. Localizing your workload enables you to reach a wider audience and provide your customers with the best, most personalized experience. For example, a localized workload is more attractive to a user whose default language isn't English in the Microsoft Fabric workload hub.

The following image shows an example of a localized workload in the workload hub.

:::image type="content" source="./media/localization/workload-hub-in-spanish.png" alt-text="Screenshot of a sample product localized to Spanish." lightbox="./media/localization/workload-hub-in-spanish.png":::

For a Fabric workload, localization involves two aspects:

* Translating text within the iframe, independently of the Fabric shell, by using [the Fabric portal language](#language-of-the-fabric-portal).
* Enabling the translation of keywords that are used in the Fabric shell, such as the workload name, item names, and workload descriptions. These strings are currently found directly in the manifest files (`product.json` and `item.json`).

  For a description of all the strings that are localized, see [Localization targets](#localization-targets) later in this article.

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

All strings in the manifest must be replaced with keys. A value for each key is in a separate file.

For example, if your `product.json` manifest previously started as follows:

```json
{
    "name": "Product",
    "displayName": "Fabric Sample Workload",
    "fullDisplayName": "Fabric Sample Workload",
    "description": "Sample Workload Description",
    "favicon": "assets/briefcase.png",
    "icon": {
      "name": "assets/briefcase.png"
    },
    "homePage": {
...
```

Your `product.json` manifest should now be something like this example:

```json
{
    "name": "Product",
    "displayName": "Workload_Display_Name",
    "fullDisplayName": "Workload_Display_Name_Full",
    "description": "Workload_Description",
    "favicon": "assets/images/briefcase.png",
    "icon": {
      "name": "assets/images/briefcase.png"
    },
    "homePage": {
        ...
```

To support localization, your package must have the following structure:

```
FE/
└── assets/
    ├── images/
    |   └── # the images and icons that were previously under the assets folder directly
    └── locales/
        ├── en-US/
        |   └── translations.json
        ├── es/
        |   └── translations.json
        ├── de/
        |   └── translations.json
        ├── fr/
        |   └── translations.json
        └── # more locales
```

Each locale has its own folder under `assets/locales`. Each locale contains a single file, `translations.json`. This file contains a dictionary of key/value pairs. For example, the `translations.json` file for English could contain:

```json
{
    "Workload_Display_Name" : "Fabric Sample Workload",
    "Workload_Display_Name_Full" : "Fabric Sample Workload",
    "Workload_Description": "Sample Workload Description"
}
```

Whereas the translation.json file for Spanish could contain:

```json
{
    "Workload_Display_Name" : "Carga de trabajo de muestra",
    "Workload_Display_Name_Full" : "Carga de trabajo de muestra",
    "Workload_Description": "Descripción del producto"
}
```

## Default behavior

* As previously stated, the only required language for a localized workload is English.
* If a workload is localized, *all* of the localization targets must be provided as keys in the `translations.json` file for English.
* Other provided languages aren't required to translate all keys. Any keys that are left untranslated default to the provided English translation. For example, if your workload name should always be in English, you don't need to provide a translation in any other language.
* Fabric supports both localized and unlocalized workloads. If any image files are *directly* in the `assets` folder, the assumption is that the workload is unlocalized.
* For a workload to be treated as localized, it must have only two subdirectories in the `assets` folder: `images` and `locales`. No other files can be in the `assets` folder.

## Localization targets

All of the following properties are localized: `displayName`, `fullDisplayName`, `displayNamePlural`, `description`, `introduction`, `title`, `tooltip`, and `slogan`.

In the product and item manifest files, those properties correspond to the following attributes:

Name                                            | Schema in manifest                           | Description
----------------------------------------------------|--------------------------------------------------|----------------
Item display name                                   | `item.displayName`                                 | The display name of the item that's displayed in most contexts
Plural item display name                            | `item.displayNamePlural`                           | The pluralized name of the item
Context menu item display name                      | `item.contextMenuItems.displayName`                | If the item has a context menu entry, such as a shortcut for running a job, the display name of the entry
Context menu item tooltip                           | `item.contextMenuItems.tooltip`                    | If the item has a context menu entry, the tooltip that appears when it's hovered over
Quick action item display name                      | `item.quickActionItems.displayName`                | If the item has a quick action, such as a shortcut for running a job, the display name of the action
Quick action item tooltip                           | `item.quickActionItems.tooltip`                    | If the item has a quick action, the tooltip that appears when it's hovered over
Product display name                                | `product.displayName`                              | The workload display name that appears in most contexts
Full product display name                           | `product.fullDisplayName`                          | The full workload display name
Product description                                 | `product.description`                              | The description that appears on the home page of the workload
Learning material card title                        | `product.homePage.learningMaterials[].title`       | The title of a learning materials card on the workload home page
Learning material card description                  | `product.homePage.learningMaterials[].description` | The description on a learning materials card on the workload home page
Learning material card introduction                 | `product.homePage.learningMaterials[].introduction`| The introduction of a learning materials card on the workload home page (appears under the title)
Custom action title                                 | `product.homePage.newSection.customActions[].title`| The title of a custom action card on the home page
Create experience description                       | `product.createExperience.description`             | The description that appears in the create hub
Create card title                                   | `product.createExperience.cards[].title`           | The title of a create card
Create card description                             | `product.createExperience.cards[].description`     | The description of a create card
Workload hub slogan                                 | `product.productDetail.slogan`                     | The slogan that appears on the workload page in the workload hub
Workload hub description                            | `product.productDetail.description`                | The product description that appears on the workload page in the workload hub

## Language of the Fabric portal

The `workloadClient` code [provides an API](/javascript/api/@ms-fabric/workload-client/settingsapi) to retrieve the workload settings, which contain the current language of the Fabric portal. For example:

```javascript
export async function callLanguageGet(workloadClient: WorkloadClientAPI): Promise<string> {
    const settings = await workloadClient.settings.get();
    return settings.currentLanguageLocale;
}
```

With the provided `currentLanguageLocale` code, you can proceed to localize your workload by using any framework that you want. For example, the sample workload repo uses the library [i18next](https://www.i18next.com/) to translate the contents of a message bar that notifies the user of the current language.
