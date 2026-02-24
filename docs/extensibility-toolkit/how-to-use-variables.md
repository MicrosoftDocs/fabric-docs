---
title: HowTo - Use Variables in Custom Workloads
description: Learn how to use the Variables Library in your custom workload to manage environment-specific values in item definitions.
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 02/12/2026
ai-usage: ai-assisted
---

# How-To: Use variables in custom workloads

This article explains how to use the Variables Library in your item to manage environment-specific values in item definitions. Using variables enables smooth transitions between different environments (for example, Dev → Test → Prod) without manual updates.

## Why use variables?

When your item definition contains environment-specific values, those values might need to change as you promote items across different stages. Without variables, these values are preserved as-is when the item is carried from the source workspace to the target workspace, requiring manual updates.

For example, if your item references a Lakehouse in Fabric without using variables, it remains connected to the original lakehouse even after deployment. A lakehouse that exists in the same workspace in your Dev environment might need to reference a different lakehouse in your Test or Prod workspace, but the hardcoded reference won't automatically adapt.

Environment-specific values that benefit from variables include:

- **Database connections** – Different connection strings for Test and Production databases
- **Fabric item references** – References to Lakehouse in Fabric, semantic models, or other items that differ across environments (for example, Dev lakehouse vs. Prod lakehouse). Learn more about [item reference variable types](/fabric/cicd/variable-library/item-reference-variable-type).
- **Workspace identifiers** – Workspace-specific settings that change between stages
- **API endpoints** – Different service URLs for development, staging, and production
- **Configuration settings** – Environment-dependent settings like batch sizes or timeout values

## How variables work

The Variables Library in Fabric provides a centralized way to manage values that change across environments. Instead of hardcoding environment-specific values directly in your item definition, you reference variables. When you deploy the item to a different environment, you can update the variable values in that environment without modifying the item definition itself.

Variables Library supports various data types including strings, numbers, and boolean values. For a complete list of supported types, see [Supported types in variable libraries](/fabric/cicd/variable-library/variable-types#supported-types-in-variable-libraries).

This approach:

- Reduces the differences between source and target item definitions
- Minimizes manual updates during deployment
- Centralizes environment-specific configuration management
- Enables consistent deployment processes across environments

## Using variables in your workload

### Select variables using the Variable Picker

The Fabric client SDK provides access to the Variables Library through the `workloadClient` API. The recommended approach is to use the Variable Picker dialog, which allows users to browse and select variables from the Variables Library.

Here's an example of using the Variable Picker dialog:

```typescript
// Open the variable picker dialog
const result = await workloadClient.variableLibrary.openVariablePickerDialog({
  workspaceObjectId: item.workspaceId,
  filters: undefined // Optional filters to restrict variable selection see supported types below
});

// Check if variables were selected
if (result.selectedVariables && result.selectedVariables.length > 0) {
  const variableReference = result.selectedVariables[0].variableReference;
  // Store the variable reference in your item definition
  // See the item definition article for details on storing definitions
}
```

### Store variable references in item definitions

When storing your [item definition](how-to-store-item-definition.md), store the variable reference rather than hardcoded values. The variable reference is a string that Fabric uses to resolve the variable value at runtime:

```typescript
// Store the variable reference in your item definition
const itemDefinition = {
  itemReferce: variableReference, // e.g., "{{var:ItemReference}}"
  // other configuration...
};
```

When the item is loaded in a different environment, Fabric automatically resolves the variable reference using the variable values defined in that environment.

## Handle variable lifecycle

Variable references stored in your item definition aren't guaranteed to remain valid over time. Users can delete variables or change their values at any time, independent of your workload items. Your item should handle these scenarios gracefully.

### Variables can be deleted

A variable reference stored in your item definition might point to a variable that no longer exists. This can happen when:

- Users delete variables from the Variables Library
- Items are deployed to environments where the referenced variables haven't been created
- Workspace configurations change over time

**Recommendation:** Design a user experience that detects missing variables and guides users to either recreate the variable or select a different one. Display clear error messages or warnings when variable references can't be resolved.

### Variables can change

Variable values can change independently of your item. The value stored in a variable today might be different tomorrow if a user updates it in the Variables Library.

**Recommendation:** Always resolve variable references at runtime when you need the value, rather than caching variable values. This ensures your item uses the most current value. For example, resolve variables when:

- Opening or initializing an item
- Executing a job or operation that depends on the variable
- Validating configuration before running a process

### Example: Handle missing variables

```typescript
async function getVariableValue(
  workloadClient: any,
  variableReference: string,
  item: any
): Promise<string | null> {
  try {
    // Resolve the variable reference to get current value
    const value = await workloadClient.variableLibrary.resolveVariableReference(
      variableReference,
      item.workspaceId
    );
    return value;
  } catch (error) {
    // Variable doesn't exist or can't be resolved
    console.warn(`Variable reference ${variableReference} could not be resolved:`, error);
    
    // Provide user feedback - example using a notification
    showNotification({
      type: 'warning',
      message: `Variable not found. Please select a valid variable.`,
      action: {
        label: 'Select Variable',
        onClick: () => openVariablePicker()
      }
    });
    
    return null;
  }
}
```

## Example implementation

Here's a complete example showing how to use the Variable Picker in a custom workload item editor:

```typescript
interface ItemConfiguration {
  lakehouseReference?: string;
  apiEndpoint?: string;
}

async function handleSelectVariable(
  workloadClient: any,
  item: any,
  configField: keyof ItemConfiguration
): Promise<void> {
  try {
    // Open the variable picker dialog
    const result = await workloadClient.variableLibrary.openVariablePickerDialog({
      workspaceObjectId: item.workspaceId,
      filters: undefined
    });

    // Check if a variable was selected
    if (result.selectedVariables && result.selectedVariables.length > 0) {
      const variableReference = result.selectedVariables[0].variableReference;
      
      // Update the item configuration with the variable reference
      const updatedConfig: ItemConfiguration = {
        ...item.definition.configuration,
        [configField]: variableReference
      };
      
      // Save the updated configuration to the item definition
      await saveItemDefinition(workloadClient, item.id, {
        ...item.definition,
        configuration: updatedConfig
      });
    }
  } catch (error) {
    console.error('Failed to select variable:', error);
  }
}

// Example usage in a React component button handler
<Button
  onClick={() => handleSelectVariable(
    workloadClient,
    item,
    'lakehouseReference'
  )}
>
  Select Variable
</Button>
```

This example demonstrates:

1. Opening the Variable Picker dialog with the current workspace context
1. Retrieving the selected variable reference from the dialog result
1. Storing the variable reference in the item definition
1. Integrating with a UI component to allow users to select variables

For more information about storing item definitions, see [How-To: Store item definition (state)](how-to-store-item-definition.md).

## Related content

- [Get started with Variables Library](/fabric/cicd/variable-library/variable-library-overview)
- [How-To: Store item definition (state)](how-to-store-item-definition.md)
- [Overview of Fabric Git integration](/fabric/cicd/git-integration/intro-to-git-integration)
