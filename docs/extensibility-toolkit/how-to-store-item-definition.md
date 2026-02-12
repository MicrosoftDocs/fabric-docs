---
title: HowTo - Store Item Definition (State)
description: Learn about item definitions in Fabric, their role in CI/CD and public APIs, and how to store your item definition.
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 12/15/2025
ai-usage: ai-assisted
---

# How-To: Store item definition (state)

This article explains what item definitions are, their role in CI/CD and public APIs, and how to implement them in your custom workload.

## What is an item definition?

The item definition captures the functional state of a workload item. It contains all the information necessary to recreate the item's functional state in a new workspace or environment.

### Control plane vs. data plane

It's important to understand that the item definition represents the **control plane** – the configuration and metadata of an item – while OneLake represents the **data plane** where the actual data is stored. 

The control plane contains the instructions and settings needed to recreate the item's functional state in a new environment without requiring the actual data. This separation enables scenarios like:

- Deploying item configurations across environments (Dev → Test → Prod) without moving the underlying data
- Storing item configurations in source control for version tracking
- Recreating items in new workspaces with different data sources

For example, a lakehouse item definition contains the schema, transformations, and configuration settings, but not the actual data stored in OneLake. This allows you to deploy the lakehouse configuration to a new workspace where it can then connect to appropriate data sources for that environment.

An item definition consists of two main components:

- **Workload-owned content** – Configuration and metadata provided by your workload through the update API that define the functional state of the item. This content should be sufficient to recreate the item's functional state in a new workspace or stage.
- **Fabric system-owned content** – Platform-managed files (for example, `.platform`) required by Fabric to host and manage the item.

### Item definition guidelines

Your workload should follow these guidelines when implementing item definitions:

**Structure requirements:**

1. The content should be human-readable (for example, JSON, YAML).
1. Item definition contains a reasonable number of files (up to 5).
1. File types should be text-based files (avoid images).

For more information about item definition structure and best practices, see [Overview of item definitions](/fabric/cicd/git-integration/item-definitions).

## Item definitions in CI/CD and public APIs

Item definitions play a critical role in CI/CD workflows and public API interactions:

### CI/CD integration

During CI/CD processes, the item definition is carried across environments. The Git integration feature in Fabric uses item definitions to:

- Store item configurations in source control
- Track changes to item states over time
- Deploy items across different workspaces and environments
- Enable collaborative development workflows

The workload-owned content must be sufficient to recreate the item's functional state when deploying to a new workspace or stage in the CI/CD pipeline. For more information about Git integration, see [Overview of Fabric Git integration](/fabric/cicd/git-integration/intro-to-git-integration).

### Public APIs

Item definitions are exposed through Fabric's public APIs, allowing external tools and automation scripts to:

- Read the current state of a workload item
- Update item configurations programmatically
- Integrate with external deployment tools
- Automate item management tasks

## Environment-specific values

If your item definition contains environment-specific values that might change between stages (for example, Test → Prod), we highly encourage you to use the [Variables Library](/fabric/cicd/variables-library/intro-to-variables-library). 

Examples of environment-specific values include:
- Connections to databases
- References to other Fabric items
- Workspace-specific identifiers

When you don't use variables, environment-specific values stored directly in the item definition are preserved as-is when the item is carried from the source workspace to the target workspace. The values don't automatically adapt to the target environment. You need to manually update them in the target workspace (for example, replacing Test connections with Prod connections). Any such changes are reflected as differences between source and target.

For detailed guidance on implementing variables in your custom workload, see [How-To: Use variables in custom workloads](how-to-use-variables.md).

## How to store an item definition

The Fabric SDK provides abstractions to simplify storing item definitions. While the example shown here demonstrates storing a single object as a single definition part, item definitions can contain multiple parts to organize different aspects of your item's configuration.

For example, you might split your item definition into separate parts such as:

- A main configuration file containing core settings
- A schema definition file
- Connection or data source configurations
- User preferences or display settings

You can find the code for storing item definition in the `saveItemDefinition` method within the [SampleWorkloadEditor.tsx](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/app/items/HelloWorldItem/HelloWorldItemEditor.tsx) file. Here's the method content for reference:

```typescript
  async function SaveItem(definition?: HelloWorldItemDefinition) {
    var successResult = await saveItemDefinition<HelloWorldItemDefinition>(
      workloadClient,
      editorItem.id,
      definition || editorItem.definition);
    setIsUnsaved(!successResult);
  }
```

This method demonstrates how to persist the definition of an item using the SDK. It's a simplified version that uses a single object that is stored in a single definition part. For most users, this method is a good starting point. 

If you need to store more than one definition part, you can implement this yourself. Review the `saveItemDefinition` method to understand how parts are handled and how to add more parts.

### Implementation considerations

When implementing item definition in your item, keep these points in mind:

- Ensure your definition content is human-readable and uses text-based formats like JSON or YAML.
- Limit the number of files in your item definition (up to five files).
- Consider using the [Variables Library](/fabric/cicd/variables-library/intro-to-variables-library) for environment-specific values to enable smoother transitions between Test, Staging, and Production environments.
- Review the [Git integration guidelines](/fabric/cicd/git-integration/intro-to-git-integration) to ensure your item definition structure complies with Fabric's CI/CD requirements.

> [!NOTE]
> All definition parts that are stored aren't parsed as is and not validated. Schema-based validation for both the structure and the definition parts themselve (for example, JSON) is not supported at the moment and workloads have to make sure they can handle it. 

## Versioning and backward compatibility

As your item evolves, the structure and content of your item definition parts might change over time. We encourage you to maintain backward compatibility with older versions or design a dedicated experience within your item to handle version differences.

Fabric can't guarantee that older versions of item definitions won't be restored or remain in the system for extended periods without the item being opened. This can happen when users restore items from Git history, deploy from older environments, or when items remain unopened while your publish updates.

**Maintain backward compatibility:**

Design your item to recognize and handle multiple versions. Include a version identifier in your item definition and detect the version when loading:

```typescript
interface ItemDefinitionV1 {
  version: "1.0";
  settings: string;
}

interface ItemDefinitionV2 {
  version: "2.0";
  settings: SettingsObject;
  newFeature: string;
}

async function loadItemDefinition(rawDefinition: any): Promise<ItemDefinitionV2> {
  if (rawDefinition.version === "1.0") {
    return migrateV1ToV2(rawDefinition);
  }
  return rawDefinition as ItemDefinitionV2;
}
```

**Design a migration experience:**

Alternatively, create a user experience within your item that detects version mismatches and guides users through updating. Display notifications when older versions are detected and provide an upgrade process.

**Best practices:**

- Always include version information in your item definition from the start
- Test that older item definitions can be successfully loaded and migrated
- Avoid removing required fields; keep deprecated fields as optional for backward compatibility
- Use sensible defaults for new fields when loading older versions

## Related content

- [Overview of item definitions](/fabric/cicd/git-integration/item-definitions)
- [Overview of Fabric Git integration](/fabric/cicd/git-integration/intro-to-git-integration)
- [How-To: Use variables in custom workloads](how-to-use-variables.md)
- [Get started with Variables Library](/fabric/cicd/variables-library/intro-to-variables-library)
