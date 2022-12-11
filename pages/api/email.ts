// create email contact form handler
import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../core/utils/email";

export const email = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, idea } = req.body;

  try {
    await sendEmail({
      from: email,
      to: [process.env.NEXT_PUBLIC_EMAIL, email],
      subject: "New idea from " + name,
      text: idea,
    });
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

// Path: utils/email.ts

export default email;
