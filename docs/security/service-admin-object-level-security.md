---
title: Object-Level Security (OLS) with Power BI
description: How to configure object-level security for imported semantic models, within the Power BI service.
author: billmath
ms.author: billmath
ms.reviewer:
ms.topic: how-to
ms.date: 06/10/2025
#customer intent: As a developer, I want to learn how to configure object-level security for imported semantic models, within the Power BI service, so that I can manage my content lifecycle.
---

# Object-level security (OLS)

Object-level security (OLS) enables model authors to secure specific tables or columns from report viewers. For example, a column that includes personal data can be restricted so that only certain viewers can see and interact with it. In addition, you can also restrict object names and metadata. This added layer of security prevents users without the appropriate access levels from discovering business-critical or sensitive personal information like employee or financial records. For viewers that don’t have the required permission, it's as if the secured tables or columns don't exist.  

## Create a report that uses OLS

Like row-level security (RLS), OLS is also defined within model roles. Currently, you can't create OLS definitions natively in Power BI Desktop.
To create roles on **Power BI Desktop** semantic models, use [external tools](/power-bi/transform-model/desktop-external-tools) such as [Tabular Editor](https://tabulareditor.com).  

### Configure object-level security using tabular editor

1. In Power BI Desktop, [create the model](service-admin-row-level-security.md#define-roles-and-rules-in-power-bi-desktop) and roles that define your OLS rules.

1. On the **External tools** ribbon, select **Tabular Editor**. If you don’t see the Tabular Editor button, install the [program](https://tabulareditor.com). When open, Tabular Editor automatically connects to your model.

   :::image type="content" source="./media/service-admin-object-level-security/external-tools.png" alt-text="Screenshot of External tools Menu.":::

1. In the **Model** view, select the dropdown menu under **Roles**. The roles you created in step 1 appear.

   :::image type="content" source="./media/service-admin-object-level-security/display-roles.png" alt-text="Screenshot of roles names being displayed under roles folder in model view.":::

1. Select the role you want to enable an OLS definition for, and expand the **Table Permissions**.

   :::image type="content" source="./media/service-admin-object-level-security/open-permissions.png" alt-text="Screenshot showing where to access the table permissions for OLS.":::

1. Set the permissions for the table or column to *None* or *Read*.

   **None**: OLS is enforced and the table or column is hidden from that role.
   **Read**: The table or column is visible to that role.

   ### [To secure the **whole table**](#tab/table)

   Set categories under *Table Permissions* to *None*.

     :::image type="content" source="./media/service-admin-object-level-security/define-rule-table.png" alt-text="Screenshot of setting OLS rule to none for the entire table.":::

   ### [To secure a **specific column**](#tab/column)

   Select the category and set the *Object Level Security* to *None*.

    :::image type="content" source="./media/service-admin-object-level-security/define-rule-column.png" alt-text="Screenshot of setting OLS rule to none for the address column." lightbox="./media/service-admin-object-level-security/define-rule-column.png":::
  
    ---

1. After you define OLS for the roles, save your changes.

   :::image type="content" source="./media/service-admin-object-level-security/save-roles.png" alt-text="Screenshot of saving role definitions.":::

1. In Power BI Desktop, publish your semantic model to the Power BI service.

1. In the Power BI service, navigate to the **Security** page by selecting the **More options (...)** menu for the semantic model and assign members or groups to their appropriate roles.

The OLS rules are now defined. Users without the required permission receive a message that the field can't be found for all report visuals using that field.

:::image type="content" source="./media/service-admin-object-level-security/error-message.png" alt-text="Screenshot of error message saying that column cannot be found or may not be used in this expression.":::

## Considerations and limitations

* OLS only applies to *Viewers* in a workspace. Workspace members assigned *Admin*, *Member*, or *Contributor* roles have Edit permission for the semantic model and, therefore, OLS doesn’t apply to them. Read more about [roles in workspaces](/power-bi/collaborate-share/service-roles-new-workspaces).

* Semantic models with OLS configured for one or more table or column objects aren't supported with these Power BI features:

  * Quick insights visualizations
  * Smart narrative visualizations
  * Excel Data Types gallery

* [Other OLS restrictions](/analysis-services/tabular-models/object-level-security#restrictions)

## Related content

* [Object-level security in Azure Analysis Services](/analysis-services/tabular-models/object-level-security)
* [Power BI implementation planning: Report consumer security planning](/power-bi/guidance/powerbi-implementation-planning-security-report-consumer-planning#object-level-security)
* Questions? [Try asking the Power BI Community](https://community.powerbi.com/)
* Suggestions? [Contribute ideas for Power BI improvement](https://ideas.powerbi.com/)
