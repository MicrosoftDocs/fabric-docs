---
title: Microsoft Entra Authentication in Fabric Data Warehouse
description: Learn more about Microsoft Entra authentication, an alternative to SQL authentication in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: frnuson, kadejo, jaszymas
ms.date: 04/06/2025
ms.topic: how-to
ms.custom:
- fabric-cat
- sfi-image-nochange
- sfi-ropc-nochange
ms.search.form: Warehouse roles and permissions # This article's title should not change. If so, contact engineering.
---
# Microsoft Entra authentication as an alternative to SQL authentication

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article covers technical methods that users and customers can employ to transition from SQL authentication to [Microsoft Entra authentication](/entra/identity/authentication/overview-authentication) within Microsoft Fabric. Microsoft Entra authentication is an alternative to usernames and passwords via SQL authentication to the [!INCLUDE [fabric-se](includes/fabric-se.md)] or the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]. Microsoft Entra authentication is advisable and vital for creating a secure data platform.

This article focuses on Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric items such as a Warehouse or Lakehouse SQL analytics endpoint.

## Benefits of Microsoft Entra authentication in Fabric

One of Microsoft Fabric's core principles is secure by design. Microsoft Entra is integral to Microsoft Fabric's security by ensuring strong data protection, governance, and compliance.

Microsoft Entra plays a crucial role in Microsoft Fabric's security for several reasons:

- Authentication: Verify users and [service principals](/entra/identity-platform/app-objects-and-service-principals) using Microsoft Entra ID, which grants access tokens for operations within Fabric.
- Secure access: Connect securely to cloud apps from any device or network, safeguarding requests made to Fabric.
- Conditional access: Admins can set policies that assess user context, control access, or enforce extra verification steps.
- Integration: Microsoft Entra ID seamlessly works with all Microsoft SaaS offerings, including Fabric, allowing easy access across devices and networks.
- Broad platform: Gain access to Microsoft Fabric with Microsoft Entra ID via any method, whether through the Fabric portal, SQL connection string, REST API, or XMLA endpoint.

Microsoft Entra adopts a complete Zero Trust policy, offering a superior alternative to traditional SQL authentication limited to usernames and passwords. This approach:

- Prevents user impersonation.
- Enables fine-grained access control considering user identity, environment, devices, etc.
- Supports advanced security like [Microsoft Entra multifactor authentication](/entra/identity/authentication/howto-mfa-userdevicesettings).

## Fabric configuration

Microsoft Entra authentication for use with a Warehouse or Lakehouse SQL analytics endpoint requires configuration in both **Tenant** and **Workspace** settings.

### Tenant setting

A Fabric admin in your tenant must permit service principal names (SPN) access to Fabric APIs, necessary for the SPN to interface for SQL connection strings to Fabric warehouse or SQL analytics endpoint items.

This setting is located in the Developer settings section and is labeled **Service principals can use Fabric APIs**. Make sure it is **Enabled**.

:::image type="content" source="media/entra-id-authentication/developer-settings-service-principals-fabric-apis.png" alt-text="Screenshot from the Fabric portal of the Developer Settings page in Tenant Settings.":::

### Workspace setting

A Fabric admin in your workspace must grant access for a user or SPN to access Fabric items.

There are two means by which a User or SPN can be granted access:

- **Grant a user or SPN membership to a role**: Any workspace role (Admin, Member, Contributor, or Viewer) is sufficient to connect to warehouse or lakehouse items with a SQL connection string.
    1. In the **Manage access** option in the Workspace, assign the **Contributor** role. For more information, see [Service roles](/power-bi/collaborate-share/service-roles-new-workspaces#workspace-roles).

- **Assign a user or SPN to a specific item**: Grant access to a specific Warehouse or SQL analytics endpoint of a Lakehouse. A Fabric admin can choose from different permission levels.
    1. Navigate to the relevant Warehouse or SQL analytics endpoint item.
    1. Select **More options**, then **Manage Permissions**. Select **Add user**.
    1. Add the User or SPN on the **Grant people access** page.
    1. Assign the necessary permissions to a User or SPN. Choose no **Additional permissions** to grant connect permissions only.

    :::image type="content" source="media/entra-id-authentication/manage-permissions-grant-people-access.png" alt-text="Screenshot from the Fabric portal of the Grant people access page." lightbox="media/entra-id-authentication/manage-permissions-grant-people-access.png":::

You can alter the default permissions given to the User or SPN by the system. Use the T-SQL [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true) and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true) commands to alter permissions as required, or [ALTER ROLE](/sql/t-sql/statements/alter-role-transact-sql?view=fabric&preserve-view=true) to add membership to roles.

