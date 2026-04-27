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

This article outlines the best practices and limitations when you use operations agents in Real-Time Intelligence.

## Best practices

Operations agents help organizations operationalize clear business goals by continuously monitoring real-time data, evaluating explicit thresholds, and recommending actions when defined conditions are met. For example, operations agents help you respond proactively when inventory availability drops to a critical level. We recommend the following best practices for operations agents.

- **Eventhouse tables**: If eventhouse tables contain nested columns such as JSON, flatten the tables before you configure the agent. Flat tables with descriptive column names improve the agent's ability to parse and evaluate data.

- **Column descriptions**: If a column's purpose is unclear from its name, add a plain-language description by using the description field in your KQL table schema. This helps the agent interpret data values correctly.

- **Business object identification**: If the agent needs to monitor a specific business object such as a station, sensor, or personnel record, identify the column that uniquely identifies the object (for example, "StationID" or "SensorID"). Specify which table it belongs to.

- **Field name quoting**: If a rule references column names that contain special characters, such as underscores or hyphens, enclose the column name in quotation marks (""). This practice ensures that the agent identifies it correctly.

- **Quantifiable conditions**: If a rule uses qualitative language such as "low availability" or "high temperature," replace it with a specific numeric threshold. For example, use a phrase like "fewer than 3 bikes available" or "temperature exceeds 80."

- **Rule separation**: If you define multiple rules, describe each rule on a separate line or bullet point. Don't combine conditions from different rules in the same sentence.

- **Rule order**: If the agent needs to prioritize certain rules, list higher-priority rules first. Large language models (LLMs) might interpret information differently based on its position in the prompt.

## Sample instructions

Here's an example of how you can lay out your instructions to the agent to be clear about its operational rules and the semantic information about the fields in your data.

```
*** Operational Instructions ***
1. Alert me when a trip has high occupancy level.
2. Alert me when a trip has high departure delay.

*** Semantic Instructions ***
1. Information about a trip can be found in 'TripUpdateFlattened' table, each identified by the 'trip_id' column.
2. Information about a vehicle can be found in 'VehiclePositionsFlat' table, each identified the 'vehicle_id' column.
3. A trip is a associated with multiple vehicles via shared trip ID.
4. Occupancy status of a trip is calculated as the latest occupancy status from the vehicle the trip is associated with. The value 'HIGH' means high occupancy level.
5. The departure delay is measured in number of seconds. Higher than 300 seconds of delay is considered significant.
```

## Limitations

- Operations agents rely on an LLM to create the playbook and rules the agent follows, and to reason about and generate messages for actions and recommendations. Since LLM-based AI services are probabilistic and can be fallible, it's important to carefully review the results and recommendations they provide. For more information, see [Privacy, security, and responsible use of Copilot for Real-Time Intelligence](../fundamentals/copilot-real-time-intelligence-privacy-security.md).

   To track what queries and data the agent accesses, you can look into the eventhouse and KQL database it monitors. On the **Query insights** tab, you see the queries that it runs and can validate the KQL it uses.

   :::image type="content" source="media/operations-agent/query-insights.png" alt-text="Screenshot of the Query insights tab in the KQL database.":::

- Currently, only regular Eventhouse tables are supported. Shortcut tables, functions, and materialized views are not supported.

- When you use a Fabric Ontology as the knowledge source, only one ontology per agent is supported and no additional data sources can be added. If the ontology schema changes (for example, an entity is removed) and existing agent queries become invalid, monitoring stops. The agent doesn't receive notifications about ontology schema changes.

- While system guardrails are in place, heavy usage might result in throttling, which limits the number of messages the agent can send. In such cases, you might receive simplified, non-LLM-generated messages through Microsoft Teams.

- At present, the agent and LLM support only English instructions and goals.

- The agent operates by using the delegated identity and permissions of its creator. This means:

  - Queries, data access, and actions run based on the creator's credentials.
  
  - By default, the creator receives recommendation messages. Changing the recipient doesn't change the credentials used for queries and actions.

- The agent runs data queries every five minutes when it's active.

- When the agent detects data matching its rules, it tracks the recommended actions and the user's response as an *operation*. If the user doesn't respond (approve or reject) within three days, the operation is automatically canceled. After this period, you can't interact with or approve the action.

- Operations agent is available in Microsoft Fabric regions, excluding South Central US and East US.

- If your Fabric tenant and capacity are in different regions, you might have errors when you configure Power Automate actions. Until a fix is available, to use the operations agent, ensure your workspace capacity is in the same region as your Fabric tenant.
