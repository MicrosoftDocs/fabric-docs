---
title: Entra ID authentication in Custom Endpoint
description: Learn how to connect to Eventstream's Custom Endpoint using Entra ID authentication. 
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 10/30/2024
ms.search.form: authentication
---

# Entra ID authentication in Custom Endpoint

Microsoft Fabric provides integrated access control management for workspace access based on Microsoft Entra ID. A key advantage of using Microsoft Entra ID with Eventstream is that you don't need to store your credentials in the code anymore. Instead, you can request an Microsoft Entra token from the Microsoft identity platform and stream data to Eventstream.

This article shows you how to connect to Eventstream's Custom Endpoint using Entra ID authentication.

## Prerequisites 
Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located. 
- You need to have appropriate permission to get event hub's access keys. The event hub must be publicly accessible and not behind a firewall or secured in a virtual network.
- 

## Authenticate from an application





## Related content

To learn how to add other sources to an eventstream, see the following articles: 
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Sample data](add-source-sample-data.md)
- [Custom app](add-source-custom-app.md)
