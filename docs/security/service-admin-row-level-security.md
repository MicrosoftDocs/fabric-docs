---
title: Row-level security (RLS) with Power BI
description: How to configure row-level security for imported semantic models, and DirectQuery, within the Power BI service.
author: billmath
ms.author: billmath
ms.topic: how-to
ms.date: 05/13/2026
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

- **Static RLS** - Restricts data to a fixed value:

  ```dax
  [Region] = "West"
  ```

- **Dynamic RLS with UPN** ΓÇö Restricts data based on the signed-in user's email address:

  ```dax
  [UserEmail] = USERPRINCIPALNAME()
  ```

- **Dynamic RLS with USERNAME** ΓÇö Restricts data based on the user's domain and username:

  ```dax
  [UserDomain] = USERNAME()
  ```

- **Dynamic RLS with CUSTOMDATA** ΓÇö Restricts data based on a custom string passed from the embedding application:

  ```dax
  [AppRole] = CUSTOMDATA()
  ```

  > [!NOTE]
  > `CUSTOMDATA()` is primarily used in embedded scenarios where the application passes a custom effective identity string via the Power BI REST API.

Dynamic RLS is the most common approach because it allows a single role definition to filter data differently for each user, based on a user-mapping table in your data model.

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
- [Microsoft Entra Security Group](/azure/active-directory/fundamentals/groups-view-azure-portal) ΓÇö If the security group contains external B2B guest users, see [Considerations for external (B2B guest) users](#considerations-for-external-b2b-guest-users) for known limitations.

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

If you share Power BI content with external users through [Microsoft Entra B2B](/azure/active-directory/external-identities/what-is-b2b), be aware of the following considerations for RLS.

### Entra security groups with external members

Microsoft Entra security groups that contain external B2B guest users might not work as expected when used for RLS role membership. In some configurations — particularly when the external user has a guest-type account (rather than a member-type account) — the guest's group membership isn't correctly evaluated by the Power BI service when enforcing RLS filters.

**Recommended workaround:** Instead of adding external users to RLS roles through Entra security groups, add them directly to the role by email address. The email address is resolved to the user's B2B account. This ensures their identity is correctly matched when RLS filters are applied.  For more information see [Manage Role Membership](#manage-role-membership).

For organizations with many external users, consider using dynamic RLS with `USERPRINCIPALNAME()` instead of group-based role membership. This approach evaluates each user's identity individually and avoids the group membership resolution issue entirely.

> [!IMPORTANT]
> If you currently use Microsoft Entra security groups for RLS role membership and those groups include B2B guest users, verify that the guest users see the correct filtered data. If they don't, add the external users directly to the RLS role by email address.

> [!NOTE]
> The exact scope of this limitation may vary depending on your Microsoft Entra ID configuration and the type of B2B guest invitation used. Always test with actual guest user accounts before relying on group-based RLS for external access.

For more information on sharing content with external users, see [Distribute Power BI content to external guest users with Microsoft Entra B2B](/power-bi/guidance/whitepaper-azure-b2b-power-bi).

If the issue persists after applying the workaround, see [Troubleshooting: External guest sees no data](#troubleshooting-external-guest-sees-no-data) for additional diagnostic steps.

### UPN resolution for B2B guests

When an external B2B guest user accesses a Power BI report, the `USERPRINCIPALNAME()` DAX function typically returns an email-like identifier (for example, `user@partner.com`). In some configurations, it might return a guest UPN in the `#EXT#` format (for example, `user_partner.com#EXT#@yourtenant.onmicrosoft.com`).

This distinction matters for dynamic RLS. If your user-mapping table stores a different identifier format than what `USERPRINCIPALNAME()` returns, the filter expression won't match, and the guest user might see no data or incorrect data.

### USERNAME() behavior for B2B guests

The `USERNAME()` DAX function returns the user's domain\username identifier. For B2B guest users, this function typically often returns a UPN-like identifier similar to USERPRINCIPALNAME(), depending on configuration (for example, `user@partner.com`) rather than a domain\username format. Because `USERNAME()` and `USERPRINCIPALNAME()` often return the same value for B2B guests, most implementations use `USERPRINCIPALNAME()` for consistency.

> [!TIP]
> If your existing dynamic RLS uses `USERNAME()`, verify what value it returns for guest users in your environment before sharing content externally. You can check by adding a card visual displaying `USERNAME()` in a test report.
**Recommended approach:** Store and consistently use the same identifier format in your user-mapping table as the value returned by `USERPRINCIPALNAME()`. In most cases, using email addresses simplifies management:


```dax
[UserEmail] = USERPRINCIPALNAME()
```

Where the `UserEmail` column contains email addresses like `user@partner.com` for both internal and external users.

> [!NOTE]
> The value returned by `USERPRINCIPALNAME()` is the user's sign-in identifier (UPN), not necessarily their email address. For most users these are the same, but they can differ (for example, when a user's email is an alias). When building your user-mapping table, use the value returned by `USERPRINCIPALNAME()` rather than the `mail` attribute from Microsoft Entra ID.

> [!IMPORTANT]
> If you use dynamic RLS with `USERPRINCIPALNAME()`, always test with actual external guest users. The [Test as role](#validating-the-role-within-the-power-bi-service) feature uses your own identity and won't reveal external user UPN resolution issues.

> [!NOTE]
> UPN resolution behavior for B2B guests can vary depending on your Microsoft Entra ID configuration, such as cross-tenant access settings and guest user type. Always validate the behavior in your specific environment.

### Troubleshooting: External guest sees no data

If a B2B guest user sees an empty report or receives a "no data" message, follow these steps:

1. **Verify the returned UPN format** - Create a test measure using `USERPRINCIPALNAME()` and display it in a card visual. Have the guest user view the report to see the actual value returned.
2. **Check the user-mapping table** - Confirm the mapping table contains a row with a value that exactly matches what `USERPRINCIPALNAME()` returns for that guest.
3. **Check for case sensitivity** - DAX string comparisons are case-insensitive by default, but verify your data source hasn't introduced case-sensitive values.
4. **Review cross-tenant access settings** - If your organization uses [cross-tenant access policies](/azure/active-directory/external-identities/cross-tenant-access-overview), these can affect which UPN format is presented to Power BI.
5. **Test with the actual guest user** - The **Test as role** feature uses your own identity. Always validate with the real external guest account.
6. **Verify role assignment** — If a guest user sees *more* data than expected, confirm they're assigned to an RLS role. Users who aren't assigned to any RLS role typically see no data (empty results), because RLS is enforced but no matching role is applied.

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