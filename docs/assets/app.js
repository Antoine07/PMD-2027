(() => {
  'use strict';
  const plan = window.HETIC_PLANNING;
  const calendar = window.HETIC_CALENDAR;
  const $ = id => document.getElementById(id);
  const today = (() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  })();
  const initialStart = calendar.isDate(plan.startDate) ? plan.startDate : null;
  const state = { view: 'course', index: 0, start: initialStart, cursor: initialStart || today, search: '', trainer: '', category: 'all' };
  const categories = { cours: 'Cours & ateliers', coaching: 'Coaching', projet: 'Projet & clients', cyber: 'Cybersécurité', demo: 'Demo Day' };
  $('mously-share').textContent = String(plan.allocation.mouslyTotal);
  $('cyber-share').textContent = String(plan.allocation.cyber);
  $('allocation-note').textContent = `Mously : ${plan.allocation.mouslyTotal} % du volume total (${plan.allocation.cours} % théorie/pratique + ${plan.allocation.coaching} % coaching). Contenu cybersécurité : ${plan.allocation.cyber} % du volume total ; affectation des heures aux intervenants à préciser.`;
  const format = (value, options = { day: 'numeric', month: 'short' }) => calendar.parse(value).toLocaleDateString('fr-FR', { ...options, timeZone: 'UTC' });
  const element = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const trainerNames = session => session.trainers.map(id => plan.trainers.find(person => person.id === id)?.name || id).join(' · ');

  function selectMonth(index) {
    state.index = index;
    const month = plan.months[index];
    const values = { badge: `M${index + 1}`, title: month.title, people: month.people, program: month.program, learning: month.learning, apps: month.apps, cyber: month.cyber, client: month.client, deliverable: month.deliverable };
    Object.entries(values).forEach(([key, value]) => { $(`month-${key}`).textContent = value; });
    document.querySelectorAll('[data-select-month]').forEach(button => {
      const selected = Number(button.dataset.selectMonth) === index;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  function openIntervention(session) {
    selectMonth(session.month - 1);
    const date = calendar.sessionDate(session, state.start);
    $('dialog-period').textContent = `HETIC · M${session.month} · ${categories[session.category]}${date ? ` · ${format(date)}${session.date ? ' · date renseignée' : ' · date proposée'}` : ' · date à préciser'}`;
    $('dialog-title').textContent = session.title;
    $('dialog-trainers').textContent = trainerNames(session);
    $('dialog-description').textContent = session.description;
    $('dialog-learning').textContent = plan.months[session.month - 1].learning;
    $('dialog-apps').textContent = plan.months[session.month - 1].apps;
    $('dialog-cyber').textContent = plan.months[session.month - 1].cyber;
    $('dialog-client').textContent = plan.months[session.month - 1].client;
    if (typeof $('intervention-dialog').showModal === 'function') $('intervention-dialog').showModal();
    else $('month-detail').scrollIntoView({ block: 'nearest' });
  }

  function interventionCard(session) {
    const person = plan.trainers.find(item => item.id === session.trainers[0]);
    const date = calendar.sessionDate(session, state.start);
    const card = element('button', `intervention-card category-${session.category}`);
    card.type = 'button';
    card.style.setProperty('--event-color', person?.color || '#6c58d5');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-controls', 'intervention-dialog');
    card.setAttribute('aria-label', `${session.title}, mois ${session.month}, ${trainerNames(session)}, ${date ? format(date) : 'date à préciser'}`);
    const top = element('span', 'intervention-top');
    top.append(element('span', 'intervention-type', categories[session.category]), element('span', 'intervention-dot', ''));
    const footer = element('span', 'intervention-person');
    footer.append(element('i', '', person?.initials || 'EQ'), element('span', '', trainerNames(session)));
    card.append(top, element('strong', '', session.title), element('span', 'intervention-school', 'HETIC · Parcours projet'), element('span', 'intervention-timing', date ? `${format(date)} · ${session.date ? 'date renseignée' : 'proposé'}` : 'Date et horaires à préciser'));
    if (session.addition) card.append(element('span', 'intervention-extra', 'Complément proposé'));
    card.append(footer);
    card.addEventListener('click', () => openIntervention(session));
    return card;
  }

  function monthColumn(index, sessions) {
    const column = element('section', 'calendar-column project-month');
    column.dataset.columnMonth = String(index);
    column.setAttribute('aria-label', `Mois ${index + 1} : ${plan.months[index].title}`);
    const header = element('button', 'calendar-column-heading');
    header.type = 'button';
    header.dataset.selectMonth = String(index);
    header.setAttribute('aria-controls', 'month-detail');
    header.append(element('span', 'column-kicker', 'PARCOURS PROJET'), element('strong', 'column-number', `M${index + 1}`), element('span', 'column-stage', plan.months[index].title));
    if (state.start) header.append(element('span', 'column-dates', `${format(calendar.addMonths(state.start, index))} → ${format(calendar.addDays(calendar.addMonths(state.start, index + 1), -1))}`));
    header.append(element('small', '', `${sessions.length} bloc${sessions.length > 1 ? 's' : ''} proposé${sessions.length > 1 ? 's' : ''}`));
    header.addEventListener('click', () => {
      selectMonth(index);
      $('previous-period').disabled = index === 0;
      $('next-period').disabled = index === plan.months.length - 1;
    });
    column.append(header);
    const body = element('div', 'calendar-column-body');
    Object.entries(categories).forEach(([category, title]) => {
      const items = sessions.filter(item => item.category === category);
      if (!items.length) return;
      const group = element('section', 'calendar-card-group');
      group.append(element('h3', 'calendar-group-label', title));
      items.forEach(item => group.append(interventionCard(item)));
      body.append(group);
    });
    if (!sessions.length) body.append(element('p', 'empty-column', 'Aucun bloc pour ces filtres'));
    column.append(body);
    return column;
  }

  function dayColumn(date, sessions) {
    const weekday = calendar.parse(date).getUTCDay();
    const column = element('section', `calendar-column day-column${[0, 6].includes(weekday) ? ' weekend' : ''}${date === today ? ' today' : ''}`);
    column.dataset.date = date;
    column.setAttribute('aria-label', format(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    const header = element('header', 'calendar-column-heading');
    header.append(element('span', 'column-kicker', format(date, { weekday: 'long' })), element('strong', 'column-number', format(date, { day: '2-digit' })), element('span', 'column-stage', format(date, { month: 'long' })), element('small', '', `${sessions.length} bloc${sessions.length > 1 ? 's' : ''}`));
    if (date === today) header.append(element('span', 'today-label', 'Aujourd’hui'));
    const body = element('div', 'calendar-column-body');
    sessions.forEach(session => body.append(interventionCard(session)));
    if (!sessions.length) body.append(element('p', 'empty-column', 'Aucune intervention'));
    column.append(header, body);
    return column;
  }

  function focusColumn() {
    const target = state.view === 'course'
      ? document.querySelector(`[data-column-month="${state.index}"]`)
      : document.querySelector(`[data-date="${state.cursor}"]`);
    if (!target) return;
    const viewport = $('calendar-scroll');
    const bounds = viewport.getBoundingClientRect();
    const column = target.getBoundingClientRect();
    viewport.scrollLeft = Math.max(0, viewport.scrollLeft + column.left - bounds.left - (viewport.clientWidth - column.width) / 2);
  }

  function render(focus = false) {
    const sessions = calendar.filterSessions(plan.sessions, state, plan.trainers);
    const grid = $('calendar-grid');
    grid.replaceChildren();
    const dated = state.view !== 'course' && Boolean(state.start);
    grid.className = `calendar-grid${dated ? ' dated-grid' : state.view === 'month' ? ' abstract-month' : ''}`;
    let visible = [];
    if (dated) {
      const days = calendar.daysInView(state.view, state.cursor);
      grid.style.setProperty('--column-count', String(days.length));
      visible = sessions.filter(session => days.includes(calendar.sessionDate(session, state.start)));
      days.forEach(date => grid.append(dayColumn(date, visible.filter(session => calendar.sessionDate(session, state.start) === date))));
      $('period-label').textContent = state.view === 'week'
        ? `${format(days[0])} → ${format(days.at(-1), { day: 'numeric', month: 'short', year: 'numeric' })}`
        : format(state.cursor, { month: 'long', year: 'numeric' });
    } else {
      const indexes = state.view === 'month' ? [state.index] : plan.months.map((_, index) => index);
      grid.style.setProperty('--column-count', String(indexes.length));
      visible = sessions.filter(session => indexes.includes(session.month - 1));
      indexes.forEach(index => grid.append(monthColumn(index, visible.filter(session => session.month === index + 1))));
      $('period-label').textContent = state.view === 'course' ? 'Parcours complet · M1 à M6' : `M${state.index + 1} · ${plan.months[state.index].title}`;
    }
    $('result-count').textContent = `${visible.length} bloc${visible.length > 1 ? 's' : ''} proposé${visible.length > 1 ? 's' : ''}`;
    $('calendar-empty').hidden = visible.length > 0;
    $('calendar-scroll').hidden = !dated && visible.length === 0;
    $('previous-period').disabled = !dated && state.index === 0;
    $('next-period').disabled = !dated && state.index === plan.months.length - 1;
    document.querySelector('[data-view="week"]').disabled = !state.start;
    $('go-today').hidden = !state.start;
    document.querySelectorAll('[data-view]').forEach(button => {
      const selected = button.dataset.view === state.view;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-category]').forEach(button => {
      const selected = button.dataset.category === state.category;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    selectMonth(state.index);
    if (focus) requestAnimationFrame(focusColumn);
  }

  function movePeriod(amount) {
    if (state.view === 'course' || !state.start) state.index = Math.max(0, Math.min(plan.months.length - 1, state.index + amount));
    else {
      state.cursor = state.view === 'week' ? calendar.addDays(state.cursor, amount * 7) : calendar.addMonths(`${state.cursor.slice(0, 7)}-01`, amount);
      state.index = calendar.projectMonthIndex(state.cursor, state.start, plan.months.length);
    }
    render(true);
  }
  function resetFilters() {
    state.search = ''; state.trainer = ''; state.category = 'all';
    $('planning-search').value = ''; $('trainer-filter').value = '';
  }
  plan.trainers.forEach(person => {
    const option = element('option', '', person.name); option.value = person.id; $('trainer-filter').append(option);
  });
  $('start-date').value = state.start || '';
  $('start-date').addEventListener('change', event => {
    state.start = calendar.isDate(event.target.value) ? event.target.value : null;
    state.cursor = state.start || today;
    state.index = 0;
    if (!state.start && state.view === 'week') state.view = 'course';
    render(true);
  });
  $('previous-period').addEventListener('click', () => movePeriod(-1));
  $('next-period').addEventListener('click', () => movePeriod(1));
  $('go-start').addEventListener('click', () => { state.cursor = state.start || today; state.index = 0; render(true); });
  $('go-today').addEventListener('click', () => { state.cursor = today; state.index = calendar.projectMonthIndex(today, state.start, plan.months.length); if (state.view === 'course') state.view = 'week'; render(true); });
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    const previousView = state.view;
    state.view = button.dataset.view;
    if (state.start && previousView === 'course' && state.view !== 'course') state.cursor = calendar.addMonths(state.start, state.index);
    if (state.start && previousView !== 'course' && state.view === 'course') state.index = calendar.projectMonthIndex(state.cursor, state.start, plan.months.length);
    render(true);
  }));
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => { state.category = button.dataset.category; render(); }));
  $('planning-search').addEventListener('input', event => { state.search = event.target.value.trim(); render(); });
  $('trainer-filter').addEventListener('change', event => { state.trainer = event.target.value; render(); });
  $('reset-filters').addEventListener('click', () => { resetFilters(); render(); });
  $('empty-reset').addEventListener('click', () => { resetFilters(); state.view = 'course'; state.index = 0; state.cursor = state.start || today; render(true); });
  $('print-button').addEventListener('click', () => window.print());
  document.querySelectorAll('[data-map]').forEach(button => button.addEventListener('click', () => {
    const map = button.dataset.map;
    document.querySelectorAll('[data-map]').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button)); item.classList.toggle('selected', item === button);
    });
    document.querySelectorAll('[data-map]').forEach(item => { $(`map-${item.dataset.map}`).hidden = item.dataset.map !== map; });
    $('map-download').href = `assets/carte-${map}.svg`;
  }));
  if ('IntersectionObserver' in window) {
    const links = Array.from(document.querySelectorAll('.nav-link'));
    const observed = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => observed.set(entry.target.id, entry.isIntersecting));
      const current = links.find(link => observed.get(link.hash.slice(1)));
      if (!current) return;
      links.forEach(link => {
        link.classList.toggle('active', link === current);
        if (link === current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-10% 0px -45% 0px', threshold: 0 });
    links.forEach(link => observer.observe(document.querySelector(link.hash)));
  }
  render();
})();
