---
title: Migrate to Dataflow Gen2 (CI/CD) using Save As
description: This article describes the procedure for migrating Dataflow Gen1, Dataflow Gen2, and Dataflow Gen2 (CI/CD) to Dataflow Gen2 (CI/CD) in Data Factory.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 4/21/2025
ms.custom:
  - template-how-to
  - dataflows
---

# Migrate to Dataflow Gen2 (CI/CD) using Save As

Data Factory in Microsoft Fabric now includes a Save As feature that lets you perform a single gesture to save an existing dataflow as a new Dataflow Gen2 (CI/CD) item.

## Save a Dataflow Gen2 or Gen2 (CI/CD) as a new Dataflow Gen2 (CI/CD)

>[!IMPORTANT]
>Saving from Gen2 (CI/CD) is still in preview.

You can now use the new Save As feature to save a Dataflow Gen2 or Dataflow Gen2 (CI/CD) to a new Dataflow Gen2 (CI/CD). To use the Save As feature:

1. In your workspace, select the ellipsis (...) next to an existing dataflow, and select **Save as Dataflow Gen2 (CI/CD)** in the context menu.

   :::image type="content" source="media/migrate-to-dataflow-gen2-using-save-as/select-save-as.png" alt-text="Screenshot of the context menu under the ellipsis, showing the Save as Dataflow Gen2 (CI/CD) option.":::

1. In the **Save as** dialog, optionally change the default **Name**, and then select **Create**.

   :::image type="content" source="media/migrate-to-dataflow-gen2-using-save-as/create-new-dataflow.png" alt-text="Screenshot of the save as option where you can enter the name of the dataflow.":::

   The new Dataflow Gen2 (CI/CD) is opened, enabling you to review and make any changes.

1. Close the new Dataflow Gen2 (CI/CD), or select **Save** or **Save and run**.

## Save a Dataflow Gen1 as a new Dataflow Gen2 (CI/CD)

You can also use the new Save As feature to save a Dataflow Gen1 to a new Dataflow Gen2 (CI/CD). To learn more, go to [Migrate from Dataflow Gen1 to Dataflow Gen2](dataflow-gen2-migrate-from-dataflow-gen1.md).  

To use the Save As feature:

[!INCLUDE [save-as-feature-how-to](includes/save-as-feature-how-to.md)]

## Bulk migration and automation

For automation and bulk migrations of Dataflows Gen1 to Dataflows Gen2 (CI/CD), use the Dataflows Save As operation in Power BI REST API. Learn more at [Dataflows Save As operation in Power BI REST API](/rest/api/power-bi/dataflows).

## Known limitations

The following tables contain the known limitations for the Save As feature:

| Feature/Limitation | Dataflow Gen1 | Dataflow Gen2 |
| ------------------ | ------------- | ------------- |
| You're required to reconnect to data sources | * | * |
| Scheduled refresh settings aren't copied | ** | √ |
| Incremental refresh settings aren't copied | √*** | √ |
| After creating a new Dataflow Gen2 (CI/CD) that contains Microsoft Fabric connections (for example, Lakehouse, Warehouse), if you add more Fabric connections, you'll need to reconnect existing Fabric connections.| √ | √ |

/* Cloud – Personal connections are copied from Dataflows Gen1/Gen2 to Dataflows Gen2 (CI/CD) created by Save As.

/** Refresh schedule is copied from Dataflows Gen1 to Dataflows Gen2 (CI/CD) created by Save As. The Schedule is set to **Off**, Start date and time = current date, and End date and time = current date + 100 years.

/*** Since Dataflows Gen1 Incremental Refresh isn't compatible with Dataflows Gen2 (CI/CD), its settings aren't copied. RangeStart, RangeEnd parameters, and _Canary queries are removed from the new Dataflow Gen2(CI/CD) after Save As. For more information, see [Incremental refresh in Dataflow Gen2](dataflow-gen2-incremental-refresh.md#differences-between-incremental-refresh-in-dataflow-gen1-and-dataflow-gen2).

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
