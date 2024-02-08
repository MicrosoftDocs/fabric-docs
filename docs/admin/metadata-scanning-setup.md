---
title: Set up metadata scanning in an organization
description: Learn how to set up and enable metadata scanning in your organization through the administrator settings.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/02/2023
---

# Set up metadata scanning in your organization

Before metadata scanning can be run over an organization's Microsoft Fabric workspaces, it must be set up by a Fabric administrator. Setting up metadata scanning involves two steps:

1. Enabling service principal authentication for read-only admin APIs.
1. Enabling tenant settings for detailed semantic model metadata scanning.

## Enable service principal authentication for read-only admin APIs

Service principal is an authentication method that can be used to let a Microsoft Entra application access Power BI APIs. With this authentication method, you don't have to maintain a service account with an admin role. Rather, to allow your app to use the Admin APIs, you just have to give your approval once as part of the tenant settings configuration.

To see how to enable service principal access to read-only Admin APIs, see [Enable service principal authentication for read-only admin APIs](./metadata-scanning-enable-read-only-apis.md).

If you don't want to enable service principal authentication, metadata scanning can be performed with standard delegated admin access token authentication.

## Enable tenant settings for metadata scanning

Two tenant settings control metadata scanning:

* **Enhance admin APIs responses with detailed metadata**: This setting turns on Model caching and enhances API responses with low-level semantic model metadata (for example, name and description) for tables, columns, and measures.
* **Enhance admin APIs responses with DAX and mashup expressions**: This setting allows the API response to include DAX expressions and Mashup queries. This setting can only be enabled if the first setting is also enabled.

To enable these settings, go to **Admin portal > Tenant settings > Admin API settings**.

## Related content

* [Metadata scanning overview](../governance/metadata-scanning-overview.md)
* [Enable service principal authentication for read-only admin APIs](./metadata-scanning-enable-read-only-apis.md)
* [Run metadata scanning](../governance/metadata-scanning-run.md)
* [Power BI REST Admin APIs](/rest/api/power-bi/admin)
