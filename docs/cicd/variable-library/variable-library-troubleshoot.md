---
title: Troubleshoot Variable libraries
description: Troubleshoot common errors and issues when working with Variable libraries in Microsoft Fabric.
author: billmath
ms.author: billmath
ms.service: fabric
ms.topic: troubleshooting-problem-resolution #Don't change.
ms.date: 02/16/2025

#customer intent: As a developer, I want to learn how to troubleshoot Variable libraries, so that I can manage my content lifecycle.

---

# Troubleshoot Variable libraries

This article describes common errors and issues that you might encounter when working with Variable libraries and provides solutions to help you resolve them.

## Failure to manage Variable library

### I can't find the *Create Variable library* icon

**Description of problem**: I want to create a Variable library, but I can't find the *Create Variable library* icon.

**Cause**: The *Create Variable library* icon is only available if the *Users can create Variable libraries* tenant switch is enabled in the Admin portal.

**Solution**: If you're an admin, go to the Admin portal, and enable the *Users can create Variable libraries* [tenant switch](../../admin/service-admin-portal-microsoft-fabric-tenant-settings.md). If you're not an admin, contact your admin. Wait an while, refresh the browser and clean the cache, and check again. Note that it can take up to an hour for the change to take effect.

:::image type="content" source="./media/variable-library-troubleshoot/create-variable-library-enabled.png" alt-text="Screenshot of Users can create Variable library tenant switch.":::

### I can't create a Variable Library item

**Description of problem**: I tried to create a Variable library, but it failed.

**Cause**: The name of the Variable library is invalid.

**Solution**: Rename the Variable library according to [naming conventions](./variable-types.md#variable-library-item-name).

### I can't save my Variable library

**Description of problem**: I tried to save my Variable library, but it failed.

**Cause**: There can be several reasons for this failure. Some reasons might include:

- The name of the variable or value-set is invalid.
- the value isn't the correct type.
- The value is empty.
- The Variable library size is greater than 1 MB.

**Solution**: Depending on the cause, you can try the following solutions:

- Review the errors in the validation pane and fix them so no required value is missing or mismatched with the variable type.
- Ensure that all variables and value-sets are named according to the [naming conventions](./variable-types.md#variable-library-item-name).
- Reduce the size of the Variable library item to less than 1 MB by removing unused variables or splitting the variables list into several Variable Libraries.

## Deployment pipeline failure

### I can't deploy my variable library in my deployment pipeline

**Description of problem**: I tried to deploy the Variable library, but I got a message that says *Can't start deployment*.

:::image type="content" source="./media/variable-library-troubleshoot/cant-start-deployment.png" alt-text="Screenshot of error message that says Can't start deployment.":::

**Cause**: The active value set in the target stage is missing in the deployed Variable library. This could happen if you removed or renamed the active value set in the source or target stage.

**Solution**: Change  the active value set in the target stage, or rename the current one to one that exists in the source.

## Variable reference failure

### Error message: I can't reference added variable

<!---
:::image type="content" source="./media/variable-library-troubleshoot/variable-not-found.png" alt-text="Screenshot of error message that says Variable not found.":::
--->

**Description of problem**: I can't find the variable I want to refer to in the data pipeline.  
**Cause**: Some reasons a variable might not appear in the data pipeline include:

- The variable wasn't saved
- The variable was deleted or renamed.
- The Variable library was moved to another Variable library

**Solution**: Go back to the variable library, and check the names of the existing variables.

If the variable you want exists but wasn't saved, save it.
If it doesn't exist, create it.

After you find and fix the problem, remove the current reference and replace it with the correct name in the data pipeline.

### Active value set not changed

**Description of problem**: I changed the active value set in the Variable library, but I still get the value from the previous active value set.  
**Cause**: You might have forgotten to save your changes in the Variable library.  
**Solution**: Go back to the Variable library, ensure the correct value set is set to active, and save.  

## Related content

- [Get started with Variable libraries](./get-started-variable-libraries.md)
