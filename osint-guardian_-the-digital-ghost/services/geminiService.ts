
import { GoogleGenAI } from "@google/genai";
import { ToolType, Level } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development, but the user must have the API_KEY in their environment.
  console.error("API_KEY is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getToolPrompt = (tool: ToolType, level: Level): string => {
  const imageContext = level.imageUrls.length > 1 ? "these images" : "this image";
  const exiftContext = level.imageUrls.length > 1 ? "for the provided images. If there are multiple, provide a combined report or separate reports for each." : "for the provided image.";
  
  switch (tool) {
    case ToolType.ReverseImageSearch:
      return `You are a simulated Reverse Image Search engine. Analyze the context of ${imageContext} from an OSINT game. The scenario is: "${level.scenario}". Provide a plausible but fictional list of "visually similar images" and "pages that include matching images". One of the results MUST subtly contain clues to the correct answers. The answers are: ${level.questions.map(q => `${q.text}: ${q.answer}`).join(', ')}. Do not state the answer directly. Weave the clues into the fictional search results. For example, mention a news article about tourism in the correct city, or a photographer's blog post about capturing landmarks in that location. Format the output with clear headings.`;
    case ToolType.ExifAnalyzer:
      return `You are a simulated EXIF data analysis tool for an OSINT game. The scenario is: "${level.scenario}". Generate plausible but fictional EXIF data ${exiftContext} Include standard fields like Camera Model, Aperture, ISO, Shutter Speed, and a crucial "Comment" or "UserComment" field. In that comment field, embed a subtle clue pointing to one of the answers. The answers are: ${level.questions.map(q => `${q.text}: ${q.answer}`).join(', ')}. For example, if the answer is 'Tokyo', the comment could be 'My first trip to the land of the rising sun!'. Make the output look like a technical data readout.`;
    case ToolType.MapTriangulator:
      return `You are a simulated Map Triangulation and Geolocation tool for an OSINT game. The user is analyzing ${imageContext} with the scenario: "${level.scenario}". Based on the visual information suggested by the images and scenario, provide a simulated analysis. Identify potential landmarks or features and suggest possible cities or countries. One of the suggestions must be the correct location. The answers are: ${level.questions.map(q => `${q.text}: ${q.answer}`).join(', ')}. For example, if the answer is 'London' and an image shows a red bus, mention the prevalence of double-decker red buses in London. Provide a "confidence score" for each potential location.`;
  }
};

const imageUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                resolve((reader.result as string).split(',')[1]);
            } else {
                reject(new Error("Failed to read blob as data URL."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};


export const generateToolOutput = async (tool: ToolType, level: Level, onChunk: (text: string) => void) => {
  try {
    const prompt = getToolPrompt(tool, level);
    
    const imageParts = await Promise.all(
        level.imageUrls.map(async (url) => {
            const base64Data = await imageUrlToBase64(url);
            return {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Data,
                },
            };
        })
    );

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [
        { 
          parts: [
            { text: prompt },
            ...imageParts
          ]
        }
      ]
    });

    for await (const chunk of responseStream) {
      onChunk(chunk.text);
    }

  } catch (error) {
    console.error("Error generating tool output:", error);
    onChunk(`Error: Could not connect to the simulation server. Please check your configuration and try again.`);
  }
};
