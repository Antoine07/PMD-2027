/* Calculs calendaires partagés, sans dépendance au navigateur. */
(() => {
  'use strict';
  const parse = value => new Date(`${value}T12:00:00Z`);
  const key = date => date.toISOString().slice(0, 10);
  const isDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(parse(value).getTime()) && key(parse(value)) === value;
  const addDays = (value, amount) => {
    const date = parse(value);
    date.setUTCDate(date.getUTCDate() + amount);
    return key(date);
  };
  const addMonths = (value, amount) => {
    const date = parse(value);
    const day = date.getUTCDate();
    date.setUTCDate(1);
    date.setUTCMonth(date.getUTCMonth() + amount);
    const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
    date.setUTCDate(Math.min(day, end));
    return key(date);
  };
  const daysInView = (view, cursor) => {
    if (view === 'week') {
      const weekday = (parse(cursor).getUTCDay() + 6) % 7;
      return Array.from({ length: 7 }, (_, i) => addDays(cursor, i - weekday));
    }
    const start = `${cursor.slice(0, 7)}-01`;
    const length = new Date(Date.UTC(parse(start).getUTCFullYear(), parse(start).getUTCMonth() + 1, 0)).getUTCDate();
    return Array.from({ length }, (_, i) => addDays(start, i));
  };
  const sessionDate = (session, start, holidays = {}) => {
    if (isDate(session.date)) return session.date;
    if (!isDate(start)) return null;
    let value = addDays(addMonths(start, session.month - 1), session.dayOffset || 0);
    // Les créneaux calculés se placent sur des jours ouvrés, sans fixer d'horaire.
    while ([0, 6].includes(parse(value).getUTCDay()) || holidays[value]) value = addDays(value, 1);
    return value;
  };
  const projectMonthIndex = (value, start, count = 6) => {
    if (!isDate(start)) return 0;
    let index = 0;
    for (let next = 1; next < count; next++) {
      if (value >= addMonths(start, next)) index = next;
    }
    return index;
  };
  const courseWeeks = (start, monthCount = 6) => {
    if (!isDate(start)) return [];
    const end = addDays(addMonths(start, monthCount), -1);
    const weeks = [];
    for (let monday = daysInView('week', start)[0]; monday <= end; monday = addDays(monday, 7)) {
      const from = monday < start ? start : monday;
      const sunday = addDays(monday, 6);
      const to = sunday > end ? end : sunday;
      weeks.push({ number: weeks.length + 1, start: from, end: to, month: projectMonthIndex(from, start, monthCount) + 1, partial: from !== monday || to !== sunday });
    }
    return weeks;
  };
  const courseDays = plan => {
    const weeks = courseWeeks(plan.startDate, plan.months.length);
    if (!weeks.length) return [];
    const end = weeks[weeks.length - 1].end;
    const dailyFocus = { 1: 'Comprendre et cadrer', 2: 'Pratiquer et construire', 3: 'Appliquer au projet', 4: 'Tester et analyser', 5: 'Expliquer et défendre' };
    const days = [];
    for (let date = plan.startDate; date <= end; date = addDays(date, 1)) {
      const weekday = parse(date).getUTCDay();
      const week = weeks.find(item => date >= item.start && date <= item.end);
      const goal = plan.weeklyGoals.find(item => item.number === week.number);
      const holiday = plan.calendar?.holidays?.[date] || null;
      const active = ![0, 6].includes(weekday) && !holiday;
      const sessions = plan.sessions.filter(session => sessionDate(session, plan.startDate, plan.calendar?.holidays) === date);
      const workByDay = {
        1: `Revoir les notions et expliciter les hypothèses de « ${goal?.title || ''} ». Préparer les questions et le cas de travail.`,
        2: `Pratiquer et réaliser un exercice ou une première version. ${goal?.work || ''}`,
        3: `Appliquer au projet et documenter les décisions. Avancer le livrable : ${goal?.deliverable || ''}`,
        4: `Tester le travail produit, examiner les erreurs et comparer les résultats aux critères. Corriger et conserver une preuve.`,
        5: `Synthétiser le travail, expliquer une modification et défendre les choix : ${goal?.defense || ''}`
      };
      let work = workByDay[weekday] || '';
      if (sessions.some(session => session.clientMeeting)) work = `Rendez-vous client coordonné par Brontis et Antoine : préparer les questions ou la démonstration, recueillir des observations et documenter les décisions. ${goal?.work || ''}`;
      else if (sessions.some(session => session.category === 'demo')) work = 'Présenter et défendre la proposition et le MVP, répondre aux questions et consigner les retours. ' + (goal?.work || '');
      days.push({ date, month: projectMonthIndex(date, plan.startDate, plan.months.length) + 1, week: week.number, holiday, active, sessions,
        focus: holiday || (!active ? 'Week-end · pas d’activité imposée' : dailyFocus[weekday]),
        work: active ? work : 'Aucune intervention positionnée automatiquement.',
        deliverable: active ? goal?.deliverable || '' : '', defense: active ? goal?.defense || '' : '' });
    }
    return days;
  };
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
  const filterSessions = (sessions, filters, trainers) => sessions.filter(session => {
    const people = session.trainers.map(id => trainers.find(person => person.id === id)?.name || id).join(' ');
    return (!filters.trainer || session.trainers.includes(filters.trainer))
      && (filters.category === 'all' || session.category === filters.category)
      && (!filters.search || normalize(`${session.title} ${session.description} ${people}`).includes(normalize(filters.search)));
  });
  const buildWorkload = (sessions, trainers, { axis = 'trainer', categories = {}, monthCount = 6 } = {}) => {
    if (!['trainer', 'category'].includes(axis)) throw new Error('Axe de plan de charge inconnu');
    const months = Array.from({ length: monthCount }, (_, index) => {
      const items = sessions.filter(session => session.month === index + 1);
      return { month: index + 1, sessions: items, count: items.length };
    });
    const groups = axis === 'trainer'
      ? trainers.map(person => ({ id: person.id, label: person.name, color: person.color, initials: person.initials }))
      : Object.entries(categories).map(([id, label]) => ({ id, label }));
    const rows = groups.map(group => {
      const cells = months.map(month => {
        const items = month.sessions.filter(session => axis === 'trainer' ? session.trainers.includes(group.id) : session.category === group.id);
        const breakdown = Object.entries(categories).map(([id, label]) => ({ id, label, count: items.filter(session => session.category === id).length })).filter(item => item.count > 0);
        return { month: month.month, sessions: items, count: items.length, breakdown };
      });
      return { ...group, cells, total: cells.reduce((sum, cell) => sum + cell.count, 0) };
    });
    const maxCellCount = Math.max(0, ...rows.flatMap(row => row.cells.map(cell => cell.count)));
    rows.forEach(row => row.cells.forEach(cell => { cell.intensity = cell.count ? Math.ceil(cell.count / maxCellCount * 4) : 0; }));
    const peakCount = Math.max(0, ...months.map(month => month.count));
    return {
      rows, months, maxCellCount, uniqueCount: sessions.length,
      participationCount: sessions.reduce((sum, session) => sum + new Set(session.trainers).size, 0),
      contributorCount: new Set(sessions.flatMap(session => session.trainers)).size,
      peakCount, peakMonths: peakCount ? months.filter(month => month.count === peakCount).map(month => month.month) : []
    };
  };
  const validateLearningMetrics = (metrics, criteria) => {
    const errors = [];
    if (!metrics || typeof metrics !== 'object') return ['Mesures absentes ou invalides.'];
    if (!['planned', 'in_progress', 'validated'].includes(metrics.status)) errors.push('Statut de jalon invalide.');
    if (!metrics.assessments || typeof metrics.assessments !== 'object' || Array.isArray(metrics.assessments)) errors.push('Observations des critères absentes.');
    else {
      const ids = new Set(criteria.map(item => item.id));
      for (const criterion of criteria) if (![null, true, false].includes(metrics.assessments[criterion.id])) errors.push(`Observation invalide : ${criterion.label}`);
      if (Object.keys(metrics.assessments).some(id => !ids.has(id))) errors.push('Critère inconnu dans les observations.');
    }
    if (metrics.clientTrials !== null && (!Number.isSafeInteger(metrics.clientTrials) || metrics.clientTrials < 0)) errors.push('Le nombre d’essais clients doit être un entier positif ou nul.');
    if (typeof metrics.evidence !== 'string' || metrics.evidence.length > 2000) errors.push('Documenter la preuve en 2 000 caractères maximum.');
    if (metrics.assessments && Object.values(metrics.assessments).some(value => value === true || value === false) && !String(metrics.evidence || '').trim()) errors.push('Associer une preuve ou une observation précise aux critères évalués.');
    if (metrics.status === 'validated' && !String(metrics.evidence || '').trim()) errors.push('Documenter une preuve avant de déclarer le jalon validé.');
    return errors;
  };
  const learningSummary = (measures, criteria) => {
    const latest = Object.fromEntries(criteria.map(item => [item.id, null]));
    measures.forEach(measure => criteria.forEach(item => {
      const observation = measure.assessments[item.id];
      if (observation !== null) latest[item.id] = observation;
    }));
    const score = subset => {
      const assessed = subset.filter(item => latest[item.id] !== null).length;
      const passed = subset.filter(item => latest[item.id] === true).length;
      return { total: subset.length, assessed, passed, percent: assessed ? Math.round(passed / assessed * 100) : null };
    };
    const trials = measures.map(value => value.clientTrials).filter(value => value !== null);
    const byKind = Object.fromEntries(['theory', 'practice', 'defense'].map(kind => [kind, score(criteria.filter(item => item.kind === kind))]));
    const domains = [...new Set(criteria.map(item => item.domain))];
    const beforeMvp = score(criteria.filter(item => item.requiredBeforeMvp));
    return {
      latest, byKind, byDomain: Object.fromEntries(domains.map(domain => [domain, score(criteria.filter(item => item.domain === domain))])),
      beforeMvp: { ...beforeMvp, ready: beforeMvp.total > 0 && beforeMvp.passed === beforeMvp.total },
      validatedMilestones: measures.filter(value => value.status === 'validated' && value.evidence.trim()).length,
      clientTrials: trials.length ? trials.reduce((sum, value) => sum + value, 0) : null
    };
  };
  window.HETIC_CALENDAR = Object.freeze({ parse, key, isDate, addDays, addMonths, daysInView, sessionDate, projectMonthIndex, courseWeeks, courseDays, filterSessions, buildWorkload, validateLearningMetrics, learningSummary });
})();
