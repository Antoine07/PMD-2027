'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
for (const file of ['planning-data.js', 'planning-model.js']) vm.runInNewContext(fs.readFileSync(path.join(root, 'docs/assets', file), 'utf8'), context);
const plan = context.window.HETIC_PLANNING, model = context.window.HETIC_CALENDAR;
const xml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
const format = value => model.parse(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const weeks = model.courseWeeks(plan.startDate, plan.months.length);
const days = model.courseDays(plan);
const delivery = model.deliveryPlan(plan);
const names = ids => ids.map(id => plan.trainers.find(person => person.id === id)?.name || id).join(' · ');
const wrap = (value, max) => {
  const lines = []; let line = '';
  for (const word of value.split(/\s+/)) {
    if (line && (line + ' ' + word).length > max) { lines.push(line); line = word; }
    else line += (line ? ' ' : '') + word;
  }
  if (line) lines.push(line);
  return lines;
};
function svg() {
  const out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1120" role="img" aria-labelledby="title desc">',
    '<title id="title">HETIC : timeline des six mois et répartitions pédagogiques proposées.</title>',
    `<desc id="desc">Parcours du ${xml(plan.startDate)} au ${xml(days.at(-1).date)}. Bases IA, Data, applications, marketing, produit et cybersécurité, défense de proposition en M2, MVP ciblé en M3 après revue des bases, pilote, soutenance blanche et Demo Day. Pourcentages proposés : ils décrivent des activités et domaines, pas les acquis des apprenants.</desc>`,
    '<rect width="1600" height="1120" fill="#fbfafc"/><style>text{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}.muted{fill:#927ca0}.copy{font-size:14px;fill:#8e779c}</style>',
    '<text x="45" y="52" fill="#695077" font-size="30" font-weight="700">HETIC · du 1er janvier au 30 juin 2027</text>',
    '<text x="45" y="88" font-size="17" class="muted">Acquérir les bases, construire et défendre une proposition utile à de vrais clients.</text>',
    '<path d="M165 145H1440" stroke="#dbcee8" stroke-width="4" fill="none"/>'];
  plan.learning.months.forEach((month, index) => {
    const x = 45 + index * 255, color = index === 2 ? '#4e927a' : '#9474bf';
    out.push(`<circle cx="${x + 120}" cy="145" r="13" fill="white" stroke="${color}" stroke-width="3"/><text x="${x + 120}" y="122" text-anchor="middle" font-size="16" fill="${color}" font-weight="700">M${index + 1}</text>`);
    out.push(`<rect x="${x}" y="180" width="235" height="260" rx="12" fill="white" stroke="${color}" stroke-opacity=".4"/>`);
    wrap(month.milestone, 24).forEach((line, i) => out.push(`<text x="${x + 16}" y="${210 + i * 25}" font-size="17" font-weight="650" fill="${color}">${xml(line)}</text>`));
    wrap(month.proof, 29).forEach((line, i) => out.push(`<text x="${x + 16}" y="${280 + i * 23}" class="copy">${xml(line)}</text>`));
    const start = model.addMonths(plan.startDate, index), end = model.addDays(model.addMonths(plan.startDate, index + 1), -1);
    out.push(`<text x="${x + 16}" y="416" font-size="12" class="muted">${xml(format(start))} → ${xml(format(end))}</text>`);
  });
  out.push('<rect x="45" y="480" width="835" height="425" rx="14" fill="white" stroke="#e5dceb"/><text x="70" y="520" font-size="22" fill="#856497" font-weight="650">Théorie / pratique par mois</text><text x="70" y="549" font-size="13" class="muted">Répartition d’activités proposée · ce graphique ne mesure pas les acquis</text>');
  plan.learning.months.forEach((month, i) => {
    const y = 580 + i * 46, width = 680, first = width * month.theoryShare / 100;
    out.push(`<text x="72" y="${y + 20}" font-size="14" fill="#a083b1">M${i + 1}</text><rect x="118" y="${y}" width="${first}" height="29" fill="#9474bf"/><rect x="${118 + first}" y="${y}" width="${width - first}" height="29" fill="#70a18c"/><text x="${118 + first / 2}" y="${y + 20}" fill="white" text-anchor="middle" font-size="13">${month.theoryShare} %</text><text x="${118 + first + (width - first) / 2}" y="${y + 20}" fill="white" text-anchor="middle" font-size="13">${month.practiceShare} %</text>`);
  });
  out.push('<circle cx="80" cy="879" r="5" fill="#9474bf"/><text x="95" y="884" font-size="13" class="muted">Théorie</text><circle cx="210" cy="879" r="5" fill="#70a18c"/><text x="225" y="884" font-size="13" class="muted">Pratique</text>');
  out.push('<rect x="905" y="480" width="650" height="425" rx="14" fill="white" stroke="#e5dceb"/><text x="930" y="520" font-size="22" fill="#856497" font-weight="650">Domaines abordés · proposition</text>');
  const domainNames = Object.fromEntries(plan.learning.domains.map(domain => [domain.id, domain.label]));
  let angle = -Math.PI / 2; const cx = 1080, cy = 715, radius = 110;
  plan.learning.domainMix.forEach((item, i) => {
    const end = angle + item.share / 100 * Math.PI * 2;
    const x1 = cx + radius * Math.cos(angle), y1 = cy + radius * Math.sin(angle), x2 = cx + radius * Math.cos(end), y2 = cy + radius * Math.sin(end);
    out.push(`<path d="M${cx} ${cy}L${x1} ${y1}A${radius} ${radius} 0 ${item.share > 50 ? 1 : 0} 1 ${x2} ${y2}Z" fill="${item.color}"/><circle cx="1240" cy="${604 + i * 36}" r="5" fill="${item.color}"/><text x="1255" y="${609 + i * 36}" font-size="15" class="muted">${xml(domainNames[item.id])} · ${item.share} %</text>`);
    angle = end;
  });
  out.push('<circle cx="1080" cy="715" r="72" fill="white"/><text x="1080" y="716" text-anchor="middle" font-size="29" font-weight="650" fill="#8f6fa3">100 %</text><text x="1080" y="743" text-anchor="middle" font-size="12" class="muted">à valider</text><text x="930" y="876" font-size="13" class="muted">Répartition thématique du volume total, sans double compte.</text>');
  out.push('<rect x="45" y="935" width="1510" height="130" rx="12" fill="#f2edf9" stroke="#e1d5ee"/><text x="70" y="971" fill="#8b699f" font-size="18" font-weight="650">L’apprentissage doit être démontré individuellement.</text><text x="70" y="1001" class="copy">18 critères : théorie, pratique et argumentation sur six socles. Diagnostic initial, défense en M2, soutenance blanche en M5.</text><text x="70" y="1032" class="copy">Aucun score acquis inventé. Les graphiques observés de l’application utilisent les preuves renseignées. Relation client : Brontis et Antoine.</text>',
    `<text x="45" y="1097" font-size="12" class="muted">${delivery.courses} jours de cours · ${delivery.foad} mercredis FOAD soutien · ${delivery.activities} activités plateforme · Mously : 30 % (25 % cours + 5 % coaching) · Cyber : 5 % · Durées à préciser</text></svg>`);
  return out.join('\n') + '\n';
}
const csvCell = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
const csv = '\uFEFF' + [['Date', 'Semaine', 'Mois', 'Statut', 'Modalité', 'Étape', 'Modules proposés', 'Intervenants cours', 'Référents suivi FOAD', 'Activités plateforme', 'Travail proposé', 'Preuve attendue', 'Question à défendre'], ...days.map(day => [day.date, `S${day.week}`, `M${day.month}`, day.holiday || (day.active ? 'Trame proposée' : 'Week-end'), day.modality === 'foad' ? 'FOAD de soutien' : day.modality === 'cours' ? 'Cours encadrés' : 'Sans activité imposée', day.focus, day.sessions.map(item => item.title).join(' | '), names(day.courseTrainers), names(day.supportTrainers), day.platformActivities.join(' | '), day.work, day.deliverable, day.defense])].map(row => row.map(csvCell).join(';')).join('\r\n') + '\r\n';
let weekly = '# HETIC — Planning semaine par semaine\n\nDu **1er janvier au 30 juin 2027** : 27 semaines calendaires touchées, dont la première et la dernière sont partielles. Cours les lundi, mardi, jeudi et vendredi ; mercredi FOAD de soutien sur plateforme. Trame proposée sans horaires, hors jours fériés nationaux ; vacances HETIC à préciser.\n\n[Planning quotidien CSV](planning-quotidien-2027.csv) · [Application](index.html#planning)\n\n| Semaine | Dates | Objectif | Livrable | Proposition à défendre | Mercredi FOAD / référent |\n| --- | --- | --- | --- | --- | --- |\n';
for (const week of weeks) {
  const goal = plan.weeklyGoals.find(item => item.number === week.number);
  const foad = days.filter(day => day.week === week.number && day.modality === 'foad').map(day => `${format(day.date)} · ${names(day.supportTrainers)}`).join('; ') || 'Pas de mercredi actif sur la période';
  weekly += `| S${week.number}${week.partial ? ' · partielle' : ''} | ${format(week.start)} → ${format(week.end)} | ${goal.title} | ${goal.deliverable} | ${goal.defense} | ${foad} |\n`;
}
weekly += `\nRythme prévu : **${delivery.courses} jours de cours et ${delivery.foad} mercredis FOAD**, avec ${delivery.activities} activités plateforme proposées. Le suivi FOAD n’est pas une journée de présence synchrone de l’enseignant.\n`;
weekly += '\nRendez-vous clients : **Brontis et Antoine**. Le premier MVP de M3 est conditionné par la revue des bases et un périmètre réalisable. Les apprenants doivent défendre leurs propositions produit et marketing et expliquer leur réalisation technique.\n\nSource des jours fériés : [Service Public, calendrier 2027](https://www.service-public.gouv.fr/particuliers/actualites/A19019).\n';
const staff = model.buildDeliveryWorkload(plan, 'staff');
const cellCounts = cell => ({ courses: cell.breakdown.find(item => item.id === 'cours')?.count || 0, foad: cell.breakdown.find(item => item.id === 'foad')?.count || 0 });
let staffMarkdown = '# HETIC — Plan de charge proposé, cours et soutien FOAD\n\nDu 1er janvier au 30 juin 2027. **C = jour de mobilisation proposé en cours ; F = rattachement à un suivi de mercredi FOAD.** Un F ne représente pas une journée de présence synchrone. Durées, disponibilités et vacances HETIC à confirmer.\n\n| Intervenant / rôle | M1 C/F | M2 C/F | M3 C/F | M4 C/F | M5 C/F | M6 C/F | Total C/F |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n';
for (const row of staff.rows) {
  const counts = row.cells.map(cellCounts);
  staffMarkdown += '| ' + row.label + ' | ' + counts.map(item => `${item.courses}/${item.foad}`).join(' | ') + ' | ' + counts.reduce((sum, item) => sum + item.courses, 0) + '/' + counts.reduce((sum, item) => sum + item.foad, 0) + ' |\n';
}
staffMarkdown += `\nPour les apprenants : **${delivery.courses} jours de cours et ${delivery.foad} mercredis FOAD**, soit ${delivery.courses + delivery.foad} jours d’apprentissage proposés. La plateforme prévoit ${delivery.activities} activités-types à décliner, quatre par mercredi. Les coanimations expliquent que les mobilisations des intervenants dépassent le nombre de journées apprenants.\n\nLes 30 % de Mously et les 5 % du contenu cyber restent des repères à vérifier en heures. Aucun taux d’occupation ou volume ETP n’est déduit des nombres de jours. Les rendez-vous clients sont coordonnés par Brontis et Antoine.\n`;
const outputs = { 'docs/assets/carte-application.svg': svg(), 'docs/planning-quotidien-2027.csv': csv, 'docs/planning-semaines-2027.md': weekly, 'docs/plan-charge-2027.md': staffMarkdown };
let stale = false;
for (const [file, content] of Object.entries(outputs)) {
  const target = path.join(root, file);
  if (process.argv.includes('--check')) { if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content) { console.error(`À régénérer : ${file}`); stale = true; } }
  else { fs.writeFileSync(target, content); console.log(`Généré : ${file}`); }
}
if (stale) process.exitCode = 1;
