---
title: HTTP source connector limitations
description: This file documents the limitations of the HTTP source connector.
ms.topic: include
ms.date: 04/06/2026
author: spelluru
ms.author: spelluru
ms.service: fabric
ms.subservice: rti-eventstream
---



## Limitations

- The HTTP connector currently supports only **JSON** API responses.
- **OAuth authentication** isn't supported.
- The HTTP source doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Exporting or importing an Eventstream item that includes this source through Git might result in errors.