# TODO: verify

Facts that are not fully sourced. Fix each, then remove it from this list.

- `gst-states.json`: per-state registration limits are empty. Fill from gst.gov.in.
- `msme_limits`, `gst_slabs`, `gst_registration`, `gst_composition`, `msme_payment_rule`, `mudra`, `svanidhi`, `upi_oct_2026`: source is only a site home page. Replace with the exact official page URL.
- `gst_registration`, `gst_composition`, `mudra`, `svanidhi`: `asOf` date missing.
- `dpdp_deadline`: no source given. Add one and an `asOf` date.
- `msme_payment_rule`: confirm the s.37(2)(g) Income-tax Act 2025 reference against the Act text.
- Footer: Grievance Officer name and email are placeholders ("TODO: verify"). Add the real contact before launch.
- Header/footer: `/features/`, `/business/`, `/tools/`, `/guides/`, `/privacy/`, `/terms/`, `/hi/` pages do not exist yet. The header "Download app" button points to `#download` (the CTA section each page will end with). The second language hub is assumed to be Hindi: confirm.
- `/features/`: now lists exactly the features you confirmed (beat or route ledger, beat collections, reconciled daily close, income and expenses, customer records, receipt scanning with review, recurring expenses, reports). Do not add others until confirmed.
- `/download/`: the real Google Play URL is missing (launch month December 2026 was given by the owner). The Play button goes to `/go/play?src=...`, which does not exist yet.
- Home: business-type tiles link to `/business/<type>/` pages that are not built yet.
- `/business/*`: the list of 10 business types is my choice (6 from the brief + garment, mobile, tea stall and eatery, fruit and vegetable seller). Confirm or change. Copy has no numbers or claims; add real facts only via `facts.json`.
- `/tools/*`: the list of 8 tools is my choice (GST, simple interest, EMI, profit and margin, discount, amount in words, MSME payment due date, udhar reminder message). Confirm or change.
- `gst_slabs.data.rates` and `msme_payment_rule.data` in `facts.json` are the numbers the tools use. They must match `value`: a test checks this. Verify both against the official pages.
- `/tools/msme-payment-due-date/`: when the 15/45 days start, and who the rule covers, is marked TODO: verify.
- GST calculator: CGST/SGST "half each" is shown for same-state sales. Confirm wording with a CA.
- `/guides/*`: all 16 guides are DRAFTS (no `reviewed: true`) and show "Draft: TODO: verify" on the page. Each needs a review against its official sources and a CA, then set `reviewed: true` and update the `updated` date. The topic list is my choice. Their only numbers are shown through `<Fact>` from `facts.json`.
- Guides: sources are official site home pages, not exact pages (same gap as in `facts.json`). Replace with exact page URLs.
- Guides: procedural details (documents, fees, eligibility, steps for Udyam, Mudra, PM SVANidhi, composition scheme, DPDP) are marked "TODO: verify" and are not written.
- `/privacy/` and `/terms/` show "coming soon — the app is in pre-launch". Paste the lawyer-reviewed text to replace them, then set `reviewed: true`. `/about/` and `/contact/` are still drafts: company name, address and team; Grievance Officer name and email; feedback email; reply time.
- Footer: Grievance Officer name and email are still "TODO: verify". The real name and email were not supplied.
- `/hi/`: Hindi hero translated by me. Have a native speaker review it. No waitlist form yet (needs the API).
- Home, business pages and guides still use the earlier udhar khata wording. The confirmed positioning is beat/route collections for small FMCG distributors, plus hardware traders and kirana shops. Align the copy when ready.
- Store URLs: the real Google Play and App Store URLs were not supplied. Set `PLAY_STORE_URL` (and later `APP_STORE_URL`) at build time; see the README. Until then no store button, QR code or `/go/*` link is shown.
- Home: launch month, who-it-is-for numbers (1-4 beats, 80-300 retailers), "staff see only their own beat" and "your data and export are always free" are owner-supplied claims. Keep them true or change the page.
- Home: brand is written "Bolcash" in the new copy, "BolCash" elsewhere (logo, other pages). Pick one spelling.
- Waitlist: the form collects name, phone, city and business type. The privacy policy is still a placeholder. Publish the reviewed privacy text before the waitlist goes public. The API is built (`POST /waitlist`). Set `NEXT_PUBLIC_API_URL` (web build) and `CORS_ORIGINS` and `DATABASE_URL` (api) in production. No spam protection or rate limiting yet.

## Source check (exact official pages): leads only, nothing confirmed

An attempt was made to find the exact official page for each fact. Pages could not be read (PIB returned 403, the ODR site failed its certificate check, the NPCI statistics page is a JavaScript shell, GST portal pages did not state the figures). So **no source URL was changed and no item above was removed.** Leads from web search summaries, not read or confirmed:

- `gst_slabs`: PIB release on the 56th GST Council (PRID=2163555) says reduced rates apply from 22 September 2025, with two main rates (5%, 18%) and a 40% rate. The "12% survives for building materials, CBIC Notification 14/2025" part was not found. The official rate pages are on cbic-gst.gov.in, which is not on the approved domain list.
- `gst_registration`: no gst.gov.in page found that states the goods and services limits. Not confirmed.
- `gst_composition`: the GST portal CMP-08 guide (tutorial.gst.gov.in/userguide/returns/Manual_CMP02.htm) mentions Rs 1.5 crore (Rs 75 lakh in special category states) and Rs 50 lakh for services, but it is a filing guide, has no date, and differs from the fact text (special category amounts).
- `msme_limits`: PIB "Year End Review 2025: MSME" (PRID=2209712) and the MSME Annual Report 2025-26 were reported to give the same limits, effective 1 April 2025. Could not be read.
- `msme_payment_rule`: the ODR guidelines PDF (odr.msme.gov.in/assets/pdf/MSE_Scheme_on_ODR_for_Delayed_Payment_Guidelines.pdf) was reported to give the 15 and 45 days. The Income-tax Act section references (s.43B(h), s.37(2)(g)) were not found in any official source. Could not be read.
- `mudra`: mudra.org.in lists only Shishu, Kishore and Tarun (up to Rs 10 lakh). "Tarun Plus, up to Rs 20 lakh" appears in PIB material (Budget 2024-25, PRID=2069170 and PRID=2119954 were returned) but the exact page was not pinned.
- `svanidhi`: PIB material from 2025 and 2026 was reported to match the 31 March 2030 date, the three tranches and the Rs 1,600 cashback. The exact page was not pinned.
- `upi_oct_2026`: NPCI figures for October 2026 were not found. NPCI material found gives August 2026 (24.51 billion transactions, Rs 29.9 lakh crore), a different month. Not confirmed.
- `dpdp_deadline`: PIB confirms an 18-month phased timeline from the DPDP Rules notification (reported as 13 or 14 November 2025). No official page states 13 May 2027. Not confirmed.

Decision needed from the owner: keep these facts visible with their "TODO: verify" labels until checked, or hide the facts, and the guides and tools that depend on them, until they are confirmed.

