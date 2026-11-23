---
title: "Security in SQL database"
description: Learn about security in SQL database in Microsoft Fabric.
ms.reviewer: pivanho, jaszymas
ms.date: 10/23/2025
ms.topic: concept-article
ms.search.form: SQL database security
ai-usage: ai-assisted
---
# Security

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

SQL database in Microsoft Fabric includes a set of security controls that are on by default or easy to enable, so you can easily secure your data.

This article provides an overview of security capabilities in SQL database.

## Authentication

Like other Microsoft Fabric item types, SQL databases rely on [Microsoft Entra authentication](/entra/identity/authentication/overview-authentication). After you share your database with users, they can connect to it by using Microsoft Entra authentication.

For more information about authentication, see [Authentication in SQL database in Microsoft Fabric](authentication.md).

## Access control

You can configure access for your SQL database through two sets of controls:

- [Fabric access controls](authorization.md#fabric-access-controls) - workspace roles and item permissions. They provide the easiest way to manage access for your database users.  
- [Native SQL access controls](authorization.md#sql-access-controls), such as SQL permissions or database-level roles. They allow granular access control. You can configure database-level roles by using the [Manage SQL security UI](configure-sql-access-controls.md#manage-sql-database-level-roles-from-fabric-portal) in Microsoft Fabric portal. You can configure SQL native controls by using Transact-SQL.

For more information about access control, see [Authorization in SQL database in Microsoft Fabric](authorization.md).

## Governance

Microsoft Purview provides security, risk, and compliance capabilities that help protect Fabric data. Microsoft Purview allows you to label your SQL database items with sensitivity labels and define protection policies that control access based on sensitivity labels.

For more information about Microsoft Purview protection capabilities for Microsoft Fabric, including SQL database, see:

- [Use Microsoft Purview to protect Microsoft Fabric](../../governance/microsoft-purview-fabric.md)
- [Information protection in Microsoft Fabric](../../governance/information-protection.md)
- [Protection policies in Microsoft Fabric](../../governance/protection-policies-overview.md)
- [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md)

## Network security

You can use [private links](../../security/security-private-links-overview.md) to provide secure access for data traffic in Microsoft Fabric, including SQL database. Azure Private Link and Azure Networking private endpoints are used to send data traffic privately using Microsoft's backbone network infrastructure instead of going across the internet.

You can configure private links at the workspace (preview feature) and tenant level.

For more information about private links, see [Set up and use private links](../../security/security-private-links-use.md).

## Encryption

Every interaction with Fabric is encrypted by default and authenticated using Microsoft Entra ID. For more information, see [Security in Microsoft Fabric](../../security/security-overview.md).

### Transport Layer Security

All SQL database connections use Transport Layer Security (TLS) 1.2 to protect your data in transit.

### Encryption at rest

Microsoft Fabric encrypts all data at rest by using Microsoft-managed keys. The service stores all database data in remote Azure Storage accounts. To comply with encryption at rest requirements when using Microsoft-managed keys, the service enables [service-side encryption](/azure/storage/common/storage-service-encryption#about-azure-storage-service-side-encryption) for each Azure Storage account that the SQL database uses.   

By using [customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md), you can use your Azure Key Vault keys to add another layer of protection to the data in your Microsoft Fabric workspaces - including all data in SQL database in Microsoft Fabric. A customer-managed key provides greater flexibility, allowing you to manage its rotation, control access, and usage auditing. It also helps organizations meet data governance needs and comply with data protection and encryption standards.

For more information about customer-managed keys for a SQL database in Microsoft Fabric, see [Customer-managed keys in SQL database in Microsoft Fabric](encryption.md).

## Auditing 

SQL auditing for SQL database can track database events and write them to an audit log in your OneLake. For more information, see [Auditing](auditing.md).

## Related content

- [Authentication in SQL database in Microsoft Fabric](authentication.md)
- [Authorization in SQL database in Microsoft Fabric](authorization.md)
- [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md)
