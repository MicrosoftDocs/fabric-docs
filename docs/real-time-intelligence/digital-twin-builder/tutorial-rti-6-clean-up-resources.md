---
title: 'Digital twin builder (preview) in Real-Time Intelligence tutorial part 6: Clean up resources'
description: Delete resources created during the Digital twin builder (preview) in Real-Time Intelligence tutorial.
author: baanders
ms.author: baanders
ms.date: 11/10/2025
ms.topic: tutorial
---

# Digital twin builder (preview) in Real-Time Intelligence tutorial part 6: Clean up resources

Once you finish the tutorial, you might want to delete all resources you created. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

To delete the data from this tutorial, follow these steps:
1. Delete your Fabric workspace, which also removes everything inside it, including:
    * the sample data lakehouse 
    * the eventhouse with the KQL database
    * the eventstream
    * the digital twin builder (preview) item
        * the associated lakehouse with all of its entity types and relationship types, mapping, and entity instance and relationship instance data
    * the Fabric notebook
    * the Real-Time Dashboard

    :::image type="content" source="media/tutorial-rti/remove-workspace.png" alt-text="Screenshot of removing the workspace." lightbox="media/tutorial-rti/remove-workspace.png":::

1. Remove the sample data files you downloaded to your machine, including:
    * *stops_data.csv*
    * *dashboard-DTBdashboard.json*
    * *DTB_Generate_Eventhouse_Projection.ipynb*
    * *dtb_samples-0.1-py3-none-any.whl*.


## Related content

* [What is digital twin builder (preview)?](overview.md)
* [What is Real-Time Intelligence in Fabric?](../overview.md)
* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)