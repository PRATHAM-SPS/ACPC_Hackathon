
import { saveEmailLog } from "../emailController";
import { sendEmail } from "../emailService";
import { Request, Response } from 'express';

export const sendFormRequestEmail = async (req: Request, res: Response) => {
    try {
        // const { customer_name, customer_email } = req.body;
        const body = req.body;
        // const logFilePath = path.join(__dirname, 'request_log.json');
        const customer_name:string = "Customer"
        const customer_email:string = req.body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["email_address"]
        // fs.writeFileSync(logFilePath, JSON.stringify(req.body, null, 2), 'utf-8');
        // // console.log("Request body logged to file:", logFilePath); 
        // console.log("custemail",customer_email)
        

        const toolCallId = req.body["message"]["toolWithToolCallList"][0]["toolCall"]["id"]


        

        if (!customer_name || !customer_email) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }



        const templateName = "Form-Request-Mail";
        const subject = "Action Required: Please Fill Out the Form";
        const email = customer_email;
        const form_link = "https://voice-ops-eight.vercel.app/test";

        const variables = {
            template_content: {
                customer_name,
                form_link,
            },
        };

      

        Promise.allSettled([
            sendEmail(email, subject, templateName, variables),
            saveEmailLog(email, "Platform", templateName, subject, "sent", variables),
        ]).catch((error) => console.error("Error in background processing:", error));

    
        res.status(200).json(
            {
                results: [
                    {
                        "toolCallId": toolCallId,
                        "result": "Email sent sucessfully"
                    }
                ]
            }
        );

    } catch (error) {
        console.error("Error sending form request email:", error);
    }
};
// export const sendCibilScoreEmail = async (req: Request, res: Response) => {
//     try {
//         const { customer_name, customer_email, cibil_score, loan_amount } = req.body;

//         if (!customer_name || !customer_email || !cibil_score || !loan_amount) {
//             res.status(400).json({ message: "Missing required fields." });
//             return;
//         }

//         const templateName = "Cibil-mail";
//         const subject = "Your CIBIL Score & Loan Offer Details";
//         const email = customer_email;
//         const form_link = "https://voice-ops-eight.vercel.app/test";

//         const variables = {
//             template_content: {
//                 customer_name,
//                 cibil_score,
//                 loan_amount,
//                 form_link,
//             },
//         };

//         console.log("Sending email to:", email);
//         console.log("Template Name:", templateName);
//         console.log("Subject:", subject);
//         console.log("Variables:", JSON.stringify(variables, null, 2));

//         // Debug: Log before calling functions
//         console.log("Calling sendEmail()...");
//         const emailPromise = sendEmail(email, subject, templateName, variables);
        
//         console.log("Calling saveEmailLog()...");
//         const logPromise = saveEmailLog(email, "Platform", templateName, subject, "sent", variables);

//         // Execute promises
//         await Promise.all([emailPromise, logPromise]);

//         res.status(200).json({ message: "Email sent successfully", status: true });

//     } catch (error) {
//         console.error("❌ Error sending CIBIL score email:", error);

//         const email = req.body.customer_email;
//         const templateName = "CIBIL-Score-Mail";
//         const variables = req.body;
//         const errorMessage = error instanceof Error ? error.message : "Unknown error";

//         console.log("Logging email failure...");
//         saveEmailLog(email, "Platform", templateName, "CIBIL Score Email", "failed", variables, errorMessage)
//             .catch((logError) => console.error("❌ Failed to save email log:", logError));
        
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

export const sendCibilScoreEmail = async (req: Request, res: Response) => {
    try {
        const { customer_name, customer_email, cibil_score, loan_amount } = req.body;

        if (!customer_name || !customer_email || !cibil_score || !loan_amount) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }

        const templateName = "Cibil-mail";
        const subject = "Your CIBIL Score & Loan Offer Details";
        const email = customer_email;
        const form_link = "https://voice-ops-eight.vercel.app/test";

        // Determine credit rating based on CIBIL score
        let credit_rating = "Poor";
        if (cibil_score >= 750) credit_rating = "Excellent";
        else if (cibil_score >= 600) credit_rating = "Good";
        else if (cibil_score >= 500) credit_rating = "Fair";

        const variables = {
            template_content: {
                customer_name,
                cibil_score,
                loan_amount,
                credit_rating,
                form_link,
            },
        };

        console.log("Sending email to:", email);
        console.log("Subject:", subject);
        console.log("Template Variables:", JSON.stringify(variables, null, 2));

        // Send email and log the email status
        await Promise.all([
            sendEmail(email, subject, templateName, variables),
            saveEmailLog(email, "Platform", templateName, subject, "sent", variables),
        ]);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending CIBIL score email:", error);

        // Log failed email attempt
        const email = req.body.customer_email;
        const templateName = "cibil-score-email";
        const variables = req.body;

        saveEmailLog(email, "Platform", templateName, "CIBIL Score Email", "failed", variables, (error as Error).message)
            .catch((logError) => console.error("Failed to save email log:", logError));

        res.status(500).json({ message: "Internal Server Error" });
    }
};


