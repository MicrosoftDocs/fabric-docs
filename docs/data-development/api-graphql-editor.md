---
title: Microsoft Fabric API for GraphQL editor
description: Learn about the Fabric API for GraphQL editor, including where to find the editor and what the editor screen looks like. 
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: conceptual
ms.search.form: GraphQL query editor
ms.date: 05/02/2024
---

# Fabric API for GraphQL editor

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

The Fabric API for GraphQL provides a graphical in-browser GraphQL development environment, which enables an interactive playground to compose, test, and see the live results of your GraphQL queries and mutations.

To go to the API editor, navigate to Data Development and select **Query** at the lower left corner of your Fabric portal screen.

:::image type="content" source="media/api-graphql-editor/query-view-button.png" alt-text="Screenshot showing where the Query option appears in the lower left corner of the Fabric screen.":::

You can type code directly on the **Query** tab. Intellisense capabilities are available with a keyboard shortcut: CTRL + Space (Windows), or Command + Space (macOS).

:::image type="content" source="media/api-graphql-editor/query-editor-intellisense.png" alt-text="Screenshot of the API editor screen, which has a Query tab that is divided into Run, Query variables, and Results panes." lightbox="media/api-graphql-editor/query-editor-intellisense.png":::

## Development of queries and mutations

Review the following short GraphQL schema, which defines a single `Post` type with queries to read a single post or list all posts. It also defines mutations to create, update, or delete posts supporting all CRUDL (create, read, update, delete, list) use cases.

```json
type Post {
  id: ID!
  title: String!
  content: String!
  author: String!
  published: Boolean
}

type Query {
  getPost(id: ID!): Post
  getAllPosts: [Post]
}

type Mutation {
  createPost(title: String!, content: String!, author: String!): Post
  updatePost(id: ID!, title: String, content: String, author: String, published: Boolean): Post
  deletePost(id: ID!): Boolean
}
```

You can read the data exposed via GraphQL using any query defined in the schema. The `getPost` query should look like the following example.

```json
query MyQuery {
  getPost(id: "1234") {
    title
    content
    author
  }
}
```

*Response:*

```json
{
  "data": {
    "getPost": {
      "title": "First Post",
      "content": "This is my first post.",
      "author": "Jane Doe"
    }
  }
}
```

Write data using mutations like `createPost` to create a post with the required parameters.

```json
mutation MyMutation {
  createPost(title: "Second post", content: "This is my second post", author: "Jane Doe", published: false) {
    id
    title
    content
    author
  }
}
```

*Response:*

```json
{
  "data": {
    "createPost": {
      "id": "5678",
      "title": "Second Post",
      "content": "This is my second post.",
      "author": "Jane Doe"
    }
  }
}
```

## Query variables

Use the **Query variables** pane on the right side of the **Query** tab to pass any parameters as variables to your queries or mutations. Variables work the same way as variables in any other programming language. Each variable needs to be declared with a name that is used to access the value stored in it. With the previous mutation example, you can modify it slightly to use query variables.

```json
mutation MyMutation ($title: String!, $content: String!, $author: String!, $published: boolean){
  createPost(title: $title, content: $content, author: author$) {
    id
    title
    content
    author
  }
}
```

Define the variables in the pane like the following example.

```json
    {
      "id": "5678",
      "title": "Second Post",
      "content": "This is my second post.",
      "author": "Jane Doe"
    }
```

Variables make the mutation code cleaner and easier to read, test, and modify the parameters.

## Related content

- [Fabric API for GraphQL schema view and Schema explorer](graphql-schema-view.md)
