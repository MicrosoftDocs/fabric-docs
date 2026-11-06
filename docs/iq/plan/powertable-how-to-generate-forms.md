---
title: Create and Share Forms in PowerTable Sheets
description: Learn how to generate forms to collect user inputs using PowerTable sheets.
ms.date: 11/06/2026
ms.topic: how-to
#customer intent: As a PowerTable user, I want to generate a form from my PowerTable sheet so that I can collect user inputs and write them directly to my database.
---

# Create data entry forms with PowerTable sheets

*Forms* allow you to collect data from users and write them directly to your database.

Forms can be used for various scenarios, such as capturing expense reports, collecting survey responses, running polls or quizzes, gathering customer feedback, registering event attendees, managing internal requests, or onboarding new users. Their structured layout and configurable fields make data collection easier and streamline workflows for both individuals and teams.

In this article, you learn how to quickly generate forms from your table to collect user inputs, store them in your PowerTable app, and write them back to the database.

You can create one or more forms for a PowerTable sheet and set up a form as the default form for the sheet.

## Create a form

1. Select **Setup > Forms**.

    :::image type="content" source="media/powertable-how-to-generate-forms/forms-setup.png" alt-text="Screenshot of the Forms button in the Setup tab of the menu ribbon." lightbox="media/powertable-how-to-generate-forms/forms-setup.png":::

1. Select **Create a Form**. A form is generated with all the fields in the database.

    :::image type="content" source="media/powertable-how-to-generate-forms/create-form.png" alt-text="Screenshot of the configuration options for creating a new form." lightbox="media/powertable-how-to-generate-forms/create-form.png":::

## Configure form settings

Use the **Form Setup** pane to customize the form title, description, appearance, field labels, and submission behavior.

:::image type="content" source="media/powertable-how-to-generate-forms/form-setup-pane.png" alt-text="Screenshot of the Form Setup pane showing Title, Description, Show Title, Show Logo, Field label, and Submission Options settings." lightbox="media/powertable-how-to-generate-forms/form-setup-pane.png":::

### Form details

* **Title**: Enter the title that you want to display at the top of the form.
* **Description**: Enter a description to provide users with more information about the form.

### General

Enable or disable these options as you need:

* **Show Title**: Show or hide the form title.
* **Show Logo**: Show or hide the logo in the form.

* **Field label**: Choose how you want the field labels to appear on the form:

  * **Stacked**: Display field labels above their input fields.
  * **Inline**: Display field labels beside their input fields.

### Submission options

* **Limit to one response**: Enable this option to allow users to submit the form only once.
* **Show message on submission**: Enter the confirmation message that's displayed after a user submits the form.

## Preview and save form

* To set the form as the default form for the table, turn on the **Set as default form editor** option.

* Select **Preview** to see how your form looks to the users.

* Select **Save** to generate the form.

:::image type="content" source="media/powertable-how-to-generate-forms/select-preview.png" alt-text="Screenshot of the form editor with the Set as default form editor toggle and Preview button highlighted for the Enter Product Details form." lightbox="media/powertable-how-to-generate-forms/select-preview.png":::

