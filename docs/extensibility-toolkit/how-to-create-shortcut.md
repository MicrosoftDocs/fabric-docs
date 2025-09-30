---
title: How to create shortcuts in your application
description: Learn how to create shortcuts from a lakehouse or S3 account into your Fabric workload item
author: gsaurer
ms.author: gesaur
ms.topic: how-to
ms.custom:
ms.date: 08/21/2025
---

# Create shortcuts in your item

This article explains how to implement shortcut functionality in your Microsoft Fabric workload item to reference data from lakehouses or external cloud storage sources like Amazon S3 without copying the data. Shortcuts allow your application to access and work with data from various sources through a unified interface, supporting the "single copy promise" of OneLake.

## Understanding shortcuts in Microsoft Fabric

Shortcuts in Microsoft Fabric provide a way to access data across domains, clouds, and accounts by creating a virtual view of data residing in different locations. When you create a shortcut in your workload item, you're creating a reference to the data without physically copying it, which:

- Reduces storage costs and data duplication
- Ensures data consistency by always pointing to the source data
- Simplifies data access for users through a unified namespace
- Provides potential performance benefits through intelligent caching

## Using the Shortcut Creation Control

The Fabric Extensibility Toolkit includes a Shortcut Creation Control that simplifies the process of creating shortcuts. This control provides a standardized user interface for shortcut creation, similar to the experience in native Fabric items.

To use the Shortcut Creation Control in your workload:

1. Import the control from the Extensibility Toolkit:

    ```typescript
    import { ShortcutCreationControl } from '@fabric/extensibility-toolkit';
    ```

2. Add the control to your component:

    ```typescript
    <ShortcutCreationControl
      supportedSourceTypes=['Lakehouse', 'MyWorkloadName.MyItemName']}, // Specify which source types your workload supports
      supportedTargetTypes={['Lakehouse', 'MyWorkloadName.MyItemName']} // Specify which source types your workload supports
    />
    ```


## Creating shortcuts programmatically

If you need to create shortcuts programmatically, you can use the `OneLakeShortcutClient` which provides a simplified interface for shortcut management:

### Setting up the OneLakeShortcutClient

```typescript
import { OneLakeShortcutClient } from '../clients/OneLakeShortcutClient';
import { WorkloadClientAPI } from "@ms-fabric/workload-client";

// Initialize the client in your component or service
const shortcutClient = new OneLakeShortcutClient(workloadClient);
```

### Creating different types of shortcuts

**OneLake Shortcuts (Fabric to Fabric):**

```typescript
// Create a shortcut to another Fabric item (Lakehouse, KQL Database, etc.)
const oneLakeShortcut = await shortcutClient.createOneLakeShortcut(
  workspaceId,           // Current workspace ID
  itemId,                // Current item ID
  'SharedLakehouse',     // Shortcut name
  '/Files',              // Target path in current item
  'source-workspace-id', // Source workspace ID
  'source-item-id',      // Source item ID (Lakehouse, etc.)
  '/Tables/Customers'    // Optional: specific path in source item
);
```

**Amazon S3 Shortcuts:**

```typescript
// Create an S3 shortcut
const s3Shortcut = await shortcutClient.createS3Shortcut(
  workspaceId,
  itemId,
  'S3CustomerData',      // Shortcut name
  '/Files',              // Target path in your item
  's3-connection-id',    // S3 connection ID (configured in Fabric)
  'my-bucket',           // S3 bucket name
  '/customer-data'       // Path within bucket
);
```

**Azure Data Lake Storage Gen2 Shortcuts:**

```typescript
// Create an ADLS Gen2 shortcut
const adlsShortcut = await shortcutClient.createAdlsGen2Shortcut(
  workspaceId,
  itemId,
  'ADLSData',            // Shortcut name
  '/Files',              // Target path in your item
  'adls-connection-id',  // ADLS Gen2 connection ID
  'mycontainer',         // Container name
  '/raw-data/analytics'  // Path within container
);
```

### Managing existing shortcuts

