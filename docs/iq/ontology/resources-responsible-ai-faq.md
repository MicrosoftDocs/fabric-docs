---
title: Responsible AI FAQ for the Ontology Agent (Preview)
description: This article explains the responsible use of the ontology agent in Fabric, including reliability, data use, fairness, and integration guidance.
ms.date: 07/27/2026
ms.topic: faq
---

# Responsible AI FAQ for the ontology agent (preview) in Fabric

This article explains the responsible use of the ontology agent (preview) in Fabric and its build, improve, and query capabilities.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## What is the ontology agent in Fabric?

The ontology agent in Fabric is an AI-powered Copilot that helps you build and operate **ontologies** (structured models of entities, properties, and relationships) over your Fabric workspace data. The agent guides you through first-time ontology creation, patches and evolves existing ontologies, and executes schema-aware queries in Data Analysis Expressions (DAX), Kusto Query Language (KQL), SQL, and Graph Query Language (GQL). For an overview of how the agent works and a summary of capabilities, see [Use the ontology agent in Fabric](how-to-use-ontology-agent.md).

## Are the results from the ontology agent in Fabric reliable?

The ontology agent is designed to generate grounded, evidence-backed proposals: it inspects your workspace, samples your data, and validates every draft before applying any change. However, like any AI-powered system, its responses might not always be correct or complete. Carefully review drafts, patches, and query results before applying them to your Fabric workspace.

## How does the ontology agent in Fabric use data from my Fabric environment?

The agent analyzes data within your Fabric workspace and files that you explicitly attach to generate responses. It only accesses the lakehouses, eventhouses, semantic models, and ontology items that you can access. In Act mode, it can only perform actions that you have permission to perform. The agent operates within your existing Microsoft Entra ID and Microsoft Fabric role-based access controls.

## What data does the ontology agent in Fabric collect?

The agent doesn't use your prompts or its own responses to train or improve the underlying AI models. Microsoft might collect limited engagement data to improve its products and services: for example, the number of sessions, session duration, which tools the agent called, and your feedback. Microsoft uses this data solely for product improvement. All data collected is subject to the [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement) and your explicit consent. For data retention details, see the [Privacy and compliance FAQ](resources-privacy-compliance-faq.md).

## What should I do if I see unexpected or offensive content?

Microsoft guides the agent's development by its [AI principles](https://www.microsoft.com/ai/principles-and-approach) and [Responsible AI Standard](https://aka.ms/RAIStandardPDF). The team prioritizes preventing exposure to offensive content, but unexpected results can still occur. To report any unexpected, incorrect, or offensive content, use the in-product feedback control in the chat. The team continually works to improve the system.

## How current is the information the ontology agent in Fabric provides?

The agent reads live data from your Fabric workspace at the time you ask. Sample rows, table schemas, and ontology definitions reflect the current state of the source. When you run a query, the agent re-reads the relevant signals so the results reflect the latest available data. Some lag might exist between the time data lands in a lakehouse or eventhouse and the time the agent reads it, depending on your ingestion pipeline.

## Do all Microsoft Fabric item types have the same level of integration with the agent?

No. Currently, the agent integrates with lakehouses, eventhouses, semantic models, and graph models. The agent doesn't directly model other Microsoft Fabric item types. The development team is continuously working to add more source integrations.

## What are the fairness considerations in the development of the ontology agent in Fabric?

Fairness is a core part of the agent's development. The team evaluates the agent for consistent performance across different ontology shapes, source mixes, and naming conventions. The agent grounds its proposals in concrete tool-based evidence, such as workspace items it inspected, tables it sampled, and validations it ran. This approach reduces the risk of unsupported conclusions.

## How should I integrate the ontology agent in Fabric into my workflow?

To integrate the agent into your operations effectively, first understand its capabilities and limitations. Test the agent by using real ontologies and sources in your environment to evaluate its performance. Use Plan mode to preview and review drafts, patches, and queries before switching to Act mode to apply changes. Train the data engineers and operators who use the agent. They should understand its intended uses, how to interact with it, and when to rely on human judgment over AI output. This balanced approach maximizes the benefits of the agent while maintaining oversight on the changes that land in your workspace.

## Related content

- [Use the ontology agent in Fabric](how-to-use-ontology-agent.md)
- [Privacy and compliance FAQ](resources-privacy-compliance-faq.md)
- [Troubleshooting](resources-troubleshooting.md#troubleshoot-the-ontology-agent)
