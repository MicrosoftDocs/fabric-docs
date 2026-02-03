---
title: 'Digital twin builder (preview) tutorial part 3: Define relationship types'
description: Define semantic relationship types between entity types in digital twin builder (preview). Part 3 of the digital twin builder (preview) tutorial.
author: baanders
ms.author: baanders
ms.date: 05/01/2025
ms.topic: tutorial
---

# Digital twin builder (preview) tutorial part 3: Define semantic relationship types between entity types

In this tutorial step, use digital twin builder's contextualization feature to create relationship types, which represent connections between the entity types.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Create relationship types

In the semantic canvas, follow these steps to create five relationship types.

1. Create a relationship type *Distiller has MaintenanceRequest*.
    1. Select **Distiller** in your entity types list. Create a relationship type by selecting either the **Add relationship** button, or **...** to the right of the Distiller and then **Add relationship** from the overflow menu.

        :::image type="content" source="media/tutorial/add-relationship.png" alt-text="Screenshot of adding a relationship type.":::
    1. For the **First entity**, keep *Distiller* and join on the *DistillerId* property.
    1. For the **Second entity**, select *MaintenanceRequest* and join on the *EquipmentId* property.
    1. For the **Relationship name**, enter *has*.
    1. For **Select relationship type**, select **1:N**. This choice indicates that multiple maintenance requests can be held by a single distiller.
    1. Select **Create**.
    
        :::image type="content" source="media/tutorial/distiller-relationship.png" alt-text="Screenshot of the relationship type configuration on the distiller.":::
    1. In the **Scheduling** section that appears beneath the relationship type configuration, select **Run now**.

        :::image type="content" source="media/tutorial/distiller-run-relationship.png" alt-text="Screenshot of running the distiller relationship type." lightbox="media/tutorial/distiller-run-relationship.png":::

1. Create a relationship type *Technician performs MaintenanceRequest*.
    1. Select **Technician** in your entity types list and add a relationship type.
    1. For the **First entity**, keep *Technician* and join on the *TechnicianId* property.
    1. For the **Second entity**, select *MaintenanceRequest* and join on the *TechnicianId* property.
    1. For the **Relationship name**, enter *performs*.
    1. For **Select relationship type**, select **1:N**. This choice indicates that multiple maintenance requests can be serviced by a single technician.
    1. Select **Create**.

        :::image type="content" source="media/tutorial/technician-relationship.png" alt-text="Screenshot of the relationship type configuration on the technician." lightbox="media/tutorial/technician-relationship.png":::
    1. In the **Scheduling** section that appears beneath the relationship type configuration, select **Run now**.

1. Create a relationship type *Distiller isPartOf Process*.
    1. Select **Distiller** in your entity types list and add a relationship type.
    1. For the **First entity**, keep *Distiller* and join on the *SiteId* property.
    1. For the **Second entity**, select *Process* and join on the *SiteId* property.
    1. For the **Relationship name**, enter *isPartOf*.
    1. For **Select relationship type**, select **N:1**. This choice indicates that many distillers can be involved in a single distillation process.
    1. Select **Create**.
    1. In the **Scheduling** section that appears beneath the relationship type configuration, select **Run now**.

1. Create a relationship type *Reboiler isPartOf Process*.
    1. Select **Reboiler** in your entity types list and add a relationship type.
    1. For the **First entity**, keep *Reboiler* and join on the *SiteId* property.
    1. For the **Second entity**, select *Process* and join on the *SiteId* property.
    1. For the **Relationship name**, select *isPartOf*.
    1. For **Select relationship type**, select **N:1**. This choice indicates that many reboilers can be involved in a single distillation process.
    1. Select **Create**.
    1. In the **Scheduling** section that appears beneath the relationship type configuration, select **Run now**.

1. Create a relationship type *Condenser isPartOf Process*.
    1. Select **Condenser** in your entity types list and add a relationship type.
    1. For the **First entity**, keep *Condenser* and join on the *SiteId* property.
    1. For the **Second entity**, select *Process* and join on the *SiteId* property.
    1. For the **Relationship name**, select *isPartOf*.
    1. For **Select relationship type**, select **N:1**. This choice indicates that many condensers can be involved in a single distillation process.
    1. Select **Create**.
    1. In the **Scheduling** section that appears beneath the relationship type configuration, select **Run now**.

Here's a representation of all the relationship types that were created in this section. Sections of this diagram are visible from the semantic canvas, centered around each entity type.

:::image type="content" source="media/tutorial/all-relationships.png" alt-text="Screenshot showing all relationship types.":::

## Check the status of your contextualization

Now that all the relationship types are added, check the status of the contextualization operations to verify that they completed successfully.

Select the **Manage operations** button.

:::image type="content" source="media/tutorial/manage-operations-2.png" alt-text="Screenshot of the Manage operations button."::: 

The **Manage operations** tab shows a list of your operations alongside their status. Look for the **Contextualization** type operations to verify their status.

:::image type="content" source="media/tutorial/manage-operations-tab-2.png" alt-text="Screenshot of the Manage operations tab."::: 

Wait for all mappings to complete before you move on to the next part of the tutorial.

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 4: Explore your ontology](tutorial-4-explore-ontology.md)