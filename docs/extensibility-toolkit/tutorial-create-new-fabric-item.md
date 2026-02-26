---
title: Creating Custom Fabric Items
description: Complete guide for creating custom items in Microsoft Fabric using either AI assistance or manual scripted approach
ms.reviewer: gesaur
ms.topic: tutorial
ms.date: 12/15/2025
---

# Create a new Fabric Item

This comprehensive guide shows you how to create custom items in Microsoft Fabric using the Extensibility Toolkit. You can choose between two approaches based on your preference and experience level.

## Prerequisites

Before creating a custom item, ensure you have:

- ✅ Completed the [Setup Guide](./setup-guide.md) and have a working development environment
- ✅ Your workload is running locally and accessible in Fabric
- ✅ Familiarity with TypeScript and React (for customization)

## Choose Your Approach

### 🤖 AI-Assisted Approach (Recommended for New Developers)

Use GitHub Copilot to guide you through the entire process interactively. Perfect for:
- Developers new to the Fabric Extensibility Toolkit
- Learning the platform patterns and best practices
- Getting explanations and guidance as you work

### 🛠️ Manual Scripted Approach (Recommended for Experienced Developers)

Use the automated PowerShell script for quick setup. Perfect for:
- Developers familiar with the toolkit structure
- Creating multiple items efficiently
- Production workflows and automation

---

## 🤖 AI-Assisted Item Creation

### Getting Started with GitHub Copilot

GitHub Copilot can guide you through creating a complete custom Fabric item following all best practices. The AI understands the Extensibility Toolkit patterns and will help you implement them correctly.

#### Sample Prompts That Work

Here are proven prompts that will get you started with item creation:

**Basic Item Creation:**
```
@fabric create a new item called MyDataReport that shows data analysis reports
```

**Specific Requirements:**
```
@fabric create a custom item for managing data pipelines with these features:
- Pipeline configuration interface
- Status monitoring dashboard  
- Error handling and retry logic
```

**Complex Item with OneLake Integration:**
```
@fabric create an item called DataExplorer that:
- Browses OneLake files in the left panel
- Shows file preview in the center
- Saves user preferences and settings
```

#### Typical AI-Assisted Process

The AI-assisted approach follows this iterative pattern:

**1. Initial Planning Phase**
- AI analyzes your requirements
- Suggests item structure and components
- Creates a development plan with todos

**2. Component Generation**
- Creates the 4-file pattern (Definition, Editor, Empty, Ribbon)
- Implements proper TypeScript interfaces
- Sets up Fluent UI components

**3. Feature Implementation**
- Adds your specific functionality
- Integrates with Fabric APIs
- Implements proper error handling

**4. Testing and Refinement**
- Tests the item in your development environment
- Fixes any issues found
- Optimizes performance and user experience

#### Working with the AI Assistant

**Start with Clear Requirements:**
```
I want to create a [ItemType] item that [primary purpose]. 
The item should have [list key features].
Users should be able to [list main actions].
```

**Iterate and Refine:**
```
The item looks good, but I need to add [specific feature]
```

```
How can I integrate this with OneLake storage?
```

```
Can you add error handling for when the API is unavailable?
```

**Ask for Explanations:**
```
Explain why you chose this pattern for the ribbon actions
```

```
What's the difference between ItemEditor and ItemEditorDefaultView?
```

#### Best Practices for AI Collaboration

- **Be Specific**: Provide clear requirements and context
- **Review Each Step**: Understand the generated code before proceeding
- **Ask Questions**: Request explanations for patterns you don't understand
- **Test Frequently**: Run and test the item after each major change
- **Follow Up**: Ask for refinements and improvements

### AI Development Tools and Environment

This repository works exceptionally well with AI pair-programming tools. Whether you develop locally or in GitHub Codespaces, you can use GitHub Copilot or other AI assistants to accelerate tasks like editing React components, updating routes, or generating test scaffolding.

