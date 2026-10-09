// 침묵의 공명 — 관람객 주목 부위 익명 집계 (Vercel Edge Function)
// 기존 claude-proxy 프로젝트의 api/ 폴더에 이 파일을 넣고 다시 배포하면
//   https://<프로젝트>.vercel.app/api/attention 으로 동작합니다.
// 저장소: Vercel 마켓플레이스의 Upstash Redis(무료 요금제)를 프로젝트에 연결하면
//   KV_REST_API_URL / KV_REST_API_TOKEN 환경 변수가 자동으로 들어옵니다.
//   (직접 만든 Upstash라면 UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)
// 저장하는 것: 숫자뿐 — 부위별 질문 수, 날짜별 방문 수, 화면별 열람 수, 기능 사용 수.
//   질문 내용·IP·기기 정보는 저장하지 않습니다.
// 보기: GET /api/attention?stats=1 → 방문 통계(JSON). stats.html이 이것을 표로 보여 줍니다.
export const config = { runtime: 'edge' };

const KEYS = ['rodin-forehead','rodin-fist','rodin-elbow','rodin-muscle','rodin-toes',
  'maitreya-ear','maitreya-smile','maitreya-fingers','maitreya-robe','maitreya-leg','maitreya-toes'];
const H = 'sr:attn:counts', V = 'sr:attn:visitors';
const PAGES = ['index', 'room1', 'room2'];
const EVENTS = ['complete', 'cert', 'observe', 'pose', 'chat'];
const kstDay = (t = Date.now()) => new Date(t + 9 * 3600e3).toISOString().slice(0, 10);
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store'
};
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

async function redis(cmds) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('no redis env');
  const r = await fetch(url.replace(/\/+$/, '') + '/pipeline', {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds)
  });
  if (!r.ok) throw new Error('redis ' + r.status);
  return r.json();
}

async function totals() {
  const [h, v] = await redis([['HGETALL', H], ['GET', V]]);
  const arr = h.result || [], counts = {};
  for (let i = 0; i < arr.length; i += 2) if (KEYS.includes(arr[i])) counts[arr[i]] = Number(arr[i + 1]) || 0;
  return { counts, visitors: Number(v.result) || 0 };
}

const toObj = arr => { const o = {}; for (let i = 0; i < (arr || []).length; i += 2) o[arr[i]] = Number(arr[i + 1]) || 0; return o; };
async function stats() {
  const days = []; for (let i = 29; i >= 0; i--) days.push(kstDay(Date.now() - i * 864e5));
  const cmds = [['GET', 'sr:visits:total'], ['HGETALL', 'sr:visits:days'], ['HGETALL', 'sr:pages'], ['HGETALL', 'sr:lang'], ['HGETALL', 'sr:events'], ['HGETALL', H], ['GET', V]];
  days.forEach(d => cmds.push(['HGETALL', 'sr:pages:' + d], ['HGETALL', 'sr:events:' + d]));
  const r = await redis(cmds);
  const byDay = toObj(r[1].result);
  const daily = days.map((d, i) => ({ day: d, visits: byDay[d] || 0, pages: toObj(r[7 + i * 2].result), events: toObj(r[8 + i * 2].result) }));
  return { visitsTotal: Number(r[0].result) || 0, daily, allDays: byDay, pages: toObj(r[2].result), lang: toObj(r[3].result),
           events: toObj(r[4].result), attention: toObj(r[5].result), askers: Number(r[6].result) || 0, generatedAt: new Date().toISOString() };
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  try {
    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      const cmds = [];
      const c = body && typeof body.counts === 'object' ? body.counts : {};
      for (const k of KEYS) {
        const n = Math.floor(Number(c[k]) || 0);
        if (n > 0) cmds.push(['HINCRBY', H, k, String(Math.min(n, 20))]); // 한 번에 부위당 최대 20
      }
      if (body && body.visitor === true) cmds.push(['INCR', V]);
      // 방문 기록: 한 관람(visit)당 한 번 newVisit, 화면마다 한 번 page, 기능마다 한 번 event
      const day = kstDay();
      if (body && body.newVisit === true) { cmds.push(['INCR', 'sr:visits:total'], ['HINCRBY', 'sr:visits:days', day, '1']); }
      if (body && PAGES.includes(body.page)) {
        const lang = body.lang === 'en' ? 'en' : 'ko';
        cmds.push(['HINCRBY', 'sr:pages', body.page, '1'], ['HINCRBY', 'sr:pages:' + day, body.page, '1'], ['HINCRBY', 'sr:lang', lang, '1']);
      }
      if (body && EVENTS.includes(body.event)) cmds.push(['HINCRBY', 'sr:events', body.event, '1'], ['HINCRBY', 'sr:events:' + day, body.event, '1']);
      if (cmds.length) await redis(cmds);
      return json(await totals());
    }
    if (req.method === 'GET') {
      if (new URL(req.url).searchParams.get('stats')) return json(await stats());
      return json(await totals());
    }
    return json({ error: 'method' }, 405);
  } catch (e) {
    return json({ error: 'unavailable' }, 503); // 페이지는 이때 기기 저장으로 넘어갑니다
  }
}
