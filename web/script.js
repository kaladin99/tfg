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

document.querySelectorAll('.element').forEach(element => {
  const tooltip = element.querySelector('.tooltip');
  let hideTimeout;
  let showTimeout;

  element.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(()=>{
       tooltip.style.display = 'block';
    })
   
  });

  element.addEventListener('mouseleave', () => {
   
    hideTimeout = setTimeout(() => {
      tooltip.style.display = 'none';
    }, 100); // espera 0,1 segons abans de desaparèixer
  });
});