> [!TIP]
> The Starter-Kit repository is AI-enabled and includes GitHub Copilot instructions that guide you through adapting the Hello World item to your needs. Other AI tools (for example, Anthropic Claude) can follow the same guidance, but must be configured to read the repository's guidance files or docs.

**Specific AI assistance areas:**
- Use AI to draft item editor/view components and then adapt to the host API patterns used in the Starter-Kit
- Ask AI to summarize the workload manifest and propose minimal permission sets
- In Codespaces, Copilot is available in the browser or VS Code desktop; keep the dev server running to see changes instantly

> [!TIP]
> If you're interested to see what others build, open the [Extensibility Samples](https://aka.ms/fabric-extensibility-toolkit-samples) and deploy it to your environment. There you can find rich item types that help you get started.

### Rapid Iteration and Debugging

The Extensibility framework is designed for rapid development when using AI assistance:

- With the dev server and DevGateway running, code changes in your app are reflected immediately when you open your item inside Fabric
- You can debug using your browser's dev tools while the workload is hosted in the Fabric iFrame
- Iterate on UI, routes, and manifest configuration quickly, and validate end-to-end behavior in your Fabric workspace
- AI tools can help identify and fix issues in real-time as you develop

### Expected Timeline

- **Simple Item**: 30-60 minutes with AI guidance
- **Complex Item**: 1-3 hours with multiple iterations
- **Advanced Item**: Half day with extensive customization

---

## 🛠️ Manual Scripted Approach

### Using the CreateNewItem.ps1 Script

The manual approach uses an automated PowerShell script that copies the HelloWorld item template and configures it for your new item.

#### Quick Start

1. **Navigate to the script directory:**
   ```powershell
   cd scripts\Setup
   ```

2. **Run the creation script:**
   ```powershell
   .\CreateNewItem.ps1 -ItemName "MyCustomItem"
   ```

#### What the Script Does

**Automated File Creation:**
- ✅ Copies all 4 core component files from HelloWorld template
- ✅ Renames files to match your item name
- ✅ Updates all internal references and imports
- ✅ Creates manifest files (XML and JSON configurations)
- ✅ Copies and renames icon assets

**Generated File Structure:**
```
Workload/app/items/MyCustomItemItem/
├── MyCustomItemDefinition.ts         # Data model and interfaces
├── MyCustomItemEditor.tsx            # Main editor component
├── MyCustomItemEditorEmpty.tsx       # First-time user experience
├── MyCustomItemEditorRibbon.tsx      # Action buttons and toolbar
└── MyCustomItem.scss                 # Styling

Workload/Manifest/items/MyCustomItem/
├── MyCustomItemItem.xml              # Item type definition
└── MyCustomItemItem.json             # Item configuration

Workload/Manifest/assets/images/
└── MyCustomItemItem-icon.png         # Item icon
```

### Required Manual Steps

After running the script, you **must** complete these manual configuration steps:

#### 1. Update Environment Files 🚨 CRITICAL

Add your new item to the `ITEM_NAMES` variable in ALL environment files:

**Files to update:**
- `Workload\.env.dev`
- `Workload\.env.test`  
- `Workload\.env.prod`

**Change from:**
```
ITEM_NAMES=HelloWorld
```

**Change to:**
```
ITEM_NAMES=HelloWorld,MyCustomItem
```

> ⚠️ **Without this step, your item will NOT appear in the workload!**

#### 2. Update Product.json Configuration

Add your item configuration to `Workload\Manifest\Product.json`:

```json
{
  "items": [
    {
      "name": "HelloWorldItem",
      // ... existing config
    },
    {
      "name": "MyCustomItemItem",
      "displayName": "My Custom Item",
      "description": "Description of what your item does",
      "contentType": "MyCustomItem",
      "configurationSections": []
    }
  ]
}
```

#### 3. Add Localization Strings

