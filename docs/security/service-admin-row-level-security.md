---
title: Row-level security (RLS) with Power BI
description: How to configure row-level security for imported semantic models, and DirectQuery, within the Power BI service.
author: billmath
ms.author: billmath
ms.topic: how-to
ms.date: 05/05/2026
ms.update-cycle: 180-days
ms.custom: 'sfi-image-nochange'
LocalizationGroup: Administration
ms.collection: ce-skilling-ai-copilot
no-loc: [Copilot]
---

# Row-level security (RLS) with Power BI

Row-level security (RLS) restricts data access for specific users. Filters restrict data at the row level, and you define filters within roles. In the Power BI service, users with access to a workspace have access to semantic models in that workspace. RLS only restricts data access for users with **Viewer** permissions. It doesn't apply to Admins, Members, or Contributors.

To implement RLS, follow this high-level workflow:

1. **Define roles and rules** in Power BI Desktop using DAX filter expressions.
1. **Publish** the semantic model and report to the Power BI service.
1. **Add members** to roles in the Power BI service.
1. **Validate** by using the **Test as role** feature to confirm data filtering works as expected.

You can configure RLS for imported semantic models in Power BI Desktop or the Power BI service. You can also configure RLS on semantic models that are using DirectQuery, such as SQL Server. For Analysis Services or Azure Analysis Services live connections, you configure row-level security in the model, not in Power BI. The security option doesn't show up for live connection semantic models.

> [!NOTE]
> This article covers RLS for Power BI semantic models specifically. For data security in other Fabric items, see [Security in Microsoft Fabric](/fabric/security/security-overview).

> [!NOTE]
> For Direct Lake semantic models in Microsoft Fabric, RLS is supported. However, if a DAX query falls back to DirectQuery mode due to unsupported features, RLS filters still apply but performance characteristics may change. Monitor query fallback behavior in the Fabric capacity metrics app.

[!INCLUDE [include-short-name](../includes/row-level-security-desktop-define-roles.md)]

### Common DAX filter patterns

The following examples show common DAX filter expressions you can use when defining RLS roles:

- **Static RLS** — Restricts data to a fixed value:

  ```dax
  [Region] = "West"
  ```

- **Dynamic RLS with UPN** — Restricts data based on the signed-in user's email address:

  ```dax
  [UserEmail] = USERPRINCIPALNAME()
  ```

- **Dynamic RLS with USERNAME** — Restricts data based on the user's domain and username:

  ```dax
  [UserDomain] = USERNAME()
  ```

- **Dynamic RLS with CUSTOMDATA** — Restricts data based on a custom string passed from the embedding application:

  ```dax
  [AppRole] = CUSTOMDATA()
  ```

  > [!NOTE]
  > `CUSTOMDATA()` is primarily used in embedded scenarios where the application passes a custom effective identity string via the Power BI REST API.

Dynamic RLS is the most common approachbecause it allows a single role definition to filter data differently for each user, based on a user-mapping table in your data model.

### Bi-directional cross-filtering

By default, row-level security filtering uses single-directional filters, whether the relationships are set to single direction or bi-directional.

You can manually enable bi-directional cross-filtering with row-level security by selecting the relationship and checking the **Apply security filter in both directions** checkbox. Select this option when you've also implemented dynamic row-level security at the server level, where row-level security is based on username or login ID. If a table takes part in multiple bi-directional relationships, you can only select this option for one of those relationships.

> [!CAUTION]
> Enabling bi-directional security filtering can negatively impact query performance, especially in models with many relationships or large datasets. Test thoroughly before deploying to production.

