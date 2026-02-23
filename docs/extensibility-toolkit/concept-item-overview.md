---
title: Fabric Item Overview
description: Learn how Fabric extensions are built using the item structure with standardized editors and components.
ms.reviewer: gesaur
ms.topic: overview
ms.date: 12/15/2025
---

# Fabric Item Overview

Fabric extensions are built around the fundamental concept of **items**. Every workload in Microsoft Fabric consists of one or more item types that users can create, configure, and interact with through standardized editors.

## Item-based architecture

All Fabric workloads follow a consistent item-based structure:

- **Items** are the core building blocks that users create and manage in workspaces
- **Editors** provide the interface for users to configure and work with items
- **Components** are the standardized building blocks that make up editors

## Item structure

Each Fabric item consists of five key components:

### - Item Model (`ItemModel.ts`)

Defines the data structure and properties that represent the item's configuration and state that is stored in Fabric.

### - Item Editor (`ItemEditor.tsx`) 

The main interface where users interact with the item. Built using default Fabric components for consistency.

### - Empty View (`ItemEditorEmpty.tsx`)

The initial experience when users first create an item, providing onboarding and setup guidance.

### - Detail View (`ItemEditorDetail.tsx`)

Provides drill-down navigation and detailed views for complex item configurations and hierarchical content.

### - Ribbon Actions (`ItemEditorRibbon.tsx`)

Toolbar actions that users can perform on the item, such as save, settings, and custom operations.

## Default editor components

Fabric provides standardized components that ensure consistency across all workloads:

### Core editor components

- **ItemEditor**: Main container with automatic layout management
- **ItemEditorDefaultView**: Two-panel layouts with resizable splitters
- **ItemEditorDetailView**: Navigation for drill-down scenarios
- **ItemEditorEmptyView**: Standardized first-run experience

### Panel system

- **Left panel**: Navigation, file explorers, OneLake views
- **Center panel**: Main content area with automatic scrolling
- **Collapsible panels**: Responsive layouts with accessibility support

### Ribbon system

- **Home toolbar**: Standard actions like save and settings
- **Additional toolbars**: Custom actions specific to your item type
- **Tooltip integration**: Consistent user experience patterns

## Benefits of the item structure

**Consistency**: Users get a familiar experience across all Fabric workloads

**Accessibility**: Built-in support for keyboard navigation and screen readers

**Responsive design**: Automatic layout adjustments for different screen sizes

**Integration**: Seamless connection with Fabric platform features like OneLake, lineage, and permissions

## Development approach

When building Fabric extensions:

- **Start with the item model** - Define what data your item will store
- **Use default components** - Leverage Fabric's standardized editor components
- **Follow established patterns** - Implement ribbon actions, panel layouts, and navigation consistently
- **Customize content** - Fill the standardized structure with your workload-specific functionality

## Key principles

- **Component reuse**: Use Fabric's default components instead of creating custom interfaces
- **Standard patterns**: Follow established navigation, layout, and interaction patterns
- **Platform integration**: Leverage built-in Fabric capabilities for storage, security, and management
- **User familiarity**: Maintain consistency with the broader Fabric user experience

## Next steps

To implement items in your workload:

- [Create Custom Fabric Items](tutorial-create-new-fabric-item.md)
- [Define Item Creation](how-to-create-item.md)
- [Store Item Definition](how-to-store-item-definition.md)

For detailed component documentation, see the [ItemEditor documentation](https://github.com/microsoft/fabric-extensibility-toolkit/docs/controls/ItemEditor.md).
