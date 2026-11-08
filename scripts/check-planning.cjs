'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({ window: {} });
for (const file of ['planning-data.js', 'planning-model.js', 'app.js']) new vm.Script(read(`docs/assets/${file}`), { filename: file });
for (const file of ['planning-data.js', 'planning-model.js']) vm.runInContext(read(`docs/assets/${file}`), context);
const plan = context.window.HETIC_PLANNING;
const model = context.window.HETIC_CALENDAR;

assert.equal(plan.school, 'HETIC');
assert.equal(plan.months.length, 6);
assert.equal(plan.allocation.mouslyTotal, plan.allocation.cours + plan.allocation.coaching, 'Répartition des interventions de Mously incohérente');
assert(plan.allocation.mouslyTotal > 0 && plan.allocation.mouslyTotal <= 100);
assert.equal(plan.allocation.cyber, 5, 'La cybersécurité doit représenter 5 % du volume total');
assert(plan.startDate === null || model.isDate(plan.startDate), 'Date de début ISO invalide');
const trainers = new Set(plan.trainers.map(person => person.id));
assert.equal(trainers.size, plan.trainers.length, 'Identifiant intervenant dupliqué');
const ids = new Set();
for (const person of plan.trainers) assert(/^#[0-9a-f]{6}$/i.test(person.color), `Couleur invalide : ${person.id}`);
for (const month of plan.months) for (const field of ['title', 'people', 'program', 'learning', 'apps', 'cyber', 'client', 'deliverable']) assert.equal(typeof month[field], 'string', `Champ de mois manquant : ${field}`);
for (const session of plan.sessions) {
  assert(!ids.has(session.id), `Identifiant dupliqué : ${session.id}`); ids.add(session.id);
  assert(Number.isInteger(session.month) && session.month >= 1 && session.month <= 6, `Mois invalide : ${session.id}`);
  assert(['cours', 'coaching', 'projet', 'cyber', 'demo'].includes(session.category));
  assert(session.trainers.length && session.trainers.every(id => trainers.has(id)), `Intervenant inconnu : ${session.id}`);
  assert(session.title && session.description, `Contenu manquant : ${session.id}`);
  assert.equal(typeof session.addition, 'boolean');
  assert(Number.isInteger(session.dayOffset) && session.dayOffset >= 0 && session.dayOffset <= 24, `Décalage hors du mois : ${session.id}`);
  assert(session.date === null || model.isDate(session.date), `Date individuelle invalide : ${session.id}`);
}
const byId = new Map(plan.sessions.map(session => [session.id, session]));
for (const session of plan.sessions) {
  for (const requiredId of session.requires || []) {
    const required = byId.get(requiredId);
    assert(required, `Prérequis inconnu : ${requiredId}`);
    assert(required.month < session.month || (required.month === session.month && required.dayOffset < session.dayOffset), `Prérequis placé après ${session.id} : ${requiredId}`);
    for (const start of ['2027-01-04', '2027-01-31', '2028-02-29']) {
      assert(model.sessionDate(required, start) < model.sessionDate(session, start), `Dates contraires à l'ordre pédagogique : ${requiredId} avant ${session.id}`);
    }
  }
}
const vibe = byId.get('m3-vibe-coding');
assert(vibe && ['m1-design-apps', 'm2-architecture-apps', 'm2-app-guidee'].every(id => vibe.requires.includes(id)), 'Le design, l’architecture et une application guidée doivent précéder le vibe coding');
assert(plan.sessions.some(session => session.category === 'cyber'), 'Contenus cyber absents');
const rehearsal = plan.sessions.find(session => session.id === 'm5-soutenance-blanche');
const corrections = plan.sessions.find(session => session.id === 'm5-corrections-soutenance');
assert(rehearsal && corrections, 'Soutenance blanche ou reprise des retours absente');
assert(rehearsal.month < 6 && corrections.month === rehearsal.month);
assert(corrections.dayOffset > rehearsal.dayOffset, 'Les corrections doivent suivre la soutenance blanche');
for (let month = 1; month <= 6; month++) assert(plan.sessions.some(session => session.month === month && session.category === 'cours' && session.trainers.includes('mously')), `Théorie et pratique de Mously absentes en M${month}`);

assert.equal(model.isDate('2027-02-29'), false);
assert.equal(model.isDate('2028-02-29'), true);
assert.equal(model.isDate('2027-13-01'), false);
assert.equal(model.isDate(null), false);
assert.equal(model.addMonths('2027-01-31', 1), '2027-02-28');
assert.equal(model.addMonths('2028-01-31', 1), '2028-02-29');
assert.equal(model.addMonths('2027-12-15', 1), '2028-01-15');
assert.equal(model.addDays('2027-03-27', 2), '2027-03-29');
assert.equal(model.addDays('2027-12-31', 1), '2028-01-01');
assert.deepEqual(Array.from(model.daysInView('week', '2027-01-03')), ['2026-12-28', '2026-12-29', '2026-12-30', '2026-12-31', '2027-01-01', '2027-01-02', '2027-01-03']);
assert.equal(model.daysInView('month', '2027-02-15').length, 28);
assert.equal(model.daysInView('month', '2028-02-15').length, 29);
assert.equal(model.daysInView('month', '2027-01-31').length, 31);
assert.equal(model.sessionDate({ month: 1, dayOffset: 0, date: null }, null), null);
assert.equal(model.sessionDate({ month: 1, dayOffset: 0, date: null }, '2027-01-02'), '2027-01-04');
assert.equal(model.sessionDate({ month: 2, dayOffset: 0, date: '2027-05-12' }, '2027-01-04'), '2027-05-12');
assert.equal(model.projectMonthIndex('2027-02-14', '2027-01-15'), 0);
assert.equal(model.projectMonthIndex('2027-02-15', '2027-01-15'), 1);
assert.equal(model.projectMonthIndex('2027-08-01', '2027-01-15'), 5);
assert.equal(model.projectMonthIndex('2026-12-01', '2027-01-15'), 0);
for (const start of ['2027-01-01', '2027-01-31', '2028-02-29', '2027-10-31']) {
  for (const session of plan.sessions) {
    const date = model.sessionDate(session, start);
    assert(model.isDate(date));
    if (!session.date) {
      assert(date >= model.addMonths(start, session.month - 1));
      assert(date < model.addMonths(start, session.month), `Créneau au-delà du mois pédagogique : ${session.id}`);
      assert(![0, 6].includes(model.parse(date).getUTCDay()));
    }
  }
}
const all = { search: '', category: 'all', trainer: '' };
assert.equal(model.filterSessions(plan.sessions, all, plan.trainers).length, plan.sessions.length);
assert(model.filterSessions(plan.sessions, { ...all, search: 'mathematiques' }, plan.trainers).length > 0);
const antoineCourses = model.filterSessions(plan.sessions, { ...all, search: 'antoine', trainer: 'antoine', category: 'cours' }, plan.trainers);
assert(antoineCourses.length > 0);
assert(antoineCourses.every(session => session.trainers.includes('antoine') && session.category === 'cours'));
assert.equal(model.filterSessions(plan.sessions, { ...all, search: 'aucun-resultat-impossible' }, plan.trainers).length, 0);

const html = read('docs/index.html');
const htmlIds = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
assert.equal(new Set(htmlIds).size, htmlIds.length, 'Identifiants HTML dupliqués');
for (const match of html.matchAll(/<(?:a|script|link|img)\b[^>]*(?:href|src)="([^"]+)"/g)) {
  const target = match[1];
  if (target.startsWith('#')) assert(htmlIds.includes(target.slice(1)), `Ancre absente : ${target}`);
  else if (!/^[a-z]+:/i.test(target)) assert(fs.existsSync(path.join(root, 'docs', target)), `Ressource absente : ${target}`);
}
for (const match of read('docs/assets/app.js').matchAll(/\$\('([^']+)'\)/g)) assert(htmlIds.includes(match[1]), `Cible de l'interface absente : ${match[1]}`);
assert(!html.includes('PMD'), 'Ancien nom présent dans la page');
assert(!read('docs/parcours-hetic.md').includes('PMD'), 'Ancien nom présent dans le programme');
for (const file of ['carte-vision.svg', 'carte-application.svg', 'carte-equipe.svg']) {
  const svg = read(`docs/assets/${file}`);
  assert(svg.includes('<title') && svg.includes('<desc') && svg.includes('HETIC'));
}
console.log(`OK — ${plan.months.length} mois, ${plan.trainers.length} intervenants ou collectifs, ${plan.sessions.length} blocs ; données, calendrier, filtres et ressources locales vérifiés.`);
