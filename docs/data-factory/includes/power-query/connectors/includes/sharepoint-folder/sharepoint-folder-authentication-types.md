---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sharepoint-folder/sharepoint-folder-authentication-types.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

The SharePoint Folder connector supports the following authentication methods, depending on the hosting experience:

- **Organizational account**: Uses a user’s Microsoft Entra ID to authenticate to SharePoint.
- **Workspace identity**: In **Microsoft Fabric**, supported experiences (such as **Dataflows Gen2** and **Power BI**) can authenticate to **SharePoint Files** using **workspace identity**. This enables Fabric to access SharePoint file content using the workspace’s managed identity, without relying on user credentials or legacy ACS-based authentication.
