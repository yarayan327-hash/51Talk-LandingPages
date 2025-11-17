import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Static file serving function
async function serveStaticFile(path: string): Promise<Response> {
  // Default to SpeakUp.html if no specific file requested
  if (path === '/' || path === '') {
    path = '/SpeakUp.html'
  }

  // Remove leading slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  try {
    // Fetch file from public storage
    const { data, error } = await supabase.storage
      .from('landing-pages')
      .getPublicUrl(cleanPath)

    if (error) {
      return new Response('File not found', {
        status: 404,
        headers: corsHeaders
      })
    }

    const response = await fetch(data.publicUrl)

    if (!response.ok) {
      return new Response('File not found', {
        status: 404,
        headers: corsHeaders
      })
    }

    const content = await response.text()
    const contentType = getContentType(cleanPath)

    return new Response(content, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    return new Response('Error serving file', {
      status: 500,
      headers: corsHeaders
    })
  }
}

function getContentType(path: string): string {
  if (path.endsWith('.html')) return 'text/html; charset=utf-8'
  if (path.endsWith('.css')) return 'text/css'
  if (path.endsWith('.js')) return 'application/javascript'
  if (path.endsWith('.json')) return 'application/json'
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
  if (path.endsWith('.svg')) return 'image/svg+xml'
  if (path.endsWith('.ico')) return 'image/x-icon'
  return 'text/plain'
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname

    // Serve static files
    return await serveStaticFile(path)
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    })
  }
})

// Import Supabase client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const supabaseUrl = 'https://kksiyulhjfakzoxspfdz.supabase.co'
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

const supabase = createClient(supabaseUrl, supabaseKey)