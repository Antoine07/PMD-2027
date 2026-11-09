/* Timeline, répartitions proposées et observations individuelles documentées. */
(() => {
  'use strict';
  function init({ plan, model, onMonth }) {
    const $ = id => document.getElementById(id);
    const make = (tag, className, text) => {
      const item = document.createElement(tag);
      if (className) item.className = className;
      if (text !== undefined) item.textContent = text;
      return item;
    };
    const learning = plan.learning;
    const criteria = learning.criteria;
    const storageKey = 'hetic-learning-evidence-v1';
    const statuses = { planned: 'À préparer', in_progress: 'En cours', validated: 'Validé avec preuve' };
    const kinds = { theory: 'Théorie', practice: 'Pratique', defense: 'Argumentation' };
    const state = { month: 0, mode: 'mix', domainChart: 'donut' };
    let measures = learning.months.map(month => ({ ...month.metrics, assessments: { ...month.metrics.assessments } }));
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey));
      if (stored?.version === 1 && Array.isArray(stored.months) && stored.months.length === learning.months.length && stored.months.every(value => model.validateLearningMetrics(value, criteria).length === 0)) measures = stored.months;
    } catch { /* Le suivi fonctionne aussi sans stockage local. */ }
    const criterionInputs = new Map();
    const percent = value => value === null ? 'À évaluer' : `${value} %`;

    function markMonth() {
      document.querySelectorAll('[data-learning-month]').forEach(button => {
        const active = Number(button.dataset.learningMonth) === state.month;
        button.classList.toggle('selected', active);
        button.setAttribute('aria-pressed', String(active));
      });
    }
    function selectMonth(index) {
      state.month = index;
      renderDetail(); markMonth();
      $('learning-feedback').textContent = '';
    }
    function renderTimeline() {
      $('learning-timeline').replaceChildren();
      learning.months.forEach((month, index) => {
        const button = make('button', `learn-step status-${measures[index].status}`);
        button.type = 'button'; button.dataset.learningMonth = String(index);
        button.setAttribute('aria-controls', 'learning-month-detail');
        button.append(make('span', 'learn-step-month', `M${index + 1}`), make('strong', '', month.milestone), make('span', 'learn-step-status', statuses[measures[index].status]));
        button.addEventListener('click', () => selectMonth(index));
        $('learning-timeline').append(button);
      });
      markMonth();
    }
    function renderChart() {
      const observed = state.mode === 'observed';
      $('learning-chart-title').textContent = observed ? 'Résultats observés au fil du parcours' : 'Équilibre théorie / pratique proposé';
      $('learning-chart-note').textContent = observed
        ? 'Chaque score = critères démontrés / critères évalués. Dernière observation connue à chaque mois ; la couverture est affichée. Les trois scores sont indépendants et ne totalisent pas 100 %.'
        : 'Proposition de répartition des activités d’apprentissage de chaque mois, à ajuster aux heures et aux prérequis. Ce graphique ne mesure pas les connaissances acquises.';
      document.querySelectorAll('[data-learning-mode]').forEach(button => { const active = button.dataset.learningMode === state.mode; button.classList.toggle('selected', active); button.setAttribute('aria-pressed', String(active)); });
      const chart = $('learning-chart'); chart.replaceChildren();
      learning.months.forEach((month, index) => {
        const row = make('button', `learn-chart-row${observed ? ' observed' : ''}`); row.type = 'button';
        row.dataset.learningMonth = String(index); row.setAttribute('aria-controls', 'learning-month-detail');
        row.append(make('span', 'learn-chart-month', `M${index + 1}`));
        const bars = make('span', 'learn-chart-bars');
        if (!observed) {
          const bar = make('span', 'learn-mix-track');
          const theory = make('span', 'learn-mix-theory', `${month.theoryShare} %`); theory.style.width = `${month.theoryShare}%`;
          const practice = make('span', 'learn-mix-practice', `${month.practiceShare} %`); practice.style.width = `${month.practiceShare}%`;
          bar.append(theory, practice); bars.append(bar);
          row.setAttribute('aria-label', `M${index + 1} : proposition ${month.theoryShare} % théorie et ${month.practiceShare} % pratique. Voir le mois.`);
        } else {
          const summary = model.learningSummary(measures.slice(0, index + 1), criteria);
          Object.entries(kinds).forEach(([kind, label]) => {
            const result = summary.byKind[kind];
            const line = make('span', 'learn-score-line');
            const track = make('span', `learn-score-track${result.percent === null ? ' unmeasured' : ''}`);
            const fill = make('i', `learn-fill-${kind}`); fill.style.width = `${result.percent ?? 0}%`; track.append(fill);
            line.append(make('span', 'learn-score-label', label), track, make('span', 'learn-score-value', result.percent === null ? 'À évaluer' : `${result.percent} % · ${result.assessed}/${result.total} évalués`));
            bars.append(line);
          });
          row.setAttribute('aria-label', `Résultats documentés jusqu’à M${index + 1}. Voir les critères et les preuves.`);
        }
        row.append(bars); row.addEventListener('click', () => selectMonth(index)); chart.append(row);
      });
      markMonth();
    }
    function renderDomains() {
      const mixes = learning.domainMix;
      const names = Object.fromEntries(learning.domains.map(domain => [domain.id, domain.label]));
      document.querySelectorAll('[data-domain-chart]').forEach(button => { const active = button.dataset.domainChart === state.domainChart; button.classList.toggle('selected', active); button.setAttribute('aria-pressed', String(active)); });
      const view = $('learning-domain-chart'); view.replaceChildren(); view.className = `learn-domain-chart ${state.domainChart}`;
      if (state.domainChart === 'donut') {
        let start = 0;
        const segments = mixes.map(item => { const segment = `${item.color} ${start}% ${start + item.share}%`; start += item.share; return segment; });
        const donut = make('div', 'learn-donut'); donut.style.background = `conic-gradient(${segments.join(',')})`;
        donut.setAttribute('role', 'img'); donut.setAttribute('aria-label', mixes.map(item => `${names[item.id]} : ${item.share} %`).join(', ') + '. Répartition proposée.');
        const center = make('span', 'learn-donut-center'); center.append(make('strong', '', '100 %'), make('span', '', 'proposition')); donut.append(center); view.append(donut);
      }
      const legend = make('ul', 'learn-domain-legend');
      mixes.forEach(item => {
        const li = make('li'); li.style.setProperty('--domain-color', item.color);
        const line = make('span', 'learn-domain-label'); line.append(make('i'), make('span', '', names[item.id]), make('strong', '', `${item.share} %`)); li.append(line);
        if (state.domainChart === 'bar') { const track = make('span', 'learn-domain-track'); const fill = make('i'); fill.style.width = `${item.share}%`; track.append(fill); li.append(track); }
        legend.append(li);
      });
      view.append(legend);
    }
    function renderDetail() {
      const month = learning.months[state.month], metrics = measures[state.month];
      const summary = model.learningSummary(measures.slice(0, state.month + 1), criteria);
      $('learning-selected-title').textContent = `M${state.month + 1} · ${month.milestone}`;
      $('learning-selected-proof').textContent = month.proof;
      $('learning-selected-deliverable').textContent = plan.months[state.month].deliverable;
      $('learning-selected-status').textContent = statuses[metrics.status];
      $('learning-metrics-month').textContent = `M${state.month + 1}`;
      $('learning-observed-month').textContent = `Observations connues jusqu’à M${state.month + 1}`;
      Object.keys(kinds).forEach(kind => {
        const score = summary.byKind[kind];
        $(`learning-kpi-${kind}`).textContent = percent(score.percent);
        $(`learning-coverage-${kind}`).textContent = `${score.assessed}/${score.total} critères évalués`;
      });
      $('learning-kpi-milestones').textContent = `${summary.validatedMilestones}/${learning.months.length}`;
      $('learning-readiness').textContent = summary.beforeMvp.ready ? 'Prérequis documentés : revue pédagogique possible' : `Socle avant MVP : ${summary.beforeMvp.passed}/${summary.beforeMvp.total} critères démontrés, ${summary.beforeMvp.assessed}/${summary.beforeMvp.total} évalués`;
      $('learning-client-trials').textContent = summary.clientTrials === null ? 'Essais clients : à renseigner' : `${summary.clientTrials} essai${summary.clientTrials > 1 ? 's' : ''} client${summary.clientTrials > 1 ? 's' : ''} renseigné${summary.clientTrials > 1 ? 's' : ''}`;
      const domainList = $('learning-domain-progress'); domainList.replaceChildren();
      learning.domains.forEach(domain => {
        const score = summary.byDomain[domain.id];
        const li = make('li'); const top = make('span', 'learn-domain-result'); top.append(make('strong', '', domain.label), make('span', '', percent(score.percent))); li.append(top);
        const track = make('span', `learn-score-track${score.percent === null ? ' unmeasured' : ''}`); const fill = make('i'); fill.style.width = `${score.percent ?? 0}%`; track.append(fill);
        li.append(track, make('small', '', `${score.passed} démontré(s) · ${score.assessed}/${score.total} évalués`)); domainList.append(li);
      });
      $('learning-status').value = metrics.status;
      $('learning-client-input').value = metrics.clientTrials ?? '';
      $('learning-evidence').value = metrics.evidence;
      criteria.forEach(criterion => { const value = metrics.assessments[criterion.id]; criterionInputs.get(criterion.id).value = value === null ? '' : String(value); });
    }
    function createForm() {
      const groups = $('learning-criteria');
      learning.domains.forEach(domain => {
        const fieldset = make('fieldset'); fieldset.append(make('legend', '', domain.label));
        criteria.filter(criterion => criterion.domain === domain.id).forEach(criterion => {
          const label = make('label'); const text = make('span', '', `${kinds[criterion.kind]} · ${criterion.label}${criterion.requiredBeforeMvp ? ' — socle avant MVP' : ''}`);
          const select = make('select'); select.id = `learning-criterion-${criterion.id}`;
          for (const [value, title] of [['', 'Pas de nouvelle observation'], ['false', 'Observé · à reprendre'], ['true', 'Observé · démontré']]) { const option = make('option', '', title); option.value = value; select.append(option); }
          label.append(text, select); fieldset.append(label); criterionInputs.set(criterion.id, select);
        });
        groups.append(fieldset);
      });
    }
    $('learning-form').addEventListener('submit', event => {
      event.preventDefault();
      const metrics = {
        status: $('learning-status').value,
        assessments: Object.fromEntries(criteria.map(criterion => { const value = criterionInputs.get(criterion.id).value; return [criterion.id, value === '' ? null : value === 'true']; })),
        clientTrials: $('learning-client-input').value === '' ? null : Number($('learning-client-input').value),
        evidence: $('learning-evidence').value.trim()
      };
      const errors = model.validateLearningMetrics(metrics, criteria);
      if (errors.length) { $('learning-feedback').textContent = errors.join(' '); return; }
      measures[state.month] = metrics;
      let persisted = true;
      try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, months: measures })); } catch { persisted = false; }
      renderTimeline(); renderChart(); renderDetail();
      $('learning-feedback').textContent = persisted ? 'Observations enregistrées dans ce navigateur. Exportez-les pour les conserver ou les partager.' : 'Observations mises à jour pour cette session ; stockage local indisponible. Exportez-les pour les conserver.';
    });
    document.querySelectorAll('[data-learning-mode]').forEach(button => button.addEventListener('click', () => { state.mode = button.dataset.learningMode; renderChart(); }));
    document.querySelectorAll('[data-domain-chart]').forEach(button => button.addEventListener('click', () => { state.domainChart = button.dataset.domainChart; renderDomains(); }));
    $('learning-to-planning').addEventListener('click', () => onMonth(state.month));
    $('learning-export').addEventListener('click', () => {
      const payload = { version: 1, school: plan.school, exportedAt: new Date().toISOString(), months: learning.months.map((month, i) => ({ month: month.month, milestone: month.milestone, metrics: measures[i] })) };
      const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
      const a = make('a'); a.href = url; a.download = 'hetic-observations-apprentissage.json'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    createForm(); renderTimeline(); renderChart(); renderDomains(); renderDetail();
  }
  window.HETIC_LEARNING = Object.freeze({ init });
})();
