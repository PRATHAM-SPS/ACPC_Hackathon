import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface representing a document in MongoDB.
export interface IEmail extends Document {
  recipient: string;          // The email address of the recipient
  emailType: string;          // Type of the email (e.g., 'registration', 'passwordReset', 'surveyNotification')
  templateName: string;       // Name of the email template used (e.g., 'mqd-int-01')
  subject: string;            // The subject of the email
  status: 'sent' | 'failed';  // Status of the email: 'sent' or 'failed'
  sentAt: Date;               // The date and time when the email was sent
  error?: string;             // Optional: Error message if sending failed
  metadata: object;           // Metadata of the email, including dynamic data
}

// Define the Mongoose schema
const EmailSchema: Schema = new Schema<IEmail>(
  {
    recipient: { type: String, required: true },
    emailType: { type: String, required: true },
    templateName: { type: String, required: true }, // Template name field
    subject: { type: String, required: true },
    status: {
      type: String,
      enum: ['sent', 'failed'],
      required: true,
    },
    sentAt: { type: Date, default: Date.now }, // Default to current date
    error: { type: String }, // Store error message if sending fails
    metadata: { type: Object, required: true }, // Store metadata for reference
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create and export the Email model
export const Email: Model<IEmail> = mongoose.model<IEmail>('Email', EmailSchema);