Update translation files in `Workload\Manifest\assets\locales\`:

**In `en-US.json` (and other locale files):**
```json
{
  "MyCustomItemItem": {
    "displayName": "My Custom Item",
    "description": "Description of your custom item"
  }
}
```

#### 4. Add Routing Configuration

Update `Workload\app\App.tsx` to include routing for your new item:

```typescript
// Add import
import { MyCustomItemEditor } from "./items/MyCustomItemItem/MyCustomItemEditor";

// Add route in the Routes section
<Route path="/MyCustomItemItem-editor" element={<MyCustomItemEditor {...props} />} />
```

### Verification Steps

After completing all manual steps:

1. **Build the project:**
   ```powershell
   npm run build
   ```

2. **Restart the development server:**
   ```powershell
   .\scripts\Run\StartDevServer.ps1
   ```

3. **Test in Fabric:**
   - Navigate to your workload in Fabric
   - Verify your new item type appears in the creation dialog
   - Create an instance and verify it loads correctly

---

## Best Practices and Guidelines

### Why Not Rename HelloWorld?

The HelloWorld item serves as the **reference template** that receives regular updates from Microsoft. Key reasons to keep it unchanged:

- **Updates and Improvements**: Microsoft regularly updates HelloWorld with new features, bug fixes, and best practices
- **Integration Testing**: HelloWorld ensures your environment is working correctly
- **Reference Documentation**: It serves as live documentation for implementation patterns
- **Backward Compatibility**: Updates maintain compatibility with existing customizations

### Recommended Workflow

1. **Keep HelloWorld Untouched**: Use it as your reference and testing item
2. **Create New Items**: Use the script or AI assistance to create separate items
3. **Regular Updates**: Periodically pull updates from the base repository
4. **Merge Patterns**: Apply new patterns from updated HelloWorld to your custom items

### Item Development Best Practices

**Component Architecture:**
- ✅ Follow the 4-component pattern (Definition, Editor, Empty, Ribbon)
- ✅ Use ItemEditor container for consistent layout and behavior
- ✅ Implement proper loading states and error handling
- ✅ Follow Fluent UI design patterns

**Data Management:**
- ✅ Use `saveWorkloadItem()` for items with complex data
- ✅ Use `getWorkloadItem()` for loading with fallback defaults
- ✅ Implement proper TypeScript interfaces in Definition file
- ✅ Handle undefined/empty states gracefully

**User Experience:**
- ✅ Provide clear empty states for first-time users
- ✅ Use proper loading indicators
- ✅ Implement helpful error messages
- ✅ Follow Fabric design patterns and accessibility guidelines

### Performance Considerations

- **Lazy Loading**: Only load data when needed
- **Efficient Updates**: Use React patterns to minimize re-renders
- **OneLake Integration**: Use `createItemWrapper()` for proper scoping
- **Error Boundaries**: Implement proper error handling throughout

---

## Next Steps

Once your item is created:

1. **Customize the Data Model**: Update the Definition file with your specific interfaces
2. **Implement Core Features**: Build out the main functionality in the Editor component
3. **Design Empty State**: Create an engaging first-time user experience
4. **Configure Actions**: Set up appropriate ribbon actions for your workflow
5. **Test Thoroughly**: Verify all functionality in your development environment
6. **Prepare for Production**: Follow the [publishing guide](./publishing-overview.md) when ready

## Troubleshooting

**Item doesn't appear in workload:**
- ✅ Check ITEM_NAMES in all .env files
- ✅ Verify Product.json configuration
- ✅ Restart the development server

**Build errors:**
- ✅ Check TypeScript interfaces in Definition file
- ✅ Verify all imports are correct
- ✅ Ensure routing is properly configured

**Runtime errors:**
- ✅ Check browser console for detailed error messages
- ✅ Verify API integration and authentication
- ✅ Test with simplified data first

## Additional Resources

- [ItemEditor Control Documentation](./how-to-store-item-definition.md)
- [OneLake Integration Guide](./how-to-store-data-in-onelake.md)
- [Fabric API Usage](./how-to-access-fabric-apis.md)
- [Publishing Requirements](./publishing-requirements-item.md)

Happy coding! 🚀
