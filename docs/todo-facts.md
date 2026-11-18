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
