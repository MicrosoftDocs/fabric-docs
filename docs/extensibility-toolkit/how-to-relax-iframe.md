---
title: How to relax the iFrame
description: Learn how to relax the iFrame with more properties
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 09/04/2025
---

# How to relax the iFrame

This article describes how you can enable additional iFrame attributes for your editor.

## Prerequisite

When you enable sandbox relaxation in your manifest, the following happens:

1. **AAD Consent Scopes**: Your workload requests two scopes:
   - **Basic Fabric scope** - The standard scope required for any workload to function
   - **Fabric relaxation scope** - Another scope specifically for sandbox relaxation capabilities

2. **User Consent Flow**: When a user first accesses your workload with sandbox relaxation enabled, they're prompted to consent to both scopes. If they deny, the iFrame won't load.

3. **Additional iFrame Capabilities**: Once consent is granted, your iFrames receive these other sandbox attributes:
   - `allow-downloads` - Enables file downloads from your workload
   - `allow-forms` - Enables form submissions to external services
   - `allow-popups` - Enables opening new windows or tabs

   Default sandbox (without relaxation): `allow-same-origin allow-scripts`
   Relaxed sandbox (with consent): `allow-same-origin allow-scripts allow-downloads allow-forms allow-popups`

## Best practices

Only request sandbox relaxation if necessary, since each relaxed permission introduces potential security risks.

## Enable in manifest

Add the `enableSandboxRelaxation` setting to your workload manifest:

```xml
    <RemoteServiceConfiguration>
      <CloudServiceConfiguration>
        <Cloud>Public</Cloud>
        <AADFEApp>
          <AppId>0000000-0000-0000-0000-000000000000</AppId>
        </AADFEApp>
        <EnableSandboxRelaxation>true</EnableSandboxRelaxation>  
```

>[!IMPORTANT]
>The line **`<EnableSandboxRelaxation>true</EnableSandboxRelaxation>`** must be included to enable this feature.

## Development mode

For local development, you can use sandbox relaxation and bypass consent using the dev override. [Add to devParameters](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/devServer/webpack.dev.js)

```typescript
const devParameters = {
  name: process.env.WORKLOAD_NAME,
  url: "http://127.0.0.1:60006",
  devAADFEAppConfig: {
    appId: process.env.DEV_AAD_CONFIG_FE_APPID,
  },
  devSandboxRelaxation: true
};
```

>[!NOTE]
>The line **`devSandboxRelaxation: true`** enables sandbox relaxation in development mode without requiring user consent.
