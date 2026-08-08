import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const response = await ai.models.generateContent({
      model:  "gemini-2.5-flash",
      contents: `You are an expert resume writer.

Enhance the following professional summary in 1-2 sentences.
Highlight key skills, experience, and career objectives.
Make it compelling and ATS-friendly.

Professional Summary:
${userContent}`
    });

    const enhancedContent = response.text;

    return res.status(200).json({
      enhancedContent
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};


// POST: /api/ai/enhance-job-desc
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || !userContent.trim()) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const prompt = `
You are an expert professional resume writer.

Improve the following job description for a professional resume.

Requirements:
- Use strong action verbs.
- Make it concise and professional.
- Focus on responsibilities, contributions, and achievements.
- Keep the original meaning.
- Do not invent information, technologies, numbers, or achievements.
- Make it ATS-friendly.
- Return only the improved job description.
- Do not add headings.
- Do not add explanations.
- Do not use quotation marks.
- Keep it to 1-2 sentences.

Job description:
${userContent}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const enhancedContent = response.text?.trim();

    if (!enhancedContent) {
      return res.status(500).json({
        message: "Gemini returned an empty response",
      });
    }

    return res.status(200).json({
      enhancedContent,
    });

  } catch (error) {
    console.error("JOB DESCRIPTION GEMINI ERROR:", error);

    return res.status(500).json({
      message: error.message || "Failed to enhance job description",
    });
  }
};
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `Extract data from this resume:

${resumeText}

Provide data in the following JSON format with no additional text before or after:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}`;

    console.log("Upload Resume Body:", req.body);

    const response = await ai.models.generateContent({
      model:  "gemini-2.5-flash",
      contents: `${systemPrompt}\n\n${userPrompt}`,
      config: {
        responseMimeType: "application/json"
      }
    });

    console.log("Gemini response received");

    const extractedData = response.text;

    let parseData;

    try {
      parseData = JSON.parse(extractedData);
    } catch (err) {
      console.log("JSON Parse Error:", extractedData);

      return res.status(500).json({
        message: "AI returned invalid JSON"
      });
    }

    // Fix skills if AI returns string instead of array
    if (typeof parseData.skills === "string") {
      try {
        parseData.skills = JSON.parse(parseData.skills);
      } catch {
        parseData.skills = [];
      }
    }

    // Convert objects → strings
    if (Array.isArray(parseData.skills)) {
      parseData.skills = parseData.skills
        .map(skill => {
          if (typeof skill === "string") return skill;

          if (typeof skill === "object" && skill.type) {
            return skill.type;
          }

          return "";
        })
        .filter(Boolean);
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parseData
    });

    return res.status(200).json({
      resumeId: newResume._id
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};