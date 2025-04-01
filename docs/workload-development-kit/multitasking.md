---
title: Onboard to multitasking
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 11/06/2024
---
# **Onboard to multitasking**
Multitasking allows a user to open multiple items at the same time, when opening an item, a tab will be pinned to the left navigation bar. By  default, we support opening one item at the same time and a set of lifecycle events which is triggered when the artifact tab is being initialized, deactivated, and destroyed with no work required by any workload.


## Frontend
### Change default properties for multitasking

Define the editorTab section inside the item manifest for editing tabs properties:
```json
    "editorTab": {

    }
```
### Enable opening more than one item at the same time

Define the maxInstanceCount property and assign to number of items you want to be opened at the same time (up to 10 items):
```json
    "editorTab": {
      "maxInstanceCount": "10"
    }
```
### Customize actions and handlers

The workload developer decides to implement the tab actions and handlers or part of it, they need to set property in the item Frontend manifest in editorTab section, to listen to these actions in its own code, handle them accordingly, and return the results. If not set any of the actions or part of it, the default actions will be handled automatically.

Define tab actions properties in the editorTab. You can choose to define a part of the actions and not all of them, for undefined actions, default actions are used.
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
When the workload developer registers the action, Fabric expects the workload action to return the data in a certain format so that Fabric can read or display that information:

```typescript
  /* OnInit event is triggered when the artifact is opened for the first time.
   This event contains the ID of the tab being initialized. Based on this tab
   id, the handler needs to be able to return the displayName or metaData.*/

   onInit: Action<never>;

   /*CanDeactivate event is triggered when navigating away from the tab.
   This event contains the ID of the tab being deactivated. The
   CanDeactivate handler should return a Boolean value indicating whether the
   given artifact tab can be deactivated. For an ideal multi-tasking
   experience, the handler should always return True.*/

   canDeactivate: Action<never>;

   /*OnDeactivate event is triggered immediately after CanDeactivate return
   True. This event contains the ID of the tab being deactivated. The
   OnDeactivate handler should cache unsaved artifact changes and UI state.
   The next time the user navigates back to the artifact, the artifact needs
   to be able to recover its data and UI state. Only when this handler returns
   will the actual deactivation begin.*/

   onDeactivate: Action<never>;

   /*CanDestroy event is triggered after the close button is clicked,
    before the artifact tab is closed.The event contains the ID of the tab
    being destroyed and also an **allowInteraction** parameter.
    CanDeactivate handler should return a Boolean value indicating whether
    the given artifact tab can be destroyed.
    If allowInteraction equals False, the implementation returns True
    there are no dirty changes, and False otherwise.
    If allowInteraction equals True, a pop-up window can be used to ask
    for the user's opinion. Returns True if the user saves or discards
    dirty changes, and False if the user cancels the popup.
    The OnDestroy handler gives the artifact the opportunity to do some cleanup work.*/

   canDestroy: Action<never>;

   /*OnDestroy event is triggered when the tab is closed. The event contains the
   ID of the tab being destroyed. The OnDestroy handler gives the artifact the
   opportunity to do some cleanup work.*/

   onDestroy: Action<never>;

   /*OnDelete event is triggered when the artifact which has been opened is
   deleted.The event contains the ID of the artifact being deleted.
   just to tell the extension the current artifact is deleted.*/

   onDelete: Action<never>;
```

## Example of handling the tab actions

In this example we listen for all actions related to an item.tab and handle each one accordingly:
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
- item.tab.onInit: Fetches item data using ID and returns the item’s title.
- item.tab.canDeactivate: Returns { canDeactivate: true } which allows switching between tabs easily.
- item.tab.onDeactivate, item.tab.onDestroy, item.tab.onDelete: Returns an empty object for these actions.
- item.tab.canDestroy: Returns { canDestroy: true }.


## Next steps
For a full example of handling the tab actions, see index.ui.ts in the sample [repo](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample), and search for actions starting with 'item.tab.'
