import { jsPDF } from "jspdf";
import { reportContentMatrix, maturityLevels } from "./report-content-matrix";

export const generateReport = async (data, shouldDownload = true) => {
  const { name, email, mobile, score, dimensionScores, answers, surveyType } = data;
  
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const dimensions = Object.keys(dimensionScores);
  
  // Calculate Bands and Bottom 3
  const dimensionData = dimensions.map(dim => {
    const s = Math.round(dimensionScores[dim]);
    let band = "Critical";
    let color = [248, 113, 113]; // Coral/Red
    if (s >= 20) { band = "Strong"; color = [34, 197, 94]; } // Green
    else if (s >= 14) { band = "Good"; color = [20, 184, 166]; } // Teal
    else if (s >= 8) { band = "Needs Work"; color = [245, 158, 11]; } // Amber
    
    return { name: dim, score: s, band, color };
  });

  const bottom3 = [...dimensionData].sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    // Tie-break by dimension order (as per spec)
    return dimensions.indexOf(a.name) - dimensions.indexOf(b.name);
  }).slice(0, 3);

  // Maturity Level
  let levelNum = 1;
  if (score >= 121) levelNum = 5;
  else if (score >= 91) levelNum = 4;
  else if (score >= 61) levelNum = 3;
  else if (score >= 31) levelNum = 2;
  const level = maturityLevels[levelNum];

  const colors = {
    maroon: [159, 2, 2],
    darkGrey: [31, 41, 55],
    lightGrey: [220, 220, 220],
    textMain: [17, 24, 39],
    textSecondary: [75, 85, 99],
    white: [255, 255, 255]
  };

  const addHeader = (doc, title) => {
    // Light Grey Header
    doc.setFillColor(220, 220, 220);
    doc.rect(0, 0, 210, 35, "F");
    
    // Logo (Scaled and positioned as before)
    const logoUrl = "/pv-logo.png";
    try {
        doc.addImage(logoUrl, 'PNG', 10, 5, 25.2, 19.2);
    } catch(e){}

    doc.setTextColor(31, 41, 55);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(title.toUpperCase(), 200, 20, { align: "right" });
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 35, 200, 35);
  };

  const addFooter = (doc, pageNumber) => {
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    doc.text(`PV Advisory | CFO Health Score™ | Page ${pageNumber}`, 105, 285, { align: "center" });
  };

  // --- PAGE 1: COVER PAGE ---
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");

  // Logo
  try {
    const logoUrl = "/pv-logo.png";
    doc.addImage(logoUrl, 'PNG', 10, 2, 25.2, 19.2);
  } catch(e){}

  // Grey Title Block (30% lighter than dark grey)
  doc.setFillColor(80, 80, 80); 
  doc.rect(15, 30, 180, 60, "F"); 

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text(surveyType, 22, 55);

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(230, 230, 230);
  
  doc.text("Prepared for:", 22, 68);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(name, 48, 68);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(230, 230, 230);
  doc.text(`Contact: ${mobile} | ${email}`, 22, 74);
  
  const today = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  doc.text(`Date: ${today}`, 22, 80);
  
  doc.text("Prepared by:", 22, 86);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("PV Advisory Team", 48, 86);

  // --- SCORE SECTION (TWO COLUMNS) ---
  
  // Left Column: Overall Score
  doc.setFillColor(248, 249, 250); // Very light grey bg for left
  doc.rect(15, 100, 95, 60, "F");

  doc.setTextColor(159, 2, 2); // Maroon Red
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Overall Score", 22, 110);

  doc.setFontSize(60);
  doc.setFont("helvetica", "bold");
  doc.text(`${Math.round(score)}`, 22, 138);
  
  doc.setFontSize(22);
  doc.setFont("helvetica", "normal");
  doc.text("/ 150", 65, 138);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text(`Level ${levelNum} — ${level.name}`, 22, 150);
  
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "italic");
  const splitDesc = doc.splitTextToSize(level.coverText, 85);
  doc.text(splitDesc, 22, 157);

  // Right Column: Dimension Scores
  doc.setFillColor(255, 252, 242); // Slight beige tint for right
  doc.rect(110, 100, 85, 60, "F");

  doc.setTextColor(colors.darkGrey[0], colors.darkGrey[1], colors.darkGrey[2]);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Dimension Scores", 115, 110);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);

  let y = 118;
  dimensionData.forEach(dim => {
    doc.setTextColor(100, 100, 100);
    doc.text(dim.name, 115, y);
    
    doc.setTextColor(159, 2, 2);
    doc.setFont("helvetica", "bold");
    doc.text(`${dim.score}/25`, 185, y, { align: "right" });
    
    doc.setFont("helvetica", "normal");
    y += 7;
  });

  // Footer on cover
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("CONFIDENTIAL — Prepared by PV Advisory", 105, 285, { align: "center" });

  // --- PAGE 2: EXECUTIVE SUMMARY ---
  doc.addPage();
  addHeader(doc, "Executive Summary");
  
  doc.setFontSize(24);
  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.text("Executive Summary", 20, 55);

  doc.setFontSize(11);
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  const intro = `PV Advisory conducted a CFO Health Score assessment for ${name} in ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}. The assessment evaluated the finance function across six dimensions. The findings below reflect the self-assessment completed by the leadership team.`;
  doc.text(doc.splitTextToSize(intro, 170), 20, 65);

  doc.setFontSize(16);
  doc.setTextColor(159, 2, 2);
  doc.text("Key Findings", 20, 90);

  let summaryY = 100;
  bottom3.forEach((dim, idx) => {
    const matrix = reportContentMatrix[dim.name]?.[dim.band] || { 
      observations: [`${dim.name} score is ${dim.score}/25. A detailed analysis will be provided during your diagnostic call.`],
      actions: ["Schedule a follow-up call with PV Advisory to discuss this dimension."]
    };
    const observation = matrix.observations[0];
    
    doc.setFillColor(245, 245, 245);
    doc.rect(20, summaryY, 170, 25, "F");
    
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(dim.name, 25, summaryY + 8);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
    doc.text(doc.splitTextToSize(observation, 160), 25, summaryY + 15);
    
    summaryY += 30;
  });

  doc.setFontSize(16);
  doc.setTextColor(159, 2, 2);
  doc.text("Immediate Priorities", 20, 205);

  let priorityY = 215;
  bottom3.forEach((dim, idx) => {
    const matrix = reportContentMatrix[dim.name]?.[dim.band] || { actions: ["No actions available"] };
    const priorityAction = matrix.actions[0];
    
    doc.setFillColor(159, 2, 2);
    doc.circle(25, priorityY + 3, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`${idx + 1}`, 25, priorityY + 4.5, { align: "center" });
    
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFont("helvetica", "bold");
    doc.text(doc.splitTextToSize(priorityAction, 160), 32, priorityY + 4);
    
    priorityY += 12;
  });

  addFooter(doc, 2);

  // --- PAGE 3: SCORE DASHBOARD ---
  doc.addPage();
  addHeader(doc, "Score Dashboard");
  
  doc.setFontSize(24);
  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.text("Score Dashboard", 20, 55);

  doc.setFontSize(11);
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  doc.text("The table below shows your scores across all six dimensions. Green indicates a high level of maturity, while red signals areas requiring urgent intervention.", 20, 65, { maxWidth: 170 });

  let dashY = 85;
  dimensionData.forEach((dim) => {
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(dim.name, 20, dashY);
    
    // Progress Bar Background
    doc.setFillColor(240, 240, 240);
    doc.rect(70, dashY - 4, 100, 5, "F");
    
    // Progress Bar Fill
    doc.setFillColor(dim.color[0], dim.color[1], dim.color[2]);
    doc.rect(70, dashY - 4, (dim.score / 25) * 100, 5, "F");
    
    doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
    doc.text(`${dim.score}/25`, 175, dashY);
    
    doc.setFontSize(9);
    doc.text(dim.band, 185, dashY);
    
    dashY += 15;
  });

  // Overall Total
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 180, 170, 30, "F");
  doc.setTextColor(159, 2, 2);
  doc.setFontSize(16);
  doc.text("Total Health Score", 30, 198);
  doc.setFontSize(30);
  doc.text(`${Math.round(score)}`, 140, 202);
  doc.setFontSize(12);
  doc.text("/ 150", 165, 202);

  addFooter(doc, 3);

  // --- PAGES 4-9: DIMENSION DETAILS ---
  dimensions.forEach((dimName, i) => {
    doc.addPage();
    addHeader(doc, `Dimension ${i+1}: ${dimName}`);
    
    const dim = dimensionData.find(d => d.name === dimName);
    const content = reportContentMatrix[dimName]?.[dim.band] || { observations: [], risks: [], actions: [] };

    doc.setFontSize(22);
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.text(dimName, 20, 55);

    doc.setFillColor(dim.color[0], dim.color[1], dim.color[2]);
    doc.rect(20, 62, 40, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`${dim.score}/25 — ${dim.band}`, 40, 67.5, { align: "center" });

    // Observations
    doc.setTextColor(159, 2, 2);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Observations", 20, 85);
    
    let obsY = 95;
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    content.observations.forEach(obs => {
      doc.text("→", 20, obsY);
      const splitObs = doc.splitTextToSize(obs, 160);
      doc.text(splitObs, 28, obsY);
      obsY += splitObs.length * 5 + 2;
    });

    // Risks
    doc.setTextColor(159, 2, 2);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Risk if Unaddressed", 20, obsY + 10);
    
    let riskY = obsY + 20;
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    content.risks.forEach(risk => {
      doc.setTextColor(159, 2, 2);
      doc.text("⚑", 20, riskY);
      doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
      const splitRisk = doc.splitTextToSize(risk, 160);
      doc.text(splitRisk, 28, riskY);
      riskY += splitRisk.length * 5 + 2;
    });

    // Actions
    doc.setTextColor(34, 197, 94); // Green for actions
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Recommended Actions", 20, riskY + 10);
    
    let actY = riskY + 20;
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    content.actions.forEach((action, idx) => {
      doc.text(`${idx + 1}.`, 20, actY);
      const splitAct = doc.splitTextToSize(action, 160);
      doc.text(splitAct, 28, actY);
      actY += splitAct.length * 5 + 2;
    });

    addFooter(doc, 4 + i);
  });

  // --- PAGE 10: 90-DAY ROADMAP ---
  doc.addPage();
  addHeader(doc, "90-Day Transformation Roadmap");
  
  doc.setFontSize(24);
  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.text("90-Day Roadmap", 20, 55);

  doc.setFontSize(11);
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  const roadmapIntro = `The following plan is designed to move ${name} from Level ${levelNum} toward higher maturity within 90 days. It focuses on addressing the most critical gaps first.`;
  doc.text(doc.splitTextToSize(roadmapIntro, 170), 20, 65);

  const phases = [
    { title: `Phase 1: Stabilise ${bottom3[0].name.replace("& Governance", "Controls")}`, days: "Days 1 – 30", color: [159, 2, 2], dim: bottom3[0] },
    { title: `Phase 2: Build ${bottom3[1].name.replace("& Governance", "Controls")}`, days: "Days 31 – 60", color: [245, 158, 11], dim: bottom3[1] },
    { title: `Phase 3: Enable ${bottom3[2].name.replace("& Governance", "Controls")}`, days: "Days 61 – 90", color: [20, 184, 166], dim: bottom3[2] }
  ];

  let roadY = 85;
  phases.forEach((phase, idx) => {
    doc.setFillColor(phase.color[0], phase.color[1], phase.color[2]);
    doc.rect(20, roadY, 50, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(phase.days, 45, roadY + 5.5, { align: "center" });
    
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFontSize(14);
    doc.text(phase.title, 75, roadY + 6);
    
    const matrix = reportContentMatrix[phase.dim.name]?.[phase.dim.band] || { actions: [] };
    let actions = [...matrix.actions];
    if (idx === 0 && phase.dim.band === "Critical") actions[0] = "URGENT: " + actions[0];
    if (idx === 2) actions.push("Schedule a follow-up CFO Health Score assessment 90 days from today to measure progress.");

    let actionY = roadY + 15;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    actions.forEach(act => {
      doc.text("•", 75, actionY);
      const splitAct = doc.splitTextToSize(act, 115);
      doc.text(splitAct, 80, actionY);
      actionY += splitAct.length * 5 + 1;
    });

    roadY = Math.max(roadY + 45, actionY + 10);
  });

  addFooter(doc, 10);

  // --- PAGE 11: NEXT STEPS & ABOUT ---
  doc.addPage();
  addHeader(doc, "Next Steps");

  doc.setFontSize(24);
  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.text("Next Steps", 20, 55);

  const steps = [
    { t: "Review this report with your team", d: "Share the findings with your finance lead and operations team. Confirm the observations are accurate." },
    { t: "Confirm the 90-day roadmap", d: "Book a follow-up call with PV Advisory to walk through the roadmap and assign internal owners." },
    { t: "Begin the stabilisation phase", d: "Start with the approval matrix and role documentation. These cost nothing and reduce risk immediately." },
    { t: "Schedule the follow-up assessment", d: "Set a date 90 days from today for a second CFO Health Score to measure progress." }
  ];

  let stepY = 70;
  steps.forEach((s, idx) => {
    doc.setFillColor(245, 245, 245);
    doc.rect(20, stepY, 170, 20, "F");
    doc.setTextColor(159, 2, 2);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`${idx + 1}`, 28, stepY + 13);
    
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFontSize(11);
    doc.text(s.t, 38, stepY + 8);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(s.d, 140), 38, stepY + 13);
    stepY += 25;
  });

  // About PV Advisory
  doc.setFillColor(31, 41, 55);
  doc.rect(20, stepY + 10, 170, 45, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("About PV Advisory", 30, stepY + 25);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const about = "PV Advisory is a Finance Transformation and Virtual CFO firm built by Ex-Big 4 professionals with 17+ years of experience. We help SMEs and growth-stage businesses build finance functions that are controlled, visible, efficient and strategic.";
  doc.text(doc.splitTextToSize(about, 150), 30, stepY + 32);
  doc.text("Sumit Kukreja  |  Founder  |  pv-advisory.com", 30, stepY + 48);

  addFooter(doc, 11);

  if (shouldDownload) {
    doc.save(`${surveyType.replace(/\s+/g, "_")}_Report.pdf`);
  }
  
  return doc.output('datauristring');
};

