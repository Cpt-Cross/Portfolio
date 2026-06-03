// captaincross.net edge Worker
//  1. Tracked redirects (/twitch, /yt, /discord ...) with per-click telemetry
//  2. Live thumbnail resolver for the comms console (/api/yt-thumb/...)
// Paths listed in wrangler.jsonc -> assets.run_worker_first hit this Worker
// first; everything else is served from the static export in ./out untouched.

const LINKS = {
  twitch:    "https://www.twitch.tv/captaincrosstv",
  kick:      "https://kick.com/captaincrosstv",
  yt:        "https://www.youtube.com/@CaptainCross",
  youtube:   "https://www.youtube.com/@CaptainCross",
  vods:      "https://www.youtube.com/@captaincrossstreamhighlights",
  highlights:"https://www.youtube.com/@captaincrossstreamhighlights",
  ig:        "https://www.instagram.com/cpt.cross/",
  instagram: "https://www.instagram.com/cpt.cross/",
  discord:   "https://discord.gg/5Hx9aRyfGY",
  linkedin:  "https://www.linkedin.com/in/captaincross/",
  li:        "https://www.linkedin.com/in/captaincross/",
  behance:   "https://www.behance.net/captaincross",
  cv:        "https://captaincross.net/Aditya_Kumar_Resume_2026Q2.pdf",
  resume:    "https://captaincross.net/Aditya_Kumar_Resume_2026Q2.pdf",
};

// YouTube handles for the latest-video thumbnail resolver.
const YT_HANDLES = {
  main: "CaptainCross",
  vods: "captaincrossstreamhighlights",
};

async function ytThumb(url) {
  const seg = (url.pathname.split("/").pop() || "main").toLowerCase();
  const handle = YT_HANDLES[seg] || YT_HANDLES.main;
  const cfCache = { cacheTtl: 86400, cacheEverything: true }; // refresh ~daily
  try {
    const page = await fetch(`https://www.youtube.com/@${handle}/videos`, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; CaptainCrossBot/1.0)", "accept-language": "en-US" },
      cf: cfCache,
    });
    const html = await page.text();
    // Newest video id is usually in the initial data on the /videos page.
    let vid = (html.match(/"videoId":"([0-9A-Za-z_-]{11})"/) || [])[1];
    if (!vid) {
      const cid = (html.match(/"channelId":"(UC[0-9A-Za-z_-]{20,})"/) ||
                   html.match(/channel\/(UC[0-9A-Za-z_-]{20,})/) || [])[1];
      if (cid) {
        const rss = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`, { cf: cfCache });
        const xml = await rss.text();
        vid = (xml.match(/<yt:videoId>([0-9A-Za-z_-]{11})<\/yt:videoId>/) || [])[1];
      }
    }
    if (!vid) return new Response("no video", { status: 404 });
    return Response.redirect(`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`, 302);
  } catch (e) {
    return new Response("resolver error", { status: 404 });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. live thumbnail resolver
    if (url.pathname.startsWith("/api/yt-thumb")) return ytThumb(url);

    // 2. tracked redirects
    const key = url.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
    const dest = LINKS[key];
    if (dest) {
      const cf = request.cf || {};
      try {
        env.CLICKS && env.CLICKS.writeDataPoint({
          blobs: [
            key, cf.country || "", cf.region || "", cf.city || "",
            String(cf.asOrganization || ""),
            request.headers.get("user-agent") || "",
            request.headers.get("referer") || "",
          ],
          indexes: [key],
        });
      } catch (e) { /* logging never blocks a redirect */ }
      return Response.redirect(dest, 302);
    }

    // 3. everything else: the static site
    return env.ASSETS.fetch(request);
  },
};
