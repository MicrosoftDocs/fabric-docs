---
title: REFRESH_REPORT function
description: Learn how to use the REFRESH_REPORT function to refresh a report in a planning item.
ms.date: 10/30/2026
ms.topic: reference
---

# REFRESH_REPORT function

Use the REFRESH_REPORT function to refresh the entire report when a user runs a script in a planning item. For example, configure a button that refreshes the report when a user selects it.

## Syntax

The following syntax refreshes the entire report.

```text
REFRESH_REPORT()
```

## Example

The following example configures a button that refreshes the report when a user selects it.

```text
REFRESH_REPORT()
```

### Configure a button to refresh a report

1. Open the planning item and create or edit an action parameter.
2. In the **Edit Parameter** pane, set **Type** to **Action**, enter a name such as **Refresh Report**, and provide a description such as **Refreshes the report when a user selects the button.**
3. Under **Interface Options**, set **Interface Type** to **Button** and select **Enable Script**.
4. Under **Button Configuration**, set **Label** to **Refresh**.
5. Add an action, set **Apply to** to **Root**, and enter `REFRESH_REPORT()` in **Formula Script**.
6. Select **Save** in the **Button State Configuration** window, and then select **Update** in the **Edit Parameter** pane.
7. In the **Parameter** pane, select **Refresh** to run the script and refresh the report.

:::image type="content" source="../media/scripting-functions/refresh-report/refresh-report-configuration.png" alt-text="Screenshot of the Button State Configuration window with REFRESH_REPORT() entered in Formula Script and the Refresh button configured in the Edit Parameter pane." lightbox="../media/scripting-functions/refresh-report/refresh-report-configuration.png":::

After you select the **Refresh** button, the report refreshes and the updated data appears in the report.

:::image type="content" source="../media/scripting-functions/refresh-report/refresh-report-result.png" alt-text="Screenshot of the planning item after the Refresh button runs REFRESH_REPORT() and the report displays refreshed data." lightbox="../media/scripting-functions/refresh-report/refresh-report-result.png":::
