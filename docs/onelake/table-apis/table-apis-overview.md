---
title: "Overview of OneLake table APIs"
description: "Introduction to OneLake table APIs for catalog metadata, additional table and column metadata, and secured table-data reads in Microsoft Fabric."
ms.reviewer: mahi # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.date: 10/09/2026
ms.topic: overview
ai-usage: ai-assisted
#customer intent: As a OneLake user, I want to learn what the OneLake table APIs are, what prerequisites and authentication steps are required, and which table formats are supported, so that I can prepare to connect and work with my data programmatically in Microsoft Fabric.
---

# Overview of OneLake table APIs

OneLake provides APIs for working with table metadata and reading table rows in Fabric. The catalog metadata APIs work with clients and libraries that are compatible with [the Iceberg REST Catalog (IRC) API open standard](https://iceberg.apache.org/rest-catalog-spec/) or the [Unity Catalog API open standard](https://github.com/unitycatalog/unitycatalog/tree/main/api). A common REST API reads and writes additional descriptions and tags for tables and columns. The format-independent table read API returns table rows as Apache Arrow data while enforcing OneLake security.

## Work with table metadata

Use the metadata APIs to discover schemas, tables, and table metadata. Supported read and write operations vary by protocol.

Use the [additional table metadata API (preview)](./additional-table-metadata.md) to read and write table and column descriptions and tags without using a format-specific catalog API.

| API | Protocol | Table formats |
| --- | --- | --- |
| [Iceberg metadata API](./iceberg-table-apis-overview.md) | Iceberg REST Catalog API | Iceberg metadata for supported OneLake tables |
| [Delta metadata API](./delta-table-apis-overview.md) | Unity Catalog-compatible REST API | Delta metadata |

## Read table data

Use the table read API to retrieve secured rows from supported OneLake tables.

| API | Protocol and workflow | Table formats |
| --- | --- | --- |
| [Table read API (preview)](./read-table-data-rest-api.md) | Allocate streams with `POST /read`, and retrieve each stream with `GET /readStream/{streamId}` | Valid Delta Lake and Apache Iceberg tables |

## Prerequisites

Before you use these APIs, identify a few pieces of information and select your preferred Microsoft Entra ID authentication flow.

### Gather basic information

Gather the following information:

- Your Fabric tenant ID.

    The tenant ID is a GUID. Find it in the **Profile** card or in **Help** > **About Fabric**.

- The workspace and data item ID of the data item (such as a lakehouse) with a top-level Tables directory.

    These IDs are GUIDs. They can be found within the OneLake URL of any table in OneLake. They can alternatively be found within the URL seen in your browser when you have a data item open in Fabric.

- The schema name and table name for the table you want to access. For the table read API, the table must be a valid Delta Lake or Apache Iceberg table.

- A user or service principal identity in Microsoft Entra ID that has the permissions required for the operations you plan to use.

    - Read operations require permission to read the target tables. The table read API uses the permissions and data security policies for this identity when it returns rows and columns.
    - Write operations require write access to the target data item and OneLake location. Depending on the item type and access model, grant an item or workspace role that permits writes, or grant **ReadWrite** through a OneLake data access role. For more information, see [Get started with OneLake security](../security/get-started-security.md).

### Prepare for authentication

Make a plan for how you want to authenticate with the API.

1. Decide how you would like to authenticate with Microsoft Entra ID to obtain an access token for your chosen Microsoft Entra identity.

    You can [check this guide to learn about the different ways to obtain an access token with Microsoft Entra ID](/entra/identity-platform/authentication-flows-app-scenarios). Microsoft offers [convenient authentication libraries in several languages](/entra/identity-platform/msal-overview).

1. If you are developing a new application that will either allow users to sign in or sign in as a standalone application, [register your application with Microsoft Entra ID](/entra/identity-platform/quickstart-register-app).

1. [Grant API permission](/entra/identity-platform/howto-update-permissions?pivots=portal#option-1-add-permissions-in-the-api-permissions-pane) for the Azure Storage (`https://storage.azure.com/`) token audience, to your Microsoft Entra ID application. Granting this permission ensures that your application can obtain tokens for use with the OneLake table endpoint.

   > [!NOTE]
   > The OneLake table API endpoint accepts the same token audience as the OneLake filesystem endpoints.
   >
   > If you're developing an application, you might already know how to authenticate with Microsoft Entra ID to interact with OneLake filesystem REST APIs. If so, you can use the same approach to authenticate with the OneLake table endpoint.

## Related content

- Learn more about [additional table metadata](./additional-table-metadata.md).
- Learn more about the [Iceberg metadata API](./iceberg-table-apis-overview.md).
- Learn more about the [Delta metadata API](./delta-table-apis-overview.md).
- Learn more about [reading OneLake table data](./read-table-data-rest-api.md).
- Set up [automatic Delta Lake to Iceberg format conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).
