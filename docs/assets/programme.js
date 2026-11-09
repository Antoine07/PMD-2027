(() => {
  'use strict';
  function init({ plan, model, onSelect, onMonth }) {
    const $ = id => document.getElementById(id);
    const make = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; };
    const format = date => model.parse(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    let view = 'days';
    let selectedMonth = '';
    const days = model.courseDays(plan);
    const weeks = model.courseWeeks(plan.startDate, plan.months.length).map(week => ({ ...week, goal: plan.weeklyGoals.find(item => item.number === week.number), sessions: plan.sessions.filter(session => { const date = model.sessionDate(session, plan.startDate, plan.calendar?.holidays); return date >= week.start && date <= week.end; }) }));
    function modules(sessions) {
      const list = make('div', 'programme-module-list');
      sessions.forEach(session => { const button = make('button', '', session.title); button.type = 'button'; button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-controls', 'intervention-dialog'); button.title = session.trainers.map(id => plan.trainers.find(person => person.id === id)?.name || id).join(' · '); button.addEventListener('click', () => onSelect(session)); list.append(button); });
      if (!sessions.length) list.append(make('span', 'programme-empty', 'Travail d’équipe ; intervention à positionner si nécessaire.'));
      return list;
    }
    function render() {
      document.querySelectorAll('[data-programme-view]').forEach(button => { const selected = button.dataset.programmeView === view; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected)); });
      const target = $('programme-content'); target.replaceChildren(); target.className = `programme-content programme-${view}`;
      if (view === 'days') {
        const table = make('table', 'programme-table programme-daily-table'); table.append(make('caption', 'visually-hidden', 'Trame pédagogique quotidienne proposée, du 1er janvier au 30 juin 2027. Horaires et vacances à préciser.'));
        const head = make('thead'), heading = make('tr');
        ['JOUR', 'ÉTAPE', 'INTERVENTIONS ET RESPONSABLES', 'TRAVAIL PROPOSÉ', 'PREUVE ET ARGUMENTATION'].forEach(text => { const th = make('th', '', text); th.scope = 'col'; heading.append(th); }); head.append(heading); table.append(head);
        const body = make('tbody');
        days.filter(day => !selectedMonth || day.month === Number(selectedMonth)).forEach(day => {
          const row = make('tr', day.active ? '' : 'programme-nonworking'); const th = make('th', 'programme-week'); th.scope = 'row';
          th.append(make('strong', '', model.parse(day.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })), make('span', '', `S${day.week} · M${day.month}`)); row.append(th, make('td', 'programme-focus', day.focus));
          const sessionCell = make('td'); sessionCell.append(modules(day.sessions));
          if (!day.active) sessionCell.replaceChildren(make('span', 'programme-empty', 'Aucune activité imposée'));
          else if (day.sessions.length) sessionCell.append(make('small', 'programme-people', [...new Set(day.sessions.flatMap(session => session.trainers))].map(id => plan.trainers.find(person => person.id === id)?.name || id).join(' · ')));
          const work = make('td', '', day.work); const proof = make('td'); proof.append(make('strong', 'programme-proof', day.deliverable), make('p', 'programme-defense', day.defense)); row.append(sessionCell, work, proof); body.append(row);
        }); table.append(body); target.append(table);
      } else if (view === 'weeks') {
        const table = make('table', 'programme-table'); table.append(make('caption', 'visually-hidden', 'Programme semaine par semaine sur les six mois. La première et la dernière semaine sont partielles.'));
        const head = make('thead'), heading = make('tr');
        ['SEMAINE', 'ÉTAPE', 'MODULES ET INTERVENANTS', 'TRAVAIL ET LIVRABLE', 'PROPOSITION À DÉFENDRE'].forEach(text => { const th = make('th', '', text); th.scope = 'col'; heading.append(th); }); head.append(heading); table.append(head);
        const body = make('tbody');
        weeks.filter(week => !selectedMonth || week.month === Number(selectedMonth)).forEach(week => {
          const row = make('tr'); const th = make('th', 'programme-week'); th.scope = 'row';
          th.append(make('strong', '', `S${week.number}`), make('span', '', `${format(week.start)} → ${format(week.end)}`)); if (week.partial) th.append(make('small', '', 'Semaine partielle')); row.append(th);
          row.append(make('td', 'programme-focus', week.goal?.title || 'Programme à préciser'));
          const sessions = make('td'); sessions.append(modules(week.sessions));
          const people = [...new Set(week.sessions.flatMap(session => session.trainers))].map(id => plan.trainers.find(person => person.id === id)?.name || id).join(' · '); if (people) sessions.append(make('small', 'programme-people', people)); row.append(sessions);
          const work = make('td'); work.append(make('p', '', week.goal?.work || ''), make('strong', 'programme-proof', week.goal?.deliverable || '')); row.append(work, make('td', 'programme-defense', week.goal?.defense || '')); body.append(row);
        });
        table.append(body); target.append(table);
      } else {
        const grid = make('div', 'programme-month-grid');
        plan.months.forEach((month, index) => {
          if (view === 'months' && selectedMonth && index + 1 !== Number(selectedMonth)) return;
          const card = make('article', 'programme-month-card');
          const start = model.addMonths(plan.startDate, index), end = model.addDays(model.addMonths(plan.startDate, index + 1), -1);
          card.append(make('p', 'eyebrow', `M${index + 1} · ${format(start)} → ${format(end)}`), make('h4', '', plan.learning.months[index].milestone));
          const selected = weeks.filter(week => week.month === index + 1);
          const list = make('ol'); selected.forEach(week => list.append(make('li', '', `S${week.number} · ${week.goal?.title || 'À préciser'}`))); card.append(list);
          card.append(make('p', 'programme-proof', plan.learning.months[index].proof));
          if (view === 'months') { card.append(make('p', '', month.program)); card.append(modules(plan.sessions.filter(session => session.month === index + 1))); }
          const button = make('button', 'calendar-button', 'Voir ce mois dans le calendrier →'); button.type = 'button'; button.addEventListener('click', () => onMonth(index)); card.append(button); grid.append(card);
        }); target.append(grid);
      }
      $('programme-month-filter').hidden = view === 'course';
      $('programme-status').textContent = `${weeks.length} semaines calendaires, dont ${weeks.filter(week => week.partial).length} partielles · dates d’intervention proposées`;
    }
    $('programme-month-filter').addEventListener('change', event => { selectedMonth = event.target.value; render(); });
    document.querySelectorAll('[data-programme-view]').forEach(button => button.addEventListener('click', () => { view = button.dataset.programmeView; render(); }));
    render();
  }
  window.HETIC_PROGRAMME = Object.freeze({ init });
})();
