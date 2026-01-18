import type { Express } from "express";
import { createServer, type Server } from "http";
import { contactFormSchema } from "../shared/schema";
import { getUncachableResendClient } from "./resend";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Get Resend client
      const { client, fromEmail } = await getUncachableResendClient();
      
      // Send email to Aziz
      await client.emails.send({
        from: fromEmail,
        to: "aziz.messaoud@esprit.tn",
        replyTo: validatedData.email,
        subject: `Portfolio Contact: ${validatedData.subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>From:</strong> ${validatedData.name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${validatedData.email}</p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${validatedData.subject}</p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1f2937;">Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6; color: #374151;">${validatedData.message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
              <p>This email was sent from your portfolio contact form at azizm.me</p>
            </div>
          </div>
        `
      });
      
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error: any) {
      console.error("Contact form error:", error);
      
      // Handle validation errors
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      // Handle other errors
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again later." 
      });
    }
  });

  return httpServer;
}
