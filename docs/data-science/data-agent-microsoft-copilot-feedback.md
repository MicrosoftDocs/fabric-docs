---
title: Get user feedback for a Fabric data agent in Microsoft Copilot (preview)
description: Learn how to get and read the thumbs up and thumbs down feedback that users give your Fabric data agent in Microsoft Copilot.
author: amhjf
ms.author: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to
ms.date: 10/09/2026
ms.collection: ce-skilling-ai-copilot
---

# Get user feedback for a Fabric data agent in Microsoft Copilot (preview)

When users chat with your Fabric data agent in Microsoft Copilot, they can rate each answer with a thumbs up or a thumbs down and add a comment. This feedback shows which questions your data agent answers well and which answers need work. As a data agent creator, you can use the feedback to determine how to reconfigure your Fabric data agent to enhance its performance.

Users submit their feedback to Microsoft. Microsoft can also share it with you, as the creator of the data agent. You can then access the feedback in a Fabric notebook using the Fabric data agent Python SDK.

This article is for creators of Fabric data agents. It explains when Microsoft shares feedback with you and how to read it.

> [!IMPORTANT]
> This feature is in [preview](../fundamentals/preview.md).

## How users give feedback

When users select a thumbs up or a thumbs down on an answer from your data agent, the **Submit feedback to Microsoft** window opens. In this window, users can:

- Type a comment about the answer.
- Select **Capture screenshot** to attach a screenshot.
- Select the **Share relevant prompts, responses, and diagnostic data?** check box to include their prompts, the responses they got, and diagnostic data.

Users then select **Submit**.

:::image type="content" source="./media/data-agent-microsoft-copilot-feedback/submit-feedback-window.png" alt-text="Screenshot of the Submit feedback to Microsoft window, with a comment box, a Capture screenshot button, and a check box to share prompts, responses, and diagnostic data.":::

Your organization's feedback policies control which of these options users see. An administrator can turn off feedback, screenshots, or the option to share prompts and responses. For more information, see [Manage Microsoft feedback for your organization](/privacy/microsoft-365/feedback/feedback-manage). To learn what Microsoft collects with feedback, see [Providing feedback about Microsoft Copilot](https://support.microsoft.com/privacy/microsoft-copilot/providing-feedback).

## Prerequisites

- A Fabric data agent that you published to Microsoft Copilot and shared with others. For more information, see [Consume a data agent from Microsoft Copilot](data-agent-microsoft-365-copilot.md).
- Write permission on the data agent. You have this permission if you can edit the data agent, for example through your workspace role or the **Edit and view details** sharing permission. For more information, see [Fabric data agent sharing and permission management](data-agent-sharing.md).
- A [Fabric notebook](../data-engineering/how-to-use-notebook.md).
- A [lakehouse attached to the notebook](../data-engineering/lakehouse-notebook-explore.md), if you want to download attachments.

## Set up feedback sharing

Microsoft shares feedback with you only when both of these conditions are true:

- Your Microsoft 365 administrator turned on **Agent feedback sharing** for your data agent.
- You published your data agent again after your administrator turned on the setting.

### Ask your administrator to turn on agent feedback sharing

Only a Microsoft 365 administrator can turn on this setting. Ask your administrator to complete these steps:

