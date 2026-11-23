---
title: ALM – Variable Library
description: Learn how to use a variable library with a Plan item to reuse semantic model, SQL database, and connection references.
author: jagan0506
ms.author: jagan0506
ms.service: fabric
ms.date: 09/30/2026
ms.topic: how-to
---

# ALM – Variable library

A variable library provides a reusable way to configure references that are used by Plan items. Instead of selecting the same semantic model, database, or connection each time, you can define the reference as a variable and reuse it where supported. This article shows how to use a variable library with a Plan item by creating the following variables:

-   **SM_Variable** — an item reference to the **Enterprise Dataset** semantic model.

-   **DB_Variable** — an item reference to the **My_Planning_DB** SQL database.

-   **DMTS_Variable** — a connection reference to the **My_Fabric_SQL_Connection** connection, which uses the **FabricSql** connection type.

The example then uses these variables in the **Enterprise_Plan** Plan item. The semantic model is configured from **SM_Variable**, and the Writeback destination uses **DMTS_Variable** for the connection and **DB_Variable** for the database.

## Create a variable library

Create a variable library in the workspace where you are developing the

Plan item.

1. In your workspace, select **New item**.

2. Create a **Variable library** item.

:::image type="content" source="media/alm-variable-library/create-variable-library.png" alt-text="Screenshot showing the workspace with the option to create a Variable library." lightbox="media/alm-variable-library/create-variable-library.png":::

3. Enter a name for the variable library.

4. Select **Create**.

In this example, the variable library is named **Variables_1**.

:::image type="content" source="media/alm-variable-library/name-variable-library.png" alt-text="Screenshot showing the New Variable library dialog with the variable library name entered." lightbox="media/alm-variable-library/name-variable-library.png":::

## Create an item reference for the semantic model

Create an item reference variable that points to the semantic model used by the Plan item.

1. In the variable library, select **New variable**.

:::image type="content" source="media/alm-variable-library/select-new-variable-semantic-model.png" alt-text="Screenshot showing the New variable action in the variable library." lightbox="media/alm-variable-library/select-new-variable-semantic-model.png":::

2. Enter **SM_Variable** as the variable name.

3. Select **Item reference** as the variable type.

:::image type="content" source="media/alm-variable-library/select-item-reference.png" alt-text="Screenshot showing Item reference selected as the variable type." lightbox="media/alm-variable-library/select-item-reference.png":::

4. Select the item picker for the variable value.

5. Select the **Enterprise Dataset** semantic model.

:::image type="content" source="media/alm-variable-library/select-enterprise-dataset.png" alt-text="Screenshot showing the Enterprise Dataset semantic model selected as the variable value." lightbox="media/alm-variable-library/select-enterprise-dataset.png":::

6. Select **Save**.

:::image type="content" source="media/alm-variable-library/save-semantic-model-variable.png" alt-text="Screenshot showing the saved semantic model variable in the variable library." lightbox="media/alm-variable-library/save-semantic-model-variable.png":::

## Create a Plan item

Create the Plan item that uses the semantic model variable.

1. In the workspace, select **New item**.

2. Select **Plan**.

:::image type="content" source="media/alm-variable-library/create-plan-item.png" alt-text="Screenshot showing New item with Plan selected." lightbox="media/alm-variable-library/create-plan-item.png":::

3. Enter **Enterprise_Plan** as the Plan name.

4. Select **Create**.

:::image type="content" source="media/alm-variable-library/name-enterprise-plan.png" alt-text="Screenshot showing the New Plan dialog with Enterprise_Plan entered as the Plan name." lightbox="media/alm-variable-library/name-enterprise-plan.png":::

## Use the semantic model variable in the Plan

Configure the Plan item to use **SM_Variable** instead of selecting the semantic model directly.

1. In the Plan creation flow, select **Semantic Model**.

:::image type="content" source="media/alm-variable-library/select-semantic-model.png" alt-text="Screenshot showing the Semantic Model option for the new Plan item." lightbox="media/alm-variable-library/select-semantic-model.png":::

2. In the **Select Semantic Model** pane, select **Variable Library**.

3. In **Semantic Model**, select **Select from variable**.

:::image type="content" source="media/alm-variable-library/select-variable-library-for-semantic-model.png" alt-text="Screenshot showing Variable Library selected as the source for the semantic model." lightbox="media/alm-variable-library/select-variable-library-for-semantic-model.png":::

4. Select **SM_Variable**.

:::image type="content" source="media/alm-variable-library/select-semantic-model-variable.png" alt-text="Screenshot showing SM_Variable selected from the variable library." lightbox="media/alm-variable-library/select-semantic-model-variable.png":::

5. Select **Connect**.

:::image type="content" source="media/alm-variable-library/connect-semantic-model-variable.png" alt-text="Screenshot showing the Connect button after selecting the semantic model variable." lightbox="media/alm-variable-library/connect-semantic-model-variable.png":::

The Plan is now configured to use the semantic model referenced by **SM_Variable**.

:::image type="content" source="media/alm-variable-library/semantic-model-variable-added.png" alt-text="Screenshot showing the semantic model added to the Plan item." lightbox="media/alm-variable-library/semantic-model-variable-added.png":::

## Create an item reference for the SQL database

Create an item reference variable for the SQL database that you use as the Writeback database.

1. In the variable library, select **New variable**.

2. Enter **DB_Variable** as the variable name.

3. Select **Item reference** as the variable type.

4. Select the item picker for the variable value.

