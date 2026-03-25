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

### Delete and Soft Delete

Triggered when an item is deleted or soft deleted. Soft delete is a new feature that allows items to be recovered within a retention period:

- **Delete**: Permanent deletion of an item - clean up all associated resources
- **Soft Delete**: Item is marked for deletion but can be recovered - decide whether to immediately clean up resources or wait for permanent deletion

Your workload can choose different strategies for soft delete:

- Immediately tear down expensive resources (compute, storage)
- Retain data for the recovery period
- Archive critical data before cleanup

## Notification Payload

When Fabric calls your notification endpoint, you receive:

### Authentication Token

A security token that allows your workload to authenticate back to Fabric. This token enables you to:

- Call Fabric APIs to retrieve additional context
- Access workspace and capacity information
- Validate the operation's authenticity

For details on using the authentication token, see [Authenticate Remote Endpoints](authentication-remote.md).

### Item Definition

The complete item definition is included in the notification payload:

- Item metadata (ID, name, type, workspace)
- Item definition payload (configuration data)
- Operation type (create, update, delete)
- Soft delete information (if applicable)

This allows you to:

- Understand what changed in update operations
- Extract configuration for infrastructure setup
- Make informed decisions about blocking operations

## Blocking Operations

For **create** and **update** operations, your workload can block the operation by returning an error response from the notification endpoint. This is useful for:

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
> Delete and soft delete operations cannot be blocked. Your workload must handle cleanup regardless of the state.

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

### Endpoint Requirements

Your lifecycle notification endpoint must:

- Be publicly accessible over HTTPS
- Respond within a reasonable timeout (recommended: 30 seconds)
- Return appropriate HTTP status codes
- Handle authentication using the provided token

For create and update operations that you want to block:

- Return 4xx status code with error details
- Include a user-friendly error message in the response body

For operations that succeed or for delete operations:

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

```csharp
// Example from the development stub
private async Task HandleCreateWithOneLakeAccess(
    LifecycleNotification notification,
    string authToken)
{
    // Extract item information
    var workspaceId = notification.WorkspaceId;
    var itemId = notification.ItemId;
    var itemDefinition = notification.ItemDefinition;
    
    // Access the item's OneLake storage
    var oneLakeClient = new OneLakeClient(authToken);
    
    // Read data from OneLake
    var itemPath = $"/workspaces/{workspaceId}/items/{itemId}/files/";
    var files = await oneLakeClient.ListFilesAsync(itemPath);
    
    Console.WriteLine($"Item has {files.Count} files in OneLake");
    
    // Write initialization data to OneLake
    var configPath = $"{itemPath}config.json";
    await oneLakeClient.WriteFileAsync(configPath, JsonConvert.SerializeObject(itemDefinition));
    
    Console.WriteLine($"Initialized item configuration in OneLake at {configPath}");
}
```

This local development experience allows you to build and test your lifecycle notification logic before deploying to production endpoints.

## Implementation Example

Here's an example implementation in C# using Azure Functions:

