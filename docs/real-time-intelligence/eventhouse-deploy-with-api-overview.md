---
title: Deploy an eventhouse using APIs
description: Learn how to use APIs for Eventhouse and KQL Database to automate deployments, manage data efficiently, and enhance your development workflow
author: shsagir
ms.author: shsagir
ms.reviewer: bwatts
ms.topic: concept-article
ms.date: 12/05/2024
ms.custom:
#customer intent: As a developer, I want to use the Eventhouse and KQL APIs so that I can automate deployments and manage data efficiently.
---
# Deploy an eventhouse using APIs

You can fully automate the deployment of your Eventhouses with KQL Databases using APIs. You can use Fabric APIs to create, update, and delete items within your workspace. You can then use one of the following methods to manage your eventhouses and databases by performing actions such as creating tables and changing policies:

- **Database schema script**: You can specify a database schema script as part of the [KQL Database definition](/rest/api/fabric/articles/item-management/definitions/kql-database-definition) to configure your database.
- **Kusto API**: You can use the Kusto API to execute [manangement commands](/kusto/management/?view=microsoft-fabric&preserve-view=true) to configure your database.

## Choose the right method

When choosing the right method to manage your Eventhouse and KQL Database, consider the following:

- **Database schema script**: Use this method if you want to define the schema of your database as part of the database definition. This method is useful when you want to define the schema of your database in a single place.
- **Kusto API**: Use this method if you want to execute management commands to configure your database. This method is useful when you want to execute management commands to configure your database.

## Learn how to use APIs

To learn how to use APIs to deploy an Eventhouse, see the following tutorials:

- Fabric only <!--- link to tutorial -->
- Fabric + Kusto <!--- link to tutorial -->

## Related content

- [Eventhouse API](/rest/api/fabric/articles/eventhouse-api)
