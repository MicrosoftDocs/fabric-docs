---
title: Microsoft Fabric API for GraphQL editor
description: Learn about the Fabric API for GraphQL editor, including where to find the editor and what the editor screen looks like.
#customer intent: As a developer, I want to learn how to use the Fabric API for GraphQL editor so that I can compose and test GraphQL queries interactively.  
ms.reviewer: sngun
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom: freshness-kr
ms.search.form: GraphQL query editor
ms.date: 01/21/2026
---

# Fabric API for GraphQL editor

The Fabric API for GraphQL provides a graphical in-browser GraphQL development environment, which enables an interactive playground to compose, test, and see the live results of your GraphQL queries and mutations.

## Who uses the GraphQL editor

The GraphQL editor is essential for:
- **Application developers** prototyping and testing queries against Fabric data before implementing them in applications
- **Data engineers** exploring lakehouse and warehouse data structures and validating GraphQL schema designs
- **Fabric workspace contributors** testing data access permissions and troubleshooting query issues
- **BI developers** learning the API structure and creating data access patterns for custom applications
- **Development teams** collaborating on query development and troubleshooting data access issues within Fabric workspaces

Use the editor whenever you need to interactively develop, test, or debug GraphQL queries against your Fabric data sources.

## Get started with the GraphQL editor

Follow these steps to start using the GraphQL editor:

1. **Open the GraphQL API item** - Navigate to your workspace in Fabric and open the API for GraphQL item.

1. **Access the editor** - Select **Query** in the lower-left corner of your portal screen.

   :::image type="content" source="media/api-graphql-editor/query-view-button.png" alt-text="Screenshot showing where the Query option appears in the lower-left corner of the Fabric screen." lightbox="media/api-graphql-editor/query-view-button.png":::

1. **Write your query** - Type your GraphQL queries directly on the **Query** tab. Use Intellisense with keyboard shortcuts:
   - **Windows**: CTRL + Space
   - **macOS**: Command + Space

   :::image type="content" source="media/api-graphql-editor/query-editor-intellisense.png" alt-text="Screenshot of the API editor screen, which shows a Query tab divided into Run, Query variables, and Results panes." lightbox="media/api-graphql-editor/query-editor-intellisense.png":::

1. **Execute the query** - Select **Run** to execute the query and retrieve data from your data source.

## Generate code

The API editor automatically generates boilerplate Python or Node.js code that reflects the GraphQL query or mutation you're currently testing in the editor. As you prototype and refine your queries, the generated code updates accordingly. Once you're satisfied with the results, you can view and copy the generated code to run locally for testing purposes or reuse it in your application development process.

> [!IMPORTANT]
> The generated code uses interactive browser credentials and should be used for testing purposes only. In production, always register an application in Microsoft Entra and use the appropriate `client_id` and scopes. You can find an end-to-end example with sample code at [Connect Applications](connect-apps-api-graphql.md).

To get started:

1. **Write a query** - Enter the following sample query (or your own) in the Query editor:

   ```graphql
   query {
     addresses(first: 5) {
        items {
           AddressID
           City
           StateProvince
           CountryRegion
        }  
     }
   }
   ```

1. **Run the query** - Select **Run** to execute the query and verify it works correctly in the editor before proceeding.

