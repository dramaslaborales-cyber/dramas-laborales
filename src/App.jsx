import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Calendar as CalIcon, Home, Instagram as IgIcon, Linkedin as LiIcon, FileText, 
  Video, Image as ImgIcon, Heart, Hash, Users, TrendingUp, BarChart3, Check,
  Edit2, Save, Plus, X, Upload, Clock, Sparkles, Target, Award, ChevronLeft, 
  ChevronRight, Filter, Circle, CheckCircle2, PauseCircle, Trash2, Copy as CopyIcon,
  Eye, Grid, BookOpen, Coffee, Flame, Star, Zap, Bell
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie, Area, AreaChart } from 'recharts';

// ═══════════════════════════════════════════════════════════════════
// MINI EDITOR — generic inline modal for adding/editing items
// ═══════════════════════════════════════════════════════════════════
function MiniEditor({ title, fields, initial = {}, onSave, onClose }) {
  const [form, setForm] = React.useState(initial);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width:'100%', padding:'8px 10px', borderRadius:6,
    border:`1px solid #F6D6DC`, background:'#FFF',
    fontSize:13, color:'#4A2A35', outline:'none', fontFamily:'inherit',
  };
  const labelStyle = {
    fontSize:11, fontWeight:600, color:'#9A7580',
    letterSpacing:'0.05em', textTransform:'uppercase',
    display:'block', marginBottom:4,
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(74,42,53,0.4)',
      zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center',
      backdropFilter:'blur(4px)', padding:20,
    }} onClick={onClose}>
      <div style={{
        background:'#FFF5F6', borderRadius:16, padding:24,
        width:'100%', maxWidth:480, maxHeight:'85vh', overflowY:'auto',
        boxShadow:'0 20px 60px rgba(74,42,53,0.2)',
        border:'1px solid #F6D6DC',
      }} onClick={e => e.stopPropagation()}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
          <div style={{fontSize:16, fontWeight:700, color:'#4A2A35', fontFamily:"'Fraunces', serif"}}>{title}</div>
          <button onClick={onClose} style={{background:'#FDE5E9', border:'none', borderRadius:8, width:30, height:30, cursor:'pointer', color:'#9A7580', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <X size={15}/>
          </button>
        </div>

        {fields.map(f => (
          <div key={f.key} style={{marginBottom:14}}>
            <label style={labelStyle}>{f.label}{f.required ? ' *' : ''}</label>
            {f.type === 'textarea' ? (
              <textarea
                style={{...inputStyle, minHeight: f.rows ? f.rows * 22 : 80, resize:'vertical'}}
                value={form[f.key] || ''}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder || ''}
              />
            ) : f.type === 'select' ? (
              <select style={inputStyle} value={form[f.key] || ''} onChange={e => set(f.key, e.target.value)}>
                {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input
                style={inputStyle}
                value={form[f.key] || ''}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder || ''}
              />
            )}
          </div>
        ))}

        <div style={{display:'flex', gap:10, marginTop:8}}>
          <button onClick={() => onSave(form)} style={{
            flex:1, background:'#E891A5', color:'#fff', border:'none',
            borderRadius:8, padding:'10px 0', fontSize:13, fontWeight:600,
            cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          }}>
            <Check size={14}/> guardar
          </button>
          <button onClick={onClose} style={{
            background:'#FDE5E9', color:'#9A7580', border:'none',
            borderRadius:8, padding:'10px 18px', fontSize:13, cursor:'pointer', fontFamily:'inherit',
          }}>cancelar</button>
        </div>
      </div>
    </div>
  );
}

import PostEditor from './PostEditor.jsx';
import TaskEditor from './TaskEditor.jsx';

// ═══════════════════════════════════════════════════════════════════
// EMBEDDED DATA (from Excel)
// ═══════════════════════════════════════════════════════════════════
const D = {"posts": {"ig": [         {"i": "51", "m": "junio", "w": 1, "d": "2026-06-01", "day": "Lunes", "ds": "1 jun", "t": "reel", "ti": "'algunas necesitan más que un ebook'", "f": "sembrar asesoría"}, {"i": "52", "m": "junio", "w": 1, "d": "2026-06-02", "day": "Martes", "ds": "2 jun", "t": "carrusel", "ti": "cuándo buscar ayuda profesional", "f": "sembrar asesoría"}, {"i": "53", "m": "junio", "w": 1, "d": "2026-06-03", "day": "Miércoles", "ds": "3 jun", "t": "reel", "ti": "mujeres tony (lea michele, etc)", "f": "sembrar asesoría"}, {"i": "54", "m": "junio", "w": 1, "d": "2026-06-04", "day": "Jueves", "ds": "4 jun", "t": "post", "ti": "limitaciones autoayuda", "f": "sembrar asesoría"}, {"i": "55", "m": "junio", "w": 1, "d": "2026-06-05", "day": "Viernes", "ds": "5 jun", "t": "reel", "ti": "red flag", "f": "sembrar asesoría"}, {"i": "56", "m": "junio", "w": 1, "d": "2026-06-06", "day": "Sábado", "ds": "6 jun", "t": "carrusel", "ti": "ebook + teaser asesoría", "f": "sembrar asesoría"}, {"i": "57", "m": "junio", "w": 1, "d": "2026-06-07", "day": "Domingo", "ds": "7 jun", "t": "post", "ti": "newsletter", "f": "sembrar asesoría"}, {"i": "58", "m": "junio", "w": 2, "d": "2026-06-08", "day": "Lunes", "ds": "8 jun", "t": "reel", "ti": "qué es una sesión de orientación", "f": "educar sobre guía personal"}, {"i": "59", "m": "junio", "w": 2, "d": "2026-06-09", "day": "Martes", "ds": "9 jun", "t": "carrusel", "ti": "preguntas frecuentes", "f": "educar sobre guía personal"}, {"i": "60", "m": "junio", "w": 2, "d": "2026-06-10", "day": "Miércoles", "ds": "10 jun", "t": "reel", "ti": "mujeres que inspiran (vera wang 40 años)", "f": "educar sobre guía personal"}, {"i": "61", "m": "junio", "w": 2, "d": "2026-06-11", "day": "Jueves", "ds": "11 jun", "t": "post", "ti": "duda común", "f": "educar sobre guía personal"}, {"i": "62", "m": "junio", "w": 2, "d": "2026-06-12", "day": "Viernes", "ds": "12 jun", "t": "reel", "ti": "pov laboral", "f": "educar sobre guía personal"}, {"i": "63", "m": "junio", "w": 2, "d": "2026-06-13", "day": "Sábado", "ds": "13 jun", "t": "carrusel", "ti": "ebook", "f": "educar sobre guía personal"}, {"i": "64", "m": "junio", "w": 2, "d": "2026-06-14", "day": "Domingo", "ds": "14 jun", "t": "post", "ti": "reflexión", "f": "educar sobre guía personal"}, {"i": "65", "m": "junio", "w": 3, "d": "2026-06-15", "day": "Lunes", "ds": "15 jun", "t": "reel", "ti": "testimonios ebook", "f": "testimonios + yoga day"}, {"i": "66", "m": "junio", "w": 3, "d": "2026-06-16", "day": "Martes", "ds": "16 jun", "t": "carrusel", "ti": "ejercicio exprés", "f": "testimonios + yoga day"}, {"i": "67", "m": "junio", "w": 3, "d": "2026-06-17", "day": "Miércoles", "ds": "17 jun", "t": "reel", "ti": "mujeres que cambiaron de carrera", "f": "testimonios + yoga day"}, {"i": "68", "m": "junio", "w": 3, "d": "2026-06-18", "day": "Jueves", "ds": "18 jun", "t": "post", "ti": "testimonio", "f": "testimonios + yoga day"}, {"i": "69", "m": "junio", "w": 3, "d": "2026-06-19", "day": "Viernes", "ds": "19 jun", "t": "reel", "ti": "bienestar laboral (día yoga)", "f": "testimonios + yoga day"}, {"i": "70", "m": "junio", "w": 3, "d": "2026-06-20", "day": "Sábado", "ds": "20 jun", "t": "carrusel", "ti": "ebook + asesoría teaser", "f": "testimonios + yoga day"}, {"i": "71", "m": "junio", "w": 3, "d": "2026-06-21", "day": "Domingo", "ds": "21 jun", "t": "post", "ti": "san juan: quemar lo que no funciona", "f": "testimonios + yoga day"}, {"i": "72", "m": "junio", "w": 4, "d": "2026-06-22", "day": "Lunes", "ds": "22 jun", "t": "reel", "ti": "'algo viene en julio'", "f": "pre-lanzamiento asesoría"}, {"i": "73", "m": "junio", "w": 4, "d": "2026-06-23", "day": "Martes", "ds": "23 jun", "t": "carrusel", "ti": "señales de que necesitas guía", "f": "pre-lanzamiento asesoría"}, {"i": "74", "m": "junio", "w": 4, "d": "2026-06-24", "day": "Miércoles", "ds": "24 jun", "t": "reel", "ti": "storytelling personal", "f": "pre-lanzamiento asesoría"}, {"i": "75", "m": "junio", "w": 4, "d": "2026-06-25", "day": "Jueves", "ds": "25 jun", "t": "post", "ti": "lista de espera abierta", "f": "pre-lanzamiento asesoría"}, {"i": "76", "m": "junio", "w": 4, "d": "2026-06-26", "day": "Viernes", "ds": "26 jun", "t": "reel", "ti": "humor", "f": "pre-lanzamiento asesoría"}, {"i": "77", "m": "junio", "w": 4, "d": "2026-06-27", "day": "Sábado", "ds": "27 jun", "t": "carrusel", "ti": "qué incluirá asesoría", "f": "pre-lanzamiento asesoría"}, {"i": "78", "m": "junio", "w": 4, "d": "2026-06-28", "day": "Domingo", "ds": "28 jun", "t": "post", "ti": "cierre junio", "f": "pre-lanzamiento asesoría"}, {"i": "79", "m": "julio", "w": 1, "d": "2026-07-01", "day": "Lunes", "ds": "1 jul", "t": "reel", "ti": "calentamiento asesoría", "f": "pre-lanzamiento"}, {"i": "80", "m": "julio", "w": 1, "d": "2026-07-02", "day": "Martes", "ds": "2 jul", "t": "carrusel", "ti": "para quién es la asesoría", "f": "pre-lanzamiento"}, {"i": "81", "m": "julio", "w": 1, "d": "2026-07-03", "day": "Miércoles", "ds": "3 jul", "t": "reel", "ti": "mujeres que inspiran (oprah)", "f": "pre-lanzamiento"}, {"i": "82", "m": "julio", "w": 1, "d": "2026-07-04", "day": "Jueves", "ds": "4 jul", "t": "post", "ti": "countdown", "f": "pre-lanzamiento"}, {"i": "83", "m": "julio", "w": 1, "d": "2026-07-05", "day": "Viernes", "ds": "5 jul", "t": "reel", "ti": "faq", "f": "pre-lanzamiento"}, {"i": "84", "m": "julio", "w": 2, "d": "2026-07-10", "day": "Miércoles", "ds": "8 jul", "t": "carrusel", "ti": "ebook + asesoría diferencias", "f": "pre-lanzamiento"}, {"i": "85", "m": "julio", "w": 1, "d": "2026-07-02", "day": "Viernes", "ds": "3 jul", "t": "post", "ti": "último día antes", "f": "pre-lanzamiento"}, {"i": "86", "m": "julio", "w": 2, "d": "2026-07-06", "day": "Lunes", "ds": "6 jul", "t": "reel", "ti": "LANZAMIENTO asesoría 90€", "f": "LANZAMIENTO ASESORÍA"}, {"i": "87", "m": "julio", "w": 2, "d": "2026-07-07", "day": "Martes", "ds": "7 jul", "t": "carrusel", "ti": "qué incluye la sesión", "f": "LANZAMIENTO ASESORÍA"}, {"i": "88", "m": "julio", "w": 2, "d": "2026-07-08", "day": "Miércoles", "ds": "8 jul", "t": "reel", "ti": "testimonio primera clienta", "f": "LANZAMIENTO ASESORÍA"}, {"i": "89", "m": "julio", "w": 2, "d": "2026-07-09", "day": "Jueves", "ds": "9 jul", "t": "post", "ti": "para quién es", "f": "LANZAMIENTO ASESORÍA"}, {"i": "90", "m": "julio", "w": 2, "d": "2026-07-10", "day": "Viernes", "ds": "10 jul", "t": "reel", "ti": "faq en video", "f": "LANZAMIENTO ASESORÍA"}, {"i": "91", "m": "julio", "w": 2, "d": "2026-07-11", "day": "Sábado", "ds": "11 jul", "t": "carrusel", "ti": "beneficios", "f": "LANZAMIENTO ASESORÍA"}, {"i": "92", "m": "julio", "w": 2, "d": "2026-07-12", "day": "Domingo", "ds": "12 jul", "t": "post", "ti": "detrás del lanzamiento", "f": "LANZAMIENTO ASESORÍA"}, {"i": "93", "m": "julio", "w": 3, "d": "2026-07-13", "day": "Lunes", "ds": "13 jul", "t": "reel", "ti": "testimonios", "f": "conversión"}, {"i": "94", "m": "julio", "w": 3, "d": "2026-07-14", "day": "Martes", "ds": "14 jul", "t": "carrusel", "ti": "antes/después mental", "f": "conversión"}, {"i": "95", "m": "julio", "w": 3, "d": "2026-07-15", "day": "Miércoles", "ds": "15 jul", "t": "reel", "ti": "mujeres que inspiran (simone biles)", "f": "conversión"}, {"i": "96", "m": "julio", "w": 3, "d": "2026-07-16", "day": "Jueves", "ds": "16 jul", "t": "post", "ti": "faq común", "f": "conversión"}, {"i": "97", "m": "julio", "w": 3, "d": "2026-07-17", "day": "Viernes", "ds": "17 jul", "t": "reel", "ti": "pov laboral", "f": "conversión"}, {"i": "98", "m": "julio", "w": 3, "d": "2026-07-18", "day": "Sábado", "ds": "18 jul", "t": "carrusel", "ti": "ebook + asesoría", "f": "conversión"}, {"i": "99", "m": "julio", "w": 3, "d": "2026-07-19", "day": "Domingo", "ds": "19 jul", "t": "post", "ti": "reflexión", "f": "conversión"}, {"i": "100", "m": "julio", "w": 4, "d": "2026-07-20", "day": "Lunes", "ds": "20 jul", "t": "reel", "ti": "autocuidado profesional (día 24)", "f": "evergreen + autocuidado"}, {"i": "101", "m": "julio", "w": 4, "d": "2026-07-21", "day": "Martes", "ds": "21 jul", "t": "carrusel", "ti": "ejercicio exprés", "f": "evergreen + autocuidado"}, {"i": "102", "m": "julio", "w": 4, "d": "2026-07-22", "day": "Miércoles", "ds": "22 jul", "t": "reel", "ti": "confesión laboral", "f": "evergreen + autocuidado"}, {"i": "103", "m": "julio", "w": 4, "d": "2026-07-23", "day": "Jueves", "ds": "23 jul", "t": "post", "ti": "testimonio", "f": "evergreen + autocuidado"}, {"i": "104", "m": "julio", "w": 4, "d": "2026-07-24", "day": "Viernes", "ds": "24 jul", "t": "reel", "ti": "humor", "f": "evergreen + autocuidado"}, {"i": "105", "m": "julio", "w": 4, "d": "2026-07-25", "day": "Sábado", "ds": "25 jul", "t": "carrusel", "ti": "ambos productos", "f": "evergreen + autocuidado"}, {"i": "106", "m": "julio", "w": 4, "d": "2026-07-26", "day": "Domingo", "ds": "26 jul", "t": "post", "ti": "cierre julio", "f": "evergreen + autocuidado"}, {"i": "107", "m": "agosto", "w": 1, "d": "2026-08-01", "day": "Lunes", "ds": "1 ago", "t": "reel", "ti": "desconectar no es perder el tiempo", "f": "contenido ligero"}, {"i": "108", "m": "agosto", "w": 1, "d": "2026-08-02", "day": "Martes", "ds": "2 ago", "t": "carrusel", "ti": "5 formas de descansar de verdad", "f": "contenido ligero"}, {"i": "109", "m": "agosto", "w": 1, "d": "2026-08-03", "day": "Miércoles", "ds": "3 ago", "t": "reel", "ti": "pov laboral verano", "f": "contenido ligero"}, {"i": "110", "m": "agosto", "w": 1, "d": "2026-08-04", "day": "Jueves", "ds": "4 ago", "t": "post", "ti": "reflexión vacacional", "f": "contenido ligero"}, {"i": "111", "m": "agosto", "w": 1, "d": "2026-08-05", "day": "Viernes", "ds": "5 ago", "t": "reel", "ti": "humor oficina agosto", "f": "contenido ligero"}, {"i": "112", "m": "agosto", "w": 1, "d": "2026-08-06", "day": "Sábado", "ds": "6 ago", "t": "carrusel", "ti": "ebook cta suave", "f": "contenido ligero"}, {"i": "113", "m": "agosto", "w": 1, "d": "2026-08-07", "day": "Domingo", "ds": "7 ago", "t": "post", "ti": "newsletter", "f": "contenido ligero"}, {"i": "114", "m": "agosto", "w": 2, "d": "2026-08-11", "day": "Lunes", "ds": "11 ago", "t": "reel", "ti": "testimonio asesoría 1", "f": "testimonios asesorías"}, {"i": "115", "m": "agosto", "w": 2, "d": "2026-08-12", "day": "Martes", "ds": "12 ago", "t": "carrusel", "ti": "resultados clientas", "f": "testimonios asesorías"}, {"i": "116", "m": "agosto", "w": 2, "d": "2026-08-13", "day": "Miércoles", "ds": "13 ago", "t": "reel", "ti": "mujeres que inspiran (julia child 49 años)", "f": "testimonios asesorías"}, {"i": "117", "m": "agosto", "w": 2, "d": "2026-08-14", "day": "Jueves", "ds": "14 ago", "t": "post", "ti": "antesydespués mental", "f": "testimonios asesorías"}, {"i": "118", "m": "agosto", "w": 2, "d": "2026-08-15", "day": "Viernes", "ds": "15 ago", "t": "reel", "ti": "festivo 15: descanso merecido", "f": "testimonios asesorías"}, {"i": "119", "m": "agosto", "w": 2, "d": "2026-08-16", "day": "Sábado", "ds": "16 ago", "t": "carrusel", "ti": "asesoría disponible", "f": "testimonios asesorías"}, {"i": "120", "m": "agosto", "w": 2, "d": "2026-08-17", "day": "Domingo", "ds": "17 ago", "t": "post", "ti": "detrás del proyecto", "f": "testimonios asesorías"}, {"i": "121", "m": "agosto", "w": 3, "d": "2026-08-18", "day": "Lunes", "ds": "18 ago", "t": "reel", "ti": "lo que he aprendido haciendo asesorías", "f": "optimizar proceso"}, {"i": "122", "m": "agosto", "w": 3, "d": "2026-08-19", "day": "Martes", "ds": "19 ago", "t": "carrusel", "ti": "behind the scenes", "f": "optimizar proceso"}, {"i": "123", "m": "agosto", "w": 3, "d": "2026-08-20", "day": "Miércoles", "ds": "20 ago", "t": "reel", "ti": "confesión laboral", "f": "optimizar proceso"}, {"i": "124", "m": "agosto", "w": 3, "d": "2026-08-21", "day": "Jueves", "ds": "21 ago", "t": "post", "ti": "testimonio", "f": "optimizar proceso"}, {"i": "125", "m": "agosto", "w": 3, "d": "2026-08-22", "day": "Viernes", "ds": "22 ago", "t": "reel", "ti": "pov laboral", "f": "optimizar proceso"}, {"i": "126", "m": "agosto", "w": 3, "d": "2026-08-23", "day": "Sábado", "ds": "23 ago", "t": "carrusel", "ti": "ebook + asesoría", "f": "optimizar proceso"}, {"i": "127", "m": "agosto", "w": 3, "d": "2026-08-24", "day": "Domingo", "ds": "24 ago", "t": "post", "ti": "reflexión", "f": "optimizar proceso"}, {"i": "128", "m": "agosto", "w": 4, "d": "2026-08-25", "day": "Lunes", "ds": "25 ago", "t": "reel", "ti": "volver al trabajo post-vacaciones", "f": "preparar vuelta"}, {"i": "129", "m": "agosto", "w": 4, "d": "2026-08-26", "day": "Martes", "ds": "26 ago", "t": "carrusel", "ti": "cómo aterrizar suave", "f": "preparar vuelta"}, {"i": "130", "m": "agosto", "w": 4, "d": "2026-08-27", "day": "Miércoles", "ds": "27 ago", "t": "reel", "ti": "mujeres que inspiran (arianna huffington)", "f": "preparar vuelta"}, {"i": "131", "m": "agosto", "w": 4, "d": "2026-08-28", "day": "Jueves", "ds": "28 ago", "t": "post", "ti": "preparar septiembre", "f": "preparar vuelta"}, {"i": "132", "m": "agosto", "w": 4, "d": "2026-08-29", "day": "Viernes", "ds": "29 ago", "t": "reel", "ti": "humor vuelta", "f": "preparar vuelta"}, {"i": "133", "m": "agosto", "w": 4, "d": "2026-08-30", "day": "Sábado", "ds": "30 ago", "t": "carrusel", "ti": "ambos productos", "f": "preparar vuelta"}, {"i": "134", "m": "agosto", "w": 4, "d": "2026-08-31", "day": "Domingo", "ds": "31 ago", "t": "post", "ti": "cierre agosto", "f": "preparar vuelta"}, {"i": "135", "m": "septiembre", "w": 1, "d": "2026-09-01", "day": "Lunes", "ds": "1 sep", "t": "reel", "ti": "energía de septiembre", "f": "vuelta al trabajo + vmas"}, {"i": "136", "m": "septiembre", "w": 1, "d": "2026-09-02", "day": "Martes", "ds": "2 sep", "t": "carrusel", "ti": "cómo empezar fuerte el trimestre", "f": "vuelta al trabajo + vmas"}, {"i": "137", "m": "septiembre", "w": 1, "d": "2026-09-03", "day": "Miércoles", "ds": "3 sep", "t": "reel", "ti": "vmas: artistas que se reinventaron", "f": "vuelta al trabajo + vmas"}, {"i": "138", "m": "septiembre", "w": 1, "d": "2026-09-04", "day": "Jueves", "ds": "4 sep", "t": "post", "ti": "nuevos objetivos", "f": "vuelta al trabajo + vmas"}, {"i": "139", "m": "septiembre", "w": 1, "d": "2026-09-05", "day": "Viernes", "ds": "5 sep", "t": "reel", "ti": "pov laboral septiembre", "f": "vuelta al trabajo + vmas"}, {"i": "140", "m": "septiembre", "w": 1, "d": "2026-09-06", "day": "Sábado", "ds": "6 sep", "t": "carrusel", "ti": "ebook + asesoría", "f": "vuelta al trabajo + vmas"}, {"i": "141", "m": "septiembre", "w": 1, "d": "2026-09-07", "day": "Domingo", "ds": "7 sep", "t": "post", "ti": "newsletter", "f": "vuelta al trabajo + vmas"}, {"i": "142", "m": "septiembre", "w": 2, "d": "2026-09-08", "day": "Lunes", "ds": "8 sep", "t": "reel", "ti": "últimas plazas asesoría sept", "f": "push asesorías + emmy"}, {"i": "143", "m": "septiembre", "w": 2, "d": "2026-09-09", "day": "Martes", "ds": "9 sep", "t": "carrusel", "ti": "casos de éxito", "f": "push asesorías + emmy"}, {"i": "144", "m": "septiembre", "w": 2, "d": "2026-09-10", "day": "Miércoles", "ds": "10 sep", "t": "reel", "ti": "salud mental laboral (cerca día 10)", "f": "push asesorías + emmy"}, {"i": "145", "m": "septiembre", "w": 2, "d": "2026-09-11", "day": "Jueves", "ds": "11 sep", "t": "post", "ti": "testimonio", "f": "push asesorías + emmy"}, {"i": "146", "m": "septiembre", "w": 2, "d": "2026-09-12", "day": "Viernes", "ds": "12 sep", "t": "reel", "ti": "emmy: mujeres en tv", "f": "push asesorías + emmy"}, {"i": "147", "m": "septiembre", "w": 2, "d": "2026-09-13", "day": "Sábado", "ds": "13 sep", "t": "carrusel", "ti": "urgencia asesoría", "f": "push asesorías + emmy"}, {"i": "148", "m": "septiembre", "w": 2, "d": "2026-09-14", "day": "Domingo", "ds": "14 sep", "t": "post", "ti": "reflexión", "f": "push asesorías + emmy"}, {"i": "149", "m": "septiembre", "w": 3, "d": "2026-09-15", "day": "Lunes", "ds": "15 sep", "t": "reel", "ti": "'algunas necesitan más tiempo'", "f": "sembrar acompañamiento"}, {"i": "150", "m": "septiembre", "w": 3, "d": "2026-09-16", "day": "Martes", "ds": "16 sep", "t": "carrusel", "ti": "asesoría vs acompañamiento", "f": "sembrar acompañamiento"}, {"i": "151", "m": "septiembre", "w": 3, "d": "2026-09-17", "day": "Miércoles", "ds": "17 sep", "t": "reel", "ti": "mujeres que inspiran (reshma saujani)", "f": "sembrar acompañamiento"}, {"i": "152", "m": "septiembre", "w": 3, "d": "2026-09-18", "day": "Jueves", "ds": "18 sep", "t": "post", "ti": "limitaciones sesión única", "f": "sembrar acompañamiento"}, {"i": "153", "m": "septiembre", "w": 3, "d": "2026-09-19", "day": "Viernes", "ds": "19 sep", "t": "reel", "ti": "pov laboral", "f": "sembrar acompañamiento"}, {"i": "154", "m": "septiembre", "w": 3, "d": "2026-09-20", "day": "Sábado", "ds": "20 sep", "t": "carrusel", "ti": "teaser acompañamiento", "f": "sembrar acompañamiento"}, {"i": "155", "m": "septiembre", "w": 3, "d": "2026-09-21", "day": "Domingo", "ds": "21 sep", "t": "post", "ti": "detrás del proyecto", "f": "sembrar acompañamiento"}, {"i": "156", "m": "septiembre", "w": 4, "d": "2026-09-22", "day": "Lunes", "ds": "22 sep", "t": "reel", "ti": "resultados del trimestre", "f": "cierre q3"}, {"i": "157", "m": "septiembre", "w": 4, "d": "2026-09-23", "day": "Martes", "ds": "23 sep", "t": "carrusel", "ti": "lo más guardado q3", "f": "cierre q3"}, {"i": "158", "m": "septiembre", "w": 4, "d": "2026-09-24", "day": "Miércoles", "ds": "24 sep", "t": "reel", "ti": "storytelling personal", "f": "cierre q3"}, {"i": "159", "m": "septiembre", "w": 4, "d": "2026-09-25", "day": "Jueves", "ds": "25 sep", "t": "post", "ti": "lista espera acompañamiento", "f": "cierre q3"}, {"i": "160", "m": "septiembre", "w": 4, "d": "2026-09-26", "day": "Viernes", "ds": "26 sep", "t": "reel", "ti": "humor", "f": "cierre q3"}, {"i": "161", "m": "septiembre", "w": 4, "d": "2026-09-27", "day": "Sábado", "ds": "27 sep", "t": "carrusel", "ti": "todos los productos", "f": "cierre q3"}, {"i": "162", "m": "septiembre", "w": 4, "d": "2026-09-28", "day": "Domingo", "ds": "28 sep", "t": "post", "ti": "cierre sept", "f": "cierre q3"}, {"i": "163", "m": "octubre", "w": 1, "d": "2026-10-01", "day": "Lunes", "ds": "1 oct", "t": "reel", "ti": "'a veces una sesión no es suficiente'", "f": "sembrar acompañamiento"}, {"i": "164", "m": "octubre", "w": 1, "d": "2026-10-02", "day": "Martes", "ds": "2 oct", "t": "carrusel", "ti": "qué es un acompañamiento", "f": "sembrar acompañamiento"}, {"i": "165", "m": "octubre", "w": 1, "d": "2026-10-03", "day": "Miércoles", "ds": "3 oct", "t": "reel", "ti": "confesión laboral", "f": "sembrar acompañamiento"}, {"i": "166", "m": "octubre", "w": 1, "d": "2026-10-04", "day": "Jueves", "ds": "4 oct", "t": "post", "ti": "para quién es", "f": "sembrar acompañamiento"}, {"i": "167", "m": "octubre", "w": 1, "d": "2026-10-04", "day": "Domingo", "ds": "4 oct", "t": "post", "ti": "newsletter", "f": "sembrar acompañamiento"}, {"i": "168", "m": "octubre", "w": 2, "d": "2026-10-05", "day": "Lunes", "ds": "5 oct", "t": "reel", "ti": "educar sobre proceso largo", "f": "educar + día salud mental"}, {"i": "169", "m": "octubre", "w": 2, "d": "2026-10-06", "day": "Martes", "ds": "6 oct", "t": "carrusel", "ti": "diferencias todos los productos", "f": "educar + día salud mental"}, {"i": "170", "m": "octubre", "w": 2, "d": "2026-10-07", "day": "Miércoles", "ds": "7 oct", "t": "reel", "ti": "mujeres que inspiran (issa rae)", "f": "educar + día salud mental"}, {"i": "171", "m": "octubre", "w": 2, "d": "2026-10-08", "day": "Jueves", "ds": "8 oct", "t": "post", "ti": "testimonio asesoría", "f": "educar + día salud mental"}, {"i": "172", "m": "octubre", "w": 2, "d": "2026-10-09", "day": "Viernes", "ds": "9 oct", "t": "reel", "ti": "día salud mental (10): normalizar", "f": "educar + día salud mental"}, {"i": "173", "m": "octubre", "w": 2, "d": "2026-10-10", "day": "Sábado", "ds": "10 oct", "t": "carrusel", "ti": "acompañamiento teaser", "f": "educar + día salud mental"}, {"i": "174", "m": "octubre", "w": 2, "d": "2026-10-11", "day": "Domingo", "ds": "11 oct", "t": "post", "ti": "reflexión", "f": "educar + día salud mental"}, {"i": "175", "m": "octubre", "w": 3, "d": "2026-10-12", "day": "Lunes", "ds": "12 oct", "t": "reel", "ti": "mujeres españolas que inspiran (rosalía, aitana)", "f": "fiesta nacional + calentar"}, {"i": "176", "m": "octubre", "w": 3, "d": "2026-10-13", "day": "Martes", "ds": "13 oct", "t": "carrusel", "ti": "testimonios", "f": "fiesta nacional + calentar"}, {"i": "177", "m": "octubre", "w": 3, "d": "2026-10-14", "day": "Miércoles", "ds": "14 oct", "t": "reel", "ti": "storytelling", "f": "fiesta nacional + calentar"}, {"i": "178", "m": "octubre", "w": 3, "d": "2026-10-15", "day": "Jueves", "ds": "15 oct", "t": "post", "ti": "lista espera acompañamiento", "f": "fiesta nacional + calentar"}, {"i": "179", "m": "octubre", "w": 3, "d": "2026-10-16", "day": "Viernes", "ds": "16 oct", "t": "reel", "ti": "pov laboral", "f": "fiesta nacional + calentar"}, {"i": "180", "m": "octubre", "w": 3, "d": "2026-10-17", "day": "Sábado", "ds": "17 oct", "t": "carrusel", "ti": "visión del servicio", "f": "fiesta nacional + calentar"}, {"i": "181", "m": "octubre", "w": 3, "d": "2026-10-18", "day": "Domingo", "ds": "18 oct", "t": "post", "ti": "detrás del proyecto", "f": "fiesta nacional + calentar"}, {"i": "182", "m": "octubre", "w": 4, "d": "2026-10-20", "day": "Lunes", "ds": "20 oct", "t": "reel", "ti": "LANZAMIENTO 3-5 plazas", "f": "LANZAMIENTO ACOMPAÑAMIENTO"}, {"i": "183", "m": "octubre", "w": 4, "d": "2026-10-21", "day": "Martes", "ds": "21 oct", "t": "carrusel", "ti": "qué incluye 2 meses", "f": "LANZAMIENTO ACOMPAÑAMIENTO"}, {"i": "184", "m": "octubre", "w": 4, "d": "2026-10-22", "day": "Miércoles", "ds": "22 oct", "t": "reel", "ti": "para quién es", "f": "LANZAMIENTO ACOMPAÑAMIENTO"}, {"i": "185", "m": "octubre", "w": 4, "d": "2026-10-23", "day": "Jueves", "ds": "23 oct", "t": "post", "ti": "faq", "f": "LANZAMIENTO ACOMPAÑAMIENTO"}, {"i": "186", "m": "octubre", "w": 4, "d": "2026-10-24", "day": "Viernes", "ds": "24 oct", "t": "reel", "ti": "testimonio", "f": "LANZAMIENTO ACOMPAÑAMIENTO"}, {"i": "187", "m": "octubre", "w": 4, "d": "2026-10-25", "day": "Sábado", "ds": "25 oct", "t": "carrusel", "ti": "beneficio vs precio", "f": "LANZAMIENTO ACOMPAÑAMIENTO"}, {"i": "188", "m": "octubre", "w": 4, "d": "2026-10-26", "day": "Domingo", "ds": "26 oct", "t": "post", "ti": "cierre oct + halloween miedos laborales", "f": "LANZAMIENTO ACOMPAÑAMIENTO"}, {"i": "189", "m": "noviembre", "w": 1, "d": "2026-11-01", "day": "Lunes", "ds": "1 nov", "t": "reel", "ti": "descanso puente (1-2 nov)", "f": "puente + consolidación"}, {"i": "190", "m": "noviembre", "w": 1, "d": "2026-11-02", "day": "Martes", "ds": "2 nov", "t": "carrusel", "ti": "reflexión de año", "f": "puente + consolidación"}, {"i": "191", "m": "noviembre", "w": 1, "d": "2026-11-03", "day": "Miércoles", "ds": "3 nov", "t": "reel", "ti": "mujeres que inspiran latinas (karol g, shakira)", "f": "puente + consolidación"}, {"i": "192", "m": "noviembre", "w": 1, "d": "2026-11-04", "day": "Jueves", "ds": "4 nov", "t": "post", "ti": "testimonio acompañamiento", "f": "puente + consolidación"}, {"i": "193", "m": "noviembre", "w": 1, "d": "2026-11-05", "day": "Viernes", "ds": "5 nov", "t": "reel", "ti": "pov laboral", "f": "puente + consolidación"}, {"i": "194", "m": "noviembre", "w": 1, "d": "2026-11-06", "day": "Sábado", "ds": "6 nov", "t": "carrusel", "ti": "todos los productos", "f": "puente + consolidación"}, {"i": "195", "m": "noviembre", "w": 1, "d": "2026-11-07", "day": "Domingo", "ds": "7 nov", "t": "post", "ti": "newsletter", "f": "puente + consolidación"}, {"i": "196", "m": "noviembre", "w": 2, "d": "2026-11-09", "day": "Lunes", "ds": "9 nov", "t": "reel", "ti": "latin grammy: artistas que se reinventaron", "f": "latin grammy"}, {"i": "197", "m": "noviembre", "w": 2, "d": "2026-11-10", "day": "Martes", "ds": "10 nov", "t": "carrusel", "ti": "mujeres latinas que inspiran", "f": "latin grammy"}, {"i": "198", "m": "noviembre", "w": 2, "d": "2026-11-11", "day": "Miércoles", "ds": "11 nov", "t": "reel", "ti": "confesión laboral", "f": "latin grammy"}, {"i": "199", "m": "noviembre", "w": 2, "d": "2026-11-12", "day": "Jueves", "ds": "12 nov", "t": "post", "ti": "testimonio", "f": "latin grammy"}, {"i": "200", "m": "noviembre", "w": 2, "d": "2026-11-13", "day": "Viernes", "ds": "13 nov", "t": "reel", "ti": "humor", "f": "latin grammy"}, {"i": "201", "m": "noviembre", "w": 2, "d": "2026-11-14", "day": "Sábado", "ds": "14 nov", "t": "carrusel", "ti": "ebook", "f": "latin grammy"}, {"i": "202", "m": "noviembre", "w": 2, "d": "2026-11-15", "day": "Domingo", "ds": "15 nov", "t": "post", "ti": "reflexión", "f": "latin grammy"}, {"i": "203", "m": "noviembre", "w": 3, "d": "2026-11-16", "day": "Lunes", "ds": "16 nov", "t": "reel", "ti": "teaser ofertas", "f": "preparar black friday"}, {"i": "204", "m": "noviembre", "w": 3, "d": "2026-11-17", "day": "Martes", "ds": "17 nov", "t": "carrusel", "ti": "qué producto elegir según tu momento", "f": "preparar black friday"}, {"i": "205", "m": "noviembre", "w": 3, "d": "2026-11-18", "day": "Miércoles", "ds": "18 nov", "t": "reel", "ti": "mujeres que inspiran (sara blakely)", "f": "preparar black friday"}, {"i": "206", "m": "noviembre", "w": 3, "d": "2026-11-19", "day": "Jueves", "ds": "19 nov", "t": "post", "ti": "preparar oferta", "f": "preparar black friday"}, {"i": "207", "m": "noviembre", "w": 3, "d": "2026-11-20", "day": "Viernes", "ds": "20 nov", "t": "reel", "ti": "pov laboral", "f": "preparar black friday"}, {"i": "208", "m": "noviembre", "w": 3, "d": "2026-11-21", "day": "Sábado", "ds": "21 nov", "t": "carrusel", "ti": "comparar productos", "f": "preparar black friday"}, {"i": "209", "m": "noviembre", "w": 3, "d": "2026-11-22", "day": "Domingo", "ds": "22 nov", "t": "post", "ti": "detrás del proyecto", "f": "preparar black friday"}, {"i": "210", "m": "noviembre", "w": 4, "d": "2026-11-24", "day": "Lunes", "ds": "24 nov", "t": "reel", "ti": "límites laborales (25N: acoso)", "f": "black friday + 25N"}, {"i": "211", "m": "noviembre", "w": 4, "d": "2026-11-25", "day": "Martes", "ds": "25 nov", "t": "carrusel", "ti": "BLACK FRIDAY ofertas", "f": "black friday + 25N"}, {"i": "212", "m": "noviembre", "w": 4, "d": "2026-11-26", "day": "Miércoles", "ds": "26 nov", "t": "reel", "ti": "oferta activa", "f": "black friday + 25N"}, {"i": "213", "m": "noviembre", "w": 4, "d": "2026-11-27", "day": "Jueves", "ds": "27 nov", "t": "post", "ti": "últimas horas oferta", "f": "black friday + 25N"}, {"i": "214", "m": "noviembre", "w": 4, "d": "2026-11-28", "day": "Viernes", "ds": "28 nov", "t": "reel", "ti": "cierre ofertas", "f": "black friday + 25N"}, {"i": "215", "m": "noviembre", "w": 4, "d": "2026-11-29", "day": "Sábado", "ds": "29 nov", "t": "carrusel", "ti": "resumen mes", "f": "black friday + 25N"}, {"i": "216", "m": "noviembre", "w": 4, "d": "2026-11-30", "day": "Domingo", "ds": "30 nov", "t": "post", "ti": "cierre nov", "f": "black friday + 25N"}, {"i": "217", "m": "diciembre", "w": 1, "d": "2026-12-01", "day": "Lunes", "ds": "1 dic", "t": "reel", "ti": "diciembre: mes de cierre", "f": "inicio diciembre + puente"}, {"i": "218", "m": "diciembre", "w": 1, "d": "2026-12-02", "day": "Martes", "ds": "2 dic", "t": "carrusel", "ti": "reflexiones del año", "f": "inicio diciembre + puente"}, {"i": "219", "m": "diciembre", "w": 1, "d": "2026-12-03", "day": "Miércoles", "ds": "3 dic", "t": "reel", "ti": "mujeres que inspiran (balance anual)", "f": "inicio diciembre + puente"}, {"i": "220", "m": "diciembre", "w": 1, "d": "2026-12-04", "day": "Jueves", "ds": "4 dic", "t": "post", "ti": "logros del año", "f": "inicio diciembre + puente"}, {"i": "221", "m": "diciembre", "w": 1, "d": "2026-12-05", "day": "Viernes", "ds": "5 dic", "t": "reel", "ti": "descanso puente", "f": "inicio diciembre + puente"}, {"i": "222", "m": "diciembre", "w": 2, "d": "2026-12-07", "day": "Lunes", "ds": "7 dic", "t": "reel", "ti": "12 meses de dramas laborales", "f": "puente largo + reflexión"}, {"i": "223", "m": "diciembre", "w": 2, "d": "2026-12-08", "day": "Martes", "ds": "8 dic", "t": "carrusel", "ti": "lo más guardado del año", "f": "puente largo + reflexión"}, {"i": "224", "m": "diciembre", "w": 2, "d": "2026-12-09", "day": "Miércoles", "ds": "9 dic", "t": "reel", "ti": "storytelling: cómo empezó todo", "f": "puente largo + reflexión"}, {"i": "225", "m": "diciembre", "w": 2, "d": "2026-12-10", "day": "Jueves", "ds": "10 dic", "t": "post", "ti": "testimonios favoritos", "f": "puente largo + reflexión"}, {"i": "226", "m": "diciembre", "w": 2, "d": "2026-12-11", "day": "Viernes", "ds": "11 dic", "t": "reel", "ti": "humor navideño laboral", "f": "puente largo + reflexión"}, {"i": "227", "m": "diciembre", "w": 2, "d": "2026-12-12", "day": "Sábado", "ds": "12 dic", "t": "carrusel", "ti": "gracias comunidad", "f": "puente largo + reflexión"}, {"i": "228", "m": "diciembre", "w": 2, "d": "2026-12-13", "day": "Domingo", "ds": "13 dic", "t": "post", "ti": "newsletter", "f": "puente largo + reflexión"}, {"i": "229", "m": "diciembre", "w": 3, "d": "2026-12-14", "day": "Lunes", "ds": "14 dic", "t": "reel", "ti": "ofertas navidad", "f": "cierre año + ofertas navidad"}, {"i": "230", "m": "diciembre", "w": 3, "d": "2026-12-15", "day": "Martes", "ds": "15 dic", "t": "carrusel", "ti": "regala orientación laboral", "f": "cierre año + ofertas navidad"}, {"i": "231", "m": "diciembre", "w": 3, "d": "2026-12-16", "day": "Miércoles", "ds": "16 dic", "t": "reel", "ti": "mujeres que inspiran (resumen)", "f": "cierre año + ofertas navidad"}, {"i": "232", "m": "diciembre", "w": 3, "d": "2026-12-17", "day": "Jueves", "ds": "17 dic", "t": "post", "ti": "últimas plazas 2026", "f": "cierre año + ofertas navidad"}, {"i": "233", "m": "diciembre", "w": 3, "d": "2026-12-18", "day": "Viernes", "ds": "18 dic", "t": "reel", "ti": "pov laboral navidad", "f": "cierre año + ofertas navidad"}, {"i": "234", "m": "diciembre", "w": 3, "d": "2026-12-19", "day": "Sábado", "ds": "19 dic", "t": "carrusel", "ti": "todos los productos", "f": "cierre año + ofertas navidad"}, {"i": "235", "m": "diciembre", "w": 3, "d": "2026-12-20", "day": "Domingo", "ds": "20 dic", "t": "post", "ti": "reflexión", "f": "cierre año + ofertas navidad"}, {"i": "236", "m": "diciembre", "w": 4, "d": "2026-12-22", "day": "Lunes", "ds": "22 dic", "t": "reel", "ti": "descanso navideño", "f": "navidad + año nuevo"}, {"i": "237", "m": "diciembre", "w": 4, "d": "2026-12-24", "day": "Miércoles", "ds": "24 dic", "t": "post", "ti": "feliz navidad + gratitud", "f": "navidad + año nuevo"}, {"i": "238", "m": "diciembre", "w": 4, "d": "2026-12-28", "day": "Domingo", "ds": "28 dic", "t": "reel", "ti": "balance 2026 + propósitos 2027", "f": "navidad + año nuevo"}, {"i": "239", "d": "2026-05-01", "m": "mayo", "w": 1, "ds": "1 may", "day": "vie", "tm": "10:00", "t": "Carrusel", "ti": "7 cosas que NO te enseñaron en la universidad sobre el trabajo", "gh": "el #4 lo descubres llorando en el baño", "cp": "hoy es 1 de mayo · día del trabajo ✦\n\ny mientras todo el mundo habla de derechos laborales (que sí, súper importantes), yo quería hablar de algo que nadie te avisa:\n\nlo que NADIE te dice antes de empezar.\n\nguarda este post para cuando lo necesites · y compártelo con esa amiga que está empezando ♡\n\n#diadeltrabajo #primertrabajo #orientacionlaboral #carreraprofesional #burnout #dramaslaborales #mujeresprofesionales #saludlaboral #saludmentaltrabajo #tuproximocapitulo #empoderamientofemenino #carrera #trabajo #consejoslaborales #orientacionprofesional", "de": "SLIDE 1 (portada):\n\"7 cosas que NO te enseñaron \nen la universidad sobre el trabajo\"\n↓ desliza\n\nSLIDE 2 (número 01):\n\"tu sueldo NO se sube esperando\"\nse sube pidiéndolo · con datos del mercado · y con la cara muy seria\n\nSLIDE 3 (número 02):\n\"el síndrome del impostor es un timing, no una verdad\"\nte llega cuando creces · NO cuando fracasas · es señal de que estás en sitio nuevo\n\nSLIDE 4 (número 03):\n\"los descansos NO son opcionales\"\ntu cerebro NO es una máquina · necesita 5 min cada hora real · sin pantalla · sin scroll\n\nSLIDE 5 (número 04):\n\"vas a llorar en el baño y NO pasa nada\"\nle pasa al 87% de las mujeres profesionales antes de los 30 · es información, NO debilidad\n\nSLIDE 6 (número 05):\n\"decir NO también es una habilidad profesional\"\nse aprende · se practica · se nota en el sueldo a largo plazo\n\nSLIDE 7 (número 06):\n\"el networking NO es vender\"\nes contar lo que haces · sin pedir nada · y dejar que la gente te recuerde\n\nSLIDE 8 (número 07):\n\"tu primer trabajo NO te define\"\nes solo el primero · vas a tener 5 más · respira\n\nSLIDE FINAL (CTA):\n♡ guárdalo si te ha resonado\n@dramaslaborales · más así en mi feed", "st": "STORY 1 · 09:00 · contexto del día\n🎨 fondo serif crema + texto centrado\n💬 \"1 de mayo · día del trabajo. y de las dramas laborales también ✦\"\n🏷 sticker corazón\n⏱ 90 seg\n\nSTORY 2 · 10:30 · primer slide del carrusel\n🎨 captura del carrusel (slide 1)\n💬 sticker \"🔖 guárdalo, te va a hacer falta\"\n🏷 sticker \"ver post\"\n⏱ 1 min\n\nSTORY 3 · 12:00 · referente cultural\n🎨 foto aesthetic de Concha Velasco con frase \"60 años en escenarios\"\n💬 caption: \"concha velasco trabajó hasta los 80 · qué tipo de trabajadora quieres ser tú a los 60?\"\n🏷 emoji ✨\n⏱ 2 min\n\nSTORY 4 · 14:00 · encuesta divertida\n🎨 fondo crema + texto centrado\n💬 \"¿cuál de las 7 cosas te resonó más?\"\n🏷 sticker encuesta IG · 4 opciones (lo del bizum / lo de los mails / lo de no es personal / lo del burnout)\n⏱ 1 min\n\nSTORY 5 · 18:00 · refrán + reel\n🎨 captura del reel del jueves anterior + frase\n💬 \"el trabajo no debería costarte la vida\"\n🏷 sticker \"ver reel\"\n⏱ 90 seg\n\nSTORY 6 · 20:30 · CTA suave al ebook\n🎨 captura del libro + frase\n💬 \"todo esto y más en 'tu próximo capítulo' · link en bio ♡\"\n🏷 link a bio\n⏱ 90 seg"}, {"i": "240", "d": "2026-05-02", "m": "mayo", "w": 1, "ds": "2 may", "day": "sáb", "tm": "11:00", "t": "Reel", "ti": "frase del sábado · sobre el primer trabajo", "gh": "la frase que necesitabas leer hoy ✦", "cp": "tu primer trabajo NO te define ♡\n\nes solo el PRIMERO.\n\nllevo años escuchando a mujeres atrapadas en su primer empleo pensando que ese trabajo dice algo de ellas para siempre.\n\nNO lo dice.\n\nvas a tener cinco más · diez más · y cada uno te enseñará algo · pero NINGUNO te define.\n\nrespira.\n\nguarda este reel para cuando lo necesites · y mándalo a esa amiga que está en su primer trabajo y necesita escucharlo ✦\n\n#primertrabajo #orientacionlaboral #carrera #cambiodecarrera #dramaslaborales #mujeresprofesionales #empoderamientofemenino #saludmentaltrabajo #autoestima #motivacionlaboral #empleo #burnout", "de": "REEL · 7-10 segundos · frase estática (NO necesitas grabar nada · NO talking head · solo texto sobre fondo)\n\nESTRUCTURA · UN SOLO PLANO\n\nfondo: crema con textura sutil (puedes usar el fondo de tu marca habitual)\n\ntexto principal (centrado · serif italic grande · color marrón cálido):\n\n\"tu primer trabajo\nNO te define.\n\nes solo el primero.\n\nvas a tener cinco más.\nrespira.\"\n\n(deja espacio entre líneas para que respire)\n\nabajo del todo · pequeño · sans:\n@dramaslaborales\n\nAUDIO sugerido: \nopción A · sin audio · solo silencio\nopción B · audio aesthetic trending (busca \"sad girl piano\" o \"emotional aesthetic\" en la pestaña audio de Instagram)\n\nDURACIÓN: 7-10 segundos (lo mínimo que IG permite para que cuente como reel)\n\nMOVIMIENTO opcional (si quieres darle vida sin complicarte):\n· puedes hacer un fade-in suave del texto en CapCut/Canva\n· o que aparezca línea por línea con 1 segundo de diferencia\n\nNOTA SIMPLE:\n· puedes hacerlo todo en Canva (export como video MP4 vertical 1080x1920)\n· o subes una imagen estática a Instagram como reel · Instagram permite reels de imágenes fijas con audio\n· tiempo total de creación: 5-8 minutos máximo", "st": "STORY 1 · 12:00 · empieza el día\n🎨 captura primer slide del carrusel\n💬 \"domingo orden · te lo cuento ♡\"\n🏷 sticker \"ver post\"\n⏱ 1 min\n\nSTORY 2 · 14:00 · screenshot ebook\n🎨 mockup del ebook (con sus capítulos)\n💬 \"estos son los 6 capítulos del ebook · simples y aplicables\"\n🏷 link bio\n⏱ 90 seg\n\nSTORY 3 · 17:00 · referente\n🎨 foto aesthetic de Phoebe Waller-Bridge con su libreta\n💬 \"phoebe waller-bridge anota TODO en libretas físicas. hay algo ahí ✦\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 19:00 · pregunta\n🎨 fondo crema\n💬 \"¿dónde anotas tus cosas? móvil / cuaderno / cabeza / nada de eso\"\n🏷 sticker encuesta 4 opciones\n⏱ 1 min\n\nSTORY 5 · 21:00 · reflexión\n🎨 fondo rosa salmón\n💬 \"el orden no es estética · es paz mental ♡\"\n🏷 sticker corazón\n⏱ 90 seg"}, {"i": "241", "d": "2026-05-03", "m": "mayo", "w": 1, "ds": "3 may", "day": "dom", "tm": "11:00", "t": "Carrusel", "ti": "3 verdades incómodas que nadie te dice sobre el trabajo", "gh": "todas pasamos por las cuatro · ¿en cuál estás hoy?", "cp": "la silla giratoria de tu carrera ✦\n\nllevo años observando esto: todas las mujeres que conozco están en UNA de estas 4 posiciones laborales.\n\n· LA INSTALADA · llevas años en el mismo sitio y empiezas a notar que ya no creces\n· LA QUE GIRA · llevas meses dándole vueltas a cambiar pero te bloqueas\n· LA QUE SALTÓ · acabas de cambiar y estás entre \"luna de miel\" y \"qué he hecho\"\n· LA QUE CONSTRUYE · estás creando algo paralelo (proyecto · side hustle · salida lenta)\n\nninguna es mejor que otra. ninguna es permanente.\npero saber dónde estás cambia TODO.\n\nla silla gira · y todas pasamos por las cuatro antes o después.\nlo importante es saber en cuál estás HOY ♡\n\n¿en qué posición estás tú? cuéntame ↓\n\n#orientacionlaboral #cambiodecarrera #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #autoconocimiento #emprendimientofemenino #saludmentaltrabajo", "de": "SLIDE 1 (portada):\n\"la silla giratoria de tu carrera\"\n¿en cuál de las 4 posiciones estás? ✦\n\nSLIDE 2:\nllevo años observando esto:\ntodas las mujeres que conozco están en UNA de estas 4 posiciones laborales\n\nninguna es mejor que otra\nninguna es permanente\npero saber dónde estás cambia TODO\n\nSLIDE 3 (posición 1):\n\"LA INSTALADA\"\nllevas años en el mismo sitio · funciona · estás cómoda\npero algo te dice que ya no creces\n\npregunta: ¿es comodidad o es miedo?\n\nSLIDE 4 (posición 2):\n\"LA QUE GIRA\"\nllevas meses dándole vueltas\npiensas en cambiar · buscas ofertas · actualizas el CV · lo dejas a medias\n\npregunta: ¿qué te falta para decidir?\n\nSLIDE 5 (posición 3):\n\"LA QUE SALTÓ\"\nacabas de cambiar\nestás en \"luna de miel\" · o en \"qué he hecho\" · o en las dos cosas a la vez\n\npregunta: ¿qué necesitas para sostenerlo?\n\nSLIDE 6 (posición 4):\n\"LA QUE CONSTRUYE\"\nestás creando algo paralelo · un proyecto · un side hustle · una salida lenta\n\npregunta: ¿lo trabajas porque quieres o porque tienes que?\n\nSLIDE 7 (frase grande serif italic):\n\"la silla gira · y todas pasamos\npor las cuatro antes o después.\nlo importante es saber\nen cuál estás HOY\"\n\nSLIDE 8 (CTA):\n¿en qué posición estás?\ncuéntame en comentarios ↓ ♡", "st": "STORY 1 · 19:00 · post + pregunta\n🎨 captura del post\n💬 \"abro caja de preguntas · cuéntame ↓\"\n🏷 caja de pregunta IG · \"qué te bloquea?\"\n⏱ 1 min\n\nSTORY 2 · 19:30 · ánimo\n🎨 fondo serif crema\n💬 \"no estás exagerando ♡\"\n🏷 sticker corazón\n⏱ 90 seg\n\nSTORY 3 · 21:00 · primera respuesta a DM (anónima)\n🎨 captura screenshot de DM con nombre tachado\n💬 \"responde Irene: ...\"\n🏷 mostrar interacción\n⏱ 2 min\n\nSTORY 4 · 21:30 · cierre\n🎨 fondo rosa\n💬 \"mañana lunes · empezamos otra semana ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "242", "d": "2026-05-04", "m": "mayo", "w": 2, "ds": "4 may", "day": "lun", "tm": "08:00", "t": "Carrusel", "ti": "cómo organizar tu LinkedIn en 30 minutos (y atraer ofertas reales)", "gh": "cambia esto y prepárate para los DM", "cp": "cambia esto en tu LinkedIn y prepárate para los DM 📩\n\nllevo un año optimizando mi linkedin con esta estructura · y ha sido la diferencia entre ofertas spam y entrevistas reales.\n\nlos 6 pasos del carrusel los puedes hacer HOY en 30 minutos · sin pagar nada · sin curso.\n\ndime en comentarios cuál vas a aplicar primero ↓ ♡\n\n#linkedin #linkedintips #busquedaempleo #orientacionlaboral #carrera #trabajo #empleo #dramaslaborales #mujeresprofesionales #consejoslaborales #cambiodecarrera #empoderamientofemenino", "de": "SLIDE 1 (portada):\n\"cómo organizar tu LinkedIn \nen 30 minutos\"\ny atraer ofertas reales (no spam)\n\nSLIDE 2 (número 01):\n\"el titular\"\ndi QUÉ haces y PARA QUIÉN\nnota: nada de \"buscando oportunidades\"\n\nSLIDE 3 (número 02):\n\"la foto\"\nprofesional pero NO sosa · la luz natural manda\n\nSLIDE 4 (número 03):\n\"el 'acerca de'\"\nuna historia · 3 párrafos máximo · termina con qué buscas\n\nSLIDE 5 (número 04):\n\"'open to work' SOLO en interno\"\nel botón verde · NO el banner público (mata tu reputación)\n\nSLIDE 6 (número 05):\n\"completa TODAS las habilidades\"\nmarca máximo 5 como destacadas\n\nSLIDE 7 (número 06):\n\"PIDE recomendaciones\"\nno esperes a que lleguen · pídelas tú\n\nSLIDE 8 (CTA):\n✦ guárdalo\ny dime cuál vas a aplicar primero ♡", "st": "STORY 1 · 09:00 · ánimo lunes\n🎨 fondo crema serif italic\n💬 \"lunes · semana nueva · oportunidad nueva ♡\"\n🏷 sticker corazón\n⏱ 90 seg\n\nSTORY 2 · 12:00 · post nuevo\n🎨 captura primer slide\n💬 \"🆕 nuevo carrusel\"\n🏷 sticker \"ver post\"\n⏱ 1 min\n\nSTORY 3 · 14:00 · meme\n🎨 captura Phoebe (Friends) con cara de \"are you serious?\"\n💬 caption: \"tu yo viendo que tu LinkedIn sigue con la foto del DNI\"\n🏷 emoji 😅\n⏱ 2 min\n\nSTORY 4 · 17:00 · referente\n🎨 foto Letizia Ortiz (entonces periodista)\n💬 \"letizia ortiz cambió de carrera entera a los 32 · lo del LinkedIn lo solucionas en 30 min\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 5 · 19:00 · encuesta\n🎨 fondo rosa\n💬 \"¿tu LinkedIn está al día?\"\n🏷 encuesta sí/no/ni idea/no tengo\n⏱ 1 min\n\nSTORY 6 · 21:00 · CTA ebook\n🎨 captura ebook + plantilla LinkedIn\n💬 \"en el ebook tienes la plantilla de titular ✦ link en bio\"\n🏷 link\n⏱ 90 seg"}, {"i": "243", "d": "2026-05-05", "m": "mayo", "w": 2, "ds": "5 may", "day": "mar", "tm": "19:00", "t": "Carrusel", "ti": "Lola Indigo · cómo la primera expulsada de OT 2017 se convirtió en la artista que llena el WiZink", "gh": "expulsada en la primera gala · 8 años después · 5 platinos ✦", "cp": "la primera expulsada de OT 2017 hoy llena el WiZink ✦\n\nLola Indigo es una de las cantantes más grandes de España ahora mismo.\n\npero hace 8 años:\n· nominada en la primera semana de OT\n· expulsada en la primera gala\n· y antes (2010) ya la habían expulsado de Fama ¡A bailar!\n\ndos academias musicales · dos expulsiones públicas en TV nacional.\n\npodría haberse hundido. no lo hizo.\n\ntrabajó como coreógrafa y bailarina para otros artistas durante meses. sin foco. sin centro. preparando lo que vendría.\n\nen julio 2018 sacó \"Ya no quiero ná\".\n9 millones de reproducciones en Spotify España.\ny el resto es historia.\n\na veces el \"no\" más doloroso es el que te obliga a construir TU cosa.\n\nNO porque \"todo pase por algo\".\n\nsino porque cuando te cierran una puerta institucional · te quedan dos opciones:\n· seguir tocando puertas\n· construir una entrada propia\n\nella eligió lo segundo.\n\n¿qué \"no\" reciente te dolió tanto que ahora podría ser información de hacia dónde mirar? ↓\n\n#lolaindigo #ot2017 #carrera #fracasoexito #motivacion #orientacionlaboral #mujeresinspiradoras #dramaslaborales #empoderamientofemenino #cambiodecarrera #superacionpersonal", "de": "SLIDE 1 (portada):\n\"Lola Indigo\"\ncómo la primera expulsada de OT 2017\nse convirtió en la artista que llena el WiZink ✦\n\nSLIDE 2 (la historia que casi nadie cuenta):\n2010 · entró en \"Fama ¡A bailar!\"\nexpulsada por su profe Rafa Méndez en clase\n\"eres un estorbo para mi vista\" le dijeron en TV nacional\n(tenía 17 años)\n\nSLIDE 3:\n2017 · entró en Operación Triunfo\nprimera nominada · primera expulsada\nuna semana exactamente\n\n(dos veces expulsada de academias en 7 años)\n\nSLIDE 4:\npodía haberlo dejado.\nNO lo dejó.\n\ntrabajó como bailarina y coreógrafa para otros artistas durante meses.\nsin foco. sin centro. trabajando para que otros brillaran.\n\nSLIDE 5 (julio 2018):\nestrenó \"Ya no quiero ná\"\n9 millones de reproducciones en Spotify España\ntop 50 viral mundial\nel videoclip · 70 millones de visualizaciones\n\n(la canción que escribió porque NADIE la había contratado para cantar.)\n\nSLIDE 6:\n2019 · disco \"Akelarre\"\n2025 · llena el WiZink Center\n5 discos de platino\nMojaita · uno de los hits del verano 2025\n\n(la primera expulsada de OT.)\n(la chica del \"estorbo para mi vista\".)\n\nSLIDE 7 (frase grande serif italic):\n\"si me hubieran cogido en OT\nquizás no sería quien soy hoy\"\n— Lola Indigo en entrevista posterior\n\n(no porque no entrar fuera \"mejor\" en general.)\n(sino porque la obligó a construir desde cero.)\n\nSLIDE 8 (CTA):\n¿qué \"no\" reciente te dolió tanto\nque ahora · con perspectiva ·\npodría ser una redirección?\ncuéntame en comentarios ↓ ♡", "st": "STORY 1 · 09:00 · contexto martes\n🎨 fondo serif crema italic\n💬 \"martes · día de mujeres que inspiran ✦\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 2 · 12:00 · primer slide post\n🎨 captura primer slide\n💬 \"lola índigo · el plot twist ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 14:00 · clip canción\n🎨 frame video lola índigo (su clip o un fragmento aesthetic) + audio\n💬 \"ya no quiero ná · banda sonora del día\"\n🏷 sticker música\n⏱ 2 min\n\nSTORY 4 · 17:00 · cita reflexiva\n🎨 fondo crema + serif italic grande\n💬 \"creo que no entrar en OT fue lo mejor que me pudo pasar — Lola Índigo\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 5 · 19:00 · pregunta\n🎨 fondo rosa salmón\n💬 \"¿tu mayor 'no' fue tu mayor plot twist?\"\n🏷 caja pregunta IG\n⏱ 1 min\n\nSTORY 6 · 21:00 · cierre día\n🎨 fondo crema\n💬 \"que tus 'noes' te lleven a tus 'síes' grandes ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "244", "d": "2026-05-06", "m": "mayo", "w": 2, "ds": "6 may", "day": "mié", "tm": "20:00", "t": "Reel", "ti": "yo vs el correo de mi jefe a las 21:00", "gh": "todos sabemos que NO es una cosita rápida", "cp": "son las 21:14 y suena tu mail · ya sabes lo que viene 🥲\n\nel email del jefe el domingo NO es una urgencia · es un problema de gestión · y no es tu obligación arreglarlo.\n\nsi trabajas en horario lectivo, el resto del tiempo es TUYO. y tu mood también.\n\nmándaselo a esa persona que necesita verlo ♡\n\n#humorlaboral #drama #trabajofueradehoras #saludlaboral #burnout #orientacionlaboral #mujeresprofesionales #dramaslaborales #saludmentaltrabajo #conciliacion #vidalaboral", "de": "REEL · 15-20 segundos · formato split-screen o texto sobre fondo neutro\n\nSEG 0-3\ntexto: \"domingo · 21:14\"\nvisual: cara relajada en sofá\n\nSEG 3-6\ntexto: *suena notificación de email*\nvisual: pantalla móvil iluminándose\n\nSEG 6-10\ntexto: \"asunto: 'una cosita rapida' (sic)\"\nvisual: cara cambiando · ojos cerrándose\n\nSEG 10-13\ntexto: (sin texto)\nvisual: plano de cara desolada · cabeza atrás\n\nSEG 13-17\ntexto: \"todos sabemos que NO es una cosita rápida\"\nvisual: misma cara · suspirando\n\nSEG 17-20 (cierre)\ntexto: \"♡ trabajamos en horario · NO en mood\"\nvisual: fondo crema · texto serif italic", "st": "STORY 1 · 12:00 · adelanto reel\n🎨 frame freeze del reel\n💬 \"esta noche · reel del miércoles ♡\"\n🏷 countdown\n⏱ 1 min\n\nSTORY 2 · 19:00 · reel publicado\n🎨 captura reel\n💬 \"subido 🔥\"\n🏷 ver reel\n⏱ 1 min\n\nSTORY 3 · 20:00 · meme\n🎨 captura Aubrey Plaza cara seria\n💬 \"yo viendo el mail de mi jefe a las 21:14\"\n🏷 emoji 😐\n⏱ 90 seg\n\nSTORY 4 · 21:00 · pregunta\n🎨 fondo rosa\n💬 \"última hora a la que has recibido un mail de curro\"\n🏷 caja respuesta abierta\n⏱ 1 min"}, {"i": "245", "d": "2026-05-07", "m": "mayo", "w": 2, "ds": "7 may", "day": "jue", "tm": "19:00", "t": "Reel", "ti": "a veces no es el trabajo · es la cultura", "gh": "y si es la cultura · NO eres tú", "cp": "a veces NO es el trabajo · es la cultura ✦\n\nllevo meses dándole vueltas a esto: hay personas brillantes que se queman en empresas tóxicas · y se culpan a sí mismas.\n\nla cultura de empresa es:\n· lo que se permite (y lo que no)\n· cómo se habla a la gente\n· qué se celebra y qué se castiga\n· qué se considera \"normal\"\n\nsi tu cuerpo te está diciendo \"basta\" · NO eres débil · estás reaccionando a algo real ♡\n\ncuéntame · ¿alguna vez confundiste cultura tóxica con \"yo no sirvo para esto\"? ↓\n\n#culturalaboral #empresa #trabajotoxico #saludmentaltrabajo #burnout #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #cambiodecarrera #saludlaboral", "de": "REEL · 20-25 segundos · talking head + frases serif sobre fondo crema\n\nSEG 0-3 (gancho)\ntexto on screen: \"a veces NO es el trabajo\"\nvisual: tú a cámara o b-roll oficina\n\nSEG 3-8\naudio/texto: \"es la cultura de la empresa\"\ntexto on screen: cultura ≠ trabajo\n\nSEG 8-13\naudio/texto: \"el ambiente · la forma en que se habla · lo que se permite y lo que no\"\n\nSEG 13-18\naudio/texto: \"si llevas meses cansada · pregúntate · ¿es el trabajo o es CÓMO se hace ese trabajo aquí?\"\n\nSEG 18-22 (cierre)\ntexto: \"y si la respuesta es la cultura · NO eres tú\"\ntexto pequeño abajo: ♡ dramaslaborales", "st": "STORY 1 · 14:00 · teaser\n🎨 fondo negro + texto blanco serif\n💬 \"esta tarde · reel sobre la cultura del trabajo\"\n🏷 countdown\n⏱ 1 min\n\nSTORY 2 · 19:00 · reel publicado\n🎨 captura reel\n💬 \"lo que nadie te avisa ♡\"\n🏷 ver reel\n⏱ 1 min\n\nSTORY 3 · 20:00 · cita\n🎨 fondo crema serif italic grande\n💬 \"la cultura come a la estrategia para desayunar — Peter Drucker\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 21:00 · pregunta abierta\n🎨 fondo rosa\n💬 \"¿qué se normaliza donde tú trabajas que NO debería normalizarse?\"\n🏷 caja pregunta\n⏱ 1 min\n\nSTORY 5 · 22:00 · cierre\n🎨 fondo crema\n💬 \"mañana viernes · día del trabajo digno (otra vez) ✦\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "246", "d": "2026-05-08", "m": "mayo", "w": 2, "ds": "8 may", "day": "vie", "tm": "08:30", "t": "Carrusel", "ti": "5 trabajos invisibles que sostienen la economía femenina", "gh": "los 5 que haces gratis sin saberlo ✦", "cp": "5 trabajos invisibles que sostienen la economía femenina ♡\n\ntodos los hacemos · ninguno aparece en nuestro contrato · y juntos suman MÁS horas que tu jornada laboral oficial.\n\nlos datos del INE 2024 son brutales:\n· mujeres: 4h/día de trabajo doméstico NO remunerado\n· hombres: 1.5h/día\n\nsumémoslo a la carga mental · al trabajo emocional · al office housework... y entiendes por qué llegamos al viernes así.\n\nvisibilizarlo es el primer paso para repartirlo · y para que deje de ser GRATIS ✦\n\n¿cuál de los 5 haces más? cuéntame ↓\n\n#cargamental #trabajoinvisible #economiafemenina #feminismo #orientacionlaboral #dramaslaborales #mujeresprofesionales #saludmentaltrabajo #burnout #empoderamientofemenino #conciliacion", "de": "SLIDE 1 (portada):\n\"5 trabajos invisibles\"\nque sostienen la economía femenina ✦\n\nSLIDE 2 (número 01):\n\"la carga mental\"\norganizar · planificar · recordar · prever · todo a la vez\n\nSLIDE 3 (número 02):\n\"el cuidado emocional\"\nescuchar · gestionar conflictos · mantener relaciones\n\nSLIDE 4 (número 03):\n\"el trabajo doméstico no remunerado\"\n4h/día de media en mujeres vs 1.5h en hombres (INE 2024)\n\nSLIDE 5 (número 04):\n\"la representación\"\nser \"la única\" en reuniones · explicar · pedagogizar\n\nSLIDE 6 (número 05):\n\"el 'office housework'\"\norganizar cumpleaños · servir café · tomar notas en reuniones\n\nSLIDE 7:\n¿te suena alguno?\ncuéntame en comentarios cuál haces más ↓\n\nSLIDE 8 (CTA):\n✦ visibilizar es el primer paso\npara que dejen de ser GRATIS ♡", "st": "STORY 1 · 09:00 · empieza viernes\n🎨 fondo crema italic\n💬 \"viernes de datos ✦\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 2 · 12:00 · primer slide\n🎨 captura primer slide\n💬 \"los trabajos que nadie cuenta ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 14:00 · cifra impacto\n🎨 fondo rosa + serif gigante\n💬 \"16%\"\n🏷 sticker subtitulo \"lo que crecería la economía mundial\"\n⏱ 2 min\n\nSTORY 4 · 17:00 · referente\n🎨 foto Concha Velasco con frase\n💬 \"concha velasco crió 3 hijos y trabajó hasta los 80 · sin descanso ✦\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 5 · 19:00 · pregunta\n🎨 fondo crema\n💬 \"¿qué trabajo invisible haces tú todos los días?\"\n🏷 caja pregunta\n⏱ 1 min\n\nSTORY 6 · 21:00 · cierre + CTA\n🎨 fondo rosa\n💬 \"etiqueta a tu madre en el post · que sepa que la ves ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "247", "d": "2026-05-09", "m": "mayo", "w": 2, "ds": "9 may", "day": "sáb", "tm": "11:00", "t": "Carrusel", "ti": "3 cosas que cambia mi ebook en tu primera semana", "gh": "y por qué NO es como esperabas ♡", "cp": "3 cosas que cambia mi ebook en tu primera semana ♡\n\nllevo casi 3 semanas desde el lanzamiento de \"tu próximo capítulo\" · y las primeras lectoras me están escribiendo cosas que me emocionan.\n\nel ebook NO es:\n· un curso de productividad\n· un manual de coaching\n· una promesa de \"todo cambiará\"\n\nel ebook ES:\n· un mapa para identificar TU drama laboral real\n· un plan de 30 días con micro-acciones\n· honestidad pura · sin jergas · sin venderte humo\n\nsi llevas meses sintiendo que algo no encaja en tu trabajo y NO sabes ni por dónde empezar... este es el sitio para empezar ✦\n\n→ enlace en bio (16,99€ · pago único)\n\n#tuproximocapitulo #ebook #orientacionlaboral #carrera #trabajo #cambiodecarrera #dramaslaborales #mujeresprofesionales #empoderamientofemenino #busquedaempleo #saludlaboral #consejoslaborales", "de": "SLIDE 1 (portada):\n\"3 cosas que cambia mi ebook\"\nen tu primera semana ✦\n\nSLIDE 2 (número 01):\n\"dejas de sentir que vas a ciegas\"\ntienes un mapa · capítulo a capítulo · sin gurús ni jergas\n\nSLIDE 3 (número 02):\n\"identificas tu drama laboral REAL\"\na veces NO es lo que pensabas (ejercicio del capítulo 2)\n\nSLIDE 4 (número 03):\n\"tienes un plan de 30 días\"\npequeñas acciones · NO una revolución · una a una\n\nSLIDE 5:\nlo que dicen las primeras lectoras:\n(testimonio si tienes · si no, salta este slide)\n\nSLIDE 6:\npara quién ES\nmujeres que sienten que su trabajo NO les define · y quieren cambiarlo\n\nSLIDE 7:\npara quién NO es\nsi buscas un curso de productividad o un libro de coaching, este NO es\n\nSLIDE 8 (CTA):\n✦ \"tu próximo capítulo\"\n16,99€ · enlace en bio ♡", "st": "STORY 1 · 12:00 · post nuevo\n🎨 captura primer slide\n💬 \"softsell sábado ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 2 · 14:00 · screenshot ebook\n🎨 mockup primera página del ebook\n💬 \"este es el inicio del ebook ↓\"\n🏷 comenta EBOOK o link en bio\n⏱ 90 seg\n\nSTORY 3 · 17:00 · referente\n🎨 foto Sara Carbonero (en plan emprendedora) + frase\n💬 \"sara carbonero pasó de presentadora a fundadora · tú puedes pasar de caos a orden ♡\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 19:00 · testimonio (si tienes alguno) o quote\n🎨 fondo crema + serif\n💬 \"anota lo que está en tu cabeza · tu cabeza no es archivo\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 5 · 21:00 · cierre\n🎨 fondo rosa\n💬 \"16,99€ · link en bio · domingo de orden te espera ✦\"\n🏷 comenta EBOOK o link bio\n⏱ 90 seg"}, {"i": "248", "d": "2026-05-03", "m": "mayo", "w": 1, "ds": "3 may", "day": "dom", "tm": "11:00", "t": "Post", "ti": "mi madre fue mi primera jefa · y mi primera profe de orientación laboral", "gh": "feliz día a las que enseñan sin saberlo ♡", "cp": "mi madre fue mi primera jefa · y mi primera profe de orientación laboral ✦\n\nella NO sabía de LinkedIn · de personal branding · de \"side hustles\".\n\npero me enseñó:\n· a no aceptar el primer NO\n· a defender mi trabajo cuando alguien lo minimizara\n· a saber pedir lo que valgo\n· a separarme de un trabajo cuando me hace daño\n\ntodo lo que escribo en \"dramas laborales\" tiene su sello sin que ella lo sepa.\n\nhoy es día de la madre · y quería decirlo en voz alta:\n\nmamá · sin ti yo no sería esta yo profesional ♡\n\ncuéntame · ¿qué te enseñó tu madre (o quien fuera) sobre el trabajo? ↓\n\n#diadelamadre #madres #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #cuidadopersonal", "de": "FOTO ÚNICA (Post simple · día de la madre)\nimagen sugerida: foto antigua/aesthetic con tu madre · O foto tuya con un detalle (anillo, libro, taza) que sea de ella · luz cálida\n\n(la fuerza está en el caption · que sea íntimo y honesto)", "st": "STORY 1 · 10:00 · post publicado\n🎨 captura post\n💬 \"feliz día a las madres ♡ y a las que no las tienen ya\"\n🏷 corazón\n⏱ 1 min\n\nSTORY 2 · 12:00 · pregunta intima\n🎨 fondo crema\n💬 \"una cosa que te enseñó tu madre sobre el trabajo\"\n🏷 caja pregunta IG\n⏱ 1 min\n\nSTORY 3 · 17:00 · referente\n🎨 foto Frida Kahlo (con citas sobre familia)\n💬 \"frida pintó hasta el último día · su madre fue su primera modelo ♡\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 19:00 · stories tour (varias respuestas)\n🎨 captura DM o respuestas con nombres tachados\n💬 \"respuestas que me llegan ♡\"\n🏷 mostrar interacciones\n⏱ 2 min cada una (varias stories)\n\nSTORY 5 · 21:00 · cierre\n🎨 fondo rosa serif\n💬 \"mañana lunes · semana 3 ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "249", "d": "2026-05-10", "m": "mayo", "w": 2, "ds": "10 may", "day": "dom", "tm": "11:00", "t": "Post", "ti": "recopilatorio · lo que escuch\u00e9 esta semana ♡", "gh": "vuestras respuestas me dieron material para meses ♡"}, {"i": "270", "d": "2026-05-11", "m": "mayo", "w": 3, "ds": "11 may", "day": "lun", "tm": "08:30", "t": "Carrusel", "ti": "cómo decir NO en el trabajo · 5 frases que no te hacen quedar mal", "gh": "guarda esto · te va a salvar la próxima reunión", "cp": "5 frases para decir NO en el trabajo · sin quedar mal ♡\n\nllevo años aprendiendo a decir NO · y la mayor lección es esta: el problema NO era decir no · era CÓMO lo decía.\n\nlas 5 frases del carrusel las uso yo · funcionan · y NO te hacen quedar como \"la difícil\".\n\ndecir NO sin culpa es una habilidad PROFESIONAL · NO un rasgo de personalidad. se aprende. se practica. se nota en tu salud mental.\n\nguárdalo · y dime en comentarios cuál te cuesta MÁS decir ↓\n\n#decirno #limites #saludmentaltrabajo #burnout #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #consejoslaborales #carrera #saludlaboral #conciliacion", "de": "SLIDE 1 (portada):\n\"cómo decir NO en el trabajo\"\n5 frases que NO te hacen quedar mal ✦\n\nSLIDE 2 (número 01):\ncontexto: te asignan algo extra\nfrase: \"déjame ver qué tengo encima · ¿es para hoy o tiene margen?\"\nnota: ganas tiempo sin decir NO directo\n\nSLIDE 3 (número 02):\ncontexto: te piden quedarte tarde\nfrase: \"hoy NO puedo · mañana lo retomo a primera hora\"\nnota: clara · firme · sin justificarte\n\nSLIDE 4 (número 03):\ncontexto: te invitan a una reunión sin agenda clara\nfrase: \"¿podrías mandarme la agenda? así llego preparada\"\nnota: filtras reuniones inútiles\n\nSLIDE 5 (número 04):\ncontexto: te piden ayuda con algo que NO es tu trabajo\nfrase: \"creo que [persona] lo lleva mejor · ¿le escribimos a ella?\"\nnota: redirige · NO cargues con todo\n\nSLIDE 6 (número 05):\ncontexto: te presionan para responder ya\nfrase: \"déjame procesarlo · te confirmo en 1h\"\nnota: NUNCA digas SÍ bajo presión\n\nSLIDE 7:\nel NO sin culpa es:\nuna habilidad · NO un rasgo de personalidad\n\nSLIDE 8 (CTA):\n✦ guárdalo\ny dime cuál te cuesta más ↓ ♡", "st": "STORY 1 · 09:00 · ánimo lunes\n🎨 fondo serif crema italic\n💬 \"lunes nuevo · post nuevo ♡\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 2 · 12:00 · primer slide carrusel\n🎨 captura primer slide\n💬 \"🆕 cómo decir NO sin parecer conflictiva\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 14:00 · referente\n🎨 foto Phoebe Waller-Bridge mirando seria\n💬 \"phoebe waller-bridge dijo no a Hollywood durante años · y por eso volvió en SUS términos ✦\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 17:00 · meme\n🎨 captura Aubrey Plaza con cara de \"...\" (frame de Parks & Rec)\n💬 caption: \"mi cara cuando me piden algo a las 17:55\"\n🏷 emoji 😐\n⏱ 90 seg\n\nSTORY 5 · 19:00 · encuesta\n🎨 fondo rosa\n💬 \"¿cuántos NOes dices al mes?\"\n🏷 encuesta · 0 / 1-2 / 3-5 / debería decir más\n⏱ 1 min\n\nSTORY 6 · 21:00 · CTA suave\n🎨 captura ebook + frase\n💬 \"decir no es habilidad · todo en el ebook ♡\"\n🏷 link bio\n⏱ 90 seg"}, {"i": "271", "d": "2026-05-12", "m": "mayo", "w": 3, "ds": "12 may", "day": "mar", "tm": "19:00", "t": "Carrusel", "ti": "Zara Larsson · ganó un Got Talent a los 10 años · y eso fue solo el principio", "gh": "el éxito infantil suele ser una trampa · ella lo convirtió en oficio ✦", "cp": "ganó un Got Talent a los 10 años · y eso fue solo el principio ✦\n\ncaso real: Zara Larsson.\n\n2008 · gana Talang (Got Talent sueco) con 10 años cantando Whitney Houston · 500.000 SEK de premio.\n\nla mayoría de niños prodigio se queman antes de los 16.\nella · no.\n\n★\n\n· 2012 (4 años después) · firma con TEN Music Group\n· 2013 · primer EP \"Introducing\" + single \"Uncover\" #1 Escandinavia (6x platino)\n· 2015 · salto internacional con \"Lush Life\" · top 5 en 18 países\n· 2017 · álbum \"So Good\" · 1 millón de copias\n· \"Symphony\" con Clean Bandit · platino mundial\n· 2021 · álbum \"Poster Girl\"\n· 2024 · álbum \"Venus\"\n· 2025 · \"Midnight Sun\" + colab PinkPantheress\n· 2026 · nuevo álbum \"Girls Trip\" · colab con Emilia Mernes\n\n★\n\n17 años de carrera.\n5 álbumes de estudio.\nDECENAS de hits sostenidos.\n\nel éxito SOSTENIDO NO es estallar una vez.\n\nes trabajar 17 años seguidos sin dejar de sacar canciones nuevas.\n\n★\n\nla lección laboral:\n\ncuando empieces algo · NO mires el momento del estallido inicial.\n\nmira los 17 años después.\n\nahí es donde se ve si tienes carrera o tuviste un hit ♡\n\n¿en qué año de tu carrera estás? ↓\n\n#zaralarsson #carrera #motivacion #mujeresinspiradoras #orientacionlaboral #dramaslaborales #empoderamientofemenino #cambiodecarrera #superacionpersonal #emprendimiento", "de": "SLIDE 1 (portada):\n\"Zara Larsson\"\nganó un Got Talent a los 10 años\ny eso fue SOLO el principio ✦\n\nSLIDE 2 (2008 · Suecia):\ntiene 10 años\ngana Talang (Got Talent sueco)\ncantando \"Greatest Love of All\" de Whitney Houston\npremio: 500.000 SEK (~45.000€)\n\n(la mayoría de niños prodigio se queman antes de los 16.)\n(ella · no.)\n\nSLIDE 3:\n2012 · 4 años después\nfirma con TEN Music Group\n\n(esos 4 años · sin ser noticia.)\n(esos 4 años · sin que nadie hable de ella.)\n\n(esos 4 años · trabajando.)\n\nSLIDE 4 · 2013:\nsaca el EP \"Introducing\"\nel single \"Uncover\" se vuelve #1 en Suecia y Noruega\n6x platino en Suecia\n\n(15 años · ya tiene su primer hit grande.)\n(pero solo en Escandinavia.)\n\nSLIDE 5 · 2015-2017:\nsalto internacional con \"Lush Life\"\ntop 5 en 18 países\nuna de las canciones más vendidas de UK en los 2010s\nálbum \"So Good\" · vende más de 1 millón de copias\n\n(de Suecia · al mundo.)\n(con 19 años.)\n\nSLIDE 6 · siguientes años:\n\"Symphony\" con Clean Bandit · platino mundial\n\"Ruin My Life\" · viral\n\"Never Forget You\" con MNEK\nálbum \"Poster Girl\" (2021)\nálbum \"Venus\" (2024)\n\n(NO se duerme.)\n(saca disco · gira · saca disco · gira.)\n\nSLIDE 7 · 2025:\nnuevo éxito \"Midnight Sun\"\ncolab con PinkPantheress (\"Stateside\")\nnuevo álbum \"Girls Trip\" anunciado · colab con Emilia Mernes\n\n17 años de carrera.\n5 álbumes de estudio.\nsigue creciendo.\n\nSLIDE 8 (frase grande serif italic):\n\"el éxito SOSTENIDO\nno es estallar una vez.\nes trabajar 17 años seguidos\nsin dejar de salir nuevas canciones\"\n\n(eso · NO sale en LinkedIn.)\n(es lo único que diferencia carrera de un hit.)\n\nSLIDE 9 (CTA):\nsi llevas tiempo construyendo\nalgo que no estalla a la primera:\n\nNO mires el momento de \"tu Lush Life\".\nmira los 17 años de Zara DESPUÉS de él ♡\n\n¿en qué año de tu carrera estás? ↓", "st": "STORY 1 · 09:00 · contexto martes\n🎨 fondo crema italic\n💬 \"martes · día de mujeres que inspiran ✦\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 2 · 12:00 · post\n🎨 captura primer slide\n💬 \"rosalía · sin pedir perdón ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 14:00 · audio rosalía\n🎨 frame video ella + audio motomami\n💬 \"soundtrack del día\"\n🏷 música\n⏱ 2 min\n\nSTORY 4 · 17:00 · cita\n🎨 fondo crema serif italic grande\n💬 \"no me gusta que me digan lo que tengo que hacer — Rosalía\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 5 · 19:00 · pregunta\n🎨 fondo rosa\n💬 \"¿en qué quieres reinventarte tú este año?\"\n🏷 caja pregunta\n⏱ 1 min\n\nSTORY 6 · 21:00 · cierre\n🎨 fondo crema\n💬 \"fiel a ti misma · siempre ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "272", "d": "2026-05-13", "m": "mayo", "w": 3, "ds": "13 may", "day": "mié", "tm": "20:00", "t": "Reel", "ti": "cuando dices \"tengo cita médica\" pero es entrevista de trabajo", "gh": "buscar empleo en horario laboral es un deporte ♡", "cp": "buscar empleo mientras trabajas es un DEPORTE 🏃‍♀️\n\nel 90% de las entrevistas son a las 11:00 o a las 16:30 · justo cuando estás en el curro.\n\nasí que aprendes a:\n· tener \"citas médicas\" recurrentes\n· decir \"reunión de comunidad\" como excusa\n· cambiarte en el baño del bar de al lado\n\nNO te avergüences · TODAS lo hemos hecho ♡\n\ncuéntame tu mejor excusa de búsqueda de empleo en comentarios ↓\n\n#busquedaempleo #humorlaboral #cambiodecarrera #orientacionlaboral #dramaslaborales #mujeresprofesionales #entrevistadetrabajo #empleo #carrera", "de": "REEL · 15-20 segundos · humor\n\nSEG 0-3 (gancho)\ntexto on screen: \"cuando dices 'tengo cita médica'\"\nvisual: tú vestida casual · cara seria\n\nSEG 3-7\ntexto on screen: \"pero en realidad es entrevista de trabajo\"\nvisual: cambio rápido · te pones blazer encima\n\nSEG 7-11\ntexto on screen: \"y rezas para que NADIE del curro te vea\"\nvisual: cara mirando alrededor en metro/calle\n\nSEG 11-15\ntexto on screen: \"y prepares la excusa por si el médico tarda\"\nvisual: cara pensando con el dedo en la barbilla\n\nSEG 15-20 (cierre)\ntexto on screen: \"buscar empleo en horario laboral es un deporte ♡\"\ntexto pequeño: @dramaslaborales", "st": "STORY 1 · 12:00 · teaser\n🎨 frame freeze del reel\n💬 \"esta noche reel · todas lo hemos hecho ♡\"\n🏷 countdown\n⏱ 1 min\n\nSTORY 2 · 19:00 · reel publicado\n🎨 captura reel\n💬 \"subido 🔥\"\n🏷 ver reel\n⏱ 1 min\n\nSTORY 3 · 20:00 · meme apoyo\n🎨 captura Phoebe Friends con cara cómplice\n💬 \"todas tenemos una excusa-comodín 😅\"\n🏷 emoji\n⏱ 90 seg\n\nSTORY 4 · 21:00 · pregunta\n🎨 fondo rosa\n💬 \"¿cuál es TU excusa-comodín en el curro?\"\n🏷 caja respuesta\n⏱ 1 min\n\nSTORY 5 · 22:00 · cierre con humor\n🎨 fondo crema serif\n💬 \"buscar trabajo es trabajo invisible · y casi a escondidas ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "273", "d": "2026-05-14", "m": "mayo", "w": 3, "ds": "14 may", "day": "jue", "tm": "19:00", "t": "Reel", "ti": "el síndrome de la impostora · explicado en 30 segundos", "gh": "spoiler · NO es lo que piensas", "cp": "el síndrome de la impostora explicado en 30 segundos ✦\n\nNO es \"pensar que no sabes lo que haces\".\n\nES \"pensar que vas a ser DESCUBIERTA en cualquier momento como un fraude\".\n\nla diferencia es importante · porque la cura es distinta:\n· NO es \"creer más en ti\"\n· ES entender que ESTAR aprendiendo = ESTAR creciendo\n\ncuanto más alto llegas · más síndrome del impostor sientes (porque más cosas nuevas te enfrentas).\n\nNO es señal de fracaso · es señal de que estás creciendo ♡\n\nguárdalo · te servirá en el próximo bajón ↓\n\n#sindromedelimpostora #saludmentaltrabajo #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #autoestima #saludlaboral", "de": "REEL · 25-30 segundos · educativo (talking head + texto)\n\nSEG 0-3 (gancho)\ntexto on screen: \"el síndrome de la impostora explicado en 30s\"\nvisual: tú a cámara o fondo crema\n\nSEG 3-10\naudio/texto: \"NO es: pensar que NO sabes lo que haces\"\n\nSEG 10-18\naudio/texto: \"ES: pensar que vas a ser DESCUBIERTA en cualquier momento como un fraude\"\n\nSEG 18-23\naudio/texto: \"se da más en mujeres · más en sitios donde somos minoría\"\n\nSEG 23-28\naudio/texto: \"y la cura NO es 'creer en ti' · es entender que ESTAR aprendiendo es ESTAR creciendo\"\n\nSEG 28-30 (cierre)\ntexto on screen: \"♡ guárdalo · te servirá\"", "st": "STORY 1 · 14:00 · teaser\n🎨 fondo negro serif\n💬 \"esta tarde · reel sobre impostora\"\n🏷 countdown\n⏱ 1 min\n\nSTORY 2 · 19:00 · reel\n🎨 captura reel\n💬 \"lo nombro yo por ti ✦\"\n🏷 ver reel\n⏱ 1 min\n\nSTORY 3 · 20:00 · referente\n🎨 foto Penélope Cruz aceptando un premio\n💬 \"penélope cruz dijo en su Oscar: 'creí que estaba soñando' · TODAS lo sentimos ♡\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 21:00 · pregunta\n🎨 fondo rosa\n💬 \"¿en qué momento de tu vida lo has sentido más?\"\n🏷 caja pregunta\n⏱ 1 min\n\nSTORY 5 · 22:00 · cierre\n🎨 fondo crema\n💬 \"no es que no merezcas · es que estás creciendo ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "274", "d": "2026-05-15", "m": "mayo", "w": 3, "ds": "15 may", "day": "vie", "tm": "08:30", "t": "Carrusel", "ti": "5 cosas que tu contrato de trabajo TIENE que decir (y casi nadie lee)", "gh": "el #5 te puede salvar de un marrón ⚠", "cp": "5 cosas que tu contrato de trabajo TIENE que decir · y casi nadie lee ⚠\n\nel 70% de la gente firma su contrato sin leerlo entero · y luego se sorprende cuando descubre algo que NO les conviene.\n\nlos 5 puntos del carrusel los miro YO antes de firmar cualquier cosa · y me han salvado de marrones varias veces.\n\nregla de oro: si no entiendes algo, pídele a RRHH que te lo explique POR ESCRITO. NUNCA confíes solo en lo que te dicen oralmente.\n\nguárdalo · y compártelo con esa amiga que está a punto de firmar uno ♡\n\n→ más sobre derechos laborales en \"tu próximo capítulo\" (bio)\n\n#contratodetrabajo #derechoslaborales #orientacionlaboral #carrera #empleo #dramaslaborales #mujeresprofesionales #consejoslaborales #busquedaempleo #saludlaboral", "de": "SLIDE 1 (portada):\n\"5 cosas que tu contrato de trabajo\nTIENE que decir\" (y casi nadie lee) ⚠\n\nSLIDE 2 (número 01):\n\"tipo de contrato\"\nindefinido / temporal / formación · cada uno tiene derechos distintos\n\nSLIDE 3 (número 02):\n\"convenio colectivo aplicable\"\naquí están MUCHOS derechos extra que NO sabes\n\nSLIDE 4 (número 03):\n\"salario REAL desglosado\"\nbruto · neto · pagas · complementos · revisa que coincida con tu nómina\n\nSLIDE 5 (número 04):\n\"jornada laboral\"\nhoras · distribución · nocturnidad · cláusulas de flexibilidad\n\nSLIDE 6 (número 05):\n\"cláusula de NO competencia\"\nojo si te restringe trabajar en el sector después · debe estar pagada\n\nSLIDE 7:\n⚠ si NO entiendes algo\npídele al RRHH que te lo explique POR ESCRITO antes de firmar\n\nSLIDE 8 (CTA):\nguárdalo\ny compártelo con quien va a firmar pronto ♡", "st": "STORY 1 · 09:00 · ánimo viernes\n🎨 fondo crema italic\n💬 \"viernes de datos útiles ✦\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 2 · 12:00 · post nuevo\n🎨 captura primer slide\n💬 \"guarda esto antes de firmar ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 14:00 · cifra impacto\n🎨 fondo rosa + serif gigante\n💬 \"3.000€\"\n🏷 subtítulo \"lo que te puede ahorrar saber leer una cláusula\"\n⏱ 2 min\n\nSTORY 4 · 17:00 · referente\n🎨 foto Letizia Ortiz periodista\n💬 \"letizia ortiz negociaba sus contratos · tú también puedes ✦\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 5 · 19:00 · pregunta abierta\n🎨 fondo crema\n💬 \"¿alguna vez has firmado un contrato sin leerlo entero?\"\n🏷 caja pregunta\n⏱ 1 min\n\nSTORY 6 · 21:00 · cierre + CTA\n🎨 fondo rosa\n💬 \"tu trabajo merece tu lectura atenta ♡\"\n🏷 link bio\n⏱ 90 seg"}, {"i": "275", "d": "2026-05-16", "m": "mayo", "w": 3, "ds": "16 may", "day": "sáb", "tm": "11:00", "t": "Carrusel", "ti": "qué hay dentro de \"tu próximo capítulo\" · capítulo a capítulo", "gh": "transparencia total antes de comprar ✦", "cp": "qué hay dentro de \"tu próximo capítulo\" · capítulo a capítulo ♡\n\nhe querido enseñaros la estructura del ebook porque MUCHA gente me pregunta \"¿pero qué tiene exactamente?\".\n\nNO es teoría · es metodología.\nNO es coaching · es ejercicios prácticos.\nNO es un manual · es un MAPA.\n\n87 páginas · 6 capítulos · 12 ejercicios · 16,99€ pago único.\n\nsi llevas meses sintiendo que necesitas un cambio pero NO sabes ni por dónde empezar... este ebook es exactamente para eso ✦\n\n→ enlace en bio\n\n#tuproximocapitulo #ebook #orientacionlaboral #cambiodecarrera #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #saludlaboral #burnout #consejoslaborales", "de": "SLIDE 1 (portada):\n\"qué hay dentro de\n'tu próximo capítulo'\"\ncapítulo a capítulo ✦\n\nSLIDE 2 (capítulo 1):\n\"empezar\"\ncómo identificar tu drama laboral REAL · sin filtros\n\nSLIDE 3 (capítulo 2):\n\"diagnóstico\"\nel ejercicio de las 3 preguntas · te quita 80% del ruido mental\n\nSLIDE 4 (capítulo 3):\n\"tu mapa\"\ndónde estás · dónde quieres llegar · y los 5 escalones del medio\n\nSLIDE 5 (capítulo 4):\n\"el plan de 30 días\"\nmicro-acciones · NO una revolución · una cosa al día\n\nSLIDE 6 (capítulo 5):\n\"resistir el bajón\"\nporque va a llegar · y hay que tener herramientas\n\nSLIDE 7 (capítulo 6):\n\"el cambio\"\ncómo saber CUÁNDO es el momento de moverte (con check-list)\n\nSLIDE 8:\n✦ 87 páginas · 6 capítulos · 12 ejercicios\n16,99€ · pago único · descarga inmediata\n\nSLIDE 9 (CTA):\n\"tu próximo capítulo\"\nenlace en bio ↓ ♡", "st": "STORY 1 · 12:00 · post\n🎨 captura primer slide\n💬 \"te lo desgloso ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 2 · 14:00 · screenshot capítulo\n🎨 captura página interior del ebook\n💬 \"así se ve el capítulo 2 ↓\"\n🏷 comenta EBOOK o link en bio\n⏱ 90 seg\n\nSTORY 3 · 17:00 · referente\n🎨 foto Joan Didion escribiendo\n💬 \"joan didion decía: 'no sé lo que pienso hasta que lo escribo' · el ebook te da el espacio para escribirlo ♡\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 19:00 · quote\n🎨 fondo crema serif italic\n💬 \"la estructura es libertad disfrazada\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 5 · 21:00 · cierre\n🎨 fondo rosa\n💬 \"16,99€ · descarga inmediata · comenta EBOOK bajo el post o link en bio ✦\"\n🏷 comenta EBOOK o link bio\n⏱ 90 seg"}, {"i": "276", "d": "2026-05-17", "m": "mayo", "w": 3, "ds": "17 may", "day": "dom", "tm": "11:00", "t": "Post", "ti": "recopilatorio de la semana · 5 cosas que dijisteis y me hicieron pensar", "gh": "vuestras respuestas me dieron material para 6 meses ♡", "cp": "recopilatorio · 5 cosas que dijisteis esta semana y me hicieron pensar ♡\n\nesta semana abrí caja de preguntas y vuestras respuestas me han dado material para los próximos 6 meses.\n\n5 cosas que se repitieron MUCHO:\n1. \"siento que llevo años atrasada respecto a otras\"\n2. \"no puedo permitirme dejar mi trabajo aunque me esté haciendo daño\"\n3. \"cada vez que pienso en cambiar, me bloqueo\"\n4. \"siento que NO valgo lo suficiente para pedir más sueldo\"\n5. \"no sé qué quiero · solo sé que esto NO\"\n\nquiero deciros una cosa:\n\nNO estáis solas · NO os habéis quedado atrás · y NO os falla nada por sentir esto. lleva su tiempo · y se sale ♡\n\nesta semana voy a tocar varios de estos temas. ¿con cuál empiezo? ↓\n\n#orientacionlaboral #saludmentaltrabajo #burnout #cambiodecarrera #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #autoestima", "de": "FOTO ÚNICA (Post simple · domingo · recopilatorio)\nimagen sugerida: collage simple de 4 capturas de comentarios/DMs anonimizados en fondo crema · O foto de tu cuaderno con notas escritas a mano\n\n(la fuerza está en compartir lo que dijo tu audiencia)", "st": "STORY 1 · 19:00 · post + lectura cabezas\n🎨 captura del post\n💬 \"5 frases que me regalasteis ♡\"\n🏷 corazón\n⏱ 1 min\n\nSTORY 2 · 19:30 · pregunta nueva\n🎨 fondo crema\n💬 \"¿qué te dirías a ti misma de hace 1 año?\"\n🏷 caja pregunta\n⏱ 1 min\n\nSTORY 3 · 21:00 · respuesta destacada\n🎨 captura DM con nombre tachado\n💬 \"una respuesta que me ha encantado...\"\n🏷 mostrar interacción\n⏱ 2 min\n\nSTORY 4 · 22:00 · cierre semana\n🎨 fondo rosa serif italic\n💬 \"gracias por estar ♡ que la semana 4 sea preciosa\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "277", "d": "2026-05-18", "m": "mayo", "w": 4, "ds": "18 may", "day": "lun", "tm": "08:30", "t": "Carrusel", "ti": "cómo preparar una entrevista en 1 hora · sin que se note", "gh": "la regla de oro al final del carrusel ✦", "cp": "cómo preparar una entrevista en 1 hora · sin que se note ✦\n\na veces te llaman para una entrevista con 24h de antelación · o tienes que prepararla mientras trabajas en otra cosa.\n\nel método de 1 hora del carrusel funciona porque:\n· prioriza lo IMPORTANTE (no todo lo posible)\n· te da 3 herramientas concretas (preguntas · historias · datos)\n· te deja 5 min para respirar antes de entrar\n\nregla de oro: NO improvises el setting. ropa · luz · agua · libreta. lo demás puede improvisarse · esto NO ♡\n\nguárdalo · y dime cuál de los 6 pasos se te olvida más ↓\n\n#entrevistadetrabajo #busquedaempleo #orientacionlaboral #carrera #empleo #dramaslaborales #mujeresprofesionales #consejoslaborales #empoderamientofemenino #cambiodecarrera", "de": "SLIDE 1 (portada):\n\"cómo preparar una entrevista\nen 1 hora\" sin que se note ✦\n\nSLIDE 2 (0-15 min):\n\"investigación rápida\"\nweb de la empresa · LinkedIn de quien te entrevista · noticias recientes\n\nSLIDE 3 (15-25 min):\n\"3 preguntas + 3 historias\"\nprepara 3 preguntas tuyas · y 3 historias tuyas con datos concretos\n\nSLIDE 4 (25-35 min):\n\"la pregunta del millón\"\n\"¿por qué quieres este puesto?\" → respuesta de 30 segundos · clara · honesta\n\nSLIDE 5 (35-45 min):\n\"prepara tus números\"\n\"aumenté X un 30%\" · \"gestioné un equipo de 5\" · datos > adjetivos\n\nSLIDE 6 (45-55 min):\n\"el setting\"\nropa · luz si es online · agua · libreta · no improvises esto\n\nSLIDE 7 (55-60 min):\n\"respira\"\n5 min antes · no repases más · respira · sonríe · entras\n\nSLIDE 8 (CTA):\n✦ guárdalo\ny dime cuál se te olvida más ↓ ♡", "st": "STORY 1 · 09:00 · ánimo lunes\n🎨 fondo crema\n💬 \"lunes · semana 4 · vamos ✦\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 2 · 12:00 · post\n🎨 captura primer slide\n💬 \"🆕 prepara tu próxima entrevista\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 14:00 · referente\n🎨 foto Beyoncé en escena (la disciplina personificada)\n💬 \"beyoncé ensaya 8 horas al día para que parezca fácil · tú prepárate 1 hora · es honesto ♡\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 17:00 · meme\n🎨 captura Phoebe Friends mirando lista\n💬 \"yo a las 23:54 escribiendo en el bloc 'preguntas inteligentes'\"\n🏷 emoji\n⏱ 90 seg\n\nSTORY 5 · 19:00 · pregunta\n🎨 fondo rosa\n💬 \"¿cuándo es tu próxima entrevista?\"\n🏷 caja respuesta\n⏱ 1 min\n\nSTORY 6 · 21:00 · CTA\n🎨 captura ebook\n💬 \"más recursos en el ebook · link bio ✦\"\n🏷 link\n⏱ 90 seg"}, {"i": "278", "d": "2026-05-19", "m": "mayo", "w": 4, "ds": "19 may", "day": "mar", "tm": "19:00", "t": "Carrusel", "ti": "Sabrina Carpenter · 10 años haciendo música antes de que la conocieras", "gh": "el 'éxito de la noche a la mañana' tardó una década ✦", "cp": "\"el éxito de la noche a la mañana\" suele tardar 10 años ✦\n\ncaso real: Sabrina Carpenter.\n\n· 2014 · empieza en Disney como actriz secundaria\n· 2015-2019 · saca 4 álbumes que no suenan\n· 2021 · cambia de sello (su primer NO importante)\n· 2022 · primera canción que entra en Billboard (\"Nonsense\")\n· 2023 · telonea a Taylor Swift en el Eras Tour\n· abril 2024 · \"Espresso\" · top 3 Billboard\n· junio 2024 · \"Please Please Please\" · #1 en Billboard\n· junio 2025 · \"Manchild\" · debuta directamente en #1\n· 2026 · 4 nominaciones a Grammys\n\n13 años desde que empezó. 7 álbumes. Múltiples reinvenciones.\n\nla narrativa que vende es \"de la nada al éxito\".\nla realidad casi siempre es \"de la nada · a 10 años de trabajo invisible · al éxito\".\n\nsi llevas tiempo construyendo algo que aún no se nota:\n\nNO estás tarde.\nNO estás fallando.\n\nestás en la parte que nadie enseña ♡\n\ncuéntame · ¿en qué año de tu construcción estás? ↓\n\n#sabrinacarpenter #carrera #motivacion #mujeresinspiradoras #orientacionlaboral #dramaslaborales #empoderamientofemenino #cambiodecarrera #superacionpersonal #emprendimiento", "de": "SLIDE 1 (portada):\n\"Sabrina Carpenter\"\n10 años haciendo música antes\nde que TÚ la conocieras ✦\n\nSLIDE 2 (datos reales):\nempezó en Disney Channel a los 15 años\n\"Girl Meets World\" · 2014 a 2017\n\n(rol secundario · sueldo medio · sin caché)\n\nSLIDE 3:\n2015 · primer álbum\n2016 · segundo álbum\n2018 · tercer álbum\n2019 · cuarto álbum\n\nningún álbum consigue éxito masivo.\nNADA.\n\n(en Disney la firmaron a los 14 años.)\n(le sacaron 4 discos sin que sonara ninguno.)\n\nSLIDE 4:\n2021 · cambia a Island Records\nabandona el sello de Disney\n\n(el primer NO de su carrera.)\n(la primera vez que dijo \"esto NO está funcionando\".)\n\nSLIDE 5:\n2022 · álbum \"emails i can't send\"\nalgo empieza a moverse\n\"Nonsense\" entra en Billboard\n\n(después de 11 años en la industria.)\n(después de 5 álbumes.)\n\nSLIDE 6:\n2023-2024 · telonea a Taylor Swift en el Eras Tour\n25 conciertos en Australia · Asia · Latam\n\n(de cantar para 200 personas a 70.000.)\n(en sets de 30 minutos como telonera.)\n\nSLIDE 7:\nabril 2024 · \"Espresso\"\nagosto 2024 · álbum \"Short n' Sweet\" · #1 en Billboard\njunio 2025 · \"Manchild\" · #1 debut en Billboard\n2026 · 4 nominaciones a Grammys · entre ellas Canción del Año\n\n(13 años después de empezar.)\n(7 álbumes después.)\n\nSLIDE 8 (frase grande serif italic):\n\"el éxito de la noche a la mañana\nsuele tardar\nentre 7 y 10 años\"\n\n(y eso · NO te lo cuenta nadie en LinkedIn.)\n\nSLIDE 9 (CTA):\n¿llevas mucho tiempo construyendo algo\nque aún NO se nota?\n\ncuéntame en comentarios ↓\ny mírate a Sabrina · ella tampoco se notaba en 2017 ♡", "st": "STORY 1 · 09:00 · contexto\n🎨 fondo crema italic\n💬 \"martes · día de mujeres que inspiran ✦\"\n🏷 corazón\n⏱ 90 seg\n\nSTORY 2 · 12:00 · post\n🎨 captura primer slide\n💬 \"frida ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 14:00 · cita\n🎨 fondo crema serif italic gigante\n💬 \"me pinto a mí misma porque soy a quien mejor conozco — frida\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 17:00 · obra\n🎨 imagen aesthetic de una obra de Frida (las dos fridas)\n💬 \"ella lo convirtió todo en arte · tu vida también es material ✦\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 5 · 19:00 · pregunta\n🎨 fondo rosa\n💬 \"¿qué de tu vida actual podría ser tu material?\"\n🏷 caja pregunta\n⏱ 1 min\n\nSTORY 6 · 21:00 · cierre\n🎨 fondo crema\n💬 \"todo lo que crees que te limita · puede ser tu tema ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "279", "d": "2026-05-20", "m": "mayo", "w": 4, "ds": "20 may", "day": "mié", "tm": "20:00", "t": "Reel", "ti": "cuando tu jefe te dice \"tenemos que hablar\"", "gh": "tu cabeza vs la realidad · siempre", "cp": "\"tenemos que hablar\" en el trabajo es la frase MÁS aterradora del idioma 🥲\n\nel 90% de las veces es para una tontería. el otro 10% es para algo importante. pero la cabeza siempre se va al peor escenario.\n\nmándaselo a esa persona que también se atascaría en el ascensor pensando lo peor ♡\n\n#humorlaboral #ansiedadlaboral #saludmentaltrabajo #drama #orientacionlaboral #dramaslaborales #mujeresprofesionales #burnout #saludlaboral", "de": "REEL · 15-20 segundos · humor\n\nSEG 0-3 (gancho)\ntexto on screen: \"cuando tu jefe te dice 'tenemos que hablar'\"\nvisual: cara de pánico · móvil en la mano\n\nSEG 3-7\ntexto on screen: \"tu cabeza:\"\nvisual: cambio de plano\n\nSEG 7-12\ntexto on screen: \"¿me echan? ¿qué he hecho? ¿es por el email del martes?\"\nvisual: efectos rápidos · texto saltando\n\nSEG 12-16\ntexto on screen: \"él en la reunión:\"\n\nSEG 16-19\ntexto on screen: \"hay que cambiar la fuente del PowerPoint\"\nvisual: cara desencajada de absurdo\n\nSEG 19-20 (cierre)\ntexto on screen: \"♡ trabajamos también con los nervios\"", "st": "STORY 1 · 12:00 · teaser\n🎨 frame freeze del reel\n💬 \"esta noche · reel · todas lo hemos sentido ♡\"\n🏷 countdown\n⏱ 1 min\n\nSTORY 2 · 19:00 · reel\n🎨 captura reel\n💬 \"subido · te toca 🔥\"\n🏷 ver reel\n⏱ 1 min\n\nSTORY 3 · 20:00 · meme\n🎨 captura Aubrey Plaza cara horror\n💬 \"yo viendo 'tenemos que hablar' a las 17:55\"\n🏷 emoji\n⏱ 90 seg\n\nSTORY 4 · 21:00 · pregunta\n🎨 fondo rosa\n💬 \"última vez que tu jefe te dijo eso · ¿qué pasó?\"\n🏷 caja respuesta\n⏱ 1 min"}, {"i": "280", "d": "2026-05-21", "m": "mayo", "w": 4, "ds": "21 may", "day": "jue", "tm": "19:00", "t": "Reel", "ti": "el trabajo no debería robarte tus planes", "gh": "mañana voy al concierto de Bad Bunny ♡", "cp": "el trabajo NO debería robarte tus planes ♡\n\nmañana voy al concierto de Bad Bunny · y el domingo me voy una semana a República Dominicana.\n\nNO he pedido permiso para vivir · he organizado mi trabajo para PODER vivir.\n\ny eso es el cambio: dejar de pensar que tu vida tiene que adaptarse al trabajo · y empezar a organizar tu trabajo para que CABE tu vida ✦\n\nesto es exactamente de lo que habla \"tu próximo capítulo\" · cómo crear un sistema laboral que NO te robe lo importante.\n\n→ enlace en bio\n\n#trabajoyvida #conciliacion #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #saludlaboral #burnout #tuproximocapitulo", "de": "REEL · 20-25 segundos · talking head\n\nSEG 0-3 (gancho)\ntexto on screen: \"el trabajo NO debería robarte tus planes\"\nvisual: tú a cámara o b-roll de planes (concierto, viaje, etc)\n\nSEG 3-10\naudio/texto: \"este 22 de mayo voy al concierto de Bad Bunny en Barcelona\"\n\nSEG 10-15\naudio/texto: \"y la próxima semana me voy a República Dominicana\"\n\nSEG 15-20\naudio/texto: \"NO he pedido permiso para vivir · he organizado mi trabajo para PODER vivir\"\n\nSEG 20-25 (cierre)\ntexto on screen serif italic:\n\"el trabajo NO debería robarte tus planes ♡\"", "st": "STORY 1 · 12:00 · teaser\n🎨 fondo negro serif\n💬 \"esta tarde · reel · viernes te hablo ✦\"\n🏷 countdown\n⏱ 1 min\n\nSTORY 2 · 19:00 · reel\n🎨 captura reel\n💬 \"viernes y todo bien ♡\"\n🏷 ver reel\n⏱ 1 min\n\nSTORY 3 · 20:00 · referente concierto\n🎨 imagen aesthetic concierto / Aitana en directo\n💬 \"la música también es trabajo emocional · disfruta ♡\"\n🏷 sin sticker\n⏱ 90 seg\n\nSTORY 4 · 21:00 · pregunta\n🎨 fondo rosa\n💬 \"¿qué plan personal te has saltado por curro este año?\"\n🏷 caja respuesta\n⏱ 1 min\n\nSTORY 5 · 22:00 · cierre\n🎨 fondo crema\n💬 \"mañana: yo en bcn ♡ a las que también van · nos vemos ✦\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "281", "d": "2026-05-22", "m": "mayo", "w": 4, "ds": "22 may", "day": "vie", "tm": "11:00", "t": "Carrusel", "ti": "ATENCIÓN · post programado el 21 noche · cuando vas al concierto de Bad Bunny", "gh": "el contenido sale solo · gracias al sistema ♡", "cp": "estoy en el concierto de Bad Bunny · y mi contenido sigue saliendo solo ♡\n\nprogramé este post anoche · ahora mismo estoy gritando \"un x100to\" sin pensar en redes.\n\nNO existe el contenido \"espontáneo\" de IG · existe el contenido planificado que PARECE espontáneo.\n\nel sistema:\n· 1 día/semana de planificación\n· evergreen como oxígeno\n· 70% programado · 30% libre\n\nesto es exactamente lo que sostiene un proyecto a largo plazo cuando además trabajas full-time como yo ✦\n\n→ \"tu próximo capítulo\" en bio cuenta el sistema completo\n\n#badbunny #organizacion #planificacion #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #conciliacion", "de": "SLIDE 1 (portada):\n\"cuando vas al concierto de Bad Bunny\"\ny NO te has llevado el portátil ♡\n\nSLIDE 2:\nhoy\n22 mayo · concierto Bad Bunny · Estadi Olímpic · BCN\n\nSLIDE 3:\nhe programado todo el contenido del fin de semana\nstories incluidas · sin tocarlo desde el móvil\n\nSLIDE 4:\nNO existe el contenido espontáneo de IG\nexiste el contenido planificado que parece espontáneo\n\nSLIDE 5:\n3 cosas que aprendí planificando\n(siguientes slides)\n\nSLIDE 6 (número 01):\n1 día a la semana de planificación\n> 7 días reactivos\n\nSLIDE 7 (número 02):\nel contenido evergreen es el oxígeno\nposts que sirven cualquier mes · vuelven a salvarte\n\nSLIDE 8 (número 03):\ndeja MARGEN para cambios\n70% planificado · 30% libre · suficiente\n\nSLIDE 9 (CTA):\n✦ irte al concierto SIN ansiedad\ntiene un sistema detrás ♡", "st": "⚠ STORIES MÍNIMAS · día de concierto · solo 2-3 stories desde el móvil ⚠\n\nSTORY 1 · mañana antes salir\n🎨 selfie aesthetic getting ready\n💬 \"BCN te espero · concierto BB esta noche ♡\"\n🏷 ubicación · stickers\n⏱ 1 min\n\nSTORY 2 · llegada al concierto (ya en la noche)\n🎨 luces del estadio · captura ambiente\n💬 \"ESTAMOS · 🩷\"\n🏷 ubicación · stickers\n⏱ 1 min\n\nSTORY 3 · final concierto / volver\n🎨 frame nocturno · luces · video corto\n💬 \"buenas noches dramaslaborales ♡\"\n🏷 corazón\n⏱ 1 min\n\n✦ NO publiques copy elaborada · NO subas reel · descansa · disfruta ♡"}, {"i": "282", "d": "2026-05-23", "m": "mayo", "w": 4, "ds": "23 may", "day": "sáb", "tm": "11:00", "t": "Carrusel", "ti": "sábado · resumen de lo que escuché esta semana", "gh": "comparación con acción = aprendizaje · sin acción = autosabotaje", "cp": "sábado de notas · lo que escuché esta semana ♡\n\nen stories me preguntasteis MUCHO esto:\n\"¿cómo dejas de compararte con otras?\"\n\nmi respuesta corta: NO dejas de compararte. la comparación es automática.\n\nlo que SÍ puedes elegir es QUÉ haces con ella:\n· comparación con ACCIÓN = aprendizaje\n· comparación sin acción = autosabotaje\n\nregla práctica: si después de comparte HACES algo concreto, está bien. si solo te bloqueas y te ahogas en \"no soy suficiente\", cierra IG ♡\n\ncuéntame en comentarios · ¿en qué lado estás esta semana?\n\n#comparacion #saludmental #autoestima #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #cuidadopersonal #saludmentaltrabajo", "de": "SLIDE 1 (portada):\n\"lo que escuché esta semana\"\nsábado de notas ♡\n\nSLIDE 2:\nen stories me preguntasteis MUCHO esto:\n\"¿cómo dejas de compararte con otras?\"\n\nSLIDE 3:\nmi respuesta corta:\nNO dejas de compararte\n\nSLIDE 4:\nla comparación es automática\nlo que SÍ puedes elegir es qué haces con ella\n\nSLIDE 5:\ndos opciones:\nla usas como combustible · o la usas como justificación para no moverte\n\nSLIDE 6:\n✦ regla práctica\nsi después de comparte HACES algo · está bien · si solo te bloqueas · cierra IG\n\nSLIDE 7 (frase grande serif italic):\n\"comparación con acción = aprendizaje\ncomparación sin acción = autosabotaje\"\n\nSLIDE 8 (CTA):\n¿en qué lado estás esta semana?\ncuéntame ↓ ♡", "st": "STORY 1 · 18:00 · post\n🎨 captura primer slide\n💬 \"lo que aprendí esta semana de VOSOTRAS ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 2 · 19:00 · respuesta a DM destacada\n🎨 captura DM con nombre tachado\n💬 \"esta me ha tocado el corazón ♡\"\n🏷 mostrar interacción\n⏱ 2 min\n\nSTORY 3 · 20:00 · referente\n🎨 foto Almudena Grandes con libro\n💬 \"almudena grandes escribió hasta su último día · sostener una obra es el verdadero arte ✦\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 22:00 · cierre\n🎨 fondo rosa\n💬 \"feliz sábado ♡ mañana toca preparar la semana de RD\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "283", "d": "2026-05-24", "m": "mayo", "w": 4, "ds": "24 may", "day": "dom", "tm": "11:00", "t": "Post", "ti": "mañana me voy una semana · pero el contenido sigue ✦", "gh": "el sistema detrás · NO la motivación", "cp": "mañana me voy una semana a República Dominicana · pero el contenido sigue ✦\n\nllevo todo mayo programando publicaciones · stories · respuestas a comentarios.\n\nesto NO es porque sea un robot. es porque tengo un sistema.\n\nla diferencia entre un proyecto que sostiene presencia y uno que se apaga cuando hay vacaciones es:\n\nel sistema detrás · NO la motivación.\n\nesta semana en stories os enseño cómo trabajo desde la playa de República Dominicana sin estresarme · y cómo organicé este viaje sin que mi proyecto se cayera ♡\n\n¿qué queréis que os enseñe del lado \"trabajo remoto\"?\n1. mi rutina diaria\n2. cómo programo el contenido\n3. cómo separo trabajo y vacaciones reales\n4. todo\n\ncuéntame ↓\n\n#trabajoremoto #nomadadigital #republicadominicana #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #vidaviajera #cambiodecarrera", "de": "FOTO ÚNICA (Post simple · domingo · anuncio viaje)\nimagen sugerida: foto tipo aesthetic de maleta + libreta + portátil · O foto de billete de avión sobre cuaderno · luz cálida\n\n(el caption es el protagonista · contar el viaje y mantener engagement)", "st": "STORY 1 · 19:00 · post\n🎨 captura del post\n💬 \"mañana me voy ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 2 · 19:30 · pregunta interactiva\n🎨 fondo crema\n💬 \"¿alguna vez has hecho IG desde un viaje de trabajo?\"\n🏷 sí/no encuesta\n⏱ 1 min\n\nSTORY 3 · 21:00 · checklist visual\n🎨 foto maleta + capturas Meta Business Suite (programación lista)\n💬 \"todo programado · stories en directo desde República Dominicana ✦\"\n🏷 corazón\n⏱ 2 min\n\nSTORY 4 · 22:00 · cierre semana\n🎨 fondo rosa\n💬 \"el lunes os hablo desde RD ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "284", "d": "2026-05-25", "m": "mayo", "w": 5, "ds": "25 may", "day": "lun", "tm": "08:30", "t": "Carrusel", "ti": "cómo gestionar el correo cuando estás de viaje (sin volver con 400 mails)", "gh": "la regla 4D te va a salvar las próximas vacaciones", "cp": "cómo gestionar el correo cuando estás de viaje · sin volver con 400 mails ♡\n\nestoy escribiendo esto desde República Dominicana · y mi correo NO está fuera de control.\n\nlos 6 pasos del carrusel los aplico siempre · y son la diferencia entre volver de vacaciones descansada o con la cabeza ya en lunes.\n\nla regla 4D (do · delegate · defer · delete) la aplico SIEMPRE · no solo en viajes.\n\nguárdalo · y compártelo con quien se va de vacaciones pronto ↓\n\n#emails #productividadreal #vacaciones #organizacion #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #conciliacion #saludlaboral", "de": "SLIDE 1 (portada):\n\"cómo gestionar el correo\ncuando estás de viaje\"\nsin volver con 400 mails sin leer ♡\n\nSLIDE 2 (número 01):\n\"activa el autorespondedor REAL\"\n\"vuelvo el [fecha] · para urgencias contacta a [persona]\"\n\nSLIDE 3 (número 02):\n\"define qué es URGENTE\"\ncliente que paga ahora · jefe directo · familia · NADA más\n\nSLIDE 4 (número 03):\n\"revisa 1 vez al día · MAX\"\na la misma hora · 30 min · luego cierras\n\nSLIDE 5 (número 04):\n\"la regla 4D\"\ndo (rápido) · delegate · defer (a tu vuelta) · delete\n\nSLIDE 6 (número 05):\n\"NO contestes nada extenso\"\n\"lo veo a mi vuelta el [fecha]\" · y punto\n\nSLIDE 7 (número 06):\n\"el día de vuelta · 2h dedicadas\"\nNO empieces el día normal · da prioridad al backlog\n\nSLIDE 8 (CTA):\n✦ guárdalo\nespecialmente si te vas de vacaciones pronto ♡", "st": "⚠ STORIES DESDE República Dominicana · móvil · espontáneas ⚠\n\nSTORY 1 · mañana RD\n🎨 selfie aesthetic morning view\n💬 \"buenos días desde RD (México) ♡ post nuevo programado\"\n🏷 ubicación\n⏱ 1 min\n\nSTORY 2 · 12:00 · post\n🎨 captura primer slide\n💬 \"🆕 cómo no volver con 400 mails ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · tarde · vista\n🎨 video corto · paisaje · skyline o playa\n💬 \"trabajando desde aquí · agradecida ♡\"\n🏷 ubicación\n⏱ 1 min\n\nSTORY 4 · noche · cierre\n🎨 fondo crema serif\n💬 \"primer día RD · todo bien · mañana más ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "285", "d": "2026-05-26", "m": "mayo", "w": 5, "ds": "26 may", "day": "mar", "tm": "19:00", "t": "Carrusel", "ti": "Charli XCX · 14 años de carrera para llegar al 'Brat Summer'", "gh": "el verano del verde lima fue 14 años de paciencia ✦", "cp": "el \"Brat Summer\" tardó 14 años en llegar ✦\n\ncaso real: Charli XCX.\n\n· empezó actuando en raves ilegales de Londres con 14 años\n· primer álbum oficial · 2013 (\"True Romance\")\n· 5 álbumes después · seguía siendo \"artista de culto\"\n· escribió hits para Iggy Azalea, Selena Gomez, Camila Cabello (sin que nadie supiera)\n\njunio 2024 · sacó \"Brat\".\n\nen 6 meses:\n· portada verde lima · viral en TikTok\n· la palabra \"brat\" entró en el Collins Dictionary\n· Kamala Harris usó la estética para su campaña\n· 9 nominaciones Grammy · 3 victorias\n\n14 AÑOS desde su primer álbum hasta el explote.\n\n★\n\na veces el éxito NO tarda porque seas mediocre.\n\ntarda porque estás construyendo algo que el mundo todavía no está listo para entender.\n\n\"Brat\" en 2010 habría sido un fracaso.\nen 2024 fue fenómeno cultural.\n\n★\n\nla pregunta NO es \"¿por qué tarda tanto?\".\n\nla pregunta es \"¿estoy construyendo algo que el mundo VA A NECESITAR cuando esté listo para verlo?\" ♡\n\n¿en qué año de tu \"Brat Summer\" estás? ↓\n\n#charlixcx #bratsummer #carrera #motivacion #mujeresinspiradoras #orientacionlaboral #dramaslaborales #empoderamientofemenino #cambiodecarrera #superacionpersonal", "de": "SLIDE 1 (portada):\n\"Charli XCX\"\n14 años de carrera\npara llegar al \"Brat Summer\" ✦\n\nSLIDE 2 (los inicios):\n2010 · empieza a actuar en raves ilegales en Londres\ntiene 14-15 años\nescribiendo sus propias canciones desde los 14\n\n(literalmente · cuando otros estudian para selectividad\nella ya producía música.)\n\nSLIDE 3:\n2013 · primer álbum \"True Romance\"\nnadie lo escucha en mainstream\nes un álbum de culto\n\n(es la fase \"trabajo en silencio\".)\n(la fase larga · la que nadie cuenta.)\n\nSLIDE 4:\n2014 · le va mejor escribiendo PARA otras\n\"Fancy\" para Iggy Azalea · #1 mundial\n\"Same Old Love\" para Selena Gomez\n\"Señorita\" para Camila Cabello y Shawn Mendes\n\n(detrás del éxito de TODAS · estaba ella.)\n(pero NADIE sabía su nombre.)\n\nSLIDE 5:\n2017-2022 · 5 álbumes propios\nsigue siendo \"artista de culto\"\ncrítica encantada · público masivo NO\n\n(los \"casi famosos\" son los que más tiran la toalla.)\n(ella no la tiró.)\n\nSLIDE 6 (junio 2024):\nlanza \"Brat\"\nverde lima · estética cyberpunk · 95/100 en Metacritic\n\nEL DESBLOQUEO TOTAL:\n· \"Brat Summer\" se vuelve fenómeno cultural\n· la palabra del año en el Collins Dictionary\n· la campaña de Kamala Harris usa la portada\n· 9 nominaciones Grammy · 3 victorias\n\nSLIDE 7 (frase grande serif italic):\n\"a veces el éxito tarda\nporque estás construyendo algo\nque el mundo todavía\nNO está listo para entender\"\n\n(eso pasó con Brat.)\n(estuvo 14 años cocinándose.)\n\nSLIDE 8 (CTA):\nsi llevas años trabajando\nen algo que aún NO se nota:\n\nNO estás tarde.\nestás cocinando ✦\n\n¿en qué año de tu \"Brat Summer\" estás? ↓", "st": "⚠ STORIES DESDE República Dominicana · móvil ⚠\n\nSTORY 1 · 09:00 · ánimo desde RD\n🎨 selfie con paisaje\n💬 \"martes desde RD · día de mujeres que inspiran ✦\"\n🏷 corazón\n⏱ 1 min\n\nSTORY 2 · 12:00 · post\n🎨 captura primer slide\n💬 \"isabel allende ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 17:00 · cita\n🎨 fondo crema serif italic gigante\n💬 \"no hay edad útil para empezar — Isabel Allende\"\n🏷 sin sticker\n⏱ 2 min\n\nSTORY 4 · 20:00 · vista RD\n🎨 video paisaje · puesta de sol\n💬 \"inspiración desde aquí ♡\"\n🏷 ubicación\n⏱ 1 min"}, {"i": "286", "d": "2026-05-27", "m": "mayo", "w": 5, "ds": "27 may", "day": "mié", "tm": "20:00", "t": "Reel", "ti": "cuando viajas por trabajo y todos creen que es vacaciones", "gh": "trabajar viajando es OTRO formato de trabajo ♡", "cp": "trabajar viajando NO son vacaciones ♡\n\nla gente piensa que estar en República Dominicana con el portátil es \"vivir el sueño\". y mira · es genial · pero NO son vacaciones.\n\ntrabajar remoto desde otro país tiene su propio caos:\n· la conexión a veces falla\n· las reuniones a las 8am cuando aquí amanece tarde\n· el calor mientras intentas concentrarte\n· la culpa de \"debería estar disfrutando\" mezclada con \"tengo deadlines\"\n\ny aún así · prefiero ESTO mil veces a estar en una oficina ✦\n\ncuéntame · ¿alguna vez has trabajado viajando? ¿qué te ha sorprendido? ↓\n\n#trabajoremoto #nomadadigital #republicadominicana #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #vidaviajera #conciliacion", "de": "REEL · 20 segundos · humor\n\nSEG 0-3 (gancho)\ntexto on screen: \"cuando viajas POR trabajo\"\nvisual: tú con portátil en café/playa de República Dominicana\n\nSEG 3-7\ntexto on screen: \"y todos creen que son vacaciones\"\nvisual: cara entre hartazgo y resignación\n\nSEG 7-12\ntexto on screen: \"yo a las 8am respondiendo emails con cara de zombie\"\nvisual: portátil + café\n\nSEG 12-16\ntexto on screen: \"yo a las 14h con la cabeza fundida después de 5 reuniones\"\nvisual: cara cansada · hace calor\n\nSEG 16-20 (cierre)\ntexto on screen serif:\n\"trabajar viajando NO son vacaciones · es OTRO formato de trabajo ♡\"", "st": "⚠ STORIES DESDE República Dominicana · móvil · cortas ⚠\n\nSTORY 1 · 12:00 · adelanto\n🎨 frame del reel\n💬 \"esta tarde · reel grabado para vosotras · ya programado ♡\"\n🏷 countdown\n⏱ 1 min\n\nSTORY 2 · 19:00 · reel\n🎨 captura reel\n💬 \"subido desde mi cuarto de hotel 😅\"\n🏷 ver reel\n⏱ 1 min\n\nSTORY 3 · 21:00 · realidad\n🎨 foto real · vista mesa hotel + portátil\n💬 \"esto es 'el viaje glamuroso' que nadie ve\"\n🏷 sin sticker\n⏱ 90 seg"}, {"i": "287", "d": "2026-05-28", "m": "mayo", "w": 5, "ds": "28 may", "day": "jue", "tm": "19:00", "t": "Reel", "ti": "el 80% del trabajo lo hacen las mujeres · ahora vivo uno de esos viajes", "gh": "los datos NO son casualidad · son estructurales", "cp": "el 80% del trabajo de las industrias creativas lo hacen MUJERES ✦\n\ndatos de Forbes 2024:\n· 80% del trabajo creativo · mujeres\n· 75% de los puestos directivos · hombres\n· brecha salarial promedio · 22%\n\nestos datos NO son casualidad. son ESTRUCTURALES.\n\nestoy escribiendo esto desde República Dominicana · trabajo remoto · uno de esos viajes que parecen \"vacaciones\" pero NO lo son. trabajo invisible. esencial. infravalorado.\n\nla próxima vez que alguien minimice tu trabajo porque \"se hace desde casa\" o \"se hace viajando\" · acuérdate de los datos.\n\nel trabajo invisible existe · y es nuestro ♡\n\n#trabajoinvisible #brechasalarial #mujeresenelmundolaboral #orientacionlaboral #dramaslaborales #mujeresprofesionales #empoderamientofemenino #feminismo #carrera", "de": "REEL · 25-30 segundos · educativo + personal\n\nSEG 0-3 (gancho)\ntexto on screen: \"el 80% del trabajo de las industrias creativas\"\nvisual: vista aesthetic de República Dominicana\n\nSEG 3-8\ntexto on screen: \"lo hacen las MUJERES\"\nvisual: cifra grande \"80%\"\n\nSEG 8-15\naudio/texto: \"y aún así · el 75% de los puestos directivos los ocupan hombres (Forbes 2024)\"\n\nSEG 15-22\naudio/texto: \"yo ahora estoy viviendo uno de esos viajes desde el otro lado · los que hacen trabajo remoto · invisibles · pero esenciales\"\n\nSEG 22-28\naudio/texto: \"y esto · esto NO es casualidad · es estructural\"\n\nSEG 28-30 (cierre)\ntexto on screen serif:\n\"el trabajo invisible existe · y es nuestro ♡\"", "st": "⚠ STORIES DESDE República Dominicana · móvil ⚠\n\nSTORY 1 · 14:00 · teaser\n🎨 fondo negro serif\n💬 \"hoy · reel sobre algo que viví aquí ♡\"\n🏷 countdown\n⏱ 1 min\n\nSTORY 2 · 19:00 · reel\n🎨 captura reel\n💬 \"subido desde RD\"\n🏷 ver reel\n⏱ 1 min\n\nSTORY 3 · 21:00 · cita\n🎨 fondo crema serif italic\n💬 \"el simple hecho de estar es un cambio\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "288", "d": "2026-05-29", "m": "mayo", "w": 5, "ds": "29 may", "day": "vie", "tm": "08:30", "t": "Carrusel", "ti": "5 derechos laborales que NADIE te explica · y son tuyos por contrato", "gh": "el #3 te puede ahorrar muchos problemas ⚠", "cp": "5 derechos laborales que NADIE te explica · y son TUYOS por contrato ⚠\n\nes una vergüenza la cantidad de derechos que tenemos · y desconocemos.\n\nlos 5 del carrusel son los más \"olvidados\" · y los que más te benefician en el día a día.\n\nregla de oro: estos NO son favores. son DERECHOS. y si la empresa no los respeta · es ELLA quien está incumpliendo · NO tú \"siendo difícil\".\n\n(no soy abogada · si tienes dudas concretas consulta con un sindicato o asesoría laboral)\n\nguárdalo · y mándaselo a quien NO sabe esto ♡\n\n#derechoslaborales #leylaboral #orientacionlaboral #carrera #empleo #dramaslaborales #mujeresprofesionales #consejoslaborales #empoderamientofemenino #saludlaboral", "de": "SLIDE 1 (portada):\n\"5 derechos laborales\nque NADIE te explica\"\ny son tuyos por contrato ⚠\n\nSLIDE 2 (número 01):\n\"derecho a la desconexión digital\"\nNO tienes que contestar correos fuera de tu jornada · es LEY desde 2018\n\nSLIDE 3 (número 02):\n\"derecho a 23 días hábiles de vacaciones\"\nMÍNIMO · sin importar antigüedad · y NO se pueden imponer fechas sin acuerdo\n\nSLIDE 4 (número 03):\n\"derecho a permiso por mudanza\"\n1 día retribuido (o más según convenio) · y casi nadie lo pide\n\nSLIDE 5 (número 04):\n\"derecho a adaptación de jornada por conciliación\"\nsi tienes hijos menores 12 años · puedes pedir cambio · sin reducción de sueldo\n\nSLIDE 6 (número 05):\n\"derecho a formación en horario laboral\"\n20 horas/año mínimo · pagadas por la empresa · si no las pides las pierdes\n\nSLIDE 7:\n⚠ esto NO es negociable\nson DERECHOS · NO favores que te hacen\n\nSLIDE 8 (CTA):\nguárdalo\ny compártelo con quien necesita saberlo ♡", "st": "⚠ STORIES DESDE República Dominicana · móvil ⚠\n\nSTORY 1 · 09:00 · ánimo viernes\n🎨 selfie con vista\n💬 \"viernes desde RD · datos útiles ✦\"\n🏷 corazón\n⏱ 1 min\n\nSTORY 2 · 12:00 · post\n🎨 captura primer slide\n💬 \"🔖 guarda este antes de salir del trabajo ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 17:00 · cifra impacto\n🎨 fondo rosa + serif gigante\n💬 \"70%\"\n🏷 subtítulo \"lo desconoce\"\n⏱ 2 min\n\nSTORY 4 · 21:00 · cierre\n🎨 fondo crema\n💬 \"el conocimiento es poder · el tuyo ♡\"\n🏷 corazón\n⏱ 90 seg"}, {"i": "289", "d": "2026-05-30", "m": "mayo", "w": 5, "ds": "30 may", "day": "sáb", "tm": "11:00", "t": "Carrusel", "ti": "3 cosas que ha aportado este ebook a las primeras lectoras", "gh": "los testimonios reales que me siguen emocionando ♡", "cp": "3 cosas que ha aportado este ebook a las primeras lectoras ♡\n\nllevo casi 6 semanas desde el lanzamiento de \"tu próximo capítulo\" · y los mensajes que me llegan me siguen emocionando.\n\nlos 3 cambios principales:\n· claridad sobre lo que BLOQUEA (no lo que pensaban)\n· un plan de 30 días concreto (no más motivación vacía)\n· la validación de NO estar sola\n\nesto NO es un libro de coaching · es un MAPA escrito desde experiencia REAL.\n\nsi llevas meses dando vueltas y necesitas un sitio por donde empezar · este es el sitio ✦\n\n→ \"tu próximo capítulo\" · enlace en bio\n\n#tuproximocapitulo #ebook #orientacionlaboral #cambiodecarrera #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #saludlaboral #burnout #consejoslaborales #busquedaempleo", "de": "SLIDE 1 (portada):\n\"3 cosas que ha aportado este ebook\"\na las primeras lectoras ♡\n\nSLIDE 2 (número 01):\n\"claridad sobre QUÉ las bloquea\"\nel ejercicio del capítulo 2 cambió perspectivas en 30 minutos\n\nSLIDE 3:\ntestimonio:\n\"siempre pensé que era yo · resulta que era el ambiente\"\n— lectora · 31 años\n\nSLIDE 4 (número 02):\n\"un plan de 30 días concreto\"\nNO motivación vacía · acciones reales\n\nSLIDE 5:\ntestimonio:\n\"llevaba 2 años bloqueada · en 3 semanas tengo movimiento\"\n— lectora · 27 años\n\nSLIDE 6 (número 03):\n\"validación · NO estás sola\"\nel sistema funciona · pero también acompaña\n\nSLIDE 7:\ntestimonio:\n\"pensé que era exagerada · ahora sé que no\"\n— lectora · 29 años\n\nSLIDE 8 (CTA):\n✦ \"tu próximo capítulo\"\n16,99€ · pago único · enlace en bio ♡\n\nNOTA: si todavía no tienes 3 testimonios reales el día 30, sustituye los textos por uno que puedas mostrar. Si solo tienes 1, usa solo 1 testimonio en lugar de 3.", "st": "⚠ STORIES DESDE República Dominicana · últimos días · cortas ⚠\n\nSTORY 1 · 12:00 · post\n🎨 captura primer slide\n💬 \"softsell sábado ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 2 · 17:00 · screenshot DM real (con permiso · nombre tachado)\n🎨 captura DM\n💬 \"una respuesta que me hizo llorar ♡\"\n🏷 mostrar interacción\n⏱ 2 min\n\nSTORY 3 · 20:00 · puesta sol RD\n🎨 video puesta sol\n💬 \"RD me ha cuidado ♡ mañana vuelvo\"\n🏷 ubicación\n⏱ 1 min"}, {"i": "290", "d": "2026-05-31", "m": "mayo", "w": 5, "ds": "31 may", "day": "dom", "tm": "11:00", "t": "Carrusel", "ti": "la silla giratoria de tu carrera · ¿en cuál de las 4 posiciones estás?", "gh": "la consistencia importa más que la intensidad ✦", "cp": "cierro mayo · 31 días · 31 publicaciones · 1 viaje · y mucho aprendido ✦\n\nal empezar mayo me planteé un reto:\npublicar todos los días · sin perder calidad · sin quemarme · y sin renunciar a vivir.\n\n¿he cumplido al 100%? casi.\n¿lo he hecho perfecto? NO.\n¿he aprendido cosas? muchísimas.\n\nlas 3 más importantes:\n\n1. la planificación es libertad · no es control. si planifico, puedo IRME al concierto, al viaje, al plan, sin culpa.\n\n2. la consistencia importa más que la intensidad. 31 posts \"buenos\" pesan más que 5 \"perfectos\".\n\n3. mi proyecto NO depende de mi motivación · depende de mi sistema. y eso es lo que sostiene a largo plazo ♡\n\njunio nuevo reto: empezar a vender mi primera asesoría 1:1.\n\n¿con qué te quedas tú de mayo? cuéntame ↓\n\n#cierrademes #aprendizajes #orientacionlaboral #cambiodecarrera #dramaslaborales #mujeresprofesionales #empoderamientofemenino #carrera #vidaprofesional #emprendimiento", "de": "FOTO ÚNICA (Post simple · cierre de mes)\nimagen sugerida: foto aesthetic tuya · O foto de tu cuaderno con las 31 fechas tachadas · luz cálida atardecer\n\n(el caption es el protagonista · cierre emocional de mayo)", "st": "⚠ STORIES VUELTA República Dominicana ⚠\n\nSTORY 1 · noche · llegada España\n🎨 foto avión / aeropuerto\n💬 \"vuelvo a casa ♡ qué mes\"\n🏷 ubicación\n⏱ 1 min\n\nSTORY 2 · 19:00 · post cierre mes\n🎨 captura del post\n💬 \"balance de mayo ♡\"\n🏷 ver post\n⏱ 1 min\n\nSTORY 3 · 21:00 · pregunta\n🎨 fondo crema\n💬 \"¿con qué te quedas tú de tu mayo?\"\n🏷 caja pregunta IG\n⏱ 1 min\n\nSTORY 4 · 22:00 · cierre\n🎨 fondo rosa serif italic\n💬 \"junio · capítulo nuevo ♡ buenas noches\"\n🏷 corazón\n⏱ 90 seg"}], "li": [ {"i": "li-2026-06-02", "m": "junio", "w": 1, "d": "2026-06-02", "day": "Martes", "ds": "2 jun", "tm": "09:00", "t": "post texto", "ti": "cuándo buscar ayuda", "h": "hay momentos en que la autoayuda no basta ♡"}, {"i": "li-2026-06-09", "m": "junio", "w": 2, "d": "2026-06-09", "day": "Martes", "ds": "9 jun", "tm": "09:00", "t": "post texto", "ti": "mito laboral", "h": "'manda cvs y algo saldrá' ya no funciona ♡"}, {"i": "li-2026-06-16", "m": "junio", "w": 3, "d": "2026-06-16", "day": "Martes", "ds": "16 jun", "tm": "09:00", "t": "post texto", "ti": "tip entrevista", "h": "lo que nadie te dice sobre negociar salario ♡"}, {"i": "li-2026-06-23", "m": "junio", "w": 4, "d": "2026-06-23", "day": "Martes", "ds": "23 jun", "tm": "09:00", "t": "post + imagen", "ti": "teaser asesoría", "h": "en julio lanzo algo que llevo meses preparando ♡"}, {"i": "li-2026-06-30", "m": "junio", "w": 5, "d": "2026-06-30", "day": "Martes", "ds": "30 jun", "tm": "09:00", "t": "post texto", "ti": "pre-lanzamiento asesoría", "h": "algunas personas necesitan más que un ebook ♡"}, {"i": "li-2026-07-07", "m": "julio", "w": 2, "d": "2026-07-07", "day": "Martes", "ds": "7 jul", "tm": "09:00", "t": "post + imagen", "ti": "lanzamiento asesoría", "h": "hoy abro plazas para asesorías 1:1 ♡"}, {"i": "li-2026-07-14", "m": "julio", "w": 3, "d": "2026-07-14", "day": "Martes", "ds": "14 jul", "tm": "09:00", "t": "post", "ti": "testimonio", "h": "lo que dice quien ya pasó por la sesión ♡"}, {"i": "li-2026-07-21", "m": "julio", "w": 4, "d": "2026-07-21", "day": "Martes", "ds": "21 jul", "tm": "09:00", "t": "post texto", "ti": "reflexión verano", "h": "descansar también es productivo ♡"}, {"i": "li-2026-07-28", "m": "julio", "w": 5, "d": "2026-07-28", "day": "Martes", "ds": "28 jul", "tm": "09:00", "t": "post texto", "ti": "desconexión", "h": "agosto es para parar de verdad ♡"}, {"i": "li-2026-08-04", "m": "agosto", "w": 2, "d": "2026-08-04", "day": "Martes", "ds": "4 ago", "tm": "09:00", "t": "post", "ti": "behind scenes", "h": "así trabajo en agosto ♡"}, {"i": "li-2026-08-11", "m": "agosto", "w": 3, "d": "2026-08-11", "day": "Martes", "ds": "11 ago", "tm": "09:00", "t": "post texto", "ti": "tip vuelta", "h": "cómo preparar la vuelta sin ansiedad ♡"}, {"i": "li-2026-08-18", "m": "agosto", "w": 4, "d": "2026-08-18", "day": "Martes", "ds": "18 ago", "tm": "09:00", "t": "post", "ti": "teaser septiembre", "h": "septiembre viene con energía ♡"}, {"i": "li-2026-08-25", "m": "agosto", "w": 5, "d": "2026-08-25", "day": "Martes", "ds": "25 ago", "tm": "09:00", "t": "post texto", "ti": "vuelta al trabajo", "h": "septiembre es el nuevo enero laboral ♡"}, {"i": "li-2026-09-01", "m": "septiembre", "w": 1, "d": "2026-09-01", "day": "Martes", "ds": "1 sep", "tm": "09:00", "t": "post texto", "ti": "salud mental", "h": "hoy es el día de la salud mental y quiero hablar de trabajo ♡"}, {"i": "li-2026-09-08", "m": "septiembre", "w": 2, "d": "2026-09-08", "day": "Martes", "ds": "8 sep", "tm": "09:00", "t": "post", "ti": "sesión única vs largo", "h": "cuándo necesitas acompañamiento largo ♡"}, {"i": "li-2026-09-15", "m": "septiembre", "w": 3, "d": "2026-09-15", "day": "Martes", "ds": "15 sep", "tm": "09:00", "t": "post", "ti": "teaser acompañamiento", "h": "en octubre abro algo nuevo ♡"}, {"i": "li-2026-09-22", "m": "septiembre", "w": 4, "d": "2026-09-22", "day": "Martes", "ds": "22 sep", "tm": "09:00", "t": "post texto", "ti": "educativo acompañamiento", "h": "qué es un acompañamiento profesional ♡"}, {"i": "li-2026-09-29", "m": "septiembre", "w": 5, "d": "2026-09-29", "day": "Martes", "ds": "29 sep", "tm": "09:00", "t": "post texto", "ti": "salud mental laboral", "h": "día de la salud mental: normalicemos hablar de esto ♡"}, {"i": "li-2026-10-06", "m": "octubre", "w": 2, "d": "2026-10-06", "day": "Martes", "ds": "6 oct", "tm": "09:00", "t": "post + imagen", "ti": "lanzamiento acompañamiento", "h": "abro 3-5 plazas de acompañamiento ♡"}, {"i": "li-2026-10-13", "m": "octubre", "w": 3, "d": "2026-10-13", "day": "Martes", "ds": "13 oct", "tm": "09:00", "t": "post", "ti": "testimonio acompañamiento", "h": "lo que dicen quienes ya pasaron por esto ♡"}, {"i": "li-2026-10-20", "m": "octubre", "w": 4, "d": "2026-10-20", "day": "Martes", "ds": "20 oct", "tm": "09:00", "t": "post", "ti": "latinas inspiradoras", "h": "mujeres latinas que me inspiran ♡"}, {"i": "li-2026-10-27", "m": "octubre", "w": 5, "d": "2026-10-27", "day": "Martes", "ds": "27 oct", "tm": "09:00", "t": "post", "ti": "black friday", "h": "oferta especial esta semana ♡"}, {"i": "li-2026-11-03", "m": "noviembre", "w": 2, "d": "2026-11-03", "day": "Martes", "ds": "3 nov", "tm": "09:00", "t": "post texto", "ti": "acoso laboral 25N", "h": "hoy 25N hablemos de límites en el trabajo ♡"}, {"i": "li-2026-11-10", "m": "noviembre", "w": 3, "d": "2026-11-10", "day": "Martes", "ds": "10 nov", "tm": "09:00", "t": "post", "ti": "cierre noviembre", "h": "noviembre ha sido intenso ♡"}, {"i": "li-2026-11-17", "m": "noviembre", "w": 4, "d": "2026-11-17", "day": "Martes", "ds": "17 nov", "tm": "09:00", "t": "post texto", "ti": "balance anual", "h": "12 meses de dramas laborales ♡"}, {"i": "li-2026-11-24", "m": "noviembre", "w": 5, "d": "2026-11-24", "day": "Martes", "ds": "24 nov", "tm": "09:00", "t": "post", "ti": "gratitud", "h": "gracias por este año ♡"}, {"i": "li-2026-12-01", "m": "diciembre", "w": 1, "d": "2026-12-01", "day": "Martes", "ds": "1 dic", "tm": "09:00", "t": "post", "ti": "oferta navidad", "h": "regala orientación laboral ♡"}, {"i": "li-2026-12-08", "m": "diciembre", "w": 2, "d": "2026-12-08", "day": "Martes", "ds": "8 dic", "tm": "09:00", "t": "post texto", "ti": "propósitos 2027", "h": "propósitos laborales para 2027 ♡"}, {"i": "50", "d": "2026-05-05", "m": "mayo", "w": 1, "day": "mar", "tm": "09:00", "ti": "el \"no\" de operación triunfo que cambió la carrera de Lola Índigo", "cp": "2017. Operación Triunfo. La rechazan.\n\nPodía haberlo dejado ahí. No lo dejó.\n\n→ siguió bailando como coreógrafa para otros artistas\n→ 2019: estrenó \"ya no quiero ná\" · #1 en Spotify España\n→ 2025: llena el Wizink Center\n\nLo que dijo en una entrevista reciente:\n\"creo que no entrar en OT fue lo mejor que me pudo pasar\"\n\n¿Qué \"no\" reciente estás interpretando como un fracaso?\n\nProbablemente sea tu plot twist.\n\n#carreraprofesional #orientacionlaboral #liderazgo"}, {"i": "51", "d": "2026-05-07", "m": "mayo", "w": 1, "day": "jue", "tm": "09:00", "ti": "5 cosas que NO te enseñaron en la universidad sobre el primer trabajo", "cp": "Llevo 1 año en mi primer empleo. Esto es lo que la universidad NO me enseñó:\n\n1. Tu primer sueldo se va en bizum entre amigos. Necesitas Excel.\n\n2. Los emails se contestan, NO se redactan novelas.\n\n3. \"Estoy disponible para una llamada rápida\" NUNCA es una llamada rápida.\n\n4. El primer \"no es nada personal\" duele MÁS que un \"estás despedida\".\n\n5. Tu calendario PERSONAL existe igual que el laboral.\n\nSi estás empezando · guárdalo.\nSi llevas tiempo · seguro que asientes.\n\n¿Qué cosa NO te enseñaron y descubriste sola?\n\n#primertrabajo #carreraprofesional #recursos humanos"}, {"i": "52", "d": "2026-05-12", "m": "mayo", "w": 2, "day": "mar", "tm": "09:00", "ti": "cómo ROSALÍA pivota sin pedir permiso · y por qué importa para tu carrera", "cp": "Rosalía empezó cantando flamenco. \n\nCatalana, formación clásica, 7 años de academia.\n\nY un día dijo: \"voy a meterle trap, y reggaeton, y experimental.\"\n\n→ El flamenco purista la criticó.\n→ El público mundial la abrazó.\n→ 4 Grammys Latinos después, sigue mezclando.\n\nSu frase clave en una entrevista de NPR:\n\"no estoy traicionando el flamenco · estoy expandiéndolo\"\n\nAplicado a tu carrera profesional:\n\n→ no estás traicionando tu CV cuando pivotas\n→ estás expandiéndolo\n→ no esperes a que TE den permiso · pivota\n→ tu narrativa la escribes tú\n\n¿Qué pivote estás aplazando porque crees necesitar permiso?\n\n#carreraprofesional #cambiodecarrera #liderazgofemenino"}, {"i": "53", "d": "2026-05-14", "m": "mayo", "w": 2, "day": "jue", "tm": "09:00", "ti": "el síndrome del impostor NO se va · se gestiona", "cp": "Te dicen: \"eso pasa al principio, luego se va\"\n\nMENTIRA.\n\nEl síndrome del impostor no se va. Se gestiona.\n\n→ Lo siente la junior recién contratada.\n→ Lo siente la senior con 10 años de experiencia.\n→ Lo siente la CEO que dirige a 500 personas.\n\nLa diferencia entre una y otra NO es que dejen de sentirlo.\n\nEs que aprenden a NO creérselo todo.\n\n3 cosas que SÍ ayudan:\n\n1. Anota cada vez que recibas feedback positivo · concreto · tu cabeza no lo guarda solo\n2. Habla con personas un peldaño POR DELANTE de ti · no por debajo\n3. Acepta que vas a empezar las cosas SIN sentirte preparada · ese es el plan\n\n¿Qué cosa estás aplazando porque \"aún no estás lista\"?\n\nDile a tu impostor que tome asiento. Tú vas igual.\n\n#sindromedelimpostor #liderazgofemenino"}, {"i": "54", "d": "2026-05-19", "m": "mayo", "w": 3, "day": "mar", "tm": "09:00", "ti": "Frida Kahlo pintó 150 obras desde la cama · qué nos enseña sobre crear con limitaciones", "cp": "Cuando tenía 18 años, Frida Kahlo sufrió un accidente de autobús.\n\n30 fracturas. Meses inmovilizada en cama.\n\nLe pusieron un espejo en el techo. Empezó a pintarse a sí misma. No había otro modelo.\n\n→ 150 obras a lo largo de su vida.\n→ 55 son autorretratos.\n\nSu frase:\n\"pinto autorretratos porque estoy mucho tiempo sola · y porque soy el motivo que mejor conozco\"\n\nLo que enseña esto sobre tu carrera profesional:\n\n→ tu limitación puede ser tu firma\n→ no esperes \"el momento perfecto\" para crear\n→ trabaja desde donde estás · no desde donde \"deberías\" estar\n\n¿Qué obra TUYA estás aplazando porque NO es el momento perfecto?\n\nEmpezar desde el caos también es empezar.\n\n#carreraprofesional #creatividad #mujeres"}, {"i": "55", "d": "2026-05-21", "m": "mayo", "w": 3, "day": "jue", "tm": "09:00", "ti": "tu CV NO es tu vida laboral · es lo que TE CONVIENE contar", "cp": "Llevo semanas viendo CVs en LinkedIn que parecen rendiciones de cuentas.\n\nTu CV es un instrumento DE TI · no SOBRE TI.\n\nSignifica esto:\n\n→ no tienes que listar TODOS tus empleos · solo los relevantes\n→ los gaps NO son delito · pueden no estar\n→ los empleos malos no tienen que aparecer\n→ tú decides qué se ve · y qué no\n\nLa pregunta correcta NO es \"¿qué pongo?\"\n\nEs: \"¿qué quiero que mi próximo entrevistador entienda sobre mí?\"\n\nCuenta esa historia · NO la rendición de cuentas.\n\n¿Qué cosa de tu CV estás manteniendo \"porque siempre estuvo ahí\"?\n\nIgual es momento de quitarla.\n\n#cv #busquedadeempleo"}, {"i": "56", "d": "2026-05-26", "m": "mayo", "w": 4, "day": "mar", "tm": "09:00", "ti": "Margarita Salas · la mujer que cambió la biología molecular en España", "cp": "En los años 60, una mujer en ciencia era una excepción.\n\nMargarita Salas estudió química. Asturiana. Discípula de Severo Ochoa.\n\nEn 1989 descubrió la enzima del fago Φ29.\n\nEsa enzima permite copiar el ADN miles de veces. Hoy se usa en miles de laboratorios del mundo. Es la patente más rentable del CSIC.\n\nSu frase:\n\"el conocimiento es lo único que se multiplica al compartirlo\"\n\nTrabajó hasta los 80. Investigó cosas pequeñas que cambiaron lo grande.\n\nAplicado a TU carrera profesional:\n\n→ no esperes a que el mundo cambie para empezar\n→ las cosas grandes son cosas pequeñas hechas con constancia\n→ mentora alguien · enseña · multiplica\n\n¿Qué cosa pequeña estás haciendo TÚ · que igual mañana cambia algo grande?\n\n#mujeresenciencia #carreraprofesional #liderazgo"}, {"i": "57", "d": "2026-05-28", "m": "mayo", "w": 4, "day": "jue", "tm": "09:00", "ti": "la perspectiva que da estar lejos de tu rutina", "cp": "Estoy escribiendo este post desde un hotel a 7000km de mi casa.\n\nY desde aquí · veo claras cosas que en Madrid no veía.\n\n3 preguntas que solo te haces lejos:\n\n→ Mi rutina · ¿es la que quiero · o la que heredé?\n→ Mi calendario · ¿lo lleno yo · o me lo llenan?  \n→ Mi proyecto · ¿avanza · o solo se mueve?\n\nSi llevas mucho tiempo sin hacerte preguntas grandes · este post es para ti.\n\nA veces el cambio de escenario es lo que tu cabeza necesita.\n\n¿Qué cosa de tu rutina actual cambiarías HOY si pudieras?\n\n#carreraprofesional #trabajoremoto #perspectiva"}], "ss": [ {"i": "ss-2026-06-07", "m": "junio", "d": "2026-06-07", "ds": "7 jun", "tm": "10:00", "ti": "educativo", "su": "cuándo buscar ayuda profesional", "se": "señales + opciones"}, {"i": "ss-2026-06-14", "m": "junio", "d": "2026-06-14", "ds": "14 jun", "tm": "10:00", "ti": "teaser", "su": "algo viene en julio ✧", "se": "teaser asesoría + qué esperar"}, {"i": "ss-2026-06-21", "m": "junio", "d": "2026-06-21", "ds": "21 jun", "tm": "10:00", "ti": "san juan", "su": "quemar lo que no funciona", "se": "reflexión + ejercicio"}, {"i": "ss-2026-06-28", "m": "junio", "d": "2026-06-28", "ds": "28 jun", "tm": "10:00", "ti": "pre-launch asesoría", "su": "la semana que viene abro algo", "se": "asesoría teaser final"}, {"i": "ss-2026-07-05", "m": "julio", "d": "2026-07-05", "ds": "5 jul", "tm": "10:00", "ti": "lanzamiento asesoría", "su": "hoy abro plazas asesoría ♡", "se": "anuncio + detalles + link"}, {"i": "ss-2026-07-12", "m": "julio", "d": "2026-07-12", "ds": "12 jul", "tm": "10:00", "ti": "valor post-launch", "su": "lo que aprendí esta semana", "se": "reflexiones post-lanzamiento"}, {"i": "ss-2026-07-19", "m": "julio", "d": "2026-07-19", "ds": "19 jul", "tm": "10:00", "ti": "autocuidado", "su": "cuidarte es parte del trabajo", "se": "día autocuidado + tip"}, {"i": "ss-2026-07-26", "m": "julio", "d": "2026-07-26", "ds": "26 jul", "tm": "10:00", "ti": "verano", "su": "agosto es para parar", "se": "permiso para descansar"}, {"i": "ss-2026-08-02", "m": "agosto", "d": "2026-08-02", "ds": "2 ago", "tm": "10:00", "ti": "ligero", "su": "lo mejor del verano", "se": "recopilación + reflexión"}, {"i": "ss-2026-08-09", "m": "agosto", "d": "2026-08-09", "ds": "9 ago", "tm": "10:00", "ti": "festivo", "su": "desde el descanso ♡", "se": "contenido suave"}, {"i": "ss-2026-08-16", "m": "agosto", "d": "2026-08-16", "ds": "16 ago", "tm": "10:00", "ti": "vuelta", "su": "preparando septiembre", "se": "tips vuelta + energía"}, {"i": "ss-2026-08-23", "m": "agosto", "d": "2026-08-23", "ds": "23 ago", "tm": "10:00", "ti": "cierre agosto", "su": "balance del verano", "se": "logros + próximos pasos"}, {"i": "ss-2026-08-30", "m": "agosto", "d": "2026-08-30", "ds": "30 ago", "tm": "10:00", "ti": "vuelta", "su": "septiembre es tu nuevo enero", "se": "energía renovada + plan"}, {"i": "ss-2026-09-06", "m": "septiembre", "d": "2026-09-06", "ds": "6 sep", "tm": "10:00", "ti": "salud mental", "su": "hablemos de trabajo y mente", "se": "día salud mental"}, {"i": "ss-2026-09-13", "m": "septiembre", "d": "2026-09-13", "ds": "13 sep", "tm": "10:00", "ti": "teaser acompañamiento", "su": "octubre viene con algo nuevo", "se": "acompañamiento teaser"}, {"i": "ss-2026-09-20", "m": "septiembre", "d": "2026-09-20", "ds": "20 sep", "tm": "10:00", "ti": "cierre q3", "su": "9 meses de dramas laborales", "se": "balance trimestre"}, {"i": "ss-2026-09-27", "m": "septiembre", "d": "2026-09-27", "ds": "27 sep", "tm": "10:00", "ti": "educativo", "su": "sesión única vs proceso largo", "se": "cuándo necesitas qué"}, {"i": "ss-2026-10-04", "m": "octubre", "d": "2026-10-04", "ds": "4 oct", "tm": "10:00", "ti": "salud mental", "su": "día mundial de la salud mental", "se": "reflexión profunda"}, {"i": "ss-2026-10-11", "m": "octubre", "d": "2026-10-11", "ds": "11 oct", "tm": "10:00", "ti": "pre-launch", "su": "la semana que viene abro plazas", "se": "último teaser"}, {"i": "ss-2026-10-18", "m": "octubre", "d": "2026-10-18", "ds": "18 oct", "tm": "10:00", "ti": "lanzamiento", "su": "3-5 plazas abiertas ♡", "se": "acompañamiento"}, {"i": "ss-2026-10-25", "m": "octubre", "d": "2026-10-25", "ds": "25 oct", "tm": "10:00", "ti": "descanso", "su": "desde el puente ✧", "se": "reflexión tranquila"}, {"i": "ss-2026-11-01", "m": "noviembre", "d": "2026-11-01", "ds": "1 nov", "tm": "10:00", "ti": "latam", "su": "talento latino que inspira", "se": "latin grammy + historias"}, {"i": "ss-2026-11-08", "m": "noviembre", "d": "2026-11-08", "ds": "8 nov", "tm": "10:00", "ti": "educativo", "su": "qué producto es para ti", "se": "comparativa + guía"}, {"i": "ss-2026-11-15", "m": "noviembre", "d": "2026-11-15", "ds": "15 nov", "tm": "10:00", "ti": "black friday", "su": "oferta especial ♡", "se": "descuentos + urgencia"}, {"i": "ss-2026-11-22", "m": "noviembre", "d": "2026-11-22", "ds": "22 nov", "tm": "10:00", "ti": "25N", "su": "límites en el trabajo", "se": "reflexión sensible"}, {"i": "ss-2026-11-29", "m": "noviembre", "d": "2026-11-29", "ds": "29 nov", "tm": "10:00", "ti": "balance", "su": "12 meses de esto", "se": "resumen año"}, {"i": "ss-2026-12-06", "m": "diciembre", "d": "2026-12-06", "ds": "6 dic", "tm": "10:00", "ti": "gratitud", "su": "gracias por estar ♡", "se": "carta personal"}, {"i": "ss-2026-12-13", "m": "diciembre", "d": "2026-12-13", "ds": "13 dic", "tm": "10:00", "ti": "navidad", "su": "felices fiestas ✧", "se": "reflexión + descanso"}, {"i": "ss-2026-12-20", "m": "diciembre", "d": "2026-12-20", "ds": "20 dic", "tm": "10:00", "ti": "propósitos", "su": "2027: lo que viene", "se": "visión + planes"}, {"i": "50", "d": "2026-05-03", "m": "mayo", "w": 1, "day": "dom", "tm": "10:00", "su": "creías que lanzar algo era suficiente · spoiler · no", "cp": "Hola ♡\n\nLlevo unos días pensando en algo que me dijo una lectora del ebook esta semana.\n\nMe escribió: \"empecé el plan de 30 días el lunes y por primera vez en meses sentí que avanzaba sin agobio\".\n\nY ahí me di cuenta de algo importante.\n\n★\n\nNo era el plan en sí.\nEra que por fin tenía permiso para avanzar despacio.\n\nPorque vivimos en una cultura laboral que nos pide:\nrevolución constante.\ncambio inmediato.\nresultados ya.\n\nY luego nos preguntamos por qué estamos quemadas.\n\n★\n\nTe lo digo sin drama: las grandes revoluciones NO caben en una semana.\n\nLas grandes revoluciones se construyen con micro-acciones sostenidas. Día tras día. Sin épica. Sin gurús. Sin transformaciones de 7 días.\n\n(las que prometen eso, suelen vender humo.)\n\n★\n\nLo aprendí a la mala.\n\nDurante años intenté \"cambiarlo todo\" cada vez que algo no me funcionaba. Cambiar de trabajo. De ciudad. De rutina. De prioridades.\n\nResultado:\n— mucho ruido\n— poca dirección\n— y la sensación constante de empezar de cero\n\n★\n\nEl ebook nació exactamente de eso.\n\nDe entender que para cambiar tu vida laboral NO necesitas una revolución.\n\nNecesitas:\n— claridad sobre qué te bloquea de verdad\n— un plan que puedas sostener un martes random a las 18h cuando estás cansada\n— y permiso para ir despacio\n\n(spoiler: el permiso te lo das tú.)\n\n★\n\nY aquí viene lo incómodo:\n\nLa industria del \"crecimiento personal\" te vende la urgencia.\nPorque la urgencia vende.\n\nPero los cambios que duran NO son urgentes. Son sostenidos.\n\nY la diferencia entre los dos es enorme:\n\n— el cambio urgente dura 3 semanas y se rompe\n— el cambio sostenido es invisible los primeros 2 meses y luego es irreversible\n\n★\n\nSi llevas meses notando que algo no encaja en tu vida laboral pero te bloqueas cada vez que intentas \"hacer algo grande\":\n\nNO es falta de motivación.\nNi pereza.\nNi que no sirvas.\n\nEs que estás aplicando la lógica equivocada.\n\nLa lógica del cambio sostenido es la del 1% diario. La de la pregunta pequeña. La del paso minúsculo que parece ridículo pero suma.\n\n★\n\nEsta semana, si quieres probar algo:\n\nElige UNA cosa minúscula que llevas tiempo postergando en tu carrera.\n\nNO \"reescribir mi CV\".\nSÍ \"actualizar mi titular en LinkedIn\".\n\nNO \"cambiar de trabajo\".\nSÍ \"agendar 15 min para mirar 3 ofertas que me llamen\".\n\nNO \"emprender\".\nSÍ \"escribir 200 palabras sobre lo que sé hacer\".\n\nLa clave está en hacerlo TAN pequeño que no puedas decir que no.\n\n★\n\nY si hoy NO puedes con eso tampoco:\n\nNO estás fallando.\nEstás descansando.\n\nLas dos cosas son válidas.\n\n★\n\n🎧 La canción de esta semana: \"Espresso\" — Sabrina Carpenter\n\nSí, sé que esta canción se escuchó 47.000 veces en 2024. Pero la pongo a propósito.\n\nPorque Sabrina llevaba 10 AÑOS sacando música antes de que \"Espresso\" la convirtiera en estrella global. Empezó en Disney Channel a los 15. Sacó 4 álbumes seguidos sin éxito. Cambió de sello en 2021. Telonó a Taylor Swift.\n\nY luego, abril 2024, una canción cualquiera sobre cafés se convirtió en su breakthrough.\n\n10 años. La paciencia se nota cuando llega el momento.\n\n(piénsalo cuando te bloquees pensando que vas tarde.)\n\n¡Gracias por leerme! ★\n\nUn abrazo,\nIrene 💌\n\n— Instagram / Substack / LinkedIn", "ti": "el plan de 30 días que nunca te enseñan en LinkedIn", "se": "carta honesta sobre el lanzamiento del ebook · 28 clics 0 ventas · reframe: no es rechazo es distancia", "gh": "porque las grandes revoluciones no caben en una semana ★", "de": "EMAIL NEWSLETTER · domingo 11h\n\nestructura:\n· saludo cálido\n· hook personal sobre tema\n· desarrollo con ★ entre bloques\n· lista con guiones largos\n· reframe potente\n· cierre afirmativo\n· canción + firma\n\nlongitud: 600-900 palabras (largura de tu newsletter habitual)"}, {"i": "51", "d": "2026-05-03", "m": "mayo", "w": 1, "day": "dom", "tm": "10:00", "su": "lo que mi madre me enseñó sobre el trabajo decente", "cp": "Hola ♡\n\nHoy es día de la madre.\n\nY este email iba a ir de otra cosa, pero me he despertado pensando en mi madre y no he podido escribir sobre nada más.\n\n★\n\nMi madre nunca leyó un libro de orientación profesional.\n\nNunca ha tenido un LinkedIn. No sabe lo que es un \"side hustle\". Si le hablo de \"personal branding\" me mira raro y me dice \"hija, qué cosas\".\n\nY aún así, todo lo que escribo en Dramas Laborales tiene su sello.\n\n★\n\nMe enseñó cosas que NADIE me enseñó después.\n\n— Que decir \"no\" no es ser maleducada. Es saber cuidarte.\n\n— Que un trabajo no te define. Te alimenta. Y a veces te enseña. Pero NO eres tu trabajo.\n\n— Que cuando algo te hace daño, lo importante NO es \"aguantar más\". Es entender por qué te hace daño.\n\n— Que el dinero NO es vulgar pedirlo. Lo vulgar es trabajar gratis.\n\n— Que la gente que te quiere bien NO te pide explicaciones cada vez que pones un límite.\n\n— Que llorar después de un mal día en el trabajo NO te hace débil. Te hace humana.\n\n★\n\nY te lo digo sin drama: ella no me decía estas cosas en plan máxima de coach.\n\nMe las decía en frases sueltas, en momentos cotidianos, mientras cocinaba o conducía o doblábamos sábanas.\n\nMe las decía con su FORMA de vivir.\n\nQue es como se enseñan las cosas importantes, en realidad.\n\n★\n\nDurante mucho tiempo pensé que la orientación laboral era algo que se aprendía en libros. En cursos. En LinkedIn.\n\nAhora entiendo que la base la aprendí en casa.\n\nY que muchas de las que me leéis probablemente la aprendisteis también. De vuestras madres. De vuestras abuelas. De vuestras tías. De alguien que sin saberlo, sin vocación de \"mentora\", os enseñó lo más importante:\n\nque tenéis valor.\nque vuestro tiempo importa.\nque podéis decir que no.\nque trabajar NO es sobrevivir.\n\n★\n\nY aquí viene lo incómodo:\n\nMuchas de nosotras hemos sido criadas por mujeres que NO pudieron aplicarse a sí mismas las lecciones que nos enseñaron.\n\nMujeres que sabían que merecían más, pero que vivieron en una época en la que pedirlo era casi imposible.\n\nMujeres que querían cambiar de trabajo y no pudieron.\nQuerían estudiar y no pudieron.\nQuerían independizarse y no pudieron.\n\nY aún así, NOS enseñaron a nosotras a poder.\n\n★\n\nEso es la transmisión silenciosa.\n\nLa que NO aparece en libros de éxito.\nLa que NO se mide en KPIs.\nLa que NO se ve en LinkedIn.\n\nPero es la que sostiene generaciones.\n\n★\n\nSi tu madre vive · llámala hoy. Aunque sea para decirle algo tonto.\n\nSi no vive · recuerda algo que te enseñó. Aunque fuera pequeño.\n\nSi tu relación con ella es complicada · busca a esa otra mujer que también te formó. La tía. La amiga de tu madre. La profesora. La jefa que te marcó. La hermana mayor.\n\nDonde quiera que esté, ella es tu primer Dramas Laborales.\n\n★\n\n🎧 La canción de esta semana: \"Mojaita\" — Lola Indigo\n\nSé que parece una canción de verano sin más. Pero escuchadla con mi historia: Lola fue expulsada de Operación Triunfo en la primera gala. La primera. Y antes (2010) ya la habían expulsado de \"Fama ¡A bailar!\" con un \"eres un estorbo para mi vista\" en TV nacional.\n\nHoy llena el WiZink. Y en julio 2025 sacó \"Mojaita\" · la canción del verano pasado.\n\n¿Por qué la pongo en un email del día de la madre?\n\nPorque pienso en lo orgullosa que estará SU madre. La que la aguantó cuando volvió expulsada. La que la sostuvo cuando todo el mundo decía que se quedara como bailarina. La que NO le dijo \"búscate algo serio\".\n\nHoy va por ellas. Por las que sostuvieron antes de que entendiéramos para qué.\n\n★\n\n¡Gracias por leerme! ★\n\nUn abrazo,\nIrene 💌\n\n— Instagram / Substack / LinkedIn", "ti": "lo que mi madre me enseñó sin saber que lo hacía", "gh": "feliz día a las que sostienen en silencio ★", "de": "EMAIL NEWSLETTER · domingo 11h\n\nestructura:\n· saludo cálido (es día de la madre)\n· anécdota personal con tu madre\n· lecciones laborales aprendidas\n· reframe sobre maternidad y trabajo\n· cierre con dedicatoria\n· canción + firma\n\nlongitud: 600-800 palabras"}, {"i": "52", "d": "2026-05-17", "m": "mayo", "w": 3, "day": "dom", "tm": "10:00", "su": "una semana antes de mi primer viaje \"de proyecto\" · pre-nervios", "cp": "Hola ♡\n\nEsta semana abrí caja de preguntas y leí más de 50 respuestas.\n\nY he salido de ahí con la cabeza llena.\n\n★\n\nNO voy a deciros qué me dijeron, una a una, porque sería romper la confianza.\n\nPero sí voy a contaros qué patrones se repitieron.\n\nPorque cuando lees 50 testimonios de mujeres profesionales en una semana, empiezas a ver cosas. Cosas que dejan de parecer individuales y se convierten en estructurales.\n\n★\n\nLos 5 más repetidos:\n\n— \"Siento que llevo años atrasada respecto a otras\".\n(Esto lo dijeron mujeres de 26, 31, 38, 45 y 52 años. La sensación NO depende de la edad. Depende de la comparación.)\n\n— \"No puedo permitirme dejar mi trabajo aunque me esté haciendo daño\".\n(En la mayoría de casos, sí podrían si lo planificaran. Pero el miedo financiero es real y NO se discute. Lo que sí se trabaja es la planificación · NO el miedo.)\n\n— \"Cuando pienso en cambiar, me bloqueo\".\n(El bloqueo siempre tiene un nombre. Y casi siempre es: identidad. \"Si NO soy esto, ¿qué soy?\". Y aquí · sin terapia · suele ser difícil avanzar.)\n\n— \"NO valgo lo suficiente para pedir más sueldo\".\n(Aquí lo curioso: suelen ser las mujeres MÁS cualificadas las que dicen esto. NO es casualidad. La cualificación sin reconocimiento externo se convierte en duda interna.)\n\n— \"NO sé qué quiero, solo sé que esto NO\".\n(Esta es probablemente la sensación más sana de todas. Aunque no lo parezca. Porque saber qué NO quieres es el primer paso para saber qué SÍ. Lleva su tiempo. Pero llega.)\n\n★\n\nY aquí viene lo incómodo:\n\nNinguna de estas 5 frases es individual.\n\nTodas están atravesadas por algo más grande:\nla forma en que se nos ha enseñado a relacionarnos con el trabajo.\n\n— El mandato de la productividad infinita.\n— La promesa de que \"si te esfuerzas lo consigues\" (NO siempre).\n— La idea de que la duda es debilidad (es información).\n\nY ninguna de las tres es verdad del todo.\n\n★\n\nLeer estas respuestas me hizo darme cuenta de algo:\n\nLa mayoría de mujeres NO necesitamos que nos digan qué hacer.\n\nNecesitamos:\n— que nos crean cuando decimos que algo no va bien\n— que nos digan que NO estamos exagerando\n— que nos validen el cansancio sin pedirnos productividad inmediata\n— que nos recuerden que pensar también es trabajar\n\n★\n\nDurante mucho tiempo pensé que para ayudar había que dar consejos.\n\nAhora pienso que para ayudar hay que escuchar primero.\nY luego, si acaso, dar perspectiva.\n\nNO soluciones.\nPerspectiva.\n\nQue son cosas distintas.\n\n★\n\nUna de las cosas que más me dijisteis esta semana fue:\n\n\"solo leerlo me ha tranquilizado\".\n\nY pensé: ojalá pudiera mandarte esto cada domingo. Solo para que sepas que NO estás sola en esto.\n\nQue lo que sientes lo sienten muchas más.\nQue las dudas que tienes las tienen muchas más.\nQue el cansancio que llevas, también.\n\n★\n\nEsta semana, una micro-tarea:\n\nMándale un mensaje a UNA mujer que admires profesionalmente.\n\nNO le pidas nada.\nNO le des consejos.\n\nSolo dile: \"te leo · te veo · te admiro · sigue\".\n\nA veces el regalo más grande que le puedes hacer a otra mujer en tu sector es ese:\n\nrecordarle que la ven.\n\n★\n\nPorque trabajar es muchas cosas. Pero hacerlo en silencio, sin que nadie te vea, es la receta para apagarse.\n\nY ya hay demasiadas mujeres apagándose en silencio.\n\n★\n\n🎧 La canción de esta semana: \"Manchild\" — Sabrina Carpenter\n\nPor una razón muy específica:\n\n\"Manchild\" salió en junio 2025 y debutó directamente en el #1 del Billboard Hot 100. La canción habla de un ex inútil. De relaciones donde tú haces TODO el trabajo emocional.\n\nY leyendo vuestros mensajes esta semana, pensé en cuántas situaciones LABORALES son exactamente eso: tú haciendo el trabajo emocional, organizativo, mental, mientras alguien arriba se lleva el crédito.\n\nSi te has sentido \"siempre la responsable\" en el curro, escucha esta canción esta semana. Y baila. Aunque sea sola en la cocina.\n\n★\n\n¡Gracias por leerme! ★\n\nUn abrazo,\nIrene 💌\n\n— Instagram / Substack / LinkedIn", "ti": "lo que aprendí escuchando a 50 mujeres esta semana", "gh": "patrones que se repiten una y otra vez ★", "de": "EMAIL NEWSLETTER · domingo 11h\n\nestructura:\n· hook sobre lo escuchado en stories\n· lista con guiones largos de patrones\n· análisis honesto de cada uno\n· reframe sobre escuchar\n· cierre con micro-acción\n· canción + firma\n\nlongitud: 700-900 palabras"}, {"i": "53", "d": "2026-05-24", "m": "mayo", "w": 4, "day": "dom", "tm": "10:00", "su": "mañana me voy una semana · y os llevo conmigo", "cp": "Hola ♡\n\nMañana me voy una semana a República Dominicana.\n\nNO es la primera vez que me voy. NO es un viaje extraordinario. Pero hoy quiero hablar de algo que llevo meses pensando.\n\nPorque yo he sido durante años una de esas mujeres que postergaba viajes pensando que \"ahora no es el momento\".\n\nY voy a deciros sin drama: nunca es el momento.\n\nEl momento se elige.\n\n★\n\nDurante mucho tiempo pensé que viajar era un premio.\n\nAlgo que te ganabas cuando \"todo iba bien\" en el trabajo. Cuando habías acumulado vacaciones suficientes. Cuando podías permitírtelo \"sin culpa\".\n\nResultado: viajaba muy poco.\nY cuando viajaba, lo hacía con una mochila de tareas pendientes pesando más que la maleta real.\n\n★\n\nLuego entendí algo:\n\nViajar NO es premio. Es herramienta.\nNO es escape. Es expansión.\nNO es \"perder\" tiempo. Es ganar perspectiva.\n\nY perspectiva es lo que MÁS necesitas cuando estás atrapada en un ciclo laboral que NO te lleva a ningún sitio.\n\n★\n\nPorque cuando viajas:\n\n— dejas de ver tu vida desde dentro\n— sales del bucle del lunes-domingo\n— recuerdas que tu identidad NO es tu trabajo\n— te encuentras con versiones de ti misma que en tu rutina NO aparecen\n\n(la que negocia precios en otro idioma. La que improvisa cuando el plan falla. La que come sola sin sentirse rara. La que decide cosas sola.)\n\n★\n\nY aquí viene lo incómodo:\n\nViajar siendo mujer NO es siempre fácil.\n\nImplica planificación extra.\nIntuición afinada.\nLeer espacios.\nEscuchar la voz interna que te dice \"por aquí sí · por aquí no\".\n\nPero también implica:\nautonomía.\nconfianza ganada experiencia tras experiencia.\nseguridad interna que NADIE te puede quitar.\n\n★\n\nDe ahí viene esa mirada que tienen las mujeres viajeras.\n\nNO es presunción. NO es prepotencia.\n\nEs la calma de saber que has resuelto situaciones lejos de casa, sola, en otro idioma, en otra cultura. Y que volverías a hacerlo.\n\nEsa calma se nota antes de que abran la boca.\n\n★\n\nNO todas tenemos las mismas oportunidades para viajar.\n\nEso lo sé.\nNO lo voy a pintar bonito.\n\nPero también sé esto:\n\nLa primera vez que viajé sola fue a una ciudad española. 3 días. Tren barato. Hostal compartido.\n\nNO fue Bali. NO fue Tokio. NO fue Nueva York.\n\nFue Sevilla. En febrero. Con una bufanda y poco dinero.\n\nY cambió algo en mí que NO ha vuelto a su sitio.\n\n★\n\nEntonces si me preguntas qué deseo te dejo hoy, antes de irme:\n\nQue te plantees, esta semana, hacer un viaje pequeño.\n\nNO grande.\nNO lejos.\nNO caro.\n\nUno donde puedas estar SOLA contigo.\n\nUna escapada de fin de semana a otra ciudad.\nUn pueblo cercano que llevas tiempo queriendo ver.\nUna sola noche fuera de tu casa, en otro lugar, con otra cama.\n\nNO esperes a que llegue \"el momento\".\nEl momento se elige.\n\n★\n\nUna mujer que viaja, aunque sea poco, aunque sea cerca, aunque sea sola por primera vez con miedo:\n\nya NO es exactamente la misma cuando vuelve.\n\nY ese pequeño cambio, sostenido en el tiempo, es lo que construye la versión de ti que estás esperando ser.\n\n★\n\n🎧 La canción de esta semana: \"360\" — Charli XCX\n\nOs explico por qué.\n\n\"360\" salió en mayo 2024 como segundo sencillo de \"Brat\". El verano siguiente la canción y el álbum entero se convirtieron en fenómeno cultural. \"Brat Summer\". Verde lima. La palabra del año.\n\nPero antes de \"Brat\" · Charli llevaba 14 años haciendo música. Empezando en raves ilegales de Londres con 14 años.\n\n\"360\" tiene una línea que repite: \"I'm everywhere, I'm so Julia\". Y para mí esa frase resume lo que pasa cuando estás en plena expansión: estás en mil sitios a la vez · construyendo tu identidad en movimiento.\n\nMañana yo también voy a estar en mil sitios a la vez. En el aeropuerto. En el avión. En una playa. Trabajando. Descansando. Pensando en vosotras. Olvidándome de vosotras un rato.\n\nEsto también es Brat Summer · pero el laboral.\n\n★\n\nLa próxima semana os escribo desde la otra orilla.\n\nUn abrazo,\nIrene 💌\n\n— Instagram / Substack / LinkedIn", "ti": "el viaje no es escape · es expansión", "gh": "mañana me voy una semana a República Dominicana ★", "de": "EMAIL NEWSLETTER · domingo 11h · ESPECIAL pre-viaje\n\nestructura:\n· hook sobre el viaje que se acerca\n· anti-mito sobre viajar siendo mujer profesional\n· lecciones que aprende viajando\n· reframe sobre identidad viajera\n· cierre con la canción Karol G (porque ya la usaste pero sigue valiendo)\n· firma\n\nlongitud: 700-1000 palabras\n\nNOTA: este post conecta con tu Substack del 2 marzo \"mujeres que viajan\" pero NO lo repite · profundiza desde otra esquina"}, {"i": "54", "d": "2026-05-31", "m": "mayo", "w": 5, "day": "dom", "tm": "10:00", "su": "cierro mayo desde el avión · y os abro la puerta de junio", "cp": "Hola ♡\n\nEstoy escribiendo esto sentada en el aeropuerto de Punta Cana. Vuelo de vuelta a Barcelona en 3 horas.\n\nMaleta hecha. Café medio frío. Cabeza llena.\n\nMayo se cierra hoy. Y desde aquí, desde el otro lado, voy a contarte lo que aprendí.\n\n★\n\nMe propuse algo en abril:\n\npublicar todos los días en mayo, sin perder calidad, sin quemarme, y sin renunciar a vivir.\n\n¿Lo conseguí al 100%? Casi.\n¿Lo hice perfecto? NO.\n¿Aprendí cosas? Muchas.\n\n★\n\nLas tres más importantes:\n\n— La planificación es libertad. NO es control.\nSi planifico · puedo IRME al concierto, al viaje, al plan, sin culpa. Sin sentir que mi proyecto se está cayendo. Sin abrir el móvil cada 30 minutos.\n\n— La consistencia importa MÁS que la intensidad.\n31 posts \"buenos\" pesan más que 5 \"perfectos\". Lo aprendí a la mala. Mil veces. Mucho de lo que creemos \"perfecto\" es solo procrastinación con buen marketing.\n\n— Mi proyecto NO depende de mi motivación. Depende de mi sistema.\nY eso es lo único que sostiene a largo plazo. Porque la motivación va y viene. El sistema, no.\n\n★\n\nY aquí viene lo incómodo:\n\nLa consistencia NO es sexy.\n\nNO se publica en LinkedIn.\nNO se cuenta en stories.\nNO se aplaude en posts virales.\n\nLo que se aplaude es:\n— el lanzamiento épico\n— el cambio radical\n— la transformación de 21 días\n\nLa consistencia es lo que pasa entre todos esos hitos.\nLa rutina sin gloria.\nLa acción del martes que NADIE ve.\nEl NO rendirse cuando llevas 3 semanas sin notar resultados.\n\nPero es lo único que diferencia a quien construye algo de verdad de quien se queda en el intento.\n\n★\n\nEsta semana en República Dominicana lo he sentido.\n\nHe trabajado 3 horas al día desde un café con vista al mar.\nHe respondido emails con los pies en la arena (literalmente).\nHe visto cómo el contenido programado salía sin que yo lo tocara.\n\nY he entendido algo:\n\nel sistema NO es lo que te ata.\nes lo que te libera.\n\n★\n\nDurante años pensé que para tener libertad había que ser \"creativa\". Improvisar. Vivir sin estructura.\n\nHoy entiendo que es exactamente al revés.\n\nLa libertad ES estructura.\nBuena estructura.\nEstructura que te sostiene cuando estás cansada, viajando, enferma o desmotivada.\n\nLa improvisación pura NO es libertad.\nEs ansiedad disfrazada.\n\n★\n\n¿Qué me llevo de mayo?\n\nMe llevo:\n— una rutina de contenido que funciona\n— la confianza de que puedo viajar sin parar el proyecto\n— las primeras lectoras del ebook escribiéndome cosas que me emocionan\n— y una versión de mí más tranquila con el ritmo lento\n\n★\n\n¿Qué viene en junio?\n\nMe quiero atrever a algo.\n\nLlevo meses pensando en abrir asesorías 1:1.\nNO para todo el mundo.\nNO con prisa.\nNO para vender.\n\nPara conocer cara a cara a las mujeres que llevan meses leyéndome y escribirles algo de verdad útil.\n\nA las suscriptoras de esta newsletter os contaré primero.\nComo siempre.\n\nQuédate cerca.\n\n★\n\nY si tú también cierras mayo un poco diferente a como lo empezaste:\n\nNO es casualidad.\n\nEs el efecto acumulativo de las cosas pequeñas.\n\nLas que pareció que no servían cuando las empezaste.\nLas que se sintieron ridículas la primera vez.\nLas que casi abandonas en la semana 2.\n\nEsas.\n\nEsas son las que cambian la vida.\nNO los planes épicos.\n\n★\n\n🎧 La canción de esta semana: \"Apple\" — Charli XCX\n\nOs explico por qué esta concretamente.\n\n\"Apple\" es una canción del álbum \"Brat\" en la que Charli habla de la herencia familiar. De lo que recibimos de nuestras madres sin pedirlo. De cómo nos parecemos a ellas más de lo que nos gustaría reconocer.\n\n\"I think the apple's rotten / right to the core\". Y luego se da cuenta de que esa \"manzana podrida\" también es ella. También es lo que la sostiene.\n\nAquí, en este aeropuerto, mirando atrás a mayo, pienso en mi madre. En lo que me transmitió sin saberlo. En la consistencia que aprendí de verla currar todos los días sin gloria.\n\nY entiendo que mi sistema, mi paciencia, mi forma de seguir cuando todo parece no avanzar, también vienen de ahí.\n\nA veces lo que heredamos es lo que nos salva.\n\n★\n\nMayo se va.\nJunio llega.\n\nY aquí seguimos.\n\nUn abrazo desde el aeropuerto,\nIrene 💌\n\n— Instagram / Substack / LinkedIn", "ti": "cierro un mes desde el otro lado del mundo", "gh": "lo que aprendí trabajando en remoto desde la Caribe ★", "de": "EMAIL NEWSLETTER · domingo 11h · ESPECIAL desde RD\n\nestructura:\n· hook desde el viaje (ya estás de vuelta o casi)\n· cierre emocional de mayo\n· lo aprendido este mes\n· reframe sobre consistencia\n· anuncio sutil de lo que viene en junio\n· canción + firma\n\nlongitud: 700-900 palabras\n\nNOTA: Irene vuelve domingo 31 de RD · este post es el cierre de mes Y la vuelta a casa"}]}, "women": [{"name": "sabrina carpenter", "category": "musica", "stat": "+90M", "story": "de disney a headliner coachella 2026", "lesson": "reinventarse lleva tiempo", "hook": "sabrina carpenter tardó 10 años en llegar a coachella ♡"}, {"name": "dua lipa", "category": "musica", "stat": "+75M", "story": "de becaria en revista a superestrella", "lesson": "empezar desde abajo", "hook": "dua lipa fue becaria antes de ser estrella ♡"}, {"name": "billie eilish", "category": "musica", "stat": "+70M", "story": "habla de salud mental y pausas necesarias", "lesson": "priorizar bienestar", "hook": "billie eilish tuvo que parar para volver a sentirse ella ♡"}, {"name": "olivia rodrigo", "category": "musica", "stat": "+50M", "story": "de disney a artista seria en meses", "lesson": "transiciones rápidas", "hook": "olivia rodrigo cambió su carrera en un año ♡"}, {"name": "rosalía", "category": "musica", "stat": "+35M", "story": "mezcló flamenco con urbano, innovación total", "lesson": "fusionar experiencias", "hook": "rosalía creó algo que no existía ♡"}, {"name": "aitana", "category": "musica", "stat": "+30M", "story": "de ot a artista consolidada en españa", "lesson": "aprovechar oportunidades", "hook": "aitana salió de ot y construyó su camino ♡"}, {"name": "bad bunny", "category": "musica", "stat": "+80M", "story": "cambió las reglas del reggaetón latino", "lesson": "hacer las cosas diferente", "hook": "bad bunny hizo lo que nadie hacía ♡"}, {"name": "taylor swift", "category": "musica", "stat": "+95M", "story": "regrabó sus álbumes para tener control", "lesson": "autonomía profesional", "hook": "taylor swift recuperó el control de su carrera ♡"}, {"name": "shakira", "category": "musica", "stat": "+55M", "story": "reinvención post-divorcio a los 46 con bzrp", "lesson": "nunca es tarde", "hook": "shakira se reinventó a los 46 ♡"}, {"name": "nathy peluso", "category": "musica", "stat": "+15M", "story": "argentina que conquistó españa siendo diferente", "lesson": "autenticidad", "hook": "nathy peluso no encajaba y eso la hizo brillar ♡"}, {"name": "maria becerra", "category": "musica", "stat": "+35M", "story": "de youtube covers a giras mundiales", "lesson": "redes como trampolín", "hook": "maria becerra empezó en su cuarto ♡"}, {"name": "emilia mernes", "category": "musica", "stat": "+25M", "story": "de grupo a solista exitosa internacional", "lesson": "evolución de carrera", "hook": "emilia dejó su grupo para encontrar su voz ♡"}, {"name": "tini", "category": "musica", "stat": "+25M", "story": "de disney violetta a artista latina top", "lesson": "reinvención desde joven", "hook": "tini se reinventó completamente ♡"}, {"name": "lola índigo", "category": "musica", "stat": "+10M", "story": "de ot a crear su propio universo artístico", "lesson": "crear tu propio espacio", "hook": "lola índigo construyó algo diferente ♡"}, {"name": "sara blakely", "category": "negocios", "stat": "", "story": "vendía faxes a los 27, fundó spanx a los 29 con 5000$", "lesson": "no necesitas experiencia en el sector", "hook": "sara blakely vendía faxes a los 27 ♡"}, {"name": "vera wang", "category": "negocios", "stat": "", "story": "patinadora hasta los 23, diseñó primer vestido a los 40", "lesson": "nunca es tarde", "hook": "vera wang diseñó su primer vestido a los 40 ♡"}, {"name": "julia child", "category": "negocios", "stat": "", "story": "trabajó en publicidad, aprendió a cocinar a los 36, publicó a los 49", "lesson": "tu carrera no es lineal", "hook": "julia child publicó su primer libro a los 49 ♡"}, {"name": "arianna huffington", "category": "negocios", "stat": "", "story": "rechazada 36 veces, fundó huffpost a los 55", "lesson": "los fracasos son parte del camino", "hook": "arianna huffington fue rechazada 36 veces ♡"}, {"name": "oprah winfrey", "category": "negocios", "stat": "", "story": "despedida de su primer trabajo en tv, construyó imperio", "lesson": "que te rechacen no define tu potencial", "hook": "oprah fue despedida por 'no ser apta' ♡"}, {"name": "simone biles", "category": "deporte", "stat": "", "story": "pausó su carrera en tokio por salud mental, volvió más fuerte", "lesson": "cuidar tu mente es valentía", "hook": "simone biles demostró que parar también es ganar ♡"}, {"name": "reshma saujani", "category": "emprendimiento", "stat": "", "story": "fracasó en política, fundó girls who code", "lesson": "fracasos inician algo mejor", "hook": "reshma saujani fracasó y fundó girls who code ♡"}, {"name": "issa rae", "category": "emprendimiento", "stat": "", "story": "creó contenido en youtube porque nadie le daba oportunidades", "lesson": "si no te dan espacio, créalo", "hook": "issa rae empezó en youtube porque nadie le abría puertas ♡"}, {"name": "jennifer lopez", "category": "musica", "stat": "", "story": "bailarina, actriz, cantante, empresaria, múltiples reinvenciones", "lesson": "reinventarse es parte del éxito", "hook": "jennifer lopez ha tenido más de una carrera ♡"}, {"name": "lorde", "category": "musica", "stat": "#1 mundial a los 16 con royals · pausa de 4 años por elección", "insight": "el descanso voluntario también construye carrera", "hook": "lorde dijo \"no estoy lista para volver\" durante 4 años · y volvió en sus términos ✦", "origen": "Auckland, Nueva Zelanda"}, {"name": "phoebe bridgers", "category": "musica", "stat": "4 nominaciones grammy · canta cosas que la mayoría se calla", "insight": "la vulnerabilidad NO es debilidad cuando es estructural", "hook": "phoebe bridgers convirtió las cosas más privadas en su firma artística ✦", "origen": "California, USA"}, {"name": "adele", "category": "musica", "stat": "pausas de 4-5 años entre álbumes · cuida la voz primero", "insight": "sostener > acelerar", "hook": "adele desaparece años entre álbumes · y vuelve cada vez más fuerte ✦", "origen": "Londres, UK"}, {"name": "beyoncé", "category": "musica", "stat": "32 grammys (récord histórico) · perfeccionista declarada", "insight": "la excelencia repetida no es suerte", "hook": "beyoncé ensaya 8 horas al día para hacer parecer fácil lo que no lo es ✦", "origen": "Texas, USA"}, {"name": "penélope cruz", "category": "cine", "stat": "oscar 2008 · primera española · 30 años de carrera", "insight": "la trayectoria larga gana al hype corto", "hook": "penélope cruz lleva 30 años trabajando · ningún papel define toda su carrera ✦", "origen": "Madrid, España"}, {"name": "phoebe waller-bridge", "category": "cine", "stat": "creó fleabag desde un monólogo de teatro · 6 emmys", "insight": "escribe lo que tú querrías ver — alguien más lo necesita", "hook": "phoebe waller-bridge escribió el guion de fleabag para sí misma · y se lo robó al mundo ✦", "origen": "Londres, UK"}, {"name": "anya taylor-joy", "category": "cine", "stat": "modelo descartada por \"rara\" · gambito de dama la convirtió en estrella", "insight": "lo que te hace rara puede ser lo que te hace inolvidable", "hook": "a anya taylor-joy le decían que sus ojos eran \"demasiado raros\" · ahora son su firma ✦", "origen": "Miami / Buenos Aires"}, {"name": "sofia coppola", "category": "cine", "stat": "oscar al mejor guion · estética propia reconocible al instante", "insight": "tener mirada propia es más raro que tener talento", "hook": "sofia coppola filma lo que otros descartan: el aburrimiento, el silencio, las miradas perdidas ✦", "origen": "Nueva York, USA"}, {"name": "greta gerwig", "category": "cine", "stat": "directora de barbie · 1.4 mil millones taquilla mundial", "insight": "lo \"rosa\" puede ser revolucionario", "hook": "a greta gerwig le dijeron que barbie no funcionaría · rompió récords con un guion feminista ✦", "origen": "California, USA"}, {"name": "florence pugh", "category": "cine", "stat": "nominada al oscar a los 23 · respondió en directo a las críticas por \"estar gorda\"", "insight": "no negocies tu cuerpo a cambio de papeles", "hook": "florence pugh se planta cuando le dicen cómo debe verse · y no le falta trabajo ✦", "origen": "Oxford, UK"}, {"name": "aubrey plaza", "category": "cine", "stat": "pasó 10 años haciendo personajes secundarios · explotó con white lotus", "insight": "el papel raro que nadie quería puede ser el que te lance", "hook": "aubrey plaza interpretó \"la antipática\" durante 10 años antes de que el mundo viera lo brillante que era ✦", "origen": "Delaware, USA"}, {"name": "penélope ruiz", "category": "cine", "stat": "protagonista de \"fleabag\" además de creadora · doble pasión", "insight": "no tienes que elegir entre crear y aparecer", "hook": "phoebe waller-bridge escribe + actúa · ¿por qué tú deberías elegir uno solo? ✦", "origen": "Londres, UK"}, {"name": "salma hayek", "category": "cine", "stat": "productora de frida + el laberinto del fauno · más allá de actriz", "insight": "detrás de cámara también es tu sitio", "hook": "salma hayek no esperó papeles · creó las películas que quería protagonizar ✦", "origen": "Veracruz, México"}, {"name": "sally rooney", "category": "literatura", "stat": "3 novelas · una generación se vio reflejada", "insight": "tu nicho específico es universal", "hook": "sally rooney escribió sobre 4 amigos en dublín · y millones de personas en todo el mundo se sintieron vistas ✦", "origen": "Mayo, Irlanda"}, {"name": "rosa montero", "category": "literatura", "stat": "40 años en el país · novelista + periodista", "insight": "doble identidad profesional es una fortaleza, no una debilidad", "hook": "rosa montero lleva 40 años haciendo dos oficios al mismo tiempo: novela y periodismo ✦", "origen": "Madrid, España"}, {"name": "almudena grandes", "category": "literatura", "stat": "escritora hasta el último día · 6 libros de \"episodios\"", "insight": "sostener una obra a lo largo del tiempo es el verdadero arte", "hook": "almudena grandes escribió hasta el último día de su vida · su saga \"episodios de una guerra interminable\" es testimonio ✦", "origen": "Madrid, España"}, {"name": "joan didion", "category": "literatura", "stat": "pionera del nuevo periodismo · escribía en su salón", "insight": "observar más detenidamente que los demás es una habilidad cotizada", "hook": "joan didion convirtió la observación en su superpoder profesional ✦", "origen": "California, USA"}, {"name": "nora ephron", "category": "literatura", "stat": "guion de cuando harry encontró a sally + e-mail tienes un correo", "insight": "el humor inteligente envejece bien", "hook": "nora ephron escribía comedia romántica sin pedir disculpas · 30 años después seguimos viéndolas ✦", "origen": "Nueva York, USA"}, {"name": "isabel allende", "category": "literatura", "stat": "85 años · 26 novelas traducidas a 42 idiomas", "insight": "no hay edad para tu primer libro · ni para el siguiente", "hook": "isabel allende escribió su primera novela a los 39 · 26 libros y 42 idiomas después, sigue escribiendo ✦", "origen": "Lima / Chile"}, {"name": "elena ferrante", "category": "literatura", "stat": "anonimato como elección consciente · cuatro novelas best-sellers", "insight": "no necesitas tu cara visible para tener voz", "hook": "elena ferrante nunca ha mostrado su cara · sus novelas conquistaron el mundo igual ✦", "origen": "Nápoles, Italia"}, {"name": "alexia putellas", "category": "deporte", "stat": "2 balones de oro femenino · capitana del barça", "insight": "el reconocimiento llega tarde · pero llega", "hook": "alexia putellas jugó 10 años antes de que el mundo viera el balón de oro ✦", "origen": "Mollet del Vallès, España"}, {"name": "aitana bonmatí", "category": "deporte", "stat": "2 balones de oro consecutivos · juego callado, brutal", "insight": "el trabajo invisible se vuelve visible cuando es excepcional", "hook": "aitana bonmatí lleva años haciendo el mismo trabajo silencioso · ahora gana balones de oro como quien respira ✦", "origen": "Sant Pere de Ribes, España"}, {"name": "carolina marín", "category": "deporte", "stat": "3 mundiales de bádminton · 1 oro olímpico", "insight": "el deporte minoritario también puede ser tu camino al oro", "hook": "carolina marín juega un deporte que casi nadie conocía en españa · y ha sido la mejor del mundo ✦", "origen": "Huelva, España"}, {"name": "serena williams", "category": "deporte", "stat": "23 grand slams · jugó embarazada y ganó", "insight": "sostener el talento décadas es el verdadero campeonato", "hook": "serena williams ganó un grand slam embarazada de 8 semanas · y siguió jugando hasta los 41 ✦", "origen": "Michigan, USA"}, {"name": "frida kahlo", "category": "arte", "stat": "150+ obras pintadas desde la cama tras un accidente", "insight": "tus limitaciones pueden ser el origen de tu obra", "hook": "frida kahlo pintó casi todo desde una cama · su dolor se convirtió en uno de los lenguajes pictóricos más reconocibles del siglo XX ✦", "origen": "Coyoacán, México"}, {"name": "maruja mallo", "category": "arte", "stat": "pionera surrealista española · borrada e injustamente olvidada", "insight": "estar fuera del relato oficial no anula tu obra", "hook": "maruja mallo era amiga de lorca y dalí · la historia la borró durante 50 años · ahora vuelve ✦", "origen": "Lugo, España"}, {"name": "marina abramović", "category": "arte", "stat": "pionera de la performance · 50 años de obra extrema", "insight": "tu cuerpo y tu tiempo son materiales legítimos de trabajo", "hook": "marina abramović se sentó frente a desconocidos durante 736 horas en el moma · esa fue la obra ✦", "origen": "Belgrado, Serbia"}, {"name": "sofia coppola", "category": "arte", "stat": "directora · estética visual instantáneamente reconocible", "insight": "una mirada propia es más rara que el talento", "hook": "sofia coppola filma lo que otros descartan: el aburrimiento, el silencio, las miradas perdidas ✦", "origen": "Nueva York, USA"}, {"name": "whitney wolfe", "category": "emprendimiento", "stat": "fundó bumble a los 25 · ipo con 31 años", "insight": "tu propia salida fallida puede ser tu propia revolución", "hook": "whitney wolfe demandó a tinder por acoso · luego fundó bumble · es ya billonaria con 31 ✦", "origen": "Utah, USA"}, {"name": "rihanna", "category": "emprendimiento", "stat": "fenty beauty · 100M$ primer mes · billion-dollar empire", "insight": "una marca personal sólida puede convertirse en imperio", "hook": "rihanna lanzó fenty beauty con 50 tonos de base · de un golpe redefinió toda la industria del maquillaje ✦", "origen": "Saint Michael, Barbados"}, {"name": "sara carbonero", "category": "emprendimiento", "stat": "periodista deportiva · creadora de slow love · 1.5M seguidores en moda", "insight": "no necesitas elegir entre periodismo y emprendimiento", "hook": "sara carbonero pasó de presentadora deportiva a fundadora de una marca de moda con 1.5M de seguidoras ✦", "origen": "Toledo, España"}, {"name": "malala", "category": "politica", "stat": "nobel de la paz a los 17 · sigue trabajando educación femenina", "insight": "tu edad no descalifica el impacto de tu trabajo", "hook": "malala escribió un blog secreto a los 11 · le dispararon a los 15 · ganó el nobel a los 17 ✦", "origen": "Mingora, Pakistán"}, {"name": "greta thunberg", "category": "politica", "stat": "inició huelga climática a los 15 · movimiento global", "insight": "un acto pequeño y consistente puede ser revolucionario", "hook": "greta thunberg empezó sentándose en la puerta del parlamento sueco un viernes · 6 años después, lleva el debate climático mundial ✦", "origen": "Estocolmo, Suecia"}, {"name": "letizia ortiz", "category": "politica", "stat": "periodista de tve durante 10 años antes de reina", "insight": "cambiar de carrera radicalmente es posible · y elegante", "hook": "letizia ortiz pasó de presentadora del telediario a reina de españa · pivote total con cara seria ✦", "origen": "Oviedo, España"}, {"name": "manuela carmena", "category": "politica", "stat": "jueza durante 35 años · alcaldesa de madrid a los 71", "insight": "no hay edad para empezar el siguiente capítulo", "hook": "manuela carmena fue jueza durante 35 años · luego alcaldesa de madrid a los 71 ✦", "origen": "Madrid, España"}, {"name": "phoebe philo", "category": "moda", "stat": "directora creativa de céline · pause de 8 años · regreso por su cuenta", "insight": "no necesitas seguir el calendario de la industria · puedes hacer el tuyo", "hook": "phoebe philo desapareció 8 años de la moda · volvió con su propia marca a su ritmo · todo el mundo esperaba ✦", "origen": "París, Francia"}, {"name": "stella mccartney", "category": "moda", "stat": "pionera de moda sostenible · sin cuero ni piel desde el día 1", "insight": "tu valor más fuerte = tu posicionamiento más fuerte", "hook": "stella mccartney llevaba 25 años diciendo no al cuero cuando la sostenibilidad se puso de moda ✦", "origen": "Londres, UK"}, {"name": "paloma picasso", "category": "moda", "stat": "diseñadora de joyas tiffany · más de 40 años de carrera", "insight": "tu apellido puede pesar · pero tu obra puede pesar más", "hook": "paloma picasso firma sus diseños · no su apellido · 40 años creando una marca propia ✦", "origen": "París, Francia"}, {"name": "lola flores", "category": "iconos", "stat": "70 años de carrera · \"si me queréis, irse\"", "insight": "la autenticidad sin filtro es atemporal", "hook": "lola flores se planta en una rueda de prensa de hacienda · 50 años después seguimos citándola ✦", "origen": "Jerez, España"}, {"name": "rocío jurado", "category": "iconos", "stat": "voz inimitable · 50 años en escenarios", "insight": "tu voz propia es tu activo más valioso", "hook": "rocío jurado tenía una voz que nadie ha podido imitar · esa diferencia fue su carrera entera ✦", "origen": "Cádiz, España"}, {"name": "concha velasco", "category": "iconos", "stat": "60 años en escenarios · seguía actuando con 80", "insight": "tu oficio se sostiene con disciplina · no con suerte", "hook": "concha velasco hacía teatro con 80 años · 60 años antes ya pisaba escenarios ✦", "origen": "Valladolid, España"}, {"name": "audrey hepburn", "category": "iconos", "stat": "unicef tras retirarse de hollywood · 50+ países", "insight": "tu segundo capítulo puede importar más que el primero", "hook": "audrey hepburn dejó hollywood y dedicó sus últimos años a unicef · no fue plan b · fue plan a renovado ✦", "origen": "Bruselas, Bélgica"}, {"name": "princesa diana", "category": "iconos", "stat": "reinventó el rol del royalty · acercamiento a causas humanitarias", "insight": "cuestionar el protocolo puede ser tu mayor aporte", "hook": "princesa diana caminó por campos de minas en angola · cambió la conversación sobre vih · rompió todos los protocolos ✦", "origen": "Sandringham, UK"}, {"name": "margarita salas", "category": "ciencia", "stat": "descubrió la enzima que cambió la biología molecular · patente más rentable del csic", "insight": "ciencia básica = revolución silenciosa", "hook": "margarita salas descubrió una enzima minúscula que se usa hoy en miles de laboratorios · cambió el adn de su disciplina ✦", "origen": "Asturias, España"}, {"name": "marie curie", "category": "ciencia", "stat": "2 nobel · primera mujer en ganar uno", "insight": "puedes pertenecer a un sitio donde aún no eres bienvenida", "hook": "marie curie no podía estudiar en su universidad de origen · ganó dos nobel y abrió la puerta a generaciones ✦", "origen": "Varsovia, Polonia"}, {"name": "ada lovelace", "category": "ciencia", "stat": "primera programadora de la historia · siglo XIX", "insight": "pioneras hay siempre · solo hay que reescribir la historia", "hook": "ada lovelace escribió el primer algoritmo de la historia · 100 años antes de que existieran los ordenadores ✦", "origen": "Londres, UK"}, {"name": "hedy lamarr", "category": "ciencia", "stat": "actriz hollywood + inventó tecnología base del wifi", "insight": "tu lado \"no obvio\" puede ser el más valioso", "hook": "hedy lamarr era estrella de hollywood y, en paralelo, inventó la tecnología que hoy hace funcionar el wifi ✦", "origen": "Viena, Austria"}, {"name": "carme ruscalleda", "category": "cocina", "stat": "7 estrellas michelin · autodidacta total", "insight": "la formación oficial no es la única ruta a la excelencia", "hook": "carme ruscalleda nunca pisó una escuela de cocina · y tiene 7 estrellas michelin · una de las pocas mujeres del mundo ✦", "origen": "Sant Pol de Mar, España"}, {"name": "elena arzak", "category": "cocina", "stat": "mejor chef femenina del mundo · 4ª generación familia", "insight": "heredar un proyecto y reinterpretarlo también es crear", "hook": "elena arzak heredó un restaurante con tres estrellas · lo mantiene · y lo reinventa ✦", "origen": "San Sebastián, España"}, {"name": "mercedes milá", "category": "comunicacion", "stat": "40+ años de tv · entrevistadora feroz · de gran hermano a \"convénceme\"", "insight": "preguntar bien es un oficio profundo", "hook": "mercedes milá lleva 40 años haciendo las preguntas que nadie hace · ese es su oficio ✦", "origen": "Barcelona, España"}], "hashtags": {"core (siempre)": "#dramaslaborales #orientacionlaboral #mujeresprofesionales #vidaprofesional #carrerasprofesionales", "cv y búsqueda": "#cv #curriculum #buscartrabajo #entrevistadetrabajo #consejoslaborales #empleabilidad #primerempleo", "empoderamiento": "#empoderamientofemenino #mujeresqueapoyanmujeres #mujerycarrera #liderazgofemenino #girlpower", "burnout y bienestar": "#burnout #saludlaboral #bienestaremocional #saludmental #desconexiondigital #equilibrio #limiteslaborales", "cambio de carrera": "#cambiodecarrera #reinvencionprofesional #nuevocomiezno #transicionlaboral #cambioprofesional", "crecimiento": "#desarrollopersonal #crecimientopersonal #motivacionlaboral #objetivosprofesionales #autoconocimiento", "linkedin": "#linkedin #linkedintips #marcapersonal #perfilprofesional #networking #linkedinespanol", "inspiración": "#mujeresqueinspiran #nuncaestardetarde #inspiracion #historiasdexito #reinventarse", "red flags": "#redflagslaborales #trabajotoxico #banderasrojas #toxiclaboral #ambientelaboral", "ebook": "#ebook #tuproximocapitulo #claridadprofesional #guiaprofesional #recursodigital", "comunidad": "#comunidad #noestássola #apoyo #mujeresunidas #sororidad", "alcance (viral)": "#fyp #parati #viral #consejos #tips #realidad #humor #relatable"}, "dates": [{"date":"3 mayo","name":"día de la madre (España)","idea":"conexión emocional, trabajo invisible de las madres, lo que aprendiste de ella","type":"festivo"},{"date":"5 mayo","name":"Met Gala 2026","idea":"mujeres que llegan a sus propios términos, confianza, imagen profesional","type":"viral"},{"date":"22 mayo","name":"concierto Bad Bunny Barcelona","idea":"trabajo y vida, organizar para vivir, sistema vs motivación","type":"viral"},{"date":"12-23 mayo","name":"festival de Cannes","idea":"mujeres en la industria, directoras, guionistas, logros","type":"viral"},{"date":"21 junio","name":"San Juan","idea":"quemar lo que no funciona, rituales de cierre laboral","type":"festivo"},{"date":"junio","name":"gira Beyoncé Europa 2026","idea":"la disciplina que parece fácil, ensayar 8h al día","type":"viral"},{"date":"junio","name":"Roland Garros (finales)","idea":"resistencia, no rendirse en el set final","type":"viral"},{"date":"julio","name":"Wimbledon","idea":"carrera larga vs éxito puntual, Serena Williams","type":"viral"},{"date":"24 julio","name":"Juegos Olímpicos París (si aplica 2026)","idea":"atletas que vuelven, Simone Biles, resiliencia","type":"viral"},{"date":"6 septiembre","name":"MTV VMAs 2026","idea":"artistas que se reinventaron, Charli XCX, Sabrina Carpenter","type":"viral"},{"date":"14 septiembre","name":"premios Emmy 2026","idea":"mujeres en TV, Fleabag, White Lotus, Severance","type":"viral"},{"date":"20 septiembre","name":"NYFW / Fashion weeks","idea":"moda como carrera, creatividad, Phoebe Philo","type":"viral"},{"date":"10 octubre","name":"día mundial de la salud mental","idea":"salud mental en el trabajo, normalizar, burnout","type":"internacional"},{"date":"octubre","name":"Latin Grammy 2026","idea":"artistas latinas, Shakira, Maria Becerra, Emilia Mernes","type":"viral"},{"date":"noviembre","name":"AMA Awards 2026","idea":"mujeres en la música, Taylor Swift, SZA","type":"viral"},{"date":"25 noviembre","name":"día contra la violencia de género","idea":"acoso laboral, límites, protocolos en empresas","type":"internacional"},{"date":"1 mayo","name":"día del trabajador","idea":"derechos, reflexión, bienestar, desconexión digital","type":"internacional"},{"date":"8 marzo","name":"día de la mujer","idea":"brecha salarial, techo de cristal, mujeres que inspiran","type":"internacional"},{"date":"4 octubre","name":"día mundial del animal","idea":"desconexión, autocuidado, vida fuera del trabajo","type":"internacional"},{"date":"1 noviembre","name":"todos los santos · puente","idea":"descanso real, plan para volver con energía","type":"festivo"},{"date":"6 diciembre","name":"constitución · puente","idea":"reflexión del año, logros, sistemas","type":"festivo"},{"date":"8 diciembre","name":"inmaculada · puente largo","idea":"cierre de año, balance, planificar 2027","type":"festivo"},{"date":"25 diciembre","name":"navidad","idea":"balance del año, agradecimiento, logros","type":"festivo"},{"date":"12 octubre","name":"fiesta nacional","idea":"mujeres españolas que inspiran, Rosalía, Alexia Putellas","type":"festivo"},{"date":"enero","name":"Golden Globes","idea":"mujeres en cine, discursos sobre igualdad","type":"viral"},{"date":"marzo","name":"Oscar temporada","idea":"mujeres directoras, Greta Gerwig, Sofia Coppola","type":"viral"},{"date":"febrero","name":"Super Bowl halftime show","idea":"artistas que se reinventan, planificación masiva","type":"viral"}], "templates": [{"type": "educativo · (carrusel)", "stories": ["compartir post + 'guardadlo'", "tip extra que no está en el post", "encuesta sobre el tema", "respuestas de la comunidad", "cta producto/lead magnet", "link directo"]}, {"type": "conexión · (reel personal)", "stories": ["buenos días casual", "pregunta abierta", "tu opinión sobre algo", "compartir respuestas", "reflexión de cierre", "teaser siguiente día"]}, {"type": "testimonios", "stories": ["captura mensaje real", "contexto antes del cambio", "resultado después", "más capturas", "cta producto", "link compra"]}, {"type": "venta · (lanzamiento)", "stories": ["problema que resuelve", "beneficio principal", "faq común", "testimonio rápido", "link compra", "urgencia countdown"]}, {"type": "viral · (humor)", "stories": ["compartir reel", "meme relacionado", "encuesta divertida", "compartir comentarios", "cta seguir", "—"]}, {"type": "lanzamiento · producto", "stories": ["ES HOY celebración", "qué incluye", "para quién es", "testimonio rápido", "link + urgencia", "countdown final"]}, {"type": "domingo · (recap)", "stories": ["número de la semana", "lo más guardado", "mensaje comunidad", "newsletter recordatorio", "teaser semana siguiente", "—"]}, {"type": "día · importante", "stories": ["contexto del día", "tu reflexión", "conexión con tu tema", "cta relevante", "cierre personal", "—"]}], "revenue": [{"month": "abril", "ebook_obj": 195, "asesoria_obj": 0, "acomp_obj": 0, "total_obj": 195}, {"month": "mayo", "ebook_obj": 170, "asesoria_obj": 0, "acomp_obj": 0, "total_obj": 170}, {"month": "junio", "ebook_obj": 135, "asesoria_obj": 0, "acomp_obj": 0, "total_obj": 135}, {"month": "julio", "ebook_obj": 85, "asesoria_obj": 270, "acomp_obj": 0, "total_obj": 355}, {"month": "agosto", "ebook_obj": 85, "asesoria_obj": 180, "acomp_obj": 0, "total_obj": 265}, {"month": "septiembre", "ebook_obj": 135, "asesoria_obj": 360, "acomp_obj": 0, "total_obj": 495}, {"month": "octubre", "ebook_obj": 85, "asesoria_obj": 270, "acomp_obj": 625, "total_obj": 980}, {"month": "noviembre", "ebook_obj": 255, "asesoria_obj": 360, "acomp_obj": 625, "total_obj": 1240}, {"month": "diciembre", "ebook_obj": 170, "asesoria_obj": 180, "acomp_obj": 625, "total_obj": 975}], "overview": {"roadmap": [{"month": "abril", "phase": "lanzamiento", "product": "ebook 'tu próximo capítulo'", "price": "16,99€", "goal": "15-20 ventas"}, {"month": "mayo", "phase": "crecimiento", "product": "ebook evergreen + lead magnets", "price": "—", "goal": "900 seguidores"}, {"month": "junio", "phase": "consolidación", "product": "ebook + preparar asesoría", "price": "—", "goal": "100 emails"}, {"month": "julio", "phase": "lanzamiento asesoría", "product": "asesoría 1:1 intensiva", "price": "90€", "goal": "3-5 clientas"}, {"month": "agosto", "phase": "optimización", "product": "asesoría mejorada", "price": "90€", "goal": "sistema estable"}, {"month": "septiembre", "phase": "escalado", "product": "ebook + asesoría", "price": "—", "goal": "220 emails"}, {"month": "octubre", "phase": "premium", "product": "acompañamiento 2 meses", "price": "625€", "goal": "3-5 clientas"}, {"month": "noviembre", "phase": "consolidación premium", "product": "todos los productos", "price": "—", "goal": "sistema completo"}, {"month": "diciembre", "phase": "cierre de año", "product": "balance + planificación 2027", "price": "—", "goal": "fidelización"}], "metrics": [{"name": "seguidores ig", "start": 525, "targets": {"abril": 700, "mayo": 900, "junio": 1100, "julio": 1400, "agosto": 1600, "septiembre": 2000, "octubre": 2400, "noviembre": 2800, "diciembre": 3200}}, {"name": "lista email", "start": 7, "targets": {"abril": 30, "mayo": 60, "junio": 100, "julio": 140, "agosto": 170, "septiembre": 220, "octubre": 280, "noviembre": 340, "diciembre": 400}}, {"name": "ventas ebook", "start": 0, "targets": {"abril": 15, "mayo": 10, "junio": 8, "julio": 5, "agosto": 5, "septiembre": 8, "octubre": 5, "noviembre": 15, "diciembre": 10}}, {"name": "ingresos mes (€)", "start": 0, "targets": {"abril": 195, "mayo": 170, "junio": 135, "julio": 355, "agosto": 265, "septiembre": 495, "octubre": 980, "noviembre": 1240, "diciembre": 975}}]}};

// ═══════════════════════════════════════════════════════════════════
// DESIGN SYSTEM — paleta pastel aesthetic (rosa suave)
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// PALETA DE COLORES · modo claro / modo oscuro
// ═══════════════════════════════════════════════════════════════════
const C_LIGHT = {
  bg: '#FFF5F6',           // rosa pétalo muy claro
  bgSoft: '#FDE5E9',       // rosa algodón
  card: '#FFFFFF',
  border: '#F6D6DC',
  borderSoft: '#FBE6EA',
  ink: '#4A2A35',          // ciruela oscuro (menos marrón)
  inkSoft: '#9A7580',      // rosa grisáceo
  accent: '#E891A5',       // rosa chicle vivo
  accentSoft: '#F7C9D3',
  // Plataformas (pastel)
  ig: '#F4B8CC',           // rosa IG pastel
  igDark: '#D07090',
  igBg: '#FDE4EC',
  li: '#C0D8EB',           // azul LI pastel rosado
  liDark: '#7BA2C2',
  liBg: '#EBF2F8',
  ss: '#F9CDA8',           // melocotón suave
  ssDark: '#D49770',
  ssBg: '#FDE9D8',
  tt: '#DCC7EE',           // lila TikTok suave
  ttDark: '#9B83C4',
  ttBg: '#F4ECFA',
  // estados
  published: '#C2DDB5',    // verde salvia pastel
  creating: '#F7D7A2',     // amarillo miel pastel
  pending: '#E8D4D0',      // beige rosado
};

const C_DARK = {
  bg: '#1F1418',           // ciruela muy oscuro
  bgSoft: '#2A1A20',       // un poco más claro
  card: '#2C1D24',         // card oscura
  border: '#3D2A33',       // borde sutil
  borderSoft: '#352228',
  ink: '#F5DCE3',          // texto rosa muy claro
  inkSoft: '#B89AA3',      // gris-rosa
  accent: '#F2A0B5',       // rosa más vivo para dark
  accentSoft: '#7D4757',   // accent suave oscuro
  // Plataformas (más vivas en dark · contrastan mejor)
  ig: '#E89BB3',
  igDark: '#F5B8C9',       // en dark, los "Dark" son MÁS claros
  igBg: '#3D2630',
  li: '#A8C5DD',
  liDark: '#C4D8E8',
  liBg: '#2A3540',
  ss: '#F2BC95',
  ssDark: '#F5CDA8',
  ssBg: '#3D2C20',
  tt: '#C9B5DD',
  ttDark: '#D8C5EA',
  ttBg: '#2D2438',
  // estados (más vivos)
  published: '#9FCC8E',
  creating: '#E8B870',
  pending: '#7A5862',
};

// Estado global del tema · usa Proxy para que C cambie dinámicamente
let _currentTheme = 'light';
try {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('dramas-theme') : null;
  if (saved === 'dark' || saved === 'light') _currentTheme = saved;
} catch (e) { /* localStorage no disponible */ }

const C = new Proxy({}, {
  get(_, key) {
    const palette = _currentTheme === 'dark' ? C_DARK : C_LIGHT;
    return palette[key];
  }
});

// Helper para cambiar tema · usado por el toggle
function setTheme(newTheme) {
  _currentTheme = newTheme;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('dramas-theme', newTheme);
    }
  } catch (e) { /* ignore */ }
  // Aplicar al body para que el fondo cambie
  if (typeof document !== 'undefined') {
    document.body.style.background = (newTheme === 'dark' ? C_DARK : C_LIGHT).bg;
    document.body.style.color = (newTheme === 'dark' ? C_DARK : C_LIGHT).ink;
  }
}
function getTheme() { return _currentTheme; }

const MONTHS_ES = [
  {id:'mayo',n:'Mayo',num:5,phase:'crecimiento'},
  {id:'junio',n:'Junio',num:6,phase:'consolidación'},
  {id:'julio',n:'Julio',num:7,phase:'lanzamiento asesoría'},
  {id:'agosto',n:'Agosto',num:8,phase:'optimización'},
  {id:'septiembre',n:'Septiembre',num:9,phase:'escalado'},
  {id:'octubre',n:'Octubre',num:10,phase:'premium'},
  {id:'noviembre',n:'Noviembre',num:11,phase:'consolidación'},
  {id:'diciembre',n:'Diciembre',num:12,phase:'cierre'}
];

const PLATFORMS = {
  instagram: {name:'Instagram', short:'IG', color:C.ig, dark:C.igDark, bg:C.igBg, icon:IgIcon},
  linkedin: {name:'LinkedIn', short:'LI', color:C.li, dark:C.liDark, bg:C.liBg, icon:LiIcon},
  substack: {name:'Substack', short:'SS', color:C.ss, dark:C.ssDark, bg:C.ssBg, icon:FileText},
  tiktok: {name:'TikTok', short:'TT', color:C.tt, dark:C.ttDark, bg:C.ttBg, icon:Video}
};

const STATUS = {
  pending:   {label:'Pendiente',          color:C.pending,   icon:Circle},
  creating:  {label:'Creando',            color:C.creating,  icon:PauseCircle},
  scheduled: {label:'Programado',         color:'#C0D8EB',   icon:CheckCircle2},
  manual:    {label:'Publicar yo',        color:'#C4A0D8',   icon:Bell},
  published: {label:'Publicado',          color:C.published, icon:CheckCircle2},
};

// Devuelve el estado efectivo: si está "scheduled" y ya pasó la fecha/hora, lo considera "published"
function effectiveStatus(post, platform, state, now) {
  const rawStatus = state?.posts?.[`${platform}:${post.i}`]?.status || 'pending';
  if (rawStatus !== 'scheduled' && rawStatus !== 'manual') return rawStatus;
  // Si está programado/manual, mirar si ya pasó su hora
  if (!post.d) return rawStatus;
  const [y, m, d] = post.d.split('-').map(Number);
  let h = 9, min = 0;
  if (post.tm) {
    const parts = post.tm.split(':');
    h = parseInt(parts[0]) || 9;
    min = parseInt(parts[1]) || 0;
  }
  const postTime = new Date(y, m-1, d, h, min);
  // Solo auto-publicar al día siguiente (para que el post del día se quede visible todo el día)
  const nextDay = new Date(y, m-1, d+1, 0, 0, 0);
  if (now >= nextDay) return 'published';
  return rawStatus;
}

// ═══════════════════════════════════════════════════════════════════
// EXPORT A CALENDAR (.ics) — funciona con Google, Apple, Outlook
// ═══════════════════════════════════════════════════════════════════
function formatIcsDate(date) {
  // Format: YYYYMMDDTHHMMSS (floating local time, sin Z)
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

function escapeIcs(text) {
  if (!text) return '';
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function buildIcsEvent({uid, title, description, start, durationMin = 30, location = ''}) {
  const end = new Date(start.getTime() + durationMin * 60000);
  return [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    description ? `DESCRIPTION:${escapeIcs(description)}` : '',
    location ? `LOCATION:${escapeIcs(location)}` : '',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'TRIGGER:-PT30M',
    `DESCRIPTION:${escapeIcs(title)}`,
    'END:VALARM',
    'END:VEVENT',
  ].filter(Boolean).join('\r\n');
}

function downloadIcs(events, filename = 'dramas-laborales.ics') {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dramas Laborales//Dashboard//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');
  
  const blob = new Blob([ics], {type: 'text/calendar;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Helper: construye evento desde un post
function postToIcsEvent(post, platform) {
  if (!post.d) return null;
  const [y, m, day] = post.d.split('-').map(Number);
  let h = 9, min = 0;
  if (post.tm) {
    const parts = post.tm.split(':');
    h = parseInt(parts[0]) || 9;
    min = parseInt(parts[1]) || 0;
  }
  const start = new Date(y, m-1, day, h, min);
  const platformName = {instagram:'Instagram', linkedin:'LinkedIn', substack:'Substack', tiktok:'TikTok'}[platform] || platform;
  const title = `${platformName}: ${post.ti || post.su || 'Post'}`;
  const descLines = [];
  if (post.t) descLines.push(`Tipo: ${post.t}`);
  if (post.h) descLines.push(`Hook: ${post.h}`);
  if (post.su) descLines.push(`Subtítulo: ${post.su}`);
  if (post.se) descLines.push(`Secciones: ${post.se}`);
  if (post.cp) descLines.push(`Copy: ${post.cp}`);
  descLines.push('\n♡ Dramas Laborales');
  return buildIcsEvent({
    uid: `dl-${platform}-${post.i || post.d}-${post.tm || ''}@dramaslaborales`,
    title,
    description: descLines.join('\n'),
    start,
    durationMin: 30,
  });
}

const MOTIVATIONAL = [
  // Constancia / paso a paso
  'Un paso cada día. Literal, un paso, uno solo. ♡',
  'La constancia pesa más que la intensidad ♡',
  'No necesitas el plan perfecto. Necesitas empezar.',
  'Hecho > perfecto. Siempre. ✧',
  'Mejor un post imperfecto publicado que el carrusel ideal sin subir.',
  'Tres pasos pequeños hoy te ahorran tres semanas de bloqueo en junio.',
  
  // Cosecha / largo plazo
  'Lo que creas hoy es lo que recogerás en 6 meses ✧',
  'Cada post es una semilla — la cosecha llega.',
  'Estás plantando árboles bajo cuya sombra otra Irene se sentará en septiembre.',
  'Hoy es el día 1 del año en el que dejas tu trabajo. Recuérdalo.',
  'Los nómadas digitales que admiras estuvieron donde tú estás ahora.',
  
  // Audiencia / conexión real
  'Tu audiencia te está esperando. No lo olvides ✧',
  'Esa chica de 24 años perdida ya está leyéndote. Sigue ✦',
  'Una sola persona conmovida con tu post ya valió la pena.',
  'No estás hablando a 525 seguidoras. Estás hablando con UNA, mil veces.',
  'La que va a comprar tu ebook ya te conoce. Solo está esperando el momento.',
  
  // Construcción / ya estás haciendo
  'Todo lo que estás construyendo ya es algo.',
  'Llevas 8 días publicando. Eso es más de lo que el 95% jamás hará.',
  'Las cifras pequeñas son las cifras de los principios. Todos las tuvieron.',
  'No hay atajos. Hay dirección y hay tiempo. Tienes ambas. ♡',
  'Esto no es procastinación, es trabajo invisible.',
  
  // Honestidad emocional / días duros
  'Si hoy no puedes con todo, haz UNA cosa. Cuenta igual.',
  'Está bien que tengas miedo. Igual lo haces.',
  'El síndrome del impostor también lo siente Phoebe Waller-Bridge.',
  'Que no te guste tu post de ayer significa que estás creciendo.',
  'Las cero ventas del día 1 son parte de la historia. No son la historia.',
  
  // Identidad / propósito
  'Eres exactamente lo que esa chica perdida estaba buscando ♡',
  'Recuerda por qué empezaste: que ninguna se sienta sola en su drama laboral.',
  'No estás creando contenido. Estás creando un hogar para otras chicas como tú ✧',
  'Tu honestidad es tu superpoder. Úsala.',
  
  // Frases con voz tuya / cultura pop
  'Carrie escribía sus columnas en pijama. Tú también puedes ✧',
  'Fleabag mira a cámara y la cámara la ama. Mira tú a la tuya.',
  'Aitana tampoco lo tenía claro al principio. Mírala ahora ♡',
  'Lorde escribió Pure Heroine con 16. No se trata de cuándo, se trata de empezar.',
  
  // Recordatorios prácticos
  'No tienes que ser viral. Tienes que ser tú.',
  'El algoritmo premia la consistencia, no la perfección.',
  'Guarda el móvil 30 minutos. Vuelves más fuerte ♡',
  'Si dudas si publicarlo: publícalo.',
];

// ═══════════════════════════════════════════════════════════════════
// DESTINOS — el sueño del trabajo remoto, rotación semanal (lunes)
// Selección curada: Asia relajada, Latam cálida, islas, ciudades con alma
// ═══════════════════════════════════════════════════════════════════
const DESTINATIONS = [
  // ─── ASIA ───────────────────────────────────
  {city:'Canggu', country:'Bali, Indonesia', emoji:'🌴', region:'Asia',
    vibe:'surf al amanecer, cafés con wifi, atardeceres imposibles',
    fact:'es la capital mundial del trabajo remoto — hay más laptops que tablas de surf',
    mantra:'aquí la productividad sabe a coco frío',
    cowork:'Dojo Bali, Outpost Canggu, Tropical Nomad', monthly:'800-1.400€', tip:'scooter imprescindible · zona Berawa o Batu Bolong'},
  {city:'Ubud', country:'Bali, Indonesia', emoji:'🪷', region:'Asia',
    vibe:'selva, templos, yoga al amanecer, arrozales infinitos',
    fact:'es donde Elizabeth Gilbert encontró su tercer acto en "Come reza ama"',
    mantra:'existen lugares donde reconectar contigo es el plan principal',
    cowork:'Outpost Ubud, Hubud, Tropical Nomad Ubud', monthly:'600-1.100€', tip:'más barato que Canggu · perfecto para enfocarse y yoga'},
  {city:'Chiang Mai', country:'Tailandia', emoji:'🏯', region:'Asia',
    vibe:'templos dorados, mercados de noche, vida lenta',
    fact:'una comida completa cuesta 2€ y el café de especialidad es top mundial',
    mantra:'trabajar en un café con olor a jazmín es una experiencia',
    cowork:'Punspace, Hub 53, CAMP @ Maya Mall', monthly:'500-900€', tip:'meca del nomadismo barato · visa 60 días fácil'},
  {city:'Koh Lanta', country:'Tailandia', emoji:'🐚', region:'Asia',
    vibe:'isla tranquila, playas vírgenes, palmeras y silencio',
    fact:'hay menos de 30.000 habitantes y atardeceres que paran el tiempo',
    mantra:'imagina cerrar el portátil y que tu paseo sea la orilla',
    cowork:'KoHub (legendario), Lanta Coworking', monthly:'600-1.000€', tip:'isla para quien busca silencio · temporada nov-abril'},
  {city:'Da Nang', country:'Vietnam', emoji:'🌊', region:'Asia',
    vibe:'playa kilométrica, puentes dragón, comida callejera mágica',
    fact:'sus pho valen 1,50€ y tienes montaña + playa en 20 minutos',
    mantra:'trabajar por la mañana, surf por la tarde, pho por la noche',
    cowork:'Enouvo Space, Surf Space, The Hive', monthly:'500-850€', tip:'muy infravalorada · mejor wifi del sudeste asiático'},
  {city:'Hoi An', country:'Vietnam', emoji:'🏮', region:'Asia',
    vibe:'farolillos de seda, casco histórico amarillo, río con barcas',
    fact:'cada luna llena apagan las luces eléctricas y solo brillan los farolillos',
    mantra:'existen ciudades que parecen hechas para respirar más despacio',
    cowork:'Hoi An Coworking, Sun & Moon Coworking', monthly:'450-800€', tip:'vida de pueblo · playa An Bang a 5 min en bici'},
  {city:'Kyoto', country:'Japón', emoji:'🌸', region:'Asia',
    vibe:'templos zen, bosques de bambú, matcha ceremonial',
    fact:'tiene más de 1.600 templos y todavía geishas caminando por Gion',
    mantra:'trabajar entre cerezos en flor es un nivel de vida nuevo',
    cowork:'Oinai Karasuma, Kyoto Coworking', monthly:'1.200-2.200€', tip:'caro pero inolvidable · ir en primavera u otoño'},
  {city:'Lisboa', country:'Portugal', emoji:'🌇', region:'Europa suave',
    vibe:'azulejos, tranvías amarillos, fado, luz dorada',
    fact:'es la capital europea del nomadismo digital y tienes playa a 30 minutos',
    mantra:'trabajar con el Atlántico cerca cambia cómo respiras',
    cowork:'Second Home, Cowork Central, Village Underground', monthly:'900-2.000€', tip:'barrios: Alfama, Príncipe Real, Graça · visa D7 popular'},
  {city:'Siargao', country:'Filipinas', emoji:'🏝️', region:'Asia',
    vibe:'isla surfera, lagunas turquesa, cocoteros hasta donde mira la vista',
    fact:'la descubrió el mundo hace solo 10 años y sigue siendo un secreto',
    mantra:'existe un lugar donde despiertas escuchando el mar',
    cowork:'Lost Coworking, Harana Surf Resort coworking', monthly:'700-1.200€', tip:'isla surf · wifi mejor en Cloud 9 o General Luna'},
  {city:'Seminyak', country:'Bali, Indonesia', emoji:'🌺', region:'Asia',
    vibe:'beach clubs chic, boutiques, atardeceres con cóctel',
    fact:'tiene los mejores beach clubs del sudeste asiático',
    mantra:'hay oficinas mejores que cualquier oficina',
    cowork:'BWork Bali, Biliq, Genesis Creative Centre', monthly:'1.000-1.700€', tip:'más elevado que Canggu pero con beach clubs premium'},

  // ─── LATINOAMÉRICA ──────────────────────────
  {city:'Buenos Aires', country:'Argentina', emoji:'🫖', region:'Latam',
    vibe:'café en cafés de barrio, tango escondido, librerías eternas',
    fact:'tiene la librería más bonita del mundo (El Ateneo Grand Splendid)',
    mantra:'una ciudad donde cada barrio parece un país distinto',
    cowork:'La Maquinita Co, AreaTres, WeWork Argentina', monthly:'500-900€', tip:'Palermo o Recoleta · cambio favorable para euros · carne 2€'},
  {city:'Bariloche', country:'Argentina', emoji:'🏔️', region:'Latam',
    vibe:'lagos patagónicos, chocolate artesanal, montaña siempre cerca',
    fact:'los lagos son tan azules que parecen filtro',
    mantra:'trabajar entre lagos patagónicos es una postal diaria',
    cowork:'Nodo Coworking, Punto Patagonia', monthly:'500-850€', tip:'ir en dic-mar (verano) · esquí si vas en invierno'},
  {city:'Mendoza', country:'Argentina', emoji:'🍇', region:'Latam',
    vibe:'viñedos al pie de los Andes, asados, vida tranquila',
    fact:'es una de las 8 capitales mundiales del vino y la vida es barata',
    mantra:'existe un sitio donde el plan es trabajar + descorchar Malbec',
    cowork:'Kube Coworking, Alcho Cowork', monthly:'400-700€', tip:'catas de vino a 15€ · cerca de Chile y Santiago'},
  {city:'Medellín', country:'Colombia', emoji:'🌸', region:'Latam',
    vibe:'eterna primavera, flores en todas partes, energía latina',
    fact:'llaman así a la ciudad porque es primavera los 365 días',
    mantra:'trabajar en una ciudad donde siempre hay sol da otra energía',
    cowork:'Selina Cowork, Atom House, Tinkko', monthly:'500-900€', tip:'barrio El Poblado · clima 24°C todo el año'},
  {city:'Cartagena', country:'Colombia', emoji:'🌞', region:'Latam',
    vibe:'ciudad amurallada, bougainvillea, mar Caribe',
    fact:'García Márquez ambientó "El amor en los tiempos del cólera" aquí',
    mantra:'hay ciudades que parecen una película de los 50',
    cowork:'Nexus Coworking, WorkLab Cartagena', monthly:'600-1.100€', tip:'Getsemaní > Centro Histórico · cuidado con el calor junio-sept'},
  {city:'Tulum', country:'México', emoji:'🐢', region:'Latam',
    vibe:'cenotes, ruinas mayas al mar, playa blanca, beach clubs boho',
    fact:'las ruinas están literalmente sobre una playa del Caribe',
    mantra:'existe un sitio donde nadas en cenotes en el descanso del almuerzo',
    cowork:'Tulum Cowork, Selina Tulum', monthly:'900-2.000€', tip:'caro para Latam · elegir zona hotelera vs pueblo cambia todo'},
  {city:'Playa del Carmen', country:'México', emoji:'🌊', region:'Latam',
    vibe:'quinta avenida, arena blanca, vida relajada caribeña',
    fact:'el agua es tan clara que ves el fondo a 10 metros',
    mantra:'hay ciudades donde la oficina ideal es una hamaca',
    cowork:'Nest Coworking, Cobá Coworking', monthly:'700-1.500€', tip:'más barato que Tulum · base para explorar cenotes Yucatán'},
  {city:'Sayulita', country:'México', emoji:'🏄‍♀️', region:'Latam',
    vibe:'pueblo surfero de colores, ambiente hippie-chic',
    fact:'es donde van los creativos de CDMX a desconectar',
    mantra:'pueblo donde las reuniones pueden hacerse en la arena',
    cowork:'Sayulita Cowork, The Wavy Hub', monthly:'700-1.400€', tip:'pueblo surfero · wifi limitado, mejor coworking sí o sí'},
  {city:'Florianópolis', country:'Brasil', emoji:'🏖️', region:'Latam',
    vibe:'42 playas en una sola isla, lagoas, surf todo el año',
    fact:'es una isla con 42 playas distintas y dunas doradas enormes',
    mantra:'una isla donde cada playa es un plan distinto',
    cowork:'Cubo Itaú, Floripa Tech Hub, Cowork Floripa', monthly:'600-1.000€', tip:'Jurerê o Lagoa · verano dic-mar es el mejor momento'},
  {city:'Rio de Janeiro', country:'Brasil', emoji:'🌅', region:'Latam',
    vibe:'Copacabana, Ipanema, samba, playas urbanas',
    fact:'es la única ciudad del mundo con montañas dentro del casco urbano y playas icónicas',
    mantra:'trabajar con vista al Pan de Azúcar es otra liga',
    cowork:'CUBO, Casa Firjan, WeWork Leblon', monthly:'700-1.300€', tip:'Ipanema o Leblon · seguridad importa, zonas seleccionadas'},
  {city:'Barranco', country:'Lima, Perú', emoji:'🎨', region:'Latam',
    vibe:'barrio bohemio, arte callejero, cafés de especialidad, acantilados',
    fact:'la mejor ceviche del mundo se come a 10€ y Lima es capital gastronómica latinoamericana',
    mantra:'algunos barrios son pequeñas ciudades dentro de ciudades',
    cowork:'Comunal Barranco, Worx Lima', monthly:'600-950€', tip:'barrio bohemio · cerca de Miraflores · gastronomía top'},

  // ─── ISLAS / SORPRESAS ──────────────────────
  {city:'Formentera', country:'España', emoji:'🫶', region:'Islas',
    vibe:'cala Saona, chiringuitos, agua imposiblemente turquesa',
    fact:'tiene playas que están en top mundial sin filtros',
    mantra:'islas donde los atardeceres son el único plan necesario',
    cowork:'no hay coworking formal · cafés con wifi en Sant Francesc', monthly:'1.200-2.200€', tip:'solo abril-oct · el resto del año casi vacía'},
  {city:'Fuerteventura', country:'España', emoji:'🌬️', region:'Islas',
    vibe:'dunas, surf, vibras chill, clima perfecto todo el año',
    fact:'la isla es tan plana y ventosa que es paraíso de kitesurf',
    mantra:'trabajar donde el invierno no existe da mucha libertad',
    cowork:'Coworking in the Sun (Corralejo), Verde Aurora (Lajares)', monthly:'700-1.600€', tip:'Corralejo o Lajares · zonas surfers · menos turismo masivo'},
  {city:'Ibiza (norte)', country:'España', emoji:'🫒', region:'Islas',
    vibe:'la Ibiza secreta: calas escondidas, payeses, olivos, puestas de sol',
    fact:'hay más de 80 calas y las del norte son casi desiertas',
    mantra:'una isla que tiene 2 almas y solo pocos conocen la segunda',
    cowork:'cafés en Santa Gertrudis · menos coworking, más casa payesa', monthly:'1.200-2.800€', tip:'temporada alta carísima · off-season (oct-abr) mucho mejor'},
  {city:'Mallorca (Sóller)', country:'España', emoji:'🍋', region:'Islas',
    vibe:'pueblo de piedra entre naranjos, tranvía centenario, tramontana',
    fact:'es Patrimonio de la Humanidad y tiene un tren de madera de 1912',
    mantra:'pueblos donde el tiempo se detuvo en la mejor época',
    cowork:'Fora Work Sóller, Nidus Cowork Palma', monthly:'900-1.900€', tip:'tren Sóller-Palma histórico · pueblo auténtico no turístico'},
  {city:'Santorini (Oía)', country:'Grecia', emoji:'💙', region:'Europa suave',
    vibe:'casas blancas, cúpulas azules, atardeceres míticos',
    fact:'los atardeceres de Oía están entre los top 10 del mundo',
    mantra:'una isla volcánica donde cada foto parece postal',
    cowork:'casi inexistente · cafés en Oía y Fira', monthly:'1.200-2.400€', tip:'mejor oct-nov o mayo · julio-agosto es locura turística'},
  {city:'Paros', country:'Grecia', emoji:'🕊️', region:'Islas',
    vibe:'pueblitos blancos, buganvillas, tavernas frente al mar',
    fact:'es la versión tranquila y real de Santorini, sin tanto turismo',
    mantra:'existen islas que todavía no han perdido su alma',
    cowork:'pocos coworkings · cafés en Naoussa y Parikia', monthly:'900-1.800€', tip:'la isla griega infravalorada · mejor junio o septiembre'},

  // ─── CIUDADES CON ALMA ──────────────────────
  {city:'Sevilla', country:'España', emoji:'🍊', region:'Europa suave',
    vibe:'patios andaluces, azahar, flamenco en tablaos ocultos',
    fact:'en abril la ciudad huele literalmente a azahar — no es metáfora',
    mantra:'ciudades donde el sur se siente en los huesos',
    cowork:'La Huerta Coworking, Workinto, The Workroom', monthly:'600-1.300€', tip:'Triana o Santa Cruz · evitar junio-agosto (40°C+)'},
  {city:'Tarifa', country:'España', emoji:'🪁', region:'Europa suave',
    vibe:'kitesurf, África al otro lado, vida muy chill, atardeceres brutales',
    fact:'desde aquí ves Marruecos a simple vista los días despejados',
    mantra:'hay pueblos donde el viento es parte del plan de vida',
    cowork:'Nomad Workspace Tarifa, Lively Up', monthly:'700-1.500€', tip:'viento = kitesurf · el pueblo más chill del sur'},
  {city:'Porto', country:'Portugal', emoji:'🍷', region:'Europa suave',
    vibe:'río Duero, azulejos, vinos, librerías antiguas (Lello)',
    fact:'la librería Lello inspiró Hogwarts — y el vino de Oporto nace aquí',
    mantra:'ciudades donde trabajar frente al río cambia la perspectiva',
    cowork:'Porto i/o, Selina Porto, Typographia', monthly:'700-1.500€', tip:'barrio Cedofeita o Foz · cada vez más nómadas digitales'},

  // ─── ARGENTINA EXTRA ────────────────────────
  {city:'El Chaltén', country:'Argentina', emoji:'⛰️', region:'Latam',
    vibe:'capital del trekking, picos brutales, glaciares, fin del mundo',
    fact:'es el pueblo más joven de Argentina (1985) · fundado por estrategia geopolítica',
    mantra:'lugares donde la naturaleza te recuerda lo pequeña que eres',
    cowork:'casi inexistente · cafés con wifi en el centro', monthly:'700-1.300€', tip:'ir oct-marzo · llevar capas · paciencia con el wifi'},
  {city:'Salta', country:'Argentina', emoji:'🌶️', region:'Latam',
    vibe:'pueblos coloniales, quebradas multicolores, peñas folclóricas, vino de altura',
    fact:'tiene los viñedos más altos del mundo (Cafayate · 3000m sobre el mar)',
    mantra:'norte argentino · empanadas + tinto + cerros de 7 colores',
    cowork:'Brick Salta, COwork Salta', monthly:'500-900€', tip:'base perfecta para Cafayate y Purmamarca · clima estable todo el año'},
  {city:'Ushuaia', country:'Argentina', emoji:'🐧', region:'Latam',
    vibe:'fin del mundo literal · canal de Beagle · pingüinos · glaciares',
    fact:'es la ciudad más austral del planeta · de aquí salen los cruceros a la Antártida',
    mantra:'hay sitios donde estás más cerca del polo sur que de tu casa',
    cowork:'Posada Cowork Ushuaia, cafés con wifi', monthly:'1.000-1.700€', tip:'caro pero único · diciembre-marzo es pleno verano austral'},

  // ─── SUDESTE ASIÁTICO EXTRA ─────────────────
  {city:'Phú Quốc', country:'Vietnam', emoji:'🥥', region:'Asia',
    vibe:'isla mágica, playas vírgenes, mercados nocturnos, cocoteros',
    fact:'tiene playas que rivalizan con Maldivas a 1/5 del precio',
    mantra:'una isla donde el wifi llegó hace poco · y todavía es mágica',
    cowork:'Selina Phu Quoc, cafés en Duong Dong', monthly:'600-1.000€', tip:'ir nov-abril · norte de la isla más virgen'},
  {city:'Luang Prabang', country:'Laos', emoji:'🛕', region:'Asia',
    vibe:'monjes al amanecer, río Mekong, templos dorados, calma extrema',
    fact:'es Patrimonio UNESCO y aún parece sacada de otro siglo',
    mantra:'existen ciudades donde el ritmo del mundo se detiene',
    cowork:'casi inexistente · cafés boutique con wifi', monthly:'400-700€', tip:'destino lento · ideal para escribir o desconectar'},
  {city:'Kampot', country:'Camboya', emoji:'🌶️', region:'Asia',
    vibe:'pueblo fluvial, montañas de pimienta, río Mekong, vida muy slow',
    fact:'su pimienta es considerada la mejor del mundo y la usan chefs Michelin',
    mantra:'pueblos donde puedes vivir bien con muy poco',
    cowork:'cafés con wifi en el centro · sin coworkings reales', monthly:'400-650€', tip:'destino infravalorado · 2 horas de Phnom Penh'},
  {city:'Penang (George Town)', country:'Malasia', emoji:'🏮', region:'Asia',
    vibe:'street art, comida brutal (top mundial), arquitectura colonial mezclada',
    fact:'la mejor comida callejera del sudeste asiático según CNN y Lonely Planet',
    mantra:'ciudades que son museo + restaurante + biblioteca a la vez',
    cowork:'WORQ Penang, Settlements, The Co.', monthly:'600-1.000€', tip:'multicultural · barato · perfecto para foodies'},
  {city:'Sanur', country:'Bali, Indonesia', emoji:'🌅', region:'Asia',
    vibe:'la Bali tranquila · familias · amaneceres en la playa · sin caos',
    fact:'es el lado tranquilo de Bali · favorito de nómadas que ya pasaron Canggu',
    mantra:'no toda Bali es turismo · Sanur es el secreto que se pasan los locales',
    cowork:'Genesis Sanur, Tropical Nomad', monthly:'700-1.200€', tip:'la alternativa madura a Canggu · perfecto para enfocarse'},

  // ─── ISLAS COOL ─────────────────────────────
  {city:'Madeira (Funchal)', country:'Portugal', emoji:'🌺', region:'Islas',
    vibe:'isla atlántica · senderos brutales · clima eterna primavera · vinos de uva propia',
    fact:'tiene el primer "nomad village" oficial de Europa (Ponta do Sol)',
    mantra:'una isla portuguesa donde el invierno no existe',
    cowork:'Cowork Funchal, Digital Nomads Madeira Islands', monthly:'900-1.700€', tip:'comunidad nómada fuerte · imprescindible alquilar coche'},
  {city:'Azores (São Miguel)', country:'Portugal', emoji:'🌋', region:'Islas',
    vibe:'lagunas verdes, ballenas, aguas termales, paisaje de Islandia',
    fact:'tiene 9 islas volcánicas y aguas más cálidas que parece increíble',
    mantra:'islas donde te bañas en lagunas verdes y aguas termales',
    cowork:'Cowork Açores, AzoresXperience', monthly:'800-1.400€', tip:'mejor mayo-octubre · alquilar coche imprescindible'},
  {city:'Hvar', country:'Croacia', emoji:'🍇', region:'Islas',
    vibe:'isla adriática · campos de lavanda · pueblos blancos · mar transparente',
    fact:'es la isla más soleada de Europa (2700 horas de sol al año)',
    mantra:'lavanda + mar + vino · receta croata para reset mental',
    cowork:'opciones limitadas · cafés con wifi en Hvar Town', monthly:'1.000-1.800€', tip:'mayo o septiembre · julio-agosto es turismo de fiesta'},
  {city:'Antigua (Saint John\'s)', country:'Antigua y Barbuda', emoji:'🏖️', region:'Islas',
    vibe:'365 playas (una para cada día), aguas turquesa, vibra caribeña real',
    fact:'tiene digital nomad visa · 365 playas oficialmente censadas',
    mantra:'islas donde no repites playa en un año entero',
    cowork:'Antigua Coworking Hub, opciones en hoteles', monthly:'1.200-2.000€', tip:'visa nómada digital fácil · seco, soleado todo el año'},
  {city:'Comporta', country:'Portugal', emoji:'🌾', region:'Islas',
    vibe:'arrozales junto al océano, pueblos blancos, secreto de la jet set',
    fact:'el escondite favorito de la jet set europea sin que nadie lo sepa',
    mantra:'sitios donde puedes ir descalza y tomar vino al atardecer',
    cowork:'casi inexistente · cafés con wifi · trabajar desde casa rural', monthly:'1.000-2.000€', tip:'1h de Lisboa · primavera y otoño · alquilar coche'},
  {city:'Capri', country:'Italia', emoji:'🍋', region:'Islas',
    vibe:'limoneros, gruta azul, pueblos colgados, glamour mediterráneo',
    fact:'aquí escribió Curzio Malaparte y aquí se inventó la insalata caprese',
    mantra:'islas que te hacen entender por qué todo el mundo escribe sobre ellas',
    cowork:'casi nulo · trabajar desde tu alojamiento o cafés', monthly:'1.500-3.000€', tip:'caro · mejor mayo o septiembre · ferry desde Nápoles'},

  // ─── USA COOL ────────────────────────────────
  {city:'Brooklyn (NYC)', country:'Estados Unidos', emoji:'🗽', region:'USA',
    vibe:'cafeterías de especialidad, brownstones, rooftops, energía pura',
    fact:'tiene más coworkings por km² que ningún otro barrio del mundo',
    mantra:'la energía de Brooklyn entra en la sangre y no se va',
    cowork:'WeWork, The Yard, Industrious, Spaces (decenas)', monthly:'2.500-4.000€', tip:'Williamsburg, Bushwick o Greenpoint · caro pero formativo'},
  {city:'Austin', country:'Estados Unidos', emoji:'🌵', region:'USA',
    vibe:'capital indie de Texas, BBQ, música en vivo, food trucks legendarios',
    fact:'tiene SXSW · más live music por noche que cualquier ciudad de USA',
    mantra:'ciudades donde el indie sigue siendo bandera',
    cowork:'WeWork Austin, Capital Factory, Createscape', monthly:'1.800-3.000€', tip:'evita junio-agosto (40°C) · primavera u otoño · zona East Side'},
  {city:'Asheville (Carolina N.)', country:'Estados Unidos', emoji:'🌲', region:'USA',
    vibe:'Apalaches, micro-cervecerías, arte indie, hippie pulido',
    fact:'tiene más cervecerías per cápita que ninguna ciudad de USA',
    mantra:'cuando quieres ciudad pequeña con alma',
    cowork:'Mojo Coworking, The Collider', monthly:'1.500-2.500€', tip:'destino infravalorado · otoño espectacular con los colores'},
  {city:'Savannah (Georgia)', country:'Estados Unidos', emoji:'🌳', region:'USA',
    vibe:'sur profundo, robles cubiertos de musgo español, mansiones, casco histórico',
    fact:'es la ciudad más fotogénica del sur · puro Wes Anderson real',
    mantra:'ciudades donde el sur es una atmósfera, no un lugar',
    cowork:'Bull Street Labs, The Creative Coast', monthly:'1.300-2.200€', tip:'primavera o otoño · evitar verano (humedad brutal)'},
  {city:'Portland (Oregon)', country:'Estados Unidos', emoji:'☕', region:'USA',
    vibe:'café de tercera ola, librerías legendarias (Powell\'s), naturaleza al lado',
    fact:'tiene la librería independiente más grande del mundo (Powell\'s)',
    mantra:'ciudades de café y libros · mejor combinación posible',
    cowork:'Centrl Office, ADX Portland, Workspace Collective', monthly:'1.700-2.700€', tip:'mejor verano (junio-sept) · invierno mucha lluvia'},
  {city:'New Orleans', country:'Estados Unidos', emoji:'🎷', region:'USA',
    vibe:'jazz en cada esquina, comida criolla, casco francés, vibra única en el mundo',
    fact:'es la cuna del jazz · cada calle del French Quarter tiene música',
    mantra:'no hay otra ciudad como esta en el mundo',
    cowork:'Launch Pad NOLA, Propeller, The Shop at the CAC', monthly:'1.400-2.300€', tip:'evitar verano (calor + huracanes) · febrero-mayo ideal'},
  {city:'Charleston (Carolina S.)', country:'Estados Unidos', emoji:'🌸', region:'USA',
    vibe:'mansiones rosa, playas históricas, mejor comida del sur USA',
    fact:'la nombran "ciudad mejor educada de USA" desde 2011 año tras año',
    mantra:'sur con encanto y restaurantes para llorar de gusto',
    cowork:'Local Works, Common House, The Saint', monthly:'1.500-2.500€', tip:'primavera (azaleas) · evitar agosto-septiembre (humedad)'},

  // ─── CIUDADES COOL EXTRA ────────────────────
  {city:'Tbilisi', country:'Georgia', emoji:'🏔️', region:'Europa suave',
    vibe:'fusión persa-soviética-europea, vino milenario, baños sulfurosos, cultura propia',
    fact:'Georgia inventó el vino hace 8000 años · es literalmente la cuna del vino',
    mantra:'ciudades que no parecen estar en Europa pero técnicamente lo están',
    cowork:'Impact Hub Tbilisi, Terminal, Lokal', monthly:'500-900€', tip:'1 año de visa sin papeleo · barato · barrio Vake o Vera'},
  {city:'Ciudad del Cabo', country:'Sudáfrica', emoji:'🦁', region:'África',
    vibe:'montaña + océano + viñedos + arte + safari a 2 horas',
    fact:'tiene la Table Mountain · una de las 7 maravillas naturales del mundo',
    mantra:'sitios donde el océano y la montaña se ven desde el coworking',
    cowork:'Workshop17, Cube Workspace, Inner City Ideas Cartel', monthly:'1.000-1.800€', tip:'noviembre-marzo (verano austral) · zona Sea Point o Camps Bay'},
  {city:'Bucarest', country:'Rumanía', emoji:'📚', region:'Europa suave',
    vibe:'arquitectura belle époque + brutalista, cafés literarios, vida nocturna brutal',
    fact:'es una de las capitales más infravaloradas y baratas de Europa',
    mantra:'ciudades donde tu sueldo rinde 3x sin sacrificar calidad',
    cowork:'Impact Hub Bucharest, Nod Makerspace, Mindspace', monthly:'600-1.200€', tip:'visa nómada digital · barrios Cotroceni o Floreasca'},
  {city:'Ciudad de Panamá', country:'Panamá', emoji:'🌆', region:'Latam',
    vibe:'rascacielos + casco viejo colonial + selva a 30 min + Caribe a 1h',
    fact:'es la capital con más biodiversidad del mundo (selva entra en la ciudad)',
    mantra:'ciudades donde tienes Manhattan + Cartagena + selva en una',
    cowork:'Selina Cowork, Cowork Panamá, Hub40', monthly:'1.000-1.700€', tip:'visa nómada digital fácil · barrio Casco Viejo o Costa del Este'},

  // ─── ISLAS PERDIDAS DE ASIA · joyas escondidas ───
  {city:'Gili Air', country:'Indonesia', emoji:'🐢', region:'Asia',
    vibe:'isla diminuta sin coches · solo bicis y caballos · tortugas en la orilla',
    fact:'son 3 islas perdidas frente a Lombok · Air es la del medio · la más balanceada',
    mantra:'islas donde el sonido más fuerte es el del oleaje',
    cowork:'casi nulo · cafés con wifi en la playa', monthly:'600-900€', tip:'sin coches · ferry desde Bali · ir mayo-octubre'},
  {city:'Nusa Lembongan', country:'Indonesia', emoji:'🌊', region:'Asia',
    vibe:'isla alternativa a Bali · acantilados, mantarrayas, surf, vida lenta',
    fact:'30 min en barco desde Bali pero parece otro planeta · sin agobios',
    mantra:'la Bali que era hace 20 años · pero ahora',
    cowork:'cafés con wifi · The Deck, Sandy Bay', monthly:'700-1.200€', tip:'ferry desde Sanur · Nusa Penida al lado · scooter imprescindible'},
  {city:'Koh Rong Sanloem', country:'Camboya', emoji:'🌅', region:'Asia',
    vibe:'isla virgen, plancton bioluminiscente de noche, sin carreteras',
    fact:'el plancton que brilla en la oscuridad es uno de los espectáculos más raros del mundo',
    mantra:'islas donde el mar se ilumina cuando lo tocas',
    cowork:'inexistente · trabajar desde resort con wifi básico', monthly:'500-900€', tip:'2 horas de Sihanoukville · ir nov-abril · llevar repelente'},
  {city:'Pulau Weh', country:'Indonesia', emoji:'🐠', region:'Asia',
    vibe:'punto más al norte de Indonesia · buceo legendario · pueblos pesqueros',
    fact:'es uno de los mejores spots de buceo del mundo · y casi nadie va',
    mantra:'islas donde el mundo todavía no ha llegado · y mejor así',
    cowork:'inexistente · cafés con wifi en Iboih', monthly:'400-800€', tip:'desde Banda Aceh (Sumatra) · seca y muy auténtica'},
  {city:'Con Dao', country:'Vietnam', emoji:'🦎', region:'Asia',
    vibe:'archipiélago salvaje al sur · playas vacías · selva · tortugas anidando',
    fact:'declarado uno de los 10 destinos más misteriosos del mundo por Lonely Planet',
    mantra:'islas casi vacías donde caminas horas sin cruzarte a nadie',
    cowork:'inexistente · trabajar desde alojamiento', monthly:'600-1.100€', tip:'avión desde Saigón · marzo-septiembre · poco turismo'},
  {city:'Palawan (El Nido)', country:'Filipinas', emoji:'🏝️', region:'Asia',
    vibe:'lagunas turquesa, acantilados de caliza, snorkel infinito · paraíso real',
    fact:'votado por National Geographic la isla más bonita del mundo varias veces',
    mantra:'lugares que las fotos NUNCA hacen justicia',
    cowork:'pocos · cafés con wifi en El Nido pueblo', monthly:'700-1.200€', tip:'ferry o avión · evitar julio-octubre (lluvias) · ir noviembre-mayo'},
  {city:'Yakushima', country:'Japón', emoji:'🌳', region:'Asia',
    vibe:'isla mítica, bosques milenarios (cedros de 7000 años), inspiración de Mononoke',
    fact:'sus bosques inspiraron literalmente "La Princesa Mononoke" de Studio Ghibli',
    mantra:'lugares donde caminas por escenarios de Ghibli y son reales',
    cowork:'casi nulo · cafés con wifi limitado', monthly:'1.000-1.700€', tip:'ferry desde Kagoshima · llueve mucho · desconexión total'},
  {city:'Koh Mak', country:'Tailandia', emoji:'🥥', region:'Asia',
    vibe:'isla familiar y minúscula · sin party · cocoteros · vida absolutamente slow',
    fact:'es la isla tailandesa con menos turismo · solo 500 habitantes',
    mantra:'cuando Koh Lanta ya tiene demasiada gente · viene Koh Mak',
    cowork:'inexistente · cafés con wifi modesto', monthly:'500-800€', tip:'cerca de Koh Chang · auténtica · noviembre-abril'},
  {city:'Ishigaki', country:'Japón', emoji:'🌺', region:'Asia',
    vibe:'isla subtropical japonesa · arrecifes, manatíes, comida okinawa, lentitud',
    fact:'es Japón pero parece Hawái · 80% de los japoneses no la conocen',
    mantra:'el secreto mejor guardado del japón vacacional',
    cowork:'limitado · cafés en Ishigaki ciudad', monthly:'1.200-1.900€', tip:'avión desde Tokio · abril-octubre · arrecifes top mundial'},
  {city:'Phong Nha', country:'Vietnam', emoji:'🏞️', region:'Asia',
    vibe:'cuevas más grandes del mundo, ríos subterráneos, selva, pueblos rurales',
    fact:'tiene Son Doong, la cueva más grande del planeta · cabe un edificio de 40 plantas',
    mantra:'sitios donde la naturaleza te recuerda lo pequeña que eres',
    cowork:'inexistente · cafés con wifi en pueblo', monthly:'400-700€', tip:'no es isla pero es perdido · febrero-agosto'},
  {city:'Raja Ampat', country:'Indonesia', emoji:'🐠', region:'Asia',
    vibe:'archipiélago al confín del mundo · biodiversidad marina #1 del planeta',
    fact:'tiene MÁS especies marinas por km² que ningún otro lugar de la Tierra',
    mantra:'algunos viajes son una vez en la vida · este es uno',
    cowork:'inexistente · trabajar es complicado · destino para desconectar', monthly:'1.500-2.500€', tip:'caro y remoto · 2 vuelos desde Yakarta · octubre-abril'},
  {city:'Koh Tao', country:'Tailandia', emoji:'🤿', region:'Asia',
    vibe:'meca mundial del buceo · isla pequeña, vida marina brutal, pueblos costeros',
    fact:'aquí se sacan más certificaciones de buceo PADI que en ningún otro lugar del mundo',
    mantra:'islas donde lo que hay debajo del agua es el plan principal',
    cowork:'pocos · cafés con wifi · Babaloo o Café del Sol', monthly:'500-900€', tip:'mejor abril-octubre · ferry desde Koh Phangan o Koh Samui'},

  // ─── PUERTO RICO · isla del encanto ────────
  {city:'Viejo San Juan', country:'Puerto Rico', emoji:'🌺', region:'Latam',
    vibe:'casco colonial colorido, fortalezas siglo XVI, salsa en la calle, café boricua',
    fact:'es el segundo asentamiento europeo más antiguo del Caribe (1521) · y se ve',
    mantra:'pocas ciudades caribeñas mezclan así historia y vida real',
    cowork:'Piloto 151, Ron Lab, Engine-4', monthly:'1.000-1.700€', tip:'sin cambio de moneda (USD) · sin visa · invierno (dic-abr) seco'},
  {city:'Vieques', country:'Puerto Rico', emoji:'🐎', region:'Islas',
    vibe:'isla salvaje, playas vírgenes, caballos sueltos por el pueblo, bahía bioluminiscente',
    fact:'tiene la bahía bioluminiscente más brillante del mundo · Mosquito Bay',
    mantra:'islas donde el mar literalmente brilla cuando lo tocas de noche',
    cowork:'casi nulo · cafés con wifi en Esperanza', monthly:'1.200-2.000€', tip:'ferry o avioneta desde Ceiba · ir luna nueva para ver el plancton'},
  {city:'Culebra', country:'Puerto Rico', emoji:'🏝️', region:'Islas',
    vibe:'isla diminuta, Flamenco Beach (top 10 mundo), arrecifes, tortugas',
    fact:'Flamenco Beach está en el top 10 de las mejores playas del mundo (Discovery)',
    mantra:'algunas playas justifican una vida entera de viaje · esta es una',
    cowork:'inexistente · trabajar desde alojamiento', monthly:'1.000-1.700€', tip:'ferry desde Ceiba · sin coches alquiler · llevar todo lo necesario'},
  {city:'Rincón', country:'Puerto Rico', emoji:'🏄‍♀️', region:'Latam',
    vibe:'meca del surf, atardeceres legendarios, vibe relajada, ballenas en invierno',
    fact:'aquí se surfeó el primer mundial de surf de Puerto Rico (1968)',
    mantra:'pueblos donde la vida gira alrededor del mar y de la próxima ola',
    cowork:'Workspace Rincón, cafés con wifi', monthly:'900-1.500€', tip:'oeste de la isla · invierno (ballenas + surf) · ambiente expat'},
  {city:'Isabela', country:'Puerto Rico', emoji:'🌊', region:'Latam',
    vibe:'playas vírgenes, acantilados, surf, paseos a caballo en la arena',
    fact:'tiene el Bosque Estatal de Guajataca · senderos junto al mar',
    mantra:'sitios que aún no aparecen en Pinterest · y mejor así',
    cowork:'limitado · cafés con wifi · trabajar desde alquiler', monthly:'800-1.400€', tip:'Jobos Beach perfecto para principiantes · vibe local sincera'},
  {city:'Cabo Rojo', country:'Puerto Rico', emoji:'🦩', region:'Latam',
    vibe:'acantilados rosados, salinas, faro icónico, playas casi desiertas',
    fact:'sus salinas atraen flamencos · y los acantilados tienen tono rosa real',
    mantra:'paisajes que parecen filtrados pero son así de verdad',
    cowork:'casi nulo · cafés con wifi en Boquerón', monthly:'700-1.300€', tip:'sur-oeste · combinar con La Parguera (otra bahía bioluminiscente)'},
  {city:'Aguadilla', country:'Puerto Rico', emoji:'🌅', region:'Latam',
    vibe:'surf relajado, playa Crashboat, vida costera sencilla, atardeceres top',
    fact:'Crashboat fue base militar · ahora es la playa favorita de los locales',
    mantra:'playas donde locales y viajeros se mezclan sin filtros',
    cowork:'pocos · cafés con wifi en el centro', monthly:'700-1.300€', tip:'aeropuerto Rafael Hernández (vuelos JetBlue desde NYC) · noroeste'},
  {city:'Fajardo', country:'Puerto Rico', emoji:'⛵', region:'Latam',
    vibe:'puerta a islas (Vieques/Culebra/Icacos), bahía bioluminiscente, kayak',
    fact:'su Laguna Grande también es bioluminiscente · una de 5 en el mundo',
    mantra:'sitios donde el mar te ofrece más cosas raras de las que esperas',
    cowork:'limitado · cafés con wifi · resorts con espacios', monthly:'900-1.500€', tip:'base perfecta para hacer day trips a las islas pequeñas'},

  // ─── BALI · más allá de Canggu/Ubud ────────
  {city:'Uluwatu', country:'Bali, Indonesia', emoji:'🌅', region:'Asia',
    vibe:'acantilados de vértigo, surf de leyenda, templos sobre el mar, atardeceres legendarios',
    fact:'el templo Pura Luhur Uluwatu está sobre un acantilado de 70m sobre el océano',
    mantra:'pocos lugares mezclan así espiritualidad y olas perfectas',
    cowork:'Outpost Uluwatu, Tropical Nomad', monthly:'900-1.600€', tip:'sur de Bali · scooter imprescindible · evitar julio-agosto (saturado)'},
  {city:'Amed', country:'Bali, Indonesia', emoji:'🐠', region:'Asia',
    vibe:'costa este tranquila, snorkel directo desde la playa, pescadores tradicionales',
    fact:'el USS Liberty (barco hundido WWII) está en Tulamben · snorkel sin barco',
    mantra:'la Bali sin nómadas digitales · solo mar y vida lenta',
    cowork:'casi inexistente · cafés con wifi básico', monthly:'500-900€', tip:'mejor abril-octubre · vista del Monte Agung al fondo'},
  {city:'Sidemen', country:'Bali, Indonesia', emoji:'🌾', region:'Asia',
    vibe:'arrozales escondidos, valle entre montañas, la Bali que era hace 30 años',
    fact:'fue el escondite favorito de pintores y escritores en los 30 · y sigue siendo eso',
    mantra:'valles donde el ritmo es el de los arroceros · y nada más',
    cowork:'inexistente · trabajar desde tu villa con vista', monthly:'600-1.100€', tip:'30 min de Ubud pero parece otra era · alquilar villa con piscina'},
  {city:'Munduk', country:'Bali, Indonesia', emoji:'💧', region:'Asia',
    vibe:'montañas, cascadas, plantaciones de café y clavo, niebla matinal',
    fact:'tiene 5 cascadas en menos de 3km · senderismo entre selva tropical',
    mantra:'la Bali fría · cuando necesitas suéter en el trópico',
    cowork:'inexistente · alojamientos con wifi modesto', monthly:'500-900€', tip:'norte de Bali · 1500m de altura · perfecto para escapar del calor'},
  {city:'Nusa Penida', country:'Indonesia', emoji:'🏔️', region:'Asia',
    vibe:'acantilados gigantes, mantarrayas, playas escondidas, paisajes irreales',
    fact:'Kelingking Beach (\"playa T-Rex\") es el acantilado más fotografiado de Indonesia',
    mantra:'paisajes que parecen Photoshop · y son de verdad',
    cowork:'pocos · cafés con wifi en Toyapakeh', monthly:'600-1.000€', tip:'ferry desde Sanur · scooter o jeep · no es para principiantes en moto'},
  {city:'Lovina', country:'Bali, Indonesia', emoji:'🐬', region:'Asia',
    vibe:'costa norte tranquila, delfines al amanecer, arena negra volcánica',
    fact:'es el lado opuesto al turístico · 80% locales · 20% expatriados antiguos',
    mantra:'sitios donde la mañana empieza viendo delfines · literalmente',
    cowork:'inexistente · cafés con wifi simples', monthly:'400-800€', tip:'norte de Bali · arena negra · mejor abril-octubre'},
  {city:'Jimbaran', country:'Bali, Indonesia', emoji:'🦐', region:'Asia',
    vibe:'pueblo pesquero, marisco fresco a pie de playa, atardeceres, vibe relajada',
    fact:'aquí cenas pescado fresco con los pies en la arena · ritual obligatorio',
    mantra:'la Bali de marisco frente al mar · sin estridencias',
    cowork:'algunos · cafés con wifi · cerca de Uluwatu para combinar', monthly:'700-1.200€', tip:'sur de Bali · entre aeropuerto y Uluwatu · perfecto para llegada/salida'},
  {city:'Tegalalang', country:'Bali, Indonesia', emoji:'🌿', region:'Asia',
    vibe:'arrozales en terraza más fotografiados de Bali, vibe boho, cafés con vista',
    fact:'sus arrozales son patrimonio UNESCO · construidos hace 1000 años',
    mantra:'paisajes que se construyeron a mano siglo tras siglo',
    cowork:'cafés con vista a los arrozales · wifi sólido', monthly:'700-1.200€', tip:'10 min al norte de Ubud · ir temprano (8am) antes que los tours'},
];

// ═══════════════════════════════════════════════════════════════════
// BANCO DE HOOKS — 45 hooks organizados por pilar y arquetipo
// ═══════════════════════════════════════════════════════════════════
const HOOKS = [
  {n:1, f:'No sabía por qué no había hablado de esto antes, pero...', e:'No sabía por qué no había hablado de esto antes, pero hay 3 derechos laborales que nadie te explica cuando firmas tu primer contrato.', p:'autoridad', a:'principiante'},
  {n:2, f:'Cosas que me hubiese gustado saber antes, así que te las comparto...', e:'Cosas que me hubiese gustado saber antes de mi primera entrevista, así que te las comparto para que no pases lo que yo pasé.', p:'autoridad', a:'principiante'},
  {n:3, f:'Esto ya no me lo guardo más...', e:'Esto ya no me lo guardo más: la verdadera razón por la que no te llaman después de enviar el CV no es tu experiencia.', p:'autoridad', a:'principiante'},
  {n:4, f:'¿Hay algo peor que ___?', e:'¿Hay algo peor que preparar una entrevista durante 3 días y que te la cancelen por email?', p:'autoridad', a:'ambas'},
  {n:5, f:'La forma más rápida de ___', e:'La forma más rápida de saber si tu CV está funcionando (y no, no es esperar a que te llamen).', p:'autoridad', a:'principiante'},
  {n:6, f:'Esto va a cambiar tu forma de ___', e:'Esto va a cambiar tu forma de ver tu experiencia de prácticas para siempre.', p:'autoridad', a:'principiante'},
  {n:7, f:'Cosas que nadie te cuenta sobre ___', e:'Cosas que nadie te cuenta sobre cambiar de sector después de los 30.', p:'autoridad', a:'experta'},
  {n:8, f:'Dame 2 minutos y te convenzo de que ___', e:'Dame 2 minutos y te convenzo de que tus competencias valen más de lo que crees.', p:'autoridad', a:'experta'},
  {n:9, f:'Probé ___ para que tú no tengas que hacerlo', e:'Probé 5 formas de escribir el titular de LinkedIn para que tú no tengas que hacerlo. Esto es lo que funcionó.', p:'autoridad', a:'ambas'},
  {n:10, f:'Si hay algo que necesitas hacer ahora mismo, es esto...', e:'Si hay algo que necesitas hacer ahora mismo en tu LinkedIn, es esto. Te lo explico en 60 segundos.', p:'autoridad', a:'ambas'},
  {n:11, f:'Opinión impopular: X es mejor que Y', e:'Opinión impopular: un buen LinkedIn te abre más puertas que un máster.', p:'autoridad', a:'ambas'},
  {n:12, f:'Esto es lo único que creo que todo el mundo debería saber', e:'Esto es lo único que creo que toda mujer debería saber antes de negociar su salario.', p:'autoridad', a:'experta'},
  {n:13, f:'No sé vosotras, pero yo siempre pensé que...', e:'No sé vosotras, pero yo siempre pensé que si no tenía trabajo al mes de graduarme era un fracaso.', p:'conexion', a:'principiante'},
  {n:14, f:'¿Quién más se ha dado cuenta de que...?', e:'¿Quién más se ha dado cuenta de que en LinkedIn todo el mundo parece tener la vida profesional perfecta menos tú?', p:'conexion', a:'ambas'},
  {n:15, f:'Mi viaje con ___ ha sido una locura', e:'Mi viaje montando Dramas Laborales ha sido una locura. Os cuento lo que nadie ve.', p:'conexion', a:'ambas'},
  {n:16, f:'Vamos a probar algo nuevo juntas', e:'Vamos a probar algo nuevo juntas: esta semana, una acción pequeña para tu carrera. ¿Te apuntas?', p:'conexion', a:'ambas'},
  {n:17, f:'Nunca había contado esto...', e:'Nunca había contado esto, pero en mi primera entrevista de trabajo me quedé completamente en blanco.', p:'conexion', a:'principiante'},
  {n:18, f:'Esto me lo dijo alguien y me cambió todo', e:'Esto me lo dijo una mentora y me cambió la forma de ver mi carrera para siempre.', p:'conexion', a:'ambas'},
  {n:19, f:'No quiero ser dramática, pero...', e:'No quiero ser dramática, pero el domingo por la noche pensando en el lunes es un deporte de riesgo emocional.', p:'conexion', a:'experta'},
  {n:20, f:'Esto es lo que tu drama laboral diría si fuera un audio de WhatsApp', e:'Esto es lo que tu drama laboral diría si fuera un audio de WhatsApp a tu mejor amiga a las 23:00.', p:'conexion', a:'ambas'},
  {n:21, f:'¿Soy la única que acaba de descubrir que ___?', e:'¿Soy la única que acaba de descubrir que puedes negociar las condiciones de tu contrato aunque seas junior?', p:'conexion', a:'principiante'},
  {n:22, f:'Haz lo que quieras, pero ___', e:'Haz lo que quieras, pero no aceptes un trabajo solo porque «tienes que pagar facturas» sin antes leer esto.', p:'conexion', a:'ambas'},
  {n:23, f:'¿Qué te da más miedo: ___ o ___?', e:'¿Qué te da más miedo: quedarte en un trabajo que no te llena o lanzarte a algo nuevo?', p:'conexion', a:'experta'},
  {n:24, f:'Bienvenida al lado de Instagram donde ___', e:'Bienvenida al lado de Instagram donde hablamos de dramas laborales sin filtro y con mucho humor.', p:'conexion', a:'ambas'},
  {n:25, f:'Nadie me contó lo difícil que sería ___', e:'Nadie me contó lo difícil que sería buscar trabajo y mantener la autoestima intacta al mismo tiempo.', p:'conexion', a:'principiante'},
  {n:26, f:'Este es tu recordatorio diario de que...', e:'Este es tu recordatorio diario de que no tener experiencia no significa que no tengas nada que ofrecer.', p:'confianza', a:'principiante'},
  {n:27, f:'Te voy a coger de la mano para decirte esto...', e:'Te voy a coger de la mano para decirte esto: no has fracasado por querer cambiar de rumbo a los 35.', p:'confianza', a:'experta'},
  {n:28, f:'Siento decirte esto, pero...', e:'Siento decirte esto, pero enviar 50 CVs iguales a ofertas diferentes no es una estrategia de búsqueda de empleo.', p:'confianza', a:'principiante'},
  {n:29, f:'Esto es para [grupo], si no eres tú, sigue de largo...', e:'Esto es para mujeres profesionales que llevan meses pensando en cambiar de trabajo pero no se atreven. Si no eres tú, sigue de largo.', p:'confianza', a:'experta'},
  {n:30, f:'Mi peor miedo se hizo realidad...', e:'Mi peor miedo profesional se hizo realidad: me despidieron. Y fue lo mejor que me pudo pasar.', p:'confianza', a:'ambas'},
  {n:31, f:'No me creen cuando les digo lo fácil que es ___', e:'No me creen cuando les digo lo fácil que es mejorar un CV en 30 minutos cuando sabes qué tocar.', p:'confianza', a:'principiante'},
  {n:32, f:'Probé ___ durante una semana y esto es lo que pasó', e:'Probé cambiar mi estrategia de LinkedIn durante una semana y esto es lo que pasó (con números).', p:'confianza', a:'ambas'},
  {n:33, f:'«Es que no tengo nada que poner en el CV»', e:'«Es que no tengo nada que poner en el CV.» Frase que más escucho de principiantes. Vamos a desmontarla.', p:'confianza', a:'principiante'},
  {n:34, f:'No te voy a decir que renuncies mañana', e:'No te voy a decir que renuncies mañana. Te voy a decir algo mucho más útil.', p:'confianza', a:'experta'},
  {n:35, f:'«Pensé que era la única así»', e:'«Pensé que era la única así.» Esto es lo que me dijo una clienta después de su primera sesión.', p:'confianza', a:'ambas'},
  {n:36, f:'¿Cómo es posible que esto no sea trending?', e:'¿Cómo es posible que nadie hable de esto? Hay una forma de saber exactamente qué te está frenando en tu carrera. Te la cuento.', p:'venta', a:'ambas'},
  {n:37, f:'Si odias ___, te va a encantar ___', e:'Si odias enviar CVs a ciegas, te va a encantar saber que hay otra forma de buscar trabajo. La explico en el ebook.', p:'venta', a:'principiante'},
  {n:38, f:'Esto cambió todo para mí/mis clientas', e:'Esto cambió todo para mis clientas: pasar de «no sé qué quiero» a «tengo 2 rutas claras» en una sola sesión.', p:'venta', a:'experta'},
  {n:39, f:'Esto debería ser ilegal compartirlo', e:'Esto debería ser ilegal compartirlo: el ejercicio que más claridad da en mis asesorías (te doy una parte gratis).', p:'venta', a:'ambas'},
  {n:40, f:'No tengo plan B, así que esto tiene que funcionar...', e:'No tengo plan B con Dramas Laborales, así que voy a darte el mejor recurso que he creado hasta ahora.', p:'venta', a:'ambas'},
  {n:41, f:'Este único cambio me/les hizo ___', e:'Este único cambio en su CV le consiguió 3 entrevistas en una semana. Hoy te enseño cuál fue.', p:'venta', a:'principiante'},
  {n:42, f:'He estado guardándome ___ demasiado tiempo', e:'He estado guardándome esta guía demasiado tiempo. Hoy la lanzo: Tu Próximo Capítulo.', p:'venta', a:'ambas'},
  {n:43, f:'Esto es tu señal para por fin ___', e:'Esto es tu señal para dejar de darle vueltas y empezar a moverte. Y tengo algo que te puede ayudar.', p:'venta', a:'ambas'},
  {n:44, f:'Y ya que estamos hablando de ___, déjame decirte ___', e:'Y ya que estamos hablando de sentirte perdida profesionalmente, déjame contarte qué hacemos exactamente en una asesoría.', p:'venta', a:'ambas'},
  {n:45, f:'___ vs ___: ¿cuál es mejor?', e:'Ebook vs Asesoría vs Acompañamiento: te explico cuál es para ti según tu momento profesional.', p:'venta', a:'ambas'}
];

const PILLAR_STYLES = {
  autoridad: {bg: '#E7D8F0', color: '#7B5A91', label:'autoridad'},
  conexion:  {bg: '#F6D3DC', color: '#C0627C', label:'conexión'},
  confianza: {bg: '#F9E4C6', color: '#B88449', label:'confianza'},
  venta:     {bg: '#D5E8D4', color: '#5C8A5C', label:'venta'},
};

// ═══════════════════════════════════════════════════════════════════
// STORAGE HELPERS (persistencia)
// ═══════════════════════════════════════════════════════════════════
// Guardamos el último error para poder mostrarlo en UI si algo falla
let LAST_STORAGE_ERROR = '';
const storageListeners = new Set();
function setLastErr(msg) {
  LAST_STORAGE_ERROR = msg || '';
  storageListeners.forEach(fn => { try { fn(LAST_STORAGE_ERROR); } catch {} });
}

async function sget(key) {
  // On Vercel (no window.storage), always use localStorage
  if (typeof window === 'undefined') return null;
  if (!window.storage) {
    try {
      const raw = window.localStorage?.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch (e) {
    const msg = e?.message || String(e);
    if (/not.*found|does not exist|404/i.test(msg)) return null;
    // Fallback to localStorage
    try {
      const raw = window.localStorage?.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}

async function sset(key, val) {
  // Siempre guardar en localStorage como respaldo principal
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(val));
    }
  } catch {}
  // Si window.storage no existe (ej: Vercel), localStorage es suficiente
  if (typeof window === 'undefined' || !window.storage) {
    setLastErr('');
    return true;
  }
  const body = JSON.stringify(val);
  try {
    const r = await window.storage.set(key, body);
    if (r) { setLastErr(''); return true; }
    setLastErr('set devolvió null (clave ' + key + ')');
    return false;
  } catch (e) {
    console.error('[storage set]', key, e);
    setLastErr(`set · ${e?.message || String(e)}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════
// APP STATE MANAGER — una sola clave, escrituras en lote (debounced)
// Evita superar el rate limit al agrupar todos los cambios.
// ═══════════════════════════════════════════════════════════════════
const STATE_KEY = 'dl:state';
const STATE_DEFAULT = () => ({posts:{}, stories:{}, income:{}, metrics:{}, canvaFeed:{}, tasks:[], launches:{}, hashtags:{active:[], testing:[], archive:[]}, customPosts:{ig:[], li:[], ss:[]}, deletedPosts:[], customWomen:[], deletedWomen:[], customDates:[], deletedDates:[], customHooks:[], deletedHooks:[], editedHighlights:{}});
let stateCache = STATE_DEFAULT();
let stateLoaded = false;
let stateLoadPromise = null;
let stateWriteTimer = null;
let stateWriteInFlight = false;
const stateSubs = new Set();
const writeStateSubs = new Set();

async function loadState() {
  if (stateLoaded) return stateCache;
  if (stateLoadPromise) return stateLoadPromise;
  stateLoadPromise = (async () => {
    const v = await sget(STATE_KEY);
    stateCache = Object.assign(STATE_DEFAULT(), v || {});
    stateLoaded = true;
    stateSubs.forEach(fn => { try { fn(); } catch {} });
    return stateCache;
  })();
  return stateLoadPromise;
}

function notifyWriteState() {
  writeStateSubs.forEach(fn => { try { fn(); } catch {} });
}

// Contador de cambios para auto-recordar backup
let _changeCount = 0;

function updateState(updater) {
  try { updater(stateCache); } catch (e) { console.error('updater', e); }
  stateSubs.forEach(fn => { try { fn(); } catch {} });
  // Respaldo INMEDIATO a localStorage (nunca da rate limit)
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STATE_KEY, JSON.stringify(stateCache));
      // Incrementar contador de cambios sin guardar
      _changeCount++;
      window.localStorage.setItem('__unsaved_changes', _changeCount.toString());
    }
  } catch {}
  // debounce write to window.storage (API, puede tener rate limit)
  if (stateWriteTimer) clearTimeout(stateWriteTimer);
  notifyWriteState();
  stateWriteTimer = setTimeout(async () => {
    stateWriteTimer = null;
    stateWriteInFlight = true;
    notifyWriteState();
    // Reintento con backoff si falla por rate limit
    let ok = false;
    for (let attempt = 0; attempt < 3 && !ok; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 2000 * attempt));
      ok = await sset(STATE_KEY, stateCache);
    }
    stateWriteInFlight = false;
    notifyWriteState();
  }, 2000); // 2 segundos de debounce en vez de 600ms — mucho menor riesgo de rate limit
}

async function loadStateWithFallback() {
  if (stateLoaded) return stateCache;
  if (stateLoadPromise) return stateLoadPromise;
  stateLoadPromise = (async () => {
    // Intentar primero window.storage
    let v = await sget(STATE_KEY);
    // Si falla o está vacío, intentar localStorage
    if (!v) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const raw = window.localStorage.getItem(STATE_KEY);
          if (raw) v = JSON.parse(raw);
        }
      } catch {}
    }
    stateCache = Object.assign(STATE_DEFAULT(), v || {});
    // Merge Notion statuses into local state (Notion wins for status field)
    try {
      await loadNotionStatuses();
      for (const [title, entry] of Object.entries(notionStatusMap)) {
        const key = `instagram:${title}`;
        // find matching post key by title
        for (const [k, val] of Object.entries(stateCache.posts || {})) {
          // skip - we'll match by title when syncing
        }
      }
    } catch {}
    stateLoaded = true;
    stateSubs.forEach(fn => { try { fn(); } catch {} });
    return stateCache;
  })();
  return stateLoadPromise;
}

// Hook principal: devuelve el estado y una función de actualización
function useAppState() {
  const [, setTick] = useState(0);
  const [ready, setReady] = useState(stateLoaded);
  useEffect(() => {
    let alive = true;
    if (!stateLoaded) {
      loadStateWithFallback().then(() => { if (alive) { setReady(true); setTick(t => t+1); } });
    }
    const sub = () => { if (alive) setTick(t => t+1); };
    stateSubs.add(sub);
    return () => { alive = false; stateSubs.delete(sub); };
  }, []);
  return [stateCache, updateState, ready];
}

// Subs para cambios de tema · todos los componentes se re-renderizan
const themeSubs = new Set();
function useTheme() {
  const [theme, setLocalTheme] = useState(_currentTheme);
  useEffect(() => {
    const sub = () => setLocalTheme(_currentTheme);
    themeSubs.add(sub);
    // Aplicar tema al body en el primer mount
    if (typeof document !== 'undefined') {
      document.body.style.background = (_currentTheme === 'dark' ? C_DARK : C_LIGHT).bg;
      document.body.style.color = (_currentTheme === 'dark' ? C_DARK : C_LIGHT).ink;
    }
    return () => themeSubs.delete(sub);
  }, []);
  const toggle = () => {
    const newTheme = _currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    themeSubs.forEach(s => s());
  };
  return { theme, toggle };
}

// Estado global de escritura para mostrar indicador "guardando/guardado"
function useWriteIndicator() {
  const computeState = () => 
    stateWriteTimer ? 'pending' : (stateWriteInFlight ? 'saving' : 'idle');
  const [st, setSt] = useState(computeState);
  useEffect(() => {
    const cb = () => setSt(computeState());
    writeStateSubs.add(cb);
    return () => writeStateSubs.delete(cb);
  }, []);
  return st;
}

// Hook para que componentes puedan reaccionar al error global
function useLastStorageError() {
  const [err, setErr] = useState(LAST_STORAGE_ERROR);
  useEffect(() => {
    storageListeners.add(setErr);
    return () => storageListeners.delete(setErr);
  }, []);
  return err;
}

// Indicador global de guardado en sidebar
function GlobalSaveIndicator() {
  const st = useWriteIndicator();
  const err = useLastStorageError();
  let label, bg, color;
  if (err) { label = '✕ error al sincronizar'; bg = '#FDE4E4'; color = '#B04545'; }
  else if (st === 'pending') { label = '○ cambios pendientes'; bg = '#FDF0DC'; color = '#A06F2A'; }
  else if (st === 'saving') { label = '◐ guardando…'; bg = '#E8F2DD'; color = '#5A7940'; }
  else { label = '♡ todo guardado'; bg = '#F3E9E7'; color = '#7A5555'; }
  return (
    <div style={{
      marginTop: 10, fontSize: 10, padding: '5px 10px', borderRadius: 100,
      background: bg, color, fontWeight: 500, display: 'inline-block', letterSpacing: 0.3
    }} title={err || 'Los cambios se guardan automáticamente'}>
      {label}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// UI PRIMITIVES
// ═══════════════════════════════════════════════════════════════════
const Card = ({children, style={}, hover=false, ...p}) => (
  <div style={{
    background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
    padding: 20, transition: 'all 0.2s', boxSizing: 'border-box', minWidth: 0, ...style
  }} {...p}>{children}</div>
);

const Badge = ({children, bg=C.bgSoft, color=C.ink, style={}}) => (
  <span style={{
    display:'inline-flex', alignItems:'center', gap:6,
    background: bg, color, padding:'4px 10px', borderRadius: 100,
    fontSize: 11, fontWeight: 500, letterSpacing: 0.2, ...style
  }}>{children}</span>
);

const Btn = ({children, onClick, variant='primary', style={}, small=false, ...p}) => {
  const styles = {
    primary: {background: C.ink, color: C.bg, border: 'none'},
    ghost: {background: 'transparent', color: C.ink, border: `1px solid ${C.border}`},
    accent: {background: C.accent, color: '#fff', border: 'none'},
    soft: {background: C.bgSoft, color: C.ink, border: 'none'}
  };
  return <button onClick={onClick} style={{
    padding: small ? '6px 12px' : '10px 18px',
    borderRadius: 100, fontSize: small ? 12 : 13, fontWeight: 500,
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
    ...styles[variant], ...style
  }} {...p}>{children}</button>;
};

const H = ({children, size='lg', style={}}) => {
  const s = {
    xl: {fontSize: 40, fontWeight: 400},
    lg: {fontSize: 28, fontWeight: 400},
    md: {fontSize: 20, fontWeight: 500},
    sm: {fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, color: C.inkSoft}
  };
  return <h2 style={{fontFamily: "'Fraunces', serif", margin:0, color: C.ink, ...s[size], ...style}}>{children}</h2>;
};

// Status Badge
const StatusPill = ({status, onClick}) => {
  const s = STATUS[status] || STATUS.pending;
  const Icon = s.icon;
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', gap:6,
      background: s.color+'40', color: C.ink, padding:'4px 10px', 
      borderRadius:100, fontSize:11, fontWeight:500, border:'none',
      cursor:'pointer', fontFamily:'inherit'
    }}>
      <Icon size={12} /> {s.label}
    </button>
  );
};



// ═══════════════════════════════════════════════════════════════════
// NOTION SYNC — lee estados en tiempo real desde Notion
// ═══════════════════════════════════════════════════════════════════
const notionStatusMap = {
  '⏳ Pendiente': 'pending',
  '✏️ Creando': 'creating',
  '📅 Programado': 'scheduled',
  '✅ Publicado': 'published',
};

// Cache de pageIds de Notion (fecha → pageId) para poder actualizar
const notionPageIds = {};

async function fetchNotionStatuses() {
  try {
    const res = await fetch('/api/notion?action=get_statuses');
    if (!res.ok) return;
    const data = await res.json();
    if (!data.ok) return;

    // Actualizar estado local con los estados de Notion
    updateState(state => {
      const allPosts = D.posts.ig || [];
      for (const post of allPosts) {
        const fecha = post.d;
        if (!fecha) continue;
        const notionEntry = data.statuses[fecha];
        if (!notionEntry) continue;
        
        const localStatus = notionStatusMap[notionEntry.estado] || 'pending';
        const key = `instagram:${post.i}`;
        if (!state.posts[key]) state.posts[key] = {};
        state.posts[key].status = localStatus;
        notionPageIds[fecha] = notionEntry.pageId;
      }
    });
  } catch (e) {
    console.warn('Notion sync failed:', e);
  }
}

async function fetchNotionRevenue() {
  try {
    const res = await fetch('/api/notion?action=get_revenue');
    if (!res.ok) return;
    const data = await res.json();
    if (!data.ok) return;

    updateState(state => {
      for (const [mes, entry] of Object.entries(data.revenue)) {
        if (!state.income) state.income = {};
        if (!state.income[mes]) state.income[mes] = {};
        if (entry.real !== null && entry.real !== undefined) {
          state.income[mes].total = entry.real;
        }
        notionPageIds[`rev_${mes}`] = entry.pageId;
      }
    });
  } catch (e) {
    console.warn('Notion revenue sync failed:', e);
  }
}

// Sync to Notion when a post status changes
async function syncStatusToNotion(post, newStatus) {
  const pageId = notionPageIds[post.d];
  if (!pageId) return;
  const notionStatus = Object.entries(notionStatusMap).find(([,v]) => v === newStatus)?.[0] || '⏳ Pendiente';
  try {
    await fetch('/api/notion?action=update_status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId, status: notionStatus }),
    });
  } catch (e) {
    console.warn('Notion update failed:', e);
  }
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState('dashboard');
  const [month, setMonth] = useState(() => {
    // Detectar mes actual automáticamente
    const now = new Date();
    const monthNum = now.getMonth() + 1; // 1-12
    const map = {4:'abril',5:'mayo',6:'junio',7:'julio',8:'agosto',9:'septiembre',10:'octubre',11:'noviembre',12:'diciembre'};
    const detected = map[monthNum];
    // Verificar que existe en MONTHS_ES (si no, usar mayo como base)
    if (detected && MONTHS_ES.find(m => m.id === detected)) return detected;
    return 'mayo';
  });
  const storageErr = useLastStorageError();
  const { theme, toggle: toggleTheme } = useTheme();

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=DM+Sans:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    document.body.style.margin = '0';
    document.body.style.fontFamily = "'DM Sans', sans-serif";
  }, []);

  // Notion sync on mount
  useEffect(() => {
    fetchNotionStatuses();
    fetchNotionRevenue();
    // Refresh every 5 minutes
    const interval = setInterval(() => {
      fetchNotionStatuses();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);


  // Aplicar el color del body cada vez que cambie tema
  useEffect(() => {
    document.body.style.background = C.bg;
    document.body.style.color = C.ink;
  }, [theme]);

  const NAV = [
    {id:'dashboard', label:'Dashboard', icon:Home, group:'principal'},
    {id:'calendar', label:'Calendario', icon:CalIcon, group:'principal'},
    {id:'centro', label:'Centro de mando', icon:Target, group:'principal'},
    {id:'tasks', label:'To Do', icon:Check, group:'principal'},
    {id:'instagram', label:'Instagram', icon:IgIcon, group:'redes', color:C.igDark},
    {id:'linkedin', label:'LinkedIn', icon:LiIcon, group:'redes', color:C.liDark},
    {id:'substack', label:'Substack', icon:FileText, group:'redes', color:C.ssDark},
    {id:'tiktok', label:'TikTok', icon:Video, group:'redes', color:C.ttDark},
    {id:'stories', label:'Historias IG', icon:Heart, group:'redes', color:C.igDark},
    {id:'feed', label:'Feed Visual', icon:Grid, group:'redes', color:C.igDark},
    {id:'highlights', label:'Destacadas IG', icon:Sparkles, group:'redes', color:C.igDark},
    {id:'income', label:'Proyección ingresos', icon:TrendingUp, group:'análisis'},
    {id:'metrics', label:'Métricas', icon:BarChart3, group:'análisis'},

    {id:'dates', label:'Fechas clave', icon:Star, group:'recursos'},
    {id:'hashtags', label:'Hashtags', icon:Hash, group:'recursos'},
    {id:'hooks', label:'Banco de hooks', icon:CopyIcon, group:'recursos'},
    {id:'women', label:'Mujeres que inspiran', icon:Sparkles, group:'recursos'},
    {id:'backup', label:'Backup ✦', icon:Heart, group:'recursos'},
  ];

  const groups = ['principal','redes','análisis','recursos'];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar sidebar móvil al cambiar de vista
  useEffect(() => {
    if (isMobile) setMobileOpen(false);
  }, [view, isMobile]);

  return (
    <div style={{display:'flex', minHeight:'100vh', background:C.bg, fontFamily: "'DM Sans', sans-serif", color:C.ink}}>
      {/* Mobile header con hamburguesa */}
      {isMobile && (
        <div style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50,
          background:C.card, borderBottom:`1px solid ${C.border}`,
          padding:'12px 16px', display:'flex', alignItems:'center', gap:12,
          boxShadow:'0 2px 4px rgba(0,0,0,0.04)'
        }}>
          <button onClick={() => setMobileOpen(true)} style={{
            background:'transparent', border:'none', cursor:'pointer', padding:4, 
            color:C.ink, fontSize:22, lineHeight:1
          }} aria-label="menú">☰</button>
          <div style={{
            fontFamily:"'Fraunces', serif", fontSize:16, fontWeight:500, 
            color:C.ink, fontStyle:'italic', flex:1
          }}>dramas laborales</div>
          <GlobalSaveIndicator />
        </div>
      )}

      {/* Overlay móvil */}
      {isMobile && mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:60,
          backdropFilter:'blur(3px)'
        }}/>
      )}

      {/* SIDEBAR */}
      <aside style={{
        width: isMobile ? 280 : 260, 
        background:C.card, borderRight:`1px solid ${C.border}`,
        padding: isMobile ? '20px 18px' : '28px 20px', 
        position:'fixed', height:'100vh', overflowY:'auto',
        top:0, left:0,
        zIndex: isMobile ? 70 : 10,
        transform: isMobile ? (mobileOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        transition: 'transform 0.25s ease'
      }}>
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} style={{
            position:'absolute', top:14, right:14, background:'transparent', 
            border:'none', cursor:'pointer', color:C.inkSoft, fontSize:22, lineHeight:1,
            padding:4
          }} aria-label="cerrar menú">×</button>
        )}
        <div style={{marginBottom: 32}}>
          <div style={{
            fontFamily:"'Fraunces', serif", fontSize:22, fontWeight:500, 
            color:C.ink, letterSpacing:-0.5, fontStyle:'italic'
          }}>dramas laborales</div>
          <div style={{fontSize:11, color:C.inkSoft, marginTop:4, letterSpacing:1, textTransform:'uppercase'}}>
            dashboard · 2026
          </div>
          {!isMobile && <GlobalSaveIndicator />}
          
          {/* TOGGLE MODO CLARO/OSCURO */}
          <button onClick={toggleTheme} style={{
            marginTop:14, padding:'6px 12px', borderRadius:100,
            background:C.bgSoft, border:`1px solid ${C.border}`,
            color:C.ink, fontSize:11, cursor:'pointer',
            fontFamily:'inherit', display:'flex', alignItems:'center', gap:6,
            transition:'all 0.15s', width:'fit-content'
          }} 
          onMouseOver={e => { e.currentTarget.style.background = C.accent + '20'; }}
          onMouseOut={e => { e.currentTarget.style.background = C.bgSoft; }}
          title={`cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}>
            <span style={{fontSize:13}}>{theme === 'dark' ? '☀' : '☾'}</span>
            <span>{theme === 'dark' ? 'modo claro' : 'modo oscuro'}</span>
          </button>
        </div>

        {groups.map(g => (
          <div key={g} style={{marginBottom:24}}>
            <div style={{
              fontSize:10, color:C.inkSoft, textTransform:'uppercase',
              letterSpacing:1.5, fontWeight:600, marginBottom:8, paddingLeft:12
            }}>{g}</div>
            {NAV.filter(n => n.group === g).map(n => {
              const Icon = n.icon;
              const active = view === n.id;
              return (
                <button key={n.id} onClick={() => setView(n.id)} style={{
                  display:'flex', alignItems:'center', gap:12, width:'100%',
                  padding:'10px 12px', border:'none', background: active ? C.bgSoft : 'transparent',
                  borderRadius:10, cursor:'pointer', color: active ? C.ink : C.inkSoft,
                  fontSize:13, fontWeight: active ? 500 : 400, fontFamily:'inherit',
                  marginBottom:2, transition:'all 0.15s', textAlign:'left'
                }}>
                  <Icon size={16} style={{color: n.color || (active ? C.ink : C.inkSoft)}} />
                  {n.label}
                </button>
              );
            })}
          </div>
        ))}
      </aside>

      {/* MAIN */}
      <main style={{
        flex:1, 
        marginLeft: isMobile ? 0 : 260, 
        marginTop: isMobile ? 52 : 0,
        padding: isMobile ? '16px 14px' : '40px 48px', 
        maxWidth: isMobile ? '100vw' : 'calc(100vw - 260px)', 
        boxSizing:'border-box', overflowX:'hidden',
        width: '100%'
      }}>
        {storageErr && (
          <div style={{
            background:'#FFF1F1', border:'1px solid #E9B9B9', borderRadius:12,
            padding:'12px 16px', marginBottom:20, fontSize:12, color:'#8B3A3A',
            display:'flex', alignItems:'flex-start', gap:10
          }}>
            <div style={{fontSize:14, lineHeight:1}}>⚠</div>
            <div style={{flex:1, lineHeight:1.5}}>
              <strong style={{fontWeight:600}}>no se está guardando correctamente.</strong><br/>
              <span style={{fontFamily:'monospace', fontSize:11, color:'#5A2828'}}>{storageErr}</span>
            </div>
            <button onClick={() => setLastErr('')} style={{background:'transparent', border:'none', color:'#8B3A3A', cursor:'pointer', padding:4}}><X size={14}/></button>
          </div>
        )}
        {view === 'dashboard' && <Dashboard setView={setView} month={month} setMonth={setMonth} />}
        {view === 'calendar' && <CalendarView month={month} setMonth={setMonth} />}
        {view === 'centro' && <CentroMandoView month={month} setMonth={setMonth} />}
        {view === 'strategy' && <StrategyView />}
        {view === 'tasks' && <TasksView setView={setView} setMonth={setMonth} />}
        {view === 'plan' && <PlanView setView={setView} setMonth={setMonth} />}
        {view === 'instagram' && <PlatformView platform="instagram" month={month} setMonth={setMonth} />}
        {view === 'linkedin' && <PlatformView platform="linkedin" month={month} setMonth={setMonth} />}
        {view === 'substack' && <PlatformView platform="substack" month={month} setMonth={setMonth} />}
        {view === 'tiktok' && <TikTokView month={month} setMonth={setMonth} />}
        {view === 'stories' && <StoriesView month={month} setMonth={setMonth} />}
        {view === 'feed' && <FeedView />}
        {view === 'highlights' && <HighlightsView />}
        {view === 'dates' && <DatesView />}
        {view === 'hashtags' && <HashtagsView />}
        {view === 'hooks' && <HooksView />}
        {view === 'women' && <WomenView />}
        {view === 'backup' && <BackupView />}
        {view === 'income' && <IncomeView />}
        {view === 'metrics' && <MetricsView />}
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════════
function Dashboard({setView, month, setMonth}) {
  // Motivacional rota cada día automáticamente (basado en el día del año)
  // Así cada día sale una distinta sin tener que darle al botón
  const motivDayOfYear = (() => {
    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date() - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  })();
  const [motivIdx, setMotivIdx] = useState(motivDayOfYear % MOTIVATIONAL.length);
  const currentPhase = D.overview.roadmap.find(r => r.month === month);
  
  // Use real current time
  const now = new Date();
  
  // Format today's date in Spanish
  const diasSemana = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const mesesNom = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const todayLabel = `${diasSemana[now.getDay()]} · ${now.getDate()} ${mesesNom[now.getMonth()]} · ${now.getFullYear()}`;
  
  // Find next post, taking into account the CURRENT TIME (not just the date)
  // A post from today at 10:00 should NOT show if it's already 17:00
  const deleted = new Set(state.deletedPosts || []);
  const allPosts = [
    ...D.posts.ig.map(p => ({...p, platform:'instagram', pf:'instagram', _pf:'instagram'})),
    ...D.posts.li.map(p => ({...p, platform:'linkedin', pf:'linkedin', _pf:'linkedin'})),
    ...D.posts.ss.map(p => ({...p, platform:'substack', pf:'substack', _pf:'substack'})),
    ...(state.customPosts?.ig||[]).map(p => ({...p, platform:'instagram', pf:'instagram', _pf:'instagram'})),
    ...(state.customPosts?.li||[]).map(p => ({...p, platform:'linkedin', pf:'linkedin', _pf:'linkedin'})),
    ...(state.customPosts?.ss||[]).map(p => ({...p, platform:'substack', pf:'substack', _pf:'substack'})),
  ].filter(p => !deleted.has(p.i) && !deleted.has(`instagram:${p.i}`) && !deleted.has(`linkedin:${p.i}`) && !deleted.has(`substack:${p.i}`));
  
  const postDateTime = (p) => {
    if (!p.d) return null;
    const [y, m, day] = p.d.split('-').map(Number);
    let h = 9, min = 0; // default
    if (p.tm) {
      const parts = p.tm.split(':');
      h = parseInt(parts[0]) || 9;
      min = parseInt(parts[1]) || 0;
    }
    return new Date(y, m-1, day, h, min);
  };
  
  const nextPost = allPosts
    .map(p => ({...p, _dt: postDateTime(p)}))
    .filter(p => p._dt && p._dt >= now)
    .sort((a,b) => a._dt - b._dt)[0];

  // Destino del día · garantiza NO REPETIR durante 56 días (toda la lista)
  // Cómo funciona: genera una permutación aleatoria de [0...55] y reinicia cada 56 días
  const firstDay = new Date(2026, 0, 1); // 1 enero 2026
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysSinceFirst = Math.floor((todayStart - firstDay) / (1000*60*60*24));
  const cycleLen = DESTINATIONS.length;
  const cycleNum = Math.floor(daysSinceFirst / cycleLen); // qué ciclo (0,1,2...)
  const dayInCycle = daysSinceFirst % cycleLen;
  // Fisher-Yates shuffle determinista usando seed = cycleNum
  // (mismo ciclo → misma permutación · cada ciclo → permutación diferente)
  const shuffled = Array.from({length: cycleLen}, (_, i) => i);
  let s = (cycleNum + 1) * 2654435761;
  for (let i = cycleLen - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff; // LCG
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const destIndex = shuffled[dayInCycle];
  const destination = DESTINATIONS[destIndex];
  const mesesShort = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

  // Helper: describe when the next post is
  const whenLabel = (dt) => {
    if (!dt) return '';
    const diffHrs = (dt - now) / (1000 * 60 * 60);
    if (diffHrs < 1) return `en ${Math.max(1, Math.round(diffHrs * 60))} min`;
    if (diffHrs < 24 && dt.getDate() === now.getDate()) {
      const hh = dt.getHours().toString().padStart(2, '0');
      const mm = dt.getMinutes().toString().padStart(2, '0');
      return `hoy ${hh}:${mm}`;
    }
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dt.getDate() === tomorrow.getDate() && dt.getMonth() === tomorrow.getMonth()) {
      const hh = dt.getHours().toString().padStart(2, '0');
      const mm = dt.getMinutes().toString().padStart(2, '0');
      return `mañana ${hh}:${mm}`;
    }
    return `${dt.getDate()} ${mesesNom[dt.getMonth()].slice(0,3)} · ${dt.getHours().toString().padStart(2,'0')}:${dt.getMinutes().toString().padStart(2,'0')}`;
  };

  useEffect(() => {
    setMotivIdx(Math.floor(Math.random() * MOTIVATIONAL.length));
  }, []);

  // ═══ VISTA HOY: todo lo que toca en el día actual ═══
  const [state, update] = useAppState();
  const todayDateStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}`;
  const todayDay = now.getDate();
  const currentMonthId = mesesNom[now.getMonth()];

  // Posts de hoy (todas las plataformas)
  const todayPosts = allPosts
    .map(p => ({...p, _dt: postDateTime(p), _pf: p.platform}))
    .filter(p => p.d === todayDateStr)
    .sort((a,b) => (a._dt||0) - (b._dt||0));

  // Reels IG de hoy → también son TikTok
  const todayTiktoks = D.posts.ig.filter(p => p.d === todayDateStr && /eel/i.test(p.t || ''));

  // Stories IG de hoy — cuántas quedan por marcar
  const todayIgPost = D.posts.ig.find(p => p.d === todayDateStr);
  const todayStoriesKey = `${currentMonthId}:${todayDay}`;
  const todayStoriesState = state.stories[todayStoriesKey];
  const todayStoriesChecks = (todayStoriesState && Array.isArray(todayStoriesState.checks)) ? todayStoriesState.checks : [];
  let todayStoriesTotal = 0;
  if (todayIgPost && todayIgPost.st) {
    const parts = todayIgPost.st.split(/\s*\|\s*|\s*(?:\d\))\s*/).filter(s => s.trim().length > 3);
    todayStoriesTotal = parts.length >= 3 ? Math.min(parts.length, 8) : 5;
  } else {
    todayStoriesTotal = 5; // default
  }
  const todayStoriesDone = todayStoriesChecks.filter(Boolean).length;
  const todayStoriesPending = Math.max(0, todayStoriesTotal - todayStoriesDone);

  // Tareas pendientes de tu lista (tareas libres sin hacer)
  const pendingTasks = (Array.isArray(state.tasks) ? state.tasks : []).filter(t => !t.done);

  // Post status helper
  const getPostStatus = (p) => effectiveStatus(p, p._pf, state, now);

  // Cuenta total de cosas por hacer hoy
  const pendingPostsToday = Math.max(0, todayPosts.filter(p => getPostStatus(p) !== 'published').length);
  const totalPendingToday = Math.max(0, pendingPostsToday + todayStoriesPending + (todayTiktoks.length > 0 ? todayTiktoks.length : 0));

  // Semáforo emocional
  const hasStuff = todayPosts.length > 0 || todayStoriesTotal > 0;
  const allDone = hasStuff && pendingPostsToday === 0 && todayStoriesPending === 0;

  // ═══ SIGUIENTE COSA QUE TOCA ═══
  // Prioridad (de más urgente a menos):
  // 1. Post pendiente a publicar HOY (toca subirlo ya)
  // 2. Post próximo a publicarse (siguientes 24h) aún no programado
  // 3. Stories del día sin marcar
  // 4. Tareas libres
  // 5. Post en 2-7 días que hay que preparar
  let nextAction = null;
  // 1. Posts de hoy sin publicar
  const todayUnpublished = todayPosts.filter(p => getPostStatus(p) !== 'published');
  if (todayUnpublished.length > 0) {
    const first = todayUnpublished[0];
    const pf = PLATFORMS[first._pf];
    nextAction = {
      kind: 'publish',
      label: `publicar en ${pf.name}: "${(first.ti || first.su || '').slice(0,40)}"`,
      hint: `hoy ${first.tm}`,
      action: () => setView(first._pf === 'instagram' ? 'instagram' : first._pf === 'linkedin' ? 'linkedin' : 'substack'),
      color: pf.dark
    };
  }
  // 2. Stories pendientes
  else if (todayStoriesPending > 0) {
    nextAction = {
      kind: 'stories',
      label: `subir ${todayStoriesPending} ${todayStoriesPending === 1 ? 'story' : 'stories'} en instagram`,
      hint: 'van marcándose al subir',
      action: () => setView('stories'),
      color: C.igDark
    };
  }
  // 3. Próximo post a preparar (primer post a publicar en 1-7 días que no esté ya programado)
  else {
    const soonPost = allPosts
      .map(p => ({...p, _dt: postDateTime(p)}))
      .filter(p => p._dt && p._dt > now)
      .sort((a,b) => a._dt - b._dt)
      .find(p => {
        const st = effectiveStatus(p, p.platform, state, now);
        return st !== 'scheduled' && st !== 'published';
      });
    if (soonPost) {
      const pf = PLATFORMS[soonPost.platform];
      const days = Math.ceil((soonPost._dt - now) / (1000*60*60*24));
      nextAction = {
        kind: 'create',
        label: `preparar ${soonPost.t || 'post'} de ${pf.name}: "${(soonPost.ti || soonPost.su || '').slice(0,40)}"`,
        hint: `publica ${days === 0 ? 'hoy' : days === 1 ? 'mañana' : `en ${days} días`}`,
        action: () => setView(soonPost.platform === 'instagram' ? 'instagram' : soonPost.platform === 'linkedin' ? 'linkedin' : 'substack'),
        color: pf.dark
      };
    }
    // 4. Si no hay posts próximos, mirar tareas libres
    else if (pendingTasks.length > 0) {
      nextAction = {
        kind: 'task',
        label: pendingTasks[0].text,
        hint: 'tarea de tu lista',
        action: () => setView('tasks'),
        color: C.accent
      };
    }
  }


    // Labels
  const getLaunchCheck = (launchId, taskIdx) => !!(state.launchProgress?.[launchId]?.[taskIdx]);
  const diasSem = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const todayShort = `${diasSem[now.getDay()]} · ${now.getDate()} ${mesesNom[now.getMonth()]}`;

  // Hook del día: rota cada día basado en día del año
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - startOfYear) / (1000*60*60*24));
  const dailyHook = HOOKS[dayOfYear % HOOKS.length];

  const monthMetrics = D.overview.metrics.map(m => ({
    name: m.name,
    target: m.targets[month] || 0,
    start: m.start
  }));

  return (
    <div>
      {/* HEADER */}
      <div style={{marginBottom:40}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          {todayLabel}
        </div>
        <H size="xl" style={{fontStyle:'italic', fontWeight:300}}>
          hola Irene <span style={{color:C.accent}}>♡</span>
        </H>
        <div style={{fontSize:15, color:C.inkSoft, marginTop:8, maxWidth: 600, lineHeight:1.6, fontStyle:'italic', fontFamily:"'Fraunces', serif"}}>
          {MOTIVATIONAL[motivIdx]}
        </div>
      </div>

      {/* ═══ BOTÓN GIGANTE · SIGUIENTE COSA QUE TOCA ═══ */}
      {nextAction ? (
        <div style={{marginBottom:32}}>
          <button onClick={nextAction.action} style={{
            width:'100%', padding:'28px 32px', textAlign:'left',
            background: `linear-gradient(135deg, ${nextAction.color} 0%, ${C.accent} 100%)`,
            border:'none', borderRadius:18, cursor:'pointer',
            color:'#fff', fontFamily:'inherit',
            boxShadow: `0 8px 24px ${nextAction.color}40`,
            transition:'transform 0.15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{fontSize:11, opacity:0.85, letterSpacing:2, textTransform:'uppercase', fontWeight:600, marginBottom:6}}>
              ✦ ahora toca · clic para empezar
            </div>
            <div style={{
              fontSize:22, fontFamily:"'Fraunces', serif", fontWeight:500, 
              fontStyle:'italic', lineHeight:1.3, marginBottom:8
            }}>
              {nextAction.label}
            </div>
            <div style={{fontSize:13, opacity:0.9, display:'flex', alignItems:'center', gap:8}}>
              <span>{nextAction.hint}</span>
              <span style={{fontSize:18}}>→</span>
            </div>
          </button>
        </div>
      ) : (
        <div style={{marginBottom:32}}>
          <Card style={{
            background:`linear-gradient(135deg, ${C.published}30 0%, ${C.bg} 100%)`,
            border:'none', padding:'24px 28px', textAlign:'center'
          }}>
            <div style={{fontSize:11, color:C.published, letterSpacing:2, textTransform:'uppercase', fontWeight:600, marginBottom:6}}>
              ✦ estás al día
            </div>
            <div style={{fontSize:22, fontFamily:"'Fraunces', serif", fontStyle:'italic', color:C.ink}}>
              no hay nada urgente por hacer ♡
            </div>
            <div style={{fontSize:13, color:C.inkSoft, marginTop:8, fontStyle:'italic'}}>
              disfruta del respiro o adelanta contenido si te apetece
            </div>
          </Card>
        </div>
      )}

      {/* ═══ VISTA HOY — todo lo que toca en el día ═══ */}
      <div style={{marginBottom:32}}>
        <Card style={{
          background: allDone ? `linear-gradient(135deg, #E8F4E0 0%, ${C.bg} 100%)` 
                     : hasStuff ? `linear-gradient(135deg, ${C.bgSoft} 0%, ${C.igBg} 100%)`
                     : C.card,
          border:'none', padding:'24px 28px'
        }}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18, flexWrap:'wrap', gap:12}}>
            <div>
              <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', fontWeight:600, marginBottom:6}}>
                ✦ hoy · {todayShort}
              </div>
              <H size="md" style={{fontStyle:'italic'}}>
                {allDone ? 'todo al día ✧' : hasStuff ? `tienes ${totalPendingToday} cosas por hacer` : 'día libre de contenido'}
              </H>
            </div>
            {hasStuff && (
              <Badge bg={allDone ? C.published : C.accent} color="#fff" style={{fontSize:11, padding:'6px 12px'}}>
                {allDone ? '♡ todo listo' : `${totalPendingToday} pendientes`}
              </Badge>
            )}
          </div>

          {!hasStuff && (
            <div style={{fontSize:13, color:C.inkSoft, fontStyle:'italic', padding:'12px 0'}}>
              hoy no hay posts ni stories programados. respira, prepara lo de mañana o disfruta ♡
            </div>
          )}

          {hasStuff && (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:12}}>
              {/* POSTS DE HOY */}
              {todayPosts.length > 0 && (
                <div style={{background:C.card, borderRadius:12, padding:14}}>
                  <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:10}}>
                    📸 posts a publicar
                  </div>
                  {todayPosts.map((p, i) => {
                    const pf = PLATFORMS[p._pf];
                    const status = getPostStatus(p);
                    const isDone = status === 'published';
                    const togglePublish = () => {
                      const myKey = `${p._pf}:${p.i}`;
                      update(s => {
                        if (!s.posts[myKey]) s.posts[myKey] = {};
                        s.posts[myKey].status = isDone ? 'pending' : 'published';
                      });
                    };
                    return (
                      <div key={i} style={{
                        display:'flex', alignItems:'center', gap:10, padding:'8px 0',
                        borderBottom: i < todayPosts.length-1 ? `1px solid ${C.borderSoft}` : 'none',
                        opacity: isDone ? 0.65 : 1
                      }}>
                        <div style={{
                          fontSize:11, fontFamily:"'Fraunces', serif", fontWeight:500, color:pf.dark,
                          background:pf.bg, padding:'3px 7px', borderRadius:5, minWidth:48, textAlign:'center'
                        }}>
                          {p.tm || '—'}
                        </div>
                        <div style={{flex:1, fontSize:12, color:C.ink, lineHeight:1.3, textDecoration:isDone?'line-through':'none', minWidth:0}}>
                          <span style={{color:pf.dark, fontWeight:500}}>{pf.short}</span> · {(p.ti||'').slice(0,36)}{(p.ti||'').length > 36 && '…'}
                        </div>
                        {isDone ? (
                          <button onClick={togglePublish} title="deshacer publicado" style={{
                            fontSize:10, padding:'3px 9px', border:`1px solid ${C.border}`,
                            background:'transparent', color:C.inkSoft, borderRadius:100,
                            cursor:'pointer', fontFamily:'inherit', fontWeight:500, flexShrink:0
                          }}>↺ deshacer</button>
                        ) : (
                          <button onClick={togglePublish} title="marcar como publicado" style={{
                            width:24, height:24, border:`2px solid ${C.border}`, background:'transparent',
                            color:C.inkSoft, borderRadius:100, cursor:'pointer', fontSize:11,
                            fontFamily:'inherit', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center'
                          }}>○</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TIKTOK */}
              {todayTiktoks.length > 0 && (
                <div style={{background:C.card, borderRadius:12, padding:14}}>
                  <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:10}}>
                    🎵 tiktok (reciclar reels)
                  </div>
                  {todayTiktoks.map((p, i) => {
                    const ttKey = `tiktok:${p.i}`;
                    const ttDone = state?.posts?.[ttKey]?.status === 'published';
                    const toggleTT = () => update(s => {
                      if (!s.posts[ttKey]) s.posts[ttKey] = {};
                      s.posts[ttKey].status = ttDone ? 'pending' : 'published';
                    });
                    return (
                      <div key={i} style={{
                        display:'flex', alignItems:'center', gap:10, padding:'8px 0',
                        borderBottom: i < todayTiktoks.length-1 ? `1px solid ${C.borderSoft}` : 'none',
                        opacity: ttDone ? 0.65 : 1
                      }}>
                        <div style={{flex:1, fontSize:12, color:C.ink, lineHeight:1.3, textDecoration:ttDone?'line-through':'none'}}>
                          <span style={{color:C.ttDark, fontWeight:500}}>{p.tm} ·</span> {(p.ti||'').slice(0,40)}
                        </div>
                        {ttDone ? (
                          <button onClick={toggleTT} style={{
                            fontSize:10, padding:'3px 9px', border:`1px solid ${C.border}`,
                            background:'transparent', color:C.inkSoft, borderRadius:100,
                            cursor:'pointer', fontFamily:'inherit', fontWeight:500, flexShrink:0
                          }}>↺</button>
                        ) : (
                          <button onClick={toggleTT} style={{
                            width:24, height:24, border:`2px solid ${C.border}`, background:'transparent',
                            borderRadius:100, cursor:'pointer', fontSize:11, fontFamily:'inherit',
                            flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                            color:C.inkSoft
                          }}>○</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* STORIES */}
              {todayStoriesTotal > 0 && (
                <div style={{background:C.card, borderRadius:12, padding:14}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                    <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>
                      ♡ stories ig
                    </div>
                    <div style={{fontSize:11, color: todayStoriesPending === 0 ? C.igDark : C.inkSoft, fontWeight:500}}>
                      {todayStoriesDone}/{todayStoriesTotal}
                    </div>
                  </div>
                  <div style={{background:C.bgSoft, height:8, borderRadius:4, overflow:'hidden'}}>
                    <div style={{
                      width: `${(todayStoriesDone/todayStoriesTotal)*100}%`,
                      height:'100%', background:C.igDark, transition:'width 0.3s'
                    }}/>
                  </div>
                  <div style={{fontSize:11, color:C.inkSoft, marginTop:8, fontStyle:'italic'}}>
                    {todayStoriesPending === 0 ? 'todas subidas ♡' : `${todayStoriesPending} stories por subir`}
                  </div>
                  <button onClick={() => setView('stories')} style={{
                    marginTop:10, padding:'6px 10px', border:`1px solid ${C.igDark}`,
                    background:'transparent', color:C.igDark, borderRadius:100, fontSize:11,
                    cursor:'pointer', fontFamily:'inherit', fontWeight:500
                  }}>marcar stories →</button>
                </div>
              )}

              {/* TAREAS PENDIENTES */}
              {pendingTasks.length > 0 && (
                <div style={{background:C.card, borderRadius:12, padding:14}}>
                  <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:10}}>
                    📝 tareas sueltas
                  </div>
                  {pendingTasks.slice(0, 4).map((t, i) => (
                    <div key={t.id} style={{
                      display:'flex', alignItems:'flex-start', gap:8, padding:'6px 0',
                      borderBottom: i < Math.min(pendingTasks.length,4)-1 ? `1px solid ${C.borderSoft}` : 'none'
                    }}>
                      <div style={{fontSize:12, color:C.accent, lineHeight:1.4}}>○</div>
                      <div style={{flex:1, fontSize:12, color:C.ink, lineHeight:1.4}}>{t.text}</div>
                    </div>
                  ))}
                  {pendingTasks.length > 4 && (
                    <button onClick={() => setView('tasks')} style={{
                      marginTop:8, padding:'4px 0', border:'none', background:'transparent',
                      color:C.accent, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
                    }}>ver las {pendingTasks.length - 4} restantes →</button>
                  )}
                </div>
              )}

              {/* ENTREGABLES DE LANZAMIENTO QUE VENCEN PRONTO */}
              {todayLaunchTasks.length > 0 && (
                <div style={{background:C.card, borderRadius:12, padding:14}}>
                  <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:10}}>
                    🚀 entregables · vencen pronto
                  </div>
                  {todayLaunchTasks.slice(0, 4).map((item, i) => {
                    const isPast = item.diffDays < 0;
                    const isToday = item.diffDays === 0;
                    return (
                      <div key={i} style={{
                        display:'flex', alignItems:'flex-start', gap:8, padding:'7px 0',
                        borderBottom: i < Math.min(todayLaunchTasks.length,4)-1 ? `1px solid ${C.borderSoft}` : 'none',
                        opacity: 1
                      }}>
                        <div style={{fontSize:10, color: isPast ? '#B04545' : isToday ? C.accent : C.inkSoft, fontWeight:600, minWidth:50, flexShrink:0, paddingTop:1}}>
                          {isPast ? `${Math.abs(item.diffDays)}d atrás` : isToday ? '¡HOY!' : `en ${item.diffDays}d`}
                        </div>
                        <div style={{flex:1, fontSize:12, color:C.ink, lineHeight:1.4}}>
                          <span style={{fontSize:9, background:C.bgSoft, color:C.inkSoft, padding:'1px 5px', borderRadius:4, marginRight:5, textTransform:'uppercase'}}>
                            {item.task.cat}
                          </span>
                          {item.task.text.slice(0,55)}{item.task.text.length>55?'…':''}
                        </div>
                      </div>
                    );
                  })}
                  {todayLaunchTasks.length > 4 && (
                    <button onClick={() => setView('tasks')} style={{
                      marginTop:8, padding:'4px 0', border:'none', background:'transparent',
                      color:C.accent, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
                    }}>ver los {todayLaunchTasks.length - 4} restantes →</button>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* FOCO DEL MES + PRÓXIMO POST */}
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:20, marginBottom:24}}>
        <Card style={{background:`linear-gradient(135deg, ${C.bgSoft} 0%, ${C.igBg} 100%)`, border:'none'}}>
          <div style={{fontSize:11, color:C.inkSoft, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8}}>
            Foco del mes · {currentPhase?.month}
          </div>
          <H size="md" style={{fontStyle:'italic', fontFamily:"'Fraunces', serif"}}>
            {currentPhase?.phase}
          </H>
          <div style={{marginTop:14, fontSize:14, color:C.ink, lineHeight:1.6}}>
            <strong style={{fontWeight:500}}>Producto:</strong> {currentPhase?.product}<br/>
            <strong style={{fontWeight:500}}>Objetivo:</strong> {currentPhase?.goal}
            {currentPhase?.price !== '—' && <> · <strong style={{fontWeight:500}}>Precio:</strong> {currentPhase?.price}</>}
          </div>
          <div style={{marginTop:16, display:'flex', gap:8, flexWrap:'wrap'}}>
            {MONTHS_ES.map(m => (
              <button key={m.id} onClick={() => setMonth(m.id)} style={{
                padding:'4px 10px', border:'none', borderRadius:100,
                background: month===m.id ? C.ink : 'rgba(255,255,255,0.6)', 
                color: month===m.id ? C.bg : C.ink,
                fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
              }}>{m.n.toLowerCase()}</button>
            ))}
          </div>
        </Card>

        <Card style={{background: C.card}}>
          <div style={{fontSize:11, color:C.inkSoft, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8}}>
            Próximo post
          </div>
          {nextPost ? (
            <>
              <div style={{
                display:'inline-block', padding:'3px 8px', fontSize:10,
                background: PLATFORMS[nextPost.platform].bg, color: PLATFORMS[nextPost.platform].dark,
                borderRadius:100, marginBottom:10, letterSpacing:0.3, fontWeight:500
              }}>
                {PLATFORMS[nextPost.platform].name} · {whenLabel(nextPost._dt)}
              </div>
              <div style={{fontSize:14, color:C.ink, lineHeight:1.4, fontWeight:500, marginBottom:6}}>
                {nextPost.ti}
              </div>
              <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic'}}>
                {nextPost.t}
              </div>
            </>
          ) : <div style={{color:C.inkSoft, fontSize:13}}>Nada programado</div>}
        </Card>
      </div>

      {/* ♡ DESTINO DE LA SEMANA — motivación trabajo remoto */}
      <div style={{marginBottom:32}}>
        <Card style={{
          background:`linear-gradient(135deg, ${C.accentSoft} 0%, ${C.bgSoft} 60%, ${C.bg} 100%)`,
          border:'none', padding:'24px 28px', position:'relative', overflow:'hidden'
        }}>
          {/* emoji gigante de fondo */}
          <div style={{
            position:'absolute', right:-20, top:-40, fontSize:220, opacity:0.10,
            lineHeight:1, pointerEvents:'none', userSelect:'none'
          }}>
            {destination.emoji}
          </div>

          <div style={{position:'relative', zIndex:1}}>
            <div style={{fontSize:10, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
              ✦ destino del día
            </div>
            <div style={{fontSize:10, color:C.inkSoft, marginBottom:14, fontStyle:'italic'}}>
              por qué haces esto ♡
            </div>

            <div style={{display:'flex', alignItems:'baseline', gap:12, marginBottom:4, flexWrap:'wrap'}}>
              <div style={{fontSize:40}}>{destination.emoji}</div>
              <div>
                <div style={{
                  fontFamily:"'Fraunces', serif", fontSize:30, fontWeight:500,
                  color:C.ink, fontStyle:'italic', lineHeight:1.1
                }}>
                  {destination.city}
                </div>
                <div style={{fontSize:13, color:C.inkSoft, marginTop:3}}>
                  {destination.country} · {destination.region}
                </div>
              </div>
            </div>

            <div style={{
              fontSize:14, color:C.ink, marginTop:16, lineHeight:1.5,
              fontStyle:'italic'
            }}>
              ✧ {destination.vibe}
            </div>

            <div style={{
              fontSize:12, color:C.inkSoft, marginTop:14, lineHeight:1.6,
              padding:'12px 14px', background:`${C.card}90`, borderRadius:10,
              borderLeft:`3px solid ${C.accent}`
            }}>
              <strong style={{color:C.ink, fontWeight:600}}>¿sabías que</strong> {destination.fact}?
            </div>

            {/* Info práctica: coste + tip */}
            <div style={{
              background:`${C.card}90`, borderRadius:10, padding:'12px 14px', marginTop:14
            }}>
              <div style={{fontSize:9, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:4}}>
                ✦ vivir un mes
              </div>
              <div style={{fontSize:18, color:C.ink, fontFamily:"'Fraunces', serif", fontWeight:500}}>
                {destination.monthly}
              </div>
              <div style={{fontSize:10, color:C.inkSoft, fontStyle:'italic', marginTop:2}}>
                piso 1 hab · rango local → zona nómada
              </div>
            </div>

            <div style={{
              fontSize:11, color:C.inkSoft, marginTop:10, fontStyle:'italic',
              padding:'0 4px'
            }}>
              💡 {destination.tip}
            </div>

            <div style={{
              fontSize:13, color:C.ink, marginTop:14, fontFamily:"'Fraunces', serif",
              fontStyle:'italic', fontWeight:400
            }}>
              — {destination.mantra} ♡
            </div>
          </div>
        </Card>
      </div>

      {/* MOTIVACIONAL */}
      <div style={{marginBottom:24}}>
        <Card>
          <H size="sm" style={{marginBottom:14}}>motivacional del día</H>
          <div style={{
            fontSize:22, fontFamily:"'Fraunces', serif", fontStyle:'italic', 
            fontWeight:300, color:C.ink, lineHeight:1.4, minHeight:90
          }}>
            {MOTIVATIONAL[motivIdx]}
          </div>
          <Btn small variant="ghost" onClick={() => setMotivIdx((motivIdx+1) % MOTIVATIONAL.length)}>
            otra ♡
          </Btn>
        </Card>
      </div>

      {/* Backup compacto al final del dashboard */}
      <div style={{marginTop:24}}>
        <BackupBox compact={true} />
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// POST CARD — tarjeta reutilizable para Instagram/LinkedIn/Substack
// ═══════════════════════════════════════════════════════════════════
function PostCard({post, platform, onEdit, onDelete}) {
  const [state, update] = useAppState();
  const [expanded, setExpanded] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [noteDraft, setNoteDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [saveUi, setSaveUi] = useState('idle'); // 'idle' | 'saving' | 'saved'
  const pid = post.i || post.id || (post.m + '-' + (post.ti||'').slice(0,20));
  const myKey = `${platform}:${pid}`;
  const mine = state.posts[myKey] || {};
  const status = mine.status || 'pending';
  const notes = mine.notes || '';

  const flashSaved = () => {
    setSaveUi('saving');
    setTimeout(() => setSaveUi('saved'), 650);
    setTimeout(() => setSaveUi('idle'), 2200);
  };

  const cycleStatus = () => {
    const order = ['pending','creating','scheduled','manual','published'];
    const next = order[(order.indexOf(status)+1) % order.length];
    update(s => {
      if (!s.posts[myKey]) s.posts[myKey] = {};
      s.posts[myKey].status = next;
    });
    flashSaved();
  };

  const saveNote = () => {
    update(s => {
      if (!s.posts[myKey]) s.posts[myKey] = {};
      s.posts[myKey].notes = noteDraft;
    });
    setEditingNote(false);
    flashSaved();
  };

  // Permitir editar el copy (cp) del post guardándolo como override en el state
  const [editingCp, setEditingCp] = useState(false);
  const savedCpOverride = state.posts[myKey]?.cpOverride;
  const currentCp = savedCpOverride !== undefined ? savedCpOverride : post.cp;
  const [cpDraft, setCpDraft] = useState(currentCp || '');
  const saveCp = () => {
    update(s => {
      if (!s.posts[myKey]) s.posts[myKey] = {};
      s.posts[myKey].cpOverride = cpDraft;
    });
    setEditingCp(false);
    flashSaved();
  };
  const resetCp = () => {
    update(s => {
      if (s.posts[myKey]) delete s.posts[myKey].cpOverride;
    });
    setCpDraft(post.cp || '');
    setEditingCp(false);
    flashSaved();
  };

  // Igual para el DE (qué grabar/diseñar)
  const [editingDe, setEditingDe] = useState(false);
  const savedDeOverride = state.posts[myKey]?.deOverride;
  const currentDe = savedDeOverride !== undefined ? savedDeOverride : post.de;
  const [deDraft, setDeDraft] = useState(currentDe || '');
  const saveDe = () => {
    update(s => {
      if (!s.posts[myKey]) s.posts[myKey] = {};
      s.posts[myKey].deOverride = deDraft;
    });
    setEditingDe(false);
    flashSaved();
  };
  const resetDe = () => {
    update(s => {
      if (s.posts[myKey]) delete s.posts[myKey].deOverride;
    });
    setDeDraft(post.de || '');
    setEditingDe(false);
    flashSaved();
  };

  // Journal de aprendizaje (solo cuando está publicado)
  const [editingLearning, setEditingLearning] = useState(false);
  const savedLearning = state.posts[myKey]?.learning || '';
  const [learningDraft, setLearningDraft] = useState(savedLearning);
  const saveLearning = () => {
    update(s => {
      if (!s.posts[myKey]) s.posts[myKey] = {};
      s.posts[myKey].learning = learningDraft;
    });
    setEditingLearning(false);
    flashSaved();
  };

  const copyThis = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const p = PLATFORMS[platform];
  const typeIsReel = /eel/i.test(post.t || '');
  const typeIsCarr = /arrusel/i.test(post.t || '');

  return (
    <div style={{
      background: C.card, borderRadius: 14, border: `1px solid ${C.border}`,
      padding: expanded ? 22 : 16, marginBottom: 10, transition: 'all 0.2s',
      borderLeft: `3px solid ${p.color}`
    }}>
      {/* Compact row */}
      <div style={{display:'flex', alignItems:'flex-start', gap:14, cursor:'pointer'}} onClick={() => setExpanded(!expanded)}>
        <div style={{
          minWidth:56, textAlign:'center', padding:'8px 0',
          background: p.bg, borderRadius:10, color: p.dark, fontSize:11, fontWeight:500
        }}>
          <div style={{fontFamily:"'Fraunces', serif", fontSize:18, fontWeight:500, lineHeight:1}}>
            {(post.ds || post.d || '').split(' ')[0] || '—'}
          </div>
          <div style={{fontSize:9, textTransform:'uppercase', letterSpacing:0.5, marginTop:2}}>
            {(post.day || '').slice(0,3)}
          </div>
        </div>
        
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap'}}>
            <Badge bg={p.bg} color={p.dark} style={{fontSize:10}}>
              {typeIsReel ? '▶ ' : typeIsCarr ? '▦ ' : '◻ '}
              {post.t || 'post'}
            </Badge>
            {post.tm && <Badge><Clock size={10}/> {post.tm}</Badge>}
            <StatusPill status={status} onClick={(e) => {e.stopPropagation(); cycleStatus();}} />
            {saveUi === 'saving' && <span style={{fontSize:10, color:C.inkSoft, fontStyle:'italic'}}>guardando…</span>}
            {saveUi === 'saved' && <span style={{fontSize:10, color:C.igDark, fontWeight:600}}>guardado ♡</span>}
            {onEdit && (
              <button onClick={(e) => {e.stopPropagation(); onEdit();}} style={{
                background:'none', border:`1px solid ${C.border}`, borderRadius:6,
                padding:'4px 6px', cursor:'pointer', color:C.inkSoft,
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                transition:'all 0.15s', marginLeft:2, lineHeight:1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.accentSoft; e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.inkSoft; }}
              title="Editar post"><Edit2 size={11} /></button>
            )}
            {onDelete && (
              <button onClick={(e) => {e.stopPropagation(); onDelete();}} style={{
                background:'none', border:`1px solid ${C.border}`, borderRadius:6,
                padding:'4px 6px', cursor:'pointer', color:C.inkSoft,
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                transition:'all 0.15s', lineHeight:1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fde8e8'; e.currentTarget.style.borderColor = '#e87a7a'; e.currentTarget.style.color = '#e87a7a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.inkSoft; }}
              title="Eliminar post"><Trash2 size={11} /></button>
            )}
          </div>
          <div style={{fontSize:14, color:C.ink, fontWeight:500, lineHeight:1.4}}>
            {post.ti || post.title}
          </div>
          {post.f && !expanded && (
            <div style={{fontSize:11, color:C.inkSoft, marginTop:4, fontStyle:'italic'}}>
              semana {post.w} · {post.f}
            </div>
          )}
        </div>

        <ChevronRight size={16} style={{color: C.inkSoft, transform: expanded ? 'rotate(90deg)' : 'none', transition:'transform 0.2s'}} />
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{marginTop:16, paddingTop:16, borderTop:`1px solid ${C.borderSoft}`}}>
          {(currentDe || editingDe) && (
            <div style={{marginBottom:14}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
                <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>
                  qué grabar / diseñar {savedDeOverride !== undefined && <span style={{color:C.accent}}>· editado</span>}
                </div>
                {!editingDe ? (
                  <Btn small variant="ghost" onClick={() => { setDeDraft(currentDe || ''); setEditingDe(true); }}>
                    editar
                  </Btn>
                ) : (
                  <div style={{display:'flex', gap:4}}>
                    {savedDeOverride !== undefined && (
                      <Btn small variant="ghost" onClick={resetDe}>
                        ↺ original
                      </Btn>
                    )}
                    <Btn small variant="ghost" onClick={() => setEditingDe(false)}>cancelar</Btn>
                    <Btn small variant="accent" onClick={saveDe}>guardar</Btn>
                  </div>
                )}
              </div>
              {editingDe ? (
                <textarea
                  value={deDraft}
                  onChange={(e) => setDeDraft(e.target.value)}
                  style={{
                    width:'100%', minHeight:180, padding:12, border:`1px solid ${C.border}`, borderRadius:10,
                    fontSize:13, lineHeight:1.6, fontFamily:'inherit', background:C.card, color:C.ink,
                    boxSizing:'border-box', resize:'vertical'
                  }}
                />
              ) : (
                <div style={{fontSize:13, color:C.ink, lineHeight:1.6, whiteSpace:'pre-wrap'}}>
                  {currentDe}
                </div>
              )}
            </div>
          )}

          {(currentCp || editingCp) && (
            <div style={{marginBottom:14}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
                <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>
                  copy + hashtags {savedCpOverride !== undefined && <span style={{color:C.accent}}>· editado</span>}
                </div>
                {!editingCp ? (
                  <div style={{display:'flex', gap:4}}>
                    <Btn small variant="ghost" onClick={() => copyThis(currentCp)}>
                      <CopyIcon size={11}/> {copied ? 'copiado ♡' : 'copiar'}
                    </Btn>
                    <Btn small variant="ghost" onClick={() => { setCpDraft(currentCp || ''); setEditingCp(true); }}>
                      editar
                    </Btn>
                  </div>
                ) : (
                  <div style={{display:'flex', gap:4}}>
                    {savedCpOverride !== undefined && (
                      <Btn small variant="ghost" onClick={resetCp}>
                        ↺ original
                      </Btn>
                    )}
                    <Btn small variant="ghost" onClick={() => setEditingCp(false)}>cancelar</Btn>
                    <Btn small variant="accent" onClick={saveCp}>guardar</Btn>
                  </div>
                )}
              </div>
              {editingCp ? (
                <textarea
                  value={cpDraft}
                  onChange={(e) => setCpDraft(e.target.value)}
                  style={{
                    width:'100%', minHeight:220, padding:14, border:`1px solid ${C.border}`, borderRadius:10,
                    fontSize:12.5, lineHeight:1.6, fontFamily:'inherit', background:C.bgSoft, color:C.ink,
                    boxSizing:'border-box', resize:'vertical'
                  }}
                />
              ) : (
                <div style={{
                  background: C.bgSoft, padding:14, borderRadius:10, fontSize:12.5,
                  color:C.ink, lineHeight:1.6, whiteSpace:'pre-wrap', fontFamily:"'DM Sans', sans-serif"
                }}>
                  {currentCp}
                </div>
              )}
            </div>
          )}

          {post.h && (
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:6}}>
                hook
              </div>
              <div style={{
                fontSize:15, fontFamily:"'Fraunces', serif", fontStyle:'italic', 
                color:C.ink, lineHeight:1.4
              }}>
                "{post.h}"
              </div>
            </div>
          )}

          {post.su && (
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:6}}>
                asunto del email
              </div>
              <div style={{
                fontSize:14, fontFamily:"'Fraunces', serif", fontStyle:'italic', 
                color:C.ink, background: C.ssBg, padding:'10px 14px', borderRadius:10
              }}>
                {post.su}
              </div>
            </div>
          )}

          {post.se && (
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:6}}>
                secciones del newsletter
              </div>
              <div style={{fontSize:13, color:C.ink, lineHeight:1.6}}>
                {post.se}
              </div>
            </div>
          )}

          {/* Export to calendar */}
          {post.d && (
            <div style={{marginTop:14, paddingTop:14, borderTop:`1px solid ${C.borderSoft}`, display:'flex', justifyContent:'flex-end', gap:6, flexWrap:'wrap'}}>
              <Btn small variant="ghost" onClick={() => {
                const event = postToIcsEvent(post, platform);
                if (event) {
                  const safeName = (post.ti || post.su || 'post').slice(0,30).replace(/[^a-zA-Z0-9]+/g, '-');
                  downloadIcs([event], `${platform}-${post.d}-${safeName}.ics`);
                }
              }}>
                📅 exportar a calendario
              </Btn>
            </div>
          )}

          {/* Journal de aprendizaje · solo si ya publicado */}
          {status === 'published' && (
            <div style={{marginTop:14, paddingTop:14, borderTop:`1px solid ${C.borderSoft}`, background: C.published + '15', padding:'14px', borderRadius:10, margin:'14px -2px 0'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                <div style={{fontSize:10, color:C.published, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>
                  ✦ qué aprendí con este post
                </div>
                {!editingLearning && (
                  <Btn small variant="ghost" onClick={() => {setLearningDraft(savedLearning); setEditingLearning(true);}}>
                    <Edit2 size={11}/> {savedLearning ? 'editar' : 'anotar'}
                  </Btn>
                )}
              </div>
              {editingLearning ? (
                <div>
                  <textarea 
                    value={learningDraft}
                    onChange={(e) => setLearningDraft(e.target.value)}
                    placeholder="¿qué funcionó / qué no? ¿cuánto alcance? ¿guardados? 1 línea..."
                    style={{
                      width:'100%', minHeight:60, padding:10, border:`1px solid ${C.border}`,
                      borderRadius:8, fontFamily:'inherit', fontSize:13, resize:'vertical',
                      background:C.card, color:C.ink, boxSizing:'border-box'
                    }}
                  />
                  <div style={{display:'flex', gap:6, marginTop:8, justifyContent:'flex-end'}}>
                    <Btn small variant="ghost" onClick={() => setEditingLearning(false)}>cancelar</Btn>
                    <Btn small variant="accent" onClick={saveLearning}>guardar</Btn>
                  </div>
                </div>
              ) : savedLearning ? (
                <div style={{fontSize:13, color:C.ink, lineHeight:1.5, fontStyle:'italic'}}>
                  "{savedLearning}"
                </div>
              ) : (
                <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic'}}>
                  en unas semanas te encantará haber anotado esto ♡
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <div style={{marginTop:14, paddingTop:14, borderTop:`1px solid ${C.borderSoft}`}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>
                mis notas
              </div>
              {!editingNote && (
                <Btn small variant="ghost" onClick={() => {setNoteDraft(notes); setEditingNote(true);}}>
                  <Edit2 size={11}/> {notes ? 'editar' : 'añadir'}
                </Btn>
              )}
            </div>
            {editingNote ? (
              <div>
                <textarea 
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="tus notas para este post..."
                  style={{
                    width:'100%', minHeight:80, padding:10, border:`1px solid ${C.border}`,
                    borderRadius:8, fontFamily:'inherit', fontSize:13, resize:'vertical',
                    background:C.bg, color:C.ink, boxSizing:'border-box'
                  }}
                />
                <div style={{display:'flex', gap:8, marginTop:8}}>
                  <Btn small variant="accent" onClick={saveNote}><Save size={11}/> guardar</Btn>
                  <Btn small variant="ghost" onClick={() => setEditingNote(false)}>cancelar</Btn>
                </div>
              </div>
            ) : (
              <div style={{
                fontSize:13, color: notes ? C.ink : C.inkSoft, 
                fontStyle: notes ? 'normal' : 'italic',
                lineHeight:1.5, whiteSpace:'pre-wrap',
                background: notes ? C.bgSoft : 'transparent', 
                padding: notes ? 12 : 0, borderRadius:8
              }}>
                {notes || 'sin notas todavía ♡'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// WEEKLY MINI CALENDAR — compila todas las redes para un mes
// ═══════════════════════════════════════════════════════════════════
function WeeklyMini({month}) {
  // Get all posts this month across all platforms
  const igPosts = D.posts.ig.filter(p => p.m === month).map(p => ({...p, pf:'ig'}));
  const liPosts = D.posts.li.filter(p => p.m === month).map(p => ({...p, pf:'li'}));
  const ssPosts = D.posts.ss.filter(p => p.m === month).map(p => ({...p, pf:'ss'}));
  const ttPosts = D.posts.ig.filter(p => p.m === month && /eel/i.test(p.t)).map(p => ({...p, pf:'tt'}));
  const all = [...igPosts, ...liPosts, ...ssPosts, ...ttPosts];

  // Group by week
  const byWeek = {};
  all.forEach(p => {
    const w = p.w || 1;
    if (!byWeek[w]) byWeek[w] = [];
    byWeek[w].push(p);
  });

  const weeks = Object.keys(byWeek).sort((a,b) => +a - +b);
  const pfColors = {ig:C.ig, li:C.li, ss:C.ss, tt:C.tt};

  return (
    <Card style={{marginBottom:24, padding:18}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <H size="sm">calendario semanal · todas las redes</H>
        <div style={{display:'flex', gap:10, fontSize:10, color:C.inkSoft}}>
          {Object.entries(PLATFORMS).map(([k,p]) => (
            <span key={k} style={{display:'flex', alignItems:'center', gap:4}}>
              <span style={{width:8, height:8, borderRadius:4, background:p.color}}></span>
              {p.short}
            </span>
          ))}
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:`repeat(${weeks.length || 1}, 1fr)`, gap:8}}>
        {weeks.map(w => (
          <div key={w} style={{background: C.bgSoft, padding:10, borderRadius:10}}>
            <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:6}}>
              semana {w} · {byWeek[w].length} posts
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:3}}>
              {byWeek[w].map((p,i) => (
                <div key={i} title={p.ti} style={{
                  width:14, height:14, borderRadius:4, 
                  background: pfColors[p.pf],
                  cursor:'help'
                }}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CALENDAR VIEW — vista mensual con filtros
// ═══════════════════════════════════════════════════════════════════
function CalendarView({month, setMonth}) {
  const [state] = useAppState();
  const now = new Date();
  const [filterPf, setFilterPf] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const monthIdx = MONTHS_ES.findIndex(m => m.id === month);
  const mNum = MONTHS_ES[monthIdx].num;
  const firstDay = new Date(2026, mNum-1, 1);
  const lastDay = new Date(2026, mNum, 0);
  const daysInMonth = lastDay.getDate();
  let startWeekday = firstDay.getDay(); // 0=Sun
  if (startWeekday === 0) startWeekday = 7;
  startWeekday -= 1; // Monday=0

  const dayCells = [];
  for (let i = 0; i < startWeekday; i++) dayCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) dayCells.push(d);

  // Helper: find first Tuesday of a given week number in the month (for LinkedIn)
  const findWeekdayInWeek = (weekNum, targetWeekday) => {
    // targetWeekday: 0=Lun, 1=Mar, 2=Mié, 3=Jue, 4=Vie, 5=Sáb, 6=Dom
    // Find the day-of-month for the Nth occurrence or nearest week
    // Strategy: get the first day of the week (Monday), then add targetWeekday
    // Week N contains days starting from a particular Monday
    // For simplicity: map week num to approx day range
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(2026, mNum-1, d);
      let dow = date.getDay() - 1;
      if (dow < 0) dow = 6; // Sunday = 6
      // Find Monday of that week
      const mondayDay = d - dow;
      // Week number in month (approximate)
      const weekIdx = Math.ceil(mondayDay / 7);
      if (weekIdx === weekNum && dow === targetWeekday) {
        return d;
      }
    }
    // Fallback: week 1 = day 1-7
    const approx = (weekNum - 1) * 7 + targetWeekday + 1;
    return Math.min(approx, daysInMonth);
  };

  // Collect posts with their real dates (all platforms now have concrete dates)
  const collectPosts = () => {
    const out = [];
    const calDeleted = new Set(state.deletedPosts || []);
    const isCalDeleted = (p, pf) => calDeleted.has(p.i) || calDeleted.has(`${pf}:${p.i}`);
    D.posts.ig.filter(p => p.m === month && !isCalDeleted(p,'instagram')).forEach(p => {
      if (!p.d) return;
      const day = parseInt(p.d.split('-')[2]);
      if (day && day <= daysInMonth) out.push({...p, pf: 'instagram', day});
    });
    D.posts.li.filter(p => p.m === month && !isCalDeleted(p,'linkedin')).forEach(p => {
      if (!p.d) return;
      const day = parseInt(p.d.split('-')[2]);
      if (day && day <= daysInMonth) out.push({...p, pf: 'linkedin', day});
    });
    D.posts.ss.filter(p => p.m === month && !isCalDeleted(p,'substack')).forEach(p => {
      if (!p.d) return;
      const day = parseInt(p.d.split('-')[2]);
      if (day && day <= daysInMonth) out.push({...p, pf: 'substack', day});
    });
    // Also add customPosts
    const calCustom = [
      ...(state.customPosts?.ig||[]).map(p=>({...p,pf:'instagram'})),
      ...(state.customPosts?.li||[]).map(p=>({...p,pf:'linkedin'})),
      ...(state.customPosts?.ss||[]).map(p=>({...p,pf:'substack'})),
    ];
    calCustom.filter(p => p.m === month && !isCalDeleted(p, p.pf)).forEach(p => {
      if (!p.d) return;
      const day = parseInt(p.d.split('-')[2]);
      if (day && day <= daysInMonth) out.push({...p, day});
    });
    // TikTok: reels recycled from IG
    D.posts.ig.filter(p => p.m === month && /eel/i.test(p.t)).forEach(p => {
      if (!p.d) return;
      const day = parseInt(p.d.split('-')[2]);
      if (day && day <= daysInMonth) out.push({...p, pf: 'tiktok', day});
    });
    return out;
  };

  const allMonthPosts = collectPosts();

  const getStatus = (p) => effectiveStatus(p, p.pf, state, now);

  // Apply filters
  const filtered = allMonthPosts.filter(p => {
    if (filterPf !== 'all' && p.pf !== filterPf) return false;
    if (filterStatus !== 'all' && getStatus(p) !== filterStatus) return false;
    return true;
  });

  const postsForDay = {};
  filtered.forEach(p => {
    if (!postsForDay[p.day]) postsForDay[p.day] = [];
    postsForDay[p.day].push(p);
  });

  const weekDays = ['L','M','X','J','V','S','D'];

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20, flexWrap:'wrap', gap:12}}>
        <div>
          <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
            vista mensual
          </div>
          <H size="lg" style={{fontStyle:'italic'}}>calendario</H>
        </div>
        <button onClick={() => {
          const events = filtered.map(p => postToIcsEvent(p, p.pf)).filter(Boolean);
          if (events.length === 0) { alert('No hay posts para exportar en este mes'); return; }
          downloadIcs(events, `dramas-laborales-${month}.ics`);
        }} style={{
          padding:'8px 14px', background:C.card, color:C.ink,
          border:`1px solid ${C.border}`, borderRadius:100,
          fontSize:12, cursor:'pointer', fontFamily:'inherit', fontWeight:500,
          display:'flex', alignItems:'center', gap:6
        }}>
          📅 exportar {month} ({filtered.length})
        </button>
      </div>

      {/* ═══ BANNER DE LA FASE DEL MES · con timeline mini + contenido del mes ═══ */}
      {(() => {
        const currentPhase = D.overview.roadmap.find(r => r.month === month);
        if (!currentPhase) return null;
        const phaseColor = 
          currentPhase.phase === 'lanzamiento' ? C.accent :
          currentPhase.phase.includes('asesoría') ? C.liDark :
          currentPhase.phase.includes('premium') || currentPhase.phase.includes('Premium') ? C.ttDark :
          currentPhase.phase.includes('crecimiento') || currentPhase.phase.includes('escalado') ? C.igDark :
          C.inkSoft;

        // Conteos de contenido del mes
        const igCount = D.posts.ig.filter(x => x.m === month).length;
        const igReels = D.posts.ig.filter(x => x.m === month && /eel/i.test(x.t)).length;
        const igCarrouseles = D.posts.ig.filter(x => x.m === month && /carrusel/i.test(x.t)).length;
        const igPosts = igCount - igReels - igCarrouseles;
        const liCount = D.posts.li.filter(x => x.m === month).length;
        const ssCount = D.posts.ss.filter(x => x.m === month).length;
        const totalPieces = igCount + liCount + ssCount;

        return (
          <Card style={{
            marginBottom:20, padding:0, overflow:'hidden',
            background: `linear-gradient(135deg, ${phaseColor}10 0%, ${C.card} 70%)`,
            border: `1px solid ${phaseColor}30`
          }}>
            {/* Cabecera con fase + producto + precio + objetivo */}
            <div style={{padding:'18px 22px', borderBottom:`1px solid ${phaseColor}20`}}>
              <div style={{fontSize:10, color:phaseColor, letterSpacing:2, textTransform:'uppercase', fontWeight:600, marginBottom:6}}>
                fase de {month} · {currentPhase.phase}
              </div>
              <div style={{display:'flex', gap:14, alignItems:'baseline', flexWrap:'wrap', marginBottom:6}}>
                <span style={{fontSize:18, fontFamily:"'Fraunces', serif", fontStyle:'italic', color:C.ink, fontWeight:500}}>
                  {currentPhase.product}
                </span>
                {currentPhase.price && currentPhase.price !== '—' && (
                  <span style={{
                    fontSize:13, padding:'3px 10px', background:phaseColor, color:'#fff',
                    borderRadius:100, fontWeight:600
                  }}>
                    {currentPhase.price}
                  </span>
                )}
              </div>
              <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic'}}>
                objetivo: {currentPhase.goal}
              </div>
            </div>

            {/* Resumen contenido del mes con números reales */}
            <div style={{padding:'14px 22px', borderBottom:`1px solid ${phaseColor}15`, background: `${phaseColor}03`}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, flexWrap:'wrap', gap:8}}>
                <div style={{fontSize:11, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
                  contenido en {month}
                </div>
                <div style={{fontSize:13, color:C.ink, fontWeight:600}}>
                  {totalPieces} piezas en total
                </div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:10}}>
                {/* Instagram */}
                <div style={{
                  padding:'8px 12px', background:C.igBg, borderRadius:8, 
                  borderLeft:`3px solid ${C.igDark}`
                }}>
                  <div style={{fontSize:10, color:C.igDark, fontWeight:600, textTransform:'uppercase', letterSpacing:0.5, marginBottom:2}}>
                    Instagram · {igCount}
                  </div>
                  <div style={{fontSize:11, color:C.ink}}>
                    {igReels} reels · {igCarrouseles} carruseles{igPosts > 0 ? ` · ${igPosts} posts` : ''}
                  </div>
                </div>
                {/* LinkedIn */}
                <div style={{
                  padding:'8px 12px', background:C.liBg, borderRadius:8,
                  borderLeft:`3px solid ${C.liDark}`
                }}>
                  <div style={{fontSize:10, color:C.liDark, fontWeight:600, textTransform:'uppercase', letterSpacing:0.5, marginBottom:2}}>
                    LinkedIn · {liCount}
                  </div>
                  <div style={{fontSize:11, color:C.ink}}>
                    martes 09:00
                  </div>
                </div>
                {/* Substack */}
                <div style={{
                  padding:'8px 12px', background:C.ssBg, borderRadius:8,
                  borderLeft:`3px solid ${C.ssDark}`
                }}>
                  <div style={{fontSize:10, color:C.ssDark, fontWeight:600, textTransform:'uppercase', letterSpacing:0.5, marginBottom:2}}>
                    Substack · {ssCount}
                  </div>
                  <div style={{fontSize:11, color:C.ink}}>
                    domingos 10:00
                  </div>
                </div>
              </div>
            </div>

            {/* Mini timeline horizontal de los 9 meses */}
            <div style={{display:'flex', background:`${phaseColor}05`}}>
              {D.overview.roadmap.filter(r => r.month !== 'abril').map((r, i) => {
                const isCurrent = r.month === month;
                const rColor = 
                  r.phase === 'lanzamiento' ? C.accent :
                  r.phase.includes('asesoría') ? C.liDark :
                  r.phase.includes('premium') || r.phase.includes('Premium') ? C.ttDark :
                  r.phase.includes('crecimiento') || r.phase.includes('escalado') ? C.igDark :
                  C.inkSoft;
                return (
                  <div key={r.month} onClick={() => setMonth(r.month)} title={`${r.phase} · ${r.product}`} style={{
                    flex:1, padding:'10px 4px', textAlign:'center', cursor:'pointer',
                    borderRight: i<8 ? `1px solid ${phaseColor}15` : 'none',
                    background: isCurrent ? `${rColor}25` : 'transparent',
                    transition:'all 0.15s',
                    borderTop: isCurrent ? `2px solid ${rColor}` : '2px solid transparent'
                  }}>
                    <div style={{
                      fontSize:9, textTransform:'uppercase', letterSpacing:1,
                      color: isCurrent ? rColor : C.inkSoft, 
                      fontWeight:isCurrent ? 700 : 500
                    }}>{r.month.slice(0,3)}</div>
                    <div style={{
                      width:6, height:6, borderRadius:100, background:rColor,
                      margin:'4px auto 0', opacity: isCurrent ? 1 : 0.5
                    }}/>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })()}

      {/* Filtros */}
      <Card style={{marginBottom:20, padding:14}}>
        <div style={{display:'flex', gap:20, alignItems:'center', flexWrap:'wrap'}}>
          <div>
            <div style={{fontSize:10, color:C.inkSoft, marginBottom:6, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>mes</div>
            <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
              {MONTHS_ES.map(m => (
                <button key={m.id} onClick={() => setMonth(m.id)} style={{
                  padding:'5px 10px', border:'none', borderRadius:100,
                  background: month===m.id ? C.ink : C.bgSoft, 
                  color: month===m.id ? C.bg : C.ink,
                  fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
                }}>{m.n.toLowerCase()}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:10, color:C.inkSoft, marginBottom:6, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>red social</div>
            <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
              <button onClick={() => setFilterPf('all')} style={{
                padding:'5px 10px', border:'none', borderRadius:100,
                background: filterPf==='all' ? C.ink : C.bgSoft, 
                color: filterPf==='all' ? C.bg : C.ink, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
              }}>todas</button>
              {Object.entries(PLATFORMS).map(([k,p]) => (
                <button key={k} onClick={() => setFilterPf(k)} style={{
                  padding:'5px 10px', border:'none', borderRadius:100,
                  background: filterPf===k ? p.dark : p.bg, 
                  color: filterPf===k ? '#fff' : p.dark, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
                }}>{p.name.toLowerCase()}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:10, color:C.inkSoft, marginBottom:6, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>estado</div>
            <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
              <button onClick={() => setFilterStatus('all')} style={{
                padding:'5px 10px', border:'none', borderRadius:100,
                background: filterStatus==='all' ? C.ink : C.bgSoft, 
                color: filterStatus==='all' ? C.bg : C.ink, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
              }}>todos</button>
              {Object.entries(STATUS).map(([k,s]) => (
                <button key={k} onClick={() => setFilterStatus(k)} style={{
                  padding:'5px 10px', border:'none', borderRadius:100,
                  background: filterStatus===k ? s.color : s.color+'40', 
                  color: C.ink, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
                }}>{s.label}</button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Calendar grid */}
      <Card style={{padding:20}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(7, minmax(0, 1fr))', gap:6, marginBottom:8}}>
          {weekDays.map((d, idx) => (
            <div key={d} style={{
              textAlign:'center', fontSize:11, 
              color: idx >= 5 ? C.accent : C.inkSoft, 
              fontWeight:600, textTransform:'uppercase', letterSpacing:1,
              padding:'6px 0', minWidth:0
            }}>{d}</div>
          ))}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(7, minmax(0, 1fr))', gap:6}}>
          {dayCells.map((day, i) => {
            if (day === null) return <div key={i} style={{minWidth:0}}></div>;
            const posts = postsForDay[day] || [];
            const cellDate = new Date(2026, mNum-1, day);
            const isToday = cellDate.getFullYear() === now.getFullYear() && 
                           cellDate.getMonth() === now.getMonth() && 
                           cellDate.getDate() === now.getDate();
            const isPast = cellDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const dayOfWeek = cellDate.getDay(); // 0=Sun, 6=Sat
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            
            return (
              <div key={i} style={{
                minHeight:130, minWidth:0,
                background: isWeekend ? C.bgSoft : C.card, 
                borderRadius:12, padding:'8px 6px 10px',
                border: isToday ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
                boxSizing:'border-box',
                opacity: isPast && !isToday ? 0.55 : 1,
                position:'relative',
                boxShadow: isToday ? `0 4px 14px ${C.accent}30` : 'none',
                overflow:'hidden'
              }}>
                <div style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  marginBottom:6, minWidth:0
                }}>
                  <span style={{
                    fontSize: isToday ? 16 : 14, 
                    fontFamily:"'Fraunces', serif", 
                    fontWeight: isToday ? 700 : 500, 
                    color: isToday ? C.accent : (isWeekend ? C.inkSoft : C.ink)
                  }}>{day}</span>
                  {isToday && (
                    <span style={{
                      fontSize:7, color:'#fff', background:C.accent,
                      padding:'2px 5px', borderRadius:100, letterSpacing:0.5,
                      textTransform:'uppercase', fontWeight:700, flexShrink:0
                    }}>hoy</span>
                  )}
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:3, minWidth:0}}>
                  {posts.slice(0, 4).map((p, j) => {
                    const pf = PLATFORMS[p.pf];
                    const s = getStatus(p);
                    const isDone = s === 'published';
                    const isCreating = s === 'creating';
                    const isScheduled = s === 'scheduled';
                    
                    return (
                      <div key={j} title={`${pf.name} · ${p.tm || ''} · ${(p.ti || p.t || '').slice(0,40)}`} style={{
                        fontSize:10, padding:'3px 5px', borderRadius:4,
                        background: pf.dark,
                        color:'#fff', fontWeight:600,
                        display:'flex', alignItems:'center', gap:3,
                        opacity: 1,
                        minWidth:0,
                        overflow:'hidden'
                      }}>
                        <span style={{
                          fontSize:8, fontWeight:800, opacity:0.95, letterSpacing:0.3,
                          textTransform:'uppercase', flexShrink:0
                        }}>{pf.short}</span>
                        <span style={{
                          flex:1, minWidth:0,
                          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
                        }}>
                          {p.tm ? `${p.tm.slice(0,5)}` : (p.ti||p.t||'').slice(0,10)}
                        </span>
                        {isDone && <span style={{flexShrink:0, fontSize:9}}>✓</span>}
                        {isCreating && <span style={{flexShrink:0, fontSize:9}}>◐</span>}
                        {isScheduled && <span style={{flexShrink:0, fontSize:9}}>📅</span>}
                      </div>
                    );
                  })}
                  {posts.length > 4 && (
                    <div style={{fontSize:9, color:C.inkSoft, textAlign:'center', marginTop:2, fontWeight:600}}>
                      + {posts.length - 4} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PLATFORM VIEW — Instagram/LinkedIn/Substack por meses
// ═══════════════════════════════════════════════════════════════════
function PlatformView({platform, month, setMonth}) {
  const [state, update] = useAppState();
  const now = new Date();
  const [filterStatus, setFilterStatus] = useState('all');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  
  const pf = PLATFORMS[platform];
  const Icon = pf.icon;

  const pfKey = platform === 'instagram' ? 'ig' : platform === 'linkedin' ? 'li' : 'ss';
  const baseSource = platform === 'instagram' ? D.posts.ig 
               : platform === 'linkedin' ? D.posts.li 
               : D.posts.ss;
  const customSource = state.customPosts?.[pfKey] || [];
  const deletedIds = new Set(state.deletedPosts || []);
  const source = [...baseSource, ...customSource].filter(p => !deletedIds.has(p.i));

  const monthPosts = source.filter(p => p.m === month);

  const handleAddPost = (saved) => {
    // Auto-calculate day, week, ds, m from date field
    if (saved.d) {
      const dt = new Date(saved.d + 'T12:00:00');
      const dayNames = ['dom','lun','mar','mié','jue','vie','sáb'];
      const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
      const monthShort = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
      saved.day = dayNames[dt.getDay()];
      saved.m = monthNames[dt.getMonth()];
      saved.ds = dt.getDate() + ' ' + monthShort[dt.getMonth()];
      saved.w = Math.ceil(dt.getDate() / 7);
    }
    if (!saved.i) saved.i = 'custom-' + Date.now();
    update(s => {
      if (!s.customPosts) s.customPosts = {ig:[], li:[], ss:[]};
      if (!s.customPosts[pfKey]) s.customPosts[pfKey] = [];
      const idx = s.customPosts[pfKey].findIndex(p => p.i === saved.i);
      if (idx >= 0) s.customPosts[pfKey][idx] = saved;
      else s.customPosts[pfKey].push(saved);
    });
    setEditorOpen(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    if (!confirm('¿Eliminar este post?')) return;
    update(s => {
      if (!s.deletedPosts) s.deletedPosts = [];
      if (!s.deletedPosts.includes(postId)) s.deletedPosts.push(postId);
      // Also remove from customPosts if it's custom
      if (s.customPosts?.[pfKey]) {
        s.customPosts[pfKey] = s.customPosts[pfKey].filter(p => p.i !== postId);
      }
    });
  };
  
  const getStatus = (pid) => {
    const post = D.posts[platform === 'instagram' ? 'ig' : platform === 'linkedin' ? 'li' : 'ss'].find(p => p.i === pid);
    return post ? effectiveStatus(post, platform, state, now) : 'pending';
  };

  const filtered = filterStatus === 'all' 
    ? monthPosts.filter(p => getStatus(p.i) !== 'published')
    : monthPosts.filter(p => getStatus(p.i) === filterStatus);

  // Sort by date
  filtered.sort((a,b) => (a.d || '').localeCompare(b.d || ''));

  // Group by week — calculate from date, not stored w field
  const byWeek = {};
  filtered.forEach(p => {
    let w = 1;
    if (p.d) {
      const day = parseInt(p.d.slice(8), 10);
      // Week 1: days 1-7, Week 2: 8-14, etc.
      w = Math.ceil(day / 7);
    } else {
      w = p.w || 1;
    }
    if (!byWeek[w]) byWeek[w] = [];
    byWeek[w].push(p);
  });

  const totalCounts = {
    all: monthPosts.length,
    pending: monthPosts.filter(p => getStatus(p.i) === 'pending').length,
    creating: monthPosts.filter(p => getStatus(p.i) === 'creating').length,
    published: monthPosts.filter(p => getStatus(p.i) === 'published').length,
  };

  return (
    <div>
      {editorOpen && (
        <PostEditor
          post={editingPost}
          platform={platform}
          onSave={handleAddPost}
          onClose={() => { setEditorOpen(false); setEditingPost(null); }}
        />
      )}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:12}}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:52, height:52, background:pf.bg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon size={26} style={{color: pf.dark}} />
          </div>
          <div>
            <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:4}}>
              red social
            </div>
            <H size="lg" style={{fontStyle:'italic'}}>{pf.name.toLowerCase()}</H>
          </div>
        </div>
        <button onClick={() => {
          const events = monthPosts.map(p => postToIcsEvent(p, platform)).filter(Boolean);
          if (events.length === 0) { alert(`No hay posts de ${pf.name} en ${month}`); return; }
          downloadIcs(events, `${platform}-${month}.ics`);
        }} style={{
          padding:'8px 14px', background:pf.bg, color:pf.dark,
          border:'none', borderRadius:100,
          fontSize:12, cursor:'pointer', fontFamily:'inherit', fontWeight:500
        }}>
          📅 exportar {month} ({monthPosts.length})
        </button>
      </div>

      {/* Weekly mini */}
      <WeeklyMini month={month} />

      {/* Month tabs */}
      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:20, background:C.card, padding:10, borderRadius:12, border:`1px solid ${C.border}`}}>
        {MONTHS_ES.map(m => {
          const count = source.filter(p => p.m === m.id).length;
          return (
            <button key={m.id} onClick={() => setMonth(m.id)} style={{
              padding:'8px 14px', border:'none', borderRadius:100,
              background: month===m.id ? pf.dark : 'transparent', 
              color: month===m.id ? '#fff' : C.ink,
              fontSize:12, cursor:'pointer', fontFamily:'inherit', fontWeight:500,
              display:'flex', alignItems:'center', gap:6
            }}>
              {m.n.toLowerCase()}
              <span style={{
                fontSize:10, padding:'1px 6px', borderRadius:100,
                background: month===m.id ? 'rgba(255,255,255,0.25)' : C.bgSoft,
                color: month===m.id ? '#fff' : C.inkSoft
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Header row: filter + new post button */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8, flexWrap:'wrap', gap:8}}>
        <button onClick={() => { setEditingPost(null); setEditorOpen(true); }}
          style={{
            display:'flex', alignItems:'center', gap:5,
            background: C.accent, color:'#fff', border:'none',
            borderRadius:100, padding:'7px 16px', fontSize:12, fontWeight:600,
            cursor:'pointer', fontFamily:'inherit', flexShrink:0,
            boxShadow: '0 2px 8px rgba(232,145,165,0.35)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(232,145,165,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,145,165,0.35)'; }}
        >
          <Plus size={14} strokeWidth={2.5} /> nuevo post
        </button>
      </div>

      {/* Status filter */}
      <div style={{display:'flex', gap:8, marginBottom:8, flexWrap:'wrap'}}>
        {['all','pending','creating','scheduled','published'].map(s => {
          const label = s === 'all' ? 'sin publicar' : STATUS[s].label;
          const count = totalCounts[s];
          const active = filterStatus === s;
          const color = s === 'all' ? C.ink : STATUS[s].color;
          const isPublished = s === 'published';
          return (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding:'6px 12px', border:`1px solid ${active ? color : (isPublished && count > 0 ? C.published : C.border)}`, borderRadius:100,
              background: active ? color + (s==='all' ? '' : '40') : (isPublished && count > 0 ? C.published + '20' : 'transparent'), 
              color: active && s==='all' ? '#fff' : C.ink, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
            }}>
              {label} <span style={{opacity: active && s==='all' ? 0.85 : 0.6}}>· {count}</span>
            </button>
          );
        })}
      </div>
      {filterStatus === 'all' && totalCounts.published > 0 && (
        <div style={{fontSize:11, color:C.inkSoft, fontStyle:'italic', marginBottom:16, padding:'4px 12px'}}>
          👉 los {totalCounts.published} posts ya publicados están escondidos · clic en <strong style={{color:C.ink}}>"publicado"</strong> arriba para verlos (y deshacer si marcaste alguno sin querer)
        </div>
      )}
      {filterStatus === 'published' && (
        <div style={{fontSize:11, color:C.published, fontStyle:'italic', marginBottom:16, padding:'4px 12px', fontWeight:500}}>
          ♡ aquí están los publicados · si marcaste alguno sin querer, abre el post y cambia el estado con el botón de estado
        </div>
      )}

      {/* Posts */}
      {filtered.length === 0 ? (
        <Card style={{textAlign:'center', padding:40, color:C.inkSoft}}>
          <div style={{fontSize:40, marginBottom:10}}>♡</div>
          no hay posts con ese filtro
        </Card>
      ) : (
        Object.keys(byWeek).sort((a,b) => +a - +b).map(w => (
          <div key={w} style={{marginBottom:24}}>
            <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:2, fontWeight:600, marginBottom:10, paddingLeft:4}}>
              {(() => {
                const posts = byWeek[w];
                const dates = posts.map(p => p.d).filter(Boolean).sort();
                if (dates.length === 0) return `semana ${w}`;
                const fmtD = d => {
                  const day = d.slice(8,10).replace(/^0/,'');
                  const mon = parseInt(d.slice(5,7),10);
                  const mNames = ['','ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
                  return `${day} ${mNames[mon]}`;
                };
                const first = fmtD(dates[0]);
                const last = fmtD(dates[dates.length-1]);
                const label = first === last ? first : `${first} — ${last}`;
                return `semana ${w} · ${label}`;
              })()}
            </div>
            {byWeek[w].map(p => (
              <PostCard key={p.i} post={p} platform={platform}
                onEdit={() => { setEditingPost(p); setEditorOpen(true); }}
                onDelete={() => handleDeletePost(p.i)}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TIKTOK VIEW — reels de IG reciclados
// ═══════════════════════════════════════════════════════════════════
function TikTokView({month, setMonth}) {
  const [state] = useAppState();
  const now = new Date();
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter IG posts that are reels
  const allReels = D.posts.ig.filter(p => /eel/i.test(p.t));
  const monthReels = allReels.filter(p => p.m === month);

  const getStatus = (pid) => {
    const post = D.posts.ig.find(p => p.i === pid);
    return post ? effectiveStatus(post, 'tiktok', state, now) : 'pending';
  };

  const filtered = filterStatus === 'all' 
    ? monthReels.filter(p => getStatus(p.i) !== 'published')
    : monthReels.filter(p => getStatus(p.i) === filterStatus);

  filtered.sort((a,b) => (a.d || '').localeCompare(b.d || ''));
  
  const tiktokHashtags = "#dramaslaborales #trabajotiktok #vidalaboral #consejodetrabajo #buscandotrabajo #orientacionlaboral #mujeresprofesionales #trabajotoxico #redflagslaborales #cvtips #linkedintips #cambiodecarrera #burnout #trabajoremoto #entrevistadetrabajo #fyp #parati #viral";

  const [copied, setCopied] = useState(false);
  const copyHt = async () => {
    try {
      await navigator.clipboard.writeText(tiktokHashtags);
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16}}>
        <div style={{width:52, height:52, background:C.ttBg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Video size={26} style={{color: C.ttDark}} />
        </div>
        <div>
          <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:4}}>
            red social
          </div>
          <H size="lg" style={{fontStyle:'italic'}}>tiktok</H>
        </div>
      </div>

      <div style={{
        background: C.ttBg, padding:16, borderRadius:12, marginBottom:24,
        fontSize:13, color:C.ink, lineHeight:1.6, display:'flex', alignItems:'center', gap:12
      }}>
        <Video size={18} style={{color: C.ttDark, flexShrink:0}}/>
        <div>
          <strong>estrategia:</strong> reciclar los reels de Instagram adaptándolos. mismo vídeo, mismo audio → subir tal cual. carruseles → convertir a vídeo con CapCut + música trending.
        </div>
      </div>

      <WeeklyMini month={month} />

      {/* Month tabs */}
      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:20, background:C.card, padding:10, borderRadius:12, border:`1px solid ${C.border}`}}>
        {MONTHS_ES.map(m => {
          const count = allReels.filter(p => p.m === m.id).length;
          return (
            <button key={m.id} onClick={() => setMonth(m.id)} style={{
              padding:'8px 14px', border:'none', borderRadius:100,
              background: month===m.id ? C.ttDark : 'transparent', 
              color: month===m.id ? '#fff' : C.ink,
              fontSize:12, cursor:'pointer', fontFamily:'inherit', fontWeight:500,
              display:'flex', alignItems:'center', gap:6
            }}>
              {m.n.toLowerCase()}
              <span style={{
                fontSize:10, padding:'1px 6px', borderRadius:100,
                background: month===m.id ? 'rgba(255,255,255,0.25)' : C.bgSoft,
                color: month===m.id ? '#fff' : C.inkSoft
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Status filter */}
      <div style={{display:'flex', gap:8, marginBottom:16, flexWrap:'wrap'}}>
        {['all','pending','creating','scheduled','published'].map(s => {
          const label = s === 'all' ? 'sin publicar' : STATUS[s].label;
          const active = filterStatus === s;
          const color = s === 'all' ? C.ink : STATUS[s].color;
          return (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding:'6px 12px', border:`1px solid ${active ? color : C.border}`, borderRadius:100,
              background: active ? color + (s==='all' ? '' : '40') : 'transparent', 
              color: active && s==='all' ? '#fff' : C.ink, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
            }}>{label}</button>
          );
        })}
      </div>

      {/* Hashtags TikTok */}
      <Card style={{marginBottom:20, background: C.ttBg, borderLeft: `3px solid ${C.ttDark}`}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8}}>
          <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600}}>
            hashtags tiktok
          </div>
          <Btn small variant="ghost" onClick={copyHt}>
            <CopyIcon size={11}/> {copied ? 'copiados ♡' : 'copiar'}
          </Btn>
        </div>
        <div style={{fontSize:12, color:C.ink, lineHeight:1.7}}>{tiktokHashtags}</div>
      </Card>

      {/* Reels */}
      {filtered.length === 0 ? (
        <Card style={{textAlign:'center', padding:40, color:C.inkSoft}}>sin reels</Card>
      ) : filtered.map(p => (
        <PostCard key={p.i} post={p} platform="tiktok" />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STORIES VIEW — historias diarias con check
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// PRODUCT STORIES — stories de producto para días específicos
// Se mezclan con las stories normales en StoriesView
// ═══════════════════════════════════════════════════════════════════
const PRODUCT_STORIES = {
  '2026-05-03': [
    { time:'12:00', text:'DÍA DE LA MADRE · fondo crema serif · "feliz día de la madre ♡ y a las que no las tienen ya · y a las que la relación es complicada · hoy va por todas ♡" · sticker corazón · sin CTA de venta · solo conexión' },
    { time:'14:00', text:'DÍA DE LA MADRE · pregunta · "una cosa que te enseñó tu madre sobre el trabajo (aunque ella no supiera que lo hacía) · cuéntame ↓" · caja de pregunta IG · cada respuesta es contenido para el lunes' },
    { time:'19:00', text:'DÍA DE LA MADRE · respuestas · comparte 2-3 respuestas que te hayan llegado (nombres tachados) · "esto me habéis escrito hoy y me habéis roto el corazón de lo bonito ♡" · sin sticker' },
    { time:'21:00', text:'LEAD MAGNET · cierre del día · fondo rosa suave · "¿sabes si tienes límites sanos en el trabajo? checklist de 12 preguntas · gratis · link en bio ♡" · solo si tienes energía · si no, déjalo para mañana' },
  ],
  '2026-05-09': [
    { time:'13:30', text:'EBOOK · KEYWORD CTA · fondo oscuro · "⚡ comenta EBOOK bajo el post de hoy → te llega el link de compra directamente al DM en segundos · sin buscar nada ♡" · sticker encuesta: ¿lo quieres? SI/NO' },
  ],
  '2026-05-19': [
    { time:'09:00', text:'EBOOK · ANUNCIO PRECIO · fondo oscuro blanco · "AVISO: el 26 de mayo el ebook sube de 16,99€ a 19,99€ · si llevas tiempo dándole vueltas → es ahora · comenta EBOOK o link en bio ♡" · countdown hasta 26 mayo' },
    { time:'21:00', text:'LEAD MAGNET PUENTE · "¿no estás segura? el checklist es gratis · 5 minutos · link en bio ♡"' },
  ],
  '2026-05-21': [
    { time:'21:30', text:'EBOOK · CUENTA ATRÁS · "5 días a 16,99€ · el 26 sube · comenta EBOOK o link en bio ♡" · countdown sticker hasta 26 mayo' },
  ],
  '2026-05-26': [
    { time:'08:00', text:'EBOOK · HOY SUBE · fondo oscuro · "HOY sube el ebook a 19,99€ · comenta EBOOK o link en bio ♡ (o espera 3€ más, tampoco es el fin del mundo 😄)"' },
    { time:'09:00', text:'EBOOK · POR QUÉ LO ESCRIBÍ · fondo crema · cuenta en 2-3 slides el momento personal que te llevó a escribirlo · honesto · sin filtro · eso es lo que hay dentro ♡' },
    { time:'19:00', text:'EBOOK · PRECIO CON HUMOR · fondo rosa · "~~16,99€~~ → ya es 19,99€ · sigue siendo menos de una noche de Netflix ♡ · comenta EBOOK o link en bio"' },
    { time:'21:00', text:'LEAD MAGNET · PARA QUIEN NO COMPRÓ · "¿todavía dudas? el checklist es gratis · 5 minutos · al final te dice si el ebook es para ti · sin presión ♡" · link checklist' },
  ],
  '2026-05-28': [
    { time:'21:00', text:'ASESORÍA · SIEMBRA · fondo crema · "el ebook es perfecto para quien puede andar sola con un mapa · pero hay momentos en que necesitas que alguien camine contigo · para eso estoy preparando algo · os cuento pronto ♡"' },
  ],
  '2026-05-30': [
    { time:'17:00', text:'EBOOK · PARA QUIEN DUDA · fondo oscuro · "si llevas semanas viendo el ebook y no te decides → ¿qué es lo peor que puede pasar? · 19,99€ · una clase de yoga · y si te sirve puede cambiar algo real ♡ · comenta EBOOK o link en bio"' },
  ],
  '2026-06-06': [
    { time:'tarde', text:'ASESORÍA · 2 PERFILES · "¿cuál eres tú? A: llevas poco tiempo y no sabes empezar / B: llevas años y algo no encaja · responde a esta story ♡" · caja respuestas · cada respuesta = lead cualificado' },
  ],
  '2026-06-13': [
    { time:'tarde', text:'ASESORÍA · QUÉ ES UNA SESIÓN · "en 2h30: defines objetivo → CV + LinkedIn → entrevista práctica → sales con documentos listos · no es coaching · es orientación práctica · responde SI si quieres saber más ♡"' },
  ],
  '2026-06-20': [
    { time:'tarde', text:'ASESORÍA · TEASER LISTA ESPERA · "en 2 semanas abro 3-5 plazas · 90€ · si quieres ser de las primeras → responde a esta story con tu nombre ♡"' },
  ],
  '2026-06-22': [
    { time:'09:00', text:'ASESORÍA · LISTA ESPERA ABIERTA · fondo oscuro · "ABRO LISTA DE ESPERA ASESORÍA 1:1 · julio · 3-5 plazas · 90€ precio lanzamiento · link en bio para apuntarte · acceso 48h antes ♡"' },
  ],
  '2026-07-06': [
    { time:'09:00', text:'ASESORÍA · LANZAMIENTO · "HOY ABRO PLAZAS · asesoría 1:1 · 2h30 · 90€ · 3-5 plazas hasta el 13 julio · link en bio para reservar ♡"' },
  ],
  '2026-09-22': [
    { time:'tarde', text:'ACOMPAÑAMIENTO · FUNDADORAS · "antes del lanzamiento → 3 plazas a 450€ (vs 625€) · a cambio de feedback y testimonio · responde a esta story si te interesa ♡"' },
  ],
  '2026-09-29': [
    { time:'09:00', text:'ACOMPAÑAMIENTO · LISTA ESPERA · "ABRO LISTA · octubre · 3-5 plazas · fundadoras 450€ / regular 625€ · link en bio ♡"' },
  ],
  '2026-10-20': [
    { time:'09:00', text:'ACOMPAÑAMIENTO · LANZAMIENTO · "HOY ABRO PLAZAS · 2 meses · 4 sesiones + seguimiento · 3-5 plazas · formulario de candidatura · link en bio ♡"' },
  ],
};






function StoriesView({month, setMonth}) {
  const [state, update] = useAppState();
  const [expandedDay, setExpandedDay] = useState(null);
  const mNum = MONTHS_ES.find(m => m.id === month)?.num || 4;
  const daysInMonth = new Date(2026, mNum, 0).getDate();

  // Group IG posts by day
  const postsByDay = {};
  D.posts.ig.filter(p => p.m === month).forEach(p => {
    const d = parseInt((p.d || '').split('-')[2]);
    if (d) postsByDay[d] = p;
  });

  // Helper: parse stories → returns [{time, text}] — only content to post, no design instructions
  const getStoriesForDay = (d) => {
    const post = postsByDay[d];
    const dateStr = `2026-${String(mNum).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const productStories = PRODUCT_STORIES[dateStr] || [];
    if (post && post.st) {
      // Format: "STORY N · HH:MM · description\n🎨 ...\n💬 text\n🏷 ...\n⏱ ..."
      if (/STORY\s+\d+/i.test(post.st)) {
        const blocks = post.st.split(/(?=STORY\s+\d+)/i).map(s => s.trim()).filter(Boolean);
        return blocks.slice(0, 10).map(block => {
          const timeMatch = block.match(/STORY\s+\d+\s*[··]\s*(\d{1,2}:\d{2})/i);
          const time = timeMatch ? timeMatch[1] : null;
          const copyLine = block.split('\n').find(l => l.startsWith('💬'));
          const copy = copyLine ? copyLine.replace(/^💬\s*/, '').replace(/^[""]|[""]$/g, '').trim() : null;
          const descMatch = block.match(/STORY\s+\d+\s*[··]\s*\d{1,2}:\d{2}\s*[··]\s*([^\n]+)/i);
          const desc = descMatch ? descMatch[1].trim() : null;
          return { time, text: copy || desc || block.split('\n')[0] };
        });
      }
      // Pipe format: "1) texto | 2) texto"
      const pipe = post.st.split(/\s*\|\s*/).filter(s => s.trim().length > 3);
      if (pipe.length >= 2) {
        return pipe.map(s => ({ time: null, text: s.replace(/^\d+[).\s]+/, '').trim() })).slice(0, 8);
      }
      // Numbered lines
      const lines = post.st.split(/\n/).filter(l => /^\d+[).\s]/.test(l.trim()));
      if (lines.length >= 2) {
        return lines.map(s => ({ time: null, text: s.replace(/^\d+[).\s]+/, '').trim() })).slice(0, 8);
      }
    }
    // Defaults by post type
    const t = post?.t?.toLowerCase() || '';
    if (t.includes('reel')) return [...[
      { time: null, text: 'compartir reel' },
      { time: null, text: 'tip extra' },
      { time: null, text: 'encuesta del tema' },
      { time: null, text: 'compartir respuestas' },
      { time: null, text: 'link en bio ♡' },
    ], ...productStories];
    if (t.includes('carrusel')) return [...[
      { time: null, text: 'compartir carrusel' },
      { time: null, text: 'slide más importante' },
      { time: null, text: 'encuesta rápida' },
      { time: null, text: 'respuestas comunidad' },
      { time: null, text: 'link en bio ♡' },
    ], ...productStories];
    const base = [
      { time: null, text: 'compartir post' },
      { time: null, text: 'pregunta abierta' },
      { time: null, text: 'respuestas comunidad' },
      { time: null, text: 'link en bio ♡' },
    ];
    return [...base, ...productStories];
  };

    // Check state helpers
  const getChecks = (d) => {
    const dayData = state.stories[`${month}:${d}`];
    if (!dayData || typeof dayData !== 'object') return [];
    return Array.isArray(dayData.checks) ? dayData.checks : [];
  };

  const toggleStory = (d, storyIdx) => {
    update(s => {
      const key = `${month}:${d}`;
      if (!s.stories[key] || typeof s.stories[key] !== 'object') {
        s.stories[key] = {checks: []};
      }
      if (!Array.isArray(s.stories[key].checks)) s.stories[key].checks = [];
      const current = s.stories[key].checks[storyIdx] || false;
      s.stories[key].checks[storyIdx] = !current;
    });
  };

  // Day-level stats
  const dayCompletion = (d) => {
    const stories = getStoriesForDay(d);
    const checks = getChecks(d);
    const done = checks.filter(Boolean).length;
    return {done, total: stories.length};
  };

  // Day of week labels
  const dayOfWeek = (d) => {
    const dt = new Date(2026, mNum-1, d);
    return ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][dt.getDay()];
  };

  // Build list of days to show:
  // - If month is in the past relative to today: skip it entirely (show empty)
  // - If month is current month: show from today onwards
  // - If month is future: show all days
  // - Only show days that have a post OR are current/future
  const now = new Date();
  const todayIsThisMonth = now.getFullYear() === 2026 && (now.getMonth() + 1) === mNum;
  const monthIsPast = now.getFullYear() === 2026 && (now.getMonth() + 1) > mNum;

  let daysToShow;
  if (monthIsPast) {
    // Past month: show only days that had posts (archive view)
    daysToShow = Object.keys(postsByDay).map(Number).sort((a,b) => a-b);
  } else if (todayIsThisMonth) {
    // Current month: from today onwards, skipping today if it has no post scheduled
    daysToShow = [];
    const startDay = postsByDay[now.getDate()] ? now.getDate() : now.getDate() + 1;
    for (let d = startDay; d <= daysInMonth; d++) daysToShow.push(d);
  } else {
    // Future month: show all days with posts (or all if empty)
    const withPosts = Object.keys(postsByDay).map(Number);
    if (withPosts.length > 0) {
      daysToShow = withPosts.sort((a,b) => a-b);
    } else {
      daysToShow = Array.from({length: daysInMonth}, (_, i) => i + 1);
    }
  }

  // Recalculate totals based on visible days only
  const totalDone = daysToShow.reduce((sum, d) => sum + dayCompletion(d).done, 0);
  const totalStories = daysToShow.reduce((sum, d) => sum + dayCompletion(d).total, 0);

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16}}>
        <div style={{width:52, height:52, background:C.igBg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Heart size={26} style={{color: C.igDark}} />
        </div>
        <div>
          <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:4}}>
            instagram
          </div>
          <H size="lg" style={{fontStyle:'italic'}}>historias diarias</H>
        </div>
      </div>

      <div style={{
        background: C.igBg, padding:16, borderRadius:12, marginBottom:24, fontSize:13, color:C.ink, lineHeight:1.6
      }}>
        <strong>♡ cada día tiene 5-6 stories tipificadas.</strong> marca cada una cuando la subas — así sabes exactamente qué te falta y nada se te escapa.
      </div>

      {/* Month tabs */}
      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:20, background:C.card, padding:10, borderRadius:12, border:`1px solid ${C.border}`}}>
        {MONTHS_ES.map(m => (
          <button key={m.id} onClick={() => setMonth(m.id)} style={{
            padding:'8px 14px', border:'none', borderRadius:100,
            background: month===m.id ? C.igDark : 'transparent', 
            color: month===m.id ? '#fff' : C.ink,
            fontSize:12, cursor:'pointer', fontFamily:'inherit', fontWeight:500
          }}>{m.n.toLowerCase()}</button>
        ))}
      </div>

      {/* Progress */}
      <Card style={{marginBottom:20, background:`linear-gradient(135deg, ${C.igBg} 0%, ${C.bg} 100%)`, border:'none'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:11, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
              stories publicadas este mes
            </div>
            <div style={{fontSize:26, fontFamily:"'Fraunces', serif", color:C.ink, marginTop:4}}>
              {totalDone} / {totalStories}
            </div>
          </div>
          <div style={{
            width:80, height:80, borderRadius:40, display:'flex', alignItems:'center', justifyContent:'center',
            background: `conic-gradient(${C.igDark} ${totalStories > 0 ? (totalDone/totalStories)*360 : 0}deg, ${C.igBg} 0deg)`
          }}>
            <div style={{width:64, height:64, background:C.card, borderRadius:32, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:600, color:C.ink}}>
              {totalStories > 0 ? Math.round((totalDone/totalStories)*100) : 0}%
            </div>
          </div>
        </div>
      </Card>

      {/* Days as expandable list */}
      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        {daysToShow.length === 0 ? (
          <Card style={{textAlign:'center', padding:40, color:C.inkSoft}}>
            <div style={{fontSize:13, fontStyle:'italic'}}>no hay días con posts en este mes todavía ♡</div>
          </Card>
        ) : daysToShow.map(d => {
          const post = postsByDay[d];
          const stories = getStoriesForDay(d);
          const checks = getChecks(d);
          const completion = dayCompletion(d);
          const allDone = completion.done === completion.total && completion.total > 0;
          const isExpanded = expandedDay === d;

          return (
            <div key={d} style={{
              background: allDone ? C.igBg : C.card, 
              borderRadius: 12, border: `1px solid ${allDone ? C.igDark : C.border}`,
              transition:'all 0.2s',
              borderLeft: `3px solid ${allDone ? C.igDark : (completion.done > 0 ? C.accent : C.border)}`
            }}>
              {/* Day header - clickable to expand */}
              <div onClick={() => setExpandedDay(isExpanded ? null : d)} style={{
                display:'flex', alignItems:'center', gap:14, padding:14, cursor:'pointer'
              }}>
                <div style={{
                  minWidth:52, textAlign:'center', padding:'8px 0',
                  background: C.igBg, borderRadius:10, color:C.igDark
                }}>
                  <div style={{fontFamily:"'Fraunces', serif", fontSize:20, fontWeight:500, lineHeight:1}}>{d}</div>
                  <div style={{fontSize:9, textTransform:'uppercase', letterSpacing:0.5, marginTop:2}}>
                    {dayOfWeek(d)}
                  </div>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:500, color:C.ink, marginBottom:3}}>
                    {post ? post.ti : <span style={{color:C.inkSoft, fontStyle:'italic'}}>sin post · stories de relleno</span>}
                  </div>
                  <div style={{display:'flex', gap:6, alignItems:'center', flexWrap:'wrap'}}>
                    {post && <Badge bg={C.igBg} color={C.igDark} style={{fontSize:10}}>{post.t}</Badge>}
                    <span style={{fontSize:11, color: allDone ? C.igDark : C.inkSoft, fontWeight: allDone ? 600 : 400}}>
                      {completion.done}/{completion.total} stories
                    </span>
                    {allDone && <span style={{fontSize:11, color:C.igDark, fontWeight:600}}>♡</span>}
                  </div>
                </div>
                <ChevronRight size={16} style={{color:C.inkSoft, transform: isExpanded ? 'rotate(90deg)' : 'none', transition:'transform 0.2s', flexShrink:0}}/>
              </div>

              {/* Expanded: checks per story */}
              {isExpanded && (
                <div style={{padding:'0 14px 14px 14px'}}>
                  <div style={{borderTop:`1px solid ${C.borderSoft}`, paddingTop:12, display:'flex', flexDirection:'column', gap:6}}>
                    {stories.map((story, idx) => {
                      const isDone = checks[idx];
                      const storyText = typeof story === 'string' ? story : story.text;
                      const storyTime = typeof story === 'object' ? story.time : null;
                      return (
                        <div key={idx} onClick={() => toggleStory(d, idx)} style={{
                          display:'flex', alignItems:'flex-start', gap:10, padding:'8px 10px',
                          background: isDone ? C.igBg : C.bgSoft, borderRadius:8, cursor:'pointer',
                          transition:'background 0.15s'
                        }}>
                          <div style={{
                            width:20, height:20, borderRadius:10, flexShrink:0,
                            background: isDone ? C.igDark : 'transparent',
                            border: `2px solid ${isDone ? C.igDark : C.border}`,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            marginTop:1
                          }}>
                            {isDone && <Check size={12} style={{color:'#fff'}}/>}
                          </div>
                          <div style={{
                            flex:1, fontSize:12, color:C.ink, lineHeight:1.5,
                            textDecoration: isDone ? 'line-through' : 'none',
                            opacity: isDone ? 0.65 : 1,
                          }}>
                            {storyTime && (
                              <span style={{
                                fontSize:10, fontWeight:700, color:C.igDark,
                                background:C.igBg, borderRadius:4, padding:'1px 6px',
                                marginRight:8, fontFamily:'monospace', letterSpacing:0.5
                              }}>{storyTime}</span>
                            )}
                            {storyText}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Templates */}
      <div style={{marginTop:30}}>
        <H size="sm" style={{marginBottom:14}}>plantillas de stories por tipo de día</H>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:12}}>
          {D.templates.map((t, i) => (
            <Card key={i} style={{padding:14}}>
              <div style={{fontFamily:"'Fraunces', serif", fontStyle:'italic', fontSize:15, fontWeight:500, color:C.ink, marginBottom:10}}>
                {t.type}
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:4}}>
                {t.stories.map((s, j) => (
                  <div key={j} style={{
                    fontSize:11, color:C.ink, padding:'5px 10px',
                    background: C.bgSoft, borderRadius:6, display:'flex', gap:8
                  }}>
                    <span style={{color: C.igDark, fontWeight:600, flexShrink:0}}>{j+1}</span>
                    <span style={{flex:1, lineHeight:1.4}}>{s}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEED VIEW — rejilla 3xN con imágenes subidas
// ═══════════════════════════════════════════════════════════════════
function FeedView() {
  const [state, update] = useAppState();
  const [urlDraft, setUrlDraft] = useState('');
  const [editing, setEditing] = useState(false);

  // state.canvaFeed may be undefined initially
  const canvaUrl = state.canvaFeed?.url || '';
  const canvaNote = state.canvaFeed?.note || '';

  useEffect(() => {
    if (!editing) {
      setUrlDraft(canvaUrl);
    }
  }, [canvaUrl, editing]);

  const saveUrl = () => {
    update(s => {
      if (!s.canvaFeed) s.canvaFeed = {};
      s.canvaFeed.url = urlDraft.trim();
    });
    setEditing(false);
  };

  const saveNote = (text) => {
    update(s => {
      if (!s.canvaFeed) s.canvaFeed = {};
      s.canvaFeed.note = text;
    });
  };

  const clearUrl = () => {
    update(s => {
      if (!s.canvaFeed) s.canvaFeed = {};
      s.canvaFeed.url = '';
    });
    setUrlDraft('');
    setEditing(false);
  };

  const openCanva = () => {
    if (canvaUrl) window.open(canvaUrl, '_blank', 'noopener');
  };

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16}}>
        <div style={{width:52, height:52, background:C.igBg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Grid size={26} style={{color: C.igDark}} />
        </div>
        <div>
          <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:4}}>
            instagram
          </div>
          <H size="lg" style={{fontStyle:'italic'}}>feed visual en canva</H>
        </div>
      </div>

      <div style={{
        background: C.igBg, padding:16, borderRadius:12, marginBottom:24, fontSize:13, color:C.ink, lineHeight:1.6
      }}>
        <strong>♡ enlaza tu proyecto de Canva</strong> donde diseñas el feed. desde aquí lo abres con un click y puedes guardar notas sobre la planificación visual.
      </div>

      {/* URL card */}
      <Card style={{marginBottom:20}}>
        <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:10}}>
          proyecto canva del feed
        </div>

        {editing || !canvaUrl ? (
          <div>
            <input
              type="text"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              placeholder="https://www.canva.com/design/..."
              style={{
                width:'100%', padding:'10px 14px', border:`1px solid ${C.border}`,
                borderRadius:10, fontFamily:'inherit', fontSize:13,
                background:C.bg, color:C.ink, boxSizing:'border-box', marginBottom:10
              }}
              autoFocus={editing}
            />
            <div style={{display:'flex', gap:8}}>
              <Btn variant="accent" small onClick={saveUrl} disabled={!urlDraft.trim()}>
                <Save size={12}/> guardar enlace
              </Btn>
              {canvaUrl && (
                <Btn variant="ghost" small onClick={() => { setEditing(false); setUrlDraft(canvaUrl); }}>
                  cancelar
                </Btn>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div style={{
              display:'flex', alignItems:'center', gap:10, padding:'12px 14px',
              background: C.bgSoft, borderRadius:10, marginBottom:12, overflow:'hidden'
            }}>
              <Grid size={16} style={{color:C.igDark, flexShrink:0}}/>
              <div style={{
                flex:1, fontSize:12, color:C.ink, overflow:'hidden',
                textOverflow:'ellipsis', whiteSpace:'nowrap'
              }}>
                {canvaUrl}
              </div>
            </div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              <Btn variant="accent" small onClick={openCanva}>
                <Eye size={12}/> abrir en canva
              </Btn>
              <Btn variant="ghost" small onClick={() => { setEditing(true); setUrlDraft(canvaUrl); }}>
                <Edit2 size={12}/> editar enlace
              </Btn>
              <Btn variant="ghost" small onClick={clearUrl}>
                <Trash2 size={12}/> quitar
              </Btn>
            </div>
          </div>
        )}
      </Card>

      {/* Note card */}
      <Card>
        <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:10}}>
          notas del feed
        </div>
        <textarea
          value={canvaNote}
          onChange={(e) => saveNote(e.target.value)}
          placeholder="qué estética buscas, qué toca esta semana, paleta de colores, ideas..."
          style={{
            width:'100%', minHeight:120, padding:12, border:`1px solid ${C.border}`,
            borderRadius:10, fontFamily:'inherit', fontSize:13, resize:'vertical',
            background:C.bg, color:C.ink, boxSizing:'border-box', lineHeight:1.5
          }}
        />
        <div style={{fontSize:11, color:C.inkSoft, marginTop:8, fontStyle:'italic'}}>
          las notas se guardan solas mientras escribes ♡
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// WOMEN VIEW — mujeres que inspiran con filtro
// ═══════════════════════════════════════════════════════════════════
function WomenView() {
  const [state, update] = useAppState();
  const [filter, setFilter] = useState('todas');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const deletedIds = new Set(state.deletedWomen || []);
  const allWomen = [...D.women, ...(state.customWomen || [])].filter(w => !deletedIds.has(w.name));

  const handleSave = (form) => {
    if (!form.name?.trim()) return;
    update(s => {
      if (!s.customWomen) s.customWomen = [];
      const idx = s.customWomen.findIndex(w => w.name === (editingItem?.name));
      const item = { name: form.name, category: form.category || 'musica', hook: form.hook, lesson: form.lesson, story: form.story, _custom: true };
      if (idx >= 0) s.customWomen[idx] = item;
      else s.customWomen.push(item);
    });
    setEditorOpen(false); setEditingItem(null);
  };

  const handleDelete = (name) => {
    if (!confirm('¿Eliminar esta mujer?')) return;
    update(s => {
      if (!s.deletedWomen) s.deletedWomen = [];
      if (!s.deletedWomen.includes(name)) s.deletedWomen.push(name);
      if (s.customWomen) s.customWomen = s.customWomen.filter(w => w.name !== name);
    });
  };

  const womenFields = [
    { key:'name', label:'Nombre', required:true, placeholder:'Ej: Malala Yousafzai' },
    { key:'category', label:'Categoría', type:'select', options:[
      {value:'musica',label:'música'},{value:'cine',label:'cine'},{value:'literatura',label:'literatura'},
      {value:'arte',label:'arte'},{value:'deporte',label:'deporte'},{value:'emprendimiento',label:'emprendimiento'},
      {value:'politica',label:'política'},{value:'moda',label:'moda'},{value:'ciencia',label:'ciencia'},
      {value:'cocina',label:'cocina'},{value:'comunicacion',label:'comunicación'},{value:'iconos',label:'iconos'},{value:'negocios',label:'negocios'},
    ]},
    { key:'hook', label:'Hook para post ♡', placeholder:'La frase que para el scroll...' },
    { key:'lesson', label:'Lección laboral', placeholder:'Qué se puede aprender de su historia...' },
    { key:'story', label:'Historia (2-3 líneas)', type:'textarea', rows:3, placeholder:'Contexto de su trayectoria...' },
  ];

  const categories = ['todas', 'musica', 'cine', 'literatura', 'arte', 'deporte', 'emprendimiento', 'politica', 'moda', 'ciencia', 'cocina', 'comunicacion', 'iconos', 'negocios'];
  const filtered = filter === 'todas' 
    ? allWomen 
    : allWomen.filter(w => w.category === filter);

  const catLabels = {
    musica:'música', cine:'cine', literatura:'literatura', arte:'arte',
    deporte:'deporte', emprendimiento:'emprendimiento', politica:'política',
    moda:'moda', ciencia:'ciencia', cocina:'cocina', 
    comunicacion:'comunicación', iconos:'iconos', negocios:'negocios'
  };
  const catColors = {
    musica:C.ig, cine:C.tt, literatura:C.ss, arte:C.accent,
    deporte:C.li, emprendimiento:C.tt, politica:C.li,
    moda:C.ig, ciencia:C.li, cocina:C.ss, 
    comunicacion:C.tt, iconos:C.accent, negocios:C.ss
  };

  return (
    <div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          recursos
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>mujeres que inspiran <Sparkles size={24} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/></H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:8, maxWidth:600, lineHeight:1.6}}>
          banco de historias para usar 1-2 veces al mes. cada una con hook listo para copiar.
        </div>
      </div>

      {editorOpen && (
        <MiniEditor
          title={editingItem ? '✏️ editar mujer' : '✦ añadir mujer'}
          fields={womenFields}
          initial={editingItem ? { name: editingItem.name, category: editingItem.category, hook: editingItem.hook, lesson: editingItem.lesson, story: editingItem.story } : {}}
          onSave={handleSave}
          onClose={() => { setEditorOpen(false); setEditingItem(null); }}
        />
      )}

      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:8}}>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding:'7px 14px', border:'none', borderRadius:100,
            background: filter===c ? C.ink : C.bgSoft, 
            color: filter===c ? C.bg : C.ink, fontSize:12, cursor:'pointer', fontFamily:'inherit', fontWeight:500
          }}>{c === 'todas' ? 'todas' : catLabels[c]}</button>
        ))}
        </div>
        <button onClick={() => { setEditingItem(null); setEditorOpen(true); }} style={{
          display:'flex', alignItems:'center', gap:5, background:C.accent, color:'#fff',
          border:'none', borderRadius:100, padding:'7px 16px', fontSize:12, fontWeight:600,
          cursor:'pointer', fontFamily:'inherit', boxShadow:'0 2px 8px rgba(232,145,165,0.35)',
        }}><Plus size={14} strokeWidth={2.5}/> añadir mujer</button>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:14}}>
        {filtered.map((w, i) => (
          <Card key={i} style={{padding:18, borderLeft: `3px solid ${catColors[w.category] || C.accent}`}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10}}>
              <div>
                <div style={{fontSize:18, fontFamily:"'Fraunces', serif", fontWeight:500, color:C.ink, textTransform:'capitalize'}}>
                  {w.name}
                </div>
                {w.stat && (
                  <div style={{fontSize:11, color:C.inkSoft, marginTop:2}}>
                    {w.stat} oyentes
                  </div>
                )}
              </div>
              <Badge bg={catColors[w.category]+'30' || C.bgSoft} color={C.ink}>
                {catLabels[w.category] || w.category}
              </Badge>
            </div>
            <div style={{fontSize:13, color:C.ink, lineHeight:1.5, marginBottom:10}}>
              {w.story}
            </div>
            <div style={{
              fontSize:11, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:6
            }}>aprendizaje</div>
            <div style={{fontSize:12, color:C.ink, lineHeight:1.5, marginBottom:12, fontStyle:'italic'}}>
              {w.lesson}
            </div>
            {w.hook && (
              <div style={{
                fontSize:13, fontFamily:"'Fraunces', serif", fontStyle:'italic', 
                color:C.ink, padding:'10px 14px', background:C.bgSoft, borderRadius:10,
                lineHeight:1.4
              }}>
                "{w.hook}"
              </div>
            )}
            <div style={{display:'flex', gap:6, marginTop:10, justifyContent:'flex-end'}}>
              <button onClick={() => { setEditingItem(w); setEditorOpen(true); }} style={{
                background:'none', border:`1px solid ${C.border}`, borderRadius:6,
                padding:'4px 8px', cursor:'pointer', color:C.inkSoft,
                display:'inline-flex', alignItems:'center', gap:4, fontSize:11,
                transition:'all 0.15s', fontFamily:'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.background=C.accentSoft; e.currentTarget.style.color=C.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color=C.inkSoft; }}
              ><Edit2 size={11}/> editar</button>
              <button onClick={() => handleDelete(w.name)} style={{
                background:'none', border:`1px solid ${C.border}`, borderRadius:6,
                padding:'4px 8px', cursor:'pointer', color:C.inkSoft,
                display:'inline-flex', alignItems:'center', gap:4, fontSize:11,
                transition:'all 0.15s', fontFamily:'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='#fde8e8'; e.currentTarget.style.color='#e87a7a'; }}
              onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color=C.inkSoft; }}
              ><Trash2 size={11}/> eliminar</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DATES VIEW — fechas clave del año
// ═══════════════════════════════════════════════════════════════════
function DatesView() {
  const [state, update] = useAppState();
  const [filter, setFilter] = useState('todas');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const deletedIds = new Set(state.deletedDates || []);
  const customDates = state.customDates || [];

  const handleSaveDate = (form) => {
    if (!form.name?.trim() || !form.date?.trim()) return;
    update(s => {
      if (!s.customDates) s.customDates = [];
      const idx = s.customDates.findIndex(d => d._id === editingItem?._id);
      const item = { _id: editingItem?._id || `custom-${Date.now()}`, name: form.name, date: form.date, type: form.type || 'internacional', idea: form.idea, _custom: true };
      if (idx >= 0) s.customDates[idx] = item;
      else s.customDates.push(item);
    });
    setEditorOpen(false); setEditingItem(null);
  };

  const handleDeleteDate = (id) => {
    if (!confirm('¿Eliminar esta fecha?')) return;
    update(s => {
      if (!s.deletedDates) s.deletedDates = [];
      if (!s.deletedDates.includes(id)) s.deletedDates.push(id);
      if (s.customDates) s.customDates = s.customDates.filter(d => d._id !== id);
    });
  };

  const dateFields = [
    { key:'name', label:'Nombre de la fecha', required:true, placeholder:'Ej: Día Mundial del Trabajo' },
    { key:'date', label:'Fecha', required:true, placeholder:'Ej: 1 mayo' },
    { key:'type', label:'Tipo', type:'select', options:[
      {value:'festivo',label:'festivo'},{value:'internacional',label:'día internacional'},{value:'evento',label:'evento'},
    ]},
    { key:'idea', label:'Idea de contenido', type:'textarea', rows:3, placeholder:'Cómo conectarlo con Dramas Laborales...' },
  ];
  
  const types = ['todas', 'festivo', 'internacional', 'evento'];
  const typeLabels = {festivo:'festivos', internacional:'días internacionales', evento:'premios y eventos'};
  const typeColors = {festivo:C.ss, internacional:C.li, evento:C.tt};
  
  // Filter dates: keep only those that look like real dates (have month/day, not just names)
  const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','septiembre','octubre','noviembre','diciembre','sept'];
  const isRealDate = (d) => {
    const s = (d.date || '').toLowerCase();
    return monthNames.some(m => s.includes(m)) || /^\d/.test(s);
  };
  
  const cleanDates = [...D.dates.filter(isRealDate), ...customDates].filter(d => !deletedIds.has(d._id));
  
  const filtered = filter === 'todas' 
    ? cleanDates 
    : cleanDates.filter(d => d.type === filter);

  // Parse month from date string (e.g., "28 abril" or "10-19 abril" or "noviembre")
  const getMonthIdx = (dateStr) => {
    const s = dateStr.toLowerCase();
    const monthsMap = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    for (let i = 0; i < monthsMap.length; i++) {
      if (s.includes(monthsMap[i]) || (monthsMap[i] === 'septiembre' && s.includes('sept'))) return i;
    }
    return 12; // unknown at end
  };
  
  // Parse day (for sorting within month)
  const getDay = (dateStr) => {
    const m = dateStr.match(/^(\d+)/);
    return m ? parseInt(m[1]) : 99;
  };

  // Group by month
  const byMonth = {};
  filtered.forEach(d => {
    const mi = getMonthIdx(d.date);
    if (!byMonth[mi]) byMonth[mi] = [];
    byMonth[mi].push(d);
  });
  
  // Sort each month by day
  Object.keys(byMonth).forEach(mi => {
    byMonth[mi].sort((a, b) => getDay(a.date) - getDay(b.date));
  });

  const monthLabels = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre','sin mes'];

  const orderedMonths = Object.keys(byMonth).map(Number).sort((a,b) => a-b);

  return (
    <div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          recursos
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>fechas clave <Star size={22} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/></H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:8, maxWidth:600, lineHeight:1.6}}>
          calendario anual · días importantes para alinear contenido con eventos del mundo
        </div>
      </div>

      {editorOpen && (
        <MiniEditor
          title={editingItem ? '✏️ editar fecha' : '✦ añadir fecha clave'}
          fields={dateFields}
          initial={editingItem ? { name:editingItem.name, date:editingItem.date, type:editingItem.type, idea:editingItem.idea } : {}}
          onSave={handleSaveDate}
          onClose={() => { setEditorOpen(false); setEditingItem(null); }}
        />
      )}

      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:8}}>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding:'7px 14px', border:'none', borderRadius:100,
              background: filter===t ? C.ink : C.bgSoft, 
              color: filter===t ? C.bg : C.ink, fontSize:12, cursor:'pointer', fontFamily:'inherit', fontWeight:500
          }}>{t === 'todas' ? 'todas' : typeLabels[t]}</button>
        ))}
        </div>
        <button onClick={() => { setEditingItem(null); setEditorOpen(true); }} style={{
          display:'flex', alignItems:'center', gap:5, background:C.accent, color:'#fff',
          border:'none', borderRadius:100, padding:'7px 16px', fontSize:12, fontWeight:600,
          cursor:'pointer', fontFamily:'inherit', boxShadow:'0 2px 8px rgba(232,145,165,0.35)', flexShrink:0,
        }}><Plus size={14} strokeWidth={2.5}/> añadir fecha</button>
      </div>

      {orderedMonths.length === 0 && (
        <Card style={{textAlign:'center', padding:40, color:C.inkSoft}}>
          no hay fechas con este filtro
        </Card>
      )}

      {orderedMonths.map(mi => (
        <div key={mi} style={{marginBottom:28}}>
          <div style={{
            fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:2,
            fontWeight:600, marginBottom:12, paddingLeft:4,
            display:'flex', alignItems:'center', gap:10
          }}>
            <span>{monthLabels[mi]}</span>
            <span style={{flex:1, height:1, background: C.borderSoft}}></span>
            <span style={{color:C.inkSoft}}>{byMonth[mi].length}</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:10}}>
            {byMonth[mi].map((d, i) => (
              <Card key={i} style={{
                padding:14, borderLeft:`3px solid ${typeColors[d.type] || C.accent}`
              }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6, gap:8}}>
                  <div style={{
                    fontSize:13, fontFamily:"'Fraunces', serif", fontWeight:500, 
                    color:C.ink, fontStyle:'italic'
                  }}>
                    {d.date}
                  </div>
                  <Badge bg={typeColors[d.type]+'40'} color={C.ink} style={{fontSize:9, flexShrink:0}}>
                    {d.type === 'festivo' ? 'festivo' : d.type === 'internacional' ? 'internacional' : 'evento'}
                  </Badge>
                </div>
                <div style={{fontSize:13, color:C.ink, fontWeight:500, marginBottom:6, textTransform:'capitalize', lineHeight:1.3}}>
                  {d.name}
                </div>
                {d.idea && (
                  <div style={{fontSize:11, color:C.inkSoft, lineHeight:1.5, fontStyle:'italic'}}>
                    → {d.idea}
                  </div>
                )}
                <div style={{display:'flex', gap:6, marginTop:10, justifyContent:'flex-end'}}>
                  <button onClick={() => { setEditingItem(d); setEditorOpen(true); }} style={{
                    background:'none', border:`1px solid ${C.border}`, borderRadius:6,
                    padding:'3px 7px', cursor:'pointer', color:C.inkSoft,
                    display:'inline-flex', alignItems:'center', gap:3, fontSize:11, fontFamily:'inherit',
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background=C.accentSoft;e.currentTarget.style.color=C.accent;}}
                  onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=C.inkSoft;}}
                  ><Edit2 size={10}/> editar</button>
                  <button onClick={() => handleDeleteDate(d._id || d.name)} style={{
                    background:'none', border:`1px solid ${C.border}`, borderRadius:6,
                    padding:'3px 7px', cursor:'pointer', color:C.inkSoft,
                    display:'inline-flex', alignItems:'center', gap:3, fontSize:11, fontFamily:'inherit',
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background='#fde8e8';e.currentTarget.style.color='#e87a7a';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=C.inkSoft;}}
                  ><Trash2 size={10}/> eliminar</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HASHTAGS VIEW — biblioteca copiable
// ═══════════════════════════════════════════════════════════════════
function HashtagsView() {
  const [state, update] = useAppState();
  const [copiedKey, setCopiedKey] = useState(null);
  const [newActive, setNewActive] = useState('');
  const [newTesting, setNewTesting] = useState('');
  
  const copyTags = async (key, tags) => {
    try {
      await navigator.clipboard.writeText(tags);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {}
  };

  // State structure:
  // state.hashtags = { active: ["#tag1", ...], testing: [{tag: "#tag", note: "", added: date}], archive: ["#tag"] }
  const ht = state.hashtags || {};
  const activeTags = Array.isArray(ht.active) ? ht.active : [];
  const testingTags = Array.isArray(ht.testing) ? ht.testing : [];
  const archiveTags = Array.isArray(ht.archive) ? ht.archive : [];

  const normalizeTag = (raw) => {
    const cleaned = raw.trim().replace(/^#+/, '').replace(/\s+/g, '').toLowerCase();
    return cleaned ? '#' + cleaned : '';
  };

  const addActive = (tagRaw) => {
    const tag = normalizeTag(tagRaw);
    if (!tag) return;
    if (activeTags.includes(tag)) return;
    update(s => {
      if (!s.hashtags) s.hashtags = {active:[], testing:[], archive:[]};
      if (!s.hashtags.active) s.hashtags.active = [];
      s.hashtags.active.push(tag);
    });
  };

  const removeActive = (tag) => {
    update(s => {
      if (s.hashtags && s.hashtags.active) {
        s.hashtags.active = s.hashtags.active.filter(t => t !== tag);
      }
    });
  };

  const promoteToActive = (tag) => {
    update(s => {
      if (!s.hashtags) s.hashtags = {active:[], testing:[], archive:[]};
      if (!s.hashtags.active) s.hashtags.active = [];
      if (!s.hashtags.active.includes(tag)) s.hashtags.active.push(tag);
      if (s.hashtags.testing) {
        s.hashtags.testing = s.hashtags.testing.filter(t => t.tag !== tag);
      }
    });
  };

  const addTesting = (tagRaw) => {
    const tag = normalizeTag(tagRaw);
    if (!tag) return;
    if (testingTags.find(t => t.tag === tag)) return;
    update(s => {
      if (!s.hashtags) s.hashtags = {active:[], testing:[], archive:[]};
      if (!s.hashtags.testing) s.hashtags.testing = [];
      s.hashtags.testing.push({tag, note:'', added: new Date().toISOString()});
    });
  };

  const updateTestingNote = (tag, note) => {
    update(s => {
      if (s.hashtags && s.hashtags.testing) {
        const t = s.hashtags.testing.find(x => x.tag === tag);
        if (t) t.note = note;
      }
    });
  };

  const removeTesting = (tag) => {
    update(s => {
      if (s.hashtags && s.hashtags.testing) {
        s.hashtags.testing = s.hashtags.testing.filter(t => t.tag !== tag);
      }
    });
  };

  const archiveTesting = (tag) => {
    update(s => {
      if (!s.hashtags) s.hashtags = {active:[], testing:[], archive:[]};
      if (!s.hashtags.archive) s.hashtags.archive = [];
      if (!s.hashtags.archive.includes(tag)) s.hashtags.archive.push(tag);
      if (s.hashtags.testing) {
        s.hashtags.testing = s.hashtags.testing.filter(t => t.tag !== tag);
      }
    });
  };

  const restoreFromArchive = (tag) => {
    update(s => {
      if (s.hashtags && s.hashtags.archive) {
        s.hashtags.archive = s.hashtags.archive.filter(t => t !== tag);
      }
      if (!s.hashtags.testing) s.hashtags.testing = [];
      s.hashtags.testing.push({tag, note:'', added: new Date().toISOString()});
    });
  };

  const removeFromArchive = (tag) => {
    update(s => {
      if (s.hashtags && s.hashtags.archive) {
        s.hashtags.archive = s.hashtags.archive.filter(t => t !== tag);
      }
    });
  };

  // Set lista: activos + testing juntos, listos para copiar
  const fullSetText = [...activeTags, ...testingTags.map(t => t.tag)].join(' ');
  const fullSetCount = activeTags.length + testingTags.length;

  // Días desde que se añadió un hashtag en testing
  const daysSince = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now - d) / (1000*60*60*24));
    if (diff === 0) return 'hoy';
    if (diff === 1) return 'ayer';
    if (diff < 7) return `hace ${diff}d`;
    if (diff < 30) return `hace ${Math.floor(diff/7)}sem`;
    return `hace ${Math.floor(diff/30)}m`;
  };

  const entries = Object.entries(D.hashtags);

  return (
    <div>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          recursos
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>hashtags <Hash size={22} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/></H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:8, maxWidth:600, lineHeight:1.6}}>
          sistema vivo: <strong style={{color:C.ink}}>los que funcionan</strong> + los que estás probando esta semana + la biblioteca de la que sacar
        </div>
      </div>

      {/* ═══ SET COMPLETO · los activos + testing ═══ */}
      {fullSetCount > 0 && (
        <Card style={{
          marginBottom:16, 
          background:`linear-gradient(135deg, ${C.accentSoft} 0%, ${C.bgSoft} 100%)`,
          border:'none'
        }}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, flexWrap:'wrap', gap:10}}>
            <div>
              <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
                ✦ tu set completo · activos + testing
              </div>
              <H size="sm" style={{fontStyle:'italic'}}>
                {fullSetCount} hashtags listos
              </H>
              <div style={{fontSize:11, color:C.inkSoft, fontStyle:'italic', marginTop:2}}>
                {activeTags.length} activos + {testingTags.length} en prueba
              </div>
            </div>
            <Btn small variant="accent" onClick={() => copyTags('full', fullSetText)}>
              <CopyIcon size={11}/> {copiedKey === 'full' ? 'copiado ♡' : 'copiar todos'}
            </Btn>
          </div>
          <div style={{
            background:`${C.card}90`, padding:12, borderRadius:10,
            fontSize:12, color:C.ink, lineHeight:1.6, whiteSpace:'pre-wrap'
          }}>
            {fullSetText || 'añade hashtags abajo ↓'}
          </div>
        </Card>
      )}

      {/* ═══ ACTIVOS · los que sabes que funcionan ═══ */}
      <Card style={{marginBottom:16, borderLeft:`3px solid ${C.published}`}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, flexWrap:'wrap', gap:8}}>
          <div>
            <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
              ♡ activos · tus top performers
            </div>
            <H size="sm" style={{fontStyle:'italic'}}>
              {activeTags.length} hashtags fijos
            </H>
          </div>
          {activeTags.length > 0 && (
            <Btn small variant="ghost" onClick={() => copyTags('active', activeTags.join(' '))}>
              <CopyIcon size={11}/> {copiedKey === 'active' ? 'copiados ♡' : 'copiar solo activos'}
            </Btn>
          )}
        </div>

        <div style={{display:'flex', gap:6, marginBottom:10, flexWrap:'wrap'}}>
          {activeTags.length === 0 && (
            <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic', padding:'8px 0'}}>
              aún no tienes activos · añade los que mejor te funcionan desde la biblioteca de abajo
            </div>
          )}
          {activeTags.map(tag => (
            <span key={tag} style={{
              fontSize:12, padding:'5px 10px', paddingRight:6,
              background:C.published, color:'#fff',
              borderRadius:100, fontWeight:500,
              display:'inline-flex', alignItems:'center', gap:6
            }}>
              {tag}
              <button onClick={() => removeActive(tag)} style={{
                background:'transparent', border:'none', cursor:'pointer',
                color:'#fff', fontSize:14, padding:'0 4px',
                opacity:0.7, lineHeight:1
              }} title="quitar de activos">×</button>
            </span>
          ))}
        </div>

        <div style={{display:'flex', gap:6}}>
          <input
            type="text"
            value={newActive}
            onChange={(e) => setNewActive(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { addActive(newActive); setNewActive(''); } }}
            placeholder="añadir hashtag activo (sin #)"
            style={{
              flex:1, padding:'8px 12px', border:`1px solid ${C.border}`,
              borderRadius:8, fontFamily:'inherit', fontSize:12,
              background:C.card, color:C.ink, boxSizing:'border-box'
            }}
          />
          <Btn small variant="ghost" onClick={() => { addActive(newActive); setNewActive(''); }} disabled={!newActive.trim()}>
            + añadir
          </Btn>
        </div>
      </Card>

      {/* ═══ EN PRUEBA · testing esta semana ═══ */}
      <Card style={{marginBottom:16, borderLeft:`3px solid ${C.creating}`}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, flexWrap:'wrap', gap:8}}>
          <div>
            <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
              ◐ en prueba · esta semana
            </div>
            <H size="sm" style={{fontStyle:'italic'}}>
              {testingTags.length} testeando
            </H>
          </div>
        </div>

        <div style={{fontSize:11, color:C.inkSoft, fontStyle:'italic', marginBottom:10, lineHeight:1.5}}>
          prueba 3-5 hashtags nuevos cada semana · apunta si funcionan · si van bien → promuévelos a activos, si no → al histórico
        </div>

        {testingTags.length === 0 && (
          <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic', padding:'8px 0 12px 0'}}>
            ningún hashtag en prueba aún ✧
          </div>
        )}

        {testingTags.map(t => (
          <div key={t.tag} style={{
            display:'flex', alignItems:'center', gap:8, padding:'10px 12px',
            background:C.bgSoft, borderRadius:10, marginBottom:6, flexWrap:'wrap'
          }}>
            <span style={{
              fontSize:12, padding:'4px 10px',
              background:C.creating, color:'#fff',
              borderRadius:100, fontWeight:500, flexShrink:0
            }}>{t.tag}</span>
            <span style={{fontSize:10, color:C.inkSoft, fontStyle:'italic', flexShrink:0}}>
              {daysSince(t.added)}
            </span>
            <input
              type="text"
              value={t.note || ''}
              onChange={(e) => updateTestingNote(t.tag, e.target.value)}
              placeholder="cómo va (ej. +50 alcance, 0 likes...)"
              style={{
                flex:1, minWidth:120, padding:'5px 10px', border:`1px solid ${C.borderSoft}`,
                borderRadius:6, fontFamily:'inherit', fontSize:11,
                background:C.card, color:C.ink
              }}
            />
            <button onClick={() => promoteToActive(t.tag)} title="funciona → promover a activos"
              style={{background:C.published, color:'#fff', border:'none', borderRadius:6,
              padding:'4px 10px', fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500}}>
              ♡ funciona
            </button>
            <button onClick={() => archiveTesting(t.tag)} title="no funciona → al histórico"
              style={{background:C.pending, color:C.ink, border:'none', borderRadius:6,
              padding:'4px 10px', fontSize:11, cursor:'pointer', fontFamily:'inherit'}}>
              no
            </button>
            <button onClick={() => removeTesting(t.tag)} title="descartar del todo"
              style={{background:'transparent', color:C.inkSoft, border:'none',
              padding:'4px 6px', fontSize:14, cursor:'pointer'}}>×</button>
          </div>
        ))}

        <div style={{display:'flex', gap:6, marginTop:10}}>
          <input
            type="text"
            value={newTesting}
            onChange={(e) => setNewTesting(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { addTesting(newTesting); setNewTesting(''); } }}
            placeholder="hashtag nuevo a probar (sin #)"
            style={{
              flex:1, padding:'8px 12px', border:`1px solid ${C.border}`,
              borderRadius:8, fontFamily:'inherit', fontSize:12,
              background:C.card, color:C.ink, boxSizing:'border-box'
            }}
          />
          <Btn small variant="ghost" onClick={() => { addTesting(newTesting); setNewTesting(''); }} disabled={!newTesting.trim()}>
            + probar
          </Btn>
        </div>
      </Card>

      {/* ═══ HISTÓRICO · descartados ═══ */}
      {archiveTags.length > 0 && (
        <Card style={{marginBottom:16, borderLeft:`3px solid ${C.pending}`}}>
          <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:8}}>
            ✕ histórico · no funcionaron
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {archiveTags.map(tag => (
              <span key={tag} style={{
                fontSize:11, padding:'4px 10px', paddingRight:4,
                background:C.bgSoft, color:C.inkSoft,
                borderRadius:100, fontWeight:500, textDecoration:'line-through',
                display:'inline-flex', alignItems:'center', gap:4
              }}>
                {tag}
                <button onClick={() => restoreFromArchive(tag)} title="volver a probar"
                  style={{background:'transparent', border:'none', cursor:'pointer',
                  color:C.inkSoft, fontSize:12, padding:'0 2px', opacity:0.7}}>↺</button>
                <button onClick={() => removeFromArchive(tag)} title="eliminar del todo"
                  style={{background:'transparent', border:'none', cursor:'pointer',
                  color:C.inkSoft, fontSize:12, padding:'0 4px', opacity:0.5}}>×</button>
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* ═══ BIBLIOTECA · 12 categorías ═══ */}
      <div style={{marginTop:24, marginBottom:10}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', fontWeight:600}}>
          biblioteca
        </div>
        <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic', marginTop:4}}>
          banco de hashtags por categoría · clic en un hashtag para añadir a tu set de prueba
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {entries.map(([cat, tags]) => {
          const tagList = tags.split(' ').filter(t => t.startsWith('#'));
          const count = tagList.length;
          const isCore = cat.toLowerCase().includes('core');
          return (
            <Card key={cat} style={{padding:16, borderLeft:`3px solid ${isCore ? C.accent : C.borderSoft}`}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, flexWrap:'wrap', gap:10}}>
                <div>
                  <div style={{
                    fontSize:14, fontFamily:"'Fraunces', serif", fontWeight:500, 
                    color:C.ink, fontStyle:'italic', textTransform:'capitalize'
                  }}>
                    {cat}
                  </div>
                  <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginTop:3}}>
                    {count} hashtags
                  </div>
                </div>
                <Btn small variant="ghost" onClick={() => copyTags(cat, tags)}>
                  <CopyIcon size={11}/> {copiedKey === cat ? 'copiados ♡' : 'copiar todos'}
                </Btn>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
                {tagList.map((t, i) => {
                  const isActive = activeTags.includes(t);
                  const isTesting = !!testingTags.find(x => x.tag === t);
                  const isArchive = archiveTags.includes(t);
                  return (
                    <button key={i} onClick={() => {
                      if (isActive || isTesting || isArchive) return;
                      addTesting(t);
                    }} style={{
                      fontSize:11, padding:'4px 9px',
                      background: isActive ? C.published : isTesting ? C.creating : isArchive ? C.bgSoft : C.bgSoft,
                      color: isActive || isTesting ? '#fff' : isArchive ? C.inkSoft : C.ink,
                      borderRadius:100, fontWeight:500,
                      border:'none', cursor: (isActive || isTesting || isArchive) ? 'default' : 'pointer',
                      fontFamily:'inherit',
                      opacity: isArchive ? 0.5 : 1
                    }}
                    title={isActive ? 'ya está en activos' : isTesting ? 'ya está en prueba' : isArchive ? 'está en histórico' : 'clic para añadir a prueba'}>
                      {t}{isActive ? ' ♡' : isTesting ? ' ◐' : ''}
                    </button>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Explicación */}
      <Card style={{marginTop:24, background:C.bgSoft, border:'none'}}>
        <H size="sm" style={{marginBottom:10}}>cómo usar este sistema</H>
        <div style={{fontSize:13, color:C.ink, lineHeight:1.7}}>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600, color:C.published}}>♡ activos</strong> · los que usas en todos tus posts · los que ya sabes que funcionan</div>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600, color:'#D49770'}}>◐ en prueba</strong> · 3-5 nuevos cada semana · apunta cómo van y decide a fin de semana: promover ♡ o archivar</div>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600, color:C.inkSoft}}>✕ histórico</strong> · los que no funcionaron · puedes restaurar en cualquier momento ↺</div>
          <div><strong style={{fontWeight:600}}>biblioteca</strong> · banco completo por categoría · clic en cualquiera para añadirlo a prueba</div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INCOME VIEW — proyección de ingresos editable + gráfico
// ═══════════════════════════════════════════════════════════════════
function IncomeView() {
  const [state, update] = useAppState();
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  const realData = state.income || {};

  const startEdit = (key, current) => {
    setEditingCell(key);
    setEditValue(current || '');
  };

  const commitEdit = () => {
    if (editingCell) {
      const val = Number(editValue) || 0;
      update(s => { s.income[editingCell] = val; });
    }
    setEditingCell(null);
    setEditValue('');
  };

  // Build chart data
  const chartData = D.revenue.filter(r => r.month !== 'abril').map(r => {
    const ebook_real = realData[`${r.month}_ebook`] || 0;
    const asesoria_real = realData[`${r.month}_asesoria`] || 0;
    const acomp_real = realData[`${r.month}_acomp`] || 0;
    const total_real = ebook_real + asesoria_real + acomp_real;
    return {
      mes: r.month.slice(0,3),
      objetivo: r.total_obj,
      real: total_real,
      ebook: ebook_real,
      asesoria: asesoria_real,
      acompanamiento: acomp_real
    };
  });

  const totalObj = D.revenue.reduce((s,r) => s + r.total_obj, 0);
  const totalReal = chartData.reduce((s,r) => s + r.real, 0);
  const dif = totalReal - totalObj;

  return (
    <div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          análisis
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>proyección de ingresos <TrendingUp size={22} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/></H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:8, maxWidth:600, lineHeight:1.6}}>
          estimación conservadora · haz click en las celdas "real" para editar y comparar
        </div>
      </div>

      {/* Total cards */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, marginBottom:24}}>
        <Card>
          <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:6}}>
            objetivo total 2026
          </div>
          <div style={{fontSize:28, fontFamily:"'Fraunces', serif", color:C.ink}}>
            {totalObj.toLocaleString('es-ES')} €
          </div>
          <div style={{fontSize:11, color:C.inkSoft, marginTop:4}}>mayo — diciembre</div>
        </Card>
        <Card style={{background: C.igBg, border:'none'}}>
          <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:6}}>
            real acumulado
          </div>
          <div style={{fontSize:28, fontFamily:"'Fraunces', serif", color:C.ink}}>
            {totalReal.toLocaleString('es-ES')} €
          </div>
          <div style={{fontSize:11, color:C.inkSoft, marginTop:4}}>
            {totalObj > 0 ? Math.round(totalReal/totalObj*100) : 0}% del objetivo
          </div>
        </Card>
        <Card style={{background: dif >= 0 ? C.published+'30' : C.pending+'30', border:'none'}}>
          <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:6}}>
            diferencia
          </div>
          <div style={{fontSize:28, fontFamily:"'Fraunces', serif", color:C.ink}}>
            {dif >= 0 ? '+' : ''}{dif.toLocaleString('es-ES')} €
          </div>
          <div style={{fontSize:11, color:C.inkSoft, marginTop:4}}>
            {dif >= 0 ? 'por encima ♡' : 'por debajo'}
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card style={{marginBottom:20}}>
        <H size="sm" style={{marginBottom:14}}>objetivo vs real · mensual</H>
        <div style={{height:300}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderSoft}/>
              <XAxis dataKey="mes" stroke={C.inkSoft} fontSize={11}/>
              <YAxis stroke={C.inkSoft} fontSize={11} tickFormatter={(v) => v + '€'}/>
              <Tooltip 
                formatter={(v) => v.toLocaleString('es-ES') + ' €'}
                contentStyle={{background: C.card, border:`1px solid ${C.border}`, borderRadius:10, fontSize:12}}
              />
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="objetivo" fill={C.accent} radius={[8,8,0,0]} name="objetivo"/>
              <Bar dataKey="real" fill={C.igDark} radius={[8,8,0,0]} name="real"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Product breakdown chart */}
      <Card style={{marginBottom:20}}>
        <H size="sm" style={{marginBottom:14}}>ingresos reales por producto</H>
        <div style={{height:280}}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderSoft}/>
              <XAxis dataKey="mes" stroke={C.inkSoft} fontSize={11}/>
              <YAxis stroke={C.inkSoft} fontSize={11} tickFormatter={(v) => v + '€'}/>
              <Tooltip 
                formatter={(v) => v.toLocaleString('es-ES') + ' €'}
                contentStyle={{background: C.card, border:`1px solid ${C.border}`, borderRadius:10, fontSize:12}}
              />
              <Legend wrapperStyle={{fontSize:11}}/>
              <Area type="monotone" dataKey="ebook" stackId="1" stroke={C.igDark} fill={C.ig} name="ebook"/>
              <Area type="monotone" dataKey="asesoria" stackId="1" stroke={C.liDark} fill={C.li} name="asesoría"/>
              <Area type="monotone" dataKey="acompanamiento" stackId="1" stroke={C.ttDark} fill={C.tt} name="acompañamiento"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Table */}
      <Card style={{padding:0, overflow:'hidden'}}>
        <div style={{padding:'16px 20px', borderBottom:`1px solid ${C.borderSoft}`}}>
          <H size="sm">desglose mensual</H>
        </div>
        <div style={{overflowX:'auto'}}>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, minWidth: 720}}>
          <thead>
            <tr style={{background:C.bgSoft}}>
              <th style={th}>mes</th>
              <th style={th}>ebook obj</th>
              <th style={th}>ebook real</th>
              <th style={th}>asesoría obj</th>
              <th style={th}>asesoría real</th>
              <th style={th}>acomp obj</th>
              <th style={th}>acomp real</th>
              <th style={th}>total obj</th>
              <th style={th}>total real</th>
              <th style={th}>dif</th>
            </tr>
          </thead>
          <tbody>
            {D.revenue.filter(r => r.month !== 'abril').map((r, i) => {
              const keyEb = `${r.month}_ebook`;
              const keyAs = `${r.month}_asesoria`;
              const keyAc = `${r.month}_acomp`;
              const realEb = realData[keyEb] || 0;
              const realAs = realData[keyAs] || 0;
              const realAc = realData[keyAc] || 0;
              const totalReal = realEb + realAs + realAc;
              const dif = totalReal - r.total_obj;
              
              const editCell = (key, current) => (
                <td style={tdEdit} onClick={() => startEdit(key, current || '')}>
                  {editingCell === key ? (
                    <input 
                      type="number" autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={commitEdit}
                      onKeyDown={(e) => {if (e.key === 'Enter') commitEdit();}}
                      style={{width:60, padding:2, border:`1px solid ${C.accent}`, borderRadius:4, fontSize:12, fontFamily:'inherit'}}
                    />
                  ) : (
                    <span style={{color: current ? C.ink : C.inkSoft, fontStyle: current ? 'normal' : 'italic'}}>
                      {current ? current + '€' : '—'}
                    </span>
                  )}
                </td>
              );
              
              return (
                <tr key={r.month} style={{borderTop:`1px solid ${C.borderSoft}`}}>
                  <td style={{...td, fontWeight:500, textTransform:'capitalize'}}>{r.month}</td>
                  <td style={td}>{r.ebook_obj > 0 ? r.ebook_obj + '€' : '—'}</td>
                  {editCell(keyEb, realEb)}
                  <td style={td}>{r.asesoria_obj > 0 ? r.asesoria_obj + '€' : '—'}</td>
                  {editCell(keyAs, realAs)}
                  <td style={td}>{r.acomp_obj > 0 ? r.acomp_obj + '€' : '—'}</td>
                  {editCell(keyAc, realAc)}
                  <td style={{...td, fontWeight:500}}>{r.total_obj}€</td>
                  <td style={{...td, fontWeight:500, color: totalReal > 0 ? C.ink : C.inkSoft}}>
                    {totalReal > 0 ? totalReal + '€' : '—'}
                  </td>
                  <td style={{...td, color: dif >= 0 ? C.igDark : C.ssDark, fontWeight:500}}>
                    {totalReal > 0 ? (dif >= 0 ? '+' : '') + dif + '€' : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </Card>
    </div>
  );
}

const th = {padding:'10px 8px', textAlign:'left', fontSize:10, fontWeight:600, color:C.inkSoft, textTransform:'uppercase', letterSpacing:0.5};
const td = {padding:'10px 8px', fontSize:12, color:C.ink};
const tdEdit = {...td, cursor:'pointer', background:C.bgSoft};

// ═══════════════════════════════════════════════════════════════════
// METRICS VIEW — seguimiento de métricas clave
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// MÉTRICAS REALES — input semanal domingo noche + insights automáticos
// ═══════════════════════════════════════════════════════════════════

// 9 métricas que Irene quiere trackear
const WEEKLY_METRICS = [
  {key:'ig_followers',    label:'Seguidores IG',            unit:'',  color:'#D07090', bg:'#FDE4EC', cumulative:true,  targetKey:'seguidores ig',     targetType:'total'},
  {key:'ig_reach',        label:'Alcance IG semana',        unit:'',  color:'#D07090', bg:'#FDE4EC', cumulative:false},
  {key:'ig_interactions', label:'Interacciones IG semana',  unit:'',  color:'#D07090', bg:'#FDE4EC', cumulative:false},
  {key:'ig_visits',       label:'Visitas perfil IG',        unit:'',  color:'#D07090', bg:'#FDE4EC', cumulative:false},
  {key:'li_followers',    label:'Seguidores LinkedIn',      unit:'',  color:'#7BA2C2', bg:'#EBF2F8', cumulative:true},
  {key:'ss_subscribers',  label:'Suscriptores Substack',    unit:'',  color:'#D49770', bg:'#FDE9D8', cumulative:true},
  {key:'emails_new',      label:'Emails nuevos lista',      unit:'',  color:'#9B83C4', bg:'#F4ECFA', cumulative:false, targetKey:'lista email',       targetType:'total'},
  {key:'sales_ebook',     label:'Ventas ebook',             unit:'',  color:'#5C8A5C', bg:'#E0EFDC', cumulative:false, targetKey:'ventas ebook',      targetType:'monthly'},
  {key:'revenue',         label:'Ingresos semana',          unit:'€', color:'#5C8A5C', bg:'#E0EFDC', cumulative:false, targetKey:'ingresos mes (€)',  targetType:'monthly'},
];

const monthMap = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

// Helper: obtener el objetivo de una métrica para el mes actual
function getTargetForMonth(metric, monthIdx) {
  if (!metric.targetKey) return null;
  const overviewMetric = D.overview?.metrics?.find(m => m.name === metric.targetKey);
  if (!overviewMetric) return null;
  const monthName = monthMap[monthIdx];
  return overviewMetric.targets[monthName] || null;
}

// Helper: obtener la fecha del domingo de la semana en la que cae una fecha dada
function getSundayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=dom, 1=lun...
  // Si es domingo, devuelve ese mismo día. Si no, devuelve el próximo domingo
  const diff = day === 0 ? 0 : 7 - day;
  const sunday = new Date(d);
  sunday.setDate(d.getDate() + diff);
  sunday.setHours(0,0,0,0);
  return sunday;
}

// Helper: formato "dd-dd mes" mostrando lunes a domingo de la semana
function formatWeekLabel(sunday) {
  const mesesShort = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const monday = new Date(sunday);
  monday.setDate(sunday.getDate() - 6); // lunes = domingo - 6
  const sameMonth = monday.getMonth() === sunday.getMonth();
  if (sameMonth) {
    return `${monday.getDate()}–${sunday.getDate()} ${mesesShort[sunday.getMonth()]}`;
  } else {
    return `${monday.getDate()} ${mesesShort[monday.getMonth()]}–${sunday.getDate()} ${mesesShort[sunday.getMonth()]}`;
  }
}

// Helper: clave única por semana (YYYY-MM-DD del domingo)
function weekKey(sunday) {
  const pad = (n) => n.toString().padStart(2,'0');
  return `${sunday.getFullYear()}-${pad(sunday.getMonth()+1)}-${pad(sunday.getDate())}`;
}

// ═══════════════════════════════════════════════════════════════════
// DATOS PRE-CARGADOS · semanas de abril 2026 (de capturas reales)
// ═══════════════════════════════════════════════════════════════════
// Las claves son DOMINGO de cada semana (formato YYYY-MM-DD).
// Si Irene edita una semana, su valor pisa estos defaults automáticamente.
const WEEKLY_DEFAULTS = {
  // Semana 13-19 abril (lanzamiento empieza domingo 19)
  '2026-04-19': {
    ig_followers: 540,    // estimado pre-lanzamiento
    ig_reach: 950,
    ig_interactions: 130,
    ig_visits: 580,
    li_followers: 1,
    ss_subscribers: 1,
    emails_new: 1,
    sales_ebook: 0,
    revenue: 0
  },
  // Semana 20-26 abril (semana del lanzamiento del ebook)
  '2026-04-26': {
    ig_followers: 601,    // total al 24 abril (capturas)
    ig_reach: 573,        // semana 18-24 abril
    ig_interactions: 126,
    ig_visits: 671,
    li_followers: 2,      // total acumulado LI
    ss_subscribers: 8,    // 8 suscriptores reales Substack (3 mayo)
    emails_new: 3,        // delta semana
    sales_ebook: 0,       // 0 ventas Stripe
    revenue: 0
  },
  // Semana 27 abr - 3 mayo (datos reales capturas 3 mayo)
  '2026-05-03': {
    ig_followers: 597,    // total real · capturas 3 mayo
    ig_reach: 300,        // alcance semanal real (imagen 2)
    ig_interactions: 131, // interacciones publicaciones semana (imagen 2)
    ig_visits: 74,        // visitas al perfil (imagen 2)
    ig_story_views: 222,  // visualizaciones stories (imagen 7)
    ig_link_clicks: 0,    // 0 clics en enlace — problema principal
    li_followers: 2,
    ss_subscribers: 8,
    emails_new: 0,
    sales_ebook: 0,
    revenue: 0
  }
};

function MetricsView() {

  const [state, update] = useAppState();
  const [editingWeek, setEditingWeek] = useState(null);
  const [editBuffer, setEditBuffer] = useState({});
  const [expandedMetric, setExpandedMetric] = useState(null);

  // state.metrics ahora es: { weekly: {'2026-04-26': {ig_followers: 550, ig_reach: 1200, ...}, ...} }
  const userWeekly = (state.metrics && state.metrics.weekly) || {};
  // Combinar defaults pre-cargados con datos del usuario (los del usuario pisan)
  const weekly = (() => {
    const combined = {};
    // Primero los defaults
    Object.entries(WEEKLY_DEFAULTS).forEach(([k, v]) => {
      combined[k] = {...v};
    });
    // Luego los datos del usuario sobrescriben (parcialmente)
    Object.entries(userWeekly).forEach(([k, v]) => {
      combined[k] = {...(combined[k] || {}), ...v};
    });
    return combined;
  })();

  const now = new Date();
  const thisWeekSunday = getSundayOfWeek(now);
  const thisWeekKey = weekKey(thisWeekSunday);

  // Generar lista de semanas: 2 atrás + actual + 4 futuras para tener contexto
  const weeks = [];
  for (let i = -4; i <= 6; i++) {
    const sun = new Date(thisWeekSunday);
    sun.setDate(sun.getDate() + i * 7);
    weeks.push({
      date: sun,
      key: weekKey(sun),
      label: formatWeekLabel(sun),
      isCurrent: i === 0,
      isPast: i < 0,
      isFuture: i > 0,
    });
  }

  const startEdit = (wk) => {
    setEditingWeek(wk.key);
    setEditBuffer(weekly[wk.key] || {});
  };

  const cancelEdit = () => {
    setEditingWeek(null);
    setEditBuffer({});
  };

  const saveEdit = () => {
    if (!editingWeek) return;
    update(s => {
      if (!s.metrics) s.metrics = {};
      if (!s.metrics.weekly) s.metrics.weekly = {};
      const clean = {};
      WEEKLY_METRICS.forEach(m => {
        const val = editBuffer[m.key];
        if (val !== undefined && val !== '' && !isNaN(Number(val))) {
          clean[m.key] = Number(val);
        }
      });
      if (Object.keys(clean).length > 0) {
        s.metrics.weekly[editingWeek] = clean;
      } else {
        delete s.metrics.weekly[editingWeek];
      }
    });
    setEditingWeek(null);
    setEditBuffer({});
  };

  const updateBuffer = (key, val) => {
    setEditBuffer(prev => ({...prev, [key]: val}));
  };

  // Datos agregados para cada métrica (con los datos reales existentes)
  const getMetricHistory = (metricKey) => {
    // Ordenar semanas con datos
    const sortedKeys = Object.keys(weekly).sort();
    return sortedKeys
      .map(k => ({key: k, val: weekly[k][metricKey]}))
      .filter(d => d.val !== undefined && d.val !== null);
  };

  // Cálculo de "current" para cada métrica
  const getCurrentValue = (metric) => {
    const history = getMetricHistory(metric.key);
    if (history.length === 0) return null;
    if (metric.cumulative) {
      // Último valor registrado (es el total actual)
      return history[history.length - 1].val;
    } else {
      // Suma del último mes (4 últimas semanas)
      const last4 = history.slice(-4);
      return last4.reduce((sum, d) => sum + (d.val || 0), 0);
    }
  };

  // Cálculo de cambio (vs semana anterior o vs total anterior)
  const getDelta = (metric) => {
    const history = getMetricHistory(metric.key);
    if (history.length < 2) return null;
    const last = history[history.length - 1].val;
    const prev = history[history.length - 2].val;
    if (prev === 0) return null;
    return {
      abs: last - prev,
      pct: ((last - prev) / prev) * 100
    };
  };

  // Insights automáticos
  const getInsights = () => {
    const insights = [];
    const weeksWithData = Object.keys(weekly).length;
    
    if (weeksWithData === 0) {
      insights.push({
        type:'info', icon:'✦',
        text:'Empieza apuntando tus números del domingo ' + formatWeekLabel(thisWeekSunday) + ' (fin de semana del launch ✨).'
      });
      return insights;
    }

    // Seguidores IG: racha de crecimiento
    const igFollowers = getMetricHistory('ig_followers');
    if (igFollowers.length >= 3) {
      let streak = 0;
      for (let i = igFollowers.length - 1; i > 0; i--) {
        if (igFollowers[i].val > igFollowers[i-1].val) streak++;
        else break;
      }
      if (streak >= 3) {
        insights.push({type:'good', icon:'♡', text:`Llevas ${streak} semanas seguidas creciendo en IG. Lo que estás haciendo funciona.`});
      }
    }

    // Alcance: mejor semana
    const reach = getMetricHistory('ig_reach');
    if (reach.length >= 2) {
      const best = reach.reduce((max, d) => d.val > max.val ? d : max, reach[0]);
      const sunday = new Date(best.key);
      insights.push({type:'info', icon:'✧', text:`Tu semana con más alcance: ${formatWeekLabel(sunday)} (${best.val.toLocaleString('es-ES')} personas).`});
    }

    // Ventas ebook
    const sales = getMetricHistory('sales_ebook');
    const totalSales = sales.reduce((sum, d) => sum + d.val, 0);
    if (totalSales > 0) {
      insights.push({type:'good', icon:'♡', text:`Total de ebooks vendidos: ${totalSales}. Cada uno es una lectora potencial de tus otros productos.`});
    }

    // Emails
    const emails = getMetricHistory('emails_new');
    if (emails.length > 0) {
      const totalEmails = emails.reduce((sum, d) => sum + d.val, 0);
      if (totalEmails >= 50) {
        insights.push({type:'milestone', icon:'✨', text:`${totalEmails} emails nuevos · ya puedes plantearte MailerLite para automatizar funnels.`});
      } else if (totalEmails > 0) {
        insights.push({type:'info', icon:'✦', text:`${totalEmails} emails nuevos · cuando llegues a 50 activamos MailerLite.`});
      }
    }

    // Ingresos acumulados
    const revenue = getMetricHistory('revenue');
    const totalRevenue = revenue.reduce((sum, d) => sum + d.val, 0);
    if (totalRevenue > 0) {
      insights.push({type:'good', icon:'♡', text:`Ingresos totales del año hasta ahora: ${totalRevenue.toLocaleString('es-ES')}€.`});
    }

    // Semana sin datos reciente
    const lastWeekSunday = new Date(thisWeekSunday);
    lastWeekSunday.setDate(lastWeekSunday.getDate() - 7);
    const lastWeekKey = weekKey(lastWeekSunday);
    if (!weekly[lastWeekKey] && now.getDay() >= 1) {
      // Si estamos en lunes o más tarde y no entramos los datos de la semana pasada
      insights.push({type:'warning', icon:'⏰', text:`Aún no has entrado los datos del domingo ${formatWeekLabel(lastWeekSunday)} ✧`});
    }

    return insights;
  };

  const insights = getInsights();
  const weeksWithData = Object.keys(weekly).length;

  return (
    <div>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          análisis
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>
          métricas reales <BarChart3 size={22} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/>
        </H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:8, maxWidth:640, lineHeight:1.6}}>
          entra tus 9 números cada domingo noche · el dashboard calcula tendencias e insights automáticos ♡
        </div>
      </div>

      {/* ═══ INSIGHTS AUTOMÁTICOS ═══ */}
      {insights.length > 0 && (
        <Card style={{
          marginBottom:20,
          background:`linear-gradient(135deg, ${C.accentSoft}60 0%, ${C.bgSoft} 100%)`,
          border:'none'
        }}>
          <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1.5, textTransform:'uppercase', fontWeight:600, marginBottom:10}}>
            ✦ insights de tu trayectoria
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {insights.map((ins, i) => {
              const colorMap = {
                good: C.published,
                milestone: C.accent,
                warning: '#D49770',
                info: C.inkSoft,
              };
              return (
                <div key={i} style={{
                  display:'flex', gap:10, alignItems:'flex-start',
                  padding:'10px 12px', background:`${C.card}90`, borderRadius:8,
                  borderLeft:`3px solid ${colorMap[ins.type] || C.inkSoft}`
                }}>
                  <span style={{fontSize:14, flexShrink:0}}>{ins.icon}</span>
                  <span style={{fontSize:13, color:C.ink, lineHeight:1.5}}>{ins.text}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ═══ CARDS GRANDES DE MÉTRICAS · CURRENT + DELTA ═══ */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:12, marginBottom:24}}>
        {WEEKLY_METRICS.map(metric => {
          const current = getCurrentValue(metric);
          const delta = getDelta(metric);
          const history = getMetricHistory(metric.key);
          const hasData = history.length > 0;
          const isExpanded = expandedMetric === metric.key;

          return (
            <Card key={metric.key} onClick={() => setExpandedMetric(isExpanded ? null : metric.key)} style={{
              padding:14, cursor:'pointer',
              borderLeft:`3px solid ${metric.color}`,
              background: isExpanded ? metric.bg : C.card
            }}>
              <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:6}}>
                {metric.label}
              </div>
              <div style={{display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap'}}>
                <div style={{fontSize:24, fontFamily:"'Fraunces', serif", color:C.ink, fontWeight:500}}>
                  {hasData ? current.toLocaleString('es-ES') + metric.unit : '—'}
                </div>
                {delta && (
                  <div style={{
                    fontSize:11, fontWeight:600,
                    color: delta.abs > 0 ? C.published : delta.abs < 0 ? '#B87A8A' : C.inkSoft
                  }}>
                    {delta.abs > 0 ? '↑' : delta.abs < 0 ? '↓' : '='} {delta.abs > 0 ? '+' : ''}{delta.abs.toLocaleString('es-ES')}
                    {delta.pct !== undefined && isFinite(delta.pct) && (
                      <span style={{opacity:0.7}}> ({delta.pct > 0 ? '+' : ''}{delta.pct.toFixed(1)}%)</span>
                    )}
                  </div>
                )}
              </div>
              <div style={{fontSize:10, color:C.inkSoft, marginTop:4, fontStyle:'italic'}}>
                {metric.cumulative ? 'total actual' : 'suma últimas 4 semanas'}
                {hasData && ` · ${history.length} ${history.length === 1 ? 'semana' : 'semanas'}`}
              </div>

              {/* Comparativa vs objetivo del mes (solo si la métrica tiene targetKey) */}
              {(() => {
                const target = getTargetForMonth(metric, now.getMonth());
                if (!target || !hasData) return null;
                
                let percent, label, isAhead;
                if (metric.targetType === 'monthly') {
                  // Para ventas/ingresos: compara la suma del mes vs el objetivo del mes
                  const monthHistory = history.filter(h => {
                    const d = new Date(h.key);
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                  });
                  const monthSum = monthHistory.reduce((sum, h) => sum + h.val, 0);
                  percent = (monthSum / target) * 100;
                  isAhead = monthSum >= target;
                  label = `mes: ${monthSum.toLocaleString('es-ES')}${metric.unit} / ${target.toLocaleString('es-ES')}${metric.unit}`;
                } else {
                  // Para acumulativos como seguidores: el current vs el target del mes
                  percent = (current / target) * 100;
                  isAhead = current >= target;
                  label = `objetivo ${monthMap[now.getMonth()]}: ${target.toLocaleString('es-ES')}${metric.unit}`;
                }
                
                const barColor = isAhead ? C.published : (percent >= 70 ? '#D49770' : '#B87A8A');
                return (
                  <div style={{marginTop:8, padding:'8px 0 0', borderTop:`1px solid ${C.borderSoft}`}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                      <span style={{fontSize:10, color:C.inkSoft}}>{label}</span>
                      <span style={{fontSize:10, fontWeight:600, color: barColor}}>
                        {percent.toFixed(0)}% {isAhead ? '✓' : ''}
                      </span>
                    </div>
                    <div style={{height:4, background:C.bgSoft, borderRadius:100, overflow:'hidden'}}>
                      <div style={{
                        height:'100%', width: `${Math.min(percent, 100)}%`,
                        background: barColor, transition:'width 0.3s'
                      }}/>
                    </div>
                  </div>
                );
              })()}

              {/* Mini sparkline */}
              {history.length >= 2 && (
                <div style={{marginTop:10, height:40}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history.map(h => ({val: h.val}))}>
                      <Line 
                        type="monotone" 
                        dataKey="val" 
                        stroke={metric.color} 
                        strokeWidth={2} 
                        dot={false} 
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Expanded: full chart */}
              {isExpanded && history.length >= 2 && (
                <div style={{marginTop:14, height:180}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history.map(h => {
                      const d = new Date(h.key);
                      return {label: formatWeekLabel(d), val: h.val};
                    })}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.borderSoft}/>
                      <XAxis dataKey="label" stroke={C.inkSoft} fontSize={10}/>
                      <YAxis stroke={C.inkSoft} fontSize={10}/>
                      <Tooltip 
                        formatter={(v) => v.toLocaleString('es-ES') + metric.unit}
                        contentStyle={{background: C.card, border:`1px solid ${C.border}`, borderRadius:10, fontSize:12}}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="val" 
                        stroke={metric.color} 
                        strokeWidth={2.5}
                        dot={{r:4, fill:metric.color}}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* ═══ TABLA DE ENTRADA SEMANAL ═══ */}
      <div style={{marginBottom:10}}>
        <H size="sm" style={{fontStyle:'italic'}}>input semanal · cada domingo noche</H>
        <div style={{fontSize:11, color:C.inkSoft, fontStyle:'italic', marginTop:4}}>
          clic sobre la semana actual para editar tus números ♡
        </div>
      </div>

      <Card style={{padding:0, overflow:'hidden'}}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, minWidth:800}}>
            <thead>
              <tr style={{background:C.bgSoft, borderBottom:`1px solid ${C.border}`}}>
                <th style={{...th, position:'sticky', left:0, background:C.bgSoft, zIndex:1}}>semana (dom)</th>
                {WEEKLY_METRICS.map(m => (
                  <th key={m.key} style={{...th, textAlign:'center', background:m.bg+'80', color:m.color, fontSize:10}} title={m.label}>
                    {m.label.replace('Interacciones IG semana','Interacc.').replace('Suscriptores Substack','Subs SS').replace('Seguidores ','Segui.').slice(0,14)}
                  </th>
                ))}
                <th style={{...th, textAlign:'center'}}>—</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map(wk => {
                const data = weekly[wk.key] || {};
                const isEditing = editingWeek === wk.key;
                const hasData = Object.keys(data).length > 0;
                const isFuture = wk.isFuture;

                return (
                  <tr key={wk.key} style={{
                    borderTop:`1px solid ${C.borderSoft}`,
                    background: isEditing ? C.accentSoft+'30' 
                              : wk.isCurrent ? C.bgSoft 
                              : isFuture ? C.card
                              : C.card,
                    opacity: isFuture ? 0.55 : 1
                  }}>
                    <td style={{
                      ...td, fontWeight: wk.isCurrent ? 600 : 500,
                      position:'sticky', left:0, 
                      background: isEditing ? '#FCE8EE' : wk.isCurrent ? C.bgSoft : C.card,
                      zIndex:1, minWidth:110
                    }}>
                      <div style={{color: wk.isCurrent ? C.accent : C.ink}}>
                        {wk.label}
                        {wk.isCurrent && <span style={{fontSize:9, marginLeft:6, textTransform:'uppercase', letterSpacing:1, background:C.accent, color:'#fff', padding:'1px 6px', borderRadius:100}}>hoy</span>}
                      </div>
                    </td>
                    {WEEKLY_METRICS.map(m => {
                      const cellVal = isEditing ? (editBuffer[m.key] ?? '') : data[m.key];
                      return (
                        <td key={m.key} style={{...td, textAlign:'center'}}>
                          {isEditing ? (
                            <input
                              type="number"
                              value={cellVal}
                              onChange={(e) => updateBuffer(m.key, e.target.value)}
                              placeholder="—"
                              style={{
                                width:60, padding:'3px 6px',
                                border:`1px solid ${m.color}60`, borderRadius:5,
                                fontSize:12, fontFamily:'inherit', textAlign:'center',
                                background:C.card, color:C.ink
                              }}
                            />
                          ) : (
                            <span style={{color: cellVal !== undefined ? C.ink : C.inkSoft, fontWeight: cellVal !== undefined ? 500 : 400}}>
                              {cellVal !== undefined ? cellVal.toLocaleString('es-ES') + m.unit : (isFuture ? '—' : '·')}
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td style={{...td, textAlign:'center', minWidth:90}}>
                      {isEditing ? (
                        <div style={{display:'flex', gap:4, justifyContent:'center'}}>
                          <button onClick={saveEdit} style={{
                            padding:'4px 8px', border:'none', background:C.accent,
                            color:'#fff', borderRadius:6, fontSize:10, cursor:'pointer', fontFamily:'inherit', fontWeight:600
                          }}>✓ guardar</button>
                          <button onClick={cancelEdit} style={{
                            padding:'4px 8px', border:'none', background:C.bgSoft,
                            color:C.inkSoft, borderRadius:6, fontSize:10, cursor:'pointer', fontFamily:'inherit'
                          }}>×</button>
                        </div>
                      ) : !isFuture ? (
                        <button onClick={() => startEdit(wk)} style={{
                          padding:'4px 10px', border:`1px solid ${C.border}`, background:'transparent',
                          color:C.inkSoft, borderRadius:100, fontSize:10, cursor:'pointer', fontFamily:'inherit'
                        }}>
                          {hasData ? 'editar' : '+ entrar'}
                        </button>
                      ) : (
                        <span style={{fontSize:10, color:C.inkSoft, fontStyle:'italic'}}>futuro</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ═══ GUÍA DE USO ═══ */}
      <Card style={{marginTop:24, background:C.bgSoft, border:'none'}}>
        <H size="sm" style={{marginBottom:10}}>cómo entrar tus datos cada domingo</H>
        <div style={{fontSize:13, color:C.ink, lineHeight:1.7}}>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ IG Insights</strong> (app de Instagram en móvil) · toca los 3 puntitos → "Insights" → 7 últimos días: saca seguidores, alcance, interacciones, visitas perfil</div>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ LinkedIn</strong> · entra en tu perfil → "Panel de perfil" → número actual de seguidores</div>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ Substack</strong> · dashboard de Substack → número actual de suscriptores</div>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ Ventas ebook + ingresos</strong> · Gumroad/Stripe/donde vendas → últimos 7 días</div>
          <div><strong style={{fontWeight:600}}>♡ Emails nuevos</strong> · si tienes lead magnet cuenta los emails capturados esa semana</div>
        </div>
        <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic', marginTop:12, paddingTop:12, borderTop:`1px solid ${C.borderSoft}`}}>
          te toma 5 minutos y a cambio tienes un mapa real de hacia dónde va tu negocio ✧
        </div>
      </Card>

      {/* Backup recordatorio · proteger métricas */}
      <div style={{marginTop:20}}>
        <BackupBox compact={true} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TASKS VIEW — 3 bloques: esta semana / por crear / lanzamientos
// ═══════════════════════════════════════════════════════════════════

// Plantilla de checklist por lanzamiento — days = días antes del launch
const LAUNCH_CHECKLISTS = {
  asesoria: [
    // Definición del servicio
    {days: 45, text: 'finalizar pitch de venta para los 2 perfiles (Principiante / Experta Estancada)', cat:'definición'},
    {days: 42, text: 'escribir script completo de la sesión de 2h30 · perfil Principiante', cat:'definición'},
    {days: 40, text: 'escribir script completo de la sesión de 2h30 · perfil Experta Estancada', cat:'definición'},
    {days: 38, text: 'crear plantilla CV optimizado (versión editable) para Principiante', cat:'entregables'},
    {days: 37, text: 'crear plantilla CV optimizado para Experta Estancada', cat:'entregables'},
    {days: 36, text: 'crear plantilla LinkedIn (encabezado, resumen, experiencia)', cat:'entregables'},
    {days: 35, text: 'crear plantilla propuesta de valor + pitch personal', cat:'entregables'},
    {days: 34, text: 'crear plantilla mini-plan de acción 2-4 semanas', cat:'entregables'},
    {days: 33, text: 'crear plantilla informe competencias transferibles (solo Experta)', cat:'entregables'},
    {days: 32, text: 'preparar ejercicios role-play entrevistas (Principiante + Experta)', cat:'entregables'},
    // Infraestructura
    {days: 30, text: 'configurar Zoom cloud o Loom para grabar sesiones', cat:'infra'},
    {days: 28, text: 'configurar sistema de reservas (Calendly / Cal.com) con horarios', cat:'infra'},
    {days: 26, text: 'configurar pasarela de pago (Stripe) para 90€', cat:'infra'},
    {days: 24, text: 'crear email de bienvenida post-compra con cuestionario previo', cat:'infra'},
    {days: 22, text: 'crear email de confirmación de cita + instrucciones técnicas', cat:'infra'},
    {days: 20, text: 'crear email post-sesión con entregables y siguientes pasos', cat:'infra'},
    // Página de venta
    {days: 18, text: 'escribir copy página de venta: ¿qué es? / ¿para quién? / ¿qué incluye?', cat:'venta'},
    {days: 16, text: 'diseñar página de venta en web (2 versiones: Principiante + Experta)', cat:'venta'},
    {days: 14, text: 'diseñar mockup / imagen promocional en Canva', cat:'venta'},
    {days: 12, text: 'escribir FAQ común y añadirla a página de venta', cat:'venta'},
    // Contenido
    {days: 14, text: 'grabar reel teaser "algunas necesitan más que un ebook"', cat:'contenido'},
    {days: 10, text: 'escribir newsletter Substack pre-launch (5 jul)', cat:'contenido'},
    {days: 7, text: 'grabar reel lanzamiento + diseñar carrusel "qué incluye"', cat:'contenido'},
    {days: 5, text: 'escribir post LinkedIn lanzamiento + copies Instagram', cat:'contenido'},
    {days: 3, text: 'preparar guion para stories de lanzamiento (launch day)', cat:'contenido'},
    // Testing final
    {days: 2, text: 'probar flujo completo: compra → reserva → email → acceso Zoom', cat:'test'},
    {days: 1, text: 'revisar plantillas entregables finales y preparar carpetas', cat:'test'},
    {days: 0, text: '♡ LANZAR: publicar reel 09:00 + stories + email a lista', cat:'launch'}
  ],

  acompanamiento: [
    // Definición del servicio
    {days: 60, text: 'finalizar pitch de venta para los 2 perfiles (Principiante / Experta)', cat:'definición'},
    {days: 57, text: 'escribir script sesión 1 (Diagnóstico) para Principiante', cat:'definición'},
    {days: 55, text: 'escribir script sesión 2 (Fortalezas y perfil) para Principiante', cat:'definición'},
    {days: 53, text: 'escribir script sesión 3 (Estrategia búsqueda) para Principiante', cat:'definición'},
    {days: 51, text: 'escribir script sesión 4 (Comunicación y visibilidad) para Principiante', cat:'definición'},
    {days: 49, text: 'escribir scripts sesiones 1-4 adaptados a Experta Estancada', cat:'definición'},
    {days: 47, text: 'crear worksheets y ejercicios entre sesiones (tareas semanales)', cat:'definición'},
    {days: 45, text: 'crear plantilla plan de acción personalizado (evoluciona cada sesión)', cat:'entregables'},
    {days: 43, text: 'crear plantilla CV + LinkedIn + carta presentación', cat:'entregables'},
    {days: 41, text: 'crear plantilla plan de continuidad final (3 meses post)', cat:'entregables'},
    {days: 39, text: 'preparar material simulación entrevistas (por perfil)', cat:'entregables'},
    // Infraestructura
    {days: 35, text: 'configurar Zoom cloud para 4 sesiones + canal de comunicación entre sesiones', cat:'infra'},
    {days: 32, text: 'definir cómo será el acompañamiento entre sesiones (email / WhatsApp / Notion)', cat:'infra'},
    {days: 30, text: 'crear página de venta con precio 625€ + términos y condiciones', cat:'infra'},
    {days: 28, text: 'preparar contrato / carta de compromiso para clientas', cat:'infra'},
    {days: 26, text: 'configurar pasarela de pago (Stripe: pago único o 2 plazos)', cat:'infra'},
    {days: 24, text: 'crear serie de emails (bienvenida, pre-sesión, post-sesión × 4)', cat:'infra'},
    {days: 22, text: 'crear form de postulación / selección (3-5 plazas)', cat:'infra'},
    // Contenido y ventas
    {days: 21, text: 'diseñar materiales de trabajo visuales (Canva: worksheets)', cat:'contenido'},
    {days: 18, text: 'grabar reel teaser "a veces una sesión no es suficiente"', cat:'contenido'},
    {days: 14, text: 'newsletter Substack educativa sobre acompañamientos largos', cat:'contenido'},
    {days: 10, text: 'abrir lista de espera + form de interés + email confirmación', cat:'contenido'},
    {days: 7, text: 'grabar reel "para quién es" + carrusel diferencias vs asesoría', cat:'contenido'},
    {days: 5, text: 'recopilar testimonios de clientas previas de asesorías', cat:'contenido'},
    {days: 3, text: 'copy LinkedIn + copies Instagram + stories de ventas', cat:'contenido'},
    {days: 2, text: 'llamadas de selección con posibles clientas (3-5 plazas)', cat:'launch'},
    {days: 1, text: 'email final a lista de espera con link exclusivo', cat:'launch'},
    {days: 0, text: '♡ LANZAR: publicar reel 09:00 + anunciar plazas abiertas', cat:'launch'}
  ],

  blackfriday: [
    {days: 28, text: 'decidir descuentos por producto: ebook / asesoría / acompañamiento', cat:'definición'},
    {days: 25, text: 'calcular fecha inicio y fin de la oferta (ej. 24-30 nov)', cat:'definición'},
    {days: 21, text: 'diseñar banner Black Friday + variantes para feed y stories', cat:'contenido'},
    {days: 18, text: 'configurar códigos descuento en pasarela de pago', cat:'infra'},
    {days: 14, text: 'preparar copy newsletter con código descuento', cat:'contenido'},
    {days: 10, text: 'grabar reel teaser "la oferta del año"', cat:'contenido'},
    {days: 7, text: 'programar emails: inicio oferta, mid-week, últimas horas', cat:'infra'},
    {days: 5, text: 'diseñar carrusel con todos los productos y precios rebajados', cat:'contenido'},
    {days: 3, text: 'escribir copies IG + LinkedIn para los 7 días de oferta', cat:'contenido'},
    {days: 1, text: 'teaser stories última hora antes del anuncio', cat:'contenido'},
    {days: 0, text: '♡ LANZAR BF: publicar carrusel + newsletter + stories todo el día', cat:'launch'}
  ]
};

const LAUNCHES_CONFIG = [
  {id:'asesoria', name:'Lanzamiento Asesoría 1:1', date:'2026-07-06', price:'90€', checklistKey:'asesoria'},
  {id:'acompanamiento', name:'Lanzamiento Acompañamiento', date:'2026-10-20', price:'625€', checklistKey:'acompanamiento'},
  {id:'blackfriday', name:'Black Friday ofertas', date:'2026-11-24', price:'varios', checklistKey:'blackfriday'}
];

function TasksView({setView, setMonth}) {
  const [state, update] = useAppState();
  const [newTask, setNewTask] = useState('');
  const [expandedLaunch, setExpandedLaunch] = useState(null);
  const [taskEditorOpen, setTaskEditorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleSaveTask = (saved) => {
    update(s => {
      if (!Array.isArray(s.tasks)) s.tasks = [];
      const idx = s.tasks.findIndex(x => x.id === saved.id);
      if (idx >= 0) s.tasks[idx] = saved;
      else s.tasks.push(saved);
    });
    setTaskEditorOpen(false);
    setEditingTask(null);
  };

  const now = new Date();

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    update(s => {
      if (!Array.isArray(s.tasks)) s.tasks = [];
      s.tasks.push({id: Date.now().toString(), text, done: false, created: now.toISOString()});
    });
    setNewTask('');
  };

  const toggleTask = (id) => {
    update(s => {
      const t = (s.tasks || []).find(x => x.id === id);
      if (t) t.done = !t.done;
    });
  };

  const deleteTask = (id) => {
    update(s => {
      // Si es una tarea default, la marcamos como descartada
      if (id.startsWith('def-')) {
        if (!Array.isArray(s.dismissedDefaults)) s.dismissedDefaults = [];
        if (!s.dismissedDefaults.includes(id)) s.dismissedDefaults.push(id);
      } else {
        s.tasks = (s.tasks || []).filter(x => x.id !== id);
      }
    });
  };

  const toggleTaskDef = (id) => {
    update(s => {
      // Si es default, la copiamos al state como completada
      if (id.startsWith('def-')) {
        const def = DEFAULT_TASKS.find(d => d.id === id);
        if (def) {
          if (!Array.isArray(s.tasks)) s.tasks = [];
          s.tasks.push({...def, done: true});
          // Y la marcamos como descartada para que no aparezca duplicada
          if (!Array.isArray(s.dismissedDefaults)) s.dismissedDefaults = [];
          s.dismissedDefaults.push(id);
        }
      } else {
        const t = (s.tasks || []).find(x => x.id === id);
        if (t) t.done = !t.done;
      }
    });
  };

  // Tareas pre-cargadas críticas (se combinan con state)
  const DEFAULT_TASKS = [
    {id:'def-revisar-ebook-page', text:'⭐ Revisar página de venta del ebook · domingo tranquilo', 
     notes:'CRITICAL: 28 personas hicieron clic, 0 compraron. El problema NO es el contenido, es la página.\n\nCheckpoints:\n· precio justificado (lo que vale vs lo que cuesta)\n· bullets concretos de qué hay dentro\n· párrafo personal sobre por qué lo escribiste\n· primera reseña/captura aunque sea pequeña\n· CTA claro arriba y abajo', 
     date: '2026-05-03', priority: 'high', done: false},
    {id:'def-programar-rd-week', text:'📤 Programar TODOS los posts del 25-31 mayo (semana RD)', 
     notes:'Antes del 24 mayo a las 18:00 todo programado en Meta Business Suite.', 
     date: '2026-05-24', priority: 'high', done: false},
    {id:'def-programar-bb', text:'📤 Programar post 22 mayo (concierto BB) antes del 21 noche', 
     notes:'Solo dejar el post programado. Stories desde el móvil ese día.', 
     date: '2026-05-21', priority: 'high', done: false},
    {id:'def-mailerlite-prep', text:'📧 Configurar MailerLite cuando llegues a 50+ emails', 
     notes:'Por ahora son 4 emails. Cuando llegues a 50, configurar bienvenida automática y secuencia.', 
     date: '2026-06-15', priority: 'medium', done: false},
  ];
  const tasks = Array.isArray(state.tasks) ? state.tasks : [];
  const userTaskIds = new Set(tasks.map(t => t.id));
  // Excluir defaults que el usuario haya borrado explícitamente
  const dismissedDefaults = new Set(state.dismissedDefaults || []);
  const combinedTasks = [
    ...DEFAULT_TASKS.filter(d => !userTaskIds.has(d.id) && !dismissedDefaults.has(d.id)),
    ...tasks
  ];
  // FILTRAR tareas con texto vacío (bug previo del state)
  const validTasks = combinedTasks.filter(t => t.text && t.text.trim().length > 0);
  const activeTasks = validTasks.filter(t => !t.done);
  const doneTasks = validTasks.filter(t => t.done);

  // CONTENIDO A CREAR: posts de los próximos 7 días
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const parseDate = (d) => {
    if (!d) return null;
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m-1, day);
  };

  const [contentRange, setContentRange] = useState(7); // 7, 15 o 30 días

  const rangeEnd = new Date(now);
  rangeEnd.setDate(rangeEnd.getDate() + contentRange);

  // TikTok = IG reels
  const tiktokPosts = D.posts.ig.filter(p => /eel/i.test(p.t || '')).map(p => ({...p, pf:'tiktok'}));
  const upcomingPosts = [];
  [
    ...D.posts.ig.map(p => ({...p, pf:'instagram'})),
    ...D.posts.li.map(p => ({...p, pf:'linkedin'})),
    ...D.posts.ss.map(p => ({...p, pf:'substack'})),
    ...tiktokPosts,
  ].forEach(p => {
    const dt = parseDate(p.d);
    if (dt && dt >= new Date(now.getFullYear(), now.getMonth(), now.getDate()) && dt <= rangeEnd) {
      upcomingPosts.push({...p, dt});
    }
  });
  upcomingPosts.sort((a,b) => a.dt - b.dt);

  // Check status of upcoming posts (pending = toca crear, creating = ya lo tienes en marcha)
  const getPostStatus = (p) => effectiveStatus(p, p.pf, state, now);
  const setPostStatus = (p, status) => {
    update(s => {
      const key = `${p.pf}:${p.i}`;
      if (!s.posts[key]) s.posts[key] = {};
      s.posts[key].status = status;
    });
  };

  const daysUntil = (date) => {
    const d = new Date(date);
    d.setHours(0,0,0,0);
    const t = new Date(now);
    t.setHours(0,0,0,0);
    const diff = Math.round((d - t) / (1000*60*60*24));
    if (diff === 0) return 'hoy';
    if (diff === 1) return 'mañana';
    if (diff < 7) return `en ${diff} días`;
    return `en ${diff} días`;
  };

  const mesesShort = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

  // LAUNCHES: only future ones with checklist
  const upcomingLaunches = LAUNCHES_CONFIG
    .map(l => ({...l, launchDate: parseDate(l.date)}))
    .filter(l => l.launchDate && l.launchDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())-0)
    .sort((a,b) => a.launchDate - b.launchDate);

  const getLaunchCheck = (launchId, taskIdx) => {
    return !!(state.launches && state.launches[launchId] && state.launches[launchId][taskIdx]);
  };

  const toggleLaunchCheck = (launchId, taskIdx) => {
    update(s => {
      if (!s.launches) s.launches = {};
      if (!s.launches[launchId]) s.launches[launchId] = {};
      s.launches[launchId][taskIdx] = !s.launches[launchId][taskIdx];
    });
  };

  const launchDeadline = (launchDate, daysBefore) => {
    const d = new Date(launchDate);
    d.setDate(d.getDate() - daysBefore);
    return d;
  };

  const formatDeadline = (d) => {
    const days = ['dom','lun','mar','mié','jue','vie','sáb'];
    return `${days[d.getDay()]} ${d.getDate()} ${mesesShort[d.getMonth()]}`;
  };

  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          principal
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>
          to do <Check size={22} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/>
        </H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:8, maxWidth:600, lineHeight:1.6}}>
          control semanal · tareas libres + contenido de la semana que viene + checklist de próximos lanzamientos
        </div>
      </div>

      {/* ═══ BLOQUE 1: TAREAS LIBRES ═══ */}
      <Card style={{marginBottom:20, background:`linear-gradient(135deg, ${C.accentSoft} 0%, ${C.bg} 100%)`, border:'none'}}>
        {taskEditorOpen && (
          <TaskEditor
            task={editingTask}
            onSave={handleSaveTask}
            onClose={() => { setTaskEditorOpen(false); setEditingTask(null); }}
          />
        )}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
          <div>
            <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
              tu lista
            </div>
            <H size="md" style={{fontStyle:'italic'}}>tareas sueltas ♡</H>
          </div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <Badge bg={C.accent} color="#fff" style={{fontSize:11}}>
              {activeTasks.length} pendientes
            </Badge>
          </div>
        </div>

        <div style={{display:'flex', gap:8, marginBottom:14}}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
            placeholder="añadir tarea… (enter para guardar)"
            style={{
              flex:1, padding:'10px 14px', border:`1px solid ${C.border}`,
              borderRadius:10, fontFamily:'inherit', fontSize:13,
              background:C.card, color:C.ink, boxSizing:'border-box'
            }}
          />
          <Btn variant="accent" small onClick={addTask} disabled={!newTask.trim()}>
            añadir
          </Btn>
        </div>

        {/* Botón limpieza · solo aparece si hay tareas vacías */}
        {(state.tasks || []).some(t => !t.text || t.text.trim().length === 0) && (
          <div style={{
            padding:'10px 12px', background:'#FFF5E5', borderRadius:8, marginBottom:10,
            display:'flex', alignItems:'center', justifyContent:'space-between', gap:10
          }}>
            <span style={{fontSize:11, color:'#B87733'}}>
              ⚠ tienes tareas vacías guardadas
            </span>
            <button onClick={() => {
              update(s => {
                s.tasks = (s.tasks || []).filter(t => t.text && t.text.trim().length > 0);
              });
            }} style={{
              padding:'5px 10px', background:'#B87733', color:'#fff',
              border:'none', borderRadius:100, fontSize:10, cursor:'pointer',
              fontFamily:'inherit', fontWeight:500
            }}>
              limpiar
            </button>
          </div>
        )}

        {activeTasks.length === 0 && doneTasks.length === 0 && (
          <div style={{padding:'20px 0', textAlign:'center', fontSize:12, color:C.inkSoft, fontStyle:'italic'}}>
            todo despejado ✧
          </div>
        )}

        {activeTasks.map(t => {
          const priorityColors = {high:'#D85A6F', medium:'#D49770', low:C.inkSoft};
          const priorityLabels = {high:'alta', medium:'media', low:'baja'};
          const taskDate = t.date ? new Date(t.date) : null;
          const today = new Date(); today.setHours(0,0,0,0);
          const isOverdue = taskDate && taskDate < today;
          const isToday = taskDate && taskDate.toDateString() === today.toDateString();
          const formatDate = (d) => {
            const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
            return `${d.getDate()} ${meses[d.getMonth()]}`;
          };
          return (
            <div key={t.id} style={{
              display:'flex', alignItems:'flex-start', gap:10, padding:'12px 14px',
              background:C.card, borderRadius:10, marginBottom:6, 
              border:`1px solid ${isOverdue ? '#E8B4B4' : C.borderSoft}`,
              borderLeft: t.priority ? `3px solid ${priorityColors[t.priority] || C.borderSoft}` : `1px solid ${C.borderSoft}`
            }}>
              <div onClick={() => toggleTaskDef(t.id)} style={{
                width:20, height:20, borderRadius:10, flexShrink:0,
                border: `2px solid ${C.border}`, background:'transparent',
                cursor:'pointer', marginTop:2
              }}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, color:C.ink, lineHeight:1.4, marginBottom:t.notes||t.date?4:0}}>
                  {t.text}
                </div>
                {(t.date || t.priority) && (
                  <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', marginTop:4}}>
                    {t.date && (
                      <span style={{
                        fontSize:10, color: isOverdue ? '#D85A6F' : isToday ? C.accent : C.inkSoft,
                        fontWeight: isOverdue || isToday ? 600 : 400
                      }}>
                        📅 {formatDate(taskDate)}{isOverdue ? ' · atrasada' : isToday ? ' · hoy' : ''}
                      </span>
                    )}
                    {t.priority && (
                      <span style={{
                        fontSize:9, color: priorityColors[t.priority], fontWeight:600,
                        textTransform:'uppercase', letterSpacing:0.5
                      }}>
                        prioridad {priorityLabels[t.priority]}
                      </span>
                    )}
                  </div>
                )}
                {t.notes && (
                  <div style={{
                    fontSize:11, color:C.inkSoft, marginTop:6, lineHeight:1.5,
                    whiteSpace:'pre-wrap', borderTop:`1px dashed ${C.borderSoft}`, paddingTop:6
                  }}>
                    {t.notes}
                  </div>
                )}
              </div>
              <div style={{display:'flex', gap:4, flexShrink:0}}>
                <button onClick={() => { setEditingTask(t); setTaskEditorOpen(true); }} style={{
                  background:'none', border:`1px solid ${C.border}`, borderRadius:6,
                  padding:'4px 6px', cursor:'pointer', color:C.inkSoft,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}
                onMouseEnter={e=>{e.currentTarget.style.background=C.accentSoft;e.currentTarget.style.color=C.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=C.inkSoft;}}
                title="editar"><Edit2 size={11}/></button>
                <button onClick={() => deleteTask(t.id)} style={{
                  background:'none', border:`1px solid ${C.border}`, borderRadius:6,
                  padding:'4px 6px', cursor:'pointer', color:C.inkSoft,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='#fde8e8';e.currentTarget.style.color='#e87a7a';}}
                onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=C.inkSoft;}}
                title="eliminar"><Trash2 size={11}/></button>
              </div>
            </div>
          );
        })}

        {doneTasks.length > 0 && (
          <div style={{marginTop:14, paddingTop:14, borderTop:`1px solid ${C.borderSoft}`}}>
            <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>
              completadas ({doneTasks.length})
            </div>
            {doneTasks.map(t => (
              <div key={t.id} style={{
                display:'flex', alignItems:'center', gap:10, padding:'8px 12px',
                borderRadius:10, marginBottom:4, opacity:0.55
              }}>
                <div onClick={() => toggleTaskDef(t.id)} style={{
                  width:20, height:20, borderRadius:10, flexShrink:0,
                  background: C.accent, display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer'
                }}>
                  <Check size={12} style={{color:'#fff'}}/>
                </div>
                <div style={{flex:1, fontSize:13, color:C.ink, textDecoration:'line-through'}}>{t.text}</div>
                <button onClick={() => deleteTask(t.id)} style={{
                  background:'transparent', border:'none', cursor:'pointer', color:C.inkSoft, fontSize:14, padding:4
                }}>×</button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ═══ BLOQUE 2: SEMANA A SEMANA — publicaciones + entregables ═══ */}
      <Card style={{marginBottom:20}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14, flexWrap:'wrap', gap:10}}>
          <div>
            <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
              tu semana · todo junto
            </div>
            <H size="md" style={{fontStyle:'italic'}}>publicaciones + entregables ♡</H>
          </div>
          <div style={{display:'flex', gap:6}}>
            {[7, 14, 30].map(n => (
              <button key={n} onClick={() => setContentRange(n)} style={{
                padding:'5px 12px', border:'none', borderRadius:100,
                background: contentRange === n ? C.accent : C.bgSoft,
                color: contentRange === n ? '#fff' : C.inkSoft,
                fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
              }}>{n} días</button>
            ))}
          </div>
        </div>

        {(() => {
          // Build unified items: posts + launch tasks
          const items = [];

          // POSTS
          upcomingPosts.filter(p => getPostStatus(p) !== 'published' && getPostStatus(p) !== 'scheduled').forEach(p => {
            items.push({ type:'post', date: p.dt, p });
          });

          // LAUNCH TASKS — only if within range
          LAUNCHES_CONFIG.forEach(launch => {
            const launchDate = parseDate(launch.date);
            const checklist = LAUNCH_CHECKLISTS[launch.checklistKey] || [];
            checklist.forEach((task, idx) => {
              if (!launchDate) return;
              const deadline = new Date(launchDate);
              deadline.setDate(deadline.getDate() - task.days);
              deadline.setHours(0,0,0,0);
              const today0 = new Date(now); today0.setHours(0,0,0,0);
              const rangeLimitDate = new Date(today0); rangeLimitDate.setDate(rangeLimitDate.getDate() + contentRange);
              if (deadline >= today0 && deadline <= rangeLimitDate) {
                const isChecked = getLaunchCheck(launch.id, idx);
                if (!isChecked) {
                  items.push({ type:'task', date: deadline, launch, task, idx, launchId: launch.id });
                }
              }
            });
          });

          // Sort by date
          items.sort((a, b) => a.date - b.date);

          if (items.length === 0) return (
            <div style={{padding:'24px 0', textAlign:'center', fontSize:13, color:C.inkSoft, fontStyle:'italic'}}>
              nada pendiente en los próximos {contentRange} días ✧
            </div>
          );

          // Group by ISO week (Mon-Sun)
          const getWeekKey = (d) => {
            const dt = new Date(d);
            dt.setHours(0,0,0,0);
            const day = dt.getDay(); // 0=sun
            const diff = dt.getDate() - day + (day === 0 ? -6 : 1); // monday
            const mon = new Date(dt.setDate(diff));
            return mon.toISOString().split('T')[0];
          };
          const weekGroups = {};
          items.forEach(item => {
            const wk = getWeekKey(item.date);
            if (!weekGroups[wk]) weekGroups[wk] = [];
            weekGroups[wk].push(item);
          });

          const catColors = {
            'definición': {bg: C.igBg, color: C.igDark},
            'entregables': {bg: C.liBg, color: C.liDark},
            'infra': {bg: C.ttBg, color: C.ttDark},
            'contenido': {bg: C.ssBg, color: C.ssDark},
            'venta': {bg: C.accentSoft, color: C.accent},
            'test': {bg: C.bgSoft, color: C.inkSoft},
            'launch': {bg: '#FFE8D1', color: '#B87733'}
          };

          return Object.keys(weekGroups).sort().map(wk => {
            const weekItems = weekGroups[wk];
            const monDate = new Date(wk);
            const sunDate = new Date(monDate); sunDate.setDate(sunDate.getDate() + 6);
            const fmt = (d) => `${d.getDate()} ${mesesShort[d.getMonth()]}`;
            const isThisWeek = (() => {
              const today0 = new Date(now); today0.setHours(0,0,0,0);
              return today0 >= monDate && today0 <= sunDate;
            })();

            return (
              <div key={wk} style={{marginBottom:18}}>
                {/* Week header */}
                <div style={{
                  display:'flex', alignItems:'center', gap:8, marginBottom:8,
                  padding:'7px 12px', borderRadius:8,
                  background: isThisWeek ? '#FFF1E4' : C.bgSoft,
                  border: `1px solid ${isThisWeek ? '#F0C8A0' : C.border}`
                }}>
                  <span style={{fontSize:12}}>{isThisWeek ? '📅' : '📋'}</span>
                  <span style={{fontSize:11, fontWeight:700, color: isThisWeek ? '#B87733' : C.ink, flex:1}}>
                    {isThisWeek ? 'esta semana · ' : ''}{fmt(monDate)} — {fmt(sunDate)}
                  </span>
                  <span style={{fontSize:10, color:C.inkSoft}}>{weekItems.length} items</span>
                </div>

                {/* Items */}
                <div style={{display:'flex', flexDirection:'column', gap:6, paddingLeft:4}}>
                  {weekItems.map((item, ii) => {
                    if (item.type === 'post') {
                      const p = item.p;
                      const pf = PLATFORMS[p.pf];
                      const isCreating = getPostStatus(p) === 'creating';
                      const isScheduled = getPostStatus(p) === 'scheduled';
                      return (
                        <div key={`p-${ii}`} style={{
                          display:'flex', alignItems:'flex-start', gap:10, padding:'9px 11px',
                          background: C.card, borderRadius:9,
                          border:`1px solid ${C.border}`,
                          borderLeft:`3px solid ${pf.dark}`
                        }}>
                          <button onClick={() => setPostStatus(p, isScheduled ? 'pending' : 'scheduled')} style={{
                            width:20, height:20, borderRadius:100, flexShrink:0, marginTop:1,
                            border: `2px solid ${isScheduled ? '#7BA2C2' : C.border}`,
                            background: isScheduled ? '#7BA2C2' : 'transparent',
                            cursor:'pointer', color:'#fff', fontSize:10, fontFamily:'inherit',
                            display:'flex', alignItems:'center', justifyContent:'center'
                          }}>{isScheduled ? '✓' : ''}</button>
                          <div style={{
                            minWidth:38, textAlign:'center', flexShrink:0,
                            padding:'4px 6px', background:pf.bg, borderRadius:7, color:pf.dark
                          }}>
                            <div style={{fontFamily:"'Fraunces',serif", fontSize:13, fontWeight:500, lineHeight:1}}>
                              {item.date.getDate()}
                            </div>
                            <div style={{fontSize:8, textTransform:'uppercase', letterSpacing:0.5, marginTop:1}}>
                              {mesesShort[item.date.getMonth()]}
                            </div>
                          </div>
                          <div style={{flex:1, minWidth:0}}>
                            <div style={{display:'flex', gap:5, alignItems:'center', marginBottom:3, flexWrap:'wrap'}}>
                              <Badge bg={pf.bg} color={pf.dark} style={{fontSize:9}}>{pf.name}</Badge>
                              {p.t && <Badge bg={C.bgSoft} color={C.inkSoft} style={{fontSize:9}}>{p.t}</Badge>}
                              <span style={{fontSize:10, color:C.inkSoft}}>{p.tm || '—'} · {daysUntil(item.date)}</span>
                              {isCreating && <span style={{fontSize:9, color:C.creating, fontWeight:600, fontStyle:'italic'}}>◐ en proceso</span>}
                            </div>
                            <div style={{fontSize:12, color:C.ink, lineHeight:1.35, fontWeight:500}}>
                              {p.ti || p.su}
                            </div>
                          </div>
                          <div style={{display:'flex', gap:4, flexShrink:0, marginTop:1}}>
                            <button onClick={() => setPostStatus(p, isCreating ? 'pending' : 'creating')}
                              title={isCreating ? 'quitar en proceso' : 'en proceso'}
                              style={{
                                width:24, height:24, borderRadius:6, border:'none', cursor:'pointer',
                                background: isCreating ? C.creating : C.bgSoft,
                                fontSize:12, color:isCreating ? '#fff' : C.inkSoft, fontFamily:'inherit',
                              }}>◐</button>
                            <button onClick={(e)=>{e.stopPropagation(); if(confirm('¿Eliminar este post del plan?')) { update(s=>{if(!s.deletedPosts)s.deletedPosts=[];const _key=`${p.pf}:${p.i}`;if(!s.deletedPosts.includes(p.i))s.deletedPosts.push(p.i);if(!s.deletedPosts.includes(_key))s.deletedPosts.push(_key);if(s.customPosts?.[p.pf])s.customPosts[p.pf]=s.customPosts[p.pf].filter(cp=>cp.i!==p.i);}); }}}
                              title="eliminar"
                              style={{
                                width:24, height:24, borderRadius:6, border:'none', cursor:'pointer',
                                background: C.bgSoft, fontSize:11, color:'#B04545', fontFamily:'inherit',
                              }}>✕</button>
                          </div>
                        </div>
                      );
                    } else {
                      // Launch task
                      const {task, idx, launchId, launch} = item;
                      const isPast = item.date < new Date(now.getFullYear(), now.getMonth(), now.getDate());
                      const catStyle = catColors[task.cat] || catColors['test'];
                      return (
                        <div key={`t-${ii}`} onClick={() => toggleLaunchCheck(launchId, idx)} style={{
                          display:'flex', alignItems:'flex-start', gap:10, padding:'9px 11px',
                          background: isPast ? '#FFF5F5' : C.card, borderRadius:9,
                          border:`1px solid ${isPast ? '#F0C8C8' : C.border}`,
                          borderLeft:`3px solid ${catStyle.color}`,
                          cursor:'pointer'
                        }}>
                          <div style={{
                            width:20, height:20, borderRadius:100, flexShrink:0, marginTop:1,
                            background: 'transparent',
                            border: `2px solid ${catStyle.color}`,
                            display:'flex', alignItems:'center', justifyContent:'center'
                          }}/>
                          <div style={{
                            minWidth:38, textAlign:'center', flexShrink:0,
                            padding:'4px 6px', background:catStyle.bg, borderRadius:7, color:catStyle.color
                          }}>
                            <div style={{fontFamily:"'Fraunces',serif", fontSize:13, fontWeight:500, lineHeight:1}}>
                              {item.date.getDate()}
                            </div>
                            <div style={{fontSize:8, textTransform:'uppercase', letterSpacing:0.5, marginTop:1}}>
                              {mesesShort[item.date.getMonth()]}
                            </div>
                          </div>
                          <div style={{flex:1, minWidth:0}}>
                            <div style={{display:'flex', gap:5, alignItems:'center', marginBottom:3, flexWrap:'wrap'}}>
                              {task.cat && <span style={{
                                fontSize:9, padding:'1px 6px', borderRadius:100,
                                background: catStyle.bg, color: catStyle.color,
                                fontWeight:600, textTransform:'uppercase', letterSpacing:0.3
                              }}>{task.cat}</span>}
                              <Badge bg={C.bgSoft} color={C.inkSoft} style={{fontSize:9}}>
                                🚀 {(launch.date||'').slice(5).replace('-','/')} {launch.name?.split(' ')[0] || ''}
                              </Badge>
                              {isPast && <span style={{fontSize:9, color:'#B04545', fontWeight:600}}>atrasado</span>}
                              <span style={{fontSize:10, color:C.inkSoft}}>{daysUntil(item.date)}</span>
                            </div>
                            <div style={{fontSize:12, color:C.ink, lineHeight:1.35}}>
                              {task.text}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          });
        })()}

        <div style={{fontSize:11, color:C.inkSoft, marginTop:10, fontStyle:'italic', lineHeight:1.5, paddingTop:10, borderTop:`1px solid ${C.borderSoft}`}}>
          ✓ publ = programada · ◐ = en proceso · clic en entregable = hecho ♡
        </div>
      </Card>

      <Card style={{marginBottom:20}}>
        <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:12}}>
          stories recurrentes · próximos {contentRange} días
        </div>
{/* ═══ SUB-SECCIÓN: STORIES IG (batches recurrentes) ═══ */}
        {(() => {
          const todayStartLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const upcomingStories = [];
          for (let i = 0; i <= contentRange; i++) {
            const d = new Date(todayStartLocal);
            d.setDate(d.getDate() + i);
            const dow = d.getDay(); // 0=dom, 3=mié
            if (dow !== 0 && dow !== 3) continue;
            const batchKey = `stories:${d.toISOString().split('T')[0]}`;
            const isDone = !!(state.storiesBatches && state.storiesBatches[batchKey]);
            if (isDone) continue;
            const isToday = d.getTime() === todayStartLocal.getTime();
            const tomorrow = new Date(todayStartLocal); tomorrow.setDate(tomorrow.getDate()+1);
            const isTomorrow = d.getTime() === tomorrow.getTime();
            const labelDay = isToday ? 'hoy' : isTomorrow ? 'mañana' : `${['dom','lun','mar','mié','jue','vie','sáb'][dow]} ${d.getDate()}`;
            upcomingStories.push({
              date: d, batchKey, isToday,
              label: dow === 3 ? `preparar stories IG para jue-sáb (batch · 60 min)` : `preparar stories IG para lun-mié (batch · 60 min)`,
              when: labelDay
            });
          }

          if (upcomingStories.length === 0) return null;
          return (
            <div style={{marginTop:18, paddingTop:14, borderTop:`1px solid ${C.borderSoft}`}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <div style={{fontSize:11, color:C.igDark, letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
                  ♡ stories IG · batches
                </div>
                <span style={{fontSize:10, color:C.inkSoft, fontStyle:'italic'}}>
                  cada miércoles + domingo
                </span>
              </div>
              {upcomingStories.map((s, i) => (
                <div key={i} onClick={() => {
                  update(st => {
                    if (!st.storiesBatches) st.storiesBatches = {};
                    st.storiesBatches[s.batchKey] = !st.storiesBatches[s.batchKey];
                  });
                }} style={{
                  display:'flex', alignItems:'flex-start', gap:12, padding:'10px 12px',
                  background: C.card, borderRadius:10, marginBottom:6, cursor:'pointer',
                  border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.igDark}`,
                  transition:'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = C.bgSoft}
                onMouseLeave={(e) => e.currentTarget.style.background = C.card}>
                  <div style={{
                    width:24, height:24, borderRadius:6, flexShrink:0, marginTop:1,
                    border:`2px solid ${C.border}`, background:'transparent'
                  }}/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:3, flexWrap:'wrap'}}>
                      <Badge bg={C.igBg} color={C.igDark} style={{fontSize:9}}>♡ stories</Badge>
                      <span style={{fontSize:11, color:C.inkSoft}}>{s.when}</span>
                    </div>
                    <div style={{fontSize:13, color:C.ink, lineHeight:1.4}}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* ═══ SUB-SECCIÓN: TAREAS DE LANZAMIENTOS · solo si hay alguna en rango ═══ */}
        {(() => {
          const todayStartLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const launchTasks = [];
          LAUNCHES_CONFIG.forEach(launch => {
            const launchDate = new Date(launch.date);
            const checklist = LAUNCH_CHECKLISTS[launch.checklistKey] || [];
            checklist.forEach((task, idx) => {
              const isChecked = !!(state.launches && state.launches[launch.id] && state.launches[launch.id][idx]);
              if (isChecked) return;
              const taskDate = new Date(launchDate);
              taskDate.setDate(taskDate.getDate() - task.days);
              taskDate.setHours(0,0,0,0);
              const daysFromNow = Math.ceil((taskDate - todayStartLocal) / (1000*60*60*24));
              const isOverdue = taskDate < todayStartLocal;
              if (!isOverdue && daysFromNow > contentRange) return;
              const daysToLaunch = Math.ceil((launchDate - todayStartLocal) / (1000*60*60*24));
              launchTasks.push({
                launch, taskIdx: idx, task, isOverdue, daysToLaunch,
                taskDate
              });
            });
          });

          if (launchTasks.length === 0) return null;
          return (
            <div style={{marginTop:18, paddingTop:14, borderTop:`1px solid ${C.borderSoft}`}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <div style={{fontSize:11, color:'#B87733', letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
                  ♡ tareas de lanzamientos
                </div>
                <span style={{fontSize:10, color:C.inkSoft, fontStyle:'italic'}}>
                  {launchTasks.length} pendientes
                </span>
              </div>
              {launchTasks.slice(0, 8).map((lt, i) => (
                <div key={i} onClick={() => {
                  update(s => {
                    if (!s.launches) s.launches = {};
                    if (!s.launches[lt.launch.id]) s.launches[lt.launch.id] = {};
                    s.launches[lt.launch.id][lt.taskIdx] = !s.launches[lt.launch.id][lt.taskIdx];
                  });
                }} style={{
                  display:'flex', alignItems:'flex-start', gap:12, padding:'10px 12px',
                  background: lt.isOverdue ? '#FFF1F1' : C.card, borderRadius:10, marginBottom:6, cursor:'pointer',
                  border:`1px solid ${lt.isOverdue ? '#F0C8C8' : C.border}`, borderLeft:`3px solid #B87733`
                }}>
                  <div style={{
                    width:24, height:24, borderRadius:6, flexShrink:0, marginTop:1,
                    border:`2px solid ${C.border}`, background:'transparent'
                  }}/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:3, flexWrap:'wrap'}}>
                      <Badge bg="#FFE8D1" color="#B87733" style={{fontSize:9}}>
                        {lt.launch.name.replace('Lanzamiento ', '')}
                      </Badge>
                      {lt.isOverdue ? (
                        <span style={{fontSize:10, color:'#B04545', fontWeight:600, fontStyle:'italic'}}>
                          ⚠ atrasada · launch en {lt.daysToLaunch}d
                        </span>
                      ) : (
                        <span style={{fontSize:10, color:C.inkSoft}}>
                          launch en {lt.daysToLaunch}d
                        </span>
                      )}
                    </div>
                    <div style={{fontSize:13, color:C.ink, lineHeight:1.4}}>
                      {lt.task.text}
                    </div>
                  </div>
                </div>
              ))}
              {launchTasks.length > 8 && (
                <div style={{fontSize:11, color:C.inkSoft, fontStyle:'italic', textAlign:'center', marginTop:6}}>
                  … y {launchTasks.length - 8} más · ver todo en la sección de lanzamientos abajo ↓
                </div>
              )}
            </div>
          );
        })()}

        {/* ═══ SUB-SECCIÓN: TAREAS LIBRES ═══ */}
        {(() => {
          const freeTasks = Array.isArray(state.tasks) ? state.tasks.filter(t => !t.done) : [];
          if (freeTasks.length === 0) return null;
          return (
            <div style={{marginTop:18, paddingTop:14, borderTop:`1px solid ${C.borderSoft}`}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <div style={{fontSize:11, color:C.accent, letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
                  ♡ tareas libres
                </div>
                <span style={{fontSize:10, color:C.inkSoft, fontStyle:'italic'}}>
                  {freeTasks.length} pendientes
                </span>
              </div>
              {freeTasks.map(t => (
                <div key={t.id} onClick={() => {
                  update(s => {
                    const task = (s.tasks || []).find(x => x.id === t.id);
                    if (task) task.done = !task.done;
                  });
                }} style={{
                  display:'flex', alignItems:'flex-start', gap:12, padding:'10px 12px',
                  background: C.card, borderRadius:10, marginBottom:6, cursor:'pointer',
                  border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.accent}`
                }}>
                  <div style={{
                    width:24, height:24, borderRadius:11, flexShrink:0, marginTop:1,
                    border:`2px solid ${C.border}`, background:'transparent'
                  }}/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, color:C.ink, lineHeight:1.4}}>
                      {t.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </Card>


      {/* ═══ BLOQUE 3: PRÓXIMOS LANZAMIENTOS ═══ */}
      <Card>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
          <div>
            <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
              roadmap
            </div>
            <H size="md" style={{fontStyle:'italic'}}>próximos lanzamientos</H>
          </div>
          <Badge bg={C.ttBg} color={C.ttDark} style={{fontSize:11}}>
            {upcomingLaunches.length} pendientes
          </Badge>
        </div>

        {upcomingLaunches.length === 0 ? (
          <div style={{padding:'24px 0', textAlign:'center', fontSize:13, color:C.inkSoft, fontStyle:'italic'}}>
            no hay lanzamientos programados ✧
          </div>
        ) : upcomingLaunches.map((launch, li) => {
          const checklist = LAUNCH_CHECKLISTS[launch.checklistKey] || [];
          const totalChecks = checklist.length;
          const doneChecks = checklist.filter((_, idx) => getLaunchCheck(launch.id, idx)).length;
          const pctDone = totalChecks > 0 ? Math.round((doneChecks/totalChecks)*100) : 0;
          const isExpanded = expandedLaunch === launch.id;
          const daysToLaunch = Math.ceil((launch.launchDate - now) / (1000*60*60*24));

          return (
            <div key={launch.id} style={{
              background:C.bgSoft, borderRadius:12, marginBottom:10,
              border:`1px solid ${C.border}`,
              borderLeft:`3px solid ${C.ttDark}`
            }}>
              <div onClick={() => setExpandedLaunch(isExpanded ? null : launch.id)} style={{
                display:'flex', alignItems:'center', gap:14, padding:14, cursor:'pointer'
              }}>
                <div style={{
                  minWidth:60, textAlign:'center', padding:'8px 0',
                  background:C.ttBg, borderRadius:10, color:C.ttDark
                }}>
                  <div style={{fontFamily:"'Fraunces', serif", fontSize:18, fontWeight:500, lineHeight:1}}>
                    {launch.launchDate.getDate()}
                  </div>
                  <div style={{fontSize:9, textTransform:'uppercase', letterSpacing:0.5, marginTop:2}}>
                    {mesesShort[launch.launchDate.getMonth()]}
                  </div>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:14, color:C.ink, fontWeight:500, marginBottom:4}}>
                    {launch.name}
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', fontSize:11, color:C.inkSoft}}>
                    <span>en {daysToLaunch} días · {launch.price}</span>
                    <span style={{color:pctDone === 100 ? C.ttDark : C.inkSoft, fontWeight:pctDone === 100 ? 600 : 400}}>
                      · {doneChecks}/{totalChecks} tareas ({pctDone}%)
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} style={{
                  color:C.inkSoft, transform: isExpanded ? 'rotate(90deg)' : 'none',
                  transition:'transform 0.2s', flexShrink:0
                }}/>
              </div>

              {isExpanded && (
                <div style={{padding:'0 14px 14px 14px'}}>
                  <div style={{borderTop:`1px solid ${C.borderSoft}`, paddingTop:12, display:'flex', flexDirection:'column', gap:14}}>
                    {(() => {
                      // Group by week
                      const catColors = {
                        'definición': {bg: C.igBg, color: C.igDark},
                        'entregables': {bg: C.liBg, color: C.liDark},
                        'infra': {bg: C.ttBg, color: C.ttDark},
                        'contenido': {bg: C.ssBg, color: C.ssDark},
                        'venta': {bg: C.accentSoft, color: C.accent},
                        'test': {bg: C.bgSoft, color: C.inkSoft},
                        'launch': {bg: '#FFE8D1', color: '#B87733'}
                      };

                      // Build weeks: group tasks by 7-day buckets from launch date
                      const weeks = [];
                      const sorted = checklist.map((t,idx)=>({...t,idx})).sort((a,b)=>b.days-a.days);
                      let current = null;

                      sorted.forEach(task => {
                        const weekLabel = task.days === 0
                          ? '♡ día del lanzamiento'
                          : task.days <= 7
                          ? 'última semana · 1-7 días antes'
                          : task.days <= 14
                          ? '2 semanas antes · 8-14 días'
                          : task.days <= 21
                          ? '3 semanas antes · 15-21 días'
                          : task.days <= 28
                          ? '4 semanas antes · 22-28 días'
                          : task.days <= 35
                          ? '5 semanas antes · 29-35 días'
                          : task.days <= 42
                          ? '6 semanas antes · 36-42 días'
                          : task.days <= 49
                          ? '7 semanas antes · 43-49 días'
                          : task.days <= 56
                          ? '8 semanas antes · 50-56 días'
                          : '+ de 8 semanas antes';

                        if (!current || current.label !== weekLabel) {
                          current = {label: weekLabel, tasks: []};
                          weeks.push(current);
                        }
                        current.tasks.push(task);
                      });

                      return weeks.map((week, wi) => {
                        const weekDone = week.tasks.filter(t => getLaunchCheck(launch.id, t.idx)).length;
                        const weekTotal = week.tasks.length;
                        const isCurrentWeek = week.label.includes('última') || week.label.includes('♡');

                        return (
                          <div key={wi}>
                            {/* Week header */}
                            <div style={{
                              display:'flex', alignItems:'center', gap:8, marginBottom:8,
                              padding:'6px 10px', borderRadius:7,
                              background: isCurrentWeek ? '#FFF1E4' : C.bgSoft,
                              border: `1px solid ${isCurrentWeek ? '#F0C8A0' : C.border}`
                            }}>
                              <span style={{fontSize:12}}>{isCurrentWeek ? '🚀' : '📅'}</span>
                              <span style={{fontSize:11, fontWeight:700, color: isCurrentWeek ? '#B87733' : C.ink, flex:1}}>{week.label}</span>
                              <span style={{fontSize:10, color: weekDone===weekTotal ? C.ttDark : C.inkSoft, fontWeight:600}}>
                                {weekDone}/{weekTotal}
                              </span>
                            </div>

                            {/* Tasks in this week */}
                            <div style={{display:'flex', flexDirection:'column', gap:5, paddingLeft:4}}>
                              {week.tasks.map(task => {
                                const isChecked = getLaunchCheck(launch.id, task.idx);
                                const deadline = launchDeadline(launch.launchDate, task.days);
                                const isPast = deadline < now && !isChecked;
                                const catStyle = catColors[task.cat] || catColors['test'];

                                return (
                                  <div key={task.idx} onClick={() => toggleLaunchCheck(launch.id, task.idx)} style={{
                                    display:'flex', alignItems:'flex-start', gap:10, padding:'8px 10px',
                                    background: isChecked ? C.bgSoft : (isPast ? '#FFF5F5' : C.card),
                                    borderRadius:8, cursor:'pointer',
                                    border: `1px solid ${isPast && !isChecked ? '#F0C8C8' : C.borderSoft}`
                                  }}>
                                    <div style={{
                                      width:18, height:18, borderRadius:9, flexShrink:0,
                                      background: isChecked ? C.ttDark : 'transparent',
                                      border: `2px solid ${isChecked ? C.ttDark : C.border}`,
                                      display:'flex', alignItems:'center', justifyContent:'center',
                                      marginTop:1
                                    }}>
                                      {isChecked && <Check size={10} style={{color:'#fff'}}/>}
                                    </div>
                                    <div style={{flex:1, minWidth:0}}>
                                      <div style={{display:'flex', gap:5, alignItems:'center', marginBottom:2, flexWrap:'wrap'}}>
                                        {task.cat && (
                                          <span style={{
                                            fontSize:9, padding:'1px 6px', borderRadius:100,
                                            background: catStyle.bg, color: catStyle.color,
                                            fontWeight:600, textTransform:'uppercase', letterSpacing:0.3
                                          }}>{task.cat}</span>
                                        )}
                                        {isPast && !isChecked && (
                                          <span style={{fontSize:9, color:'#B04545', fontWeight:600}}>atrasado</span>
                                        )}
                                      </div>
                                      <div style={{
                                        fontSize:12, color:C.ink, lineHeight:1.4,
                                        textDecoration: isChecked ? 'line-through' : 'none',
                                        opacity: isChecked ? 0.6 : 1
                                      }}>
                                        {task.text}
                                      </div>
                                      <div style={{fontSize:10, color:C.inkSoft, marginTop:2}}>
                                        {task.days === 0 ? '♡ día del lanzamiento' : `${task.days} días antes`} · {formatDeadline(deadline)}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{fontSize:11, color:C.inkSoft, marginTop:12, fontStyle:'italic', lineHeight:1.5}}>
          si quieres añadir o personalizar tareas de un lanzamiento, dímelo en el chat ♡
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOKS VIEW — biblioteca de 45 hooks filtrable
// ═══════════════════════════════════════════════════════════════════
function HooksView() {
  const [state, update] = useAppState();
  const [pillarFilter, setPillarFilter] = useState('all');
  const [archetypeFilter, setArchetypeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedN, setCopiedN] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const deletedIds = new Set(state.deletedHooks || []);
  const allHooks = [...HOOKS, ...(state.customHooks || []).map((h,i) => ({...h, n: `custom-${i}`}))].filter(h => !deletedIds.has(String(h.n)));

  const handleSaveHook = (form) => {
    if (!form.f?.trim()) return;
    update(s => {
      if (!s.customHooks) s.customHooks = [];
      const _id = editingItem?._id || `ch-${Date.now()}`;
      const idx = s.customHooks.findIndex(h => h._id === editingItem?._id);
      const item = { _id, f: form.f, e: form.e || '', p: form.p || 'autoridad', a: form.a || 'ambas', _custom: true };
      if (idx >= 0) s.customHooks[idx] = item;
      else s.customHooks.push(item);
    });
    setEditorOpen(false); setEditingItem(null);
  };

  const handleDeleteHook = (n) => {
    if (!confirm('¿Eliminar este hook?')) return;
    update(s => {
      if (!s.deletedHooks) s.deletedHooks = [];
      if (!s.deletedHooks.includes(String(n))) s.deletedHooks.push(String(n));
      if (s.customHooks) s.customHooks = s.customHooks.filter(h => h._id !== n);
    });
  };

  const hookFields = [
    { key:'f', label:'Hook principal ♡', required:true, type:'textarea', rows:3, placeholder:'La frase que para el scroll...' },
    { key:'e', label:'Ejemplo aplicado', type:'textarea', rows:3, placeholder:'Cómo quedaría en un post real...' },
    { key:'p', label:'Pilar', type:'select', options:[
      {value:'autoridad',label:'autoridad'},{value:'conexion',label:'conexión'},
      {value:'confianza',label:'confianza'},{value:'venta',label:'venta'},
    ]},
    { key:'a', label:'Audiencia', type:'select', options:[
      {value:'principiante',label:'principiante'},{value:'experta',label:'experta estancada'},{value:'ambas',label:'ambas'},
    ]},
  ];

  const filtered = allHooks.filter(h => {
    if (pillarFilter !== 'all' && h.p !== pillarFilter) return false;
    if (archetypeFilter !== 'all' && h.a !== archetypeFilter && h.a !== 'ambas') return false;
    if (search) {
      const s = search.toLowerCase();
      if (!h.f.toLowerCase().includes(s) && !h.e.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const copyHook = async (hook, part) => {
    const text = part === 'f' ? hook.f : hook.e;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedN(`${hook.n}-${part}`);
      setTimeout(() => setCopiedN(null), 1500);
    } catch {}
  };

  // Count by pillar for tabs
  const counts = {
    all: HOOKS.length,
    autoridad: HOOKS.filter(h => h.p === 'autoridad').length,
    conexion: HOOKS.filter(h => h.p === 'conexion').length,
    confianza: HOOKS.filter(h => h.p === 'confianza').length,
    venta: HOOKS.filter(h => h.p === 'venta').length,
  };

  const archetypeStyles = {
    principiante: {bg: C.igBg, color: C.igDark, label:'principiante'},
    experta: {bg: C.liBg, color: C.liDark, label:'experta estancada'},
    ambas: {bg: C.bgSoft, color: C.inkSoft, label:'ambas'},
  };

  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          recursos
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>
          banco de hooks <span style={{color:C.accent}}>✧</span>
        </H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:8, maxWidth:600, lineHeight:1.6}}>
          45 fórmulas de apertura organizadas por pilar y arquetipo · clic para copiar
        </div>
        <div style={{marginTop:12}}>
          <button onClick={() => { setEditingItem(null); setEditorOpen(true); }} style={{
            display:'inline-flex', alignItems:'center', gap:5, background:C.accent, color:'#fff',
            border:'none', borderRadius:100, padding:'7px 16px', fontSize:12, fontWeight:600,
            cursor:'pointer', fontFamily:'inherit', boxShadow:'0 2px 8px rgba(232,145,165,0.35)',
          }}><Plus size={14} strokeWidth={2.5}/> añadir hook</button>
        </div>
      </div>

      {editorOpen && (
        <MiniEditor
          title={editingItem ? '✏️ editar hook' : '✦ añadir hook'}
          fields={hookFields}
          initial={editingItem ? { f:editingItem.f, e:editingItem.e, p:editingItem.p, a:editingItem.a } : {}}
          onSave={handleSaveHook}
          onClose={() => { setEditorOpen(false); setEditingItem(null); }}
        />
      )}

      {/* Filters */}
      <Card style={{marginBottom:20, padding:16}}>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:8}}>
            pilar de contenido
          </div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
            {['all', 'autoridad', 'conexion', 'confianza', 'venta'].map(p => {
              const isActive = pillarFilter === p;
              const style = p === 'all' ? {bg: C.ink, color: C.bg, label: 'todos'} : PILLAR_STYLES[p];
              return (
                <button key={p} onClick={() => setPillarFilter(p)} style={{
                  padding:'6px 12px', border:'none', borderRadius:100,
                  background: isActive ? style.bg : C.bgSoft,
                  color: isActive ? (p === 'all' ? style.color : style.color) : C.inkSoft,
                  fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight: isActive ? 600 : 500
                }}>
                  {style.label} ({p === 'all' ? counts.all : counts[p]})
                </button>
              );
            })}
          </div>
        </div>

        <div style={{marginBottom:14}}>
          <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:8}}>
            arquetipo
          </div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
            {[
              {id:'all', label:'todos'},
              {id:'principiante', label:'principiante'},
              {id:'experta', label:'experta estancada'},
            ].map(a => (
              <button key={a.id} onClick={() => setArchetypeFilter(a.id)} style={{
                padding:'6px 12px', border:'none', borderRadius:100,
                background: archetypeFilter === a.id ? C.ink : C.bgSoft,
                color: archetypeFilter === a.id ? C.bg : C.inkSoft,
                fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight: archetypeFilter === a.id ? 600 : 500
              }}>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="buscar por palabra clave (cv, linkedin, entrevista...)"
            style={{
              width:'100%', padding:'10px 14px', border:`1px solid ${C.border}`,
              borderRadius:10, fontFamily:'inherit', fontSize:13,
              background:C.card, color:C.ink, boxSizing:'border-box'
            }}
          />
        </div>
      </Card>

      {/* Results count */}
      <div style={{fontSize:12, color:C.inkSoft, marginBottom:14, fontStyle:'italic'}}>
        {filtered.length} {filtered.length === 1 ? 'hook' : 'hooks'} encontrados ♡
      </div>

      {/* Hooks list */}
      {filtered.length === 0 ? (
        <Card style={{textAlign:'center', padding:40, color:C.inkSoft}}>
          <div style={{fontSize:13, fontStyle:'italic'}}>no hay hooks con esos filtros ✧</div>
        </Card>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {filtered.map(hook => {
            const pillarStyle = PILLAR_STYLES[hook.p];
            const archStyle = archetypeStyles[hook.a];
            return (
              <Card key={hook.n} style={{padding:0, overflow:'hidden'}}>
                <div style={{
                  display:'flex', alignItems:'center', gap:10, padding:'10px 16px',
                  background: C.bgSoft, borderBottom:`1px solid ${C.borderSoft}`
                }}>
                  <div style={{
                    fontFamily:"'Fraunces', serif", fontSize:15, fontWeight:500, color:C.ink,
                    minWidth:30
                  }}>#{hook.n}</div>
                  <Badge bg={pillarStyle.bg} color={pillarStyle.color} style={{fontSize:10}}>
                    {pillarStyle.label}
                  </Badge>
                  <Badge bg={archStyle.bg} color={archStyle.color} style={{fontSize:10}}>
                    {archStyle.label}
                  </Badge>
                </div>

                <div style={{padding:'14px 16px'}}>
                  <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:6}}>
                    fórmula
                  </div>
                  <div onClick={() => copyHook(hook, 'f')} style={{
                    fontSize:14, color:C.ink, fontWeight:500, lineHeight:1.4, marginBottom:10,
                    padding:'8px 10px', background:C.card, border:`1px dashed ${C.border}`,
                    borderRadius:8, cursor:'pointer', position:'relative'
                  }} title="clic para copiar">
                    {hook.f}
                    {copiedN === `${hook.n}-f` && (
                      <span style={{
                        position:'absolute', top:6, right:8, fontSize:10,
                        color:C.accent, fontWeight:600, fontStyle:'italic'
                      }}>✓ copiado</span>
                    )}
                  </div>

                  <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:6}}>
                    ejemplo adaptado
                  </div>
                  <div onClick={() => copyHook(hook, 'e')} style={{
                    fontSize:13, color:C.ink, lineHeight:1.5, fontStyle:'italic',
                    padding:'10px 12px', background:`${pillarStyle.bg}60`,
                    borderRadius:8, cursor:'pointer', position:'relative',
                    borderLeft:`3px solid ${pillarStyle.color}`
                  }} title="clic para copiar">
                    {hook.e}
                    {copiedN === `${hook.n}-e` && (
                      <span style={{
                        position:'absolute', top:8, right:10, fontSize:10,
                        color:C.accent, fontWeight:600, fontStyle:'normal'
                      }}>✓ copiado</span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Footer: cómo usar */}
      <Card style={{marginTop:24, background: C.bgSoft, border:'none'}}>
        <H size="sm" style={{marginBottom:10}}>cómo usar este banco</H>
        <div style={{fontSize:13, color:C.ink, lineHeight:1.7}}>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ Autoridad:</strong> para carruseles y posts educativos — demuestras que sabes del tema</div>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ Conexión:</strong> para reels faceless y posts personales — humanizas tu marca</div>
          <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ Confianza:</strong> para posts de imagen + frase — validas emociones de la audiencia</div>
          <div><strong style={{fontWeight:600}}>♡ Venta:</strong> para carruseles de venta y stories — presentas servicios sin ser agresiva</div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PLAN VIEW — lista de tareas por día agregando todas las fuentes:
// - checklists de lanzamientos (asesoría, acompañamiento, black friday)
// - preparar contenido próximos 3 días
// - tareas libres del usuario
// ═══════════════════════════════════════════════════════════════════

function PlanView({setView, setMonth, embedded = false}) {
  const [state, update] = useAppState();
  const [daysRange, setDaysRange] = useState(15); // cuántos días mostrar hacia adelante

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Parse a date string yyyy-mm-dd
  const parseDate = (d) => {
    if (!d) return null;
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m-1, day);
  };

  const diasSemLong = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const mesesShort = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

  // Formatear fecha como "lunes · 21 abr"
  const formatDay = (d) => {
    const isToday = d.getTime() === todayStart.getTime();
    const tomorrow = new Date(todayStart); tomorrow.setDate(tomorrow.getDate()+1);
    const isTomorrow = d.getTime() === tomorrow.getTime();
    if (isToday) return `hoy · ${diasSemLong[d.getDay()]} ${d.getDate()} ${mesesShort[d.getMonth()]}`;
    if (isTomorrow) return `mañana · ${diasSemLong[d.getDay()]} ${d.getDate()} ${mesesShort[d.getMonth()]}`;
    return `${diasSemLong[d.getDay()]} · ${d.getDate()} ${mesesShort[d.getMonth()]}`;
  };

  // Construir el mapa día → tareas
  const buildPlan = () => {
    const plan = {};
    // Inicializar días vacíos
    for (let i = 0; i < daysRange; i++) {
      const d = new Date(todayStart);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split('T')[0];
      plan[key] = { date: d, tasks: [] };
    }

    // ═══ 1. CONTENIDO a crear · aparece 3 días antes de la fecha de publicación ═══
    const allContentPosts = [
      ...D.posts.ig.map(p => ({...p, pf:'instagram', pfLabel:'IG'})),
      ...D.posts.li.map(p => ({...p, pf:'linkedin', pfLabel:'LinkedIn'})),
      ...D.posts.ss.map(p => ({...p, pf:'substack', pfLabel:'Substack'})),
    ];

    allContentPosts.forEach(p => {
      const pubDate = parseDate(p.d);
      if (!pubDate) return;
      // Status del post
      const postStatus = state.posts[`${p.pf}:${p.i}`]?.status || 'pending';
      if (postStatus === 'published' || postStatus === 'scheduled') return; // ya publicado o programado → no hace falta crear

      // Por defecto: asignar la tarea al VIERNES anterior a la fecha de publicación
      // (trabajando con 1 semana de adelanto y concentrando en fin de semana)
      // Si el usuario ya movió la tarea manualmente, respetar esa asignación
      const taskKey = `${p.pf}:${p.i}`;
      const manualDate = state.taskAssignments?.[taskKey];
      let prepareDate;
      
      if (manualDate) {
        prepareDate = new Date(manualDate);
      } else {
        // Distribuir entre viernes/sábado/domingo según qué día se publica
        // La idea: si publicas lun → viernes previo; mar → sábado; mié/jue → domingo; 
        //          vie/sáb/dom publicados → domingo anterior
        prepareDate = new Date(pubDate);
        const pubDow = pubDate.getDay(); // 0=dom, 1=lun, ..., 5=vie, 6=sáb
        
        if (pubDow === 1) {
          // publica lunes → viernes anterior (3 días antes)
          prepareDate.setDate(prepareDate.getDate() - 3);
        } else if (pubDow === 2) {
          // publica martes → sábado anterior (3 días antes)
          prepareDate.setDate(prepareDate.getDate() - 3);
        } else if (pubDow === 3) {
          // publica miércoles → domingo anterior (3 días antes)
          prepareDate.setDate(prepareDate.getDate() - 3);
        } else if (pubDow === 4) {
          // publica jueves → domingo anterior (4 días antes)
          prepareDate.setDate(prepareDate.getDate() - 4);
        } else if (pubDow === 5) {
          // publica viernes → domingo anterior (5 días antes)
          prepareDate.setDate(prepareDate.getDate() - 5);
        } else if (pubDow === 6) {
          // publica sábado → domingo anterior (6 días antes)
          prepareDate.setDate(prepareDate.getDate() - 6);
        } else {
          // publica domingo → viernes anterior (2 días antes)
          prepareDate.setDate(prepareDate.getDate() - 2);
        }
      }
      prepareDate.setHours(0,0,0,0);
      
      // Si la fecha calculada ya pasó y es urgente, traerla a hoy
      if (prepareDate < todayStart) prepareDate.setTime(todayStart.getTime());

      const key = prepareDate.toISOString().split('T')[0];
      if (!plan[key]) return; // fuera del rango

      const daysUntilPub = Math.round((pubDate - prepareDate) / (1000*60*60*24));
      // Estimar duración según tipo y plataforma
      const type = (p.t || '').toLowerCase();
      let durationMin = 45; // default
      if (p.pf === 'substack') durationMin = 90; // newsletter largo
      else if (p.pf === 'linkedin') durationMin = 30;
      else if (type.includes('reel')) durationMin = 45;
      else if (type.includes('carrusel')) durationMin = 90;
      else if (type.includes('post') || type.includes('imagen')) durationMin = 30;

      plan[key].tasks.push({
        type: 'content',
        priority: daysUntilPub <= 3 ? 'high' : 'medium',
        pf: p.pf,
        pfLabel: p.pfLabel,
        text: `preparar ${p.t || 'post'} para ${p.pfLabel} · ${pubDate.getDate()} ${mesesShort[pubDate.getMonth()]}: "${(p.ti || p.su || '').slice(0,50)}"`,
        hint: postStatus === 'creating' ? '(en proceso)' : '',
        pubDate,
        daysUntilPub,
        postId: p.i,
        taskKey: `${p.pf}:${p.i}`,
        isManuallyMoved: !!manualDate,
        durationMin,
      });
    });

    // ═══ 2.5. STORIES IG · 2 mini-tareas por semana ═══
    // Miércoles → preparar stories jue-sáb (3 días)
    // Domingo → preparar stories lun-mié (3 días)
    for (let i = 0; i < daysRange; i++) {
      const d = new Date(todayStart);
      d.setDate(d.getDate() + i);
      d.setHours(0,0,0,0);
      const key = d.toISOString().split('T')[0];
      if (!plan[key]) continue;

      const dow = d.getDay(); // 0=dom, 3=mié

      // Comprobar si la tarea ya fue marcada como hecha (guardamos en state.storiesBatches)
      const storiesBatchKey = `stories:${key}`;
      const isDone = !!(state.storiesBatches && state.storiesBatches[storiesBatchKey]);
      if (isDone) continue;

      if (dow === 3) {
        // Miércoles: stories para jue-sáb
        const nextThu = new Date(d); nextThu.setDate(nextThu.getDate()+1);
        const nextSat = new Date(d); nextSat.setDate(nextSat.getDate()+3);
        // Solo tiene sentido si hay al menos 1 post IG esa franja
        const hasIgPosts = D.posts.ig.some(p => {
          const pd = parseDate(p.d);
          return pd && pd >= nextThu && pd <= nextSat;
        });
        plan[key].tasks.push({
          type: 'stories',
          priority: 'medium',
          text: `preparar stories IG para jue-sáb (batch en Canva · ~60 min)`,
          hint: hasIgPosts ? 'hay posts esta franja, stories de refuerzo' : 'stories de día sin post',
          batchKey: storiesBatchKey,
          durationMin: 60,
        });
      } else if (dow === 0) {
        // Domingo: stories para lun-mié
        const nextMon = new Date(d); nextMon.setDate(nextMon.getDate()+1);
        const nextWed = new Date(d); nextWed.setDate(nextWed.getDate()+3);
        const hasIgPosts = D.posts.ig.some(p => {
          const pd = parseDate(p.d);
          return pd && pd >= nextMon && pd <= nextWed;
        });
        plan[key].tasks.push({
          type: 'stories',
          priority: 'medium',
          text: `preparar stories IG para lun-mié (batch en Canva · ~60 min)`,
          hint: hasIgPosts ? 'hay posts esta franja, stories de refuerzo' : 'stories de día sin post',
          batchKey: storiesBatchKey,
          durationMin: 60,
        });
      }
    }

    // ═══ 2. LANZAMIENTOS · tareas del checklist cuya fecha objetivo está en el rango ═══
    LAUNCHES_CONFIG.forEach(launch => {
      const launchDate = parseDate(launch.date);
      if (!launchDate) return;
      const checklist = LAUNCH_CHECKLISTS[launch.checklistKey] || [];
      
      checklist.forEach((task, idx) => {
        const isChecked = !!(state.launches && state.launches[launch.id] && state.launches[launch.id][idx]);
        if (isChecked) return;

        // Fecha objetivo de la tarea
        const taskDate = new Date(launchDate);
        taskDate.setDate(taskDate.getDate() - task.days);
        taskDate.setHours(0,0,0,0);

        // Si la tarea ya se pasó sin hacer → se mete en HOY como atrasada
        let targetKey;
        if (taskDate < todayStart) {
          targetKey = todayStart.toISOString().split('T')[0];
        } else {
          targetKey = taskDate.toISOString().split('T')[0];
        }

        if (!plan[targetKey]) return; // fuera del rango

        const isOverdue = taskDate < todayStart;
        const daysToLaunch = Math.ceil((launchDate - todayStart) / (1000*60*60*24));

        plan[targetKey].tasks.push({
          type: 'launch',
          priority: isOverdue ? 'high' : (task.days <= 7 ? 'high' : 'medium'),
          launchName: launch.name,
          launchId: launch.id,
          taskIdx: idx,
          text: task.text,
          cat: task.cat,
          durationMin: 45,
          hint: isOverdue 
            ? `⚠ atrasada · ${launch.name} en ${daysToLaunch}d` 
            : `${launch.name} · faltan ${daysToLaunch}d`,
          isOverdue,
        });
      });
    });

    // ═══ 3. TAREAS LIBRES · las pendientes aparecen en hoy ═══
    const freeTasks = Array.isArray(state.tasks) ? state.tasks.filter(t => !t.done) : [];
    freeTasks.forEach(t => {
      const todayKey = todayStart.toISOString().split('T')[0];
      plan[todayKey].tasks.push({
        type: 'free',
        priority: 'medium',
        text: t.text,
        taskId: t.id,
        durationMin: 15,
      });
    });

    return plan;
  };

  const plan = buildPlan();

  // Ordenar tareas dentro de cada día: primero atrasadas, luego alta prioridad, luego por tipo
  const priorityOrder = {high: 0, medium: 1, low: 2};
  const typeOrder = {launch: 0, content: 1, free: 2};
  Object.values(plan).forEach(day => {
    day.tasks.sort((a,b) => {
      if (a.isOverdue && !b.isOverdue) return -1;
      if (!a.isOverdue && b.isOverdue) return 1;
      const pa = priorityOrder[a.priority] ?? 2;
      const pb = priorityOrder[b.priority] ?? 2;
      if (pa !== pb) return pa - pb;
      const ta = typeOrder[a.type] ?? 99;
      const tb = typeOrder[b.type] ?? 99;
      return ta - tb;
    });
  });

  // Handlers de completar tareas según tipo
  const toggleContent = (task) => {
    update(s => {
      const key = `${task.pf}:${task.postId}`;
      if (!s.posts[key]) s.posts[key] = {};
      s.posts[key].status = 'creating'; // marcar en proceso
    });
  };

  const markContentDone = (task) => {
    update(s => {
      const key = `${task.pf}:${task.postId}`;
      if (!s.posts[key]) s.posts[key] = {};
      s.posts[key].status = 'scheduled'; // marcar programado (listo para publicar)
    });
  };

  const toggleLaunch = (task) => {
    update(s => {
      if (!s.launches) s.launches = {};
      if (!s.launches[task.launchId]) s.launches[task.launchId] = {};
      s.launches[task.launchId][task.taskIdx] = !s.launches[task.launchId][task.taskIdx];
    });
  };

  const toggleFree = (taskId) => {
    update(s => {
      const t = (s.tasks || []).find(x => x.id === taskId);
      if (t) t.done = !t.done;
    });
  };

  const toggleStoriesBatch = (batchKey) => {
    update(s => {
      if (!s.storiesBatches) s.storiesBatches = {};
      s.storiesBatches[batchKey] = !s.storiesBatches[batchKey];
    });
  };

  // Mover tarea de contenido a una fecha concreta (o null para volver al default del viernes)
  const moveTaskToDate = (taskKey, dateStr) => {
    update(s => {
      if (!s.taskAssignments) s.taskAssignments = {};
      if (dateStr === null) {
        delete s.taskAssignments[taskKey];
      } else {
        s.taskAssignments[taskKey] = dateStr;
      }
    });
  };

  // Revertir cualquier tarea ya hecha (para cuando se marca sin querer)
  const revertContent = (task) => {
    update(s => {
      const key = `${task.pf}:${task.postId}`;
      if (!s.posts[key]) s.posts[key] = {};
      s.posts[key].status = 'pending';
    });
  };

  const catColors = {
    'definición': {bg: C.igBg, color: C.igDark},
    'entregables': {bg: C.liBg, color: C.liDark},
    'infra': {bg: C.ttBg, color: C.ttDark},
    'contenido': {bg: C.ssBg, color: C.ssDark},
    'venta': {bg: C.accentSoft, color: C.accent},
    'test': {bg: C.bgSoft, color: C.inkSoft},
    'launch': {bg: '#FFE8D1', color: '#B87733'}
  };

  const pfColors = {
    instagram: {bg: C.igBg, color: C.igDark},
    linkedin: {bg: C.liBg, color: C.liDark},
    substack: {bg: C.ssBg, color: C.ssDark},
  };

  // Días con tareas
  const daysWithTasks = Object.values(plan).filter(d => d.tasks.length > 0);
  const emptyDays = Object.values(plan).filter(d => d.tasks.length === 0).length;

  // Total tareas agrupadas
  const allTasks = daysWithTasks.flatMap(d => d.tasks);
  const overdueTotal = allTasks.filter(t => t.isOverdue).length;

  return (
    <div>
      {!embedded && (
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
            principal
          </div>
          <H size="lg" style={{fontStyle:'italic'}}>
            mi plan <CalIcon size={22} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/>
          </H>
          <div style={{fontSize:13, color:C.inkSoft, marginTop:8, maxWidth:640, lineHeight:1.6}}>
            todas las tareas concretas que tienes que hacer, organizadas por día · sin pensar qué toca, solo hacer ♡
          </div>
        </div>
      )}

      {/* Resumen arriba */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:10, marginBottom:20}}>
        <Card style={{padding:14, background: overdueTotal > 0 ? '#FFF1F1' : C.card, border: overdueTotal > 0 ? '1px solid #F0C8C8' : `1px solid ${C.border}`}}>
          <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
            atrasadas
          </div>
          <div style={{fontSize:24, fontFamily:"'Fraunces', serif", color: overdueTotal > 0 ? '#B04545' : C.ink, marginTop:4}}>
            {overdueTotal}
          </div>
        </Card>
        <Card style={{padding:14}}>
          <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
            total pendientes
          </div>
          <div style={{fontSize:24, fontFamily:"'Fraunces', serif", color:C.ink, marginTop:4}}>
            {allTasks.length}
          </div>
        </Card>
        <Card style={{padding:14}}>
          <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
            días con tareas
          </div>
          <div style={{fontSize:24, fontFamily:"'Fraunces', serif", color:C.ink, marginTop:4}}>
            {daysWithTasks.length}
            <span style={{fontSize:12, color:C.inkSoft, marginLeft:6}}>/ {daysRange}</span>
          </div>
        </Card>
        <Card style={{padding:14}}>
          <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600}}>
            rango
          </div>
          <div style={{display:'flex', gap:6, marginTop:8}}>
            {[7, 15, 30].map(n => (
              <button key={n} onClick={() => setDaysRange(n)} style={{
                padding:'4px 10px', border:'none', borderRadius:100,
                background: daysRange === n ? C.accent : C.bgSoft,
                color: daysRange === n ? '#fff' : C.inkSoft,
                fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500
              }}>{n}d</button>
            ))}
          </div>
        </Card>
      </div>

      {/* Leyenda */}
      <Card style={{marginBottom:16, padding:12, background:C.bgSoft, border:'none'}}>
        <div style={{fontSize:11, color:C.inkSoft, lineHeight:1.6}}>
          <strong style={{color:C.ink, fontWeight:600}}>tipos de tarea:</strong>
          <span style={{marginLeft:8, display:'inline-flex', alignItems:'center', gap:6}}>
            <span style={{width:8, height:8, background:'#B87733', borderRadius:100, display:'inline-block'}}/>
            lanzamiento
          </span>
          <span style={{marginLeft:14, display:'inline-flex', alignItems:'center', gap:6}}>
            <span style={{width:8, height:8, background:C.igDark, borderRadius:100, display:'inline-block'}}/>
            contenido
          </span>
          <span style={{marginLeft:14, display:'inline-flex', alignItems:'center', gap:6}}>
            <span style={{width:8, height:8, background:C.accent, borderRadius:100, display:'inline-block'}}/>
            tarea libre
          </span>
        </div>
      </Card>

      {/* Días */}
      {daysWithTasks.length === 0 ? (
        <Card style={{textAlign:'center', padding:40, color:C.inkSoft}}>
          <div style={{fontSize:14, fontStyle:'italic', marginBottom:6}}>no hay tareas pendientes en los próximos {daysRange} días ✧</div>
          <div style={{fontSize:12}}>disfruta el respiro ♡</div>
        </Card>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          {daysWithTasks.map(day => {
            const key = day.date.toISOString().split('T')[0];
            const isToday = day.date.getTime() === todayStart.getTime();
            const overdueInDay = day.tasks.filter(t => t.isOverdue).length;
            const totalMinutes = day.tasks.reduce((sum, t) => sum + (t.durationMin || 0), 0);
            const totalHours = totalMinutes >= 60 ? `~${Math.round(totalMinutes/60 * 10)/10}h` : `~${totalMinutes}min`;
            return (
              <div key={key}>
                <div style={{
                  display:'flex', alignItems:'baseline', justifyContent:'space-between', 
                  marginBottom:10, paddingBottom:6, borderBottom:`1px solid ${C.border}`
                }}>
                  <div style={{
                    fontFamily:"'Fraunces', serif", fontSize: isToday ? 18 : 15, 
                    fontWeight:500, color: isToday ? C.accent : C.ink, 
                    fontStyle:'italic', textTransform: isToday ? 'uppercase' : 'none',
                    letterSpacing: isToday ? 1 : 0
                  }}>
                    {formatDay(day.date)}
                  </div>
                  <div style={{fontSize:11, color:C.inkSoft}}>
                    {day.tasks.length} {day.tasks.length === 1 ? 'tarea' : 'tareas'} · <strong style={{color:C.ink, fontWeight:600}}>{totalHours}</strong>
                    {overdueInDay > 0 && <span style={{color:'#B04545', marginLeft:6, fontWeight:600}}>· {overdueInDay} atrasada{overdueInDay > 1 ? 's' : ''}</span>}
                  </div>
                </div>

                <div style={{display:'flex', flexDirection:'column', gap:6}}>
                  {day.tasks.map((task, i) => {
                    if (task.type === 'content') {
                      const pf = pfColors[task.pf] || {bg:C.bgSoft, color:C.inkSoft};
                      return (
                        <Card key={`${task.type}-${i}`} style={{
                          padding:'10px 14px', borderLeft:`3px solid ${pf.color}`
                        }}>
                          <div style={{display:'flex', alignItems:'flex-start', gap:10}}>
                            <div style={{display:'flex', gap:4, flexShrink:0, marginTop:2}}>
                              <button onClick={() => toggleContent(task)}
                                title="marcar en proceso"
                                style={{
                                  width:22, height:22, borderRadius:6, border:'none', cursor:'pointer',
                                  background: C.bgSoft, fontSize:12, color:C.inkSoft, fontFamily:'inherit'
                                }}>◐</button>
                              <button onClick={() => markContentDone(task)}
                                title="marcar listo"
                                style={{
                                  width:22, height:22, borderRadius:6, border:'none', cursor:'pointer',
                                  background: C.bgSoft, fontSize:12, color:C.inkSoft, fontFamily:'inherit'
                                }}>✓</button>
                            </div>
                            <div style={{flex:1, minWidth:0}}>
                              <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:3, flexWrap:'wrap'}}>
                                <Badge bg={pf.bg} color={pf.color} style={{fontSize:9}}>
                                  {task.pfLabel}
                                </Badge>
                                <span style={{fontSize:10, color:C.inkSoft}}>
                                  publica {task.daysUntilPub === 0 ? 'hoy' : task.daysUntilPub === 1 ? 'mañana' : `en ${task.daysUntilPub}d`}
                                </span>
                                {task.durationMin && (
                                  <span style={{fontSize:10, color:C.inkSoft, background:C.bgSoft, padding:'2px 7px', borderRadius:100}}>
                                    ~{task.durationMin}min
                                  </span>
                                )}
                                {task.hint && <span style={{fontSize:10, color:C.creating, fontStyle:'italic'}}>{task.hint}</span>}
                                {task.isManuallyMoved && (
                                  <span style={{fontSize:9, color:C.accent, fontStyle:'italic', padding:'1px 6px', background:C.accentSoft, borderRadius:100}}>
                                    movida
                                  </span>
                                )}
                              </div>
                              <div style={{fontSize:13, color:C.ink, lineHeight:1.4, marginBottom:6}}>
                                {task.text}
                              </div>
                              <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                                <button onClick={() => {
                                  // Mover al día siguiente
                                  const nextDay = new Date(day.date);
                                  nextDay.setDate(nextDay.getDate() + 1);
                                  moveTaskToDate(task.taskKey, nextDay.toISOString().split('T')[0]);
                                }} style={{
                                  fontSize:10, padding:'3px 8px', border:`1px solid ${C.border}`,
                                  background:'transparent', color:C.inkSoft, borderRadius:100,
                                  cursor:'pointer', fontFamily:'inherit'
                                }} title="mover al día siguiente">→ mover día</button>
                                {task.isManuallyMoved && (
                                  <button onClick={() => moveTaskToDate(task.taskKey, null)} style={{
                                    fontSize:10, padding:'3px 8px', border:`1px solid ${C.border}`,
                                    background:'transparent', color:C.inkSoft, borderRadius:100,
                                    cursor:'pointer', fontFamily:'inherit'
                                  }} title="volver al viernes por defecto">↺ default</button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    } else if (task.type === 'launch') {
                      const cat = catColors[task.cat] || catColors['test'];
                      return (
                        <Card key={`${task.type}-${i}`} onClick={() => toggleLaunch(task)} style={{
                          padding:'10px 14px', cursor:'pointer',
                          background: task.isOverdue ? '#FFF1F1' : C.card,
                          border: task.isOverdue ? '1px solid #F0C8C8' : `1px solid ${C.border}`,
                          borderLeft:`3px solid #B87733`
                        }}>
                          <div style={{display:'flex', alignItems:'flex-start', gap:10}}>
                            <div style={{
                              width:22, height:22, borderRadius:6, flexShrink:0, marginTop:2,
                              border:`2px solid ${C.border}`, background:'transparent'
                            }}/>
                            <div style={{flex:1, minWidth:0}}>
                              <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:3, flexWrap:'wrap'}}>
                                <Badge bg="#FFE8D1" color="#B87733" style={{fontSize:9}}>
                                  lanzamiento
                                </Badge>
                                {task.cat && (
                                  <span style={{fontSize:9, padding:'2px 7px', borderRadius:100,
                                    background: cat.bg, color: cat.color, fontWeight:600, textTransform:'uppercase', letterSpacing:0.3}}>
                                    {task.cat}
                                  </span>
                                )}
                                <span style={{fontSize:10, color: task.isOverdue ? '#B04545' : C.inkSoft, fontStyle:'italic', fontWeight: task.isOverdue ? 600 : 400}}>
                                  {task.hint}
                                </span>
                              </div>
                              <div style={{fontSize:13, color:C.ink, lineHeight:1.4}}>
                                {task.text}
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    } else if (task.type === 'stories') {
                      return (
                        <Card key={`${task.type}-${i}`} onClick={() => toggleStoriesBatch(task.batchKey)} style={{
                          padding:'10px 14px', borderLeft:`3px solid ${C.igDark}`, cursor:'pointer'
                        }}>
                          <div style={{display:'flex', alignItems:'flex-start', gap:10}}>
                            <div style={{
                              width:22, height:22, borderRadius:6, flexShrink:0, marginTop:2,
                              border:`2px solid ${C.border}`, background:'transparent'
                            }}/>
                            <div style={{flex:1, minWidth:0}}>
                              <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:3, flexWrap:'wrap'}}>
                                <Badge bg={C.igBg} color={C.igDark} style={{fontSize:9}}>
                                  ♡ stories IG
                                </Badge>
                                {task.hint && <span style={{fontSize:10, color:C.inkSoft, fontStyle:'italic'}}>{task.hint}</span>}
                              </div>
                              <div style={{fontSize:13, color:C.ink, lineHeight:1.4}}>
                                {task.text}
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    } else if (task.type === 'free') {
                      return (
                        <Card key={`${task.type}-${i}`} onClick={() => toggleFree(task.taskId)} style={{
                          padding:'10px 14px', borderLeft:`3px solid ${C.accent}`, cursor:'pointer'
                        }}>
                          <div style={{display:'flex', alignItems:'flex-start', gap:10}}>
                            <div style={{
                              width:22, height:22, borderRadius:11, flexShrink:0, marginTop:2,
                              border:`2px solid ${C.border}`, background:'transparent'
                            }}/>
                            <div style={{flex:1, minWidth:0}}>
                              <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:3}}>
                                <Badge bg={C.accentSoft} color={C.accent} style={{fontSize:9}}>
                                  tarea libre
                                </Badge>
                              </div>
                              <div style={{fontSize:13, color:C.ink, lineHeight:1.4}}>
                                {task.text}
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tareas completadas · con opción de deshacer */}
      {(() => {
        const completed = [];
        // Content posts en estado scheduled o creating
        [
          ...D.posts.ig.map(p => ({...p, pf:'instagram', pfLabel:'IG'})),
          ...D.posts.li.map(p => ({...p, pf:'linkedin', pfLabel:'LinkedIn'})),
          ...D.posts.ss.map(p => ({...p, pf:'substack', pfLabel:'Substack'})),
        ].forEach(p => {
          const st = state.posts[`${p.pf}:${p.i}`]?.status;
          if (st === 'scheduled' || st === 'creating') {
            const pubDate = parseDate(p.d);
            if (pubDate && pubDate >= todayStart) {
              completed.push({
                type: 'content',
                label: `${p.pfLabel} · ${(p.ti || p.su || '').slice(0,40)}`,
                status: st,
                pf: p.pf,
                postId: p.i,
              });
            }
          }
        });
        // Launch tasks checked
        LAUNCHES_CONFIG.forEach(launch => {
          const checklist = LAUNCH_CHECKLISTS[launch.checklistKey] || [];
          checklist.forEach((task, idx) => {
            const checked = !!(state.launches && state.launches[launch.id] && state.launches[launch.id][idx]);
            if (checked) {
              completed.push({
                type: 'launch',
                label: `${launch.name.replace('Lanzamiento ','')} · ${task.text.slice(0,40)}`,
                launchId: launch.id,
                taskIdx: idx,
              });
            }
          });
        });
        // Stories batches done
        if (state.storiesBatches) {
          Object.keys(state.storiesBatches).forEach(k => {
            if (state.storiesBatches[k]) {
              const dateStr = k.replace('stories:','');
              const d = new Date(dateStr);
              if (d >= todayStart) {
                completed.push({
                  type: 'stories',
                  label: `stories batch del ${d.getDate()} ${mesesShort[d.getMonth()]}`,
                  batchKey: k,
                });
              }
            }
          });
        }

        if (completed.length === 0) return null;
        return (
          <Card style={{marginTop:24, borderLeft:`3px solid ${C.published}`}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, flexWrap:'wrap', gap:8}}>
              <div>
                <div style={{fontSize:10, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
                  ✓ completadas
                </div>
                <H size="sm" style={{fontStyle:'italic'}}>
                  {completed.length} {completed.length === 1 ? 'tarea hecha' : 'tareas hechas'}
                </H>
              </div>
              <div style={{fontSize:11, color:C.inkSoft, fontStyle:'italic'}}>
                clic en una tarea para deshacer si la marcaste sin querer
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:6}}>
              {completed.map((c, i) => (
                <div key={i} onClick={() => {
                  if (c.type === 'content') revertContent({pf: c.pf, postId: c.postId});
                  if (c.type === 'launch') toggleLaunch({launchId: c.launchId, taskIdx: c.taskIdx});
                  if (c.type === 'stories') toggleStoriesBatch(c.batchKey);
                }} style={{
                  display:'flex', alignItems:'center', gap:10, padding:'8px 12px',
                  background: C.bgSoft, borderRadius:8, cursor:'pointer',
                  opacity: 0.75
                }} title="clic para deshacer">
                  <span style={{
                    width:18, height:18, borderRadius:4, background:C.published,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#fff', fontSize:11, flexShrink:0
                  }}>✓</span>
                  <span style={{flex:1, fontSize:12, color:C.ink, textDecoration:'line-through'}}>
                    {c.label}
                  </span>
                  <span style={{fontSize:11, color:C.inkSoft}}>↺ deshacer</span>
                </div>
              ))}
            </div>
          </Card>
        );
      })()}

      {/* Footer explicativo */}
      {!embedded && (
        <Card style={{marginTop:24, background:C.bgSoft, border:'none'}}>
          <H size="sm" style={{marginBottom:10}}>cómo funciona este plan</H>
          <div style={{fontSize:13, color:C.ink, lineHeight:1.7}}>
            <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ contenido</strong> · aparece 9 días antes de publicación · trabajas con 1 semana de adelanto · ◐ en proceso · ✓ listo para publicar</div>
            <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ stories IG</strong> · 2 batches/semana · miércoles (jue-sáb) + domingo (lun-mié)</div>
            <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ lanzamientos</strong> · tareas del checklist según fecha objetivo · si están atrasadas aparecen en rojo en HOY</div>
            <div style={{marginBottom:6}}><strong style={{fontWeight:600}}>♡ tareas libres</strong> · las que añades manualmente en "to do" aparecen todas en HOY hasta que las marques</div>
            <div style={{marginBottom:12}}><strong style={{fontWeight:600}}>♡ deshacer</strong> · si marcas una tarea sin querer, aparece en la sección "completadas" abajo · clic y vuelve al plan</div>
            <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic', paddingTop:12, borderTop:`1px solid ${C.borderSoft}`}}>
              este plan es dinámico: si hoy no haces una tarea de lanzamiento, mañana aparece en HOY como atrasada. no pasa nada, la vida es así ♡
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// THIS WEEK VIEW — todo lo de esta semana en una vista
// ═══════════════════════════════════════════════════════════════════
function ThisWeekView({setView, setMonth}) {
  const [state, update] = useAppState();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Calcular lunes y domingo de esta semana
  const dayOfWeek = todayStart.getDay() === 0 ? 6 : todayStart.getDay() - 1; // mon=0
  const monday = new Date(todayStart);
  monday.setDate(monday.getDate() - dayOfWeek);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  const parseDate = (d) => {
    if (!d) return null;
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m-1, day);
  };

  const mesesShort = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const diasSemNom = ['dom','lun','mar','mié','jue','vie','sáb'];
  
  // Posts de la semana (todas las plataformas)
  const weekPosts = [];
  [
    ...D.posts.ig.map(p => ({...p, _pf:'instagram'})),
    ...D.posts.li.map(p => ({...p, _pf:'linkedin'})),
    ...D.posts.ss.map(p => ({...p, _pf:'substack'})),
  ].forEach(p => {
    const dt = parseDate(p.d);
    if (dt && dt >= monday && dt <= sunday) {
      weekPosts.push({...p, _dt: dt});
    }
  });
  weekPosts.sort((a,b) => a._dt - b._dt);

  // Status
  const getStatus = (p) => effectiveStatus(p, p._pf, state, now);
  const setStatus = (p, status) => update(s => {
    const k = `${p._pf}:${p.i}`;
    if (!s.posts[k]) s.posts[k] = {};
    s.posts[k].status = status;
  });

  // Agrupar por día
  const byDay = {};
  weekPosts.forEach(p => {
    const k = p.d;
    if (!byDay[k]) byDay[k] = [];
    byDay[k].push(p);
  });

  // Generar 7 días
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    const k = d.toISOString().split('T')[0];
    days.push({
      date: d,
      key: k,
      isToday: d.getTime() === todayStart.getTime(),
      isPast: d < todayStart,
      posts: byDay[k] || []
    });
  }

  // Stats
  const totalPosts = weekPosts.length;
  const publishedPosts = weekPosts.filter(p => getStatus(p) === 'published').length;
  const scheduledPosts = weekPosts.filter(p => getStatus(p) === 'scheduled').length;
  const pendingPosts = weekPosts.filter(p => {
    const s = getStatus(p);
    return s !== 'published' && s !== 'scheduled';
  }).length;
  const progress = totalPosts > 0 ? ((publishedPosts + scheduledPosts) / totalPosts) * 100 : 0;

  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          principal
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>
          esta semana <CalIcon size={22} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/>
        </H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:8, fontStyle:'italic'}}>
          {monday.getDate()} {mesesShort[monday.getMonth()]} → {sunday.getDate()} {mesesShort[sunday.getMonth()]} · todo lo que toca esta semana, en un solo sitio ♡
        </div>
      </div>

      {/* Resumen de la semana · barra de progreso */}
      <Card style={{marginBottom:20, padding:18}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14, flexWrap:'wrap', gap:8}}>
          <H size="sm" style={{margin:0}}>progreso semanal</H>
          <div style={{fontSize:14, fontFamily:"'Fraunces', serif", color:C.accent, fontWeight:500}}>
            {publishedPosts + scheduledPosts}/{totalPosts} hechos
          </div>
        </div>
        <div style={{height:8, background:C.bgSoft, borderRadius:100, overflow:'hidden', marginBottom:10}}>
          <div style={{
            height:'100%', width: `${progress}%`,
            background: progress >= 100 ? C.published : `linear-gradient(90deg, ${C.accent}, ${C.igDark})`,
            transition:'width 0.3s'
          }}/>
        </div>
        <div style={{display:'flex', gap:14, fontSize:11, color:C.inkSoft, flexWrap:'wrap'}}>
          <span>✓ {publishedPosts} publicados</span>
          <span>📅 {scheduledPosts} programados</span>
          <span>○ {pendingPosts} por crear</span>
        </div>
      </Card>

      {/* Días de la semana */}
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {days.map(day => {
          if (day.posts.length === 0 && !day.isToday) {
            return (
              <div key={day.key} style={{
                padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center',
                background: day.isPast ? 'transparent' : C.bgSoft + '60', 
                borderRadius:10, opacity: day.isPast ? 0.4 : 0.7
              }}>
                <div style={{fontSize:13, color: C.inkSoft, fontStyle:'italic'}}>
                  {diasSemNom[day.date.getDay()]} {day.date.getDate()} {mesesShort[day.date.getMonth()]}
                </div>
                <div style={{fontSize:11, color:C.inkSoft, fontStyle:'italic'}}>
                  sin contenido programado
                </div>
              </div>
            );
          }
          return (
            <div key={day.key}>
              <div style={{
                display:'flex', alignItems:'baseline', justifyContent:'space-between',
                marginBottom:8, paddingBottom:6, borderBottom:`1px solid ${C.border}`
              }}>
                <div style={{
                  fontFamily:"'Fraunces', serif", 
                  fontSize: day.isToday ? 18 : 14,
                  fontWeight: day.isToday ? 600 : 500, 
                  color: day.isToday ? C.accent : (day.isPast ? C.inkSoft : C.ink),
                  fontStyle: day.isToday ? 'italic' : 'normal',
                  textTransform: day.isToday ? 'uppercase' : 'none',
                  letterSpacing: day.isToday ? 1 : 0
                }}>
                  {day.isToday ? `hoy · ` : ''}{diasSemNom[day.date.getDay()]} {day.date.getDate()} {mesesShort[day.date.getMonth()]}
                </div>
                <div style={{fontSize:11, color:C.inkSoft}}>
                  {day.posts.length} {day.posts.length === 1 ? 'post' : 'posts'}
                </div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:6}}>
                {day.posts.map((p, i) => {
                  const pf = PLATFORMS[p._pf];
                  const status = getStatus(p);
                  const isDone = status === 'published';
                  const isScheduled = status === 'scheduled';
                  const isCreating = status === 'creating';
                  
                  return (
                    <div key={i} style={{
                      display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
                      background: isDone ? C.published+'15' : isScheduled ? '#F0F6FA' : C.card,
                      borderRadius:10,
                      border:`1px solid ${C.border}`,
                      borderLeft:`3px solid ${pf.dark}`,
                      opacity: isDone ? 0.7 : 1,
                      cursor:'pointer'
                    }} onClick={() => {
                      // Click para cambiar status: pending → creating → scheduled → published → pending
                      const cycle = {pending:'creating', creating:'scheduled', scheduled:'published', published:'pending'};
                      setStatus(p, cycle[status] || 'creating');
                    }}>
                      <span style={{
                        fontSize:11, padding:'2px 8px', background:pf.bg, color:pf.dark,
                        borderRadius:100, fontWeight:500, flexShrink:0
                      }}>{pf.short}</span>
                      <span style={{fontSize:11, color:C.inkSoft, flexShrink:0}}>
                        {p.tm}
                      </span>
                      <span style={{
                        flex:1, fontSize:13, color:C.ink,
                        textDecoration: isDone ? 'line-through' : 'none',
                        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
                      }}>
                        {p.ti || p.su}
                      </span>
                      <span style={{
                        fontSize:11, padding:'2px 8px', borderRadius:100,
                        background: isDone ? C.published : isScheduled ? '#7BA2C2' : isCreating ? C.creating : C.bgSoft,
                        color: isDone || isScheduled || isCreating ? '#fff' : C.inkSoft,
                        fontWeight:600, flexShrink:0
                      }}>
                        {isDone ? '✓ publicado' : isScheduled ? '📅 programado' : isCreating ? '◐ haciéndolo' : '○ por crear'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Acceso rápido a to do */}
      <Card style={{marginTop:24, background:C.bgSoft, border:'none', textAlign:'center'}}>
        <div style={{fontSize:12, color:C.inkSoft, marginBottom:10, fontStyle:'italic'}}>
          ¿quieres ver todo lo de los próximos 15 días? lanzamientos, tareas libres, stories...
        </div>
        <Btn variant="accent" onClick={() => setView('tasks')}>
          ir a "to do" →
        </Btn>
      </Card>

      <div style={{fontSize:11, color:C.inkSoft, marginTop:20, fontStyle:'italic', textAlign:'center'}}>
        ✦ clic sobre un post para cambiar su estado · ○ por crear → ◐ haciéndolo → 📅 programado → ✓ publicado
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// BACKUP — exportar/importar state para no perder los datos
// ═══════════════════════════════════════════════════════════════════

const BACKUP_VERSION = 1;
const BACKUP_LAST_KEY = '__lastBackupAt';

function getLastBackupDate() {
  try {
    const v = localStorage.getItem(BACKUP_LAST_KEY);
    if (!v) return null;
    return new Date(v);
  } catch { return null; }
}

function setLastBackupDate(date) {
  try { localStorage.setItem(BACKUP_LAST_KEY, date.toISOString()); } catch {}
}

function exportBackup(state) {
  const payload = {
    __version: BACKUP_VERSION,
    __exportedAt: new Date().toISOString(),
    __app: 'dramas-laborales-dashboard',
    state: state
  };
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = (today.getMonth()+1).toString().padStart(2,'0');
  const dd = today.getDate().toString().padStart(2,'0');
  a.href = url;
  a.download = `dramas-laborales-backup-${yyyy}-${mm}-${dd}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  setLastBackupDate(today);
}

function importBackup(file, update, onDone) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.__app !== 'dramas-laborales-dashboard') {
        onDone({ok: false, error: 'Este archivo no parece ser un backup válido del dashboard.'});
        return;
      }
      if (!parsed.state || typeof parsed.state !== 'object') {
        onDone({ok: false, error: 'No se encontró state en el archivo.'});
        return;
      }
      // Sustituir todo el state
      update(s => {
        Object.keys(s).forEach(k => delete s[k]);
        Object.assign(s, parsed.state);
      });
      onDone({ok: true, exportedAt: parsed.__exportedAt});
    } catch (err) {
      onDone({ok: false, error: 'No se pudo leer el archivo: ' + err.message});
    }
  };
  reader.onerror = () => onDone({ok: false, error: 'Error leyendo el archivo'});
  reader.readAsText(file);
}

// ─── Mini caja de backup reutilizable ───
function BackupBox({compact = false}) {
  const [state, update] = useAppState();
  const [importMsg, setImportMsg] = useState(null);
  const fileInputRef = useRef(null);
  const lastBackup = getLastBackupDate();
  const now = new Date();
  const daysSinceBackup = lastBackup 
    ? Math.floor((now - lastBackup) / (1000*60*60*24))
    : null;
  const needsBackup = !lastBackup || daysSinceBackup >= 7;

  const handleExport = () => {
    exportBackup(state);
    // Reset change counter
    try {
      if (window.localStorage) {
        window.localStorage.setItem('__unsaved_changes', '0');
      }
    } catch {}
    setTimeout(() => setImportMsg({ok: true, exported: true}), 100);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!confirm('¿Seguro? Esto reemplazará TODOS tus datos actuales con los del archivo. Esta acción no se puede deshacer.')) {
      return;
    }
    importBackup(file, update, (result) => {
      setImportMsg(result);
      e.target.value = ''; // reset input
    });
  };

  if (compact) {
    return (
      <div style={{
        display:'flex', flexDirection:'column', gap:8, padding:'12px 14px',
        background: needsBackup ? '#FFF1E8' : '#F0FBF4',
        borderRadius:12, border: needsBackup ? '2px solid #F0C8A8' : '2px solid #A8D5B5'
      }}>
        {(() => {
          let unsaved = 0;
          try { unsaved = parseInt(window.localStorage?.getItem('__unsaved_changes') || '0'); } catch {}
          return unsaved > 5 ? (
            <div style={{
              display:'flex', alignItems:'center', gap:8, padding:'6px 10px',
              background:'rgba(232,145,165,0.15)', borderRadius:8, marginBottom:4,
              fontSize:11, color:C.accent, fontWeight:600
            }}>
              <span>💾</span>
              <span>{unsaved} cambios sin guardar en backup · descárgalo cuando puedas ♡</span>
            </div>
          ) : null;
        })()}
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:16}}>{needsBackup ? '⚠️' : '✅'}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:12, color:C.ink, fontWeight:600}}>
              {needsBackup
                ? (lastBackup ? `⚠ hace ${daysSinceBackup} días sin backup` : '⚠ aún no tienes backup')
                : `✓ guardado en este navegador · backup hace ${daysSinceBackup === 0 ? 'hoy' : daysSinceBackup + ' días'}`}
            </div>
            <div style={{fontSize:10, color:C.inkSoft, marginTop:2}}>
              tus datos viven en este navegador · descarga backup para protegerlos
            </div>
          </div>
          <button onClick={handleExport} style={{
            padding:'7px 14px', border:'none', borderRadius:100,
            background: needsBackup ? '#B87733' : C.accent,
            color:'#fff', fontSize:11, cursor:'pointer',
            fontFamily:'inherit', fontWeight:600, flexShrink:0,
            boxShadow: needsBackup ? '0 2px 8px rgba(184,119,51,0.3)' : '0 2px 8px rgba(232,145,165,0.3)'
          }}>💾 guardar backup</button>
        </div>
        {needsBackup && (
          <div style={{
            fontSize:10, color:'#B87733', fontWeight:500,
            padding:'6px 10px', background:'rgba(240,200,168,0.3)', borderRadius:8
          }}>
            📌 guarda un backup y súbelo a Google Drive · así nunca pierdes nada aunque cambies de dispositivo
          </div>
        )}
      </div>
    );
  }

  return (
    <Card style={{padding:24}}>
      <div style={{
        fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', 
        fontWeight:600, marginBottom:6
      }}>
        ✦ copias de seguridad
      </div>
      <H size="md" style={{fontStyle:'italic', marginBottom:14}}>
        protege todo tu trabajo ♡
      </H>
      <div style={{fontSize:13, color:C.ink, marginBottom:18, lineHeight:1.6, maxWidth:600}}>
        cada vez que marcas un post como hecho, metes métricas, anotas un aprendizaje o editas un copy, esos datos se guardan en este navegador. si cambias de móvil/ordenador o limpias el caché, se pierden.
        <br/><br/>
        <strong style={{color:C.accent, fontWeight:600}}>solución</strong>: descarga un backup cada domingo. es un archivo pequeño que puedes guardar en drive, mail o donde quieras. si pasa algo, lo importas y recuperas todo.
      </div>

      {/* Estado actual */}
      <div style={{
        padding:'14px 16px', background: needsBackup ? '#FFF1E8' : '#F0F8F0',
        borderRadius:10, border: needsBackup ? '1px solid #F0C8A8' : '1px solid #C5D9C0',
        marginBottom:16
      }}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:4}}>
          {needsBackup ? '⚠️ atención' : '♡ estado'}
        </div>
        <div style={{fontSize:14, color:C.ink, fontWeight:500}}>
          {lastBackup 
            ? `último backup: hace ${daysSinceBackup} ${daysSinceBackup === 1 ? 'día' : 'días'} (${lastBackup.toLocaleDateString('es-ES')})`
            : 'aún no has hecho ningún backup'}
        </div>
        {needsBackup && (
          <div style={{fontSize:12, color:'#B87733', marginTop:6, fontStyle:'italic'}}>
            te recomiendo hacer uno hoy mismo
          </div>
        )}
      </div>

      <div style={{display:'flex', gap:10, flexWrap:'wrap', marginBottom:20}}>
        <button onClick={handleExport} style={{
          padding:'12px 20px', border:'none', borderRadius:100,
          background: C.accent, color:'#fff', fontSize:13, cursor:'pointer',
          fontFamily:'inherit', fontWeight:600
        }}>📥 descargar backup</button>
        <button onClick={handleImportClick} style={{
          padding:'12px 20px', border:`1px solid ${C.border}`, borderRadius:100,
          background:'transparent', color:C.ink, fontSize:13, cursor:'pointer',
          fontFamily:'inherit', fontWeight:500
        }}>📤 importar backup</button>
        <input
          type="file" 
          ref={fileInputRef}
          onChange={handleImportFile}
          accept=".json,application/json"
          style={{display:'none'}}
        />
      </div>

      {importMsg && (
        <div style={{
          padding:'10px 14px', borderRadius:10,
          background: importMsg.ok ? '#E0F0DC' : '#FFE0E0',
          color: importMsg.ok ? '#386338' : '#A03333',
          fontSize:12, marginBottom:14
        }}>
          {importMsg.exported && '✓ Backup descargado · guárdalo en un sitio seguro (drive, mail) ♡'}
          {importMsg.ok && !importMsg.exported && `✓ Backup importado correctamente · datos del ${new Date(importMsg.exportedAt).toLocaleDateString('es-ES')}`}
          {!importMsg.ok && `✗ ${importMsg.error}`}
        </div>
      )}

      <div style={{
        fontSize:11, color:C.inkSoft, fontStyle:'italic', lineHeight:1.6,
        paddingTop:14, borderTop:`1px solid ${C.borderSoft}`
      }}>
        ♡ <strong style={{fontWeight:600}}>qué se guarda</strong> · todos tus datos personales: estados de posts, métricas semanales, journals, ediciones de copys, hashtags activos, tareas marcadas, lanzamientos, batches de stories.
        <br/>♡ <strong style={{fontWeight:600}}>qué NO se guarda</strong> · el contenido planificado del archivo (eso ya está en el .jsx que tienes).
        <br/>♡ <strong style={{fontWeight:600}}>recomendación</strong> · domingo por la noche al meter métricas → backup → guardarlo en drive/mail.
      </div>
    </Card>
  );
}



// ═══════════════════════════════════════════════════════════════════
// SCHEDULE VIEW — kanban de programación
// ═══════════════════════════════════════════════════════════════════
function ScheduleView({month, setMonth}) {
  const [state, update] = useAppState();
  const [filterPf, setFilterPf] = useState('all');
  const now = new Date();

  const COLS = [
    { key:'pending',   label:'Pendiente',    emoji:'○',  color:'#C4A882', bg:'#FDF6EE' },
    { key:'creating',  label:'Creando',       emoji:'✏️', color:'#C4956A', bg:'#FEF0E4' },
    { key:'scheduled', label:'Programado',    emoji:'📅', color:'#7BA2C2', bg:'#EEF4FA' },
    { key:'manual',    label:'Publicar yo',   emoji:'🔔', color:'#9B6FA8', bg:'#F5EEF9' },
    { key:'published', label:'Publicado',     emoji:'✅', color:'#6BAE82', bg:'#EDF7F0' },
  ];
  const COLS_KEYS = COLS.map(c=>c.key);

  const tiktokReels = D.posts.ig.filter(p => /eel/i.test(p.t||'')).map(p=>({...p,pf:'tiktok'}));
  const deleted = new Set(state.deletedPosts||[]);
  const allPosts = [
    ...D.posts.ig.map(p=>({...p,pf:'instagram'})),
    ...D.posts.li.map(p=>({...p,pf:'linkedin'})),
    ...D.posts.ss.map(p=>({...p,pf:'substack'})),
    ...tiktokReels,
    ...(state.customPosts?.ig||[]).map(p=>({...p,pf:'instagram'})),
    ...(state.customPosts?.li||[]).map(p=>({...p,pf:'linkedin'})),
    ...(state.customPosts?.ss||[]).map(p=>({...p,pf:'substack'})),
  ].filter(p => !deleted.has(p.i) && !deleted.has(`${p.pf}:${p.i}`));

  const getStatus = (p) => effectiveStatus(p, p.pf, state, now);
  const setStatus = (p, st) => {
    const key = `${p.pf}:${p.i}`;
    update(s => { if(!s.posts[key]) s.posts[key]={}; s.posts[key].status=st; });
  };
  const moveForward = (p) => {
    const cur = COLS_KEYS.indexOf(getStatus(p));
    if (cur < COLS_KEYS.length-1) setStatus(p, COLS_KEYS[cur+1]);
  };
  const moveBack = (p) => {
    const cur = COLS_KEYS.indexOf(getStatus(p));
    if (cur > 0) setStatus(p, COLS_KEYS[cur-1]);
  };

  const monthPosts = allPosts.filter(p => p.m === month);
  const visiblePosts = filterPf === 'all' ? monthPosts : monthPosts.filter(p=>p.pf===filterPf);
  const published = visiblePosts.filter(p=>getStatus(p)==='published').length;
  const pct = visiblePosts.length > 0 ? Math.round(published/visiblePosts.length*100) : 0;
  const mesesShort = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const mNum = MONTHS_ES.find(m=>m.id===month)?.num||5;

  return (
    <div>
      {/* Header */}
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11,color:C.inkSoft,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>principal</div>
        <H size="lg" style={{fontStyle:'italic'}}>programación</H>
        <p style={{fontSize:13,color:C.inkSoft,marginTop:6,lineHeight:1.6,maxWidth:500}}>
          mueve cada post entre estados con las flechas · de izquierda a derecha es el flujo natural ♡
        </p>
      </div>

      {/* Filters row */}
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20,alignItems:'center'}}>
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {MONTHS_ES.map(m=>(
            <button key={m.id} onClick={()=>setMonth(m.id)} style={{
              padding:'5px 12px',border:'none',borderRadius:100,cursor:'pointer',
              background:month===m.id?C.ink:C.bgSoft,
              color:month===m.id?C.bg:C.inkSoft,
              fontSize:11,fontFamily:'inherit',fontWeight:month===m.id?600:400,
              transition:'all 0.15s'
            }}>{m.n.slice(0,3)}</button>
          ))}
        </div>
        <div style={{width:1,height:18,background:C.border,flexShrink:0}}/>
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {[['all','Todas'],['instagram','IG'],['linkedin','LI'],['substack','SS'],['tiktok','TT']].map(([pf,lbl])=>{
            const pfColor = pf==='all' ? C.ink : PLATFORMS[pf]?.dark||C.ink;
            return (
              <button key={pf} onClick={()=>setFilterPf(pf)} style={{
                padding:'5px 10px',border:`1px solid ${filterPf===pf?pfColor:C.border}`,
                borderRadius:100,cursor:'pointer',fontSize:11,fontFamily:'inherit',fontWeight:500,
                background:filterPf===pf?pfColor:C.card,
                color:filterPf===pf?'#fff':C.inkSoft,transition:'all 0.15s'
              }}>{lbl}</button>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        background:C.card,borderRadius:14,padding:'14px 18px',
        border:`1px solid ${C.border}`,marginBottom:24,
        display:'flex',alignItems:'center',gap:16
      }}>
        <div style={{flex:1}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:7}}>
            <span style={{fontSize:12,color:C.inkSoft}}>
              {mesesShort[mNum-1]} · {published} de {visiblePosts.length} publicados
            </span>
            <span style={{fontSize:13,fontWeight:700,color:C.accent}}>{pct}%</span>
          </div>
          <div style={{height:6,background:C.bgSoft,borderRadius:100,overflow:'hidden'}}>
            <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${C.accent},#6BAE82)`,borderRadius:100,transition:'width 0.4s'}}/>
          </div>
        </div>
        <div style={{display:'flex',gap:14,flexShrink:0}}>
          {COLS.map(col=>{
            const n = visiblePosts.filter(p=>getStatus(p)===col.key).length;
            return (
              <div key={col.key} style={{textAlign:'center',minWidth:28}}>
                <div style={{fontSize:14}}>{col.emoji}</div>
                <div style={{fontSize:12,fontWeight:700,color:n>0?C.ink:C.inkSoft}}>{n}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kanban */}
      <div style={{
        display:'grid',gridTemplateColumns:'repeat(5,minmax(210px,1fr))',
        gap:12,overflowX:'auto',paddingBottom:12
      }}>
        {COLS.map((col,colIdx) => {
          const colPosts = visiblePosts
            .filter(p=>getStatus(p)===col.key)
            .sort((a,b)=>(a.d||'').localeCompare(b.d||''));

          return (
            <div key={col.key} style={{display:'flex',flexDirection:'column',gap:0,minWidth:0}}>

              {/* Column header */}
              <div style={{
                padding:'10px 14px 10px',
                background:col.bg,
                border:`1px solid ${col.color}30`,
                borderBottom:`2px solid ${col.color}`,
                borderRadius:'12px 12px 0 0',
                display:'flex',alignItems:'center',gap:8
              }}>
                <span style={{fontSize:15}}>{col.emoji}</span>
                <span style={{fontSize:12,fontWeight:700,color:col.color,flex:1,letterSpacing:0.2}}>{col.label}</span>
                <span style={{
                  fontSize:11,fontWeight:700,color:'#fff',
                  background:col.color,padding:'1px 7px',borderRadius:100,flexShrink:0
                }}>{colPosts.length}</span>
              </div>

              {/* Column body */}
              <div style={{
                border:`1px solid ${col.color}20`,
                borderTop:'none',
                borderRadius:'0 0 12px 12px',
                background:col.bg+'88',
                padding:'8px 6px 10px',
                display:'flex',flexDirection:'column',gap:6,
                minHeight:240
              }}>
                {colPosts.length === 0 && (
                  <div style={{
                    flex:1,display:'flex',alignItems:'center',justifyContent:'center',
                    padding:20,color:C.inkSoft,fontSize:11,fontStyle:'italic',textAlign:'center',
                    opacity:0.6
                  }}>vacío</div>
                )}

                {colPosts.map((p,i) => {
                  const pf = PLATFORMS[p.pf] || PLATFORMS.instagram;
                  const d = p.d ? new Date(p.d) : null;
                  const dateStr = d ? `${['do','lu','ma','mi','ju','vi','sá'][d.getDay()]} ${d.getDate()} ${mesesShort[d.getMonth()]}` : '';
                  const prev = colIdx > 0 ? COLS[colIdx-1] : null;
                  const next = colIdx < COLS.length-1 ? COLS[colIdx+1] : null;

                  return (
                    <div key={i} style={{
                      background:C.card,
                      borderRadius:10,
                      border:`1px solid ${C.border}`,
                      borderLeft:`3px solid ${pf.dark}`,
                      overflow:'hidden',
                      boxShadow:'0 1px 4px rgba(0,0,0,0.04)'
                    }}>
                      {/* Card top */}
                      <div style={{padding:'9px 10px 8px'}}>
                        {/* Platform + date */}
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                          <span style={{
                            fontSize:9,fontWeight:700,letterSpacing:0.5,
                            color:'#fff',background:pf.dark,
                            padding:'2px 6px',borderRadius:4,textTransform:'uppercase'
                          }}>{pf.short}</span>
                          <span style={{fontSize:9,color:C.inkSoft}}>{dateStr}{p.tm?` · ${p.tm}`:''}</span>
                        </div>
                        {/* Title */}
                        <div style={{
                          fontSize:11,color:C.ink,lineHeight:1.45,fontWeight:500
                        }}>
                          {(p.ti||p.t||'sin título').slice(0,60)}{(p.ti||p.t||'').length>60&&'…'}
                        </div>
                        {p.t && p.ti && (
                          <div style={{fontSize:10,color:C.inkSoft,marginTop:2}}>{p.t}</div>
                        )}
                      </div>

                      {/* Card actions */}
                      <div style={{
                        display:'flex',borderTop:`1px solid ${C.border}`,
                        background:C.bgSoft
                      }}>
                        {prev ? (
                          <button onClick={()=>moveBack(p)} style={{
                            flex:1,padding:'6px 4px',border:'none',background:'transparent',
                            borderRight:`1px solid ${C.border}`,
                            cursor:'pointer',fontSize:10,color:C.inkSoft,
                            fontFamily:'inherit',transition:'background 0.1s',
                            display:'flex',alignItems:'center',justifyContent:'center',gap:3
                          }}
                          onMouseEnter={e=>e.currentTarget.style.background=C.border}
                          onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                            ← {prev.emoji}
                          </button>
                        ) : <div style={{flex:1}}/>}

                        {next ? (
                          <button onClick={()=>moveForward(p)} style={{
                            flex:2,padding:'6px 4px',border:'none',
                            background:`${col.color}20`,
                            cursor:'pointer',fontSize:10,color:col.color,
                            fontFamily:'inherit',fontWeight:600,transition:'background 0.1s',
                            display:'flex',alignItems:'center',justifyContent:'center',gap:3
                          }}
                          onMouseEnter={e=>e.currentTarget.style.background=`${col.color}35`}
                          onMouseLeave={e=>e.currentTarget.style.background=`${col.color}20`}>
                            {next.emoji} {next.label} →
                          </button>
                        ) : (
                          <div style={{
                            flex:2,padding:'6px 4px',
                            display:'flex',alignItems:'center',justifyContent:'center',
                            fontSize:10,color:'#6BAE82',fontWeight:600
                          }}>✓ publicado</div>
                        )}
                        <button onClick={()=>{if(confirm('¿Eliminar este post del plan?')){update(s=>{if(!s.deletedPosts)s.deletedPosts=[];const key=`${p.pf}:${p.i}`;if(!s.deletedPosts.includes(key))s.deletedPosts.push(key);if(s.customPosts?.[p.pf])s.customPosts[p.pf]=s.customPosts[p.pf].filter(cp=>cp.i!==p.i);});}}} style={{
                          width:28,padding:'6px 4px',border:'none',background:'transparent',
                          borderLeft:`1px solid ${C.border}`,
                          cursor:'pointer',fontSize:11,color:'#B04545',fontFamily:'inherit'
                        }}>✕</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}






// ═══════════════════════════════════════════════════════════════════
// STRATEGY VIEW — plan de acción de productos
// ═══════════════════════════════════════════════════════════════════
function StrategyView() {
  const [state, update] = useAppState();
  const [openTab, setOpenTab] = useState('ebook');

  const toggleDone = (key) => update(s => {
    if (!s.strategyDone) s.strategyDone = {};
    s.strategyDone[key] = !s.strategyDone[key];
  });
  const isDone = (key) => !!(state.strategyDone || {})[key];

  const BRANDS = [
    { handle:'@theglwguide',           lesson:'guía visual + digital products · estética limpia · comunidad muy fiel antes de vender nada' },
    { handle:'@theproductivitymethod', lesson:'educa sobre productividad todos los días · el producto es consecuencia natural del contenido' },
    { handle:'@the.habittracker',      lesson:'contenido de valor repetible · misma audiencia · mismo problema · distintos ángulos cada semana' },
    { handle:'@hausofplanner',         lesson:'digital products + comunidad · venden con naturalidad porque llevan meses dando primero' },
    { handle:'@happyplanningday',      lesson:'herramientas + planificación · muy visual · la audiencia se autoidentifica antes de llegar a comprar' },
    { handle:'@creatorcollege_',       lesson:'educa sobre crear contenido · su producto es la formación · la confianza se construye post a post' },
    { handle:'@femalesflyingsolo',     lesson:'nicho muy específico · eso les hace universales · la especificidad es la que conecta' },
  ];

  const PRODUCTS = [
    {
      id:'leadmagnet', emoji:'📋', name:'Lead Magnet',
      sub:'Checklist desconexión digital',
      price:'gratis', status:'activo · ya creado ✓', statusOk:true,
      color:'#6BAE82', bg:'#EDF7F0',
      desc:'Checklist "evalúa si tienes límites sanos" · 12 items · scoring · cta a servicios',
      perfiles:null,
    },
    {
      id:'ebook', emoji:'📖', name:'Ebook',
      sub:'Tu Próximo Capítulo',
      price:'16,99€', status:'0 ventas · necesita empuje', statusOk:false,
      color:'#E891A5', bg:'#FEF0F3',
      desc:'87 páginas · 6 capítulos · 12 ejercicios · pago único',
      perfiles:null,
    },
    {
      id:'asesoria', emoji:'🎯', name:'Asesoría 1:1',
      sub:'Sesión única 2h30',
      price:'90€', status:'lanza julio · prepara ya', statusOk:true,
      color:'#7BA2C2', bg:'#EEF4FA',
      desc:'Sesión única intensiva · plan + CV + LinkedIn + pitch personal · entregables inmediatos',
      perfiles:[
        { name:'La Principiante', desc:'Recién graduada o en prácticas · no sabe cómo presentarse · primera búsqueda laboral' },
        { name:'Experta Estancada', desc:'Profesional con experiencia · quiere cambiar de rumbo · claridad sobre competencias transferibles' },
      ],
    },
    {
      id:'linkedin', emoji:'💼', name:'LinkedIn',
      sub:'Estrategia canal profesional',
      price:'gratis', status:'pocos likes · pocas impresiones', statusOk:false,
      color:'#0A66C2', bg:'#E8F2FF',
      desc:'canal para captar clientas profesionales · publica martes 09:00 · tono más serio que IG',
      perfiles:null,
    },
    {
      id:'acompanamiento', emoji:'✨', name:'Acompañamiento',
      sub:'Programa 2 meses · 4 sesiones',
      price:'625€', status:'lanza octubre · siembra ahora', statusOk:true,
      color:'#9B6FA8', bg:'#F5EEF9',
      desc:'4 sesiones de 2-3h + seguimiento entre sesiones · ejecución acompañada · plan de continuidad',
      perfiles:[
        { name:'La Principiante', desc:'Primeros pasos reales en mercado laboral · CV, LinkedIn, entrevistas, búsqueda activa' },
        { name:'Experta Estancada', desc:'Transición de carrera · nuevas industrias · estrategia real de cambio de rumbo' },
      ],
    },
  ];

  const PLANS = {
    leadmagnet: {
      problem: 'El checklist existe y es bueno, pero está flotando solo — no está conectado a ningún embudo. Un lead magnet sin secuencia de email y sin CTA hacia el producto de pago es solo contenido gratuito. Hay que activarlo como la puerta de entrada al ebook.',
      phases: [
        {
          title: 'ESTA SEMANA · activar el lead magnet como embudo',
          color: '#6BAE82',
          actions: [
            {
              what: 'Añade el CTA al ebook al final del PDF del checklist',
              how: 'Abre el checklist en Canva. En la página final donde está el CTA a servicios, añade debajo: "¿sacaste menos de 8? El ebook Tu Próximo Capítulo tiene los 12 ejercicios para salir de ahí · 16,99€ · [tu link]". Sin esto, la persona termina el checklist y no sabe qué hacer. Con esto, el 100% de descargas ve la oferta del ebook.',
              when: 'Hoy · 15 minutos en Canva',
            },
            {
              what: 'Cambia el link de bio: checklist primero, ebook segundo',
              how: 'En Linktree o tu link de bio, el orden tiene que ser: 1) "¿tienes límites sanos? → checklist gratis" 2) "Ebook Tu Próximo Capítulo · 16,99€". El checklist capta emails y genera confianza. El ebook convierte. Si alguien llega a tu bio por primera vez, el checklist gratis es mucho más fácil de "comprar" que un ebook de pago.',
              when: 'Hoy · 5 minutos',
            },
          ],
        },
        {
          title: 'ESTA SEMANA · crear la secuencia de 3 emails',
          color: '#5A9A72',
          actions: [
            {
              what: 'Email 1 (día que descargan el checklist): da el ejercicio del ebook gratis',
              how: 'Cuando alguien descarga el checklist, mándale automáticamente (o manualmente por ahora) un email: "Te mando también el ejercicio que más cambia a las lectoras del ebook — completamente gratis. [Incluye el ejercicio del diagnóstico del capítulo 2: 3 preguntas, 10 minutos]. Si este ejercicio te sirvió, el ebook tiene 11 más. Link: [tu link]". Este email convierte porque dan VALOR antes de pedir dinero.',
              when: 'Esta semana · escríbelo y guárdalo como plantilla',
            },
            {
              what: 'Email 2 (2 días después): cuenta los 6 capítulos del ebook',
              how: '"El ebook tiene 6 capítulos. Te cuento lo que hay en cada uno para que decidas si es para ti: Cap 1: identificar tu drama laboral real / Cap 2: el ejercicio del diagnóstico (el que ya hiciste) / Cap 3: tu mapa de dónde estás a dónde quieres / Cap 4: plan de 30 días, micro-acciones / Cap 5: resistir el bajón / Cap 6: cuándo es el momento de moverte. 87 páginas · 16,99€ hasta el 26 mayo · link: [tu link]".',
              when: 'Escríbelo esta semana · envío automático en el futuro · manual por ahora',
            },
            {
              what: 'Email 3 (4 días después): urgencia real con la subida de precio',
              how: '"Último aviso: el 26 de mayo el ebook sube de 16,99€ a 19,99€. Te lo digo porque llevas [X días] con el checklist y quiero darte la oportunidad de comprarlo al precio de lanzamiento antes de que cambie. Si te sirvió el ejercicio que te mandé → el ebook tiene 11 más. Link: [tu link]. Sin presión — si no es el momento, no pasa nada ♡".',
              when: 'Escríbelo esta semana · mándalo a tu lista actual',
            },
          ],
        },
        {
          title: 'DISTRIBUIR EL LEAD MAGNET · stories de mayo',
          color: '#7BA2C2',
          actions: [
            {
              what: 'Stories del lead magnet en los días planificados',
              how: 'Tienes stories específicas del lead magnet en Historias IG para el 3 mayo (activación) y el 9 mayo (conexión con ebook). Ábrelas — tienen el script completo: qué decir, a qué hora, qué sticker usar. El flujo está diseñado: story con pregunta → respuesta activa → envío del checklist por DM → email con ejercicio gratis → oferta del ebook.',
              when: 'Días 3 y 9 mayo · ver Historias IG para el script',
            },
          ],
        },
      ],
    },
    ebook: {
      problem: 'El ebook lleva un mes sin ventas. Eso no significa que sea malo — significa que la gente que lo ve no tiene suficiente confianza para comprarlo aún. El objetivo de mayo no es "vender mucho", es conseguir las PRIMERAS ventas. Con 597 seguidoras comprometidas, 5-10 ventas este mes son totalmente alcanzables con el sistema correcto.',
      phases: [
        {
          title: 'PASO 1 · Esta semana · 1 hora · Inrō o ManyChat',
          color: '#D85A6F',
          actions: [
            {
              what: 'Configura "comenta EBOOK" → link directo al DM',
              how: 'Entra en inro.social → prueba gratuita 14 días → crea un flujo: alguien comenta "EBOOK" bajo cualquier post → le llega automáticamente el link de compra al DM. Sin que tengan que ir a bio. Sin fricción. Esto multiplica por 3-5 las conversiones porque elimina todos los pasos intermedios. Tarda 45 minutos en configurarlo.',
              when: 'Antes del sábado 9 mayo — el sábado es tu post de ebook',
            },
            {
              what: 'Cambia el CTA en tus próximas stories de "link en bio" a "comenta EBOOK"',
              how: 'Desde hoy, en cualquier story relacionada con el ebook, cambia el texto a: "comenta EBOOK bajo el post y te mando el link directamente al DM ♡". Ya tienes las stories planificadas en Historias IG con este CTA — solo síguelas.',
              when: 'Desde hoy en cada story de producto',
            },
          ],
        },
        {
          title: 'PASO 2 · Esta semana · 15 min · Canva',
          color: '#C4956A',
          actions: [
            {
              what: 'Añade el CTA al ebook en la última página del checklist PDF',
              how: 'Abre el checklist en Canva. En la última página (donde ya tienes el CTA a servicios), añade: "¿Sacaste menos de 8 puntos? El ebook Tu Próximo Capítulo tiene los 12 ejercicios para salir de ahí. 16,99€ · [tu link de compra]". Así el checklist gratuito se convierte en la puerta de entrada al ebook de pago.',
              when: 'Esta semana · 15 minutos',
            },
          ],
        },
        {
          title: 'PASO 3 · Esta semana · Pide UN testimonio',
          color: '#7BA2C2',
          actions: [
            {
              what: 'DM personal a cada persona que haya comprado el ebook',
              how: 'Escríbele UN mensaje corto y directo: "¿Cómo va el ebook? Si te está sirviendo de algo, ¿me darías una frase honesta que pueda compartir?" — No pidas reseña formal. Pide una frase. Los DMs personales tienen mucho más respuesta que las stories. Un solo testimonio real cambia todo en mayo.',
              when: 'Martes o miércoles de esta semana',
            },
          ],
        },
        {
          title: 'PASO 4 · Sábado 9 mayo · Día clave del ebook',
          color: '#9B6FA8',
          actions: [
            {
              what: 'El post del sábado 9 es tu post de ebook más importante del mes',
              how: 'Tienes planificado "3 cosas que cambia el ebook". Ese día: 1) Asegúrate de que Inrō ya está configurado. 2) En el caption del post añade "comenta EBOOK y te mando el link directo al DM ♡". 3) Sigue las stories del día 9 que tienes en Historias IG — tienen el script completo con timings. El objetivo de ese día: que la gente comente "EBOOK" y les llegue el link automáticamente.',
              when: 'Sábado 9 mayo',
            },
          ],
        },
        {
          title: 'PASO 5 · Semana del 12 · Secuencia de 3 emails',
          color: '#6BAE82',
          actions: [
            {
              what: 'Email 1 (a tu lista actual): da el ejercicio del capítulo 2 gratis',
              how: '"Te mando el ejercicio que más ha servido a las lectoras — gratis. [Include el ejercicio del diagnóstico: 3 preguntas, 10 minutos]. Si este ejercicio te sirvió, el ebook tiene 11 más. Precio: 16,99€ · link: [tu link]". Tienes 8 suscriptoras. Mándaselo. Escríbelo como si escribieras a una amiga — sin marketing, sin formato raro.',
              when: 'Lunes 11 mayo',
            },
            {
              what: 'Email 2 (2 días después): describe los 6 capítulos',
              how: '"El ebook tiene 6 capítulos. Te cuento lo que hay en cada uno: Cap 1 (qué te bloquea) / Cap 2 (el diagnóstico — el que ya hiciste) / Cap 3 (tu mapa) / Cap 4 (plan 30 días) / Cap 5 (resistir el bajón) / Cap 6 (cuándo moverte). 87 páginas · 16,99€ · link: [tu link]". Directo. Sin venderte humo.',
              when: 'Miércoles 13 mayo',
            },
            {
              what: 'Email 3 (2 días después): el más personal — por qué lo escribiste',
              how: '"El 16 de mayo hace exactamente [X semanas] desde que lancé el ebook. Y quiero contarte por qué lo escribí. [Aquí cuenta el momento personal, honesto, sin filtro]. Todo eso es lo que hay dentro. 16,99€ · link: [tu link]". La historia personal vende más que cualquier feature. Escríbela tú, no yo.',
              when: 'Viernes 15 mayo',
            },
          ],
        },
      ],
    },
    asesoria: {
      problem: 'La asesoría tiene dos perfiles muy distintos (La Principiante y La Experta Estancada) y necesita estrategias de siembra diferentes para cada una. El error sería hablar solo de una. En mayo, todo a través de stories — el feed ya está cerrado.',
      phases: [
        {
          title: 'Junio · educación sobre la sesión',
          color: '#C4956A',
          actions: [
            {
              what: 'Abre lista de espera el 22 junio',
              how: 'Stories el lunes 22 junio + post en feed: "en julio abro 3-5 plazas de asesoría 1:1. precio de lanzamiento: 90€ (sube en agosto). si quieres ser de las primeras, link en bio para apuntarte." Google Form sencillo: nombre, email, perfil (principiante o experta estancada). Las personas de la lista tienen acceso 48h antes que el público.',
              when: 'Lunes 22 junio',
            },
          ],
        },
      ],
    },

    linkedin: {
      problem: 'Tienes pocos seguidores, pocas impresiones y ningún like. El problema no es LinkedIn — es que estás usando el mismo tono que en Instagram. LinkedIn no quiere humor ni stories: quiere opinión profesional clara, sin adornos, con datos o con historia personal real. Tu audiencia ahí es diferente: reclutadoras, profesionales de RRHH, mujeres con experiencia. No buscan entretenimiento — buscan perspectiva.',
      phases: [
        {
          title: 'HOY · arregla el perfil en 30 minutos',
          color: '#0A66C2',
          actions: [
            {
              what: 'Actualiza tu titular: di exactamente qué haces y para quién',
              how: 'Tu titular actual probablemente dice algo vago. Cámbialo a: "Orientación laboral para mujeres que sienten que algo no encaja en su trabajo · creadora de Dramas Laborales · ebook Tu Próximo Capítulo". Ese titular tiene: qué haces, para quién, y prueba social (el ebook). Una reclutadora o una posible clienta lo entiende en 3 segundos.',
              when: 'Hoy · 5 minutos',
            },
            {
              what: 'Actualiza el "acerca de": 3 párrafos máximo con tu historia',
              how: 'Párrafo 1: el problema que resuelves ("muchas mujeres llevan meses sintiéndose estancadas en su trabajo sin saber por dónde empezar"). Párrafo 2: cómo lo resuelves ("creo contenido, un ebook de 87 páginas y próximamente asesorías 1:1"). Párrafo 3: CTA ("si te suena esto, empieza por el ebook · link en bio"). Nada de jerga, nada de "apasionada de", nada de emojis de cohetes.',
              when: 'Hoy · 10 minutos',
            },
          ],
        },
        {
          title: 'ESTA SEMANA · el tipo de post que funciona en LinkedIn',
          color: '#1565A0',
          actions: [
            {
              what: 'Formato que funciona: opinión profesional en 3-5 líneas cortas',
              how: 'El post de LinkedIn que más impresiones genera es: línea de gancho / espacio / 3-4 observaciones concretas / espacio / pregunta o conclusión. Ejemplo para ti: "El 70% de las mujeres que me escriben no tienen problema de motivación. Tienen problema de sistema. La motivación va y viene. El sistema no. Llevas meses sin avanzar en tu carrera → probablemente no es pereza. Es falta de estructura. ¿Qué parte del proceso te cuesta más?" Eso tiene: dato, insight, pregunta. Sin emojis decorativos. Sin "me encanta compartir esto".',
              when: 'Martes · publicar a las 09:00 (ya lo tienes planificado)',
            },
            {
              what: 'Comenta en 5 posts de personas de tu sector antes de publicar el tuyo',
              how: 'El algoritmo de LinkedIn prioriza cuentas activas. Antes de publicar cada martes, dedica 10 minutos a comentar en 5 posts de: coaches de empleo, orientadoras laborales, psicólogas del trabajo, HR influencers. No pongas "gran reflexión" — aporta algo concreto: "Yo añadiría que el síndrome del impostor se intensifica en entornos donde eres la única mujer". Eso es lo que te hace visible.',
              when: 'Cada martes · 10 min antes de publicar',
            },
          ],
        },
        {
          title: 'LOS 3 FORMATOS QUE FUNCIONAN EN TU SECTOR',
          color: '#1A7FBF',
          actions: [
            {
              what: 'Formato 1 · la historia de una mujer (sin nombre) con aprendizaje',
              how: '"Una clienta (recién graduada, 24 años) me escribió el lunes pasado. Llevaba 6 meses mandando CVs sin respuesta. El problema no era su CV. Era que su título de LinkedIn decía Graduada en ADE. Sin contexto. Sin dirección. En 20 minutos lo cambiamos a: [ejemplo]. Al día siguiente tuvo 3 respuestas. El CV de una mujer joven en España necesita menos información y más dirección. [pregunta]" — eso tiene: historia real, insight aplicable, final accionable.',
              when: 'Alterna con el post de opinión · 1 vez al mes',
            },
            {
              what: 'Formato 2 · el dato + tu interpretación',
              how: '"El 78% de las mujeres no negocia su primer sueldo (INE 2024). La razón más común no es miedo — es que nadie les enseñó que se puede. En el sistema educativo español el salario es un tema tabú hasta que ya estás firmando. Esto es lo que cambiaría yo si pudiera: [3 cambios concretos]. ¿Qué cambiarías tú?" — dato fuente real, interpretación tuya, acción sugerida, pregunta abierta. Sin titulares clickbait.',
              when: 'Alterna · 1 vez al mes',
            },
            {
              what: 'Formato 3 · el behind the scenes de tu proyecto',
              how: '"Llevo 6 semanas con el ebook publicado y 0 ventas. Voy a contaros qué está pasando y qué estoy cambiando. [proceso honesto]. No es fracaso — es aprendizaje. Y creo que compartirlo en público ayuda a quien esté en el mismo punto." — La honestidad radical en LinkedIn sobre proyectos propios genera mucho engagement porque casi nadie lo hace. Es tu diferencial.',
              when: '1 vez al mes · cuando tengas algo real que contar',
            },
          ],
        },
        {
          title: 'LO QUE NO HACER EN LINKEDIN',
          color: '#5B8DB8',
          actions: [
            {
              what: 'No copies el tono de Instagram en LinkedIn',
              how: 'En IG: "ay chicas, hoy os cuento 🥲". En LI: "El 60% de las profesionales que cambian de sector en España no lo hacen por dinero. Lo hacen por cultura empresarial. Estos son los 3 indicadores de una cultura sana antes de aceptar una oferta:". Mismo tema, tono completamente distinto. LinkedIn lee como un periódico, no como una historia de amiga.',
              when: 'Regla permanente',
            },
            {
              what: 'No uses emojis decorativos ni listas con ✅ o ➡️',
              how: 'Los emojis de lista en LinkedIn parecen spam de coach de productividad. Usa listas con guion o números. La diferencia visual es enorme: "✅ negocia tu sueldo ✅ pon límites ✅ sé auténtica" vs "1. El sueldo se negocia con datos del mercado, no con sentimiento / 2. Los límites se comunican con claridad, no con insinuación". La segunda versión parece experta. La primera, contenido genérico.',
              when: 'Regla permanente',
            },
          ],
        },
      ],
    },
    acompanamiento: {
      problem: 'El acompañamiento tiene los perfiles más definidos de todos tus productos y eso es una ventaja. Para octubre necesitas: testimonios reales de asesorías, el producto completamente definido por escrito, y la siembra hecha en septiembre. Todo empieza ahora definiendo el producto, no vendiendo.',
      phases: [
        {
          title: 'Mayo-junio · definir el producto en detalle',
          color: '#E891A5',
          actions: [
            {
              what: 'Escribe el contenido exacto de las 4 sesiones para cada perfil',
              how: 'Tienes el esquema: diagnóstico (sesión 1), fortalezas y perfil (sesión 2), estrategia de búsqueda (sesión 3), comunicación y visibilidad (sesión 4). Escríbelo en un doc con qué preguntas haces, qué ejercicios usas, qué entregables salen de cada sesión. Los perfiles tienen la misma estructura pero diferente foco: Principiante → primeros pasos, Experta Estancada → transición. Sin esto definido no puedes venderlo con seguridad.',
              when: 'Esta semana o la siguiente · 2-3 horas',
            },
            {
              what: 'Define el formato de seguimiento entre sesiones',
              how: 'Decide ahora: ¿será por email, WhatsApp o un canal específico? ¿Cuántas veces por semana? ¿Con qué límites de horario? El acompañamiento es 625€ — las clientas van a tener expectativas altas. Ponlo por escrito y hazlo parte de lo que vendes. "Seguimiento por email de lunes a viernes con respuesta en 48h" es un argumento de venta concreto.',
              when: 'Esta semana · 30 minutos',
            },
          ],
        },
        {
          title: 'Julio-agosto · construir prueba social',
          color: '#C4956A',
          actions: [
            {
              what: 'Detecta en cada asesoría quién necesitaría acompañamiento',
              how: 'Al final de cada sesión de asesoría, pregunta directamente: "¿sientes que con esto tienes suficiente o hay algo que necesitaría más tiempo?" Las que digan que necesitan más son tu público ideal para el acompañamiento. Toma nota. No vendas todavía — solo identifica.',
              when: 'En cada asesoría de julio',
            },
            {
              what: 'Documenta el arco de tus primeras clientas de asesoría',
              how: 'Después de cada sesión, anota en un doc privado: situación inicial, qué cambió durante la sesión, qué plan salió. Con permiso posterior: eso es tu case study. El acompañamiento a 625€ se vende con resultados demostrados, no con promesas.',
              when: 'Después de cada sesión de julio',
            },
          ],
        },
        {
          title: 'Septiembre · siembra y lista de espera',
          color: '#7BA2C2',
          actions: [
            {
              what: 'Lista de espera oficial el 29 septiembre',
              how: 'Post + stories + email: "en octubre abro 3-5 plazas de acompañamiento 2 meses. precio fundadoras: 450€ (precio regular: 625€). link en bio para apuntarte." Mismo proceso que la asesoría: Google Form con nombre, email, perfil (principiante o experta estancada) y 2 líneas sobre su situación.',
              when: 'Lunes 29 septiembre',
            },
          ],
        },
        {
          title: 'Octubre · lanzamiento',
          color: '#9B6FA8',
          actions: [
            {
              what: 'Lanzamiento el 20 octubre con detalle completo',
              how: 'Post en feed + stories + email. El post tiene que explicar TODO: 4 sesiones de 2-3h, seguimiento entre sesiones, entregables por sesión, para quién es cada perfil, qué no es. Añade un formulario de candidatura — que la persona cuente su situación antes de confirmar. Ese filtro protege tu tiempo y a la vez da valor: las clientas sienten que hay un proceso de selección.',
              when: 'Lunes 20 octubre',
            },
          ],
        },
      ],
    },
  };

  const plan = PLANS[openTab];
  const product = PRODUCTS.find(p => p.id === openTab);

  const doneCounts = PLANS[openTab].phases.reduce((total, phase, pi) => {
    return total + phase.actions.filter((_, ai) => isDone(`${openTab}_${pi}_${ai}`)).length;
  }, 0);
  const totalActions = PLANS[openTab].phases.reduce((t, ph) => t + ph.actions.length, 0);

  return (
    <div>
      {/* Header */}
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11,color:C.inkSoft,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>análisis</div>
        <H size="lg" style={{fontStyle:'italic'}}>estrategia de productos ✦</H>
        <p style={{fontSize:13,color:C.inkSoft,marginTop:6,lineHeight:1.6,maxWidth:560}}>
          qué tienes, cómo venderlo y cuándo · mayo = solo stories, el feed ya está cerrado ♡
        </p>
      </div>

      {/* Brand inspiration */}
      <details style={{marginBottom:20}}>
        <summary style={{
          cursor:'pointer', fontSize:11, fontWeight:700, color:C.inkSoft,
          letterSpacing:1, textTransform:'uppercase', padding:'10px 14px',
          background:C.bgSoft, borderRadius:8, border:`1px solid ${C.border}`,
          listStyle:'none', display:'flex', alignItems:'center', gap:8
        }}>
          <span>✦</span> marcas que quieres llegar a ser · 7 referencias
        </summary>
        <div style={{
          padding:'14px', background:C.card,
          borderRadius:'0 0 10px 10px', border:`1px solid ${C.border}`, borderTop:'none',
          display:'flex', flexDirection:'column', gap:8
        }}>
          <p style={{fontSize:12, color:C.inkSoft, marginBottom:4, lineHeight:1.6}}>
            todas construyen comunidad primero · venden después · el contenido educativo constante es su producto más potente
          </p>
          {BRANDS.map((b,i) => (
            <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start', padding:'8px 10px', background:C.bgSoft, borderRadius:8}}>
              <span style={{fontSize:12, fontWeight:700, color:C.accent, minWidth:160, flexShrink:0}}>{b.handle}</span>
              <span style={{fontSize:11, color:C.ink, lineHeight:1.5}}>{b.lesson}</span>
            </div>
          ))}
          <div style={{
            marginTop:4, padding:'10px 12px', background:'#FEF0F3',
            borderRadius:8, fontSize:12, color:C.ink, lineHeight:1.6,
            borderLeft:`3px solid ${C.accent}`
          }}>
            <strong style={{color:C.accent}}>la pauta común → </strong>
            todas educaron durante meses antes de vender cualquier cosa. el contenido no es marketing — es el producto de entrada. tu ebook y tu lead magnet son exactamente eso.
          </div>
        </div>
      </details>

      {/* Product tabs */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8, marginBottom:24}}>
        {PRODUCTS.map(p => {
          const pTotal = PLANS[p.id].phases.reduce((t,ph)=>t+ph.actions.length,0);
          const pDone  = PLANS[p.id].phases.reduce((t,ph,pi)=>t+ph.actions.filter((_,ai)=>isDone(`${p.id}_${pi}_${ai}`)).length,0);
          return (
            <button key={p.id} onClick={()=>setOpenTab(p.id)} style={{
              display:'flex', flexDirection:'column', gap:5,
              padding:'12px 14px', borderRadius:12, cursor:'pointer', textAlign:'left',
              fontFamily:'inherit', transition:'all 0.15s',
              background: openTab===p.id ? p.bg : C.card,
              border: openTab===p.id ? `2px solid ${p.color}` : `1px solid ${C.border}`,
              boxShadow: openTab===p.id ? `0 3px 12px ${p.color}25` : 'none',
            }}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span style={{fontSize:18}}>{p.emoji}</span>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.ink}}>{p.name}</div>
                  <div style={{fontSize:10,color:C.inkSoft, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{p.sub}</div>
                </div>
                <span style={{fontSize:13,fontWeight:700,color:p.color,flexShrink:0,fontFamily:"'Fraunces',serif"}}>{p.price}</span>
              </div>
              <div style={{fontSize:10,color:p.statusOk?C.inkSoft:'#D47B7B'}}>{p.status}</div>
              <div style={{height:3,background:C.border,borderRadius:100,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${pTotal>0?(pDone/pTotal*100):0}%`,background:p.color,borderRadius:100,transition:'width 0.3s'}}/>
              </div>
              <div style={{fontSize:10,color:C.inkSoft}}>{pDone}/{pTotal} acciones</div>
            </button>
          );
        })}
      </div>

      {/* Product detail */}
      <div style={{
        padding:'12px 16px', background:`${product.color}10`,
        borderRadius:10, border:`1px solid ${product.color}30`, marginBottom:16,
        display:'flex', flexDirection:'column', gap:8
      }}>
        <div style={{fontSize:12, color:C.ink, lineHeight:1.6}}>
          <strong style={{color:product.color}}>{product.emoji} {product.name} · </strong>{product.desc}
        </div>
        {product.perfiles && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            {product.perfiles.map((pf,i) => (
              <div key={i} style={{padding:'8px 10px', background:C.card, borderRadius:8, border:`1px solid ${product.color}20`}}>
                <div style={{fontSize:11, fontWeight:700, color:product.color, marginBottom:3}}>perfil {i+1}: {pf.name}</div>
                <div style={{fontSize:11, color:C.inkSoft, lineHeight:1.5}}>{pf.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Diagnosis */}
      <div style={{
        padding:'12px 16px', background:C.bgSoft, borderRadius:10,
        border:`1px solid ${C.border}`, marginBottom:20,
        fontSize:12, color:C.ink, lineHeight:1.7
      }}>
        <strong style={{color:product.color}}>situación actual · </strong>{plan.problem}
      </div>

      {/* Action phases */}
      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        {plan.phases.map((phase, pi) => (
          <div key={pi}>
            <div style={{
              display:'flex', alignItems:'center', gap:10, marginBottom:10,
              padding:'7px 12px', background:`${phase.color}12`,
              borderRadius:8, border:`1px solid ${phase.color}25`
            }}>
              <div style={{width:7,height:7,borderRadius:100,background:phase.color,flexShrink:0}}/>
              <span style={{fontSize:11,fontWeight:700,color:phase.color}}>{phase.title}</span>
              <span style={{fontSize:10,color:C.inkSoft,marginLeft:'auto'}}>
                {phase.actions.filter((_,ai)=>isDone(`${openTab}_${pi}_${ai}`)).length}/{phase.actions.length}
              </span>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {phase.actions.map((action, ai) => {
                const key = `${openTab}_${pi}_${ai}`;
                const done = isDone(key);
                return (
                  <div key={ai} style={{
                    background: done ? '#F2FAF4' : C.card,
                    border: done ? '1px solid #B5D9BF' : `1px solid ${C.border}`,
                    borderRadius:10, overflow:'hidden',
                    opacity: done ? 0.75 : 1, transition:'all 0.2s'
                  }}>
                    <div style={{
                      display:'flex', alignItems:'flex-start', gap:10,
                      padding:'10px 12px',
                      background: done ? '#E8F7EC' : C.bgSoft,
                      borderBottom:`1px solid ${done ? '#B5D9BF' : C.border}`
                    }}>
                      <button onClick={()=>toggleDone(key)} style={{
                        width:20, height:20, borderRadius:100, flexShrink:0, marginTop:1,
                        border: done ? 'none' : `2px solid ${phase.color}`,
                        background: done ? '#6BAE82' : 'transparent',
                        cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:10, color:'#fff',
                      }}>{done ? '✓' : ''}</button>
                      <div style={{flex:1}}>
                        <div style={{
                          fontSize:12, fontWeight:600, color:C.ink,
                          textDecoration: done ? 'line-through' : 'none', lineHeight:1.4
                        }}>{action.what}</div>
                        <div style={{fontSize:10, color:phase.color, fontWeight:600, marginTop:2}}>
                          🗓 {action.when}
                        </div>
                      </div>
                    </div>
                    {!done && (
                      <div style={{padding:'10px 12px 12px 42px'}}>
                        <div style={{fontSize:9, color:C.inkSoft, fontWeight:700, letterSpacing:0.5, textTransform:'uppercase', marginBottom:4}}>cómo</div>
                        <div style={{fontSize:11, color:C.ink, lineHeight:1.7}}>{action.how}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:14, fontSize:11, color:C.inkSoft, fontStyle:'italic', textAlign:'center'}}>
        marca cada acción como hecha · se guarda automáticamente ♡
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════
// CENTRO DE MANDO — hub principal: hoy · contenido · acciones · lanzamientos · estrategia
// ═══════════════════════════════════════════════════════════════════

const ACCIONES_FIJAS = [
  {
    id:'acc-inro', pri:'alta', emoji:'⭐',
    label:'Configurar Inrō "comenta EBOOK" → link al DM',
    sub:'inro.social · prueba gratuita · 45 minutos · multiplica conversiones x3-5'
  },
  {
    id:'acc-ebook-page', pri:'alta', emoji:'⭐',
    label:'Revisar página de venta del ebook',
    sub:'28 personas hicieron clic, 0 compraron. Checkpoints: precio justificado, bullets concretos, testimonio, CTA claro'
  },
  {
    id:'acc-testimonio', pri:'alta', emoji:'⭐',
    label:'Pedir testimonio por DM a compradores del ebook',
    sub:'Mensaje corto y directo. Una frase honesta cambia todo en mayo'
  },
  {
    id:'acc-cta-checklist', pri:'media', emoji:'→',
    label:'Añadir CTA al ebook en última página del checklist',
    sub:'Canva · 15 minutos · punto de entrada al embudo'
  },
  {
    id:'acc-emails', pri:'media', emoji:'→',
    label:'Escribir y enviar secuencia 3 emails a lista',
    sub:'Email 1: ejercicio gratis / Email 2: 6 capítulos / Email 3: subida precio · practicar la voz'
  },
  {
    id:'acc-linkedin-titular', pri:'media', emoji:'→',
    label:'Actualizar titular LinkedIn con fórmula correcta',
    sub:'Qué haces + para quién · sin "buscando oportunidades"'
  },
  {
    id:'acc-bio', pri:'baja', emoji:'·',
    label:'Cambiar link de bio: checklist primero, ebook segundo',
    sub:'Linktree · checklist capta emails · ebook convierte · orden importa'
  },
];

const BF_TASKS = [
  {id:'bf1', cat:'definición', label:'Decidir descuentos por producto: ebook / asesoría / acompañamiento', due:'27 oct'},
  {id:'bf2', cat:'definición', label:'Calcular fecha inicio y fin de la oferta (ej. 24-30 nov)', due:'30 oct'},
  {id:'bf3', cat:'contenido',  label:'Diseñar banner Black Friday + variantes para feed y stories', due:'3 nov'},
  {id:'bf4', cat:'contenido',  label:'Preparar copy newsletter con código descuento', due:'10 nov'},
  {id:'bf5', cat:'contenido',  label:'Grabar reel teaser "la oferta del año"', due:'14 nov'},
  {id:'bf6', cat:'contenido',  label:'Diseñar carrusel con todos los productos y precios rebajados', due:'19 nov'},
  {id:'bf7', cat:'contenido',  label:'Escribir copies IG + LinkedIn para los 7 días de oferta', due:'21 nov'},
  {id:'bf8', cat:'contenido',  label:'Teaser stories última hora antes del anuncio', due:'23 nov'},
  {id:'bf9', cat:'infra',      label:'Configurar códigos descuento en pasarela de pago', due:'6 nov'},
  {id:'bf10', cat:'infra',     label:'Programar emails: inicio oferta, mid-week, últimas horas', due:'17 nov'},
  {id:'bf11', cat:'launch',    label:'♡ LANZAR BF: publicar carrusel + newsletter + stories todo el día', due:'24 nov'},
];

function CentroMandoView({month, setMonth}) {
  const [state, update] = useAppState();
  const C = getTheme();
  const now = new Date();
  const [tab, setTab] = useState('hoy');

  // ── helpers ─────────────────────────────────────────────────────
  const todayStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const mesesShort = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const diasShort = ['dom','lun','mar','mié','jue','vie','sáb'];

  const daysUntil = (ds) => {
    const [d, m] = ds.split(' ');
    const ms = {ene:0,feb:1,mar:2,abr:3,may:4,jun:5,jul:6,ago:7,sep:8,oct:9,nov:10,dic:11};
    return Math.ceil((new Date(2026, ms[m], +d) - now) / 86400000);
  };

  const SectionLabel = ({children}) => (
    <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:2, fontWeight:600, marginBottom:10, marginTop:20, paddingBottom:6, borderBottom:`1px solid ${C.borderSoft}`}}>{children}</div>
  );

  const pfLabel = (pf) => ({instagram:'IG', linkedin:'LI', substack:'SS', tiktok:'TT'})[pf] || pf.slice(0,2).toUpperCase();
  const pfColor = (pf) => ({instagram:C.igDark, linkedin:C.liDark, substack:C.ssDark, tiktok:C.ttDark})[pf] || C.inkSoft;
  const pfBg   = (pf) => ({instagram:C.igBg,   linkedin:C.liBg,   substack:C.ssBg,   tiktok:C.ttBg})[pf]   || C.bgSoft;

  // ── KANBAN DATA (shared state with platform views) ───────────────
  const COLS = [
    { key:'pending',   label:'Pendiente',    emoji:'○',  color:'#C4A882' },
    { key:'creating',  label:'Creando',       emoji:'✏️', color:'#C4956A' },
    { key:'scheduled', label:'Programado',    emoji:'📅', color:'#7BA2C2' },
    { key:'manual',    label:'Publicar yo',   emoji:'🔔', color:'#9B6FA8' },
    { key:'published', label:'Publicado',     emoji:'✅', color:'#6BAE82' },
  ];

  const deleted = new Set(state.deletedPosts||[]);
  const tiktokReels = D.posts.ig.filter(p=>/eel/i.test(p.t||'')).map(p=>({...normalizePost(p), pf:'tiktok'}));
  const allPosts = [
    ...D.posts.ig.map(p=>({...normalizePost(p), pf:'instagram'})),
    ...D.posts.li.map(p=>({...normalizePost(p), pf:'linkedin'})),
    ...D.posts.ss.map(p=>({...normalizePost(p), pf:'substack'})),
    ...tiktokReels,
    ...(state.customPosts?.ig||[]).map(p=>({...normalizePost(p), pf:'instagram'})),
    ...(state.customPosts?.li||[]).map(p=>({...normalizePost(p), pf:'linkedin'})),
    ...(state.customPosts?.ss||[]).map(p=>({...normalizePost(p), pf:'substack'})),
  ].filter(p=>!deleted.has(p.i) && !deleted.has(`${p.pf}:${p.i}`));

  const getStatus = (p) => effectiveStatus(p, p.pf, state, now);
  const setStatus = (p, st) => update(s=>{ const k=`${p.pf}:${p.i}`; if(!s.posts[k]) s.posts[k]={}; s.posts[k].status=st; });

  // ── LAUNCH CHECKLISTS ───────────────────────────────────────────
  const LAUNCHES = [
    {
      id:'asesoria', name:'Lanzamiento Asesoría 1:1', price:'90€',
      date:'2026-07-06', tasks: ASESORIA_TASKS,
    },
    {
      id:'acompanamiento', name:'Lanzamiento Acompañamiento', price:'625€',
      date:'2026-10-20', tasks: ACOMP_TASKS,
    },
    {
      id:'blackfriday', name:'Black Friday ofertas', price:'varios',
      date:'2026-11-24', tasks: BF_TASKS,
    },
  ];

  const getLaunchDone = (launchId, tasks) =>
    tasks.filter(t => state.launches?.[launchId]?.[t.id]).length;

  const toggleLaunchTask = (launchId, taskId) => update(s=>{
    if(!s.launches) s.launches={};
    if(!s.launches[launchId]) s.launches[launchId]={};
    s.launches[launchId][taskId] = !s.launches[launchId][taskId];
  });

  const toggleAccion = (id) => update(s=>{
    if(!s.acciones) s.acciones={};
    s.acciones[id] = !s.acciones[id];
  });

  // ── TODAY DATA ──────────────────────────────────────────────────
  const todayPosts = allPosts.filter(p=>p.d===todayStr).sort((a,b)=>(a.tm||'').localeCompare(b.tm||''));
  const weekPosts = allPosts.filter(p=>{
    if(!p.d) return false;
    const d = new Date(p.d+'T12:00:00');
    const diff = Math.ceil((d-now)/86400000);
    return diff >= 0 && diff <= 7;
  }).sort((a,b)=>a.d.localeCompare(b.d)||(a.tm||'').localeCompare(b.tm||''));

  // ── STRATEGY DATA (from existing StrategyView) ──────────────────
  const [stratTab, setStratTab] = useState('mayo');

  const strategyMonths = [
    { id:'mayo',   emoji:'🌱', label:'Mayo',   phase:'construir audiencia con intención + primeras ventas ebook' },
    { id:'junio',  emoji:'🌿', label:'Junio',  phase:'consolidar confianza + preparar asesorías en silencio' },
    { id:'julio',  emoji:'☀️', label:'Julio',  phase:'decisión informada: lanzar o mover a septiembre' },
  ];

  const [filterPf, setFilterPf] = useState('all');

  // ── RENDER TABS ─────────────────────────────────────────────────
  const TABS = [
    {id:'hoy',        emoji:'⚡', label:'Hoy'},
    {id:'contenido',  emoji:'📋', label:'Contenido'},
    {id:'acciones',   emoji:'✅', label:'Acciones'},
    {id:'lanzamientos',emoji:'🚀', label:'Lanzamientos'},
    {id:'estrategia', emoji:'🎯', label:'Estrategia'},
  ];

  return (
    <div style={{padding:'20px 20px 40px', maxWidth:860, margin:'0 auto'}}>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:10, color:C.inkSoft, textTransform:'uppercase', letterSpacing:2, fontWeight:600, marginBottom:6}}>principal</div>
        <H size="xl" style={{fontStyle:'italic'}}>centro de mando ✦</H>
        <div style={{fontSize:12, color:C.inkSoft, marginTop:4}}>contenido · acciones · lanzamientos</div>
      </div>

      {/* Tab bar */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:4, marginBottom:24, background:C.bgSoft, borderRadius:12, padding:4}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:'9px 4px', border:'none', borderRadius:8, cursor:'pointer',
            fontFamily:'inherit', fontSize:11, fontWeight:500,
            background: tab===t.id ? C.card : 'transparent',
            color: tab===t.id ? C.ink : C.inkSoft,
            boxShadow: tab===t.id ? `0 1px 3px ${C.border}` : 'none',
            transition:'all .15s'
          }}><span style={{display:'block', fontSize:15, marginBottom:2}}>{t.emoji}</span>{t.label}</button>
        ))}
      </div>

      {/* ─── HOY ─────────────────────────────────────────────────── */}
      {tab==='hoy' && (
        <div>
          <div style={{background:C.card, borderRadius:12, padding:'14px 16px', border:`1px solid ${C.borderSoft}`, marginBottom:4}}>
            <div style={{fontFamily:"'Fraunces', serif", fontSize:16, fontStyle:'italic', color:C.ink, marginBottom:2}}>
              {diasShort[now.getDay()]}, {now.getDate()} {mesesShort[now.getMonth()]}
            </div>
            <div style={{fontSize:12, color:C.inkSoft}}>
              {todayPosts.length > 0 ? `${todayPosts.length} publicación${todayPosts.length>1?'es':''} hoy` : 'sin publicaciones hoy'}
            </div>
          </div>

          {todayPosts.length > 0 && <>
            <SectionLabel>contenido de hoy</SectionLabel>
            {todayPosts.map(p=>{
              const st = getStatus(p);
              const stLabels = {pending:'Pendiente', creating:'Creando', scheduled:'Programado', manual:'Publicar yo', published:'Publicado'};
              const stColors = {pending:C.inkSoft, creating:C.creating, scheduled:'#7BA2C2', manual:'#9B6FA8', published:C.published};
              return (
                <div key={`${p.pf}:${p.i}`} style={{
                  background:C.card, borderRadius:10, padding:'12px 14px', marginBottom:6,
                  border:`1px solid ${C.borderSoft}`, borderLeft:`3px solid ${pfColor(p.pf)}`,
                  display:'flex', alignItems:'center', gap:12
                }}>
                  <span style={{fontSize:10, fontWeight:700, color:pfColor(p.pf), background:pfBg(p.pf), padding:'2px 7px', borderRadius:4, flexShrink:0}}>{pfLabel(p.pf)}</span>
                  {p.tm && <span style={{fontSize:11, color:C.inkSoft, flexShrink:0}}>{p.tm}</span>}
                  {p.t && <span style={{fontSize:10, color:C.inkSoft, flexShrink:0}}>{p.t}</span>}
                  <span style={{flex:1, fontSize:13, color:C.ink, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{p.ti||p.su||p.ti||'—'}</span>
                  <select value={st} onChange={e=>setStatus(p,e.target.value)} style={{fontSize:10, padding:'3px 6px', borderRadius:6, border:`1px solid ${C.border}`, background:C.bgSoft, color:stColors[st]||C.inkSoft, fontFamily:'inherit', fontWeight:600, cursor:'pointer', flexShrink:0}}>
                    {COLS.map(c=><option key={c.key} value={c.key}>{c.emoji} {c.label}</option>)}
                  </select>
                </div>
              );
            })}
          </>}

          <SectionLabel>⚡ acciones urgentes</SectionLabel>
          {ACCIONES_FIJAS.filter(a=>a.pri==='alta').map(a=>{
            const done = !!(state.acciones?.[a.id]);
            return (
              <div key={a.id} onClick={()=>toggleAccion(a.id)} style={{
                background:C.card, borderRadius:10, padding:'12px 14px', marginBottom:5,
                border:`1px solid ${C.borderSoft}`, borderLeft:`3px solid ${done?C.published:C.accent}`,
                display:'flex', gap:10, cursor:'pointer', opacity:done?0.45:1
              }}>
                <div style={{width:18, height:18, borderRadius:9, flexShrink:0, marginTop:2, border:`2px solid ${done?C.published:C.accent}`, background:done?C.published:'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'#fff'}}>{done?'✓':''}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, color:C.ink, fontWeight:500, textDecoration:done?'line-through':'none', marginBottom:2}}>{a.label}</div>
                  <div style={{fontSize:11, color:C.inkSoft}}>{a.sub}</div>
                </div>
              </div>
            );
          })}

          {weekPosts.filter(p=>p.d!==todayStr).length > 0 && <>
            <SectionLabel>esta semana</SectionLabel>
            {weekPosts.filter(p=>p.d!==todayStr).map(p=>{
              const st = getStatus(p);
              const stColors = {pending:C.inkSoft, creating:C.creating, scheduled:'#7BA2C2', manual:'#9B6FA8', published:C.published};
              const dd = new Date(p.d+'T12:00:00');
              return (
                <div key={`${p.pf}:${p.i}`} style={{
                  background:C.card, borderRadius:10, padding:'10px 14px', marginBottom:5,
                  border:`1px solid ${C.borderSoft}`, display:'flex', alignItems:'center', gap:10
                }}>
                  <span style={{fontSize:10, fontWeight:700, color:pfColor(p.pf), background:pfBg(p.pf), padding:'2px 6px', borderRadius:4, flexShrink:0}}>{pfLabel(p.pf)}</span>
                  <span style={{fontSize:10, color:C.inkSoft, flexShrink:0}}>{dd.getDate()} {mesesShort[dd.getMonth()]}</span>
                  {p.tm && <span style={{fontSize:10, color:C.inkSoft, flexShrink:0}}>{p.tm}</span>}
                  {p.t && <span style={{fontSize:10, color:C.inkSoft, flexShrink:0}}>{p.t}</span>}
                  <span style={{flex:1, fontSize:12, color:C.ink, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{p.ti||p.su||'—'}</span>
                  <select value={st} onChange={e=>setStatus(p,e.target.value)} style={{fontSize:10, padding:'3px 6px', borderRadius:6, border:`1px solid ${C.border}`, background:C.bgSoft, color:stColors[st]||C.inkSoft, fontFamily:'inherit', cursor:'pointer', flexShrink:0}}>
                    {COLS.map(c=><option key={c.key} value={c.key}>{c.emoji} {c.label}</option>)}
                  </select>
                </div>
              );
            })}
          </>}
        </div>
      )}

      {/* ─── CONTENIDO ───────────────────────────────────────────── */}
      {tab==='contenido' && (
        <div>
          {/* Filtros */}
          <div style={{display:'flex', gap:8, marginBottom:16, flexWrap:'wrap', alignItems:'center'}}>
            <select value={month} onChange={e=>setMonth(e.target.value)} style={{fontSize:12, padding:'6px 10px', borderRadius:8, border:`1px solid ${C.border}`, background:C.card, color:C.ink, fontFamily:'inherit', cursor:'pointer'}}>
              {['mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'].map(m=><option key={m} value={m}>{m}</option>)}
            </select>
            {['all','instagram','linkedin','substack','tiktok'].map(pf=>(
              <button key={pf} onClick={()=>setFilterPf(pf)} style={{
                padding:'5px 12px', borderRadius:8, border:'none', cursor:'pointer',
                fontFamily:'inherit', fontSize:11, fontWeight:500,
                background: filterPf===pf ? (pf==='all' ? C.ink : pfColor(pf)) : C.bgSoft,
                color: filterPf===pf ? (pf==='all' ? C.bg : '#fff') : C.inkSoft,
              }}>{pf==='all'?'Todas':pfLabel(pf)}</button>
            ))}
            <span style={{fontSize:11, color:C.inkSoft, marginLeft:'auto'}}>
              {allPosts.filter(p=>(p.m||p.d?.slice(5,7)).includes?.(month)||p.m===month).length} posts · {month}
            </span>
          </div>

          {/* Kanban */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, overflowX:'auto'}}>
            {COLS.map(col=>{
              const colPosts = allPosts.filter(p=>{
                if(p.m !== month) return false;
                if(filterPf !== 'all' && p.pf !== filterPf) return false;
                return getStatus(p) === col.key;
              });
              return (
                <div key={col.key} style={{minWidth:150}}>
                  <div style={{fontSize:10, fontWeight:700, color:col.color, textTransform:'uppercase', letterSpacing:1, marginBottom:8, display:'flex', justifyContent:'space-between'}}>
                    <span>{col.emoji} {col.label}</span>
                    <span style={{background:col.color+'20', padding:'1px 6px', borderRadius:10}}>{colPosts.length}</span>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', gap:6}}>
                    {colPosts.map(p=>{
                      const dd = p.ds || (p.d ? p.d.slice(8,10)+' '+mesesShort[+p.d.slice(5,7)-1] : '—');
                      return (
                        <div key={`${p.pf}:${p.i}`} style={{background:C.card, borderRadius:8, padding:'8px 10px', border:`1px solid ${C.borderSoft}`, borderLeft:`3px solid ${pfColor(p.pf)}`}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                            <span style={{fontSize:9, fontWeight:700, color:pfColor(p.pf), background:pfBg(p.pf), padding:'1px 5px', borderRadius:3}}>{pfLabel(p.pf)}</span>
                            <span style={{fontSize:9, color:C.accent, fontWeight:600}}>{dd}</span>
                          </div>
                          {p.t && <div style={{fontSize:9, color:C.inkSoft, marginBottom:3}}>{p.t}</div>}
                          <div style={{fontSize:11, color:C.ink, lineHeight:1.3, marginBottom:6}}>{(p.ti||p.su||'—').slice(0,50)}</div>
                          <div style={{display:'flex', gap:3, justifyContent:'flex-end'}}>
                            {COLS.indexOf(col)>0 && <button onClick={()=>setStatus(p, COLS[COLS.indexOf(col)-1].key)} style={{padding:'2px 6px', border:`1px solid ${C.border}`, borderRadius:5, background:'transparent', color:C.inkSoft, fontSize:10, cursor:'pointer'}}>←</button>}
                            {COLS.indexOf(col)<COLS.length-1 && <button onClick={()=>setStatus(p, COLS[COLS.indexOf(col)+1].key)} style={{padding:'2px 7px', border:'none', borderRadius:5, background:COLS[COLS.indexOf(col)+1].color, color:'#fff', fontSize:10, cursor:'pointer', fontWeight:500}}>→</button>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── ACCIONES ────────────────────────────────────────────── */}
      {tab==='acciones' && (
        <div>
          <div style={{background:C.card, borderRadius:12, padding:'12px 16px', border:`1px solid ${C.borderSoft}`, marginBottom:4, fontSize:12, color:C.inkSoft, lineHeight:1.6}}>
            Acciones estratégicas de negocio ordenadas por prioridad. Marca las que completes — se guardan automáticamente.
          </div>
          {['alta','media','baja'].map(pri=>{
            const items = ACCIONES_FIJAS.filter(a=>a.pri===pri);
            const labels = {alta:'PRIORIDAD ALTA', media:'PRIORIDAD MEDIA', baja:'PRIORIDAD BAJA'};
            const colors = {alta:C.accent, media:'#C4956A', baja:C.inkSoft};
            return (
              <div key={pri}>
                <SectionLabel><span style={{color:colors[pri]}}>→</span> {labels[pri]}</SectionLabel>
                {items.map(a=>{
                  const done = !!(state.acciones?.[a.id]);
                  return (
                    <div key={a.id} onClick={()=>toggleAccion(a.id)} style={{
                      background:C.card, borderRadius:10, padding:'12px 14px', marginBottom:5,
                      border:`1px solid ${C.borderSoft}`,
                      display:'flex', gap:10, cursor:'pointer', opacity:done?0.45:1
                    }}>
                      <div style={{width:18, height:18, borderRadius:3, flexShrink:0, marginTop:2, border:`1.5px solid ${done?C.published:C.border}`, background:done?C.published:'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'#fff'}}>{done?'✓':''}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13, color:C.ink, fontWeight:500, textDecoration:done?'line-through':'none', marginBottom:2}}>{a.label}</div>
                        <div style={{fontSize:11, color:C.inkSoft, lineHeight:1.5}}>{a.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── LANZAMIENTOS ────────────────────────────────────────── */}
      {tab==='lanzamientos' && (
        <div>
          {LAUNCHES.map(launch=>{
            const done = getLaunchDone(launch.id, launch.tasks);
            const total = launch.tasks.length;
            const pct = Math.round((done/total)*100);
            const launchDate = new Date(launch.date+'T12:00:00');
            const daysLeft = Math.ceil((launchDate-now)/86400000);
            const cats = [...new Set(launch.tasks.map(t=>t.cat))];
            return (
              <div key={launch.id} style={{background:C.card, borderRadius:12, border:`1px solid ${C.borderSoft}`, marginBottom:16, overflow:'hidden'}}>
                <div style={{padding:'14px 16px', borderBottom:`1px solid ${C.borderSoft}`}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                    <div>
                      <div style={{fontSize:14, fontWeight:600, color:C.ink, marginBottom:3}}>{launch.name}</div>
                      <div style={{fontSize:11, color:C.inkSoft}}>{launch.price} · {launch.date} · en {daysLeft} días</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontFamily:"'Fraunces', serif", fontSize:22, fontWeight:500, color: pct===100 ? C.published : daysLeft<21 ? C.accent : C.ink}}>{pct}%</div>
                      <div style={{fontSize:10, color:C.inkSoft}}>{done}/{total}</div>
                    </div>
                  </div>
                  <div style={{background:C.bgSoft, borderRadius:100, height:4, marginTop:10}}>
                    <div style={{width:`${pct}%`, background:pct===100?C.published:C.accent, height:'100%', borderRadius:100, transition:'width .3s'}}/>
                  </div>
                </div>
                <div style={{padding:'14px 16px'}}>
                  {cats.map(cat=>(
                    <div key={cat} style={{marginBottom:12}}>
                      <div style={{fontSize:9, color:C.inkSoft, textTransform:'uppercase', letterSpacing:2, fontWeight:600, marginBottom:6}}>
                        {cat} · {launch.tasks.filter(t=>t.cat===cat&&state.launches?.[launch.id]?.[t.id]).length}/{launch.tasks.filter(t=>t.cat===cat).length}
                      </div>
                      {launch.tasks.filter(t=>t.cat===cat).map(t=>{
                        const checked = !!(state.launches?.[launch.id]?.[t.id]);
                        const days = daysUntil(t.due);
                        const hot = !checked && days<=5;
                        return (
                          <div key={t.id} onClick={()=>toggleLaunchTask(launch.id,t.id)} style={{
                            display:'flex', alignItems:'center', gap:10, padding:'8px 0',
                            borderBottom:`1px solid ${C.borderSoft}`, cursor:'pointer', opacity:checked?0.45:1
                          }}>
                            <div style={{width:15, height:15, borderRadius:3, flexShrink:0, border:`1.5px solid ${checked?C.published:hot?C.accent:C.border}`, background:checked?C.published:'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'#fff'}}>{checked?'✓':''}</div>
                            <span style={{flex:1, fontSize:12, color:C.ink, textDecoration:checked?'line-through':'none', lineHeight:1.4}}>{t.label}</span>
                            <span style={{fontSize:10, color:hot?C.accent:C.inkSoft, fontWeight:hot?600:400, flexShrink:0}}>{t.due}{hot?' ←':''}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── ESTRATEGIA ──────────────────────────────────────────── */}
      {tab==='estrategia' && (
        <div>
          {/* Sub-tabs */}
          <div style={{display:'flex', gap:6, marginBottom:20, flexWrap:'wrap'}}>
            {[
              {id:'mayo', label:'🌱 Mayo'},
              {id:'junio', label:'🌿 Junio'},
              {id:'julio', label:'☀️ Julio'},
              {id:'resumen', label:'📋 Resumen'},
            ].map(t=>(
              <button key={t.id} onClick={()=>setStratTab(t.id)} style={{
                padding:'7px 14px', border:`1px solid ${stratTab===t.id?C.accent:C.border}`, borderRadius:8, cursor:'pointer',
                fontFamily:'inherit', fontSize:12, fontWeight:500,
                background: stratTab===t.id ? C.accent+'15' : C.card,
                color: stratTab===t.id ? C.accent : C.inkSoft,
              }}>{t.label}</button>
            ))}
          </div>

          {/* Punto de partida */}
          <div style={{background:C.card, borderRadius:12, padding:'14px 16px', border:`1px solid ${C.borderSoft}`, marginBottom:4}}>
            <div style={{fontSize:11, fontWeight:600, color:C.ink, marginBottom:6}}>Punto de partida</div>
            <div style={{fontSize:12, color:C.inkSoft, lineHeight:1.6}}>597 seguidoras (mayoría follow-back) · engagement real 3-5 personas · 0 ventas · asesorías sin preparar. <strong style={{color:C.ink}}>Un solo objetivo por mes.</strong></div>
          </div>

          {/* Roadmap 3 meses */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:4}}>
            {strategyMonths.map(m=>(
              <div key={m.id} style={{background:C.bgSoft, borderRadius:10, padding:12, border:`1px solid ${stratTab===m.id?C.accent:C.borderSoft}`}}>
                <div style={{fontSize:12, fontWeight:700, color:C.accent, marginBottom:4}}>{m.emoji} {m.label.toUpperCase()}</div>
                <div style={{fontSize:11, color:C.inkSoft, lineHeight:1.5}}>{m.phase}</div>
              </div>
            ))}
          </div>

          {/* Mayo */}
          {stratTab==='mayo' && (
            <div>
              <SectionLabel>🔍 el diagnóstico real</SectionLabel>
              <div style={{background:C.card, borderRadius:12, padding:'14px 16px', border:`1px solid ${C.borderSoft}`, marginBottom:4}}>
                <div style={{fontSize:12, color:C.inkSoft, lineHeight:1.7, marginBottom:10}}>El problema no es el ebook ni las asesorías. Es que <strong style={{color:C.ink}}>la audiencia actual no llegó buscando lo que ofreces</strong> — llegó porque la seguiste primero. Eso hace que el engagement sea bajo y las conversiones casi imposibles.</div>
                <div style={{background:C.bgSoft, borderRadius:8, padding:12, fontSize:12, color:C.inkSoft, fontStyle:'italic', lineHeight:1.6}}>"La estrategia original está bien diseñada para una audiencia que ya confía en ti. Aún no tienes esa audiencia. Hay que construirla primero."</div>
              </div>

              <SectionLabel>🎯 objetivo realista de mayo</SectionLabel>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:4}}>
                <div style={{background:C.bgSoft, borderRadius:10, padding:'14px 16px', textAlign:'center'}}>
                  <div style={{fontFamily:"'Fraunces', serif", fontSize:28, fontWeight:500, color:C.published}}>2–3</div>
                  <div style={{fontSize:11, color:C.inkSoft}}>ventas ebook</div>
                </div>
                <div style={{background:C.bgSoft, borderRadius:10, padding:'14px 16px', textAlign:'center'}}>
                  <div style={{fontFamily:"'Fraunces', serif", fontSize:18, fontWeight:500, color:C.ink, lineHeight:1.3}}>+ aprender</div>
                  <div style={{fontSize:11, color:C.inkSoft}}>qué contenido atrae gente nueva</div>
                </div>
              </div>
              <div style={{background:C.card, borderRadius:10, padding:'12px 14px', border:`1px solid ${C.borderSoft}`, marginBottom:4, fontSize:12, color:C.inkSoft}}>
                <strong style={{color:'#D85A6F'}}>NO:</strong> 5-10 ventas · <strong style={{color:C.published}}>SÍ:</strong> 2 piezas de descubrimiento por semana. Mejor dos buenas que cinco mediocres.
                <div style={{marginTop:8, fontWeight:600, color:C.ink, marginBottom:4}}>Topics de descubrimiento:</div>
                {['"Qué poner en tu LinkedIn si no tienes experiencia"','"Por qué no te llaman a entrevistas (y cómo cambiarlo)"','"Cómo explicar en una entrevista que acabas de terminar la carrera"','"El error que cometen el 90% de las recién graduadas en su CV"'].map((t,i)=>(
                  <div key={i} style={{fontSize:12, color:C.inkSoft, padding:'3px 0'}}>→ {t}</div>
                ))}
              </div>

              <SectionLabel>✅ se mantiene · ✗ se quita</SectionLabel>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:4}}>
                <div style={{background:C.card, borderRadius:10, padding:'12px 14px', border:`1px solid ${C.borderSoft}`}}>
                  {['Inrō → hazlo (45 min)','Testimonio por DM → esta semana','CTA al ebook en checklist (15 min)','Secuencia 3 emails → práctica de voz'].map((t,i)=>(
                    <div key={i} style={{fontSize:12, color:C.ink, padding:'4px 0', borderBottom:`1px solid ${C.borderSoft}`, display:'flex', gap:6}}><span style={{color:C.published}}>✅</span>{t}</div>
                  ))}
                </div>
                <div style={{background:C.card, borderRadius:10, padding:'12px 14px', border:`1px solid ${C.borderSoft}`}}>
                  {['Urgencia precio 26 mayo (teatro con 8 personas)','Objetivo 5-10 ventas (genera ansiedad)'].map((t,i)=>(
                    <div key={i} style={{fontSize:12, color:C.ink, padding:'4px 0', borderBottom:`1px solid ${C.borderSoft}`, display:'flex', gap:6}}><span style={{color:'#D85A6F'}}>✗</span>{t}</div>
                  ))}
                </div>
              </div>

              <SectionLabel>📊 las métricas que importan en mayo</SectionLabel>
              <div style={{background:C.card, borderRadius:10, padding:'12px 14px', border:`1px solid ${C.borderSoft}`}}>
                <div style={{fontSize:11, color:C.inkSoft, marginBottom:10}}>Señales que te dicen si vas bien · NO el número de ventas:</div>
                {[
                  {label:'Guardados en reels/carruseles', sub:'→ Gente nueva encontrando tu contenido'},
                  {label:'Nuevas suscriptoras al checklist', sub:'→ El lead magnet está funcionando'},
                  {label:'DMs de personas que no te conocían', sub:'→ Audiencia con intención llegando'},
                  {label:'Comentarios que describen su situación', sub:'→ Conexión real con el problema'},
                ].map((m,i)=>(
                  <div key={i} style={{padding:'8px 10px', background:C.bgSoft, borderRadius:8, marginBottom:6}}>
                    <div style={{fontSize:12, fontWeight:500, color:C.accent}}>📊 {m.label}</div>
                    <div style={{fontSize:11, color:C.inkSoft}}>{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Junio */}
          {stratTab==='junio' && (
            <div>
              <SectionLabel>🌿 junio · consolidar confianza</SectionLabel>
              <div style={{background:C.card, borderRadius:12, padding:'14px 16px', border:`1px solid ${C.borderSoft}`, marginBottom:4}}>
                <div style={{fontSize:12, color:C.inkSoft, lineHeight:1.7}}>Junio es el mes de preparación silenciosa. El contenido de junio siembra la asesoría de julio. Cada semana conecta con un dolor específico de las clientas ideales. La confianza se construye post a post.</div>
              </div>
              {[
                {semana:'Semana 1', label:'sembrar asesoría', desc:'Posts que muestran que a veces el ebook no es suficiente. Casos donde hace falta guía personalizada.'},
                {semana:'Semana 2', label:'educar sobre guía personal', desc:'Qué es una sesión de orientación. Qué pasa durante. Qué cambia después.'},
                {semana:'Semana 3', label:'testimonios + yoga day', desc:'Prueba social del ebook + conexión con bienestar laboral.'},
                {semana:'Semana 4', label:'pre-lanzamiento asesoría', desc:'Lista de espera abierta. Stories de urgencia suave. El feed ya siembrado.'},
              ].map((s,i)=>(
                <div key={i} style={{background:C.card, borderRadius:10, padding:'12px 14px', border:`1px solid ${C.borderSoft}`, marginBottom:6, display:'flex', gap:12}}>
                  <div style={{fontSize:10, fontWeight:700, color:C.accent, flexShrink:0, marginTop:2}}>{s.semana}</div>
                  <div>
                    <div style={{fontSize:12, fontWeight:600, color:C.ink, marginBottom:3}}>{s.label}</div>
                    <div style={{fontSize:11, color:C.inkSoft, lineHeight:1.5}}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Julio */}
          {stratTab==='julio' && (
            <div>
              <SectionLabel>☀️ julio · decisión de lanzamiento</SectionLabel>
              <div style={{background:C.card, borderRadius:12, padding:'14px 16px', border:`1px solid ${C.borderSoft}`, marginBottom:4}}>
                <div style={{fontSize:12, color:C.inkSoft, lineHeight:1.7, marginBottom:10}}>El 6 de julio es el lanzamiento de la asesoría. Pero la decisión real se toma con los datos de mayo y junio. Si las métricas de descubrimiento fueron bien → lanzas en julio. Si no → mueves a septiembre sin drama.</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                  <div style={{background:C.bgSoft, borderRadius:8, padding:12}}>
                    <div style={{fontSize:11, fontWeight:700, color:C.published, marginBottom:6}}>Escenario A · lanzas julio</div>
                    <div style={{fontSize:11, color:C.inkSoft, lineHeight:1.6}}>Tienes 100+ emails en lista · engagement real subiendo · 3+ testimonios del ebook · Inrō funcionando</div>
                  </div>
                  <div style={{background:C.bgSoft, borderRadius:8, padding:12}}>
                    <div style={{fontSize:11, fontWeight:700, color:'#C4956A', marginBottom:6}}>Escenario B · mueves a septiembre</div>
                    <div style={{fontSize:11, color:C.inkSoft, lineHeight:1.6}}>Lista pequeña · poca prueba social · mejor usar agosto para construir y septiembre para lanzar con más base</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resumen */}
          {stratTab==='resumen' && (
            <div>
              <SectionLabel>📋 marcas de referencia</SectionLabel>
              {[
                { handle:'@theglwguide',           lesson:'guía visual + digital products · estética limpia · comunidad muy fiel antes de vender nada' },
                { handle:'@theproductivitymethod', lesson:'educa sobre productividad todos los días · el producto es consecuencia natural del contenido' },
                { handle:'@the.habittracker',      lesson:'contenido de valor repetible · misma audiencia · mismo problema · distintos ángulos cada semana' },
                { handle:'@hausofplanner',         lesson:'digital products + comunidad · venden con naturalidad porque llevan meses dando primero' },
                { handle:'@creatorcollege_',       lesson:'educa sobre crear contenido · su producto es la formación · la confianza se construye post a post' },
              ].map((b,i)=>(
                <div key={i} style={{background:C.card, borderRadius:10, padding:'10px 14px', marginBottom:5, border:`1px solid ${C.borderSoft}`, display:'flex', gap:12}}>
                  <span style={{fontSize:12, fontWeight:600, color:C.accent, flexShrink:0}}>{b.handle}</span>
                  <span style={{fontSize:12, color:C.inkSoft, lineHeight:1.5}}>{b.lesson}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}




function BackupView() {
  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          recursos
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>
          backup <Heart size={20} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/>
        </H>
      </div>
      <BackupBox />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HIGHLIGHTS VIEW · estrategia y textos para historias destacadas
// ═══════════════════════════════════════════════════════════════════
function HighlightsView() {
  const [expanded, setExpanded] = useState(0); // primera abierta por defecto
  
  const highlights = [
    {
      icon: '🌷',
      title: 'EMPIEZA AQUÍ',
      subtitle: 'la más importante · es lo primero que ve quien entra',
      priority: 'crítica',
      color: C.accent,
      desc: 'Quién eres tú · qué hace Dramas Laborales · para quién es. Es tu mejor convertidor porque la nueva visitante mira esto primero.',
      stories: [
        {
          n: 1,
          tipo: 'presentación',
          texto: 'hola ♡\nsoy irene\ny esto es\ndramas laborales',
        },
        {
          n: 2,
          tipo: 'qué hago',
          texto: 'creé este espacio\npara hablar de\norientación laboral\ncon honestidad\n\nsin filtros · sin promesas vacías ♡',
        },
        {
          n: 3,
          tipo: 'para quién',
          texto: 'para ti si:\n\n♡ tienes 22-34 años\n♡ estás en tu primer/segundo curro\n♡ sientes que vas perdida\n♡ buscas algo más honesto que LinkedIn',
        },
        {
          n: 4,
          tipo: 'qué encontrarás',
          texto: 'aquí vas a encontrar:\n\n· tips reales sin postureo\n· mujeres que inspiran\n· humor que duele y cura\n· mi ebook y asesoría ♡',
        },
        {
          n: 5,
          tipo: 'CTA ebook',
          texto: '✦ tu próximo capítulo\n\nmi ebook para empezar\na ordenar tu vida laboral\n\n→ link en bio',
        },
        {
          n: 6,
          tipo: 'cierre cálido',
          texto: 'gracias\npor llegar\nhasta aquí ♡\n\n— irene',
        }
      ]
    },
    {
      icon: '✦',
      title: 'TU PRÓXIMO CAPÍTULO',
      subtitle: 'ebook · 16,99€ · tu producto principal',
      priority: 'crítica',
      color: C.accent,
      desc: 'Recicla las stories de los sábados softsell. Textos del feed: "si sientes que tienes potencial pero no sabes cómo desbloquearlo" · "si estás cansada de dar vueltas sin dirección".',
      stories: [
        {
          n: 1,
          tipo: 'portada del ebook',
          texto: '"tu próximo capítulo"\n\nun ebook para empezar\na desbloquearte ♡',
        },
        {
          n: 2,
          tipo: 'para quién es',
          texto: 'es para ti si:\n\n♡ sientes que tienes potencial pero no sabes cómo desbloquearlo\n♡ estás cansada de dar vueltas sin dirección\n♡ necesitas claridad antes de tomar decisiones',
        },
        {
          n: 3,
          tipo: 'qué hay dentro',
          texto: 'lo que SÍ es:\n\n♡ entender dónde estás\n♡ desbloquear decisiones\n♡ ver opciones reales\n♡ avanzar con claridad\n\nes como pasar de estar en bucle a tener un mapa ✧',
        },
        {
          n: 4,
          tipo: 'lo que NO es',
          texto: 'lo que NO es:\n\n✗ una lista de trabajos ideales\n✗ motivación vacía\n✗ un CV bonito\n✗ consejos genéricos',
        },
        {
          n: 5,
          tipo: 'precio + CTA',
          texto: '16,99€\npago único · descarga inmediata\n\n→ link en bio ♡',
        },
        {
          n: 6,
          tipo: 'testimonio · cuando lo tengas',
          texto: '(cuando llegue el primer DM real · añádelo aquí)\n\n"..."\n— lectora ♡',
        }
      ]
    },
    {
      icon: '🌸',
      title: 'ASESORÍA 1:1',
      subtitle: 'activa desde julio · 90€ · sesión intensiva',
      priority: 'crítica',
      color: C.igDark,
      desc: 'Añade este destacado cuando lances la asesoría en julio. Alimenta con las stories de los días de lanzamiento y testimonios reales.',
      stories: [
        {
          n: 1,
          tipo: 'qué es',
          texto: 'una sesión de orientación\npara cuando el ebook\nno es suficiente ♡\n\n90 min · 90€',
        },
        {
          n: 2,
          tipo: 'para quién',
          texto: 'es para ti si:\n\n♡ llevas meses bloqueada\n♡ sabes que necesitas más que un ebook\n♡ quieres claridad real en 90 minutos',
        },
        {
          n: 3,
          tipo: 'qué incluye',
          texto: 'en 90 minutos:\n\n· diagnosticamos tu situación real\n· identificamos qué te frena\n· construimos tu mapa de siguiente paso\n· te vas con un plan concreto',
        },
        {
          n: 4,
          tipo: 'testimonio · cuando lo tengas',
          texto: '(añade el primer testimonio real aquí)\n\n"..."\n— clienta ♡',
        },
        {
          n: 5,
          tipo: 'CTA',
          texto: '90€ · plazas limitadas\n\n→ link en bio ♡',
        }
      ]
    },
    {
      icon: '😂',
      title: 'DRAMAS REALES',
      subtitle: 'humor laboral · tu contenido más compartido',
      priority: 'alta',
      color: C.ttDark,
      desc: 'Archivo de reels y posts de humor: "Top 5 películas de terror versión trabajo", "cita médica pero es entrevista", "tenemos que hablar", correos del jefe a las 21h. Es lo más compartible.',
      stories: [
        {
          n: 1,
          tipo: 'portada',
          texto: '✦\ndramas\nreales\n\nsi trabajas, esto te suena',
        },
        {
          n: '2+',
          tipo: 'arrastra los reels de humor',
          texto: 'qué meter aquí:\n\n· top 5 películas de terror versión trabajo\n· cita médica pero es entrevista\n· tenemos que hablar\n· correo del jefe a las 21h\n· búsqueda de empleo como serie de netflix\n· (cada reel de humor que publiques)',
        }
      ]
    },
    {
      icon: '💌',
      title: 'NEWSLETTER',
      subtitle: 'convertir seguidoras en suscriptoras',
      priority: 'alta',
      color: C.ssDark,
      desc: 'La newsletter es donde tienes la audiencia más caliente. Domingos · una carta sobre trabajo y lo que aprendí esa semana.',
      stories: [
        {
          n: 1,
          tipo: 'qué es',
          texto: 'todos los domingos\nuna carta\nsobre trabajo\ny lo que aprendí esa semana ♡',
        },
        {
          n: 2,
          tipo: 'qué cuento',
          texto: 'cuento:\n\n· lo que NO publico en IG\n· números reales\n· dudas y aprendizajes\n· detrás de cámaras',
        },
        {
          n: 3,
          tipo: 'CTA suscripción',
          texto: '¿te apetece que te llegue\ncada domingo?\n\n→ link en bio',
        }
      ]
    },
    {
      icon: '🎯',
      title: 'MUJERES QUE INSPIRAN',
      subtitle: 'tu archivo de referentes · martes',
      priority: 'media',
      color: C.igDark,
      desc: 'Arrastra las stories de los martes aquí. Lola Índigo, Sabrina Carpenter, Charli XCX, Rosalía, Frida Kahlo, Isabel Allende, Vera Wang, Arianna Huffington...',
      stories: [
        {
          n: 1,
          tipo: 'portada',
          texto: '✦\nmujeres\nque inspiran\n\nmi archivo personal',
        },
        {
          n: '2+',
          tipo: 'una story por cada mujer',
          texto: 'arrastra aquí cada martes:\n\n· Lola Índigo\n· Sabrina Carpenter\n· Charli XCX\n· Rosalía\n· Frida Kahlo\n· Isabel Allende\n· Vera Wang\n· Arianna Huffington\n· Simone Biles\n· (y las que vayan llegando)',
        }
      ]
    },
    {
      icon: '📚',
      title: 'RECURSOS PRÁCTICOS',
      subtitle: 'tu archivo educativo · lunes y viernes',
      priority: 'media',
      color: C.liDark,
      desc: 'Lo más buscado por la audiencia: CV, LinkedIn, contratos, derechos laborales, entrevistas, cómo decir NO, síndrome de la impostora.',
      stories: [
        {
          n: 1,
          tipo: 'portada',
          texto: '✦\nrecursos\nprácticos\n\npara cuando los necesites',
        },
        {
          n: '2+',
          tipo: 'arrastra contenido educativo',
          texto: 'qué meter aquí:\n\n· cómo organizar tu LinkedIn en 30 min\n· 5 cosas que tu contrato tiene que decir\n· 5 derechos laborales que nadie te explica\n· cómo preparar una entrevista en 1 hora\n· cómo decir NO en el trabajo (5 frases)\n· el síndrome de la impostora explicado\n· (cada carrusel educativo del lunes/viernes)',
        }
      ]
    },
    {
      icon: '☕',
      title: 'SIN FILTROS',
      subtitle: 'tu lado humano · behind the scenes',
      priority: 'media',
      color: C.ttDark,
      desc: 'Behind the scenes, domingos de planning, el concierto de Bad Bunny, el viaje a República Dominicana, días flojos. Lo que diferencia una cuenta real de una robotizada.',
      stories: [
        {
          n: 1,
          tipo: 'portada',
          texto: '☕\nsin filtros\n\nlo que no cabe\nen el feed ♡',
        },
        {
          n: '2+',
          tipo: 'arrastra momentos reales',
          texto: 'qué meter aquí:\n\n· detrás del lanzamiento del ebook\n· el viaje a república dominicana\n· el concierto de bad bunny\n· domingos de planning\n· días flojos · cierres de mes\n· (cada post de storytelling personal)',
        }
      ]
    },
  ];

  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11, color:C.inkSoft, letterSpacing:2, textTransform:'uppercase', marginBottom:8}}>
          redes
        </div>
        <H size="lg" style={{fontStyle:'italic'}}>
          historias destacadas <Sparkles size={22} style={{display:'inline', color:C.accent, verticalAlign:'middle'}}/>
        </H>
        <div style={{fontSize:13, color:C.inkSoft, marginTop:10, maxWidth:680, lineHeight:1.6}}>
          tus destacadas son tu carta de presentación permanente · lo primero que ve quien entra a tu perfil. aquí tienes los <strong style={{color:C.ink}}>7 destacados estratégicos</strong> con todos los textos exactos para crearlos ♡
        </div>
      </div>

      {/* RESUMEN VISUAL · LAS 7 PORTADAS EN ORDEN */}
      <Card style={{marginBottom:20, padding:18, background:`linear-gradient(135deg, ${C.bgSoft} 0%, ${C.card} 100%)`}}>
        <H size="sm" style={{marginBottom:14}}>orden estratégico ✦</H>
        <div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:6}}>
          {highlights.map((h, i) => (
            <div key={i} onClick={() => setExpanded(i)} style={{
              minWidth:90, cursor:'pointer', textAlign:'center',
              opacity: expanded === i ? 1 : 0.6,
              transition:'opacity 0.15s'
            }}>
              <div style={{
                width:80, height:80, borderRadius:100, 
                background: C.card, border:`2px solid ${h.color}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 6px', fontSize:32,
                boxShadow: expanded === i ? `0 4px 12px ${h.color}40` : 'none'
              }}>
                {h.icon}
              </div>
              <div style={{
                fontSize:9, fontWeight:600, color:h.color, 
                textTransform:'uppercase', letterSpacing:0.5, lineHeight:1.2
              }}>
                {h.title.length > 16 ? h.title.slice(0,14)+'…' : h.title}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          fontSize:11, color:C.inkSoft, marginTop:14, fontStyle:'italic', textAlign:'center'
        }}>
          los 3 primeros venden · los 4 siguientes construyen comunidad
        </div>
      </Card>

      {/* TIPS GENERALES · DISEÑO COHERENTE */}
      <Card style={{marginBottom:20, padding:18, borderLeft:`3px solid ${C.accent}`}}>
        <H size="sm" style={{marginBottom:12}}>portadas minimalistas · cómo hacerlas</H>
        <div style={{fontSize:12, color:C.ink, lineHeight:1.7}}>
          <div style={{marginBottom:8}}>
            <strong style={{color:C.accent}}>fondo</strong> · crema (#FFF5F6) o rosa pastel (#FDE4EC)
          </div>
          <div style={{marginBottom:8}}>
            <strong style={{color:C.accent}}>tipografía</strong> · Fraunces serif italic · 24-32pt · color #4A2A35
          </div>
          <div style={{marginBottom:8}}>
            <strong style={{color:C.accent}}>iconos</strong> · solo el ✦ pequeño · NO emojis grandes
          </div>
          <div style={{marginBottom:8}}>
            <strong style={{color:C.accent}}>composición</strong> · texto centrado · breathing room generoso · estilo editorial
          </div>
          <div style={{
            marginTop:12, padding:10, background:C.bgSoft, borderRadius:8, 
            fontFamily:"'Fraunces', serif", fontStyle:'italic', textAlign:'center'
          }}>
            ejemplo de portada:<br/>
            <span style={{fontSize:18, color:C.accent}}>✦</span><br/>
            <span style={{fontSize:16, color:C.ink}}>empieza<br/>aquí</span>
          </div>
        </div>
      </Card>

      {/* LISTADO DE DESTACADAS · CADA UNA CON STORIES DETALLADAS */}
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {highlights.map((h, i) => {
          const isOpen = expanded === i;
          const priorityColors = {
            'crítica': '#D85A6F',
            'alta': '#D49770', 
            'media': '#7BA2C2',
            'baja': C.inkSoft
          };
          return (
            <Card key={i} style={{
              padding:0, overflow:'hidden',
              borderLeft:`4px solid ${h.color}`,
              transition:'all 0.2s'
            }}>
              {/* Header clickable */}
              <div onClick={() => setExpanded(isOpen ? -1 : i)} style={{
                padding:'16px 20px', cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                background: isOpen ? `${h.color}08` : 'transparent'
              }}>
                <div style={{display:'flex', alignItems:'center', gap:14, flex:1}}>
                  <div style={{
                    width:48, height:48, borderRadius:100, 
                    background:`${h.color}20`, 
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:22, flexShrink:0
                  }}>
                    {h.icon}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:2, flexWrap:'wrap'}}>
                      <span style={{
                        fontFamily:"'Fraunces', serif", fontSize:16, fontWeight:600,
                        color:C.ink, letterSpacing:0.5
                      }}>
                        {i+1}. {h.title}
                      </span>
                      <span style={{
                        fontSize:9, padding:'2px 8px', borderRadius:100, 
                        background: priorityColors[h.priority], color:'#fff',
                        textTransform:'uppercase', fontWeight:700, letterSpacing:0.5
                      }}>
                        {h.priority}
                      </span>
                    </div>
                    <div style={{fontSize:12, color:C.inkSoft, fontStyle:'italic'}}>
                      {h.subtitle}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize:16, color:h.color, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition:'transform 0.2s', flexShrink:0
                }}>
                  ▼
                </div>
              </div>
              
              {/* Content expandible */}
              {isOpen && (
                <div style={{padding:'0 20px 20px', borderTop:`1px solid ${h.color}20`}}>
                  <div style={{
                    margin:'14px 0 18px', fontSize:12, color:C.ink, 
                    lineHeight:1.6, padding:'10px 14px',
                    background:`${h.color}10`, borderRadius:8
                  }}>
                    💡 <strong>{h.desc}</strong>
                  </div>
                  
                  <div style={{
                    fontSize:10, color:C.inkSoft, fontWeight:600, 
                    textTransform:'uppercase', letterSpacing:1, marginBottom:10
                  }}>
                    stories que van dentro · texto exacto para copiar
                  </div>
                  
                  <div style={{display:'flex', flexDirection:'column', gap:10}}>
                    {h.stories.map((s, j) => (
                      <div key={j} style={{
                        padding:14, background:C.card, borderRadius:10,
                        border:`1px solid ${C.borderSoft}`
                      }}>
                        {/* Header story */}
                        <div style={{
                          display:'flex', gap:10, alignItems:'center', marginBottom:8,
                          paddingBottom:8, borderBottom:`1px dashed ${C.borderSoft}`
                        }}>
                          <span style={{
                            width:28, height:28, borderRadius:100,
                            background:h.color, color:'#fff',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:11, fontWeight:700, flexShrink:0
                          }}>
                            {s.n}
                          </span>
                          <span style={{
                            fontSize:12, fontWeight:600, color:C.ink,
                            fontFamily:"'Fraunces', serif", fontStyle:'italic'
                          }}>
                            {s.tipo}
                          </span>
                        </div>
                        
                        {/* Fondo / estilo */}
                        <div style={{fontSize:11, color:C.inkSoft, marginBottom:8}}>
                          🎨 <strong style={{color:C.ink}}>fondo:</strong> {s.fondo}
                        </div>
                        
                        {/* Texto a copiar */}
                        <div style={{
                          fontSize:13, color:C.ink, padding:'12px 14px', 
                          background:C.bgSoft, borderRadius:8,
                          fontFamily:"'Fraunces', serif", fontStyle:'italic',
                          whiteSpace:'pre-wrap', lineHeight:1.5,
                          marginBottom:8
                        }}>
                          {s.texto}
                        </div>
                        
                        {/* tip: design instructions hidden — user handles design */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* CHECKLIST FINAL */}
      <Card style={{marginTop:20, padding:18, background:`linear-gradient(135deg, ${C.accent}10 0%, ${C.card} 100%)`, border:`1px solid ${C.accent}30`}}>
        <H size="sm" style={{marginBottom:12, color:C.accent}}>✦ próximos pasos para ti</H>
        <div style={{fontSize:12, color:C.ink, lineHeight:1.8}}>
          <div style={{marginBottom:6}}>
            <strong style={{color:C.accent}}>1.</strong> esta semana · crea las 7 portadas en Canva (30 min)
          </div>
          <div style={{marginBottom:6}}>
            <strong style={{color:C.accent}}>2.</strong> empieza por <strong>"empieza aquí"</strong> · es la más urgente · cada nuevo seguidor la mira
          </div>
          <div style={{marginBottom:6}}>
            <strong style={{color:C.accent}}>3.</strong> mientras subes mayo · arrastra a destacadas las stories que correspondan
          </div>
          <div>
            <strong style={{color:C.accent}}>4.</strong> reseñas y testimonios reales · ve añadiéndolas a "tu próximo capítulo" cuando lleguen
          </div>
        </div>
      </Card>
      
      <div style={{
        fontSize:11, color:C.inkSoft, marginTop:20, fontStyle:'italic', 
        textAlign:'center', maxWidth:600, margin:'20px auto'
      }}>
        clic en cualquier destacado para ver los textos exactos ♡
      </div>
    </div>
  );
}
