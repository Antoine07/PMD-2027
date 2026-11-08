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
  const sessionDate = (session, start) => {
    if (isDate(session.date)) return session.date;
    if (!isDate(start)) return null;
    let value = addDays(addMonths(start, session.month - 1), session.dayOffset || 0);
    // Les créneaux calculés se placent sur des jours ouvrés, sans fixer d'horaire.
    const day = parse(value).getUTCDay();
    if (day === 6) value = addDays(value, 2);
    if (day === 0) value = addDays(value, 1);
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
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
  const filterSessions = (sessions, filters, trainers) => sessions.filter(session => {
    const people = session.trainers.map(id => trainers.find(person => person.id === id)?.name || id).join(' ');
    return (!filters.trainer || session.trainers.includes(filters.trainer))
      && (filters.category === 'all' || session.category === filters.category)
      && (!filters.search || normalize(`${session.title} ${session.description} ${people}`).includes(normalize(filters.search)));
  });
  window.HETIC_CALENDAR = Object.freeze({ parse, key, isDate, addDays, addMonths, daysInView, sessionDate, projectMonthIndex, filterSessions });
})();
