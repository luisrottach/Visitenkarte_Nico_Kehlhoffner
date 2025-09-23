(function(){
  const C = window.CARD_CONFIG;
  const $ = (id)=>document.getElementById(id);
  $('year').textContent = new Date().getFullYear();
  $('owner').textContent = C.owner || (C.givenName + ' ' + C.familyName);
  const fullName = (C.givenName + ' ' + C.familyName).trim();
  $('name').textContent = fullName;
  $('subtitle').textContent = (C.jobTitle + ' · ' + C.organization).trim();

  // Links & Werte
  $('telLink').href = 'tel:' + C.phone.replace(/\s+/g,'');
  $('telValue').textContent = C.phone;
  $('mailLink').href = 'mailto:' + C.email;
  $('mailValue').textContent = C.email;
  $('webLink').href = C.website;
  $('webValue').textContent = C.website.replace(/^https?:\/\//,'');
  $('liLink').href = C.linkedin;
  $('liValue').textContent = C.linkedin ? (C.linkedin.split('/').pop() || 'LinkedIn') : '—';

  // QR statisch aus asset; wenn Ziel-URL abweicht, einfach assets/qr ersetzen
  // Zusätzlich, wenn du live eine andere Ziel-URL willst, kannst du hier zur Not das src dynamisch setzen:
  // document.getElementById('qrImg').src = 'assets/qr_visitenkarte_512.png';

  // vCard aus denselben Daten generieren (UTF-8)
  function escapeV(s){ return String(s||'').replace(/,/g,'\\,').replace(/;/g,'\\;').replace(/\n/g,'\\n'); }
  function buildVCard(){
    const now = new Date().toISOString().replace(/\.\d{3}Z$/,'Z');
    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:' + escapeV(C.familyName) + ';' + escapeV(C.givenName) + ';;;',
      'FN:' + escapeV(fullName),
      'ORG:' + escapeV(C.organization),
      'TITLE:' + escapeV(C.jobTitle),
      'TEL;TYPE=CELL,VOICE:' + escapeV(C.phone),
      'EMAIL;TYPE=INTERNET,PREF:' + escapeV(C.email),
      'URL:' + escapeV(C.website),
      'ADR;TYPE=WORK:;;' + escapeV(C.street) + ';' + escapeV(C.city) + ';;' + escapeV(C.postalCode) + ';' + escapeV(C.country),
      'REV:' + now,
      'END:VCARD'
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
    e.preventDefault();
    download(fullName.replace(/\s+/g,'_') + '.vcf', buildVCard());
  });
  document.getElementById('addBtn').addEventListener('click', function(){
    // auf Mobilgeräten oft direkt in Kontakte
    download(fullName.replace(/\s+/g,'_') + '.vcf', buildVCard());
  });
})();
