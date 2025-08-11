---
title: Integrating with Fabric tools
description: Learn about integrating digital twin builder (preview) with other Fabric tools.
author: baanders
ms.author: baanders
ms.date: 04/28/2025
ms.topic: concept-article
---

# Integrating Fabric tools with digital twin builder (preview)

This article explains integration points between digital twin builder (preview) and other Fabric tools.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Power BI

You can create dashboards to visualize your digital twin builder (preview) data in both [Power BI Desktop](/power-bi/fundamentals/desktop-what-is-desktop) and the [Power BI service](/power-bi/fundamentals/power-bi-service-overview). We recommend using digital twin builder with Power BI Desktop because of its expansive modeling capabilities, but you can also use the Power BI service to enable service-specific features like alerts or collaboration. 

For more information about Power BI options, see [Compare Power BI Desktop and the Power BI service](/power-bi/fundamentals/service-service-vs-desktop). For steps to create a sample Power BI report with digital twin builder data, see part five of the digital twin builder (preview) tutorial: [Create a Power BI report with digital twin builder data](tutorial-5-power-bi-report.md).

## Real-Time Dashboards

You can also visualize digital twin builder (preview) data in Real-Time Dashboards. 

For more information about Real-Time Dashboards, see [Create a Real-Time Dashboard](../dashboard-real-time-create.md). For the steps to bring your digital twin builder (preview) ontology data into a dashboard, see [Connect digital twin builder (preview) data to Real-Time Dashboards](explore-connect-dashboard.md). 

## Activator

For Real-Time Dashboards or dashboards in the [Power BI service](/power-bi/fundamentals/power-bi-service-overview) (not [Power BI Desktop](/power-bi/fundamentals/desktop-what-is-desktop)), you can enable Fabric Activator to trigger alerts about your digital twin builder (preview) data. These notifications are based on specific conditions met within your ontology, enabling timely alerts and actions for data-driven decision-making. 

For more information about alerts in Activator, see [What is Activator?](../data-activator/activator-introduction.md).

## Lifecycle management and CI/CD

As an item in Microsoft Fabric, digital twin builder (preview) uses the Fabric Application Lifecycle Management toolset. These tools enable you to version and deploy digital twin builder across multiple environments, using deployment experiences like Git Integration and other pipelines native to the Fabric platform.  

For more information about creating and operating deployment pipelines, see the [Lifecycle management documentation in Microsoft Fabric](../../cicd/cicd-overview.md).

## Purview

With digital twin builder (preview), you receive built-in enterprise security and governance. For more information about using Purview to govern your data, see the following resources: 
* [Use Microsoft Purview to govern Microsoft Fabric](../../governance/microsoft-purview-fabric.md)
* [The Microsoft Purview hub in Microsoft Fabric](../../governance/use-microsoft-purview-hub.md?tabs=overview) 

## Related content

* [Create a Power BI report with digital twin builder data](tutorial-5-power-bi-report.md).
* [Connect digital twin builder (preview) data to Real-Time Dashboards](explore-connect-dashboard.md)