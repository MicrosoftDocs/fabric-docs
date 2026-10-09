---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/google-sheets/google-sheets-limitations-and-considerations-include.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

This section describes any limitations or considerations of the Google Sheets connector.

### Shared drive support

This connector does support connecting to shared drives.

### Multiple connections

This connector uses a different ResourcePath for every Google Sheet URL. You'll need to authenticate to every new resource path and URL, but you might not need to sign into Google multiple times if the previous sessions remain active.

### Understanding URL parsing

The connector first checks for the signature of the URL, ensuring it starts with `https://docs.google.com/spreadsheets/d/`. The connector then parses the Google Spreadsheet ID from the URL to include in the Google Sheets API call. The rest of the URL isn't used. Each Google Sheet connection is tied to the submitted URL, which will act as the ResourcePath.
