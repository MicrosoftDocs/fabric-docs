---
title: Authenticate with Microsoft Fabric workspace identity
description: This article describes how to authenticate using workspace identity. 
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.subervice: security
ms.topic: how-to #Don't change
ms.date: 08/14/2024

#customer intent: As a data owner, I want to authenticate using workspace identity so that my Fabric items can connect with data sources securely.

---

# Authenticate with workspace identity

[Introduce and explain the purpose of the article.]

<!-- Required: Introductory paragraphs (no heading)

Write a brief introduction that can help the user
determine whether the article is relevant for them
and to describe the task the article covers.

-->

## Step 1: Create the workspace identity

You must be a workspace admin to be able to create and manage a workspace identity. 

1. Navigate to the workspace and open the workspace settings.

1. Select the **Workspace identity** tab.

1. Select the **+ Workspace identity** button.

When the workspace identity has been created, the tab displays the workspace identity details and the list of authorized users.

Workspace identity can be [created and deleted by workspace admins](/fabric/security/workspace-identity). The workspace identity has the workspace contributor role on the workspace. Admins, members, and contributors in the workspace can configure the identity as authentication method in ADLS gen2 shortcuts.

## Step 2: Grant the identity permissions on the storage account

1. Sign in to the Azure portal and navigate to the storage account you want to access from OneLake.

1. Select the Access control (IAM) tab on the left sidebar and select **Role assignments**.

1. Select the **Add** button and select **Add role assignment**.

1. Select the role you want to assign to the identity, such as *Storage Blob Data Reader* or *Storage Blob Data Contributor*.

    > [!NOTE]
    > The role must be provided at the Storage account level.

1. Select **Assign access to User, group, or service principal**.

1. Select **+ Select members**, and search by name or app ID of the workspace identity. Select the identity associated with your workspace.

1. Select **Review + assign** and wait for the role assignment to be completed.

## Step 3: Create the Fabric item

### OneLake shortcut

Follow the steps listed in [Create an Azure Data Lake Storage Gen2 shortcut](../onelake/create-adls-shortcut.md#create-a-shortcut). Select workspace identity as the authentication method (supported only for ADLS gen2).

### Data pipelines with Copy, Lookup and GetMetadata activities

Follow the steps listed in [Module 1 - Create a pipeline with Data Factory](../data-factory/tutorial-end-to-end-pipeline.md) to create the data pipeline. Select workspace identity as the authentication method (supported only for ADLS gen2 and for Copy, Lookup, and GetMetadata activities)

> [!NOTE]
> The user creating the shortcut with workspace identity must have an admin, member or contributor role in the workspace. Users accessing the shortcuts only need permissions on the lakehouse.

## Known issues:
   
* [Bug 1451995](https://powerbi.visualstudio.com/Trident/_workitems/edit/1451995): Write to shortcut destination fails when using workspace identity as auth method
   
* [Bug 1452009](https://powerbi.visualstudio.com/Trident/_workitems/edit/1452009): Error when adding table to a report. SQL endpoint is on a lakehouse that has shortcut with workspace identity authentication.

## Considerations and limitations

* Workspace identity can be created in workspaces associated with any capacity (except for My workspaces).

* Trusted workspace access to firewall-enabled Storage accounts are supported in any F capacity.

* We plan to add support for additional Fabric items such as semantic models, data pipelines, and dataflow gen2. We also plan to add support for additional connectors.

* Support for workspace identity authentication in Pipeline scope activity will be added in the future.

* You can create ADLS gen 2 connections with workspace identity auth in Manage Gateways and Connections experience. 

* Connections with workspace identity auth can only be used in shortcuts and data pipelines 

## Related content

* [Workspace identity](./workspace-identity.md)
* [Trusted workspace access](security-trusted-workspace-access.md)
* [Fabric identities](../admin/fabric-identities-manage.md)