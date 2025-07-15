---
title: Authorization in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Learn how authentication works using data plane roles for Cosmos DB databases in Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/14/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Authorization in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric primarily relies on Microsoft Entra ID authentication and built-in data plane roles to manage authentication and authorization. In this guide, you configure built-in data plane roles for a Cosmos DB in Fabric database. You can configure access to your Cosmos DB using workspace roles in Microsoft Fabric access controls.

The access controls at two different levels work together. For example, to [connect](how-to-authenticate.md) to a database, a user must have at least the **Read** permission on the Fabric database item.

## Access controls

In Fabric, you control access using Fabric [workspace roles](../../security/permission-model.md#workspace-roles). Fabric workspace roles manage who can do what in a Microsoft Fabric workspace.

First, Cosmos DB in Fabric has item-level permissions with three well-defined roles:

| | Capability |
| --- | --- |
| **Read** | Connect to the database, read items, query items, read change feed, list containers, list containers, read throughput,  and read metadata |
| **ReadAll** | Same capability as **Read**, and additionally read mirrored data directly from OneLake files |
| **Write** | Same capability as **ReadAll** and additionally create container, delete container, create item, delete item, modify item |

The workspace roles in Fabric translate into the following item-level permissions for items within Cosmos DB in Fabric:

| | Admin | Member | Contributor | Viewer |
| --- | --- | --- | --- | --- |
| **Read** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **ReadAll** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Write** | ✅ Yes | ✅ Yes | ✅ Yes | ✖️ No |

As another perspective, this table captures common capabilities your users might require with Cosmos DB database and maps them to the correct workspace role:

| | Admin | Member | Contributor | Viewer |
| --- | --- | --- | --- | --- |
| **Full administrative access and full data access** | ✅ Yes | ✅ Yes | ✅ Yes | ✖️ No |
| **Read data and metadata** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Connect to the database** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |

> [!TIP]
> For more information on how roles work within workspaces, see [Roles in workspaces](../../fundamentals/roles-workspaces.md). For more information on assigning workspace roles, see [Give users access to workspaces](../../fundamentals/give-access-workspaces.md).

## Mapping to Azure

If you're experienced with Azure Cosmos DB for NoSQL, you can map Cosmos DB in Fabric item permissions to that service's built-in data plane roles:

The Cosmos DB database item permissions are comparable to the following Azure Cosmos DB database scoped data plane role assignments.

| | Azure Cosmos DB for NoSQL role | Scope |
| --- | --- | --- |
| **Read** | `Cosmos DB Built-in Data Reader` | Database |
| **ReadAll** | `Cosmos DB Built-in Data Reader` | Database |
| **Write** | `Cosmos DB Built-in Data Contributor` | Database |

Or, if you prefer, you can map to the Azure role-based access control permissions:

| | Azure Cosmos DB for NoSQL role | Scope |
| --- | --- | --- |
| **Read** | `[ "Microsoft.DocumentDB/databaseAccounts/readMetadata", "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/read", "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/executeQuery", "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/readChangeFeed" ]` | Database |
| **ReadAll** | `[ "Microsoft.DocumentDB/databaseAccounts/readMetadata", "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/read", "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/executeQuery", "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/readChangeFeed" ]` | Database |
| **Write** | `[ "Microsoft.DocumentDB/databaseAccounts/readMetadata", "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/*", "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/*" ]` | Database |

> [!NOTE]
> For more information on Azure Cosmos DB for NoSQL roles, see [Azure Cosmos DB for NoSQL data plane security](/azure/cosmos-db/nosql/reference-data-plane-security).

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Authenticate to Cosmos DB in Microsoft Fabric](how-to-authenticate.md)
