'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({ window: {} });
for (const file of ['planning-data.js', 'planning-model.js', 'workload.js', 'learning.js', 'programme.js', 'app.js']) new vm.Script(read(`docs/assets/${file}`), { filename: file });
for (const file of ['planning-data.js', 'planning-model.js']) vm.runInContext(read(`docs/assets/${file}`), context);
const plan = context.window.HETIC_PLANNING;
const model = context.window.HETIC_CALENDAR;

assert.equal(plan.school, 'HETIC');
assert.equal(plan.months.length, 6);
assert.equal(plan.startDate, '2027-01-01');
assert.equal(plan.learning.months.length, plan.months.length);
assert.equal(plan.learning.mixStatus, 'proposal');
assert.equal(plan.learning.domains.length, 6);
assert.equal(plan.learning.criteria.length, 18);
assert.equal(new Set(plan.learning.criteria.map(item => item.id)).size, plan.learning.criteria.length);
for (const criterion of plan.learning.criteria) {
  assert(plan.learning.domains.some(domain => domain.id === criterion.domain));
  assert(['theory', 'practice', 'defense'].includes(criterion.kind));
}
assert.equal(plan.learning.domainMix.reduce((sum, item) => sum + item.share, 0), 100);
assert.equal(new Set(plan.learning.domainMix.map(item => item.id)).size, 6);
assert.equal(plan.learning.domainMix.find(item => item.id === 'cyber').share, 5);
for (const [index, month] of plan.learning.months.entries()) {
  assert.equal(month.month, index + 1);
  assert.equal(month.theoryShare + month.practiceShare, 100);
  assert(month.theoryShare >= 0 && month.theoryShare <= 100);
  assert.equal(model.validateLearningMetrics(month.metrics, plan.learning.criteria).length, 0);
}
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
assert(vibe.requires.includes('m2-coaching'), 'La défense de proposition doit précéder le code assisté');
for (const session of plan.sessions.filter(item => item.clientMeeting)) assert.deepEqual(Array.from(session.trainers).sort(), ['antoine', 'brontis'], 'Les rendez-vous clients relèvent de Brontis et Antoine');
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
const weeks = model.courseWeeks(plan.startDate, 6);
assert.equal(weeks.length, 27);
assert.equal(weeks[0].start, '2027-01-01'); assert.equal(weeks[0].end, '2027-01-03');
assert.equal(weeks.at(-1).end, '2027-06-30');
assert.equal(weeks.filter(week => week.partial).length, 2);
for (let i = 1; i < weeks.length; i++) assert.equal(weeks[i].start, model.addDays(weeks[i - 1].end, 1));
assert.equal(plan.weeklyGoals.length, weeks.length);
assert.equal(model.sessionDate({ month: 1, dayOffset: 0, date: null }, plan.startDate, plan.calendar.holidays), '2027-01-04');
const daily = model.courseDays(plan);
assert.equal(daily.length, 181);
assert.equal(daily.filter(day => day.active).length, 125);
assert.deepEqual(Array.from(plan.rhythm.courseWeekdays), [1, 2, 4, 5]);
assert.equal(plan.rhythm.foadWeekday, 3);
const deliveryExpected = model.deliveryPlan(plan);
assert.equal(deliveryExpected.courses, 99);
assert.equal(deliveryExpected.foad, 26);
assert.equal(deliveryExpected.activities, 104);
for (const day of daily) {
  if (!day.active) continue;
  if (model.parse(day.date).getUTCDay() === 3) {
    assert.equal(day.modality, 'foad'); assert.equal(day.sessions.length, 0);
    assert.equal(day.platformActivities.length, 4);
    assert(day.supportTrainers.length > 0); assert.equal(day.courseTrainers.length, 0);
  } else {
    assert.equal(day.modality, 'cours'); assert(day.courseTrainers.length > 0);
    assert.equal(day.supportTrainers.length, 0);
  }
  for (const trainer of [...day.courseTrainers, ...day.supportTrainers]) assert(trainers.has(trainer));
}
assert.equal(model.sessionDate({ month: 1, dayOffset: 12, date: null }, plan.startDate, plan.calendar.holidays, plan.rhythm), '2027-01-14');
const schedule = model.scheduleSessions(plan);
assert.equal(new Set(schedule.map(item => item.id)).size, schedule.length);
for (const day of daily.filter(day => day.active)) {
  const elements = schedule.filter(session => model.sessionDate(session, plan.startDate, plan.calendar.holidays, plan.rhythm) === day.date);
  assert(elements.length > 0, `Journée active sans cours ou FOAD : ${day.date}`);
  if (day.modality === 'foad') assert(elements.every(item => item.category === 'foad'));
}
const rhythmLoad = model.buildDeliveryWorkload(plan, 'rhythm');
assert.equal(rhythmLoad.rows.find(row => row.id === 'cours').total, 99);
assert.equal(rhythmLoad.rows.find(row => row.id === 'foad').total, 26);
const staffLoad = model.buildDeliveryWorkload(plan, 'staff');
assert.equal(staffLoad.uniqueCount, 125);
assert.equal(staffLoad.rows.reduce((sum, row) => sum + row.total, 0), staffLoad.participationCount);
assert.equal(daily[0].holiday, 'Jour de l’an');
assert.equal(daily.find(day => day.active).date, '2027-01-04');
assert.equal(daily.flatMap(day => day.sessions).length, plan.sessions.length, 'Chaque bloc doit être retrouvé dans le planning quotidien');
assert(daily.filter(day => !day.active).every(day => day.sessions.length === 0), 'Aucune intervention automatique sur week-end ou jour férié');
for (const day of daily) if (day.active) assert(day.work && day.deliverable && day.defense);

