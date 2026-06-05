// captaincross.net edge Worker
//  1. Tracked redirects + per-click telemetry
//  2. Custom per-link unfurls (crawlers get an OG card; humans get the 302)
//  3. Live data APIs for the console: /api/twitch, /api/discord, /api/yt-thumb
// Paths in wrangler.jsonc -> assets.run_worker_first hit this Worker first.

const LINKS = {
  twitch: "https://www.twitch.tv/captaincrosstv",
  kick: "https://kick.com/captaincrosstv",
  yt: "https://www.youtube.com/@CaptainCross",
  youtube: "https://www.youtube.com/@CaptainCross",
  vods: "https://www.youtube.com/@captaincrossstreamhighlights",
  highlights: "https://www.youtube.com/@captaincrossstreamhighlights",
  ig: "https://www.instagram.com/cpt.cross/",
  instagram: "https://www.instagram.com/cpt.cross/",
  discord: "https://discord.gg/5Hx9aRyfGY",
  linkedin: "https://www.linkedin.com/in/captaincross/",
  li: "https://www.linkedin.com/in/captaincross/",
  behance: "https://www.behance.net/captaincross",
  cv: "https://captaincross.net/Aditya_Kumar_Resume_2026Q2.pdf",
  resume: "https://captaincross.net/Aditya_Kumar_Resume_2026Q2.pdf",
};

// Per-link unfurl metadata. img -> /og/<img>.png. Username only, except
// LinkedIn and the dossier, which carry the real name.
const A = {
  twitch: { img: "twitch", t: "Captain Cross // Twitch", d: "Live ops on Twitch. Follow at twitch.tv/captaincrosstv" },
  kick: { img: "kick", t: "Captain Cross // Kick", d: "Live ops on Kick. kick.com/captaincrosstv" },
  yt: { img: "yt", t: "Captain Cross // YouTube", d: "Main channel on YouTube. youtube.com/@CaptainCross" },
  vods: { img: "vods", t: "Captain Cross // VOD Archive", d: "Stream highlights and VODs on YouTube." },
  ig: { img: "ig", t: "Captain Cross // Instagram", d: "Field media and cosplay. @cpt.cross" },
  discord: { img: "discord", t: "Captain Cross // Discord", d: "Join the squad comms on Discord." },
  linkedin: { img: "linkedin", t: "Aditya Kumar // LinkedIn", d: "Service record and professional profile." },
  behance: { img: "behance", t: "Captain Cross // Behance", d: "Design portfolio on Behance." },
  cv: { img: "dossier", t: "Aditya Kumar // Dossier", d: "Operator file. Resume PDF." },
};
const OG = {
  twitch: A.twitch, kick: A.kick, yt: A.yt, youtube: A.yt, vods: A.vods, highlights: A.vods,
  ig: A.ig, instagram: A.ig, discord: A.discord, linkedin: A.linkedin, li: A.linkedin,
  behance: A.behance, cv: A.cv, resume: A.cv,
};

const CRAWLER = /(discordbot|twitterbot|facebookexternalhit|facebot|slackbot|slack-imgproxy|linkedinbot|whatsapp|telegrambot|pinterest|redditbot|googlebot|bingbot|applebot|vkshare|skypeuripreview|iframely|embedly|quora link preview|nuzzel|mastodon|bluesky|opengraph)/i;

const SITE = "https://captaincross.net";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function ogHtml(key, dest) {
  const o = OG[key];
  const img = `${SITE}/og/${o.img}.png`, t = esc(o.t), d = esc(o.d), u = `${SITE}/${key}`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${t}</title>
<meta property="og:type" content="website"><meta property="og:site_name" content="Captain Cross">
<meta property="og:title" content="${t}"><meta property="og:description" content="${d}">
<meta property="og:image" content="${img}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:url" content="${u}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}"><meta name="twitter:image" content="${img}">
<meta http-equiv="refresh" content="0;url=${esc(dest)}"><link rel="canonical" href="${esc(dest)}">
</head><body style="background:#08090a;color:#e8eae8;font-family:monospace;padding:24px">Routing to ${esc(dest)} ...</body></html>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" } });
}

const json = (obj, ttl = 30) => new Response(JSON.stringify(obj), {
  headers: { "content-type": "application/json", "access-control-allow-origin": "*", "cache-control": `public, max-age=${ttl}` },
});

