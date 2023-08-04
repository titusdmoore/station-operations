import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const key = Deno.env.get("RESEND_KEY");
const to = Deno.env.get("EMAIL_TO");
const from = Deno.env.get("EMAIL_FROM");

const handler = async (request: Request): Promise<Response> => {
  const { firstName, lastName, issueDescription, typeIssue, roster, userEmail } = await request.json()
  let subject = `New Issue Reported Regarding ${roster.name}`;

  console.log(key)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from: from,
      to: to,
      subject: subject,
      bcc: 'tmoore@ftfd.org',
      cc: userEmail ?? '',
      html: `<h1>${firstName} ${lastName} has reported an issue regarding ${roster.name}.</h1><div>Type: ${typeIssue}</div><div>Issue Description: ${issueDescription}</div>`,
    }),
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

serve(handler)

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
