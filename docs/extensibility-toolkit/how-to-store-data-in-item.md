---
title: HowTo - Store Data in OneLake
description: Learn how to Store date in your item within Fabric.
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 09/04/2025
---

# Store data in OneLake

Every Fabric item has access to OneLake storage, which provides a secure, scalable way to store files associated with your item. This guide explains how to upload files to your Fabric item using the `FabricPlatformAPIClient` and the underlying `OneLakeClient`.

## Understanding item storage in Fabric

Each item in Fabric has its own dedicated storage area in OneLake. This storage is organized into folders, with the main folders being:

- **Files** - For storing general files and documents
- **Tables** - For storing table data

## Prerequisites

Before uploading files to your item, you need:

- A valid Fabric workspace
- An existing item where you want to upload the file
- Appropriate permissions to write to the item

## Creating the FabricPlatformAPIClient

First, create a `FabricPlatformAPIClient` instance:

```typescript
import { getWorkloadClient } from "../controller/WorkloadClient";
import { FabricPlatformAPIClient } from "../clients/FabricPlatformAPIClient";

// Create client using the current user's context
const fabricClient = FabricPlatformAPIClient.create(getWorkloadClient());
```

## Example: Uploading a text file to an item

Here's how to upload a text file to an item using the OneLake client:

```typescript
async function uploadTextFileToItem(
  workspaceId: string, 
  itemId: string, 
  fileName: string, 
  content: string
) {
  try {
    // Get the FabricPlatformAPIClient
    const fabricClient = FabricPlatformAPIClient.create(getWorkloadClient());
    
    // Access the OneLake client
    const oneLakeClient = fabricClient.oneLake;
    
    // Generate the file path in OneLake for this item
    // This follows the pattern: workspaceId/itemId/Files/fileName
    const filePath = oneLakeClient.constructor.getFilePath(workspaceId, itemId, fileName);
    
    // Write the text content to the file
    await oneLakeClient.writeFileAsText(filePath, content);
    
    console.log(`Successfully uploaded ${fileName} to item ${itemId}`);
    return true;
  } catch (error) {
    console.error("Error uploading file to item:", error);
    throw error;
  }
}
```

## Example: Uploading a binary file to an item

For binary files like images or PDFs, you need to convert the file to base64 first:

```typescript
async function uploadBinaryFileToItem(
  workspaceId: string,
  itemId: string,
  fileName: string,
  fileData: ArrayBuffer // Binary file data
) {
  try {
    const fabricClient = FabricPlatformAPIClient.create(getWorkloadClient());
    const oneLakeClient = fabricClient.oneLake;
    
    // Convert binary data to base64
    const base64Content = arrayBufferToBase64(fileData);
    
    // Generate the file path
    const filePath = oneLakeClient.constructor.getFilePath(workspaceId, itemId, fileName);
    
    // Write the binary content to the file
    await oneLakeClient.writeFileAsBase64(filePath, base64Content);
    
    console.log(`Successfully uploaded binary file ${fileName} to item ${itemId}`);
    return true;
  } catch (error) {
    console.error("Error uploading binary file to item:", error);
    throw error;
  }
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  return btoa(binary);
}
```

## Example: Uploading a file from the browser

If you're building a web interface, you can use this function to handle file uploads from a file input:

```typescript
async function handleFileUpload(
  workspaceId: string,
  itemId: string,
  fileInputElement: HTMLInputElement
) {
  if (!fileInputElement.files || fileInputElement.files.length === 0) {
    console.warn("No file selected");
    return false;
  }
  
  const file = fileInputElement.files[0];
  const fileName = file.name;
  
  try {
    // Read the file as ArrayBuffer
    const fileBuffer = await readFileAsArrayBuffer(file);
    
    // Upload based on file type
    if (file.type.startsWith('text/')) {
      // For text files, convert to string and upload as text
      const textDecoder = new TextDecoder();
      const textContent = textDecoder.decode(fileBuffer);
      
      return await uploadTextFileToItem(workspaceId, itemId, fileName, textContent);
    } else {
      // For binary files, upload as base64
      return await uploadBinaryFileToItem(workspaceId, itemId, fileName, fileBuffer);
    }
  } catch (error) {
    console.error("Error processing file upload:", error);
    throw error;
  }
}

// Helper function to read file as ArrayBuffer
function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
```

## Managing files in your item

Once files are uploaded, you can also:

### Check if a file exists

```typescript
async function checkFileExists(workspaceId: string, itemId: string, fileName: string) {
  const fabricClient = FabricPlatformAPIClient.create(getWorkloadClient());
  const filePath = fabricClient.oneLake.constructor.getFilePath(workspaceId, itemId, fileName);
  
  return await fabricClient.oneLake.checkIfFileExists(filePath);
}
```

### Read file content

```typescript
async function readTextFile(workspaceId: string, itemId: string, fileName: string) {
  const fabricClient = FabricPlatformAPIClient.create(getWorkloadClient());
  const filePath = fabricClient.oneLake.constructor.getFilePath(workspaceId, itemId, fileName);
  
  return await fabricClient.oneLake.readFileAsText(filePath);
}
```

### Delete a file

```typescript
async function deleteFile(workspaceId: string, itemId: string, fileName: string) {
  const fabricClient = FabricPlatformAPIClient.create(getWorkloadClient());
  const filePath = fabricClient.oneLake.constructor.getFilePath(workspaceId, itemId, fileName);
  
  await fabricClient.oneLake.deleteFile(filePath);
  console.log(`File ${fileName} deleted successfully`);
}
```

## Best practices for file uploads

1. **Use appropriate file formats**: Consider the purpose of the file and use formats that are widely supported.
2. **Handle errors gracefully**: Always include error handling for network issues or permission problems.
3. **Validate file sizes**: Large files may take longer to upload and process.
4. **Check permissions**: Ensure the user has appropriate permissions before attempting uploads.
5. **Use file prefixes or folders**: For complex items with many files, consider organizing them in subfolders.

## Using the OneLakeClientItemWrapper

For simplified access to item files, you can use the `OneLakeClientItemWrapper`:

```typescript
async function uploadFileWithItemWrapper(item, fileName, content) {
  const fabricClient = FabricPlatformAPIClient.create(getWorkloadClient());
  
  // Create a wrapper for simpler access to this specific item
  const itemWrapper = fabricClient.oneLake.createItemWrapper({
    workspaceId: item.workspaceId,
    itemId: item.id
  });
  
  // Upload directly to the item (no need to specify paths)
  await itemWrapper.writeFileAsText(fileName, content);
  
  // Read the file back
  const fileContent = await itemWrapper.readFileAsText(fileName);
  
  console.log(`File uploaded and read back: ${fileContent.substring(0, 50)}...`);
}
```

This wrapper simplifies file operations by automatically handling the full path construction.