For more information, see [Bidirectional cross-filtering using DirectQuery in Power BI](/power-bi/transform-model/desktop-bidirectional-filtering) and the [Securing the Tabular BI Semantic Model](https://download.microsoft.com/download/D/2/0/D20E1C5F-72EA-4505-9F26-FEF9550EFD44/Securing%20the%20Tabular%20BI%20Semantic%20Model.docx) technical article.

:::image type="content" border="true" source="../includes/media/powerbi-security-apply-filter-in-both-directions.png" alt-text="Screenshot of the model relationship setting to apply security filter in both directions.":::

## Manage security on your model

To manage security on your semantic model, open the workspace where you saved your semantic model in Fabric and do the following steps:

1. In Fabric, select the **More options** menu for a semantic model. This menu appears when you hover on a semantic model name.

    :::image type="content" border="true" source="media/service-admin-row-level-security/dataset-canvas-more-options.png" alt-text="Screenshot showing the More options menu in navigation menu.":::

1. Select **Security**.

    :::image type="content" border="true" source="media/service-admin-row-level-security/dataset-more-options-menu.png" alt-text="Screenshot showing the More options menu with Security selected.":::

Security takes you to the Role-Level Security page where you add members to a role you created. Users with **Contributor** or higher workspace roles see the **Security** option and can assign users to a role. Semantic model ownership or Build permission may also be required depending on the scenario.

> [!NOTE]
> You can only manage security on models that have row-level security roles already defined in Power BI Desktop or when editing your data model in the Power BI service. If your model doesn't have roles already defined, you can't manage security in the Power BI service.

## Manage role membership

### Add members

In the Power BI service, you can add a member to the role by typing in the email address or name of the user or security group. You can't add Groups created in Power BI. You can add members [external to your organization](/power-bi/guidance/whitepaper-azure-b2b-power-bi#data-security-for-external-partners). For guidance on how RLS works with external B2B guest users, see [Considerations for external (B2B guest) users](#considerations-for-external-b2b-guest-users).

You can use the following groups to set up row-level security.

- Distribution Group
- Mail-enabled Group
- [Microsoft Entra Security Group](/azure/active-directory/fundamentals/groups-view-azure-portal)

> [!IMPORTANT]
> Microsoft 365 groups aren't supported and can't be added to any roles. Only the group types listed above are supported for RLS role membership.

 :::image type="content" border="true" source="media/service-admin-row-level-security/row-level-security-add-member.png" alt-text="Screenshot showing how to add a member.":::

You can see how many members are part of the role by the number in parentheses next to the role name, or next to Members.

 :::image type="content" border="true" source="media/service-admin-row-level-security/row-level-security-member-count.png" alt-text="Screenshot showing members in role.":::

### Remove members

You can remove members by selecting the X next to their name.

 :::image type="content" border="true" source="media/service-admin-row-level-security/row-level-security-remove-member.png" alt-text="Screenshot showing how to remove a member.":::

## Validating the role within the Power BI service

You can validate that the role you defined works correctly in the Power BI service by testing the role.

1. Select **More options** (...) next to the role.
2. Select **Test as role**.

 :::image type="content" border="true" source="media/service-admin-row-level-security/row-level-security-test-role.png" alt-text="Screenshot of Test as role option.":::

> [!NOTE]
> Dashboards aren't available for testing using the **Test as role** option. You're redirected to the report that was published from Power BI Desktop with this semantic model, if one exists.

When the report loads, verify the following:

- The report displays only data rows that match the filter expression defined in the role.
- Visuals, tables, and charts reflect the filtered data, not the full dataset.
- If you use dynamic RLS, the data corresponds to the identity shown in the **Now viewing as** header.

In the page header, the role being applied is shown. Test other roles, a combination of roles, or a specific person by selecting **Now viewing as**. Here you see important permissions details pertaining to the individual or role being tested. For more information about how permissions interact with RLS, see [RLS user experience](/power-bi/guidance/powerbi-implementation-planning-security-report-consumer-planning#rls-user-experience).

 :::image type="content" border="true" source="media/service-admin-row-level-security/row-level-security-test-role-2.png" alt-text="Screenshot of Now viewing as dropdown for a specific person.":::

Test other reports connected to the semantic model by selecting **Viewing** in the page header. You can only test reports located in the same workspace as your semantic model.

:::image type="content" border="true" source="media/service-admin-row-level-security/row-level-security-test-role-3.png" alt-text="Screenshot of Viewing to select a different report to test.":::

To return to normal viewing, select **Back to Row-Level Security**.

> [!NOTE]
> The Test as role feature doesn't work for DirectQuery models with Single Sign-On (SSO) enabled. Additionally, not all aspects of a report can be validated in the Test as role feature including Q&A visualizations, Quick insights visualizations, and Copilot.

> [!TIP]
> **If Test as role doesn't show the expected results**, try the following:
>
> - Verify the DAX filter expression syntax is correct and references the right column names.
> - Make sure you selected the correct role to test.
> - For dynamic RLS, confirm the user-mapping table contains matching values for `USERPRINCIPALNAME()` or `USERNAME()`.
> - For DirectQuery models with SSO enabled, Test as role isn't supported. Instead, sign in as an actual Viewer-role user to validate data filtering.

[!INCLUDE [include-short-name](../includes/row-level-security-username.md)]

## Using RLS with workspaces in Power BI

If you publish your Power BI Desktop report to a [workspace](/power-bi/collaborate-share/service-new-workspaces) in the Power BI service, the RLS roles are applied to members who are assigned to the **Viewer** role in the workspace. Even if  **Viewers** are given Build permissions to the semantic model, RLS still applies. For example, if Viewers with Build permissions use [Analyze in Excel](/power-bi/collaborate-share/service-analyze-in-excel), their view of the data is restricted by RLS. Workspace members assigned **Admin**, **Member**, or **Contributor** have edit permission for the semantic model and, therefore, RLS doesn't apply to them. If you want RLS to apply to people in a workspace, you can only assign them the **Viewer** role. Read more about [roles in workspaces](/power-bi/collaborate-share/service-roles-new-workspaces).

## Considerations for external (B2B guest) users

If you share Power BI content with external users through [Microsoft Entra B2B](/azure/active-directory/external-identities/what-is-b2b), it's important to understand how RLS interacts with guest user identities.

### UPN resolution for B2B guests


When an external B2B guest user accesses a Power BI report, the `USERPRINCIPALNAME()` DAX function typically returns an email-like identifier (for example, `user@partner.com`). In some configurations, it might return a guest UPN in the `#EXT#` format (for example, `user_partner.com#EXT#@yourtenant.onmicrosoft.com`).

This distinction matters for dynamic RLS. If your user-mapping table stores a different identifier format than what `USERPRINCIPALNAME()` returns, the filter expression won't match, and the guest user might see no data or incorrect data.

**Recommended approach:** Store and consistently use the same identifier format in your user-mapping table as the value returned by `USERPRINCIPALNAME()`. In most cases, using email addresses simplifies management:


```dax
[UserEmail] = USERPRINCIPALNAME()
```

Where the `UserEmail` column contains email addresses like `user@partner.com` for both internal and external users.

> [!IMPORTANT]
> If you use dynamic RLS with `USERPRINCIPALNAME()`, always test with actual external guest users. The **Test as role** feature uses your own identity and won't reveal external user UPN resolution issues.

> [!NOTE]
> UPN resolution behavior for B2B guests can vary depending on your Microsoft Entra ID configuration, such as cross-tenant access settings and guest user type. Always validate the behavior in your specific environment.

For more information on sharing Power BI content with external users, see [Distribute Power BI content to external guest users with Microsoft Entra B2B](/power-bi/guidance/whitepaper-azure-b2b-power-bi).

[!INCLUDE [include-short-name](../includes/row-level-security-limitations.md)]

[!INCLUDE [include-short-name](../includes/row-level-security-faq.md)]

## Related content

- [Restrict data access with row-level security (RLS) for Power BI Desktop](/power-bi/guidance/rls-guidance)
- [Power BI implementation planning: Report consumer security planning](/power-bi/guidance/powerbi-implementation-planning-security-report-consumer-planning#enforce-data-security-based-on-consumer-identity)
- [RLS for Embedded scenarios for ISVs](/power-bi/developer/embedded/embedded-row-level-security)
- [Distribute Power BI content to external guest users with Microsoft Entra B2B](/power-bi/guidance/whitepaper-azure-b2b-power-bi)

Questions? [Try asking the Power BI Community](https://community.powerbi.com/)
Suggestions? [Contribute ideas to improve Power BI](https://ideas.powerbi.com/)
