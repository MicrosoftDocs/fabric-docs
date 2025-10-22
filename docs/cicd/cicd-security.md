---
title: Network security for continuous integration/continuous deployment
description: This document describes the network security features for continuous integration/continuous deployment.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.custom:
ms.topic: concept-article
ms.service: fabric
ms.subservice: cicd
ms.date: 10/09/2025
---

# Network security for continuous integration/continuous deployment

Microsoft Fabric is a software as a service (SaaS) platform that lets users get, create, share, and visualize data. As a SaaS service, Fabric offers a complete security package for the entire platform. For more information, see [Network Security](../security/security-overview.md)

>[!IMPORTANT]
>Deployment pipelines are currently not supported with workspace inbound and outbound access protection.


## Workspace level security
Workspaces represent the primary security boundary for data stored in OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. Workspace-level security in Microsoft Fabric provides granular control over data access and network connectivity by allowing administrators to configure both inbound and outbound protections for individual workspaces. 

 :::image type="content" source="media/cicd-security/overview-1.png" alt-text="Diagram that shows cicd security." lightbox="media/cicd-security/overview-1.png":::

Workspace level security is composed of two main features.

- **Workspace inbound access protection** - is a network security feature that uses [private links](/azure/private-link/private-link-overview) to ensure that connections to a workspace are from secure and approved networks. Private links enable secure connectivity to Fabric by restricting access to your Fabric tenant or workspace from an Azure virtual network (VNet), and blocking all public access. For more information, see [Manage admin access to workspace inbound access protection settings](../security/security-workspace-enable-inbound-access-protection.md)

- **Workspace Outbound Access Protection (OAP)** - allows administrators to control and restrict outbound connections from workspace artifacts to external resources. For outbound security, Fabric supports workspace outbound access protection. This network security feature ensures that connections outside the workspace go through a secure connection between Fabric and a virtual network. It prevents items from establishing unsecure connections to sources outside the workspace boundary unless allowed by the workspace admins. This granular control makes it possible to restrict outbound connectivity for some workspaces while allowing the rest of the workspaces to remain open. For more information, see [Workspace outbound access protection (preview)](../security/workspace-outbound-access-protection-overview.md)

## Git integration and network security
Git integration in Fabric lets a workspace sync its content (like notebooks, dataflows, Power BI reports, etc.) with an external Git repository (GitHub or Azure DevOps). Because the workspace must pull from or push to a Git service outside of Fabric, it involves outbound communication. 

### Workspace inbound access and Git integration
 When Private Link is enabled for a workspace, users must connect through a designated virtual network (VNet), effectively isolating the workspace from public internet exposure. 
 
 This restriction directly impacts Git integration: users attempting to access Git features (such as syncing or committing changes) must do so from within the approved VNet. If a user tries to open the Git pane or perform Git operations from an unapproved network, Fabric blocks access to the workspace UI entirely, including Git functionality. This restriction also applies to the Git APIs. This enforcement ensures that Git-related actions—like connecting to a repository or branching out—are only performed in secure, controlled environments, reducing the risk of data leakage through source control channels.

 Git integration with inbound access protection is enabled by default. There's no toggle to disable. Branching out is blocked.

### Workspace outbound access and Git integration
By default, Workspace OAP will completely block Git integration, because contacting an external Git endpoint would violate the "no outbound" rule. To resolve this restriction, Fabric introduces an admin-controlled consent setting for Git. 

#### How Git integration works with OAP
Each workspace with OAP enabled has an explicit toggle (a checkbox in the workspace’s network settings) labeled to allow Git integration for that workspace. Initially, when OAP is turned on, this checkbox is off by default – meaning no Git connectivity is allowed. In that state, if a user opens the workspace’s Git panel in Fabric, they'll see the Git features disabled (greyed out) with an explanation that "Outbound access is restricted". 

Similarly, any attempt to call Git APIs (e.g. via automation or PowerShell) for that workspace fails with an error as long as Git is disallowed. This protection ensures that, by default, a secured workspace can’t quietly sync its content to an external repository without awareness. 

 :::image type="content" source="media/cicd-security/outbound-1.png" alt-text="Screenshot of outbound access protection." lightbox="media/cicd-security/outbound-1.png":::

To enable Git integration, an administrator can go to the workspace’s **Outbound security settings** and clicks the **Allow Git integration** toggle. (This box can only be checked after OAP itself is enabled; it’s a sub-option under outbound settings.) Checking **Allow Git integration** is effectively the admin giving consent that this workspace is permitted to communicate with Git.

>[!NOTE]
>The Git integration consent is per workspace.


Once enabled, Fabric immediately lifts the restrictions on Git for that workspace: the Git UI becomes active and all operations – connecting a repo, syncing (pull/push), committing changes, and branch management – are now allowed for users in that workspace. 

>[!NOTE]
>When OAP isn't enabled, the toggle won't impact git integration and can't be turned on or off.


The following table summarizes how git integration works with OAP.

