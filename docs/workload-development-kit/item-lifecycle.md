---
title: Item lifecycle
description: Learn about item lifecycle in Microsoft Fabric.
ms.topic: concept-article
ms.date: 05/21/2024
---
# Item life cycle

The recommended flow for item creation in Fabric UI is

1. Prompt the user for the item name.
1. Create an "empty" item.
1. Edit and save the new item.

:::image type="content" source="media/item-lifecycle/part-1.png" alt-text="Schematic representation of the first part of item life cycle management in Microsoft Fabric." lightbox="media/item-lifecycle/part-1.png":::

This process can be divided into the following phases:

1. [Create an empty item](#create-an-empty-item)
1. [Load the item](#load-the-item)
1. [Edit the item](#edit-the-item)

:::image type="content" source="media/item-lifecycle/part-2.png" alt-text="Schematic representation of the second part of item life cycle management in Microsoft Fabric." lightbox="media/item-lifecycle/part-2.png":::

When the user selects a button to create an item of any type, Fabric FE (Portal) code needs to load the corresponding item editor.
Fabric FE makes an API call to Fabric BE to fetch the required information, including the source URL, the Microsoft Entra ID application details, and the workload BE URL, all corresponding to the current context. Once this information is available, an item is created. Typically the item loads its static resources like HTML, JavaScript, CSS, and images from CDN. We recommend using multi-region CDN deployment and to configure name resolution so that the source URL will resolve to the CDN server that is physically closest to the current location of the browser.

> [!NOTE]  
> Typically the item editor needs to make calls to the workload BE, possibly during editing phase. This requires resolving the workload BE URL based on the current context. Currently, the code can use a hard-coded BE URL.

## Create an empty item

It's a common practice in Fabric to allow creating an item with no user input, except the item name. It isn't expected that such items do anything meaningful (therefore "empty"), but they appear in the workspace and can participate in basic flows and operations. Moreover, in some cases they can even be functional, based on reasonable defaults set by the workload.

This flow starts with prompting the user to provide a name for the new item. Having the name, the iframe makes a call to the host JS API to initiate the item creation flow, passing optional JSON object as "creation payload," and the host will then make a call to Fabric BE. Authentication is handled by the host. Fabric BE resolves the workload BE URL based on the context, and calls the `CreateItem` workload API, passing the "creation payload" sent by the iframe. The workload BE is expected to store the new item metadata, possibly allocate some resources (although this step can be deferred to a later point), and do any other relevant work. When item creation is completed from the workload BE perspective, it needs to notify Fabric BE on item metadata change. The same process needs to happen on any update of the item metadata, and so the subject token needs to be exchanged for the Fabric BE audience.

> [!NOTE]  
> The API for notifying item metadata update is not currently available.

## Load the item

To edit an item, the iframe needs to load its metadata. This process is same for loading "empty" and "initialized" items. The iframe makes a call to the host JS API, which calls Fabric BE, which in turn call GetItemPayload workload API. The workload BE can return a JSON object, which is then passed back to the iframe. Authentication is handled by the host.

## Edit the item

Once the item metadata is loaded, an editing session can start. Either in the beginning or during this session, the iframe might need to make calls to the workload BE (for example to fetch a configuration, populate UI controls, perform validations, and more). For this purpose, it needs to request a token from the host JS API.

## Related content

* [Introducing workloads](workload-environment.md)
* [Manage a workload in Fabric](manage-workload.md)

