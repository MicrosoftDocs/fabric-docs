---
title: Connect applications to Fabric API for GraphQL
description: Learn how to find and copy your API endpoint so you can connect your applications to the API for GraphQL.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: how-to
ms.custom:
  - build-2024
ms.search.form: Connecting applications to GraphQL
ms.date: 05/21/2024
---

# Connect applications to Fabric API for GraphQL

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

To connect an application to an API for GraphQL, you get the API endpoint and paste the URI into the application.

## Prerequisites

Currently API for GraphQL requires applications to use Microsoft Entra for authentication. Your application needs to be registered and configured adequately to perform API calls against Fabric. For more information, see [Create a Microsoft Entra app in Azure](/rest/api/fabric/articles/get-started/create-entra-app).

Before you connect an application, you must create an API for GraphQL. For more information, see [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md).

## Obtain the API for GraphQL endpoint

To obtain the API endpoint:

1. Navigate to your API item in the Fabric portal.

1. Select **Copy endpoint** on the API item's toolbar.

   :::image type="content" source="media/connect-apps-api-graphql/copy-endpoint.png" alt-text="Screenshot of the toolbar options for an API item.":::

1. In the **Copy link** screen, select **Copy**.

   :::image type="content" source="media/connect-apps-api-graphql/copy-endpoint-link.png" alt-text="Screenshot of the Copy link dialog screen, showing where to select Copy.":::

1. You can now paste the endpoint URI in your application, and begin to send API requests to it.

## Related content

- [Query multiple data sources in Fabric API for GraphQL](multiple-data-sources-graphql.md)
