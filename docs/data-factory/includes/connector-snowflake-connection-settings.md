---
title: Include file for Snowflake connection settings in Manage connections and gateways
description: Existing Snowflake connection properties for Manage connections and gateways in Fabric.
ms.date: 04/21/2026
ms.topic: include
author: whhender
ms.author: whhender
ms.subservice: data-factory
ms.service: fabric
---

The following table contains a summary of the properties needed for Snowflake connection:

| Name | Description | Required |
| --- | --- | --- |
| **Connection name** | A name for your connection. | Yes |
| **Connection type** | Select a type for your connection. | Yes |
| **Server** | The host name of the Snowflake account. | Yes |
| **Warehouse** | The default virtual warehouse used for the session after connecting. | Yes |
| **Authentication kind** | Go to [Authentication](#authentication). | Yes |
| **Privacy Level** | The privacy level that you want to apply. Allowed values are None, Organizational, Privacy, and Public. | Yes |
| **Specify a text value to use as Role name** | Enter a text value to use as Role name. | No |
| **Connection timeout in seconds** | The time to wait (in seconds) while trying to establish a connection before terminating the attempt and generating an error. | No |
| **Command timeout in seconds** | The time to wait (in seconds) while trying to execute a command before terminating the attempt and generating an error. | No |
| **Implementation** | The implementation modes for test connection. | No |
