---
title: "SETFILTER"
description: "Use SETFILTER to apply a saved filter to a planning sheet."
ms.date: 11/12/2026
ms.topic: reference
---

# SETFILTER

Use SETFILTER to apply a saved filter to a planning sheet. You can use the function in an action parameter so that users can apply a filter by selecting a button.

## Syntax

```text
SETFILTER(FILTER.Filter1)
```

## Parameters

| Parameter | Description |
|---|---|
| FILTER.Filter1 | The reference to the saved filter to apply. Select the filter reference from the formula editor suggestions. Replace Filter1 with the applicable filter reference. |

## Example

The following examples show how to create saved filters and apply them from buttons in a planning sheet.

### Apply a filter for the International region

In this example, create a filter that displays records for the International region. Then configure an action button to apply the saved filter.

1. Open the planning sheet.
2. On the **Planning** ribbon, select **Filter context**, and then select **Create Filter**.
3. Enter **International** in **Filter Name**.
4. Configure the condition as **Region** **is** **International**.
5. Select **Save**.

   :::image type="content" source="../media/scripting-functions/setfilter/setfilter-configuration-show-international.png" alt-text="Screenshot of the Create Filter configuration for the International filter, with Region set to International." lightbox="../media/scripting-functions/setfilter/setfilter-configuration-show-international.png":::

6. In the **Parameter** pane, select **Add new**, and set **Type** to **Action**.
7. Enter **Show International** in **Name** and **ShowInternational** in **Parameter Id**.
8. Optionally, enter a description such as *Applies the International region filter to the planning sheet.*
9. Set **Interface Type** to **Button**, and enable **Enable Script**.
10. In **Button Configuration**, set **Label** to **Show International**.
11. Add an action, set **Apply to** to **Planning**, and enter the following formula in **Formula Script**:

    ```text
    SETFILTER(FILTER.Filter1)
    ```

    In the formula editor, select the saved International filter reference from the suggestions. The generated filter identifier can differ between planning sheets.

12. Save the action parameter and save the planning sheet.
13. In the **Parameter** pane, select **Show International**.

    :::image type="content" source="../media/scripting-functions/setfilter/setfilter-result-show-international.png" alt-text="Screenshot of the planning sheet after the International filter is applied, showing records for the International region." lightbox="../media/scripting-functions/setfilter/setfilter-result-show-international.png":::

The planning sheet displays records for the International region.

### Apply a filter for the Beverages category

In this example, create a filter that displays records in the Beverages category. Then configure a second action button to apply that filter.

1. On the **Planning** ribbon, select **Filter context**, and then select **Create Filter**.
2. Enter **Beverages** in **Filter Name**.
3. Configure the condition as **Category** **is** **Beverages**.
4. Select **Save**.

   :::image type="content" source="../media/scripting-functions/setfilter/setfilter-configuration-show-beverages.png" alt-text="Screenshot of the Create Filter configuration for the Beverages filter, with Category set to Beverages." lightbox="../media/scripting-functions/setfilter/setfilter-configuration-show-beverages.png":::

5. In the **Parameter** pane, select **Add new**, and set **Type** to **Action**.
6. Enter **Show Beverages** in **Name** and **ShowBeverages** in **Parameter Id**.
7. Optionally, enter a description such as *Applies the Beverages category filter to the planning sheet.*
8. Set **Interface Type** to **Button**, and enable **Enable Script**.
9. In **Button Configuration**, set **Label** to **Show Beverages**.
10. Add an action, set **Apply to** to **Planning**, and enter the following formula in **Formula Script**:

    ```text
    SETFILTER(FILTER.Filter1)
    ```

    In the formula editor, select the saved Beverages filter reference from the suggestions. The generated filter identifier can differ between planning sheets.

11. Save the action parameter and save the planning sheet.
12. In the **Parameter** pane, select **Show Beverages**.

    :::image type="content" source="../media/scripting-functions/setfilter/setfilter-result-show-beverages.png" alt-text="Screenshot of the planning sheet after the Beverages filter is applied, showing Beverages records for the available regions." lightbox="../media/scripting-functions/setfilter/setfilter-result-show-beverages.png":::

The planning sheet displays records in the Beverages category.

## Configure the action parameter

Use the following settings for an action parameter that applies a saved filter:

| Setting | Recommended configuration |
|---|---|
| **Type** | Action |
| **Interface Type** | Button |
| **Enable Script** | Enabled |
| **Enable Toggle Actions** | Disabled for these examples |
| **Execute on Initialize** | Disabled so that the filter is applied when the user selects the button |
| **Show Toast Message on Error** | Enabled to display an error message if the action fails |
| **Include in read mode** | Enable if users should be able to apply the filter in read mode |

The button label should describe the filter action, such as **Show International** or **Show Beverages**.

