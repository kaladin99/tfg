
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
      modalText.textContent = infoText; // permet HTML bàsic com <label>
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


