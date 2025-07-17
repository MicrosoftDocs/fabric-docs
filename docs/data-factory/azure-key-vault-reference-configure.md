---
title: Configure AKV references
description: How to configure Azure Key Vault reference in Microsoft Fabric
ms.author: abnarain
author: nabhishek
ms.topic: how-to
ms.date: 04/28/2025
ms.search.form: Configure Azure Key Vault references
ms.custom: configuration
---
# Configure Azure Key Vault references
>[!NOTE]
>Azure Key Vault references in Fabric are available as a preview feature.

## Create an Azure Key Vault Reference

1. Launch [fabric.microsoft.com](https://app.fabric.microsoft.com/) and click the top-right gear icon and navigate to “Manage Connections and Gateways” page. 
2. Go to the “Azure Key Vault references” tab and click “New”.

    :::image type="content" source="media/akv-reference/new-azure-key-vault-reference.png" alt-text="Screenshot showing how to create a new AKV reference.":::

3. Enter the Reference Alias (AKV reference name assigned in Fabric, it can be changed later) and the Account name (Key Vault name in Azure).
4. Use OAuth 2.0 to authenticate to connect to your key vault.
5. Click the ‘Create’ button and check its status to verify if it is online and connected to the key vault.

    :::image type="content" source="media/akv-reference/created-azure-key-vault-reference.png" alt-text="Screenshot showing a new AKV reference created.":::

## Use Azure Key Vault reference in connections

Currently, the modern Get Data experience in Microsoft Fabric does not support creating connections by authenticating with Azure Key Vault references. 
However, you can create a connection using an Azure Key Vault reference through the Manage Connections and Gateways settings. To do so:

1. Click the top-right gear icon and go to “Manage Connections and Gateways” page. Go to the “Connections tab” and click “new” from the top left corner.   
2. Go to the “Cloud” tab, input connection name, select any [AKV reference supported connection type](../data-factory/azure-key-vault-reference-overview.md). 
3. Provide all connection details and select one of the supported authentication type: Basic (Username/password), Service Principal, SAS/PAT token, or Account Key.
4. Now, open the AKV reference list dialog by clicking on the 'AKV reference" icon next to the secret/password field.

    :::image type="content" source="media/akv-reference/azure-key-vault-reference-icon.png" alt-text="Screenshot showing the use AKV reference icon while creating a new connection.":::

5. Select an existing AKV reference, input secret name and click apply.

    :::image type="content" source="media/akv-reference/azure-key-vault-reference-list-dialog.png" alt-text="Screenshot showing AKV reference list dialog.":::

6. Once the connection is created using AKV authentication, use that existing connection to connect to your data source in Fabric items.

    :::image type="content" source="media/akv-reference/selected-azure-key-vault-reference.png" alt-text="Screenshot showing the selected AKV reference while creating a new connection.":::

## Related content

- [Azure Key Vault Reference Overview](../data-factory/azure-key-vault-reference-overview.md)
- [Data source management](data-source-management.md)
