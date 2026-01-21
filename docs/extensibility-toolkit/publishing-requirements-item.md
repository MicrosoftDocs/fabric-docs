---
title: Fabric Extensibility toolkit validation guidelines and requirements for items
description: Learn about the guidelines and requirements for publishing Microsoft Fabric workload items to the Workload Hub.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.date: 12/15/2025
---

# Microsoft Fabric Item Publishing Requirements


This document outlines all publishing requirements for Microsoft Fabric items (workload-specific artifacts).

---

## General Requirements

General requirements for item naming, icons, and basic metadata

---

### 1.1 - Item has a clear name

Item must have a clear, descriptive display name that helps users understand its purpose and type. You can't use generic names (for example, AI, Agent,.. ) without any pre or suffix indicating the specialty, your company, or product.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Manifest](./manifest-item.md)
- [How to Create Item](./how-to-create-item.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 1.2 - Item has a clear icon

Item must provide a clear, recognizable icon that visually represents the item type across the Fabric interface

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Manifest](./manifest-item.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

**Guidelines:**

**UX:**

Filetype icons are comprised of a container and an interior Fluent system icon. There are 3 generic shapes: vertical, horizontal, and square. Some interior icons work better in specific shapes, so explore which shape is best.

This grid template displays the sizes we use: 20 / 24 / 32 / 40 / 48 / 64
For the workspace, workload L2 page and cards we use the 24x24px size.

The interior icon should be centered within the container. If an icon is composed of only/mostly strokes, and it needs more weight, you can adjust to 1.5px weight. General reference for interior icon sizing inside container:

- 12px in 20px container
- 14px in 24px container  
- 20px in 32px container
- 24px in 40px container
- 28px in 48px container
- 36px in 64px container

Make sure interior icons are as centered as possible. All icons are drawn with 1px stroke unless otherwise stated. Item icon must follow the icon creation guidelines for consistency across the Fabric platform.

---

### 1.2.1 - Item has a clear active icon

Item must provide a distinct active state icon to indicate when the item is selected or in focus.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Manifest](./manifest-item.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 1.3 - Item has a clear title in create menu

Item must display a clear title in the create menu that matches the item's display name for consistency

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Manifest](./manifest-item.md)
- [How to Create Item](./how-to-create-item.md)

---

### 1.4 - Item has a clear subtitle in create menu

