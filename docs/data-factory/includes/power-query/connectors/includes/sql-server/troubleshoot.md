---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sql-server/troubleshoot.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

### SQL Server certificate isn't trusted on the client (Power BI Desktop or on-premises data gateway)

When establishing a connection to an on-premises SQL Server using the on-premises data gateway or Power BI Desktop and the SQL Server utilizes a self-signed certificate, it's possible that the refresh operation for a Fabric semantic model or dataflow can fail with the following error message:

```Microsoft SQL: A connection was successfully established with the server, but then an error occurred during the login process. (provider: SSL Provider, error: 0 - The certificate chain was issued by an authority that is not trusted.)```

To troubleshoot this error when using on-premises data gateway, change the gateway configurations to update the `SqlTrustedServers` setting using the following steps:

1. On the local machine where the on-premises data gateway is installed, navigate to **C:\Program Files\On-premises data gateway**.
2. Make a backup of the configuration file named **Microsoft.PowerBI.DataMovement.Pipeline.GatewayCore.dll.config**.
3. Open the original **Microsoft.PowerBI.DataMovement.Pipeline.GatewayCore.dll.config** configuration file and locate the `SqlTrustedServers` entry.
4. Update the `SqlTrustedServers` value with the names of the SQL servers to trust and connect to.

   The value contains a comma-delimited list of server names and supports **\*** as a wild card. So for instance in the following example:

   `<setting name="SqlTrustedServers" serializeAs="String"> <value>contososql*,mysvr</value> </setting>`

   the value `contososql*,mysvr` matches `contososql6`, `contososqlazure`, and `mysvr`, but doesn't match `mysvr.microsoft.com`.

To troubleshoot this error when using Power BI Desktop, modify the value of the environment variable `PBI_SQL_TRUSTED_SERVERS` to include the SQL Servers. The supported values are the same as outlined for gateway configuration (as described in step 4 above).

For connections to SQL Server from Power BI Desktop and on-premises data gateway versions starting with February 2025 or later, follow one of these options:

* Follow the solution mentioned previously to add the environment variable `PBI_SQL_TRUSTED_SERVERS`.
* Ask your SQL administrators to acquire a certificate from a well-known certificate authority.
* Change the setting `SqlTrustedServers` on the gateway config file.