1. **Generate code** - Select the **Generate code** button and then select your preferred programming language ([Python](#python) or [JavaScript/Node.JS](#nodejs)):

    :::image type="content" source="media/api-graphql-editor/query-editor-generate-code.png" alt-text="Screenshot of the API editor screen showing the dropdown to select the programming language for generated code." lightbox="media/api-graphql-editor/query-editor-generate-code.png":::

1. You can then copy the generated code and save it as a file in a local folder. Depending on the chosen language, follow these quick steps to test locally:

### Python

1. Create a file named `editor.py` and paste the generated code from the example query above.

1. Create a virtual environment by running the command `python -m venv .venv`.

1. Activate the `venv` by running `.venv\Scripts\activate` or `source .venv/bin/activate`.

1. Install the required dependency by running `pip install azure-identity`.

1. Execute the code with `python editor.py`.
1. You're prompted to sign in via a browser window to authenticate the request.
1. The response from the API is printed in the console.

    ```json
    {
    	"data": {
    		"addresses": {
    			"items": [
    				{
    					"AddressID": 9,
    					"City": "Bothell",
    					"StateProvince": "Washington",
    					"CountryRegion": "United States"
    				},
    				{
    					"AddressID": 11,
    					"City": "Bothell",
    					"StateProvince": "Washington",
    					"CountryRegion": "United States"
    				},
    				{
    					"AddressID": 25,
    					"City": "Dallas",
    					"StateProvince": "Texas",
    					"CountryRegion": "United States"
    				},
    				{
    					"AddressID": 28,
    					"City": "Phoenix",
    					"StateProvince": "Arizona",
    					"CountryRegion": "United States"
    				},
    				{
    					"AddressID": 32,
    					"City": "Montreal",
    					"StateProvince": "Quebec",
    					"CountryRegion": "Canada"
    				}
    			]
    		}
    	}
    }
    ```

### Node.JS

1. Create a file named `editor.js` and paste the generated code from the example query above.

1. In the same folder as `editor.js`, create a `package.json` file with the following contents:

    ```json
    {
      "type": "module",
      "dependencies": {}
    }
    ```

1. Install [Node.js](https://nodejs.org/download/) on your development machine (includes npm)
1. Run `npm install @azure/identity` or a similar command in your chosen package manager to install the latest version of the identity library.

1. Run `node editor.js` to execute the code.
1. You're prompted to sign in via a browser window to authenticate the request.
1. The response from the API is printed in the console.

    ```json
    {
    	"data": {
    		"addresses": {
    			"items": [
    				{
    					"AddressID": 9,
    					"City": "Bothell",
    					"StateProvince": "Washington",
    					"CountryRegion": "United States"
    				},
    				{
    					"AddressID": 11,
    					"City": "Bothell",
    					"StateProvince": "Washington",
    					"CountryRegion": "United States"
    				},
    				{
    					"AddressID": 25,
    					"City": "Dallas",
    					"StateProvince": "Texas",
    					"CountryRegion": "United States"
    				},
    				{
    					"AddressID": 28,
    					"City": "Phoenix",
    					"StateProvince": "Arizona",
    					"CountryRegion": "United States"
    				},
    				{
    					"AddressID": 32,
    					"City": "Montreal",
    					"StateProvince": "Quebec",
    					"CountryRegion": "Canada"
    				}
    			]
    		}
    	}
    }
    ```
    

## Development of queries and mutations

The following examples demonstrate GraphQL query and mutation syntax using the AdventureWorks sample data. These examples assume you're working with a Fabric Data Warehouse that supports write operations (mutations). Data sources accessed via SQL Analytics Endpoints (like Lakehouses and mirrored databases) are read-only and only support queries, not mutations.

Review this short GraphQL schema excerpt from AdventureWorks. It defines a `Product` type with queries to read a single product or list all products, and mutations to create, update, or delete products, supporting all CRUDL (create, read, update, delete, list) use cases.

```graphql
{
  type Product {
    ProductID: Int!
    Name: String!
    ProductNumber: String!
    Color: String
    ListPrice: Float!
    SellStartDate: DateTime!
  }

  type Query {
    products(first: Int, filter: ProductFilterInput): ProductConnection
    products_by_pk(ProductID: Int!): Product
  }

  type Mutation {
    createProduct(Name: String!, ProductNumber: String!, ListPrice: Float!, SellStartDate: DateTime!): Product
    updateProduct(ProductID: Int!, Name: String, Color: String, ListPrice: Float): Product
    deleteProduct(ProductID: Int!): Boolean
  }
}
```

Read the data exposed via GraphQL using any query defined in the schema. The `products_by_pk` query retrieves a single product by its primary key:

```graphql
query MyQuery {
  products_by_pk(ProductID: 680) {
    ProductID
    Name
    ProductNumber
    Color
    ListPrice
  }
}
```

**Response:**

```json
{
  "data": {
    "products_by_pk": {
      "ProductID": 680,
      "Name": "HL Road Frame - Black, 58",
      "ProductNumber": "FR-R92B-58",
      "Color": "Black",
      "ListPrice": 1431.50
    }
  }
}
```

Use mutations like `createProduct` to write data and create a new product with the required parameters.

```graphql
mutation MyMutation {
  createProduct(
    Name: "Mountain Bike Helmet - Blue", 
    ProductNumber: "HE-M897-B", 
    ListPrice: 89.99,
    SellStartDate: "2025-01-01T00:00:00Z"
  ) {
    ProductID
    Name
    ProductNumber
    ListPrice
  }
}
```

**Response:**

```json
{
  "data": {
    "createProduct": {
      "ProductID": 1001,
      "Name": "Mountain Bike Helmet - Blue",
      "ProductNumber": "HE-M897-B",
      "ListPrice": 89.99
    }
  }
}
```

## Query variables

Use the **Query variables** pane on the right side of the **Query** tab to pass parameters as variables to your queries or mutations. Variables work like variables in other programming languages. Each variable is declared with a name used to access the value stored in it. Using the previous mutation example you modify it slightly to use query variables.

```graphql
mutation MyMutation ($name: String!, $productNumber: String!, $listPrice: Float!, $sellStartDate: DateTime!){
  createProduct(
    Name: $name, 
    ProductNumber: $productNumber, 
    ListPrice: $listPrice,
    SellStartDate: $sellStartDate
  ) {
    ProductID
    Name
    ProductNumber
    ListPrice
  }
}
```

Define variables in the **Query variables** pane using the following example.

```json
{
  "name": "Mountain Bike Helmet - Blue",
  "productNumber": "HE-M897-B",
  "listPrice": 89.99,
  "sellStartDate": "2025-01-01T00:00:00Z"
}
```

Variables make the mutation code cleaner, easier to read, test, and modify. They also make it simple to reuse the same mutation with different values by just changing the variables.

## Related content

- [More query and mutation examples](/azure/data-api-builder/graphql#supported-root-types)
- [Fabric API for GraphQL schema view and schema explorer](graphql-schema-view.md)
