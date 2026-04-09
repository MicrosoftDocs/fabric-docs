---
title: Enable Item Lifecycle Notifications
description: Learn how to enable notifications for item lifecycle events in your Fabric workload, including operations from public APIs, CI/CD, and platform-controlled flows.

ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 12/15/2025
ai-usage: ai-assisted
---

# Enable Item Lifecycle Notifications

Item lifecycle notifications provide workload builders with the capability to receive notifications about lifecycle events for custom items, even when the workload UX is not in the loop. This enables your item to respond to item operations regardless of how they were initiated.

## Overview

Item lifecycle notifications are essential for scenarios where items are created, updated, or deleted outside of your workload's user interface. This service notifies your workload whenever an item lifecycle event occurs, allowing you to:

- Set up or tear down infrastructure for new or deleted items
- Validate licenses or quotas before allowing operations
- Synchronize state with external systems
- Implement custom business logic for item operations
- Handle soft delete scenarios with custom cleanup logic

## When Lifecycle Notifications Are Triggered

Lifecycle notifications are triggered for item operations that originate from multiple sources:

### Public APIs

Items can be created, updated, or deleted through [Fabric's public REST APIs](/rest/api/fabric/articles/item-management/item-management-overview) without any interaction with your workload's UI. For example:

- Automation scripts using the Items API
- Third-party applications integrating with Fabric
- Administrative operations performed programmatically

### CI/CD Pipelines

Items are deployed through [Fabric's CI/CD capabilities](/fabric/cicd/cicd-overview) as part of automated deployment pipelines. In this scenario:

- Items are created or updated as part of Git integration workflows
- Deployment pipelines promote items across environments
- No user interface interaction occurs during the deployment process

### Platform-Controlled UX Flows

Even within the Fabric user interface, the platform controls certain creation and management flows. Your workload receives notifications for these operations to maintain consistency:

- Item creation through platform dialogs
- Workspace-level operations affecting items
- Cross-workspace copy or move operations

## Lifecycle Events

Your workload can receive notifications for the following lifecycle events:

### Create

Triggered when a new item is created. You can:

- Set up required infrastructure (databases, compute resources)
- Validate licenses or capacity quotas
- Initialize item-specific resources
- **Block the operation** if validation fails or prerequisites aren't met

### Update

Triggered when an item's definition or properties are modified. You can:

- Update associated infrastructure
- Validate the new configuration
- Synchronize changes with external systems
- **Block the operation** if the update violates business rules

### Delete

Triggered when an item is deleted. The request includes a `deleteType` field indicating whether it's a hard or soft delete:

- **Hard delete**: Permanent deletion - clean up all associated resources
- **Soft delete**: Item is marked for deletion but can be restored later - retain sufficient metadata and resources to support restoration

Your workload can choose different strategies for soft delete:

- Stop expensive compute resources while retaining data
- Archive critical data to lower-cost storage
- Retain full state for the recovery period

> [!NOTE]
> The subject token may not be available during delete operations. Your endpoint must handle authentication accordingly.

### Restore

Triggered when a previously soft-deleted item is restored. Your endpoint receives the item definition and should:

- Re-allocate resources that were freed during soft delete
- Restore item state and resume services
- Reinitialize compute or storage resources as needed

## Request Format

Fabric calls a separate endpoint for each lifecycle event. Each request includes:

### URL Path Parameters

The item's identifying information is provided in the URL path:

- `workspaceId` - The workspace ID (UUID)
- `itemType` - The item type (for example, `Contoso.FinanceAnalytics.Forecast`)
- `itemId` - The item ID (UUID)

### Authentication Header

The `Authorization` header uses the `SubjectAndAppToken1.0` scheme, which contains both a delegated user token and an app-only token:

```
SubjectAndAppToken1.0 subjectToken="<delegated token>", appToken="<S2S token>"
```

This dual-token format allows your workload to validate the request origin, verify user context, and call other services. Additional required headers include `ActivityId`, `RequestId`, and `x-ms-client-tenant-id`.

For details on validating these tokens, see [Authenticate Remote Endpoints](authentication-remote.md).

### Request Body

The request body varies by operation:

- **Create, Update, and Restore**: The body contains an `ItemDefinition` object with a `parts` array. Each part has a `path`, `payload` (Base64-encoded), and `payloadType`.
- **Delete**: The body contains a `deleteType` field with a value of `Hard` or `Soft`.

This allows you to:

- Extract configuration for infrastructure setup during create and restore
- Understand what changed in update operations
- Make informed decisions about blocking operations
- Choose the appropriate cleanup strategy for hard vs. soft deletes

## Blocking Operations

For **create** and **update** operations, your workload can block the operation by returning an error response from the lifecycle endpoint. This is useful for:

- **License validation**: Prevent item creation if the user doesn't have required licenses
- **Quota enforcement**: Block creation if workspace or capacity limits are exceeded
- **Configuration validation**: Reject updates that would create invalid states
- **Security policies**: Enforce organizational policies on item configurations

When you block an operation:

1. Return an error status code (for example, 400 or 403) from your endpoint
2. Provide a clear error message explaining why the operation was blocked
3. The platform displays your error message to the user
4. The item operation is not completed

> [!IMPORTANT]
> Delete operations (both hard and soft) cannot be blocked. Your workload must handle cleanup regardless of the item state. Restore operations can be blocked by returning an error response.

## Implementing Lifecycle Notification Handling

Lifecycle notifications defined in custom items can't be handled directly within Fabric. Instead, you need to implement a remote endpoint that Fabric calls when a lifecycle event occurs. This gives you full control over where and how your notification handling logic executes.

The remote endpoint can be:

- **An Azure Function** - Simple, serverless execution for lightweight notification handling
- **An Azure Container Instance** - For notifications requiring specific runtime environments
- **A custom web service** - For complex orchestration and processing
- **Any compute service** - As long as it can expose an HTTP endpoint and handle the notification

For detailed information about implementing and configuring remote endpoints, see [Enable Remote Endpoints](how-to-enable-remote-endpoint.md).

## Configuration

To enable lifecycle notifications for your custom item, configure the notifications in your item manifest.

### Define Lifecycle Notifications in the Item Manifest

Add the lifecycle notification configuration to your item manifest:

```xml
<Item>
    <Name>YourItemType</Name>
    <!-- Other item configuration -->
    
    <LifecycleOperationsNotifications>
        <OnCreate>true</OnCreate>
        <OnUpdate>true</OnUpdate>
        <OnDelete>true</OnDelete>
    </LifecycleOperationsNotifications>
</Item>
```

Configure only the events you need to handle. Set the value to `false` or omit the element if you don't need notifications for a specific event type.

> [!IMPORTANT]
> When `OnDelete` is enabled, your workload must also implement the `OnRestoreItem` endpoint. Fabric calls this endpoint when a soft-deleted item is restored, so your workload must be prepared to handle restore notifications whenever it handles delete notifications.

### Endpoint Requirements

Your lifecycle endpoint must:

- Be publicly accessible over HTTPS
- Respond within a reasonable timeout (recommended: 30 seconds)
- Return appropriate HTTP status codes
- Handle authentication using the provided token

For create and update operations that you want to block:

- Return 4xx status code with error details
- Include a user-friendly error message in the response body

For operations that succeed, or for delete and restore operations:

- Return 200 OK status code
- Optionally include logging or tracking information

## Local Development Support

For local development and testing, the Fabric Extensibility Toolkit provides a built-in stub implementation in the development server. This allows you to test item lifecycle notifications on your local machine without deploying to Azure.

### How It Works

When you run the local development server (see [Get started with Fabric Extensibility Toolkit](get-started.md) and [Register Local Web Server](tools-register-local-web-server.md)), all lifecycle notifications defined in your item manifest are automatically redirected to your local machine.

When a lifecycle event occurs in dev mode:

1. The notification is intercepted by the local development server
1. Log statements appear in your local console showing the event details
1. A sample implementation demonstrates how to interact with the item definition and OneLake storage
1. You receive a token that can be used to call any Fabric operation

This stub implementation provides:

- **Immediate feedback** - See log statements in your console as lifecycle events occur
- **Sample code** - Learn how to structure your notification handling logic
- **OneLake integration examples** - See how to access the item's OneLake storage during notifications
- **Token handling** - Understand how to obtain and use Fabric authentication tokens
- **Item definition access** - View the complete item definition payload

### Using the Development Stub

To use the local development server for lifecycle notification testing:

1. Start your local development server following the [quickstart guide](get-started.md)
1. Register your local web server using the [registration steps](tools-register-local-web-server.md)
1. Configure lifecycle notifications in your item manifest as described above
1. Perform item operations (create, update, delete) in Fabric
1. Observe the notification details in your local console
1. Review the sample code for OneLake interaction and token handling in the development server logs

### OneLake Interaction Example

The development stub includes sample code showing how to interact with the item's OneLake storage:

```javascript
// Example from the development stub
const tokenExchangeService = require('./tokenExchangeService');
const oneLakeClientService = require('./oneLakeClientService');

async function handleCreateWithOneLakeAccess(req) {
  const { workspaceId, itemId } = req.params;
  const { subjectToken, tenantId } = req.authContext;

  // Exchange user token for OneLake-scoped token
  const oneLakeToken = await tokenExchangeService.getTokenForScope(
    subjectToken, tenantId, oneLakeClientService.ONELAKE_SCOPE);

  // Write to the item's OneLake storage
  const filePath = oneLakeClientService.getOneLakeFilePath(
    workspaceId, itemId, 'config.json');
  const content = JSON.stringify(req.body, null, 2);
  await oneLakeClientService.writeToOneLakeFile(oneLakeToken, filePath, content);

  console.log(`Initialized item configuration in OneLake at ${filePath}`);
}
```

This local development experience allows you to build and test your lifecycle notification logic before deploying to production endpoints.

## Implementation Example

The following example uses Node.js and Express, based on the [Fabric Extensibility Toolkit](https://github.com/microsoft/fabric-extensibility-toolkit) reference implementation. Each lifecycle event has its own endpoint that Fabric calls with the appropriate request body. For full API details, see the [Item Lifecycle REST API reference](/rest/api/fabric/workload/fabricextensibilitytoolkit/item-lifecycle).

```javascript
const express = require('express');
const { authenticateControlPlaneCall } = require('./authentication');
const router = express.Router();

// POST /workspaces/{workspaceId}/items/{itemType}/{itemId}/onCreateItem
// Request body: { definition: { parts: [{ path, payload, payloadType }] } }
router.post('/workspaces/:workspaceId/items/:itemType/:itemId/onCreateItem',
  async (req, res) => {
    const authResult = await authenticateControlPlaneCall(req, res);
    if (!authResult) return;

    const { workspaceId, itemId, itemType } = req.params;
    const { definition } = req.body;

    // Validate license before allowing creation
    const hasLicense = await checkUserLicense(req.authContext.userId);
    if (!hasLicense) {
      return res.status(403).json({
        errorCode: 'LicenseRequired',
        message: 'User does not have the required license for this item type.',
        source: 'User',
        isPermanent: true
      });
    }

    // Set up infrastructure for the new item
    await provisionResources(workspaceId, itemId, definition);

    console.log(`Created item ${itemId} of type ${itemType}`);
    res.status(200).json({});
  }
);

// POST /workspaces/{workspaceId}/items/{itemType}/{itemId}/onUpdateItem
// Request body: { definition: { parts: [{ path, payload, payloadType }] } }
router.post('/workspaces/:workspaceId/items/:itemType/:itemId/onUpdateItem',
  async (req, res) => {
    const authResult = await authenticateControlPlaneCall(req, res);
    if (!authResult) return;

    const { workspaceId, itemId } = req.params;
    const { definition } = req.body;

    // Validate the updated definition
    if (!isValidConfiguration(definition)) {
      return res.status(400).json({
        errorCode: 'InvalidConfiguration',
        message: 'Invalid configuration: required settings are missing.',
        source: 'User',
        isPermanent: true
      });
    }

    await updateResources(workspaceId, itemId, definition);

    console.log(`Updated item ${itemId}`);
    res.status(200).json({});
  }
);

// POST /workspaces/{workspaceId}/items/{itemType}/{itemId}/onDeleteItem
// Request body: { deleteType: "Hard" | "Soft" }
// Note: Subject token may not be available during delete operations.
router.post('/workspaces/:workspaceId/items/:itemType/:itemId/onDeleteItem',
  async (req, res) => {
    const authResult = await authenticateControlPlaneCall(req, res,
      { requireSubjectToken: false });
    if (!authResult) return;

    const { workspaceId, itemId } = req.params;
    const { deleteType } = req.body;

    if (deleteType === 'Hard') {
      await deleteAllResources(workspaceId, itemId);
      console.log(`Hard deleted item ${itemId}`);
    } else if (deleteType === 'Soft') {
      // Retain metadata for recovery; optionally free expensive resources
      await stopComputeResources(workspaceId, itemId);
      console.log(`Soft deleted item ${itemId}`);
    }

    res.status(200).json({});
  }
);

// POST /workspaces/{workspaceId}/items/{itemType}/{itemId}/onRestoreItem
// Request body: { definition: { parts: [{ path, payload, payloadType }] } }
// Called when a soft-deleted item is restored.
router.post('/workspaces/:workspaceId/items/:itemType/:itemId/onRestoreItem',
  async (req, res) => {
    const authResult = await authenticateControlPlaneCall(req, res,
      { requireSubjectToken: false });
    if (!authResult) return;

    const { workspaceId, itemId } = req.params;
    const { definition } = req.body;

    // Re-allocate resources freed during soft delete
    await restoreResources(workspaceId, itemId, definition);

    console.log(`Restored item ${itemId}`);
    res.status(200).json({});
  }
);
```

## Use Cases

### Infrastructure Management

Automatically provision and deprovision infrastructure based on item lifecycle:

```javascript
// In onCreateItem handler: Provision resources
await createSqlDatabase(itemId);
await createStorageAccount(itemId);
await createComputeCluster(itemId);

// In onDeleteItem handler (deleteType === 'Hard'): Clean up resources
await deleteSqlDatabase(itemId);
await deleteStorageAccount(itemId);
await deleteComputeCluster(itemId);
```

### License and Quota Validation

Enforce licensing and capacity requirements in the `onCreateItem` handler:

```javascript
// Check user license before allowing creation
const userLicense = await getUserLicense(req.authContext.userId);
if (userLicense.tier < REQUIRED_TIER_PREMIUM) {
  return res.status(403).json({
    errorCode: 'LicenseRequired',
    message: 'Premium license required for this item type.',
    source: 'User',
    isPermanent: true
  });
}

// Check workspace capacity
const workspaceUsage = await getWorkspaceUsage(workspaceId);
if (workspaceUsage.itemCount >= workspaceUsage.maxItems) {
  return res.status(403).json({
    errorCode: 'QuotaExceeded',
    message: 'Workspace item limit reached.',
    source: 'User',
    isPermanent: false
  });
}
```

### External System Synchronization

Keep external systems in sync with Fabric items:

```javascript
// In onCreateItem handler: Sync item to external catalog
const { workspaceId, itemId, itemType } = req.params;
await externalCatalog.registerItem({
  id: itemId,
  type: itemType,
  workspaceId: workspaceId
});

// Update external monitoring
await monitoringSystem.trackItemCreated(workspaceId, itemId);
```

### Delete and Restore Strategy

Implement different cleanup strategies based on `deleteType`, and handle restore:

```javascript
// In onDeleteItem handler:
const { deleteType } = req.body;

if (deleteType === 'Soft') {
  // Free expensive resources but retain data for potential recovery
  await stopExpensiveCompute(itemId);
  await archiveDataToLowCostStorage(itemId);
}

if (deleteType === 'Hard') {
  // Permanent deletion - clean up everything
  await deleteAllResources(itemId);
}

// In onRestoreItem handler:
// Re-allocate resources freed during soft delete
await restartCompute(itemId);
await restoreDataFromArchive(itemId);
```

## Best Practices

### Respond Quickly

Lifecycle endpoints should respond as quickly as possible:

- Perform validation and quick setup operations synchronously
- Queue long-running infrastructure provisioning for background processing
- Return success/failure quickly to avoid timeouts

### Handle Idempotency

Item operations may be retried, so your endpoint should be idempotent:

- Check if infrastructure already exists before creating
- Use unique identifiers to track operations
- Handle duplicate notifications gracefully

### Provide Clear Error Messages

When blocking operations, provide helpful error messages:

```javascript
// Good: Structured ErrorResponse with a clear message
return res.status(403).json({
  errorCode: 'LicenseRequired',
  message: 'Cannot create item: Premium license required. Upgrade your subscription.',
  source: 'User',
  isPermanent: true
});

// Poor: Missing structured error information
return res.status(403).json({ message: 'Forbidden' });
```

### Security

- Validate the authentication token on every request
- Use the token to verify the operation is legitimate
- Don't trust item IDs or workspace IDs without validation
- See [Authenticate Remote Endpoints](authentication-remote.md) for security best practices

### Monitoring and Logging

- Log all lifecycle notifications received
- Track infrastructure provisioning success/failure
- Monitor endpoint performance and errors
- Use the notification data for audit trails

## Troubleshooting

### Notifications Not Received

- Verify the endpoint URL is correct in the manifest
- Check that the endpoint is publicly accessible
- Ensure HTTPS is properly configured
- Review endpoint logs for errors

### Operations Timing Out

- Optimize endpoint response time
- Move long-running operations to background jobs
- Increase endpoint timeout settings if needed
- Review infrastructure provisioning performance

### Blocking Not Working

- Verify you're returning 4xx status codes for blocked operations
- Check that error messages are included in the response
- Ensure the endpoint responds within the timeout window
- Remember that delete operations cannot be blocked - the Fabric platform marks the item as deleted regardless of the response of your workload.

## Related Content

- [Authenticate Remote Endpoints](authentication-remote.md)
- [Enable Remote Endpoints](how-to-enable-remote-endpoint.md)
- [Store Item Definition](how-to-store-item-definition.md)
- [Define Jobs for Your Workload](how-to-enable-remote-jobs.md)
- [Get started with Fabric Extensibility Toolkit](get-started.md)
- [Register Local Web Server](tools-register-local-web-server.md)
- [Fabric Item Management API](/rest/api/fabric/articles/item-management/item-management-overview)
- [Fabric CI/CD Overview](/fabric/cicd/cicd-overview)
- [Item Lifecycle REST API Reference](/rest/api/fabric/workload/fabricextensibilitytoolkit/item-lifecycle)
