# GitHub Pages Deployment: Two Branches

This repository uses **two separate branches** for deploying customer and admin portals independently:

## Branch Structure

- **`master`** — Customer loyalty portal  
  Deploys to: `https://wnkkk.github.io/jims-acai/`  
  Workflow: [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)  
  Files: `index.html` (landing), `jims-acai-customer.html`, supporting assets

- **`admin-pages`** — Admin dashboard portal  
  Deploys to: Same Pages site, triggered by admin-pages push  
  Workflow: [.github/workflows/deploy-admin-pages.yml](.github/workflows/deploy-admin-pages.yml)  
  Files: `admin.html` and shared config files

## Setup (One Time)

### 1. Push `master` branch (Customer Portal)
```bash
cd "c:/Users/wlove/Downloads/Jim's"
git add .
git commit -m "Add customer portal and Pages workflows"
git push origin master
```

### 2. Create and push `admin-pages` branch
```bash
# Create branch from master
git checkout -b admin-pages

# Push it to GitHub
git push -u origin admin-pages
```

### 3. Configure GitHub Pages (Settings)
- Go to your repo → Settings → Pages
- Under Source, choose **GitHub Actions**
- Pages will now accept deployments from both workflows

### 4. Allow both branches in the `github-pages` environment
- Settings → Environments → `github-pages`
- Under "Deployment branches and tags", click "Selected branches and tags"
- Add both `master` and `admin-pages` (or choose "All branches")
- Save

## Using Both Deployments

**After setup completes, your sites will be:**

| Portal | Branch | URL |
|--------|--------|-----|
| Landing page | master | https://wnkkk.github.io/jims-acai/ |
| Customer | master | https://wnkkk.github.io/jims-acai/jims-acai-customer.html |
| Admin | admin-pages | https://wnkkk.github.io/jims-acai/admin.html |

### Updating Customer Portal
```bash
git checkout master
# Make changes to customer files
git add .
git commit -m "Update customer portal"
git push origin master
```
→ Triggers: [deploy-pages.yml](.github/workflows/deploy-pages.yml)

### Updating Admin Portal  
```bash
git checkout admin-pages
# Make changes to admin files
git add .
git commit -m "Update admin portal"
git push origin admin-pages
```
→ Triggers: [deploy-admin-pages.yml](.github/workflows/deploy-admin-pages.yml)

## Important Notes

- **Shared files**: If you update `jims-acai-customer.html` on `master`, also sync it to `admin-pages` (they can share the Firebase config and other common files).
- **Environment separation**: Each branch has its own Pages deployment context, avoiding the protection rule conflicts.
- **Workflows**: Both workflows are identical; they simply listen to different branches.

## Troubleshooting

If a workflow still fails:
1. Check GitHub → Settings → Pages → Source is set to "GitHub Actions"
2. Check your branch is listed in Settings → Environments → `github-pages` → Deployment branches
3. Re-run the failed workflow: Actions → select the run → "Re-run jobs"
