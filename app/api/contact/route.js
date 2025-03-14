import { NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

export async function POST(request) {
  try {
    const templateParams = await request.json();

    emailjs.init({
      publicKey: process.env.EMAILJS_USER_ID,
      privateKey: process.env.EMAILJS_PRIVATE_KEY, 
    });

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_CONTACT_ID,
      templateParams
    );

    return NextResponse.json(
      { status: "success", message: "Повідомлення успішно відправлено!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);

    return NextResponse.json(
      { status: "error", message: "Помилка при відправці: " + error.message },
      { status: 500 }
    );
  }
}
