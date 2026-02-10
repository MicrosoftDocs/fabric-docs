---
title: "Overview of OneLake table APIs"
description: "Introduction to the OneLake REST API endpoint for table operations in Microsoft Fabric, including Iceberg support."
ms.reviewer: mahi
ms.author: mahi
author: matt1883
ms.date: 10/01/2025
ms.topic: overview
#customer intent: As a OneLake user, I want to learn what the OneLake table APIs are, what prerequisites and authentication steps are required, and which table formats are supported, so that I can prepare to connect and work with my data programmatically in Microsoft Fabric.
---

# Overview of OneLake table APIs

OneLake offers a REST API endpoint for interacting with tables in Microsoft Fabric. This endpoint can be used with clients and libraries that are compatible with [the Iceberg REST Catalog (IRC) API open standard](https://iceberg.apache.org/rest-catalog-spec/) or the [Unity Catalog API open standard.](https://github.com/unitycatalog/unitycatalog/tree/main/api). 

## Prerequisites

Using these APIs is straightforward once you identify a few pieces of information and select your preferred Microsoft Entra ID authentication flow.

### Gathering basic information

To use these APIs, you first need to gather the following pieces of information:

- Your Fabric tenant ID.
    
    The tenant ID is a GUID, and it can be found in the **Profile** card or the ****Help**, **About Fabric** menu in Fabric.

- The workspace and data item ID of the data item (such as a lakehouse) with a top-level Tables directory.

    These IDs are GUIDs. They can be found within the OneLake URL of any table in OneLake. They can alternatively be found within the URL seen in your browser when you have a data item open in Fabric.

- The user or service principal identity in Microsoft Entra ID that has permissions to read tables in your chosen data item.

### Preparing for authentication

1. Decide how you would like to authenticate with Microsoft Entra ID to obtain an access token for your chosen Microsoft Entra identity.

    You can [check this guide to learn about the different ways to obtain an access token with Microsoft Entra ID](/entra/identity-platform/authentication-flows-app-scenarios). Microsoft offers [convenient authentication libraries in several languages](/entra/identity-platform/msal-overview).

1. If you are developing a new application that will either allow users to sign in or sign in as a standalone application, [register your application with Microsoft Entra ID](/entra/identity-platform/quickstart-register-app).

1. [Grant API permission](/entra/identity-platform/howto-update-permissions?pivots=portal#option-1-add-permissions-in-the-api-permissions-pane) for the Azure Storage (`https://storage.azure.com/`) token audience, to your Microsoft Entra ID application. Granting this permission ensures that your application can obtain tokens for use with the OneLake table endpoint.

    > [!NOTE]
    > The OneLake table API endpoint accepts the same token audience as the OneLake filesystem endpoints.
    > 
    > If you are developing an application, you might already know how to authenticate with Microsoft Entra ID to interact with OneLake filesystem REST APIs. If so, you can use the same approach to authenticate with the new OneLake table endpoint.

## Iceberg REST Catalog (IRC) API operations on OneLake

Learn [how to get started with the OneLake table API endpoint to interact with Iceberg tables in OneLake](./iceberg-table-apis-overview.md). Initially, read-only metadata table operations are supported, and we plan to add more operations soon.

## Delta Lake REST API operations on OneLake

Learn [how to get started with the OneLake table API endpoint to interact with Delta tables in OneLake](./delta-table-apis-overview.md).

## Related content

- Learn more about [OneLake table APIs for Iceberg](./iceberg-table-apis-overview.md).
- Learn more about [OneLake table APIs for Delta](./delta-table-apis-overview.md). 
- Set up [automatic Delta Lake to Iceberg format conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).
