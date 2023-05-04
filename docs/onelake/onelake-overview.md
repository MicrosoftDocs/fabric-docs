---
title: What is OneLake?
description: OneLake is included with every Microsoft Fabric tenant and is designed to be the single place for all your analytics data. Learn more.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: overview
ms.date: 05/23/2023
---

# OneLake overview

[!INCLUDE [preview-note](../includes/preview-note.md)]

OneLake is a single, unified, logical data lake for the whole organization. OneLake is the OneDrive for data. Like OneDrive, OneLake comes automatically with every Microsoft Fabric tenant and is designed to be the single place for all your analytics data. The key features of OneLake include:

- **Foundation of Fabric data services:** OneLake is provisioned automatically with every Fabric tenant.
- **Shortcuts:** Virtualize data across domains and clouds into a single logical data lake.
- **Open access:** OneLake supports Azure Data Lake storage (ADLS) Gen2 APIs and SDKs so your existing applications simply work. You aren't locked in to proprietary technologies or formats.
- **One copy:** Fabric data items store data natively in open-source formats, which allows you to access it across multiple analytical engines without data duplication.
- **One security:** Easily secure data in OneLake by granting access either directly to the data or by limiting access to specific query engines.

## OneLake: The foundation for Fabric

OneLake eliminates today’s pervasive and chaotic data silos by providing a data lake as a service without you needing to build it yourself and no infrastructure to manage. With everyone contributing to the same underlying data lake, the tenant administrator can unify management and governance policies across all teams and domains in an organization. Within a tenant, you can create any number of workspaces. Workspaces enable different parts of the organization to distribute ownership, with each workspace controlling its own access policies, region, and capacity for billing.

:::image type="content" source="media\onelake-overview\onelake-foundation-for-fabric-v-2.png" alt-text="Diagram showing the function and structure of OneLake." lightbox="media\onelake-overview\onelake-foundation-for-fabric-v-2.png":::

Within a workspace, you can create data items and all data in OneLake is accessed through data items. Similar to how Office stores Word, Excel, and PowerPoint files in OneDrive, Fabric stores lakehouses, warehouses, and other items in OneLake. Items can give tailored experiences for each persona such the Spark developer experience in a lakehouse.

For more information on how to get started using OneLake, see [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

## Shortcuts: Unify data products

Shortcuts allow your organization to easily share data between users and applications without having to move and duplicate information unnecessarily. When teams work independently in separate workspaces, shortcuts enable you to combine data across different business groups and domains into a virtual data product to fit a user’s specific needs.

A shortcut is a reference to data stored in other file locations. These file locations can be within the same workspace or across different workspaces, within OneLake or external to OneLake in ADLS or S3. No matter the location, the reference makes it appear as though the files and folders are stored locally.

:::image type="content" source="media\onelake-overview\fabric-shortcuts-structure-onelake-v-2.png" alt-text="Diagram showing how shortcuts connect data across workspaces and items." lightbox="media\onelake-overview\fabric-shortcuts-structure-onelake-v-2.png":::

For more information on how to use shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

## Open access to OneLake

You can access all your OneLake data, including shortcuts, with ADLS Gen2 APIs and SDKs.  OneLake is compatible out of the box with any application and tool that supports ADLS Gen2. Simply point existing tools to the OneLake endpoint and it just works!

:::image type="content" source="media\onelake-overview\access-onelake-data-other-tools-v-3.png" alt-text="Diagram showing how you can access OneLake date with APIs and SDKs." lightbox="media\onelake-overview\access-onelake-data-other-tools-v-3.png":::

For more information on APIs and endpoints, see [OneLake access and APIs](onelake-access-api.md). For examples of OneLake integrations with Azure, see [Use with Azure services](../placeholder.md).

## One copy: Access one copy of data

While applications may have separation of storage and computing, the data is often optimized for a single engine, which makes it difficult to reuse the same data for multiple applications. With Fabric, the different analytical engines (T-SQL, Spark, Analysis Services, etc.) store data in the open Delta Lake format to allow you to use the same data across multiple engines.

For example, you can load data with T-SQL transaction into Tables and then query the data with T-SQL *and* Spark without having to create copies of the data. Similarly, you can use Spark to load and transform data and then query it directly using T-SQL.

No matter which engine or item you use, everyone is contributing to the same data lake. Users with different skill sets or preferences can operate on the same copy of data without duplication.

:::image type="content" source="media\onelake-overview\use-same-copy-of-data-v-3.png" alt-text="Diagram showing how multiple items and engines use the same copy of data." lightbox="media\onelake-overview\use-same-copy-of-data-v-3.png":::
*Example diagram showing loading data using Spark, querying using T-SQL and viewing the data in a Power BI report.*

## One security: Customize data security

OneLake brings flexible security to the data lake with multi-layered access controls. Grant access to data directly in OneLake for use in machine learning scenarios, or limit access to specific query engines to keep sensitive data secure.

OneLake supports the following security modes:

- Access to a specific subsection of the lake, such as a workspace or lakehouse.
- Access to a specific query engine, but no direct OneLake access.

OneLake combines the power of one copy with a multi-layered security model, which allows data to be secured consistently and reliably.

## Next steps

- [Creating a lakehouse with OneLake](create-lakehouse-onelake.md)
