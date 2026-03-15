import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

//controller for enhancing resume's professional summary
//POST: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.responses.create({
      model: "gpt-5-nano",
      input: `You are an expert resume writer.

Enhance the following professional summary in 1-2 sentences.
Highlight key skills, experience, and career objectives.
Make it compelling and ATS-friendly.

Professional Summary:
${userContent}`
    });

    const enhancedContent = response.output_text;

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    console.log("FULL ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

//controller for enhancing resume's job description
//POST: /api/ai/enhance-job-decs

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.responses.create({
      model: "gpt-5-nano",
      input: `You are an expert resume writer.
Enhance this job description in 1-2 sentences.
Highlight key responsibilities and achievements.
Use action verbs and make it ATS-friendly.

Job Description:
${userContent}`
    });

    const enhancedContent = response.output_text;

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    console.log("FULL ERROR:", error);
    return res.status(400).json({ message: error.message });
  }
};
//controller for enhancing resume to the database
//POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
    try{
        const {resumeText, title} = req.body;
        const userId = req.userId;

        if(!resumeText){
            return res.status(400).json({message: 'Missing required fields'})
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume."

        const userPrompt = `extract data from this resume: ${resumeText}
        
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
        ],
        }`;

        console.log("Upload Resume Body:", req.body);

        const response = await ai.responses.create({
          model: "gpt-5-nano",
          input: `${systemPrompt}\n\n${userPrompt}`,
          text: {
            format: {
              type: "json_object"
            }
          }
        });

        console.log("OpenAI response received");

        const extractedData = response.output_text;

        let parseData;

        try {
            parseData = JSON.parse(extractedData);
        } catch (err) {
            console.log("JSON Parse Error:", extractedData);
            return res.status(500).json({ message: "AI returned invalid JSON" });
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
        parseData.skills = parseData.skills.map(skill => {
            if (typeof skill === "string") return skill;
            if (typeof skill === "object" && skill.type) return skill.type;
            return "";
        }).filter(Boolean);
    }

    const newResume = await Resume.create({
        userId,
        title,
        ...parseData
    });

    res.json({ resumeId: newResume._id });

    }catch (error){
        console.log("FULL ERROR:", error);
        return res.status(500).json({message: error.message})
    }
    
}