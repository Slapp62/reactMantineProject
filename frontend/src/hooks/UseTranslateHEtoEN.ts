import { InferenceClient } from "@huggingface/inference";
import { useState } from "react";
import { toast } from "react-toastify";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

export const useTranslateHEtoEN = (title: string | undefined, subtitle: string | undefined, description: string | undefined) => {
    const [translatedText, setTranslatedText] = useState<string[] | null>(null);
    const cardString = `${title} \n ${subtitle} \n ${description}`
    const containsHebrew = RegExp(/[\u0590-\u05FF]/).test(cardString);
    const [translationLoading, setTranslationLoading] = useState(false);
    const [currentLang, setCurrentLang] = useState<'he' | 'en'>('he');
    const originalText = [title || "", subtitle || "", description || ""];
        
    const handleTranslate = async (cardString: string) => {
        if (currentLang === 'en') {
            setCurrentLang('he');
            setTranslatedText(originalText);
            return
        }

        try {
            setTranslationLoading(true);
            const cardStringArr = cardString.split(' \n ');
            const aiOutput = await translateCard(cardStringArr);                
            setTranslatedText(aiOutput);
            setCurrentLang('en');
        } catch (error : any) {
            toast.error('Translation error:', error);
        } finally {
            setTranslationLoading(false);
        }
    }

    const translateCard = async (fields: string[]) => {
        const promises = fields.map((field) => translateEn_He(field));
        const aiMultipleOutput = await Promise.all(promises);
        return aiMultipleOutput;
    }

    const translateEn_He = async (text:string) => {
        const client = new InferenceClient(HF_TOKEN);
        const output = await client.translation({
            model: "Helsinki-NLP/opus-mt-tc-big-he-en",
            inputs: text,
            provider: "hf-inference",
        }); 
        const aiSingleOutput = output.translation_text
        return aiSingleOutput
    }
    
    return {translatedText, handleTranslate, containsHebrew, translationLoading, cardString, currentLang};
}
    

export default useTranslateHEtoEN
