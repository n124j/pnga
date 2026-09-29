/**
 * PNGA form receiver and newsletter tool (Google Apps Script).
 *
 * Paste this whole file into Extensions > Apps Script of the PRIVATE "PNGA Form Responses" sheet.
 * Setup steps are in README.md ("Waivers and forms" and "Newsletter and Facebook group").
 *
 * What it does:
 *  - Saves each waiver / volunteer / photo-release submission, one tab per form.
 *  - Newsletter sign-ups: saves the address, emails a welcome message with a personal unsubscribe link,
 *    and (optionally) tells PNGA about the new subscriber.
 *  - Unsubscribe: a personal link removes the person. Typing an address on the website sends that
 *    address a confirmation link first, so nobody can unsubscribe someone else.
 *  - Adds a "PNGA Newsletter" menu to the sheet: send a Google Doc to all subscribers (or just a test to yourself).
 *
 * IMPORTANT: keep this Sheet PRIVATE. Never use "Publish to the web" on it.
 */

var CONFIG = {
  /** Public address of the website, no trailing slash, e.g. 'https://www.example.org'. Newsletters cannot be sent until this is set. */
  SITE_URL: '',
  /** Gets new-subscriber notices, receives test newsletters, and is the Reply-To address on newsletters. */
  NOTIFY_EMAIL: 'nirajbjk@gmail.com',
  /** Set to false to stop the "new subscriber" notice emails. */
  NOTIFY_ON_SIGNUP: true,
  SENDER_NAME: 'Pennsylvania Nepalese Guthi Association',
  /** Printed at the bottom of every newsletter (U.S. law requires a postal address). */
  ORG_ADDRESS: '1000 Germantown Pike, B5, Plymouth Meeting, PA 19462'
};

var NEWSLETTER_TAB = 'Newsletter';
var UNSUB_TAB = 'Unsubscribe';
var LOG_TAB = 'Newsletter log';

/* ------------------------------------------------------------------ website -> sheet */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents);
    var form = String(data.form || 'Other').replace(/[^A-Za-z0-9 _-]/g, '').slice(0, 40) || 'Other';
    var fields = data.fields || {};
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (form === UNSUB_TAB) {
      handleUnsubscribe_(ss, fields);
      return ContentService.createTextOutput('ok');
    }

    var isNewsletter = form === NEWSLETTER_TAB;
    if (isNewsletter) {
      var email = String(fields.Email || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ContentService.createTextOutput('error');
      if (findSubscriberRow_(ss, 'Email', email)) return ContentService.createTextOutput('ok'); // already subscribed
      // Set by the script only, never taken from the website.
      fields.Token = Utilities.getUuid();
      fields.Status = 'Active';
    }

    appendRow_(ss, form, fields);

    if (isNewsletter) {
      try {
        sendWelcome_(fields);
        notifyNewSubscriber_(fields);
      } catch (mailErr) {
        // The sign-up is saved even if the email fails (for example, mail quota reached).
      }
    }
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error');
  } finally {
    lock.releaseLock();
  }
}

/** Adds one row to the tab named `form`, creating the tab and any new columns as needed. */
function appendRow_(ss, form, fields) {
  var keys = Object.keys(fields).slice(0, 40);
  var sh = ss.getSheetByName(form) || ss.insertSheet(form);
  if (sh.getLastRow() === 0) sh.appendRow(['Received'].concat(keys));

  var headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  keys.forEach(function (k) {
    if (headers.indexOf(k) < 0) {
      headers.push(k);
      sh.getRange(1, headers.length).setValue(k);
    }
  });

  var row = headers.map(function (h) {
    if (h === 'Received') return new Date();
    var v = fields[h] === undefined ? '' : String(fields[h]).slice(0, 2000);
    // Stop text that starts with = + - @ from being treated as a spreadsheet formula.
    return /^[=+\-@]/.test(v) ? "'" + v : v;
  });
  sh.appendRow(row);
}

/** Returns {sheet, row, headers} for the first Newsletter row whose `column` equals `value`, or null. */
function findSubscriberRow_(ss, column, value) {
  var sh = ss.getSheetByName(NEWSLETTER_TAB);
  if (!sh || sh.getLastRow() < 2) return null;
  var headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  var col = headers.indexOf(column) + 1;
  if (col < 1) return null;
  var vals = sh.getRange(2, col, sh.getLastRow() - 1, 1).getValues();
  var want = String(value).trim().toLowerCase();
  for (var i = 0; i < vals.length; i++) {
    if (String(vals[i][0]).trim().toLowerCase() === want) return { sheet: sh, row: i + 2, headers: headers };
  }
  return null;
}

