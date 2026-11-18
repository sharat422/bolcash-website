# TODO: verify

Facts that are not fully sourced. Fix each, then remove it from this list.

- `gst-states.json`: per-state registration limits are empty. Fill from gst.gov.in.
- `msme_limits`, `gst_slabs`, `gst_registration`, `gst_composition`, `msme_payment_rule`, `mudra`, `svanidhi`, `upi_oct_2026`: source is only a site home page. Replace with the exact official page URL.
- `gst_registration`, `gst_composition`, `mudra`, `svanidhi`: `asOf` date missing.
- `dpdp_deadline`: no source given. Add one and an `asOf` date.
- `msme_payment_rule`: confirm the s.37(2)(g) Income-tax Act 2025 reference against the Act text.
- Footer: Grievance Officer name and email are placeholders ("TODO: verify"). Add the real contact before launch.
- Header/footer: `/features/`, `/business/`, `/tools/`, `/guides/`, `/privacy/`, `/terms/`, `/hi/` pages do not exist yet. The header "Download app" button points to `#download` (the CTA section each page will end with). The second language hub is assumed to be Hindi: confirm.
- `/features/`: only the three basic features (udhar khata, cash book, balance for each person) are written, because the product feature list is not in `facts.json`. Add the real feature list.
- `/download/`: launch date and the real Google Play URL are missing. The Play button goes to `/go/play?src=...`, which does not exist yet.
- Home: business-type tiles link to `/business/<type>/` pages that are not built yet.
- `/business/*`: the list of 10 business types is my choice (6 from the brief + garment, mobile, tea stall and eatery, fruit and vegetable seller). Confirm or change. Copy has no numbers or claims; add real facts only via `facts.json`.
- `/tools/*`: the list of 8 tools is my choice (GST, simple interest, EMI, profit and margin, discount, amount in words, MSME payment due date, udhar reminder message). Confirm or change.
- `gst_slabs.data.rates` and `msme_payment_rule.data` in `facts.json` are the numbers the tools use. They must match `value`: a test checks this. Verify both against the official pages.
- `/tools/msme-payment-due-date/`: when the 15/45 days start, and who the rule covers, is marked TODO: verify.
- GST calculator: CGST/SGST "half each" is shown for same-state sales. Confirm wording with a CA.
- `/guides/*`: all 16 guides are DRAFTS (no `reviewed: true`) and show "Draft: TODO: verify" on the page. Each needs a review against its official sources and a CA, then set `reviewed: true` and update the `updated` date. The topic list is my choice. Their only numbers are shown through `<Fact>` from `facts.json`.
- Guides: sources are official site home pages, not exact pages (same gap as in `facts.json`). Replace with exact page URLs.
- Guides: procedural details (documents, fees, eligibility, steps for Udyam, Mudra, PM SVANidhi, composition scheme, DPDP) are marked "TODO: verify" and are not written.
