import React, { useState, useEffect } from 'react';
import { X, Check, Plus, Calendar, Clock, Type, AlignLeft, Hash } from 'lucide-react';

const TIPOS = ['Reel', 'Carrusel', 'Post', 'Story', 'reel', 'carrusel', 'post'];
const MESES = ['abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const FASES = [
  'LANZAMIENTO EBOOK','LANZAMIENTO ASESORÍA','LANZAMIENTO ACOMPAÑAMIENTO',
  'sembrar asesoría','educar sobre guía personal','testimonios + yoga day',
  'pre-lanzamiento asesoría','pre-lanzamiento','conversión','evergreen + autocuidado',
  'contenido ligero','cierre q3','vuelta al trabajo + vmas','CIERRE MES + DÍA SST',
  'black friday + 25N','navidad + año nuevo','otro'
];

export default function PostEditor({ post, platform, onSave, onClose }) {
  const isNew = !post;
  const [form, setForm] = useState({
    ti: post?.ti || post?.su || '',
    d:  post?.d  || new Date().toISOString().split('T')[0],
    tm: post?.tm || '09:00',
    t:  post?.t  || 'Reel',
    m:  post?.m  || 'mayo',
    f:  post?.f  || '',
    h:  post?.h  || post?.gh || '',
    cp: post?.cp || '',
    de: post?.de || '',
    st: post?.st || '',
    su: post?.su || '',
    se: post?.se || '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Auto-derive mes from date
  useEffect(() => {
    if (!form.d) return;
    const month = new Date(form.d + 'T12:00:00').getMonth(); // 0-based
    const mesMap = {3:'abril',4:'mayo',5:'junio',6:'julio',7:'agosto',8:'septiembre',9:'octubre',10:'noviembre',11:'diciembre'};
    if (mesMap[month]) set('m', mesMap[month]);
  }, [form.d]);

  const handleSave = () => {
    if (!form.ti.trim()) { alert('El título es obligatorio'); return; }
    if (!form.d) { alert('La fecha es obligatoria'); return; }
    const saved = {
      ...form,
      i: post?.i || `custom-${Date.now()}`,
      w: post?.w || 1,
      day: post?.day || '',
      ds: post?.ds || form.d.slice(5).split('-').reverse().join(' '),
      _custom: true,
      _platform: platform,
    };
    onSave(saved);
  };

  const isIG = platform === 'instagram';
  const isLI = platform === 'linkedin';
  const isSS = platform === 'substack';

  const inputStyle = {
    width: '100%', padding: '8px 10px', borderRadius: 6,
    border: '1px solid #F6D6DC', background: '#FFF',
    fontSize: 13, color: '#4A2A35', outline: 'none',
    fontFamily: 'inherit',
  };
  const labelStyle = { fontSize: 11, fontWeight: 600, color: '#9A7580', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 4 };
  const fieldStyle = { marginBottom: 14 };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(74,42,53,0.4)',
      zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)', padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#FFF5F6', borderRadius: 16, padding: 28,
        width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(74,42,53,0.2)',
        border: '1px solid #F6D6DC',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#4A2A35', fontFamily: "'Fraunces', serif" }}>
              {isNew ? '✦ Nuevo post' : '✏️ Editar post'}
            </div>
            <div style={{ fontSize: 12, color: '#9A7580', marginTop: 2 }}>
              {platform === 'instagram' ? '📸 Instagram' : platform === 'linkedin' ? '💼 LinkedIn' : '📧 Substack'}
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#FDE5E9', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: '#9A7580', display:'flex', alignItems:'center', justifyContent:'center' }}><X size={16} /></button>
        </div>

        {/* Fields */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Título {isSS ? '/ Asunto' : ''} *</label>
          <input style={inputStyle} value={form.ti || form.su} onChange={e => { set('ti', e.target.value); set('su', e.target.value); }} placeholder="Título del post..." />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>Fecha *</label>
            <input type="date" style={inputStyle} value={form.d} onChange={e => set('d', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Hora</label>
            <input style={inputStyle} value={form.tm} onChange={e => set('tm', e.target.value)} placeholder="09:00" />
          </div>
        </div>

        {!isSS && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Tipo de contenido</label>
              <select style={inputStyle} value={form.t} onChange={e => set('t', e.target.value)}>
                {(isIG ? ['Reel','Carrusel','Post','Story'] : isLI ? ['post texto','post + imagen'] : ['newsletter']).map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fase / Campaña</label>
              <select style={inputStyle} value={form.f} onChange={e => set('f', e.target.value)}>
                <option value="">— sin fase —</option>
                {FASES.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
        )}

        <div style={fieldStyle}>
          <label style={labelStyle}>Hook / Gancho ♡</label>
          <input style={inputStyle} value={form.h || form.gh} onChange={e => { set('h', e.target.value); set('gh', e.target.value); }} placeholder="La frase que para el scroll..." />
        </div>

        {isIG && (
          <div style={fieldStyle}>
            <label style={labelStyle}>Descripción visual (qué grabar / diseñar)</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
              value={form.de} onChange={e => set('de', e.target.value)}
              placeholder="Describe el visual: colores, tipografía, estructura de slides, cómo grabarlo..." />
          </div>
        )}

        <div style={fieldStyle}>
          <label style={labelStyle}>{isSS ? 'Secciones clave' : 'Copy (caption completo)'}</label>
          <textarea style={{ ...inputStyle, minHeight: isSS ? 80 : 140, resize: 'vertical' }}
            value={isSS ? form.se : form.cp}
            onChange={e => isSS ? set('se', e.target.value) : set('cp', e.target.value)}
            placeholder={isSS ? "Secciones y estructura del email..." : "Escribe el copy completo aquí ♡"} />
        </div>

        {isIG && (
          <div style={fieldStyle}>
            <label style={labelStyle}>Stories (plan de stories del día)</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
              value={form.st} onChange={e => set('st', e.target.value)}
              placeholder="Story 1 · 09:00 · ...\nStory 2 · 12:00 · ..." />
          </div>
        )}

        {/* Save button */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button onClick={handleSave} style={{
            flex: 1, background: '#E891A5', color: '#fff', border: 'none',
            borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <span style={{display:'flex', alignItems:'center', gap:6, justifyContent:'center'}}>{isNew ? <><Plus size={14}/> añadir post</> : <><Check size={14}/> guardar cambios</>}</span>
          </button>
          <button onClick={onClose} style={{
            background: '#FDE5E9', color: '#9A7580', border: 'none',
            borderRadius: 8, padding: '11px 20px', fontSize: 14,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
