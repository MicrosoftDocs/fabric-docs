---
title: "Overview of OneLake table APIs"
description: "Introduction to the OneLake REST API endpoint for table operations in Microsoft Fabric, including Iceberg support."
ms.reviewer: mahi
ms.author: mahi
author: matt1883
ms.date: 2025-10-01
ms.topic: overview
#customer intent: As a OneLake user, I want to learn what the OneLake table APIs are, what prerequisites and authentication steps are required, and which table formats are supported, so that I can prepare to connect and work with my data programmatically in Microsoft Fabric.
---

# Overview of OneLake table APIs (Preview)

OneLake offers a REST API endpoint for interacting with tables in Microsoft Fabric. This endpoint can be used with clients and libraries that are compatible with [the Iceberg REST Catalog (IRC) API open standard](https://iceberg.apache.org/rest-catalog-spec/). Soon, this endpoint will also support Delta Lake REST API operations.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

Using these APIs is straightforward once you’ve identified a few pieces of information and decided how you will authenticate with Microsoft Entra ID.

### Gathering basic information

To use these APIs, you first need to gather the following pieces of information:

- Your Fabric tenant ID.
    
    This is a GUID, and it can be found in the **Profile** card or the ****Help**, **About Fabric** menu in Fabric.

- The workspace and data item ID of the data item (such as a lakehouse) with a top-level Tables directory.

    These IDs are GUIDs, and they can be found within the OneLake URL for any table in OneLake, or within the URL seen in your browser when you have a data item open in Fabric.

- The user or service principal identity in Entra ID that has permissions to read tables in your chosen data item.

### Preparing for authentication

1. Decide how you would like to authenticate with Entra ID to obtain an access token for your chosen Entra identity.

    You can [check this guide to learn about the different ways to obtain an access token with Entra ID](https://learn.microsoft.com/entra/identity-platform/authentication-flows-app-scenarios). Microsoft offers [convenient authentication libraries in several languages](https://learn.microsoft.com/entra/identity-platform/msal-overview).

1. If you are developing a new application that will either allow users to sign in or sign in as a standalone application, [register your application with Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

1. To the application that will be used with Entra ID, [grant API permission](https://learn.microsoft.com/entra/identity-platform/howto-update-permissions?pivots=portal#option-1-add-permissions-in-the-api-permissions-pane) for the Azure Storage (`https://storage.azure.com/`) token audience. This will make sure that the application can obtain tokens that can be used with the OneLake table endpoint.

    > [!NOTE]
    > The OneLake table API endpoint accepts the same token audience as the OneLake filesystem endpoints. If you are developing an application and already know how to authenticate with Entra ID to interact with OneLake filesystem REST APIs, you can use the same approach with the new OneLake table endpoint.

## Iceberg REST Catalog (IRC) API operations on OneLake

Learn [how to get started with the OneLake table API endpoint to interact with Iceberg tables in OneLake](./onelake-iceberg-table-apis.md). Initially, read-only metadata table operations are supported, and more operations will be added soon.

> [!NOTE]
> Before using the Iceberg APIs, be sure you have Delta Lake to Iceberg metadata conversion enabled for your tenant or workspace. Review the[instructions to learn how to enable this](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).

## Delta Lake REST API operations on OneLake

Coming soon, the OneLake table endpoint will offer support for Delta Lake REST API operations, similar to the open-source Unity Catalog standard. Stay tuned!

## Related content

- Learn more about [OneLake table APIs for Iceberg](./onelake-iceberg-table-apis.md).
- Set up [automatic Delta Lake to Iceberg format conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).