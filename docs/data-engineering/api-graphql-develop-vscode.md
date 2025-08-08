---
title: Develop GraphQL applications on VSCode
description: Learn how to develop GraphQL applications in VSCode using local development tools including autocompletion, code generation, and IntelliSense
ms.reviewer: sngun
ms.author: sngun
author: edlima
ms.topic: how-to
ms.custom:
ms.search.form: Develop GraphQL applications on VSCode
ms.date: 08/07/2025
---

# Develop GraphQL applications on Visual Studio Code

Learn how to build a front-end application with React, Apollo Client, and TypeScript that integrates with a GraphQL API hosted in Microsoft Fabric. This tutorial covers setting up local development tools including autocompletion, code generation, and IntelliSense for an optimal developer experience.

## Prerequisites

Before you begin, ensure you have:

- A Microsoft Fabric workspace with appropriate permissions
- Node.js and npm installed on your development machine
- Visual Studio Code
- Basic knowledge of React, TypeScript, and GraphQL concepts

## Step 1: Create a GraphQL API in Microsoft Fabric

### Create a SQL database

1. In your Fabric workspace, select **New Item**.
2. Select **SQL database (preview)**.
3. Provide a name for your database.
4. Select **Sample data** to automatically create tables and populate them with sample data.

### Create the GraphQL API

1. In your SQL database, select **New API for GraphQL** from the ribbon.
2. Provide a name for your API.
3. Select all the **SalesLT** tables from your database.
4. Select **Load** to generate the API.

Your GraphQL API is now ready and available in your Fabric workspace.

## Step 2: Set up your development environment

### Clone the starter application

Clone the React starter application from the Microsoft Fabric samples repository:

```bash
git clone https://github.com/microsoft/fabric-samples.git
cd fabric-samples/docs-samples/data-engineering/GraphQL/React-Apollo-TS
```

### Install dependencies

Install the required packages for GraphQL development, autocompletion and code generation:

```bash
npm install
```

### Install Visual Studio Code extension

Install the [GraphQL: Language Feature Support](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) extension in Visual Studio Code to enable syntax highlighting, validation, and IntelliSense for GraphQL operations.

## Step 3: Configure your GraphQL schema

You can obtain your GraphQL schema in two ways:

### Option 1: Export schema as static file

1. In your Fabric GraphQL API, select **Export Schema** from the ribbon.
2. Save the `schema.graphql` file to your project root directory.

### Option 2: Use remote endpoint

1. Access the GraphQL API you created in the Fabric Portal.
2. Obtain an authorization token using PowerShell with [Get-PowerBIAccessToken](/powershell/module/microsoftpowerbimgmt.profile/get-powerbiaccesstoken)

> [!NOTE]
>While the remote endpoint option will always provide the most up to date schema, the retrieved token is temporary and expires hourly. They should be used for testing and development purposes only, whenever possible use a static file to avoid issues with token expiration.

## Step 4: Configure IntelliSense and autocompletion

IntelliSense provides real-time code suggestions, error detection, and field validation, significantly improving development productivity and code quality.

Create a configuration file at your project root:

### Using static schema file

Create `.graphqlrc.yml`:

```yaml
schema: './schema.graphql'
documents: 'src/**/*.{ts,tsx,graphql,gql}'
```

### Using remote endpoint

Create `graphql.config.yml`:

```yaml
schema:
  - https://your-graphql-endpoint.com/graphql:
      headers:
        Authorization: Bearer YOUR_ACCESS_TOKEN
documents: src/**/*.{ts,tsx,graphql,gql}
```

### Configuration options

- **schema**: Specifies the location of your GraphQL schema
- **documents**: Defines which files should have IntelliSense support

After creating the configuration file, restart Visual Studio Code to ensure changes take effect.

## Step 5: Set up code generation

GraphQL code generation automatically creates strongly-typed TypeScript interfaces and React hooks from your schema and operations, reducing errors and improving development efficiency.

### Create codegen configuration

Create `codegen.yml` at your project root:

```yaml
schema: './schema.graphql'
documents: './src/**/*.graphql'
generates:
  src/generated/graphql.tsx:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      withHooks: true
```

### Configuration breakdown

- **schema**: Path to your schema file or remote endpoint
- **documents**: Glob pattern for locating GraphQL operation files
- **generates**: Specifies the output file for generated code
- **plugins**: Determines what code to generate (TypeScript types and React Apollo hooks)

### Add codegen script

Add the code generation script to your `package.json`:

```json
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.yml"
  }
}
```

## Step 6: Write GraphQL operations

Create `.graphql` files in your `src` directory to define your queries and mutations. IntelliSense provides autocompletion and validation.

### Example query

Create `src/operations/customers.graphql`:

```graphql
query GET_CUSTOMERS(
  $after: String
  $first: Int
  $filter: CustomerFilterInput
  $orderBy: CustomerOrderByInput
) {
  customers(after: $after, first: $first, filter: $filter, orderBy: $orderBy) {
    items {
      CustomerID
      FirstName
      LastName
    }
  }
}
```

### Example mutation

```graphql
mutation ADD_CUSTOMER($input: CreateCustomerInput!) {
  createCustomer(item: $input) {
    CustomerID
    FirstName
    LastName
    Title
    Phone
    PasswordHash
    PasswordSalt
    rowguid
    ModifiedDate
    NameStyle
  }
}
```

## Step 7: Generate types and hooks

Run the code generation command to create TypeScript types and React hooks:

```bash
npm run codegen
```

Upon successful completion, you have the generated code in `src/generated/graphql.tsx` containing:

- TypeScript interfaces for all GraphQL types
- Strongly-typed React hooks for each operation
- Input and output type definitions

## Step 8: Use generated code in your React components

Import and use the generated hooks in your React components, for example:

```typescript
import React from 'react';
import { useGetCustomersQuery, useAddCustomerMutation } from '../generated/graphql';

const CustomersComponent: React.FC = () => {
  const { data, loading, error } = useGetCustomersQuery({
    variables: { first: 10 }
  });

  const [addCustomer] = useAddCustomerMutation();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.customers?.items?.map(customer => (
        <div key={customer.CustomerID}>
          {customer.FirstName} {customer.LastName}
        </div>
      ))}
    </div>
  );
};

export default CustomersComponent;
```

## Step 9: Configure authentication

Configure Microsoft Entra ID authentication for your application:

1. Create a Microsoft Entra app following the *Create a Microsoft Entra app* section in [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md#create-a-microsoft-entra-app).

2. Update the `authConfig.ts` file in your project with the required parameters:

```typescript
export const AUTH_CONFIG = {
    clientId: "<Enter_the_Application_Id_Here>",
    tenantId: "<Enter_the_Tenant_Id_Here>",
    clientSecret: "<Enter_the_Client_Secret_Here>", //optional
}
export const GRAPHQL_ENDPOINT = '<Enter_the_GraphQL_Endpoint_Here>';
```

For the complete configuration file, refer to the [authConfig.ts sample](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/GraphQL/React-Apollo-TS/src/authConfig.ts) in the repository.

## Step 10: Run your application

Start your development server:

```bash
npm run dev
```

Your application will launch in the browser. You are prompted to sign in with your Microsoft credentials to access the GraphQL API data. After that you are able to see the details from your Fabric SQL database `Customers` table.

## Related content

- [Microsoft Fabric GraphQL API overview](api-graphql-overview.md)
- [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md)
- [Apollo Client documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Code Generator documentation](https://the-guild.dev/graphql/codegen)