const cloneMetrics = () => JSON.parse(JSON.stringify(plan.learning.months[0].metrics));
const unknown = cloneMetrics();
let observed = model.learningSummary([unknown], plan.learning.criteria);
assert.equal(observed.byKind.theory.percent, null);
assert.equal(observed.byKind.practice.percent, null);
assert.equal(observed.clientTrials, null);
assert.equal(observed.beforeMvp.ready, false);
const first = cloneMetrics(); first.assessments['ia-1'] = true; first.evidence = 'Explication individuelle documentée.';
observed = model.learningSummary([first], plan.learning.criteria);
assert.equal(observed.byKind.theory.percent, 100); assert.equal(observed.byKind.theory.assessed, 1); assert.equal(observed.byKind.theory.total, 6);
assert.equal(observed.beforeMvp.ready, false, 'Un seul critère réussi ne suffit pas pour le socle');
const later = cloneMetrics(); later.assessments['ia-1'] = false; later.assessments['apps-2'] = true; later.evidence = 'Nouvel exercice : difficulté IA et application démontrée.';
observed = model.learningSummary([first, later], plan.learning.criteria);
assert.equal(observed.byKind.theory.percent, 0, 'La dernière observation remplace la précédente');
assert.equal(observed.byKind.practice.percent, 100);
assert.equal(observed.byKind.defense.percent, null);
assert(model.validateLearningMetrics({ ...first, evidence: '' }, plan.learning.criteria).length > 0);
assert(model.validateLearningMetrics({ ...unknown, status: 'validated' }, plan.learning.criteria).length > 0);
assert(model.validateLearningMetrics({ ...unknown, clientTrials: -1 }, plan.learning.criteria).length > 0);
const ready = cloneMetrics(); ready.evidence = 'Revue des bases documentée.';
for (const criterion of plan.learning.criteria) if (criterion.requiredBeforeMvp) ready.assessments[criterion.id] = true;
assert.equal(model.learningSummary([ready], plan.learning.criteria).beforeMvp.ready, true);
const january = cloneMetrics();
january.delivery = { courseAttended: 12, foadCompleted: 3, platformAssigned: 8, platformCompleted: 6, platformMinutes: 90, supportObjectives: 4, supportValidated: 2 };
january.evidence = 'Relevé individuel de participation et dépôts plateforme.';
assert.equal(model.validateLearningMetrics(january, plan.learning.criteria, deliveryExpected.months[0]).length, 0);
const supportSummary = model.deliverySummary(plan, [january, cloneMetrics()]);
assert.equal(supportSummary.course.percent, 75);
assert.equal(supportSummary.course.assigned, 16, 'Un mois sans mesure ne doit pas être traité comme une absence');
assert.equal(supportSummary.foad.percent, 75);
assert.equal(supportSummary.platform.percent, 75);
assert.equal(supportSummary.support.percent, 50);
assert.equal(supportSummary.minutes, 90);
assert.equal(model.learningSummary([january], plan.learning.criteria).byKind.practice.percent, null, 'Participer au soutien ne valide pas automatiquement un acquis');
const missing = model.deliverySummary(plan, [cloneMetrics()]);
assert.equal(missing.course.percent, null);
assert.equal(missing.platform.percent, null);
assert.equal(missing.minutes, null);
const legacy = cloneMetrics(); delete legacy.delivery;
assert.equal(model.validateLearningMetrics(legacy, plan.learning.criteria).length, 0, 'Les anciennes observations restent lisibles');
assert.equal(model.deliverySummary(plan, [legacy]).platform.percent, null);
const unassigned = cloneMetrics(); unassigned.evidence = 'Aucune activité plateforme affectée sur ce mois.';
unassigned.delivery.platformAssigned = 0; unassigned.delivery.platformCompleted = 0;
assert.equal(model.deliverySummary(plan, [unassigned]).platform.percent, null, 'Zéro activité affectée ne définit pas un taux de réalisation');
const absent = cloneMetrics(); absent.delivery.courseAttended = 0; absent.evidence = 'Aucun cours suivi sur la période renseignée.';
assert.equal(model.deliverySummary(plan, [absent]).course.percent, 0);
assert(model.validateLearningMetrics({ ...january, delivery: { ...january.delivery, foadCompleted: 5 } }, plan.learning.criteria, deliveryExpected.months[0]).length > 0);
assert(model.validateLearningMetrics({ ...january, delivery: { ...january.delivery, platformCompleted: 9 } }, plan.learning.criteria).length > 0);
assert(model.validateLearningMetrics({ ...january, delivery: { ...january.delivery, supportValidated: 5 } }, plan.learning.criteria).length > 0);
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