Item must provide a concise, informative subtitle in the create menu that describes the item's purpose or key features

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Manifest](./manifest-item.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 1.5 - Item can be favorited in the "new" menu

Item must support favoriting functionality in the 'new' menu to allow users to quickly access frequently used items

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [How to Create Item](./how-to-create-item.md)
- [Item Manifest](./manifest-item.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

## Item Creation Flow

Requirements for the item creation experience and workspace integration

---

### 2.1 - Item Creation Experience

Item creation flow must follow Fabric design guidelines providing a consistent, intuitive experience for users

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [How to Create Item](./how-to-create-item.md)
- [Item Manifest](./manifest-item.md)
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 2.2 - Item can be created in Creation Hub

Item must be available for creation through the Fabric Creation Hub for centralized item creation

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [How to Create Item](./how-to-create-item.md)
- [Item Manifest](./manifest-item.md)
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 2.3 - Item can be created in the Workspace menu

Item must be available for creation through the workspace '+New' menu for contextual item creation

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [How to Create Item](./how-to-create-item.md)
- [Item Manifest](./manifest-item.md)
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 2.4 - Platform create experience is configured

Item creation must use Fabric's default naming experience (createItemDialogConfig in Product.json). Custom item creation flows are deprecated, if used they should avoid generating default names to prevent workspace clutter

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [How to Create Item](./how-to-create-item.md)
- [Item Manifest](./manifest-item.md)
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 2.5 - Item is persisted in the Workspace

Created items must be immediately persisted and visible in the workspace after creation completes

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [How to store item definition](./how-to-store-item-definition.md)

---

### 2.6 - Item is in the multitasking menu and supports the behavior

Items must appear in the multitasking menu and support switching between multiple open items seamlessly

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Item Manifest](./manifest-item.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 2.7 - Item creation works under *.powerbi.com and *.fabric.microsoft.com

Item creation must function correctly on both powerbi.com and fabric.microsoft.com domains for cross-platform support

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

---

## Ribbon & Toolbar

Requirements for the item editor ribbon and toolbar following design guidelines

---

### 3.1 - Item editor ribbon exists

Item editor must implement with one ribbon interface for consistent user experience across Fabric. This ribbon should include all actions and controls necessary for item editing and it must be sticky on top above the canvas. The ribbon tabs can't be used to switch the view.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Fabric Templates](https://aka.ms/fabrictemplates)

**Guidelines:**

**UX:**

Item editor must implement with one ribbon interface for consistent user experience across Fabric. This ribbon should include all actions and controls necessary for item editing and it must be sticky on top above the canvas. The ribbon tabs can't be used to switch the view.

---

### 3.2 - Item Editor ribbon actions are aligned with style guide

Item Editor ribbon actions must use the fabric button component in subtle state. Any other component should be max height 32 px

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

Item Editor ribbon actions must use the fabric button component in subtle state. Any other component should be max height 32 px.

---

### 3.2.10 - Item Editor ribbon Tooltips - follows style guide

Ribbon tooltips must follow Fabric guidelines for content, timing, and placement to aid user understanding

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 3.3 - Item editor ribbon has a "Home" tab

Item Editor ribbon must include Home tab as the primary editor page. It also must be called "Home" and be the first tab in the ribbon. This is the first place users land when opening the item editor. Tabs are only switching the ribbon control and can't be used to switch the canvas.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

Item Editor ribbon must include Home tab as the primary editor page, it's also must called "home" and be the first tab in the ribbon. this is the first palace users will land when oppening the item editor.

---

### 3.4 - Item Editor ribbon implements a save button / AutoSave

Item editor should provide either explicit save functionality or AutoSave to prevent data loss

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

Item editor should implement either a save button or AutoSave functionality for user data protection. button is icon only.

---

### 3.6 - Item Editor ribbon Color - follows style guide

Ribbon colors must follow Fabric style guidelines using approved color tokens and theme support. Example: Table changes from gray to red when it becomes Table Dismiss.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 3.7 - Item Editor ribbon Typography - follows style guide

Ribbon typography must use Fabric-approved fonts, sizes, and weights for consistent text display

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**Guidelines:**

**UX:**

---

### 3.8 - Item Editor ribbon Elevation - follows style guide

Ribbon elevation (shadow/depth) must follow Fabric guidelines to maintain proper visual layering

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 3.9 - Item Editor ribbon Border radius - follows style guide

Ribbon border radius must follow Fabric guidelines for consistent rounded corner styling

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 3.10 - Item Editor ribbon Spacing and layouts - follows style guide

Ribbon spacing and layout must use Fabric-approved padding, margins, and grid systems for visual consistency

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

Ribbon spacing and layout must use Fabric-approved padding, margins, and grid systems for visual consistency. Ribbon spacing and layouts of the buttons: if placing buttons next to each other than use 0px spacing. When adding border line between buttons use 4px spacing on the left and right sides. If placing different components e.g. dropdown use 4px spacing between them.

---

## Canvas & Editor

Requirements for the item canvas and editor UI components

---

### 4.1 - Canvas border - follows style guide

Canvas border styling must follow Fabric guidelines for color, width, and border radius

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

Canvas border styling must follow Fabric guidelines for color, width, and border radius. Canvas must implement proper border styling according to Fabric design standards.

---

### 4.2 - Colors - follows style guide

Canvas colors should follow Fabric style guidelines using semantic color tokens and theme support

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)
- [Fabric Templates](https://aka.ms/fabrictemplates)

**Guidelines:**

**UX:**

Canvas colors should follow Fabric style guidelines using semantic color tokens and theme support. Canvas colors must follow Fabric design system color guidelines for consistency.

---

### 4.3 - Empty states - follows style guide

If Empty state exists (recommended), it should follow Fabric guidelines providing helpful messaging and clear actions for users

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

If Empty state exists (recommended), it should follow Fabric guidelines providing helpful messaging and clear actions for users. Canvas must properly implement empty states to guide users when no content exists.

---

### 4.4 - Left drawer - follows style guide

If left drawer panel exists it should follow Fabric guidelines for width, animation, and content organization

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

If left drawer panel exists it should follow Fabric guidelines for width, animation, and content organization. The canvas may implement a left drawer for additional navigation or tools.

---

### 4.5 - Bottom Drawer - follows style guide

If bottom drawer panel exists it should follow Fabric guidelines for height, animation, and content organization

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

If bottom drawer panel exists it should follow Fabric guidelines for height, animation, and content organization. The canvas may implement a bottom drawer for additional functionality.

---

### 4.6 - Tabs - follows style guide

Tab components should follow Fabric guidelines for styling, interaction, and active state indication

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

Tab components should follow Fabric guidelines for styling, interaction, and active state indication. The canvas may implement tabs for organizing content within the editor.

---

### 4.7 - Switch controls - follows style guide

If Switch/toggle controls exist they should follow Fabric guidelines for size, color, and interaction behavior

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

If Switch/toggle controls exist they should follow Fabric guidelines for size, color, and interaction behavior. The canvas may implement switch controls for toggling functionality.

---

### 4.8 - Canvas Center control - follows style guide

Center drawer panel should follow Fabric guidelines for width, animation, and content organization

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

## Navigation

Requirements for navigation between item views and levels

---

### 5.1 - Multi-Level navigation 

If multi level navigation between canvas levels (L1 to L2) is used it must follow Fabric guidelines for transitions, breadcrumbs, and back navigation

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

## Popup Dialogs

Requirements for popup dialogs and modal windows following design guidelines

---

### 6.1 - Popup dialog - follows style guide

If popup dialogs are used  they must follow Fabric style guidelines for modal behavior, backdrop, and dismissal patterns

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 6.1.5 - Border radius - follows style guide

Dialog border radius must follow Fabric guidelines for consistent rounded corner styling across modals

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 6.2 - Color - follows style guide

Dialog colors must follow Fabric guidelines using semantic color tokens for backgrounds, text, and borders

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 6.3 - Typography - follows style guide

Dialog typography must use Fabric-approved fonts, sizes, and hierarchy for headers, body text, and actions

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 6.4 - Elevation - follows style guide

Dialog elevation must follow Fabric guidelines to ensure proper visual layering above page content

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

### 6.6 - Spacing and layouts - follows style guide

Dialog spacing and layout must use Fabric-approved padding, margins, and content organization patterns

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Concept](./concept-item-overview.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)
- [Documentation](https://aka.ms/fabricuikit)

**Guidelines:**

**UX:**

---

## Other UX Requirements

Other requirements including monitoring, settings, and context menus

---

### 7.1 - Monitoring Hub integration

Item should optionally integrate with Fabric Monitoring Hub to expose job execution and performance data

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Define Item Jobs](./how-to-define-jobs.md)
- [Item Concept](./concept-item-overview.md)

---

### 7.2 - Actions in Workspace need to work

If Actions in the workspace are used, all item actions (rename, delete, share, etc.) must function correctly

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Item Manifest](./manifest-item.md)

