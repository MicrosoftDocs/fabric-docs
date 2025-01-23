---
title: "Privacy, security, and responsible use of Copilot for Data Warehouse (preview)"
description: Learn about privacy, security, and responsible use of Copilot for Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade
ms.date: 06/02/2024
ms.topic: conceptual
ms.custom:
  - ignite-2024
ms.collection: ce-skilling-ai-copilot
---
# Privacy, security, and responsible use of Copilot for Data Warehouse (preview)

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

In this article, learn how [Microsoft Copilot for Fabric Data Warehouse](../data-warehouse/copilot.md) works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. For more information on Copilot in Fabric, see [Privacy, security, and responsible use for Copilot in Microsoft Fabric (preview)](copilot-privacy-security.md).

With Copilot for Data Warehouse in Microsoft Fabric and other generative AI features, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in your warehouse and other workloads.

For considerations and limitations, see [Limitations](../data-warehouse/copilot.md#limitations-of-copilot-for-data-warehouse).

## Data use of Copilot for Data Warehouse

In warehouse, Copilot can only access the database schema that is accessible in the user's warehouse.

By default, Copilot has access to the following data types:

- Previous messages sent to and replies from Copilot for that user in that session.
- Contents of SQL query that the user has executed.
- Error messages of a SQL query that the user has executed (if applicable).
- Schemas of the warehouse.
- Schemas from attached warehouses or SQL analytics endpoints when cross-DB querying.

## Tips for working with Copilot for Data Warehouse

- Copilot is best equipped to handle data warehousing topics, so limit your questions to this area.
- Be explicit about the data you want Copilot to examine. If you describe the data asset, with descriptive table and column names, Copilot is more likely to retrieve relevant data and generate useful outputs.

## Evaluation of Copilot for Data Warehouse

The product team tested Copilot to see how well the system performs within the context of warehouses, and whether AI responses are insightful and useful.

The team also invested in additional harm mitigation, including technological approaches to focusing Copilot's output on topics related to data warehousing.

## Related content

- [Privacy, security, and responsible use for Copilot in Microsoft Fabric (preview)](copilot-privacy-security.md)
- [Microsoft Copilot for Fabric Data Warehouse](../data-warehouse/copilot.md)