// Une coanimation crée deux participations, tout en restant un seul bloc distinct.
const activities = { cours: 'Cours & ateliers', coaching: 'Coaching', projet: 'Projet & clients', cyber: 'Cybersécurité', demo: 'Demo Day' };
const fixture = [
  { id: 'commun', month: 1, category: 'cours', trainers: ['a', 'b'] },
  { id: 'seul', month: 1, category: 'coaching', trainers: ['a'] },
  { id: 'suivant', month: 2, category: 'cyber', trainers: ['b'] }
];
const fixtureTrainers = [{ id: 'a', name: 'A' }, { id: 'b', name: 'B' }];
const combined = model.buildWorkload(fixture, fixtureTrainers, { categories: activities });
assert.equal(combined.uniqueCount, 3);
assert.equal(combined.participationCount, 4);
assert.equal(combined.contributorCount, 2);
assert.deepEqual(Array.from(combined.months, month => month.count), [2, 1, 0, 0, 0, 0]);
assert.equal(combined.rows[0].cells[0].count, 2);
assert.equal(combined.rows[1].cells[0].count, 1);
assert.equal(combined.rows[0].cells[0].breakdown.length, 2);
assert.equal(combined.rows[0].cells[0].intensity, 4);
assert.equal(combined.rows[0].cells[2].intensity, 0);
assert.deepEqual(Array.from(combined.peakMonths), [1]);
const activityLoad = model.buildWorkload(fixture, fixtureTrainers, { axis: 'category', categories: activities });
assert.equal(activityLoad.rows.reduce((sum, row) => sum + row.total, 0), 3);
assert.equal(activityLoad.rows.find(row => row.id === 'cyber').cells[1].count, 1);
const noLoad = model.buildWorkload([], fixtureTrainers, { categories: activities });
assert.equal(noLoad.uniqueCount, 0);
assert.equal(noLoad.maxCellCount, 0);
assert.equal(noLoad.peakMonths.length, 0);
assert(noLoad.rows.every(row => row.cells.every(cell => cell.intensity === 0)));
assert.throws(() => model.buildWorkload([], [], { axis: 'inconnu' }));
const workload = model.buildWorkload(plan.sessions, plan.trainers, { categories: activities });
assert.equal(workload.months.reduce((sum, month) => sum + month.count, 0), plan.sessions.length);
assert.equal(workload.rows.reduce((sum, row) => sum + row.total, 0), workload.participationCount);
assert.equal(workload.rows.find(row => row.id === 'cyber').total, plan.sessions.filter(session => session.category === 'cyber').length);

const html = read('docs/index.html');
const htmlIds = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
assert.equal(new Set(htmlIds).size, htmlIds.length, 'Identifiants HTML dupliqués');
for (const match of html.matchAll(/<(?:a|script|link|img)\b[^>]*(?:href|src)="([^"]+)"/g)) {
  const target = match[1];
  if (target.startsWith('#')) assert(htmlIds.includes(target.slice(1)), `Ancre absente : ${target}`);
  else if (!/^[a-z]+:/i.test(target)) assert(fs.existsSync(path.join(root, 'docs', target)), `Ressource absente : ${target}`);
}
for (const file of ['app.js', 'workload.js', 'learning.js', 'programme.js']) for (const match of read(`docs/assets/${file}`).matchAll(/\$\('([^']+)'\)/g)) assert(htmlIds.includes(match[1]), `Cible de l'interface absente : ${match[1]}`);
assert(!html.includes('PMD'), 'Ancien nom présent dans la page');
assert(!read('docs/parcours-hetic.md').includes('PMD'), 'Ancien nom présent dans le programme');
for (const file of ['carte-vision.svg', 'carte-application.svg', 'carte-equipe.svg']) {
  const svg = read(`docs/assets/${file}`);
  assert(svg.includes('<title') && svg.includes('<desc') && svg.includes('HETIC'));
}
const generated = require('node:child_process').spawnSync(process.execPath, [path.join(__dirname, 'render-supports.cjs'), '--check'], { encoding: 'utf8' });
assert.equal(generated.status, 0, generated.stderr || 'Supports générés à actualiser');
console.log(`OK — ${daily.length} jours, ${weeks.length} semaines, ${plan.months.length} mois, ${plan.sessions.length} blocs et ${plan.learning.criteria.length} critères ; calendrier, charges, observations et supports vérifiés.`);
