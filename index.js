// const {GoogleGenerativeAI} = require("@google/generative-ai");
// require('dotenv').config();

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// app.use(express.json());

// app.get('/', (req,res)=>{
//     res.send("Hello gemini");
// })


// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Write a story about a magic backpack.";

// const generate = async() =>{
//     try{
//         const result= await model.generate(prompt);
//         console.log(result.response.text());
//     }catch(err){
//         console.log(err);
//     }
// }


// app.listen(3000, ()=>{
//     console.log("server is running in port 3000");
// })



const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express')
const axios = require('axios')
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json());
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

var question = "what is the value of pie in maths ?";
const generate = async (question) => {
    try {
        const prompt = question;
        const result = await geminiModel.generateContent(prompt);
        const response = result.response;
        console.log(response.text());
        return response.text();
    } catch (error) {
        console.log("response error", error);
    }
};

app.post('/api/content', async (req, res) => {
    let data = req.body.question;
    var result = await generate(data);
    console.log(result);
    res.json({ "result": result });
})