// ---- YouTube latest-video thumbnail ----
const YT_CHANNELS = { main: "UCkkRErIjm5gBzNsBONJxkBA" };
const YT_HANDLES = { vods: "captaincrossstreamhighlights" };
async function ytThumb(url) {
  const seg = (url.pathname.split("/").pop() || "main").toLowerCase();
  const cf = { cacheTtl: 86400, cacheEverything: true };
  try {
    let cid = YT_CHANNELS[seg];
    if (!cid) {
      const handle = YT_HANDLES[seg] || "CaptainCross";
      const page = await fetch(`https://www.youtube.com/@${handle}/videos`, { headers: { "user-agent": "Mozilla/5.0 (compatible; CaptainCrossBot/1.0)", "accept-language": "en-US" }, cf });
      const html = await page.text();
      cid = (html.match(/"channelId":"(UC[0-9A-Za-z_-]{20,})"/) || html.match(/channel\/(UC[0-9A-Za-z_-]{20,})/) || [])[1];
    }
    if (!cid) return new Response("no channel", { status: 404 });
    const rss = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`, { cf });
    const xml = await rss.text();
    const vid = (xml.match(/<yt:videoId>([0-9A-Za-z_-]{11})<\/yt:videoId>/) || [])[1];
    if (!vid) return new Response("no video", { status: 404 });
    return Response.redirect(`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`, 302);
  } catch (e) { return new Response("err", { status: 404 }); }
}

// ---- Twitch live status (Helix, app token via client-credentials) ----
const TWITCH_CLIENT_ID = "798ggjr27yts4vj7vb7n0xgmjjandm"; // public id, safe in code
const TWITCH_LOGIN = "captaincrosstv";
let twToken = { token: null, exp: 0 };
async function twitchTokenFn(env) {
  if (!env.TWITCH_SECRET) return null;
  const now = Date.now();
  if (twToken.token && twToken.exp > now + 60000) return twToken.token;
  const r = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: `client_id=${TWITCH_CLIENT_ID}&client_secret=${encodeURIComponent(env.TWITCH_SECRET)}&grant_type=client_credentials`,
  });
  if (!r.ok) return null;
  const j = await r.json();
  twToken = { token: j.access_token, exp: now + (j.expires_in || 3600) * 1000 };
  return twToken.token;
}
async function twitchStatus(env) {
  const token = await twitchTokenFn(env);
  if (!token) return { configured: false };
  const h = { "client-id": TWITCH_CLIENT_ID, authorization: `Bearer ${token}` };
  try {
    const sres = await fetch(`https://api.twitch.tv/helix/streams?user_login=${TWITCH_LOGIN}`, { headers: h, cf: { cacheTtl: 45 } });
    const sj = await sres.json();
    if (sj.data && sj.data.length) {
      const s = sj.data[0];
      return { configured: true, live: true, title: s.title, viewers: s.viewer_count, game: s.game_name,
        thumb: s.thumbnail_url.replace("{width}", "440").replace("{height}", "248") };
    }
    let thumb = null, title = null;
    const ures = await fetch(`https://api.twitch.tv/helix/users?login=${TWITCH_LOGIN}`, { headers: h, cf: { cacheTtl: 3600 } });
    const uj = await ures.json();
    if (uj.data && uj.data[0]) {
      const u = uj.data[0];
      const vres = await fetch(`https://api.twitch.tv/helix/videos?user_id=${u.id}&first=1&type=archive`, { headers: h, cf: { cacheTtl: 300 } });
      const vj = await vres.json();
      if (vj.data && vj.data[0]) {
        thumb = vj.data[0].thumbnail_url.replace(/%?\{width\}/, "440").replace(/%?\{height\}/, "248");
        title = vj.data[0].title;
      }
      if (!thumb) thumb = u.offline_image_url || u.profile_image_url || null;
    }
    return { configured: true, live: false, title, thumb };
  } catch (e) { return { configured: true, live: false, error: true }; }
}

// ---- Discord online count (server widget must be enabled) ----
async function discordStatus() {
  try {
    const r = await fetch("https://discord.com/api/guilds/390083745702477824/widget.json", { cf: { cacheTtl: 60 } });
    if (!r.ok) return { ok: false };
    const j = await r.json();
    return { ok: true, online: j.presence_count, name: j.name };
  } catch (e) { return { ok: false }; }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;

    if (p.startsWith("/api/yt-thumb")) return ytThumb(url);
    if (p === "/api/twitch") return json(await twitchStatus(env), 45);
    if (p === "/api/discord") return json(await discordStatus(), 60);

    const key = p.replace(/^\/+|\/+$/g, "").toLowerCase();
    const dest = LINKS[key];
    if (dest) {
      const ua = request.headers.get("user-agent") || "";
      if (CRAWLER.test(ua) && OG[key]) return ogHtml(key, dest);
      const cf = request.cf || {};
      try {
        env.CLICKS && env.CLICKS.writeDataPoint({
          blobs: [key, cf.country || "", cf.region || "", cf.city || "", String(cf.asOrganization || ""),
            ua, request.headers.get("referer") || ""],
          indexes: [key],
        });
      } catch (e) { /* logging never blocks a redirect */ }
      return Response.redirect(dest, 302);
    }

    return env.ASSETS.fetch(request);
  },
};
