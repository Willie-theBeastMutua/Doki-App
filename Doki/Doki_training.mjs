import fs from 'fs';
import OpenAI from 'openai';

const openAiApiKey = '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';

const openai = new OpenAI({ apiKey: openAiApiKey });
// console.log(openai);

const FILE_PATH = 'C:/Users/Wilson Mutua/OneDrive - healthstrat.co.ke/Projects/Doki-App/Doki/docs/data.jsonl';
var trainingFile;
async function main() {
  try {
    const file = await openai.files.create({
      file: fs.createReadStream(FILE_PATH),
      purpose: 'fine-tune',
    });

    console.log('File created successfully:', file);
    trainingFile = file.id;
  } catch (error) {
    console.error('Error creating file for fine-tuning:', error.message);
  }
  const fineTune = await openai.fineTuning.jobs.create({ training_file: trainingFile, model: 'gpt-3.5-turbo' });
  // console.log(finetune);
}

main();