---

### 7.3 - Trial experience

Item should provide a sample or trial experience to help user explore features before committing to purchase.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [How to add a trial experience](./how-to-add-trial-experience.md)
- [Fabric Templates](https://aka.ms/fabrictemplates)

**Guidelines:**

**UX:**

---

### 7.4 - Monetization experience

Item should provide a sample or trial experience to help users explore features before committing

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [How to monetize the workload](./how-to-monetize-workload.md)
- [Fabric Templates](https://aka.ms/fabrictemplates)

**Guidelines:**

**UX:**

---

### 7.5 - Jobs to be done

Item should define job types in the manifest to enable job tracking and monitoring integration

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [How to add Jobs to be done](./how-to-add-jobs-to-be-done.md)
- [Item Manifest](./manifest-item.md)

---

### 7.6 - Item Settings are used

Item should implement settings panel for user configuration following Fabric patterns

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Item Manifest](./manifest-item.md)
- [How to Add Custom Settings](./how-to-add-custom-settings.md)
- [Item Concept](./concept-item-overview.md)

---

### 7.7 - Custom Item Actions

Item should define custom actions for the item in the workspace. All Actions need to work if defined.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Item Manifest](./manifest-item.md)

---

---

## Additional Information

### Version History

This document is automatically generated.

---

*Generated by Microsoft Fabric Workload Validation System*  
*© 2025 Microsoft Corporation. All rights reserved.*
