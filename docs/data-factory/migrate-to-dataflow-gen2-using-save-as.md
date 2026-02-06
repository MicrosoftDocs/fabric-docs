---
title: Migrate to Dataflow Gen2 (CI/CD) using Save As
description: This article describes the procedure for migrating Dataflow Gen1, Dataflow Gen2, and Dataflow Gen2 (CI/CD) to Dataflow Gen2 (CI/CD) in Data Factory.
ms.topic: how-to
ms.date: 01/28/2026
ms.custom:
  - template-how-to
  - dataflows
---

# Migrate to Dataflow Gen2 (CI/CD) using Save As

Data Factory in Microsoft Fabric now includes a Save As feature that lets you perform a single gesture to save an existing dataflow as a new Dataflow Gen2 (CI/CD) item.

## Save a Dataflow Gen2 or Gen2 (CI/CD) as a new Dataflow Gen2 (CI/CD)

You can now use the new Save As feature to save a Dataflow Gen2 or Dataflow Gen2 (CI/CD) to a new Dataflow Gen2 (CI/CD). To use the Save As feature:

[!INCLUDE [save-as-feature-how-to](includes/save-as-feature-how-to.md)]

## Save a Dataflow Gen1 as a new Dataflow Gen2 (CI/CD)

You can also use the new Save As feature to save a Dataflow Gen1 to a new Dataflow Gen2 (CI/CD). To learn more, go to [Migrate from Dataflow Gen1 to Dataflow Gen2](dataflow-gen2-migrate-from-dataflow-gen1.md).  

To use the Save As feature:

1. In your workspace, select the ellipsis (...) next to an existing dataflow, and select **Save as Dataflow Gen2** in the context menu.

1. In the **Save as** dialog, optionally change the default **Name**, and then select **Create**.

1. The new Dataflow Gen2 (CI/CD) is opened, enabling you to review and make any changes.

1. Close the new Dataflow Gen2 (CI/CD), or select **Save** or **Save and run**.

>[!TIP]
>For bulk and auto-migrations, you can use the [REST API](/rest/api/power-bi/dataflows/save-dataflow-gen-one-as-dataflow-gen-two).

## Known limitations

The following tables contain the known limitations for the Save As feature:

| Feature/Limitation | Dataflow Gen1 | Dataflow Gen2 |
| ------------------ | ------------- | ------------- |
| Scheduled refresh settings | Limited |  |
| Incremental refresh settings | | Limited |

Dataflow Gen1 capabilities that aren't applicable in Dataflow Gen2 (CI/CD) and therefore aren't copied:

| Feature/Limitation | Dataflow Gen1 | Dataflow Gen2 |
| ------------------ | ------------- | ------------- |
| CDM folders | No | N/A |
| Bring your own lake (BYOL) | No<sup>1</sup> | N/A |
| Compute Engine | No | N/A |
| DirectQuery | No<sup>2</sup> | N/A |
| AI Insights | No | N/A |
| Endorsements | No | N/A |

<sup>1</sup> Dataflow Gen2 uses OneLake. For more information, go to [Govern Azure connections](/power-bi/guidance/powerbi-implementation-planning-tenant-administration#govern-azure-connections).<br />
<sup>2</sup> We recommend that you use data destinations and connect directly to the output tables. For more information, go to [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md).

## Related content

* [Move queries from Dataflow Gen1 to Dataflow Gen2](move-dataflow-gen1-to-dataflow-gen2.md)
* [Dataflow Gen2 with CI/CD and Git integration support](dataflow-gen2-cicd-and-git-integration.md)
* [REST API](/rest/api/power-bi/dataflows/save-dataflow-gen-one-as-dataflow-gen-two)
