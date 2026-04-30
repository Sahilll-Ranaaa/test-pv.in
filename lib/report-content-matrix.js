export const reportContentMatrix = {
  "Control & Governance": {
    "Strong": {
      "observations": [
        "Controls are well-established and consistently followed across all finance processes",
        "Segregation of duties is in place — no single person owns banking, entry and reporting",
        "Function is resilient to personnel changes; backup processes exist",
        "Compliance is managed proactively through a structured calendar"
      ],
      "risks": [
        "Monitor for complacency as the business scales",
        "New processes added at growth stages may not inherit existing control standards"
      ],
      "actions": [
        "Conduct annual controls review to ensure standards evolve with headcount",
        "Document any new processes before they go live",
        "Evaluate external audit readiness as the business approaches investor scrutiny"
      ]
    },
    "Good": {
      "observations": [
        "Governance is largely in place but inconsistencies exist",
        "Approval matrices are documented but exceptions are common",
        "Some single-person dependencies remain in banking or reporting",
        "Compliance is current but managed partially reactively"
      ],
      "risks": [
        "Informal exceptions to controls gradually become the norm",
        "Key-person risk is latent and will surface at the worst possible time"
      ],
      "actions": [
        "Tighten exception-handling: all deviations from approval matrix must be logged",
        "Cross-train at least one backup for the top two critical finance roles",
        "Formalise audit trail requirements for all material transactions in writing"
      ]
    },
    "Needs Work": {
      "observations": [
        "Basic governance exists but is not consistently embedded",
        "Controls are known but enforced inconsistently — depends on who is managing",
        "Segregation of duties is partial; same person may access banking and approve entries",
        "Compliance is managed reactively, often triggered by a deadline or external reminder"
      ],
      "risks": [
        "One personnel exit creates operational disruption",
        "Errors or fraud may go undetected for extended periods",
        "Regulatory penalties from inconsistent compliance management"
      ],
      "actions": [
        "Document and circulate approval matrix within 30 days",
        "Separate banking access from data entry and reporting — this is non-negotiable",
        "Build a statutory compliance calendar with named owners for each obligation"
      ]
    },
    "Critical": {
      "observations": [
        "Governance is largely absent — no formal approval structures in place",
        "High key-person dependency: one person controls multiple conflicting access points",
        "Compliance is ad hoc — no structured calendar or ownership",
        "Audit trails are absent or inconsistent for material transactions"
      ],
      "risks": [
        "Immediate fraud and error risk — undetected and undetectable",
        "One exit triggers a full operational crisis",
        "Regulatory penalties are a near-term possibility",
        "Investor or lender due diligence will fail"
      ],
      "actions": [
        "URGENT: implement interim segregation of duties this week — do not wait",
        "Document who has access to what system and what approval rights they hold",
        "Assign a compliance owner and build a basic calendar of all statutory obligations",
        "Consider engaging PV Advisory for an emergency controls review"
      ]
    }
  },
  "Visibility": {
    "Strong": {
      "observations": [
        "MIS is timely, structured and trusted by leadership — lands by day 10 consistently",
        "Cash position, receivables and payables visible in a single consolidated view",
        "Revenue and margin tracked by product, customer and geography",
        "Rolling 13-week cash flow forecast is active and referenced in decisions"
      ],
      "risks": [
        "Data quality must keep pace with business growth and complexity",
        "Simple dashboards may need upgrading as volume and product lines increase"
      ],
      "actions": [
        "Introduce scenario planning to complement existing reporting",
        "Begin building forward-looking financial models for strategic planning",
        "Evaluate moving from descriptive reporting to predictive analytics"
      ]
    },
    "Good": {
      "observations": [
        "Reporting is regular and mostly reliable — MIS arrives within 12–15 days",
        "Cash visibility is partial: receivables or payables may have gaps",
        "Some KPIs are tracked but not all have defined owners or review cadence",
        "Revenue tracked at business level with limited product or customer breakdown"
      ],
      "risks": [
        "Decisions made on data that is 10–15 days old — stale at decision time",
        "Collections missed due to incomplete receivables visibility"
      ],
      "actions": [
        "Set a hard MIS deadline of day 10 with a named owner and escalation path",
        "Build a receivables ageing dashboard updated weekly",
        "Introduce a 13-week cash flow tracker — even a structured Excel template is a start"
      ]
    },
    "Needs Work": {
      "observations": [
        "Reporting exists but is inconsistent in timing and format — MIS takes 15+ days",
        "Cash position requires manual compilation each time leadership asks",
        "Revenue tracked at business level only — no product, customer or geography breakdown",
        "No rolling cash flow forecast; planning done quarterly at best"
      ],
      "risks": [
        "Strategic decisions made without reliable or timely data",
        "Cash shortfalls arrive as surprises with no early warning",
        "Unable to identify which products or customers are profitable"
      ],
      "actions": [
        "Set MIS deadline and assign a single named owner who is accountable",
        "Build a basic cash flow tracker in Excel and update it weekly",
        "Define and begin tracking 5 core financial KPIs in a simple monthly dashboard"
      ]
    },
    "Critical": {
      "observations": [
        "Financial visibility is very limited — no structured MIS in place",
        "Cash position unclear without significant manual effort",
        "No KPI tracking — decisions made on instinct rather than data",
        "Leadership has no real-time or near-real-time view of financial health"
      ],
      "risks": [
        "Business is flying blind — cash crisis can arrive with no warning",
        "Unable to attract investors or lenders due to absence of clean financial data",
        "Fraud or systematic losses may go undetected for months"
      ],
      "actions": [
        "URGENT: identify what financial data exists and build a basic monthly P&L this week",
        "Commit to a monthly MIS process starting this month — even a simple Excel template",
        "Engage PV Advisory for an emergency visibility sprint to establish baseline reporting"
      ]
    }
  },
  "Process": {
    "Strong": {
      "observations": [
        "Finance processes are documented, standardised and consistently followed",
        "Month-end close is efficient, predictable and completes within 5 business days",
        "Budgeting and forecasting run on a defined cycle with leadership participation",
        "Variance analysis is performed monthly and directly influences the next plan"
      ],
      "risks": [
        "Processes must evolve as the business adds complexity and headcount",
        "SOPs can become outdated if not reviewed periodically"
      ],
      "actions": [
        "Schedule an annual process review to ensure SOPs remain current",
        "Ensure all new team members are onboarded through documented processes only",
        "Evaluate which manual steps in existing SOPs can be automated"
      ]
    },
    "Good": {
      "observations": [
        "Core processes are in place but documentation is incomplete or informal",
        "Month-end close follows a loose structure but timeline varies month to month",
        "Reconciliations happen regularly but not on a fixed schedule",
        "Budgeting exists annually but is rarely referenced or updated during the year"
      ],
      "risks": [
        "Process breaks when key people are absent or on leave",
        "Budget becomes disconnected from operational reality midway through the year"
      ],
      "actions": [
        "Complete and formalise month-end checklist with day-by-day milestones",
        "Fix reconciliation schedule with named owners and completion deadlines",
        "Build a mid-year budget review into the leadership calendar — non-negotiable"
      ]
    },
    "Needs Work": {
      "observations": [
        "Processes are ad hoc and person-dependent — what gets done depends on who is working",
        "Month-end has no documented checklist; sequence varies every cycle",
        "Reconciliations happen reactively when something looks wrong",
        "Vendor onboarding and collections vary by individual rather than following a standard"
      ],
      "risks": [
        "Inconsistent numbers each month erode leadership confidence in finance",
        "Errors accumulate between reconciliation cycles and are hard to unwind",
        "High onboarding cost and risk for new finance staff"
      ],
      "actions": [
        "Build a month-end checklist with daily milestones and assign ownership",
        "Set a fixed weekly reconciliation schedule and hold to it",
        "Standardise vendor onboarding and collections with documented templates"
      ]
    },
    "Critical": {
      "observations": [
        "Finance operates entirely without structured processes",
        "No month-end close procedure exists — numbers are compiled on demand",
        "Reconciliations are rare and triggered by external pressure only",
        "Tribal knowledge replaces SOPs: new hires cannot function without handholding"
      ],
      "risks": [
        "Numbers are unreliable and cannot be trusted for any decision",
        "Any team change causes major operational disruption",
        "External audit or investor due diligence is impossible in current state"
      ],
      "actions": [
        "URGENT: define a basic month-end checklist this week and use it immediately",
        "Identify the 3 highest-frequency finance tasks and document them as simple SOPs",
        "Begin reconciling key accounts (bank, receivables, payables) this month without exception"
      ]
    }
  },
  "Technology": {
    "Strong": {
      "observations": [
        "Systems are well integrated: accounting, billing, payroll and banking connect seamlessly",
        "Manual data entry is minimal — less than 10% of finance team time",
        "Live dashboards are in active use and trusted by leadership",
        "ERP is fully utilised across modules including analytics and workflow automation"
      ],
      "risks": [
        "Technology debt accumulates as new tools are added without integration planning",
        "System stack may need reassessment as the business enters new markets or segments"
      ],
      "actions": [
        "Explore automation of variance analysis and exception-based reporting",
        "Evaluate AI-powered financial analytics for forecasting and anomaly detection",
        "Plan technology scaling roadmap for the next 2-year business growth phase"
      ]
    },
    "Good": {
      "observations": [
        "Core systems are partially integrated — some manual steps remain in payroll or banking",
        "A dashboard exists but may not be live or updated in real time",
        "ERP is in use but not at full capability — several modules are inactive",
        "Finance team spends 20–30% of time on manual data handling"
      ],
      "risks": [
        "Manual steps create recurring error risk across reporting cycles",
        "Dashboard data may be stale by the time leadership reviews it",
        "Underutilised ERP is a hidden cost: paying for capability that is unused"
      ],
      "actions": [
        "Map and eliminate the top 3 manual handoffs in the finance process",
        "Activate unused ERP modules — start with bank reconciliation auto-matching",
        "Build or upgrade the dashboard to provide live data with daily refresh at minimum"
      ]
    },
    "Needs Work": {
      "observations": [
        "Systems exist but are disconnected — significant manual re-entry across systems",
        "Finance team spends 30–50% of time on manual data entry and reconciliation",
        "Excel is the primary reporting tool — not integrated with live data",
        "ERP in use for ledger only; less than 50% of capability activated",
        "No live dashboard: leadership relies on emailed spreadsheets"
      ],
      "risks": [
        "Data entry errors compound over time and are difficult to trace",
        "Finance team is overwhelmed with non-value-adding tasks",
        "Leadership decisions based on static reports that are days or weeks old"
      ],
      "actions": [
        "Integrate billing output directly into the accounting system — highest single-change impact",
        "Activate bank reconciliation auto-matching in the current ERP",
        "Build an interim MIS dashboard even in Excel while full integration is planned"
      ]
    },
    "Critical": {
      "observations": [
        "Technology is fragmented or minimal — systems do not communicate with each other",
        "Manual entry is the primary data management method across all finance processes",
        "No dashboards exist — financial reports are manually compiled on request",
        "ERP is absent, barely used, or limited to a single basic function"
      ],
      "risks": [
        "Error rate is high and systemic — impossible to know what the real numbers are",
        "Finance team is entirely consumed by data handling with no capacity for analysis",
        "Scaling the business is impossible without technology investment",
        "Real-time visibility for leadership decisions is zero"
      ],
      "actions": [
        "URGENT: audit current tools and document all system gaps this week",
        "Implement a proper accounting system if one is not already in place",
        "Prioritise billing-to-accounting integration as the first technology project",
        "Engage PV Advisory to design a technology roadmap aligned to business needs"
      ]
    }
  },
  "People": {
    "Strong": {
      "observations": [
        "Finance team delivers insights and analysis, not just numbers",
        "Roles are clearly defined in writing with accountability for outcomes",
        "Every critical finance role has a cross-trained backup in place",
        "Performance is reviewed quarterly against measurable outcomes",
        "Team regularly upskilled — formal development plans in place"
      ],
      "risks": [
        "Retention of strong finance talent is the primary risk at this maturity level",
        "Growth creates new role requirements that may outpace current team capability"
      ],
      "actions": [
        "Define a development path for each finance team member for the next 12 months",
        "Assess whether a fractional or full-time CFO is needed for the next growth phase",
        "Build a finance talent pipeline — identify one internal candidate for future promotion"
      ]
    },
    "Good": {
      "observations": [
        "Team is competent and engaged — understands the business well",
        "Role definitions exist informally but are not written down",
        "Some key-person dependency remains for critical processes",
        "Performance reviews happen but are not structured around measurable outcomes",
        "Team delivers numbers reliably but analysis is inconsistent"
      ],
      "risks": [
        "Informal roles create accountability gaps under pressure or absence",
        "Backup gap becomes critical when a key team member is unavailable"
      ],
      "actions": [
        "Formalise role descriptions with written accountability for each position",
        "Identify and begin cross-training backups for the top 2 critical finance roles",
        "Introduce quarterly outcome-based reviews with measurable KPIs for each team member"
      ]
    },
    "Needs Work": {
      "observations": [
        "Team is stretched and roles are blurred — responsibilities shift based on who is available",
        "No formal backup exists for any critical finance role",
        "Performance is reviewed informally if at all",
        "Team delivers numbers but limited insight — analysis capacity is near zero",
        "Upskilling happens reactively, not proactively"
      ],
      "risks": [
        "Burnout risk is high for finance staff — single exit causes a crisis",
        "Leadership loses confidence in finance output over time",
        "Business cannot scale without fixing the people layer first"
      ],
      "actions": [
        "Write role descriptions and share with the team immediately",
        "Identify backup candidates and begin cross-training for the top 2 roles",
        "Introduce a simple monthly team review framework with 3 measurable KPIs per role"
      ]
    },
    "Critical": {
      "observations": [
        "Finance function is entirely person-dependent — one or two individuals carry everything",
        "Roles are undefined — no written accountability for any position",
        "No backup exists for any function",
        "Performance measurement is absent",
        "Team is in pure execution mode with zero capacity for analysis or insight"
      ],
      "risks": [
        "Any departure is an immediate operational crisis",
        "Morale risk is high — overloaded team with no clear path forward",
        "Business cannot scale in current people configuration"
      ],
      "actions": [
        "URGENT: identify the single highest person-dependency risk and begin mitigation this week",
        "Write even a basic role description for the top 3 finance positions",
        "Engage PV Advisory to assess the people gap and design a recovery plan"
      ]
    }
  },
  "Strategy": {
    "Strong": {
      "observations": [
        "Finance is a genuine strategic partner — present in pricing, hiring and expansion decisions",
        "Working capital is actively managed as a strategic lever, not a compliance task",
        "Profitability understood at granular level: by product, customer, channel and geography",
        "Rolling financial model is maintained and used for scenario planning",
        "CFO mindset is embedded in leadership team culture"
      ],
      "risks": [
        "As the business grows, the depth of strategic finance capability must grow with it",
        "Ensure finance is planning 12–18 months ahead, not just reacting to the current quarter"
      ],
      "actions": [
        "Build a rolling 12-month financial model updated monthly with actuals",
        "Introduce formal scenario planning for all major strategic decisions",
        "Evaluate whether the business is ready for a full-time CFO or next-level finance capability"
      ]
    },
    "Good": {
      "observations": [
        "Finance contributes to some strategic decisions but is not consistently in the room",
        "Working capital is partially managed — receivables tracked but payables and inventory less so",
        "Profitability understood at high level but not broken down by product or customer",
        "Financial modelling is used occasionally but not as a standard decision-making tool"
      ],
      "risks": [
        "Pricing decisions made without full margin clarity",
        "Working capital managed reactively, lengthening the cash cycle",
        "Growth decisions lack financial stress-testing"
      ],
      "actions": [
        "Formally include finance in all pricing and hiring conversations going forward",
        "Build a product-level contribution margin view within 60 days",
        "Add working capital review as a standing item in monthly leadership meeting"
      ]
    },
    "Needs Work": {
      "observations": [
        "Finance is largely reactive — strategy discussions happen without financial input",
        "Working capital is not proactively tracked or managed",
        "Profitability measured at business level only — product and customer margins unknown",
        "Forecasting is annual or absent; no scenario analysis capability",
        "Finance is not in the room for major decisions on pricing, hiring or expansion"
      ],
      "risks": [
        "Growth investment decisions lack financial validation",
        "Cash cycle lengthens without working capital intervention",
        "Unprofitable products or customers subsidising the business unknowingly"
      ],
      "actions": [
        "Introduce finance to the next major business decision immediately — start with one meeting",
        "Build a basic product revenue and direct cost table to identify margin by product",
        "Set a quarterly forecast cycle — even two scenarios (base case and downside) is a strong start"
      ]
    },
    "Critical": {
      "observations": [
        "Finance has no strategic role — it is a back-office transaction processing function",
        "Leadership makes all major decisions without financial modelling or input",
        "Working capital is not managed — receivables, payables and inventory are tracked by accounting only",
        "No profitability analysis at any level below total business P&L",
        "Finance and leadership strategy are completely disconnected"
      ],
      "risks": [
        "Business making major decisions blind — pricing, hiring and expansion without validation",
        "Unprofitable products or customers may be subsidising the rest undetected",
        "Cash crises are inevitable without working capital management"
      ],
      "actions": [
        "URGENT: bring finance into the next major business decision this week",
        "Build a simple product revenue and cost table to establish baseline margin data",
        "Engage PV Advisory to design a finance-to-strategy roadmap for the next 12 months"
      ]
    }
  }
};