```typescript
// List all shortcuts in a folder
const shortcuts = await shortcutClient.getAllShortcuts(workspaceId, itemId, '/Files');

// Get a specific shortcut
const shortcut = await shortcutClient.getShortcut(workspaceId, itemId, '/Files/MyShortcut');

// Delete a shortcut
await shortcutClient.deleteShortcut(workspaceId, itemId, '/Files/MyShortcut');

// Filter shortcuts by type
const oneLakeShortcuts = await shortcutClient.getOneLakeShortcuts(workspaceId, itemId, '/Files');
const s3Shortcuts = await shortcutClient.getS3Shortcuts(workspaceId, itemId, '/Files');
const adlsShortcuts = await shortcutClient.getAdlsGen2Shortcuts(workspaceId, itemId, '/Files');

// Search shortcuts by name pattern
const customerShortcuts = await shortcutClient.searchShortcutsByName(
  workspaceId, itemId, '/Files', 'customer'
);
```

### Shortcut types and source configuration

Your workload can support different types of shortcuts depending on your use case. The `OneLakeShortcutClient` provides helper methods for common shortcut types:

#### OneLake shortcuts (Fabric items)

OneLake shortcuts allow your workload to access data stored in other Fabric items like Lakehouses, KQL Databases, etc.:

```typescript
// Using the OneLakeShortcutClient helper method
const lakehouseShortcut = await shortcutClient.createOneLakeShortcut(
  workspaceId,
  itemId,
  "SharedLakehouse",     // Shortcut name
  "/Files",              // Target path in your item
  "source-workspace-id", // Source workspace ID
  "lakehouse-item-id",   // Source lakehouse ID
  "/Tables/myTable"      // Optional: specific path in source
);
```

#### Amazon S3 shortcuts

S3 shortcuts enable access to data stored in Amazon S3 buckets:

```typescript
// Using the OneLakeShortcutClient helper method
const s3Shortcut = await shortcutClient.createS3Shortcut(
  workspaceId,
  itemId,
  "CustomerDataS3",      // Shortcut name
  "/Files",              // Target path in your item
  "s3-connection-id",    // S3 connection ID (pre-configured in Fabric)
  "my-bucket",           // S3 bucket name
  "/customer-folder"     // Path within the bucket
);
```

## Working with shortcut data

Once a shortcut is created, your workload can work with the data using the `OneLakeStorageClient`. This client provides methods to interact with both regular OneLake content and shortcut data through a unified interface.

### Setting up the OneLakeStorageClient

```typescript
import { OneLakeStorageClient } from '../clients/OneLakeStorageClient';
import { WorkloadClientAPI } from "@ms-fabric/workload-client";

// Initialize the storage client
const storageClient = new OneLakeStorageClient(workloadClient);
```

### Working with shortcut metadata

When working with shortcuts, it's important to understand that shortcut metadata and shortcut content are retrieved differently:

#### Getting shortcut information

To get information about shortcuts in a path, use `getPathMetadata` with `shortcutMetadata: true`:

```typescript
// Get metadata for a path including shortcut information
const metadata = await storageClient.getPathMetadata(
  workspaceId,
  'itemId/Files',       // Path to check for shortcuts
  false,                // recursive: false for current level only
  true                  // shortcutMetadata: true to include shortcut info
);

// Filter for shortcuts
const shortcuts = metadata.paths.filter(path => path.isShortcut);

console.log('Found shortcuts:', shortcuts.map(s => ({
  name: s.name,
  isShortcut: s.isShortcut,
  lastModified: s.lastModified
})));
```

#### Accessing shortcut content

>[!IMPORTANT]
> When `shortcutMetadata: true`, you only get information about the shortcut itself, not the content inside the shortcut. To access the actual data within a shortcut, you need to make a separate call using the shortcut's path:

```typescript
// First, get the shortcuts in the directory
const dirMetadata = await storageClient.getPathMetadata(
  workspaceId,
  'itemId/Files',
  false,
  true // Get shortcut metadata
);

// Find a specific shortcut
const myShortcut = dirMetadata.paths.find(path => 
  path.isShortcut && path.name === 'MyS3Shortcut'
);

if (myShortcut) {
  // Now get the content INSIDE the shortcut
  const shortcutContent = await storageClient.getPathMetadata(
    workspaceId,
    myShortcut.path,                    // Use the shortcut path
    true,                               // recursive: true to see all content
    false                              // shortcutMetadata: false to get actual content
  );

  console.log('Content inside shortcut:', shortcutContent.paths);
}
```

