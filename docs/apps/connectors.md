---
title: Connect Fabric Apps to Fabric data
description: Learn how to add Fabric data connectors to a Fabric app and query a lakehouse, warehouse, SQL database in Fabric, or semantic model.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 09/15/2026
ai-usage: ai-assisted
---

# Connect Fabric Apps to Fabric data

Connectors provide typed access from a Fabric app to data in other Fabric items. Use a connector to query a lakehouse, warehouse, SQL database in Fabric, or semantic model without configuring a separate data service.

## Supported connectors

Choose a connector based on the Fabric item and operations that your app needs:

| Fabric item | Connector type | Supported operations |
| --- | --- | --- |
| Lakehouse SQL analytics endpoint | `fabric-sqlanalytics` | `read` |
| warehouse | `fabric-warehouse` | `read`, `create`, `update`, and `delete` |
| SQL database in Fabric | `fabric-sqldatabase` | `read`, `create`, `update`, and `delete` |
| Semantic model | `fabric-semanticmodel` | `executeQuery` |

For warehouse and SQL database in Fabric connectors, configure only the operations that your app needs. The lakehouse connector is read-only.

## Prerequisites

- A Fabric Apps project created with `npm create @microsoft/rayfin@latest` or initialized with `npx rayfin init`.
- A Fabric workspace that contains the item you want to connect to.
- Permission to access the workspace and source item.
- The workspace ID and item ID, which you can find in the Fabric URL or by using the connector search command.

## Find a Fabric item

Use `connector search` to list items of a specific type in a workspace. The following example lists warehouses:

```bash
npx rayfin connector search --workspace-id <workspace-id> --type fabric-warehouse --json
```

Replace `<workspace-id>` with your Fabric workspace ID. To search for another supported item, change the `--type` value. You can also add a name filter:

```bash
npx rayfin connector search "sales" --workspace-id <workspace-id> --type fabric-warehouse --json
```

Copy the item ID from the search result.

## Add a connector

Run `connector add` from the root of your Fabric Apps project. The following example adds a read-only warehouse connector named `inventory`:

```bash
npx rayfin connector add --type fabric-warehouse --workspace-id <workspace-id> --item-id <warehouse-item-id> --name inventory --operations read
```

Use the corresponding connector type and operations for other Fabric items:

```bash
# Lakehouse SQL analytics endpoint
npx rayfin connector add --type fabric-sqlanalytics --workspace-id <workspace-id> --item-id <lakehouse-item-id> --name analytics --operations read

# SQL database in Fabric
npx rayfin connector add --type fabric-sqldatabase --workspace-id <workspace-id> --item-id <sql-database-item-id> --name operational --operations read

# Semantic model
npx rayfin connector add --type fabric-semanticmodel --workspace-id <workspace-id> --item-id <semantic-model-item-id> --name salesModel --operations executeQuery
```

The command:

- Adds the connector to the top-level `connectors` section in `rayfin/rayfin.yml`.
- Creates the connector files under `rayfin/connectors/<connector-name>/`.
- Prints a version-matched `npm install` command for the required connector packages.

Run the exact install command printed by the CLI. This keeps the connector packages aligned with your Rayfin CLI version.

> [!NOTE]
> Schema discovery is best effort. The connector can be added even if discovery doesn't complete. If the CLI displays a discovery warning, resolve it before you define entities from the generated `metadata.json` file.

SQL connector types (`fabric-sqlanalytics`, `fabric-warehouse`, and `fabric-sqldatabase`) default to **application** authentication in CLI 1.36.2. They access the source as the app identity, currently the app item owner. You can explicitly choose **delegated** authentication to use each signed-in caller's source permissions instead. Semantic models support delegated authentication only.

A default warehouse and semantic model configuration resembles:

```yaml
connectors:
  - name: inventory
    type: fabric-warehouse
    config:
      workspaceId: "<workspace-id>"
      itemId: "<warehouse-item-id>"
    auth:
      type: application
    operations:
      - name: read

  - name: salesModel
    type: fabric-semanticmodel
    config:
      workspaceId: "<workspace-id>"
      itemId: "<semantic-model-item-id>"
    auth:
      type: delegated
    version: "1"
    operations:
      - name: executeQuery
```

Keep the semantic model `version` value that the CLI generates.

### Choose the source identity

| Mode | Source permissions | When to use it |
| --- | --- | --- |
| `application` | Grant the app identity access to the source item and the required SQL permissions. App users still need app access and entity permissions. | SQL connectors that expose app-controlled access to shared source data. |
| `delegated` | Each caller needs access to the source item and permission for the requested operation. Semantic model queries require the caller's applicable model permissions, including Build. | Per-user source authorization, or any semantic model connector. |

For delegated SQL access in CLI 1.36.2, set `auth.type: delegated` on that connector in `rayfin/rayfin.yml` before deploying. CLI versions whose `connector add --help` exposes `--auth` can select it at creation time:

```bash
npx rayfin connector add --type fabric-warehouse --workspace-id <workspace-id> --item-id <warehouse-item-id> --name inventory --operations read --auth delegated
```

