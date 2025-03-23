import { Email, IEmail } from './emailModel'; // Adjust the path as needed

// Example function to save an email log
export const saveEmailLog = async (
  recipient: string,
  emailType: string,
  templateName: string,
  subject: string,
  status: 'sent' | 'failed',
  metadata: object,
  error?: string
): Promise<IEmail> => {
  try {
    const emailLog = new Email({
      recipient,
      emailType,
      templateName,
      subject,
      status,
      sentAt: new Date(),
      metadata,
      error,
    });

    const savedLog = await emailLog.save();
    // console.log('Email log saved:', savedLog);
    return savedLog;
  } catch (err) {
    console.error('Error saving email log:', err);
    throw err;
  }
};