/* ------------------------------------------------------------------ unsubscribe */

function handleUnsubscribe_(ss, fields) {
  var token = String(fields.Token || '').trim();
  var email = String(fields.Email || '').trim();

  if (token) {
    // Personal link from a newsletter: remove that person.
    if (!/^[0-9a-f-]{36}$/i.test(token)) return;
    var hit = findSubscriberRow_(ss, 'Token', token);
    if (!hit) return; // already removed
    var addr = String(hit.sheet.getRange(hit.row, hit.headers.indexOf('Email') + 1).getValue());
    hit.sheet.deleteRow(hit.row);
    appendRow_(ss, UNSUB_TAB, { Email: addr, 'Unsubscribed at (UTC)': new Date().toISOString(), Method: 'personal link' });
    return;
  }

  if (email && CONFIG.SITE_URL) {
    // Typed on the website: email a confirmation link, but only to a real subscriber, and at most once an hour.
    var cache = CacheService.getScriptCache();
    var key = 'unsub:' + email.toLowerCase();
    if (cache.get(key)) return;
    var sub = findSubscriberRow_(ss, 'Email', email);
    if (!sub) return;
    cache.put(key, '1', 3600);
    var t = String(sub.sheet.getRange(sub.row, sub.headers.indexOf('Token') + 1).getValue());
    if (!t) return;
    MailApp.sendEmail({
      to: email,
      subject: 'Confirm: unsubscribe from the PNGA newsletter',
      name: CONFIG.SENDER_NAME,
      replyTo: CONFIG.NOTIFY_EMAIL,
      htmlBody: '<p>Someone asked to unsubscribe this address from the PNGA newsletter.</p>' +
        '<p><a href="' + unsubLink_(t) + '">Yes, unsubscribe me</a></p>' +
        '<p>If this was not you, ignore this email and nothing will change.</p>'
    });
  }
}

function unsubLink_(token) {
  return CONFIG.SITE_URL + '/unsubscribe?t=' + encodeURIComponent(token);
}

/* ------------------------------------------------------------------ emails to new subscribers */

function sendWelcome_(f) {
  if (!CONFIG.SITE_URL) return;
  var name = String(f.Name || '').trim();
  MailApp.sendEmail({
    to: f.Email,
    subject: 'Welcome to the PNGA newsletter',
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.NOTIFY_EMAIL,
    htmlBody: '<p>' + (name ? 'Namaste ' + esc_(name) + ',' : 'Namaste,') + '</p>' +
      '<p>Thank you for subscribing to news and updates from the Pennsylvania Nepalese Guthi Association.</p>' +
      footerHtml_(f.Token, 'You are receiving this because this address was used to subscribe on our website.')
  });
}

function notifyNewSubscriber_(f) {
  if (!CONFIG.NOTIFY_ON_SIGNUP || !CONFIG.NOTIFY_EMAIL) return;
  MailApp.sendEmail(CONFIG.NOTIFY_EMAIL, 'New PNGA newsletter subscriber',
    'Email: ' + f.Email + '\nName: ' + (f.Name || '') + '\nLanguage: ' + (f['Preferred language'] || '') +
    '\n\nThey are saved in the "Newsletter" tab of the responses sheet.');
}

function footerHtml_(token, reason) {
  return '<hr style="margin-top:32px">' +
    '<p style="font-size:13px;color:#555">' + reason + '<br>' +
    '<a href="' + unsubLink_(token) + '">Unsubscribe</a> at any time.<br>' +
    esc_(CONFIG.SENDER_NAME) + ', ' + esc_(CONFIG.ORG_ADDRESS) + '</p>';
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ------------------------------------------------------------------ newsletter menu */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('PNGA Newsletter')
    .addItem('Send a test to myself', 'sendTestNewsletter')
    .addItem('Send to all subscribers', 'sendNewsletterToAll')
    .addSeparator()
    .addItem('How many subscribers?', 'showSubscriberCount')
    .addToUi();
}

