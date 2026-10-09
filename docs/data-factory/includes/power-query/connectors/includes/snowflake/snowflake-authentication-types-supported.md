---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/snowflake/snowflake-authentication-types-supported.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

> [!NOTE]
> - Username/password authentication mode will be deprecated. [Read more here](https://www.snowflake.com/en/blog/blocking-single-factor-password-authentification/). More information can be found under Connectivity on our [Fabric roadmap](https://roadmap.fabric.microsoft.com/?product=datafactory).
>
> - Key Pair Auth isn't supported for Dataflows Gen1 and Power Apps (Dataflows).

The Snowflake connector supports the following authentication methods:

- **Microsoft Entra ID (recommended)**: Enables strong, identity-based authentication without storing usernames or passwords.  
   - In **Microsoft Fabric**, this authentication method can be backed by **workspace identity** in supported experiences (such as **Datasets** and **Dataflows Gen2**), allowing Fabric to authenticate to Snowflake using the workspace’s managed identity.

- **Workspace Identity**: A managed identity associated with a Microsoft Fabric workspace. When you authenticate with Microsoft Entra ID, supported Fabric experiences (such as Datasets and Dataflows Gen2) can use the workspace identity to authenticate to Snowflake. This method allows Fabric to access Snowflake using an identity tied to the workspace, rather than individual user credentials.

- **Key pair authentication (ADBC)**: Certificate-based authentication for supported scenarios.

- **Service Principal (SPN)**: Service principals are supported with Snowflake for scenarios where a non-user, application-level identity is required. Support is dependent on Snowflake configuration and the authentication method used.
