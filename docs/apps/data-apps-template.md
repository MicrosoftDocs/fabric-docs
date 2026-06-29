---
title: Create an app connected to a semantic model
description: Learn how to use the data app template to create a Fabric App connected to a semantic model, with built-in capabilities for authentication, DAX generation, and visualizations.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 06/02/2026
ai-usage: ai-assisted
---

# Create an app connected to a semantic model

Use the data app template when you want to analyze and visualize data in Fabric Apps. This template contains a set of reusable primitives and agent capabilities that simplify data connectivity, AI-assisted analytics, and visualization generation.

Out of the box, apps created with the template include:
- Fabric authentication and connectivity to semantic models
- Higher-quality DAX (Data Analysis Expressions) generation
- Enterprise-ready visual components designed for analytical applications

> [!NOTE]
> Currently, the Rayfin CLI is the supported way to create apps using the data app template.

## Why use the data app template?

Without these built-in capabilities, an AI agent would need to solve authentication, DAX generation, and visualization design from scratch in every session. That leads to:
- More failures and broken or empty visuals
- Inconsistent chart behavior
- Unnecessary DAX queries during development and runtime

Encoding these patterns directly into the template improves reliability, produces more cohesive visuals aligned with reporting best practices, and reduces query overhead.

## Prerequisites

