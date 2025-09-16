---
title: HowTo - Access Fabric APIs
description: Learn how to Access Fabric APIs in the Workload
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 09/04/2025
---

# Access Fabric APIs

To make it easy for Workload developers to access the Fabric Public APIs, we provide the [FabricPlatformAPIClient](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/app/clients/FabricPlatformAPIClient.ts) client that abstracts the calls. With this client, you can access any public Fabric API on behalf of the user or with a service principal that you define.

## Creating a FabricPlatformAPIClient

There are two ways to create a FabricPlatformAPIClient:

### Using the current user's context (On-Behalf-Of flow)

```typescript
import { getWorkloadClient } from "../controller/WorkloadClient";
import { FabricPlatformAPIClient } from "../clients/FabricPlatformAPIClient";

// Create the client using the workload client (uses current user's credentials)
const client = FabricPlatformAPIClient.create(getWorkloadClient());
```

### Using a service principal

```typescript
import { FabricPlatformAPIClient } from "../clients/FabricPlatformAPIClient";

// Create with service principal authentication
const client = FabricPlatformAPIClient.createWithServicePrincipal(
  "your-client-id",
  "your-client-secret",
  "your-tenant-id"
);
```

## Example: Creating a new item

Here's an example of how to create a new Notebook item in a Fabric workspace:

```typescript
import { FabricPlatformAPIClient } from "../clients/FabricPlatformAPIClient";
import { getWorkloadClient } from "../controller/WorkloadClient";

async function createNewNotebook() {
  try {
    // Get the client
    const client = FabricPlatformAPIClient.create(getWorkloadClient());
    
    // Get the current workspace ID
    const workspace = await client.workspaces.getCurrentWorkspace();
    const workspaceId = workspace.id;
    
    // Create a new notebook item
    const newItem = await client.items.createItem(workspaceId, {
      displayName: "My New Notebook",
      description: "Created via FabricPlatformAPIClient",
      type: "Notebook", // Item type code
      // Optional: Specify folder ID if you want to create in a specific folder
      // folderId: "your-folder-id",
      
      // Optional: Add item-specific creation properties
      creationPayload: {
        notebookDefaultLanguage: "python"
      }
    });
    
    console.log("Created new item:", newItem);
    return newItem;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}
```

## Example: Creating an item with a definition

For more complex items that require a definition (like a Lakehouse), you can include the definition:

```typescript
async function createLakehouse() {
  const client = FabricPlatformAPIClient.create(getWorkloadClient());
  const workspace = await client.workspaces.getCurrentWorkspace();
  
  const newLakehouse = await client.items.createItem(workspace.id, {
    displayName: "My New Lakehouse",
    description: "Sample Lakehouse created programmatically",
    type: "Lakehouse",
    definition: {
      format: "json",
      parts: [
        {
          path: "definition/settings.json",
          content: JSON.stringify({
            schemaVersion: "1.0",
            // Lakehouse-specific settings
            settings: {
              defaultDatabase: "MyDatabase"
            }
          })
        }
      ]
    }
  });
  
  return newLakehouse;
}
```

## Working with other Fabric resources

The FabricPlatformAPIClient provides access to various Fabric resources:

```typescript
// List all workspaces
const workspaces = await client.workspaces.listWorkspaces();

// Get workspace capacities
const capacities = await client.capacities.listCapacities();

// Work with OneLake
const tables = await client.oneLake.listTables(workspaceId, lakehouseId);

// Work with connections
const connections = await client.connections.listConnections(workspaceId);
```
