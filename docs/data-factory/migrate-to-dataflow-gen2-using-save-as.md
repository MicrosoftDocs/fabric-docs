---
title: Migrate to Dataflow Gen2 (CI/CD) using Save As (Preview)
description: This article describes the procedure for migrating Dataflow Gen1, Dataflow Gen2, and Dataflow Gen2 (CI/CD) to Dataflow Gen2 (CI/CD) in Data Factory.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 2/12/2025
ms.custom:
  - template-how-to
---

# Migrate to Dataflow Gen2 (CI/CD) using Save As (Preview)

Data Factory in Microsoft Fabric now includes a Save As feature that lets you perform a single gesture to save an existing dataflow as a new Dataflow Gen2 (CI/CD) item.

## Save a Dataflow Gen1 as a new Dataflow Gen2 (CI/CD)

You can now use the new Save As feature to save a Dataflow Gen1 to a new Dataflow Gen2 (CI/CD). To use the Save As feature:

1. In your workspace, select the ellipsis (...) next to an existing dataflow, and select **Save as Dataflow Gen2** in the context menu.  

2. In the **Save as** dialog, optionally change the default **Name**, and then select **Create**.  

   The new Dataflow Gen2 (CI/CD) is opened, enabling you to review and make any changes.  

3. Close the new Dataflow Gen2 (CI/CD), or select **Save** or **Save and run**.  

## Save a Dataflow Gen2 or Gen2 (CI/CD) as a new Dataflow Gen2 (CI/CD)

You can also use the new Save As feature to save a Dataflow Gen2 or Dataflow Gen2 (CI/CD) to a new Dataflow Gen2 (CI/CD). To use the Save As feature:

1. In your workspace, select the ellipsis (...) next to an existing dataflow, and select **Save as** in the context menu.  

2. In the **Save as** dialog, optionally change the default **Name**, and then select **Create**.  

   The new Dataflow Gen2 (CI/CD) is opened, enabling you to review and make any changes.  

3. Close the new Dataflow Gen2 (CI/CD), or select **Save** or **Save and run**.  

## Known limitations

The following list contains the known limitations for the Save As feature:

* You're required to reconnect to data sources. (Gen1, Gen2)
* You're required to reconnect to the output destination. (Gen2)
* Scheduled refresh settings aren't copied. (Gen1, Gen2)
* Incremental refresh settings aren't copied. (Gen1, Gen2)
* Gen1 capabilities that aren't applicable in Gen2 (CI/CD) and therefore aren't copied include CDM folders, BYOL, Compute Engine, DirectQuery, AI Insights, and Endorsements.

## Related content

* [Move queries from Dataflow Gen1 to Dataflow Gen2](move-dataflow-gen1-to-dataflow-gen2.md)
* [Dataflow Gen2 with CI/CD and Git integration support](dataflow-gen2-cicd-and-git-integration.md)