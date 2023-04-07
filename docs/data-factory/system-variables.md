---
title: System variables
description: This article describes system variables supported by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]. You can use these variables in expressions when defining pipeline entities.
ms.reviewer: xupzhou
ms.author: jburchel
author: jonburchel
ms.topic: conceptual 
ms.date: 04/07/2023
---

# System variables supported by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article describes system variables supported by Azure Data Factory and Azure Synapse. You can use these variables in expressions when defining entities within either service.

## Pipeline scope

These system variables can be referenced anywhere in a pipeline.

| Variable Name | Description |
| --- | --- |
| @pipeline().DataFactory |Name of the data  or Synapse workspace the pipeline run is running in |
| @pipeline().Pipeline |Name of the pipeline |
| @pipeline().RunId |ID of the specific pipeline run |
| @pipeline().GroupId | ID of the group to which pipeline run belongs. |

>[!NOTE]
>Trigger-related date/time system variables (in both pipeline and trigger scopes) return UTC dates in ISO 8601 format, for example, `2017-06-01T22:20:00.4061448Z`.

## Next steps

For information about how these variables are used in expressions, see [Expression language & functions](expression-language.md).