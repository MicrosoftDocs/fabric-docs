---
title: Sensitivity label inheritance from data sources in Power BI
description: Learn how Power BI semantic models can inherit sensitivity labels from data sources.
author: paulinbar
ms.author: painbar
ms.service: powerbi
ms.subservice: powerbi-eim
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 03/28/2024
LocalizationGroup: Data from files
---

# Sensitivity label inheritance from data sources

Power BI semantic models that connect to sensitivity-labeled data in supported data sources can inherit those labels, so that the data remains classified and secure when brought into Power BI.

Currently supported data sources:
* Excel files stored on OneDrive or SharePoint Online*
* Azure Synapse Analytics (formerly SQL Data Warehouse)
* Azure SQL Database

*Inheritance from Excel files requires specific configuration and isn't supported for Excel files stored behind a gateway, such as files stored locally. See [Sensitivity label inheritance from Excel files](#sensitivity-label-inheritance-from-excel-files) for more detail.

To be operative, [sensitivity label inheritance from data sources must be enabled on the tenant](../admin/service-admin-portal-information-protection.md#apply-sensitivity-labels-from-data-sources-to-their-data-in-power-bi).

## Requirements
* The data in the data source must be labeled with sensitivity labels from Microsoft Purview Information Protection.
  For Azure Synapse Analytics and Azure SQL Database, this is accomplished using a two-step Purview flow:
  1. [Automatically apply sensitivity labels to your data](/azure/purview/create-sensitivity-label).
  1. [Classify your Azure SQL data using Azure Purview labels](/azure/sql-database/scripts/sql-database-import-purview-labels).

* The scope of the labels must be **Files and emails** and **Azure Purview assets**. See [Extending sensitivity labels to Azure Purview](/azure/purview/create-sensitivity-label#extending-sensitivity-labels-to-azure-purview) and [Creating new sensitivity labels or modifying existing labels](/azure/purview/create-sensitivity-label#creating-new-sensitivity-labels-or-modifying-existing-labels).
  
* [Sensitivity labels must be enabled in Power BI](/power-bi/enterprise/service-security-enable-data-sensitivity-labels).

* A Power BI Pro or Premium Per User (PPU) license is required for the user whose credentials are used to connect to the data source. In addition, [all other conditions for applying a label must be met](/power-bi/enterprise/service-security-apply-data-sensitivity-labels#apply-sensitivity-labels-in-the-power-bi-service).

* The **[Apply sensitivity labels from data sources to their data in Power BI](../admin/service-admin-portal-information-protection.md#apply-sensitivity-labels-from-data-sources-to-their-data-in-power-bi)** tenant admin setting must be enabled. This requirement applies to the Power BI service only. In Desktop, a *.pbix* file inherits the label from the data source even if the tenant admin setting is off. However, after publishing to the service, upon refresh, changes to the label in the data source are only inherited by the report and semantic model if the setting is enabled. 

## Inheritance behavior
* In the Power BI service, when the semantic model is connected to the data source, Power BI inherits the label and applies it automatically to the semantic model. After, inheritance occurs upon semantic model refresh. In Power BI Desktop, when you connect to the data source via **Get data**, Power BI inherits the label and automatically applies it to the *.pbix* file (both the semantic model and report). Subsequently inheritance occurs upon refresh. 
* If the data source has sensitivity labels of different degrees, the most restrictive is chosen for inheritance. In order to be applied, that label (the most restrictive) must be published for the semantic model owner.
* Labels from data sources never overwrite manually applied labels.
* Less restrictive labels from the data source never overwrite more restrictive labels on the semantic model.
* In Desktop, if the incoming label is more restrictive than the label that is currently applied in Desktop, a banner appears that recommends to the user to apply the more restrictive label.
* Semantic model refresh succeeds even if for some reason the label from the data source isn't applied.

>[!NOTE]
> No inheritance takes place if the semantic model owner isn't authorized to apply sensitivity labels in Power BI, or if the specific label in question hasn't been published for the semantic model owner.

## Sensitivity label inheritance from Excel files

Sensitivity label inheritance from an Excel file is supported for Excel files stored on OneDrive or SharePoint Online.

To make sure sensitivity label inheritance from an Excel file works:

1. Store the Excel file on OneDrive or SharePoint Online.

1. In Power BI Desktop, connect to the Excel file using the web connector, as described in [Use OneDrive for work or school links in Power BI Desktop](/power-bi/connect-data/desktop-use-onedrive-business-links). The process described in that article applies to both OneDrive and SharePoint Online.

1. After publishing the semantic model, to enable refresh, reconfigure the authentication credentials for the semantic model, also as described in the above article. Be sure to select **OAuth2** as the authentication method, otherwise you might encounter an error when you attempt to connect or refresh.

## Considerations and limitations

* Inheritance from data sources is supported only for semantic models with enhanced metadata. See [Using enhanced semantic model metadata](/power-bi/connect-data/desktop-enhanced-dataset-metadata) for more information.
* Inheritance from data sources is supported only for semantic models using the Import data connectivity mode. Live connection and DirectQuery connectivity isn't supported.
* Inheritance from data sources isn't supported in connections via gateways or Azure Virtual Network (VNet). This means that inheritance from an Excel file located on a local machine doesn't work, because it requires a gateway. 

## Related content

* [Enable sensitivity label inheritance from data sources](../admin/service-admin-portal-information-protection.md#apply-sensitivity-labels-from-data-sources-to-their-data-in-power-bi)
* [Sensitivity label overview](/power-bi/enterprise/service-security-sensitivity-label-overview)
