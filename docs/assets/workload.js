/* Vue du plan de charge : répartition des blocs pédagogiques, sans estimation d'heures. */
(() => {
  'use strict';
  function init({ plan, model, categories, onSelect }) {
    const $ = id => document.getElementById(id);
    const make = (tag, className, text) => {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    };
    const phases = ['Design & cadrage', 'Bases & application', 'Premier MVP', 'Pilote client', 'Soutenance blanche', 'Demo Day'];
    const state = { axis: 'trainer', selection: null, data: null };
    const buttons = [];
    const blockLabel = count => `${count} bloc${count > 1 ? 's' : ''}`;

    function updateSelection() {
      buttons.forEach(button => {
        const active = state.selection?.id === button.dataset.loadRow && state.selection?.month === Number(button.dataset.loadMonth);
        button.classList.toggle('selected', active);
        button.setAttribute('aria-expanded', String(active));
      });
      $('load-detail').hidden = !state.selection;
      if (!state.selection) return;
      const row = state.data.rows.find(item => item.id === state.selection.id);
      const cell = row.cells[state.selection.month - 1];
      $('load-detail-title').textContent = `${row.label} · M${cell.month}`;
      $('load-detail-subtitle').textContent = `${blockLabel(cell.count)} · ${plan.months[cell.month - 1].title}`;
      const list = $('load-detail-list');
      list.replaceChildren();
      cell.sessions.forEach(session => {
        const item = make('li');
        const button = make('button', 'load-session');
        button.type = 'button';
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-controls', 'intervention-dialog');
        const person = plan.trainers.find(trainer => trainer.id === session.trainers[0]);
        button.style.setProperty('--load-person-color', person?.color || '#6c58d5');
        button.append(make('span', `load-type type-${session.category}`, categories[session.category]), make('strong', '', session.title));
        button.append(make('span', 'load-session-people', session.trainers.map(id => plan.trainers.find(trainer => trainer.id === id)?.name || id).join(' · ')));
        button.addEventListener('click', () => onSelect(session));
        item.append(button);
        list.append(item);
      });
    }

    function cellButton(row, cell) {
      const button = make('button', `load-cell intensity-${cell.intensity}`);
      button.type = 'button';
      button.dataset.loadRow = row.id;
      button.dataset.loadMonth = String(cell.month);
      button.setAttribute('aria-controls', 'load-detail');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', `${row.label}, M${cell.month}, ${blockLabel(cell.count)}. Afficher les interventions.`);
      const label = make('span', 'load-cell-label');
      label.append(make('strong', '', String(cell.count)), make('span', '', cell.count > 1 ? 'blocs' : 'bloc'));
      button.append(label);
      const bar = make('span', 'load-stack');
      bar.setAttribute('aria-hidden', 'true');
      cell.breakdown.forEach(category => {
        const segment = make('span', `load-segment type-${category.id}`);
        segment.style.width = `${category.count / cell.count * 100}%`;
        segment.title = `${category.label} : ${blockLabel(category.count)}`;
        bar.append(segment);
      });
      button.append(bar);
      const titles = make('span', 'load-mini-titles');
      titles.setAttribute('aria-hidden', 'true');
      cell.sessions.slice(0, 2).forEach(session => titles.append(make('span', '', session.title)));
      if (cell.count > 2) titles.append(make('span', 'load-more', `+ ${cell.count - 2} autre${cell.count > 3 ? 's' : ''}`));
      button.append(titles);
      button.addEventListener('click', () => {
        const same = state.selection?.id === row.id && state.selection?.month === cell.month;
        state.selection = same ? null : { id: row.id, month: cell.month };
        updateSelection();
        if (state.selection) {
          $('load-detail-title').focus({ preventScroll: true });
          $('load-detail').scrollIntoView({ block: 'nearest' });
        }
      });
      buttons.push(button);
      return button;
    }

    function render() {
      state.data = model.buildWorkload(plan.sessions, plan.trainers, { axis: state.axis, categories, monthCount: plan.months.length });
      const data = state.data;
      $('load-block-count').textContent = String(data.uniqueCount);
      $('load-participation-count').textContent = String(data.participationCount);
      $('load-contributor-count').textContent = String(data.contributorCount);
      $('load-peak-month').textContent = data.peakMonths.length ? data.peakMonths.map(month => `M${month}`).join(' · ') : '—';
      $('load-peak-count').textContent = `${blockLabel(data.peakCount)} ${data.peakCount > 1 ? 'distincts' : 'distinct'}`;
      $('load-mously-allocation').textContent = `${plan.allocation.mouslyTotal} % Mously`;
      $('load-cyber-allocation').textContent = `${plan.allocation.cyber} % cybersécurité`;
      $('load-view-status').textContent = `Vue par ${state.axis === 'trainer' ? 'intervenant' : 'activité'} · parcours complet · ${blockLabel(data.uniqueCount)} distincts`;
      document.querySelectorAll('[data-load-axis]').forEach(button => {
        const selected = button.dataset.loadAxis === state.axis;
        button.classList.toggle('selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      const table = $('load-table');
      table.replaceChildren();
      buttons.length = 0;
      table.append(make('caption', 'visually-hidden', `Répartition des blocs par ${state.axis === 'trainer' ? 'intervenant' : 'activité'} sur les six mois. Les nombres représentent des blocs pédagogiques, sans durée attribuée.`));
      const head = make('thead');
      const heading = make('tr');
      const corner = make('th', 'load-name-heading', state.axis === 'trainer' ? 'INTERVENANTS' : 'ACTIVITÉS');
      corner.scope = 'col'; heading.append(corner);
      data.months.forEach(month => {
        const th = make('th', `load-month-heading${[3, 5, 6].includes(month.month) ? ' milestone-month' : ''}`);
        th.scope = 'col';
        th.append(make('strong', '', `M${month.month}`), make('span', 'load-phase', phases[month.month - 1]), make('small', '', blockLabel(month.count)));
        const bar = make('span', 'load-month-volume');
        bar.setAttribute('aria-hidden', 'true');
        const fill = make('i');
        fill.style.width = `${data.peakCount ? month.count / data.peakCount * 100 : 0}%`;
        bar.append(fill); th.append(bar); heading.append(th);
      });
      const total = make('th', 'load-total-heading', 'TOTAL'); total.scope = 'col'; heading.append(total);
      head.append(heading); table.append(head);
      const body = make('tbody');
      data.rows.forEach(row => {
        const tr = make('tr');
        const label = make('th', 'load-row-name'); label.scope = 'row';
        const identity = make('span', 'load-identity');
        const avatar = make('span', `load-avatar${state.axis === 'category' ? ` type-${row.id}` : ''}`, row.initials || '');
        if (row.color) avatar.style.setProperty('--load-person-color', row.color);
        avatar.setAttribute('aria-hidden', 'true');
        identity.append(avatar, make('span', '', row.label)); label.append(identity); tr.append(label);
        row.cells.forEach(cell => {
          const td = make('td');
          td.append(cell.count ? cellButton(row, cell) : make('span', 'load-no-block', '—'));
          tr.append(td);
        });
        const td = make('td', 'load-row-total');
        td.append(make('strong', '', String(row.total)), make('span', '', state.axis === 'trainer' ? 'participations' : 'blocs'));
        tr.append(td); body.append(tr);
      });
      table.append(body);
      const foot = make('tfoot'); const footRow = make('tr');
      const footLabel = make('th', 'load-foot-label', 'Blocs distincts'); footLabel.scope = 'row'; footRow.append(footLabel);
      data.months.forEach(month => footRow.append(make('td', '', String(month.count))));
      footRow.append(make('td', 'load-grand-total', String(data.uniqueCount))); foot.append(footRow); table.append(foot);
      updateSelection();
    }

    document.querySelectorAll('[data-load-axis]').forEach(button => button.addEventListener('click', () => {
      state.axis = button.dataset.loadAxis;
      state.selection = null;
      render();
    }));
    $('load-show-titles').addEventListener('change', event => $('load-table-scroll').classList.toggle('show-titles', event.target.checked));
    $('load-detail-close').addEventListener('click', () => {
      const current = buttons.find(button => button.classList.contains('selected'));
      state.selection = null; updateSelection(); current?.focus();
    });
    render();
  }
  window.HETIC_WORKLOAD = Object.freeze({ init });
})();
