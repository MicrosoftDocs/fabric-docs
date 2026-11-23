---
title: Share a Fabric app
description: Learn how to share a Fabric app, review access to related items, handle access requests, and help users find and use your app.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 11/07/2026
ai-usage: ai-assisted
---

# Share a Fabric app

Share a Fabric app with people who need to use it. The sharing experience checks your authority to grant access to the app and reviews its lineage to identify underlying Fabric items. Depending on how the app authenticates to those items, users might also need permissions on them.

App access and data access aren't the same. A user might be able to open an app but not perform an operation that requires access to a related item. Before sharing, review the app's authentication configuration and the permissions its users need.

For the general item permission model and access management guidance, see [Share items in Microsoft Fabric](../fundamentals/share-items.md#item-permission-model). Fabric app sharing also considers related items and the app's authentication configuration. Use the app-specific steps in this article rather than assuming the general sharing-link options apply.

## Before you share

You need permission to share the Fabric app. Granting access to a related item also requires authority to share that item. The sharing experience checks these permissions and identifies what you can and can't share.

Review these access requirements:

- **Fabric item licensing:** A Fabric (Free) license is sufficient to share or use the Fabric app item when its workspace has supported Fabric-enabled capacity and you have the required permissions. Power BI Pro isn't a baseline requirement for the Fabric app item itself. Check licensing separately for Power BI dependencies that users access through delegated authentication. Sharing or approving an access request doesn't replace those requirements. See [Share an app and access its dependencies](licensing.md#share-an-app-and-access-its-dependencies).
- **Fabric app access:** Users need permission to run and interact with the app. See [Fabric app item permissions](overview.md#item-permissions).
- **Related item access:** For delegated authentication, each user needs access to the source items and permissions for the operations the app performs.
- **App data policies:** Sharing doesn't replace authorization rules implemented in the app. See [Define data permissions](data-permissions.md).

## How authentication affects sharing

The sharing experience traverses the app's lineage to identify underlying items. It uses the authentication mode for access to those items to determine which ones to present for sharing.

| Authentication mode | What sharing presents | Who needs source access |
| --- | --- | --- |
| Application authentication | Items accessed with application authentication aren't presented for granting access to app users. | The app identity needs the source permissions. Users don't need their own grants to those items to use that application-authenticated connection. |
| Delegated authentication | Related items accessed on behalf of the signed-in user are presented for review. | Each user needs access and the permissions required for the operation. |

Application authentication doesn't make the source data public. The app controls what it exposes, and users still need the applicable app access and app data permissions.

An app can use different authentication modes for different connections. Review the deployed connector configuration rather than assuming that every connection uses the same mode. For configuration details, supported modes, and source permission requirements, see [Connect Fabric Apps to Fabric data](connectors.md#choose-the-source-identity).

## Share the app and review related items

1. Open the Fabric app in the service and select **Share**.
1. Specify the people you want to grant access to.
1. Review the app permissions and the related items presented by the sharing experience. Related items can include semantic models, lakehouses, warehouses, and SQL databases in Fabric that aren't child items of the app.
1. Review the available permissions for each item. Baseline permissions inherent to access are preselected. Select any additional permissions needed for the operations users perform, without granting more access than they need.
1. Review items you can't share and items you choose not to share. If recipients don't already have the required access, arrange for someone with sharing authority on those items to grant it.
1. Choose whether to send an email notification, and then complete sharing.

The following example shows a sharing dialog with a related semantic model and the email notification option. The permissions available depend on the related item.

:::image type="content" source="media/share-app/share-related-items.png" alt-text="Screenshot of the Fabric app sharing dialog with an empty recipient field, email notification options, and expanded related semantic model permissions." lightbox="media/share-app/share-related-items.png":::

The sharing experience indicates what you're authorized to share, what you can't share, and what you leave unshared. Completing sharing for the app doesn't establish that recipients can use every data-dependent function.

For the app and related items selected for sharing, Fabric grants direct access with the selected permissions. Recipients might already have access through an existing direct grant or another access path. Review their effective permissions instead of assuming that a new app share is their only source of access.

If you choose to send a notification, recipients receive an email with a link to the Fabric app in the service. This link opens the app within the Fabric or Power BI experience, rather than directly at its separate deployed URL.

### Understand direct access before you remove it

> [!WARNING]
> Direct access isn't scoped to the Fabric app that prompted the share. A user might already have direct access to a related item for a report, notebook, or another app. Removing that direct access can remove the user's access through that grant for all those uses, not just this Fabric app.

Review the user's existing access and other uses of an item before removing a direct grant. Don't treat related item permissions as an app-specific bundle that you can safely remove together. Other access paths might still give the user access, so removing one direct grant also doesn't prove that all access is revoked.

## Send a link to someone who already has access

To send a service-side link to the app, copy the URL from the browser's address bar while the app is open in Fabric or Power BI. You can also use **Share** again and choose to send a notification.

A URL doesn't grant access by itself. If the recipient doesn't have access, they need to request it or have someone authorized to share the app grant it.

For an app hosted outside the service, distinguish its deployed URL from the service-side URL. Hosted content has its own configuration, including whether the content is protected. See [Configure access to hosted assets](hosting.md#configure-access-to-hosted-assets).

## Request access to an app

When someone opens an app URL that requires app access and they don't have that access, an access request experience appears. They can submit a request to the app owner or creator. Access requests work both when users open the app within Fabric or Power BI and when they open its unique deployed URL outside the service.

The following example shows the request prompt when a user doesn't have access.

:::image type="content" source="media/share-app/request-access.png" alt-text="Screenshot of an app access request prompt with Send request and Cancel buttons.":::

The app owner or creator receives a notification and can review pending requests, then approve or decline them. Approval uses the sharing experience: review the app permissions and related items rather than treating approval as a grant to every underlying item.

If a request is approved but the app still can't complete a data operation, check delegated source permissions and app data policies. App access approval alone doesn't resolve missing permissions on an item that wasn't shared.

## Find apps in Fabric and Power BI

Open the **Apps** page in either Fabric or Power BI to find Fabric apps you have access to. The page brings together different app types, but they serve different purposes:

Use the page's tabs and filters to find an app. The following screenshot highlights the tabs on the new Apps page in Power BI with a green box.

:::image type="content" source="media/share-app/apps-page-controls.png" alt-text="Screenshot of the new Apps page in Power BI with a green box highlighting the All, Recent, Favorites, and Endorsed in your org tabs." lightbox="media/share-app/apps-page-controls.png":::

| App type | Purpose | Learn more |
| --- | --- | --- |
| Fabric app | A data-driven application with code, hosting, authentication, and connections to Fabric data. | [What is Fabric Apps?](overview.md) |
| Workspace app | A published package of Power BI content for an audience. | [Apps in Power BI](/power-bi/explore-reports/end-user-apps) |
| Org app | A Fabric item that packages content for distribution and consumption within your organization. | [Get started with org apps](/power-bi/explore-reports/org-app-items) |

Check the **Type** column to distinguish **App**, **Org app**, and **Workspace app** entries. The following screenshot highlights the column with a green box.

:::image type="content" source="media/share-app/apps-page-types.png" alt-text="Screenshot of the Apps page with a green box highlighting the Type column showing App, Org app, and Workspace app labels." lightbox="media/share-app/apps-page-types.png":::

For navigation and app discovery, see [The new Apps page](/power-bi/explore-reports/end-user-app-view#the-new-apps-page).

### Distribute a Fabric app through an org app

Direct sharing isn't the only way to distribute a Fabric app. You can also include it in an org app. Use the org app documentation to understand content organization, audiences, and distribution.

Keep the Fabric app's access requirements in mind when choosing this approach. Users still need the permissions required by the app's authentication modes and data operations. For more information, see [Get started with org apps](/power-bi/explore-reports/org-app-items).

## Considerations and limitations

- **Links and notifications:** Copy the address-bar URL to share a service-side link, or send a notification through **Share**. Don't assume the notification contains the separate deployed app URL.
- **Application authentication:** The sharing experience doesn't present application-authenticated source items for per-user grants. Check the app identity's source permissions and the app's data policies if a connection fails.
- **Delegated authentication:** An unshared related item can prevent a function from working even when the app opens. Resolve the user's access to that item instead of repeatedly sharing only the app.
- **Lakehouse access:** For delegated access to a lakehouse through its SQL analytics endpoint, app sharing grants permissions on the endpoint but doesn't grant **Read** permission on the parent lakehouse. As a workaround, someone with sharing authority on the parent lakehouse must separately grant **Read** permission to app recipients who don't already have it.
- **Rayfin versions and deployed configuration:** Authentication defaults and supported configuration options can differ by CLI and SDK version. Existing connector declarations aren't automatically migrated to a newer default. Review the deployed authentication mode, keep connector packages aligned with the CLI, and follow the version-specific guidance in [Connect Fabric Apps to Fabric data](connectors.md).
- **Generated code and variable behavior:** A failed prompt-driven operation, inconsistent output, or an app runtime error doesn't by itself prove an access problem. Use a repeatable operation with the same signed-in user and inspect the actual authentication, authorization, or runtime error before changing permissions. Granting broader access isn't a fix for unrelated generated-code or runtime faults.
- **Inside and outside the service:** Test both the service-side experience and the separate deployed app when you support both. Sign-in, hosting, redirect configuration, and app code affect these experiences independently of direct item grants.
- **Managed apps and companion experiences:** A managed Fabric app can have child services, including a SQL database in Fabric. A separate frontend or companion application can depend on that managed app, but its deployment, hosting, and authentication are configured separately. A Fabric-side access change can affect a companion application's functionality without changing that application's own configuration. Don't assume that sharing a Fabric app manages every companion experience or grants direct access to all child items.

For sign-in, hosting, and deployment diagnostics, see [Troubleshoot Fabric Apps](troubleshooting.md).

## Related content

- [Connect Fabric Apps to Fabric data](connectors.md).
- [Define data permissions](data-permissions.md).
- [Configure hosting and access](hosting.md).
- [Get started with org apps](/power-bi/explore-reports/org-app-items).
