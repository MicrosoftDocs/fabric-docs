---
title: Troubleshoot Variable libraries
description: "[Article description]."
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.topic: troubleshooting-problem-resolution #Don't change.
ms.date: 02/16/2025

#customer intent: As a developer, I want to learn how to troubleshoot Variable libraries, so that I can manage my content lifecycle.

---

# Troubleshoot Variable libraries

This article describes common errors and issues that you might encounter when working with Variable libraries and provides solutions to help you resolve them.

## Error message: Can't start deployment

:::image type="content" source="./media/variable-library-troubleshoot/cant-start-deployment.png" alt-text="Screenshot of error message that says Can't start deployment.":::

**Description of problem**: Selected active value set in the target stage is missing in the deployed Variable library.
**Cause**: You removed or renamed the active value set in the source stage or in Git, so the active value set in the target stage is invalid.  
**Solution**: Change the name of the active value set in the target stage to one that exists in the Variable library. You can do this manually (through the UI), with the *Update API*, or update from Git. Then, re-deploy the Variable library.

## Error message: Variable not found

**Description of problem**: I added a variable to the Variable library, but I can't find it in the data pipeline.
**Cause**: You might have forgotten to save the variable in the Variable library.  
**Solution**: Create the variable again and save select save.

## Active value set not changed

**Description of problem**: I changed the active value set in the Variable library, but it didn't change in the data pipeline.
**Cause**: You might have forgotten to save your changes in the Variable library.  
**Solution**: Change the active value set again, and save.

## Related content

- [Get started with Variable libraries](./get-started-variable-libraries.md)
