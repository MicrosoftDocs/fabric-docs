---
title: Format Multitasking Tabs
description: Learn how to format multitasking tabs on the left pane of Microsoft Fabric. One item opens by default with automatically handled lifecycle events.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 08/20/2025
---

# Format multitasking tabs

In Microsoft Fabric, you can use multitasking to open multiple items at the same time. When you open an item, a tab is pinned to the left pane. By  default, Fabric supports opening one item at a time. A set of lifecycle events is triggered when the item tab is initialized, deactivated, and destroyed with no work required by any workload.

## Change default properties for multitasking

Define the `editorTab` section inside the item manifest for editing tab properties:

```json
    "editorTab": {

    }
```

## Enable opening more than one item at the same time

Define the `maxInstanceCount` property and assign the number of items that you want to open at the same time:

```json
    "editorTab": {
      "maxInstanceCount": "10"
    }
```

## Customize actions and handlers

When you decide to implement tab actions and handlers (or part of them), you need to set a property in the item's front-end manifest in the `editorTab` section. That property listens to these actions in its own code, handles the actions accordingly, and returns the results. If you don't set any of the actions (or part of them), the default actions are handled automatically.

Define properties for tab actions in the `editorTab` section:

```json
    "editorTab": {
      "onInit": "item.tab.onInit",
      "onDeactivate": "item.tab.onDeactivate",
      "canDeactivate": "item.tab.canDeactivate",
      "canDestroy": "item.tab.canDestroy",
      "onDestroy": "item.tab.onDestroy",
      "onDelete": "item.tab.onDelete"
    }
```

When you register the workload action, Fabric expects the action to return the data in a certain format so that Fabric can read or display that information:

```typescript
   /*An OnInit event is triggered when the item is opened for the first
   time. This event contains the ID of the tab being initialized. Based on
   this tab ID, the handler needs to be able to return the display name
   or metadata.*/

   onInit: Action<never>;

   /*A CanDeactivate event is triggered when the user moves away from the tab.
   This event contains the ID of the tab being deactivated. The
   CanDeactivate handler should return a Boolean value that indicates whether
   the item tab can be deactivated. For an ideal multitasking experience,
   the handler should always return True.*/

   canDeactivate: Action<never>;

   /*An OnDeactivate event is triggered immediately after CanDeactivate
   returns True. This event contains the ID of the tab being deactivated.
   The OnDeactivate handler should cache unsaved item changes and
   the UI state.
   The next time the user goes back to the item, the item needs
   to be able to recover its data and UI state. The actual deactivation begins
   only when this handler returns.*/

   onDeactivate: Action<never>;

   /*A CanDestroy event is triggered after the close button is selected,
    before the item tab is closed. The event contains the ID of the tab
    being destroyed and also an allowInteraction parameter.
    The CanDeactivate handler should return a Boolean value that indicates
    whether the given item tab can be destroyed.
    If allowInteraction equals False, the implementation returns True
    if there are no dirty changes, and False otherwise.
    If allowInteraction equals True, a pop-up window can be used to ask
    for the user's opinion. It returns True if the user saves or discards
    dirty changes, and False if the user cancels the pop-up window.
    The OnDestroy handler gives the item the opportunity to do some
    cleanup work.*/

   canDestroy: Action<never>;

   /*An OnDestroy event is triggered when the tab is closed. The event
   contains the ID of the tab being destroyed. The OnDestroy handler gives
   the item the opportunity to do some cleanup work.*/

   onDestroy: Action<never>;

   /*An OnDelete event is triggered when the opened item is deleted.
   The event contains the ID of the item being deleted, just to tell
   the extension that the current item is deleted.*/

   onDelete: Action<never>;
```

## Example of handling the tab actions

This example listens for all actions related to `item.tab` and handles each one accordingly:

```typescript
workloadClient.action.onAction(async function ({ action, data }) {
    switch (action) {
        case 'item.tab.onInit':
            const { id } = data as ItemTabActionContext;
            try{
                const getItemResult = await callItemGet(
                    id,
                    workloadClient
                );
                const item = convertGetItemResultToWorkloadItem<ItemPayload(getItemResult);
                return {title: item.displayName};
            } catch (error) {
                console.error(
                    `Error loading the Item (object ID:${id})`,
                    error
                );
                return {};
            }
        case 'item.tab.canDeactivate':
            return { canDeactivate: true };
        case 'item.tab.onDeactivate':
            return {};
        case 'item.tab.canDestroy':
            return { canDestroy: true };
        case 'item.tab.onDestroy':
            return {};
        case 'item.tab.onDelete':
            return {};
        default:
            throw new Error('Unknown action received');
    }
});
```

- `item.tab.onInit`: Fetches item data by using the ID and returns the item's title.
- `item.tab.canDeactivate`: Returns `{ canDeactivate: true }`, which allows switching between tabs easily.
- `item.tab.onDeactivate`, `item.tab.onDestroy`, `item.tab.onDelete`: Returns an empty object for these actions.
- `item.tab.canDestroy`: Returns `{ canDestroy: true }`.

## Related content

For a full example of handling the tab actions, see `index.ui.ts` in the [sample repo](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample). Search for actions that start with `item.tab`.
