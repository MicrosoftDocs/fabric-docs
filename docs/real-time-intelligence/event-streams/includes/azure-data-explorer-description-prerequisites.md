---
title: Description and prerequisites for Azure Data Explorer connector
description: The include file provides description, a note, and prerequisites for using an Azure Data Explorer connector.
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: include
ms.custom:
ms.date: 03/21/2025
---


Azure Data Explorer is a fully managed, high-performance platform that delivers real-time insights from massive streaming data. Microsoft Fabric event streams enable you to connect to an Azure Data Explorer database, stream the data from its tables, and route them to various destinations within Fabric. 

> [!NOTE]
> This source isn't supported in the following regions of your workspace capacity: West US3, Switzerland West.   

## Prerequisites   
Before you start, you must complete the following prerequisites: 

- Access to the Fabric premium workspace with Contributor or higher permissions.   
- Ensure that you have an active Azure subscription and an Azure Data Explorer cluster with at least one database deployed. 
- Ensure that you have the required permissions to access the Azure Data Explorer cluster. 
- Ensure that the Azure Data Explorer cluster is publicly accessible and not restricted by a firewall or a virtual network.  
