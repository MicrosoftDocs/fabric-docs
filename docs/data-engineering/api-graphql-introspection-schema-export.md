---
title: Microsoft Fabric API for GraphQL Introspection and Schema Export
description: Learn about GraphQL introspection and how to export your GraphQL schema for use with other GraphQL tools.
ms.reviewer: edlima
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.search.form: GraphQL Introspection and Schema Export
ms.date: 04/18/2025
---

# Fabric API for GraphQL introspection and schema export

The Fabric API for GraphQL provides two mechanisms to retrieve information about your schema.

1. **Introspection**: It's part of the GraphQL standard and enables programmatic querying of the schema. Introspection queries allow you to learn about a GraphQL API’s schema, and they also help power GraphQL development tools.

3. **Schema export**: It allows you to obtain an SDL (GraphQL Schema Definition Language) file that contains your complete schema for external use.

## Introspection

By default, introspection is disabled on your API for GraphQL items. This setting can only be toggled by Workspace Admins. All other users will see a disabled slider. To enable it, click on the API **Settings** gear icon in the top menu and choose **Introspection** from the available settings. You'll see a toggle to enable or disable introspection:

:::image type="content" source="media/api-graphql-introspection-schema-export/portal-bar-settings.png" alt-text="Screenshot that shows the portal bar showing the settings gear button." lightbox="media/api-graphql-introspection-schema-export/portal-bar-settings.png":::

:::image type="content" source="media/api-graphql-introspection-schema-export/introspection-settings.png" alt-text="Screenshot that shows the introspection setting slider." lightbox="media/api-graphql-introspection-schema-export/introspection-settings.png":::

If you enable introspection, the following confirmation dialog is displayed:

:::image type="content" source="media/api-graphql-introspection-schema-export/enable-introspection-confirmation.png" alt-text="Screenshot that shows the enable introspection confirmation dialog." lightbox="media/api-graphql-introspection-schema-export/enable-introspection-confirmation.png":::

Select **confirm** to enable introspection or **cancel** to leave it disabled.

## Introspection query example

Here's a quick example of an introspection query to retrieve available types from the schema:

```GraphQL
query {
    __schema {
        types{
            name
        }
    }
}
```

:::image type="content" source="media/api-graphql-introspection-schema-export/introspection-query-example.png" alt-text="Screenshot that shows the introspection query example." lightbox="media/api-graphql-introspection-schema-export/introspection-query-example.png":::

The information retrieved by introspection queries is verbose. You can use query filters to narrow the scope of the query.

To learn more about introspection, see the [GraphQL Foundation's official documentation on introspection](https://graphql.org/learn/introspection/).

## Export schema

Another way to retrieve schema information is using the GraphQL schema export. It works directly from the Fabric portal. Open your API for GraphQL and select **Export schema**. And your browser will download an SDL (Schema Definition Language) file with full schema. You can then use this SDL file in any development tool or service such as, for example, integrating with [Azure API Management](api-graphql-azure-api-management.md). 

:::image type="content" source="media/api-graphql-introspection-schema-export/export-schema.png" alt-text="Screenshot that shows the export schema button." lightbox="media/api-graphql-introspection-schema-export/export-schema.png":::

## Related content

- [Fabric API for GraphQL Editor](api-graphql-editor.md)
- [Fabric API for GraphQL schema view and Schema explorer](graphql-schema-view.md)
- [Integrate with Azure API Management (APIM)](api-graphql-azure-api-management.md)
