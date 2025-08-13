
//codi per al botó de copiar

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tooltip = btn.parentElement;
    const code = Array.from(tooltip.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE || n.nodeName === "BR")
      .map(n => n.textContent || "\n").join("");
    navigator.clipboard.writeText(code)
      .then(() => { btn.textContent = "Copiat!"; })
      .catch(() => { btn.textContent = "Error!"; });
    setTimeout(() => { btn.textContent = "Copia codi"; }, 2000);
  });
});

//codi per al botó quan no ting tooltip

(function () {
  
  async function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Fallback (execCommand)
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); }
    finally { document.body.removeChild(ta); }
  }

  // utilitat: elimina línies buides extrems i desindenta
  function cleanAndDedent(text) {
    // normalitza salts de línia
    let t = text.replace(/\r\n/g, '\n');

    // lleva línia buida inicial i final (si n'hi ha)
    t = t.replace(/^\s*\n/, '').replace(/\n\s*$/, '\n');

    const lines = t.split('\n');

    // calcula la indentació mínima de línies no buides
    const indents = lines
      .filter(l => l.trim().length > 0)
      .map(l => (l.match(/^\s*/)?.[0].length) || 0);

    const minIndent = indents.length ? Math.min(...indents) : 0;

    // desindenta
    if (minIndent > 0) {
      return lines.map(l => l.slice(minIndent)).join('\n');
    }
    return lines.join('\n');
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      // cerca el <details class="codi"> més pròxim
      const details = btn.closest('details.codi');
      if (!details) return;

      // agafa el <pre><code> dins d’este bloc
      const codeEl = details.querySelector('pre code');
      if (!codeEl) return;

      // usa innerText per obtindre el codi visible (ja decodificat de &lt; …)
      const raw = codeEl.innerText;
      const code = cleanAndDedent(raw);

      const original = btn.textContent;
      try {
        await copyTextToClipboard(code);
        btn.textContent = 'Copiat!';
      } catch (e) {
        btn.textContent = 'Error!';
      } finally {
        setTimeout(() => { btn.textContent = original || 'Copia codi'; }, 2000);
      }
    });
  });
})();



// codi per a que es retrase la desaparició del tooltip 

// document.querySelectorAll('.element').forEach(element => {
//   const tooltip = element.querySelector('.tooltip');
//   let hideTimeout;
//   let showTimeout;

//   element.addEventListener('mouseenter', () => {
//     clearTimeout(hideTimeout);
//     showTimeout = setTimeout(()=>{
//        tooltip.style.display = 'block';
//     })
   
//   });

//   element.addEventListener('mouseleave', () => {
   
//     hideTimeout = setTimeout(() => {
//       tooltip.style.display = 'none';
//     }, 100); // espera 0,1 segons abans de desaparèixer
//   });
// });


// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.info-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const panel = btn.closest('.element').querySelector('.info-panel');
//       const isHidden = panel.hasAttribute('hidden');

//       if (isHidden) {
//         panel.removeAttribute('hidden');
//         btn.setAttribute('aria-expanded', 'true');
//       } else {
//         panel.setAttribute('hidden', '');
//         btn.setAttribute('aria-expanded', 'false');
//       }
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('info-modal');
  const modalText = document.getElementById('modal-text');
  const closeBtn = modal.querySelector('.close-btn');

  // Obrir modal amb el text corresponent
  document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const infoText = btn.getAttribute('data-info');
      //modalText.textContent = infoText; // permet HTML bàsic com <label>
      modalText.innerHTML = infoText; // permet HTML bàsic com <label>
      modal.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      closeBtn.focus();
    });
  });

  // Tancar modal
  closeBtn.addEventListener('click', () => {
    modal.hidden = true;
  });

  // Tancar modal amb tecla ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modal.hidden = true;
    }
  });
});

function validarFormulari() {
            const camps = [
            { id: 'nom', missatge: 'nom-error' },
            { id: 'cognom', missatge: 'cognom-error' },
            { id: 'email', missatge: 'email-error' }
            ];

            camps.forEach(camp => {
            const input = document.getElementById(camp.id);
            const error = document.getElementById(camp.missatge);

            if (!input.checkValidity()) {
            error.style.display = 'inline';
            input.setAttribute('aria-invalid', 'true');
            } else {
            error.style.display = 'none';
            input.removeAttribute('aria-invalid');
            }
            });
            }
