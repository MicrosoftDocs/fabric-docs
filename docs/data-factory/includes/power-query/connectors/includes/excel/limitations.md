---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/excel/excel-limitations-and-considerations-include.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

* Power Query Online and Power Query in Excel are unable to access encrypted Excel files. Since Excel files labeled with sensitivity types other than "Public" or "Non-Business" are encrypted, they aren't accessible through Power Query Online or Power Query in Excel.
* Power Query Online doesn't support password-protected Excel files.
* When connecting to an Excel workbook on a network share, use the fully qualified domain name (FQDN) path (for example, `\\ServerName.domain.com\FolderName\File.xlsx`) instead of a short server name. Using a short name can cause refresh failures after publishing to the Power BI service.
* The [Excel.Workbook](/powerquery-m/excel-workbook) `useHeaders` option converts numbers and dates to text using the current culture, and thus behaves differently when run in environments with different operating system cultures set. We recommend using [Table.PromoteHeaders](/powerquery-m/table-promoteheaders) instead.
