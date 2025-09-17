---
title: Use Fabric Home to Find, Personalize, and Manage Content
description: Learn how to quickly find content, search, filter, multitask with tabs, personalize settings, and get help in Fabric—boost productivity and get started now.
author: julcsc
ms.author: juliacawthra
ms.topic: overview
ms.date: 09/17/2025
ai-usage: ai-assisted
#customer intent: As a new Fabric user, I want to quickly find my content, understand navigation, personalize settings, and get help.
---

# Use Fabric Home to find, personalize, and manage content

Home is your personalized Fabric start page. Use it to find items and workspaces, multitask with tabs, personalize settings, and get contextual help to work faster.

## Home at a glance

Home is your personalized start page. It shows supported item types (apps, reports, warehouses, lakehouses, notebooks, task flows, and more) you can access. Some preview or restricted item types might not appear.

:::image type="content" source="media/fabric-home/fabric-home-steps.png" alt-text="Screenshot of Fabric Home with numbered regions." lightbox="media/fabric-home/fabric-home-steps.png":::

Key areas:

1. Navigation pane (nav pane): Switch views (Home, Browse, Workloads, OneLake, and more) and open workspaces
1. Fabric and Power BI switcher
1. Create: Start a new item or task flow
1. Top bar: Search, Help (?), Feedback, Notifications, Settings, and Account manager
1. Learning and getting started resources
1. Your content: Recent workspaces, recent items, and favorites

> [!IMPORTANT]
> Home lists only supported content you can access.  If a license or subscription change removes access, Fabric prompts you to upgrade or start a trial.

## Work with workspaces

A workspace is a collaborative container for related items.

Open a workspace:

1. Select **Workspaces** in the nav pane, then select a workspace.
1. Enter part of the workspace name in global search and select the workspace.
1. Use the workspace selector at the bottom of the nav pane.
1. Open an item in a workspace to activate that workspace.

Workspace behavior:

- If no workspace is open, **My workspace** opens by default.
- When you create a new item, it's added to the active workspace unless you choose a different one. Most creation dialogs default to the active workspace.
- If task flow templates are enabled in your tenant, they appear in the first row on Home to help you start structured solutions. See [Task flows in Microsoft Fabric](task-flow-overview.md).

For governance details, see [Workspaces](workspaces.md).

## Create items and explore workloads

Workloads are Fabric capability areas, like Data Factory, Data Engineering, and Real-Time Intelligence.

To explore:

1. Select **Workloads** in the nav pane to open the Workload hub.
1. Review available workloads and their landing pages (overview, supported item types, samples, learning links).
1. Open a workload to create items for that capability.

> [!NOTE]
> Your organization or Microsoft can add more workloads over time. Tabs in the Workload hub refresh as new workloads are provisioned.

More about workloads: [Workloads in Fabric](../workload-development-kit/more-workloads-add.md).

## Multitask with tabs and object explorer

> [!NOTE]
> Tabs, multiple open workspaces, and the object explorer are in phased rollout (preview). Availability varies by tenant.

- Tabs: Each open or new item appears as a tab at the top. Drag to reorder. Hover to see its workspace.
- Multiple open workspaces: Fabric color codes and numbers items by workspace to help you tell them apart (preview experience).
- Object explorer (preview): Hierarchical panel showing items in your open workspaces. Filter by type or search. Pin it for quick access.

In Power BI view (left switcher), tabs aren't available.

## Find content fast: Search, filter, sort

Use the following table to compare Fabric’s search and filtering tools. Use global search for broad, cross-workspace discovery (names, creators, tags), the local keyword filter to narrow the current view, sorting to quickly order columns, and the Filters panel for precise refinements by type, time, or owner.

| Feature | How to use | Notes / examples |
|---------|------------|------------------|
| Global search | Use the search box in the top bar to find items by name, title, creator, tag, or workspace. Results show only content you can access. | Examples: part of a report name; a colleague’s name to see items they shared; a tag (if tagging is enabled)—see [Tags overview](../governance/tags-overview.md). Tag results appear only if your organization enables tagging. |
| Local keyword filtering | Use the **Filter by keyword** field on canvases (for example, Browse) to narrow the current list without leaving the page. | Applies only to the current view. |
| Sorting | Select a column header (for example, Name or Refreshed) to sort; select again to toggle direction. | Not all columns are sortable—hover to confirm. |
| Filters panel | Select **Filter** (upper-right of a content list) to refine results by type, time, and owner. | Examples: Type (report, notebook), Time (recently accessed or modified), Owner (creator). |

### Considerations

> [!NOTE]
> Global search uses Azure AI Search. It isn’t available in sovereign clouds or regions where Azure AI Search isn’t supported. Tag and community content visibility depend on feature enablement. See [Azure AI Search regions](/azure/search/search-region-support).

## Use the help pane effectively

Select the **?** icon to open the contextual Help pane:

- Feature-aware view: Shows topics and community discussions relevant to the current screen.
- Forum topics: Community posts tied to on-screen features (shown when the tenant enables forum integration).
- Other resources: Support and feedback links.
- Search box: Enter keywords to search documentation and forums; use the dropdown to refine.

Keep it docked as you work or close it to reclaim space. Use the back arrow to return to the default view.

## Personalize via settings

Select the gear icon in the top bar to open settings. Links shown depend on your role (for example, admin vs contributor) and enabled preview features.

| Section | What you can do |
|---------|------------------|
| Preferences | Set display language, personalize UI behavior, manage notifications, configure item settings (per item type), enable developer mode (where applicable). |
| Resources and extensions | Manage personal and group storage, Power BI item settings, connections and gateways, embed codes, Azure Analysis Services migrations.|
| Governance and insights | Access the Admin portal (if permitted) and Microsoft Purview hub (preview) for governance and compliance insights. |

Learn more: [Admin portal](../admin/admin-center.md) • [Microsoft Purview hub (preview)](../governance/use-microsoft-purview-hub.md)

## Manage your account, notifications, and feedback

- Account manager (profile photo): View license info, trial status, organizational context
- Notifications: Alerts, system messages, subscriptions
- Feedback: Send product feedback to Microsoft
- Settings: Open the settings pane
- Help (?): Open contextual help and search

For licensing guidance, see [Licenses](../enterprise/licenses.md). For trial info, see [Start a Fabric trial](fabric-trial.md).

## Get support

If self-help doesn't solve your problem:

- Open the **Help** pane and scroll to **Support links**.
- Ask the community in the forums.
- If entitled, open a support ticket. See [Support options](/power-bi/support/service-support-options).

## Tips to stay efficient

- Pin only the nav pane buttons you use often. Use right-click or the ellipsis (…) menu > **Unpin** / **Pin** (UI may vary).
- Use tabs and **Object explorer** (preview) to reduce context switching.
- Use global search for infrequently used items; refine with filters.
- Keep **Help** open while you learn a new workload.
- Review settings regularly as your workflow evolves.

## Related content

- [Workspaces](workspaces.md)  
- [Task flows in Microsoft Fabric](task-flow-overview.md)  
- [Get in-product help](fabric-help-pane.md)  
- [Workloads in Fabric](../workload-development-kit/more-workloads-add.md)  
- [Start a Fabric trial](fabric-trial.md)  
- [Licenses](../enterprise/licenses.md)