:::image type="content" source="media/alm-variable-library/create-database-item-reference.png" alt-text="Screenshot showing the New variable action and Item reference selected for the database variable." lightbox="media/alm-variable-library/create-database-item-reference.png":::

5. Select **My_Planning_DB**.

:::image type="content" source="media/alm-variable-library/select-sql-database.png" alt-text="Screenshot showing the SQL database item selected for DB_Variable." lightbox="media/alm-variable-library/select-sql-database.png":::

6. Select **Save**.

:::image type="content" source="media/alm-variable-library/save-database-variable.png" alt-text="Screenshot showing DB_Variable saved in the variable library." lightbox="media/alm-variable-library/save-database-variable.png":::

## Create a connection reference for the App DB connection

Create a connection reference variable for the reusable App DB connection.

1. In the variable library, select **New variable**.

2. Enter **DMTS_Variable** as the variable name.

3. Select **Connection reference** as the variable type.

4. Select the connection picker.

:::image type="content" source="media/alm-variable-library/create-connection-reference.png" alt-text="Screenshot showing the New variable action with Connection reference selected for DMTS_Variable." lightbox="media/alm-variable-library/create-connection-reference.png":::

5. Select **My_Fabric_SQL_Connection**.

6. Select **Save**.

:::image type="content" source="media/alm-variable-library/select-fabricsql-connection.png" alt-text="Screenshot showing My_Fabric_SQL_Connection with the FabricSql connection type selected." lightbox="media/alm-variable-library/select-fabricsql-connection.png":::

:::image type="content" source="media/alm-variable-library/save-connection-variable.png" alt-text="Screenshot showing DMTS_Variable saved as a connection reference." lightbox="media/alm-variable-library/save-connection-variable.png":::

The variable library now contains reusable references for the semantic model, SQL database, and App DB connection.

## Use the variables for a Writeback destination

Use **DMTS_Variable** and **DB_Variable** when you configure the Writeback destination in **Enterprise_Plan**.

1. Open **Enterprise_Plan**.

2. Select **Planning**.

:::image type="content" source="media/alm-variable-library/open-enterprise-plan-planning.png" alt-text="Screenshot showing Enterprise_Plan opened with the Planning experience selected." lightbox="media/alm-variable-library/open-enterprise-plan-planning.png":::

3. Create a planning sheet.

:::image type="content" source="media/alm-variable-library/create-planning-sheet.png" alt-text="Screenshot showing the New Planning Sheet dialog with the Create button." lightbox="media/alm-variable-library/create-planning-sheet.png":::

4. In the Writeback experience, select **Add destination**.

:::image type="content" source="media/alm-variable-library/add-writeback-destination.png" alt-text="Screenshot showing the Add destination action for Writeback." lightbox="media/alm-variable-library/add-writeback-destination.png":::

5. In **Create Destination**, open the **Select a Connection** list.

:::image type="content" source="media/alm-variable-library/open-connection-dropdown.png" alt-text="Screenshot showing the Select a Connection list in the Create Destination pane." lightbox="media/alm-variable-library/open-connection-dropdown.png":::

6. Select **Use Variable**.

:::image type="content" source="media/alm-variable-library/select-use-variable.png" alt-text="Screenshot showing Use Variable selected for the connection." lightbox="media/alm-variable-library/select-use-variable.png":::

7. In the **Select variable** pane, select **DMTS_Variable**.

8. Select **Select variable**.

:::image type="content" source="media/alm-variable-library/select-dmts-variable.png" alt-text="Screenshot showing DMTS_Variable selected from the variable library." lightbox="media/alm-variable-library/select-dmts-variable.png":::

9. Under **Select Database From**, select **Variable Library**.

10. In **Database Name**, select **Select from variable**.

:::image type="content" source="media/alm-variable-library/select-database-from-variable.png" alt-text="Screenshot showing Variable Library selected as the source for the database name." lightbox="media/alm-variable-library/select-database-from-variable.png":::

11. Select **DB_Variable**.

12. Select **Select variable**.

:::image type="content" source="media/alm-variable-library/select-db-variable.png" alt-text="Screenshot showing DB_Variable selected from the variable library." lightbox="media/alm-variable-library/select-db-variable.png":::

13. Complete the remaining required destination fields, such as **Schema** and **Table Name**.

14. Select **Add**.

:::image type="content" source="media/alm-variable-library/add-writeback-destination-configuration.png" alt-text="Screenshot showing the completed Writeback destination configuration with variable-based connection and database values." lightbox="media/alm-variable-library/add-writeback-destination-configuration.png":::

The Writeback destination is added to the Plan using the reusable variables.

:::image type="content" source="media/alm-variable-library/writeback-destination-added.png" alt-text="Screenshot showing the Writeback destination added to the Plan." lightbox="media/alm-variable-library/writeback-destination-added.png":::

## Summary

In this example, the variable library centralizes the references

required by the Plan item:

| Variable | Type | Reference |
| --- | --- | --- |
| **SM_Variable** | Item reference | **Enterprise Dataset** semantic model |
| **DB_Variable** | Item reference | **My_Planning_DB** SQL database |
| **DMTS_Variable** | Connection reference | **My_Fabric_SQL_Connection** connection |

The Plan uses **SM_Variable** for its semantic model and uses **DMTS_Variable** and **DB_Variable** when configuring the Writeback destination. This approach avoids selecting the same references directly each time they are required and provides reusable configuration for ALM scenarios.
