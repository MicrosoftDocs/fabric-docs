---
title: Get Started with Data Factory (Guided Lab Experience)
description: This article guides you through the process of utilizing Fabric Data Factory, focusing on key aspects such as getting started with a Medallion task flow, orchestrating data movement, and transforming and copying data.
ms.reviewer: makromer, conxu
ms.topic: overview
ms.custom: configuration
ms.date: 05/28/2025
---

# Get started with Data Factory (guided lab experience)

Welcome to the Data Factory Lab! This article guides you through the process of utilizing Fabric Data Factory, focusing on key aspects such as getting started with a Medallion task flow, orchestrating data movement, and transforming and copying data.

By following this guide, you'll be able to get started with Data Factory and apply its powerful capabilities to orchestrate data movement, transform data, and copy data efficiently.

:::image type="content" source="media/guided-lab-experience/link-to-lab.png" alt-text="Image link to the Data Factory lab." link="https://aka.ms/DataFactoryLab":::

This lab is a click-by-click environment that simulates the Fabric interface. Because the lab is a simulation, meaning it doesn't use an actual Fabric environment, you'll be able to access the lab with no sign-ups necessary.

To begin, you'll need to access the Data Factory lab environment. You can do this by visiting the following link: 

> [!div class="nextstepaction"]
> [Data Factory Lab](https://aka.ms/DataFactoryLab)

## Medallion task flow

The Medallion task flow is a multi-layered approach to building and delivering data products. It incrementally and progressively enhances data quality, making it ideal for business intelligence (BI) and artificial intelligence (AI) applications. The Medallion architecture consists of three layers: bronze (raw data), silver (validated data), and gold (enriched data). As data moves through these layers, it undergoes validations and transformations to ensure it meets the ACID properties (Atomicity, Consistency, Isolation, and Durability) and is optimized for analytics.

## Orchestrating data movement

Orchestrating data movement in Data Factory involves coordinating various activities to ensure data flows smoothly from source to destination. You can use pipeline expression builder to create complex expressions that control the flow of data based on specific conditions. This allows you to automate data movement and ensure data is processed efficiently. 

## Transforming and copying data

Transforming and copying data involves using various tools and activities within Data Factory to prepare and move data. Dataflow Gen 2, for example, allows you to ingest and prepare data at higher scales and land it into the OneLake through different storage solutions. You can also use a Copy job item to move data seamlessly from any source to any destination, with multiple delivery styles such as batch, incremental (CDC), and real-time data copying.

## Related content

> [!div class="nextstepaction"]
> [Data Factory Training](/training/paths/get-started-fabric)