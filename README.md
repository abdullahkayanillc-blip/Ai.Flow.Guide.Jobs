# AIFlowGuide Government Jobs Feed

`jobs.json` is the machine-readable feed consumed by `/jobs/latest.html`.

## Required fields for an automatically published record

- `id`: stable unique identifier, preferably a hash of source URL + job title + employer + deadline
- `title`
- `employer`
- `department` (optional)
- `country`
- `type` (`Federal`, `Provincial`, `International`, or `Public Sector`)
- `qualification` (optional)
- `location` (optional)
- `publishedAt` (ISO date/time when known)
- `deadline` (ISO date when known)
- `sourceUrl` (required; must point to an official source)
- `description` (brief original summary, not a copied advertisement)

Never publish a record without a working official source URL. Never invent eligibility, deadline, salary, quota, or application details.
