---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/dataflows/dataflows-limitations-and-considerations-include.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

- The Power Query Dataflows connector inside Excel doesn't currently support sovereign cloud clusters (for example, China, Germany, US).
- Consuming data from a dataflow gen2 with the dataflow connector requires Admin, Member, or Contributor permissions. Viewer permissions aren't sufficient and aren't supported for consuming data from the dataflow.
- The Power Platform Analytical Dataflows connector is available in Excel Desktop Version 2024 (Build 16.0.17932.20732) or newer. Older versions may display the connector but will lose connectivity starting June 2026. To update Office, [follow these steps](https://support.microsoft.com/en-us/office/how-to-update-microsoft-365-or-office-for-windows-2ab296f3-7f03-43a2-8e50-46de917611c5).
