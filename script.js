(function(){
  const C = window.CARD_CONFIG || {};
  const $ = (id)=>document.getElementById(id);
  $('year').textContent = new Date().getFullYear();
  const fullName = ((C.givenName||'Vorname') + ' ' + (C.familyName||'Nachname')).trim();
  $('name').textContent = fullName;
  $('subtitle').textContent = ((C.jobTitle||'Titel / Rolle') + ' · ' + (C.organization||'Firma')).trim();

  document.getElementById('telLink').href = 'tel:' + (C.phone||'').replace(/\s+/g,'');
  document.getElementById('telValue').textContent = C.phone||'';
  document.getElementById('mailLink').href = 'mailto:' + (C.email||'');
  document.getElementById('mailValue').textContent = C.email||'';
  document.getElementById('webLink').href = C.website||'#';
  document.getElementById('webValue').textContent = (C.website||'').replace(/^https?:\/\//,'');
  document.getElementById('liLink').href = C.linkedin||'#';
  document.getElementById('liValue').textContent = C.linkedin ? (C.linkedin.split('/').pop() || 'LinkedIn') : '—';

  function escapeV(s){ return String(s||'').replace(/,/g,'\\,').replace(/;/g,'\\;').replace(/\n/g,'\\n'); }
  function buildVCard(){
    const now = new Date().toISOString().replace(/\.\d{3}Z$/,'Z');
    return [
      'BEGIN:VCARD','VERSION:3.0',
      'N:' + escapeV(C.familyName||'') + ';' + escapeV(C.givenName||'') + ';;;',
      'FN:' + escapeV(fullName),
      'ORG:' + escapeV(C.organization||''),
      'TITLE:' + escapeV(C.jobTitle||''),
      'TEL;TYPE=CELL,VOICE:' + escapeV(C.phone||''),
      'EMAIL;TYPE=INTERNET,PREF:' + escapeV(C.email||''),
      'URL:' + escapeV(C.website||''),
      'ADR;TYPE=WORK:;;' + escapeV(C.street||'') + ';' + escapeV(C.city||'') + ';;' + escapeV(C.postalCode||'') + ';' + escapeV(C.country||''),
      'REV:' + now,'END:VCARD'
    ].join('\n');
  }
  function download(filename, text){
    const blob = new Blob([text], {type:'text/vcard;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 0);
  }
  document.getElementById('downloadBtn').addEventListener('click', function(e){
    e.preventDefault(); download(fullName.replace(/\s+/g,'_') + '.vcf', buildVCard());
  });
  document.getElementById('addBtn').addEventListener('click', function(){
    download(fullName.replace(/\s+/g,'_') + '.vcf', buildVCard());
  });
})();
