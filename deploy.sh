#!/bin/bash

echo "========================================"
echo "HarmonyInn Premium Redesign Deployment"
echo "========================================"
echo ""

cd /c/Users/acer/harmonyinn-redesign || exit

echo "[Step 1] Initializing Git Repository..."
git init

echo ""
echo "[Step 2] Adding all files..."
git add .

echo ""
echo "[Step 3] Creating commit..."
git commit -m "Complete premium redesign - 4-star luxury hotel experience

- Premium hero section with image slider and trust badges
- Complete rooms page with detailed galleries (4 rooms)
- Professional image lightbox with keyboard navigation
- Dining section (Melting Pot & Barrel)
- Events & banquet halls showcase (4 halls)
- Entertainment calendar with weekly events
- Testimonials carousel with verified badges
- Interactive location map and contact section
- Mobile-responsive design with premium animations
- Luxury color palette and professional typography
- Conversion-optimized booking flow with multiple CTAs
- Sticky booking bar and navigation
- Comprehensive footer with social links

Tech Stack: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion"

echo ""
echo "[Step 4] Adding remote repository..."
git remote add origin https://github.com/devexpertaug-stack/harmonyinn.git

echo ""
echo "[Step 5] Creating feature branch..."
git checkout -b premium-redesign

echo ""
echo "[Step 6] Pushing to GitHub..."
git push -u origin premium-redesign --force

echo ""
echo "========================================"
echo "SUCCESS! Branch pushed to GitHub"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Go to: https://github.com/devexpertaug-stack/harmonyinn"
echo "2. You'll see a 'Compare & pull request' button"
echo "3. Click it to create the PR"
echo "4. Review the changes and merge when ready"
echo "5. Lovable will auto-sync and deploy!"
echo ""
echo "OR to push directly to main:"
echo "  git checkout main"
echo "  git push -u origin main --force"
echo ""
