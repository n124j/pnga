# PNGA website

Website of the Pennsylvania Nepalese Guthi Association. It is a static site: every page is built ahead of
time as plain HTML, so it loads fast, works well in search engines and needs no server.

Built with React, Vite, Tailwind CSS and `vite-react-ssg` (pre-rendering).

## Run it on your computer

```bash
npm install
cp .env.example .env.local     # then fill in the values (see below)
npm run dev                    # http://localhost:3000
npm run build                  # writes the finished site to dist/
```

## Where things are edited

| To change… | Edit this file |
| --- | --- |
| Address, phone, email, social links, tax ID, donation link, top-of-page announcement | `.env.local` and `lib/site.ts` |
| Upcoming events | `data/events.ts` (past events hide themselves) |
| Board and advisors (names and titles only; no personal phone or email is published) | `data/board.ts` |
| Programs (what PNGA does) | `data/programs.ts` |
| Our history and supporters | `pages/History.tsx`, `pages/About.tsx` |
| Gallery photos | `data/gallery.ts` |
| Privacy, terms, accessibility text | `pages/Legal.tsx` |
| Colors and fonts | `index.css` |

A later phase moves events, news and resources into a Google Sheet so volunteers can update them without code.

## Settings (`.env.local`, or your host's "environment variables")

See `.env.example`. Nothing there is secret, because it is compiled into the public site.
Never put a private API key in a `VITE_` variable.

- `VITE_SITE_URL` must be set to the real public address (for example `https://example.org`) before going
  live. It creates canonical links, the sitemap and the social preview links.
- Email, phone, social links and tax ID stay hidden until you fill them in.
- `VITE_DONATE_URL` turns on the Donate button and the "Scan to donate" QR code.
- On the Donate page, PayPal and Zelle each get a "Scan to give" box. Until they are set up it shows "Coming soon". `VITE_PAYPAL_URL` makes the PayPal QR code automatically. Zelle QR codes can only be made in your bank's app: save the picture in `public/images` and set `VITE_ZELLE_QR_IMAGE=/images/zelle-qr.png`.
- `VITE_TAX_EXEMPT=true` turns on the "tax-deductible" notice (Donate page and footer). Set it only when PNGA holds an IRS determination letter for 501(c)(3) status. `VITE_PA_CHARITY_REGISTERED=true` adds the Pennsylvania registration statement. Set it only if PNGA is registered with the Pennsylvania Department of State. Have the board or an accountant confirm both.

## Editing news and photos (no coding)

Three Google Sheets (News, Gallery, Events) hold the community-edited content. Each has an **Editor** tab (where volunteers type) and a **Published** tab (filled in automatically with only the rows marked `TRUE`). The website reads the **Published** tab.

