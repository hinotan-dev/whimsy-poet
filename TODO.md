# ✅ TODO: WhimsyPoet

A playful poem generator inspired by the rhythm and whimsy of classic children’s books.

---

## ✨ Features

- [x] Keyword input field with local state
- [x] Generate poem from keywords using AI API
- [x] Display generated poem in a separate component
- [x] Auto-generate a “book cover” with first character
- [x] Save generated poem to `localStorage`
- [x] Include metadata: keywords, markdown, first character, local ID
- [x] View saved poems as clickable “book covers”
- [x] Display selected poem from Library view
- [x] Add delete button to remove saved poems
- [x] Allow user to view and edit keywords from saved poems
- [x] Basic screen/page switching (without router)

---

## 🧪 In Progress / Ideas to Explore

- [ ] Add site menu icons
- [ ] Make the site compatible on mobile/iPad
- [ ] Add Info/About page
- [ ] Visualize rhythm ("da-DUM" beats)
- [ ] Share poem (image or `.md` download)
- [ ] Handle duplicate keywords more gracefully
- [ ] Add fallback state: “no poems saved yet” view

---

## 📦 Tech & Infra

- [x] Host app on Vercel
- [x] Use serverless functions to safely call OpenAI API
- [x] Store poem data in `localStorage` only
- [ ] Add `.env.example` to show API key usage pattern
- [ ] Consider offline mode / cache poem library for PWA use

---

## 📓 Notes

- Current AI image generator: Sora
- All content is locally stored — no user accounts needed
- Project intended as a creative, educational tool for kids & teachers

---

