# 🚀 Stylist AI — Launch Guide
# How to go live and start making money

---

## STEP 1 — Install the tools you need (do this once)

1. Download **Node.js** from https://nodejs.org (click the LTS button)
2. Download **Git** from https://git-scm.com/download/win
3. Download **VS Code** from https://code.visualstudio.com
   - ✅ During install, check "Add to PATH"

---

## STEP 2 — Get your OpenAI API Key (needed to run the AI)

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`) — save it somewhere safe
5. Add billing at https://platform.openai.com/account/billing
   - Start with $10 credit — plenty for thousands of AI calls

---

## STEP 3 — Set up the project on your computer

Open the "Command Prompt" (press Windows key, type "cmd", press Enter) and run:

```
cd Desktop
git clone https://github.com/Pasta152/Stylist-App.git
cd Stylist-App
```

Then REPLACE all the files in the folder with the new files from this ZIP.
(Just copy-paste and overwrite everything)

Then run:
```
npm install
```

---

## STEP 4 — Add your API key locally (for testing)

In the project folder, create a file called `.env` (no extension) with this content:

```
OPENAI_API_KEY=sk-...paste your key here...
```

Then test the app:
```
npm run dev
```

Open http://localhost:5173 in your browser. The app should work! 🎉

---

## STEP 5 — Deploy to the internet (FREE hosting on Vercel)

1. Go to https://vercel.com and sign up with your GitHub account
2. Click "Add New Project"
3. Click "Import" next to your Stylist-App repository
4. In the "Environment Variables" section, add:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-...your key...`
5. Click "Deploy"

✅ In 2 minutes your app is live at a real URL like `stylist-ai.vercel.app`!

You can also connect a custom domain (e.g. `mystylistapp.com`) in Vercel settings.

---

## STEP 6 — Set up affiliate links (START MAKING MONEY)

This is where you earn commissions on every sale. Takes 30 minutes to set up.

### Option A: Amazon Associates (easiest, worldwide)
1. Go to https://affiliate-program.amazon.com
2. Sign up (you need a website — use your Vercel URL)
3. After approval, you get a tracking tag like `yourname-20`
4. Open `src/lib/constants.js`
5. Change line: `const AMAZON_TAG = 'YOUR-TAG-20'`
   to: `const AMAZON_TAG = 'yourname-20'`
6. Save, push to GitHub, Vercel auto-redeploys

### Option B: Zalando Partner (best for Europe/EU)
1. Go to https://www.zalando.com/partner-program/
2. Apply (takes a few days to approve)
3. They give you custom affiliate URLs
4. Replace the `zalandoLink()` function URLs in constants.js with your real links

**Expected earnings:**
- Amazon pays 3–8% commission
- Zalando pays 5–12% commission
- If 1,000 users/month click through and 5% buy a €70 item → €210–€420/month
- This grows with your user base — no extra work once set up!

---

## STEP 7 — Tell people about your app!

Free marketing ideas:
- Post on Instagram/TikTok showing the app in action (weather + outfit)
- Post in fashion subreddits: r/femalefashionadvice, r/malefashionadvice
- Share in Facebook fashion groups
- Post on Pinterest (fashion audience is huge there)

Your pitch: "Free AI stylist that picks your outfit based on today's weather 🌦️👗"

---

## WHAT'S ALREADY BUILT ✅

- ✅ AI outfit generation (weather-aware)
- ✅ AI wardrobe photo tagging
- ✅ Affiliate product cards (revenue!)
- ✅ Community inspo feed
- ✅ Mobile-first PWA (works on phones)
- ✅ GDPR consent banner (legally required in EU)
- ✅ Daily usage limits (protects your API costs)
- ✅ Secure API key (never exposed to users)
- ✅ Free tier upsell prompt (freemium model)

## WHAT TO ADD NEXT (Phase 2)

- [ ] Supabase auth → user accounts (wardrobes save between sessions)
- [ ] Stripe payment → Pro subscription (€7.99/month)
- [ ] Push notifications → "Your outfit is ready!" each morning
- [ ] More languages (French, German, Spanish)

---

## COSTS TO RUN THE APP

| Service | Cost |
|---------|------|
| Vercel hosting | FREE |
| OpenAI API | ~$0.002 per outfit generated |
| Domain name | ~$12/year (optional) |

At 1,000 users/month generating 3 outfits each = ~$6/month in API costs.
At 10,000 users = ~$60/month.
Your affiliate revenue should far exceed this.

---

## NEED HELP?

Contact the AI that built this: keep chatting in Claude! 🤖
