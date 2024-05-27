---
title: Known issue - SQL database mirror doesn't start when you create connection during mirror creation
description: A known issue is posted where SQL database mirror doesn't start when you create connection during mirror creation.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/01/2024
ms.custom: known-issue-702
---

# Known issue - SQL database mirror doesn't start when you create connection during mirror creation

When you create an SQL database mirror artifact, you can create a SQL connection with service principal authentication to perform the mirroring. If you created the SQL connection during the creation of the mirror item, the mirror doesn't start.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

You face this issue if you see replication is stopped and can't start the replication.

## Solutions and workarounds

There are two workarounds:

1. If the mirror artifact isn't yet created, create the SQL connection using the **Manage connections and gateways** page, instead of creating the SQL connection during the creation of the mirror artifact.
1. If the mirror artifact is already created and you face this issue, go to the **Manage connections and gateways** page and edit the SQL connection.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
