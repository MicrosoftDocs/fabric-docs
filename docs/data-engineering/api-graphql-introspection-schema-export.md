---
title: Microsoft Fabric API for GraphQL Introspection and Schema Export
description: Learn about GraphQL introspection and how to export your GraphQL schema for use with other GraphQL tools.
ms.reviewer: edlima
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom: freshness-kr
ms.search.form: GraphQL Introspection and Schema Export
ms.date: 01/21/2026
---

# Fabric API for GraphQL introspection and schema export

When you build applications or integrate external tools with your Fabric API for GraphQL, you need to understand the structure of your API—what types are available, what fields they contain, and how they relate to each other. Whether you're generating client code, creating documentation, or configuring API management tools, accessing your schema definition is essential.

The Fabric API for GraphQL provides two complementary mechanisms to retrieve schema information: **introspection** for programmatic runtime queries and **schema export** for obtaining a complete schema file. Both methods give you access to the same underlying schema, but each serves different workflows and use cases.

> [!TIP]
> Want to see introspection in action? Try the tutorial [Connect AI Agents to Fabric API for GraphQL with a local Model Context Protocol (MCP) server](api-graphql-local-model-context-protocol.md). This hands-on guide shows how AI agents use introspection to automatically discover and query your Fabric data using natural language.

## Who uses introspection and schema export

Introspection and schema export are valuable for:
- **Application developers** building clients that consume Fabric data and need to generate type-safe code
- **Fabric workspace contributors** understanding available data structures and testing data access
- **Development tools and IDEs** providing autocomplete and IntelliSense for Fabric GraphQL APIs
- **Azure API Management** integrations that route and secure Fabric GraphQL traffic at the enterprise level
- **Fabric administrators** auditing exposed data structures and validating access controls
- **AI agents and assistants** using Model Context Protocol (MCP) to discover and query Fabric data naturally
- **Power Platform developers** understanding Fabric data schemas before building integrations
- **CI/CD pipelines** tracking Fabric GraphQL schema versions and validating compatibility across environments

**Choose introspection** when you need to query schema information programmatically at runtime, such as powering development tools, enabling AI agents, or implementing dynamic client features. **Choose schema export** when you need a complete schema file for offline use, version control, API gateway integration, or sharing with external teams.

