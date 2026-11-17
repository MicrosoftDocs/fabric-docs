---
title: Copilot in Data Factory privacy and security
description: Learn how Copilot in Data Factory in Microsoft Fabric keeps your data secure, adheres to privacy requirements, and supports responsible AI use.
author: snehagunda
ms.author: sngun
ms.reviewer: guptamaya
ms.topic: concept-article
ms.date: 10/19/2026
ms.update-cycle: 180-days
ai-usage: ai-assisted
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot

#customer intent: As a Fabric administrator or data engineer, I want to understand how Copilot in Data Factory handles my data so that I can ensure compliance with my organization's privacy and security requirements.
---

# Privacy, security, and responsible use of Copilot in Data Factory

This article describes how [Copilot in Data Factory](../data-factory/copilot-fabric-data-factory.md) handles your business data, adheres to privacy requirements, and supports responsible use of generative AI. For an overview of these topics for Copilot in Fabric, see [Privacy, security, and responsible use for Copilot](copilot-privacy-security.md).

For considerations and limitations, see [Limitations of Copilot in Data Factory](../data-factory/copilot-fabric-data-factory.md#limitations).

## Data that Copilot in Data Factory can access

The new Copilot experience in Dataflow Gen2 (preview) uses information available to your editing session and your existing permissions to help answer requests and perform actions. It isn't limited to data already displayed in the preview grid.

> [!NOTE]
> The new Copilot experience and the approval controls described in this article are in preview and are specific to Dataflow Gen2. They don't apply to pipeline Copilot or the legacy Dataflow Gen2 experience. To switch back to the legacy experience, use the toggle in the top-right corner of the Copilot pane when no response is active.

Depending on your request and the available capabilities, information used by Copilot can include:

- Your prompts and conversation history.
- Query names, Power Query M code, query properties, and the selected query, step, or columns.
- Data-source and connection information available to you.
- Query results, data previews, and results of evaluating expressions.
- Available refresh history, refresh details, and diagnostic logs.
- Query and data-source references you add, and files you select through supported import experiences.
- Session context, including your display name, workspace and dataflow identifiers, and workspace-variable names, types, and values.

Selecting a local or OneDrive file uses the available import experience. It doesn't give Copilot general access to your filesystem.

For the full action list and approval requirements, see [Supported tools and capabilities in Dataflow Gen2 (preview)](../data-factory/copilot-fabric-data-factory.md#supported-tools-and-capabilities-in-dataflow-gen2-preview). For information about how Fabric processes Copilot inputs and grounding data, see [Privacy, security, and responsible AI use of Copilot in Fabric](copilot-privacy-security.md).

## Permissions and approvals

Copilot uses your existing permissions. Approving an action doesn't grant access to extra data sources or destinations, and it doesn't replace your organization's access controls.

By default, Copilot asks for approval before replacing existing step expressions or entire query scripts, deleting steps or queries, or removing a data destination. You can approve or deny individual requests or remaining requests in a group. You can also approve an action type for the session. That approval applies across queries, not just to the query in the current request, and resets when you clear the chat.

Not every change requires an approval prompt. Copilot can create or rename queries, insert steps, bind or unbind existing connections, change query properties, and set data destinations without extra confirmation. Review the editing session before saving or running.

Where supported, saving and running a dataflow requires a separate approval each time. There's no session-wide approval for this action. Running a dataflow can write data to configured destinations.

Existing authentication, privacy, native-query permission, and other data-source prompts still apply. Approving a Copilot action doesn't approve those prompts. Resolve them through the standard Power Query interface.

For instructions, see [Review and approve changes](../data-factory/copilot-fabric-data-factory-get-started.md#review-and-approve-changes).

## Stop a response and clear the chat

Stopping a Copilot response requests cancellation, but it doesn't undo actions that already completed. Some requested actions might complete before others. A save or refresh that's already started might continue after you stop the response.

You can retain conversation history and displayed results in your browser to restore the chat. Clearing the chat resets the conversation and session approvals. It doesn't discard query changes or delete saved dataflows, diagnostic records, or service telemetry.

## How Copilot in Data Factory is evaluated

- The product team tested Copilot in Data Factory to validate the accuracy and usefulness of AI-generated responses within Dataflow Gen2.
- The team applied harms mitigations, including content filters that focus Copilot output on data integration topics and reduce off-topic or harmful responses.

## Tips for working with Copilot in Data Factory

- **Limit prompts to data integration topics.** Copilot in Data Factory is optimized for data integration tasks in Dataflow Gen2 and produces the best results in that area.
- **Include specific data details in your prompts.** Provide query names, column names, and data values so Copilot can generate more accurate and relevant outputs.
- **Break complex requests into smaller tasks.** Splitting a complex transformation into individual steps helps Copilot better understand your requirements and produce more accurate results.
- **Review changes and approval requests.** Check generated M code, applied steps, connection bindings, query properties, and destinations. Use session-wide approvals only when you intend to allow that action type across queries.
- **Validate results beyond the preview.** AI-generated explanations, queries, and charts can be inaccurate. A preview is a sample, not proof of correctness or performance at full scale. Even a preview can contact data sources and consume resources.
- **Keep sensitive information out of prompts.** Don't include passwords, access tokens, or other secrets in your conversation with Copilot.

## Related content

- [Copilot in Data Factory overview](../data-factory/copilot-fabric-data-factory.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
