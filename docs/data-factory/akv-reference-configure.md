---
title: Configure AKV references
description: How to configure Azure Key Vault reference in Microsoft Fabric
ms.author: adityajain2408
author: adityajain2408
ms.topic: how-to
ms.date: 04/28/2025
ms.search.form: Configure Azure Key Vault references
---

## Create an Azure Key Vault Reference

1. Lauch [fabric.microsoft.com](fabric.microsoft.com) and click the top-right gear icon and navigate to “Manage Connections and Gateways” page. 
2. Go to the “Azure Key Vault references” tab and click “New”.
    :::image type="content" source="media/akv-reference/new-akv-reference.png" alt-text="Screenshot showing how to create a new AKV reference.":::

3. Enter the Reference Alias (AKV reference name assigned in Fabric, it can be changed later) and the Account name (Key Vault name in Azure).
4. Use OAuth 2.0 to authenticate to connect to your key vault.
5. Click the ‘Create’ button and check its status to verify if it is online and connected to the key vault.

## Use Azure Key Vault reference in connections



## Related content
- [Azure Key Vault Reference Overview(../azure-key-vault-reference-overview.md)