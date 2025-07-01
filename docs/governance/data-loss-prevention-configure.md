---
title: "Configure data loss prevention policies for Microsoft Fabric"
description: "Learn how to configure Purview data loss prevention policies for Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 03/31/2025

#customer intent: As a Purview compliance administrator, I want to learn how to configure DLP policies for Fabric so that my organization can detect leakage of sensitive data from Fabric items.

---

# Configure data loss prevention policies for Fabric

Data loss prevention policies for Fabric help organizations protect their sensitive data by detecting upload of sensitive data in supported item types. When a policy violation occurs, data owners can see this indicated, and alerts can be sent to data owners and security admins, and violations can be investigated. For more information, see [Get started with Data loss prevention policies for Fabric and Power BI](/purview/dlp-powerbi-get-started).

This article describes how to configure Purview data loss prevention (DLP) policies for Fabric. The target audience is compliance administrators who are responsible for data loss prevention in their organization.

## Prerequisites

The account you use to create DLP policies must be a member of one of these role groups

* Compliance administrator
* Compliance data administrator
* Information Protection
* Information Protection Admin
* Security administrator


### SKU/subscriptions licensing

Before you get started with DLP for Fabric and Power BI, you should confirm your [Microsoft 365 subscription](https://www.microsoft.com/microsoft-365/compare-microsoft-365-enterprise-plans?rtc=1). The admin account that sets up the DLP rules must be assigned one of the following licenses:

* Microsoft 365 E5
* Microsoft 365 E5 Compliance
* Microsoft 365 E5 Information Protection & Governance
* Purview capacities

## Configure a DLP policy for Fabric

1. Open the [data loss prevention policies page](https://purview.microsoft.com/datalossprevention/policies) in the Microsoft Purview portal and select **+ Create policy**.

    :::image type="content" source="./media/data-loss-prevention-configure/create-policy.png" alt-text="Screenshot of D L P create policy page.":::

    > [!NOTE]
    > The **+ Create policy** option is only available if the prerequistes have been met.

1. Choose the **Custom** category and then the **Custom policy** template. When done, select **Next**.
    
    :::image type="content" source="./media/data-loss-prevention-configure/choose-custom-policy.png" alt-text="Screenshot of D L P choose custom policy page.":::

    > [!NOTE]
    > No other categories or templates are currently supported.

1. Name the policy and provide a meaningful description. When done, select **Next**.

    :::image type="content" source="./media/data-loss-prevention-configure/name-policy.png" alt-text="Screenshot of D L P policy name description section.":::

1. Select **Next** when you get to the Assign admin units page. Admin units are not supported for DLP in Fabric and Power BI.

    :::image type="content" source="./media/data-loss-prevention-configure/admin-units.png" alt-text="Screenshot of D L P policy admin units section.":::

1. Select **Fabric and Power BI workspaces** as the location for the DLP policy. All other locations will be disabled, as DLP policies for Fabric and Power BI only support this location.

    :::image type="content" source="./media/data-loss-prevention-configure/choose-location.png" alt-text="Screenshot of D L P choose location page.":::

    By default the policy will apply to all workspaces. However, you can specify particular workspaces to include in the policy as well as workspaces to exclude from the policy. To specify specific workspaces for inclusion or exclusion, select **Edit**.
    
    >[!NOTE]
    > DLP actions are supported only for workspaces hosted in Fabric or Premium capacities.
 
    After you've enabled Fabric and Power BI as the DLP location for the policy and chosen which workspaces the policy will apply to, select **Next**.

1. The **Define policy settings** page appears. Choose **Create or customize advanced DLP rules** to begin defining your policy.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-create-advanced-rule.png" alt-text="Screenshot of D L P create advanced rule page.":::
 
    When done, select **Next**.

1. On the **Customize advanced DLP rules** page, you can either start creating a new rule or choose an existing rule to edit. Select **Create rule**.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-create-rule.png" alt-text="Screenshot of D L P create rule page.":::

1. The **Create rule** page appears. On the create rule page, provide a name and description for the rule, and then configure the other sections, which are described following the image below.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-create-rule-form.png" alt-text="Screenshot of D L P create rule form.":::
 
## Conditions

In the condition section, you define the conditions under which the policy will apply to [supported item types](/purview/dlp-powerbi-get-started#supported-item-types). Conditions are created in groups. Groups make it possible to construct complex conditions.

1. Open the conditions section. Choose **Add condition** if you want to create a simple or complex condition, or **Add group** if you want to start creating a complex condition.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-add-conditions-content-contains.png" alt-text="Screenshot of D L P add conditions content contains section.":::

    For more information about using the condition builder, see [Complex rule design](/microsoft-365/compliance/dlp-policy-design#complex-rule-design).

1. If you chose **Add condition**, next choose **Content contains**, then **Add**, and then either **Sensitive info types** or **Sensitivity labels**.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-add-conditions.png" alt-text="Screenshot of D L P add conditions section.":::

    If you started with **Add group**, you'll eventually get to **Add condition**, after which you continue as described above.
 
    When you choose either **Sensitive info types** or **Sensitivity labels**, you'll be able to choose the particular sensitivity labels or sensitive info types you want to detect from a list that will appear in a sidebar.

    :::image type="content" border="true" source="./media/data-loss-prevention-configure/purview-dlp-sensitivity-labels-types.png" alt-text="Screenshot of sensitivity-label and sensitive info types choices.":::

    When you select a sensitive info type as a condition, you then need to specify how many instances of that type must be detected in order for the condition to be considered as met. You can specify from 1 to 500 instances. If you want to detect 500 or more unique instances, enter a range of '500' to 'Any'. You also can select the degree of confidence in the matching algorithm. Select the info button next to the confidence level to see the definition of each level.

    :::image type="content" border="true" source="./media/data-loss-prevention-configure/purview-dlp-confidence-level-settings.png" alt-text="Screenshot of confidence level setting for sensitive info types."::: 

    You can add additional sensitivity labels or sensitive info types to the group. To the right of the group name, you can specify **Any of these** or **All of these**. This determines whether matches on all or any of the items in the group is required for the condition to hold. If you specified more than one sensitivity label, you'll only be able to choose **Any of these**, since Fabric and Power BI items can’t have more than one label applied.

    The image below shows a group (Default) that contains two sensitivity label conditions. The logic Any of these means that a match on any one of the sensitivity labels in the group constitutes *true* for that group.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-condition-group.png" alt-text="Screenshot of D L P conditions group section.":::
 
    You can use the **Quick summary** toggle to get the logic of the rule summarized in a sentence.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-condition-quick-summary.png" alt-text="Screenshot of D L P conditions quick summary.":::

    You can create more than one group, and you can control the logic between the groups with **AND** or **OR** logic. 

    The image below shows a rule containing two groups, joined by **OR** logic.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-content-contains.png" alt-text="Screenshot of rule with two groups.":::

    Here's the same rule shown as a quick summary.

    :::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-content-contains-quick-summary.png" alt-text="Screenshot of quick summary of rule with two groups.":::
 
## Actions

If you want the policy to restrict access to items that trigger the policy, expand the **Restrict access or encrypt the content in Microsoft 365 locations** section and select **Block users from receiving email, or accessing shared SharePoint, OneDrive, and Teams files, and Power BI items.**. Then choose whether to block everyone or only people in your organization.

When you enable the restrict access action, [user overrides](#user-overrides) are automatically allowed.

## User notifications

The user notifications section is where you configure your policy tip. Turn on the toggle, select the **Notify users in Office 365 service with a policy tip or email notifications** check box, and then select the **Policy tips** checkbox. Write your policy tip in the text box that appears.

:::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-user-notification.png" alt-text="Screenshot of D L P user notification section.":::
 
## User overrides
 
If you enabled user notifications and selected the **Notify users in Office 365 service with a policy tip** checkbox, owners of items that have DLP policy violations (owners - that is, users with an Admin or Member role in the workspace where the item is located) will be able to respond to violations on the **[Data loss prevention policies side pane](./data-loss-prevention-respond.md)**, which they can display from a button or a link on the policy tip. The selection of response options they have depends on the choices you make in the **User overrides** section.

:::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-user-overrides-section.png" alt-text="Screenshot of D L P user overrides section.":::

The options are described below.

* **Allow overrides from M365 services. Allows users in Power BI, Exchange, SharePoint, OneDrive, and Teams to override policy restrictions** (automatically selected when you've enabled user notifications and selected the **Notify users in Office 365 service with a policy tip** checkbox): Users will be able to either report the issue as a false positive or override the policy.

* **Require a business justification to override**: Users will be able to either report the issue as a false positive or override the policy. If they choose to override, they'll need to provide a business justification.

* **Override the rule automatically if they report it as a false positive**: Users will be able to report the issue as a false positive and automatically override the policy, or they can just override the policy without reporting it as a false positive.

* If you select both **Override the rule automatically if they report it as a false positive** and **Require a business justification to override**, users will be able to report the issue as a false positive and automatically override the policy, or they can just override the policy without reporting it as a false positive, but they'll have to provide a business justification.

Overriding a policy means that from now on the policy will no longer check the item for sensitive data.

Reporting an issue as a false positive means that the data owner believes that the policy has mistakenly identified non-sensitive data as sensitive. You can use false positives to fine tune your rules.

Any action the user takes is logged for reporting.

## Incident reports

Assign a severity level that will be shown in alerts generated from this policy. Enable (default) or disable email notification to admins, specify users or groups for email notification, and configure the details about when notification will occur.

:::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-incidence-report.png" alt-text="Screenshot of D L P incident report section.":::
   
## Additional options

:::image type="content" source="./media/data-loss-prevention-configure/purview-dlp-additional-options.png" alt-text="Screenshot of D L P additional options section.":::


## Considerations and limitations

* DLP policy templates aren't yet supported for Fabric DLP policies. When creating a DLP policy for Fabric, choose the *custom policy* option.
* Fabric DLP policy rules currently support sensitivity labels and sensitive info types as conditions.


## Related content

* [Create and Deploy data loss prevention policies](/purview/dlp-create-deploy-policy)
* [Get started with Data loss prevention policies for Fabric and Power BI](/purview/dlp-powerbi-get-started)
* [Respond to a DLP policy violation](./data-loss-prevention-respond.md)
* [Monitor DLP policy violations](./data-loss-prevention-monitor.md)