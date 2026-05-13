---
title: Include file
description: Include file
author: billmath
ms.topic: include
ms.date: 09/20/2024
ms.author: billmath
---
## Considerations and limitations

You can see the current limitations for row-level security on cloud models here:

* If you previously defined roles and rules in the Power BI service, you must re-create them in Power BI Desktop.
* You can define RLS only on the semantic models created with Power BI Desktop. If you want to enable RLS for semantic models created with Excel, you must convert your files into Power BI Desktop (PBIX) files first. [Learn more](/power-bi/connect-data/desktop-import-excel-workbooks).
* Service principals can't be added to an RLS role. Accordingly, RLS isn't applied for apps using a service principal as the final effective identity.
* Only Import and DirectQuery connections are supported. Live connections to Analysis Services are handled in the on-premises model.
* With RLS enabled, using the USERELATIONSHIP() function in DAX queries and measures might cause unexpected errors. To work around this issue, redesign your DAX expressions to avoid USERELATIONSHIP() and use model-level relationships or other DAX patterns instead.
* The Test as role/View as role feature doesn't work for DirectQuery models with single sign-on (SSO) enabled.
* The Test as role/view as role feature shows only reports from semantic models workspace.
* The Test as role/View as role feature doesn't work for paginated reports.
* The token-based identity only works for DirectQuery models on a capacity connected to an Azure SQL Database that's configured to allow Microsoft Entra authentication. For more information, see [Embed a report with token-based identity](/power-bi/developer/embedded/rls-sso)
* The 'IdentityBlob' parameter is an OAuth 2.0 access token for Azure SQL and is only supported for datasets with a DirectQuery connection to Azure SQL. The mechanism itself is Azure-SQL-specific: The blob *is* a Microsoft Entra access token scoped to `https://database.windows.net/.default`. There's no equivalent token-passing mechanism for other data sources in App-owns-data embedding. For more information, see [REST API reference for GenerateToken](/rest/api/power-bi/embed-token/generate-token).
* 

## Considerations and limitations for dynamic RLS

When you use dynamic row-level security (RLS) with DAX functions like `USERPRINCIPALNAME()`, `USERNAME()`, or `CUSTOMDATA()`, be aware of the following considerations.

### B2B cross-tenant scenarios

In Microsoft Entra B2B (business-to-business) scenarios, `USERPRINCIPALNAME()` returns the guest user's UPN as resolved by the **inviting (host) tenant**, not the user's home tenant UPN. Depending on your Microsoft Entra ID configuration and cross-tenant access policies, this value might be in the `#EXT#` format, for example:

`user_partner.com#EXT#@yourtenant.onmicrosoft.com`

If your user-mapping table stores identifiers in a different format than what `USERPRINCIPALNAME()` returns for guest users, the RLS filter expression won't match and the guest sees no data or incorrect data. Always verify the exact value returned by `USERPRINCIPALNAME()` for external users in your environment.

> [!TIP]
> Create a test measure using `USERPRINCIPALNAME()` and display it in a card visual. Have external guest users view the report to confirm the returned value matches your user-mapping table. This simple test can prevent hours of debugging mismatched identity values.

### Test as role limitations with dynamic RLS

The **Test as role** feature in the Power BI service uses your own identity when evaluating dynamic RLS expressions. This means `USERPRINCIPALNAME()` returns **your** UPN, not that of the user you're trying to simulate. You can't use **Test as role** to see what a specific B2B guest user or service principal would see.

To validate dynamic RLS for external users, sign in as the actual guest user and view the report directly. This is the only way to confirm that `USERPRINCIPALNAME()` returns the expected value and that RLS filters match correctly for that user.

### Embedded scenarios with service principals

When a report is accessed through an embedded application that authenticates with a service principal, `USERPRINCIPALNAME()` and `USERNAME()` return the service principal's application ID or an empty string—not an end user's identity. This means dynamic RLS filters based on these functions won't filter data per user in embedded scenarios.

To apply per-user RLS in embedded scenarios, use the **effective identity** feature of the Power BI REST API. Pass the `EffectiveIdentity` object with the appropriate username and roles when generating an embed token. If your RLS rules use `CUSTOMDATA()`, pass the custom data string through `EffectiveIdentity.CustomData`.

For more information, see [RLS for Embedded scenarios for ISVs](/power-bi/developer/embedded/embedded-row-level-security).

> [!IMPORTANT]
> When embedding with a service principal, always test with actual embed tokens that include `EffectiveIdentity` to verify that RLS filters are applied correctly. The **Test as role** feature in the Power BI service does not simulate embedded authentication flows.


Keep in mind that if a Power BI report references a row with RLS configured then the same message displays as for a deleted or non-existing field. To these users, it looks like the report is broken.
