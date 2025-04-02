---
title: Description and prerequisites for Solace PubSub+ source
description: The include file provides description, a note, and prerequisites for using a Solace PubSub+ source in an eventstream or in Real-Time hub. 
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: include
ms.custom:
ms.date: 03/14/2025
---


Solace PubSub+ is a fully managed enterprise message broker that provides message queues and publish-subscribe topics. Microsoft Fabric event streams allow you to connect to Solace PubSub+, enabling messages from Solace PubSub+ to be ingested into Fabric eventstream and routed to various destinations within Fabric. 

> [!NOTE]
> This source is **not supported** in the following regions of your workspace capacity: **West US3, Switzerland West**.  

## Prerequisites  
Before you start, you must complete the following prerequisites: 

- Access to the Fabric premium workspace with Contributor or higher permissions.  
- You need to have appropriate permissions on the Solace Pub Sub+ event broker services. 
- Ensure that Transport Layer Security (TLS) is disabled, and the Solace Message Format service is enabled to support TCP-based messaging. 
- Confirm that the event broker is publicly accessible and not behind a firewall or secured in a virtual network. 
