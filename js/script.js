(function () {
    'use strict';

    // --- Dark Mode Toggle ---
    (function initTheme() {
        var saved = localStorage.getItem('kaiman-theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        var btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                var html = document.documentElement;
                var isDark = html.getAttribute('data-theme') === 'dark';
                if (isDark) {
                    html.removeAttribute('data-theme');
                    localStorage.setItem('kaiman-theme', 'light');
                    btn.textContent = '\u263E Dark';
                } else {
                    html.setAttribute('data-theme', 'dark');
                    localStorage.setItem('kaiman-theme', 'dark');
                    btn.textContent = '\u2600 Light';
                }
            });
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                btn.textContent = '\u2600 Light';
            } else {
                btn.textContent = '\u263E Dark';
            }
        }
    })();

    // --- Testimonial Form ---
    var testimonialForm = document.getElementById('testimonial-form');
    var formSuccess = document.getElementById('form-success');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function (e) {
            e.preventDefault();
            testimonialForm.reset();
            testimonialForm.style.display = 'none';
            if (formSuccess) formSuccess.style.display = 'block';
        });
    }

    // --- Comment Form ---
    var commentForm = document.getElementById('comment-form');
    var commentsContainer = document.getElementById('comments-container');
    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var author = document.getElementById('comment-author').value.trim();
            var text = document.getElementById('comment-text').value.trim();
            if (!author || !text) return;
            var today = new Date();
            var dateStr = today.toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            var commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML =
                '<div class="comment-header">' +
                    '<span class="comment-author">' + escapeHtml(author) + '</span>' +
                    '<span class="comment-date">' + dateStr + '</span>' +
                '</div>' +
                '<p class="comment-body">' + escapeHtml(text) + '</p>';
            if (commentsContainer) {
                commentsContainer.appendChild(commentDiv);
            } else {
                var wrap = document.querySelector('.comment-form-wrap');
                if (wrap) wrap.parentNode.insertBefore(commentDiv, wrap);
            }
            commentForm.reset();
            var badge = document.querySelector('.badge');
            if (badge) {
                badge.textContent = document.querySelectorAll('.comment').length + ' Comments';
            }
        });
    }

    // --- Evidence Viewer ---
    var evidenceData = {
        'incident-report-01': {
            title: 'Exhibit A &mdash; Incident Report (FWA)',
            body: '<h4>INCIDENT REPORT &mdash; FWA 2025</h4>' +
                  '<p><strong>Date of Incident:</strong> January 2025</p>' +
                  '<p><strong>Location:</strong> Men\'s Bathroom, Convention Center, Florida</p>' +
                  '<p><strong>Reporting Party:</strong> Victim A</p>' +
                  '<p><strong>Subject:</strong> Kaiman (Crocodile/Grey Wolf Hybrid)</p>' +
                  '<hr>' +
                  '<p><strong>Description of Incident:</strong></p>' +
                  '<p>At approximately 4:15 PM EST, Victim A was adjusting their fursuit head near the sink area when the subject, Kaiman, approached from behind and made physical contact with the lower back region, specifically in the area commonly known as the "small of the back." Contact lasted approximately 3 seconds.</p>' +
                  '<p>Victim A reported feeling "startled" and "uncomfortable." The subject did not verbalize anything before or after the contact and exited the bathroom promptly.</p>' +
                  '<p><strong>Convention Staff Action:</strong> Verbal warning issued. Subject claimed it was an accident.</p>' +
                  '<hr>' +
                  '<p><em>Exhibit marked for identification.</em></p>'
        },
        'telegram-screenshots': {
            title: 'Exhibit B &mdash; Telegram Screenshots',
            body: '<h4>TELEGRAM CHAT LOGS &mdash; ARCHIVED</h4>' +
                  '<p><strong>Date Range:</strong> December 10&ndash;15, 2025</p>' +
                  '<p><strong>Chat:</strong> "FurCon Drama (Private)"</p>' +
                  '<hr>' +
                  '<p><strong>[Kaiman]:</strong> can\'t believe people are still talking about this</p>' +
                  '<p><strong>[Kaiman]:</strong> it was ONE TIME at FWA and it was an accident</p>' +
                  '<p><strong>[BloodDonor]:</strong> you touched my back without asking dude</p>' +
                  '<p><strong>[Kaiman]:</strong> the small of the back is a consensual zone</p>' +
                  '<p><strong>[User926]:</strong> multiple people have come forward now though. MFF too</p>' +
                  '<p><strong>[Kaiman]:</strong> these are fake victims lol they just want attention</p>' +
                  '<p><strong>[Kaiman]:</strong> the small of the back is not even a real body part</p>' +
                  '<p><strong>[User413]:</strong> it is though? it\'s literally a named anatomical area</p>' +
                  '<p><strong>[Kaiman]:</strong> you guys are overreacting. i went to Georgia Tech i know anatomy</p>' +
                  '<p><strong>[BloodDonor]:</strong> i have trauma from this. i can\'t use convention bathrooms anymore</p>' +
                  '<p><strong>[Kaiman]:</strong> skill issue</p>' +
                  '<hr>' +
                  '<p><em>Note: These logs have been authenticated by the Meowfurshot Law Group Digital Forensics Division.</em></p>'
        },
        'staff-statements': {
            title: 'Exhibit C &mdash; Convention Staff Statements',
            body: '<h4>SWORN STATEMENTS &mdash; CONVENTION STAFF</h4>' +
                  '<p><strong>Statement 1 &mdash; MFF Security Volunteer "M."</strong></p>' +
                  '<p>"I was stationed near the bathroom entrance during Midwest FurFest 2025."</p>' +
                  '<hr>' +
                  '<p><strong>Statement 2 &mdash; FWA Staff Member "J."</strong></p>' +
                  '<p>"At FWA 2025, I overheard two attendees discussing an incident in the bathroom. The victim was named BloodDonor."</p>' +
                  '<hr>' +
                  '<p><strong>Statement 3 &mdash; Unaffiliated Third Party "T."</strong></p>' +
                  '<p>"I was in the stall next to them. Sounded like it was the small of the back specifically."</p>' +
                  '<hr>' +
                  '<p><em>All statements collected under convention protocol.</em></p>'
        },
        'pattern-analysis': {
            title: 'Exhibit D &mdash; Pattern Analysis Report',
            body: '<h4>PATTERN ANALYSIS &mdash; MEOWFURSHOT LAW GROUP</h4>' +
                  '<p><strong>Prepared by:</strong> Senior Case Analyst Team</p>' +
                  '<p><strong>Date:</strong> April 2026</p>' +
                  '<hr>' +
                  '<h4>FINDINGS</h4>' +
                  '<p><strong>1. Location Consistency:</strong> 100% of reported incidents occurred in convention bathroom facilities across three different conventions (FWA, MFF, MegaPlex).</p>' +
                  '<p><strong>2. Time of Day:</strong> All incidents occurred during peak convention hours (2PM&ndash;5PM).</p>' +
                  '<p><strong>3. Targeting Pattern:</strong> Victims were known associates, including "BloodDonor."</p>' +
                  '<p><strong>4. Body Part Specificity:</strong> The "small of the back" was the contact zone in every incident.</p>' +
                  '<p><strong>5. Defendant Profile:</strong> Kaiman, 26, Crocodile/Grey Wolf hybrid, Georgia Tech CS grad.</p>' +
                  '<hr>' +
                  '<p><strong>Conclusion:</strong> A clear and consistent pattern has been established.</p>'
        },
        'defendant-statements': {
            title: 'Exhibit E &mdash; Defendant\'s Public Statements',
            body: '<h4>PUBLIC STATEMENTS &mdash; KAIMAN (DEFENDANT)</h4>' +
                  '<p><strong>Source:</strong> Telegram, Bluesky, kaiman.blue</p>' +
                  '<p><strong>Date Range:</strong> January 2025 &ndash; April 2026</p>' +
                  '<hr>' +
                  '<p><strong>Statement 1:</strong> "It was an accident. I was just trying to get to the sink."</p>' +
                  '<p><strong>Statement 2:</strong> "These people are fake victims. This is a smear campaign because I went to Georgia Tech and they didn\'t."</p>' +
                  '<p><strong>Statement 3:</strong> "The small of the back is a neutral zone. Like a handshake."</p>' +
                  '<p><strong>Statement 4:</strong> "I\'m the real victim here. My Twitch numbers are down 40%."</p>' +
                  '<hr>' +
                  '<p><em>All statements are public record.</em></p>'
        },
        'georgia-tech-diploma': {
            title: 'Exhibit G &mdash; Georgia Tech Diploma (Defendant\'s Exhibit)',
            body: '<h4>GEORGIA INSTITUTE OF TECHNOLOGY</h4>' +
                  '<p style="text-align:center;font-style:italic;">"The defendant has repeatedly invoked their Georgia Tech education to claim authority on anatomy and consent. This exhibit is presented for the record."</p>' +
                  '<hr>' +
                  '<div style="text-align:center;padding:24px;border:2px solid var(--accent-alt);font-family:\'Georgia\',serif;background:var(--bg-card-alt);">' +
                  '<p style="font-size:0.8rem;color:var(--text-muted);">GEORGIA INSTITUTE OF TECHNOLOGY</p>' +
                  '<h3 style="font-size:1.3rem;margin:8px 0;">Bachelor of Science</h3>' +
                  '<p style="font-size:1rem;">in Computer Science</p>' +
                  '<p style="font-size:0.85rem;margin:8px 0;">Concentration: Intelligence &amp; Media</p>' +
                  '<hr style="width:200px;margin:16px auto;">' +
                  '<p style="font-size:0.9rem;">Conferred upon <strong>Kaiman the Hybrid</strong></p>' +
                  '<p style="font-size:0.75rem;color:var(--text-muted);margin-top:16px;">This diploma does not confer expertise in anatomy or consent law.</p>' +
                  '</div>' +
                  '<hr>' +
                  '<p><em>The Meowfurshot Law Group notes that a CS degree does not qualify one to define which body parts require consent.</em></p>'
        },
        'consent-waiver': {
            title: 'Exhibit H &mdash; Alleged "Consent Waiver"',
            body: '<h4>ALLEGED CONSENT WAIVER &mdash; EXHIBIT H</h4>' +
                  '<p>Retrieved from Kaiman\'s Telegram. The defendant allegedly circulated this document claiming it constituted a "binding consent agreement" for back-touching.</p>' +
                  '<hr>' +
                  '<div class="waiver-doc">' +
                  '<div class="waiver-title">Small of the Back Consent Waiver</div>' +
                  '<p>I, the undersigned, hereby acknowledge that the "small of the back" is a consensual zone, equivalent to a handshake or high-five. By entering a convention bathroom, I implicitly grant permission for friendly back-touching.</p>' +
                  '<p style="margin-top:12px;">This waiver is valid for all future furry conventions and supersedes any prior discomfort.</p>' +
                  '<div class="signature-line">X \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_</div>' +
                  '<div class="signature-line" style="width:200px;">Date: \_\_\_\_/\_\_\_\_/2025</div>' +
                  '<div class="stamp-red">REJECTED</div>' +
                  '</div>' +
                  '<hr>' +
                  '<p><em>The court has ruled this document has no legal standing. The Meowfurshot Law Group categorically rejects the premise that the small of the back is a "handshake zone."</em></p>'
        }
    };

    var viewer = document.getElementById('evidence-viewer');
    var viewerTitle = document.getElementById('viewer-title');
    var viewerBody = document.getElementById('viewer-body');
    var viewerClose = document.getElementById('viewer-close');

    document.querySelectorAll('.btn-download').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var key = this.getAttribute('data-file');
            var data = evidenceData[key];
            if (data && viewer && viewerTitle && viewerBody) {
                viewerTitle.innerHTML = data.title;
                viewerBody.innerHTML = data.body;
                viewer.style.display = 'block';
                viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    if (viewerClose && viewer) {
        viewerClose.addEventListener('click', function () {
            viewer.style.display = 'none';
        });
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

})();