1. In the [Microsoft 365 admin center](https://admin.microsoft.com/), select **Agents** > **Settings** > **Agent feedback sharing**.
1. Select **All agents**, or select **Selected agents** and then select your data agent. If the setting is **No agents**, creators don't get feedback for any agent.
1. Select **Save**.

This setting doesn't change whether users can rate answers or what data an agent can access.

### Publish your data agent again

After your administrator saves the setting, publish your data agent again:

1. In Fabric, open your data agent and select **Publish**.
2. In the window that opens, select **Publish to Microsoft Copilot**, and then publish the data agent.

From then on, Microsoft shares with you the feedback that users submit.

## Get your feedback

1. In your Fabric notebook, install the Fabric data agent Python SDK:

    ```python
    %pip install fabric-data-agent-sdk
    ```

    If Fabric asks you to restart the Python session after the installation, restart it before you continue.

1. Connect to your data agent and get its feedback. Replace `<your-data-agent-name>` with the name or identifier of your data agent. This example returns up to 100 feedback items.

    ```python
    from fabric.dataagent.client import FabricDataAgentManagement

    management = FabricDataAgentManagement(data_agent="<your-data-agent-name>")

    feedback = management.list_feedback(max_results=100)
    display(feedback)
    ```

    If the notebook is in a different workspace than the data agent, also pass `workspace="<your-workspace-name>"` to `FabricDataAgentManagement`.

`list_feedback` returns a pandas DataFrame, which is a table with one row for each feedback item.
If the table is empty, see [Troubleshooting](#the-feedback-table-is-empty).

## Review your feedback

The examples in this section use the `management` and `feedback` variables from [Get your feedback](#get-your-feedback).

This example shows one feedback row. A value can be `None` when Microsoft didn't share that part of the feedback.

```python
{
    "question": "<the user's question>",
    "response": "<the response the user saw>",
    "rating": "disliked",                       # liked, disliked, or None
    "comment": "<the user's comment>",
    "has_attachments": True,                    # True if the feedback has shared files
    "submitted_at": "2026-08-25T13:51:49Z",    # Coordinated Universal Time
    "feedback_id": "<feedback-id>",             # Used to download attachments
}
```

### Filter and sort feedback

To get feedback from a date range, newest first, add these parameters to `list_feedback`:

```python
filtered_feedback = management.list_feedback(
    start_date="2026-09-01",     # Start of the date range, in YYYY-MM-DD format
    end_date="2026-09-30",       # End of the date range, in YYYY-MM-DD format
    sort_by="submitted_at",      # Sort by when users submitted feedback
    ascending=False,             # False puts the newest feedback first
    max_results=100,             # The largest number of feedback items to return
    page_size=50,                # The number of feedback items to request at a time
)

display(filtered_feedback)
```

The SDK keeps requesting feedback items, `page_size` at a time, until it reaches `max_results` or there's no more feedback. If paging gets stuck in a loop, the SDK stops and raises `FeedbackPaginationError`.

### Compare thumbs up and thumbs down

To see which answers users liked and which they didn't, count each rating. Then list the questions that got a thumbs down:

```python
if feedback.empty:
    print("No feedback to review yet.")
else:
    print(feedback["rating"].value_counts(dropna=False))

    disliked = feedback[feedback["rating"] == "disliked"]

    for _, row in disliked.iterrows():
        print(
            f"{row['submitted_at']} | "
            f"Question: {row['question']} | "
            f"Comment: {row['comment']}"
        )
```

The SDK shows thumbs up ratings as `liked` and thumbs down ratings as `disliked`. An unrecognized or missing rating is `None`. To list the questions that users liked, replace `"disliked"` with `"liked"`.

### Read the shared question and response

The following code reads the shared question and response for the first feedback item in the table. To read another item, change the row number in `iloc[0]`.

```python
if feedback.empty:
    print("No feedback to review yet.")
else:
    item = feedback.iloc[0]

    print("Submitted:", item["submitted_at"])
    print("Rating:", item["rating"])
    print("Question:", item["question"])
    print("Response:", item["response"])
    print("Comment:", item["comment"])
```

The feedback table doesn't include the full chat history.

### Download attachments

When `has_attachments` is `True`, the feedback includes shared files, such as a screenshot. The following code finds the first feedback item that has attachments and a usable `feedback_id`. It saves the files as a ZIP file in your notebook's lakehouse.

> [!IMPORTANT]
> Microsoft Purview sensitivity labels and protections aren't preserved on downloaded attachments. Every download must explicitly acknowledge this behavior by setting `allow_download_without_sensitivity_label=True`. Without this parameter, the SDK raises `SensitivityLabelAcknowledgementRequired` before it sends a download request or writes a file.

```python
from pathlib import Path
import zipfile

if feedback.empty:
    print("No feedback to review yet.")
else:
    with_attachments = feedback[
        feedback["has_attachments"].fillna(False).astype(bool)
        & feedback["feedback_id"].notna()
        & feedback["feedback_id"].astype(str).str.strip().ne("")
    ]

    if with_attachments.empty:
        print("No feedback items have attachments.")
    else:
        feedback_id = str(with_attachments.iloc[0]["feedback_id"])

        output_folder = Path("/lakehouse/default/Files/feedback-attachments")
        output_folder.mkdir(parents=True, exist_ok=True)

        saved_path = management.download_feedback_attachments(
            feedback_id,                                    # The feedback_id of the item
            output_path=output_folder,                      # The folder where the SDK saves the ZIP file
            language="en",                                  # The language of README.txt for expired attachments
            overwrite=True,                                 # Replace the ZIP file if it already exists
            allow_download_without_sensitivity_label=True,  # Required. See the note above
        )
        print("Saved:", saved_path)

        with zipfile.ZipFile(saved_path) as archive:
            print("Files in ZIP:", len(archive.infolist()))
            print("ZIP file is valid." if archive.testzip() is None else "ZIP file is damaged.")
```

Attachments can expire. If an attachment expires, the download can still succeed with a ZIP file that contains a *README.txt* file. A `has_attachments` value of `True` doesn't guarantee that the files are still available. When you download, the service checks that the files belong to your data agent and are still available.

## Troubleshooting

### The feedback table is empty

If `list_feedback` returns an empty table, Microsoft hasn't shared any feedback with you yet. Check that:

- Both conditions in [Set up feedback sharing](#set-up-feedback-sharing) are true.
- Users submitted feedback after you published the data agent again.
- Your organization's feedback policies let users submit feedback.

### Common errors

If a request fails, use its status code to find the cause:

| Status code | Cause | What to do |
| --- | --- | --- |
| 400 | A parameter value isn't valid, or you didn't publish the data agent to Microsoft Copilot. | Check the parameter values. Make sure that you published the data agent to Microsoft Copilot. |
| 403 | You don't have Write permission on the data agent, or the attachment belongs to a different data agent. | Get permission to edit the data agent. Use a `feedback_id` from this data agent. |
| 404 | The requested attachment doesn't exist or is no longer available. | Confirm that the row has `has_attachments=True` and a nonempty `feedback_id`. |
| 429 | You sent too many requests in a short time. | Wait for the time in the `Retry-After` response header, and then try again. |

## Security and privacy

The feedback table doesn't include user identifiers, email addresses, or organization identifiers. However, questions, responses, comments, feedback identifiers, screenshots, and other shared files can still contain sensitive or personal information. Handle feedback according to your organization's privacy policies, and review notebook output before you share it.

People who can edit your data agent can also read its feedback.

## Related content

- [Consume a data agent from Microsoft Copilot](data-agent-microsoft-365-copilot.md)
- [Fabric data agent Python SDK](fabric-data-agent-sdk.md)
- [Fabric data agent sharing and permission management](data-agent-sharing.md)
- [Agent settings in Microsoft 365 admin center](/microsoft-365/admin/manage/agent-settings)
- [Manage Microsoft feedback for your organization](/privacy/microsoft-365/feedback/feedback-manage)
- [Providing feedback about Microsoft Copilot](https://support.microsoft.com/privacy/microsoft-copilot/providing-feedback)