### Reading and writing shortcut data

Once you have the shortcut content structure, you can read and write files just like regular OneLake files:

```typescript
// Read a file from within a shortcut
const fileContent = await storageClient.readFileAsText(
  OneLakeStorageClient.getPath(workspaceId, itemId, 'Files/MyS3Shortcut/data.csv')
);

// Write a file to a shortcut (if the shortcut supports writes)
await storageClient.writeFileAsText(
  OneLakeStorageClient.getPath(workspaceId, itemId, 'Files/MyS3Shortcut/output.txt'),
  'Processed data content'
);
```

### Using the item wrapper for simplified access

For cleaner code, you can use the OneLakeStorageClientItemWrapper:

```typescript
// Create an item wrapper for simplified access
const itemStorage = storageClient.createItemWrapper({
  workspaceId: workspaceId,
  id: itemId
});

// Get shortcuts in the Files directory
const filesMetadata = await itemStorage.getPathMetadata(
  'Files',
  false,
  true // Include shortcut metadata
);

// Access content within a shortcut
const shortcutContent = await itemStorage.getPathMetadata(
  'Files/MyShortcut',
  true,  // recursive
  false  // Get actual content, not shortcut metadata
);

// Read/write files with simpler paths
const fileContent = await itemStorage.readFileAsText('Files/MyShortcut/data.txt');
await itemStorage.writeFileAsText('Files/MyShortcut/processed.txt', 'Result data');
```

## Complete example: Working with shortcut data

```typescript
async function analyzeShortcutData(workspaceId: string, itemId: string) {
  const storageClient = new OneLakeStorageClient(workloadClient);
  
  try {
    // Step 1: Find all shortcuts in the Files directory
    const dirMetadata = await storageClient.getPathMetadata(
      workspaceId,
      `${itemId}/Files`,
      false,
      true // Get shortcut info
    );

    const shortcuts = dirMetadata.paths.filter(path => path.isShortcut);
    console.log(`Found ${shortcuts.length} shortcuts`);

    // Step 2: For each shortcut, analyze its content
    for (const shortcut of shortcuts) {
      console.log(`\nAnalyzing shortcut: ${shortcut.name}`);
      
      // Get the content inside this shortcut
      const shortcutContent = await storageClient.getPathMetadata(
        workspaceId,
        `${itemId}/Files/${shortcut.name}`,
        true,  // recursive to see all files
        false  // get actual content, not shortcut metadata
      );

      console.log(`  - Contains ${shortcutContent.paths.length} items`);
      
      // List all files in the shortcut
      const files = shortcutContent.paths.filter(p => !p.isDirectory);
      for (const file of files) {
        console.log(`  - File: ${file.name} (${file.contentLength} bytes)`);
        
        // Optionally read the file content
        if (file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
          try {
            const content = await storageClient.readFileAsText(
              OneLakeStorageClient.getPath(workspaceId, itemId, `Files/${shortcut.name}/${file.name}`)
            );
            console.log(`    Preview: ${content.substring(0, 100)}...`);
          } catch (error) {
            console.log(`    Could not read file: ${error.message}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error analyzing shortcut data:', error);
  }
}
```

## Security considerations

Shortcuts respect the security context of the user:

- For Fabric internal sources (like Lakehouses), the calling user's identity is used
- For external sources (like S3), the connection credentials specified during shortcut creation are used

Ensure your workload correctly handles authentication and provides appropriate user interface elements for securely entering connection details.

## Related content

- [OneLake shortcuts overview](../onelake/onelake-shortcuts.md)
- [OneLake shortcuts REST APIs](../onelake/onelake-shortcuts-rest-api.md)
- [Key concepts in the Extensibility Toolkit](key-concepts.md)
- [How to store data in an item](how-to-store-data-in-item.md)
