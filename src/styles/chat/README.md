# Chat Component Styles

This directory contains all the CSS styles for the chat components. The styling has been refactored to remove inline styles and use proper CSS classes.

## File Structure

- `index.css` - Main styles file that imports all component styles
- `chat.css` - Main chat container styles
- `message-input.css` - Message input component styles
- `message-list.css` - Message list container styles
- `message-row.css` - Individual message row styles
- `user-message.css` - User message bubble styles
- `assistant-message.css` - Assistant message bubble styles
- `bubble-message-content.css` - Message content and loading styles
- `tool-message.css` - Tool message styles

## Usage

To use these styles, simply import the main `index.css` file in your main chat component:

```jsx
import '../styles/chat/index.css';
```

This will import all the necessary styles for all chat components.

## Features

- **Responsive Design**: Mobile-friendly layouts with proper breakpoints
- **Dark Mode Support**: Automatic dark mode detection and styling
- **Modern UI**: Clean, professional appearance with smooth transitions
- **Accessibility**: Proper contrast ratios and focus states
- **Consistent Spacing**: Unified spacing system using CSS custom properties

## Component-Specific Styles

### Chat Container
- Main chat layout with flexbox
- Proper height and width management
- Loading state styling

### Message Input
- Textarea with auto-resize functionality
- Send button with hover effects
- Focus states and transitions

### Message Bubbles
- User messages: Blue background, right-aligned
- Assistant messages: Gray background, left-aligned
- Proper border radius and padding
- Markdown content support

### Tool Messages
- Centered, subtle styling
- Icon support for different tool types
- Consistent with overall design

## Customization

To customize the chat appearance, modify the CSS variables in the respective component files. The styles use a consistent color palette and spacing system that can be easily adjusted.