> [!NOTE]
> To learn more about customizing your form, see [Customize form](#customize-form).

## Share form

After selecting **Save**, the **Share** pop-up appears as shown in the following image. Alternatively, select **Share** after creating the form to generate a shareable link for your form.

:::image type="content" source="media/powertable-how-to-generate-forms/share-pop-up-appears.png" alt-text="Screenshot of the Share pop-up with access options, an Expiry Date picker, and a Generate Link button after Form 1 is created." lightbox="media/powertable-how-to-generate-forms/share-pop-up-appears.png":::

* **All users in this domain**: Select this option to share the form with all users in the domain.
* **Specific users**: Select this option to restrict access to specific users by entering their email addresses.

Choose an expiration date for the link. Select **Generate Link**.

:::image type="content" source="media/powertable-how-to-generate-forms/share-form.png" alt-text="Screenshot of generating a link to share the form." lightbox="media/powertable-how-to-generate-forms/share-form.png":::

Select **Copy Link** to copy the form link and share it with users.

:::image type="content" source="media/powertable-how-to-generate-forms/copy-link.png" alt-text="Screenshot of the Share dialog showing specific users, an expiry date, the form URL, and the highlighted Copy link button." lightbox="media/powertable-how-to-generate-forms/copy-link.png":::

The users who get the link can enter the details and select **Submit** to submit the form. The details are added to the table as a new record.

:::image type="content" source="media/powertable-how-to-generate-forms/submit-form.png" alt-text="Screenshot of a shared form showing ProductKey, ProductSubcategoryKey, ProductSKU, ProductName, and ModelName fields with a Submit button." lightbox="media/powertable-how-to-generate-forms/submit-form.png":::

## Manage links

If you generate multiple links for a form, manage them by selecting **Manage Links**.

:::image type="content" source="media/powertable-how-to-generate-forms/manage-links.png" alt-text="Screenshot of the Enter Product Details form editor with the Manage Links button highlighted in the toolbar.":::

A window displays the list of form links and their details, including the link creator, creation date and time, access permissions, status, response count, and expiry date. Use the options in the **Action** column to copy or delete a form link.

:::image type="content" source="media/powertable-how-to-generate-forms/actions-manage-links.png" alt-text="Screenshot of the Manage Links window listing three active form links, with the copy and delete icons in the Action column highlighted." lightbox="media/powertable-how-to-generate-forms/actions-manage-links.png":::

## Customize form

This section describes the ways in which you can customize your forms.

### Add logo

Select **Add Logo** to add your organization's logo.

### Delete field

Select the field and select the **Delete (bin)** icon to remove it. You can't delete the **primary key** field.

:::image type="content" source="media/powertable-how-to-generate-forms/delete-field.png" alt-text="Screenshot of deleting a field from the form.":::

### Add field

1. Select **Add Field** to add a new field from the table.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-field-plus.png" alt-text="Screenshot of adding a field using the plus icon." lightbox="media/powertable-how-to-generate-forms/add-field-plus.png":::

1. Select the required fields from the list. Select **Select All** to select all the table fields to add to the form.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-field-select-all.png" alt-text="Screenshot of selecting all the fields to add them to the form." lightbox="media/powertable-how-to-generate-forms/add-field-select-all.png":::

1. Alternatively, select the **+** icon below or beside the required field to add a new field.

    :::image type="content" source="media/powertable-how-to-generate-forms/plus-icon-add-field.png" alt-text="Screenshot of the highlighted plus icon below the ProductSize field opening a field list with search and Select all options." lightbox="media/powertable-how-to-generate-forms/plus-icon-add-field.png":::

    :::image type="content" source="media/powertable-how-to-generate-forms/group-plus-icon.png" alt-text="Screenshot of grouping fields together using the plus icon." lightbox="media/powertable-how-to-generate-forms/group-plus-icon.png":::

### Edit field

1. Select a field to edit it.
1. In **Edit Field**, enter an optional description.
1. Set a default value for the field if needed, so that it is prefilled.
1. Turn on the **Required** toggle to make the field entry mandatory for the users.

    :::image type="content" source="media/powertable-how-to-generate-forms/edit-field.png" alt-text="Screenshot of the Edit Field pane for ProductSize with Description, Default Value set to L, and Required toggle highlighted." lightbox="media/powertable-how-to-generate-forms/edit-field.png":::

### Create field groups

To make user inputs more readable and organized, you can group related or similar fields together. In address blocks, for example, you can group related fields such as house number, street name, city, state, zip code, and so on.

Grouped fields also enable you to perform bulk operations on fields, such as hiding them or formatting them at once.

1. Select **Add Group** to create a new group.
1. Add fields to the new field group.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-group.png" alt-text="Screenshot of adding a new field group and adding fields to it." lightbox="media/powertable-how-to-generate-forms/add-group.png":::

### Edit group

1. Select the group to start editing it.
1. In the **Edit Group** side pane, enter the group name and a description.
1. Enable or disable the following options as needed:

    * **Show Title**: Enable this option to display the group name, or disable it to hide the name.
    * **Highlight Background**: Enable this option to highlight the group's background.

    :::image type="content" source="media/powertable-how-to-generate-forms/edit-group.png" alt-text="Screenshot of the form editor showing the Edit Group side pane with Title, Description, Show Title, and Highlight Background settings." lightbox="media/powertable-how-to-generate-forms/edit-group.png":::

### Add tab

You can split your form into multiple tabs and arrange relevant fields within each tab.

1. Select **Add Tab** to add a new tab in your form as shown in the following image.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-tab.png" alt-text="Screenshot of the form editor with the Add Tab option highlighted and a new Tab 1 added beside the General tab." lightbox="media/powertable-how-to-generate-forms/add-tab.png":::

1. Select **Tab 1** to add a name and description for the tab.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-tab-title.png" alt-text="Screenshot of the form editor with Tab 1 selected and the Edit Tab pane showing Product Details entered in the Title box." lightbox="media/powertable-how-to-generate-forms/add-tab-title.png":::

1. In the new tab, select **Add Field** to add the fields you want.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-tab-field.png" alt-text="Screenshot of the Product Details tab with the Add Field button highlighted and a dropdown listing fields such as ProductName and ModelName with checkboxes.":::

1. Select the dropdown beside it and select **Add Group** to add a field group.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-field-group-tab.png" alt-text="Screenshot of the Product Details tab with the dropdown beside Add Field highlighted and the Add Group option displayed.":::

1. Add fields to the group by selecting the **+** icon.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-field-to-group-tab.png" alt-text="Screenshot of Group 1 in the Product Details tab with the + icon highlighted and a field list showing checkboxes for fields like ProductName." lightbox="media/powertable-how-to-generate-forms/add-field-to-group-tab.png":::

Follow the same steps to create as many tabs as you want. To delete a tab, select it and then select the bin icon beside it.

## Manage forms

You can create and manage multiple forms for a table in the **Forms** window.

:::image type="content" source="media/powertable-how-to-generate-forms/manage-forms.png" alt-text="Screenshot of the Forms window listing two forms, with the Form 2 ellipsis menu open showing Delete Form, Duplicate Form, and Allow Submission options.":::

Select the horizontal ellipsis (...) next to a form to delete it, duplicate it, or allow submissions to the form.
