---
title: "Security in SQL database in Microsoft Fabric"
description: Learn about security in SQL database in Microsoft Fabric.
author: jaszymas
ms.author: jaszymas
ms.reviewer: wiassaf
ms.date: 01/16/2025
ms.topic: conceptual
---
# Security in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

SQL database in Microsoft Fabric comes with a set of security controls that are on by default or easy to enable, which allows you to easily secure your data.

This article provides an overview of security capabilities in SQL database.

## Authentication

Like other Microsoft Fabric item types, SQL databases rely on [Microsoft Entra authentication](/entra/identity/authentication/overview-authentication). Once your database is shared with users, they're ready to connect to it with Microsoft Entra authentication.

For more information about authentication, see [Authentication in SQL database in Microsoft Fabric](authentication.md).

## Access control

You can configure access for your SQL database via two sets of controls:

- [Fabric access controls](authorization.md#fabric-access-controls) - workspace roles and item permissions. They provide the easiest way to manage access for your databases users.  
- [Native SQL access controls](authorization.md#sql-access-controls), such SQL permissions or database-level roles. They allow granular access control. You can configure database-level roles with the [Manage SQL security UI](configure-sql-access-controls.md#manage-sql-database-level-roles-from-fabric-portal) in Microsoft Fabric portal. You can configure ot SQL native controls with Transact-SQL.

For more information about access control, see [Authorization in SQL database in Microsoft Fabric](authorization.md)

## Governance

Microsoft Purview is a family of data governance, risk, and compliance solutions that can help your organization govern, protect, and manage your entire data estate. Among other benefits, Microsoft Purview allows you to label your SQL database items with sensitivity labels and define protection policies that control access based on sensitivity labels.

For more information about data governance capabilities of Microsoft Purview for Microsoft Fabric, including SQL database, see:

- [Use Microsoft Purview to govern Microsoft Fabric](../../governance/microsoft-purview-fabric.md)
- [Information protection in Microsoft Fabric](../../governance/information-protection.md)
- [Protection policies in Microsoft Fabric (preview)](../../governance/protection-policies-overview.md)
- [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md)

## Network security

You can use [private links](../../security/security-private-links-overview.md) to provide secure access for data traffic in Microsoft Fabric, including SQL database. Azure Private Link and Azure Networking private endpoints are used to send data traffic privately using Microsoft's backbone network infrastructure instead of going across the internet.

For more information about private links, see: [Set up and use private links](../../security/security-private-links-use.md).

## Encryption

All database connections use Transport Layer Security (TLS) 1.2 to protect your data in transit.

All your data is encrypted at rest by using Microsoft-managed keys.

## Limitations

- Auditing and encryption using customer-managed keys are currently not supported in SQL database in Microsoft Fabric.

## Related content

- [Authentication in SQL database in Microsoft Fabric](authentication.md)
- [Authorization in SQL database in Microsoft Fabric](authorization.md)
- [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md)
