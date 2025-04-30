// pages/api/get-skills-suggestions.js

import { MistralClient } from '@mistralai/mistralai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { jobTitle } = req.body;
    
    if (!jobTitle || jobTitle.trim() === '') {
      return res.status(400).json({ 
        error: 'Job title is required',
        skills: ["Communication", "Problem Solving", "Teamwork", "Time Management"]
      });
    }

    // Initialize Mistral AI client with your API key
    const client = new MistralClient(import.meta.env.MISTRAL_API_KEY);
    
    // Create the prompt for Mistral AI
    const prompt = `Generate a list of 8-12 relevant professional skills for someone with the job title "${jobTitle}". 
    Include both technical and soft skills that would be valuable for this role. 
    Format the response as a JSON array of strings containing only the skill names.
    For example: ["JavaScript", "React", "Problem Solving"]`;

    // Call Mistral AI API
    const response = await client.chat({
      model: "mistral-large-latest", // Use appropriate model
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    let skills = [];
    
    try {
      // Try to parse JSON from the response
      const content = response.choices[0].message.content;
      // Extract JSON array if it's embedded in text
      const jsonMatch = content.match(/\[.*\]/s);
      
      if (jsonMatch) {
        skills = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if response isn't valid JSON
        skills = content
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill.length > 0);
      }
    } catch (parseError) {
      console.error("Error parsing Mistral AI response:", parseError);
      // Fallback to default skills
      skills = getDefaultSkills(jobTitle);
    }

    // Ensure we have at least some skills
    if (!skills || skills.length === 0) {
      skills = getDefaultSkills(jobTitle);
    }

    return res.status(200).json({ skills });
    
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ 
      error: 'Failed to get suggestions from Mistral AI',
      skills: getDefaultSkills(req.body.jobTitle)
    });
  }
}

// Fallback function for default skills
function getDefaultSkills(jobTitle = "") {
  const commonSkills = [
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Time Management",
  ];

  const lowerTitle = jobTitle.toLowerCase();
  if (lowerTitle.includes("developer") || lowerTitle.includes("engineer")) {
    return [...commonSkills, "JavaScript", "React", "Git", "CSS", "HTML"];
  }
  if (lowerTitle.includes("designer")) {
    return [...commonSkills, "UI/UX", "Figma", "Adobe Creative Suite", "Prototyping"];
  }
  if (lowerTitle.includes("manager")) {
    return [...commonSkills, "Leadership", "Project Management", "Agile", "Budgeting"];
  }
  
  return [...commonSkills, "JavaScript", "React", "UI/UX Design", "Project Management"];
}