---
title: "Privacy, Security, and Responsible AI Use of Microsoft Copilot in Microsoft Fabric in the Data Warehouse Workload"
description: Learn about privacy, security, and responsible use of Microsoft Copilot in Microsoft Fabric in the Data Warehouse workload.
author: markingmyname
ms.author: maghan
ms.reviewer: salilkanade, wiassaf
ms.date: 04/09/2025
ms.update-cycle: 180-days
ms.topic: concept-article
ms.collection:
  - ce-skilling-ai-copilot
---

# Privacy, security, and responsible AI use of Copilot in Fabric in the Data Warehouse workload (Preview)

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

In this article, you learn how [Copilot in Fabric in the Data Warehouse workload](../data-warehouse/copilot.md) works, keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. For more information on Copilot in Fabric, see [Privacy, security, and responsible use for Copilot in Microsoft Fabric (preview)](copilot-privacy-security.md).

With Copilot in Fabric in Data Warehouse and other generative AI features, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in your warehouse and other workloads.

For considerations and limitations, see [Limitations](../data-warehouse/copilot.md#limitations).

## Data use of Copilot in Fabric in Data Warehouse

In warehouse, Copilot can only access the database schema that is accessible in the user's warehouse.

By default, Copilot has access to the following data types:

- Previous messages sent to and replies from Copilot for that user in that session.
- Contents of SQL query that the user has executed.
- Error messages of a SQL query that the user has executed (if applicable).
- Schemas of the warehouse.
- Schemas from attached warehouses or SQL analytics endpoints when cross-DB querying.

## Tips for working with Copilot in Fabric in Data Warehouse

- Copilot is best equipped to handle data warehousing topics, so limit your questions to this area.
- Be explicit about the data you want Copilot to examine. If you describe the data asset, with descriptive table and column names, Copilot is more likely to retrieve relevant data and generate useful outputs.

## Evaluation of Copilot in Fabric in Data Warehouse

The product team tested Copilot to see how well the system performs within the context of warehouses, and whether AI responses are insightful and useful.

The team also invested in additional harm mitigation, including technological approaches to focusing Copilot's output on topics related to data warehousing.

## Related content

- [Privacy, security, and responsible AI use for Copilot in Microsoft Fabric](copilot-privacy-security.md)
- [What is Copilot in Fabric in Data Warehouse](../data-warehouse/copilot.md)
