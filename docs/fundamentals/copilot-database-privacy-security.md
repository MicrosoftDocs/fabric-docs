---
title: Privacy, Security, and Responsible Use of Microsoft Copilot in Microsoft Fabric in the SQL Database Workload
description: Learn about privacy, security, and responsible AI use of Microsoft Copilot in Microsoft Fabric in the SQL database workload.
author: markingmyname
ms.author: maghan
ms.reviewer: yoleichen, wiassaf
ms.date: 04/09/2025
ms.update-cycle: 180-days
ms.topic: concept-article
ms.collection:
  - ce-skilling-ai-copilot
---

# Privacy, security, and responsible AI use of Copilot in Fabric in the SQL database workload (Preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../database/includes/applies-to-version/fabric-sqldb.md)]

In this article, learn how [Copilot in Fabric in SQL database](../database/sql/copilot-sql-database.md) works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. For more information on Copilot in Fabric, see [Privacy, security, and responsible use of Copilot in Fabric](copilot-privacy-security.md).

With Copilot in Fabric SQL databases and other generative AI features, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in your database and other workloads.

For limitations, see [Limitations of Copilot in Fabric in SQL database](../database/sql/copilot-sql-database.md#limitations).

## Data use of Copilot in Fabric in SQL database

In database, Copilot can only access the database schema that is accessible in the user's database.

By default, Copilot has access to the following data types:

- Previous messages sent to and replies from Copilot for that user in that session.
- Contents of SQL query that the user has executed.
- Error messages of a SQL query that the user has executed (if applicable).
- Schemas of the database.

## Tips for working with Copilot in Fabric SQL databases

- Copilot is best equipped to handle SQL database articles, so limit your questions to this area.

- Be explicit about the data you want Copilot to examine. If you describe the data asset, with descriptive table and column names, Copilot is more likely to retrieve relevant data and generate useful outputs.

## Evaluation of Copilot in Fabric SQL databases

The product team tested Copilot to see how well the system performs within the context of databases, and whether AI responses are insightful and useful.

The team also invested in additional harm mitigation, including technological approaches to focusing Copilot's output on articles related to SQL databases.

## Related content

- [Privacy, security, and responsible use for Copilot in Microsoft Fabric](copilot-privacy-security.md)
- [Copilot in Fabric in SQL database in Fabric](../database/sql/copilot-sql-database.md)