|OAP state|Allow Git integration toggle|Git integration state|
|-----|-----|-----|
|Enabled|Off|Git integration won't work|
|Enabled|On|Git integration will work|
|Disabled|Greyed out|Git integration not impacted|


##### Enable Git Integration
To use workspace outbound access protection and enable git integration, do the following:

1. Sign-in to the fabric portal
2. Navigate to your workspace
3. In the top right, select workspace settings.
4. On the right, click **Outbound networking**.
5. Under **Outbound access protection (preview)**, make sure **Allow Git Integration** is toggled to on.

#### Branch out considerations

The **Branch Out** feature creates a new workspace from the current Git branch, or links to an existing workspace, and is a special case under OAP. When Git integration is allowed via admin consent, branching out is also allowed. Fabric provides a clear warning in the branch-out dialog if you attempt to branch into a workspace that doesn't have OAP enabled. 

For example, if you’re branching out from a locked-down dev workspace to create a new test workspace, a warning will state that the new workspace won't automatically have outbound protection. 

>[!NOTE]
>Workspace settings aren't copied over to other workspaces through git, or directly. This applies to branching out or copied workspaces. OAP and Git integration need to be enabled after the new workspace is created.

New workspaces start with OAP off by default and the administrator should manually enable OAP on the new workspace after it’s created via branch-out to maintain the same security level. If branching out to an existing workspace, the warning will appear if that target workspace isn’t OAP-protected. This is to prevent an unaware user from pushing content into an environment that undermines security. 

#### Removing Git integration from OAP

Once Git is allowed, the workspace will operate normally with respect to source control. If at any point an administrator decides to disable Git integration, they can click the **Allow Git integration** toggle. Fabric will then immediately cut off the Git connectivity for that workspace. Any subsequent Git operations (pull, push, etc.) fails, and the UI will revert to a disabled state requiring re-approval. 

 To prevent accidental disruption, Fabric provides a confirmation/warning to the administrator when turning off Git access, explaining that all Git sync for that workspace will stop. It’s worth noting that disabling Git doesn't delete the repository or any history – it severs the connection from the workspace side. 

 #### REST API support

 Administrators can use REST APIs to programmatically query the network settings of workspaces. These queries can be done to indicate if outbound protection is enabled or if you want to set the outbound policy. These allow scripting of audits – you could retrieve all workspaces and check which ones have gitAllowed: true under OAP. Using such APIs, a security team could, for instance, nightly confirm that no additional workspaces have Git allowed without approval. Microsoft has introduced the following endpoints to get or set the Git outbound policy for a workspace 

 The GET /workspaces/{workspaceId}/gitOutboundPolicy API allows administrators or automation systems to retrieve the current outbound Git policy for a specific workspace. This action is particularly useful for auditing and compliance purposes, as it confirms whether Git operations (such as repo sync, commit, or branch-out) are permitted under the workspace’s outbound access protection settings. Checking this policy, allows users, to ensure that only explicitly approved workspaces are allowed to interact with external Git repositories, helping prevent unintended data exfiltration.

 The SET /workspaces/{workspaceId}/gitOutboundPolicy API enables administrators to programmatically configure the Git outbound policy for a workspace. This configuration includes toggling the consent that allows Git operations even when DEP is enabled. Automating this configuration via API is beneficial for CI/CD workflows, allowing secure workspaces to be onboarded into Git-based development pipelines without manual intervention. It also supports infrastructure-as-code practices, where network and integration policies are versioned and deployed alongside workspace configurations.
 
 ### Auditing and logs
 The Fabric platform logs events whenever an operation is blocked due to network security. A high volume of such errors might indicate either misconfiguration (someone forgot to enable a needed setting) or a potential attempt to bypass security. For more information, see [Track user activities in Microsoft Fabric](../admin/track-user-activities.md)
 
### Limitations and considerations
The following is information you need to keep in mind when using OAP and Git integration.

- Not all items support inbound and outbound access protection. Syncing unsupported items into the workspace from git integration will fail. For a list of supported items, see [Private link supported items](../security/security-workspace-level-private-links-support.md#supported-item-types-for-workspace-level-private-link) and [Outbound access protection supported items.](../security/workspace-outbound-access-protection-overview.md#supported-item-types)
- Deployment pipelines are currently not supported with workspace inbound access protection.
- If the workspace is part of Deployment Pipelines, workspace admins can't enable outbound access protection because Deployment Pipelines are unsupported. Similarly, if outbound access protection is enabled, the workspace can't be added to Deployment Pipelines.

For more information, see [OAP and workspace considerations](../security/workspace-outbound-access-protection-overview.md#considerations-and-limitations)

## Related content

* [Git integration](./git-integration/intro-to-git-integration.md)
* [Manage admin access to workspace inbound access protection settings](../security/security-workspace-enable-inbound-access-protection.md)
* [Workspace outbound access protection](../security/workspace-outbound-access-protection-overview.md)