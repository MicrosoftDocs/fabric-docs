---
title: Operations Agent Best Practices and Limitations
description: Learn about the best practices and limitations of using operations agents in Real-Time Intelligence.
ms.reviewer: willthom, v-hzargari
ms.topic: how-to
ms.date: 11/05/2025
ms.search.form: Operations Agent Limitations, Best Practices
---

# Operations agent best practices and limitations

This article outlines the best practices and limitations when using operations agents in Real-Time Intelligence.

## Best practices

As with any AI-based product, giving clear instructions and easy-to-understand data improve results. Consider the following best practices to get the best rules and playbook:

* **Eventhouse configuration**:
    * Ensure that your eventhouse contains flat tables with descriptive column names.
    * Don't use nested columns (for example, JSON).
    * Use the description field for columns in your tables to help the agent understand the data better.
* **Defining rules**:
    * Clearly specify the rules and conditions the agent should evaluate, including the criteria for recommending actions. For example, instead of stating, "Take an action when bike availability is low," provide a specific threshold such as, "Take an action when bike availability is 3 or fewer."
    * Clearly define the business objects or entities the agent needs to understand. Specify which columns in your data uniquely identify these objects (e.g., sensor ID, location name, personnel number). Indicating the relevant table ensures the agent retrieves the correct data.
    * When referring to fields and properties the agent should monitor, enclose the field names in quotation marks (“”) to improve identification. This is particularly important for column names containing special characters such as underscores or hyphens.
    * Use bullet points or separate lines to describe each rule individually, ensuring clarity for the agent when configuring the rules.
    * Rules can monitor numeric values that change over time. Ensure the conditions you define are quantifiable.
    * Pay attention to the sequence in which you describe rules and actions. LLMs might interpret information differently based on its position within the prompt.

## Limitations

1. Operations agents rely on a large language model (LLM) to create the playbook and rules the agent follows, as well as to reason about and generate messages for actions and recommendations. Since LLM-based AI services are probabilistic and can be fallible, it's important to carefully review the results and recommendations they provide. For more information, see the [Fabric Copilot information page](../fundamentals/copilot-real-time-intelligence-privacy-security.md).

   To track what queries and data the agent accesses, you can look into the Eventhouse and KQL database it monitors. In the Query Insights tab, you see the queries that it runs and can validate the KQL it uses.

   :::image type="content" source="media/operations-agent/query-insights.png" alt-text="Screenshot of the Query Insights tab in the KQL database.":::

1. While system guardrails are in place, heavy usage might result in throttling, which limits the number of messages the agent can send. In such cases, you might receive simplified, non-LLM-generated messages through Teams.

1. At present, the agent and LLM support only English instructions and goals.

1. The agent operates by using the delegated identity and permissions of its creator. This means:

   * Queries, data access, and actions run based on the creator's credentials.
   * By default, the creator receives recommendation messages. Changing the recipient doesn't change the credentials used for queries and actions.

1. The agent runs data queries every five minutes when it's active.

1. When the agent detects data matching its rules, it tracks the recommended actions and the user's response as an "operation." If the user doesn't respond (approve or reject) within three days, the operation is automatically canceled. After this period, you can't interact with or approve the action.

1. Operations agent is available in Fabric regions excluding South Central US and East US.

1. If your Fabric tenant and capacity are in different regions, you may run into errors when configuring Power Automate actions. Until a fix is available, ensure your workspace capacity is in the same region as your Fabric tenant to use the operations agent.

