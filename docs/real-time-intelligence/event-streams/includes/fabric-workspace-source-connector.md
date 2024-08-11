---
title: Fabric Workspace Item events connector for Fabric event streams
description: This include files has the common content for configuring Fabric Workspace Item events connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

1. On the **Select a data source** screen, select **Fabric Workspace Item events**.

   ![A screenshot of selecting Fabric Workspace Item events.](media/fabric-workspace-source-connector/select-external-events.png)

1. On the **Connect** screen, first select  **Event type(s)** of interest that you want to capture in the eventstream. By default, all supported events are captured.
1. In the next step, select the right **Event source**. You can choose between streaming all workspace item events in a tenant by selecting the source option as **Across this tenant** or restrict to specific workspace by choosing **By workspace** option. To select a **workspace** for which you want to stream workspace item events, you must be a workspace admin, member, or contributor of that workspace. To receive workspace item events across the tenant, you need to be a Fabric tenant admin

   ![A screenshot of the Connect screen.](media/fabric-workspace-source-connector/connect.png)

1. Select **Next** after choosing the right Event source.

1. On the **Review and create** screen, select **Add** to complete the configuration for Fabric workspace item events.