export const maturityLevels = {
  5: {
    name: "Strategic",
    range: "121–150",
    coverText: "Finance is a growth engine, not a support function. Best-in-class across all dimensions.",
    execSummaryOpener: "Exceptional finance function. Finance is driving strategic decisions. Focus is on optimisation and staying ahead of business growth."
  },
  4: {
    name: "Managed",
    range: "91–120",
    coverText: "Strong foundation. A few targeted improvements unlock the next level.",
    execSummaryOpener: "Strong finance function with identifiable gaps. Targeted investment in 1–2 dimensions will unlock full strategic capability."
  },
  3: {
    name: "Basic",
    range: "61–90",
    coverText: "Structure exists but is inconsistent. Process and technology investment needed.",
    execSummaryOpener: "Finance function is functional but unreliable. Standardisation and technology investment are the highest-leverage opportunities."
  },
  2: {
    name: "Developing",
    range: "31–60",
    coverText: "High manual dependency. Controls are partial and risks are real.",
    execSummaryOpener: "Finance function is in early stages. Controls and visibility are the immediate priorities. Risk exposure is significant."
  },
  1: {
    name: "Fragmented",
    range: "0–30",
    coverText: "Immediate intervention needed. One bad quarter away from a finance crisis.",
    execSummaryOpener: "Finance function is critically underdeveloped. Emergency intervention required across multiple dimensions. Engage PV Advisory immediately."
  }
};
