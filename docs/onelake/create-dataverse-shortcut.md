---
title: Create a Dataverse shortcut
description: Learn how to create a OneLake shortcut for Dataverse inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 11/20/2025
#customer intent: As a data engineer, I want to learn how to create a shortcut for Dataverse inside a Microsoft Fabric lakehouse so that I can easily access and manage my data within the lakehouse environment.
---

# Create a Dataverse shortcut

Dataverse direct integration with Microsoft Fabric enables organizations to extend their Dynamics 365 enterprise applications and business processes into Fabric. This integration is accomplished through shortcuts, which can be created in two ways: through the PowerApps maker portal, or through Fabric directly.

Dataverse shortcuts are read-only. They don't support write operations regardless of the user's permissions.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md).

## Create shortcuts through PowerApps maker portal

Authorized PowerApps users can access the PowerApps maker portal and use the **Link to Microsoft Fabric** feature. From this single action, a lakehouse is created in Fabric and shortcuts are automatically generated for each table in the Dataverse environment. 

For more information, see [Dataverse direct integration with Microsoft Fabric](https://go.microsoft.com/fwlink/?linkid=2245037).

## Create shortcuts through Fabric

Fabric users can also create shortcuts to Dataverse. When users create shortcuts, they can select **Dataverse**, supply their environment URL, and browse the available tables. This experience allows users to choose which tables to bring into Fabric rather than bringing in all tables.

> [!NOTE]
> Dataverse tables must first be available in the Dataverse Managed Lake before they're visible in the Fabric create shortcuts UX. If your tables aren't visible from Fabric, use the **Link to Microsoft Fabric** feature from the PowerApps maker portal.

## Authorization

Dataverse shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the Dataverse shortcut, and all access to that shortcut is authorized using that credential. The supported delegated credential types are organizational account (OAuth2) and Service Principal. The account must have the system administrator permission to access data in Dataverse Managed Lake.

## Limitations

The following limitations apply to Dataverse shortcuts:

* Dataverse shortcuts are read-only. They don't support write operations regardless of the user's permissions.