---
title: "Privacy, security, and responsible use of Copilot for Real-Time Intelligence"
description: Learn about privacy, security, and responsible use of Copilot for Real-Time Intelligence in Microsoft Fabric.
author: spelluru
ms.author: spelluru
ms.reviewer: mibar
ms.topic: concept-article
ms.custom:
ms.date: 11/19/2024
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Privacy, security, and responsible use of Copilot for Real-Time Intelligence

In this article, learn how Copilot for Real-Time Intelligence works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. For an overview of these topics for Copilot in Fabric, see [Privacy, security, and responsible use for Copilot](copilot-privacy-security.md).

This feature  leverages the power of OpenAI to seamlessly translate natural language queries into Kusto Query Language (KQL), a specialized language for querying large datasets. In essence, it acts as a bridge between users' everyday language and the technical intricacies of KQL removing adoption barriers for users unfamiliar with the language. By harnessing OpenAI's advanced language understanding, this feature empowers users to submit business questions in a familiar, natural language format, which are then converted into KQL queries.  

Copilot accelerates productivity by simplifying the query creation process but also provides a user-friendly and efficient approach to data analysis. 

## Copilot for Real-Time Intelligence intended use

Kusto Copilot accelerates data scientists’ and analysts’ data exploration process, by translating natural language business questions into KQL queries, based on the underlying dataset column names / schema.

## What can Copilot for Real-Time Intelligence do?

Kusto Copilot is powered by generative AI models developed by OpenAI and Microsoft. Specifically, it uses OpenAI’s Embedding and Completion APIs to build the natural language prompt and to generate KQL queries.

## Data use of Copilot for Real-Time Intelligence

Copilot for Real-Time Intelligence has access to data that is accessible to the Copilot user, for example the database schema, user-defined functions, and data sampling of the connected database. The Copilot refers to whichever database is currently connected to the KQL queryset.  The Copilot doesn't store any data.

## Evaluation of Copilot for Real-Time Intelligence

* Following a thorough research period in which several configurations and methods have been tested, the OpenAI integration method had been proven to generate highest accuracy KQL queries. Copilot doesn't automatically run the generated KQL query, and users are advised to run the queries at their own discretion.
* Kusto Copilot doesn’t automatically run any generated KQL query, and users are advised to run the queries at their own discretion.

## Limitations of Copilot for Real-Time Intelligence

* Complex and long user input might be misunderstood by Copilot, resulting in potentially inaccurate or misleading suggested KQL queries.
* User input which directs to database entities which are not KQL tables or materialized views (for example, a KQL function), may result in potentially inaccurate or misleading suggested KQL queries.
* More than 10,000 concurrent users within an org will most likely fail or result in major performance hit.  
* The KQL query should be validated by user before executing for preventing insecure KQL query execution.

## Tips for working with Copilot for Real-Time Intelligence

* We recommend you provide detailed and relevant natural language queries. Furthermore, you should provide concise and simple requests to the copilot to avoid inaccurate or misleading suggested KQL queries. You should also restrict questions to databases which are KQL tables or materialized views.
* For example, if you're asking about a specific column, provide the column name and the type of data it contains. If you want to use specific operators or functions, this will also help. The more information you provide, the better the Copilot answer will be. 

## Related content

* [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md)
* [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
