---
title: Troubleshoot issues with restricted access
description: Learn how to troubleshoot issues with restricted access.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.date: 12/15/2025
ms.topic: concept-article
---

# Troubleshoot access restrictions

Fabric's permission model allows users and workspace admins to grant access at the workspace level, with the option to provide elevated permissions for specific items. For example, a user with view access might receive edit access to a particular report. Learn more about the [Fabric permission model](/fabric/security/permission-model). Beyond these permissions, organization-wide policies and OneLake item-level access controls can restrict access to specific items. 

Because multiple layers control access, you may encounter restrictions from policies you're unaware of. This article helps you identify if a policy is affecting your access and explains how to restore it.

## General problems with accessing an item

A user may experience a situation where they used to have access to an item, but it's no longer visible in their workspace, or they can't access it using a link that worked previously.

- **Manual removal of access.** Another user with privileged access to that item may have *manually removed your access* from it. This could happen due to regulations or processes in the company that enforce compliance. To resolve this issue:
   - **Contact the item owner directly**: If you know who owns or created the item, reach out to them to inquire about the access change.
   - **Reach out to your workspace administrator**: If you don't know the item owner, your workspace admin can help you contact them or reinstate your access if it was removed by mistake.

- **Change in workspace permissions.** You may have been removed from the workspace or had your access level downgraded, which automatically revoked some of your permissions to the items within it. To resolve this issue:
   - Contact your workspace administrator to understand the reason for the change. 

## Policy-based issues

Your organization may have implemented company-wide policies that restrict access to certain items based on their sensitivity or content. These policies can override individual permissions and workspace settings. The two main types of policies that can enforce such restrictions are:

- **Protection policies**, which automatically enforce access restrictions based on the applied *sensitivity label*. For example, the label "Confidential" can automatically limit access to a specific security group, for any Fabric item labeled by it.
- **Data Loss Prevention (DLP) policies** with the *restrict access* action, which can block access to items containing sensitive information, such as credit card numbers or social security numbers.

Protection policies and DLP policies with restrict access can lead to similar user experiences when access is revoked. Below are detailed troubleshooting steps for each scenario.

### How to identify a policy-based access issue

You can tell if a protection policy is the cause of your restricted access if you experience the following:

- You no longer see the item in your workspace list view or the Onelake catalog.

- You see “Permission required” or “Sorry we couldn’t locate that artifact” when trying to open the item using a link.

> :::image type="content" source="media/troubleshoot-restriced-access/image1.png" alt-text="A screenshot of a computer AI-generated content may be incorrect.":::
>
> :::image type="content" source="media/troubleshoot-restriced-access/image2.png" alt-text="A screenshot of a computer AI-generated content may be incorrect.":::

- You see the item in your workspace list view, but when you try to open it, you see a "Permission required" message. This occurs when the item is accessible, but its underlying data source is restricted. For example, a report may remain visible even if access to its semantic model is revoked, but opening it displays "Permission required."

> :::image type="content" source="media/troubleshoot-restriced-access/image3.png" alt-text="":::

   When viewing a dashboard built on restricted data, tiles that access the restricted content display a "Permission required" message, while other tiles continue to render normally.

### How to resolve a policy-based issue

Issues caused by Protection Policies and DLP policies with restrict access can be resolved by following these steps.

#### Resolving Microsoft Purview Protection policy issues

    1. **Contact your workspace admin**: Workspace admins can check the Manage Permissions page to see if your user shows "No access," indicating that access was revoked by an organizational security policy.

    2. **If the workspace admin is also blocked**: Two other users can help by checking the Manage Permissions page:
        - **The label issuer**: The person who applied the sensitivity label retains access even if not included in the Protection Policy.
        - **The item creator**: When a label is applied automatically, the item's creator retains access to ensure at least one user can always access the item.

    3. **Request policy inclusion**: Once you've confirmed a Protection Policy is restricting your access, contact your organization's security team to request inclusion in the policy for that label.


#### Resolving Data Loss Prevention (DLP) policy issues

1. Contacting your workspace admin is the fastest way to ensure if a DLP restrict access policy took place and is the reason you are not seeing your item.

1. Workspace admins can:

   - Look at the item’s Manager Permissions page, and see if your user has a ‘No access’ indication.

1. Once you confirmed the reason you are restricted is due to a DLP policy, if you know the detection is a false positive or if you believe the sensitive information was accidentally uploaded into the data item, you can work with your workspace admin to override the policy or remove the data, which will trigger another evaluation that will remove the restriction automatically.

1. Note that DLP policies can restrict two types of groups:

   - All users in the tenant – this will block all users, except for the workspace admins who will be able to troubleshoot and fix the data, where relevant.

   - Guest users – this will block guest users, and will retain access for internal users as well as for workspace admins. Guest users are users who are not defined as members in Entra. If an external user is configured as a tenant ‘member’, they will be treated as an internal user for this purpose.

## How to investigate a restriction scenario

When a workspace admin receives a report from a user who has lost access to an item, quick investigation is necessary. The following steps apply to workspace admins, item creators, label issuers, or users with full permissions in the workspace.

### Possible causes

- The user’s access may have been manually removed by another user.

- A Purview Protection Policy may have been applied to the item based on its latest sensitivity label assignment

- A DLP policy with restrict access may have been executed on the item since its last update.

### Actions

1. Go to the item’s Manage Permissions page. There you will be able to see the user’s current permissions. If the user’s permissions appear as “No access”, this means that a company policy took place and revoked this user’s access.

:::image type="content" source="media/troubleshoot-restriced-access/image4.png" alt-text="":::

1. Unblock users:

   1. **Note: only take these actions if you have ensured there is no risk to the organization’s compliance or to the data leaking due to your actions! These actions are audited and may be investigated by your security administrator.**

   1. Protection policy:

   1. If the protected label is incorrectly applied, you may apply a different label or ask the Protection Owner to do so.

   1. If the label is correct, and the user should be allowed to this classified data – contact the company’s security team and suggest this user is added to the Protection Policy in Purview. Once this is done, re-log into Fabric, and the permissions will be updated correctly.

1. DLP policy with restrict access:

   1. If the DLP policy detected incorrect data and you are certain this is a false positive, you can override the policy and provide justification to your compliance team.

   1. If the data was incorrectly added to the data item, edit the item and remove the sensitive data. This will trigger a new evaluation that will automatically remove the restriction.

Add "Restrictions troubleshooting guide" to both DLP and Protection policies:

:::image type="content" source="media/troubleshoot-restriced-access/image5.png" alt-text="":::
