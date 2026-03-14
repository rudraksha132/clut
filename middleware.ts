import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.ip ??
      'unknown'

    const path = req.nextUrl.pathname
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const userAgent = req.headers.get('user-agent') ?? 'unknown'
    const referer = req.headers.get('referer') ?? 'direct'

    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: '👁️ New Visitor',
            color: 0x00cfff,
            fields: [
              { name: '🌐 IP',        value: `\`${ip}\``,         inline: true },
              { name: '📄 Page',      value: `\`${path}\``,       inline: true },
              { name: '🕐 Time (IST)',value: timestamp,            inline: false },
              { name: '🔗 Referer',   value: referer,              inline: false },
              { name: '💻 Device',    value: `\`${userAgent.slice(0, 80)}\``, inline: false },
            ],
            footer: { text: 'Clut Media · Visitor Log' },
          },
        ],
      }),
    })
  } catch {
    // Never block the page load if logging fails
  }

  return NextResponse.next()
}

export const config = {
  // Only fires on real page visits — skips Next.js internals, static files, API routes
  matcher: ['/((?!_next|favicon.ico|api|.*\\..*).*)'],
}