Currently, SPNs don't have the capability as user accounts for detailed permission configuration with `GRANT`/`DENY`.

## Support for user identities and service principal names (SPNs)

Fabric natively supports authentication and authorization for Microsoft Entra users and service principal names (SPN) in SQL connections to warehouse and SQL analytics endpoint items.

- User identities are the unique credentials for each user within an organization.
- SPNs represent application objects within a tenant and act as the identity for instances of applications, taking on the role of authenticating and authorizing those applications.

## Support for tabular data stream (TDS)

Fabric uses the Tabular Data Stream (TDS) protocol, the same as SQL Server, when you connect with a connection string.

Fabric is compatible with any application or tool able to connect to a product with the SQL Database Engine. Similar to a SQL Server instance connection, TDS operates on TCP port 1433. For more information about Fabric SQL connectivity and finding the SQL connection string, see [Find the warehouse connection string](how-to-connect.md#find-the-warehouse-connection-string).

A sample SQL connection string looks like: `<guid_unique_your_item>.datawarehouse.fabric.microsoft.com`.

Applications and client tools can set the `Authentication` connection property in the connection string to choose a Microsoft Entra authentication mode. The following table details the different Microsoft Entra authentication modes, including support for [Microsoft Entra multifactor authentication (MFA)](/entra/identity/authentication/tutorial-enable-azure-mfa).

| **Authentication mode**|  **Scenarios** |**Comments** |
|:--|:--|:--|
| Microsoft Entra Interactive | Utilized by applications or tools in situations where user authentication can occur interactively, or when it is acceptable to have manual intervention for credential verification. | [Activate MFA](/entra/identity/authentication/tutorial-enable-azure-mfa) and [Microsoft Entra Conditional Access policies](/entra/identity/conditional-access/concept-conditional-access-policies) to enforce organizational rules. |
| Microsoft Entra Service Principal | Used by apps for secure authentication without human intervention, most suited for application integration. | Advisable to enable [Microsoft Entra Conditional Access policies](/entra/identity/conditional-access/workload-identity). |
| Microsoft Entra Password | When applications can't use SPN-based authentication due to incompatibility, or require a generic username and password for many users, or if other methods are infeasible. | MFA must be off, and no conditional access policies can be set. We recommend validating with the customer's security team before opting for this solution. |

:::image type="content" source="media/entra-id-authentication/mode-flow-chart.png" alt-text="Flowchart showing Microsoft Entra authentication modes and decision points." lightbox="media/entra-id-authentication/mode-flow-chart.png":::

## Driver support for Microsoft Entra authentication

While most of the SQL drivers initially came with support for Microsoft Entra authentication, recent updates have expanded compatibility to include SPN-based authentication. This enhancement simplifies the shift to Microsoft Entra authentication for various applications and tools through driver upgrades and adding support for Microsoft Entra authentication.

However, sometimes it's necessary to adjust additional settings such as enabling certain ports or firewalls to facilitate Microsoft Entra authentication on the host machine.

Applications and tools must upgrade drivers to versions that support Microsoft Entra authentication and add an authentication mode keyword in their SQL connection string, like `ActiveDirectoryInteractive`, `ActiveDirectoryServicePrincipal`, or `ActiveDirectoryPassword`.

Fabric is compatible with Microsoft's native drivers, including OLE DB, `Microsoft.Data.SqlClient`, and generic drivers such ODBC and JDBC. The transition for applications to work with Fabric can be managed through reconfiguration to use Microsoft Entra ID-based authentication.

For more information, see [Connectivity to data warehousing in Microsoft Fabric](connectivity.md).

### Microsoft OLE DB

The [OLE DB Driver for SQL Server](/sql/connect/oledb/features/using-azure-active-directory?view=fabric&preserve-view=true) is a stand-alone data access API designed for OLE DB and first released with SQL Server 2005 (9.x). Since, expanded features include SPN-based authentication with version [18.5.0](/sql/connect/oledb/release-notes-for-oledb-driver-for-sql-server#1850), adding to the existing authentication methods from earlier versions.

| **Authentication mode**|  **SQL connection string** |
|:--|:--|:--|  
| Microsoft Entra Interactive    | [Microsoft Entra interactive authentication](/sql/connect/oledb/features/using-azure-active-directory?view=fabric&preserve-view=true#microsoft-entra-interactive-authentication) |
| Microsoft Entra Service Principal | [Microsoft Entra Service Principal authentication](/sql/connect/oledb/features/using-azure-active-directory?view=fabric&preserve-view=true#microsoft-entra-service-principal-authentication) |
| Microsoft Entra Password              | [Microsoft Entra username and password authentication](/sql/connect/oledb/features/using-azure-active-directory?view=fabric&preserve-view=true#microsoft-entra-username-and-password-authentication) |

For a C# code snippet using OLE DB with SPN-based authentication, see [System.Data.OLEDB.Connect.cs](https://github.com/microsoft/fabric-toolbox/blob/d87627f96d7867d46e585f82fddb2f57c42d585d/data-warehousing/dw-connectivity/microsoft-drivers/dw-connection-setup/dw-connection-test/System.Data.OLEDB.Connect.cs).

### Microsoft ODBC Driver

The [Microsoft ODBC Driver](/sql/connect/odbc/download-odbc-driver-for-sql-server?view=fabric&preserve-view=true) for SQL Server is a single dynamic-link library (DLL) containing run-time support for applications using native-code APIs to connect to SQL Server. It is recommended to use the most recent version for applications to integrate with Fabric.

For more information on Microsoft Entra authentication with ODBC, see [Using Microsoft Entra ID with the ODBC Driver sample code](/sql/connect/odbc/using-azure-active-directory#microsoft-entra-authentication-sample-code).

| Authentication Mode            | SQL Connection String                                                                                           |
|:-------------------------------|:---------------------------------------------------------------------------------------------------------------|
| Microsoft Entra Interactive    | `DRIVER={ODBC Driver 18 for SQL Server};SERVER=<SQL Connection String>;DATABASE=<DB Name>;UID=<Client_ID@domain>;PWD=<Secret>;Authentication=ActiveDirectoryInteractive` |
| Microsoft Entra Service Principal | `DRIVER={ODBC Driver 18 for SQL Server};SERVER=<SQL Connection String>;DATABASE=<DBName>;UID=<Client_ID@domain>;PWD=<Secret>;Authentication=ActiveDirectoryServicePrincipal` |
| Microsoft Entra Password       | `DRIVER={ODBC Driver 18 for SQL Server};SERVER=<SQL Connection String>;DATABASE=<DBName>;UID=<Client_ID@domain>;PWD=<Secret>;Authentication=ActiveDirectoryPassword` |

For a python code snippet using ODBC with SPN-based authentication, see [pyodbc-dw-connectivity.py](https://github.com/microsoft/fabric-toolbox/blob/d87627f96d7867d46e585f82fddb2f57c42d585d/data-warehousing/dw-connectivity/odbc/pyodbc-dw-connectivity.py).

### Microsoft JDBC Driver

The [Microsoft JDBC Driver for SQL Server](/sql/connect/jdbc/download-microsoft-jdbc-driver-for-sql-server) is a Type 4 JDBC driver that provides database connectivity through the standard JDBC application program interfaces (APIs) available on the Java platform.

Starting from version 9.2, `mssql-jdbc` introduces support for `ActiveDirectoryInteractive` and `ActiveDirectoryServicePrincipal`, with `ActiveDirectoryPassword` being supported in versions 12.2 and above. This driver requires additional jars as dependencies, which must be compatible with the version of the `mssql-driver` used in your
application. For more information, see [Feature dependencies of the Microsoft JDBC Driver](/sql/connect/jdbc/feature-dependencies-of-microsoft-jdbc-driver-for-sql-server) and [Client setup requirement](/sql/connect/jdbc/connecting-using-azure-active-directory-authentication#client-setup-requirements).

| Authentication Mode            | More information |
|:-------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------|
| Microsoft Entra Interactive    | [Connect using ActiveDirectoryInteractive authentication mode](/sql/connect/jdbc/connecting-using-azure-active-directory-authentication#connect-using-activedirectoryinteractive-authentication-mode) |
| Microsoft Entra Service Principal | [Connect using ActiveDirectoryServicePrincipal authentication mode](/sql/connect/jdbc/connecting-using-azure-active-directory-authentication#connect-using-activedirectorypassword-authentication-mode) |
| Microsoft Entra Password       | [Connect using ActiveDirectoryPassword authentication mode](/sql/connect/jdbc/connecting-using-azure-active-directory-authentication#connect-using-activedirectorypassword-authentication-mode) |

For a java code snippet using JDBC with SPN-based authentication, see [fabrictoolbox/dw_connect.java](https://github.com/microsoft/fabric-toolbox/blob/d87627f96d7867d46e585f82fddb2f57c42d585d/data-warehousing/dw-connectivity/jdbc/src/main/java/com/fabrictoolbox/dw_connect.java) and [sample pom file pom.xml](https://github.com/microsoft/fabric-toolbox/blob/d87627f96d7867d46e585f82fddb2f57c42d585d/data-warehousing/dw-connectivity/jdbc/pom.xml).

### Microsoft.Data.SqlClient in .NET

This library [Microsoft.Data.SqlClient](https://www.nuget.org/packages/Microsoft.Data.SqlClient/6.0.1) is the newer, cross-platform data provider for SQL Server, intended to replace the older `System.Data.SqlClient` which was Windows-only. 

Supported platforms:
   - .NET 8.0 and later
   - .NET Framework 4.6.2 and later

The [Microsoft.Data.SqlClient namespace](/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace) is a union of the two `System.Data.SqlClient` components, providing a set of classes for accessing SQL Database Engine databases. `Microsoft.Data.SqlClient` is recommended for all new development.

  | Authentication Mode   | More information                         |
  |:-------------------------------|:--------------------------------------------------|
  | Microsoft Entra Interactive    | [Using interactive authentication](/sql/connect/ado-net/sql/azure-active-directory-authentication#using-interactive-authentication)|
  | Microsoft Entra Service Principal | [Using service principal authentication](/sql/connect/ado-net/sql/azure-active-directory-authentication#using-interactive-authentication) |
  | Microsoft Entra Password       | [Using Password Authentication](/sql/connect/ado-net/sql/azure-active-directory-authentication#using-password-authentication)  |

Code snippets using SPNs:
- [Microsoft.Data.SqlClient.Connect.cs](https://github.com/microsoft/fabric-toolbox/blob/d87627f96d7867d46e585f82fddb2f57c42d585d/data-warehousing/dw-connectivity/microsoft-drivers/dw-connection-setup/dw-connection-test/Microsoft.Data.SqlClient.Connect.cs)
- [System.Data.SqlClient.Connect.cs](https://github.com/microsoft/fabric-toolbox/blob/d87627f96d7867d46e585f82fddb2f57c42d585d/data-warehousing/dw-connectivity/microsoft-drivers/dw-connection-setup/dw-connection-test/System.Data.SqlClient.Connect.cs)

## Related content

- [Connectivity to data warehousing in Microsoft Fabric](connectivity.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
