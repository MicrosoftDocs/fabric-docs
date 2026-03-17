---
title: HowTo - Access Fabric APIs
description: Learn how to Access Fabric APIs in the Workload
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# How-To: Access Fabric APIs

To make it easy for Workload developers to access the Fabric Public APIs, we provide the [FabricPlatformAPIClient](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/app/clients/FabricPlatformAPIClient.ts) client that abstracts the calls. This client primarily uses the **On-Behalf-Of (OBO) flow** to access Fabric APIs using the current user's credentials and permissions.

## Primary Authentication Method: On-Behalf-Of (OBO) Flow

The extensibility toolkit is designed around the **On-Behalf-Of (OBO) flow**, which is the recommended and primary way to access Fabric APIs. This flow:

* **Uses user credentials**: Operates with the permissions of the currently signed-in user
* **Maintains security context**: Ensures users can only access resources they have permission to
* **Simplifies development**: No need to manage service principal credentials
* **Follows best practices**: Aligns with Microsoft Fabric's security model

## Creating a FabricPlatformAPIClient

### Using On-Behalf-Of flow (Recommended)

```typescript
import { getWorkloadClient } from "../controller/WorkloadClient";
import { FabricPlatformAPIClient } from "../clients/FabricPlatformAPIClient";

// Create the client using the workload client (uses current user's credentials via OBO flow)
const client = FabricPlatformAPIClient.create(getWorkloadClient());
```

### Using a service principal (Advanced scenarios only)

> [!NOTE]
> Service principal authentication is only needed for advanced scenarios where you need to access Fabric APIs without a user context, such as background processing or automated workflows. For most extensibility toolkit workloads, use the OBO flow instead.

```typescript
import { FabricPlatformAPIClient } from "../clients/FabricPlatformAPIClient";

// Create with service principal authentication (advanced scenarios)
const client = FabricPlatformAPIClient.createWithServicePrincipal(
  "your-client-id",
  "your-client-secret", 
  "your-tenant-id"
);
```

## Example: Creating a new item

Here's an example of how to create a new Notebook item using the OBO flow (recommended):

```typescript
import { FabricPlatformAPIClient } from "../clients/FabricPlatformAPIClient";
import { getWorkloadClient } from "../controller/WorkloadClient";

async function createNewNotebook() {
  try {
    // Create the client using OBO flow with current user's credentials
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

For more complex items that require a definition (like a Lakehouse), you can include the definition using the OBO flow:

```typescript
async function createLakehouse() {
  // Create the client using OBO flow with current user's credentials
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
}
```

## Working with other Fabric resources

The FabricPlatformAPIClient provides access to various Fabric resources using the OBO flow:

```typescript
// Create the client using OBO flow with current user's credentials
const client = FabricPlatformAPIClient.create(getWorkloadClient());

// List all workspaces the user has access to
const workspaces = await client.workspaces.listWorkspaces();

// Get workspace capacities
const capacities = await client.capacities.listCapacities();

// Work with OneLake (with user's permissions)
const tables = await client.oneLake.listTables(workspaceId, lakehouseId);

// Work with connections (scoped to user's access)
const connections = await client.connections.listConnections(workspaceId);
```

## Key Benefits of Using FabricPlatformAPIClient with OBO Flow

* **Security**: All operations respect the current user's permissions and security context
* **Simplicity**: No need to manage service principal credentials or authentication flows
* **Consistency**: Works seamlessly with the extensibility toolkit's frontend-only architecture
* **Auditability**: All actions are performed and logged under the actual user's account
* **Best practices**: Follows Microsoft's recommended patterns for Fabric API access in extensibility scenarios
