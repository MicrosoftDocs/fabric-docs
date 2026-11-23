---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/impala-database/impala-database-limitations-and-considerations-include.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

Here are a few considerations and limitations to keep in mind with the Impala connector:

* The Impala connector is supported on the on-premises data gateway, using any of the three supported authentication mechanisms.
* The Impala connector uses the Impala driver, which limits the size of string types to 32 K by default.
* The Impala connector doesn't support overriding the **Realm** option for Kerberos authentication.
