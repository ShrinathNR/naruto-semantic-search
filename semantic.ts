import readline from "readline-sync";
import mathjs, { number } from "mathjs";
import {Configuration } from "openai" 
import { OpenAIApi } from "openai";
import math from "mathjs";
const configuration = new Configuration ({
    apiKey:"",
})
const openai : OpenAIApi = new OpenAIApi(configuration);



const createEmbedding = async(text : string) => {
    const res = await openai.createEmbedding({
        model : 'text-embedding-ada-002',
        input : text,
    })
    const vector = res.data.data[0].embedding
    return vector
}

const vectorSimilarity = (v1 : number[], v2 : number[]) => {
    const similarity : number  = math.dot(v1,v2)/(math.norm(v1)*(math.norm(v2));
    return similarity;
}

const run  = async () => {
    const story_lines : string[] = ["sesfe", "fqfqwg"]

    const vectors = await Promise.all(story_lines.map((story_line) => createEmbeddings(story_line)));

    const query : string = readline.question();

    const query_vec = await createEmbedding(query);

    const similarities = vectors.map((vec) => vectorSimilarity(vec, query_vec));
    const max_similarity = Math.max(...similarities);

    if (max_similarity < 0.7) {
        console.log("there is no similar story lines found in the anime");
        return
    }

    const mostRelavantLine = story_lines[similarities.indexOf(max_similarity)];
    console.log(mostRelavantLine);


}