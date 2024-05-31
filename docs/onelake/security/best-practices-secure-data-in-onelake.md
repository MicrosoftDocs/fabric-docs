---
title: Best practices for OneLake security
description: Best practices for securing your data in OneLake.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 05/09/2024
---

# Best practices for OneLake security

In this article, we'll look at best practices around securing data in OneLake. For more information on how to implement security for specific use cases, see the how-to guides.

## Least privilege

Least privilege access is a fundamental security principle in computer science that advocates for restricting users' permissions and access rights to only those permissions necessary to perform their tasks. For OneLake, this means assigning permissions at the appropriate level to ensure that users aren't over-provisioned and reduce risk.

- If users only need access to a single lakehouse or data item, use the share feature to grant them access to only that item. Assigning a user to a workspace role should only be used if that user needs to see ALL items in that workspace.

- Use [OneLake data access roles (preview)](../security/get-started-security.md) to restrict access to folders and tables within a lakehouse for access through OneLake APIs or Spark notebooks. This feature allows for access to be given to only select items in a lakehouse.

## Secure by workload

Fabric allows for granting users access to specific data workloads through item permissions, compute permissions, and OneLake data access roles (preview). Securing by workload is a principle that restricts user access to only the necessary Fabric workload the user needs to do their job and configuring access in that workload to the least privileged. There are three main workloads for OneLake where this is relevant: Spark/OneLake access, SQL Endpoints, and Semantic Models.

**Spark/OneLake access**
This path is used for querying data through notebooks, moving data via pipelines, or creating shortcuts to reference data from other lakehouses. To configure security for these users, share the lakehouse to those users. Then use OneLake data access roles (preview) to control the specific folders that the users require read access to. If a user needs write access, they'll need to be added to the Admin, Member, or Contributor workspace role. Users in a write role can't have read restrictions applied to them when accessing OneLake.

**SQL Endpoints**
This approach is for reading data through SQL queries. Access to connect to the SQL Endpoint is given by sharing the lakehouse for those users. If the default permissions are given, users have no access to any tables. Users can then be granted access to specific tables using SQL GRANT permissions. Alternatively, the users can be given the ReadData permission. ReadData gives them full read access to all the tables in SQL, however that access can be restricted using SQL DENY permissions.

**Semantic Models**
For users that need to connect via reports, security can be configured directly in the Semantic Model by defining security through DAX expressions. This further refines the security and then users need to be shared the reports.

## Secure by use case

Different users need the ability to perform different actions in Fabric in order to do their jobs. Some common use cases are identified in this section along with the necessary permissions setup in Fabric and OneLake.

**Manage workspace access**
The admin or member workspace roles are required.

**Create new items in Fabric**
Either Admin, Member, or Contributor roles can create new items. They can also delete those items and configure OneLake data access roles (preview) if the preview feature is enabled on that item.

**Write data to OneLake**
Either Admin, Member, or Contributor roles can write data to OneLake through Spark or through uploads. They can also write data to a warehouse. Users with only read access on a warehouse can be given permissions to write data through [SQL permissions.](../../data-warehouse/sql-granular-permissions.md)

**Read data from OneLake**
A user needs to be a workspace Viewer, or have the Read permission and the ReadAll permission to read data from OneLake. For lakehouses with the OneLake data access roles (preview) feature enabled, access through a data access role is required instead of ReadAll.

## Related content

- [Fabric Security overview](../../security/security-overview.md)

- [Fabric and OneLake security overview](./fabric-onelake-security.md)

- [Data Access Control Model](../security/data-access-control-model.md)