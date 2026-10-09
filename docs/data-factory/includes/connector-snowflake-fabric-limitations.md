---
title: Fabric-specific limitations for the Snowflake connector
description: Known limitations and workarounds for Snowflake connections in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.date: 10/08/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
---

### Snowflake connections might not work when the server URL is in uppercase

If you create a Snowflake connection in Fabric and enter the server URL in uppercase letters, the connection might not appear when you try to select it in your Fabric items. You might also encounter errors when you use the connection.

**Workaround:** When you create a Snowflake connection, enter the server URL in all lowercase letters. For example, use `myaccount.snowflakecomputing.com` instead of `MYACCOUNT.SNOWFLAKECOMPUTING.COM`.
