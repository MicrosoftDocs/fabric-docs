---
title: Generate forms
description: Learn how to generate forms to collect user inputs using PowerTable sheets.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to generate forms in PowerTable sheets so that I can easily capture and update table data through a structured form interface.
---

# Create data entry forms with PowerTable sheets

*Forms* allow you to collect data from users and write them directly to your database.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Forms can be used for various scenarios, such as capturing expense reports, collecting survey responses, running polls or quizzes, gathering customer feedback, registering event attendees, managing internal requests, or onboarding new users. Their structured layout and configurable fields make data collection easier and streamline workflows for both individuals and teams.

In this article, you learn how to quickly generate forms from your table to collect user inputs, store them in your PowerTable app, and write them back to the database.

## Create a form

1. Select **Setup > Forms**.

    :::image type="content" source="media/powertable-how-to-generate-forms/forms-setup.png" alt-text="Screenshot of the Forms button in the Setup tab of the menu ribbon." lightbox="media/powertable-how-to-generate-forms/forms-setup.png":::

1. Select **Create a Form**. A form is generated with all the fields in the database.

    :::image type="content" source="media/powertable-how-to-generate-forms/create-form.png" alt-text="Screenshot of the configuration options for creating a new form." lightbox="media/powertable-how-to-generate-forms/create-form.png":::

1. Select **Save** to generate the form with the default configuration.

## Customize form

This section describes ways you can further customize your forms.

### Add logo

Select **Add Logo** to add your organization's logo.

### Delete field

Select the field and select the **Delete (bin)** icon to remove it. You can't delete the **primary key** field.

:::image type="content" source="media/powertable-how-to-generate-forms/delete-field.png" alt-text="Screenshot of deleting a field from the form.":::

### Add field

1. Select **Add Field** to add a new field from the table. Alternatively, select the **+** icon next to any field to add a new field.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-field-plus.png" alt-text="Screenshot of adding a field using the plus icon." lightbox="media/powertable-how-to-generate-forms/add-field-plus.png":::

1. Select the required fields from the list. Select **Select All** to select all the table fields to add to the form.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-field-select-all.png" alt-text="Screenshot of selecting all the fields to add them to the form." lightbox="media/powertable-how-to-generate-forms/add-field-select-all.png":::

### Create field groups

To make user inputs more readable and organized, you can group related or similar fields together. In address blocks, for example, you can group related fields such as house number, street name, city, state, zip code, and so on.

Grouped fields also enable you to perform bulk operations on fields, such as hiding them or formatting them at once.

1. Select **Add Group** to create a new group.
2. A new field group is created, within which you can begin adding fields.

    :::image type="content" source="media/powertable-how-to-generate-forms/add-group.png" alt-text="Screenshot of adding a new field group and adding fields to it." lightbox="media/powertable-how-to-generate-forms/add-group.png":::

1. To group similar fields, use the **+** icon beside the field to group the new field with the existing one.

    :::image type="content" source="media/powertable-how-to-generate-forms/group-plus-icon.png" alt-text="Screenshot of grouping fields together using the plus icon." lightbox="media/powertable-how-to-generate-forms/group-plus-icon.png":::

### Add tab

You can split your form into multiple tabs and arrange relevant fields. Select **Add Tab** to add a new tab in your form. In the new tab, you can add fields.

### Other customizations and setup

In the **Form Setup**, you can also complete these actions:

* Enter a title and description for the form.
* Show or hide the logo and title.
* Customize the style for displaying field labels.
* Choose the submission message and turn on or off the one-response limit.

While editing a field, you can complete these actions:

* For each field, you can enter the title and description.
* Set a default value.
* Make it a mandatory field for users to enter.

Select **Preview** to preview, and **Save** to save the form.

## Share form

1. Select **Share** to create a shareable link for your form. You can share it to all users or restrict it to specific users by entering their email addresses.

1. Choose an expiration date for the form. Select **Generate Link**.

    :::image type="content" source="media/powertable-how-to-generate-forms/share-form.png" alt-text="Screenshot of generating a link to share the form." lightbox="media/powertable-how-to-generate-forms/share-form.png":::