function activeSubscribers_() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NEWSLETTER_TAB);
  if (!sh || sh.getLastRow() < 2) return [];
  var headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  var ei = headers.indexOf('Email'), ti = headers.indexOf('Token'), si = headers.indexOf('Status');
  var rows = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
  var out = [];
  rows.forEach(function (r) {
    var email = String(r[ei] || '').trim();
    var status = si >= 0 ? String(r[si] || 'Active').trim() : 'Active';
    if (email && status.toLowerCase() === 'active') out.push({ email: email, token: ti >= 0 ? String(r[ti] || '') : '' });
  });
  return out;
}

function showSubscriberCount() {
  var n = activeSubscribers_().length;
  SpreadsheetApp.getUi().alert(n + ' active subscriber' + (n === 1 ? '' : 's') + '.\nEmails you can still send today: ' + MailApp.getRemainingDailyQuota() + '.');
}

/** Asks for the Google Doc and returns {id, subject, html}, or null if cancelled. */
function pickIssue_() {
  var ui = SpreadsheetApp.getUi();
  if (!CONFIG.SITE_URL) {
    ui.alert('Set SITE_URL at the top of the script first (the website address), then try again.');
    return null;
  }
  var r = ui.prompt('Newsletter issue', 'Paste the link to the Google Doc that contains this issue.\nThe Doc\'s title becomes the email subject.', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return null;
  var m = String(r.getResponseText()).match(/[-\w]{25,}/);
  if (!m) { ui.alert('That does not look like a Google Doc link.'); return null; }
  var file = DriveApp.getFileById(m[0]);
  var res = UrlFetchApp.fetch('https://www.googleapis.com/drive/v3/files/' + m[0] + '/export?mimeType=text%2Fhtml', {
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true
  });
  if (res.getResponseCode() !== 200) { ui.alert('Could not read that Doc (error ' + res.getResponseCode() + '). Check that you can open it.'); return null; }
  var html = res.getContentText().replace(/<!doctype[^>]*>/i, '');
  return { subject: file.getName(), html: html };
}

function withFooter_(html, token) {
  var foot = footerHtml_(token, 'You are receiving this because you subscribed to the PNGA newsletter.');
  return /<\/body>/i.test(html) ? html.replace(/<\/body>/i, foot + '</body>') : html + foot;
}

function sendTestNewsletter() {
  var issue = pickIssue_();
  if (!issue) return;
  MailApp.sendEmail({
    to: CONFIG.NOTIFY_EMAIL,
    subject: '[TEST] ' + issue.subject,
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.NOTIFY_EMAIL,
    htmlBody: withFooter_(issue.html, '00000000-0000-0000-0000-000000000000')
  });
  SpreadsheetApp.getUi().alert('Test sent to ' + CONFIG.NOTIFY_EMAIL + '. Check that it looks right (including the unsubscribe line), then use "Send to all subscribers".');
}

function sendNewsletterToAll() {
  var ui = SpreadsheetApp.getUi();
  var issue = pickIssue_();
  if (!issue) return;
  var subs = activeSubscribers_().filter(function (s) { return s.token; });
  var quota = MailApp.getRemainingDailyQuota();
  if (!subs.length) { ui.alert('There are no subscribers yet.'); return; }
  if (subs.length > quota) {
    ui.alert('You can send ' + quota + ' more emails today but there are ' + subs.length + ' subscribers. Nothing was sent. Try again tomorrow, or use a newsletter service.');
    return;
  }
  var ok = ui.alert('Send "' + issue.subject + '" to ' + subs.length + ' subscribers?\nThis cannot be undone. Did you send yourself a test first?', ui.ButtonSet.YES_NO);
  if (ok !== ui.Button.YES) return;

  var sent = 0, failed = [];
  subs.forEach(function (s) {
    try {
      MailApp.sendEmail({
        to: s.email,
        subject: issue.subject,
        name: CONFIG.SENDER_NAME,
        replyTo: CONFIG.NOTIFY_EMAIL,
        htmlBody: withFooter_(issue.html, s.token)
      });
      sent++;
    } catch (err) {
      failed.push(s.email);
    }
  });
  appendRow_(SpreadsheetApp.getActiveSpreadsheet(), LOG_TAB, {
    Subject: issue.subject, Sent: sent, Failed: failed.length, 'Failed addresses': failed.join(', '), 'Sent at (UTC)': new Date().toISOString()
  });
  ui.alert('Sent to ' + sent + ' people.' + (failed.length ? '\n' + failed.length + ' failed (see the "' + LOG_TAB + '" tab).' : ''));
}
