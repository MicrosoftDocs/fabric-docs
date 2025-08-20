---
title: Manage Azure connections
description: Learn how to manage your organization's Fabric connections to Azure services.
author: msmimart
ms.author: mimart
ms.reviewer: ''

ms.custom:
  - admin-portal
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Administration
---

# Manage Azure connections

The Azure connections admin settings connect Azure services to Fabric. Using these settings, you can store your dataflows in your organization's Azure Data Lake Storage Gen2 (ADLS Gen2) account. You can review the benefits of this approach in [Reasons to use the ADLS Gen 2 workspace or tenant connection](/power-bi/transform-model/dataflows/dataflows-azure-data-lake-storage-integration#reasons-to-use-the-adls-gen-2-workspace-or-tenant-connection). Workspace-level Log Analytics enables administrators and workspace owners to configure a Log Analytics connection to collect usage and performance logs for the workspace. You can review [how the integration between Log Analytics and Power BI works](/power-bi/transform-model/log-analytics/desktop-log-analytics-overview).

The Azure connections admin settings have the following options:

* [Tenant-level storage](#tenant-level-storage) - Use to store dataflows in your organizations tenant settings. This setting can be configured if you want a central Data Lake storage place, or as a default storage place in addition to workspace level storage.

* [Workspace-level storage permissions](#workspace-level-storage-permissions) - Use to store dataflows in specific ADLS Gen 2 accounts, organized per workspace.

* [Workspace-level Log Analytics permissions](#Workspace-level-Log-Analytics-permissions) - Use to configure activity logging in Log Analytics.

To learn how to access the Fabric admin portal settings, see [What is the admin portal?](admin-center.md)

## Tenant-level storage

By default, data used with Power BI is stored in internal storage provided by Power BI. With the integration of dataflows and Azure Data Lake Storage Gen2 (ADLS Gen2), you can store your dataflows in your organization's Azure Data Lake Storage Gen2 account. Storing dataflows in Azure Data Lake allows you to access them using the Azure portal, Azure Storage Explorer, and Azure APIs. For more information, see [Configuring dataflow storage to use Azure Data Lake Gen 2](/power-bi/transform-model/dataflows/dataflows-azure-data-lake-storage-integration).

## Workspace-level storage permissions

By default, workspace admins can't connect their own storage account. This feature lets Fabric administrators turn on a setting that allows workspace admins to connect their own storage account.

To activate this feature, go to **Admin portal > Azure connections > Connect to Azure resources > Workspace-level storage permissions**, and check the **Allow workspace admins to connect their own storage account** checkbox.

  :::image type="content" source="media/service-admin-portal-azure-connections/connect-own-storage-account-switch.png" alt-text="Screenshot of the Azure connections settings page showing the Allow workspace admins to connect their own Log Analytics workspace checkbox.":::

## Workspace-level Log Analytics permissions 

Fabric administrators can find and configure activity logging in **Tenant settings > Audit and usage settings > Azure Log Analytics connections for workspace administrators**. For more information, see [Allow workspace level logging from the admin portal](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure #allow-workspace-level-logging-from-the-admin-portal)

## Related content

- [What is the admin portal?](admin-center.md)
- [Configuring dataflow storage to use Azure Data Lake Gen 2](/power-bi/transform-model/dataflows/dataflows-azure-data-lake-storage-integration)

