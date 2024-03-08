---
title: Best practices
description: Best practices for securing your data in OneLake
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Best practices

In this article, we will look at best practices around securing data in OneLake. For additional guidance on how to implement security for specific use cases, see the how-to guides.

## Least privilege

Least privilege access is a fundamental security principle in computer science that advocates for restricting users' permissions and access rights to only those necessary to perform their tasks. For OneLake, this means assigning permissions at the appropriate level to ensure that users are not over-provisioned and reduce risk.

1. If users only need access to a single lakehouse or data item, use the share feature to grant them access to only that item. Assigning a user to a workspace role should only be used if that user needs to see ALL items in that workspace.

2. Use [OneLake data access roles (preview)](../security/get-started-security.md) to restrict access to folders and tables within a lakehouse for access through OneLake APIs or Spark notebooks. This feature allows for access to be given to only select items in a lakehouse.

## Secure by experience

Fabric allows for granting users access to specific data experiences through the use of item permissions, compute permissions, and OneLake data access roles (preview). Securing by experience is a principle that restricts user access to only the necessary Fabric experience the user needs to do their job and configuring access in that experience to the least privileged. There are three main experiences for OneLake where this is relevant: Spark/OneLake access, SQL Endpoints, and Semantic Models.

**Spark/OneLake access**
This path is used for querying data through notebooks, moving data via pipelines, or creating shortcuts to reference data from other lakehouses. To configure security for these users, share the lakehouse to those users. Then use OneLake data access roles (preview) to control the specific folders that the users should have read access to. If a user needs write access they will need to be added to a workspace role and cannot have read restrictions applied to them when accessing OneLake.

**SQL Endpoints**
This approach is for reading data through SQL queries. Access to connect to the SQL Endpoint is given by sharing the lakehouse for those users. If the default permissions are given, users will have no access to any tables. Users can then be granted access to specific tables using SQL GRANT permissions. Alternatively, the users can be given the ReadData permission. This will give them full read access to all the tables in SQL, however that access can be restricted using SQL DENY permissions.

**Semantic Models**
For users that need to connect via reports, security can be configured directly in the Semantic Model by defining security through DAX expressions. This further refines the security and then users need to be shared the reports.

## Common architecture examples

The following best practices give examples of how to structure permissions in Fabric to build out some common data architectures.

### Data mesh

**Share**



Refer to how-to for more details on the shortcut delegated access

### Hub and spoke

Sharing
Utilize the sharing feature of Fabric items to give access to only the reports or data products that a consumer needs.

