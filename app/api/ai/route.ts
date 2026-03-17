import OpenAI from "openai";

export async function POST(req: Request) {

  const body = await req.json();

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You explain bills, legal notices and write legal applications in simple Hindi."
      },
      {
        role: "user",
        content: body.prompt
      }
    ]
  });

  return Response.json({
    result: response.choices[0].message.content
  });

}