import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    const path = req.nextUrl.pathname
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const userAgent = req.headers.get('user-agent') ?? 'unknown'
    const referer = req.headers.get('referer') ?? 'direct'
    const language = req.headers.get('accept-language')?.split(',')[0] ?? 'unknown'

    // Free IP intelligence — no API key needed, 45 req/min limit
    let geo: Record<string, string> = {}
    try {
      const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,mobile`)
      geo = await geoRes.json()
    } catch {
      geo = {}
    }

    // Parse device type from user agent
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
    const isBot = /bot|crawl|spider|slurp|bingbot|googlebot/i.test(userAgent)
    const browser = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/[\d.]+/)?.[0] ?? 'unknown'
    const os = userAgent.match(/\(([^)]+)\)/)?.[1]?.split(';')[0] ?? 'unknown'

    if (isBot) return NextResponse.next() // Don't log bots

    const isProxy = geo.proxy === 'true'
    const isHosting = geo.hosting === 'true' // true if VPN / datacenter
    const isMobileNetwork = geo.mobile === 'true'

    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: `👁️ New Visitor ${isProxy || isHosting ? '⚠️ VPN/Proxy Detected' : ''}`,
            color: isProxy || isHosting ? 0xff9900 : 0x00cfff,
            fields: [
              // ── Identity ────────────────────────────────────────────────
              { name: '🌐 IP Address', value: `\`${ip}\``, inline: true },
              { name: '🔒 Proxy / VPN', value: isProxy || isHosting ? '⚠️ Yes' : '✅ No', inline: true },
              { name: '📶 Mobile Network', value: isMobileNetwork ? 'Yes' : 'No', inline: true },

              // ── Location ────────────────────────────────────────────────
              { name: '🌍 Country', value: geo.country ?? 'unknown', inline: true },
              { name: '🏙️ City / Region', value: `${geo.city ?? 'unknown'}, ${geo.regionName ?? ''}`, inline: true },
              { name: '📮 ZIP Code', value: geo.zip ?? 'unknown', inline: true },
              {
                name: '📍 Coordinates', value: geo.lat && geo.lon
                  ? `[${geo.lat}, ${geo.lon}](https://maps.google.com/?q=${geo.lat},${geo.lon})`
                  : 'unknown', inline: true
              },
              { name: '🕐 Their Timezone', value: geo.timezone ?? 'unknown', inline: true },

              // ── Network / ISP ────────────────────────────────────────────
              { name: '🏢 ISP', value: geo.isp ?? 'unknown', inline: true },
              { name: '🏗️ Organisation', value: geo.org ?? 'unknown', inline: true },
              { name: '📡 AS Number', value: geo.as ?? 'unknown', inline: true },

              // ── Device ───────────────────────────────────────────────────
              { name: '💻 Device Type', value: isMobile ? '📱 Mobile' : '🖥️ Desktop', inline: true },
              { name: '🌐 Browser', value: browser, inline: true },
              { name: '⚙️ OS', value: os, inline: true },
              { name: '🗣️ Language', value: language, inline: true },

              // ── Visit ────────────────────────────────────────────────────
              { name: '📄 Page', value: `\`${path}\``, inline: true },
              { name: '🔗 Referer', value: referer, inline: true },
              { name: '🕐 Time (IST)', value: timestamp, inline: false },
              { name: '🔍 User Agent', value: `\`${userAgent.slice(0, 100)}\``, inline: false },
            ],
            footer: { text: 'Clut Media · Visitor Intelligence' },
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
  // Fires on real page visits only — skips Next.js internals, static files, API routes
  matcher: ['/((?!_next|favicon.ico|api|.*\\..*).*)'],
}