- **[Introspection](#introspection)**: Query your schema programmatically using the GraphQL introspection system, which is part of the GraphQL standard. Introspection queries allow you to discover types, fields, and relationships dynamically, and they power many GraphQL development tools.

- **[Schema export](#export-schema)**: Download a complete SDL (GraphQL Schema Definition Language) file that contains your entire schema definition for offline use, sharing, or tool integration.

## Introspection

By default, introspection is disabled on your API for GraphQL items. This setting can only be toggled by workspace admins. All other users will see a disabled slider. 

To enable introspection:

1. Select the API **Settings** gear icon in the top menu.

    :::image type="content" source="media/api-graphql-introspection-schema-export/portal-bar-settings.png" alt-text="Screenshot that shows the portal bar showing the settings gear button." lightbox="media/api-graphql-introspection-schema-export/portal-bar-settings.png":::

1. From the left navigation, select the **Introspection** page.

    :::image type="content" source="media/api-graphql-introspection-schema-export/introspection-settings.png" alt-text="Screenshot that shows the introspection setting slider." lightbox="media/api-graphql-introspection-schema-export/introspection-settings.png":::

1. Select the toggle to enable introspection. Enabling introspection exposes schema information to all users with access to the API endpoint.

1. A confirmation dialog appears. Select **Confirm** to enable introspection or **Cancel** to leave it disabled.

    :::image type="content" source="media/api-graphql-introspection-schema-export/enable-introspection-confirmation.png" alt-text="Screenshot that shows the enable introspection confirmation dialog." lightbox="media/api-graphql-introspection-schema-export/enable-introspection-confirmation.png":::


### Introspection query example

Here's a quick example of an introspection query to retrieve available types from the schema:

1. Create a new query in the GraphQL editor. Select the plus `+` icon next to existing tabs to open a new query tab.

    :::image type="content" source="media/api-graphql-introspection-schema-export/introspection-query-new.png" alt-text="Screenshot that shows the new query button in the GraphQL editor." lightbox="media/api-graphql-introspection-schema-export/introspection-query-new.png":::

1. Enter the following introspection query in the editor:
    
    ```GraphQL
    query {
        __schema {
            types{
                name
            }
        }
    }
    ```

1. Select the **Run** button to execute the query. 
1. The results pane displays a list of all types defined in the schema.

    :::image type="content" source="media/api-graphql-introspection-schema-export/introspection-query-example.png" alt-text="Screenshot that shows the introspection query example." lightbox="media/api-graphql-introspection-schema-export/introspection-query-example.png":::

Introspection queries can return large amounts of information. You can narrow the scope of what you query by being more specific in your introspection request. For example, instead of querying all types, you can query a specific type:

```GraphQL
query {
    __type(name: "ProductCategory") {
        name
        kind
        fields {
            name
            type {
                name
            }
        }
    }
}
```

Running the query returns detailed information about the `ProductCategory` type:

```json
{
  "data": {
    "__type": {
      "name": "ProductCategory",
      "kind": "OBJECT",
      "fields": [
        {
          "name": "ProductCategoryID",
          "type": {
            "name": null
          }
        },
        {
          "name": "ParentProductCategoryID",
          "type": {
            "name": "Int"
          }
        },
        {
          "name": "Name",
          "type": {
            "name": "String"
          }
        },
        {
          "name": "rowguid",
          "type": {
            "name": null
          }
        },
        {
          "name": "ModifiedDate",
          "type": {
            "name": null
          }
        }
      ]
    }
  }
}
```

Common filtering patterns when processing introspection results include:
- Excluding types starting with double underscores (`__`), which are GraphQL system types
- Including types starting with specific prefixes like `ProductCategory`

These examples demonstrate standard GraphQL introspection syntax that works across any GraphQL implementation. This overview covers basic introspection patterns—for comprehensive details on the introspection system, advanced querying techniques, and additional capabilities, see the [GraphQL Foundation's official documentation on introspection](https://graphql.org/learn/introspection/).

## Export schema

When you need a complete, offline copy of your schema definition, use the schema export feature directly from the Fabric portal. Open your API for GraphQL and select **Export schema** from the toolbar. Your browser downloads an SDL (Schema Definition Language) file containing your complete schema definition.

:::image type="content" source="media/api-graphql-introspection-schema-export/export-schema.png" alt-text="Screenshot that shows the export schema button." lightbox="media/api-graphql-introspection-schema-export/export-schema.png":::

### Understanding the SDL file

The exported file uses GraphQL's Schema Definition Language (SDL), a human-readable format that defines your API's types, fields, and relationships. The SDL file includes:

- **Object types** representing your data entities with their fields
- **Query operations** that define how to retrieve data
- **Mutation operations** for creating, updating, or deleting data
- **Field arguments** that specify input parameters and their types
- **Type descriptions** providing documentation for each element

You can open the SDL file in any text editor to review your schema structure. This is particularly useful for understanding the complete API surface before integrating it into your applications.

### Using the exported schema

Common use cases for the exported SDL file include:

- **API gateway integration**: Import into [Azure API Management](api-graphql-azure-api-management.md) to add authentication, rate limiting, and caching
- **Development environment setup**: Configure [IntelliSense in Visual Studio Code](api-graphql-develop-vs-code.md) for autocomplete and validation
- **Version control**: Commit to Git or other source control systems to track schema evolution over time
- **Team collaboration**: Share with external partners or development teams who need to understand your API structure
- **Code generation**: Use with GraphQL code generators to create type-safe clients in TypeScript, C#, Java, or other languages
- **Documentation**: Generate API reference documentation using tools like GraphQL Voyager or GraphQL Markdown

Unlike introspection queries, schema export doesn't require introspection to be enabled and works regardless of your API's introspection settings. This makes it a reliable way to access your schema definition for administrative and development purposes.

### Managing schema changes

GraphQL schemas can evolve over time as you add new types, fields, or capabilities to your API. When the schema changes, exported SDL files become outdated. Consider these practices:

- **Re-export after changes**: Download a fresh SDL file whenever you modify your API schema in Fabric. Schema changes include adding data sources, modifying exposed types, or updating field definitions.
- **Version control**: Commit each exported schema to your source control system with descriptive commit messages. This creates an audit trail of schema evolution and enables rollback if needed.
- **Communication**: If external teams or applications depend on your schema, notify them of significant changes. While GraphQL supports additive changes without breaking existing queries, removing or renaming fields can impact clients.
- **Automation**: For CI/CD pipelines, consider automating schema exports as part of your deployment process to ensure documentation and tooling stay synchronized with your API.

The person responsible for modifying the API schema (typically a data engineer or API developer) should export and version the updated schema to maintain consistency between the Fabric API and external systems that depend on it.

## Related content

- [Connect AI Agents to Fabric API for GraphQL with a local Model Context Protocol (MCP) server](api-graphql-local-model-context-protocol.md)
- [Fabric API for GraphQL Editor](api-graphql-editor.md)
- [Fabric API for GraphQL schema view and Schema explorer](graphql-schema-view.md)
- [Integrate with Azure API Management (APIM)](api-graphql-azure-api-management.md)
