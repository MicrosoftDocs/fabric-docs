---
title: Azure Key Vault Reference overview
description: Learn about Azure Key Vault Reference in Microsoft Fabric
ms.author: adityajain2408
author: adityajain2408
ms.topic: overview
ms.date: 04/28/2025
ms.search.form: Azure Key Vault Reference overview
---

[Azure Key Vault (AKV)](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) is Microsoft’s cloud service for storing secrets, keys, and certificates centrally, so that applications never need to embed credentials in code or configuration. **Azure Key Vault** references extend this model to Microsoft Fabric. Instead of pasting passwords or connection strings into Fabric, you create a reference to the secret that lives in your vault; Fabric fetches the value just-in-time whenever a data connection in Fabric workloads needs it. 

## How Azure Key Vault references work
When you add an Azure Key Vault reference in Fabric, the service records the vault URI and the secret name by using Azure Entra ID OAuth 2.0 consent. During the consent flow, you grant Fabric’s system-assigned managed identity **Get** and **List** permissions on the specified secrets; the secret values themselves never leave the key vault. 

Since Fabric stores only an encrypted access token—no secret material is written to disk or sent through the browser. At run time, the Fabric connector’s engine resolves the reference, retrieves the current secret value, and inserts it into the connector’s connection string entirely in memory. The secret is held just long enough to establish the connection and is then discarded 

## Prerequisites

1. A Microsoft Fabric tenant account with an active subscription. [Create an account for free](https://learn.microsoft.com/en-us/fabric/fundamentals/fabric-trial).
2. You need an [Azure subscription](https://azure.microsoft.com/free/) with [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/quick-create-portal) resource to test this feature.
3. Read the [Azure Key Vault quick start guide on learn.microsoft.com](https://learn.microsoft.com/en-us/azure/key-vault/secrets/quick-create-portal) to learn more about creating an AKV resource.

## Supported connectors and authentication types
| Supported Connector | Category | Account key | Basic (Username/Password) | Token (Shared Access Signature or Personal Access Token) | Service Principal |
| --- | --- | --- | --- | --- | --- |
| [:::image type="icon" source="media/data-pipeline-support/blobs-64.png":::<br/>**Azure Blob<br/>Storage**](connector-azure-blob-storage-copy-activity.md) | **Azure** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/yno.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/yes.png" | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/yes.png" |



## Limitations and considerations

- Only cloud connections are supported.
- VNET and On-premises Data Gateways are not supported currently.
- Lineage view for AKV references are not supported.
- You can’t create or use AKV references using the Modern “Get Data” UI in Fabric artifacts.
- Credential versioning is not supported with AKV references; currently, only the latest credentials are retrieved via AKV references.

## Related Content
