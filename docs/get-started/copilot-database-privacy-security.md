---
title: Privacy, security, and responsible use of Copilot for SQL database (preview)
description: Learn about privacy, security, and responsible use of Copilot for SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: yoleichen, maghan
ms.topic: conceptual
ms.custom:
  - ignite-2024
ms.date: 10/17/2024
ms.collection: ce-skilling-ai-copilot
---
# Privacy, security, and responsible use of Copilot for SQL database in Microsoft Fabric (preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../database/includes/applies-to-version/fabric-sqldb.md)]

In this article, learn how [Microsoft Copilot for SQL databases](../database/sql/copilot.md) works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. For more information on Copilot in Fabric, see [Privacy, security, and responsible use for Copilot in Microsoft Fabric (preview)](copilot-privacy-security.md).

With Copilot for SQL databases in Microsoft Fabric and other generative AI features, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in your database and other workloads.

For limitations, see [Limitations of Copilot for SQL database](../database/sql/copilot.md#limitations-of-copilot-for-sql-database).

## Data use of Copilot for SQL databases

In database, Copilot can only access the database schema that is accessible in the user's database.

By default, Copilot has access to the following data types:

- Previous messages sent to and replies from Copilot for that user in that session.
- Contents of SQL query that the user has executed.
- Error messages of a SQL query that the user has executed (if applicable).
- Schemas of the database.

## Tips for working with Copilot for SQL databases

- Copilot is best equipped to handle SQL database topics, so limit your questions to this area.

- Be explicit about the data you want Copilot to examine. If you describe the data asset, with descriptive table and column names, Copilot is more likely to retrieve relevant data and generate useful outputs.

## Evaluation of Copilot for SQL databases

The product team tested Copilot to see how well the system performs within the context of databases, and whether AI responses are insightful and useful.

The team also invested in additional harm mitigation, including technological approaches to focusing Copilot's output on topics related to SQL databases.

## Related content

- [Privacy, security, and responsible use for Copilot in Microsoft Fabric (preview)](copilot-privacy-security.md)
- [Copilot for SQL database in Fabric (preview)](../database/sql/copilot.md)
