// src/email/emailService.ts
import { transporter } from './emailConfig';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';


// Helper function to load and compile .hbs template
const loadTemplate = (templateName: string, variables: Record<string, unknown>) => {
  const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
  
  // Read the template file
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  
  // Compile the template using Handlebars
  const template = Handlebars.compile(templateSource);
  
  // Return the compiled HTML with the passed variables
  return template(variables);
};


export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  variables: Record<string, unknown>
): Promise<void> => {
  // Load and populate the template
  const htmlContent = loadTemplate(templateName, variables);

  const mailOptions = {
    from: '"VoiceOPS" <pratham.patel@atomostech.com>', // Replace 'abc@gmail.com' with your email
    to, // Recipient address
    // cc:"pnp220502@gmail.com",
    subject, // Subject line
    html: htmlContent, // The compiled HTML content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
 
    // Log the response for debugging
    console.log('Message sent:', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email:', error);

    // Re-throw the error if you want to handle it in the calling function
    throw error instanceof Error ? error : new Error('Unknown error occurred while sending email');
  }
};