- **News sheet** columns: Date, Title, Summary, Content, Image, Category, Link, Published. Leave Published as `FALSE` while drafting; set it to `TRUE` to show the post. Image and Link are optional. Blank lines in Content start a new paragraph.
- **Gallery sheet** columns: Photo link, Caption, Album, Published. Upload the photo to the shared PNGA Google Drive folder, set the file to "Anyone with the link can view", copy its link into Photo link, write a short caption describing the photo (screen readers read it), then set Published to `TRUE`.
- Photos stored with the website: a developer puts the file in `public/images` (about 1600 px wide, under 200 KB), deploys once, and volunteers then type `/images/file-name.webp` in the Photo link (or Image) column instead of a Drive link. Only paths starting with `/images/` are accepted.
- **Events sheet** columns: Title, Date, Start time, End time, Location, Address, Description, Category, Registration link, Published. Write dates as 2026-10-24 and times like 12:00 or 2:30 PM. Category is one of Festival, Meeting, Youth, Seniors, Community. Events disappear from the site automatically after their date. Only `https://` registration links are accepted.
- **Board sheet** ("PNGA Website - Board of Directors", one tab called Board) columns: Group, Role, Name, Published. Each Group becomes a box on the Board page, in the order groups first appear, so keep a group's rows together and move rows to reorder. Leave Role empty for advisors (they show as a plain list). A group whose name contains "past", "earlier" or "former" goes under "Past boards". To change the board at election time, add a new "Current board of directors" set, rename the old rows to "Recent past board", and so on. Set Published to FALSE to hide a row. Publish the **Board** tab and put the link in `VITE_BOARD_CSV_URL`. Only names and titles: never phone numbers or emails. Unlike the other sheets it has a single tab, so rows marked FALSE are still visible to anyone who finds the published link; delete a row instead if it should not be public at all.
- **Programs sheet** ("PNGA Website - Programs", one tab called Programs) has one row per bullet point. Columns: Program, Web address, Summary, Icon, Intro, Section, Item, Published. Type the Program name on every row; rows with the same name form one program page, in the order they appear. Fill Web address (lower-case letters and dashes, like `health-nutrition`), Summary (shown on the card), Icon and Intro on the program's first row only. Section is the heading on the page, and each Item is a bullet under it. Icon must be one of HeartHandshake, GraduationCap, HeartPulse, Vote, ClipboardList, HandHeart. Set Published to FALSE to hide a row. Publish the **Programs** tab and put the link in `VITE_PROGRAMS_CSV_URL`. Edits to existing programs show up on the site right away. A brand-new program gets its own web page the next time the site is rebuilt (the scheduled rebuild, usually within a day), because each page is pre-built for search engines. Changing a program's Web address changes its link, so avoid it.
- The Gallery shows small thumbnails, 12 per page with page numbers. Clicking a photo opens it large in a popup with Previous, Next and Close (Esc and the arrow keys also work).
- Changes appear on the website the next time a page is opened. No rebuild is needed.

One-time setup, for each sheet: **File > Share > Publish to the web**, pick the **Published** tab and **Comma-separated values (.csv)**, click Publish, then paste the link into `VITE_NEWS_CSV_URL`, `VITE_GALLERY_CSV_URL`, `VITE_EVENTS_CSV_URL`, `VITE_BOARD_CSV_URL` or `VITE_PROGRAMS_CSV_URL` (see Settings) and rebuild once.

Important: everything on a published tab is public on the internet. Never type private information (phone numbers of members, addresses, health details) into these sheets. Drafts stay private only if they are on the Editor tab, which is never published.

The build also saves a copy of both sheets into the pages themselves, so search engines can read the news and the site still shows content if Google is unreachable. If the gallery sheet is empty or not set up, the built-in photos are shown.

## Waivers and forms

Three pages let people agree online: **/waiver** (event participation), **/volunteer** (sign-up plus volunteer agreement) and **/photo-release**. Each sends an email to PNGA (through EmailJS, like the contact form) and, if set up, saves a copy in a private Google Sheet.

1. **Wording.** The draft text is in `data/agreements.ts`. Have the board (and ideally a lawyer) review and edit it. Change the `version` name when you change the text, because it is saved with each signature. Until you set `VITE_WAIVERS_APPROVED=true`, the pages show a "Draft for board review" notice, are hidden from search engines, and the sign buttons are disabled.
2. **Google Sheet copy (optional but recommended).** Open the private "PNGA Form Responses" sheet. Choose Extensions > Apps Script, paste the contents of `scripts/forms-receiver.gs`, and click Save. Then Deploy > New deployment > type Web app > Execute as: Me > Who has access: Anyone > Deploy, approve the permissions, and copy the Web app URL into `VITE_FORMS_WEBHOOK_URL`. Rebuild once. Each form gets its own tab, created automatically.
3. **Keep the responses sheet private.** Never publish it. It holds names, phone numbers and children's names. Share it only with the few volunteers who handle forms.
4. **Test it** by signing each form yourself after step 2, then check the email and the sheet tab.

Google does not let a web page read the Apps Script reply, so the site treats a form as sent if the email went through or the request to Google left the browser. Check the sheet occasionally to make sure entries are arriving.

## Newsletter and Facebook group

