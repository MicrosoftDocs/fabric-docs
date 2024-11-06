---
title: Onboarding to multitasking documentation
description: This document outlines the structure, core functionalities, and examples for multitasking feature.
author: zainadrawshy
ms.author: zainadr
ms.topic: toturial-article
ms.custom:
ms.date: 11/06/2024
#customer intent: As a developer, I want to understand how to support multitasking feature.
---

# **Onboard to multitasking**
Multitasking allows user to open multiple artifacts at the same time, when opening an artifact, a tab will be pinned to the left navigation bar. by default, we support opening one item at the same time and a set of lifecycle events which is triggered when the artifact tab is being initialized, deactivated, and destroyed with no work required by any workload.


## Frontend
**To change default properties for multitasking:**
Define the editorTab section inside the item manifest for editing tabs properties:
```json
    "editorTab": {

    }
```
**To enable opening more than one item at the same time:**

- define maxInstanceCount property and assign to number of items you want to be opened at the same time (up to 10 items).
```json
    "editorTab": {
      "maxInstanceCount": "10"
    }
```
**To customize actions and handlers:**

The workload team decides to implement the tab actions and handlers or part of it, they need to set property in the item Frontend manifest in editorTab section, to listen to these actions in its own code, handle them accordingly, and return the results. If not set any of the actions or part of it, the default actions will be handeled automaticaly.

- define tab actions (you can choose to define a part of the actions and not all of them, for undefined actions, default actions will be used) properties in the editorTab:
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
When the workload team registers the action, Fabric expects the workload action to return the data in a certain format so that Fabric can read or display that information.

- actions expected results:
```typescript
  /* OnInit event is triggered when the artifact is opened for the first time.
   This event contains the id of the tab being initialized. Based on this tab
   id, the handler needs to be able to return the displayName or metaData.*/

   onInit: Action<never>;

   /*CanDeactivate event is triggered when navigating away from the tab.
   This event contains the id of the tab being deactivated. The
   CanDeactivate handler should return a Boolean value indicating whether the
   given artifact tab can be deactivated. For an ideal multi-tasking
   experience, the handler should always return True.*/

   canDeactivate: Action<never>;

   /*OnDeactivate event is triggered immediately after CanDeactivate return
   True. This event contains the id of the tab being deactivated. The
   OnDeactivate handler should cache unsaved artifact changes and UI state.
   The next time the user navigates back to the artifact, the artifact needs
   to be able to recover its data and UI state. Only when this handler returns
   will the actual deactivation begin.*/

   onDeactivate: Action<never>;

   /*CanDestroy event is triggered after the close button is clicked,
    before the artifact tab is closed.The event contains the id of the tab
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
   id of the tab being destroyed. The OnDestroy handler gives the artifact the
   opportunity to do some cleanup work.*/

   onDestroy: Action<never>;

   /*OnDelete event is triggered when the artifact which has been opened is
   deleted.The event contains the id of the artifact being deleted.
   just to tell the extension the current artifact is deleted.*/

   onDelete: Action<never>;
```

For an example of handling the tab actions, see index.ui.ts that can be found in the sample [repo↗](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample), and search for actions starting with 'item.tab'.
