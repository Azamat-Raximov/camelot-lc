import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation
function validateInput(data: unknown): { valid: boolean; error?: string; data?: { name: string; phone: string; course: string; message: string; timestamp: string } } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, phone, course, message, timestamp } = data as Record<string, unknown>;

  // Validate name
  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return { valid: false, error: 'Name is required and must be under 100 characters' };
  }

  // Validate phone (must be +998 followed by 9 digits)
  if (typeof phone !== 'string' || !/^\+998\d{9}$/.test(phone)) {
    return { valid: false, error: 'Invalid phone number format' };
  }

  // Validate course
  const validCourses = ['general', 'ielts', 'cefr'];
  if (typeof course !== 'string' || !validCourses.includes(course)) {
    return { valid: false, error: 'Invalid course selection' };
  }

  // Validate message (optional, max 1000 chars)
  if (message !== undefined && message !== null && (typeof message !== 'string' || message.length > 1000)) {
    return { valid: false, error: 'Message must be under 1000 characters' };
  }

  // Validate timestamp
  if (typeof timestamp !== 'string') {
    return { valid: false, error: 'Timestamp is required' };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      phone: phone,
      course: course,
      message: typeof message === 'string' ? message.trim() : '',
      timestamp: timestamp
    }
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Received form data:', body);

    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      console.error('Validation error:', validation.error);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { name, phone, course, message, timestamp } = validation.data!;

    const webhookUrl = 'https://hook.eu1.make.com/rhozcmbxxqxtuyvjmiopdgvwefytt8an';
    
    // Send data as separate fields for Make.com to parse easily
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        course: course,
        message: message,
        timestamp: timestamp
      }),
    });

    console.log('Webhook response status:', response.status);
    
    const responseText = await response.text();
    console.log('Webhook response:', responseText);

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}: ${responseText}`);
    }

    return new Response(JSON.stringify({ success: true, message: 'Data sent successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in send-webhook function:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
