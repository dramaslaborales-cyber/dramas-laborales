import React, { useState } from 'react';
import { X, Check, Plus } from 'lucide-react';

export default function TaskEditor({ task, onSave, onClose }) {
  const isNew = !task;
  const [form, setForm] = useState({
    text:     task?.text     || '',
    priority: task?.priority || '',
    date:     task?.date     || '',
    notes:    task?.notes    || '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.text.trim()) { alert('El texto es obligatorio'); return; }
    onSave({
      id:       task?.id || Date.now().toString(),
      text:     form.text.trim(),
      priority: form.priority || undefined,
      date:     form.date     || undefined,
      notes:    form.notes    || undefined,
      done:     task?.done    || false,
      created:  task?.created || new Date().toISOString(),
    });
  };

  const inp = {
    width: '100%', padding: '9px 11px', borderRadius: 7,
    border: '1px solid #F6D6DC', background: '#fff',
    fontSize: 13, color: '#4A2A35', fontFamily: 'inherit', outline: 'none',
  };

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, background:'rgba(74,42,53,0.4)',
      zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center',
      backdropFilter:'blur(4px)', padding:20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'#FFF5F6', borderRadius:16, padding:28,
        width:'100%', maxWidth:480,
        boxShadow:'0 20px 60px rgba(74,42,53,0.2)',
        border:'1px solid #F6D6DC',
        display:'flex', flexDirection:'column', gap:16,
      }}>

        {/* Header */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontSize:17, fontWeight:700, color:'#4A2A35', fontFamily:"'Fraunces', serif"}}>
            {isNew ? '✦ Nueva tarea' : '✏️ Editar tarea'}
          </div>
          <button onClick={onClose} style={{
            background:'#FDE5E9', border:'none', borderRadius:8,
            width:32, height:32, cursor:'pointer', color:'#9A7580',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}><X size={16}/></button>
        </div>

        {/* Text */}
        <div>
          <label style={{fontSize:11, fontWeight:600, color:'#9A7580', letterSpacing:'0.05em', textTransform:'uppercase', display:'block', marginBottom:5}}>
            Tarea *
          </label>
          <input
            autoFocus
            value={form.text}
            onChange={e => set('text', e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
            placeholder="¿Qué tienes que hacer?"
            style={inp}
          />
        </div>

        {/* Priority + Date */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div>
            <label style={{fontSize:11, fontWeight:600, color:'#9A7580', letterSpacing:'0.05em', textTransform:'uppercase', display:'block', marginBottom:5}}>
              Prioridad
            </label>
            <select value={form.priority} onChange={e => set('priority', e.target.value)} style={inp}>
              <option value="">sin prioridad</option>
              <option value="high">🔴 alta</option>
              <option value="medium">🟡 media</option>
              <option value="low">⚪ baja</option>
            </select>
          </div>
          <div>
            <label style={{fontSize:11, fontWeight:600, color:'#9A7580', letterSpacing:'0.05em', textTransform:'uppercase', display:'block', marginBottom:5}}>
              Fecha límite
            </label>
            <input
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              style={inp}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label style={{fontSize:11, fontWeight:600, color:'#9A7580', letterSpacing:'0.05em', textTransform:'uppercase', display:'block', marginBottom:5}}>
            Notas
          </label>
          <textarea
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="Contexto adicional..."
            rows={3}
            style={{...inp, resize:'vertical', lineHeight:1.5}}
          />
        </div>

        {/* Actions */}
        <div style={{display:'flex', gap:10}}>
          <button onClick={handleSave} style={{
            flex:1, background:'#E891A5', color:'#fff', border:'none',
            borderRadius:8, padding:'11px 0', fontSize:14, fontWeight:600,
            cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          }}>
            {isNew ? <><Plus size={14}/> añadir tarea</> : <><Check size={14}/> guardar</>}
          </button>
          <button onClick={onClose} style={{
            background:'#FDE5E9', color:'#9A7580', border:'none',
            borderRadius:8, padding:'11px 20px', fontSize:14,
            cursor:'pointer', fontFamily:'inherit',
          }}>cancelar</button>
        </div>
      </div>
    </div>
  );
}
