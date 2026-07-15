---
title: Create an Ontology Agent with Foundry IQ
description: Learn how to create a Foundry IQ agent that is grounded in an ontology (preview). The agent can answer natural-language questions using the ontology as a single source of truth.
ms.date: 07/15/2026
ms.topic: how-to
---

# Build a Foundry IQ agent grounded in an ontology

[Microsoft Foundry](/azure/foundry/what-is-foundry) agents can answer natural-language questions. Enhance their ability to give trustworthy, business-aware answers by grounding them in your organization's data. Foundry IQ provides that grounding through reusable knowledge sources and knowledge bases that an agent can query at runtime.

*Fabric IQ Ontology* is a semantic layer that lives in OneLake. It describes your business entities, their relationships, business rules and the underlying tables that back them. By exposing an ontology as a Foundry IQ knowledge source, you give the agent a semantically rich, governed view of your Fabric data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

In this article, you:

1. Create a knowledge source in Foundry IQ that points to an existing Fabric IQ Ontology item in OneLake.
1. Wrap that source in a knowledge base and validate it by running test queries through the Foundry APIs.
1. Build a Foundry agent that uses the knowledge base, and chat with it from the built-in **Chat** pane.

After completing the steps in this article, you have a custom agent that answers business questions using your ontology as the single source of truth.

## Prerequisites

Before you begin, make sure you have:

* An active Azure subscription with permission to create Foundry resources.
* A Microsoft Fabric workspace that contains at least one ontology (preview) item. For more information, see [Create ontology (preview) item](tutorial-1-create-ontology.md#create-ontology-preview-item).
* Complete the [Foundry quickstart](/azure/foundry/quickstarts/get-started-code) to provision a Foundry project and a sample agent. The steps in this article assume that project already exists.
* Ensure that the AI Search resource has the *Search Index Data Contributor* role for the Foundry Project. To assign this role, go to the [Azure portal](https://portal.azure.com) and open IAM for the AI Search resource. Follow the [Assign roles for development](/azure/search/search-security-rbac?tabs=roles-portal-admin%2Croles-portal%2Croles-portal-query%2Ctest-portal%2Ccustom-role-portal#assign-roles-for-development) instructions to assign the *Search Index Data Contributor* role to the managed identity of your Foundry project.

    >[!IMPORTANT]
    >If you don't assign this role, the agent will not be able to access the ontology and you'll see a 403 error in the Foundry agent.

* An Edge or Chrome browser, signed in with the same identity that has access to both the Foundry project and the Fabric workspace.

## Step 1: Create the knowledge source and knowledge base

1. Open the Foundry portal.

1. Start a new knowledge base. In the left navigation pane of your Foundry project, go to **Knowledge** > **Knowledge bases**, then choose **+ New knowledge base**.

1. When you're prompted to pick a knowledge type, select **Fabric IQ**.

   :::image type="content" source="media/how-to-create-agent-foundry-iq/choose-knowledge-type.png" alt-text="Screenshot of selecting Fabric IQ as the knowledge type." lightbox="media/how-to-create-agent-foundry-iq/choose-knowledge-type.png":::

   This choice launches the embedded **OneLake catalog** picker.

1. In the OneLake catalog, browse to your Fabric workspace and select the ontology item you want the agent to use. Only items that your identity can read are visible. Confirm your selection to return to the knowledge source form.

1. Provide a clear **Name** and an optional **Description** that explains what business domain the ontology covers. **Create** the source.

   :::image type="content" source="media/how-to-create-agent-foundry-iq/create-knowledge-source.png" alt-text="Screenshot of Fabric IQ knowledge source in Foundry." lightbox="media/how-to-create-agent-foundry-iq/create-knowledge-source.png":::

1. Give the knowledge base a **Name**, **Description** and other model and retrieval configurations. The description is used by the agent at runtime to decide when to consult this knowledge base, so write it from the agent's point of view.

   Example **Answer instructions**:

   ```
   Format the answers in a human readable format with opening and closing statements. And in the closing also add some recommendation or suggestions. No need to add tables for list, just show them in bullet points with other data as sub bullets
   ```
   Example **Retrieval instructions**:

   ```
   Retrieve the most relevant retail operations content from connected sources. Combine information across sources when needed, but only return answers that are supported by retrieved evidence.
   ```

   :::image type="content" source="media/how-to-create-agent-foundry-iq/create-knowledge-base.png" alt-text="Screenshot of creating Fabric IQ knowledge base in Foundry." lightbox="media/how-to-create-agent-foundry-iq/create-knowledge-base.png":::

   Save the knowledge base.

   :::image type="content" source="media/how-to-create-agent-foundry-iq/create-knowledge-base-2.png" alt-text="Screenshot of the Fabric IQ knowledge base in Foundry after it's created." lightbox="media/how-to-create-agent-foundry-iq/create-knowledge-base-2.png":::

## Step 2: Create the agent and connect the knowledge base

1. Create a new agent. In the Foundry portal, go to **Agents** > **+ New agent**. 
1. Give the agent a name (like *sales-insights-agent*), pick a model deployment, and provide a short system prompt describing its role. Here's an example role description:

   ```
   You are a sales insights assistant. Answer questions about stores, products, sales and freezer telemetry events using the retail sales knowledge base. Always cite the entities you used.
   ```

   :::image type="content" source="media/how-to-create-agent-foundry-iq/create-agent.png" alt-text="Screenshot of creating the Foundry agent." lightbox="media/how-to-create-agent-foundry-iq/create-agent.png":::

1. Next, attach the knowledge base. In the agent's **Knowledge** section, choose **+ Add knowledge** and select the knowledge base you created earlier during [step 1](#step-1-create-the-knowledge-source-and-knowledge-base). The agent now routes relevant questions to the Fabric IQ ontology automatically.

1. Review the configuration and save the agent. Foundry provisions the agent and make it available for testing and API calls.

   :::image type="content" source="media/how-to-create-agent-foundry-iq/agent.png" alt-text="Screenshot of the Foundry agent after it's created." lightbox="media/how-to-create-agent-foundry-iq/agent.png":::

1. Query the agent. Open the agent's **Chat** pane and enter an end-to-end question. Here's an example query: 

   ```
   For each store, show any freezers operated by that store that ever had a humidity lower than 46 percent.
   ```

   :::image type="content" source="media/how-to-create-agent-foundry-iq/query-agent.png" alt-text="Screenshot of querying the Foundry agent." lightbox="media/how-to-create-agent-foundry-iq/query-agent.png":::

   :::image type="content" source="media/how-to-create-agent-foundry-iq/query-agent-results.png" alt-text="Screenshot of query results." lightbox="media/how-to-create-agent-foundry-iq/query-agent-results.png":::

   Verify that the agent's answers are grounded in the ontology. Iterate on the system prompt and the knowledge base description if the agent skips the knowledge base or produces ungrounded answers.

## Next steps

* Add additional knowledge sources (documents, web, other ontologies) to the same knowledge base to broaden the agent's coverage.
* Call the agent from your own application using the [Foundry agents SDK or REST API](/azure/foundry/agents/concepts/runtime-components).
* Set up evaluations to monitor answer quality as the ontology evolves.
* Use the [Ontology MCP](how-to-use-ontology-mcp-server.md) directly to build other agentic experiences.