**Sign-ups.** The "Get our newsletter" box (Home page and News page) saves each address to the **Newsletter** tab of the private responses sheet, using the same Apps Script as the waivers (set up step 2 above). Repeat addresses are ignored. Without the Apps Script, PNGA gets an email for each sign-up instead (needs EmailJS).

**Automatic emails and sending (Google Apps Script).** The same script that saves form responses also:
- emails each new subscriber a welcome message with their own unsubscribe link, and tells `NOTIFY_EMAIL` about the new subscriber;
- adds a **PNGA Newsletter** menu to the responses sheet for sending an issue.

One-time setup: at the top of the script, set `SITE_URL` to the website address (no trailing slash) and check `NOTIFY_EMAIL` and `ORG_ADDRESS`. Paste the script into Apps Script, then **Deploy > Manage deployments > edit > New version > Deploy**. The first time, Google asks you to approve sending email and reading Google Docs; approve as the account that should send.

**To send an issue:**
1. Write the issue in a Google Doc (in the `web` Drive folder). The Doc's title becomes the email subject. Use links rather than pasted pictures.
2. In the responses sheet, choose **PNGA Newsletter > Send a test to myself**, paste the Doc link, and check the email that arrives.
3. Choose **PNGA Newsletter > Send to all subscribers**, paste the Doc link again and confirm. Each person gets their own email with their own unsubscribe link, and the result is logged in a **Newsletter log** tab.

Limits: Gmail lets a personal account send about 100 emails a day and Google Workspace (free for many nonprofits) about 1,500. The tool refuses to send if there are more subscribers than today's allowance. Emails come from the Google account that deployed the script, so use a PNGA account once you have one. There are no open or click statistics; if you want those, move to a service like Brevo or MailerLite (export the Newsletter tab as CSV).

**Unsubscribing.** Every email ends with the postal address and a personal unsubscribe link. The link opens `/unsubscribe`, where one click removes the person (kept in the **Unsubscribe** tab as a record). Someone who types their address on that page is emailed a confirmation link first, so nobody can unsubscribe another person. Only volunteers who send the newsletter should have access to this sheet.

**Facebook group.** A "Join our Facebook group" card shows on Home and News, and a group icon shows in the footer. The link is set in `VITE_FACEBOOK_GROUP_URL` (defaults to PNGA's group; type `off` to hide it).

## Forms (Get help, Contact)

Forms send email through [EmailJS](https://www.emailjs.com). Create an account, connect the PNGA inbox as an
email service, and create one template that uses these variables:
`{{topic}}`, `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{language}}`, `{{message}}`, with reply-to set to
`{{reply_to}}`. Put the three IDs in the `VITE_EMAILJS_*` settings. Until they are set, the forms tell visitors
the message was **not** sent and show another way to reach PNGA. They never pretend to succeed.

Send yourself a test message after every deploy.

## Publishing

Any static host works (Cloudflare Pages, Netlify, GitHub Pages).

- Build command: `npm run build`
- Output folder: `dist`
- Environment variables: the `VITE_*` values above

`public/_headers` adds security headers on Cloudflare Pages and Netlify. `public/og-image.png` is the picture
shown when a link is shared.

### Moving to another host
The `dist` folder is the whole site. Connect this repository to the new host with the settings above, copy
the environment variables, then point the domain at the new host. Nothing else is tied to a provider.

## Before going live

- [ ] Set `VITE_SITE_URL` (the new domain) and register the domain in PNGA's name.
- [ ] Set the real phone and a PNGA email address.
- [ ] Configure EmailJS and send a test from the Get help and Contact pages.
- [ ] Confirm the board list and the program descriptions with the board.
- [ ] Replace linked Google Photos images with compressed copies in `public/images` (see `data/gallery.ts`).
- [ ] Add real events to `data/events.ts`.
- [ ] Choose a donation platform, then set `VITE_DONATE_URL`; confirm tax-deductible wording with the treasurer.
- [ ] Have the board review the privacy policy in `pages/Legal.tsx`.
- [ ] Add the site to Google Search Console and submit `/sitemap.xml`.
