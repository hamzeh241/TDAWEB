const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const converter = document.querySelector('[data-converter]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
};

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    navMenu?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

const normalizeNumber = (value) => Number(String(value).replace(/[۰-۹]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)).replace(/[٠-٩]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)).replace(/,/g, '').replace(/٬/g, '').trim()) || 0;
const formatNumber = (value, maximumFractionDigits = 0) => new Intl.NumberFormat('fa-IR', { maximumFractionDigits }).format(value);

const initConverter = () => {
  if (!converter) return;

  const mockTrxPrice = 22.2222;
  const tabs = converter.querySelectorAll('[data-trade-tab]');
  const input = converter.querySelector('[data-converter-input]');
  const result = converter.querySelector('[data-converter-result]');
  const inputLabel = converter.querySelector('[data-input-label]');
  const inputUnit = converter.querySelector('[data-input-unit]');
  const outputLabel = converter.querySelector('[data-output-label]');
  const outputUnit = converter.querySelector('[data-output-unit]');
  const resultLabel = converter.querySelector('[data-result-label]');
  const cta = converter.querySelector('[data-converter-cta]');
  let mode = 'buy';

  const render = () => {
    const amount = normalizeNumber(input.value);

    if (mode === 'buy') {
      inputLabel.textContent = 'پرداخت به تومان';
      inputUnit.textContent = 'تومان';
      outputLabel.textContent = 'دریافت TRX';
      outputUnit.textContent = 'TRX';
      resultLabel.textContent = 'مقدار تقریبی دریافتی';
      cta.textContent = 'خرید سریع TRX';
      result.textContent = `${formatNumber(amount / mockTrxPrice, 2)} TRX`;
      return;
    }

    inputLabel.textContent = 'مقدار فروش TRX';
    inputUnit.textContent = 'TRX';
    outputLabel.textContent = 'دریافت تومان';
    outputUnit.textContent = 'تومان';
    resultLabel.textContent = 'مبلغ تقریبی دریافتی';
    cta.textContent = 'فروش TRX و دریافت ریال';
    result.textContent = `${formatNumber(amount * mockTrxPrice)} تومان`;
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      mode = tab.dataset.mode;
      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });
      input.value = mode === 'buy' ? '۱,۰۰۰,۰۰۰' : '۴۵,۰۰۰';
      render();
    });
  });

  input.addEventListener('input', render);
  render();
};

window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();
initConverter();
