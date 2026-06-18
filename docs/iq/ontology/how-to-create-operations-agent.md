---
title: Create an Operations Agent to Use with Ontology
description: Create an operations agent that monitors an ontology (preview) item by using business rules in natural language.
ms.date: 04/28/2026
ms.topic: how-to
---

# Create an operations agent connected to ontology

Ontology (preview) integrates with [operations agent (preview)](../../real-time-intelligence/operations-agent.md) to continuously monitor your ontology, surface insights against your business goals, and recommend actions—all grounded in the ontology's entity types and relationships.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Make sure you meet the [operations agent prerequisites](../../real-time-intelligence/operations-agent.md#prerequisites), including the Microsoft Teams account and tenant settings for operations agent, Microsoft Copilot, and Azure OpenAI.

## Create operations agent with ontology (preview) source

Follow these steps to create a new operations agent that monitors an ontology (preview) item. For full details on each setup field, see [Create an operations agent](../../real-time-intelligence/operations-agent.md#create-an-operations-agent).

1. In your Fabric workspace, select **+ New item** and create a new **Operations agent (preview)** item.

1. On the **Agent setup** page, fill in the following:

    * **Business goals**: Describe what the agent should optimize. For example, *Keep frozen products safe by monitoring freezer conditions in real time.*
    * **Instructions**: Add guidance for the agent's behavior. For example, *Monitor the freezer temperature and keep the temperature below 20.*
    * **Knowledge source**: Select **Add** and choose your ontology item.
    * **Actions** (optional): Define one or more actions the agent can recommend, such as *NotifyStoreOperations* with parameters like *StoreId* and *FreezerId*. If you add an action, configure it with Activator and Power Automate flow as described in [Configure an operations agent](../../real-time-intelligence/operations-agent.md#configure-an-operations-agent).

1. Save the agent and select **Generate playbook**. Review the concepts and rules in the playbook and confirm they reference the expected ontology entity types (such as *Store*, *Product*, and *Freezer*) and properties.

1. Select **Start** in the toolbar to start the agent.

:::image type="content" source="media/how-to-create-operations-agent/operations-agent.png" alt-text="Screenshot of the operations agent setup page with ontology as the knowledge source." lightbox="media/how-to-create-operations-agent/operations-agent.png":::

## Receive notifications in Teams

Install the **Fabric Operations Agent** Teams app so the agent can contact you when it detects matching conditions in your ontology data. For more information, see [Receive messages from an operations agent](../../real-time-intelligence/operations-agent-actions.md#receive-messages-from-an-operations-agent).

When a recommendation arrives, review the context (which references ontology entity types, not raw tables), adjust any action parameters if needed, then select **Yes** to approve or **No** to reject.

## Related content

* [Operations agent overview](../../real-time-intelligence/operations-agent.md)
* [Operations agent limitations](../../real-time-intelligence/operations-agent-limitations.md)