export const generateInternalReport = async (data, surveyQuestions) => {
  const { name, email, mobile, score, dimensionScores, answers, surveyType } = data;
  
  const doc = new jsPDF();
  const maroon = "#9f0202";

  doc.setFillColor(maroon);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("INTERNAL SURVEY AUDIT", 20, 25);
  doc.setFontSize(10);
  doc.text(`User: ${name} | ${email} | ${mobile}`, 20, 32);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Survey: ${surveyType}`, 20, 50);
  doc.text(`Final Score: ${Math.round(score)}/150`, 150, 50);

  doc.line(20, 55, 190, 55);

  let y = 65;
  doc.setFontSize(10);
  
  surveyQuestions.forEach((q, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    doc.setFont("helvetica", "bold");
    const splitQ = doc.splitTextToSize(`${index + 1}. ${q.question}`, 170);
    doc.text(splitQ, 20, y);
    y += splitQ.length * 5;

    doc.setFont("helvetica", "normal");
    const scoreVal = answers[q.id];
    const selectedOption = q.options.find(opt => opt.score === scoreVal);
    const answerText = selectedOption ? selectedOption.text : "Skipped";
    
    doc.setTextColor(scoreVal >= 4 ? 22 : 159, scoreVal >= 4 ? 101 : 2, scoreVal >= 4 ? 52 : 2); 
    doc.text(`Answer: ${answerText} (Score: ${scoreVal || 0})`, 25, y);
    doc.setTextColor(0, 0, 0);
    
    y += 10;
  });

  return doc.output('datauristring');
};