// export const sendCallSummaryEmail = async (req: Request, res: Response) => {
//     try {
//         const body = req.body;

//         const customer_name: string = "Customer";
//         const customer_email: string = req.body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["email_address"];
//         const toolCallId = req.body["message"]["toolWithToolCallList"][0]["toolCall"]["id"];

//         if (!customer_email) {
//             res.status(400).json({ message: "Missing required email field." });
//             return;
//         }

//         // Static Feedback Form Link
//         const feedback_link = "https://docs.google.com/forms/d/e/1FAIpQLSfj8mCyKOlweaOVIZ7KzWRq6rbNpPyCRMvayQysOGezqzFF0g/viewform?usp=dialog";

//         // Email Content Variables
//         const templateName = "Summary-mail";
//         const subject = "Your Call Summary & Feedback Request";

//         const variables = {
//             template_content: {
//                 customer_name,
//                 call_date: body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["call_date"] || "23 March 2025",
//                 call_summary: body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["call_summary"] || "No summary available.",
//                 cibil_score: body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["cibil_score"] || "N/A",
//                 loan_amount: body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["loan_amount"] || "N/A",
//                 email_address: customer_email,
//                 feedback_link,
//             },
//         };

//         const response = await fetch(`https://api.vapi.ai/call/${toolCallId}`, {
//             method: "GET",
//             headers: {
//               "Authorization": "Bearer b8b9b221-d4c5-45c0-a95b-e0234f745e40"
//             },
//           });
          
//           const body2 = await response.json();
//         console.log(body2);
//         const url = body2["recodingUrl"];

//         // Send Email & Log
//         Promise.allSettled([
//             sendEmail(customer_email, subject, templateName, variables),
//             saveEmailLog(customer_email, "Platform", templateName, subject, "sent", variables),
//         ]).catch((error) => console.error("Error in background processing:", error));

//        res.status(200).json({
//             results: [
//                 {
//                     "toolCallId": toolCallId,
//                     "result": "Email sent successfully",
//                 },
//             ],
//         });
//         return;

//     } catch (error) {
//         console.error("Error sending call summary email:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

export const sendCallSummaryEmail= async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const customer_name: string = "Customer"; // You can update this if you have the customer's name from the request
        const customer_email: string = req.body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["email_address"];
        const toolCallId = req.body["message"]["toolWithToolCallList"][0]["toolCall"]["id"];

        if (!customer_email) {
            res.status(400).json({ message: "Missing required email field." });
            return;
        }

        // Static Feedback Form Link
        const feedback_link = "https://docs.google.com/forms/d/e/1FAIpQLSfj8mCyKOlweaOVIZ7KzWRq6rbNpPyCRMvayQysOGezqzFF0g/viewform?usp=dialog";

        // Email Content Variables
        const templateName = "Summary-mail";
        const subject = "Your Call Summary & Feedback Request";

        const loan_type = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["loan_type"] || "Not specified";
        const loan_amount = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["loan_amount"] || "N/A";
        const cibil_score = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["cibil_score"] || "N/A";
        const call_date = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["call_date"] || "23 March 2025";
        const call_summary = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["call_summary"] || "No summary available.";

    
        // // Fetch recording URL (if needed)
        // const response = await fetch(`https://api.vapi.ai/call/${toolCallId}`, {
        //     method: "GET",
        //     headers: {
        //       "Authorization": "Bearer b8b9b221-d4c5-45c0-a95b-e0234f745e40"
        //     },
        // });
          
        // const body2 = await response.json();
        // console.log(body2);
        // const url = body2["recodingUrl"]; // Optional recording URL
        const url="https://storage.vapi.ai/bf2ead6c-6ad7-497a-bab8-876300fc7f6d-1742694465265-dd7e2007-25eb-459a-a804-ac61dba738ef-mono.wav"


        const variables = {
            template_content: {
                customer_name,
                call_date,
                call_summary,
                cibil_score,
                loan_type,
                loan_amount,
                email_address: customer_email,
                feedback_link,
                audio_url: url, // Include recording URL in the variables
            },
        };

        // Send Email & Log
        Promise.allSettled([
            sendEmail(customer_email, subject, templateName, variables),
            saveEmailLog(customer_email, "Platform", templateName, subject, "sent", variables),
        ]).catch((error) => console.error("Error in background processing:", error));

        res.status(200).json({
            results: [
                {
                    "toolCallId": toolCallId,
                    "result": "Email sent successfully",
                },
            ],
        });
        return;

    } catch (error) {
        console.error("Error sending call summary email:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
