---
title: Manage relationships in Fabric API for GraphQL
description: Learn how to manage relationships in Fabric API for GraphQL, including how to create and delete relationships.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: conceptual
ms.search.form: GraphQL manage relationships
ms.date: 05/07/2024
---

# Manage relationships in Fabric API for GraphQL

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

One of the most powerful features in GraphQL is the ability to establish relationships across types.

## Create a new relationship

1. From the **Schema explorer** pane, select the ellipsis next to a type and select the **Manage relationships** option. The **Manage relationships** screen appears.

   :::image type="content" source="media/manage-relationships-graphql/manage-relationships-start.png" alt-text="Screenshot of the Manage relationships screen, showing where to select the New relationship option.":::

1. Select **New relationship**. For this example, we create a new one-to-one relationship between the **Product** type and the **ProductModel** type, based on the **ProductModelID** field that exists in both types. We select **One to one** for **Cardinality**, select the **From** and **To** types, and then select the From and To fields for this relationship.

   :::image type="content" source="media/manage-relationships-graphql/create-relationship-one-to-one.png" alt-text="Screenshot of the New relationship screen, showing examples of selections for the five required fields.":::

   > [!NOTE]
   > You can choose multiple fields in the From and To field pickers. This feature allows you to create relationships that comprise multiple fields.

1. Select **Create relationship**. Your list of relationships now shows the newly created relationship.

   :::image type="content" source="media/manage-relationships-graphql/create-relationship-result.png" alt-text="Screenshot of the Manage relationships screen showing the newly created relationship in the list.":::

1. Select the X in the upper right corner to close the **Manage relationships** screen.

## Delete a relationship

You can delete a relationship from the **Manage relationships** screen by selecting the checkbox next to the relationship and then selecting **Delete**.

## Related content

- [Fabric API for GraphQL editor](api-graphql-editor.md)