```csharp
[FunctionName("ItemLifecycleNotification")]
public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "lifecycle")] 
    HttpRequest req,
    ILogger log)
{
    // Read the notification payload
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    var notification = JsonConvert.DeserializeObject<LifecycleNotification>(requestBody);
    
    // Extract authentication token
    string authToken = req.Headers["Authorization"];
    
    log.LogInformation($"Received {notification.EventType} notification for item {notification.ItemId}");
    
    switch (notification.EventType)
    {
        case "Create":
            return await HandleCreate(notification, authToken, log);
            
        case "Update":
            return await HandleUpdate(notification, authToken, log);
            
        case "Delete":
            return await HandleDelete(notification, authToken, log);
            
        case "SoftDelete":
            return await HandleSoftDelete(notification, authToken, log);
            
        default:
            return new BadRequestObjectResult($"Unknown event type: {notification.EventType}");
    }
}

private async Task<IActionResult> HandleCreate(
    LifecycleNotification notification, 
    string authToken,
    ILogger log)
{
    // Validate license
    bool hasLicense = await CheckUserLicense(notification.UserId, authToken);
    if (!hasLicense)
    {
        return new ObjectResult(new 
        { 
            error = "User does not have required license for this item type" 
        })
        { StatusCode = 403 };
    }
    
    // Set up infrastructure
    await ProvisionInfrastructure(notification.ItemId, notification.ItemDefinition);
    
    log.LogInformation($"Successfully created infrastructure for item {notification.ItemId}");
    return new OkResult();
}

private async Task<IActionResult> HandleUpdate(
    LifecycleNotification notification,
    string authToken,
    ILogger log)
{
    // Validate the update
    bool isValid = ValidateItemConfiguration(notification.ItemDefinition);
    if (!isValid)
    {
        return new BadRequestObjectResult(new 
        { 
            error = "Invalid configuration: Connection string must be specified" 
        });
    }
    
    // Update infrastructure
    await UpdateInfrastructure(notification.ItemId, notification.ItemDefinition);
    
    return new OkResult();
}

private async Task<IActionResult> HandleDelete(
    LifecycleNotification notification,
    string authToken,
    ILogger log)
{
    // Clean up all resources
    await DeleteInfrastructure(notification.ItemId);
    
    log.LogInformation($"Deleted infrastructure for item {notification.ItemId}");
    return new OkResult();
}

private async Task<IActionResult> HandleSoftDelete(
    LifecycleNotification notification,
    string authToken,
    ILogger log)
{
    // For soft delete, we might want to retain data but stop expensive compute
    await StopComputeResources(notification.ItemId);
    
    // Optionally archive critical data
    await ArchiveItemData(notification.ItemId);
    
    log.LogInformation($"Soft deleted item {notification.ItemId} - compute stopped, data retained");
    return new OkResult();
}
```

## Use Cases

### Infrastructure Management

Automatically provision and deprovision infrastructure based on item lifecycle:

```csharp
// On Create: Provision Azure resources
await CreateSqlDatabase(itemId);
await CreateStorageAccount(itemId);
await CreateComputeCluster(itemId);

// On Delete: Clean up resources
await DeleteSqlDatabase(itemId);
await DeleteStorageAccount(itemId);
await DeleteComputeCluster(itemId);
```

### License and Quota Validation

Enforce licensing and capacity requirements:

```csharp
// Check user license before allowing creation
var userLicense = await GetUserLicense(userId, authToken);
if (userLicense.Tier < RequiredTier.Premium)
{
    return new ForbiddenObjectResult("Premium license required for this item type");
}

// Check workspace capacity
var workspaceUsage = await GetWorkspaceUsage(workspaceId, authToken);
if (workspaceUsage.ItemCount >= workspaceUsage.MaxItems)
{
    return new ForbiddenObjectResult("Workspace item limit reached");
}
```

### External System Synchronization

Keep external systems in sync with Fabric items:

```csharp
// Sync item creation to external catalog
await externalCatalog.RegisterItem(new ExternalItem
{
    Id = notification.ItemId,
    Name = notification.ItemName,
    Type = notification.ItemType,
    WorkspaceId = notification.WorkspaceId
});

// Update external monitoring
await monitoringSystem.TrackItemLifecycle(notification);
```

### Soft Delete Strategy

Implement different cleanup strategies for soft delete:

```csharp
// Strategy 1: Immediate cleanup of expensive resources
if (notification.EventType == "SoftDelete")
{
    await StopExpensiveCompute(itemId);
    await ArchiveDataToLowCostStorage(itemId);
    // Keep data for potential recovery
}

// Strategy 2: Defer all cleanup until permanent delete
if (notification.EventType == "Delete" && notification.WasSoftDeleted)
{
    // Clean up everything now
    await DeleteAllResources(itemId);
}
```

## Best Practices

### Respond Quickly

Lifecycle notification endpoints should respond as quickly as possible:

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

```csharp
// Good error message
return new BadRequestObjectResult(new 
{ 
    error = "Cannot create item: Premium license required. Please upgrade your subscription." 
});

// Poor error message
return new BadRequestObjectResult("Forbidden");
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
- Remember that delete and soft delete cannot be blocked

## Related Content

- [Authenticate Remote Endpoints](authentication-remote.md)
- [Enable Remote Endpoints](how-to-enable-remote-endpoint.md)
- [Store Item Definition](how-to-store-item-definition.md)
- [Define Jobs for Your Workload](how-to-enable-remote-jobs.md)
- [Get started with Fabric Extensibility Toolkit](get-started.md)
- [Register Local Web Server](tools-register-local-web-server.md)
- [Fabric Item Management API](/rest/api/fabric/articles/item-management/item-management-overview)
- [Fabric CI/CD Overview](/fabric/cicd/cicd-overview)
