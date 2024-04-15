---
title: How to secure data for common data architectures
description: How to secure OneLake data for use with common data architectures like data mesh or hub and spoke.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# How to secure data for common data architectures

## Introduction

In this article, we'll provide an overview of how to configure security for OneLake data in use for both data mesh and hub and spoke architectures.

## Security features

Microsoft Fabric uses a multi-layer security model with different controls available at different levels in order to provide only the minimum needed permissions. For more information on the different security discussed in this how-to guide, see this [document.](../security/data-access-control-model.md)

## Secure for data mesh

Data mesh is an architectural paradigm that treats data as a product, rather than a service or a resource. Data mesh aims to decentralize the ownership and governance of data across different domains and teams, while enabling interoperability and discoverability through a common platform. In a data mesh architecture, each decentralized team manages the ownership of the data that is part of their data product. The security guidance provided in this section is focused on a single data product team configuring access for their workspace. The steps will be repeated for each data product team on their own workspace, as they enable their downstream consumers.

To get started building a data mesh, use the domain feature of Microsoft Fabric to tag workspaces according to their associated data product and ownership. For more information on domains, see [Fabric domains.](..\..\governance\domains.md)

Within the domains, each team will have their own workspace or workspaces. The workspace will store the data and orchestration needed to build out the final data products for consumption. Grant users access to the workspace roles using [these guidelines.](#workspace-roles)

Identify the downstream consumers of your data products and grant access according to the minimum permissions needed to achieve their goals. For example: data scientists, business analysts, and company leaders. To keep users aligned with their target experiences, each type of downstream user can be given access to a single Fabric data experience. The user persona table shows some common use cases for data mesh consumers and the relevant Fabric experience.

| User persona | Fabric experience |
| ---- | --- |
| [Data scientists](#data-scientists) | Spark notebooks or lakehouse |
| [Data engineers](#data-engineers) | N/A for hub and spoke |
| [Business analysts](#business-analysts) | SQL Endpoint |
| [Report creators](#report-creators) | Semantic models |
| [Report consumers](#report-consumers) | Power BI reports |

## Secure for hub and spoke

A hub and spoke architecture differs from a data mesh by having all of the certified data products managed in a single, centrally owned location. Downstream consumers are less focused on building additional data products and instead perform analysis on the data produced by the central team.

Identify the downstream consumers and grant access according to the minimum permissions needed to achieve their goals. For example: data scientists, business analysts, and company leaders. To keep users aligned with their target experiences, each type of downstream user can be given access to a single Fabric data experience. The user persona table shows some common use cases for hub and spoke along with the relevant Fabric experience.

| User persona | Fabric experience |
| ---- | --- |
| [Data scientists](#data-scientists) | Spark notebooks or lakehouse |
| [Business analysts](#business-analysts) | SQL Endpoint |
| [Report creators](#report-creators) | Semantic models |
| [Report consumers](#report-consumers) | Power BI reports |

### Workspace roles

Workspace role assignments follow the same guidelines for both hub and spoke and data mesh architectures. The job responsibilities table outlines which workspace role to assign users based on the functions they will perform in the workspace. For more information on the Fabric workspace roles see [this document.](..\..\get-started\roles-workspaces.md)

| Job responsibilities | Workspace role |
| ---- | --- |
| Own the workspace and manage role assignments | Admin |
| Manage role assignments for non-admin users | Member |
| Create Fabric items and write data | Contributor |
| Create tables and views in SQL | Viewer + SQL permissions |

### Data scientists

Data scientists need access to data in a lakehouse to consume through Spark. For data mesh and hub and spoke, the Spark users will be consuming data from a separate workspace than the one the data lives in. This allows data scientists to have access to create models and experiments without adding clutter to the workspace where the data lives. Data scientists can also use other non-Spark services that connect directly to the OneLake data paths.

To provision access for data scientists, use the share button to share the lakehouse. Check the "Read all Apache Spark" box in the dialog. For lakehouses with [OneLake data access roles (preview)](.\get-started-data-access-roles.md) enabled, instead give the same users access by adding them to a OneLake data access role. Using OneLake data access roles will give finer-grained access to the data. Data engineers can then create [shortcuts](../onelake-shortcuts.md) to only select tables or folders in a lakehouse.

### Data engineers

Data engineers need access to data in a lakehouse to build out downstream data products. Data engineers need access to the data in OneLake so pipelines or notebooks can be created to read the data in a performant manner. In a true hub and spoke model, the data engineer role exists only within the layers of the central hub team. However for data mesh, data engineers perform the critical job of combining data products across domains to build new data sets.

Use the share button to share the lakehouse with data engineers. Check the "Read all Apache Spark" box in the dialog. For lakehouses with [OneLake data access roles (preview)](.\get-started-data-access-roles.md) enabled, instead give the same users access by adding them to a OneLake data access role. Using OneLake data access roles will give finer-grained access to the data. Data engineers can then create [shortcuts](../onelake-shortcuts.md) to only select tables or folders in a lakehouse.

### Business analysts

Business analysts (sometimes call data analysts) query data through SQL to answer business questions.

Use the share button to share the lakehouse with the business analysts. Check the "Read all SQL endpoint data" box in the dialog. This setting will give business analysts access to the data in the SQL endpoint, but not to see the underlying OneLake files.

Access to data can be further restricted for these users by defining row or column level security directly in SQL.

### Report creators

Report creators build Power BI reports for other users to consume.

Use the share button to share the lakehouse with the report creators. Check the "Build reports on the default semantic model" box in the dialog. This permission allows the report creators to build reports using the semantic model associated with the lakehouse. Those users cannot access the data in OneLake or have full access to the SQL endpoint.

### Report consumers

Report consumers are the business leaders or directors that need to view data in a Power BI report to make decisions but are not creating their own queries.

Share a report with consumers using the share button. Don't check any of the boxes to grant acccess to read the report but not see any of the underlying data. However with this approach users can still connect to the SQL endpoint and view any tables they have access to. To prevent this, ensure that no SQL permissions are defined that would grant access for this set of users.

You can also share data with report consumers by using an [app](https://learn.microsoft.com/en-us/power-bi/consumer/end-user-apps). Apps allow users to access a predefined report or set of reports without needing access to the underlying workspace. Note that for reports in direct lake mode, the users will still need to have the underlying lakehouse shared with them in order to see data.

## Related content

- [OneLake data access roles (preview)](./get-started-data-access-roles.md)
- [OneLake data access control model](./data-access-control-model.md)
- [Workspace roles](../../get-started/roles-workspaces.md)
- [Share items](../../get-started/share-items.md)