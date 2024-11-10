---
title: Known issue - Data warehouse not accessible when using OneLake URLs with friendly names
description: A known issue is posted where a data warehouse isn't accessible when using OneLake URLs with friendly names.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 11/05/2024
ms.custom: known-issue-892
---

# Known issue - Data Warehouse not accessible when using OneLake URLs with friendly names

You can try to access files and folders within a data warehouse through an API, Azure Storage Explorer, or another client tool. Due to this issue, the access fails if you try to connect using a friendly name in the OneLake URL. A friendly name contains the name of the data warehouse rather than the data warehouse globally unique identifier (GUID). Examples of URLs that contain friendly names are `https://onelake.dfs.fabric.microsoft.com//.datawarehouse//` and `abfs[s]://@onelake.dfs.fabric.microsoft.com/.datawarehouse//`.

**Status:** Fixed: November 5, 2024

**Product Experience:** OneLake

## Symptoms

When trying to access the content of a data warehouse, you receive an error message similar to: `Operation has failed`. For example, in Azure Storage Explorer, you see `No data available` when you try to open a warehouse item.

## Solutions and workarounds

Accessing data continues to work with globally unique identifiers (GUIDs) as expected. Use the [GUID process](/fabric/onelake/onelake-access-api#uri-syntax) to access data warehouses.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
