# 🔐 Environment Setup Guide

## Step 1: Create `.env.local` file

Create a file named `.env.local` in the root directory (`C:\Users\ikouroum\bridge55-app\bridge55-final-fixed\`)

## Step 2: Add Supabase Credentials

Copy your credentials from the vite-app project or Supabase dashboard:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_ENV=development
```

## Step 3: Get Your Credentials

### Option A: From vite-app project
1. Open `C:\Projects\bridge55-vite-app\.env.local`
2. Copy the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Paste into your new `.env.local` file

### Option B: From Supabase Dashboard
1. Go to https://app.supabase.com
2. Select your project
3. Go to Settings > API
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

## Step 4: Verify Setup

After creating `.env.local`, restart your dev server:

```bash
npm run dev
```

Check browser console for:
```
✅ Supabase connected successfully
```

---

**⚠️ IMPORTANT:** 
- Never commit `.env.local` to git (it's in .gitignore)
- Keep your anon key secure
- Use different credentials for production

