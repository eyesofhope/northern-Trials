# 🧪 Local Testing Guide

## Test Before Deploying

### Method 1: Double-Click (Simplest)
1. Find `index.html` in your folder
2. Double-click to open in your browser
3. Website opens locally
4. Test all features

**Note**: Some features (like EmailJS) may not work locally due to CORS. Deploy to test fully.

### Method 2: Live Server (Recommended)
If you have VS Code installed:

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Auto-refreshes on changes

### Method 3: Python Server
If you have Python installed:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Method 4: Node.js Server
If you have Node.js installed:

```bash
npx serve .
```

Then open: `http://localhost:3000`

---

## Testing Checklist

### Visual Testing
- [ ] Hero section displays correctly
- [ ] All images load
- [ ] Text is readable
- [ ] Colors look good
- [ ] Spacing is consistent

### Navigation Testing
- [ ] Navbar links work
- [ ] Smooth scroll works
- [ ] Mobile menu opens/closes
- [ ] All sections accessible

### Animation Testing
- [ ] Typewriter effect in hero
- [ ] Parallax scrolling works
- [ ] Cards animate on scroll
- [ ] Journey map bus moves
- [ ] Polaroid photos animate

### Form Testing
- [ ] Booking modal opens
- [ ] Form fields validate
- [ ] Required fields work
- [ ] Phone number format correct
- [ ] Modal closes properly

### Mobile Testing
1. Open browser DevTools (F12)
2. Click device toggle icon
3. Select iPhone/Android
4. Test all features
5. Check different screen sizes

**Test these devices:**
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] Desktop (1920px)

### Link Testing
- [ ] WhatsApp button opens correctly
- [ ] Phone number clickable
- [ ] Email link works
- [ ] Social media links (if added)
- [ ] All internal navigation

### Performance Testing
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Generate report"
4. Check scores:
   - Performance: 95+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 95+

### Browser Testing
Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iPhone)
- [ ] Mobile Chrome (Android)

---

## Common Issues & Fixes

### Images Not Loading
**Problem**: Broken image icons
**Fix**: Check internet connection (images are from Unsplash CDN)

### Animations Not Working
**Problem**: Elements don't animate
**Fix**: Scroll slowly, animations are scroll-triggered

### Form Not Submitting
**Problem**: "Failed to send" error
**Fix**: 
1. Check EmailJS configuration
2. Verify internet connection
3. Use WhatsApp button as fallback

### Mobile Menu Stuck
**Problem**: Menu won't close
**Fix**: Refresh page, check JavaScript console for errors

### Slow Loading
**Problem**: Website takes too long
**Fix**: 
1. Check internet speed
2. Clear browser cache
3. Test on different network

---

## Advanced Testing

### Network Throttling
1. DevTools → Network tab
2. Select "Slow 3G"
3. Reload page
4. Should load in <2.5s

### Console Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Fix any issues found

### Accessibility Testing
1. Use keyboard only (Tab key)
2. Can you navigate everything?
3. Can you submit form?
4. Test with screen reader (optional)

---

## Pre-Deployment Final Check

Before deploying, verify:

✅ **Content**
- [ ] No typos or grammar errors
- [ ] Phone number correct
- [ ] Email address correct
- [ ] Package price accurate
- [ ] All dates/details current

✅ **Technical**
- [ ] EmailJS configured (if using)
- [ ] No console errors
- [ ] All links work
- [ ] Images load
- [ ] Mobile responsive

✅ **Performance**
- [ ] Lighthouse score 95+
- [ ] Fast load time
- [ ] Smooth animations
- [ ] No lag on scroll

✅ **Functionality**
- [ ] Booking modal works
- [ ] WhatsApp button works
- [ ] Form validation works
- [ ] Navigation smooth
- [ ] All CTAs clickable

---

## Ready to Deploy?

If all tests pass, you're ready to go live!

Follow the deployment guide in `README.md` or `QUICKSTART.md`.

**Good luck! 🚀**
