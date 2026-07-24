---
title: Extract Comments in Infobridge
description: Learn how to use the Extract Comments transformation in Infobridge to extract comments and related metadata into a query.
ms.date: 07/07/2026
ms.topic: how-to
#customer intent: As a user, I want to extract comments and related metadata into my query so that I can use collaboration details in downstream reporting and analysis.
---

# Extract comments in Infobridge

Use the **Extract Comments** transformation to extract cell-level comments and related metadata into your query. The extracted information helps preserve business context and collaboration details for downstream reporting and analysis.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## About extracting comments

The **Extract Comments** transformation adds the comment text together with metadata such as the user who updated the comment, the date, and time the comment was added, the thread status, and the assigned user.

You can find the **Extract Comments** transformation on the **Transform** tab.

## Extract comments

On the **Transform** tab, select **Extract Comments**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-extract-comments/extract-comments-command.png" alt-text="Screenshot highlighting the Extract Comments command on the Transform tab." lightbox="../media/infobridge-transformations/infobridge-how-to-extract-comments/extract-comments-command.png":::

After the transformation completes, Infobridge adds the following columns to the query:

* **comment**: Shows the extracted comment text.
* **updatedByUser**: Shows the user who last updated the comment.
* **dateTime**: Shows the date and time when the comment was added or last updated.
* **threadStatus**: Shows the current status of the comment thread.
* **threadAssignedId**: Shows the user assigned to the comment thread.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-extract-comments/extracted-comments.png" alt-text="Screenshot showing the comment, updatedByUser, dateTime, threadStatus, and threadAssignedId columns added to the query after applying the Extract Comments transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-extract-comments/extracted-comments.png":::

Continue transforming the query, or write the extracted comments and metadata to a destination.
