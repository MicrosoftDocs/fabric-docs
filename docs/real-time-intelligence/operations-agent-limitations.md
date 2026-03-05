---
title: Operations Agent Best Practices and Limitations
description: Learn about the best practices and limitations of using operations agents in Real-Time Intelligence.
ms.reviewer: willthom, v-hzargari
ms.topic: how-to
ms.date: 03/05/2026
ms.search.form: Operations Agent Limitations, Best Practices
ai-usage: ai-assisted
---

# Operations agent best practices and limitations

This article outlines the best practices and limitations when using operations agents in Real-Time Intelligence.

## Best practices

Monitor real-time operational data from Eventhouse. Trigger alerts and actions when monitored values meet defined conditions.

### Operational instructions

- **Eventhouse tables**: If Eventhouse tables contain nested columns such as JSON, flatten the tables before configuring the agent. Flat tables with descriptive column names improve the agent's ability to parse and evaluate data.
- **Column descriptions**: If a column's purpose is unclear from its name, add a plain-language description using the description field in your KQL table schema. This helps the agent interpret data values correctly.
- **Entity identification**: If the agent needs to monitor a specific business entity such as a station, sensor, or personnel record, identify the column that uniquely identifies the entity (for example, “StationID” or “SensorID”) and specify which table it belongs to.
- **Field name quoting**: If a rule references column names that contain special characters such as underscores or hyphens, enclose the column name in quotation marks (“”) to ensure the agent identifies it correctly.
- **Quantifiable conditions**: If a rule uses qualitative language such as “low availability” or “high temperature,” replace it with a specific numeric threshold, such as “fewer than 3 bikes available” or “temperature exceeds 80.”
- **Rule separation**: If you define multiple rules, describe each rule on a separate line or bullet point. Don't combine conditions from different rules in the same sentence.
- **Rule order**: If the agent needs to prioritize certain rules, list higher-priority rules first. LLMs might interpret information differently based on its position in the prompt.

### Semantic instructions

- Entity data for monitored objects such as stations, sensors, or personnel is sourced from flat tables in the Eventhouse and KQL database that the agent monitors.
- A business entity is uniquely identified by a key column in its source table. For example, a bike station entity is identified by a “StationID” column, and a sensor entity is identified by a “SensorID” column. Specifying the identifying column and its table prevents the agent from confusing entities that have similar properties.
- Column descriptions in the KQL database schema are the authoritative source of context for the agent. For example, a column named “AvailableBikes” with description “Number of bikes currently available at this station” helps the agent correctly apply thresholds defined in rules.
- All rule conditions should be expressed as numeric thresholds rather than qualitative terms. For example, “bike availability is low” should be stated as “AvailableBikes is fewer than 3.” Numeric thresholds ensure consistent evaluation across polling intervals.
- The agent runs data queries every five minutes when it's active. A rule condition is evaluated at each polling interval against the data available at that time.
- When the agent detects data that matches a rule, it creates an operation to track the recommended action and the user's response. An operation is automatically canceled if the user doesn't respond within three days.

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

