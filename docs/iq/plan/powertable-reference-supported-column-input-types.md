---
title: Supported Column Types, Input Types and Attachment File Types
description: Learn about the supported column types that you can add to the PowerTable sheet and the supported input and attachment types for the columns.
ms.date: 06/29/2026
ms.topic: reference
ai-usage: ai-assisted
#customer intent: As a user, I want to know about the supported column types that I can insert in the PowerTable sheet as well as the supported input and attachment types for the columns.
---

# Supported column and input types

This article lists the supported column types that you can add to a PowerTable sheet, the supported input types for database columns, and the supported attachment file types for attachment columns.

## Supported column types

PowerTable supports the following column types to add to your table:

| Column type | Description |
| --- | --- |
| Attachment | An attachment column attaches one or more files directly to your PowerTable records. For supported attachments, see [Supported file types for attachment](#supported-file-types-for-attachment-columns). |
| Button | The button field adds interactivity to your record. Create clickable buttons to open a URL or run a defined action. |
| Database | A database column is created directly in the underlying database table to store data. It supports all standard SQL data types, including numeric, text, character, date, and time data types. For the supported input types for these data types, see [Supported input types](#supported-input-types). |
| Formula | Formulas calculate values for each record by using data from other cells in the same record. For the formulas list, see [Formula syntax](./planning-reference-formulas/math-functions/arithmetic-functions.md). |
| Multi-select | A multi-select field lets you select multiple values from a predefined list for each record. Unlike a single-select field, which permits only one selection, a multi-select field supports multiple selections from other related records. |
| Reference | A reference column links each record to a related record in another table, so you can work with related data across tables. |
| Relation | A relation column shows the linked records for each record in a parent-child structure. |
| Rollup | A rollup field aggregates values from related records and performs calculations on those values. Use rollup fields to summarize data from linked records, such as counts, sums, averages, minimums, or maximums. |

## Supported input types

PowerTable supports the following column input types:

| Column type | Description |
| --- | --- |
| Checkbox | A checkbox field can be used to indicate true/false values or a toggle within a record. If a column has only two distinct values, you can convert them to a checkbox column. |
| Currency | A currency field is a specific type of number field that formats the number as a currency amount with the appropriate prefix. |
| Date time | A date time field stores a date and, optionally, a time in a cell. Select a cell in this column, and then use the date picker to select a specific date and time. |
| Decimal | The decimal type column stores decimal and float values, such as product cost or price. |
| Email | An email field stores a single email address in each cell. |
| Image | An image field stores a single image URL for each record and displays a thumbnail of the image in each cell. |
| Number | The number field holds whole numerical values, such as the number of stocks available or the number of employees. |
| Percent | The percent field is a float or decimal type that stores numerical values formatted as percentages. All values in a percent field are represented as fractions of 100 with the percent sign. For example, the number 0.75 in a percent field is represented as 75%. |
| Percent complete | The percent complete column is a number column that contains whole numbers. This column adds a percent symbol to the existing values and displays it as a slider, so you can easily visualize the progress of the project. |
| Person | A person field stores a single user's email address in each cell, either as the person's name or email ID. When you select this type of cell, you see a drop-down list of all users in your organization's Microsoft Entra ID. |
| Phone number | A phone number field converts a string of numbers into a phone number based on the country that you select. You can enter up to 15 digits. |
| Rating | The rating field is a number field that assigns ratings to your records for ranking or quality assessment. Three style formats are available, with ratings up to a 10-point scale. |
| Single-select | A single-select field is ideal when you want to select a single option from a preset list of options. You can configure the list of options manually, select from the existing options, or retrieve it from a lookup table. |
| Text | The text field holds a variable-length string of characters, including letters, numbers, and special symbols. Examples include product SKUs, employee names, and details or descriptions. |
| URL | A URL field stores a single URL in each cell. Selecting a URL takes you to the corresponding webpage. |

## Supported file types for attachment columns

PowerTable supports the following file types in attachment columns:

| File extension | Description  | MIME type    |
| --- | --- | --- |
| aac            | AAC Audio                             | `audio/aac`                                                                 |
| avi            | AVI Video                             | `video/x-msvideo`                                                           |
| bmp            | Bitmap Image                          | `image/bmp`                                                                 |
| csv            | Comma-Separated Values                | `text/csv`                                                                  |
| log            | Log File                              | `text/plain`                                                                |
| doc            | Microsoft Word Document               | `application/msword`                                                        |
| docm           | Word Macro-Enabled Document           | `application/vnd.ms-word.document.macroEnabled.12`                          |
| docx           | Microsoft Word Document (Open XML)    | `application/vnd.openxmlformats-officedocument.wordprocessingml.document`   |
| eot            | Embedded OpenType Font                | `application/vnd.ms-fontobject`                                             |
| epub           | EPUB eBook                            | `application/epub+zip`                                                      |
| gif            | GIF Image                             | `image/gif`                                                                 |
| gz             | Gzip Archive                          | `application/gzip`                                                          |
| ico            | Icon                                  | `image/vnd.microsoft.icon`                                                  |
| ics            | iCalendar File                        | `text/calendar`                                                             |
| jpg            | JPEG Image                            | `image/jpeg`                                                                |
| jpeg           | JPEG Image                            | `image/jpeg`                                                                |
| json           | JSON File                             | `application/json`                                                          |
| mid            | MIDI Audio                            | `audio/midi`                                                                |
| midi           | MIDI Audio                            | `audio/midi`                                                                |
| mp3            | MP3 Audio                             | `audio/mpeg`                                                                |
| mp4            | MPEG-4 Video                          | `video/mp4`                                                                 |
| mpeg           | MPEG Video                            | `video/mpeg`                                                                |
| oga            | Ogg Audio                             | `audio/ogg`                                                                 |
| ogv            | Ogg Video                             | `video/ogg`                                                                 |
| ogx            | Ogg Container                         | `application/ogg`                                                           |
| one            | Microsoft OneNote                     | `application/onenote`                                                       |
| opus           | Opus Audio                            | `audio/opus`                                                                |
| otf            | OpenType Font                         | `font/otf`                                                                  |
| pdf            | PDF Document                          | `application/pdf`                                                           |
| pbix           | Power BI Desktop Report               | `application/zip`*                                                          |
| png            | PNG Image                             | `image/png`                                                                 |
| ppsm           | PowerPoint Macro-Enabled Slideshow    | `application/vnd.ms-powerpoint.slideshow.macroEnabled.12`                   |
| ppsx           | PowerPoint Slideshow (Open XML)       | `application/vnd.openxmlformats-officedocument.presentationml.slideshow`    |
| ppt            | Microsoft PowerPoint Presentation     | `application/vnd.ms-powerpoint`                                             |
| pptm           | PowerPoint Macro-Enabled Presentation | `application/vnd.ms-powerpoint.presentation.macroEnabled.12`                |
| pptx           | PowerPoint Presentation (Open XML)    | `application/vnd.openxmlformats-officedocument.presentationml.presentation` |
| pub            | Microsoft Publisher Document          | `application/vnd.ms-publisher`                                              |
| rar            | RAR Archive                           | `application/vnd.rar`                                                       |
| rpmsg          | Microsoft Outlook Protected Message   | `application/vnd.ms-outlook`                                                |
| rtf            | Rich Text Format                      | `application/rtf`                                                           |
| svg            | Scalable Vector Graphics              | `image/svg+xml`                                                             |
| tar            | TAR Archive                           | `application/x-tar`                                                         |
| tif            | TIFF Image                            | `image/tiff`                                                                |
| tiff           | TIFF Image                            | `image/tiff`                                                                |
| ttf            | TrueType Font                         | `font/ttf`                                                                  |
| txt            | Plain Text                            | `text/plain`                                                                |
| vsd            | Microsoft Visio Drawing               | `application/vnd.visio`                                                     |
| wav            | WAV Audio                             | `audio/wav`                                                                 |
| weba           | WebM Audio                            | `audio/webm`                                                                |
| webm           | WebM Video                            | `video/webm`                                                                |
| webp           | WebP Image                            | `image/webp`                                                                |
| wma            | Windows Media Audio                   | `audio/x-ms-wma`                                                            |
| wmv            | Windows Media Video                   | `video/x-ms-wmv`                                                            |
| woff           | Web Open Font Format                  | `font/woff`                                                                 |
| woff2          | Web Open Font Format 2                | `font/woff2`                                                                |
| xls            | Microsoft Excel Workbook              | `application/vnd.ms-excel`                                                  |
| xlsb           | Excel Binary Workbook                 | `application/vnd.ms-excel.sheet.binary.macroEnabled.12`                     |
| xlsm           | Excel Macro-Enabled Workbook          | `application/vnd.ms-excel.sheet.macroEnabled.12`                            |
| xlsx           | Excel Workbook (Open XML)             | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`         |
| xml            | XML Document                          | `application/xml`                                                           |
| 3gp            | 3GPP Video                            | `video/3gpp`                                                                |
| 3g2            | 3GPP2 Video                           | `video/3gpp2`                                                               |
| 7z             | 7-Zip Archive                         | `application/x-7z-compressed`                                               |
| zip            | ZIP Archive                           | `application/zip`                                                           |

> [!NOTE]
> \* `.pbix` files are ZIP-based containers. There's no officially registered MIME type for Power BI Desktop report files, so `application/zip` is commonly used for file detection and upload scenarios.
