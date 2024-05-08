---
title: "Privacy, security, and responsible use of Copilot for Real-Time Intelligence (preview)"
description: Learn about privacy, security, and responsible use of Copilot for Real-Time Intelligence in Microsoft Fabric.
author: yaelschuster
ms.author: yaschust
ms.reviewer: mibar
ms.topic: conceptual
ms.date: 03/07/2024
no-loc: [Copilot]
---

# Privacy, security, and responsible use of Copilot for Real-Time Intelligence (preview)

With Copilot for Real-Time Intelligence in Microsoft Fabric and other generative AI features in preview, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in Real-Time Intelligence and the other workloads.

Before your business can start using Copilot capabilities in Fabric, your administrator needs to [enable Copilot in Microsoft Fabric](copilot-fabric-overview.md#enable-copilot). You may have questions about how it works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly.

The article [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md) provides an overview of Copilot in Fabric. Read on for details about Copilot for Real-Time Intelligence.

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Capabilities, intended uses, and limitations of Copilot for Real-Time Intelligence

Copilot for Real-Time Intelligence lets you effortlessly translate natural language queries into Kusto Query Language (KQL). The copilot acts as a bridge between everyday language and KQL’s technical intricacies, and in doing so removes adoption barriers for citizen data scientists. By harnessing OpenAI's advanced language understanding, this feature allows you to submit business questions in a familiar, natural language format, which are then converted into KQL queries. Copilot accelerates productivity by simplifying the query creation process with a user-friendly and efficient approach to data analysis.

### Limitations

Complex and long user input might be misunderstood by Copilot, resulting in potentially inaccurate or misleading suggested KQL queries. User input that directs to database entities that aren't KQL Database tables or materialized views (for example KQL function), may result in potentially inaccurate or misleading suggested KQL queries. More than 10,000 concurrent users within an org will probably fail or result in major performance hit.

## Data use of Copilot for Real-Time Intelligence

Copilot for Real-Time Intelligence has access to data, for example the database schema, that is accessible to the Copilot user. The Copilot refers to whichever database is currently connected to the KQL queryset. The Copilot doesn't store any data, and doesn't have access to data that isn't accessible to the Copilot user.

## Evaluation of Copilot for Real-Time Intelligence

Following a thorough research period in which several configurations and methods have been tested, the OpenAI integration method had been proven to generate highest accuracy KQL queries. Copilot doesn't automatically run the generated KQL query, and users are advised to run the queries at their own discretion.
 
## Tips for working with Copilot for Real-Time Intelligence

Copilot translates natural language business questions into KQL queries, based on the underlying dataset column names or schema. We recommend that you provide detailed and relevant requests to the copilot to avoid inaccurate or misleading suggested KQL queries.  For example, if you're asking about a specific column, provide the column name and the type of data it contains. If you want to use specific operators or functions, this will also help. The more information you provide, the better the Copilot answer will be. You should also restrict questions to databases that are KQL Database tables or materialized views.

## Related content

* [What is Microsoft Fabric?](microsoft-fabric-overview.md)
* [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
