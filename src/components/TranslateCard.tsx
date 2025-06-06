import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

const translateCard = async (fields: string[]) => {
    const promises = fields.map((field) => translateEn_He(field));
    const translations = await Promise.all(promises);
    return translations;
}

const translateEn_He = async (text:string) => {
    const client = new InferenceClient(HF_TOKEN);
    const output = await client.translation({
        //model: "Helsinki-NLP/opus-mt-he-en",
        model: "Helsinki-NLP/opus-mt-tc-big-he-en",
        inputs: text,
        provider: "hf-inference",
    }); 
    const translatedText = output.translation_text
    return translatedText
}

export default translateCard