The `--auth` flag isn't available in CLI 1.36.2; use the YAML setting with that release. Where the flag is supported, it accepts `application` or `delegated` only if the connector type supports that mode. Don't configure application authentication for a semantic model.

Changing the mode doesn't grant source permissions. Developer sign-in and schema discovery use the developer's access and don't prove that the deployed runtime identity can access the source. Existing declarations aren't automatically migrated to the new default; keep `auth.type` explicit. After re-adding a connector, review the generated mode before deploying.

## Configure an entity connector

Lakehouse, warehouse, and SQL database connectors expose selected source tables as typed entities. Use the generated `metadata.json` file to define only the tables and columns that your app needs.

The following example assumes that the selected warehouse contains a `dbo.Order` table with an integer primary key named `OrderID` and a text column named `customerEmail`. Replace these illustrative names and types with values from your generated metadata.

> [!IMPORTANT]
> Don't infer a primary key from a column name. If a source table doesn't have a key, omit `primaryKey`. Keyless entities don't support operations that address a row by key.

Create the entity:

```typescript
// rayfin/connectors/inventory/Order.ts
import { entity, int, text, role } from '@microsoft/rayfin-core';
import { Source } from '@microsoft/rayfin-connectors';

@role('authenticated', ['read'])
@entity()
export class Order extends Source({
  schema: 'dbo',
  table: 'Order',
  primaryKey: ['orderId'],
}) {
  @int({ column: 'OrderID' }) orderId!: number;
  @text() customerEmail!: string;
}
```

Then register the entity in the connector schema:

```typescript
// rayfin/connectors/inventory/schema.ts
import type { GraphQLBackedConnector } from '@microsoft/rayfin-connector-fabric-graphql';
import type { ConnectorConfig } from '@microsoft/rayfin-connectors';
import { Order } from './Order.js';

export { Order } from './Order.js';

export const connectorConfig = {
  connector: 'fabric-warehouse',
  operations: ['read'],
  entities: { Order },
} as const satisfies ConnectorConfig;

export type InventorySchema = GraphQLBackedConnector<
  { Order: typeof Order },
  typeof connectorConfig
>;
```

Keep the connector name, schema property, and client configuration name consistent.

## Configure the connectors client

Add the connector schemas to `ConnectorsRayfinClient`. Semantic model connectors also require the `fabricSemanticModel()` runtime:

```typescript
// src/lib/connectors.ts
import { ConnectorsRayfinClient } from '@microsoft/rayfin-client';
import { fabricSemanticModel } from '@microsoft/rayfin-connector-fabric-semanticmodel';

import {
  connectorConfig as inventoryConfig,
  type InventorySchema,
} from '../../rayfin/connectors/inventory/schema.js';
import {
  connectorConfig as salesModelConfig,
  type SalesModelSchema,
} from '../../rayfin/connectors/salesModel/schema.js';

type AppConnectorsSchema = {
  inventory: InventorySchema;
  salesModel: SalesModelSchema;
};

export const client = new ConnectorsRayfinClient<
  Record<string, never>,
  Record<string, never>,
  AppConnectorsSchema
>(
  {
    baseUrl: '<app-api-url>',
    publishableKey: '<publishable-key>',
    authStorage: true,
    connectors: {
      inventory: inventoryConfig,
      salesModel: salesModelConfig,
    },
  },
  {
    salesModel: fabricSemanticModel(),
  }
);
```

Use the API URL and publishable key from your Fabric Apps project. Keep the app's existing sign-in flow. Creating the client doesn't sign in a user.

## Query connected data

After the user signs in, access an entity connector through its name and entity:

```typescript
const orders = await client.connectors.inventory.Order
  .select(['orderId', 'customerEmail'])
  .first(20)
  .execute();
```

Select columns explicitly and bound the number of returned rows.

For a semantic model, submit a DAX query with `executeQuery`:

```typescript
const result = await client.connectors.salesModel.executeQuery({
  query: 'EVALUATE TOPN(10, Sales)',
});

if (result.status === 'success') {
  console.log(result.table.columns, result.table.rows);
} else {
  console.error(result.error.category, result.error.message);
}
```

Replace `Sales` with a table in your semantic model. Check the returned status before you use the result.

## Secure connector access

Use these controls together:

- Limit the connector's operations in `rayfin.yml` to the actions the app needs.
- Add `@role` declarations to connector entities to control which signed-in users can perform each operation.
- Add row policies or field include and exclude rules when users need access to only part of an entity.
- Choose the source identity deliberately. With application authentication, enforce per-user access through app and entity permissions rather than assuming that source permissions are checked for each caller. With delegated authentication, also verify each caller's source access.

Client-side TypeScript types improve development safety, but they aren't an authorization boundary. Enforce access in the connector configuration and entity roles.

## Deploy the connector

Deploy the app and connector configuration:

```bash
npx rayfin up
```

Test the deployed app with the expected app users and runtime source identity. For application authentication, verify the app identity's source permissions; for delegated authentication, verify each caller's source permissions.

## Related content

- [Create an app connected to a semantic model](data-apps-template.md)
- [Define data models](data-models.md)
- [Define data permissions](data-permissions.md)
- [Authentication for Fabric Apps](authentication.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
- [Rayfin CLI reference](cli-reference.md)
