---
title: Manage relationships in Fabric API for GraphQL
description: Learn how to manage relationships in Fabric API for GraphQL, including how to create and delete relationships.
#customer intent: As a developer, I want to create one-to-one relationships in Fabric API for GraphQL so that I can link types based on specific fields.  
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: conceptual
ms.custom: null
ms.search.form: GraphQL manage relationships
ms.date: 08/21/2025
---

# Manage relationships in Fabric API for GraphQL

GraphQL lets you establish relationships across types, including one-to-one (1:1), one-to-many (1:N), and many-to-many (M:N) relationships.

## Create a new one-to-one relationship

1. From the **Schema explorer** pane, select the ellipsis next to a type, and then select the **Manage relationships** option. The **Manage relationships** screen appears.

   :::image type="content" source="media/manage-relationships-graphql/manage-relationships-start.png" alt-text="Screenshot showing where to select aew relationship in Manage relationships pane. It shows.":::

1. Select **New relationship**. For this example, we create a new one-to-one relationship between the **Product** type and the **ProductModel** type, based on the **ProductModelID** field that exists in both types. We select **One to one** for **Cardinality**, select the **From** and **To** types, and then select the From and To fields for this relationship.

   :::image type="content" source="media/manage-relationships-graphql/create-relationship-one-to-one.png" alt-text="Screenshot showing examples of selections for the five required fields for a new relationship.":::

> [!NOTE]
> You can select multiple fields in the From and To field pickers. This feature lets you create relationships that include multiple fields.

1. Select **Create relationship**. Your list of relationships now shows the newly created relationship.

   :::image type="content" source="media/manage-relationships-graphql/create-relationship-result.png" alt-text="Screenshot showing the newly created relationship in the manage relationships pane.":::

1. Select the X in the upper-right corner to close the **Manage relationships** screen.

## One-to-many (1:N) and many-to-many (M:N) relationships

To create a one-to-many (1:N) relationship, for instance, between **Product** and **Order**, where each product can be associated with multiple orders, select **One to many** as the cardinality. This relationship reflects the idea that a single product can be linked to multiple orders but each order is linked to only one product.

For a many-to-many (M:N) relationship, such as between **Books** and **Authors**, where a book can have multiple authors and an author can have multiple books, choose **Many to Many** as the cardinality. You need to have a linking type in your schema to accommodate this kind of relationship.

The **New relationship** dialog shows another set of pickers when you select **Many-to-many** as the cardinality. For example, in **Books** and **Authors**, select a linking type like **BooksAuthors**, and fields such as **BookId** and **AuthorId** as the linking from and to fields.

:::image type="content" border="true" source="media/manage-relationships-graphql/many-to-many-linking.png" alt-text="Screenshot of the new relationship dialog for a many-to-many relationship.":::

## Considerations for many-to-many relationships

If your linking type has one or more fields that aren't referenced as **From field(s)** or **To field(s)**, API for GraphQL automatically generates the following four one-to-many relationships:

- A one-to-many relationship from the **From type** to the **Linking type**

- A one-to-many relationship from the **Linking type** to the **From type**

- A one-to-many relationship from the **To type** to the **Linking type**

- A one-to-many relationship from the **Linking type** to the **To type**

These let you reference the *unlinked* fields in the **Linking type** in any queries or mutations, and let queries or mutations reference the relationships in any direction.

If there are no *unlinked* fields in the **Linking type**, a single many-to-many relationship is created, and queries or mutations don't need to reference the **Linking type** to use the relationship.

## Delete a relationship

Delete a relationship from the **Manage relationships** screen by selecting the checkbox next to the relationship and selecting **Delete**.

## Related content

- [Fabric API for GraphQL editor](api-graphql-editor.md)
