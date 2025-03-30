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

## Can't create Variable library item or variables

### Failure to create a Variable Library item

***Description of problem**: I tried to create a Variable library, but it failed.  
**Cause**: The name of the Variable library is invalid.  
**Solution**: Rename the Variable library according to [naming conventions](./variable-types.md#variable-library-item-name).

### Failure to create a variable in the Variable library

**Description of problem**: I tried to create a variable in the Variable library, but it failed.
**Cause**: There can be several reasons for this failure. Some reasons might include:

- The name of the variable or value-set is invalid.
- the value is not the correct type.
- The value is empty.
- The Variable library cells contain a false value.
- The Variable library size is greater than 1 MB.

**Solution**: Depending on the cause, you can try the following solutions:

- Review the errors in the validation pane and fix them so no required value is missing or mismatched with the variable type.
- Rename the variables amd value-set according to [naming conventions](./variable-types.md#variable-library-item-name).
- Remove unused variables or split the variables list into several Variable Library items.

## Update Variable library failed

***Description of problem**: I tried to update the Variable library (using the *Update* API ot through the UI), but it failed.
**Cause**: The update cam fail for any of several reasons, including:

- You forgot to save the variable in the Variable library
- The variable was deleted or renamed.  
**Solution**: Go back to the variable library, and check the names of the existing variables. If the variable you want exists but wasn't saved, save it. If you need to create it, create it. If it has a different name, remove the current reference, and replace it with the correct name in the data pipeline.


### Error message: Update failed during when using APIs

### Error message: Update failed during Git update

**Description of problem**: I tried to update the Variable library from my workspace through the UI, using the Update from Git.

## Deployment failed

### Error message: Can't start deployment

:::image type="content" source="./media/variable-library-troubleshoot/cant-start-deployment.png" alt-text="Screenshot of error message that says Can't start deployment.":::

**Description of problem**: I tried to deploy the Variable library, but I got a message that says *Can't start deployment*.
**Cause**: The selected active value set in the target stage is missing in the deployed Variable library. You might have removed or renamed the active value set in the source or target stage, so the active value set in the target stage is invalid.  
**Solution**: Change the name of the active value set in the target stage to one that exists in the source.

### Error message: Added variable can't be referenced

:::image type="content" source="./media/variable-library-troubleshoot/variable-not-found.png" alt-text="Screenshot of error message that says Can't start deployment.":::

**Description of problem**: I can't find the variable I want in the data pipeline.  
**Cause**: You might have forgotten to save the variable in the Variable library, or it might have been deleted or renamed.  
**Solution**: Go back to the variable library, and check the names of the existing variables. If the variable you want exists but wasn't saved, save it. If you need to create it, create it. If it has a different name, remove the current reference, and replace it with the correct name in the data pipeline.

### Active value set not changed

**Description of problem**: I changed the active value set in the Variable library, but it didn't change in the data pipeline.  
**Cause**: You might have forgotten to save your changes in the Variable library.  
**Solution**: Change the active value set again, and save.  

## Related content

- [Get started with Variable libraries](./get-started-variable-libraries.md)
