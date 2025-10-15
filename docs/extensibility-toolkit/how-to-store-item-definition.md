---
title: HowTo - Store Item Definition (State)
description: Learn how to store your item definition in Fabric
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 09/04/2025
---

# Store item definition (state)

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

This method demonstrates how to persist the definition of an item using the SDK. It's a simplified version that uses a single object that is stored in a single definition part. For most of the users this method is a good starting point. If you need to store more than one definition part, you can easily do this yourself. Take a look into the `saveitemDefintion` Method how parts are handled to get a better understanding how to add more parts.

>[!NOTE]
> All Definition parts that are stored aren't currently validated. Schema-based validation for both the structure and the definition parts (for example, JSON) isn't in place. For nonorganizational workloads, onboarding to this feature is required before public preview.
