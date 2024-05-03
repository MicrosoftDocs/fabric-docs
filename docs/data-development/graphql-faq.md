---
title: Microsoft Fabric GraphQL FAQ
description: Find answers to frequently asked questions about Microsoft Fabric API for GraphQL, which is currently in preview.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: faq
ms.date: 05/02/2024
---

# Fabric GraphQL frequently asked questions

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

Find answers to commonly asked Fabric API for GraphQL questions.

## What GraphQL operations are supported in Fabric API for GraphQL?

Only GraphQL queries (read) and mutations (write) are supported at this time.

## How can I view and edit resolvers in Fabric API for GraphQL?

Resolvers are functions used to resolve fields in GraphQL with data from data sources. Fabric automatically generates resolvers whenever you attach a new data source or select new objects to be exposed from an existing data source. Customization of resolvers is a future planned feature.

## Does the API for GraphQL client require access to the data source in order to perform queries or mutations?

Yes, currently the Fabric API for GraphQL supports passthrough authentication. More authorization methods are planned in the future.

## Related content

- [What is Microsoft Fabric API for GraphQL?](api-graphql-overview.md)
