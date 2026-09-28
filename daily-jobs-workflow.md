# Daily Government Jobs Automation for n8n

## Goal

Run once per day, check configured official government sources, normalize new vacancies, remove duplicates, validate required fields, update `jobs/data/jobs.json`, and trigger a Netlify deployment.

## Recommended flow

1. **Schedule Trigger**: once daily, e.g. 06:00 Pakistan time.
2. **Source Registry**: keep a list of official URLs and source types. Start with:
   - National Jobs Portal: `https://njp.gov.pk/`
   - FPSC: `https://fpsc.gov.pk/`
   - FPSC Apply: `https://apply.fpsc.gov.pk/`
   - President of Pakistan jobs: `https://www.president.gov.pk/jobs`
   - Sindh Government jobs: `https://www.sindh.gov.pk/jobs`
   - KP Assami: `https://assami.kp.gov.pk/`
   - USAJobs: `https://www.usajobs.gov/`
   - APSJobs: `https://www.apsjobs.gov.au/`
   - EU Careers: `https://eu-careers.europa.eu/en/job-opportunities`
3. **HTTP Request**: fetch each source page or its official API/feed where one is available. Respect robots.txt, site terms, rate limits, and authentication requirements.
4. **Extract**: use source-specific selectors or an official API/feed. Do not depend on a single universal CSS selector across unrelated government sites.
5. **Normalize**: map each result into the fields documented in `jobs/data/README.md`.
6. **Validation**: reject anything missing `title`, `employer`, `country`, or `sourceUrl`. Reject non-official source domains. Preserve the original official URL.
7. **Deduplicate**: use a deterministic ID such as SHA-256 of normalized `sourceUrl + title + employer + deadline`.
8. **Freshness**: retain active jobs and recent closed jobs only if the site's editorial policy calls for them. Prefer removing expired records from the public feed.
9. **Safety / quality gate**: do not publish guessed salary, eligibility, deadline, quota or application method. If a field is not stated, leave it empty and send the item to a review branch.
10. **Write JSON**: generate `jobs/data/jobs.json` with `meta.updatedAt` and the normalized `jobs` array.
11. **Commit**: push the updated file to the GitHub repository using the GitHub node/connector.
12. **Deploy**: trigger the Netlify production deployment.
13. **Verify**: HTTP GET `/jobs/data/jobs.json` and `/jobs/latest.html`; if the deployed feed is not readable, alert instead of claiming success.

## Important architecture rule

The automation should update **job data**, not blindly generate hundreds of SEO pages. One useful feed page plus genuinely helpful guides is safer than mass-generated thin pages.

For individual job detail pages, publish a page only when you have a verified original source and enough unique useful information to make the page genuinely useful. If using `JobPosting` structured data, keep it on the individual job page and ensure the structured data matches the visible job content.

## Suggested n8n error handling

Use an error branch that records:

- source URL
- fetch status
- date/time
- parser error
- number of records extracted
- number rejected
- number published

Do not deploy if every source suddenly returns zero jobs. That is more likely a parser failure than a miracle in public administration.
