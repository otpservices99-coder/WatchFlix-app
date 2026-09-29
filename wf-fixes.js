/* WatchFlix page corrections. Loaded at the end of index.html.
   Startup values (edit here): task 25 WC, hour 20 WC, referral 50 WC,
   streaks 50/100/250 WC, minimum withdrawal 2,500 WC (N500), 5 WC = N1. */
(function () {
  var N = '\u20A6';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function safe(fn) { try { fn(); } catch (e) { /* keep going */ } }

  function swap(from, to) {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, hits = [];
    while ((n = w.nextNode())) {
      var p = n.parentNode && n.parentNode.nodeName;
      if (p === 'SCRIPT' || p === 'STYLE') continue;
      if (n.nodeValue.indexOf(from) !== -1) hits.push(n);
    }
    hits.forEach(function (t) { t.nodeValue = t.nodeValue.split(from).join(to); });
  }

  /* 1. Wording that was not true or not consistent */
  safe(function () {
    [
      ['Withdraw Anytime', 'Withdraw from 2,500 WCoin'],
      ['Trusted, Secure & Supported By', 'Built for Nigerian Users'],
      ['Paystack', 'Bank Transfers'],
      ['NDPR Compliant', 'Data Privacy'],
      ['All Nigerian Banks', 'Nigerian Banks'],
      ['Your wallet is credited instantly upon completion.', 'Your wallet is credited after review.'],
      ['Cash out via supported bank or crypto methods when you hit the minimum.', 'Cash out by bank transfer when you reach 2,500 WCoin.'],
      ['Powered by Leading Ad Networks & Offer Walls', 'Our Advertising Partners'],
      ['We partner with global ad networks and survey providers to ensure a constant supply of high-paying tasks for our users.', 'WatchFlix rewards are funded by advertising revenue from our partners. Payouts follow partner payments, so reward amounts are modest.'],
      ['TimeWall', 'Adsterra'], ['AdGate Media', 'Monetag'], ['OfferToro', 'Adcash'],
      ['We are a registered platform with over 5,000 active users and 1.7 WCoinmillion paid out.', 'WatchFlix is a new platform.'],
      ['Real people, ', 'Early user samples, '],
      ['Bonus credited instantly', 'Bonus credited after review'],
      ['Bonus + priority withdrawal', 'Bonus after review'],
      ['Join thousands of users already turning free time into WCoin.', 'Join WatchFlix and start turning free time into WCoin.'],
      ['Hours per day watching ads', 'Hours per day on video tasks'],
      ['Total Earnings', 'Example Earnings'],
      ['122,500 WCoin', '1,250 WCoin'],
      ['Bank transfer \u00B7 live-style activity', 'Sample activity \u00B7 not real withdrawals']
    ].forEach(function (p) { swap(p[0], p[1]); });
    $$('div').forEach(function (d) {
      var t = d.textContent.trim();
      if ((t === 'Pollfish' || t === 'BitLabs') && d.querySelector('svg')) d.style.display = 'none';
    });
    $$('.flex.items-center.gap-2.font-bold').forEach(function (d) {
      if (d.querySelector('svg') && d.textContent.trim() === '') d.appendChild(document.createTextNode('Ad-Funded Rewards'));
    });
  });

  /* 2. Stats bar: real facts instead of made-up counts */
  safe(function () {
    var g = $('.grid-cols-2.text-center');
    var v = [['Free', 'Registration'], ['2,500 WCoin', 'Minimum withdrawal'], ['5 WCoin = ' + N + '1', 'Conversion rate'], ['Bank Transfer', 'Payout method']];
    $$(':scope > div', g).forEach(function (c, i) {
      if (v[i]) { c.children[0].textContent = v[i][0]; c.children[1].textContent = v[i][1]; }
    });
  });

  /* 3. Hero example card and streak bonuses */
  safe(function () {
    $$('.float-anim .text-emerald-600.font-bold.text-sm').forEach(function (e, i) {
      e.textContent = ['+25 WC', '+50 WC', '+50 WC'][i] || e.textContent;
    });
    var s = { '+500 WC': '+50 WCoin', '+200 WCoin': '+100 WCoin', '+300 WCoin': '+250 WCoin' };
    $$('.card-hover .text-3xl').forEach(function (e) { var t = e.textContent.trim(); if (s[t]) e.textContent = s[t]; });
  });

  /* 4. Comparison table: keep WatchFlix facts, stop making claims about others */
  safe(function () {
    var m = {
      'Registration Fee': [null, 'Varies by platform'],
      'Minimum Withdrawal': ['2,500 WCoin', 'Varies by platform'],
      'Withdrawal Speed': ['Within 72 hours after review', 'Varies by platform'],
      'Task Variety': ['Video, social & referral tasks', 'Varies by platform'],
      'Referral Commission': [null, 'Varies by platform'],
      'Customer Support': ['WhatsApp', 'Varies by platform']
    };
    $$('tbody tr').forEach(function (r) {
      var c = r.children, k = c[0].textContent.trim();
      if (m[k]) { if (m[k][0]) c[1].textContent = m[k][0]; c[2].textContent = m[k][1]; }
    });
  });

  /* 5. Ticker: facts instead of invented people */
  safe(function () {
    var box = $('.animate-marquee');
    var dot = '<span class="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>';
    var lines = ['Free registration, no fees', 'Example: 25 WCoin per eligible task', '5 WCoin = ' + N + '1',
      'Minimum withdrawal: 2,500 WCoin (' + N + '500)', 'Refer a friend: 50 WCoin', '7-day streak bonus: 50 WCoin',
      'Payouts by bank transfer after review', 'Rewards funded by advertising revenue'];
    box.innerHTML = lines.concat(lines).map(function (t) {
      return '<span class="mx-8 text-sm font-medium flex items-center gap-2">' + dot + ' ' + t + '</span>';
    }).join('');
  });

  /* 6. Testimonials: label as samples */
  safe(function () {
    var h = $$('h2').filter(function (x) { return x.textContent.indexOf('Early user samples') !== -1; })[0];
    var p = document.createElement('p');
    p.className = 'text-slate-500 text-sm';
    p.textContent = 'Sample testimonials. They will be replaced with real user reviews after launch.';
    h.parentNode.appendChild(p);
  });

  /* 7. Withdrawal feed: label as sample and keep amounts near the real minimum */
  safe(function () {
    var opts = [2500, 3000, 4000, 5000, 7500, 10000];
    function fixRows() {
      $$('#liveWithdrawFeed .font-extrabold.text-emerald-600').forEach(function (e) {
        if (e.getAttribute('data-wf')) return;
        e.setAttribute('data-wf', '1');
        e.textContent = opts[Math.floor(Math.random() * opts.length)].toLocaleString() + ' WC';
      });
    }
    function fixBadge() {
      var b = document.getElementById('liveFeedStatus');
      if (!b) return;
      var cls = 'flex-shrink-0 text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5';
      if (b.className !== cls) b.className = cls;
      if (b.textContent.trim() !== 'Sample') b.textContent = 'Sample';
    }
    var feed = document.getElementById('liveWithdrawFeed'), badge = document.getElementById('liveFeedStatus');
    fixRows(); fixBadge();
    if (feed) new MutationObserver(fixRows).observe(feed, { childList: true });
    if (badge) new MutationObserver(fixBadge).observe(badge, { childList: true, attributes: true, characterData: true, subtree: true });
  });

  /* 8. Calculators with startup-sized rates */
  safe(function () {
    var H = 20, T = 25, R = 50;
    function fresh(id) { var el = document.getElementById(id); if (!el) return null; var c = el.cloneNode(true); el.parentNode.replaceChild(c, el); return c; }
    var h = fresh('hoursRange'), t = fresh('tasksRange'), r = fresh('refsRange');
    function calc() {
      var a = +h.value, b = +t.value, c = +r.value;
      document.getElementById('hoursVal').textContent = a + (a === 1 ? ' hour' : ' hours');
      document.getElementById('tasksVal').textContent = b + (b === 1 ? ' task' : ' tasks');
      document.getElementById('refsVal').textContent = c + (c === 1 ? ' friend' : ' friends');
      document.getElementById('totalEarnings').textContent = (a * H * 30 + b * T * 30 + c * R).toLocaleString() + ' WCoin';
    }
    window.calcEarnings = calc;
    [h, t, r].forEach(function (e) { e.addEventListener('input', calc); });
    calc();

    var s = fresh('refSimRange');
    function sim() {
      var v = +s.value;
      document.getElementById('refSimCount').textContent = v + (v === 1 ? ' friend' : ' friends');
      document.getElementById('refSimTotal').textContent = (v * R).toLocaleString() + ' WCoin';
    }
    s.addEventListener('input', sim);
    sim();
  });

  /* 9. Navigation and footer links */
  safe(function () {
    $$('a[href="#features"]').forEach(function (a) { if (a.textContent.trim() === 'Tasks') a.setAttribute('href', '#how-it-works'); });
    var ref = $('a[href="referral.html"]');
    if (ref) { ref.removeAttribute('onclick'); ref.setAttribute('href', '#referral'); }
    var con = $('a[href="contact.html"]');
    if (con) { con.removeAttribute('onclick'); con.setAttribute('href', 'https://wa.me/2348081647810'); con.setAttribute('target', '_blank'); }
  });
})();