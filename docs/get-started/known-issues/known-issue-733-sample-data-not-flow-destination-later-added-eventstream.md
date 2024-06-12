---
title: Known issue - Sample data doesn’t flow after destination later added into eventstream
description: A known issue is posted where sample data doesn’t flow after destination later added into eventstream.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/06/2024
ms.custom: known-issue-733
---

# Known issue - Sample data doesn’t flow after destination later added into eventstream

When you select the **Sample data** data source from the Real-Time hub, the **Get Events** wizard guides you through the configuration process. Once completed, an eventstream is created with the sample source added. However, if you open this eventstream and add operators and destinations, the sample data stops emitting. No data flows to the destinations you added.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

Once the eventstream is published, the sample data source stops emitting and no data flows into the added destinations.

## Solutions and workarounds

To work around this issue, don't select the **Sample data** data source from the **Get Events** wizard. Instead, create an eventstream and add the sample data source directly from within the eventstream.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