- Access to Microsoft Fabric.
- A Fabric workspace where you have contributor or admin permissions.
- The Fabric Apps workload enabled in your tenant. See [Enable Fabric app in tenant admin settings](create-app.md#enable-fabric-app-in-tenant-admin-settings).
- The Semantic Model Execute Queries REST API tenant setting enabled. Data apps use the [Execute DAX Queries API](/rest/api/power-bi/datasets/execute-dax-queries) to query semantic models. In the Fabric admin portal, navigate to **Integration settings** and enable the **Semantic Model Execute Queries REST API** setting.
- Build and Read permissions on the semantic model you want to connect to.
- A semantic model hosted on a Fabric or Power BI capacity.

## Steps to get started

To create an app connected to Fabric data using the data app template:

1. Follow steps 1-3 in [Create your first Fabric app](create-app.md) to create a new Fabric app in your workspace.

1. Currently, the Rayfin CLI is the supported way to create apps using the data app template. Use the command below to get started.

   ```bash
   npm create @microsoft/rayfin@latest -- "<appitemname>" --template dataapp --workspace <workspacename>
   ```

1. Open your coding agent and paste the prompt in.

   We recommend either:
   - Opening VS Code and opening the Copilot pane by clicking on the copilot chat icon on the right side of the search box at the top of the VS Code window
   - Opening a terminal and typing `copilot` and then pressing enter.

   Both options open up GitHub Copilot, just in different interfaces (chat vs terminal). Use whichever you prefer!

   :::image type="content" source="media/data-apps-template/vs-code-copilot-chat.png" alt-text="Screenshot showing the GitHub Copilot chat interface in VS Code." lightbox="media/data-apps-template/vs-code-copilot-chat.png":::

1. Prompt Copilot to make your app.

   After you submit the prompt above, Copilot will then scaffold your app for you, and ask you what changes/updates you'd like to make to your app.
   
   This is where you can explain the app you want to build and connect it to a semantic model. Use a share link for the model to indicate which model you want to use (the link contains the workspace ID and model ID).
   
   For example: "Use my sales model at `https://app.powerbi.com/groups/workspace-id/modeling/model-id/modelView` to generate an invoicing application."

1. Deploy your app.

   When you're ready to deploy your app, tell Copilot to deploy it to Fabric with the command `npx rayfin up`.

## Built-in capabilities

The capabilities below represent the areas where we invested in reusable primitives, built-in integrations, and agent-aware workflows to make development smoother out of the box.

Features outside this list are still possible to implement because Fabric Apps are standard web applications built with code, but they might require more iterations or custom engineering. 

### Authentication and semantic model connectivity

When you tell Copilot to connect your app to a semantic model, it just works — you provide a share link from the Power BI Service, and the template handles the rest.

Behind the scenes, authenticating inside the Fabric portal requires a specific token handshake that would be difficult for an agent to build correctly from scratch each time. The template encodes that entire flow, so Copilot doesn't need to solve authentication at all — it simply connects to your data.

As long as users have the same Build and Read permissions they'd need to query the model in Power BI, the app fetches live data automatically with no sign in screen or manual configuration.

### Visuals

The template includes powerful interactivity capabilities like cross-highlighting built in. The following visuals have preconfigured primitives in the data app template:

- Bar charts (vertical and horizontal, grouped, stacked)

- Line charts (with optional markers)

- Area charts

- Scatter charts

- Pie and donut charts

- Heatmaps

- Bubble charts

- Waterfall charts

- Single-value cards (KPI callouts)

- Layered/composite visuals (such as bars with data labels, dual-axis line charts)

You can of course still ask Copilot to generate other visuals, it just might require more iterations to achieve your goals. The list of preconfigured visuals should grow over time.

### Data grid capabilities

The template also includes a built-in data grid component for displaying tabular data. We've preconfigured the following features to work smoothly.

- Column headers derived automatically from semantic model metadata

- Number and date formatting applied per column via format strings

- Sorting

- Scrollable rows with overflow handling

- Light and dark theme support

- Custom cell renderers for advanced scenarios, including:

  - Data bars (progress bar visualization for numeric values)

  - Boolean indicators (check/cross icons)

  - Clickable URLs

  - Image cells with lightbox overlay

  - Multi-field cells (such as combining name and role in one column)

Again, you can still ask Copilot to generate other data grid capabilities, it just might require more iterations to achieve your goals. We'll be adding to this list of capabilities over time.

### Theming

To get your app to follow your specific look and feel, just share your branding or styling requirements with Copilot and it can easily make those updates.

When you tell Copilot to make styling updates — for example, "make it dark blue with rounded corners" or "use a modern sans-serif font" — it updates one central style file, and those changes flow automatically to every part of the app: cards, buttons, charts, data grids, and tooltips.

This centralized approach means the agent doesn't have to restyle each component individually, which avoids the mismatched colors, inconsistent fonts, and broken layouts that typically happen when an agent styles things piece by piece.

### Format strings

When you tell Copilot to display revenue as currency or show percentages in a chart, it defines the formatting once per column, and the template automatically applies it everywhere that column appears — chart axes, tooltips, data labels, and data grid cells.

Without this, the agent would need to format numbers separately in every visual, which leads to inconsistencies (for example, $1,500.50 in one chart and 1500.5 in another) or formatting being missed entirely.

The template ensures that 1500.5 always shows as $1,500.50 and 0.25 always shows as 25%, consistently across the entire app.

### Playwright browser validation

Before you publish your app, we built a step where the agent opens it in a real browser and checks that everything looks right — similar to how you'd manually preview a report, but automated using Playwright browser validation.

The agent verifies that:
- Visuals render correctly
- Charts aren't cut off or squished
- Text is readable
- There are no errors in the background

This catches layout and rendering issues early, before your users see them.

### Known limitations

Currently, Fabric Apps connected to semantic models can't be opened in their own browser window outside the Fabric portal. Selecting the **Open** button results in the visual queries erroring out.

   :::image type="content" source="media/data-apps-template/opportunities-tracker.png" alt-text="Screenshot showing an example opportunities tracker app built with the data app template connected to a semantic model." lightbox="media/data-apps-template/opportunities-tracker.png":::

This is a temporary limitation, and will be addressed in a future release.

## Related content

- [What is Fabric Apps?](overview.md)
- [Create your first app](create-app.md)
- [Execute DAX Queries API](/rest/api/power-bi/datasets/execute-dax-queries)
