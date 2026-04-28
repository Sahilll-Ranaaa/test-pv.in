import { jsPDF } from "jspdf";

export const generateReport = async (data, shouldDownload = true) => {
  const { name, email, mobile, score, dimensionScores, answers, surveyType } = data;
  
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const maroon = "#9f0202"; 
  const darkGray = "#1a1a1a";
  const successGreen = "#166534";
  const warningBrown = "#92400e";

  // Add Logo
  try {
    const logoUrl = "/pv-logo.png";
    doc.addImage(logoUrl, 'PNG', 10, 8, 45, 12);
  } catch (e) {
    console.error("Logo failed to load", e);
  }

  // Maroon Title Block
  doc.setFillColor(159, 2, 2); 
  doc.rect(15, 22, 180, 58, "F"); 

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(30);
  doc.setFont("helvetica", "bold");
  doc.text(surveyType, 20, 42);

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(230, 230, 230);
  
  doc.text("Prepared for:", 20, 52);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(name, 48, 52);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(230, 230, 230);
  doc.text(`Contact: ${mobile} | ${email}`, 20, 58);
  
  const today = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  doc.text(`Date: ${today}`, 20, 64);
  
  doc.text("Prepared by:", 20, 70);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("PV Advisory Team", 48, 70);

  // Overall Score Block
  doc.setFillColor(245, 245, 245); 
  doc.rect(15, 85, 95, 60, "F");

  doc.setTextColor(maroon);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Overall Score", 20, 95);

  doc.setFontSize(60);
  doc.setFont("helvetica", "bold");
  doc.text(`${Math.round(score)}`, 20, 120);
  
  doc.setFontSize(22);
  doc.setFont("helvetica", "normal");
  doc.text("/ 150", 65, 120);

  // Level Description
  let level = "Level 3 — Basic";
  let description = "Structure exists but is inconsistent. Process and technology investment needed.";
  
  if (score <= 30) {
    level = "Level 1 — Critical";
    description = "Foundational processes are missing. Immediate intervention required.";
  } else if (score <= 60) {
    level = "Level 2 — Developing";
    description = "Some processes exist but are highly manual and prone to error.";
  } else if (score <= 120) {
    level = "Level 4 — Advanced";
    description = "Robust processes supported by technology. Focus on optimization.";
  } else if (score > 120) {
    level = "Level 5 — Strategic";
    description = "World-class finance operations driving strategic business value.";
  }

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text(level, 20, 130);
  
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "italic");
  const splitDesc = doc.splitTextToSize(description, 85);
  doc.text(splitDesc, 20, 137);

  // Dimension Scores
  doc.setFillColor(252, 250, 242); 
  doc.rect(110, 85, 85, 60, "F");

  doc.setTextColor(darkGray);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Dimension Scores", 115, 95);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);

  let y = 103;
  const dimensions = Object.keys(dimensionScores);
  dimensions.forEach(dim => {
    doc.text(dim, 115, y);
    
    const dimScore = Math.round(dimensionScores[dim]);
    doc.setFont("helvetica", "bold");
    if (dimScore >= 18) doc.setTextColor(successGreen);
    else if (dimScore >= 10) doc.setTextColor(warningBrown);
    else doc.setTextColor(maroon);
    
    doc.text(`${dimScore}/25`, 175, y, { align: "right" });
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    y += 7;
  });

  // Disclaimer Box
  doc.setFillColor(250, 250, 250);
  doc.rect(15, 155, 180, 15, "F");
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  const disclaimer = "CONFIDENTIAL — Prepared exclusively for the specified entity by PV Advisory. Based on self-assessment responses provided. Not to be shared externally without consent.";
  doc.text(disclaimer, 20, 162, { maxWidth: 170 });

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
