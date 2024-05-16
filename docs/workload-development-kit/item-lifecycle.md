---
title: Item lifecycle
description: Learn about item lifecycle in Microsoft Fabric.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: concept-article
ms.custom:
ms.date: 05/21/2024
#customer intent:
---

# Item life cycle 

The recommended flow for item creation in Fabric UI is: 

- Prompt the user for the item name 

- Create an "empty" item 

- Edit and save the new item 

This process can be divided into four phases, which are described in details in the following sections: 

- Creation of an empty item 

- Loading the item 

- Editing and saving the item 

All these phases are marked in the diagrams with corresponding blue dashed boxes. 

![bootstrap](bootstrap.png) 

When the user clicks a button for creating an item of type XYZ, Fabric FE (Portal) code needs to load the corresponding item editor ``. Fabric FE makes an API call to Fabric BE to fetch the required information, including the `` source URL, Entra ID application details, the workload BE URL, corresponding to the current context etc. Once this information is available, an `` is created. Typically the `` will load its static resources like HTML, JavaScript, CSS, and images from CDN. It is recommended to use multi-region CDN deployment and to configure name resolution such, that the `` source URL will resolve to the CDN server which is physically closest to the current location of the browser. 

**Note:**  Typically the item editor `` needs to make calls to the workload BE, possibly during editing phase. This requires resolving the workload BE URL, based on the current context. Fabric will do this and provide the resolved URL to the ``. This part is not ready yet and will be available soon. Until then, during the early development phase, the `` code can use hard-coded BE URL. 

## Create an empty item 

It is a common practice in Fabric to allow creating an item with no user input, except the item name. It is not expected that such items will do anything meaningful (therefore "empty"), but they show in the workspace and can participate in basic flows and operations. Moreover, in some cases they may even be functional, based on reasonable defaults, set by the workload. 

As mentioned, this flow starts with prompting the user to provide a name for the new item. Having the name, the `` makes a call to the host JS API to initiate the item creation flow, passing optional JSON object as "creation payload", and the host will then make a call to Fabric BE. Authentication is handled by the host. Fabric BE will resolve the workload BE URL based on the context, and call CreateItem workload API, passing the "creation payload" sent by the ``. Workload BE is expected to store the new item metadata, possibly allocate some resources (but that may be deferred to a later point) and do any other relevant work. When item creation is completed from the workload BE perspective, it needs to notify Fabric BE on item metadata change. Same needs to happen on any update of the item metadata. For this, the subject token needs to be exchanged for Fabric BE audience. 

**Note:**  The API for notifying item metadata update is not available yet and will be provided soon. 

## Load an item 

For editing an item the `` needs to load its metadata. This process is same for loading "empty" and "initialized" items. The `` makes a call to the host JS API, which calls Fabric BE, which in turn call GetItemPayload workload API. The workload BE can return a JSON object, which is then passed to the ``. Authentication is handled by the host. 

## Edit an item 

Once the item metadata is loaded, editing session can start. In the beginning or during this session the `` may need to make calls to the workload BE. For example for fetching some configuration, populating UI controls, performing validations and more. For this it needs to request a token from the host JS API. Eventually, when the user clicks Save, the `` makes a call to the host JS API to initiate the item update flow, passing optional JSON object as "update payload", and the host will then make a call to Fabric BE. Authentication is handled by the host. Fabric BE will resolve the workload BE URL based on the context, and call UpdateItem workload API, passing the "update payload" sent by the ``. Workload BE is expected to perform validations, update the item metadata in its store, possibly allocate or free some resources and do any other relevant work. When item update is completed from the workload BE perspective, it needs to notify Fabric BE on item metadata change, similarly to item creation phase. 

 