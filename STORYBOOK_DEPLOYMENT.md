# Storybook Deployment Guide

## 🚀 Deploy Storybook to Vercel

### Prerequisites
- GitHub repository with your code
- Vercel account (free at [vercel.com](https://vercel.com))

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Storybook deployment configuration"
git push origin main
```

### Step 2: Deploy on Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your `makyo-dropdown-test` repository
   - Vercel will auto-detect the configuration

3. **Configure Build Settings**
   - **Framework Preset**: Other
   - **Build Command**: `npm run build-storybook`
   - **Output Directory**: `storybook-static`
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (1-2 minutes)

### Step 3: Access Your Storybook
- Your Storybook will be available at: `https://makyo-dropdown-test.vercel.app`
- You can customize the domain in Vercel settings

## 📋 What's Included

### Interactive Component Documentation
- **Dropdown Component** with all features
- **Interactive Controls** for testing different props
- **Color Pickers** for customization
- **Boolean Toggles** for features
- **Array Editor** for options

### Features Demonstrated
- ✅ Multi-selection dropdown
- ✅ Single selection mode
- ✅ Search functionality with highlighting
- ✅ Portal mode (floating dropdown)
- ✅ Customizable colors
- ✅ Z-index management

## 🔧 Local Development

### Run Storybook Locally
```bash
npm run storybook
```
- Opens at: http://localhost:6006

### Build Storybook Locally
```bash
npm run build-storybook
```
- Output: `storybook-static/` directory

### Preview Built Storybook
```bash
npm run preview-storybook
```
- Opens at: http://localhost:6007

## 📁 File Structure
```
├── .storybook/
│   ├── main.ts          # Storybook configuration
│   └── preview.ts       # Global settings and CSS imports
├── src/stories/
│   └── Dropdown.stories.jsx  # Component stories
├── vercel.json          # Vercel deployment config
└── storybook-static/    # Built Storybook (generated)
```

## 🎨 Customization

### Adding New Stories
1. Create `.stories.jsx` files in `src/stories/`
2. Follow the pattern in `Dropdown.stories.jsx`
3. Use `argTypes` for interactive controls

### Styling
- Global styles: `.storybook/preview.ts`
- Component styles: `src/index.css`
- Tailwind CSS is automatically included

## 🔄 Automatic Deployments
- **Push to main branch** → Automatic deployment
- **Pull requests** → Preview deployments
- **Custom domains** → Available in Vercel dashboard

## 📊 Performance
- **Build time**: ~1-2 minutes
- **Bundle size**: ~2.5MB (optimized)
- **Load time**: <3 seconds on fast connections

## 🛠️ Troubleshooting

### Build Fails
1. Check Node.js version (>=16.0.0)
2. Run `npm install` locally
3. Test with `npm run build-storybook`

### Styles Not Loading
1. Ensure `src/index.css` is imported in `.storybook/preview.ts`
2. Check Tailwind CSS configuration
3. Verify component imports

### Component Not Rendering
1. Check console for errors
2. Verify component exports
3. Test component in isolation

## 📞 Support
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Storybook Docs**: [storybook.js.org](https://storybook.js.org)
- **GitHub Issues**: [github.com/Praise-Oyeniyi/makyo-dropdown-test/issues](https://github.com/Praise-Oyeniyi/makyo-dropdown-test/issues)
