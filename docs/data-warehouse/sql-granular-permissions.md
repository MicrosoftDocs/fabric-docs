

- Granular object-level-security can be managed using GRANT, REVOKE & DENY syntax.
- Users can also be assigned to SQL roles, both custom and built-in database roles. 

Limitations:
- Row-level security is currently not supported
- Dynamic data masking is currently not supported



## View my permissions

Once you're assigned to a workspace role, you can connect to the warehouse (see [Connectivity](connectivity.md) for more information), with the permissions detailed previously. Once connected, you can check your permissions.

1. Connect to the warehouse using [SQL Server Management Studio (SSMS)](https://aka.ms/ssms).

1. Open a new query window.

   :::image type="content" source="media\manage-user-access\new-query-context-menu.png" alt-text="Screenshot showing where to select New Query in the Object Explorer context menu." lightbox="media\manage-user-access\new-query-context-menu.png":::

1. To see the permissions granted to the user, execute:

   ```sql
   SELECT *
   FROM sys.fn_my_permissions(NULL, "Database")
   ```

   :::image type="content" source="media\manage-user-access\execute-view-permissions.png" alt-text="Screenshot showing where to execute the command to see permissions." lightbox="media\manage-user-access\execute-view-permissions.png":::

