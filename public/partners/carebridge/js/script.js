// Mobile navigation toggle + close on link click
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

(function () {
  const accordions = document.querySelectorAll('.faq-accordion');
  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    const items = Array.from(accordion.querySelectorAll('.faq-item'));
    if (!items.length) return;

    const openItems = items.filter((item) => item.open);
    if (!openItems.length) {
      items[0].open = true;
    } else if (openItems[0] !== items[0] && accordion.classList.contains('home-faq-accordion')) {
      openItems.forEach((item) => {
        item.open = false;
      });
      items[0].open = true;
    } else if (openItems.length > 1) {
      openItems.slice(1).forEach((item) => {
        item.open = false;
      });
    }

    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) {
          if (!items.some((candidate) => candidate.open)) {
            item.open = true;
          }
          return;
        }

        items.forEach((candidate) => {
          if (candidate !== item) {
            candidate.open = false;
          }
        });
      });
    });
  });
})();

(function () {
  const factsGrid = document.querySelector('.program-page-facts__grid');
  const programSection = document.querySelector('.program-page-section');
  if (!factsGrid || !programSection || document.querySelector('.program-page-eligibility')) {
    return;
  }

  const facts = Array.from(factsGrid.querySelectorAll('dt')).reduce((map, term) => {
    const detail = term.nextElementSibling;
    if (detail && detail.tagName === 'DD') {
      map[term.textContent.trim()] = detail.textContent.trim();
    }
    return map;
  }, {});

  const eligibilityText = facts.Eligibility;
  if (!eligibilityText) {
    return;
  }

  const titleNode = document.querySelector('.cb-blueprint-title');
  const programName = titleNode
    ? titleNode.textContent.replace(/\s+/g, ' ').trim()
    : 'this program';

  const eligibilitySummary = (() => {
    const normalizedEligibility = eligibilityText.toLowerCase();

    if (normalizedEligibility.includes('physics') && normalizedEligibility.includes('chemistry') && normalizedEligibility.includes('biology')) {
      return 'If you completed 10+2 with PCB or PCMB, you can apply for this program.';
    }

    if (normalizedEligibility.includes('psychology as a subject')) {
      return 'If you studied Psychology in 10+2, you can apply for this program.';
    }

    if (normalizedEligibility.includes('science stream')) {
      return 'If you completed 10+2 in the Science stream, you can apply for this program.';
    }

    if (normalizedEligibility.includes('minimum 50%')) {
      return 'If you completed 10+2 or an equivalent qualification with at least 50%, you can apply for this program.';
    }

    return 'If your Class 12 qualification matches the requirement listed here, you can move ahead with admissions.';
  })();

  const section = document.createElement('section');
  section.className = 'section section--cream program-page-eligibility';

  const container = document.createElement('div');
  container.className = 'container program-page-eligibility__inner';

  const header = document.createElement('div');
  header.className = 'program-page-eligibility__header';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'program-page-eligibility__eyebrow';
  eyebrow.textContent = 'Eligibility';

  const heading = document.createElement('h2');
  heading.textContent = 'Eligibility, made simple';

  const intro = document.createElement('p');
  intro.textContent = `${programName} has a clear entry requirement. Use this quick check before you move to admissions.`;

  header.append(eyebrow, heading, intro);

  const grid = document.createElement('div');
  grid.className = 'program-page-eligibility__grid';

  [
    {
      label: 'Required qualification',
      title: 'What you need',
      body: eligibilityText
    },
    {
      label: 'Quick check',
      title: 'Who this usually includes',
      body: eligibilitySummary
    },
    {
      label: 'Before you apply',
      title: 'What to confirm',
      body: 'Keep your 10th and 12th academic details ready. If your results are pending or you want help checking your subject combination, contact admissions before applying.'
    }
  ].forEach((item) => {
    const card = document.createElement('article');
    card.className = 'program-page-eligibility__card';

    const label = document.createElement('p');
    label.className = 'program-page-eligibility__label';
    label.textContent = item.label;

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = item.title;

    const cardBody = document.createElement('p');
    cardBody.textContent = item.body;

    card.append(label, cardTitle, cardBody);
    grid.append(card);
  });

  const actions = document.createElement('div');
  actions.className = 'program-page-eligibility__actions button-row';

  const admissionsLink = document.createElement('a');
  admissionsLink.className = 'button button--orange';
  admissionsLink.href = '../../admissions.html';
  admissionsLink.textContent = 'View admissions details';

  const callLink = document.createElement('a');
  callLink.className = 'button button--navy';
  callLink.href = 'tel:+914045307444';
  callLink.textContent = 'Talk to admissions';

  actions.append(admissionsLink, callLink);
  container.append(header, grid, actions);
  section.append(container);

  programSection.insertAdjacentElement('afterend', section);
})();
