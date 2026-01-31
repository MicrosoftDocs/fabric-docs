---
title: Security best practices
description: Best practices for securing your data in OneLake including least privilege access, workload permissions, and user permissions.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: concept-article
ms.custom:
ms.date: 09/05/2025
ai-usage: ai-assisted
#customer intent: As a security engineer, I want to learn best practices for securing my data in OneLake, including least privilege access, workload permissions, and user permissions, so that I can effectively protect my data and reduce security risks.
---

# Best practices for OneLake security

This article describes best practices around securing data in OneLake, including architecture guidance.

## Least privilege

Least privilege access is a fundamental security principle in computer science that advocates for restricting users' permissions and access rights to only those permissions necessary to perform their tasks. For OneLake, least privilege access means assigning permissions at the appropriate level to reduce risk and ensure that users aren't over-provisioned.

- If users only need access to a single lakehouse or data item, use the **Share** feature to grant them access to only that item. Only assign a user to a workspace role if that user needs to see *all* items in that workspace.

- Use [OneLake security](./get-started-onelake-security.md) to restrict access to folders and tables within a lakehouse. For sensitive data, OneLake security [row](./row-level-security.md) or [column](./column-level-security.md) level security ensures that protected row and columns remain hidden.

- To write data to OneLake, there are two permission options: workspace roles or [OneLake security ReadWrite permission.](./data-access-control-model.md#readwrite-permission) Users with Admin, Member, or Contributor workspace roles can write data to OneLake. For Viewers or users with only Read permissions on the item, you can grant granular OneLake security ReadWrite permission to specific folders and tables. These permissions can be utilized through the various methods of writing data in OneLake such as pipelines, notebooks, etc.

- If users need to manage access to data, such as sharing an item or configuring OneLake security roles, then Admin or Member workspace roles are required.

- Users need the SubscribeOneLakeEvents permission to subscribe to events from a Fabric item. Admin, Member, and Contributor roles have this permission by default. You can add this permission for a user with Viewer role.

## Recommended architecture

### Primary pattern

This pattern is the recommended baseline architecture for implementing OneLake security at scale. Some scenarios might require alternative approaches due to current network security constraints. This pattern aligns with the long-term direction of OneLake security as those limitations are addressed.

The core principle is to centralize data ownership and security enforcement in a primary workspace. Manage and secure your data at the source, then share it to downstream workspaces by using OneLake shortcuts. This approach ensures OneLake security policies are consistently enforced, regardless of where users consume the data.

:::image type="content" source="./media/best-practices-secure-data-in-onelake/base-pattern.png" alt-text="Diagram of the base pattern showing a core Workspace A that has security set. Users are then consuming that data through shortcuts in Workspaces B and C.":::

- Create the primary workspace (workspace A):

  - Create a primary workspace (workspace A) that contains the lakehouse or mirrored database and any other source data items.
  - Enable OneLake security on the lakehouse and define the required object-level and fine-grained (RLS/CLS) policies.
  - Grant users **Viewer** access to the workspace, and add users to the defined OneLake security roles.
  - Configure all SQL analytics endpoints in workspace A to run in user's identity mode so OneLake security policies are evaluated per user.

- Create downstream workspaces:

  - Create downstream workspaces to support data consumption, additional workloads, or domain-specific use cases.
  - In downstream lakehouses, create shortcuts that point back to data in workspace A. OneLake security policies defined at the source are enforced automatically so users can only access data they're authorized to see.
  - Confirm SQL analytics endpoints in downstream workspaces are configured to use user's identity mode. It is recommended that you also create downstream workspaces and lakehouses using the same owner as workspace A to get the most consistent experience. This setup gives the data owner the ability to enforce user's identity mode.

## Related content

- [Fabric security overview](../../security/security-overview.md)
- [OneLake security overview](./get-started-onelake-security.md)
- [Data access control model](./data-access-control-model.md)
