const NOTION_TOKEN = process.env.NOTION_TOKEN;
const IG_DB        = process.env.NOTION_IG_DB;
const REV_DB       = process.env.NOTION_REV_DB;

async function notionFetch(path, method = 'GET', body = null) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function getStatuses() {
  // Returns { "2026-04-20": { estado: "✅ Publicado", pageId: "xxx" }, ... }
  const statuses = {};
  let cursor;
  do {
    const data = await notionFetch(`/databases/${IG_DB}/query`, 'POST', {
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    for (const page of data.results || []) {
      const fecha = page.properties?.Fecha?.date?.start;
      const estado = page.properties?.Estado?.select?.name || '⏳ Pendiente';
      if (fecha) statuses[fecha] = { estado, pageId: page.id };
    }
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return { ok: true, statuses };
}

async function getRevenue() {
  // Returns { "Abril": { real: 195, pageId: "xxx" }, ... }
  const revenue = {};
  const data = await notionFetch(`/databases/${REV_DB}/query`, 'POST', { page_size: 20 });
  for (const page of data.results || []) {
    const mes = page.properties?.Mes?.title?.[0]?.text?.content;
    const real = page.properties?.['Total Real (€)']?.number;
    if (mes) revenue[mes] = { real: real ?? null, pageId: page.id };
  }
  return { ok: true, revenue };
}

async function updateStatus(pageId, status) {
  await notionFetch(`/pages/${pageId}`, 'PATCH', {
    properties: { Estado: { select: { name: status } } }
  });
  return { ok: true };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query?.action || req.body?.action;

  try {
    if (action === 'get_statuses') {
      return res.status(200).json(await getStatuses());
    }
    if (action === 'get_revenue') {
      return res.status(200).json(await getRevenue());
    }
    if (action === 'update_status') {
      const { pageId, status } = req.body || {};
      if (!pageId || !status) return res.status(400).json({ ok: false, error: 'Missing pageId or status' });
      return res.status(200).json(await updateStatus(pageId, status));
    }
    return res.status(400).json({ ok: false, error: `Unknown action: ${action}` });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
