---
title: Microsoft Fabric GraphQL API editor
description: Learn about the Microsoft Fabric GraphQL API editor, including where to find the editor and what the editor screen looks like. 
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: conceptual
ms.search.form: GraphQL query editor
ms.date: 04/05/2024
---

# GraphQL API editor

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

The Fabric API for GraphQL provides a graphical in-browser GraphQL development environment enabling an interactive playground to compose, test, and see the live results of your GraphQL queries and mutations.

To go to the API editor, navigate to the Data Development experience and select the **Query** button at the lower left corner of your Fabric portal screen.

:::image type="content" source="media/graphql-api-editor/query-view-button.png" alt-text="Screenshot showing where the Query option appears next to the Fabric experience selector in the lower left corner.":::

You can type code directly on the **Query** tab. Intellisense capabilities are available with a keyboard shortcut: CTRL + Space (Windows), or Command + Space (macOS).

:::image type="content" source="media/graphql-api-editor/query-editor-intellisense.png" alt-text="Screenshot of the GraphQL API editor screen, which has a Query tab that is divided into Run, Query variables, and Results panes." lightbox="media/graphql-api-editor/query-editor-intellisense.png":::

## Development of queries and mutations

Considering the following simple GraphQL schema defining a single `Post` type with queries to read a single post or list all posts, and mutations to create, update, or delete posts supporting all CRUDL use cases:

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

We can read the data exposed via GraphQL using any query defined in the schema. For example, the `getPost` query should look like:

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

We write data using mutations like `createPost` to create a post with the required parameters:

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

Use the **Query variables** pane on the right side of the **Query** tab to pass any parameters as variables to your queries or mutations. Variables work the same way as variables in any other programming language: each variable needs to be declared with a name that is used to access the value that is stored in it. Taking the previous mutation example, we can modified it slightly to leverage query variables:

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

The variables should be defined in the pane as such:

```json
    {
      "id": "5678",
      "title": "Second Post",
      "content": "This is my second post.",
      "author": "Jane Doe"
    }
```

Variables make the mutation code cleaner, easier to read, test, and modify the parameters accordingly.

## Related content

- [Fabric GraphQL API schema view and Schema explorer](graphql-schema-view.md)
