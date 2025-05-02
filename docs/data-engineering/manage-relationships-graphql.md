---
title: Manage relationships in Fabric API for GraphQL
description: Learn how to manage relationships in Fabric API for GraphQL, including how to create and delete relationships.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: conceptual
ms.custom:
ms.search.form: GraphQL manage relationships
ms.date: 05/21/2024
---

# Manage relationships in Fabric API for GraphQL

One of the most powerful features in GraphQL is the ability to establish relationships across types, including support for one-to-one (1:1), one-to-many (1:N), and many-to-many (M:N) relationships.

## Create a new one-to-one (1:1) relationship

1. From the **Schema explorer** pane, select the ellipsis next to a type and select the **Manage relationships** option. The **Manage relationships** screen appears.

   :::image type="content" source="media/manage-relationships-graphql/manage-relationships-start.png" alt-text="Screenshot of the Manage relationships screen, showing where to select the New relationship option.":::

2. Select **New relationship**. For this example, we create a new one-to-one relationship between the **Product** type and the **ProductModel** type, based on the **ProductModelID** field that exists in both types. We select **One to one** for **Cardinality**, select the **From** and **To** types, and then select the From and To fields for this relationship.

   :::image type="content" source="media/manage-relationships-graphql/create-relationship-one-to-one.png" alt-text="Screenshot of the New relationship screen, showing examples of selections for the five required fields.":::

   > [!NOTE]
   > You can choose multiple fields in the From and To field pickers. This feature allows you to create relationships that comprise multiple fields.

3. Select **Create relationship**. Your list of relationships now shows the newly created relationship.

   :::image type="content" source="media/manage-relationships-graphql/create-relationship-result.png" alt-text="Screenshot of the Manage relationships screen showing the newly created relationship in the list.":::

4. Select the X in the upper right corner to close the **Manage relationships** screen.

## One-to-many (1:N) and many-to-many (M:N) relationships

To create a one-to-many (1:N) relationship, for instance, between **Product** and **Order**, where each product can be associated with multiple orders, select **One to many** as the cardinality. This relationship reflects the idea that a single product can be linked to multiple orders but each order is linked to only one product.

For a many-to-many (M:N) relationship, such as between **Books** and **Authors**, where a book can have multiple authors and an author can have multiple books, choose **Many to Many** as the cardinality. You need to have a linking type in your schema to accommodate this kind of relationship.

The **New relationship** dialog shows you another set of pickers when you choose **Many-to-many** as the cardinality. In the example of **Books** and **Authors**, you would select a linking type such as **BooksAuthors**, and fields such as **BookId** and **AuthorId** as the linking from and to fields.

:::image type="content" border="true" source="media/manage-relationships-graphql/many-to-many-linking.png" alt-text="Screenshot of the New relationship dialog for a many-to-many relationship.":::

## Considerations for many-to-many relationships

If your linking type contains one or more fields that aren't referenced as **From field(s)** or **To field(s)**, API for GraphQL automatically generates four one-to-many relationships, as follows:

- A one-to-many relationship from the **From type** to the **Linking type**
- A one-to-many relationship from the **Linking type** to the **From type**
- A one-to-many relationship from the **To type** to the **Linking type**
- A one-to-many relationship from the **Linking type** to the **To type**

These allow you to reference the *unlinked* fields in the **Linking type** in any queries or mutations, while also allowing queries/mutations that reference the relationships in any direction.

In the case there are no *unlinked* fields in the **Linking type**, a single many-to-many relationship will be created, and any queries or mutations will not need to reference the **Linking type** to leverage the relationship.

## Delete a relationship

You can delete a relationship from the **Manage relationships** screen by selecting the checkbox next to the relationship and then selecting **Delete**.

## Related content

- [Fabric API for GraphQL editor](api-graphql-editor.md)
